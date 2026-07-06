import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { staggerContainer, staggerItem, staggerDelay } from "../../lib/animations";
import { AnimatedHeroVisual } from "../../components/AnimatedHeroVisual";
import { useSEO, breadcrumbJsonLd, SITE_URL } from "../../lib/seo";
import {
  ArrowRight,
  ArrowDown,
  Filter,
  Search,
  Boxes,
  Layers,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import products from "../../data/productsData";

// Ordered category list for filter pills, "All" first.
const categories = [
  "All",
  ...Array.from(new Set(products.map((p) => p.category))),
];

export default function Products() {
  useSEO({
    title: "AI Products & Solutions Catalog",
    description:
      "Explore NorthArc's catalog of production-ready AI products, voice agents, RAG assistants, predictive ML, document intelligence and agentic AI, all built for measurable business outcomes.",
    path: "/products",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "NorthArc AI Products & Solutions",
        description:
          "Production-ready AI products spanning conversational AI, generative AI, predictive machine learning, document intelligence and agentic automation.",
        numberOfItems: products.length,
        itemListElement: products.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.name,
          url: `${SITE_URL}/products/${p.slug}`,
        })),
      },
      breadcrumbJsonLd([{ name: "Products", path: "/products" }]),
    ],
  });

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return products.filter((p) => {
      const matchesCat = activeCategory === "All" || p.category === activeCategory;
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans text-left">
      {/* Ambient background */}
      <div className="absolute left-[-10%] top-[5%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-tr from-primary/6 to-primary/10 blur-[150px] pointer-events-none z-0" />
      <div className="absolute right-[-12%] top-[45%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-purple-500/5 to-secondary/5 blur-[130px] pointer-events-none z-0" />

      {/* ── HERO ── */}
      <section className="min-h-[60vh] flex flex-col justify-between px-6 md:px-12 lg:px-24 pt-40 pb-12 relative z-10 max-w-7xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6 max-w-3xl">
          <motion.span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary font-mono block" variants={staggerItem}>
            Products
          </motion.span>
          <motion.h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-light tracking-tight text-text-primary leading-[1.1]" variants={staggerItem}>
            AI products,<br />
            <span className="text-primary font-semibold">built for outcomes</span>
          </motion.h1>
          <motion.p className="text-sm sm:text-base text-text-secondary font-light max-w-2xl leading-relaxed" variants={staggerItem}>
            Production-ready AI you can deploy against a real business problem, from voice agents and
            RAG assistants to predictive ML, document intelligence and agentic automation. Each one is
            designed around the result it delivers, not the model behind it.
          </motion.p>
          <motion.div className="flex flex-wrap items-center gap-6 pt-1 text-xs text-text-muted font-mono" variants={staggerItem}>
            <span className="flex items-center gap-2">
              <Boxes className="w-3.5 h-3.5 text-primary" />
              {products.length} Products
            </span>
            <span className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-primary" />
              {categories.length - 1} Categories
            </span>
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Outcome-led delivery
            </span>
          </motion.div>
        </motion.div>
        <div className="pointer-events-none absolute right-6 top-[calc(50%+40px)] hidden w-[38%] -translate-y-1/2 lg:block">
          <AnimatedHeroVisual icon={Boxes} title="Deployable AI" eyebrow="Product catalog" scene="data" />
        </div>
        <div className="flex items-center gap-3 text-xs text-text-secondary font-mono opacity-60 pt-10 lg:pt-0">
          <div className="w-8 h-8 rounded-full border border-border/30 flex items-center justify-center animate-bounce">
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
          Browse the catalog
        </div>
      </section>

      {/* ── STICKY FILTERS ── */}
      <section className="sticky top-[72px] z-30 px-6 md:px-12 lg:px-24 py-3.5 bg-bg/85 backdrop-blur-xl border-b border-border/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
            <input
              type="text"
              placeholder="Search products…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface border border-border text-xs text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/40 transition-colors"
            />
          </div>
          {/* Category pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <Filter className="w-3 h-3 text-text-muted flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide transition-all duration-200 border ${
                  activeCategory === cat
                    ? "bg-primary text-white border-primary shadow-sm shadow-primary/20"
                    : "bg-surface border-border/60 text-text-muted hover:text-text-secondary hover:border-primary/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="px-6 md:px-12 lg:px-24 py-14 relative z-10 max-w-7xl mx-auto">
        <p className="text-[11px] text-text-muted font-mono mb-8">
          Showing <span className="text-primary font-semibold">{filtered.length}</span> of {products.length} products
        </p>

        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p, i) => {
              const Icon = p.icon;
              const isHovered = hoveredId === p.id;
              const keyOutcome = p.outcomes[0];
              return (
                <motion.a
                  key={p.id}
                  href={`/products/${p.slug}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * staggerDelay }}
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group relative flex flex-col rounded-2xl border bg-surface/50 backdrop-blur-sm overflow-hidden transition-all duration-300"
                  style={{
                    borderColor: isHovered ? `${p.accentColor}60` : "rgba(255,255,255,0.07)",
                    boxShadow: isHovered ? `0 8px 32px ${p.accentColor}18` : "none",
                  }}
                >
                  {/* Top accent bar */}
                  <div
                    className="h-[3px] w-full transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, ${p.accentColor}, ${p.accentColor}40)`, opacity: isHovered ? 1 : 0.4 }}
                  />

                  {/* Hover radial glow */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(ellipse at 50% 0%, ${p.accentColor}10 0%, transparent 65%)`,
                      opacity: isHovered ? 1 : 0,
                    }}
                  />

                  <div className="p-6 flex flex-col gap-4 flex-grow relative">
                    {/* Icon + category row */}
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{ background: `${p.accentColor}18`, border: `1px solid ${p.accentColor}35` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: p.accentColor }} />
                      </div>
                      <span
                        className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                        style={{ color: p.accentColor, borderColor: `${p.accentColor}35`, background: `${p.accentColor}10` }}
                      >
                        {p.category}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="text-base font-semibold leading-snug text-text-primary">
                      {p.name}
                    </h3>

                    {/* Tagline */}
                    <p className="text-xs text-text-secondary leading-relaxed flex-grow">
                      {p.tagline}
                    </p>

                    {/* Key outcome */}
                    <div className="flex items-start gap-2 pt-3 border-t border-border/20">
                      <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: p.accentColor }} />
                      <p className="text-[11px] text-text-muted leading-snug">{keyOutcome}</p>
                    </div>

                    {/* CTA */}
                    <div
                      className="flex items-center gap-1.5 text-[11px] font-semibold mt-1 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0"
                      style={{ color: p.accentColor }}
                    >
                      Explore product
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-28 text-text-muted">
            <Search className="w-10 h-10 mx-auto mb-4 opacity-20" />
            <p className="text-sm">No products match your filters.</p>
          </div>
        )}
      </section>

      {/* ── CTA BANNER ── */}
      <section className="px-6 md:px-12 lg:px-24 py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl border border-border/50 bg-surface/40 backdrop-blur-xl px-8 py-14 sm:px-16 overflow-hidden text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-transparent to-purple-500/6 pointer-events-none" />
            <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[40vw] h-[40vw] rounded-full bg-primary/8 blur-[100px] pointer-events-none" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold block mb-4">
              Let's Build
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-text-primary mb-4">
              Not sure which product{" "}
              <span className="text-primary font-semibold">fits your problem?</span>
            </h2>
            <p className="text-sm text-text-secondary max-w-xl mx-auto mb-8">
              Tell us the outcome you're after. We'll map the right AI product, or tailor one, to your data, systems and goals.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              Talk to our team
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
