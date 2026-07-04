import type { Variants } from "motion/react";

declare module "react" {
  interface HTMLAttributes<T> {
    variants?: Variants;
    initial?: unknown;
    animate?: unknown;
    exit?: unknown;
    whileInView?: unknown;
    viewport?: unknown;
    layout?: unknown;
    transition?: unknown;
  }

  interface AnchorHTMLAttributes<T> {
    variants?: Variants;
    initial?: unknown;
    animate?: unknown;
    exit?: unknown;
    whileInView?: unknown;
    viewport?: unknown;
    layout?: unknown;
    transition?: unknown;
  }
}
