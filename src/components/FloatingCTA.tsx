import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { floatingCTAVariant } from "../lib/animations";

/**
 * FloatingCTA — a sticky, animated "Book a Consultation" pill that:
 * - Appears after the user scrolls 400px down
 * - Hides when the user is near the contact section (bottom 600px)
 * - Floats subtly with a CSS animation
 * - Has a pulsing glow ring to draw attention
 * - Slides out from the right with a spring
 */
export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const distFromBottom = docHeight - scrollY - viewportHeight;

      // Show after 400px, hide in last 600px (near contact/footer)
      const shouldShow = scrollY > 400 && distFromBottom > 600;

      if (shouldShow !== visible) {
        // Debounce slight flicker
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setVisible(shouldShow), 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check on mount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="floating-cta"
          variants={floatingCTAVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          aria-label="Floating consultation CTA"
        >
          {/* Outer pulsing glow ring */}
          <span
            className="absolute inset-0 rounded-full bg-primary/20 animate-ping"
            style={{ animationDuration: "2.5s" }}
            aria-hidden="true"
          />

          <a
            href="/contact"
            className="relative flex items-center gap-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-5 py-3 rounded-full shadow-2xl shadow-primary/30 transition-all duration-300 group animate-float-cta"
            style={{ boxShadow: "0 8px 32px rgba(29, 117, 255, 0.35)" }}
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Book a Consultation</span>
            <span className="inline sm:hidden">Book Call</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform shrink-0" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
