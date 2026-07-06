import React from "react";
import { motion } from "motion/react";
import { staggerContainer, staggerItem, fadeUpVariant, viewportOnce } from "../../lib/animations";
import { useSEO, breadcrumbJsonLd, SITE_URL, SITE_NAME } from "../../lib/seo";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Layers,
  AlertCircle,
  Workflow,
  Sparkles,
  TrendingUp,
  Boxes,
  CheckCircle,
  Cpu,
} from "lucide-react";
import products from "../../data/productsData";

interface Props {
  slug: string;
}

export default function ProductDetail({ slug }: Props) {
  const product = products.find((p) => p.slug === slug);
  const path = `/products/${slug}`;

  // Meta description from the product summary, trimmed to ~155 chars on a word boundary.
  const description = product
    ? product.summary.length > 155
      ? `${product.summary.slice(0, 155).replace(/\s+\S*$/, "")}…`
      : product.summary
    : "This AI product could not be found. Browse NorthArc's full catalog of production-ready AI products built for measurable business outcomes.";

  useSEO(
    product
      ? {
          title: product.name,
          description,
          path,
          type: "article",
          jsonLd: [
            {
              "@context": "https://schema.org",
              "@type": "Product",
              name: product.name,
              description,
              category: product.category,
              brand: { "@type": "Brand", name: SITE_NAME },
              url: `${SITE_URL}${path}`,
              additionalProperty: [
                {
                  "@type": "PropertyValue",
                  name: "Tagline",
                  value: product.tagline,
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: product.category,
              name: product.name,
              description,
              provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
              areaServed: "Global",
              url: `${SITE_URL}${path}`,
            },
            breadcrumbJsonLd([
              { name: "Products", path: "/products" },
              { name: product.name, path },
            ]),
          ],
        }
      : {
          title: "Product Not Found",
          description,
          path,
          noindex: true,
        }
  );

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg text-text-primary font-sans">
        <div className="text-center space-y-4 px-6">
          <p className="text-5xl font-light opacity-20">404</p>
          <p className="text-text-muted text-sm">We couldn't find that product.</p>
          <a
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline mt-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to all products
          </a>
        </div>
      </div>
    );
  }

  const Icon = product.icon;
  const accent = product.accentColor;
  const currentIndex = products.findIndex((p) => p.slug === slug);
  const prev = currentIndex > 0 ? products[currentIndex - 1] : null;
  const next = currentIndex < products.length - 1 ? products[currentIndex + 1] : null;

  // Related products: same category first, then fill from the rest — never the current one.
  const related = [
    ...products.filter((p) => p.slug !== slug && p.category === product.category),
    ...products.filter((p) => p.slug !== slug && p.category !== product.category),
  ].slice(0, 3);

  return (
    <div className="bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans text-left">
      {/* Ambient orb */}
      <div
        className="absolute right-[-10%] top-[3%] w-[50vw] h-[50vw] rounded-full blur-[150px] pointer-events-none z-0 opacity-20"
        style={{ background: `radial-gradient(circle, ${accent}, transparent)` }}
      />
      <div className="absolute left-[-12%] top-[40%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-primary/6 to-secondary/5 blur-[140px] pointer-events-none z-0" />

      {/* ── HERO ── */}
      <section className="px-6 md:px-12 lg:px-24 pt-40 pb-10 relative z-10 max-w-5xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
          {/* Breadcrumb */}
          <motion.nav className="flex items-center gap-2 text-xs text-text-muted font-mono mb-2" variants={staggerItem}>
            <a href="/products" className="hover:text-primary transition-colors">Products</a>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text-secondary truncate max-w-[220px]">{product.name}</span>
          </motion.nav>

          {/* Back link */}
          <motion.a
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-primary transition-colors group"
            variants={staggerItem}
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            All Products
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Icon + category */}
            <div className="flex flex-wrap items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
              >
                <Icon className="w-6 h-6" style={{ color: accent }} />
              </div>
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border"
                style={{ color: accent, borderColor: `${accent}40`, background: `${accent}10` }}
              >
                {product.category}
              </span>
            </div>

            {/* Name */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-text-primary leading-[1.1]">
              {product.name}
            </h1>

            {/* Tagline */}
            <p className="text-lg sm:text-xl font-light leading-relaxed" style={{ color: accent }}>
              {product.tagline}
            </p>

            {/* Summary */}
            <p className="text-sm sm:text-base text-text-secondary font-light leading-relaxed max-w-3xl border-t border-border/30 pt-6">
              {product.summary}
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                Talk to our team
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-surface/50 hover:border-primary/40 text-text-secondary hover:text-text-primary font-semibold text-sm transition-all duration-300"
              >
                <Boxes className="w-4 h-4" />
                Browse catalog
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── BODY ── */}
      <section className="px-6 md:px-12 lg:px-24 pb-16 relative z-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main content */}
          <div className="lg:col-span-8 space-y-10">
            {/* The Problem */}
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="p-6 rounded-2xl border border-border bg-surface/40 backdrop-blur-sm"
            >
              <span className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-primary mb-3">
                <AlertCircle className="w-3.5 h-3.5" /> The Problem
              </span>
              <p className="text-sm text-text-secondary leading-relaxed">{product.problem}</p>
            </motion.div>

            {/* How it works */}
            <div>
              <motion.h2
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="flex items-center gap-2 text-xl sm:text-2xl font-light tracking-tight text-text-primary mb-6"
              >
                <Workflow className="w-5 h-5" style={{ color: accent }} />
                How it works
              </motion.h2>
              <motion.ol
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="space-y-3"
              >
                {product.howItWorks.map((step, i) => (
                  <motion.li
                    key={i}
                    variants={staggerItem}
                    className="flex items-start gap-4 p-4 rounded-xl border border-border/40 bg-surface/30"
                  >
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: `${accent}18`, color: accent }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm text-text-secondary leading-relaxed pt-0.5">{step}</span>
                  </motion.li>
                ))}
              </motion.ol>
            </div>

            {/* Features */}
            <div>
              <motion.h2
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="flex items-center gap-2 text-xl sm:text-2xl font-light tracking-tight text-text-primary mb-6"
              >
                <Layers className="w-5 h-5" style={{ color: accent }} />
                Capabilities
              </motion.h2>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {product.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    className="flex items-start gap-3 p-4 rounded-xl border border-border/40 bg-surface/30 hover:border-primary/30 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: accent }} />
                    <span className="text-sm text-text-secondary leading-snug">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Use cases */}
            <div>
              <motion.h2
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="flex items-center gap-2 text-xl sm:text-2xl font-light tracking-tight text-text-primary mb-6"
              >
                <Sparkles className="w-5 h-5" style={{ color: accent }} />
                Where it's used
              </motion.h2>
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="space-y-2"
              >
                {product.useCases.map((uc, i) => (
                  <motion.li
                    key={i}
                    variants={staggerItem}
                    className="flex items-start gap-3 text-sm text-text-secondary"
                  >
                    <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: accent }} />
                    <span className="leading-relaxed">{uc}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-[88px] space-y-6">
              {/* Outcomes */}
              <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5">
                <span className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-primary mb-4">
                  <TrendingUp className="w-3.5 h-3.5" /> Business Outcomes
                </span>
                <ul className="space-y-3">
                  {product.outcomes.map((o, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: accent }} />
                      <span className="text-xs text-text-secondary leading-relaxed">{o}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech stack */}
              {product.techStack && product.techStack.length > 0 && (
                <div className="p-6 rounded-2xl border border-border bg-surface/40 backdrop-blur-sm">
                  <span className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-text-muted mb-4">
                    <Cpu className="w-3.5 h-3.5" /> Built With
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg bg-surface-elevated border border-border text-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5">
                <p className="text-sm font-semibold text-text-primary mb-2">Ready to deploy this?</p>
                <p className="text-xs text-text-muted mb-4">
                  Tell us your data, systems and goals. We'll tailor {product.name} to your business.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs w-full justify-center transition-all shadow-lg shadow-primary/20"
                >
                  Book a consultation
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED PRODUCTS ── */}
      {related.length > 0 && (
        <section className="px-6 md:px-12 lg:px-24 py-14 border-t border-border/20 relative z-10 max-w-5xl mx-auto">
          <h2 className="text-lg sm:text-xl font-light tracking-tight text-text-primary mb-8">
            Related <span className="text-primary font-semibold">products</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((r) => {
              const RIcon = r.icon;
              return (
                <a
                  key={r.id}
                  href={`/products/${r.slug}`}
                  className="group flex flex-col gap-3 p-5 rounded-2xl border border-border bg-surface/40 hover:border-primary/40 transition-all duration-300"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${r.accentColor}18`, border: `1px solid ${r.accentColor}35` }}
                  >
                    <RIcon className="w-5 h-5" style={{ color: r.accentColor }} />
                  </div>
                  <p className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors leading-snug">
                    {r.name}
                  </p>
                  <p className="text-xs text-text-muted leading-relaxed line-clamp-2">{r.tagline}</p>
                </a>
              );
            })}
          </div>
        </section>
      )}

      {/* ── PREV / NEXT ── */}
      <section className="px-6 md:px-12 lg:px-24 py-12 border-t border-border/20 relative z-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prev ? (
            <a
              href={`/products/${prev.slug}`}
              className="p-5 rounded-2xl border border-border bg-surface/40 hover:border-primary/40 transition-all group text-left"
            >
              <div className="flex items-center gap-2 text-[10px] text-text-muted font-mono uppercase tracking-widest mb-2">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Previous
              </div>
              <p className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors line-clamp-2">{prev.name}</p>
            </a>
          ) : <div />}

          {next ? (
            <a
              href={`/products/${next.slug}`}
              className="p-5 rounded-2xl border border-border bg-surface/40 hover:border-primary/40 transition-all group text-right"
            >
              <div className="flex items-center gap-2 text-[10px] text-text-muted font-mono uppercase tracking-widest mb-2 justify-end">
                Next <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors line-clamp-2">{next.name}</p>
            </a>
          ) : <div />}
        </div>
      </section>
    </div>
  );
}
