import React from "react";
import { motion } from "motion/react";
import { staggerContainer, staggerItem, fadeUpVariant, viewportOnce } from "../../lib/animations";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  User,
  Quote,
  Lightbulb,
  CheckCircle,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import blogPosts, { BlogSection } from "../../data/blogsData";

interface Props {
  slug: string;
}

export default function BlogDetail({ slug }: Props) {
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg text-text-primary">
        <div className="text-center space-y-4">
          <p className="text-4xl font-light opacity-30">404</p>
          <p className="text-text-muted">Article not found.</p>
          <a href="/resources/blogs" className="inline-flex items-center gap-2 text-sm text-primary hover:underline mt-4">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </a>
        </div>
      </div>
    );
  }

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prev = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const next = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  // Calculate approximate read progress heading anchors
  const headings = post.sections
    .filter((s) => s.type === "h2")
    .map((s) => s.content || "");

  return (
    <div className="bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans">
      {/* Ambient orb */}
      <div
        className="absolute right-[-10%] top-[5%] w-[50vw] h-[50vw] rounded-full blur-[150px] pointer-events-none z-0 opacity-15"
        style={{ background: `radial-gradient(circle, ${post.accentColor}, transparent)` }}
      />

      {/* ── HERO ── */}
      <section className="px-6 md:px-12 lg:px-24 pt-40 pb-10 relative z-10 max-w-5xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-text-muted font-mono mb-8" variants={staggerItem}>
            <a href="/resources/blogs" className="hover:text-primary transition-colors">Blog</a>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text-secondary truncate max-w-[220px]">{post.category}</span>
          </nav>

          {/* Back link */}
          <a
            href="/resources/blogs"
            className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-primary transition-colors mb-8 group"
            variants={staggerItem}
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            All Articles
          </a>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6 text-left"
          >
            {/* Category badge */}
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border inline-block"
              style={{ color: post.accentColor, borderColor: `${post.accentColor}40`, background: `${post.accentColor}10` }}
              variants={staggerItem}
            >
              {post.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-text-primary leading-[1.1]" variants={staggerItem}>
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-base text-text-secondary leading-relaxed max-w-3xl" variants={staggerItem}>
              {post.excerpt}
            </p>

            {/* Meta strip */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-text-muted pt-2 border-t border-border/30 py-4" variants={staggerItem}>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" style={{ color: post.accentColor }} />
                <span>{post.author}</span>
                <span className="text-border">·</span>
                <span>{post.authorRole}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" style={{ color: post.accentColor }} />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" style={{ color: post.accentColor }} />
                {post.readTime}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2" variants={staggerItem}>
              {post.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 text-[10px] font-mono px-2.5 py-1 rounded-lg bg-surface-elevated border border-border text-text-muted" variants={staggerItem}>
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── BODY ── */}
      <section className="px-6 md:px-12 lg:px-24 pb-20 relative z-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Article content */}
          <article className="lg:col-span-8 space-y-5 text-left">
            {post.sections.map((section, i) => (
              <BlogSectionRenderer key={i} section={section} accentColor={post.accentColor} />
            ))}
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 text-left">
            <div className="sticky top-[88px] space-y-5">
              {/* Table of contents */}
              {headings.length > 0 && (
                <div className="p-5 rounded-2xl border border-border bg-surface/40 backdrop-blur-sm">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-muted block mb-4">
                    In This Article
                  </span>
                  <ul className="space-y-2">
                    {headings.map((heading, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span
                          className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                          style={{ background: post.accentColor }}
                        />
                        <span className="text-xs text-text-muted leading-relaxed">{heading}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Article info */}
              <div className="p-5 rounded-2xl border border-border bg-surface/40 backdrop-blur-sm space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-muted block">
                  Article Details
                </span>
                <div className="space-y-2 text-xs text-text-muted">
                  <div className="flex justify-between">
                    <span>Category</span>
                    <span className="font-medium" style={{ color: post.accentColor }}>{post.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Published</span>
                    <span className="text-text-secondary">{post.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Read time</span>
                    <span className="text-text-secondary">{post.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Related articles */}
              {(prev || next) && (
                <div className="p-5 rounded-2xl border border-border bg-surface/40 backdrop-blur-sm">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-muted block mb-4">
                    More Articles
                  </span>
                  <div className="space-y-3">
                    {[prev, next].filter(Boolean).slice(0, 2).map((article) => article && (
                      <a
                        key={article.slug}
                        href={`/resources/blogs/${article.slug}`}
                        className="block group"
                      >
                        <span
                          className="text-[9px] font-bold uppercase tracking-widest"
                          style={{ color: article.accentColor }}
                        >
                          {article.category}
                        </span>
                        <p className="text-xs text-text-muted group-hover:text-text-primary transition-colors mt-0.5 leading-relaxed line-clamp-2">
                          {article.title}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="p-5 rounded-2xl border border-primary/20 bg-primary/5">
                <p className="text-sm font-semibold text-text-primary mb-1">Need help with analytics?</p>
                <p className="text-xs text-text-muted mb-4 leading-relaxed">We help teams build measurement systems that actually work. Let's talk.</p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs w-full justify-center transition-all shadow-lg shadow-primary/20"
                >
                  Get in touch
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── PREV / NEXT ── */}
      <section className="px-6 md:px-12 lg:px-24 py-12 border-t border-border/20 relative z-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prev ? (
            <a
              href={`/resources/blogs/${prev.slug}`}
              className="p-5 rounded-2xl border border-border bg-surface/40 hover:border-primary/40 transition-all group text-left"
            >
              <div className="flex items-center gap-2 text-[10px] text-text-muted font-mono uppercase tracking-widest mb-2">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Previous
              </div>
              <p className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors line-clamp-2">{prev.title}</p>
            </a>
          ) : <div />}

          {next ? (
            <a
              href={`/resources/blogs/${next.slug}`}
              className="p-5 rounded-2xl border border-border bg-surface/40 hover:border-primary/40 transition-all group text-right"
            >
              <div className="flex items-center gap-2 text-[10px] text-text-muted font-mono uppercase tracking-widest mb-2 justify-end">
                Next <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors line-clamp-2">{next.title}</p>
            </a>
          ) : <div />}
        </div>
      </section>

      {/* ── MORE ARTICLES CTA ── */}
      <section className="px-6 md:px-12 lg:px-24 py-16 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl border border-border bg-surface/50 backdrop-blur-xl px-8 py-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none" />
            <h2 className="text-2xl sm:text-3xl font-light text-text-primary mb-3">
              Explore more <span className="text-primary font-semibold">insights</span>
            </h2>
            <p className="text-sm text-text-secondary mb-6">
              Deep dives on GA4, BigQuery, AI analytics, and measurement engineering.
            </p>
            <a
              href="/resources/blogs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm transition-all shadow-lg shadow-primary/20"
            >
              All Articles <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Section renderer ── */
function BlogSectionRenderer({ section, accentColor }: { section: BlogSection; accentColor: string; key?: any }) {
  switch (section.type) {
    case "h2":
      return (
        <h2 className="text-xl sm:text-2xl font-light tracking-tight text-text-primary pt-6 pb-1 border-b border-border/20">
          {section.content}
        </h2>
      );
    case "h3":
      return (
        <h3 className="text-base sm:text-lg font-semibold text-text-primary pt-3">
          {section.content}
        </h3>
      );
    case "p":
      return (
        <p className="text-sm text-text-secondary leading-[1.8]">
          {section.content}
        </p>
      );
    case "ul":
      return (
        <ul className="space-y-2.5">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: accentColor }} />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="space-y-2.5">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                style={{ background: `${accentColor}18`, color: accentColor }}
              >
                {i + 1}
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote className="relative pl-5 border-l-2 py-2 my-4" style={{ borderColor: accentColor }}>
          <Quote className="w-5 h-5 opacity-25 mb-2" style={{ color: accentColor }} />
          <p className="text-sm italic text-text-secondary leading-relaxed">{section.content}</p>
        </blockquote>
      );
    case "callout":
      return (
        <div
          className="flex items-start gap-3 p-5 rounded-xl border my-2"
          style={{ borderColor: `${accentColor}30`, background: `${accentColor}08` }}
        >
          <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: accentColor }} />
          <p className="text-sm leading-relaxed" style={{ color: accentColor }}>
            {section.content}
          </p>
        </div>
      );
    case "code":
      return (
        <div className="my-4 rounded-xl overflow-hidden border border-border">
          {/* Code header */}
          <div className="flex items-center justify-between px-4 py-2 bg-surface-elevated border-b border-border">
            <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">
              {section.language || "code"}
            </span>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-border" />
              <span className="w-2.5 h-2.5 rounded-full bg-border" />
              <span className="w-2.5 h-2.5 rounded-full bg-border" />
            </div>
          </div>
          {/* Code body */}
          <pre className="p-5 bg-surface text-xs text-text-secondary font-mono leading-relaxed overflow-x-auto whitespace-pre">
            <code>{section.content}</code>
          </pre>
        </div>
      );
    default:
      return null;
  }
}
