import { useSEO, breadcrumbJsonLd, SITE_URL, SITE_NAME } from "../../lib/seo";
import ExpertiseLayout from "../../components/ExpertiseLayout";
import type { PageContent } from "../../components/pageLayoutTypes";
import {
  Smartphone,
  SmartphoneIcon,
  Globe,
  Layers
} from "lucide-react";

export default function WebMobile() {
  useSEO({
    title: "Web & Mobile App Development. AI-Ready Products",
    description:
      "NorthArc engineers fast, AI-ready web and mobile apps that lift engagement, native iOS/Android, React Native, Flutter, offline-first sync, and 60fps UX.",
    path: "/expertise/web-mobile",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Web & Mobile App Development",
        name: "Web & Mobile App Engineering",
        description:
          "High-performance, AI-ready web and mobile product engineering, native iOS and Android, cross-platform React Native and Flutter, and Next.js web apps built for scale and engagement.",
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        areaServed: "Worldwide",
        url: `${SITE_URL}/expertise/web-mobile`,
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Web & Mobile", path: "/expertise/web-mobile" },
      ]),
    ],
  });

  const content: PageContent = {
    eyebrow: "EXPERTISE / WEB & MOBILE",
    title: "Web & Mobile App Engineering",
    intro:
      "We engineer high-fidelity web applications and native/cross-platform mobile apps, ready for AI-powered features. From offline-first synchronization logic to buttery 60fps rendering, we deliver products that measurably lift engagement.",
    heroIcon: Smartphone,
    heroScene: "product",
    heroTitle: "App ecosystem",
    accent: "#1D75FF",
    capsTitle: "Engineering Focus",
    capsIntro:
      "We compile highly optimized client builds. We avoid heavy bundle outputs and prioritize fluid screen transitions to improve user engagement.",
    capabilities: [
      { icon: Smartphone, title: "Native iOS Apps", desc: "Construct high-fidelity, optimized client codebases using Swift and SwiftUI libraries." },
      { icon: SmartphoneIcon, title: "Native Android Apps", desc: "Build responsive, multi-device compatible Android platforms using Kotlin." },
      { icon: Globe, title: "Cross-Platform Clients", desc: "Deploy shared codebase architectures across systems using React Native or Flutter." },
      { icon: Layers, title: "Frontend Web Interfaces", desc: "Ship rapid Next.js and React client portals styled with modern custom layouts." }
    ],
    processTitle: "The Development Workflow",
    processIntro:
      "A systematic overview of how we align user requirements to interactive prototypes.",
    process: [
      { num: "01", title: "Figma UI/UX & Scoping", desc: "Align user interface mockups, structure spacing values, and verify typography metrics." },
      { num: "02", title: "API Gateway Specifications", desc: "Establish endpoints contracts, structure payload parameters, and define database calls." },
      { num: "03", title: "Decoupled Development", desc: "Develop native and web views, synchronize data caches, and integrate network layers." },
      { num: "04", title: "Quality Verification", desc: "Perform unit check lists, execute automated browser scripts, and audit latency times." },
      { num: "05", title: "App Store Packaging", desc: "Build binary outputs, upload to Google Play and Apple TestFlight, and deploy portals." },
      { num: "06", title: "Launch & Metric Auditing", desc: "Collect crash diagnostics reports, monitor API queries, and tweak server nodes." }
    ],
    proofTitle: "Quality Benchmarks",
    proofIntro:
      "We leverage modern client libraries and structured state management layers. All layouts undergo accessibility audits and load diagnostics before App Store release.",
    highlights: [
      "Average render speed maintained at a smooth, lag-free 60fps.",
      "Decoupled client structure allowing easy API version upgrades.",
      "Integrated offline-first database synchronization and cache frameworks.",
      "Complete code reviews and unit coverage exceeding 85% standards."
    ],
    ctaTitle: "Have an app to engineer?",
    ctaIntro:
      "Connect with our client engineering team to review design kits, choose cross-platform options, and launch mobile builds.",
    ctaLabel: "Discuss Your App",
  };

  return <ExpertiseLayout content={content} />;
}
