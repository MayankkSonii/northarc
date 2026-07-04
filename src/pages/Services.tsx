import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Brain, 
  Sparkles, 
  Network, 
  Cpu, 
  GitMerge, 
  BarChart3, 
  TrendingUp, 
  Layers, 
  Eye, 
  FileText, 
  LayoutDashboard, 
  Cloud, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Zap, 
  LineChart 
} from "lucide-react";
import { SERVICES } from "../data";

// Utility to match services to lucide icons
const getServiceIcon = (id: number) => {
  switch (id) {
    case 1: return <Brain className="w-6 h-6" />;
    case 2: return <Sparkles className="w-6 h-6" />;
    case 3: return <Network className="w-6 h-6" />;
    case 4: return <Cpu className="w-6 h-6" />;
    case 5: return <GitMerge className="w-6 h-6" />;
    case 6: return <BarChart3 className="w-6 h-6" />;
    case 7: return <TrendingUp className="w-6 h-6" />;
    case 8: return <Layers className="w-6 h-6" />;
    case 9: return <Eye className="w-6 h-6" />;
    case 10: return <FileText className="w-6 h-6" />;
    case 11: return <LayoutDashboard className="w-6 h-6" />;
    case 12: return <Cloud className="w-6 h-6" />;
    default: return <Brain className="w-6 h-6" />;
  }
};

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<string>("core");

  const categories = [
    { id: "core", label: "Core AI Systems", tag: "COGNITIVE ARCHITECTURES", icon: <Brain className="w-5 h-5 text-primary" />, status: "SLA Tier-1" },
    { id: "automation", label: "Intelligent Automation", tag: "AUTONOMOUS AGENTS", icon: <Cpu className="w-5 h-5 text-secondary" />, status: "99.9% Up" },
    { id: "analytics", label: "Predictive Analytics", tag: "STATISTICAL FORECASTS", icon: <LineChart className="w-5 h-5 text-glow" />, status: "SOC-2 OK" },
    { id: "vision", label: "Vision & Document AI", tag: "MULTIMODAL PARSING", icon: <Eye className="w-5 h-5 text-primary" />, status: "DEPLOYED" },
    { id: "cloud", label: "Cloud & Infrastructure", tag: "GPU VECTOR COMPUTE", icon: <Cloud className="w-5 h-5 text-secondary" />, status: "SECURED" }
  ];

  const categoryMeta = {
    core: {
      title: "Core AI Systems",
      tagline: "ADVANCED COGNITIVE LAYER",
      metric: "3x Avg ROI",
      metricLabel: "Measured Business Return",
      longDesc: "Deep learning neural models, generative language intelligence, and custom fine-tuning engineered to address domain-specific enterprise constraints.",
      features: ["Custom model training", "Parameter-efficient fine-tuning (PEFT)", "Multi-agent orchestration loops", "Llama & GPT weights engineering"]
    },
    automation: {
      title: "Intelligent Automation",
      tagline: "AUTONOMOUS WORKFLOW NETWORKS",
      metric: "-75% Cost",
      metricLabel: "Manual Overhead Reduction",
      longDesc: "Deploy self-correcting software agents that browse database pools, evaluate logic routes, and transact across APIs with flawless auditing.",
      features: ["Self-healing pipelines", "Dynamic API routing protocols", "Structured schema validators", "Observability logger hooks"]
    },
    analytics: {
      title: "Predictive Analytics",
      tagline: "STATISTICAL FORECASTING ENGINES",
      metric: "18% Gain",
      metricLabel: "Inventory Accuracy Improvement",
      longDesc: "Translate raw databases into high-confidence predictive graphs using custom time-series forecasts, boosting algorithms, and feedback arrays.",
      features: ["Anomalies drift classifiers", "Time-series seasonal mappings", "XGBoost & GBDT forecasting", "Decision trees modeling"]
    },
    vision: {
      title: "Vision & Document AI",
      tagline: "MULTIMODAL DECODING & OCR",
      metric: "95%+ Accuracy",
      metricLabel: "Field Parsing Precision",
      longDesc: "Ingest invoices, contract forms, or live defect scans with hyper-precision multi-modal Transformers, ensuring safe VPC-isolated workflows.",
      features: ["Multimodal LayoutLM networks", "Fine-grained semantic parsers", "Real-time OCR streaming layers", "Secure HIPAA records sanitizer"]
    },
    cloud: {
      title: "Cloud & Infrastructure",
      tagline: "GPU COMPUTE & SCALABLE NETWORKS",
      metric: "< 4ms Latency",
      metricLabel: "Internal Router Gateway SLA",
      longDesc: "Enterprise Kubernetes frameworks, isolated virtual clouds, vector clusters, and secure serverless hosting models tailored for massive transactional scaling.",
      features: ["Kubernetes (GKE/EKS) configuration", "VPC isolation & IAM governance", "Pinecone/Milvus database management", "Continuous SageMaker deployments"]
    }
  }[activeCategory] || {
    title: "Core AI Systems",
    tagline: "ADVANCED COGNITIVE LAYER",
    metric: "3x Avg ROI",
    metricLabel: "Measured Business Return",
    longDesc: "Deep learning neural models, generative language intelligence, and custom fine-tuning engineered to address domain-specific enterprise constraints.",
    features: []
  };

  const filteredServices = SERVICES.filter(s => s.category === activeCategory);

  return (
    <div className="pt-24 pb-12 bg-bg min-h-screen relative grid-bg">
      {/* Decorative floating blur orbs */}
      <div className="absolute top-10 left-10 w-[30vw] h-[30vw] rounded-full bg-primary/5 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[35vw] h-[35vw] rounded-full bg-secondary/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-left">
        
        {/* Whizoid styled vertical section title decoration */}
        <div className="hidden xl:block absolute left-[-4rem] top-[10rem] origin-left rotate-90 text-[10px] tracking-[0.6em] font-mono text-text-muted uppercase">
          C a p a b i l i t i e s
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between content-space-sm gap-8">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block">OUR CAPABILITIES</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-text-primary leading-[1.1]">
              Full-Spectrum AI Capabilities
            </h2>
            <p className="text-base text-text-secondary font-light leading-relaxed">
              We design, build, and deploy custom neural architectures, automated agent pipelines, and high-performance predictive engines tailored for your enterprise constraints.
            </p>
          </div>
          
          <div className="p-4 rounded-2xl bg-surface/80 border border-border flex items-center space-x-3 shrink-0 backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-glow animate-pulse"></span>
            <span className="text-xs font-mono font-bold text-text-primary uppercase tracking-wider">PIPELINE INTEGRITY: 99.9% SOC-2</span>
          </div>
        </div>

        {/* Categories grid block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 section-gap-sm items-start">
          
          {/* Category Switcher Menu */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            {categories.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`p-6 rounded-2xl text-left border transition-all duration-300 relative overflow-hidden flex items-start space-x-4 ${
                  activeCategory === tab.id
                    ? "bg-surface-elevated border-primary/50 shadow-lg shadow-primary/5"
                    : "bg-surface/50 border-border/60 hover:bg-surface-elevated/40 hover:border-primary/25"
                }`}
              >
                <div className={`p-3 rounded-xl border shrink-0 transition-colors ${
                  activeCategory === tab.id 
                    ? "bg-primary/10 border-primary/25 text-primary" 
                    : "bg-bg/40 border-border/50 text-text-secondary"
                }`}>
                  {tab.icon}
                </div>
                
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] font-mono font-bold tracking-widest text-text-muted">
                      {tab.tag}
                    </span>
                    <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded border font-semibold ${
                      activeCategory === tab.id
                        ? "bg-primary/15 border-primary/25 text-primary animate-pulse"
                        : "bg-surface-elevated/60 border-border/70 text-text-muted"
                    }`}>
                      {tab.status}
                    </span>
                  </div>
                  <h3 className={`text-base font-bold font-display tracking-tight ${
                    activeCategory === tab.id ? 'text-primary' : 'text-text-primary'
                  }`}>
                    {tab.label}
                  </h3>
                </div>

                {activeCategory === tab.id && (
                  <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-primary to-secondary"></div>
                )}
              </button>
            ))}
          </div>

          {/* Interactive Workspace Dashboard */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -15 }}
                transition={{ duration: 0.4 }}
                className="rounded-[32px] bg-surface/50 border border-border/80 p-8 lg:p-10 relative overflow-hidden shadow-xl backdrop-blur-md"
              >
                <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none"></div>
                <div className="absolute bottom-[-15%] right-[-15%] w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-primary/5 to-secondary/10 blur-[80px] pointer-events-none"></div>

                <div className="space-y-8 relative z-10">
                  
                  {/* Category Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-border/80">
                    <div className="space-y-1 text-left">
                      <span className="text-[10px] font-bold font-mono tracking-widest text-primary uppercase block">
                        {categoryMeta.tagline}
                      </span>
                      <h3 className="text-2xl lg:text-3.5xl font-extrabold font-display tracking-tight text-text-primary leading-tight">
                        {categoryMeta.title}
                      </h3>
                    </div>
                    
                    <div className="px-5 py-3 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/25 text-left shrink-0">
                      <span className="text-2xl font-black font-display text-primary block leading-none">
                        {categoryMeta.metric}
                      </span>
                      <span className="text-[9px] font-semibold text-text-secondary mt-1 block leading-tight">
                        {categoryMeta.metricLabel}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm lg:text-base text-text-secondary font-light leading-relaxed text-left">
                    {categoryMeta.longDesc}
                  </p>

                  {/* Deployable list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredServices.map(service => (
                      <div
                        key={service.id}
                        className="p-5 rounded-2xl border border-border/60 bg-bg/30 hover:border-primary/45 hover:bg-bg/60 transition-all duration-300 group flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                              {getServiceIcon(service.id)}
                            </div>
                            <h4 className="text-sm font-bold text-text-primary tracking-tight">
                              {service.title}
                            </h4>
                          </div>
                          <p className="text-xs text-text-secondary leading-relaxed font-light text-left">
                            {service.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-border/30 flex items-center justify-end">
                          <a
                            href="/contact"
                            className="text-[10px] font-bold font-mono tracking-wider text-primary uppercase inline-flex items-center space-x-1 hover:text-secondary transition-colors"
                          >
                            <span>Inquire Capability</span>
                            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Core checklist details */}
                  <div className="space-y-4 border-t border-border/60 pt-6 text-left">
                    <span className="text-[10px] font-bold font-mono text-text-muted tracking-widest block uppercase">
                      INCLUDED PIPELINES & FRAMEWORKS
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      {categoryMeta.features.map((feat, i) => (
                        <div key={i} className="flex items-center space-x-2.5 text-text-primary">
                          <div className="p-1 rounded bg-primary/10 border border-primary/20 text-primary">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-light text-xs">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                <div className="mt-8 pt-6 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                  <div className="flex items-center space-x-3 text-left">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-[11px] font-bold font-mono">
                      NA
                    </div>
                    <div>
                      <p className="text-xs font-bold text-text-primary">Isolated VPC Container Deployments</p>
                      <p className="text-[9px] text-text-muted font-mono uppercase">AWS / GCP Isolated Node Compliance</p>
                    </div>
                  </div>
                  <a 
                    href="/" 
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-primary/15 inline-flex items-center justify-center space-x-2 transition-all"
                  >
                    <span>Architect Capability</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}








