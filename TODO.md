# TODO.md — Current Priorities & Open Issues

> ## ✅ SEO overhaul + bug fixes + content repositioning — COMPLETED 2026-07-06
> A 19-agent workflow shipped the full pass. Verified: `tsc` clean, production build OK,
> site runs on localhost (:3000 dev, :8080 prod). Highlights:
> - **SEO infra:** per-route `useSEO` on every page (unique title+meta), canonical + OG/Twitter
>   on northarc.in, JSON-LD (Organization, WebSite, ProfessionalService, Service, Article,
>   Breadcrumb, ContactPage), `sitemap.xml` (48 URLs), `robots.txt`, `_redirects`, favicon/OG image.
> - **Bugs fixed:** SPA deep-link fallback, northarc.ai→.in everywhere, favicon path, 404 page,
>   theme persistence, mega-menu alignment, 24h/48h contradiction, a11y form labels, motion.nav.
> - **Content:** all client names anonymized + reframed as "projects delivered by our team";
>   green palette → premium two-blue; AI-first positioning across nav/services/expertise.
> - **Backend hardened:** SPA fallback, blocked .db/.py, DB moved out of served dir, admin-token
>   auth on /api/inquiries, CORS allowlist, honeypot, rate limiting, async email, security headers.
>
> Remaining polish ideas (non-blocking): code-split the 757 kB JS bundle; verify a couple of
> hero stat numbers (e.g. "62% delivered inside your own cloud"); supply a real branded OG image
> (currently the logo); confirm the LinkedIn company URL.


## 🎯 Business priorities (from ROADMAP)

- [ ] Land the first paying client.
- [ ] Improve the website after every client interaction.
- [ ] Publish weekly LinkedIn content.
- [ ] Create 2–3 solution demos.
- [ ] Collect testimonials.

---

## 🔴 Security & privacy — fix before driving traffic

These were found during a code review of the current site. They expose customer data.

- [ ] **Auth on `GET /api/inquiries`** — `northarc/server.py:176` returns ALL leads (name, email, phone, company, budget, IP) with no authentication. Anyone can dump the list. Add auth or remove the endpoint.
- [ ] **DB is web-downloadable** — `inquiries.db` sits inside the served directory, so `GET /inquiries.db` likely serves the raw database. Move the DB outside the served path (use `NORTHARC_DB_PATH`) or block the route.
- [ ] **Remove `inquiries.db` from git** — it's committed (`northarc/inquiries.db`) and `deploy.cjs` preserves `.db` files, so real customer PII would get committed on deploy. `git rm --cached`, add `*.db` to `.gitignore`.
- [ ] **Tighten CORS** — `Access-Control-Allow-Origin: *` on all API responses (`server.py:234`). Restrict to the site origin.
- [ ] **Spam/rate limiting on `POST /api/inquiry`** — public form with email notifications will get bot-spammed. Add honeypot + rate limiting (or captcha).

---

## 🟠 Credibility & correctness

- [ ] **Verify case-study clients & numbers** — `src/data/caseStudiesData.ts` names real brands (Amar Ujala, ICICI Lombard, ABP Live, DK Score) with hard revenue/retention figures. For a new company these must be true and permissioned, or relabeled as anonymized/illustrative.
- [ ] **Resolve domain/email mismatch** — brief says domain is **northarc.in**; Contact page shows **solutions@northarc.ai** (`src/pages/Contact.tsx:132`). Confirm the correct address and fix.

---

## 🟡 Cleanup & professionalism

- [ ] **README** — replaced the leftover HuggingFace/Streamlit template with a real NorthArc README. ✅ (verify it reads well)
- [ ] **package.json name** — currently `"react-example"`; rename to `northarc`.
- [ ] **Remove unused dependency** — `@google/genai` is in `package.json` but never imported. Remove it, or if Gemini is planned, route it through the backend (never expose the key client-side).
- [ ] **Reconcile color palette** — code uses bg `#050A15` and a green secondary (`#059669`); canonical brand is Navy `#0B1F3A`, Electric Blue `#1D75FF`, bg `#050816`. Align or document the deviation in BRAND_GUIDELINES.md.

---

## 📌 PLAN: Case studies & expertise repositioning (agreed 2026-07-05)

**Context:** The current case studies are real work, but they were delivered under the
founder's **previous company (Tatvic)** and are currently framed as if they were
NorthArc's own client engagements. They're also GA4/BigQuery *analytics* stories —
off-brand for an AI/ML company.

**Goal:** Keep the credibility of real delivered work, but present it honestly and
on-brand.

**Confirmed decisions (2026-07-05):**
- **Content source:** pull AI/ML & Data Science project material from **Tatvic's website**.
- **Framing:** do NOT present as NorthArc's own client case studies, and **no client
  names**. Present as *proof of experience* — "great projects our team has worked on" —
  anonymized (e.g. "a leading Indian media network", "a national insurance provider").
  Positioned as expertise/credibility, not a client roster.

**Steps:**
- [ ] Gather AI/ML + Data Science projects from tatvic.com (problem, approach, result/
      metrics). Focus on: predictive models, ML, OCR/Document AI, recommendation systems,
      LLM/GenAI, automation, forecasting, segmentation, churn.
- [ ] Anonymize every client → industry descriptor only. Strip/soften any figures that
      can't be substantiated.
- [ ] Rewrite `src/data/caseStudiesData.ts` with these anonymized AI/ML case studies.
- [ ] Reframe section headers/copy to "Selected projects our team has delivered" (or
      similar) — clearly NOT "our clients".
- [ ] Update Resources mega-menu copy in `src/App.tsx` (currently "See how leading brands
      achieved measurable results…" + GA4/BigQuery/GTM tags) → AI/ML framing, no client claims.
- [ ] Review `src/data/blogsData.ts` similarly (currently analytics-heavy) → AI/ML topics.

> Next action when we resume building: fetch Tatvic's AI/ML case-study pages, then draft
> the anonymized entries for review before writing them into the site.

---

## 🐛 Bugs found (code review 2026-07-05)

### Functional / breaks in production
- [ ] **SPA deep-link 404** — client-side routing has no server fallback. Add Netlify
      `_redirects` (`/* /index.html 200`) and an index.html catch-all in `server.py`.
- [ ] **Wrong domain in SEO/OG tags** — `index.html` uses `https://northarc.ai/` + missing
      `og-preview.png`; should be `northarc.in`.
- [ ] **Broken favicon in prod** — `index.html` favicon points to `/src/narc.png` (dev path).

### UX / consistency
- [ ] **Response-time contradiction** — "24 business hours" (success msg) vs "48 business
      hours" (contact card) in `Contact.tsx`. Pick one.
- [ ] **No 404 page** — unknown routes silently render Home without changing the URL (`App.tsx`).
- [ ] **Theme not persisted** — resets to dark every reload; add `localStorage`.
- [ ] **Mega-menu misalignment** — hardcoded `top-[73px]` doesn't match the taller unscrolled
      navbar (`App.tsx`).
- [ ] **Static title/meta on all routes** — add per-route `<title>`/description for SEO.

### Accessibility
- [ ] **Form labels not linked to inputs** (no `htmlFor`/`id`) in `Contact.tsx`.
- [ ] **Invalid `variants` on plain `<nav>`** in `CaseStudyDetail.tsx` (should be `motion.nav`).

### Backend
- [ ] SMTP send blocks the form request — make it async/non-blocking.
- [ ] (See Security section above for auth/CORS/DB items.)

---

## 📁 Docs (this setup)

- [x] Created CLAUDE.md, PROJECT_CONTEXT.md, SERVICES.md, BRAND_GUIDELINES.md, ROADMAP.md, SALES_PLAYBOOK.md, CONTENT_STRATEGY.md, TODO.md, README.md.
- Trigger deployment
