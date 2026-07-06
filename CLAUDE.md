# CLAUDE.md — AI Assistant Instructions for NorthArc

> This file is read by AI coding assistants (Claude Code, etc.) at the start of every session.
> It is the single source of truth for how to think and act on this repository.
> Deeper detail lives in the companion docs — see **Reference Docs** at the bottom.

---

## What NorthArc is

NorthArc is an **AI Engineering, Data Science, and Intelligent Automation company**.
We help businesses transform operations through Artificial Intelligence.

**We are NOT** a generic software agency, a web development shop, or a freelancer portfolio.

Positioning benchmark: Quantiphi, Fractal Analytics, Tredence, Scale AI, Palantir.
Everything we ship should feel **premium, enterprise-ready, and business-focused**.

**Tagline:** *Connecting Intelligence to Impact.*

---

## The #1 rule: sell outcomes, not technology

Never describe what we build. Describe the business result.

| ❌ Don't say | ✅ Say instead |
|---|---|
| "We build AI chatbots." | "We automate customer support using AI." |
| "OCR solution." | "Eliminate manual document processing." |
| "We do RAG systems." | "Your team gets instant, accurate answers from your own knowledge." |
| "LLM integration." | "Cut research time from hours to seconds." |

Every headline, button, meta description, and blog title must communicate **business value**.

---

## Design philosophy

The website must feel like a **billion-dollar AI company** (inspiration: OpenAI, Anthropic, Scale AI, Palantir, IBM).

**Use:** premium typography, dark theme, blue accents, minimal/clean animations, large whitespace, enterprise aesthetic.

**Avoid:** stock photos, cartoon illustrations, cheap agency templates, bright gradients everywhere, generic icons.

### Color palette (canonical — see BRAND_GUIDELINES.md)
- **Navy (primary):** `#0B1F3A`
- **Electric Blue (accent):** `#1D75FF`
- **Background:** `#050816`
- **Secondary:** White / Gray

> ⚠️ The code currently uses slightly different values (e.g. bg `#050A15`, green `#059669` as a secondary). Reconcile toward the canonical palette — see TODO.md.

---

## Development rules

Every change must:
- **Think enterprise first** — would a CTO trust this?
- **Prioritize performance** (Core Web Vitals, fast loads).
- Keep code **modular** and reusable.
- Be **mobile-first**.
- Be **SEO optimized** (semantic HTML, meta tags, structured data).
- Be **accessibility compliant** (WCAG: contrast, alt text, keyboard nav, ARIA).
- Use **clean, subtle animations** — never gratuitous motion.
- Maintain **consistent branding** across every page.
- Be written **from a potential client's perspective**.

---

## Tech stack

- **Frontend:** React 19 + Vite + TypeScript, Tailwind CSS v4, Motion (framer-motion). *(Next.js is the stated future direction.)*
- **Backend:** Python (current site uses a stdlib `server.py`); FastAPI / Node.js for future services.
- **AI:** OpenAI, Anthropic Claude, Gemini, LangChain, CrewAI, LlamaIndex.
- **ML:** TensorFlow, PyTorch, Scikit-learn.
- **Cloud:** AWS, Azure, GCP.
- **Deploy:** Netlify (current). Vercel is a future option.
- **VCS:** GitHub — https://github.com/MayankkSonii/northarc.git

### Repo layout notes
- `src/` — React app source.
- `northarc/` — built/deployed output + `server.py` (the Python inquiry backend) + `inquiries.db`.
- `deploy.cjs` — copies `dist/` → `northarc/`, preserving backend files.
- Contact form → `POST /api/inquiry` (see `src/pages/Contact.tsx` and `northarc/server.py`).

---

## Founder context

**Founder:** Mayank Soni
- 3.5+ years in AI, Data Science, Analytics, and Machine Learning.
- Previously at **Tatvic**, delivering enterprise analytics and data science.
- Built OCR systems, predictive models, recommendation systems, marketing analytics, LLM applications, and automation.
- Comfortable across the full AI lifecycle — data engineering → model development → deployment → client-facing delivery.

NorthArc does **not compete on price**. It competes on: **quality, business outcomes, technical excellence, long-term partnerships.**

---

## Key facts

- **Domain:** northarc.in — live at https://northarc.in
- **Company:** NorthArc (name finalized, logo created, LinkedIn company page live).
- ⚠️ Contact page email currently reads `solutions@northarc.ai` — verify against the `.in` domain (see TODO.md).

---

## Reference docs

- [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) — brand story, vision, positioning, target customers.
- [SERVICES.md](SERVICES.md) — detailed service offerings.
- [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md) — colors, typography, logo, voice.
- [ROADMAP.md](ROADMAP.md) — product & business roadmap.
- [SALES_PLAYBOOK.md](SALES_PLAYBOOK.md) — outreach strategy & scripts.
- [CONTENT_STRATEGY.md](CONTENT_STRATEGY.md) — LinkedIn & blog plan.
- [TODO.md](TODO.md) — current priorities + open issues (incl. security).
