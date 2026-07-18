import { useSEO, breadcrumbJsonLd, SITE_URL, SITE_NAME } from "../../lib/seo";
import ExpertiseLayout from "../../components/ExpertiseLayout";
import type { PageContent } from "../../components/pageLayoutTypes";
import {
  Settings,
  ShieldCheck,
  Clock,
  Cpu
} from "lucide-react";

export default function SupportMaintenance() {
  useSEO({
    title: "Software Development Services | Application Support & Maintenance",
    description:
      "NorthArc delivers software development services including enterprise application support and maintenance. Custom software development for enterprises with 24/7 AI-driven monitoring, anomaly detection, and an enterprise software solutions provider you can rely on.",
    path: "/expertise/support-maintenance",
    keywords:
      "Software Development Services, Software Engineering, Cloud Solutions, Application Support, Managed Services, Custom Software Development for Enterprises, Enterprise Software Solutions Provider, AI-Powered Application Maintenance",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Application Support & Maintenance",
        name: "AI-Powered Support & Maintenance",
        description:
          "Continuous, SLA-backed support and maintenance with intelligent monitoring. AI-assisted anomaly detection, security patching, performance tuning, and rapid incident response.",
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        areaServed: "Worldwide",
        url: `${SITE_URL}/expertise/support-maintenance`,
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Support & Maintenance", path: "/expertise/support-maintenance" },
      ]),
    ],
  });

  const content: PageContent = {
    eyebrow: "EXPERTISE / SUPPORT & MAINTENANCE",
    title: "Support & Maintenance",
    intro:
      "We keep your systems always-on with continuous, AI-assisted monitoring, proactive security patching, and rapid incident resolution under strict SLA contracts.",
    heroIcon: Settings,
    heroScene: "security",
    heroTitle: "SLA loop",
    accent: "#0EA5E9",
    capsTitle: "Maintenance Focus",
    capsIntro:
      "We eliminate technical debt before it bites. Intelligent monitoring surfaces anomalies early, while regular package audits, server checks, and backup loops keep systems safe.",
    capabilities: [
      { icon: Settings, title: "Infrastructure Updates", desc: "Keep server software versions up-to-date, patch database engines, and scale host layers." },
      { icon: ShieldCheck, title: "Security Patches", desc: "Audit dependency packages, evaluate security vulnerability notices, and integrate hotfixes." },
      { icon: Clock, title: "SLA Response Support", desc: "Provide continuous monitoring, incident tracking boards, and rapid bug troubleshooting." },
      { icon: Cpu, title: "Performance Audits", desc: "Optimize index structures, tune query bottlenecks, and reduce background storage costs." }
    ],
    processTitle: "The Support Workflow",
    processIntro:
      "A systematic overview of how we monitor cloud resources and resolve server incidents.",
    process: [
      { num: "01", title: "System Scoping & Assessment", desc: "Review current dependencies packages, catalog host configurations, and identify gaps." },
      { num: "02", title: "Monitoring Dashboard Setup", desc: "Configure alert supervisors, map incident trackers, and verify notifications flow." },
      { num: "03", title: "Security SLA Definition", desc: "Establish response timeframes, define severity metrics, and outline backup routes." },
      { num: "04", title: "Incremental System Tuning", desc: "Run database script cleanups, configure query cache settings, and drop unused logs." },
      { num: "05", title: "Dependency Updates Sprints", desc: "Upgrade target libraries, run tests loops, and deploy hotfixes with zero downtime." },
      { num: "06", title: "Incident Retrospectives", desc: "Document resolved server bottlenecks, adjust alert parameters, and verify backups." }
    ],
    proofTitle: "SLA Performance",
    proofIntro:
      "We operate under standard compliance limits. All server updates and patches undergo staging verification runs to prevent build crashes in production.",
    highlights: [
      "Average incident response time under 15 minutes for critical blockers.",
      "Integrated database monitoring preventing database memory leaks.",
      "Automated nightly system backup protocols with data health checks.",
      "Detailed diagnostic monthly summaries detailing system security status."
    ],
    ctaTitle: "Need continuous system support?",
    ctaIntro:
      "Connect with our maintenance team to map dependencies, review monitoring options, and choose SLA parameters.",
    ctaLabel: "Request SLA Setup",
  };

  return <ExpertiseLayout content={content} />;
}
