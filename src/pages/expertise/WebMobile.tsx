import React from "react";
import { motion } from "motion/react";
import { AnimatedHeroVisual } from "../../components/AnimatedHeroVisual";
import {
  ArrowRight,
  ArrowDown,
  Check,
  Smartphone,
  SmartphoneIcon,
  Globe,
  Layers
} from "lucide-react";

export default function WebMobile() {
  const capabilities = [
    { icon: Smartphone, title: "Native iOS Apps", desc: "Construct high-fidelity, optimized client codebases using Swift and SwiftUI libraries." },
    { icon: SmartphoneIcon, title: "Native Android Apps", desc: "Build responsive, multi-device compatible Android platforms using Kotlin." },
    { icon: Globe, title: "Cross-Platform Clients", desc: "Deploy shared codebase architectures across systems using React Native or Flutter." },
    { icon: Layers, title: "Frontend Web Interfaces", desc: "Ship rapid Next.js and React client portals styled with modern custom layouts." }
  ];

  const processSteps = [
    { num: "01", title: "Figma UI/UX & Scoping", desc: "Align user interface mockups, structure spacing values, and verify typography metrics." },
    { num: "02", title: "API Gateway Specifications", desc: "Establish endpoints contracts, structure payload parameters, and define database calls." },
    { num: "03", title: "Decoupled Development", desc: "Develop native and web views, synchronize data caches, and integrate network layers." },
    { num: "04", title: "Quality Verification", desc: "Perform unit check lists, execute automated browser scripts, and audit latency times." },
    { num: "05", title: "App Store Packaging", desc: "Build binary outputs, upload to Google Play and Apple TestFlight, and deploy portals." },
    { num: "06", title: "Launch & Metric Auditing", desc: "Collect crash diagnostics reports, monitor API queries, and tweak server nodes." }
  ];

  const highlights = [
    "Average render speed maintained at a smooth, lag-free 60fps.",
    "Decoupled client structure allowing easy API version upgrades.",
    "Integrated offline-first database synchronization and cache frameworks.",
    "Complete code reviews and unit coverage exceeding 85% standards."
  ];

  return (
    <div className="bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans text-left">

      {/* Wave Decorative Orbs */}
      <div className="absolute right-[-10%] top-[5%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-primary/10 to-primary/15 blur-[130px] pointer-events-none z-0"></div>

      {/* 1. HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-24 pt-28 pb-10 relative z-10 max-w-7xl mx-auto">
        <div className="space-y-8 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block">EXPERTISE / WEB & MOBILE</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-text-primary leading-[1.08]">
            Web & Mobile App Engineering
          </h1>
          <p className="text-sm sm:text-base text-text-secondary font-light max-w-xl leading-relaxed">
            We engineer high-fidelity web applications and native/cross-platform mobile apps. From offline-first synchronization logic to microsecond rendering, we deliver top-tier mobile products.
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
          <AnimatedHeroVisual icon={Smartphone} title="App ecosystem" eyebrow="Web and mobile" scene="product" />
        </div>

        {/* Scroll Indicator */}
        <div className="flex items-center space-x-3 text-xs text-text-secondary font-light font-mono opacity-80 pt-12 lg:pt-0">
          <div className="w-8 h-8 rounded-full border border-border/20 flex items-center justify-center animate-bounce">
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
          <span>Scroll to discover more</span>
        </div>
      </section>

      {/* 2. CORE CAPABILITIES */}
      <section className="py-16 px-6 md:px-12 lg:px-24 border-t border-border/10 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">Engineering Focus</h2>
            <p className="text-sm text-text-secondary font-light mt-4 leading-relaxed">
              We compile highly optimized client builds. We avoid heavy bundle outputs and prioritize fluid screen transitions to improve user engagement.
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

      {/* 3. PROCESS STEPS */}
      <section className="py-16 px-6 md:px-12 lg:px-24 border-t border-border/10 relative z-10 max-w-7xl mx-auto">
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">The Development Workflow</h2>
            <p className="text-sm text-text-secondary font-light mt-2 max-w-md">
              A systematic overview of how we align user requirements to interactive prototypes.
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

      {/* 4. GUARANTEES CHECKLIST & CTA */}
      <section className="py-20 px-6 md:px-12 lg:px-24 border-t border-border/10 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-light tracking-tight">Quality Benchmarks</h2>
            <p className="text-sm text-text-secondary font-light leading-relaxed">
              We leverage modern client libraries and structured state management layers. All layouts undergo accessibility audits and load diagnostics before App Store release.
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
              <h3 className="text-xl font-bold text-text-primary">Have an app to engineer?</h3>
              <p className="text-xs text-text-secondary font-light">
                Connect with our client engineering team to review design kits, choose cross-platform options, and launch mobile builds.
              </p>
              <a
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 border border-primary bg-primary hover:bg-transparent text-text-primary hover:text-primary rounded-full py-4 text-sm font-semibold transition-all duration-300 group"
              >
                <span>Discuss Your App</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}








