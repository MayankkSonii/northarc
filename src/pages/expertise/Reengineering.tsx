import React from "react";
import { motion } from "motion/react";
import { AnimatedHeroVisual } from "../../components/AnimatedHeroVisual";
import { useSEO, breadcrumbJsonLd, SITE_URL, SITE_NAME } from "../../lib/seo";
import {
  Check,
  ArrowRight,
  ArrowDown,
  RefreshCw,
  Layers,
  Settings,
  ShieldCheck
} from "lucide-react";

export default function Reengineering() {
  useSEO({
    title: "Legacy System Reengineering with AI",
    description:
      "NorthArc modernizes legacy systems with AI — refactoring technical debt into decoupled, cloud-native services that cut costs, boost reliability, stay AI-ready.",
    path: "/expertise/reengineering",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Legacy System Reengineering",
        name: "Legacy System Reengineering with AI",
        description:
          "Modernization of legacy software using AI-assisted refactoring — decoupling monoliths into cloud-native microservices, retiring technical debt, and making systems ready for intelligent automation.",
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        areaServed: "Worldwide",
        url: `${SITE_URL}/expertise/reengineering`,
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Legacy System Reengineering with AI", path: "/expertise/reengineering" },
      ]),
    ],
  });

  const capabilities = [
    { icon: RefreshCw, title: "AI-Assisted Code Refactoring", desc: "Rewrite outdated code, extract modular frameworks, and retire technical debt faster with AI-assisted refactoring and review." },
    { icon: Layers, title: "Database Schema Tuning", desc: "Redefine database models, optimize slow index structures, and configure caching." },
    { icon: Settings, title: "System Decoupling", desc: "Break down bulky monolithic servers into decoupled microservices to improve reliability." },
    { icon: ShieldCheck, title: "Security Modernization", desc: "Tweak authentication loops, integrate modern SSL keys, and apply data encryption standards." }
  ];

  const processSteps = [
    { num: "01", title: "Legacy Code Diagnostics", desc: "Examine active scripts, catalog tech debt points, and map dependency configurations." },
    { num: "02", title: "Target Architecture Design", desc: "Select modern libraries, design database schemas, and map VPC hosting settings." },
    { num: "03", title: "Monolith Decoupling Pilot", desc: "Build sandbox microservices endpoints, map data synchronization flows, and run tests." },
    { num: "04", title: "Incremental Refactoring Sprints", desc: "Rewrite component code iteratively, implement testing, and deploy updates in sprints." },
    { num: "05", title: "Staging Tests & Audits", desc: "Perform regression checklists, run automated unit test blocks, and check speed times." },
    { num: "06", title: "Mainnet Toggle & Tuning", desc: "Switch traffic endpoints, configure telemetry status logs, and configure server backups." }
  ];

  const highlights = [
    "Sustained 40% reduction in system memory overhead after code decoupling.",
    "Eliminated duplicate dependency calls, speeding up pipeline performance.",
    "Integrated SOC-2 alignment for legacy database storage formats.",
    "Detailed developer documentation mapping refactored microservices."
  ];

  return (
    <div className="bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans text-left">
      
      {/* Wave Decorative Orbs */}
      <div className="absolute right-[-10%] top-[5%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-primary/10 to-primary/15 blur-[130px] pointer-events-none z-0"></div>

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-24 pt-28 pb-10 relative z-10 max-w-7xl mx-auto">
        <div className="space-y-8 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block">EXPERTISE / REENGINEERING</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-text-primary leading-[1.08]">
            Legacy System Reengineering with AI
          </h1>
          <p className="text-sm sm:text-base text-text-secondary font-light max-w-xl leading-relaxed">
            We modernize aging systems into decoupled, cloud-native services — retiring technical debt with AI-assisted refactoring so your platform runs leaner, more reliably, and ready for intelligent automation.
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
          <AnimatedHeroVisual icon={RefreshCw} title="Legacy rebuild" eyebrow="Reengineering" scene="cloud" />
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
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">Refinement Focus</h2>
            <p className="text-sm text-text-secondary font-light mt-4 leading-relaxed">
              We eliminate system bloat. We prioritize clean code variables, modern design frameworks, and resource scaling to maintain software health.
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
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">The Modernization Journey</h2>
            <p className="text-sm text-text-secondary font-light mt-2 max-w-md">
              A systematic overview of how we refactor legacy softwares with zero operational downtime.
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
            <h2 className="text-3xl font-light tracking-tight">Quality Benchmarks</h2>
            <p className="text-sm text-text-secondary font-light leading-relaxed">
              We leverage modern client refactoring standards. All updated modules undergo code review loops and automated regression check runs before mainnet launch.
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
              <h3 className="text-xl font-bold text-text-primary">Need a code audit?</h3>
              <p className="text-xs text-text-secondary font-light">
                Connect with our reengineering consultants to review monolithic systems, analyze technical debt, and plan refactoring sprints.
              </p>
              <a 
href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 border border-primary bg-primary hover:bg-transparent text-text-primary hover:text-primary rounded-full py-4 text-sm font-semibold transition-all duration-300 group"
              >
                <span>Request Code Audit</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}








