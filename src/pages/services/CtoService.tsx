import React from "react";
import { motion } from "motion/react";
import { staggerContainer, staggerItem, fadeUpVariant, viewportOnce } from "../../lib/animations";
import { AnimatedHeroVisual } from "../../components/AnimatedHeroVisual";
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
  const capabilities = [
    { icon: Layout, title: "Figma UI/UX & Prototypes", desc: "Design interactive high-fidelity user screens, design system kits, and user path grids." },
    { icon: PenTool, title: "User Workshops & Stories", desc: "Formulate product requirements, draft user story charts, and prioritize development backlog." },
    { icon: Settings, title: "Tech Stack & Architecture", desc: "Select programming languages, define database schemas, and map VPC hosting infrastructures." },
    { icon: Cpu, title: "Mock Prototypes & Pilots", desc: "Deploy mockup API gateways, test database query times, and build minimal viable architectures." }
  ];

  const processSteps = [
    { num: "01", title: "Discover & Scope Workshops", desc: "Understand business milestones, map product requirements, and catalog system integrations." },
    { num: "02", title: "Wireframing & Grids Layout", desc: "Sketch initial screen interfaces, verify page paths, and confirm text configurations." },
    { num: "03", title: "Figma Prototyping Loops", desc: "Construct high-fidelity click-through screens, conduct usability audits, and refine UI details." },
    { num: "04", title: "Technical Blueprint Mapping", desc: "Draft high-level microservices models, database relationships, and private cloud configurations." },
    { num: "05", title: "Proof-of-Concept Deployments", desc: "Deploy serverless mock endpoints, run API latency diagnostics, and verify data throughputs." },
    { num: "06", title: "Development Handoff & Launch", desc: "Deliver UI component packages, database files, code guidelines, and begin product sprints." }
  ];

  const highlights = [
    "Components library conforming fully to Apple Human Interface and Android guidelines.",
    "Integrated technical assessments identifying structural database bottlenecks early.",
    "Comprehensive developer handoff manuals ensuring clean software setup.",
    "Interactive mock prototypes ready for immediate customer testing."
  ];

  return (
    <div className="bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans text-left">

      {/* Wave Decorative Orbs */}
      <div className="absolute right-[-10%] top-[5%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-primary/10 to-primary/15 blur-[130px] pointer-events-none z-0"></div>
      <div className="absolute left-[-8%] bottom-[15%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-secondary/8 to-glow/5 blur-[120px] pointer-events-none z-0 animate-float-delay"></div>

      {/* 1. HERO SECTION */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-6 md:px-12 lg:px-24 pt-28 pb-10 relative z-10 max-w-7xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 max-w-4xl lg:col-span-7">
          <motion.span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block" variants={staggerItem}>SERVICES / CONCEPT & DESIGN</motion.span>
          <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-text-primary leading-[1.08]" variants={staggerItem}>
            Product Concept & Design
          </motion.h1>
          <motion.p className="text-sm sm:text-base text-text-secondary font-light max-w-xl leading-relaxed" variants={staggerItem}>
            Framer-level prototyping, Figma UI/UX components, user scoping workshops, and technical architecture roadmaps bridging product design and developer sprints.
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
          <AnimatedHeroVisual icon={PenTool} title="Concept sprint" eyebrow="Design system" scene="design" />
        </div>
      </section>

      {/* 2. CORE CAPABILITIES */}
      <section className="section-padding-sm px-6 md:px-12 lg:px-24 border-t border-border/10 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 section-gap-sm">
          <div className="lg:col-span-4">
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">Design & Tech Advisory</h2>
            <p className="text-sm text-text-secondary font-light mt-4 leading-relaxed">
              We translate strategic business milestones into specific technical roadmaps. We establish solid UI tokens and system patterns before launching coding runs.
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
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">The Design Workflow</h2>
            <p className="text-sm sm:text-base text-text-secondary font-light leading-relaxed">
              A systematic overview of how we align user requirements to interactive prototypes.
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
            <h2 className="text-3xl font-light tracking-tight">Guaranteed Standards</h2>
            <p className="text-sm text-text-secondary font-light leading-relaxed">
              We design components to match design standards. We structure layout configurations, wireframe screens, and database schemas with complete technical accountability.
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
              <h3 className="text-xl font-bold text-text-primary">Have a concept to build?</h3>
              <p className="text-xs text-text-secondary font-light">
                Connect with our UI/UX and systems architects to scope design libraries, test wireframes, and budget development stages.
              </p>
              <a
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 border border-primary bg-primary hover:bg-transparent text-text-primary hover:text-primary rounded-full py-4 text-sm font-semibold transition-all duration-300 group"
              >
                <span>Request Design Workshop</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}








