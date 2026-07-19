import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle, Layers, Target, Workflow, Zap } from "lucide-react";
import { AnimatedHeroVisual } from "../../components/AnimatedHeroVisual";
import AnimatedText from "../../components/animations/AnimatedText";
import products from "../../data/productsData";
import { breadcrumbJsonLd, SITE_NAME, SITE_URL, useSEO } from "../../lib/seo";
import { fadeUpVariant, staggerContainer, staggerItem, viewportOnce } from "../../lib/animations";

interface Props {
  slug: string;
}

export default function ServiceAcceleratorDetail({ slug }: Props) {
  const accelerator = products.find((p) => p.slug === slug);
  const path = `/services/${slug}`;

  const description = accelerator
    ? accelerator.summary.length > 158
      ? `${accelerator.summary.slice(0, 155).replace(/\s+\S*$/, "")}…`
      : accelerator.summary
    : "This AI service accelerator could not be found. Explore NorthArc services instead.";

  useSEO(
    accelerator
      ? {
          title: `${accelerator.name} Service`,
          description,
          path,
          type: "article",
          jsonLd: [
            {
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: accelerator.category,
              name: accelerator.name,
              description,
              provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
              areaServed: "Worldwide",
              url: `${SITE_URL}${path}`,
            },
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services/full-cycle-development" },
              { name: accelerator.name, path },
            ]),
          ],
        }
      : {
          title: "Service Accelerator Not Found",
          description,
          path,
          noindex: true,
        }
  );

  if (!accelerator) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg text-text-primary">
        <div className="text-center space-y-4">
          <p className="text-4xl font-light opacity-30">404</p>
          <p className="text-text-muted">Service accelerator not found.</p>
          <a href="/services/full-cycle-development" className="inline-flex items-center gap-2 text-sm text-primary hover:underline mt-4">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </a>
        </div>
      </div>
    );
  }

  const Icon = accelerator.icon;
  const accent = accelerator.accentColor;

  return (
    <div className="bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans text-left">
      <div
        className="pointer-events-none absolute right-[-12%] top-[-8%] w-[46vw] h-[46vw] rounded-full z-0 animate-orb-drift"
        style={{ background: `radial-gradient(circle, ${accent}1c 0%, transparent 70%)` }}
      />

      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-8 md:px-12 md:pt-28 md:pb-14 lg:px-24 lg:pt-32 lg:pb-20">
        <a
          href="/services/full-cycle-development"
          className="mb-5 inline-flex items-center gap-2 text-xs text-text-muted hover:text-primary transition-colors font-mono sm:mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Services
        </a>

        <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-8">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6 text-left lg:col-span-6 lg:space-y-8">
            <motion.span
              variants={staggerItem}
              className="inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest font-mono"
              style={{ color: accent, borderColor: `${accent}35`, background: `${accent}10` }}
            >
              <Icon className="w-3.5 h-3.5" style={{ color: accent }} />
              {accelerator.category}
            </motion.span>

            <motion.div variants={staggerItem}>
              <AnimatedText
                text={accelerator.name}
                as="h1"
                type="words"
                animateOnMount
                delay={0.04}
                className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-text-primary leading-[1.08]"
              />
            </motion.div>

            <motion.p variants={staggerItem} className="max-w-xl text-sm sm:text-base text-text-secondary font-light leading-relaxed">
              {accelerator.summary}
            </motion.p>

            <motion.div variants={staggerItem} className="pt-2">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-colors duration-300 hover:-translate-y-0.5"
                style={{ background: accent }}
              >
                Build this with us
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-6">
            <AnimatedHeroVisual
              icon={Icon}
              title={accelerator.name}
              eyebrow="Service accelerator"
              scene={accelerator.category.includes("Document") ? "data" : accelerator.category.includes("Predictive") ? "ai" : "default"}
              accentColor={accent}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.24, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="hidden relative mx-auto mt-4 flex min-h-[220px] max-w-md flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl border border-border/20 bg-surface/40 p-8 text-center backdrop-blur-sm lg:hidden"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{ background: `radial-gradient(circle at 50% 40%, ${accent}14, transparent 70%)` }}
              />
              <div className="relative flex flex-col items-center gap-4">
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-2xl border"
                  style={{ background: `${accent}18`, borderColor: `${accent}35` }}
                >
                  <Icon className="h-9 w-9" style={{ color: accent }} />
                </div>
                <p className="text-sm font-semibold text-text-primary">{accelerator.tagline}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-10 sm:py-14 border-t border-border/10">
        <div className="space-y-8 sm:space-y-10">
          <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce} className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border" style={{ borderColor: `${accent}35`, background: `${accent}12` }}>
                <Target className="w-4 h-4" style={{ color: accent }} />
              </span>
              <h2 className="text-2xl font-light tracking-tight">The problem</h2>
            </div>
            <p className="mt-4 text-sm text-text-secondary font-light leading-relaxed sm:text-base">{accelerator.problem}</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <PointGroup title="How it works" icon={Workflow} items={accelerator.howItWorks} accent={accent} />
            <PointGroup title="Outcomes" icon={Zap} items={accelerator.outcomes} accent={accent} />
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-10 sm:py-14 border-t border-border/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PointGroup title="Features" icon={Layers} items={accelerator.features} accent={accent} />
          <PointGroup title="Use cases" icon={CheckCircle} items={accelerator.useCases} accent={accent} />
        </div>
      </section>

      {accelerator.techStack && (
        <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-10 sm:py-14 border-t border-border/10">
          <div className="rounded-3xl border border-border/20 bg-surface/40 p-5 sm:p-7">
            <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase font-bold">Typical stack</span>
            <div className="mt-5 flex flex-wrap gap-2">
              {accelerator.techStack.map((tech) => (
                <span key={tech} className="rounded-full border border-border/70 bg-surface-elevated/40 px-3 py-1 text-xs text-text-secondary">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function PointGroup({
  title,
  icon: Icon,
  items,
  accent,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  items: string[];
  accent: string;
}) {
  return (
    <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce} className="space-y-5">
      <div className="flex items-center gap-3 mb-5">
        <Icon className="w-5 h-5" style={{ color: accent }} />
        <h2 className="text-xl font-light tracking-tight">{title}</h2>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-3 rounded-xl border border-border/15 bg-surface/35 p-4">
            <span className="mt-0.5 text-xs font-mono font-bold shrink-0" style={{ color: accent }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="text-sm text-text-secondary font-light leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
