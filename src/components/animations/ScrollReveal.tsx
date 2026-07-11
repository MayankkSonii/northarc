import React from "react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import {
  fadeUpVariant,
  slideLeftVariant,
  slideRightVariant,
  blurInVariant,
  scaleInVariant,
  slideUpLarge,
  scaleInSubtle,
  viewportOnce,
  viewportSoft,
} from "../../lib/animations";

type VariantName =
  | "fadeUp"
  | "fadeIn"
  | "slideLeft"
  | "slideRight"
  | "blurIn"
  | "scaleIn"
  | "slideUpLarge"
  | "scaleSubtle";

const variantMap: Record<VariantName, Variants> = {
  fadeUp: fadeUpVariant,
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } },
  },
  slideLeft: slideLeftVariant,
  slideRight: slideRightVariant,
  blurIn: blurInVariant,
  scaleIn: scaleInVariant,
  slideUpLarge: slideUpLarge,
  scaleSubtle: scaleInSubtle,
};

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: VariantName;
  delay?: number;
  duration?: number;
  className?: string;
  /** Use "soft" viewport (triggers earlier) or "once" (default) */
  viewport?: "soft" | "once" | "early";
  /** Disable animation entirely (useful for small screens or compat) */
  disabled?: boolean;
}

/**
 * ScrollReveal — a lightweight wrapper that applies a scroll-triggered
 * motion animation to its children. Acts as a composable primitive for
 * section-level reveals across all pages.
 *
 * Usage:
 *   <ScrollReveal variant="fadeUp" delay={0.2}>
 *     <SomeCard />
 *   </ScrollReveal>
 */
export default function ScrollReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  duration,
  className,
  viewport = "once",
  disabled = false,
}: ScrollRevealProps) {
  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  const baseVariants = variantMap[variant];
  const effectiveDelay = Math.min(delay, 0.08);
  const effectiveDuration = duration ? Math.min(duration, 0.24) : undefined;

  // Apply custom delay/duration by overriding the transition
  const customVariants: Variants = effectiveDelay || effectiveDuration
    ? {
        hidden: baseVariants.hidden,
        visible: {
          ...(baseVariants.visible as object),
          transition: {
            ...((baseVariants.visible as { transition?: object }).transition || {}),
            ...(effectiveDelay ? { delay: effectiveDelay } : {}),
            ...(effectiveDuration ? { duration: effectiveDuration } : {}),
          },
        },
      }
    : baseVariants;

  const viewportConfig =
    viewport === "soft"
      ? viewportSoft
      : viewport === "early"
      ? { once: true, margin: "-40px" }
      : viewportOnce;

  return (
    <motion.div
      variants={customVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className={className}
    >
      {children}
    </motion.div>
  );
}
