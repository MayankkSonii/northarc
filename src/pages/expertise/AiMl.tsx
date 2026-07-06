import React from "react";
import { motion } from "motion/react";
import { staggerContainer, staggerItem, fadeUpVariant, viewportOnce } from "../../lib/animations";
import { AnimatedHeroVisual } from "../../components/AnimatedHeroVisual";
import { useSEO, breadcrumbJsonLd, SITE_URL, SITE_NAME } from "../../lib/seo";
import {
  ArrowRight,
  ArrowDown,
  Check,
  Brain,
  Sparkles,
  Database,
  Network
} from "lucide-react";

export default function AiMl() {
  useSEO({
    title: "AI & Machine Learning Development",
    description:
      "NorthArc builds and deploys custom AI and machine learning — LLM apps, RAG search, and predictive models that cut costs and drive measurable business outcomes.",
    path: "/expertise/ai-ml",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "AI & Machine Learning Development",
        name: "AI & Machine Learning Development",
        description:
          "Custom AI and machine learning engineering — deep learning models, generative AI and LLM applications, RAG search, and autonomous agents delivered to production.",
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        areaServed: "Worldwide",
        url: `${SITE_URL}/expertise/ai-ml`,
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "AI & Machine Learning", path: "/expertise/ai-ml" },
      ]),
    ],
  });

  const capabilities = [
    { icon: Brain, title: "Custom Deep Learning", desc: "Train proprietary neural network weights, classifiers, and predictive forecasting arrays." },
    { icon: Sparkles, title: "Generative AI & LLMs", desc: "Integrate frontier LLMs (Llama-3, GPT-4) and configure parameter-efficient fine-tuning (PEFT)." },
    { icon: Database, title: "RAG & Vector Search", desc: "Setup semantic index databases (Pinecone, Milvus) and build document parsing pipelines." },
    { icon: Network, title: "Autonomous Agent Loops", desc: "Deploy stateful multi-agent workflows with built-in self-correction capabilities and tool APIs." }
  ];

  const processSteps = [
    { num: "01", title: "Dataset Auditing & Cleaning", desc: "Analyze available data parameters, filter anomalies, and label training inputs." },
    { num: "02", title: "Neural Weights Training", desc: "Configure hyperparameters, execute loss minimization loops, and select model checkpoints." },
    { num: "03", title: "Semantic Database Sync", desc: "Ingest enterprise PDFs, chunk text vectors, and index similarity coordinates." },
    { num: "04", title: "API Endpoint Packaging", desc: "Deploy container endpoints (FastAPI), configure CORS rules, and set up caching." },
    { num: "05", title: "Inference Speed Optimization", desc: "Audit compute latencies, apply weight quantization, and setup hardware scaling rules." },
    { num: "06", title: "Drift Monitoring Setup", desc: "Integrate monitoring metrics, detect semantic variations, and prepare automated retrain scripts." }
  ];

  const highlights = [
    "Sustained 97% classification and diagnosis accuracy in production.",
    "Isolated private cloud container deployments keeping model keys secure.",
    "Inference latency optimized to sub-100ms via weight quantization.",
    "Continuous model drift monitoring detecting semantic anomalies."
  ];

  return (
    <div className="bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans text-left">

      {/* Wave Decorative Orbs */}
      <div className="absolute right-[-10%] top-[5%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-primary/10 to-primary/15 blur-[130px] pointer-events-none z-0"></div>
      <div className="absolute left-[-8%] bottom-[15%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-secondary/8 to-glow/5 blur-[120px] pointer-events-none z-0 animate-float-delay"></div>

      {/* 1. HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-24 pt-28 pb-10 relative z-10 max-w-7xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block" variants={staggerItem}>EXPERTISE / AI & ML</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-text-primary leading-[1.08]" variants={staggerItem}>
            AI and Machine Learning
          </h1>
          <p className="text-sm sm:text-base text-text-secondary font-light max-w-xl leading-relaxed" variants={staggerItem}>
            We turn your data into decisions — building custom models, fine-tuning frontier LLMs, and deploying autonomous agents that automate work and answer questions with production-grade accuracy and speed.
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
          <AnimatedHeroVisual icon={Brain} title="Model pipeline" eyebrow="AI system" scene="ai" />
        </div>

        {/* Scroll Indicator */}
        <div className="flex items-center space-x-3 text-xs text-text-secondary font-light font-mono opacity-80 pt-12 lg:pt-0" variants={staggerItem}>
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
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">Intelligence Domains</h2>
            <p className="text-sm text-text-secondary font-light mt-4 leading-relaxed">
              We engineer custom intelligence loops. We prioritize model audit checklists, PEFT fine-tunings, and containerized endpoints to maximize operational speed.
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

      {/* 3. PROCESS STEPS */}
      <section className="py-16 px-6 md:px-12 lg:px-24 border-t border-border/10 relative z-10 max-w-7xl mx-auto">
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">The AI/ML Process</h2>
            <p className="text-sm text-text-secondary font-light mt-2 max-w-md">
              A systematic overview of how we align raw data inputs to optimized neural endpoints.
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
            <h2 className="text-3xl font-light tracking-tight">Inference Benchmarks</h2>
            <p className="text-sm text-text-secondary font-light leading-relaxed">
              We leverage modern quantization techniques and private host nodes. All custom neural setups undergo accuracy checks and drift monitoring before final release.
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
              <h3 className="text-xl font-bold text-text-primary">Have an AI project to train?</h3>
              <p className="text-xs text-text-secondary font-light">
                Connect with our ML consultants to analyze dataset counts, review foundation models options, and schedule pipeline kickoffs.
              </p>
              <a
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 border border-primary bg-primary hover:bg-transparent text-text-primary hover:text-primary rounded-full py-4 text-sm font-semibold transition-all duration-300 group"
              >
                <span>Request AI Setup</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}








