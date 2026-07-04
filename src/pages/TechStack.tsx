import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Terminal, 
  Brain, 
  Network, 
  Cpu, 
  Zap, 
  Cloud, 
  Layers, 
  Database, 
  Sparkles 
} from "lucide-react";
import { TECH_STACK, TechItem } from "../data";

const getTechMonogram = (name: string) => {
  if (name.includes("Python")) return "PY";
  if (name.includes("OpenAI")) return "GPT";
  if (name.includes("LangChain")) return "LCH";
  if (name.includes("TensorFlow")) return "TFS";
  if (name.includes("FastAPI")) return "FAP";
  if (name.includes("AWS")) return "AWS";
  if (name.includes("GCP")) return "GCP";
  if (name.includes("Docker")) return "DCK";
  if (name.includes("Kubernetes")) return "K8S";
  if (name.includes("Vector")) return "VDB";
  if (name.includes("PyTorch")) return "PT";
  if (name.includes("Hugging")) return "HGF";
  return "AI";
};

const getTechDetails = (name: string) => {
  switch (name) {
    case "Python":
      return { icon: <Terminal className="w-4 h-4" />, bg: "from-blue-500/10 to-indigo-500/5", border: "group-hover/chip:border-blue-500/40", text: "text-blue-400" };
    case "OpenAI":
      return { icon: <Brain className="w-4 h-4" />, bg: "from-emerald-500/10 to-teal-500/5", border: "group-hover/chip:border-emerald-500/40", text: "text-emerald-400" };
    case "LangChain":
      return { icon: <Network className="w-4 h-4" />, bg: "from-green-500/10 to-emerald-500/5", border: "group-hover/chip:border-green-500/40", text: "text-green-400" };
    case "TensorFlow":
      return { icon: <Cpu className="w-4 h-4" />, bg: "from-orange-500/10 to-red-500/5", border: "group-hover/chip:border-orange-500/40", text: "text-orange-400" };
    case "FastAPI":
      return { icon: <Zap className="w-4 h-4" />, bg: "from-cyan-500/10 to-blue-500/5", border: "group-hover/chip:border-cyan-500/40", text: "text-cyan-400" };
    case "AWS":
      return { icon: <Cloud className="w-4 h-4" />, bg: "from-yellow-500/10 to-orange-500/5", border: "group-hover/chip:border-yellow-600/40", text: "text-yellow-500" };
    case "GCP":
      return { icon: <Cloud className="w-4 h-4" />, bg: "from-blue-500/10 to-red-500/5", border: "group-hover/chip:border-blue-500/40", text: "text-blue-400" };
    case "Docker":
      return { icon: <Layers className="w-4 h-4" />, bg: "from-sky-500/10 to-blue-500/5", border: "group-hover/chip:border-sky-500/40", text: "text-sky-400" };
    case "Kubernetes":
      return { icon: <Layers className="w-4 h-4" />, bg: "from-blue-600/10 to-indigo-600/5", border: "group-hover/chip:border-blue-600/40", text: "text-blue-500" };
    case "Vector Databases":
      return { icon: <Database className="w-4 h-4" />, bg: "from-violet-500/10 to-purple-500/5", border: "group-hover/chip:border-violet-500/40", text: "text-violet-400" };
    case "PyTorch":
      return { icon: <Cpu className="w-4 h-4" />, bg: "from-rose-500/10 to-orange-500/5", border: "group-hover/chip:border-rose-500/40", text: "text-rose-400" };
    case "Hugging Face":
      return { icon: <Sparkles className="w-4 h-4" />, bg: "from-amber-500/10 to-yellow-500/5", border: "group-hover/chip:border-amber-500/40", text: "text-amber-400" };
    default:
      return { icon: <Sparkles className="w-4 h-4" />, bg: "from-primary/10 to-secondary/5", border: "group-hover/chip:border-primary/40", text: "text-primary" };
  }
};

export default function TechStack() {
  const [hoveredChips, setHoveredChips] = useState<Record<string, TechItem | null>>({});

  const layers = [
    { key: "llm", title: "Cognitive Layer", subtitle: "Agentic Logic & Reasoning", desc: "Frontier language models, stateful multi-agent workflows, and vector memory arrays." },
    { key: "language", title: "Execution Layer", subtitle: "Asynchronous APIs", desc: "High-performance asynchronous computation cores, parsing engines, and secure API routers." },
    { key: "infra", title: "Inference Layer", subtitle: "Deep Learning Neural Systems", desc: "Neural network runtimes, vector indexing, and automatic dataset training frameworks." },
    { key: "cloud", title: "Infrastructure Layer", subtitle: "Secure Cloud & VPC Fabrics", desc: "SOC-2 level isolated virtual clouds, Kubernetes clusters, and auto-scaling GPU nodes." }
  ];

  return (
    <div className="py-20 bg-bg min-h-screen relative grid-bg-dark">
      <div className="absolute top-10 right-10 w-[35vw] h-[35vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[30vw] h-[30vw] rounded-full bg-secondary/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-left">
        
        {/* Vertical decorative section title */}
        <div className="hidden xl:block absolute left-[-4rem] top-[10rem] origin-left rotate-90 text-[10px] tracking-[0.6em] font-mono text-text-muted uppercase">
          T e c h  S t a c k
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-4 mb-16 max-w-2xl text-left"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#10b981] font-mono block">OUR REPERTOIRE</span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white leading-[1.1]">
            Enterprise Stack
          </h2>
          <p className="text-base text-text-secondary font-light leading-relaxed">
            We build with robust open-source foundations and cloud frameworks. Hover over any node in our system matrix to inspect its VPC telemetry profile.
          </p>
        </motion.div>

        {/* Scrolling continuous marquee ribbon */}
        <div className="mb-14 overflow-hidden py-3.5 border-y border-border/80 bg-surface/30 backdrop-blur-sm relative">
          <div className="marquee-content flex space-x-12 whitespace-nowrap">
            {[...TECH_STACK, ...TECH_STACK].map((t, idx) => (
              <div key={idx} className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-text-muted hover:text-primary transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span>{t.name.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4-Column Systems Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {layers.map((layer, idx) => (
            <motion.div
              key={layer.key}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col h-full bg-surface/50 border border-border/60 hover:bg-surface-elevated/40 hover:border-primary/40 rounded-3xl p-6 transition-all duration-300 relative overflow-hidden justify-between shadow-sm"
            >
              {/* Colored top gradient divider */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-secondary opacity-80"></div>

              {/* Layer Title */}
              <div className="space-y-3 relative z-10 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-primary/10 border border-primary/25 text-primary">
                    TIER 0{idx + 1}
                  </span>
                  <span className="text-[9px] font-bold font-mono tracking-widest text-text-muted uppercase">
                    {layer.title}
                  </span>
                </div>
                
                <h3 className="text-base font-extrabold text-text-primary font-display tracking-tight leading-snug">
                  {layer.subtitle}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed font-light">
                  {layer.desc}
                </p>
              </div>

              {/* Tech Chips Grid */}
              <div className="my-6 space-y-2 relative z-10 flex-1">
                <div className="grid grid-cols-1 gap-2">
                  {TECH_STACK.filter(t => t.category === layer.key).map((tech, chipIdx) => {
                    const details = getTechDetails(tech.name);
                    const isHovered = hoveredChips[layer.key]?.name === tech.name;

                    return (
                      <div
                        key={chipIdx}
                        onMouseEnter={() => setHoveredChips(prev => ({ ...prev, [layer.key]: tech }))}
                        onMouseLeave={() => setHoveredChips(prev => ({ ...prev, [layer.key]: null }))}
                        className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden flex items-center justify-between ${
                          isHovered 
                            ? "bg-surface-elevated/95 border-primary/50 shadow-md scale-[1.01]" 
                            : "bg-surface/30 border-border/40 text-text-primary hover:bg-surface-elevated/55 hover:border-primary/25"
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border transition-colors flex items-center justify-center gap-1 bg-gradient-to-br ${details.bg} ${details.border} ${details.text} shrink-0`}>
                            {details.icon}
                            <span>{getTechMonogram(tech.name)}</span>
                          </span>
                          
                          <span className={`text-[11px] font-bold tracking-tight transition-colors truncate ${
                            isHovered ? "text-primary" : "text-text-primary"
                          }`}>
                            {tech.name}
                          </span>
                        </div>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          isHovered ? "bg-primary animate-ping" : "bg-glow/50 animate-pulse"
                        }`}></span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Live Telemetry Display */}
              <div className="pt-4 border-t border-border/60 min-h-[140px] flex flex-col justify-between relative z-10 text-left">
                <AnimatePresence mode="wait">
                  {hoveredChips[layer.key] ? (
                    <motion.div
                      key={hoveredChips[layer.key]!.name}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-mono font-bold tracking-wider text-primary uppercase">
                          {hoveredChips[layer.key]!.name} STATUS
                        </span>
                        <span className="text-[9px] font-mono font-bold text-glow">
                          {hoveredChips[layer.key]!.name === "AWS" || hoveredChips[layer.key]!.name === "GCP" ? "99.999% SLA" : "99.98% SLA"}
                        </span>
                      </div>
                      <p className="text-[11px] text-text-secondary leading-relaxed font-light">
                        {hoveredChips[layer.key]!.description}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default-telemetry"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2.5"
                    >
                      <div className="flex items-center space-x-1.5">
                        <span className="w-1 h-1 rounded-full bg-glow animate-pulse"></span>
                        <span className="text-[8px] font-mono font-bold tracking-wider text-text-muted uppercase">VPC DIAGNOSTICS</span>
                      </div>
                      <p className="text-[11px] text-text-muted leading-relaxed font-light">
                        Hover over any technology chip in this layer to simulate live VPC routing diagnostics, audit metadata status, and telemetry parameters.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}








