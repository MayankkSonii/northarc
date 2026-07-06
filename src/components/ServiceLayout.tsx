import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import {
  staggerContainer,
  staggerItem,
  fadeUpVariant,
  slideUpSoft,
  slideLeftVariant,
  slideRightVariant,
  scaleInVariant,
  blurInVariant,
  viewportOnce,
  viewportSoft,
} from "../lib/animations";
import { AnimatedHeroVisual } from "./AnimatedHeroVisual";
import type { PageContent } from "./pageLayoutTypes";

/**
 * ServiceLayout, the "offering / delivery" design language.
 *
 * Deliberately the visual OPPOSITE of ExpertiseLayout (split hero + vertical
 * timeline + grid). Here the compositions are:
 *   1. Centered hero + full-width framed visual panel
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
      {/* Symmetric accent orbs, left + right, tinted with content.accent */}
      <div
        className="pointer-events-none absolute left-[-12%] top-[8%] z-0 h-[46vw] w-[46vw] rounded-full blur-[130px]"
        style={{ background: `${accent}1f` }}
      />
      <div
        className="pointer-events-none absolute right-[-12%] top-[8%] z-0 h-[46vw] w-[46vw] rounded-full blur-[130px]"
        style={{ background: `${accent}1a` }}
      />

      {/* ---------------------------------------------------------------- */}
      {/* 1. HERO, centered text, wide framed visual panel below          */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative z-10 px-6 pt-32 pb-16 md:px-12 lg:px-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={staggerItem}
            className="block font-mono text-xs font-bold uppercase tracking-widest"
            style={{ color: accent }}
          >
            {eyebrow}
          </motion.span>
          <motion.h1
            variants={staggerItem}
            className="mt-6 text-4xl font-light leading-[1.08] tracking-tight text-text-primary sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>
          <motion.p
            variants={staggerItem}
            className="mx-auto mt-6 max-w-2xl text-sm font-light leading-relaxed text-text-secondary sm:text-base"
          >
            {intro}
          </motion.p>
          <motion.div variants={staggerItem} className="mt-8">
            <a
              href={ctaHref}
              className="group inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-text-primary shadow-glow transition-all duration-300"
              style={{ background: accent }}
            >
              <span>Get in touch</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </motion.div>

        {/* Wide framed visual panel, full width, bordered rounded-3xl */}
        <motion.div
          variants={scaleInVariant}
          initial="hidden"
          animate="visible"
          className="relative mx-auto mt-16 max-w-6xl overflow-hidden rounded-3xl border border-border/20 bg-surface/40 backdrop-blur-sm"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{ background: `radial-gradient(circle at 50% 40%, ${accent}14, transparent 70%)` }}
          />
          <div className="relative flex min-h-[360px] items-center justify-center px-6 py-10">
            <AnimatedHeroVisual
              icon={heroIcon}
              title={heroTitle}
              eyebrow={eyebrow}
              scene={scene}
              accentColor={accent}
            />
            {/* Mobile fallback (AnimatedHeroVisual is lg:block only) */}
            <div className="flex flex-col items-center gap-4 text-center lg:hidden">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-2xl border"
                style={{ borderColor: `${accent}55`, background: `${accent}18` }}
              >
                {React.createElement(heroIcon, { className: "h-9 w-9", style: { color: accent } })}
              </div>
              <p className="text-sm font-semibold text-text-primary">{heroTitle}</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 2. OFFERINGS, zig-zag alternating rows (signature difference)   */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative z-10 border-t border-border/10 px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={slideUpSoft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSoft}
            className="max-w-2xl"
          >
            <h2 className="text-2xl font-light tracking-tight sm:text-3xl">{capsTitle}</h2>
            <p className="mt-4 text-sm font-light leading-relaxed text-text-secondary">{capsIntro}</p>
          </motion.div>

          <div className="mt-16 space-y-16 md:space-y-24">
            {capabilities.map((item, i) => {
              const Icon = item.icon;
              const reversed = i % 2 === 1;
              // Even rows slide in from the left, odd (reversed) from the right.
              const textVariant = reversed ? slideRightVariant : slideLeftVariant;
              const visualVariant = reversed ? slideLeftVariant : slideRightVariant;
              return (
                <div
                  key={i}
                  className={`grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16 ${
                    reversed ? "md:[direction:rtl]" : ""
                  }`}
                >
                  {/* Text column */}
                  <motion.div
                    variants={textVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportSoft}
                    className="space-y-5 md:[direction:ltr]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold" style={{ color: accent }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px flex-1 max-w-[64px]" style={{ background: `${accent}55` }} />
                    </div>
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ background: `${accent}1a`, color: accent }}
                    >
                      <Icon className="h-6 w-6" style={{ color: accent }} />
                    </div>
                    <h3 className="text-xl font-bold text-text-primary sm:text-2xl">{item.title}</h3>
                    <p className="text-sm font-light leading-relaxed text-text-secondary">{item.desc}</p>
                  </motion.div>

                  {/* Visual column, abstract framed panel */}
                  <motion.div
                    variants={visualVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportSoft}
                    className="md:[direction:ltr]"
                  >
                    <div className="relative overflow-hidden rounded-3xl border border-border/15 bg-surface/40 p-8">
                      <div
                        className="pointer-events-none absolute inset-0 opacity-70"
                        style={{ background: `radial-gradient(circle at 30% 20%, ${accent}18, transparent 65%)` }}
                      />
                      <div className="relative flex items-center justify-center">
                        <div
                          className="flex h-24 w-24 items-center justify-center rounded-2xl border"
                          style={{ borderColor: `${accent}44`, background: `${accent}12` }}
                        >
                          <Icon className="h-11 w-11" style={{ color: accent }} />
                        </div>
                      </div>
                      <div className="relative mt-6 space-y-2.5">
                        <div className="h-2 rounded-full bg-border/50" />
                        <div className="h-2 w-4/5 rounded-full bg-border/35" />
                        <div className="h-2 w-3/5 rounded-full" style={{ background: `${accent}55` }} />
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 3. PROCESS, horizontal numbered step flow with connectors       */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative z-10 border-t border-border/10 px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={slideUpSoft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSoft}
            className="max-w-2xl"
          >
            <h2 className="text-2xl font-light tracking-tight sm:text-3xl">{processTitle}</h2>
            <p className="mt-4 text-sm font-light leading-relaxed text-text-secondary">{processIntro}</p>
          </motion.div>

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
                  {/* Connector line + arrow to next card (desktop only) */}
                  {!isLast && (
                    <div className="absolute right-[-1.35rem] top-8 z-20 hidden items-center md:flex">
                      <span className="h-px w-8" style={{ background: `${accent}55` }} />
                      <ArrowRight className="h-3.5 w-3.5" style={{ color: accent }} />
                    </div>
                  )}
                  <div className="relative h-full rounded-2xl border border-border/15 bg-surface/40 p-7">
                    <span
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full font-mono text-sm font-bold"
                      style={{ background: `${accent}1a`, color: accent }}
                    >
                      {step.num}
                    </span>
                    <h4 className="mt-5 text-lg font-bold text-text-primary">{step.title}</h4>
                    <p className="mt-3 text-sm font-light leading-relaxed text-text-secondary">
                      {step.desc}
                    </p>
                  </div>
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
          <motion.div
            variants={slideLeftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSoft}
            className="space-y-6"
          >
            <h2 className="text-2xl font-light tracking-tight sm:text-3xl">{proofTitle}</h2>
            <p className="text-sm font-light leading-relaxed text-text-secondary">{proofIntro}</p>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="space-y-4 pt-2"
            >
              {highlights.map((h, i) => (
                <motion.div key={i} variants={fadeUpVariant} className="flex items-start gap-3 text-sm">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded"
                    style={{ background: `${accent}26`, color: accent }}
                  >
                    <Check className="h-3.5 w-3.5" style={{ color: accent }} />
                  </span>
                  <span className="font-light leading-relaxed text-text-secondary">{h}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Prominent gradient CTA card */}
          <motion.div
            variants={blurInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSoft}
            className="relative overflow-hidden rounded-3xl border p-10 text-center"
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
              <a
                href={ctaHref}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold text-text-primary shadow-glow transition-all duration-300"
                style={{ background: accent }}
              >
                <span>{ctaLabel}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
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
        <motion.div
          variants={slideUpSoft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSoft}
          className="relative mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-light tracking-tight sm:text-4xl">{ctaTitle}</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm font-light leading-relaxed text-text-secondary">
            {ctaIntro}
          </p>
          <div className="mt-8">
            <a
              href={ctaHref}
              className="group inline-flex items-center gap-2 rounded-full px-9 py-4 text-sm font-semibold text-text-primary shadow-glow transition-all duration-300"
              style={{ background: accent }}
            >
              <span>{ctaLabel}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
