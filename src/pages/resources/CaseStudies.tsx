import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { staggerContainer, staggerItem, staggerDelay } from "../../lib/animations";
import { AnimatedHeroVisual } from "../../components/AnimatedHeroVisual";
import { useSEO } from "../../lib/seo";
import {
  ArrowRight,
  ArrowDown,
  TrendingUp,
  Search,
  Filter,
  CheckCircle,
  Building2,
} from "lucide-react";
import caseStudies from "../../data/caseStudiesData";

// Derived from the AI/ML & data-science case-study data so the filter chips
// always mirror the category tags present in caseStudiesData.ts.
const allCategories = [
  "All",
  ...Array.from(new Set(caseStudies.flatMap((cs) => cs.category))),
];

export default function CaseStudies() {
  useSEO({
    title: "AI & Machine Learning Case Studies",
    description:
      "Real-world AI, machine learning and data science case studies from the NorthArc team, measurable outcomes across finance, retail, media, automotive and more.",
    path: "/resources/case-studies",
  });

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered = caseStudies.filter((cs) => {
    const matchesCat = activeCategory === "All" || cs.category.includes(activeCategory);
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      cs.title.toLowerCase().includes(q) ||
      cs.client.toLowerCase().includes(q) ||
      cs.industry.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans text-left">
      {/* Ambient background */}
      <div className="absolute left-[-10%] top-[5%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-tr from-primary/6 to-primary/10 blur-[150px] pointer-events-none z-0" />
      <div className="absolute right-[-12%] top-[45%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-purple-500/5 to-secondary/5 blur-[130px] pointer-events-none z-0" />

      {/* ── HERO ── */}
      <section className="min-h-[52vh] flex flex-col justify-between px-6 md:px-12 lg:px-24 pt-28 lg:pt-32 pb-12 relative z-10 max-w-7xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6 max-w-3xl">
          <motion.span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary font-mono block" variants={staggerItem}>
            Resources / Case Studies
          </motion.span>
          <motion.h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-light tracking-tight text-text-primary leading-[1.1]" variants={staggerItem}>
            Real problems,<br />
            <span className="text-primary font-semibold">measurable results</span>
          </motion.h1>
          <motion.p className="text-sm sm:text-base text-text-secondary font-light max-w-2xl leading-relaxed" variants={staggerItem}>
            Selected AI, machine learning and data science projects delivered by our team, helping
            organisations across finance, retail, media, automotive and beyond turn data into
            predictions and decisions they can act on.
          </motion.p>
          <motion.p className="text-[11px] text-text-muted font-mono leading-relaxed" variants={staggerItem}>
            Engagements delivered by NorthArc&rsquo;s team across current and prior roles.
          </motion.p>
          <motion.div className="flex flex-wrap items-center gap-6 pt-1 text-xs text-text-muted font-mono" variants={staggerItem}>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-primary" />
              {caseStudies.length} Case Studies
            </span>
            <span className="flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-primary" />
              8+ Industries
            </span>
            <span className="flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-primary" />
              Measurable ROI
            </span>
          </motion.div>
        </motion.div>
        <div className="pointer-events-none absolute right-6 top-[calc(50%+40px)] hidden w-[38%] -translate-y-1/2 lg:block">
          <AnimatedHeroVisual icon={TrendingUp} title="Delivered outcomes" eyebrow="Case evidence" scene="data" />
        </div>
        <div className="flex items-center gap-3 text-xs text-text-secondary font-mono opacity-60 pt-10 lg:pt-0">
          <div className="w-8 h-8 rounded-full border border-border/30 flex items-center justify-center animate-bounce">
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
          Scroll through case studies
        </div>
      </section>

      {/* ── STICKY FILTERS ── */}
      <section className="sticky top-[72px] z-30 px-6 md:px-12 lg:px-24 py-3.5 bg-bg/85 backdrop-blur-xl border-b border-border/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
            <input
              type="text"
              placeholder="Search case studies…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface border border-border text-xs text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/40 transition-colors"
            />
          </div>
          {/* Category pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <Filter className="w-3 h-3 text-text-muted flex-shrink-0" />
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide transition-all duration-200 border ${
                  activeCategory === cat
                    ? "bg-primary text-white border-primary shadow-sm shadow-primary/20"
                    : "bg-surface border-border/60 text-text-muted hover:text-text-secondary hover:border-primary/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="px-6 md:px-12 lg:px-24 py-14 relative z-10 max-w-7xl mx-auto">
        <p className="text-[11px] text-text-muted font-mono mb-8">
          Showing <span className="text-primary font-semibold">{filtered.length}</span> of {caseStudies.length} case studies
        </p>

        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((cs, i) => {
              const Icon = cs.icon;
              const isHovered = hoveredId === cs.id;
              return (
                <motion.a
                  key={cs.id}
                  href={`/resources/case-studies/${cs.slug}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * staggerDelay }}
                  onMouseEnter={() => setHoveredId(cs.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group relative flex flex-col rounded-2xl border bg-surface/50 backdrop-blur-sm overflow-hidden transition-all duration-300"
                  style={{
                    borderColor: isHovered ? `${cs.accentColor}60` : "rgba(255,255,255,0.07)",
                    boxShadow: isHovered ? `0 8px 32px ${cs.accentColor}18` : "none",
                  }}
                >
                  {/* Top accent bar */}
                  <div
                    className="h-[3px] w-full transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, ${cs.accentColor}, ${cs.accentColor}40)`, opacity: isHovered ? 1 : 0.4 }}
                  />

                  {/* Hover radial glow */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(ellipse at 50% 0%, ${cs.accentColor}10 0%, transparent 65%)`,
                      opacity: isHovered ? 1 : 0,
                    }}
                  />

                  <div className="p-6 flex flex-col gap-4 flex-grow relative">
                    {/* Icon + category row */}
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{ background: `${cs.accentColor}18`, border: `1px solid ${cs.accentColor}35` }}
                      >
                        <Icon className="w-4.5 h-4.5" style={{ color: cs.accentColor }} />
                      </div>
                      <div className="flex gap-1.5 flex-wrap justify-end">
                        {cs.category.slice(0, 2).map((cat) => (
                          <span
                            key={cat}
                            className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                            style={{ color: cs.accentColor, borderColor: `${cs.accentColor}35`, background: `${cs.accentColor}10` }}
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Client + industry */}
                    <div>
                      <p className="text-xs font-bold text-text-primary">{cs.client}</p>
                      <p className="text-[10px] font-mono text-text-muted uppercase tracking-wider mt-0.5">{cs.industry}</p>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-medium leading-snug text-text-secondary group-hover:text-text-primary transition-colors duration-300 flex-grow">
                      {cs.title}
                    </h3>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border/20">
                      {cs.metrics.map((m) => (
                        <div key={m.label} className="text-center">
                          <p className="text-sm font-bold leading-tight" style={{ color: cs.accentColor }}>
                            {m.value}
                          </p>
                          <p className="text-[9px] text-text-muted mt-0.5 leading-tight">{m.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div
                      className="flex items-center gap-1.5 text-[11px] font-semibold mt-1 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0"
                      style={{ color: cs.accentColor }}
                    >
                      Read case study
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-28 text-text-muted">
            <Search className="w-10 h-10 mx-auto mb-4 opacity-20" />
            <p className="text-sm">No case studies match your filters.</p>
          </div>
        )}
      </section>

      {/* ── CTA BANNER ── */}
      <section className="px-6 md:px-12 lg:px-24 py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl border border-border/50 bg-surface/40 backdrop-blur-xl px-8 py-14 sm:px-16 overflow-hidden text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-transparent to-purple-500/6 pointer-events-none" />
            <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[40vw] h-[40vw] rounded-full bg-primary/8 blur-[100px] pointer-events-none" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold block mb-4">
              Start Your Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-text-primary mb-4">
              Ready to put this expertise{" "}
              <span className="text-primary font-semibold">to work for you?</span>
            </h2>
            <p className="text-sm text-text-secondary max-w-xl mx-auto mb-8">
              Tell us about your data and AI challenges. We'll design a strategy that delivers results you can actually act on.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              Book a free consultation
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
