# NorthArc

**AI Engineering, Data Science & Intelligent Automation.**
*Connecting Intelligence to Impact.*

NorthArc helps businesses transform operations through Artificial Intelligence — Generative AI, AI agents, Voice AI, intelligent automation, data science, and analytics. This repository contains the company website.

🌐 Live: https://northarc.in

---

## Tech stack

- **Frontend:** React 19 + Vite + TypeScript, Tailwind CSS v4, Motion
- **Backend:** Python (`northarc/server.py`) — serves the site and handles inquiry submissions into SQLite
- **Deploy:** Netlify (current)

## Getting started

```bash
npm install        # install dependencies
npm run dev        # start dev server at http://localhost:3000
npm run build      # build to dist/ and deploy into northarc/ (via deploy.cjs)
npm run preview    # preview the production build
npm run lint       # type-check (tsc --noEmit)
```

### Backend (inquiry server)

```bash
cd northarc
python3 server.py  # serves the built site + /api/inquiry on port 8080
```

Email notifications are optional and configured via environment variables:
`NORTHARC_SMTP_HOST`, `NORTHARC_SMTP_PORT`, `NORTHARC_SMTP_USER`, `NORTHARC_SMTP_PASS`, `NORTHARC_NOTIFY_EMAIL`, `NORTHARC_DB_PATH`.

## Project structure

```
src/              React app source (pages, components, data)
northarc/         Built output + server.py (Python backend) + inquiries.db
deploy.cjs        Copies dist/ → northarc/, preserving backend files
```

## Repository docs

Project context and working guidelines for both people and AI assistants:

- [CLAUDE.md](CLAUDE.md) — AI assistant instructions (read this first)
- [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) — brand, vision, positioning
- [SERVICES.md](SERVICES.md) — service offerings
- [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md) — colors, typography, voice
- [ROADMAP.md](ROADMAP.md) — product & business roadmap
- [SALES_PLAYBOOK.md](SALES_PLAYBOOK.md) — outreach strategy
- [CONTENT_STRATEGY.md](CONTENT_STRATEGY.md) — LinkedIn & blog plan
- [TODO.md](TODO.md) — current priorities & open issues

---

© NorthArc. All rights reserved.
