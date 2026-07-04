import React from "react";
import { motion } from "motion/react";
import { AnimatedHeroVisual } from "../../components/AnimatedHeroVisual";
import {
  Check,
  ArrowRight,
  ArrowDown,
  Layers,
  Cpu,
  Database,
  Server
} from "lucide-react";
import { staggerContainer, staggerItem, fadeUpVariant, viewportOnce } from "../../lib/animations";

export default function CloudNative() {
  const capabilities = [
    { icon: Server, title: "Elastic Container Arrays", desc: "Build highly scalable, isolated cloud services using container cluster models." },
    { icon: Cpu, title: "Serverless Architectures", desc: "Configure serverless cloud logic layers minimizing runtime compute overheads." },
    { icon: Database, title: "Distributed Storage", desc: "Set up globally replicated database models, index caches, and cluster layers." },
    { icon: Layers, title: "gRPC Microservices", desc: "Connect frontend applications and backend databases with low-latency APIs." }
  ];

  const processSteps = [
    { num: "01", title: "Target Architecture Auditing", desc: "Assess active database metrics, analyze request volumes, and map subnets scopes." },
    { num: "02", title: "Serverless Schema Mapping", desc: "Draft micro-routing details, configure VPC rules, and define database structures." },
    { num: "03", title: "Container Cluster Assembly", desc: "Deploy Kubernetes pods, configure ingress nodes, and set up load balancing gateways." },
    { num: "04", title: "Global Replication Sync", desc: "Configure multi-region database replications, write sync schedules, and configure backups." },
    { num: "05", title: "Integration Validation Runs", desc: "Perform functional checks, evaluate interface load speeds, and check database queries." },
    { num: "06", title: "Deployment & Telemetry Release", desc: "Verify domain routings, set up user access permissions, and calibrate backups." }
  ];

  const highlights = [
    "Uptime scalability: handle rapid 10x traffic spikes with automatic container scale-ups.",
    "Decoupled serverless computation layers minimizing server rental costs.",
    "Integrated database synchronization pathways securing global transaction consistency.",
    "Complete code metrics monitoring using Prometheus and Grafana panels."
  ];

  return (
    <div className="bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans text-left">

      {/* Wave Decorative Orbs */}
      <div className="absolute right-[-10%] top-[5%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-primary/10 to-primary/15 blur-[130px] pointer-events-none z-0"></div>
      <div className="absolute left-[-8%] bottom-[15%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-secondary/8 to-glow/5 blur-[120px] pointer-events-none z-0 animate-float-delay"></div>

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-24 pt-28 pb-10 relative z-10 max-w-7xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block" variants={staggerItem}>EXPERTISE / CLOUD-NATIVE</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-text-primary leading-[1.08]" variants={staggerItem}>
            Cloud-native Services
          </h1>
          <p className="text-sm sm:text-base text-text-secondary font-light max-w-xl leading-relaxed" variants={staggerItem}>
            We architect globally distributed microservices, deploy elastic container configurations, and set up secure serverless compute clusters.
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
          <AnimatedHeroVisual icon={Server} title="Cloud topology" eyebrow="Elastic platform" scene="cloud" />
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
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce}>Cloud Focus</h2>
            <p className="text-sm text-text-secondary font-light mt-4 leading-relaxed" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              We leverage cloud-native services to speed up project execution. We write custom API extensions to keep systems scaling cleanly.
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
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce}>The Cloud Journey</h2>
            <p className="text-sm text-text-secondary font-light mt-2 max-w-md" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              A systematic overview of how we align infrastructure templates to container releases.
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
            <h2 className="text-3xl font-light tracking-tight" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce}>Delivery Benchmarks</h2>
            <p className="text-sm text-text-secondary font-light leading-relaxed" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              We operate under standard testing guidelines. All container deployments and custom API bridges undergo integration checks and data validations before launch.
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
              <h3 className="text-xl font-bold text-text-primary">Need a cloud-native build?</h3>
              <p className="text-xs text-text-secondary font-light">
                Connect with our cloud-native engineers to review server configurations, map databases, and schedule prototyping runs.
              </p>
              <a
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 border border-primary bg-primary hover:bg-transparent text-text-primary hover:text-primary rounded-full py-4 text-sm font-semibold transition-all duration-300 group"
              >
                <span>Request Container Build</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}








