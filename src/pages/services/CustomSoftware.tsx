import ServiceLayout from "../../components/ServiceLayout";
import type { PageContent } from "../../components/pageLayoutTypes";
import { useSEO, breadcrumbJsonLd, SITE_URL, SITE_NAME } from "../../lib/seo";
import { Layout, Smartphone, Cpu, Server } from "lucide-react";

export default function CustomSoftware() {
  useSEO({
    title: "Custom Software Development Company | Full-Cycle AI Product Delivery",
    description:
      "NorthArc is a custom software development company delivering enterprise software development from concept to production. We provide tailor-made software development services and scalable custom software solutions — including business process automation software and AI product builds.",
    path: "/services/full-cycle-development",
    keywords:
      "Custom Software Development Company, Enterprise Software, Bespoke Software, Software Engineering, Product Development, Custom Software Development for Businesses, Enterprise Software Development Company, Business Process Automation Software, Tailor-Made Software Development Services, Scalable Custom Software Solutions",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "AI Product Development",
        name: "Full-Cycle AI Product Development",
        description:
          "End-to-end delivery of AI products. LLM applications, machine learning systems, and intelligent web and mobile platforms, from architecture to production.",
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        areaServed: "Worldwide",
        url: `${SITE_URL}/services/full-cycle-development`,
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "AI Product Development", path: "/services/full-cycle-development" },
      ]),
    ],
  });

  const content: PageContent = {
    eyebrow: "SERVICES / AI PRODUCT DEVELOPMENT",
    title: "AI Product Development, End to End",
    intro:
      "Turn your strategic vision into intelligent software that pays for itself. We design, build, and operate LLM applications, machine learning systems, and AI-powered platforms, from first architecture decision to production release.",
    heroIcon: Layout,
    heroScene: "product",
    heroTitle: "AI product build",
    accent: "#1D75FF",

    capsTitle: "Our Core Offerings",
    capsIntro:
      "We deliver intelligent products end to end, from mapping the AI opportunity to production systems your customers and teams rely on daily.",
    capabilities: [
      { icon: Layout, title: "AI-Powered Web Platforms", desc: "Ship SaaS products, portals, and dashboards with intelligence built in, search, summarization, and recommendations your users actually feel." },
      { icon: Smartphone, title: "Intelligent Mobile Apps", desc: "Deliver native iOS/Android or cross-platform apps with AI-assisted experiences that measurably lift engagement and retention." },
      { icon: Cpu, title: "LLM Apps & ML Systems", desc: "Build assistants grounded in your own knowledge, prediction engines, and ML pipelines that turn raw data into faster, better decisions." },
      { icon: Server, title: "MLOps & Cloud Deployment", desc: "Run models in production on monitored, autoscaling infrastructure with CI/CD, so accuracy and cost never drift silently." },
    ],

    processTitle: "The Delivery Journey",
    processIntro:
      "How we take an AI product from validated concept to a system running in production.",
    process: [
      { num: "01", title: "AI Use-Case & Product Design", desc: "Identify the highest-ROI AI opportunities, define success metrics, and design user journeys before a line of code is written." },
      { num: "02", title: "Architecture & Model Selection", desc: "Choose models, data pipelines, and hosting with build-vs-buy decisions grounded in accuracy and cost targets." },
      { num: "03", title: "Agile Development Sprints", desc: "Ship working software bi-weekly, application code and model improvements land together with measurable progress." },
      { num: "04", title: "Evaluation & QA Audits", desc: "Test beyond unit tests: model evaluation suites, regression checks, and load audits before anything reaches users." },
      { num: "05", title: "Production Launch", desc: "Deploy to hardened cloud infrastructure with rollback plans, observability, and security controls in place from day one." },
      { num: "06", title: "Continuous Improvement", desc: "Monitor accuracy, cost, and latency in production; retrain and tune so results improve with every release cycle." },
    ],

    proofTitle: "Guaranteed Standards",
    proofIntro:
      "We operate under clear SLAs. By auditing model performance, code quality, and infrastructure cost, we deliver intelligent systems that scale with business growth.",
    highlights: [
      "100% Intellectual Property (IP) ownership transferred upon final release.",
      "Live dashboards tracking the business metrics your AI is meant to move.",
      "Model evaluation and security testing baked into every release build.",
      "Decoupled architecture so AI capabilities scale with demand, not with cost.",
    ],

    ctaTitle: "Have an AI product idea?",
    ctaIntro:
      "Connect with our AI architects to scope the solution, choose the right models, budget delivery sprints, and schedule a kickoff.",
    ctaLabel: "Scope Your AI Build",
  };

  return <ServiceLayout content={content} />;
}
