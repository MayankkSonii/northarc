# BRAND_GUIDELINES.md — Logo, Colors, Typography, Voice

## Brand essence

NorthArc guides businesses through their journey of **intelligent transformation**.
Feel: premium, enterprise, confident, calm, technically credible. Never hype-y, never cheap.

**Tagline:** *Connecting Intelligence to Impact.*

---

## Color palette (canonical)

| Role | Name | Hex |
|---|---|---|
| Primary | Navy | `#0B1F3A` |
| Accent | Electric Blue | `#1D75FF` |
| Background | Deep Space | `#050816` |
| Secondary | White / Gray | `#FFFFFF` / grays |

**Usage**
- Background is dark by default (dark theme is core to the brand).
- Electric Blue is the single accent — use it for CTAs, links, highlights, and glows. Don't dilute it with competing accent colors.
- Whitespace is a feature. Let content breathe.

> ⚠️ **Code drift to reconcile:** the current CSS uses `--color-bg` ≈ `#050A15` and a green (`#059669`) as `--color-secondary`/primary in places. Align these to the canonical palette above (tracked in TODO.md). If green is an intentional secondary accent, document it here first — otherwise remove it.

---

## Typography

- **Premium, modern sans-serif.** Prioritize legibility and generous spacing.
- Large, confident headlines. Restrained body copy.
- Avoid decorative or playful fonts.
- Establish and reuse a consistent type scale (UI tokens) before writing new components.

---

## Logo

- Logo asset: `src/narc.png` (also bundled as `northarc/assets/narc-*.png`).
- Maintain clear space around the logo. Never stretch, recolor arbitrarily, or place on low-contrast backgrounds.

---

## Motion

- Minimal, clean, purposeful (via Motion / framer-motion).
- Subtle entrance animations, smooth transitions — no bouncing, spinning, or attention-grabbing effects.
- Motion should reinforce hierarchy, not distract.

---

## Do / Don't

**Do:** premium typography · dark theme · single blue accent · minimal animation · large whitespace · enterprise aesthetic.

**Don't:** stock photos · cartoon illustrations · cheap agency templates · bright gradients everywhere · generic icons.

---

## Voice & tone

- **Sell outcomes, not technology.** (See CLAUDE.md for the do/don't table.)
- Confident, precise, business-first. Speak to founders, CEOs, and CTOs.
- Back claims with specifics where possible. Avoid empty superlatives.
- Never overpromise; credibility is the scarce asset for a new company.
