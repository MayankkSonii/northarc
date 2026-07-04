import React from "react";
import { motion } from "motion/react";
import { AnimatedHeroVisual } from "../../components/AnimatedHeroVisual";
import {
  Check,
  ArrowRight,
  ArrowDown,
  Settings,
  ShieldCheck,
  Clock,
  Cpu
} from "lucide-react";

export default function SupportMaintenance() {
  const capabilities = [
    { icon: Settings, title: "Infrastructure Updates", desc: "Keep server software versions up-to-date, patch database engines, and scale host layers." },
    { icon: ShieldCheck, title: "Security Patches", desc: "Audit dependency packages, evaluate security vulnerability notices, and integrate hotfixes." },
    { icon: Clock, title: "SLA Response Support", desc: "Provide continuous monitoring, incident tracking boards, and rapid bug troubleshooting." },
    { icon: Cpu, title: "Performance Audits", desc: "Optimize index structures, tune query bottlenecks, and reduce background storage costs." }
  ];

  const processSteps = [
    { num: "01", title: "System Scoping & Assessment", desc: "Review current dependencies packages, catalog host configurations, and identify gaps." },
    { num: "02", title: "Monitoring Dashboard Setup", desc: "Configure alert supervisors, map incident trackers, and verify notifications flow." },
    { num: "03", title: "Security SLA Definition", desc: "Establish response timeframes, define severity metrics, and outline backup routes." },
    { num: "04", title: "Incremental System Tuning", desc: "Run database script cleanups, configure query cache settings, and drop unused logs." },
    { num: "05", title: "Dependency Updates Sprints", desc: "Upgrade target libraries, run tests loops, and deploy hotfixes with zero downtime." },
    { num: "06", title: "Incident Retrospectives", desc: "Document resolved server bottlenecks, adjust alert parameters, and verify backups." }
  ];

  const highlights = [
    "Average incident response time under 15 minutes for critical blockers.",
    "Integrated database monitoring preventing database memory leaks.",
    "Automated nightly system backup protocols with data health checks.",
    "Detailed diagnostic monthly summaries detailing system security status."
  ];

  return (
    <div className="bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans text-left">

      {/* Wave Decorative Orbs */}
      <div className="absolute right-[-10%] top-[5%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-primary/10 to-primary/15 blur-[130px] pointer-events-none z-0"></div>

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-24 pt-28 pb-10 relative z-10 max-w-7xl mx-auto">
        <div className="space-y-8 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block">EXPERTISE / SUPPORT & MAINTENANCE</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-text-primary leading-[1.08]">
            Support & Maintenance
          </h1>
          <p className="text-sm sm:text-base text-text-secondary font-light max-w-xl leading-relaxed">
            We provide continuous cloud systems monitoring, integrate regular security patches, and troubleshoot software issues under strict SLA contracts.
          </p>
          <div className="pt-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 border border-border/30 text-text-primary hover:bg-surface hover:text-text-primary hover:border-border rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-300 group"
            >
              <span>Get in touch</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
        <div className="pointer-events-none absolute right-6 top-[calc(50%+40px)] hidden w-[42%] -translate-y-1/2 lg:block">
          <AnimatedHeroVisual icon={Settings} title="SLA loop" eyebrow="Maintenance ops" scene="security" />
        </div>

        {/* Scroll Indicator */}
        <div className="flex items-center space-x-3 text-xs text-text-secondary font-light font-mono opacity-80 pt-12 lg:pt-0">
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
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">Maintenance Focus</h2>
            <p className="text-sm text-text-secondary font-light mt-4 leading-relaxed">
              We eliminate technical debt buildup. We prioritize regular package audits, server checks, and backup loops to maintain system safety.
            </p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:pl-12 border-l border-border/10">
            {capabilities.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="space-y-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-text-secondary font-light leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS STEPS */}
      <section className="py-16 px-6 md:px-12 lg:px-24 border-t border-border/10 relative z-10 max-w-7xl mx-auto">
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">The Support Workflow</h2>
            <p className="text-sm text-text-secondary font-light mt-2 max-w-md">
              A systematic overview of how we monitor cloud resources and resolve server incidents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {processSteps.map((step, i) => (
              <div key={i} className="pt-6 border-t border-border/10 space-y-4 text-left">
                <span className="text-xs font-mono font-bold text-primary block">{step.num}</span>
                <h4 className="text-lg font-bold text-text-primary">{step.title}</h4>
                <p className="text-xs sm:text-sm text-text-secondary font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEES CHECKLIST & CTA */}
      <section className="py-20 px-6 md:px-12 lg:px-24 border-t border-border/10 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-light tracking-tight">SLA Performance</h2>
            <p className="text-sm text-text-secondary font-light leading-relaxed">
              We operate under standard compliance limits. All server updates and patches undergo staging verification runs to prevent build crashes in production.
            </p>
            <div className="space-y-4">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start space-x-3 text-sm">
                  <div className="p-1 rounded bg-primary/15 text-primary mt-0.5 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-text-secondary font-light leading-relaxed">{h}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="max-w-md w-full rounded-3xl bg-surface/50 border border-border/10 p-8 text-center space-y-6">
              <h3 className="text-xl font-bold text-text-primary">Need continuous system support?</h3>
              <p className="text-xs text-text-secondary font-light">
                Connect with our maintenance team to map dependencies, review monitoring options, and choose SLA parameters.
              </p>
              <a
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 border border-primary bg-primary hover:bg-transparent text-text-primary hover:text-primary rounded-full py-4 text-sm font-semibold transition-all duration-300 group"
              >
                <span>Request SLA Setup</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}








