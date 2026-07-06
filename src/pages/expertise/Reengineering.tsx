import { useSEO, breadcrumbJsonLd, SITE_URL, SITE_NAME } from "../../lib/seo";
import ExpertiseLayout from "../../components/ExpertiseLayout";
import type { PageContent } from "../../components/pageLayoutTypes";
import {
  RefreshCw,
  Layers,
  Settings,
  ShieldCheck
} from "lucide-react";

export default function Reengineering() {
  useSEO({
    title: "Legacy System Reengineering with AI",
    description:
      "NorthArc modernizes legacy systems with AI, refactoring technical debt into decoupled, cloud-native services that cut costs, boost reliability, stay AI-ready.",
    path: "/expertise/reengineering",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Legacy System Reengineering",
        name: "Legacy System Reengineering with AI",
        description:
          "Modernization of legacy software using AI-assisted refactoring, decoupling monoliths into cloud-native microservices, retiring technical debt, and making systems ready for intelligent automation.",
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        areaServed: "Worldwide",
        url: `${SITE_URL}/expertise/reengineering`,
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Legacy System Reengineering with AI", path: "/expertise/reengineering" },
      ]),
    ],
  });

  const content: PageContent = {
    eyebrow: "EXPERTISE / REENGINEERING",
    title: "Legacy System Reengineering with AI",
    intro:
      "We modernize aging systems into decoupled, cloud-native services, retiring technical debt with AI-assisted refactoring so your platform runs leaner, more reliably, and ready for intelligent automation.",
    heroIcon: RefreshCw,
    heroScene: "cloud",
    heroTitle: "Legacy rebuild",
    accent: "#6366F1",
    capsTitle: "Refinement Focus",
    capsIntro:
      "We eliminate system bloat. We prioritize clean code variables, modern design frameworks, and resource scaling to maintain software health.",
    capabilities: [
      { icon: RefreshCw, title: "AI-Assisted Code Refactoring", desc: "Rewrite outdated code, extract modular frameworks, and retire technical debt faster with AI-assisted refactoring and review." },
      { icon: Layers, title: "Database Schema Tuning", desc: "Redefine database models, optimize slow index structures, and configure caching." },
      { icon: Settings, title: "System Decoupling", desc: "Break down bulky monolithic servers into decoupled microservices to improve reliability." },
      { icon: ShieldCheck, title: "Security Modernization", desc: "Tweak authentication loops, integrate modern SSL keys, and apply data encryption standards." }
    ],
    processTitle: "The Modernization Journey",
    processIntro:
      "A systematic overview of how we refactor legacy softwares with zero operational downtime.",
    process: [
      { num: "01", title: "Legacy Code Diagnostics", desc: "Examine active scripts, catalog tech debt points, and map dependency configurations." },
      { num: "02", title: "Target Architecture Design", desc: "Select modern libraries, design database schemas, and map VPC hosting settings." },
      { num: "03", title: "Monolith Decoupling Pilot", desc: "Build sandbox microservices endpoints, map data synchronization flows, and run tests." },
      { num: "04", title: "Incremental Refactoring Sprints", desc: "Rewrite component code iteratively, implement testing, and deploy updates in sprints." },
      { num: "05", title: "Staging Tests & Audits", desc: "Perform regression checklists, run automated unit test blocks, and check speed times." },
      { num: "06", title: "Mainnet Toggle & Tuning", desc: "Switch traffic endpoints, configure telemetry status logs, and configure server backups." }
    ],
    proofTitle: "Quality Benchmarks",
    proofIntro:
      "We leverage modern client refactoring standards. All updated modules undergo code review loops and automated regression check runs before mainnet launch.",
    highlights: [
      "Sustained 40% reduction in system memory overhead after code decoupling.",
      "Eliminated duplicate dependency calls, speeding up pipeline performance.",
      "Integrated SOC-2 alignment for legacy database storage formats.",
      "Detailed developer documentation mapping refactored microservices."
    ],
    ctaTitle: "Need a code audit?",
    ctaIntro:
      "Connect with our reengineering consultants to review monolithic systems, analyze technical debt, and plan refactoring sprints.",
    ctaLabel: "Request Code Audit",
  };

  return <ExpertiseLayout content={content} />;
}
