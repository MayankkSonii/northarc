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
  lineDrawVerticalVariant,
  makeStagger,
} from "../lib/animations";
import AnimatedText from "./animations/AnimatedText";
import ScrollReveal from "./animations/ScrollReveal";

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
      {/* Soft accent orb, top-right — drifting animation */}
      <div
        className="pointer-events-none absolute right-[-12%] top-[-8%] w-[46vw] h-[46vw] rounded-full z-0 animate-orb-drift"
        style={{ background: `radial-gradient(circle, ${accent}1c 0%, transparent 70%)` }}
      />
      <div 
        className="pointer-events-none absolute left-[-10%] bottom-[10%] w-[38vw] h-[38vw] rounded-full z-0 animate-float-delay"
        style={{ background: "radial-gradient(circle, rgba(77,166,255,0.04) 0%, transparent 70%)" }}
      />

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
            <motion.div variants={staggerItem}>
              <AnimatedText
                text={content.title}
                as="h1"
                type="words"
                animateOnMount
                delay={0.15}
                className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.08] text-text-primary"
              />
            </motion.div>
            <motion.p
              variants={staggerItem}
              className="text-sm sm:text-base text-text-secondary font-light max-w-xl leading-relaxed"
            >
              {content.intro}
            </motion.p>
            <motion.div variants={staggerItem} className="pt-2">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                className="inline-flex items-center gap-2 border border-border/30 text-text-primary hover:bg-surface hover:border-border rounded-full px-8 py-3.5 text-sm font-semibold transition-colors duration-300 group"
              >
                <span>Start a conversation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
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
            <ScrollReveal variant="fadeUp" className="lg:sticky lg:top-28">
              <AnimatedText
                text={content.capsTitle}
                as="h2"
                type="words"
                className="text-2xl sm:text-3xl font-light tracking-tight text-text-primary"
              />
              <ScrollReveal variant="fadeUp" delay={0.2}>
                <p className="text-sm text-text-secondary font-light mt-4 leading-relaxed max-w-sm">
                  {content.capsIntro}
                </p>
              </ScrollReveal>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {content.capabilities.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.97 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSoft}
                  whileHover={{ y: -6, scale: 1.015 }}
                  transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
                  className="group rounded-2xl border border-border/15 bg-surface/30 p-6 space-y-4 transition-colors duration-300 hover:border-primary/40 cursor-default"
                >
                  <motion.div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${accent}1f`, color: accent }}
                    whileHover={{ rotate: 15, scale: 1.1 }}
                  >
                    <Icon className="w-5 h-5" style={{ color: accent }} />
                  </motion.div>
                  <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors duration-300">{item.title}</h3>
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
        <ScrollReveal variant="fadeUp" className="max-w-2xl mb-14">
          <AnimatedText
            text={content.processTitle}
            as="h2"
            type="words"
            className="text-2xl sm:text-3xl font-light tracking-tight text-text-primary"
          />
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="text-sm text-text-secondary font-light mt-3 leading-relaxed">
              {content.processIntro}
            </p>
          </ScrollReveal>
        </ScrollReveal>

        <div className="relative pl-10 md:pl-14 max-w-3xl">
          {/* vertical hairline — animated scaleY */}
          <motion.div
            className="absolute left-[15px] md:left-[19px] top-2 bottom-2 w-px origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-10px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            style={{ backgroundColor: `${accent}4d` }}
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
                <motion.div
                  className="absolute -left-10 md:-left-14 top-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-[10px] md:text-xs font-mono font-bold border"
                  style={{
                    backgroundColor: `${accent}18`,
                    borderColor: `${accent}55`,
                    color: accent,
                  }}
                  whileHover={{ scale: 1.15, rotate: 360 }}
                  transition={{ duration: 0.4 }}
                >
                  {step.num}
                </motion.div>
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
          <div className="lg:col-span-6 space-y-6">
            <AnimatedText
              text={content.proofTitle}
              as="h2"
              type="words"
              className="text-3xl font-light tracking-tight text-text-primary"
            />
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <p className="text-sm text-text-secondary font-light leading-relaxed max-w-lg">
                {content.proofIntro}
              </p>
            </ScrollReveal>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="space-y-4"
            >
              {content.highlights.map((h, i) => (
                <motion.div key={i} variants={staggerItem} className="flex items-start gap-3 text-sm">
                  <motion.div
                    className="p-1 rounded mt-0.5 shrink-0"
                    style={{ backgroundColor: `${accent}26`, color: accent }}
                    whileInView={{ scale: [0.6, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                  >
                    <Check className="w-3.5 h-3.5" style={{ color: accent }} />
                  </motion.div>
                  <span className="text-text-secondary font-light leading-relaxed">{h}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            whileHover={{ y: -6, scale: 1.015 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="lg:col-span-6 flex justify-center lg:justify-end cursor-default"
          >
            <div
              className="max-w-md w-full rounded-3xl border p-8 space-y-5 shadow-lg transition-colors duration-300 hover:border-primary/30"
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
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl border p-10 md:p-16 text-center space-y-6 shadow-xl transition-all duration-300 hover:border-primary/45 cursor-default"
          style={{
            backgroundColor: `${accent}12`,
            borderColor: `${accent}33`,
          }}
        >
          <AnimatedText
            text={content.ctaTitle}
            as="h2"
            type="words"
            className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-text-primary max-w-2xl mx-auto"
          />
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="text-sm text-text-secondary font-light max-w-xl mx-auto leading-relaxed">
              {content.ctaIntro}
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.35}>
            <div className="pt-2">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                className="inline-flex items-center justify-center gap-2 border text-text-primary rounded-full px-9 py-4 text-sm font-semibold transition-colors duration-300 group"
                style={{ backgroundColor: accent, borderColor: accent }}
              >
                <span>{content.ctaLabel}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>
          </ScrollReveal>
        </motion.div>
      </section>
    </div>
  );
}
