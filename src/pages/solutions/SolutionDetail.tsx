import React from "react";
import { motion } from "motion/react";
import { staggerContainer, staggerItem, fadeUpVariant, viewportOnce } from "../../lib/animations";
import { useSEO, breadcrumbJsonLd, SITE_URL, SITE_NAME } from "../../lib/seo";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Workflow,
  AlertCircle,
  Layers,
  TrendingUp,
  CheckCircle,
  Boxes,
} from "lucide-react";
import { solutions } from "../../data/solutionsData";
import products from "../../data/productsData";

interface Props {
  slug: string;
}

export default function SolutionDetail({ slug }: Props) {
  const solution = solutions.find((s) => s.slug === slug);
  const path = `/solutions/${slug}`;

  const description = solution
    ? solution.summary.length > 158
      ? `${solution.summary.slice(0, 155).replace(/\s+\S*$/, "")}…`
      : solution.summary
    : "This solution could not be found. Browse all NorthArc AI solutions by industry and business function instead.";

  useSEO(
    solution
      ? {
          title: `AI for ${solution.title}`,
          description,
          path,
          type: "article",
          jsonLd: [
            {
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: `AI Solutions for ${solution.title}`,
              name: `AI for ${solution.title}`,
              description,
              provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
              areaServed: "Worldwide",
              url: `${SITE_URL}${path}`,
            },
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Solutions", path: "/solutions" },
              { name: solution.title, path },
            ]),
          ],
        }
      : {
          title: "Solution Not Found",
          description,
          path,
          noindex: true,
        }
  );

  if (!solution) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg text-text-primary">
        <div className="text-center space-y-4">
          <p className="text-4xl font-light opacity-30">404</p>
          <p className="text-text-muted">Solution not found.</p>
          <a href="/solutions" className="inline-flex items-center gap-2 text-sm text-primary hover:underline mt-4">
            <ArrowLeft className="w-4 h-4" /> Back to Solutions
          </a>
        </div>
      </div>
    );
  }

  const Icon = solution.icon;
  const accent = solution.accentColor;
  const isIndustry = solution.type === "industry";
  const badgeLabel = isIndustry ? "Industry" : "Business Function";
  const BadgeIcon = isIndustry ? Building2 : Workflow;

  const related = (solution.relatedProducts ?? [])
    .map((ps) => products.find((p) => p.slug === ps))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans text-left">
      {/* Ambient orb */}
      <div
        className="absolute right-[-10%] top-[5%] w-[50vw] h-[50vw] rounded-full blur-[150px] pointer-events-none z-0 opacity-20"
        style={{ background: `radial-gradient(circle, ${accent}, transparent)` }}
      />

      {/* ── HERO ── */}
      <section className="px-6 md:px-12 lg:px-24 pt-40 pb-12 relative z-10 max-w-5xl mx-auto">
        <a
          href="/solutions"
          className="inline-flex items-center gap-2 text-xs text-text-muted hover:text-primary transition-colors font-mono mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> All Solutions
        </a>

        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
          <motion.div className="flex items-center gap-3" variants={staggerItem}>
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${accent}18`, border: `1px solid ${accent}35` }}
            >
              <Icon className="w-6 h-6" style={{ color: accent }} />
            </div>
            <span
              className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border"
              style={{ color: accent, borderColor: `${accent}35`, background: `${accent}10` }}
            >
              <BadgeIcon className="w-3 h-3" />
              {badgeLabel}
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl font-light tracking-tight text-text-primary leading-[1.1]"
            variants={staggerItem}
          >
            AI for {solution.title}
          </motion.h1>

          <motion.p className="text-base sm:text-lg text-text-secondary font-light max-w-2xl leading-relaxed" variants={staggerItem}>
            {solution.tagline}
          </motion.p>

          <motion.p className="text-sm text-text-muted font-light max-w-2xl leading-relaxed" variants={staggerItem}>
            {solution.summary}
          </motion.p>

          <motion.div className="pt-2" variants={staggerItem}>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              Talk to our team
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── CHALLENGES ── */}
      <section className="px-6 md:px-12 lg:px-24 py-14 border-t border-border/10 relative z-10 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-xl bg-surface border border-border/20">
            <AlertCircle className="w-4 h-4" style={{ color: accent }} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight">The challenges</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {solution.challenges.map((c, i) => (
            <motion.div
              key={i}
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="rounded-2xl border border-border/10 bg-surface/40 p-6 flex items-start gap-3"
            >
              <span className="text-xs font-mono font-bold mt-0.5" style={{ color: accent }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm text-text-secondary font-light leading-relaxed">{c}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── OFFERINGS ── */}
      <section className="px-6 md:px-12 lg:px-24 py-14 border-t border-border/10 relative z-10 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-xl bg-surface border border-border/20">
            <Layers className="w-4 h-4" style={{ color: accent }} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight">How we help</h2>
        </div>
        <div className="space-y-4">
          {solution.offerings.map((o, i) => (
            <motion.div
              key={i}
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="flex items-start gap-4 rounded-2xl border border-border/10 bg-surface/40 p-6"
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${accent}18`, border: `1px solid ${accent}35` }}
              >
                <CheckCircle className="w-4 h-4" style={{ color: accent }} />
              </div>
              <p className="text-sm text-text-secondary font-light leading-relaxed pt-1">{o}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── OUTCOMES ── */}
      <section className="px-6 md:px-12 lg:px-24 py-14 border-t border-border/10 relative z-10 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-xl bg-surface border border-border/20">
            <TrendingUp className="w-4 h-4" style={{ color: accent }} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight">The outcomes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {solution.outcomes.map((o, i) => (
            <motion.div
              key={i}
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="rounded-2xl border p-6 flex items-start gap-3"
              style={{ borderColor: `${accent}25`, background: `${accent}08` }}
            >
              <TrendingUp className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: accent }} />
              <p className="text-sm text-text-primary font-light leading-relaxed">{o}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── RELATED PRODUCTS ── */}
      {related.length > 0 && (
        <section className="px-6 md:px-12 lg:px-24 py-14 border-t border-border/10 relative z-10 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-xl bg-surface border border-border/20">
              <Boxes className="w-4 h-4" style={{ color: accent }} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">Products that power this</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((p) => {
              const PIcon = p.icon;
              return (
                <a
                  key={p.id}
                  href={`/products/${p.slug}`}
                  className="group relative flex flex-col rounded-2xl border border-border/10 bg-surface/50 p-6 gap-4 transition-all duration-300 hover:-translate-y-0.5"
                  style={{ borderColor: "rgba(255,255,255,0.07)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${p.accentColor}18`, border: `1px solid ${p.accentColor}35` }}
                  >
                    <PIcon className="w-5 h-5" style={{ color: p.accentColor }} />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-sm font-semibold text-text-primary leading-snug">{p.name}</h3>
                    <p className="text-xs text-text-secondary font-light leading-relaxed mt-2">{p.tagline}</p>
                  </div>
                  <div
                    className="flex items-center gap-1.5 text-[11px] font-semibold transition-all duration-300 opacity-0 group-hover:opacity-100"
                    style={{ color: p.accentColor }}
                  >
                    View product
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      )}

      {/* ── CTA BANNER ── */}
      <section className="px-6 md:px-12 lg:px-24 py-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl border border-border/50 bg-surface/40 backdrop-blur-xl px-8 py-14 sm:px-16 overflow-hidden text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-transparent to-secondary/6 pointer-events-none" />
            <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[40vw] h-[40vw] rounded-full bg-primary/8 blur-[100px] pointer-events-none" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold block mb-4">
              Let's Build
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-text-primary mb-4">
              Ready to bring AI to{" "}
              <span className="text-primary font-semibold">{solution.title}?</span>
            </h2>
            <p className="text-sm text-text-secondary max-w-xl mx-auto mb-8">
              Tell us the outcome you're after. We'll map the right AI solution to your data, systems and goals.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              Talk to our team
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
