import React from "react";
import { motion } from "motion/react";
import { staggerContainer, staggerItem, fadeUpVariant, viewportOnce } from "../../lib/animations";
import { AnimatedHeroVisual } from "../../components/AnimatedHeroVisual";
import { useSEO, breadcrumbJsonLd, SITE_URL, SITE_NAME } from "../../lib/seo";
import {
  ArrowRight,
  ArrowDown,
  Check,
  Layout,
  Smartphone,
  Cpu,
  Server
} from "lucide-react";

export default function CustomSoftware() {
  useSEO({
    title: "AI Product Development Services — Full-Cycle Delivery",
    description:
      "Full-cycle AI product development from NorthArc — we design, build, and ship LLM applications, ML systems, and intelligent platforms that move business KPIs.",
    path: "/services/full-cycle-development",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "AI Product Development",
        name: "Full-Cycle AI Product Development",
        description:
          "End-to-end delivery of AI products — LLM applications, machine learning systems, and intelligent web and mobile platforms — from architecture to production.",
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        areaServed: "Worldwide",
        url: `${SITE_URL}/services/full-cycle-development`,
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "AI Product Development", path: "/services/full-cycle-development" },
      ]),
    ],
  });

  const capabilities = [
    { icon: Layout, title: "AI-Powered Web Platforms", desc: "Ship SaaS products, portals, and dashboards with intelligence built in — search, summarization, and recommendations your users actually feel." },
    { icon: Smartphone, title: "Intelligent Mobile Apps", desc: "Deliver native iOS/Android or cross-platform apps with AI-assisted experiences that measurably lift engagement and retention." },
    { icon: Cpu, title: "LLM Apps & ML Systems", desc: "Build assistants grounded in your own knowledge, prediction engines, and ML pipelines that turn raw data into faster, better decisions." },
    { icon: Server, title: "MLOps & Cloud Deployment", desc: "Run models in production on monitored, autoscaling infrastructure with CI/CD — so accuracy and cost never drift silently." }
  ];

  const processSteps = [
    { num: "01", title: "AI Use-Case & Product Design", desc: "Identify the highest-ROI AI opportunities, define success metrics, and design user journeys before a line of code is written." },
    { num: "02", title: "Architecture & Model Selection", desc: "Choose models, data pipelines, and hosting with build-vs-buy decisions grounded in accuracy and cost targets." },
    { num: "03", title: "Agile Development Sprints", desc: "Ship working software bi-weekly — application code and model improvements land together with measurable progress." },
    { num: "04", title: "Evaluation & QA Audits", desc: "Test beyond unit tests: model evaluation suites, regression checks, and load audits before anything reaches users." },
    { num: "05", title: "Production Launch", desc: "Deploy to hardened cloud infrastructure with rollback plans, observability, and security controls in place from day one." },
    { num: "06", title: "Continuous Improvement", desc: "Monitor accuracy, cost, and latency in production; retrain and tune so results improve with every release cycle." }
  ];

  const highlights = [
    "100% Intellectual Property (IP) ownership transferred upon final release.",
    "Live dashboards tracking the business metrics your AI is meant to move.",
    "Model evaluation and security testing baked into every release build.",
    "Decoupled architecture so AI capabilities scale with demand, not with cost."
  ];

  return (
    <div className="bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans text-left">

      {/* Wave Decorative Orbs */}
      <div className="absolute right-[-10%] top-[5%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-primary/10 to-primary/15 blur-[130px] pointer-events-none z-0"></div>
      <div className="absolute left-[-8%] bottom-[15%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-secondary/8 to-glow/5 blur-[120px] pointer-events-none z-0 animate-float-delay"></div>

      {/* 1. HERO SECTION */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-6 md:px-12 lg:px-24 pt-28 pb-10 relative z-10 max-w-7xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 max-w-4xl lg:col-span-7">
          <motion.span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block" variants={staggerItem}>SERVICES / AI PRODUCT DEVELOPMENT</motion.span>
          <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-text-primary leading-[1.08]" variants={staggerItem}>
            AI Product Development, End to End
          </motion.h1>
          <motion.p className="text-sm sm:text-base text-text-secondary font-light max-w-xl leading-relaxed" variants={staggerItem}>
            Turn your strategic vision into intelligent software that pays for itself. We design, build, and operate LLM applications, machine learning systems, and AI-powered platforms — from first architecture decision to production release.
          </motion.p>
          <motion.div className="pt-4" variants={staggerItem}>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 border border-border/30 text-text-primary hover:bg-bg hover:text-text-primary rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-300 group"
            >
              <span>Get in touch</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
          <motion.div className="flex items-center space-x-3 text-xs text-text-secondary font-light font-mono opacity-80 pt-12 lg:pt-0" variants={staggerItem}>
            <div className="w-8 h-8 rounded-full border border-border/20 flex items-center justify-center animate-bounce">
              <ArrowDown className="w-3.5 h-3.5" />
            </div>
            <span>Scroll to discover more</span>
          </motion.div>
        </motion.div>
        <div className="lg:col-span-5">
          <AnimatedHeroVisual icon={Layout} title="AI product build" eyebrow="Delivery engine" scene="product" />
        </div>
      </section>

      {/* 2. CORE CAPABILITIES */}
      <section className="section-padding-sm px-6 md:px-12 lg:px-24 border-t border-border/10 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 section-gap-sm">
          <div className="lg:col-span-4">
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">Our Core Offerings</h2>
            <p className="text-sm text-text-secondary font-light mt-4 leading-relaxed">
              We deliver intelligent products end to end — from mapping the AI opportunity to production systems your customers and teams rely on daily.
            </p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 content-gap lg:pl-12 border-l border-border/10">
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

      {/* 3. PROCESS STEPS */}
      <section className="section-padding-sm px-6 md:px-12 lg:px-24 border-t border-border/10 relative z-10 max-w-7xl mx-auto">
        <div className="content-gap">
          <div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">The Delivery Journey</h2>
            <p className="text-sm text-text-secondary font-light mt-2 max-w-md">
              How we take an AI product from validated concept to a system running in production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 section-gap-sm">
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

      {/* 4. GUARANTEES CHECKLIST & CTA */}
      <section className="section-padding px-6 md:px-12 lg:px-24 border-t border-border/10 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 section-gap items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-light tracking-tight">Guaranteed Standards</h2>
            <p className="text-sm text-text-secondary font-light leading-relaxed">
              We operate under clear SLAs. By auditing model performance, code quality, and infrastructure cost, we deliver intelligent systems that scale with business growth.
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
            <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce} className="max-w-md w-full rounded-3xl bg-surface/50 border border-border/10 p-8 text-center space-y-6">
              <h3 className="text-xl font-bold">Have an AI product idea?</h3>
              <p className="text-xs text-text-secondary font-light">
                Connect with our AI architects to scope the solution, choose the right models, budget delivery sprints, and schedule a kickoff.
              </p>
              <a
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 border border-primary bg-primary hover:bg-transparent text-text-primary hover:text-primary rounded-full py-4 text-sm font-semibold transition-all duration-300 group"
              >
                <span>Scope Your AI Build</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}








