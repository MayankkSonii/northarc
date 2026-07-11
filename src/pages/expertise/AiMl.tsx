import React from "react";
import ExpertiseLayout from "../../components/ExpertiseLayout";
import type { PageContent } from "../../components/pageLayoutTypes";
import { useSEO, breadcrumbJsonLd, SITE_URL, SITE_NAME } from "../../lib/seo";
import { Brain, Sparkles, Database, Network } from "lucide-react";

export default function AiMl() {
  useSEO({
    title: "AI Development Services | Machine Learning & Generative AI Solutions",
    description:
      "NorthArc delivers custom AI development services for enterprises — from machine learning and generative AI to AI chatbot development services and AI automation solutions for businesses. We are your trusted machine learning development company for production-grade AI systems.",
    path: "/expertise/ai-ml",
    keywords:
      "AI Development Services, AI Software Development, Machine Learning, Generative AI, AI Agents, Custom AI Development Services for Enterprises, Generative AI Development Company, AI Chatbot Development Services, AI Automation Solutions for Businesses, Machine Learning Development Company",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "AI & Machine Learning Development",
        name: "AI & Machine Learning Development",
        description:
          "Custom AI and machine learning engineering, deep learning models, generative AI and LLM applications, RAG search, and autonomous agents delivered to production.",
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

  const content: PageContent = {
    eyebrow: "EXPERTISE / AI & ML",
    title: "AI and Machine Learning",
    intro:
      "We turn your data into decisions, building custom models, fine-tuning frontier LLMs, and deploying autonomous agents that automate work and answer questions with production-grade accuracy and speed.",
    heroIcon: Brain,
    heroScene: "ai",
    heroTitle: "Model pipeline",
    accent: "#1D75FF",
    capsTitle: "Intelligence Domains",
    capsIntro:
      "We engineer custom intelligence loops. We prioritize model audit checklists, PEFT fine-tunings, and containerized endpoints to maximize operational speed.",
    capabilities: [
      { icon: Brain, title: "Custom Deep Learning", desc: "Train proprietary neural network weights, classifiers, and predictive forecasting arrays." },
      { icon: Sparkles, title: "Generative AI & LLMs", desc: "Integrate frontier LLMs (Llama-3, GPT-4) and configure parameter-efficient fine-tuning (PEFT)." },
      { icon: Database, title: "RAG & Vector Search", desc: "Setup semantic index databases (Pinecone, Milvus) and build document parsing pipelines." },
      { icon: Network, title: "Autonomous Agent Loops", desc: "Deploy stateful multi-agent workflows with built-in self-correction capabilities and tool APIs." },
    ],
    processTitle: "The AI/ML Process",
    processIntro:
      "A systematic overview of how we align raw data inputs to optimized neural endpoints.",
    process: [
      { num: "01", title: "Dataset Auditing & Cleaning", desc: "Analyze available data parameters, filter anomalies, and label training inputs." },
      { num: "02", title: "Neural Weights Training", desc: "Configure hyperparameters, execute loss minimization loops, and select model checkpoints." },
      { num: "03", title: "Semantic Database Sync", desc: "Ingest enterprise PDFs, chunk text vectors, and index similarity coordinates." },
      { num: "04", title: "API Endpoint Packaging", desc: "Deploy container endpoints (FastAPI), configure CORS rules, and set up caching." },
      { num: "05", title: "Inference Speed Optimization", desc: "Audit compute latencies, apply weight quantization, and setup hardware scaling rules." },
      { num: "06", title: "Drift Monitoring Setup", desc: "Integrate monitoring metrics, detect semantic variations, and prepare automated retrain scripts." },
    ],
    proofTitle: "Inference Benchmarks",
    proofIntro:
      "We leverage modern quantization techniques and private host nodes. All custom neural setups undergo accuracy checks and drift monitoring before final release.",
    highlights: [
      "Sustained 97% classification and diagnosis accuracy in production.",
      "Isolated private cloud container deployments keeping model keys secure.",
      "Inference latency optimized to sub-100ms via weight quantization.",
      "Continuous model drift monitoring detecting semantic anomalies.",
    ],
    ctaTitle: "Have an AI project to train?",
    ctaIntro:
      "Connect with our ML consultants to analyze dataset counts, review foundation models options, and schedule pipeline kickoffs.",
    ctaLabel: "Request AI Setup",
  };

  return <ExpertiseLayout content={content} />;
}
