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
  PenTool,
  Settings,
  Cpu
} from "lucide-react";

export default function CtoService() {
  useSEO({
    title: "AI Product Strategy & Design — Concept to Blueprint",
    description:
      "NorthArc turns AI ideas into fundable products — use-case validation, UX for AI experiences, and technical blueprints for models and data, ready to build.",
    path: "/services/concept-design",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "AI Product Strategy & Design",
        name: "AI Product Strategy & Design",
        description:
          "AI product strategy and design — use-case validation, UX for AI-powered experiences, and technical blueprints for models, data, and architecture, ready for development.",
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        areaServed: "Worldwide",
        url: `${SITE_URL}/services/concept-design`,
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "AI Product Strategy & Design", path: "/services/concept-design" },
      ]),
    ],
  });

  const capabilities = [
    { icon: PenTool, title: "AI Use-Case Validation", desc: "Pressure-test the idea, define success metrics, and confirm the AI opportunity is worth building before you invest." },
    { icon: Layout, title: "UX for AI Experiences", desc: "Design intuitive interfaces for assistants, recommendations, and predictions — high-fidelity prototypes users trust." },
    { icon: Settings, title: "Model, Data & Architecture Blueprint", desc: "Map the right models, data pipelines, and cloud architecture with build-vs-buy decisions grounded in cost and accuracy." },
    { icon: Cpu, title: "Rapid AI Prototypes & Pilots", desc: "Stand up working proofs-of-concept to de-risk feasibility and prove value before full-scale development begins." }
  ];

  const processSteps = [
    { num: "01", title: "Discovery & AI Opportunity Scoping", desc: "Understand business goals, map user needs, and identify where AI delivers the clearest, highest-ROI impact." },
    { num: "02", title: "Use-Case Validation & Metrics", desc: "Define what success looks like, size the value, and set the accuracy and cost targets the solution must hit." },
    { num: "03", title: "UX & Interactive Prototyping", desc: "Design high-fidelity, click-through experiences for AI features, then validate them through usability testing." },
    { num: "04", title: "Technical & Model Blueprint", desc: "Draft the architecture, model choices, data pipelines, and MLOps approach that will carry the product to production." },
    { num: "05", title: "AI Proof-of-Concept", desc: "Build a focused prototype to prove feasibility, benchmark model quality, and de-risk the build before it scales." },
    { num: "06", title: "Roadmap & Build Handoff", desc: "Deliver design assets, technical specs, and a costed delivery roadmap so development starts with total clarity." }
  ];

  const highlights = [
    "A validated AI product concept with clear success metrics before a line of code is written.",
    "Design systems and prototypes tailored to AI-powered experiences, not generic screens.",
    "A technical blueprint covering models, data, and architecture — de-risking the build.",
    "Working proof-of-concept ready for stakeholder buy-in and confident go/no-go decisions."
  ];

  return (
    <div className="bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans text-left">

      {/* Wave Decorative Orbs */}
      <div className="absolute right-[-10%] top-[5%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-primary/10 to-primary/15 blur-[130px] pointer-events-none z-0"></div>
      <div className="absolute left-[-8%] bottom-[15%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-secondary/8 to-glow/5 blur-[120px] pointer-events-none z-0 animate-float-delay"></div>

      {/* 1. HERO SECTION */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-6 md:px-12 lg:px-24 pt-28 pb-10 relative z-10 max-w-7xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 max-w-4xl lg:col-span-7">
          <motion.span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block" variants={staggerItem}>SERVICES / AI PRODUCT STRATEGY & DESIGN</motion.span>
          <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-text-primary leading-[1.08]" variants={staggerItem}>
            Turn AI Ideas into Fundable Products
          </motion.h1>
          <motion.p className="text-sm sm:text-base text-text-secondary font-light max-w-xl leading-relaxed" variants={staggerItem}>
            We de-risk your AI product before you build it — validating the use case, designing the experience, and producing a technical blueprint for models, data, and architecture that development teams can execute with confidence.
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
          <AnimatedHeroVisual icon={PenTool} title="AI concept sprint" eyebrow="Strategy & design" scene="design" />
        </div>
      </section>

      {/* 2. CORE CAPABILITIES */}
      <section className="section-padding-sm px-6 md:px-12 lg:px-24 border-t border-border/10 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 section-gap-sm">
          <div className="lg:col-span-4">
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">Strategy, Design & Tech Advisory</h2>
            <p className="text-sm text-text-secondary font-light mt-4 leading-relaxed">
              We translate business goals into a validated AI product plan — combining user experience, model strategy, and architecture before any build begins.
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
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">The Strategy & Design Workflow</h2>
            <p className="text-sm sm:text-base text-text-secondary font-light leading-relaxed">
              How we move an AI idea from opportunity to a validated, build-ready product blueprint.
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
      <section className="py-20 px-6 md:px-12 lg:px-24 border-t border-white/10 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-light tracking-tight">What You Walk Away With</h2>
            <p className="text-sm text-text-secondary font-light leading-relaxed">
              Every engagement ends with clarity and confidence — a validated AI concept, a designed experience, and a technical blueprint your team can build without guesswork.
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
              <h3 className="text-xl font-bold text-text-primary">Have an AI idea to validate?</h3>
              <p className="text-xs text-text-secondary font-light">
                Connect with our AI product strategists and architects to validate the use case, design the experience, and scope a build-ready roadmap.
              </p>
              <a
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 border border-primary bg-primary hover:bg-transparent text-text-primary hover:text-primary rounded-full py-4 text-sm font-semibold transition-all duration-300 group"
              >
                <span>Book a Strategy Workshop</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}








