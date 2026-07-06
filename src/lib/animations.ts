import type { Transition, Variants } from "motion/react";

/* -------------------------------------------------------------------------- */
/*  Shared easings & transitions                                              */
/* -------------------------------------------------------------------------- */

// Gentle, premium easeOut curve reused across most variants.
const easeOutSoft: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const springGentle: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 0.9,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 18,
  mass: 0.8,
};

export const fadeTransition: Transition = {
  duration: 0.55,
  ease: easeOutSoft,
};

export const staggerDelay = 0.08;

/* -------------------------------------------------------------------------- */
/*  Core variants (existing names, refined to premium/subtle)                */
/* -------------------------------------------------------------------------- */

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutSoft },
  },
};

export const fadeInVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.65, ease: easeOutSoft },
  },
};

export const scaleInVariant: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: easeOutSoft },
  },
};

export const slideRightVariant: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOutSoft },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.06,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutSoft },
  },
};

export const heroVisualVariant: Variants = {
  hidden: { opacity: 0, scale: 0.97, x: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { ...springGentle, delay: 0.15 },
  },
};

/* -------------------------------------------------------------------------- */
/*  New variants (added for layout variety, all subtle)                      */
/* -------------------------------------------------------------------------- */

export const slideLeftVariant: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOutSoft },
  },
};

export const slideUpSoft: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOutSoft },
  },
};

export const blurInVariant: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: easeOutSoft },
  },
};

export const maskRevealVariant: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOutSoft },
  },
};

export const timelineItemVariant: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOutSoft },
  },
};

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

// Factory: container variant with a configurable initial delay before children.
export const makeStagger = (delay = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: delay,
    },
  },
});

/* -------------------------------------------------------------------------- */
/*  Viewport configs                                                          */
/* -------------------------------------------------------------------------- */

export const viewportOnce = {
  once: true,
  margin: "-80px",
} as const;

export const viewportSoft = {
  once: true,
  margin: "-15% 0px",
} as const;
