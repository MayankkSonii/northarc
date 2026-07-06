import React from "react";
import { motion } from "motion/react";
import { staggerContainer, staggerItem, fadeUpVariant, viewportOnce } from "../../lib/animations";
import { AnimatedHeroVisual } from "../../components/AnimatedHeroVisual";
import { useSEO, breadcrumbJsonLd, SITE_URL, SITE_NAME } from "../../lib/seo";
import {
  ArrowRight,
  ArrowDown,
  Check,
  Database,
  Network,
  FileText,
  Cpu
} from "lucide-react";

export default function ItConsulting() {
  useSEO({
    title: "AI Transformation Consulting — Strategy to ROI",
    description:
      "NorthArc's AI transformation consulting turns operations into an advantage — we find high-ROI use cases, ready your data, and automate workflows that cut cost.",
    path: "/services/transformation-consulting",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "AI Transformation Consulting",
        name: "AI Transformation Consulting",
        description:
          "Enterprise AI transformation consulting — AI readiness assessments, high-ROI use-case roadmaps, data and cloud modernization, and intelligent workflow automation.",
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        areaServed: "Worldwide",
        url: `${SITE_URL}/services/transformation-consulting`,
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "AI Transformation Consulting", path: "/services/transformation-consulting" },
      ]),
    ],
  });

  const capabilities = [
    { icon: Cpu, title: "AI Readiness & Use-Case Roadmaps", desc: "Pinpoint the highest-ROI AI opportunities across your operations and turn them into a costed, prioritized roadmap." },
    { icon: Database, title: "Data & Platform Modernization", desc: "Ready your data for AI — clean pipelines, unified schemas, and modern stacks that models can actually learn from." },
    { icon: Network, title: "Secure Cloud & MLOps Foundations", desc: "Move workloads to AWS/GCP/Azure with the infrastructure to train, deploy, and monitor models reliably at scale." },
    { icon: FileText, title: "AI Governance & Compliance", desc: "Put guardrails, data-handling controls, and SOC-2-aligned governance around AI so adoption stays safe and auditable." }
  ];

  const processSteps = [
    { num: "01", title: "Discovery & AI Readiness Audit", desc: "Assess data maturity, systems, and workflows to see where AI can move the biggest business metrics." },
    { num: "02", title: "Use-Case Prioritization", desc: "Score opportunities by ROI, feasibility, and risk, then draft a phased roadmap leadership can commit to." },
    { num: "03", title: "Data & Infrastructure Foundations", desc: "Modernize pipelines, cloud, and MLOps so models have clean data and a reliable path to production." },
    { num: "04", title: "Pilot & Proof-of-Value", desc: "Ship a focused pilot in a real workflow, measure impact against baselines, and validate the business case." },
    { num: "05", title: "Scale & Workflow Automation", desc: "Roll proven AI into production, automate the surrounding workflows, and integrate with CRM, ERP, and data systems." },
    { num: "06", title: "Governance, Monitoring & SLAs", desc: "Track accuracy, cost, and drift in production with alerting, governance controls, and continuous improvement." }
  ];

  const highlights = [
    "High-ROI AI use cases mapped to measurable business outcomes, not vanity pilots.",
    "SOC-2 and HIPAA-aligned data governance for sensitive and regulated workloads.",
    "Production-grade MLOps so models stay accurate, monitored, and cost-controlled.",
    "Phased, low-risk adoption roadmap with a clear path from pilot to enterprise scale."
  ];

  return (
    <div className="bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans text-left">

      {/* Wave Decorative Orbs */}
      <div className="absolute right-[-10%] top-[5%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-primary/10 to-primary/15 blur-[130px] pointer-events-none z-0"></div>
      <div className="absolute left-[-8%] bottom-[15%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-secondary/8 to-glow/5 blur-[120px] pointer-events-none z-0 animate-float-delay"></div>

      {/* 1. HERO SECTION */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-6 md:px-12 lg:px-24 pt-28 pb-10 relative z-10 max-w-7xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 max-w-4xl lg:col-span-7">
          <motion.span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block" variants={staggerItem}>SERVICES / AI TRANSFORMATION CONSULTING</motion.span>
          <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-text-primary leading-[1.08]" variants={staggerItem}>
            Turn Your Operations into an AI Advantage
          </motion.h1>
          <motion.p className="text-sm sm:text-base text-text-secondary font-light max-w-xl leading-relaxed" variants={staggerItem}>
            We help you find where AI moves the needle, ready your data and cloud to support it, and automate the workflows that drain time and cost — with a phased roadmap from pilot to enterprise scale.
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
          <AnimatedHeroVisual icon={Network} title="AI transformation map" eyebrow="Consulting flow" scene="cloud" />
        </div>
      </section>

      {/* 2. CORE CAPABILITIES */}
      <section className="section-padding-sm px-6 md:px-12 lg:px-24 border-t border-border/10 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 section-gap-sm">
          <div className="lg:col-span-4">
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">Consulting Specialties</h2>
            <p className="text-sm text-text-secondary font-light mt-4 leading-relaxed">
              We assess where AI creates value, define the data and infrastructure to support it, and set the governance and scaling controls to adopt it safely.
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
      <section className="py-16 px-6 md:px-12 lg:px-24 border-t border-border/10 relative z-10 max-w-7xl mx-auto">
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">The AI Transformation Journey</h2>
            <p className="text-sm text-text-secondary font-light mt-2 max-w-md">
              How we move you from AI readiness assessment to production systems delivering measurable ROI.
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
      <section className="py-20 px-6 md:px-12 lg:px-24 border-t border-border/10 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-light tracking-tight">Outcomes You Can Measure</h2>
            <p className="text-sm text-text-secondary font-light leading-relaxed">
              We tie every engagement to business results — not experiments. AI is adopted on secure, governed foundations with a clear line from investment to return.
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
              <h3 className="text-xl font-bold text-text-primary">Ready to assess your AI readiness?</h3>
              <p className="text-xs text-text-secondary font-light">
                Connect with our AI consultants to identify high-ROI use cases, evaluate your data and cloud foundations, and plan a phased adoption roadmap.
              </p>
              <a
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 border border-primary bg-primary hover:bg-transparent text-text-primary hover:text-primary rounded-full py-4 text-sm font-semibold transition-all duration-300 group"
              >
                <span>Request AI Readiness Assessment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}








