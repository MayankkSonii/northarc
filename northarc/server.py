"""
NorthArc Website Server
- Serves static files (HTML, CSS, JS, assets) with SPA (client-side routing) fallback
- Handles inquiry form submissions via POST /api/inquiry
- Stores all inquiries in a local SQLite database (inquiries.db, kept outside the served dir)
- Optionally sends email notifications via SMTP (dispatched asynchronously)

Security hardening:
- SPA fallback for unknown routes (serves index.html), extension-less paths -> index.html
- Sensitive files (*.db, *.db-journal, *.sqlite, *.py) are never served (always 404)
- Admin inquiry listing requires the X-Admin-Token header matching NORTHARC_ADMIN_TOKEN
- CORS restricted to an explicit allowlist
- Honeypot field silently drops bot submissions
- Per-IP rate limiting on inquiry submissions
- Security headers (nosniff / DENY / strict-origin-when-cross-origin) on every response

Stdlib only — Python 3.12 compatible.
"""

import http.server
import socketserver
import sqlite3
import json
import os
import posixpath
import smtplib
import ssl
import threading
import time
from collections import defaultdict, deque
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from urllib.parse import urlparse, unquote

# ─── Configuration ───────────────────────────────────────────────────────────
PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
# Default DB lives OUTSIDE the served directory (repo root, one level up) so it
# can never be downloaded even if a serving bug slips through. Overridable via env.
DB_PATH = os.environ.get(
    "NORTHARC_DB_PATH",
    os.path.join(os.path.dirname(DIRECTORY), "inquiries.db"),
)

# ─── Security policy ──────────────────────────────────────────────────────────
# Only these origins may read cross-origin JSON responses.
ALLOWED_ORIGINS = frozenset({
    "https://northarc.in",
    "https://www.northarc.in",
    "http://localhost:3000",
    "http://localhost:8080",
})

# Paths ending in one of these are treated as sensitive and always 404.
BLOCKED_EXTENSIONS = (".db", ".db-journal", ".sqlite", ".py")

# Admin token required to list inquiries. If unset, listing is refused entirely.
ADMIN_TOKEN = os.environ.get("NORTHARC_ADMIN_TOKEN", "")

# Rate limit: max submissions per IP within the rolling window (seconds).
RATE_LIMIT_MAX = 5
RATE_LIMIT_WINDOW = 10 * 60  # 10 minutes
_rate_hits = defaultdict(deque)
_rate_lock = threading.Lock()

# Email Configuration (set these to enable email notifications)
# You can also set via environment variables:
#   NORTHARC_SMTP_HOST, NORTHARC_SMTP_PORT, NORTHARC_SMTP_USER,
#   NORTHARC_SMTP_PASS, NORTHARC_NOTIFY_EMAIL
EMAIL_CONFIG = {
    "smtp_host": os.environ.get("NORTHARC_SMTP_HOST", ""),        # e.g. "smtp.gmail.com"
    "smtp_port": int(os.environ.get("NORTHARC_SMTP_PORT", "587")),
    "smtp_user": os.environ.get("NORTHARC_SMTP_USER", ""),        # e.g. "your@gmail.com"
    "smtp_pass": os.environ.get("NORTHARC_SMTP_PASS", ""),        # App password
    "notify_email": os.environ.get("NORTHARC_NOTIFY_EMAIL", ""),   # Where to send notifications
}


# ─── Database Setup ──────────────────────────────────────────────────────────
def init_database():
    """Create the inquiries table if it doesn't exist."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS inquiries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            company TEXT NOT NULL,
            phone TEXT DEFAULT '',
            service TEXT DEFAULT '',
            budget TEXT DEFAULT '',
            requirement TEXT NOT NULL,
            submitted_at TEXT NOT NULL,
            ip_address TEXT DEFAULT '',
            status TEXT DEFAULT 'new'
        )
    """)
    conn.commit()
    conn.close()
    print(f"   📦 Database ready: {DB_PATH}")


def save_inquiry(data, ip=""):
    """Save an inquiry to SQLite and return the record ID."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    cursor.execute("""
        INSERT INTO inquiries (name, email, company, phone, service, budget, requirement, submitted_at, ip_address)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        data.get("name", ""),
        data.get("email", ""),
        data.get("company", ""),
        data.get("phone", ""),
        data.get("service", ""),
        data.get("budget", ""),
        data.get("requirement", ""),
        now,
        ip
    ))
    conn.commit()
    record_id = cursor.lastrowid
    conn.close()
    return record_id, now


def get_all_inquiries():
    """Retrieve all inquiries from the database."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM inquiries ORDER BY id DESC")
    rows = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return rows


# ─── Email Notification ──────────────────────────────────────────────────────
def send_email_notification(data, record_id, timestamp):
    """Send an email notification about a new inquiry (runs in a worker thread)."""
    cfg = EMAIL_CONFIG
    if not all([cfg["smtp_host"], cfg["smtp_user"], cfg["smtp_pass"], cfg["notify_email"]]):
        print("   ⚠️  Email not configured — skipping notification.")
        return False

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"🔵 New NorthArc Inquiry #{record_id} — {data.get('company', 'Unknown')}"
        msg["From"] = cfg["smtp_user"]
        msg["To"] = cfg["notify_email"]

        html_body = f"""
        <html>
        <body style="font-family: 'Segoe UI', Arial, sans-serif; background: #050A15; color: #FFFFFF; padding: 2rem;">
            <div style="max-width: 600px; margin: 0 auto; background: #0A1628; border: 1px solid rgba(29,117,255,0.3); border-radius: 12px; padding: 2rem;">
                <h2 style="color: #1D75FF; margin-bottom: 1.5rem;">New Consultation Request</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 0.8rem 0; color: #7B8BA3; border-bottom: 1px solid rgba(255,255,255,0.05);">Name</td>
                        <td style="padding: 0.8rem 0; color: #FFFFFF; border-bottom: 1px solid rgba(255,255,255,0.05);"><strong>{data.get('name', '')}</strong></td></tr>
                    <tr><td style="padding: 0.8rem 0; color: #7B8BA3; border-bottom: 1px solid rgba(255,255,255,0.05);">Email</td>
                        <td style="padding: 0.8rem 0; color: #FFFFFF; border-bottom: 1px solid rgba(255,255,255,0.05);"><a href="mailto:{data.get('email', '')}" style="color: #4DA6FF;">{data.get('email', '')}</a></td></tr>
                    <tr><td style="padding: 0.8rem 0; color: #7B8BA3; border-bottom: 1px solid rgba(255,255,255,0.05);">Company</td>
                        <td style="padding: 0.8rem 0; color: #FFFFFF; border-bottom: 1px solid rgba(255,255,255,0.05);">{data.get('company', '')}</td></tr>
                    <tr><td style="padding: 0.8rem 0; color: #7B8BA3; border-bottom: 1px solid rgba(255,255,255,0.05);">Phone</td>
                        <td style="padding: 0.8rem 0; color: #FFFFFF; border-bottom: 1px solid rgba(255,255,255,0.05);">{data.get('phone', 'Not provided')}</td></tr>
                    <tr><td style="padding: 0.8rem 0; color: #7B8BA3; border-bottom: 1px solid rgba(255,255,255,0.05);">Service</td>
                        <td style="padding: 0.8rem 0; color: #FFFFFF; border-bottom: 1px solid rgba(255,255,255,0.05);">{data.get('service', 'Not specified')}</td></tr>
                    <tr><td style="padding: 0.8rem 0; color: #7B8BA3; border-bottom: 1px solid rgba(255,255,255,0.05);">Budget</td>
                        <td style="padding: 0.8rem 0; color: #FFFFFF; border-bottom: 1px solid rgba(255,255,255,0.05);">{data.get('budget', 'Not specified')}</td></tr>
                    <tr><td style="padding: 0.8rem 0; color: #7B8BA3; vertical-align: top;">Requirement</td>
                        <td style="padding: 0.8rem 0; color: #FFFFFF;">{data.get('requirement', '')}</td></tr>
                </table>
                <p style="margin-top: 1.5rem; color: #7B8BA3; font-size: 0.85rem;">Submitted at {timestamp} • Record #{record_id}</p>
            </div>
        </body>
        </html>
        """

        msg.attach(MIMEText(html_body, "html"))

        context = ssl.create_default_context()
        with smtplib.SMTP(cfg["smtp_host"], cfg["smtp_port"]) as server:
            server.ehlo()
            server.starttls(context=context)
            server.ehlo()
            server.login(cfg["smtp_user"], cfg["smtp_pass"])
            server.sendmail(cfg["smtp_user"], cfg["notify_email"], msg.as_string())

        print(f"   ✉️  Email notification sent to {cfg['notify_email']}")
        return True

    except Exception as e:
        print(f"   ❌ Email send failed: {e}")
        return False


def dispatch_email_async(data, record_id, timestamp):
    """Fire off the email notification on a daemon thread so the request returns fast."""
    thread = threading.Thread(
        target=send_email_notification,
        args=(data, record_id, timestamp),
        daemon=True,
    )
    thread.start()


# ─── Rate limiting ────────────────────────────────────────────────────────────
def rate_limit_ok(ip):
    """Return True if this IP is under the submission limit; records the hit if so."""
    now = time.monotonic()
    with _rate_lock:
        hits = _rate_hits[ip]
        # Drop timestamps outside the rolling window.
        while hits and (now - hits[0]) > RATE_LIMIT_WINDOW:
            hits.popleft()
        if len(hits) >= RATE_LIMIT_MAX:
            return False
        hits.append(now)
        return True


# ─── Request Handler ─────────────────────────────────────────────────────────
class NorthArcHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    # ── shared header helpers ────────────────────────────────────────────────
    def _security_headers(self):
        """Emit hardening headers that belong on every response."""
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Frame-Options", "DENY")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")

    def _cors_headers(self):
        """Echo the request Origin only when it is in the allowlist."""
        origin = self.headers.get("Origin")
        if origin and origin in ALLOWED_ORIGINS:
            self.send_header("Access-Control-Allow-Origin", origin)
            self.send_header("Vary", "Origin")

    def end_headers(self):
        # SimpleHTTPRequestHandler calls end_headers() for static file responses;
        # inject security headers here so they land on every path (static + API).
        self._security_headers()
        super().end_headers()

    # ── routing ──────────────────────────────────────────────────────────────
    def do_OPTIONS(self):
        """CORS preflight for the API."""
        self.send_response(204)
        self._cors_headers()
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, X-Admin-Token")
        self.send_header("Access-Control-Max-Age", "600")
        self.end_headers()

    def do_POST(self):
        """Handle POST requests for the inquiry form."""
        parsed = urlparse(self.path)

        if parsed.path == "/api/inquiry":
            self._handle_inquiry()
        else:
            self._json_response(404, {"success": False, "error": "Endpoint not found"})

    def do_GET(self):
        """Handle GET requests - serve files + API endpoints."""
        parsed = urlparse(self.path)
        path = parsed.path

        if path == "/api/inquiries":
            self._handle_list_inquiries()
            return

        # Never serve anything under /api/ as a static file.
        if path.startswith("/api/"):
            self._json_response(404, {"success": False, "error": "Endpoint not found"})
            return

        # Block sensitive file types outright, regardless of existence.
        if self._is_blocked_path(path):
            self.send_error(404, "Not Found")
            return

        # If the request maps to a real file on disk, serve it normally.
        if self._maps_to_real_file(path):
            super().do_GET()
            return

        # Otherwise fall back to index.html for client-side (SPA) routing.
        self._serve_spa_fallback()

    def do_HEAD(self):
        """Route HEAD through the same logic as GET so blocking + SPA fallback apply.

        The shared helpers all respect self.command, so bodies are suppressed
        automatically for HEAD requests.
        """
        self.do_GET()

    # ── static-serving helpers ────────────────────────────────────────────────
    def _is_blocked_path(self, url_path):
        """True if the URL path targets a sensitive file type."""
        lowered = url_path.lower()
        return lowered.endswith(BLOCKED_EXTENSIONS)

    def _maps_to_real_file(self, url_path):
        """True only if the URL resolves to an existing regular file inside DIRECTORY."""
        fs_path = self.translate_path(url_path)
        return os.path.isfile(fs_path)

    def _serve_spa_fallback(self):
        """Serve index.html with 200 so the client-side router can take over."""
        index_path = os.path.join(DIRECTORY, "index.html")
        try:
            with open(index_path, "rb") as f:
                content = f.read()
        except OSError:
            self.send_error(404, "Not Found")
            return

        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(content)))
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(content)

    # ── API handlers ──────────────────────────────────────────────────────────
    def _handle_inquiry(self):
        """Process and store a consultation inquiry."""
        try:
            client_ip = self.client_address[0] if self.client_address else ""

            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)
            data = json.loads(body.decode("utf-8"))

            # Honeypot: bots tend to fill every field. A non-empty "website"
            # means it's almost certainly a bot — fake success, save nothing.
            if str(data.get("website", "")).strip():
                print(f"   🕳️  Honeypot triggered from {client_ip} — dropping silently.")
                self._json_response(200, {
                    "success": True,
                    "message": "Consultation request received successfully.",
                    "email_sent": "queued",
                })
                return

            # Validate required fields.
            required = ["name", "email", "company", "requirement"]
            missing = [f for f in required if not str(data.get(f, "")).strip()]
            if missing:
                self._json_response(400, {
                    "success": False,
                    "error": f"Missing required fields: {', '.join(missing)}"
                })
                return

            # Per-IP rate limiting.
            if not rate_limit_ok(client_ip):
                print(f"   ⏳ Rate limit exceeded for {client_ip}")
                self._json_response(429, {
                    "success": False,
                    "error": "Too many requests. Please try again later."
                })
                return

            # Save to database.
            record_id, timestamp = save_inquiry(data, client_ip)
            print(f"   💾 Inquiry #{record_id} saved from {data.get('name', '')} ({data.get('company', '')})")

            # Send email notification asynchronously so the response returns immediately.
            dispatch_email_async(data, record_id, timestamp)

            self._json_response(200, {
                "success": True,
                "message": "Consultation request received successfully.",
                "record_id": record_id,
                "email_sent": "queued",
                "timestamp": timestamp
            })

        except json.JSONDecodeError:
            self._json_response(400, {"success": False, "error": "Invalid JSON payload."})
        except Exception as e:
            print(f"   ❌ Error processing inquiry: {e}")
            self._json_response(500, {"success": False, "error": "Internal server error."})

    def _handle_list_inquiries(self):
        """Return all stored inquiries as JSON (admin-only)."""
        # If no admin token is configured, never expose data.
        if not ADMIN_TOKEN:
            self._json_response(403, {"success": False, "error": "Forbidden."})
            return

        supplied = self.headers.get("X-Admin-Token", "")
        if supplied != ADMIN_TOKEN:
            self._json_response(403, {"success": False, "error": "Forbidden."})
            return

        try:
            rows = get_all_inquiries()
            self._json_response(200, {"success": True, "count": len(rows), "inquiries": rows})
        except Exception as e:
            self._json_response(500, {"success": False, "error": str(e)})

    def _json_response(self, status_code, data):
        """Send a JSON response with CORS + security headers."""
        payload = json.dumps(data).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(payload)))
        self._cors_headers()
        self.end_headers()  # security headers injected via overridden end_headers()
        if self.command != "HEAD":
            self.wfile.write(payload)

    def log_message(self, format, *args):
        """Custom log format — only surface API request lines."""
        first = args[0] if args else ""
        if isinstance(first, str) and "/api/" in first:
            print(f"   🔗 API {first}")


# ─── Main ────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    os.chdir(DIRECTORY)
    init_database()

    print()
    print("  ╔══════════════════════════════════════════════════════╗")
    print("  ║                                                      ║")
    print("  ║       ◆  N O R T H A R C  ◆  Web Server             ║")
    print("  ║       Connecting Intelligence to Impact.              ║")
    print("  ║                                                      ║")
    print(f"  ║       🌐  http://localhost:{PORT}                     ║")
    print("  ║       📦  SQLite DB: inquiries.db                    ║")

    if EMAIL_CONFIG["smtp_host"]:
        print(f"  ║       ✉️   Email: {EMAIL_CONFIG['notify_email'][:30]}  ║")
    else:
        print("  ║       ⚠️   Email: Not configured (DB only)        ║")

    if ADMIN_TOKEN:
        print("  ║       🔒  Admin API: token required                 ║")
    else:
        print("  ║       🔒  Admin API: disabled (no token set)        ║")

    print("  ║                                                      ║")
    print("  ╚══════════════════════════════════════════════════════╝")
    print()
    print("  Press Ctrl+C to stop the server.")
    print()

    # Threaded + address-reuse so concurrent requests don't block one another
    # and restarts don't hit "address already in use".
    class NorthArcServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
        daemon_threads = True
        allow_reuse_address = True

    with NorthArcServer(("", PORT), NorthArcHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n  🛑 NorthArc server stopped.")
