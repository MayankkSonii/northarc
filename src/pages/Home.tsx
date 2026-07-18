import React, { useState, useEffect, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import {
  ArrowRight,
  Brain,
  Layers,
  Zap,
  ShieldCheck,
  LineChart,
  Briefcase,
  Activity,
  MapPin,
  Mail,
  Phone,
  Clock,
  Check,
  Send,
  Sparkles,
  Bot,
  ScanText,
  BarChart3,
  TrendingUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { SERVICES, DEPLOYMENT_STEPS, SOLUTIONS } from "../data";
import { products } from "../data/productsData";
import { industries, functions } from "../data/solutionsData";
import { caseStudies } from "../data/caseStudiesData";
import { ThreeDCanvas } from "../components/ThreeDCanvas";
import { useSEO, SITE_URL } from "../lib/seo";
import {
  staggerContainer,
  staggerItem,
  viewportOnce,
  viewportSoft,
  makeStagger,
  fadeUpVariant,
  slideLeftVariant,
  slideRightVariant,
  blurInVariant,
  lineDrawVariant,
  lineDrawVerticalVariant,
  scalePopVariant,
  wordRevealContainer,
  wordRevealItem,
} from "../lib/animations";
import AnimatedText from "../components/animations/AnimatedText";
import ScrollReveal from "../components/animations/ScrollReveal";
import ParallaxSection from "../components/ParallaxSection";

// ProfessionalService structured data for the home route.
// (The Organization schema lives statically in index.html, not duplicated here.)
const HOME_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#professional-service`,
  name: "NorthArc",
  url: SITE_URL,
  slogan: "Connecting Intelligence to Impact.",
  description:
    "AI engineering, data science, and intelligent automation company helping enterprises turn data and operations into measurable business outcomes.",
  email: "business@northarc.in",
  telephone: "+91-8849969336",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI Engineering, Data Science & Intelligent Automation Services",
    itemListElement: [
      ...SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
        },
      })),
      ...products.map((p) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: p.name,
          description: p.summary,
          url: `${SITE_URL}/services/${p.slug}`,
        },
      })),
    ],
  },
};

// Outcome-led capability band, "what we do" mapped to business value.
const CAPABILITIES = [
  {
    icon: Bot,
    title: "Intelligent Automation",
    outcome: "Take the manual, repetitive work off your teams so they focus on what moves the business.",
  },
  {
    icon: Sparkles,
    title: "Generative AI & Assistants",
    outcome: "Provide instant, trusted answers using your own knowledge base, complete with citations your teams can verify.",
  },
  {
    icon: Brain,
    title: "Autonomous AI Agents",
    outcome: "Deploy agents that research, decide, and act across your systems to run workflows end to end.",
  },
  {
    icon: TrendingUp,
    title: "Predictive Machine Learning",
    outcome: "Forecast demand, score leads, and flag churn before it happens to protect and grow revenue.",
  },
  {
    icon: ScanText,
    title: "Document AI",
    outcome: "Eliminate manual data entry by turning forms, contracts, and scans into clean, validated data.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Decision Intelligence",
    outcome: "Give every team self-serve answers from your data in plain language. Make decisions in seconds, not days.",
  },
];

// A curated selection of products for the Home preview grid.
const PRODUCT_PREVIEW_SLUGS = [
  "voice-ai-calling-agent",
  "rag-knowledge-assistant",
  "predictive-lead-scoring",
  "ai-sales-agent",
  "document-ai-ocr",
  "ai-analytics-copilot",
];
const PREVIEW_PRODUCTS = PRODUCT_PREVIEW_SLUGS
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is (typeof products)[number] => Boolean(p));

// Featured, metric-bearing case studies for the highlights strip.
const HIGHLIGHT_STUDIES = caseStudies.filter((c) => c.featured).slice(0, 3);

// A few industry + function solutions for the "solutions by industry & function" section.
const SOLUTION_PREVIEW = [...industries.slice(0, 4), ...functions.slice(0, 2)];

// Trust band, platforms and frameworks the delivery runs on (text chips, no external assets).
const TRUST_CHIPS = [
  "AWS", "Microsoft Azure", "Google Cloud", "OpenAI", "Anthropic Claude",
  "Google Gemini", "LangChain", "PyTorch", "TensorFlow", "BigQuery", "Vertex AI", "scikit-learn",
];

// Frequently asked questions, also rendered as FAQPage structured data.
const FAQ_ITEMS = [
  {
    question: "What does NorthArc actually build for clients?",
    answer: "We build production-grade AI systems: LLM applications grounded in your own data, predictive machine learning models, intelligent automation pipelines, and the web and mobile platforms that surface them. Every engagement ships as working software running in your cloud, not a proof of concept.",
  },
  {
    question: "How long does a typical AI engagement take?",
    answer: "Most engagements move from opportunity audit to a first production release in 6 to 10 weeks, then continue in bi-weekly delivery sprints. Timelines scale with scope, we agree on milestones and success metrics before any build work starts.",
  },
  {
    question: "Do you work with our existing cloud and tech stack?",
    answer: "Yes. We deploy inside your own AWS, Azure, or GCP environment and integrate with your existing data warehouse, APIs, and CI/CD pipeline rather than asking you to adopt a new platform.",
  },
  {
    question: "Do you offer team augmentation instead of full projects?",
    answer: "Yes. Alongside full-cycle product delivery, we embed AI engineers and data scientists directly into your team on a dedicated basis, working inside your existing sprints and tooling.",
  },
  {
    question: "Who owns the code and models you build?",
    answer: "You do. 100% intellectual property ownership transfers to you on final release, including model weights, training pipelines, and source code.",
  },
  {
    question: "Do you support us after launch?",
    answer: "Yes. We monitor accuracy, cost, and latency in production and offer ongoing support and retraining plans so performance improves with every release rather than degrading over time.",
  },
];

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding-sm bg-bg relative border-t border-border/40 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[40vw] h-[40vw] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(29,117,255,0.04) 0%, transparent 70%)" }} />
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-left">
        <ScrollReveal variant="fadeUp" className="space-y-4 content-space-sm max-w-2xl">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-widest text-primary font-mono block"
          >
            FAQ
          </motion.span>
          <AnimatedText
            text="Frequently Asked Questions"
            as="h2"
            type="words"
            className="text-3xl md:text-5xl font-light tracking-tight text-text-primary leading-[1.1]"
          />
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="text-base text-text-secondary font-light leading-relaxed">
              Answers to what prospective partners ask us most before kicking off an engagement.
            </p>
          </ScrollReveal>
        </ScrollReveal>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            const fromLeft = idx % 2 === 0;
            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, x: fromLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className={`rounded-2xl border bg-surface overflow-hidden transition-all duration-300 ${isOpen
                    ? "border-primary/40 shadow-lg shadow-primary/5"
                    : "border-border hover:border-primary/20"
                  }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
                >
                  <span className={`text-sm md:text-base font-bold transition-colors duration-200 ${isOpen ? "text-primary" : "text-text-primary group-hover:text-primary"
                    }`}>{item.question}</span>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen
                      ? "bg-primary border-primary text-white rotate-180"
                      : "border-border text-text-secondary group-hover:border-primary/40 group-hover:text-primary"
                    }`}>
                    <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1">
                        <div className="h-px bg-border/50 mb-4" />
                        <p className="text-sm text-text-secondary font-light leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Animated Stats Counter Component
interface AnimatedCounterProps {
  value: string;
}

function AnimatedCounter({ value }: AnimatedCounterProps) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const numPart = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const end = numPart;
    if (end === 0) return;
    const duration = 1500;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCurrent(end);
        clearInterval(timer);
      } else {
        setCurrent(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [hasStarted, numPart]);

  return (
    <span ref={ref} className="font-mono tabular-nums font-bold">
      {hasStarted ? current : 0}
      {suffix}
    </span>
  );
}

interface TechLogo {
  name: string;
  cats: string[];
  color: string;
  slug?: string;
  customSvg?: React.ReactNode;
}

const TECH_ITEMS: TechLogo[] = [
  { name: "Node.js", cats: ["Back-End"], color: "#339933", slug: "nodedotjs" },
  {
    name: "Java",
    cats: ["Back-End", "Android"],
    color: "#ED8B00",
    customSvg: (
      <svg className="w-12 h-12 text-[#ED8B00] grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149" />
        <path d="M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218" />
        <path d="M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573" />
        <path d="M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82" />
        <path d="M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892" />
        <path d="M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118" />
        <path d="M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627" />
        <path d="M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639" />
      </svg>
    )
  },
  { name: "Python", cats: ["Back-End", "AI & ML"], color: "#3776AB", slug: "python" },
  { name: "PHP", cats: ["Back-End"], color: "#777BB4", slug: "php" },
  { name: "C", cats: ["Back-End"], color: "#659AD2", slug: "c" },
  { name: "React", cats: ["Front-End"], color: "#61DAFB", slug: "react" },
  { name: "Angular", cats: ["Front-End"], color: "#DD0031", slug: "angular" },
  { name: "Vue", cats: ["Front-End"], color: "#4FC08D", slug: "vuedotjs" },
  { name: "Next.js", cats: ["Front-End"], color: "#000000", slug: "nextdotjs" },
  { name: "Swift", cats: ["iOS"], color: "#F05138", slug: "swift" },
  { name: "Kotlin", cats: ["Android", "Cross-platform"], color: "#7F52FF", slug: "kotlin" },
  { name: "React Native", cats: ["Cross-platform"], color: "#61DAFB", slug: "react" },
  { name: "Flutter", cats: ["Cross-platform"], color: "#02569B", slug: "flutter" },
  { name: "Kotlin Multiplatform", cats: ["Cross-platform"], color: "#7F52FF", slug: "kotlin" },
  { name: "Strapi", cats: ["CMS"], color: "#4945FF", slug: "strapi" },
  { name: "Webflow", cats: ["CMS", "Low-code"], color: "#146EF5", slug: "webflow" },
  { name: "WordPress", cats: ["CMS"], color: "#21759B", slug: "wordpress" },
  { name: "WooCommerce", cats: ["E-Commerce", "CMS"], color: "#96588A", slug: "woocommerce" },
  { name: "Shopify", cats: ["E-Commerce"], color: "#7AB55C", slug: "shopify" },
  {
    name: "Bubble",
    cats: ["Low-code"],
    color: "#0000FF",
    customSvg: (
      <svg className="w-12 h-12 text-[#0000FF] grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="35" cy="55" r="28" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="5" />
        <circle cx="65" cy="45" r="20" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="4" />
        <circle cx="50" cy="50" r="10" fill="currentColor" />
      </svg>
    )
  },
  {
    name: "FlutterFlow",
    cats: ["Low-code"],
    color: "#4B39EF",
    customSvg: (
      <svg className="w-12 h-12 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 25 L50 25 L35 50 L20 25 Z" fill="#4B39EF" />
        <path d="M35 50 L65 50 L50 75 L35 50 Z" fill="#39D2C2" />
        <path d="M50 75 L80 75 L65 100 L50 75 Z" fill="#4B39EF" />
      </svg>
    )
  },
  { name: "Ethereum", cats: ["Web 3"], color: "#3C3C3D", slug: "ethereum" },
  { name: "Solidity", cats: ["Web 3"], color: "#363636", slug: "solidity" },
  { name: "Web3.js", cats: ["Web 3"], color: "#F16822", slug: "web3dotjs" },
  { name: "TensorFlow", cats: ["AI & ML"], color: "#FF6F00", slug: "tensorflow" },
  { name: "PyTorch", cats: ["AI & ML"], color: "#EE4C2C", slug: "pytorch" },
  {
    name: "OpenAI",
    cats: ["AI & ML"],
    color: "#10B981",
    customSvg: (
      <svg className="w-12 h-12 text-[#10B981] grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
      </svg>
    )
  },
  { name: "LangChain", cats: ["AI & ML"], color: "#13B5C4", slug: "langchain" },
  { name: "PostgreSQL", cats: ["Cloud & Databases"], color: "#4169E1", slug: "postgresql" },
  { name: "MySQL", cats: ["Cloud & Databases"], color: "#00758F", slug: "mysql" },
  { name: "MongoDB", cats: ["Cloud & Databases"], color: "#47A248", slug: "mongodb" },
  { name: "Redis", cats: ["Cloud & Databases"], color: "#DC382D", slug: "redis" },
  { name: "Docker", cats: ["Cloud & Databases"], color: "#2496ED", slug: "docker" },
  { name: "Kubernetes", cats: ["Cloud & Databases"], color: "#326CE5", slug: "kubernetes" },
  {
    name: "AWS",
    cats: ["Cloud & Databases"],
    color: "#FF9900",
    customSvg: (
      <svg className="w-12 h-12 text-[#FF9900] grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z" />
        <path d="M21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.607z" />
        <path d="M22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z" />
      </svg>
    )
  }
];

function TechFilterGrid() {
  const [activeFilter, setActiveFilter] = useState("All");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = [
    "All", "Back-End", "Front-End", "iOS", "Android", "Cross-platform", "CMS", "E-Commerce", "Low-code", "Web 3", "Cloud & Databases", "AI & ML"
  ];

  const filteredItems = activeFilter === "All"
    ? TECH_ITEMS
    : TECH_ITEMS.filter(t => t.cats.includes(activeFilter));

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -240, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 240, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-4">
      {/* Scrollable pill tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold font-mono tracking-wider transition-all duration-300 ${activeFilter === cat
                ? "bg-primary text-text-primary shadow-lg"
                : "bg-surface-elevated/40 text-text-secondary border border-border hover:bg-surface-elevated/80 hover:text-text-primary"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Carousel Container */}
      <div className="relative group/carousel px-4">
        {/* Left Shadow Mask & Arrow */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-bg to-transparent pointer-events-none z-20 transition-opacity duration-300 opacity-80" />
        <button
          onClick={scrollLeft}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-surface/80 border border-border flex items-center justify-center text-text-primary shadow-lg hover:bg-primary hover:border-primary transition-all duration-200 opacity-0 group-hover/carousel:opacity-100 cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Shadow Mask & Arrow */}
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-bg to-transparent pointer-events-none z-20 transition-opacity duration-300 opacity-80" />
        <button
          onClick={scrollRight}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-surface/80 border border-border flex items-center justify-center text-text-primary shadow-lg hover:bg-primary hover:border-primary transition-all duration-200 opacity-0 group-hover/carousel:opacity-100 cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Scrolling flex row */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto py-6 px-12 scroll-smooth scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, scale: 0.85, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.85, x: -20 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex-shrink-0 w-36 sm:w-40 flex flex-col items-center justify-center p-5 rounded-2xl bg-surface/30 border border-border/40 hover:border-primary/50 hover:bg-surface-elevated/40 transition-colors duration-300 group cursor-pointer h-28 text-center snap-start relative overflow-hidden"
              >
                {/* Subtle border glow overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-primary/20 rounded-2xl pointer-events-none" />

                {/* Logo container */}
                <div className="transition-transform duration-300 group-hover:scale-105 flex items-center justify-center h-10">
                  {item.customSvg ? (
                    item.customSvg
                  ) : (
                    <img
                      src={`https://cdn.simpleicons.org/${item.slug}/${item.color.replace("#", "")}`}
                      alt={`${item.name} technology logo`}
                      className="w-10 h-10 object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    />
                  )}
                </div>

                {/* Title name */}
                <span className="text-[9px] font-bold font-mono tracking-wide mt-3 text-text-secondary group-hover:text-text-primary transition-colors">
                  {item.name}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function SolutionsSection() {
  const [activeSolutionId, setActiveSolutionId] = useState<string>("workflows");
  const activeSolution = SOLUTIONS.find(s => s.id === activeSolutionId) || SOLUTIONS[0];

  return (
    <section id="solutions" className="section-padding-sm bg-bg relative border-t border-border/40">
      <div className="absolute top-10 left-10 w-[30vw] h-[30vw] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(29,117,255,0.05) 0%, transparent 70%)" }} />
      <div className="absolute bottom-10 right-10 w-[35vw] h-[35vw] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(77,166,255,0.04) 0%, transparent 70%)" }} />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10px" }}
          transition={{ duration: 0.4 }}
          className="space-y-4 content-space-sm max-w-2xl text-left"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block">AI SOLUTIONS</span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-text-primary leading-[1.1]">
            AI Solutions, Engineered for Outcomes
          </h2>
          <p className="text-base text-text-secondary font-light leading-relaxed">
            Field-tested solution blueprints that automate your operations, leverage institutional knowledge, and forecast future trends. Every solution is deployed securely in your own cloud.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 section-gap-sm items-stretch">
          {/* Left sidebar - solution list */}
          <div className="lg:col-span-4 flex flex-col justify-start space-y-4">
            {SOLUTIONS.map(sol => (
              <button
                key={sol.id}
                onClick={() => setActiveSolutionId(sol.id)}
                className={`w-full p-6 rounded-2xl text-left border transition-all duration-300 flex items-center justify-between group ${activeSolutionId === sol.id
                    ? "bg-surface-elevated border-primary/50 shadow-md shadow-primary/5"
                    : "bg-surface/50 border-border/60 hover:bg-surface-elevated/40 hover:border-primary/20"
                  }`}
              >
                <div className="text-left">
                  <h3 className={`text-base font-bold font-display ${activeSolutionId === sol.id ? 'text-primary' : 'text-text-primary'}`}>
                    {sol.title}
                  </h3>
                  <p className="text-xs text-text-muted font-light mt-1 max-w-[280px] truncate">
                    {sol.description}
                  </p>
                </div>
                <div className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-colors shrink-0 ${activeSolutionId === sol.id
                    ? "bg-primary text-white border-primary"
                    : "bg-surface border-border text-text-secondary group-hover:text-text-primary"
                  }`}>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>

          {/* Right - solution details */}
          <div className="lg:col-span-8 flex flex-col space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSolution.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full rounded-3xl bg-surface/60 border border-border p-8 relative overflow-hidden flex flex-col justify-between shadow-xl backdrop-blur-md"
              >
                <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-primary/5 to-secondary/10 blur-[60px]"></div>

                <div className="space-y-8 z-10 text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/80">
                    <div>
                      <span className="text-[10px] font-bold tracking-widest font-mono text-primary uppercase block">SOLUTION BLUEPRINT</span>
                      <h3 className="text-2xl font-bold font-display tracking-tight text-text-primary mt-1">
                        {activeSolution.title}
                      </h3>
                    </div>
                    <span className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/15 text-primary text-xs font-mono font-bold self-start sm:self-auto uppercase tracking-wide">
                      {activeSolution.metric}
                    </span>
                  </div>

                  <div className="space-y-6">
                    <p className="text-base text-text-secondary leading-relaxed font-light">
                      {activeSolution.description}
                    </p>

                    <div className="space-y-3.5 pt-2">
                      {activeSolution.bullets.map((b, i) => (
                        <div key={i} className="flex items-start space-x-3 text-sm text-text-primary">
                          <div className="w-5 h-5 rounded-md bg-primary/10 border border-primary/25 text-primary flex items-center justify-center mt-0.5 shrink-0">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-light">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4 z-10">
                  <a
                    href="/contact"
                    className="px-6 py-3 rounded-full border border-border/30 text-text-primary hover:bg-bg hover:text-text-primary bg-transparent inline-flex items-center space-x-2 text-xs font-semibold transition-all cursor-pointer"
                  >
                    <span>Discuss This Solution</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useSEO({
    title: "NorthArc: AI Engineering, Data Science & Intelligent Automation",
    description:
      "NorthArc engineers AI automation, data science and GenAI systems that cut costs, speed decisions and turn enterprise data into measurable business impact.",
    path: "/",
    jsonLd: [HOME_JSON_LD, FAQ_JSON_LD],
  });

  // ─── Formspree ───────────────────────────────────────────────────────────────
  const [formState, handleFormspreeSubmit] = useForm("mjgnwbed");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Auto-rotating typing terms in Hero Section
  const [activeWordIdx, setActiveWordIdx] = useState(0);
  const words = ["AI Systems", "Data Science", "GenAI Pipelines", "Autonomous Agents"];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWordIdx(prev => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Client-side validation before handing off to Formspree
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Full Name is required";
    if (!formData.email.trim()) {
      errors.email = "Business Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.company.trim()) errors.company = "Company Name is required";
    if (!formData.service) errors.service = "Please select a service";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // All valid — delegate to Formspree's hook handler
    handleFormspreeSubmit(e);
  };

  return (
    <div className="relative overflow-x-hidden min-h-screen">
      {/* 1. HERO SECTION */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-24 pb-14 overflow-hidden bg-bg"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <ThreeDCanvas />
          {/* Parallax background orbs */}
          <ParallaxSection offset={-80} className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[10%] right-[10%] w-[35vw] h-[35vw] rounded-full animate-orb-drift" style={{ background: "radial-gradient(circle, rgba(29,117,255,0.10) 0%, transparent 70%)" }} />
            <div className="absolute bottom-[20%] left-[-5%] w-[30vw] h-[30vw] rounded-full animate-float-delay" style={{ background: "radial-gradient(circle, rgba(77,166,255,0.07) 0%, transparent 70%)" }} />
          </ParallaxSection>
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-bg/10 z-1 pointer-events-none"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,var(--color-bg)_100%)] z-1 pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left"
          >
            {/* Badge — clips in from left */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.02, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 w-fit backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-glow animate-pulse"></span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-primary font-mono">
                AI | DATA SCIENCE | ANALYTICS | AUTOMATION
              </span>
            </motion.div>

            {/* Heading with AnimatedText word reveal */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-text-primary leading-[1.08]">
              <AnimatedText
                text="Scale Your Operations With"
                type="words"
                as="span"
                animateOnMount
                delay={0.2}
                className="block"
              />{" "}
              <span className="text-primary font-normal min-w-[300px] inline-block mt-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeWordIdx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                    style={{ display: "inline-block" }}
                  >
                    {words[activeWordIdx]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm sm:text-base text-text-secondary font-light max-w-xl leading-relaxed"
            >
              We build production-grade AI systems from your data. Our intelligent automation and predictive analytics are engineered to cut costs, accelerate decisions, and drive growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-primary bg-primary hover:bg-transparent text-text-primary hover:text-primary rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-300 group cursor-pointer shadow-lg shadow-primary/20 hover:shadow-primary/5"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/services/full-cycle-development"
                className="inline-flex items-center justify-center gap-2 border border-primary/20 text-text-primary hover:bg-primary hover:text-text-primary hover:border-primary rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-300 cursor-pointer"
              >
                Explore Services
              </a>
            </motion.div>
          </motion.div>

          {/* Hero Premium Card Illustration — Enhanced 3D card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
            className="lg:col-span-5 relative flex items-center justify-center w-full z-10"
          >
            <div className="relative w-full max-w-[420px] py-12">
              {/* Rotating orbit rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[480px] h-[480px] rounded-full border border-border/15 animate-[spin_50s_linear_infinite]" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[380px] h-[380px] rounded-full border border-dashed border-primary/10 animate-[spin_30s_linear_infinite_reverse]" />
              </div>
              {/* Orbit dot */}
              <div
                className="absolute w-3 h-3 rounded-full bg-primary/60 blur-sm shadow-lg shadow-primary/50"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translateX(190px) translateY(-50%)",
                  animation: "spin 50s linear infinite",
                  transformOrigin: "-190px 50%",
                }}
              />

              {/* Dynamic Glassmorphism Card */}
              <motion.div
                whileHover={{ scale: 1.02, translateY: -6 }}
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                className="relative w-full h-auto rounded-[32px] bg-surface/70 backdrop-blur-xl border border-border/80 p-8 shadow-2xl flex flex-col justify-between overflow-hidden group hover:border-primary/50 cursor-pointer z-10"
                style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.4), 0 8px 32px rgba(29,117,255,0.08)" }}
              >
                <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-all duration-700 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full bg-secondary/10 blur-3xl group-hover:bg-secondary/20 transition-all duration-700 pointer-events-none"></div>
                {/* Shimmer border on hover */}
                <div className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "linear-gradient(135deg, transparent 30%, rgba(29,117,255,0.08) 50%, transparent 70%)" }}
                />

                <div className="flex items-center justify-between z-10">
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-text-primary shadow-lg"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Brain className="w-6 h-6" />
                  </motion.div>
                  <span className="text-[9px] font-mono px-3 py-1.5 rounded-full border border-border bg-surface-elevated text-text-secondary font-bold animate-spark-pulse">
                    TELEMETRY: ONLINE
                  </span>
                </div>

                <div className="space-y-3 z-10 my-8 text-left">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-glow animate-ping"></span>
                    <span className="text-[9px] font-bold font-mono tracking-widest text-glow uppercase">NORTHARC NEURAL SYSTEM</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold font-display tracking-tight text-text-primary group-hover:text-primary transition-colors duration-300">
                    Enterprise AI Architecture
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed font-light">
                    Secure, monitored AI running in your own cloud. We help you answer questions from your data, automate workflows, and report metrics directly to the business.
                  </p>
                </div>

                <div className="flex items-center justify-between z-10 border-t border-border/80 pt-4">
                  <div className="flex space-x-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span className="w-2 h-2 rounded-full bg-glow animate-pulse"></span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-text-muted">
                    v1.5.0-PROD
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" className="section-padding-sm bg-surface/20 relative border-t border-border/40 overflow-hidden">
        {/* Ambient orbs */}
        <div className="absolute top-1/4 left-[-10%] w-[40vw] h-[40vw] rounded-full pointer-events-none animate-orb-drift" style={{ background: "radial-gradient(circle, rgba(29,117,255,0.04) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-left">
          <ScrollReveal variant="fadeUp" className="max-w-4xl space-y-6 content-space-sm text-left">
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-xs font-bold uppercase tracking-widest text-primary font-mono block"
              >
                ABOUT NORTHARC
              </motion.span>
              <AnimatedText
                text="Connecting Intelligence to Impact."
                as="h2"
                type="words"
                className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-text-primary leading-[1.1]"
              />
            </div>

            <ScrollReveal variant="fadeUp" delay={0.2}>
              <p className="text-base md:text-lg text-text-secondary leading-relaxed font-light">
                NorthArc is an AI engineering, data science, and intelligent automation firm that turns your data and operations into measurable business results. We automate the manual work that slows your teams down, leverage your institutional knowledge through GenAI, and forecast future trends with predictive models. Every solution is delivered as a production-grade system inside your own secure cloud. We apply deep technical expertise to the outcomes your business actually reports on.
              </p>
            </ScrollReveal>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 section-gap-sm">
            {/* Pillar 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -6, boxShadow: "0 20px 48px rgba(29,117,255,0.12)" }}
              viewport={{ once: true, margin: "-10px" }}
              transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="min-h-[132px] h-full p-5 rounded-2xl border-l-4 border-primary bg-surface border border-border hover:border-primary/50 transition-colors duration-300 shadow-sm flex items-center lg:col-start-1 lg:row-start-1 cursor-default"
            >
              <div className="flex items-start space-x-4">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary mt-1">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-text-primary">Production-First Engineering</h3>
                  <p className="text-sm text-text-secondary mt-1 leading-relaxed font-light">
                    Every model and pipeline ships containerized, monitored, and production-ready. We don't leave proofs-of-concept stranded on a laptop.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -6, boxShadow: "0 20px 48px rgba(77,166,255,0.12)" }}
              viewport={{ once: true, margin: "-10px" }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="min-h-[132px] h-full p-5 rounded-2xl border-l-4 border-secondary bg-surface border border-border hover:border-secondary/50 transition-colors duration-300 shadow-sm flex items-center lg:col-start-2 lg:row-start-1 cursor-default"
            >
              <div className="flex items-start space-x-4">
                <div className="p-2.5 rounded-xl bg-secondary/10 text-secondary mt-1">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-text-primary">Enterprise-Grade Security</h3>
                  <p className="text-sm text-text-secondary mt-1 leading-relaxed font-light">
                    Architected for VPC isolation, IAM governance, and full audit trails so your data never leaves your control.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -6, boxShadow: "0 20px 48px rgba(77,148,255,0.12)" }}
              viewport={{ once: true, margin: "-10px" }}
              transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="min-h-[132px] h-full p-5 rounded-2xl border-l-4 border-glow bg-surface border border-border hover:border-glow/50 transition-colors duration-300 shadow-sm flex items-center lg:col-start-3 lg:row-start-1 cursor-default"
            >
              <div className="flex items-start space-x-4">
                <div className="p-2.5 rounded-xl bg-glow/10 text-glow mt-1">
                  <LineChart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-text-primary">Measurable Outcomes</h3>
                  <p className="text-sm text-text-secondary mt-1 leading-relaxed font-light">
                    We tie every engagement to a concrete business KPI, whether that's revenue gained, cost removed, or hours returned to your team.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2.5 CAPABILITIES BAND, outcome-led "what we do" */}
      <section id="capabilities" className="section-padding-sm bg-bg relative border-t border-border/40 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[30vw] h-[30vw] rounded-full pointer-events-none animate-orb-drift" style={{ background: "radial-gradient(circle, rgba(29,117,255,0.05) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-left">
          <ScrollReveal variant="fadeUp" className="space-y-4 content-space-sm max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-bold uppercase tracking-widest text-primary font-mono block"
            >
              WHAT WE DO
            </motion.span>
            <AnimatedText
              text="One partner across the full AI spectrum"
              as="h2"
              type="words"
              className="text-3xl md:text-5xl font-light tracking-tight text-text-primary leading-[1.1]"
            />
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <p className="text-base text-text-secondary font-light leading-relaxed">
                From automating manual work to forecasting future trends, every capability is delivered as a production-grade system tied to a business metric you already report on.
              </p>
            </ScrollReveal>
          </ScrollReveal>

          <motion.div
            variants={makeStagger(0.05, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSoft}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 section-gap-sm"
          >
            {CAPABILITIES.map((cap) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  variants={{
                    hidden: { opacity: 0, y: 40, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                  }}
                  whileHover={{ y: -8, boxShadow: "0 24px 48px rgba(29,117,255,0.12)" }}
                  transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
                  className="group p-6 rounded-2xl bg-surface border border-border hover:border-primary/50 transition-colors duration-300 shadow-sm h-full flex flex-col cursor-default"
                >
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                  <h3 className="text-lg font-bold font-display tracking-tight text-text-primary group-hover:text-primary transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-text-secondary mt-2 leading-relaxed font-light">
                    {cap.outcome}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 2.6 AI PRODUCTIZED SERVICE PREVIEW */}
      <section id="service-products" className="section-padding-sm bg-surface/20 relative border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10px" }}
            transition={{ duration: 0.4 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 content-space-sm"
          >
            <div className="space-y-4 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block">AI PRODUCTS INSIDE SERVICES</span>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight text-text-primary leading-[1.1]">
                Deploy-ready AI, built for outcomes
              </h2>
              <p className="text-base text-text-secondary font-light leading-relaxed">
                Battle-tested product blueprints including voice and support agents, predictive models, document AI, and analytics copilots. We configure these to your data and deploy them in your own secure cloud.
              </p>
            </div>
            <a
              href="/services/full-cycle-development"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all shrink-0 whitespace-nowrap"
            >
              <span>Explore product delivery</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 section-gap-sm"
          >
            {PREVIEW_PRODUCTS.map((product) => {
              const Icon = product.icon;
              return (
                <motion.a
                  key={product.slug}
                  href={`/services/${product.slug}`}
                  variants={{
                    hidden: { opacity: 0, y: 40, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                  }}
                  whileHover={{ y: -8, boxShadow: "0 24px 48px rgba(29,117,255,0.12)" }}
                  transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
                  className="group relative p-6 rounded-2xl bg-surface border border-border hover:border-primary/50 transition-colors duration-300 shadow-sm h-full flex flex-col overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none"></div>
                  <div className="flex items-center justify-between mb-5 relative z-10">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${product.accentColor}1a`, color: product.accentColor }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-text-muted px-2.5 py-1 rounded-full border border-border bg-surface-elevated/50">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-display tracking-tight text-text-primary group-hover:text-primary transition-colors relative z-10">
                    {product.name}
                  </h3>
                  <p className="text-sm text-text-secondary mt-2 leading-relaxed font-light flex-grow relative z-10">
                    {product.tagline}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary mt-5 group-hover:gap-2.5 transition-all relative z-10">
                    Explore as a service <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. PROCESS SECTION */}
      <section id="process" className="section-padding-sm relative overflow-hidden bg-surface/10 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-left">

          <ScrollReveal variant="fadeUp" className="space-y-4 content-space-sm max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-bold uppercase tracking-widest text-primary font-mono block"
            >
              DELIVERY FRAMEWORK
            </motion.span>
            <AnimatedText
              text="Our 5-Step Process"
              as="h2"
              type="words"
              className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-text-primary leading-[1.1]"
            />
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <p className="text-base text-text-secondary font-light leading-relaxed">
                A disciplined path from first audit to live production, with every phase mapped to the business metric it is meant to move.
              </p>
            </ScrollReveal>
          </ScrollReveal>

          {/* Stepper container */}
          <div className="relative">
            {/* Animated timeline line */}
            <motion.div
              className="hidden lg:block absolute top-[32px] left-[32px] right-[calc(20%-32px)] h-[2px] bg-gradient-to-r from-primary via-secondary to-glow opacity-40 z-0 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-10px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-5 section-gap-sm relative z-10">
              {DEPLOYMENT_STEPS.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10px" }}
                  transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="group text-left space-y-6 relative"
                >
                  <div>
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center shadow-lg z-10 relative"
                      whileHover={{ scale: 1.1, borderColor: "rgba(29,117,255,0.6)" }}
                      whileInView={{ scale: [0.7, 1.1, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.12 + 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                      <span className="text-xl font-bold font-display bg-gradient-to-tr from-primary to-secondary bg-clip-text text-transparent">
                        {step.number}
                      </span>
                    </motion.div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold font-display tracking-tight text-text-primary group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-text-secondary font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {idx < 4 && (
                    <div className="lg:hidden absolute left-8 top-16 bottom-[-48px] w-[1px] bg-border/80"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 3.4 CASE STUDY HIGHLIGHTS */}
      <section id="case-studies" className="section-padding-sm bg-bg relative border-t border-border/40">
        <div className="absolute bottom-0 left-1/4 w-[32vw] h-[32vw] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(77,166,255,0.04) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10px" }}
            transition={{ duration: 0.4 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 content-space-sm"
          >
            <div className="space-y-4 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block">PROVEN IMPACT</span>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight text-text-primary leading-[1.1]">
                Results our team has delivered
              </h2>
              <p className="text-base text-text-secondary font-light leading-relaxed">
                Real predictive-ML engagements delivered by our team across insurance, consumer services, and enterprise data. We measure success in the numbers the business cares about.
              </p>
            </div>
            <a
              href="/resources/case-studies"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all shrink-0 whitespace-nowrap"
            >
              <span>All case studies</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-1 lg:grid-cols-3 section-gap-sm"
          >
            {HIGHLIGHT_STUDIES.map((study) => {
              const Icon = study.icon;
              const headline = study.metrics[0];
              return (
                <motion.a
                  key={study.slug}
                  href={`/resources/case-studies/${study.slug}`}
                  variants={staggerItem}
                  className="group relative p-7 rounded-3xl bg-surface border border-border hover:border-primary/50 transition-all duration-300 shadow-sm h-full flex flex-col overflow-hidden"
                >
                  <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors pointer-events-none"></div>

                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${study.accentColor}1a`, color: study.accentColor }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-text-muted px-2.5 py-1 rounded-full border border-border bg-surface-elevated/50">
                      {study.industry}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <p className="text-4xl font-extrabold font-display tracking-tight text-primary">
                      {headline.value}
                    </p>
                    <p className="text-xs font-semibold font-mono uppercase tracking-wider text-text-muted mt-1">
                      {headline.label}
                    </p>
                  </div>

                  <p className="text-sm text-text-secondary mt-5 leading-relaxed font-light flex-grow relative z-10">
                    {study.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary mt-6 group-hover:gap-2.5 transition-all relative z-10">
                    Read the case study <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </section>

      <SolutionsSection />

      {/* 3.6 SOLUTIONS BY INDUSTRY & FUNCTION */}
      <section id="industries" className="section-padding-sm bg-surface/20 relative border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10px" }}
            transition={{ duration: 0.4 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 content-space-sm"
          >
            <div className="space-y-4 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block">BY INDUSTRY &amp; FUNCTION</span>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight text-text-primary leading-[1.1]">
                AI shaped to your world
              </h2>
              <p className="text-base text-text-secondary font-light leading-relaxed">
                We package our products and models into solution playbooks for the industries and business functions where they move the needle fastest.
              </p>
            </div>
            <a
              href="/solutions"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all shrink-0 whitespace-nowrap"
            >
              <span>Explore all solutions</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 section-gap-sm"
          >
            {SOLUTION_PREVIEW.map((sol) => {
              const Icon = sol.icon;
              return (
                <motion.a
                  key={sol.slug}
                  href={`/solutions/${sol.slug}`}
                  variants={staggerItem}
                  className="group p-6 rounded-2xl bg-surface border border-border hover:border-primary/50 transition-all duration-300 shadow-sm h-full flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shrink-0"
                      style={{ backgroundColor: `${sol.accentColor}1a`, color: sol.accentColor }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold font-display tracking-tight text-text-primary group-hover:text-primary transition-colors leading-tight">
                        {sol.title}
                      </h3>
                      <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-text-muted">
                        {sol.type === "industry" ? "Industry" : "Function"}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed font-light flex-grow">
                    {sol.tagline}
                  </p>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3.5 TECH STACK SECTION */}
      <section className="section-padding-sm bg-bg relative border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">

          <ScrollReveal variant="blurIn" className="space-y-4 content-space-sm max-w-3xl mx-auto">
            <AnimatedText
              text="Built on a Production-Proven Stack"
              as="h2"
              type="words"
              className="text-3xl md:text-5xl font-extrabold tracking-tight font-display text-text-primary"
            />
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <p className="text-sm md:text-base text-text-secondary font-light max-w-xl mx-auto">
                Every technology we deploy earns its place by moving a business metric, from ML frameworks and language model tooling to enterprise cloud infrastructure.
              </p>
            </ScrollReveal>
          </ScrollReveal>

          {/* Interactive filter switcher */}
          <TechFilterGrid />

        </div>
      </section>

      {/* 3.8 TRUST / PLATFORM BAND — Infinite Marquee */}
      <section className="py-8 bg-surface/20 relative border-t border-border/40 overflow-hidden">
        <ScrollReveal variant="fadeUp" className="text-center mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-text-muted font-mono">
            Built on the platforms and models enterprises trust
          </p>
        </ScrollReveal>
        {/* Row 1 — forward marquee */}
        <div className="overflow-hidden relative" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
          <div className="marquee-content gap-3 py-1">
            {[...TRUST_CHIPS, ...TRUST_CHIPS].map((chip, i) => (
              <span
                key={i}
                className="mx-1.5 px-5 py-2.5 rounded-full text-sm font-semibold font-mono tracking-wide text-text-secondary bg-surface/60 border border-border hover:border-primary/40 hover:text-text-primary transition-all duration-300 shrink-0"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />

      {/* 4. CONTACT SECTION */}
      <section id="contact" className="section-padding bg-surface/30 border-t border-border relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10px" }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block">RESERVE CONSULTATION</span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-text-primary leading-[1.1]">
                  Book a Consultation
                </h2>
                <p className="text-base text-text-secondary font-light leading-relaxed">
                  Tell us where your operations slow down. We will map the highest-ROI AI opportunity and show you the business case before a line of code is written.
                </p>
              </motion.div>

              <div className="space-y-6 pt-4">
                {[
                  { icon: MapPin, title: "Headquarters", content: "Ahmedabad, Gujarat", accent: "text-primary" },
                  { icon: Mail, title: "Solutions Desk", content: <a href="mailto:business@northarc.in" className="text-primary hover:underline">business@northarc.in</a>, accent: "text-secondary" },
                  { icon: Phone, title: "Direct Line", content: <a href="tel:+918849969336" className="hover:text-text-primary transition-colors">+91 88499 69336</a>, accent: "text-glow" },
                  { icon: Clock, title: "Response Time", content: "Within 24 business hours", accent: "text-text-muted" }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="flex items-start space-x-4 group"
                    >
                      <div className={`p-3.5 rounded-2xl bg-surface border border-border ${item.accent} shadow-md group-hover:scale-[1.05] transition-all duration-300 shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="pt-1">
                        <h3 className="text-sm font-bold text-text-primary">{item.title}</h3>
                        <p className="text-sm text-text-secondary mt-0.5 font-light">{item.content}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right Contact Form Column */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-surface border border-border p-8 lg:p-10 relative overflow-hidden shadow-xl">
                <div className="absolute inset-0 grid-bg opacity-20"></div>

                <AnimatePresence mode="wait">
                  {formState.succeeded ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12 space-y-6 relative z-10"
                    >
                      <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mx-auto shadow-lg">
                        <Check className="w-8 h-8" />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold font-display tracking-tight text-text-primary">
                          Consultation Requested
                        </h3>
                        <p className="text-sm text-text-secondary font-light max-w-md mx-auto leading-relaxed">
                          Thank you for reaching out to NorthArc. Our specialized solutions desk will review your requirements and respond within 24 business hours.
                        </p>
                      </div>

                      <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-text-primary font-semibold text-sm transition-all"
                      >
                        Submit Another Consultation
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleFormSubmit}
                      className="space-y-6 relative z-10"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-text-muted block text-left">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            className={`w-full bg-surface-elevated/45 border-b border-border hover:border-primary/50 focus:border-primary px-1.5 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-colors ${formErrors.name ? "border-red-500" : ""
                              }`}
                          />
                          {formErrors.name && (
                            <p className="text-xs text-red-500 font-medium text-left">{formErrors.name}</p>
                          )}
                          <ValidationError field="name" prefix="Full Name" errors={formState.errors} className="text-xs text-red-500 font-medium text-left" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-text-muted block text-left">
                            Business Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@company.com"
                            className={`w-full bg-surface-elevated/45 border-b border-border hover:border-primary/50 focus:border-primary px-1.5 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-colors ${formErrors.email ? "border-red-500" : ""
                              }`}
                          />
                          {formErrors.email && (
                            <p className="text-xs text-red-500 font-medium text-left">{formErrors.email}</p>
                          )}
                          <ValidationError field="email" prefix="Email" errors={formState.errors} className="text-xs text-red-500 font-medium text-left" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-text-muted block text-left">
                            Company Name *
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder="Acme Corp"
                            className={`w-full bg-surface-elevated/45 border-b border-border hover:border-primary/50 focus:border-primary px-1.5 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-colors ${formErrors.company ? "border-red-500" : ""
                              }`}
                          />
                          {formErrors.company && (
                            <p className="text-xs text-red-500 font-medium text-left">{formErrors.company}</p>
                          )}
                          <ValidationError field="company" prefix="Company" errors={formState.errors} className="text-xs text-red-500 font-medium text-left" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-text-muted block text-left">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91 1234567890"
                            className="w-full bg-surface-elevated/45 border-b border-border hover:border-primary/50 focus:border-primary px-1.5 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-text-muted block text-left">
                          Service Interest *
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className={`w-full bg-surface-elevated/45 border-b border-border hover:border-primary/50 focus:border-primary px-1.5 py-3 text-sm text-text-primary focus:outline-none transition-colors ${formErrors.service ? "border-red-500" : ""
                            }`}
                        >
                          <option value="">Select Service Area</option>
                          {SERVICES.map((s, i) => (
                            <option key={i} value={s.title}>{s.title}</option>
                          ))}
                        </select>
                        {formErrors.service && (
                          <p className="text-xs text-red-500 font-medium text-left">{formErrors.service}</p>
                        )}
                        <ValidationError field="service" prefix="Service" errors={formState.errors} className="text-xs text-red-500 font-medium text-left" />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-text-muted block text-left">
                          Project Requirements
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Tell us about your pipeline bottlenecks, available model data, or targeted automation metrics..."
                          className="w-full bg-surface-elevated/45 border-b border-border hover:border-primary/50 focus:border-primary px-1.5 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-colors resize-none text-left"
                        ></textarea>
                      </div>

                      {formErrors.form && (
                        <p className="text-xs text-red-400 font-medium text-center bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                          {formErrors.form}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={formState.submitting}
                        className="w-full py-4 rounded-full font-bold bg-primary hover:bg-transparent border border-primary text-text-primary hover:text-primary transition-all duration-300 flex items-center justify-center space-x-2.5 text-base disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {formState.submitting ? (
                          <>
                            <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                            <span>Requesting Secure Bridge...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span>Book a Consultation</span>
                          </>
                        )}
                      </button>
                    </motion.form>

                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}








