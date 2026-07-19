import { useState } from "react";
import { ArrowDown, ArrowRight, CheckCircle2, ChevronDown, Lightbulb, Users, Zap, Building2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useSEO, SITE_URL } from "../lib/seo";
import { AnimatedHeroVisual } from "../components/AnimatedHeroVisual";
import AnimatedText from "../components/animations/AnimatedText";
import { staggerContainer, staggerItem } from "../lib/animations";

const DIFFERENTIATORS = [
  "Business-first thinking",
  "Customer-focused development",
  "Transparent communication",
  "Agile project delivery",
  "Scalable architecture",
  "Quality assurance at every stage",
  "Continuous improvement and support",
];

const FAQ_ITEMS = [
  {
    question: "What does NorthArc actually build for clients?",
    answer: "We build production-grade AI systems: LLM applications grounded in your own data, predictive machine learning models, intelligent automation pipelines, and the web and mobile platforms that surface them. Every engagement ships as working software running in your cloud, not a proof of concept.",
  },
  {
    question: "How long does a typical AI engagement take?",
    answer: "Most engagements move from opportunity audit to a first production release in 6 to 10 weeks, then continue in bi-weekly delivery sprints. Timelines scale with scope, and we agree on milestones and success metrics before any build work starts.",
  },
  {
    question: "Do you work with our existing cloud and tech stack?",
    answer: "Yes. We deploy inside your AWS, Azure, or GCP environment and integrate with your existing data warehouse, APIs, and CI/CD pipeline rather than asking you to adopt a new platform.",
  },
  {
    question: "Do you offer team augmentation instead of full projects?",
    answer: "Yes. Alongside full-cycle product delivery, we embed AI engineers and data scientists directly into your team on a dedicated basis, working inside your existing sprints and tooling.",
  },
  {
    question: "Who owns the code and models you build?",
    answer: "You do. Intellectual property ownership transfers to you on final release, including model weights, training pipelines, and source code.",
  },
  {
    question: "Do you support us after launch?",
    answer: "Yes. We monitor accuracy, cost, and latency in production and offer ongoing support and retraining plans so performance improves with every release rather than degrading over time.",
  },
];

const ABOUT_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About NorthArc",
  url: `${SITE_URL}/about`,
  description: "Learn about NorthArc, a Software Development Company helping businesses grow through AI, product engineering, IT consulting, and digital transformation.",
  mainEntity: {
    "@type": "Organization",
    name: "NorthArc",
    url: SITE_URL,
  },
};

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function About() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useSEO({
    title: "About NorthArc | Software Development Company & AI Experts",
    description: "Learn about NorthArc, a Software Development Company helping businesses grow through AI, product engineering, IT consulting, and digital transformation.",
    path: "/about",
    keywords: "Software Development Company, Technology Partner, Product Engineering Company, IT Consulting Company, AI Experts, Trusted Software Development Company in India, Experienced AI Development Team, Digital Transformation Partner",
    jsonLd: [ABOUT_JSON_LD, FAQ_JSON_LD],
  });

  return (
    <div className="about-page bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans">

      {/* Hero follows the shared service and expertise page layout. */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-8 md:pt-28 md:pb-14 lg:pt-32 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-8 items-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="lg:col-span-6 space-y-6 text-left lg:space-y-8">
            <motion.span variants={staggerItem} className="block text-xs font-bold uppercase tracking-widest font-mono text-primary">
              ABOUT NORTHARC
            </motion.span>
            <motion.div variants={staggerItem}>
              <AnimatedText text="Building Intelligent Software. Creating Long-Term Business Value." as="h1" type="words" animateOnMount delay={0.04} className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.08] text-text-primary" />
            </motion.div>
            <motion.p variants={staggerItem} className="max-w-xl text-sm sm:text-base text-text-secondary font-light leading-relaxed">
              NorthArc is a forward-thinking Software Development Company dedicated to helping businesses solve complex challenges through technology. We partner with startups, growing businesses, and enterprises to design, develop, and scale digital products that create measurable business impact.
            </motion.p>
            <motion.p variants={staggerItem} className="max-w-xl text-sm sm:text-base text-text-secondary font-light leading-relaxed">
              Our mission is simple—deliver innovative software solutions that are reliable, scalable, and built around real business objectives. We believe successful software is more than clean code; it’s about understanding people, processes, and long-term growth.
            </motion.p>
            <motion.div variants={staggerItem} className="pt-2">
              <motion.a href="/contact" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-glow transition-colors duration-300 group">
                <span>Start a conversation</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>
            <motion.div variants={staggerItem} className="hidden items-center gap-3 text-xs text-text-secondary font-light font-mono opacity-80 pt-1 sm:flex">
              <div className="w-8 h-8 rounded-full border border-border/20 flex items-center justify-center"><ArrowDown className="w-3.5 h-3.5" /></div>
              <span>Scroll to explore NorthArc</span>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-6 lg:self-start lg:-translate-y-10">
            <AnimatedHeroVisual icon={Building2} title="Technology partnership" eyebrow="ABOUT NORTHARC" scene="team" accentColor="#1D75FF" />
            <div className="hidden relative mx-auto mt-4 flex min-h-[220px] max-w-md flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl border border-border/20 bg-surface/40 p-8 text-center backdrop-blur-sm lg:hidden">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10"><Building2 className="h-9 w-9 text-primary" /></div>
              <p className="text-sm font-semibold text-text-primary">Technology partnership</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding-sm border-t border-border/40 bg-surface/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          <div>
            <Lightbulb className="w-10 h-10 text-primary mb-6" />
            <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight">Your Technology Partner for Digital Growth</h2>
          </div>
          <div className="space-y-5 text-base md:text-lg text-text-secondary font-light leading-relaxed">
            <p>Technology should enable innovation, not become a barrier to growth. As your trusted Technology Partner, we work closely with your team to understand your vision, challenges, and goals before recommending the right solution.</p>
            <p>From AI-powered applications and custom software to cloud platforms and modern web solutions, every project is approached with a business-first mindset. Our collaborative process ensures transparency, flexibility, and measurable outcomes from planning through deployment.</p>
          </div>
        </div>
      </section>

      <section className="section-padding-sm border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          <div className="lg:order-2">
            <Zap className="w-10 h-10 text-primary mb-6" />
            <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight">Expertise That Drives Innovation</h2>
          </div>
          <div className="space-y-5 text-base md:text-lg text-text-secondary font-light leading-relaxed lg:order-1">
            <p>Our team combines technical excellence with industry knowledge to build digital products that perform at scale. As an experienced Product Engineering Company, we focus on creating secure, high-performing, and future-ready applications using modern technologies and agile development practices.</p>
            <p>Whether you’re launching a new platform or modernizing existing systems, our Experienced AI Development Team works alongside you to accelerate innovation while maintaining quality, security, and performance.</p>
          </div>
        </div>
      </section>

      <section className="section-padding-sm border-t border-border/40 bg-surface/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-10">
            <Users className="w-10 h-10 text-primary mb-6" />
            <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight">What Makes NorthArc Different?</h2>
            <p className="mt-5 text-lg text-text-secondary font-light leading-relaxed">At NorthArc, we believe strong partnerships create exceptional products.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {DIFFERENTIATORS.map((item, index) => (
              <motion.div key={item} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-4 text-sm md:text-base font-semibold text-text-primary">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                {item}
              </motion.div>
            ))}
          </div>
          <p className="mt-8 max-w-4xl text-base md:text-lg text-text-secondary font-light leading-relaxed">As a Digital Transformation Partner, we don’t simply deliver software—we help businesses adapt, innovate, and compete in an evolving digital landscape.</p>
        </div>
      </section>

      <section className="section-padding-sm border-t border-border/40">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight">Our Vision</h2>
          <p className="mt-6 text-lg text-text-secondary font-light leading-relaxed">We aim to become a globally trusted technology company known for delivering intelligent, scalable, and impactful digital solutions. By combining innovation, engineering excellence, and a commitment to long-term partnerships, we help organizations unlock new opportunities and achieve sustainable growth.</p>
        </div>
      </section>

      <section className="section-padding bg-primary/10 border-t border-primary/20">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display leading-tight">Let’s Build the Future Together</h2>
          <p className="mt-6 text-lg text-text-secondary font-light leading-relaxed">Whether you’re developing your first digital product or expanding an enterprise ecosystem, NorthArc is ready to support your journey with innovative solutions, strategic guidance, and a collaborative mindset.</p>
          <p className="mt-4 text-lg text-text-secondary font-light leading-relaxed">Let’s turn your ideas into technology that drives meaningful business success.</p>
          <a href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary/90">Start a conversation <ArrowRight className="w-4 h-4" /></a>
        </div>
      </section>

      <section className="section-padding-sm border-t border-border/40 bg-bg">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono">FAQ</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-light tracking-tight leading-tight">Frequently Asked Questions</h2>
            <p className="mt-5 text-base md:text-lg text-text-secondary font-light leading-relaxed">Answers to what prospective partners ask us most before kicking off an engagement.</p>
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={item.question} className={`overflow-hidden rounded-2xl border bg-surface transition-colors ${isOpen ? "border-primary/40" : "border-border hover:border-primary/20"}`}>
                  <button onClick={() => setOpenFaqIndex(isOpen ? null : index)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6">
                    <span className={`text-sm md:text-base font-bold transition-colors ${isOpen ? "text-primary" : "text-text-primary"}`}>{item.question}</span>
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all ${isOpen ? "rotate-180 border-primary bg-primary text-white" : "border-border text-text-secondary"}`}><ChevronDown className="w-4 h-4" /></span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                        <div className="mx-5 border-t border-border/50 pb-5 pt-4 sm:mx-6 sm:pb-6"><p className="text-sm text-text-secondary font-light leading-relaxed">{item.answer}</p></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
