"""
NorthArc Website Server
- Serves static files (HTML, CSS, JS, assets)
- Handles inquiry form submissions via POST /api/inquiry
- Stores all inquiries in a local SQLite database (inquiries.db)
- Optionally sends email notifications via SMTP
"""

import http.server
import socketserver
import sqlite3
import json
import os
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from urllib.parse import urlparse

# ─── Configuration ───────────────────────────────────────────────────────────
PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.environ.get("NORTHARC_DB_PATH", os.path.join(DIRECTORY, "inquiries.db"))

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
    """Send an email notification about a new inquiry."""
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


# ─── Request Handler ─────────────────────────────────────────────────────────
class NorthArcHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_POST(self):
        """Handle POST requests for the inquiry form."""
        parsed = urlparse(self.path)

        if parsed.path == "/api/inquiry":
            self._handle_inquiry()
        else:
            self.send_error(404, "Endpoint not found")

    def do_GET(self):
        """Handle GET requests - serve files + API endpoints."""
        parsed = urlparse(self.path)

        if parsed.path == "/api/inquiries":
            self._handle_list_inquiries()
        else:
            super().do_GET()

    def _handle_inquiry(self):
        """Process and store a consultation inquiry."""
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)
            data = json.loads(body.decode("utf-8"))

            # Validate required fields
            required = ["name", "email", "company", "requirement"]
            missing = [f for f in required if not data.get(f, "").strip()]
            if missing:
                self._json_response(400, {
                    "success": False,
                    "error": f"Missing required fields: {', '.join(missing)}"
                })
                return

            # Get client IP
            client_ip = self.client_address[0] if self.client_address else ""

            # Save to database
            record_id, timestamp = save_inquiry(data, client_ip)
            print(f"   💾 Inquiry #{record_id} saved from {data['name']} ({data['company']})")

            # Send email notification (non-blocking intent)
            email_sent = send_email_notification(data, record_id, timestamp)

            self._json_response(200, {
                "success": True,
                "message": "Consultation request received successfully.",
                "record_id": record_id,
                "email_sent": email_sent,
                "timestamp": timestamp
            })

        except json.JSONDecodeError:
            self._json_response(400, {"success": False, "error": "Invalid JSON payload."})
        except Exception as e:
            print(f"   ❌ Error processing inquiry: {e}")
            self._json_response(500, {"success": False, "error": "Internal server error."})

    def _handle_list_inquiries(self):
        """Return all stored inquiries as JSON."""
        try:
            rows = get_all_inquiries()
            self._json_response(200, {"success": True, "count": len(rows), "inquiries": rows})
        except Exception as e:
            self._json_response(500, {"success": False, "error": str(e)})

    def _json_response(self, status_code, data):
        """Send a JSON response."""
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode("utf-8"))

    def log_message(self, format, *args):
        """Custom log format."""
        if "/api/" in (args[0] if args else ""):
            print(f"   🔗 API {args[0]}")


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

    print("  ║                                                      ║")
    print("  ╚══════════════════════════════════════════════════════╝")
    print()
    print("  Press Ctrl+C to stop the server.")
    print()

    with socketserver.TCPServer(("", PORT), NorthArcHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n  🛑 NorthArc server stopped.")
