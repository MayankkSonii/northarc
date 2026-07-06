import React from "react";
import { motion } from "motion/react";
import { staggerContainer, staggerItem, fadeUpVariant, viewportOnce } from "../../lib/animations";
import { AnimatedHeroVisual } from "../../components/AnimatedHeroVisual";
import { useSEO, breadcrumbJsonLd, SITE_URL, SITE_NAME } from "../../lib/seo";
import {
  ArrowRight,
  ArrowDown,
  Check,
  Sparkles,
  MessageSquare,
  BookOpen,
  Bot
} from "lucide-react";

export default function GenerativeAi() {
  useSEO({
    title: "Generative AI & LLM Development",
    description:
      "NorthArc builds enterprise generative AI — RAG knowledge assistants, copilots and AI agents that turn your data into instant answers and automate work.",
    path: "/expertise/generative-ai",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Generative AI & LLM Development",
        name: "Generative AI & LLM Development",
        description:
          "Enterprise generative AI engineering — retrieval-augmented generation, AI copilots and assistants, autonomous agents, and fine-tuned LLM applications delivered to production.",
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        areaServed: "Worldwide",
        url: `${SITE_URL}/expertise/generative-ai`,
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Generative AI & LLMs", path: "/expertise/generative-ai" },
      ]),
    ],
  });

  const capabilities = [
    { icon: BookOpen, title: "Knowledge Assistants (RAG)", desc: "Give your team instant, sourced answers from your own documents, policies and data — grounded, not hallucinated." },
    { icon: Bot, title: "AI Agents & Automation", desc: "Deploy autonomous agents that take action across your tools, complete multi-step tasks, and offload repetitive work." },
    { icon: MessageSquare, title: "Copilots & Assistants", desc: "Embed AI copilots into your product and internal workflows so people get from question to outcome in seconds." },
    { icon: Sparkles, title: "Fine-Tuning & LLM Integration", desc: "Adapt frontier models to your domain, voice and data — connecting LLMs securely into the systems you already run." }
  ];

  const processSteps = [
    { num: "01", title: "Use-Case & ROI Framing", desc: "Identify the highest-value workflows, define success metrics, and scope where generative AI actually moves the number." },
    { num: "02", title: "Knowledge Ingestion", desc: "Connect and clean your documents and data sources, then chunk and embed them into a governed knowledge base." },
    { num: "03", title: "Grounded Retrieval Design", desc: "Build retrieval and prompting so answers stay accurate, cite their sources, and respect access permissions." },
    { num: "04", title: "Agent & Copilot Build", desc: "Compose tool-using agents and copilots with guardrails, human-in-the-loop checks, and safe action boundaries." },
    { num: "05", title: "Evaluation & Guardrails", desc: "Test for accuracy, hallucination and safety with evaluation sets, then harden prompts and fallback behaviour." },
    { num: "06", title: "Deployment & Monitoring", desc: "Ship to production with cost controls, latency tuning, usage analytics, and continuous quality monitoring." }
  ];

  const highlights = [
    "Answers grounded in your own data with cited sources — not model guesswork.",
    "Access-aware retrieval so users only ever see what they are permitted to.",
    "Evaluation and guardrail suites that measure accuracy and catch hallucinations.",
    "Cost and latency optimised through caching, routing and right-sized models."
  ];

  return (
    <div className="bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans text-left">

      {/* Wave Decorative Orbs */}
      <div className="absolute right-[-10%] top-[5%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-primary/10 to-primary/15 blur-[130px] pointer-events-none z-0"></div>
      <div className="absolute left-[-8%] bottom-[15%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-secondary/8 to-glow/5 blur-[120px] pointer-events-none z-0 animate-float-delay"></div>

      {/* 1. HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-24 pt-28 pb-10 relative z-10 max-w-7xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block" variants={staggerItem}>EXPERTISE / GENERATIVE AI & LLMS</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-text-primary leading-[1.08]" variants={staggerItem}>
            Generative AI and LLMs
          </h1>
          <p className="text-sm sm:text-base text-text-secondary font-light max-w-xl leading-relaxed" variants={staggerItem}>
            We put your organisation&rsquo;s knowledge to work — building RAG assistants, copilots and autonomous agents that answer questions instantly from your own data and automate the work that slows your team down.
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
          <AnimatedHeroVisual icon={Sparkles} title="Knowledge assistant" eyebrow="Generative AI" scene="ai" />
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
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">What We Build</h2>
            <p className="text-sm text-text-secondary font-light mt-4 leading-relaxed">
              We turn frontier language models into dependable business tools — grounded in your data, wrapped in guardrails, and measured against outcomes that matter.
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
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">The Generative AI Process</h2>
            <p className="text-sm text-text-secondary font-light mt-2 max-w-md">
              A systematic path from a high-value use case to a trustworthy assistant running in production.
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
            <h2 className="text-3xl font-light tracking-tight">Built for Trust in Production</h2>
            <p className="text-sm text-text-secondary font-light leading-relaxed">
              Generative AI only creates value when people trust the answers. Every assistant we ship is grounded in your data, evaluated for accuracy, and protected by guardrails before it reaches a single user.
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
              <h3 className="text-xl font-bold text-text-primary">Have a knowledge or automation problem?</h3>
              <p className="text-xs text-text-secondary font-light">
                Talk to our AI engineers about turning your documents, data and workflows into a grounded assistant or agent that pays for itself.
              </p>
              <a
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 border border-primary bg-primary hover:bg-transparent text-text-primary hover:text-primary rounded-full py-4 text-sm font-semibold transition-all duration-300 group"
              >
                <span>Request a GenAI Consult</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
