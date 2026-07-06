import React from "react";
import ExpertiseLayout from "../../components/ExpertiseLayout";
import type { PageContent } from "../../components/pageLayoutTypes";
import { useSEO, breadcrumbJsonLd, SITE_URL, SITE_NAME } from "../../lib/seo";
import { Sparkles, MessageSquare, BookOpen, Bot } from "lucide-react";

export default function GenerativeAi() {
  useSEO({
    title: "Generative AI & LLM Development",
    description:
      "NorthArc builds enterprise generative AI. RAG knowledge assistants, copilots and AI agents that turn your data into instant answers and automate work.",
    path: "/expertise/generative-ai",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Generative AI & LLM Development",
        name: "Generative AI & LLM Development",
        description:
          "Enterprise generative AI engineering, retrieval-augmented generation, AI copilots and assistants, autonomous agents, and fine-tuned LLM applications delivered to production.",
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

  const content: PageContent = {
    eyebrow: "EXPERTISE / GENERATIVE AI & LLMS",
    title: "Generative AI and LLMs",
    intro:
      "We put your organisation’s knowledge to work, building RAG assistants, copilots and autonomous agents that answer questions instantly from your own data and automate the work that slows your team down.",
    heroIcon: Sparkles,
    heroScene: "ai",
    heroTitle: "Knowledge assistant",
    accent: "#6366F1",
    capsTitle: "What We Build",
    capsIntro:
      "We turn frontier language models into dependable business tools, grounded in your data, wrapped in guardrails, and measured against outcomes that matter.",
    capabilities: [
      { icon: BookOpen, title: "Knowledge Assistants (RAG)", desc: "Give your team instant, sourced answers from your own documents, policies and data, grounded, not hallucinated." },
      { icon: Bot, title: "AI Agents & Automation", desc: "Deploy autonomous agents that take action across your tools, complete multi-step tasks, and offload repetitive work." },
      { icon: MessageSquare, title: "Copilots & Assistants", desc: "Embed AI copilots into your product and internal workflows so people get from question to outcome in seconds." },
      { icon: Sparkles, title: "Fine-Tuning & LLM Integration", desc: "Adapt frontier models to your domain, voice and data, connecting LLMs securely into the systems you already run." },
    ],
    processTitle: "The Generative AI Process",
    processIntro:
      "A systematic path from a high-value use case to a trustworthy assistant running in production.",
    process: [
      { num: "01", title: "Use-Case & ROI Framing", desc: "Identify the highest-value workflows, define success metrics, and scope where generative AI actually moves the number." },
      { num: "02", title: "Knowledge Ingestion", desc: "Connect and clean your documents and data sources, then chunk and embed them into a governed knowledge base." },
      { num: "03", title: "Grounded Retrieval Design", desc: "Build retrieval and prompting so answers stay accurate, cite their sources, and respect access permissions." },
      { num: "04", title: "Agent & Copilot Build", desc: "Compose tool-using agents and copilots with guardrails, human-in-the-loop checks, and safe action boundaries." },
      { num: "05", title: "Evaluation & Guardrails", desc: "Test for accuracy, hallucination and safety with evaluation sets, then harden prompts and fallback behaviour." },
      { num: "06", title: "Deployment & Monitoring", desc: "Ship to production with cost controls, latency tuning, usage analytics, and continuous quality monitoring." },
    ],
    proofTitle: "Built for Trust in Production",
    proofIntro:
      "Generative AI only creates value when people trust the answers. Every assistant we ship is grounded in your data, evaluated for accuracy, and protected by guardrails before it reaches a single user.",
    highlights: [
      "Answers grounded in your own data with cited sources, not model guesswork.",
      "Access-aware retrieval so users only ever see what they are permitted to.",
      "Evaluation and guardrail suites that measure accuracy and catch hallucinations.",
      "Cost and latency optimised through caching, routing and right-sized models.",
    ],
    ctaTitle: "Have a knowledge or automation problem?",
    ctaIntro:
      "Talk to our AI engineers about turning your documents, data and workflows into a grounded assistant or agent that pays for itself.",
    ctaLabel: "Request a GenAI Consult",
  };

  return <ExpertiseLayout content={content} />;
}
