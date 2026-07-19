import React from "react";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Boxes, CircleDot, Code2, Database, Layers, Network, Sparkles, Users } from "lucide-react";
import { heroVisualVariant, staggerContainer, staggerItem } from "../lib/animations";

type HeroStat = {
  label: string;
  value: string;
};

type Scene = "product" | "design" | "team" | "cloud" | "data" | "ai" | "security" | "default";

type AnimatedHeroVisualProps = {
  icon: LucideIcon;
  title: string;
  eyebrow?: string;
  stats?: HeroStat[];
  accentColor?: string;
  scene?: Scene;
};

const sceneCopy: Record<Scene, string[]> = {
  product: ["API", "Mobile", "Web"],
  design: ["UX", "Scope", "Prototype"],
  team: ["PM", "FE", "QA"],
  cloud: ["VPC", "K8s", "CI"],
  data: ["ETL", "DWH", "BI"],
  ai: ["RAG", "LLM", "Agent"],
  security: ["IAM", "SOC2", "SLA"],
  default: ["Plan", "Build", "Scale"],
};

const sceneIcons: Record<Scene, LucideIcon[]> = {
  product: [Code2, Layers, ArrowUpRight],
  design: [Sparkles, Boxes, CircleDot],
  team: [Users, Network, CircleDot],
  cloud: [Network, Boxes, ArrowUpRight],
  data: [Database, Network, CircleDot],
  ai: [Sparkles, Network, Code2],
  security: [CircleDot, Network, Boxes],
  default: [Layers, Network, ArrowUpRight],
};

export function AnimatedHeroVisual({
  icon: Icon,
  title,
  eyebrow = "Delivery system",
  stats = [
    { value: "01", label: "Discovery" },
    { value: "02", label: "Build" },
    { value: "03", label: "Scale" },
  ],
  accentColor,
  scene = "default",
}: AnimatedHeroVisualProps) {
  const accentStyle = accentColor ? { color: accentColor } : undefined;
  const accentBackground = accentColor ? { background: accentColor } : undefined;
  const labels = sceneCopy[scene] ?? sceneCopy.default;
  const Icons = sceneIcons[scene] ?? sceneIcons.default;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-border/25 bg-surface/45 p-4 backdrop-blur-sm sm:p-5 lg:hidden"
        aria-hidden="true"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{ background: `radial-gradient(circle at 50% 0%, ${accentColor ? `${accentColor}18` : "rgba(29,117,255,0.10)"}, transparent 70%)` }}
        />
        <div className="relative flex items-center gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10"
            style={accentColor ? { borderColor: `${accentColor}55`, background: `${accentColor}18` } : undefined}
          >
            <Icon className="h-6 w-6 text-primary" style={accentStyle} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted">{eyebrow}</p>
            <p className="mt-1 truncate text-sm font-semibold text-text-primary">{title}</p>
          </div>
          <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-glow shadow-[0_0_12px_rgba(77,166,255,0.8)]" />
        </div>
        <div className="relative mt-5 grid grid-cols-3 gap-2">
          {labels.map((label, index) => {
            const NodeIcon = Icons[index] ?? Icon;
            return (
              <React.Fragment key={label}>
                <div className="flex min-w-0 flex-col items-center gap-2 rounded-2xl border border-border/25 bg-bg/35 px-2 py-3 text-center">
                  <NodeIcon className="h-4 w-4 text-primary" style={accentStyle} />
                  <span className="truncate text-[9px] font-mono uppercase tracking-wider text-text-secondary">{label}</span>
                </div>
                {index < labels.length - 1 && <span className="absolute top-7 h-px w-2 bg-primary/35" style={{ left: `calc(${(index + 1) * 33.333}% - 4px)` }} />}
              </React.Fragment>
            );
          })}
        </div>
        <p className="relative mt-4 text-[10px] font-mono tracking-wide text-text-muted">A connected path from intent to measurable delivery</p>
      </motion.div>

      <motion.div
        variants={heroVisualVariant}
        initial="hidden"
        animate="visible"
        className="relative hidden h-[520px] w-full max-w-[520px] ml-auto lg:block"
        aria-hidden="true"
      >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/15"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-1/2 h-[285px] w-[285px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/35"
      />
      <div className="absolute inset-8 rounded-full bg-primary/10 blur-[95px]" />
      <div className="absolute bottom-4 right-0 h-64 w-64 rounded-full bg-secondary/10 blur-[80px]" />

      <motion.div
        animate={{ y: [0, -14, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[16%] top-[12%] h-40 w-28 rounded-[2rem] border border-border/45 bg-bg/35 backdrop-blur-md"
      >
        <div className="mx-auto mt-3 h-1.5 w-10 rounded-full bg-border/60" />
        <div className="mt-8 space-y-3 px-4">
          <div className="h-16 rounded-2xl bg-primary/15" style={accentColor ? { background: `${accentColor}1f` } : undefined} />
          <div className="h-2 rounded-full bg-border/70" />
          <div className="h-2 w-2/3 rounded-full bg-border/50" />
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 16, 0], x: [0, -10, 0] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[7%] top-[20%] h-36 w-52 rounded-[1.75rem] border border-border/45 bg-bg/30 p-4 backdrop-blur-md"
      >
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" style={accentBackground} />
          <span className="h-2 w-16 rounded-full bg-border/70" />
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {stats.slice(0, 3).map((stat) => (
            <div key={stat.label} className="space-y-2">
              <div className="text-sm font-bold text-primary" style={accentStyle}>{stat.value}</div>
              <div className="h-1.5 rounded-full bg-border/50" />
            </div>
          ))}
        </div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "78%" }}
          transition={{ duration: 1.2, delay: 0.35, ease: "easeOut" }}
          className="mt-5 h-1.5 rounded-full bg-primary"
          style={accentBackground}
        />
      </motion.div>

      <motion.div
        animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
        transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[12%] left-[28%] h-36 w-56 rounded-[1.75rem] border border-border/40 bg-bg/25 p-5 backdrop-blur-md"
      >
        <p className="text-[10px] font-mono uppercase tracking-widest text-text-muted">{eyebrow}</p>
        <p className="mt-1 text-sm font-bold text-text-primary">{title}</p>
        <div className="mt-5 flex items-end gap-2">
          {[42, 68, 54, 86, 62].map((height, index) => (
            <motion.span
              key={index}
              initial={{ height: 8 }}
              animate={{ height }}
              transition={{ duration: 1, delay: 0.25 + index * 0.08, ease: "easeOut" }}
              className="w-6 rounded-t-lg bg-primary/70"
              style={accentColor ? { background: accentColor } : undefined}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="absolute inset-0"
      >
        {labels.map((label, index) => {
          const NodeIcon = Icons[index] ?? Icon;
          const positions = [
            "left-[50%] top-[4%]",
            "right-[2%] bottom-[30%]",
            "left-[4%] bottom-[16%]",
          ];

          return (
            <motion.div
              key={label}
              variants={staggerItem}
              animate={{ y: [0, index % 2 ? -8 : 8, 0] }}
              transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute ${positions[index]} flex items-center gap-2 rounded-full border border-primary/25 bg-bg/55 px-3 py-2 backdrop-blur-md`}
            >
              <NodeIcon className="h-3.5 w-3.5 text-primary" style={accentStyle} />
              <span className="text-[10px] font-mono uppercase tracking-widest text-text-secondary">{label}</span>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2rem] border border-primary/30 bg-primary/10 backdrop-blur-lg"
        style={accentColor ? { borderColor: `${accentColor}55`, background: `${accentColor}18` } : undefined}
      >
        <Icon className="h-9 w-9 text-primary" style={accentStyle} />
      </motion.div>
      </motion.div>
    </>
  );
}
