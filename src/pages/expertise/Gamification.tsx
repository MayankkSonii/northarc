import React from "react";
import { motion } from "motion/react";
import { staggerContainer, staggerItem, fadeUpVariant, viewportOnce } from "../../lib/animations";
import { AnimatedHeroVisual } from "../../components/AnimatedHeroVisual";
import {
  Check,
  ArrowRight,
  ArrowDown,
  Gamepad,
  Layers,
  Cpu,
  Settings
} from "lucide-react";

export default function Gamification() {
  const capabilities = [
    { icon: Gamepad, title: "Dynamic Reward Systems", desc: "Build backend reward calculators, points scoring arrays, and real-time badge credits triggers." },
    { icon: Layers, title: "Interactive UI Elements", desc: "Design animated progress trackers, leaderboard widgets, and interactive user boards." },
    { icon: Cpu, title: "Algorithmic Matchings", desc: "Develop multiplayer pairing rules, matchmaking loops, and automated difficulty scaling." },
    { icon: Settings, title: "Habit Loops & Analytics", desc: "Configure database metrics logging to measure engagement statistics and retention paths." }
  ];

  const processSteps = [
    { num: "01", title: "Mechanics Scoping Workshop", desc: "Define user action hooks, catalog achievement parameters, and choose platform options." },
    { num: "02", title: "UI Mockups & Figma Grids", desc: "Draft screen coordinates for progress bars, scoreboard pages, and component details." },
    { num: "03", title: "Backend Logic Engineering", desc: "Write database triggers for points logging, write transaction loops, and link API codes." },
    { num: "04", title: "Real-time Leaderboards Setup", desc: "Deploy Redis cache buffers, set up sorted sets, and verify sub-second score updates." },
    { num: "05", title: "Staging Testing Loops", desc: "Simulate concurrent leaderboard updates, perform load checks, and run usability tests." },
    { num: "06", title: "Launch & Metric Auditing", desc: "Verify live database pipelines, configure monitoring, and launch backups." }
  ];

  const highlights = [
    "Redis-cached leaderboards processing over 50,000 updates per second.",
    "Integrated user progress retention loops boosting daily activity.",
    "Database security transaction groups ensuring zero duplicate point entries.",
    "Flexible frontend components compatible with diverse mobile platforms."
  ];

  return (
    <div className="bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans text-left">

      {/* Wave Decorative Orbs */}
      <div className="absolute right-[-10%] top-[5%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-primary/10 to-primary/15 blur-[130px] pointer-events-none z-0"></div>
      <div className="absolute left-[-8%] bottom-[15%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-secondary/8 to-glow/5 blur-[120px] pointer-events-none z-0 animate-float-delay"></div>

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-24 pt-28 pb-10 relative z-10 max-w-7xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block" variants={staggerItem}>EXPERTISE / GAMIFICATION</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-text-primary leading-[1.08]" variants={staggerItem}>
            Gamification Mechanics
          </h1>
          <p className="text-sm sm:text-base text-text-secondary font-light max-w-xl leading-relaxed" variants={staggerItem}>
            We design interactive customer engagement workflows, engineer real-time leaderboard servers, and compile algorithmic reward structures to boost user retention.
          </p>
          <div className="pt-4" variants={staggerItem}>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 border border-border/30 text-text-primary hover:bg-surface hover:text-text-primary hover:border-border rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-300 group"
            >
              <span>Get in touch</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
        <div className="pointer-events-none absolute right-6 top-[calc(50%+40px)] hidden w-[42%] -translate-y-1/2 lg:block">
          <AnimatedHeroVisual icon={Gamepad} title="Engagement loop" eyebrow="Game mechanics" scene="product" />
        </div>

        {/* Scroll Indicator */}
        <div className="flex items-center space-x-3 text-xs text-text-secondary font-light font-mono opacity-80 pt-12 lg:pt-0" variants={staggerItem}>
          <div className="w-8 h-8 rounded-full border border-border/20 flex items-center justify-center animate-bounce">
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
          <span>Scroll to discover more</span>
        </div>
      </section>

      {/* CORE CAPABILITIES */}
      <section className="py-16 px-6 md:px-12 lg:px-24 border-t border-border/10 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce}>Gamified Loop Focus</h2>
            <p className="text-sm text-text-secondary font-light mt-4 leading-relaxed" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              We leverage dynamic gamification models to speed up customer activity. We write secure transactional logic to maintain points integrity.
            </p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:pl-12 border-l border-border/10">
            {capabilities.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={i} variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce} className="space-y-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-text-secondary font-light leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS STEPS */}
      <section className="py-16 px-6 md:px-12 lg:px-24 border-t border-border/10 relative z-10 max-w-7xl mx-auto">
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce}>The Integration Journey</h2>
            <p className="text-sm text-text-secondary font-light mt-2 max-w-md" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              A systematic overview of how we configure achievement scripts and deploy leaderboard models.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {processSteps.map((step, i) => (
              <motion.div key={i} variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce} className="pt-6 border-t border-border/10 space-y-4 text-left">
                <span className="text-xs font-mono font-bold text-primary block">{step.num}</span>
                <h4 className="text-lg font-bold text-text-primary">{step.title}</h4>
                <p className="text-xs sm:text-sm text-text-secondary font-light leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEES CHECKLIST & CTA */}
      <section className="py-20 px-6 md:px-12 lg:px-24 border-t border-border/10 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-light tracking-tight" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce}>System Performance</h2>
            <p className="text-sm text-text-secondary font-light leading-relaxed" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              We operate under standard security rules. All scoring routines and custom API bridges undergo integration checks and latency profiling before launch.
            </p>
            <div className="space-y-4">
              {highlights.map((h, i) => (
                <motion.div key={i} variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce} className="flex items-start space-x-3 text-sm">
                  <div className="p-1 rounded bg-primary/15 text-primary mt-0.5 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-text-secondary font-light leading-relaxed">{h}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="max-w-md w-full rounded-3xl bg-surface/50 border border-border/10 p-8 text-center space-y-6" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <h3 className="text-xl font-bold text-text-primary">Need a gamified framework built?</h3>
              <p className="text-xs text-text-secondary font-light">
                Connect with our gamification consultants to review engagement loops, map databases, and schedule prototyping runs.
              </p>
              <a
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 border border-primary bg-primary hover:bg-transparent text-text-primary hover:text-primary rounded-full py-4 text-sm font-semibold transition-all duration-300 group"
              >
                <span>Request Gamified Build</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}








