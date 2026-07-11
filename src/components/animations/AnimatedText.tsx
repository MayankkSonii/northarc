import React from "react";
import { motion } from "motion/react";
import {
  wordRevealContainer,
  wordRevealItem,
  wordRevealFastContainer,
  charRevealContainer,
  charRevealItem,
  viewportOnce,
} from "../../lib/animations";

interface AnimatedTextProps {
  /** The text to animate */
  text: string;
  /** Split by "words" or "chars" */
  type?: "words" | "chars";
  /** Tailwind / CSS classNames applied to the outer wrapper */
  className?: string;
  /** Which HTML element to render */
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  /** Delay before the animation starts (seconds) */
  delay?: number;
  /** Whether to trigger only once (default: true) */
  once?: boolean;
  /** Viewport margin before the animation triggers */
  margin?: string;
  /** Use fast stagger (useful for sub-headings) */
  fast?: boolean;
  /** Animate on mount instead of on scroll (for hero elements) */
  animateOnMount?: boolean;
}

/**
 * AnimatedText — splits text into words (or chars) and reveals each
 * sequentially using a clip-path / translateY technique, inspired by
 * nudot.com.tw and aim-cube.com heading reveals.
 *
 * Usage:
 *   <AnimatedText text="Scale Your Operations" as="h1" type="words" />
 */
export default function AnimatedText({
  text,
  className = "",
  as: Tag = "span",
  delay = 0,
  once = true,
  margin = "-10px",
  animateOnMount = false,
}: AnimatedTextProps) {
  const TagEl = Tag as React.ElementType;

  const revealVariant = {
    hidden: { y: 12, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
        delay: delay,
      },
    },
  };

  const motionProps = animateOnMount
    ? { initial: "hidden", animate: "visible" }
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once, margin },
      };

  return (
    <TagEl className={`${className} inline-block overflow-hidden`} aria-label={text}>
      <motion.span
        variants={revealVariant}
        {...motionProps}
        className="inline-block"
        style={{ originY: "100%" }}
      >
        {text}
      </motion.span>
    </TagEl>
  );
}
