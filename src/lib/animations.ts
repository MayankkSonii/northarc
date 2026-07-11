import type { Transition, Variants } from "motion/react";

/* -------------------------------------------------------------------------- */
/*  Shared easings & transitions                                              */
/* -------------------------------------------------------------------------- */

// Gentle, premium easeOut curve reused across most variants.
const easeOutSoft: [number, number, number, number] = [0.22, 1, 0.36, 1];
const easeOutBack: [number, number, number, number] = [0.34, 1.56, 0.64, 1];
const easeInOut: [number, number, number, number] = [0.4, 0, 0.2, 1];

export const springGentle: Transition = {
  type: "spring",
  stiffness: 170,
  damping: 24,
  mass: 0.7,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 190,
  damping: 22,
  mass: 0.65,
};

export const springBouncy: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 15,
  mass: 0.6,
};

export const fadeTransition: Transition = {
  duration: 0.24,
  ease: easeOutSoft,
};

export const staggerDelay = 0.02;

/* -------------------------------------------------------------------------- */
/*  Core variants (existing, refined)                                         */
/* -------------------------------------------------------------------------- */

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.24, ease: easeOutSoft },
  },
};

export const fadeInVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, ease: easeOutSoft },
  },
};

export const scaleInVariant: Variants = {
  hidden: { opacity: 0, scale: 0.99 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.24, ease: easeOutSoft },
  },
};

export const slideRightVariant: Variants = {
  hidden: { opacity: 0, x: 8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.24, ease: easeOutSoft },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.01,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.24, ease: easeOutSoft },
  },
};

export const heroVisualVariant: Variants = {
  hidden: { opacity: 0, scale: 0.99, x: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: springGentle,
  },
};

/* -------------------------------------------------------------------------- */
/*  Slide variants                                                             */
/* -------------------------------------------------------------------------- */

export const slideLeftVariant: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.24, ease: easeOutSoft },
  },
};

export const slideUpSoft: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.24, ease: easeOutSoft },
  },
};

// More dramatic slide for hero headings
export const slideUpLarge: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: easeOutSoft },
  },
};

/* -------------------------------------------------------------------------- */
/*  Blur / blur-in                                                             */
/* -------------------------------------------------------------------------- */

export const blurInVariant: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: easeOutSoft },
  },
};

export const blurInVariantFast: Variants = {
  hidden: { opacity: 0, scale: 0.995 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: easeOutSoft },
  },
};

/* -------------------------------------------------------------------------- */
/*  Clip-path reveal (word / line reveal like nudot.com.tw)                  */
/* -------------------------------------------------------------------------- */

// Reveals from bottom using clip-path — for headings split into word spans
export const clipRevealVariant: Variants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.25, ease: easeOutSoft },
  },
};

/* -------------------------------------------------------------------------- */
/*  Word / character reveal containers                                        */
/* -------------------------------------------------------------------------- */

// Container — staggers each word/char child
export const wordRevealContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.015,
      delayChildren: 0,
    },
  },
};

export const wordRevealItem: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.22, ease: easeOutSoft },
  },
};

// Faster word stagger for sub-headings
export const wordRevealFastContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.012,
      delayChildren: 0,
    },
  },
};

// Character reveal — for very short, impactful phrases
export const charRevealContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.008,
      delayChildren: 0,
    },
  },
};

export const charRevealItem: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.18, ease: easeOutSoft },
  },
};

/* -------------------------------------------------------------------------- */
/*  Scale / pop variants                                                      */
/* -------------------------------------------------------------------------- */

export const scalePopVariant: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: springBouncy,
  },
};

export const scaleInSubtle: Variants = {
  hidden: { scale: 0.96, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.2, ease: easeOutSoft },
  },
};

/* -------------------------------------------------------------------------- */
/*  Card hover (for use with whileHover)                                      */
/* -------------------------------------------------------------------------- */

export const cardHoverLift = {
  y: -3,
  scale: 1.002,
  transition: { duration: 0.14, ease: easeOutSoft },
};

export const cardHoverGlow = {
  boxShadow: "0 16px 36px rgba(29, 117, 255, 0.12), 0 4px 12px rgba(0,0,0,0.2)",
};

/* -------------------------------------------------------------------------- */
/*  Timeline / line draw variants                                              */
/* -------------------------------------------------------------------------- */

export const timelineItemVariant: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.24, ease: easeOutSoft },
  },
};

export const lineDrawVariant: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.35, ease: easeOutSoft },
  },
};

export const lineDrawVerticalVariant: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.4, ease: easeOutSoft },
  },
};

/* -------------------------------------------------------------------------- */
/*  Mask reveal variant (for blocks)                                          */
/* -------------------------------------------------------------------------- */

export const maskRevealVariant: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.24, ease: easeOutSoft },
  },
};

/* -------------------------------------------------------------------------- */
/*  Page transition                                                            */
/* -------------------------------------------------------------------------- */

export const pageTransitionVariant: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.18, ease: easeOutSoft },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.12, ease: easeInOut },
  },
};

/* -------------------------------------------------------------------------- */
/*  Floating CTA variant                                                       */
/* -------------------------------------------------------------------------- */

export const floatingCTAVariant: Variants = {
  hidden: { opacity: 0, x: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: springSnappy,
  },
  exit: {
    opacity: 0,
    x: 50,
    scale: 0.95,
    transition: { duration: 0.2, ease: easeInOut },
  },
};

/* -------------------------------------------------------------------------- */
/*  Stagger helpers (factories)                                                */
/* -------------------------------------------------------------------------- */

// Factory: container variant with a configurable initial delay before children.
export const makeStagger = (delay = 0, stagger = staggerDelay): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

export const makeStaggerFast = (delay = 0): Variants =>
  makeStagger(delay, 0.015);

export const makeStaggerSlow = (delay = 0): Variants =>
  makeStagger(delay, 0.035);

/* -------------------------------------------------------------------------- */
/*  Viewport configs                                                           */
/* -------------------------------------------------------------------------- */

export const viewportOnce = {
  once: true,
  margin: "80px",
} as const;

export const viewportSoft = {
  once: true,
  margin: "120px",
} as const;

export const viewportEarly = {
  once: true,
  margin: "160px",
} as const;
