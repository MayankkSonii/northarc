import { useSEO, breadcrumbJsonLd, SITE_URL, SITE_NAME } from "../../lib/seo";
import ExpertiseLayout from "../../components/ExpertiseLayout";
import type { PageContent } from "../../components/pageLayoutTypes";
import {
  Layers,
  Settings,
  Cpu,
  Smartphone,
} from "lucide-react";

export default function LowCode() {
  useSEO({
    title: "AI-Assisted Low-Code Delivery",
    description:
      "NorthArc ships internal tools, dashboards, and portals in days with AI-assisted low-code delivery. Retool, FlutterFlow, and custom logic on secure backends.",
    path: "/expertise/low-code",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "AI-Assisted Low-Code Delivery",
        name: "AI-Assisted Low-Code Delivery",
        description:
          "Rapid delivery of internal tools, admin dashboards, and customer portals using AI-assisted low-code platforms and custom serverless logic bridges connected to secure enterprise data.",
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        areaServed: "Worldwide",
        url: `${SITE_URL}/expertise/low-code`,
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "AI-Assisted Low-Code Delivery", path: "/expertise/low-code" },
      ]),
    ],
  });

  const content: PageContent = {
    eyebrow: "EXPERTISE / RETOOL & LOW-CODE",
    title: "AI-Assisted Low-Code Delivery",
    intro:
      "We get internal tools, admin dashboards, and customer portals into your team's hands in days, pairing AI-assisted low-code platforms like Retool and FlutterFlow with custom serverless logic wired to your secure data.",
    heroIcon: Layers,
    heroScene: "design",
    heroTitle: "Rapid build",
    accent: "#4DA6FF",

    capsTitle: "Rapid Build Focus",
    capsIntro:
      "We leverage builder interfaces to speed up project scoping. We write custom API extensions to keep systems scaling cleanly without vendor lock-ins.",
    capabilities: [
      { icon: Layers, title: "Platform Integrations", desc: "Integrate and configure enterprise low-code systems (FlutterFlow, Retool, Bubble, Webflow)." },
      { icon: Settings, title: "Custom & AI Logic Bridges", desc: "Develop Node/Python serverless logic, including AI and LLM calls, to extend platform operations with automation and intelligence." },
      { icon: Cpu, title: "Database Configurations", desc: "Connect frontend builders to SQL, Firestore, or Postgres databases via secure REST APIs." },
      { icon: Smartphone, title: "Rapid UI Prototyping", desc: "Deploy internal admin tools, dashboard panels, and customer portals in days." },
    ],

    processTitle: "The Integration Journey",
    processIntro:
      "A systematic overview of how we configure low-code layers and write custom microservices.",
    process: [
      { num: "01", title: "Tool & Platform Scoping", desc: "Identify features constraints, compare retarget options, and select platform stacks." },
      { num: "02", title: "API Bridge Blueprinting", desc: "Draft micro-routing details, map out custom endpoints, and define database structures." },
      { num: "03", title: "UI Layout Assembly", desc: "Construct interface screens, customize theme variables, and link data queries." },
      { num: "04", title: "Custom Back-end Injection", desc: "Deploy serverless backend workers, configure security groups, and write custom actions." },
      { num: "05", title: "End-to-End Testing Runs", desc: "Perform functional checks, evaluate interface load speeds, and check database queries." },
      { num: "06", title: "Launch & Metric Auditing", desc: "Verify domain routings, set up user access permissions, and calibrate backups." },
    ],

    proofTitle: "Delivery Benchmarks",
    proofIntro:
      "We operate under standard testing guidelines. All Retool dashboards and custom API bridges undergo integration checks and data validations before launch.",
    highlights: [
      "Average deployment speed: deliver functioning internal apps in under 15 days.",
      "Decoupled custom logic layers ensuring clean scalability options.",
      "Integrated database encryption and secure authentication loops.",
      "Flexible backend integrations supporting standard REST/GraphQL APIs.",
    ],

    ctaTitle: "Need a Retool panel built?",
    ctaIntro:
      "Connect with our low-code engineers to review builder platforms, map databases, and schedule prototyping runs.",
    ctaLabel: "Request Custom Retool Build",
  };

  return <ExpertiseLayout content={content} />;
}
