import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ParallaxSectionProps {
  children: React.ReactNode;
  /** Parallax speed factor (negative values move opposite to scroll, positive values move with scroll) */
  offset?: number;
  className?: string;
}

/**
 * ParallaxSection — wraps an element and applies a scroll-dependent Y transformation
 * using Framer Motion's useScroll & useTransform. Excellent for background orbs,
 * decorative shapes, or subtle parallax columns.
 */
export default function ParallaxSection({
  children,
  offset = -60,
  className = "",
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transform scroll progress to Y translation
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <motion.div style={{ y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}
