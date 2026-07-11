import ServiceLayout from "../../components/ServiceLayout";
import type { PageContent } from "../../components/pageLayoutTypes";
import { useSEO, breadcrumbJsonLd, SITE_URL, SITE_NAME } from "../../lib/seo";
import { Layout, PenTool, Settings, Cpu } from "lucide-react";

export default function CtoService() {
  useSEO({
    title: "Software Development Company | AI Product Strategy & Design",
    description:
      "NorthArc is a trusted software development company in India offering AI product strategy and concept design. An experienced AI development team and digital transformation partner — your technology partner from idea to fundable product blueprint.",
    path: "/services/concept-design",
    keywords:
      "Software Development Company, Technology Partner, Product Engineering Company, IT Consulting Company, AI Experts, Trusted Software Development Company in India, Experienced AI Development Team, Custom Software Development Experts, Digital Transformation Partner, Software Company with Enterprise Experience",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "AI Product Strategy & Design",
        name: "AI Product Strategy & Design",
        description:
          "AI product strategy and design, use-case validation, UX for AI-powered experiences, and technical blueprints for models, data, and architecture, ready for development.",
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        areaServed: "Worldwide",
        url: `${SITE_URL}/services/concept-design`,
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "AI Product Strategy & Design", path: "/services/concept-design" },
      ]),
    ],
  });

  const content: PageContent = {
    eyebrow: "SERVICES / AI PRODUCT STRATEGY & DESIGN",
    title: "Turn AI Ideas into Fundable Products",
    intro:
      "We de-risk your AI product before you build it, validating the use case, designing the experience, and producing a technical blueprint for models, data, and architecture that development teams can execute with confidence.",
    heroIcon: PenTool,
    heroScene: "design",
    heroTitle: "AI concept sprint",
    accent: "#6366F1",

    capsTitle: "Strategy, Design & Tech Advisory",
    capsIntro:
      "We translate business goals into a validated AI product plan, combining user experience, model strategy, and architecture before any build begins.",
    capabilities: [
      { icon: PenTool, title: "AI Use-Case Validation", desc: "Pressure-test the idea, define success metrics, and confirm the AI opportunity is worth building before you invest." },
      { icon: Layout, title: "UX for AI Experiences", desc: "Design intuitive interfaces for assistants, recommendations, and predictions, high-fidelity prototypes users trust." },
      { icon: Settings, title: "Model, Data & Architecture Blueprint", desc: "Map the right models, data pipelines, and cloud architecture with build-vs-buy decisions grounded in cost and accuracy." },
      { icon: Cpu, title: "Rapid AI Prototypes & Pilots", desc: "Stand up working proofs-of-concept to de-risk feasibility and prove value before full-scale development begins." },
    ],

    processTitle: "The Strategy & Design Workflow",
    processIntro:
      "How we move an AI idea from opportunity to a validated, build-ready product blueprint.",
    process: [
      { num: "01", title: "Discovery & AI Opportunity Scoping", desc: "Understand business goals, map user needs, and identify where AI delivers the clearest, highest-ROI impact." },
      { num: "02", title: "Use-Case Validation & Metrics", desc: "Define what success looks like, size the value, and set the accuracy and cost targets the solution must hit." },
      { num: "03", title: "UX & Interactive Prototyping", desc: "Design high-fidelity, click-through experiences for AI features, then validate them through usability testing." },
      { num: "04", title: "Technical & Model Blueprint", desc: "Draft the architecture, model choices, data pipelines, and MLOps approach that will carry the product to production." },
      { num: "05", title: "AI Proof-of-Concept", desc: "Build a focused prototype to prove feasibility, benchmark model quality, and de-risk the build before it scales." },
      { num: "06", title: "Roadmap & Build Handoff", desc: "Deliver design assets, technical specs, and a costed delivery roadmap so development starts with total clarity." },
    ],

    proofTitle: "What You Walk Away With",
    proofIntro:
      "Every engagement ends with clarity and confidence, a validated AI concept, a designed experience, and a technical blueprint your team can build without guesswork.",
    highlights: [
      "A validated AI product concept with clear success metrics before a line of code is written.",
      "Design systems and prototypes tailored to AI-powered experiences, not generic screens.",
      "A technical blueprint covering models, data, and architecture, de-risking the build.",
      "Working proof-of-concept ready for stakeholder buy-in and confident go/no-go decisions.",
    ],

    ctaTitle: "Have an AI idea to validate?",
    ctaIntro:
      "Connect with our AI product strategists and architects to validate the use case, design the experience, and scope a build-ready roadmap.",
    ctaLabel: "Book a Strategy Workshop",
  };

  return <ServiceLayout content={content} />;
}
