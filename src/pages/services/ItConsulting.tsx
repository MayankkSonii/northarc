import React from "react";
import { motion } from "motion/react";
import { staggerContainer, staggerItem, fadeUpVariant, viewportOnce } from "../../lib/animations";
import { AnimatedHeroVisual } from "../../components/AnimatedHeroVisual";
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
  const capabilities = [
    { icon: Database, title: "Database & Stack Modernization", desc: "Optimize index schemas, structure query caching, and rewrite legacy database systems." },
    { icon: Network, title: "Cloud VPC Migrations", desc: "Transition physical host workloads to AWS/GCP isolated virtual private cloud containers." },
    { icon: FileText, title: "Compliance & Security Audits", desc: "Review data handling routines, audit encryption layers, and align setup to SOC-2." },
    { icon: Cpu, title: "Workflow Automations", desc: "Build automated pipeline workers to connect CRM, ERP, and database APIs cleanly." }
  ];

  const processSteps = [
    { num: "01", title: "Legacy System Auditing", desc: "Examine active dependencies, database constraints, legacy architectures, and compute overheads." },
    { num: "02", title: "Migration Blueprinting", desc: "Draft zero-downtime schemas, private cloud topologies, and pipeline synchronization schedules." },
    { num: "03", title: "Staging Proof-of-Concept", desc: "Run workloads in staging containers, measure response latencies, and check data replication." },
    { num: "04", title: "Infrastructure Deployment", desc: "Provision production VPCs, deploy Kubernetes node clusters, and set up load balancing gateways." },
    { num: "05", title: "Data Synchronization & Launch", desc: "Replicate database content live, toggle DNS routers, and verify SSL configurations." },
    { num: "06", title: "Continuous Monitoring & SLAs", desc: "Calibrate Grafana widgets, set up alert rules, and run daily automated backup loops." }
  ];

  const highlights = [
    "Average database response speed increased by up to 50% post-modernization.",
    "Integrated SOC-2 and HIPAA compliance safeguards for sensitive customer data.",
    "99.9% availability guarantees backed by isolated cloud multi-node staging.",
    "Zero-downtime database transitions with automated check integrity loops."
  ];

  return (
    <div className="bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans text-left">

      {/* Wave Decorative Orbs */}
      <div className="absolute right-[-10%] top-[5%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-primary/10 to-primary/15 blur-[130px] pointer-events-none z-0"></div>
      <div className="absolute left-[-8%] bottom-[15%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-secondary/8 to-glow/5 blur-[120px] pointer-events-none z-0 animate-float-delay"></div>

      {/* 1. HERO SECTION */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-6 md:px-12 lg:px-24 pt-28 pb-10 relative z-10 max-w-7xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 max-w-4xl lg:col-span-7">
          <motion.span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block" variants={staggerItem}>SERVICES / DIGITAL TRANSFORMATION</motion.span>
          <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-text-primary leading-[1.08]" variants={staggerItem}>
            Digital Transformation Consulting
          </motion.h1>
          <motion.p className="text-sm sm:text-base text-text-secondary font-light max-w-xl leading-relaxed" variants={staggerItem}>
            Modernize your legacy software stacks, transition workloads to secure isolated cloud environments, and automate operations with cutting-edge IT consulting.
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
          <AnimatedHeroVisual icon={Network} title="Modernization map" eyebrow="Consulting flow" scene="cloud" />
        </div>
      </section>

      {/* 2. CORE CAPABILITIES */}
      <section className="section-padding-sm px-6 md:px-12 lg:px-24 border-t border-border/10 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 section-gap-sm">
          <div className="lg:col-span-4">
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">Consulting Specialties</h2>
            <p className="text-sm text-text-secondary font-light mt-4 leading-relaxed">
              We audit active software systems. We define transition roadmaps, security controls, and infrastructure scaling parameters matching business growth.
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
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">The Modernization Journey</h2>
            <p className="text-sm text-text-secondary font-light mt-2 max-w-md">
              A detailed overview of how we audit legacy configurations and migrate them to the cloud.
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
            <h2 className="text-3xl font-light tracking-tight">Uptime & Latency Metrics</h2>
            <p className="text-sm text-text-secondary font-light leading-relaxed">
              We focus on absolute database stability and secure network scaling. All infrastructure setups are defined via declarative templates to prevent configuration errors.
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
              <h3 className="text-xl font-bold text-text-primary">Need a systems audit?</h3>
              <p className="text-xs text-text-secondary font-light">
                Connect with our systems consultants to map legacy architectures, assess cloud options, and plan migration sprint schedules.
              </p>
              <a
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 border border-primary bg-primary hover:bg-transparent text-text-primary hover:text-primary rounded-full py-4 text-sm font-semibold transition-all duration-300 group"
              >
                <span>Request Modernization Audit</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}








