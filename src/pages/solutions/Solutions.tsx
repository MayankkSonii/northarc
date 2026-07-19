import React from "react";
import { motion } from "motion/react";
import { staggerContainer, staggerItem, staggerDelay, viewportOnce } from "../../lib/animations";
import { AnimatedHeroVisual } from "../../components/AnimatedHeroVisual";
import { useSEO, breadcrumbJsonLd, SITE_URL } from "../../lib/seo";
import {
  ArrowRight,
  ArrowDown,
  Building2,
  Workflow,
  CheckCircle,
  Layers,
} from "lucide-react";
import { industries, functions, solutions } from "../../data/solutionsData";
import type { Solution } from "../../data/solutionsData";
import AnimatedText from "../../components/animations/AnimatedText";

function renderSolutionCard(s: Solution, index: number) {
  const Icon = s.icon;
  const keyOutcome = s.outcomes[0];
  return (
    <motion.a
      key={s.id}
      href={`/solutions/${s.slug}`}
      variants={staggerItem}
      transition={{ delay: index * (staggerDelay / 2) }}
      className="group relative flex flex-col rounded-2xl border bg-surface/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
      style={{ borderColor: "rgba(255,255,255,0.07)" }}
    >
      {/* Top accent bar */}
      <div
        className="h-[3px] w-full opacity-40 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${s.accentColor}, ${s.accentColor}40)` }}
      />
      {/* Hover radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${s.accentColor}10 0%, transparent 65%)` }}
      />

      <div className="p-6 flex flex-col gap-4 flex-grow relative">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${s.accentColor}18`, border: `1px solid ${s.accentColor}35` }}
        >
          <Icon className="w-5 h-5" style={{ color: s.accentColor }} />
        </div>

        <h3 className="text-base font-semibold leading-snug text-text-primary">{s.title}</h3>

        <p className="text-xs text-text-secondary leading-relaxed flex-grow">{s.tagline}</p>

        <div className="flex items-start gap-2 pt-3 border-t border-border/20">
          <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: s.accentColor }} />
          <p className="text-[11px] text-text-muted leading-snug">{keyOutcome}</p>
        </div>

        <div
          className="flex items-center gap-1.5 text-[11px] font-semibold mt-1 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0"
          style={{ color: s.accentColor }}
        >
          Explore solution
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.a>
  );
}

export default function Solutions() {
  useSEO({
    title: "AI Development Services | Industry & Business Solutions",
    description:
      "NorthArc provides custom AI development services for enterprises across industries — healthcare, finance, retail, manufacturing. AI automation solutions for businesses mapped to your industry and function, with generative AI development and machine learning solutions built for measurable outcomes.",
    path: "/solutions",
    keywords:
      "AI Development Services, AI Software Development, Machine Learning, Generative AI, AI Agents, Custom AI Development Services for Enterprises, AI Automation Solutions for Businesses, Generative AI Development Company, Machine Learning Development Company, Industry AI Solutions",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "NorthArc AI Solutions by Industry & Function",
        description:
          "AI and data science solutions tailored to specific industries and business functions, each designed around the business outcome it delivers.",
        numberOfItems: solutions.length,
        itemListElement: solutions.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: s.title,
          url: `${SITE_URL}/solutions/${s.slug}`,
        })),
      },
      breadcrumbJsonLd([{ name: "Solutions", path: "/solutions" }]),
    ],
  });

  return (
    <div className="bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans text-left">
      {/* Ambient background */}
      <div className="absolute left-[-10%] top-[5%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-tr from-primary/6 to-primary/10 blur-[150px] pointer-events-none z-0" />
      <div className="absolute right-[-12%] top-[45%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-secondary/5 to-glow/5 blur-[130px] pointer-events-none z-0" />

      {/* ── HERO ── */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-8 md:px-12 md:pt-28 md:pb-14 lg:px-24 lg:pt-32 lg:pb-20">
        <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-8">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6 text-left lg:col-span-6 lg:space-y-8">
          <motion.span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block" variants={staggerItem}>
            Solutions
          </motion.span>
          <motion.div variants={staggerItem}>
            <AnimatedText
              text="AI solutions for your industry and your team"
              as="h1"
              type="words"
              animateOnMount
              delay={0.04}
              className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-text-primary leading-[1.08]"
            />
          </motion.div>
          <motion.p className="max-w-xl text-sm sm:text-base text-text-secondary font-light leading-relaxed" variants={staggerItem}>
            We map production-ready AI to the problems you actually face, whether that's a whole industry's
            workflows or a single business function. Every solution is designed around the outcome it delivers,
            not the model behind it.
          </motion.p>
          <motion.div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs text-text-muted font-mono" variants={staggerItem}>
            <span className="flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-primary" />
              {industries.length} Industries
            </span>
            <span className="flex items-center gap-2">
              <Workflow className="w-3.5 h-3.5 text-primary" />
              {functions.length} Functions
            </span>
            <span className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-primary" />
              Outcome-led delivery
            </span>
          </motion.div>
          <motion.div
            variants={staggerItem}
            className="hidden items-center gap-3 text-xs text-text-secondary font-light font-mono opacity-80 pt-4 sm:flex"
          >
            <div className="w-8 h-8 rounded-full border border-border/20 flex items-center justify-center">
              <ArrowDown className="w-3.5 h-3.5" />
            </div>
            <span>Explore by industry or function</span>
          </motion.div>
        </motion.div>

        <div className="lg:col-span-6">
            <AnimatedHeroVisual icon={Layers} title="Tailored AI" eyebrow="Solutions map" scene="data" />
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.24, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
            className="hidden relative mx-auto mt-4 flex min-h-[220px] max-w-md flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl border border-border/20 bg-surface/40 p-8 text-center backdrop-blur-sm lg:hidden"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-70" />
            <div className="relative flex flex-col items-center gap-4 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
                <Layers className="h-9 w-9 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">Tailored AI solution map</p>
                <p className="mt-2 max-w-sm text-xs leading-relaxed text-text-secondary">
                  Industry, function, data, and workflow signals mapped into one delivery plan.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        </div>
      </section>

      {/* ── BY INDUSTRY ── */}
      <section className="px-6 md:px-12 lg:px-24 py-10 sm:py-14 border-t border-border/10 relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary font-mono">01</span>
          <span className="h-px w-8 bg-primary/40" />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-muted font-mono">By Industry</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-text-primary mb-3">
          Built for how your <span className="text-primary font-semibold">industry works</span>
        </h2>
        <p className="text-sm text-text-secondary font-light max-w-2xl mb-7 sm:mb-10 leading-relaxed">
          AI tuned to the data, workflows, and compliance realities of your sector, from patient risk in
          healthcare to demand planning in manufacturing.
        </p>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {industries.map((s, i) => renderSolutionCard(s, i))}
        </motion.div>
      </section>

      {/* ── BY BUSINESS FUNCTION ── */}
      <section className="px-6 md:px-12 lg:px-24 py-10 sm:py-14 border-t border-border/10 relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary font-mono">02</span>
          <span className="h-px w-8 bg-primary/40" />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-muted font-mono">By Business Function</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-text-primary mb-3">
          Built for what your <span className="text-primary font-semibold">team does</span>
        </h2>
        <p className="text-sm text-text-secondary font-light max-w-2xl mb-7 sm:mb-10 leading-relaxed">
          AI mapped to the functions that run your business, so sales, support, operations, finance, and HR
          each get the leverage that matters most to them.
        </p>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {functions.map((s, i) => renderSolutionCard(s, i))}
        </motion.div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="px-6 md:px-12 lg:px-24 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl border border-border/50 bg-surface/40 backdrop-blur-xl px-5 py-10 sm:px-16 sm:py-14 overflow-hidden text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-transparent to-secondary/6 pointer-events-none" />
            <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[40vw] h-[40vw] rounded-full bg-primary/8 blur-[100px] pointer-events-none" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold block mb-4">
              Let's Build
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-text-primary mb-4">
              Don't see your exact{" "}
              <span className="text-primary font-semibold">use case?</span>
            </h2>
            <p className="text-sm text-text-secondary max-w-xl mx-auto mb-8">
              Tell us the outcome you're after. We'll map the right AI solution, or tailor one, to your
              industry, data, systems and goals.
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
