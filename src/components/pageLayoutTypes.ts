import type { LucideIcon } from 'lucide-react';
export interface FeatureItem { icon: LucideIcon; title: string; desc: string; }
export interface ProcessStep { num: string; title: string; desc: string; }
export interface PageContent {
  eyebrow: string; title: string; intro: string;
  heroIcon: LucideIcon; heroScene: string; heroTitle: string;
  accent: string;
  capsTitle: string; capsIntro: string; capabilities: FeatureItem[];
  processTitle: string; processIntro: string; process: ProcessStep[];
  proofTitle: string; proofIntro: string; highlights: string[];
  ctaTitle: string; ctaIntro: string; ctaLabel: string;
}
