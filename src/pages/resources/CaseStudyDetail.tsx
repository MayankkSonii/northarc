import React from "react";
import { motion } from "motion/react";
import { staggerContainer, staggerItem, fadeUpVariant, viewportOnce } from "../../lib/animations";
import {
  ArrowLeft,
  ArrowRight,
  Tag,
  Building2,
  TrendingUp,
  CheckCircle,
  Quote,
  Lightbulb,
  ChevronRight,
} from "lucide-react";
import caseStudies, { Section } from "../../data/caseStudiesData";

interface Props {
  slug: string;
}

export default function CaseStudyDetail({ slug }: Props) {
  const cs = caseStudies.find((c) => c.slug === slug);

  if (!cs) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg text-text-primary">
        <div className="text-center space-y-4">
          <p className="text-4xl font-light opacity-30">404</p>
          <p className="text-text-muted">Case study not found.</p>
          <a href="/resources/case-studies" className="inline-flex items-center gap-2 text-sm text-primary hover:underline mt-4">
            <ArrowLeft className="w-4 h-4" /> Back to Case Studies
          </a>
        </div>
      </div>
    );
  }

  const Icon = cs.icon;
  const currentIndex = caseStudies.findIndex((c) => c.slug === slug);
  const prev = currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
  const next = currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null;

  return (
    <div className="bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans">
      {/* Ambient orb */}
      <div
        className="absolute right-[-10%] top-[5%] w-[50vw] h-[50vw] rounded-full blur-[150px] pointer-events-none z-0 opacity-20"
        style={{ background: `radial-gradient(circle, ${cs.accentColor}, transparent)` }}
      />

      {/* ── HERO ── */}
      <section className="px-6 md:px-12 lg:px-24 pt-40 pb-10 relative z-10 max-w-5xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-text-muted font-mono mb-8" variants={staggerItem}>
            <a href="/resources/case-studies" className="hover:text-primary transition-colors">Case Studies</a>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text-secondary truncate max-w-[200px]">{cs.client}</span>
          </nav>

          {/* Back link */}
          <a
            href="/resources/case-studies"
            className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-primary transition-colors mb-8 group"
            variants={staggerItem}
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            All Case Studies
          </a>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3" variants={staggerItem}>
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{ background: `${cs.accentColor}18`, border: `1px solid ${cs.accentColor}30` }}
              >
                <Icon className="w-5 h-5" style={{ color: cs.accentColor }} />
              </div>
              <div className="flex flex-wrap gap-2">
                {cs.category.map((cat) => (
                  <span
                    key={cat}
                    className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border"
                    style={{ color: cs.accentColor, borderColor: `${cs.accentColor}40`, background: `${cs.accentColor}10` }}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-text-primary leading-[1.1] text-left">
              {cs.title}
            </h1>

            {/* Client & industry */}
            <div className="flex flex-wrap gap-6 text-sm text-text-secondary">
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4" style={{ color: cs.accentColor }} />
                <strong className="text-text-primary">{cs.client}</strong>
              </span>
              <span className="flex items-center gap-2">
                <Tag className="w-4 h-4" style={{ color: cs.accentColor }} />
                {cs.industry}
              </span>
            </div>

            {/* Key metrics strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-6 border-t border-b border-border/30">
              {cs.metrics.map((m) => (
                <div key={m.label} className="text-center sm:text-left">
                  <p className="text-2xl sm:text-3xl font-bold" style={{ color: cs.accentColor }}>{m.value}</p>
                  <p className="text-xs text-text-muted mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── BODY ── */}
      <section className="px-6 md:px-12 lg:px-24 pb-16 relative z-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Main content */}
          <div className="lg:col-span-8 space-y-2 text-left">

            {/* Challenge */}
            <div className="p-6 rounded-2xl border border-border bg-surface/40 backdrop-blur-sm mb-10">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary block mb-3">The Challenge</span>
              <p className="text-sm text-text-secondary leading-relaxed">{cs.challenge}</p>
            </div>

            {/* Solution */}
            <div className="p-6 rounded-2xl border mb-10" style={{ borderColor: `${cs.accentColor}30`, background: `${cs.accentColor}06` }}>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest block mb-3" style={{ color: cs.accentColor }}>Our Solution</span>
              <p className="text-sm text-text-secondary leading-relaxed">{cs.solution}</p>
            </div>

            {/* Article sections */}
            <div className="space-y-6">
              {cs.sections.map((section, i) => (
                <SectionRenderer key={i} section={section} accentColor={cs.accentColor} />
              ))}
            </div>

            {/* Outcome */}
            <div className="mt-10 p-8 rounded-2xl border border-primary/20 bg-primary/5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary block mb-2">Outcome</span>
                  <p className="text-sm text-text-secondary leading-relaxed">{cs.outcome}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6 text-left">
            {/* Technologies */}
            <div className="sticky top-[88px] space-y-6">
              <div className="p-6 rounded-2xl border border-border bg-surface/40 backdrop-blur-sm">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-muted block mb-4">Technologies Used</span>
                <div className="flex flex-wrap gap-2">
                  {cs.technologies.map((tech) => (
                    <span key={tech} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-surface-elevated border border-border text-text-secondary">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* All metrics */}
              <div className="p-6 rounded-2xl border border-border bg-surface/40 backdrop-blur-sm">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-muted block mb-4">Key Results</span>
                <div className="space-y-4">
                  {cs.metrics.map((m) => (
                    <div key={m.label} className="flex items-center justify-between">
                      <span className="text-xs text-text-muted">{m.label}</span>
                      <span className="text-sm font-bold" style={{ color: cs.accentColor }}>{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5">
                <p className="text-sm font-semibold text-text-primary mb-2">Want similar results?</p>
                <p className="text-xs text-text-muted mb-4">Let's discuss your analytics challenges and build a strategy together.</p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs w-full justify-center transition-all shadow-lg shadow-primary/20"
                >
                  Book a consultation
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PREV / NEXT ── */}
      <section className="px-6 md:px-12 lg:px-24 py-12 border-t border-border/20 relative z-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prev ? (
            <a
              href={`/resources/case-studies/${prev.slug}`}
              className="p-5 rounded-2xl border border-border bg-surface/40 hover:border-primary/40 transition-all group text-left"
            >
              <div className="flex items-center gap-2 text-[10px] text-text-muted font-mono uppercase tracking-widest mb-2">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Previous
              </div>
              <p className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors line-clamp-2">{prev.title}</p>
            </a>
          ) : <div />}

          {next ? (
            <a
              href={`/resources/case-studies/${next.slug}`}
              className="p-5 rounded-2xl border border-border bg-surface/40 hover:border-primary/40 transition-all group text-right"
            >
              <div className="flex items-center gap-2 text-[10px] text-text-muted font-mono uppercase tracking-widest mb-2 justify-end">
                Next <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors line-clamp-2">{next.title}</p>
            </a>
          ) : <div />}
        </div>
      </section>
    </div>
  );
}

/* ── Section renderer ── */
function SectionRenderer({ section, accentColor }: { section: Section; accentColor: string; key?: any }) {
  switch (section.type) {
    case "h2":
      return (
        <motion.h2
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          className="text-xl sm:text-2xl font-light tracking-tight text-text-primary pt-4"
        >
          {section.content}
        </motion.h2>
      );
    case "h3":
      return (
        <motion.h3
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          className="text-base sm:text-lg font-semibold text-text-primary pt-2"
        >
          {section.content}
        </motion.h3>
      );
    case "p":
      return (
        <motion.p
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          className="text-sm text-text-secondary leading-relaxed"
        >
          {section.content}
        </motion.p>
      );
    case "ul":
      return (
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          {section.items?.map((item, i) => (
            <motion.li
              key={i}
              variants={staggerItem}
              className="flex items-start gap-3 text-sm text-text-secondary"
            >
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: accentColor }} />
              <span className="leading-relaxed">{item}</span>
            </motion.li>
          ))}
        </motion.ul>
      );
    case "ol":
      return (
        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          {section.items?.map((item, i) => (
            <motion.li
              key={i}
              variants={staggerItem}
              className="flex items-start gap-3 text-sm text-text-secondary"
            >
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                style={{ background: `${accentColor}18`, color: accentColor }}
              >
                {i + 1}
              </span>
              <span className="leading-relaxed">{item}</span>
            </motion.li>
          ))}
        </motion.ol>
      );
    case "quote":
      return (
        <motion.blockquote
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          className="relative pl-5 border-l-2 py-2"
          style={{ borderColor: accentColor }}
        >
          <Quote className="w-5 h-5 opacity-30 mb-2" style={{ color: accentColor }} />
          <p className="text-sm italic text-text-secondary leading-relaxed">{section.content}</p>
        </motion.blockquote>
      );
    case "callout":
      return (
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          className="flex items-start gap-3 p-5 rounded-xl border"
          style={{ borderColor: `${accentColor}30`, background: `${accentColor}08` }}
        >
          <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: accentColor }} />
          <p className="text-sm leading-relaxed" style={{ color: accentColor }}>{section.content}</p>
        </motion.div>
      );
    case "metrics-grid":
      return (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4"
        >
          {section.metrics?.map((m) => (
            <motion.div
              key={m.label}
              variants={staggerItem}
              className="p-4 rounded-xl bg-surface-elevated border border-border text-center"
            >
              <p className="text-xl font-bold" style={{ color: accentColor }}>{m.value}</p>
              <p className="text-[10px] text-text-muted mt-1 leading-tight">{m.label}</p>
            </motion.div>
          ))}
        </motion.div>
      );
    default:
      return null;
  }
}
