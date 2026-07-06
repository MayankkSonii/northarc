import { motion } from "motion/react";
import { ArrowRight, Home as HomeIcon } from "lucide-react";
import { useSEO } from "../lib/seo";

/**
 * On-brand 404 page. Rendered by App.tsx for any unknown route.
 * Marked noindex so search engines never index unknown URLs.
 */
export default function NotFound() {
  useSEO({
    title: "Page Not Found",
    description:
      "The page you're looking for doesn't exist or has moved. Head back to the NorthArc homepage or contact our team about AI engineering and data science.",
    path: window.location.pathname,
    noindex: true,
  });

  return (
    <div className="bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans pt-28 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 max-w-2xl mx-auto px-6 pb-28 text-center space-y-6"
      >
        <span className="text-[10px] font-mono tracking-widest text-primary uppercase font-bold">
          Error 404
        </span>

        <h1 className="text-[7rem] sm:text-[9rem] leading-none font-extrabold font-display tracking-tight bg-gradient-to-b from-text-primary to-text-primary/30 bg-clip-text text-transparent select-none">
          404
        </h1>

        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            This page doesn't exist
          </h2>
          <p className="text-sm sm:text-base text-text-secondary font-light leading-relaxed max-w-md mx-auto">
            The page you're looking for may have moved, or the link is out of
            date. Let's get you back on course.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href="/"
            className="px-6 py-3 rounded-xl text-sm font-bold bg-primary hover:bg-primary/95 text-white shadow-md shadow-primary/20 hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2"
          >
            <HomeIcon className="w-4 h-4" />
            <span>Back to Home</span>
          </a>
          <a
            href="/contact"
            className="px-6 py-3 rounded-xl text-sm font-bold border border-border bg-surface hover:bg-surface-elevated text-text-primary transition-all duration-300 inline-flex items-center gap-2"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
