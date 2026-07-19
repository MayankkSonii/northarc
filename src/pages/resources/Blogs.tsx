import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { staggerContainer, staggerItem, staggerDelay } from "../../lib/animations";
import { AnimatedHeroVisual } from "../../components/AnimatedHeroVisual";
import { useSEO, breadcrumbJsonLd } from "../../lib/seo";
import {
  ArrowRight,
  ArrowDown,
  Calendar,
  Clock,
  Search,
  Filter,
  BookOpen,
  Rss,
  Tag,
} from "lucide-react";
import blogPosts from "../../data/blogsData";

const allCategories = [
  "All", "GA4", "BigQuery", "Agentic AI",
  "AI Analytics", "Analytics Strategy", "Data Quality", "CRO",
];

export default function Blogs() {
  useSEO({
    title: "Software Development Blog | AI Trends, SaaS & Technology Insights",
    description:
      "Read the latest AI development trends, software development best practices, and a SaaS product development guide from NorthArc. Web development tutorials for businesses and enterprise technology insights to help you stay ahead.",
    path: "/resources/blogs",
    keywords:
      "Software Development Blog, AI Trends, Web Development, SaaS, Technology Insights, Latest AI Development Trends, Software Development Best Practices, SaaS Product Development Guide, Web Development Tutorials for Businesses, Enterprise Technology Insights",
    jsonLd: breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/resources/blogs" },
    ]),
  });

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered = blogPosts.filter((post) => {
    const matchesCat = activeCategory === "All" || post.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans text-left">
      {/* Ambient orbs */}
      <div className="absolute right-[-10%] top-[5%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-tr from-primary/6 to-primary/10 blur-[150px] pointer-events-none z-0" />
      <div className="absolute left-[-12%] top-[50%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-purple-500/5 to-secondary/5 blur-[130px] pointer-events-none z-0" />

      {/* ── HERO ── */}
      <section className="flex flex-col justify-between px-6 md:px-12 lg:px-24 pt-32 lg:pt-32 pb-8 lg:min-h-[52vh] lg:pb-12 relative z-10 max-w-7xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6 max-w-3xl">
          <motion.span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary font-mono block" variants={staggerItem}>
            Resources / Blog
          </motion.span>
          <motion.h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-light tracking-tight text-text-primary leading-[1.1]" variants={staggerItem}>
            Insights from the<br />
            <span className="text-primary font-semibold">analytics frontier</span>
          </motion.h1>
          <motion.p className="text-sm sm:text-base text-text-secondary font-light max-w-2xl leading-relaxed" variants={staggerItem}>
            Deep dives, practical guides, and strategic frameworks on GA4, BigQuery, AI-powered analytics,
            and data engineering, written by practitioners for practitioners.
          </motion.p>
          <motion.div className="flex flex-wrap items-center gap-6 pt-1 text-xs text-text-muted font-mono" variants={staggerItem}>
            <span className="flex items-center gap-2">
              <Rss className="w-3.5 h-3.5 text-primary" />
              {blogPosts.length} Articles
            </span>
            <span className="flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-primary" />
              Expert Authors
            </span>
            <span className="flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-primary" />
              Actionable Insights
            </span>
          </motion.div>
        </motion.div>
        <div className="pointer-events-none absolute right-6 top-[calc(50%+40px)] hidden w-[38%] -translate-y-1/2 lg:block">
          <AnimatedHeroVisual icon={BookOpen} title="Insight stream" eyebrow="Research feed" scene="ai" />
        </div>
        <div className="hidden items-center gap-3 text-xs text-text-secondary font-mono opacity-60 pt-10 sm:flex lg:pt-0">
          <div className="w-8 h-8 rounded-full border border-border/30 flex items-center justify-center animate-bounce">
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
          Scroll to read
        </div>
      </section>

      {/* ── STICKY FILTERS ── */}
      <section className="sticky top-[72px] z-30 px-6 md:px-12 lg:px-24 py-3.5 bg-bg/85 backdrop-blur-xl border-b border-border/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
            <input
              type="text"
              aria-label="Search articles"
              placeholder="Search articles…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface border border-border text-xs text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/40 transition-colors"
            />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <Filter className="w-3 h-3 text-text-muted flex-shrink-0" />
            {allCategories.map((cat) => (
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
      <section className="px-6 md:px-12 lg:px-24 py-10 sm:py-14 relative z-10 max-w-7xl mx-auto">
        <p className="text-[11px] text-text-muted font-mono mb-8">
          Showing <span className="text-primary font-semibold">{filtered.length}</span> of {blogPosts.length} articles
        </p>

        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((post, i) => {
              const isHovered = hoveredId === post.id;
              return (
                <motion.a
                  key={post.id}
                  href={`/resources/blogs/${post.slug}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * staggerDelay }}
                  onMouseEnter={() => setHoveredId(post.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group relative flex flex-col rounded-2xl border bg-surface/50 backdrop-blur-sm overflow-hidden transition-all duration-300"
                  style={{
                    borderColor: isHovered ? `${post.accentColor}60` : "rgba(255,255,255,0.07)",
                    boxShadow: isHovered ? `0 8px 32px ${post.accentColor}18` : "none",
                  }}
                >
                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] transition-opacity duration-300 rounded-l-2xl"
                    style={{
                      background: `linear-gradient(180deg, ${post.accentColor}, ${post.accentColor}30)`,
                      opacity: isHovered ? 1 : 0.35,
                    }}
                  />

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(ellipse at 0% 50%, ${post.accentColor}10 0%, transparent 65%)`,
                      opacity: isHovered ? 1 : 0,
                    }}
                  />

                  <div className="pl-7 pr-6 py-6 flex flex-col gap-4 flex-grow relative">
                    {/* Top: category + read time */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border"
                        style={{
                          color: post.accentColor,
                          borderColor: `${post.accentColor}40`,
                          background: `${post.accentColor}10`,
                        }}
                      >
                        {post.category}
                      </span>
                      <span className="text-[10px] text-text-muted font-mono flex items-center gap-1 flex-shrink-0">
                        <Clock className="w-2.5 h-2.5" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-semibold leading-snug text-text-primary group-hover:transition-colors duration-300 flex-grow">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex gap-1.5 flex-wrap">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-surface-elevated border border-border/60 text-text-muted">
                          #{tag.replace(/\s+/g, "")}
                        </span>
                      ))}
                    </div>

                    {/* Footer: date + CTA */}
                    <div className="flex items-center justify-between pt-3 border-t border-border/20 mt-auto">
                      <span className="text-[10px] text-text-muted font-mono flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span
                        className="flex items-center gap-1 text-[11px] font-semibold transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0"
                        style={{ color: post.accentColor }}
                      >
                        Read article
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-16 sm:py-28 text-text-muted">
            <Search className="w-10 h-10 mx-auto mb-4 opacity-20" />
            <p className="text-sm">No articles match your search.</p>
          </div>
        )}
      </section>

      {/* ── NEWSLETTER CTA ── */}
      <section className="px-6 md:px-12 lg:px-24 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl border border-border/50 bg-surface/40 backdrop-blur-xl px-5 py-10 sm:px-16 sm:py-14 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none" />
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold block">
                  Stay Informed
                </span>
                <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-text-primary">
                  Analytics insights,{" "}
                  <span className="text-primary font-semibold">delivered</span>
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Get the latest on GA4, BigQuery, AI analytics, and data engineering. No spam, just
                  thoughtful, practitioner-level content.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    name="email"
                    aria-label="Email address"
                    placeholder="your@email.com"
                    className="flex-grow px-5 py-3.5 rounded-xl bg-surface border border-border text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/50 transition-colors"
                  />
                  <button className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm whitespace-nowrap flex items-center gap-2 shadow-lg shadow-primary/20 transition-all">
                    Subscribe <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[11px] text-text-muted">Unsubscribe anytime. We respect your inbox.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
