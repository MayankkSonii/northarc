import ServiceLayout from "../../components/ServiceLayout";
import type { PageContent } from "../../components/pageLayoutTypes";
import { useSEO, breadcrumbJsonLd, SITE_URL, SITE_NAME } from "../../lib/seo";
import { Database, Network, FileText, Cpu } from "lucide-react";

export default function ItConsulting() {
  useSEO({
    title: "AI Transformation Consulting - Strategy to ROI",
    description:
      "NorthArc's AI transformation consulting turns operations into an advantage, we find high-ROI use cases, ready your data, and automate workflows that cut cost.",
    path: "/services/transformation-consulting",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "AI Transformation Consulting",
        name: "AI Transformation Consulting",
        description:
          "Enterprise AI transformation consulting. AI readiness assessments, high-ROI use-case roadmaps, data and cloud modernization, and intelligent workflow automation.",
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

  const content: PageContent = {
    eyebrow: "SERVICES / AI TRANSFORMATION CONSULTING",
    title: "Turn Your Operations into an AI Advantage",
    intro:
      "We help you find where AI moves the needle, ready your data and cloud to support it, and automate the workflows that drain time and cost, with a phased roadmap from pilot to enterprise scale.",
    heroIcon: Network,
    heroScene: "cloud",
    heroTitle: "AI transformation map",
    accent: "#0EA5E9",

    capsTitle: "Consulting Specialties",
    capsIntro:
      "We assess where AI creates value, define the data and infrastructure to support it, and set the governance and scaling controls to adopt it safely.",
    capabilities: [
      { icon: Cpu, title: "AI Readiness & Use-Case Roadmaps", desc: "Pinpoint the highest-ROI AI opportunities across your operations and turn them into a costed, prioritized roadmap." },
      { icon: Database, title: "Data & Platform Modernization", desc: "Ready your data for AI, clean pipelines, unified schemas, and modern stacks that models can actually learn from." },
      { icon: Network, title: "Secure Cloud & MLOps Foundations", desc: "Move workloads to AWS/GCP/Azure with the infrastructure to train, deploy, and monitor models reliably at scale." },
      { icon: FileText, title: "AI Governance & Compliance", desc: "Put guardrails, data-handling controls, and SOC-2-aligned governance around AI so adoption stays safe and auditable." },
    ],

    processTitle: "The AI Transformation Journey",
    processIntro:
      "How we move you from AI readiness assessment to production systems delivering measurable ROI.",
    process: [
      { num: "01", title: "Discovery & AI Readiness Audit", desc: "Assess data maturity, systems, and workflows to see where AI can move the biggest business metrics." },
      { num: "02", title: "Use-Case Prioritization", desc: "Score opportunities by ROI, feasibility, and risk, then draft a phased roadmap leadership can commit to." },
      { num: "03", title: "Data & Infrastructure Foundations", desc: "Modernize pipelines, cloud, and MLOps so models have clean data and a reliable path to production." },
      { num: "04", title: "Pilot & Proof-of-Value", desc: "Ship a focused pilot in a real workflow, measure impact against baselines, and validate the business case." },
      { num: "05", title: "Scale & Workflow Automation", desc: "Roll proven AI into production, automate the surrounding workflows, and integrate with CRM, ERP, and data systems." },
      { num: "06", title: "Governance, Monitoring & SLAs", desc: "Track accuracy, cost, and drift in production with alerting, governance controls, and continuous improvement." },
    ],

    proofTitle: "Outcomes You Can Measure",
    proofIntro:
      "We tie every engagement to business results, not experiments. AI is adopted on secure, governed foundations with a clear line from investment to return.",
    highlights: [
      "High-ROI AI use cases mapped to measurable business outcomes, not vanity pilots.",
      "SOC-2 and HIPAA-aligned data governance for sensitive and regulated workloads.",
      "Production-grade MLOps so models stay accurate, monitored, and cost-controlled.",
      "Phased, low-risk adoption roadmap with a clear path from pilot to enterprise scale.",
    ],

    ctaTitle: "Ready to assess your AI readiness?",
    ctaIntro:
      "Connect with our AI consultants to identify high-ROI use cases, evaluate your data and cloud foundations, and plan a phased adoption roadmap.",
    ctaLabel: "Request AI Readiness Assessment",
  };

  return <ServiceLayout content={content} />;
}
