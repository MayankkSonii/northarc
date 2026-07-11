import React from "react";
import { motion } from "motion/react";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import {
  staggerContainer,
  staggerItem,
  blurInVariant,
  viewportOnce,
  viewportSoft,
} from "../lib/animations";
import { AnimatedHeroVisual } from "./AnimatedHeroVisual";
import type { PageContent } from "./pageLayoutTypes";
import AnimatedText from "./animations/AnimatedText";
import ScrollReveal from "./animations/ScrollReveal";

/**
 * ServiceLayout, the "offering / delivery" design language.
 *
 * Follows ExpertiseLayout's asymmetric hero language while keeping distinct
 * service-page body compositions:
 *   1. Asymmetric split hero matching ExpertiseLayout
 *   2. Zig-zag alternating offering rows (the signature difference)
 *   3. Horizontal numbered step flow with connectors
 *   4. Benefits band + prominent gradient CTA card
 *   5. Full-width accent gradient CTA band
 *
 * Motion is premium & subtle throughout (soft fades, gentle springs, small
 * offsets), matching the shared variants in ../lib/animations.
 */

const ctaHref = "/contact";

export default function ServiceLayout({ content }: { content: PageContent }) {
  const {
    eyebrow,
    title,
    intro,
    heroIcon,
    heroScene,
    heroTitle,
    accent,
    capsTitle,
    capsIntro,
    capabilities,
    processTitle,
    processIntro,
    process,
    proofTitle,
    proofIntro,
    highlights,
    ctaTitle,
    ctaIntro,
    ctaLabel,
  } = content;

  // AnimatedHeroVisual's Scene type is a union; content.heroScene is a string
  // by contract, so cast at the boundary (unknown scenes fall back to default).
  const scene = heroScene as React.ComponentProps<typeof AnimatedHeroVisual>["scene"];

  return (
    <div className="bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans">
      {/* Ambient accent orbs */}
      <div
        className="pointer-events-none absolute left-[-12%] top-[8%] z-0 h-[46vw] w-[46vw] rounded-full animate-orb-drift"
        style={{ background: `radial-gradient(circle, ${accent}1c 0%, transparent 70%)` }}
      />
      <div
        className="pointer-events-none absolute right-[-12%] top-[8%] z-0 h-[46vw] w-[46vw] rounded-full animate-float-delay"
        style={{ background: `radial-gradient(circle, ${accent}15 0%, transparent 70%)` }}
      />

      {/* ---------------------------------------------------------------- */}
      {/* 1. HERO, asymmetric split matching Expertise pages              */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-14 md:px-12 md:pt-28 lg:px-24 lg:pt-32 lg:pb-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8 text-left lg:col-span-6"
        >
          <motion.span
            variants={staggerItem}
            className="block font-mono text-xs font-bold uppercase tracking-widest"
            style={{ color: accent }}
          >
            {eyebrow}
          </motion.span>
          <motion.div variants={staggerItem}>
            <AnimatedText
              text={title}
              as="h1"
              type="words"
              animateOnMount
              delay={0.15}
              className="text-4xl font-light leading-[1.08] tracking-tight text-text-primary sm:text-5xl lg:text-6xl"
            />
          </motion.div>
          <motion.p
            variants={staggerItem}
            className="max-w-xl text-sm font-light leading-relaxed text-text-secondary sm:text-base"
          >
            {intro}
          </motion.p>
          <motion.div variants={staggerItem} className="pt-2">
            <motion.a
              href={ctaHref}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
              className="group inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-text-primary shadow-glow transition-colors duration-300"
              style={{ background: accent }}
            >
              <span>Get in touch</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </motion.div>
          <motion.div
            variants={staggerItem}
            className="flex items-center gap-3 text-xs text-text-secondary font-light font-mono opacity-80 pt-4"
          >
            <div className="w-8 h-8 rounded-full border border-border/20 flex items-center justify-center">
              <ArrowDown className="w-3.5 h-3.5" />
            </div>
            <span>Scroll to explore the service</span>
          </motion.div>
        </motion.div>

        <div className="lg:col-span-6">
            <AnimatedHeroVisual
              icon={heroIcon}
              title={heroTitle}
              eyebrow={eyebrow}
              scene={scene}
              accentColor={accent}
            />
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.24, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto mt-4 flex min-h-[220px] max-w-md flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl border border-border/20 bg-surface/40 p-8 text-center backdrop-blur-sm lg:hidden"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{ background: `radial-gradient(circle at 50% 40%, ${accent}14, transparent 70%)` }}
            />
            <div className="relative flex flex-col items-center gap-4">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-2xl border"
                style={{ borderColor: `${accent}55`, background: `${accent}18` }}
              >
                {React.createElement(heroIcon, { className: "h-9 w-9", style: { color: accent } })}
              </div>
              <p className="text-sm font-semibold text-text-primary">{heroTitle}</p>
            </div>
          </motion.div>
        </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 2. OFFERINGS                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative z-10 border-t border-border/10 px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal variant="fadeUp" className="max-w-2xl">
            <AnimatedText
              text={capsTitle}
              as="h2"
              type="words"
              className="text-2xl font-light tracking-tight sm:text-3xl"
            />
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <p className="mt-4 text-sm font-light leading-relaxed text-text-secondary">{capsIntro}</p>
            </ScrollReveal>
          </ScrollReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSoft}
            className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2"
          >
            {capabilities.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
                  className="group rounded-2xl border border-border/15 bg-surface/40 p-6 transition-colors duration-300 hover:border-primary/30"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
                      style={{ borderColor: `${accent}35`, background: `${accent}14` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: accent }} />
                    </div>
                    <div>
                      <div className="mb-3 font-mono text-xs font-bold" style={{ color: accent }}>
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className="text-lg font-bold text-text-primary">{item.title}</h3>
                      <p className="mt-3 text-sm font-light leading-relaxed text-text-secondary">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 3. PROCESS, horizontal numbered step flow with connectors       */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative z-10 border-t border-border/10 px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal variant="fadeUp" className="max-w-2xl">
            <AnimatedText
              text={processTitle}
              as="h2"
              type="words"
              className="text-2xl font-light tracking-tight sm:text-3xl"
            />
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <p className="mt-4 text-sm font-light leading-relaxed text-text-secondary">{processIntro}</p>
            </ScrollReveal>
          </ScrollReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSoft}
            className="relative mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {process.map((step, i) => {
              const isLast = i === process.length - 1;
              return (
                <motion.div key={i} variants={staggerItem} className="relative">
                  {/* Connector line + arrow to next card (desktop only) - animated */}
                  {!isLast && (
                    <div className="absolute right-[-1.35rem] top-8 z-20 hidden items-center md:flex w-8 overflow-hidden">
                      <motion.span
                        className="h-px bg-border/40 origin-left block w-8"
                        style={{ background: `${accent}55` }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.15 + 0.3 }}
                      />
                      <motion.div
                        initial={{ opacity: 0, x: -5 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.15 + 0.9 }}
                      >
                        <ArrowRight className="h-3.5 w-3.5" style={{ color: accent }} />
                      </motion.div>
                    </div>
                  )}
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
                    className="relative h-full rounded-2xl border border-border/15 bg-surface/40 p-7 hover:border-primary/30 transition-colors duration-300 cursor-default"
                  >
                    <motion.span
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full font-mono text-sm font-bold"
                      style={{ background: `${accent}1a`, color: accent }}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {step.num}
                    </motion.span>
                    <h4 className="mt-5 text-lg font-bold text-text-primary">{step.title}</h4>
                    <p className="mt-3 text-sm font-light leading-relaxed text-text-secondary">
                      {step.desc}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 4. PROOF, benefits band + prominent gradient CTA card           */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative z-10 border-t border-border/10 px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Benefits band */}
          <div className="space-y-6">
            <AnimatedText
              text={proofTitle}
              as="h2"
              type="words"
              className="text-2xl font-light tracking-tight sm:text-3xl"
            />
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <p className="text-sm font-light leading-relaxed text-text-secondary">{proofIntro}</p>
            </ScrollReveal>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="space-y-4 pt-2"
            >
              {highlights.map((h, i) => (
                <motion.div key={i} variants={staggerItem} className="flex items-start gap-3 text-sm">
                  <motion.span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded"
                    style={{ background: `${accent}26`, color: accent }}
                    whileInView={{ scale: [0.6, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                  >
                    <Check className="h-3.5 w-3.5" style={{ color: accent }} />
                  </motion.span>
                  <span className="font-light leading-relaxed text-text-secondary">{h}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Prominent gradient CTA card */}
          <motion.div
            variants={blurInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSoft}
            whileHover={{ scale: 1.015, translateY: -4 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative overflow-hidden rounded-3xl border p-10 text-center cursor-default hover:border-primary/40 transition-all duration-300"
            style={{
              borderColor: `${accent}44`,
              background: `linear-gradient(140deg, ${accent}26, ${accent}0a 60%, transparent)`,
            }}
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl"
              style={{ background: `${accent}33` }}
            />
            <div className="relative space-y-6">
              <h3 className="text-2xl font-light tracking-tight text-text-primary">{ctaTitle}</h3>
              <p className="mx-auto max-w-sm text-sm font-light leading-relaxed text-text-secondary">
                {ctaIntro}
              </p>
              <motion.a
                href={ctaHref}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold text-text-primary shadow-glow transition-colors duration-300"
                style={{ background: accent }}
              >
                <span>{ctaLabel}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 5. FINAL CTA, full-width accent gradient band                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative z-10 overflow-hidden border-t border-border/10 px-6 py-24 md:px-12 lg:px-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: `linear-gradient(120deg, ${accent}1f, transparent 55%, ${accent}14)` }}
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <ScrollReveal variant="fadeUp" className="space-y-5">
            <AnimatedText
              text={ctaTitle}
              as="h2"
              type="words"
              className="text-3xl font-light tracking-tight sm:text-4xl"
            />
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <p className="mx-auto mt-5 max-w-xl text-sm font-light leading-relaxed text-text-secondary">
                {ctaIntro}
              </p>
            </ScrollReveal>
            <ScrollReveal variant="fadeUp" delay={0.35}>
              <div className="mt-8">
                <motion.a
                  href={ctaHref}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                  className="group inline-flex items-center gap-2 rounded-full px-9 py-4 text-sm font-semibold text-text-primary shadow-glow transition-colors duration-300"
                  style={{ background: accent }}
                >
                  <span>{ctaLabel}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.a>
              </div>
            </ScrollReveal>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
