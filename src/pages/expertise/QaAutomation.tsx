import { useSEO, breadcrumbJsonLd, SITE_URL, SITE_NAME } from "../../lib/seo";
import ExpertiseLayout from "../../components/ExpertiseLayout";
import type { PageContent } from "../../components/pageLayoutTypes";
import {
  CheckCircle,
  Layers,
  Cpu,
  ShieldCheck,
} from "lucide-react";

export default function QaAutomation() {
  useSEO({
    title: "Software Development Services | QA Automation & CI/CD Testing",
    description:
      "NorthArc provides software development services that include QA automation and intelligent test automation. Our end-to-end software development services include CI/CD quality gates, AI-assisted test generation, and custom software development for enterprises that ships faster and more reliably.",
    path: "/expertise/qa-automation",
    keywords:
      "Software Development Services, Software Engineering, DevOps, CI/CD, QA Automation, End-to-End Software Development Services, Custom Software Development for Enterprises, AI-Assisted Test Automation, Enterprise Software Solutions Provider",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "QA & Intelligent Test Automation",
        name: "QA & Intelligent Test Automation",
        description:
          "Intelligent test automation across browser, API, and load testing. AI-assisted test generation and CI/CD quality gates that catch defects before release and accelerate delivery.",
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        areaServed: "Worldwide",
        url: `${SITE_URL}/expertise/qa-automation`,
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "QA & Intelligent Test Automation", path: "/expertise/qa-automation" },
      ]),
    ],
  });

  const content: PageContent = {
    eyebrow: "EXPERTISE / QA & AUTOMATION",
    title: "QA & Intelligent Test Automation",
    intro:
      "We help teams ship reliable software faster. AI-assisted browser test suites, CI/CD quality gates, and load audits that catch defects before your users ever do.",
    heroIcon: CheckCircle,
    heroScene: "security",
    heroTitle: "Quality pipeline",
    accent: "#0EA5E9",

    capsTitle: "Quality Focus",
    capsIntro:
      "We eliminate manual testing bottlenecks. We prioritize automated regression blocks, API schema checks, and pipeline gates to speed up delivery.",
    capabilities: [
      { icon: CheckCircle, title: "AI-Assisted Browser Testing", desc: "Generate and maintain comprehensive frontend integration tests in Playwright, Cypress, and Selenium, accelerated with AI-assisted test authoring." },
      { icon: Layers, title: "Integration & API Testing", desc: "Build automated test suites for REST and GraphQL endpoints verifying request payloads." },
      { icon: Cpu, title: "Load & Stress Testing", desc: "Simulate concurrent user workloads using k6, audit response rates, and identify server crashes." },
      { icon: ShieldCheck, title: "Vulnerability Scanning", desc: "Integrate static code analysis (SonarQube) and vulnerability checkers inside CI/CD." },
    ],

    processTitle: "The QA Workflow",
    processIntro:
      "A systematic overview of how we write automated check blocks for enterprise codebases.",
    process: [
      { num: "01", title: "Test Plan Scoping", desc: "Understand component dependencies, define coverage metrics, and select testing frameworks." },
      { num: "02", title: "Unit Test Integration", desc: "Configure Jest/Vitest suites, write mock databases states, and check local pipelines." },
      { num: "03", title: "API Validation Automation", desc: "Develop automatic tests verifying API outputs, response schemas, and latency limits." },
      { num: "04", title: "End-to-End Browser Tests", desc: "Write Playwright scripts testing checkout runs, login paths, and forms inputs." },
      { num: "05", title: "Load & Security Auditing", desc: "Run load audits (k6) in staging, analyze database latency, and scan code packages." },
      { num: "06", title: "Continuous CI/CD Release", desc: "Trigger automated test checks on git merge, audit coverage graphs, and compile builds." },
    ],

    proofTitle: "Uptime & Test Standards",
    proofIntro:
      "We leverage cloud testing networks and strict regression checks. All codebase updates undergo automated verification before launch.",
    highlights: [
      "Average test coverage exceeding 90% for critical business workflows.",
      "Integrated code scanners detecting vulnerabilities inside pull requests.",
      "Database load validations simulating up to 10,000 requests per second.",
      "Playwright test blocks configured to run concurrently in container networks.",
    ],

    ctaTitle: "Need automated testing?",
    ctaIntro:
      "Connect with our QA consultants to assess codebases, select framework options, and plan test automation schedules.",
    ctaLabel: "Request QA Plan",
  };

  return <ExpertiseLayout content={content} />;
}
