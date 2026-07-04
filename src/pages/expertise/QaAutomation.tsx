import React from "react";
import { motion } from "motion/react";
import { AnimatedHeroVisual } from "../../components/AnimatedHeroVisual";
import {
  Check,
  ArrowRight,
  ArrowDown,
  CheckCircle,
  Layers,
  Cpu,
  ShieldCheck
} from "lucide-react";

export default function QaAutomation() {
  const capabilities = [
    { icon: CheckCircle, title: "Automated Browser Testing", desc: "Write comprehensive frontend integration tests in Playwright, Cypress, and Selenium." },
    { icon: Layers, title: "Integration & API Testing", desc: "Build automated test suites for REST and GraphQL endpoints verifying request payloads." },
    { icon: Cpu, title: "Load & Stress Testing", desc: "Simulate concurrent user workloads using k6, audit response rates, and identify server crashes." },
    { icon: ShieldCheck, title: "Vulnerability Scanning", desc: "Integrate static code analysis (SonarQube) and vulnerability checkers inside CI/CD." }
  ];

  const processSteps = [
    { num: "01", title: "Test Plan Scoping", desc: "Understand component dependencies, define coverage metrics, and select testing frameworks." },
    { num: "02", title: "Unit Test Integration", desc: "Configure Jest/Vitest suites, write mock databases states, and check local pipelines." },
    { num: "03", title: "API Validation Automation", desc: "Develop automatic tests verifying API outputs, response schemas, and latency limits." },
    { num: "04", title: "End-to-End Browser Tests", desc: "Write Playwright scripts testing checkout runs, login paths, and forms inputs." },
    { num: "05", title: "Load & Security Auditing", desc: "Run load audits (k6) in staging, analyze database latency, and scan code packages." },
    { num: "06", title: "Continuous CI/CD Release", desc: "Trigger automated test checks on git merge, audit coverage graphs, and compile builds." }
  ];

  const highlights = [
    "Average test coverage exceeding 90% for critical business workflows.",
    "Integrated code scanners detecting vulnerabilities inside pull requests.",
    "Database load validations simulating up to 10,000 requests per second.",
    "Playwright test blocks configured to run concurrently in container networks."
  ];

  return (
    <div className="bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans text-left">

      {/* Wave Decorative Orbs */}
      <div className="absolute right-[-10%] top-[5%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-primary/10 to-primary/15 blur-[130px] pointer-events-none z-0"></div>

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-24 pt-28 pb-10 relative z-10 max-w-7xl mx-auto">
        <div className="space-y-8 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block">EXPERTISE / QA & AUTOMATION</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-text-primary leading-[1.08]">
            QA & Test Automation
          </h1>
          <p className="text-sm sm:text-base text-text-secondary font-light max-w-xl leading-relaxed">
            We write automated browser test suites, configure continuous integration diagnostic gates, and perform server load audits to prevent release blockers.
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
          <AnimatedHeroVisual icon={CheckCircle} title="Quality pipeline" eyebrow="Test automation" scene="security" />
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
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">Quality Focus</h2>
            <p className="text-sm text-text-secondary font-light mt-4 leading-relaxed">
              We eliminate manual testing bottlenecks. We prioritize automated regression blocks, API schema checks, and pipeline gates to speed up delivery.
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
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">The QA Workflow</h2>
            <p className="text-sm text-text-secondary font-light mt-2 max-w-md">
              A systematic overview of how we write automated check blocks for enterprise codebases.
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
            <h2 className="text-3xl font-light tracking-tight">Uptime & Test Standards</h2>
            <p className="text-sm text-text-secondary font-light leading-relaxed">
              We leverage cloud testing networks and strict regression checks. All codebase updates undergo automated verification before launch.
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
              <h3 className="text-xl font-bold text-text-primary">Need automated testing?</h3>
              <p className="text-xs text-text-secondary font-light">
                Connect with our QA consultants to assess codebases, select framework options, and plan test automation schedules.
              </p>
              <a
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 border border-primary bg-primary hover:bg-transparent text-text-primary hover:text-primary rounded-full py-4 text-sm font-semibold transition-all duration-300 group"
              >
                <span>Request QA Plan</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}








