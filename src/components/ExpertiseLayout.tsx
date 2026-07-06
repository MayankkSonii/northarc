import React from "react";
import { motion } from "motion/react";
import { ArrowRight, ArrowDown, Check, Quote } from "lucide-react";
import { AnimatedHeroVisual } from "./AnimatedHeroVisual";
import type { PageContent } from "./pageLayoutTypes";
import {
  staggerContainer,
  staggerItem,
  fadeUpVariant,
  slideLeftVariant,
  timelineItemVariant,
  fadeInVariant,
  viewportSoft,
  viewportOnce,
} from "../lib/animations";

/**
 * ExpertiseLayout, "editorial capability dossier".
 *
 * Deliberately distinct from ServiceLayout:
 *  - HERO: asymmetric split (text left, AnimatedHeroVisual right, accent orb top-right)
 *  - DOMAINS: sticky editorial title left + hairline card grid right
 *  - PROCESS: vertical timeline with numbered accent nodes sliding in from the left
 *  - PROOF: checklist left + accent-tinted quote/stat card right
 *  - CTA: centered accent-tinted band
 *
 * Renders the whole page body from the outer bg-bg wrapper downward.
 * SEO lives in the page, never here. ctaHref is always "/contact".
 */
export default function ExpertiseLayout({ content }: { content: PageContent }) {
  const accent = content.accent;
  const HeroIcon = content.heroIcon;

  return (
    <div className="bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans text-left">
      {/* Soft accent orb, top-right */}
      <div
        className="pointer-events-none absolute right-[-12%] top-[-8%] w-[46vw] h-[46vw] rounded-full blur-[140px] z-0"
        style={{ backgroundColor: `${accent}1f` }}
      />
      <div className="pointer-events-none absolute left-[-10%] bottom-[10%] w-[38vw] h-[38vw] rounded-full bg-secondary/5 blur-[130px] z-0" />

      {/* 1. HERO, asymmetric split */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 space-y-8"
          >
            <motion.span
              variants={staggerItem}
              className="block text-xs font-bold uppercase tracking-widest font-mono"
              style={{ color: accent }}
            >
              {content.eyebrow}
            </motion.span>
            <motion.h1
              variants={staggerItem}
              className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.08] text-text-primary"
            >
              {content.title}
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="text-sm sm:text-base text-text-secondary font-light max-w-xl leading-relaxed"
            >
              {content.intro}
            </motion.p>
            <motion.div variants={staggerItem} className="pt-2">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 border border-border/30 text-text-primary hover:bg-surface hover:border-border rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-300 group"
              >
                <span>Start a conversation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
            <motion.div
              variants={staggerItem}
              className="flex items-center gap-3 text-xs text-text-secondary font-light font-mono opacity-80 pt-6"
            >
              <div className="w-8 h-8 rounded-full border border-border/20 flex items-center justify-center animate-bounce">
                <ArrowDown className="w-3.5 h-3.5" />
              </div>
              <span>Scroll to explore the dossier</span>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-6">
            <AnimatedHeroVisual
              icon={HeroIcon}
              title={content.heroTitle}
              eyebrow={content.eyebrow}
              scene={content.heroScene as never}
              accentColor={accent}
            />
          </div>
        </div>
      </section>

      {/* 2. DOMAINS, sticky editorial title + hairline card grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 lg:py-24 border-t border-border/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-text-primary">
                {content.capsTitle}
              </h2>
              <p className="text-sm text-text-secondary font-light mt-4 leading-relaxed max-w-sm">
                {content.capsIntro}
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {content.capabilities.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSoft}
                  transition={{ delay: i * 0.08 }}
                  className="group rounded-2xl border border-border/15 bg-surface/30 p-6 space-y-4 transition-all duration-300 hover:-translate-y-1 hover:border-border/40"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${accent}1f`, color: accent }}
                  >
                    <Icon className="w-5 h-5" style={{ color: accent }} />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-text-secondary font-light leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. PROCESS, vertical timeline (signature) */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 lg:py-24 border-t border-border/10">
        <div className="max-w-2xl mb-14">
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-text-primary">
            {content.processTitle}
          </h2>
          <p className="text-sm text-text-secondary font-light mt-3 leading-relaxed">
            {content.processIntro}
          </p>
        </div>

        <div className="relative pl-10 md:pl-14 max-w-3xl">
          {/* vertical hairline */}
          <div
            className="absolute left-[15px] md:left-[19px] top-2 bottom-2 w-px"
            style={{ backgroundColor: `${accent}33` }}
          />
          <div className="space-y-10">
            {content.process.map((step, i) => (
              <motion.div
                key={i}
                variants={timelineItemVariant}
                initial="hidden"
                whileInView="visible"
                viewport={viewportSoft}
                className="relative"
              >
                {/* numbered node */}
                <div
                  className="absolute -left-10 md:-left-14 top-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-[10px] md:text-xs font-mono font-bold border"
                  style={{
                    backgroundColor: `${accent}18`,
                    borderColor: `${accent}55`,
                    color: accent,
                  }}
                >
                  {step.num}
                </div>
                <h4 className="text-lg font-bold text-text-primary">{step.title}</h4>
                <p className="text-xs sm:text-sm text-text-secondary font-light leading-relaxed mt-2 max-w-xl">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROOF, checklist + accent-tinted quote/stat card */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 lg:py-24 border-t border-border/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            variants={slideLeftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:col-span-6 space-y-6"
          >
            <h2 className="text-3xl font-light tracking-tight text-text-primary">
              {content.proofTitle}
            </h2>
            <p className="text-sm text-text-secondary font-light leading-relaxed max-w-lg">
              {content.proofIntro}
            </p>
            <div className="space-y-4">
              {content.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <div
                    className="p-1 rounded mt-0.5 shrink-0"
                    style={{ backgroundColor: `${accent}26`, color: accent }}
                  >
                    <Check className="w-3.5 h-3.5" style={{ color: accent }} />
                  </div>
                  <span className="text-text-secondary font-light leading-relaxed">{h}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:col-span-6 flex justify-center lg:justify-end"
          >
            <div
              className="max-w-md w-full rounded-3xl border p-8 space-y-5"
              style={{
                backgroundColor: `${accent}12`,
                borderColor: `${accent}33`,
              }}
            >
              <Quote className="w-8 h-8" style={{ color: accent }} />
              <p className="text-lg font-light leading-relaxed text-text-primary">
                {content.proofIntro}
              </p>
              <div className="pt-2 flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${accent}26`, color: accent }}
                >
                  <HeroIcon className="w-4 h-4" style={{ color: accent }} />
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-text-secondary">
                  {content.eyebrow}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. CTA, centered accent-tinted band */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-20 lg:py-28 border-t border-border/10">
        <motion.div
          variants={fadeInVariant}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="rounded-3xl border p-10 md:p-16 text-center space-y-6"
          style={{
            backgroundColor: `${accent}12`,
            borderColor: `${accent}33`,
          }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-text-primary max-w-2xl mx-auto">
            {content.ctaTitle}
          </h2>
          <p className="text-sm text-text-secondary font-light max-w-xl mx-auto leading-relaxed">
            {content.ctaIntro}
          </p>
          <div className="pt-2">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border text-text-primary rounded-full px-9 py-4 text-sm font-semibold transition-all duration-300 group"
              style={{ backgroundColor: accent, borderColor: accent }}
            >
              <span>{content.ctaLabel}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
