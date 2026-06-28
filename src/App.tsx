/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import logoImg from "./narc.png";
import { 
  SERVICES, 
  INDUSTRIES, 
  TECH_STACK, 
  DEPLOYMENT_STEPS, 
  SOLUTIONS,
  Service,
  Industry,
  TechItem,
  DeploymentStep,
  Solution
} from "./data";
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
  Sun, 
  Moon, 
  Menu, 
  X, 
  ArrowRight, 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  Check, 
  ShieldCheck, 
  Zap, 
  LineChart, 
  ArrowUpRight, 
  Linkedin, 
  Twitter, 
  Github, 
  MessageSquare,
  DollarSign,
  Briefcase,
  Activity,
  Send,
  Database,
  Terminal,
  Megaphone,
  ShoppingBag,
  Coins,
  HeartPulse,
  Film,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ThreeDCanvas } from "./components/ThreeDCanvas";

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

// Animated Stats Counter Component
interface AnimatedCounterProps {
  value: string;
}

function AnimatedCounter({ value }: AnimatedCounterProps) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  // Parse number and symbol (e.g. "50+" -> 50, "+")
  const numPart = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const end = numPart;
    if (end === 0) return;
    const duration = 1500; // ms
    const increment = end / (duration / 16); // ~60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCurrent(end);
        clearInterval(timer);
      } else {
        setCurrent(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [hasStarted, numPart]);

  return (
    <span ref={ref} className="font-mono tabular-nums font-bold">
      {hasStarted ? current : 0}
      {suffix}
    </span>
  );
}

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

const getIndustryFlow = (name: string) => {
  const nameClean = name.toLowerCase();
  if (nameClean.includes("marketing") || nameClean.includes("adtech")) {
    return {
      input: "Ad Campaigns",
      pipeline: "Segmenter ML",
      output: "4.2x ROAS"
    };
  }
  if (nameClean.includes("retail") || nameClean.includes("commerce")) {
    return {
      input: "Sales DB",
      pipeline: "Forecasting ML",
      output: "-18% Stockout"
    };
  }
  if (nameClean.includes("financial") || nameClean.includes("banking") || nameClean.includes("fs")) {
    return {
      input: "TX Ledger Feed",
      pipeline: "Anomaly GBDT",
      output: "92% Fast Audits"
    };
  }
  if (nameClean.includes("healthcare") || nameClean.includes("medical") || nameClean.includes("biotech")) {
    return {
      input: "EMR Clinical",
      pipeline: "Secure HIPAA NLP",
      output: "80% Saved"
    };
  }
  if (nameClean.includes("media") || nameClean.includes("entertainment")) {
    return {
      input: "User Vectors",
      pipeline: "Dual-Encoder Feed",
      output: "2.5x Tagging"
    };
  }
  if (nameClean.includes("publishing") || nameClean.includes("nlp")) {
    return {
      input: "Manuscripts PDF",
      pipeline: "Fine-Tuned RAG",
      output: "65% Fast Cycle"
    };
  }
  if (nameClean.includes("deep") || nameClean.includes("ml") || nameClean.includes("ai")) {
    return {
      input: "Usage Logs",
      pipeline: "Drift GBDT Model",
      output: "-35% Latency"
    };
  }
  if (nameClean.includes("enterprise") || nameClean.includes("operations") || nameClean.includes("corporate")) {
    return {
      input: "Data Lakes",
      pipeline: "Knowledge Graph",
      output: "$M+ Saved"
    };
  }
  return {
    input: "Enterprise Data",
    pipeline: "Cognitive Engine",
    output: "System Boost"
  };
};

const getIndustryDetails = (name: string) => {
  const nameClean = name.toLowerCase();
  if (nameClean.includes("marketing")) {
    return {
      icon: <Megaphone className="w-5 h-5 text-emerald-400" />,
      badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      borderHover: "group-hover:border-emerald-500/40 group-hover:shadow-emerald-500/5",
      accentDot: "bg-emerald-400"
    };
  }
  if (nameClean.includes("retail")) {
    return {
      icon: <ShoppingBag className="w-5 h-5 text-amber-400" />,
      badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      borderHover: "group-hover:border-amber-500/40 group-hover:shadow-amber-500/5",
      accentDot: "bg-amber-400"
    };
  }
  if (nameClean.includes("financial") || nameClean.includes("fs")) {
    return {
      icon: <Coins className="w-5 h-5 text-blue-400" />,
      badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      borderHover: "group-hover:border-blue-500/40 group-hover:shadow-blue-500/5",
      accentDot: "bg-blue-400"
    };
  }
  if (nameClean.includes("healthcare") || nameClean.includes("biotech")) {
    return {
      icon: <HeartPulse className="w-5 h-5 text-rose-400" />,
      badgeBg: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      borderHover: "group-hover:border-rose-500/40 group-hover:shadow-rose-500/5",
      accentDot: "bg-rose-400"
    };
  }
  if (nameClean.includes("media")) {
    return {
      icon: <Film className="w-5 h-5 text-purple-400" />,
      badgeBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      borderHover: "group-hover:border-purple-500/40 group-hover:shadow-purple-500/5",
      accentDot: "bg-purple-400"
    };
  }
  if (nameClean.includes("publishing") || nameClean.includes("nlp")) {
    return {
      icon: <BookOpen className="w-5 h-5 text-cyan-400" />,
      badgeBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      borderHover: "group-hover:border-cyan-500/40 group-hover:shadow-cyan-500/5",
      accentDot: "bg-cyan-400"
    };
  }
  if (nameClean.includes("deep") || nameClean.includes("ai") || nameClean.includes("ml")) {
    return {
      icon: <Cpu className="w-5 h-5 text-fuchsia-400" />,
      badgeBg: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20",
      borderHover: "group-hover:border-fuchsia-500/40 group-hover:shadow-fuchsia-500/5",
      accentDot: "bg-fuchsia-400"
    };
  }
  return {
    icon: <Briefcase className="w-5 h-5 text-teal-400" />,
    badgeBg: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    borderHover: "group-hover:border-teal-500/40 group-hover:shadow-teal-500/5",
    accentDot: "bg-teal-400"
  };
};

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesFilter, setServicesFilter] = useState<string>("core");
  const [activeSolutionId, setActiveSolutionId] = useState<string>("workflows");
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Advanced States for 3D tilt & simulation playground
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [simulatingId, setSimulatingId] = useState<string | null>(null);
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const [simStep, setSimStep] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setTilt({ x: x * 15, y: y * -15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const startSimulation = (solutionId: string) => {
    setSimulatingId(solutionId);
    setSimLogs([
      "[SYSTEM] SECURE BRIDGE ESTABLISHED AT " + new Date().toLocaleTimeString(),
      "[SYSTEM] LOADED PROTOCOL SCHEMATIC FOR: " + solutionId.toUpperCase()
    ]);
    setSimStep(1);

    const logSteps = {
      workflows: [
        "[VPC] ROUTING GRPC TO LOCAL AGENT WORKERS...",
        "[COMPUTE] SPAWNING DYNAMIC LOGIC CLUSTERS (WORKER_ID: W-812)...",
        "[AI REASON] GEN-2.5-PRO DECISION ENGINE SENT...",
        "[REDIS] SYNCING BACK-OFFICE CACHE PIPELINES...",
        "[AUTO RUN] PARSING DOCUMENT EXTRACTIONS -> CROSS VERIFICATION...",
        "[INTEGRITY] CONFIRMED VALID: MATCH INDEX 100% SECURE",
        "[SYSTEM] FLOW COMPLETED. LATENCY SPEEDUP: 1.8x SECURED"
      ],
      assistants: [
        "[SEARCH] INGESTING CHUNKED EMBEDDINGS (PINECONE VDB)...",
        "[RAG ENGINE] CALCULATING COSINE SIMILARITY SCORING OVER 42,000 ARCHIVES...",
        "[CONTEXT GATE] REDACTING IDENTIFIED PRIVACY INFORMATION...",
        "[LLM SYNTH] RUNNING DEEP COMPREHENSIVE SUMMARIZATION...",
        "[VERIFIER] MAPPING FOOTNOTE LABELS AGAINST ORIGINAL SOURCES...",
        "[COMPLIANCE] ENCRYPTING RESULT KEY VIA KMS...",
        "[SYSTEM] SUMMARY GRAPH DELIVERED SECURELY IN 84ms"
      ],
      predictive: [
        "[FORECAST ENGINE] RETRIEVING ROLLING WINDOW VECTOR DATAFRAME...",
        "[MODEL LAYER] ENSEMBLING GRADIENT BOOSTING & EXPONENTIAL DECAY...",
        "[ANOMALY SCAN] MONITORING METRIC DRIFT OVER ACTIVE NODES...",
        "[BACKPROPAGATION] MINIMIZING GRADIENT DESCENT ITERATIONS...",
        "[DISTR LAYER] WRITING PREDICTIVE CONFIDENCE BAND VALUES...",
        "[DRIFT DETECT] SIGNAL COMPONENT: NOISE RATIO IDEAL",
        "[SYSTEM] SUCCESS. PREDICTIONS COMMITTED AT 97.4% CONFIDENCE"
      ],
      docs: [
        "[BLOB ACCESS] LOADING RAW BYTE ARRAY FOR: INVOICE_PDF_4091...",
        "[DOCUMENT AI] EXECUTING SEGMENTATION & FIELD MAPPING LOGIC...",
        "[DECODER] INFERRING TEXT SEGMENTS VIA MULTI-MODAL LAYOUT TRANSFORMERS...",
        "[RULE DESK] COMPARING METADATA AGAINST COMPLIANCE SYSTEM DICTIONARY...",
        "[STORAGE] TRANSMITTING STRIPED FIELDS TO POSTGRES ARCHIVE...",
        "[SECURITY] ASSIGNED UNIQUE DECRYPTION BLOCK SHIELD...",
        "[SYSTEM] COMPLETE. PARSED DOCUMENT TO STRUCTURAL JSON IN 118ms"
      ]
    }[solutionId] || [];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < logSteps.length) {
        setSimLogs(prev => [...prev, logSteps[currentStep]]);
        setSimStep(prev => prev + 1);
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 700);
  };

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    businessEmail: "",
    companyName: "",
    phoneNumber: "+91",
    serviceInterest: "",
    projectRequirements: ""
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Theme effect
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light-mode");
    } else {
      root.classList.remove("light-mode");
    }
  }, [theme]);

  // Navbar scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSubmitError(null);
    if (formErrors[name]) {
      setFormErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) errors.fullName = "Full Name is required";
    if (!formData.businessEmail.trim()) {
      errors.businessEmail = "Business Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.businessEmail)) {
      errors.businessEmail = "Please enter a valid email address";
    }
    if (!formData.companyName.trim()) errors.companyName = "Company Name is required";
    if (!formData.serviceInterest) errors.serviceInterest = "Please select a service";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // Scroll to form errors or contact section
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    fetch('/api/inquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.fullName,
        email: formData.businessEmail,
        company: formData.companyName,
        phone: formData.phoneNumber,
        service: formData.serviceInterest,
        requirement: formData.projectRequirements,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok && data.success) {
          setIsSubmitting(false);
          setFormSubmitted(true);
          setFormData({
            fullName: "",
            businessEmail: "",
            companyName: "",
            phoneNumber: "+91",
            serviceInterest: "",
            projectRequirements: ""
          });
        } else {
          throw new Error(data.error || "Submission failed. Please try again.");
        }
      })
      .catch((err) => {
        setIsSubmitting(false);
        setSubmitError(err.message || "An unexpected error occurred. Please try again.");
      });
  };

  // Filter logic for services
  const filteredServices = servicesFilter === "all" 
    ? SERVICES 
    : SERVICES.filter(s => s.category === servicesFilter);

  const activeSolution = SOLUTIONS.find(s => s.id === activeSolutionId) || SOLUTIONS[0];

  return (
    <div className="min-h-screen bg-bg text-text-primary overflow-x-hidden selection:bg-primary/30 selection:text-text-primary transition-colors duration-300">
      
      {/* BACKGROUND GRAPHICS & GRID */}
      <div className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-500 ${theme === 'dark' ? 'opacity-30' : 'opacity-[0.12]'}`}>
        <div className="absolute inset-0 grid-bg-dark opacity-40"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-primary/10 to-secondary/15 blur-[120px] animate-float-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-glow/10 to-secondary/10 blur-[120px] animate-float-delay"></div>
      </div>

      {/* STICKY GLASSMOPHISM NAVBAR */}
      <nav 
        id="navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
          isScrolled 
            ? "bg-surface/85 backdrop-blur-xl border-border py-4 shadow-lg shadow-black/5" 
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <img src={logoImg} alt="NorthArc Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight font-display text-text-primary group-hover:text-primary transition-colors duration-200">NorthArc</span>
              <span className="text-[9px] uppercase tracking-widest text-text-muted font-semibold">Connecting Intelligence to Impact</span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <a href="#home" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200">Home</a>
            <a href="#about" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200">About</a>
            <a href="#services" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200">Services</a>
            <a href="#solutions" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200">Solutions</a>
            <a href="#industries" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200">Industries</a>
            <a href="#techstack" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200">Tech Stack</a>
          </div>

          {/* Nav Actions (CTA + Theme Toggle) */}
          <div className="hidden lg:flex items-center space-x-5">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-border bg-surface hover:bg-surface-elevated text-text-secondary hover:text-text-primary transition-all duration-200 shadow-sm"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>
            
            {/* CTA */}
            <a 
              href="#contact" 
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:translate-y-[-1px]"
            >
              Book Consultation
            </a>
          </div>

          {/* Mobile Actions (Theme + Hamburger) */}
          <div className="flex lg:hidden items-center space-x-3">
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-border bg-surface text-text-secondary"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl border border-border bg-surface text-text-primary"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden w-full border-t border-border bg-surface/95 backdrop-blur-2xl absolute left-0 top-full overflow-hidden shadow-xl"
            >
              <div className="px-6 py-8 space-y-4 flex flex-col">
                <a 
                  href="#home" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-text-secondary hover:text-text-primary py-1"
                >
                  Home
                </a>
                <a 
                  href="#about" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-text-secondary hover:text-text-primary py-1"
                >
                  About
                </a>
                <a 
                  href="#services" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-text-secondary hover:text-text-primary py-1"
                >
                  Services
                </a>
                <a 
                  href="#solutions" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-text-secondary hover:text-text-primary py-1"
                >
                  Solutions
                </a>
                <a 
                  href="#industries" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-text-secondary hover:text-text-primary py-1"
                >
                  Industries
                </a>
                <a 
                  href="#techstack" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-text-secondary hover:text-text-primary py-1"
                >
                  Tech Stack
                </a>
                <div className="pt-4 border-t border-border">
                  <a 
                    href="#contact" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold bg-primary text-white shadow-md shadow-primary/20"
                  >
                    Book Consultation
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 1. HERO SECTION */}
      <section 
        id="home" 
        className="relative min-h-[75vh] flex items-center justify-center pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-bg"
      >
        {/* Living 3D constellation network of active nodes */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <ThreeDCanvas />
          {/* High-end vignette and radial gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/10 z-1 pointer-events-none"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,var(--color-bg)_100%)] z-1 pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center z-10 relative">
          
          {/* Hero text */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left"
          >
            
            <div className="inline-flex items-center space-x-2.5 px-4.5 py-2 rounded-full bg-primary/10 border border-primary/25 w-fit backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-glow animate-pulse"></span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-primary font-mono">
                AI | DATA SCIENCE | ANALYTICS | AUTOMATION
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display leading-[1.1] text-text-primary">
              Building <span className="bg-gradient-to-r from-primary via-secondary to-glow bg-clip-text text-transparent">Intelligent Systems</span> for Modern Businesses.
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-text-secondary font-light max-w-2xl leading-relaxed">
              We help organizations harness the power of Artificial Intelligence, Data Science, Generative AI, and Intelligent Automation to drive measurable business impact — from strategy to production deployment.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a 
                href="#contact" 
                className="px-6 py-3 rounded-xl font-bold bg-primary hover:bg-primary/95 text-white shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 transition-all duration-300 inline-flex items-center justify-center space-x-2.5 group text-sm"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a 
                href="#services" 
                className="px-6 py-3 rounded-xl font-bold border border-border bg-surface/55 backdrop-blur-md hover:bg-surface-elevated/85 text-text-primary hover:border-primary/50 transition-all duration-300 inline-flex items-center justify-center text-sm"
              >
                Explore Services
              </a>
            </div>

            {/* Stats list inside Hero */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border/80 max-w-xl">
              <div>
                <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-primary font-display">
                  <AnimatedCounter value="50+" />
                </p>
                <p className="text-[10px] font-semibold text-text-muted mt-1 uppercase tracking-wider font-mono">AI Systems Built</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-display">
                  <AnimatedCounter value="3x" />
                </p>
                <p className="text-[10px] font-semibold text-text-muted mt-1 uppercase tracking-wider font-mono">Avg Client ROI</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-glow font-display">
                  <AnimatedCounter value="97%" />
                </p>
                <p className="text-[10px] font-semibold text-text-muted mt-1 uppercase tracking-wider font-mono">Model Accuracy</p>
              </div>
            </div>

          </motion.div>

          {/* Hero Abstract Graphic Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            <div className="relative w-full aspect-square max-w-[460px] lg:max-w-none">
              
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-full border border-border/40 scale-105 animate-[spin_48s_linear_infinite] pointer-events-none"></div>
              
              {/* Inner gradient spinning circle */}
              <div className="absolute inset-4 rounded-full border border-dashed border-primary/20 animate-[spin_28s_linear_infinite] pointer-events-none"></div>
              
              {/* Central high-tech card visualization */}
              <div 
                className="absolute inset-8 rounded-[40px] bg-surface/55 backdrop-blur-xl border border-border/70 p-10 shadow-3xl flex flex-col justify-between overflow-hidden group hover:border-primary/50 hover:shadow-2xl hover:scale-[1.015] transition-all duration-500 cursor-pointer"
              >
                
                {/* Visual grid behind */}
                <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none"></div>
                
                {/* Glow effects */}
                <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-colors pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-44 h-44 rounded-full bg-secondary/10 blur-3xl group-hover:bg-secondary/20 transition-colors pointer-events-none"></div>

                <div className="flex items-center justify-between z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/25 group-hover:scale-110 transition-transform duration-300">
                    <Brain className="w-7 h-7 animate-pulse" />
                  </div>
                  <span className="text-[10px] font-mono px-3.5 py-1.5 rounded-full border border-border/80 bg-surface-elevated/70 text-text-secondary font-bold tracking-tight">
                    ACTIVE_NODE: SECURE
                  </span>
                </div>

                <div className="space-y-4 z-10 my-8 text-left">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-glow animate-ping"></span>
                    <span className="text-[10px] font-bold font-mono tracking-widest text-glow uppercase">NORTHARC COGNITIVE ENGINE</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-text-primary group-hover:text-primary transition-colors leading-tight">
                    Connecting Intelligence to Impact
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed font-light">
                    Transforming enterprise processes into dynamic autonomous agents with full VPC execution, RAG pipelines, and compliance guardrails.
                  </p>
                </div>

                <div className="flex items-center justify-between z-10 border-t border-border/80 pt-5">
                  <div className="flex space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-glow animate-pulse"></span>
                  </div>
                  <span className="text-xs font-mono font-bold text-text-muted tracking-tight">
                    v1.5.0-PROD
                  </span>
                </div>

              </div>

              {/* Floating secondary nodes with bouncy entry */}
              <div className="absolute -top-1 -right-1 bg-surface/90 backdrop-blur-md border border-border rounded-2xl px-5 py-3 shadow-2xl flex items-center space-x-3 animate-bounce [animation-duration:6s] z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-glow animate-ping"></div>
                <span className="text-xs font-mono font-bold text-text-primary">97% Accuracy</span>
              </div>

              <div className="absolute -bottom-1 -left-1 bg-surface/90 backdrop-blur-md border border-border rounded-2xl px-5 py-3 shadow-2xl flex items-center space-x-3 animate-bounce [animation-duration:8s] z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-secondary"></div>
                <span className="text-xs font-mono font-bold text-text-primary">3x Avg ROI</span>
              </div>

            </div>
          </motion.div>

        </div>

        {/* Smooth horizontal gradient shadow separator */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-bg pointer-events-none z-1"></div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" className="py-16 lg:py-20 bg-surface/30 relative border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* About text block */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block">ABOUT NORTHARC</span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-text-primary leading-[1.12]">
                  Connecting Intelligence to Impact.
                </h2>
              </div>

              <p className="text-base md:text-lg text-text-secondary leading-relaxed font-light">
                NorthArc is a specialized AI, Data Science, and Intelligent Systems firm that bridges the gap between cutting-edge research and real-world business outcomes. We engineer production-grade AI solutions — from foundation model integrations and autonomous agent networks to custom neural architectures and enterprise data pipelines. Our team operates at the intersection of deep algorithmic expertise and pragmatic systems engineering, ensuring every solution we deliver is not just intelligent, but robust, scalable, and measurably impactful.
              </p>

              {/* 3 feature pillars with left border accents */}
              <div className="space-y-4 pt-2">
                
                <div className="p-6 rounded-2xl border-l-4 border-primary bg-surface border border-border hover:border-primary/40 hover:bg-surface-elevated/40 transition-all duration-300 shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary mt-1">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-text-primary">Production-First Engineering</h4>
                      <p className="text-sm text-text-secondary mt-1 leading-relaxed font-light">
                        Every model and pipeline ships containerized, monitored, and production-ready.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border-l-4 border-secondary bg-surface border border-border hover:border-secondary/40 hover:bg-surface-elevated/40 transition-all duration-300 shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="p-2.5 rounded-xl bg-secondary/10 text-secondary mt-1">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-text-primary">Enterprise-Grade Security</h4>
                      <p className="text-sm text-text-secondary mt-1 leading-relaxed font-light">
                        SOC-2 aligned architectures with VPC isolation, IAM governance, and full audit trails.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border-l-4 border-glow bg-surface border border-border hover:border-glow/40 hover:bg-surface-elevated/40 transition-all duration-300 shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="p-2.5 rounded-xl bg-glow/10 text-glow mt-1">
                      <LineChart className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-text-primary">Measurable Outcomes</h4>
                      <p className="text-sm text-text-secondary mt-1 leading-relaxed font-light">
                        We tie every project to concrete business KPIs — revenue gains, cost savings, time reductions.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </motion.div>

            {/* About 3 stats cards block */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 grid grid-cols-1 gap-4 pt-2 lg:pt-8"
            >
              
              <div className="p-8 rounded-3xl bg-gradient-to-br from-surface to-surface-elevated border border-border relative overflow-hidden group hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 shadow-sm">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold font-mono text-text-muted uppercase tracking-wider">Track Record</span>
                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <Briefcase className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-4xl lg:text-5xl font-extrabold font-display text-text-primary mt-6 tracking-tight">
                  <AnimatedCounter value="50+" />
                </h3>
                <p className="text-sm font-semibold text-text-secondary mt-2">AI Systems Built & Deployed</p>
                <p className="text-xs text-text-muted mt-1 font-light leading-relaxed">Fully scaled models running in enterprise VPC architectures worldwide.</p>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-br from-surface to-surface-elevated border border-border relative overflow-hidden group hover:border-secondary/40 hover:shadow-xl hover:shadow-secondary/5 transition-all duration-300 shadow-sm">
                <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full blur-2xl"></div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold font-mono text-text-muted uppercase tracking-wider">Client Value</span>
                  <div className="p-2 rounded-xl bg-secondary/10 text-secondary">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-4xl lg:text-5xl font-extrabold font-display text-text-primary mt-6 tracking-tight">
                  <AnimatedCounter value="3x" />
                </h3>
                <p className="text-sm font-semibold text-text-secondary mt-2">Average Investment ROI</p>
                <p className="text-xs text-text-muted mt-1 font-light leading-relaxed">Direct measurable financial gains, cost optimizations, and process speedups.</p>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-br from-surface to-surface-elevated border border-border relative overflow-hidden group hover:border-glow/40 hover:shadow-xl hover:shadow-glow/5 transition-all duration-300 shadow-sm">
                <div className="absolute top-0 right-0 w-24 h-24 bg-glow/5 rounded-full blur-2xl"></div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold font-mono text-text-muted uppercase tracking-wider">Engineering Quality</span>
                  <div className="p-2 rounded-xl bg-glow/10 text-glow">
                    <Activity className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-4xl lg:text-5xl font-extrabold font-display text-text-primary mt-6 tracking-tight">
                  <AnimatedCounter value="97%" />
                </h3>
                <p className="text-sm font-semibold text-text-secondary mt-2">In-Production Model Accuracy</p>
                <p className="text-xs text-text-muted mt-1 font-light leading-relaxed">Sustained diagnostic and classifications precision under heavy data loads.</p>
              </div>

            </motion.div>

          </div>

        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section id="services" className="py-16 lg:py-20 relative bg-surface/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-left">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
            <div className="space-y-4 max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block">OUR CAPABILITIES</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-text-primary leading-[1.1]">
                Full-Spectrum AI Capabilities
              </h2>
              <p className="text-base text-text-secondary font-light leading-relaxed">
                We engineer customized, high-performance systems. Click on any capability area to inspect our specialized system architectures, target metrics, and active business workloads.
              </p>
            </div>
            
            {/* Interactive pipeline integrity badge */}
            <div className="p-4 rounded-2xl bg-surface border border-border/75 flex items-center space-x-3 shrink-0 backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-glow animate-pulse"></span>
              <span className="text-xs font-mono font-bold text-text-primary uppercase tracking-wider">PIPELINE INTEGRITY: 99.9% SOC-2</span>
            </div>
          </div>

          {/* Interactive capabilities workspace dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            
            {/* Left Selection Menu (1/3 Width) */}
            <div className="lg:col-span-4 flex flex-col space-y-3">
              {[
                { id: "core", label: "Core AI Systems", tag: "COGNITIVE ARCHITECTURES", icon: <Brain className="w-5 h-5 text-primary" />, status: "SLA Tier-1" },
                { id: "automation", label: "Intelligent Automation", tag: "AUTONOMOUS AGENTS", icon: <Cpu className="w-5 h-5 text-secondary" />, status: "99.9% Up" },
                { id: "analytics", label: "Predictive Analytics", tag: "STATISTICAL FORECASTS", icon: <LineChart className="w-5 h-5 text-glow" />, status: "SOC-2 OK" },
                { id: "vision", label: "Vision & Document AI", tag: "MULTIMODAL PARSING", icon: <Eye className="w-5 h-5 text-primary" />, status: "DEPLOYED" },
                { id: "cloud", label: "Cloud & Infrastructure", tag: "GPU VECTOR COMPUTE", icon: <Cloud className="w-5 h-5 text-secondary" />, status: "SECURED" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setServicesFilter(tab.id)}
                  className={`p-5 rounded-2xl text-left border transition-all duration-300 relative overflow-hidden group flex items-start space-x-3 ${
                    servicesFilter === tab.id
                      ? "bg-surface-elevated/90 border-primary/50 shadow-lg shadow-black/5"
                      : "bg-surface/50 border-border/60 hover:bg-surface-elevated/40 hover:border-primary/20"
                  }`}
                >
                  <div className={`p-2.5 rounded-xl border shrink-0 transition-colors ${
                    servicesFilter === tab.id 
                      ? "bg-primary/10 border-primary/20 text-primary" 
                      : "bg-bg/40 border-border/50 text-text-secondary group-hover:text-primary"
                  }`}>
                    {tab.icon}
                  </div>
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[9px] font-mono font-bold tracking-widest text-text-muted">
                        {tab.tag}
                      </span>
                      <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded border font-semibold ${
                        servicesFilter === tab.id
                          ? "bg-primary/15 border-primary/25 text-primary animate-pulse"
                          : "bg-surface-elevated/60 border-border/70 text-text-muted"
                      }`}>
                        {tab.status}
                      </span>
                    </div>
                    <h3 className={`text-base font-bold font-display tracking-tight transition-colors ${
                      servicesFilter === tab.id ? 'text-primary' : 'text-text-primary group-hover:text-primary'
                    }`}>
                      {tab.label}
                    </h3>
                  </div>

                  {/* High-end visual indicator bar */}
                  {servicesFilter === tab.id && (
                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-primary to-secondary"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Right Interactive Presentation Box (2/3 Width) */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {(() => {
                  const meta = {
                    core: {
                      title: "Core AI Systems",
                      tagline: "ADVANCED COGNITIVE LAYER",
                      metric: "3x Avg ROI",
                      metricLabel: "Measured Business Return",
                      longDesc: "Deep learning neural models, generative language intelligence, and custom fine-tuning engineered to address domain-specific enterprise constraints."
                    },
                    automation: {
                      title: "Intelligent Automation",
                      tagline: "AUTONOMOUS WORKFLOW NETWORKS",
                      metric: "-75% Cost",
                      metricLabel: "Manual Overhead Reduction",
                      longDesc: "Deploy self-correcting software agents that browse database pools, evaluate logic routes, and transact across APIs with flawless auditing."
                    },
                    analytics: {
                      title: "Predictive Analytics",
                      tagline: "STATISTICAL FORECASTING ENGINES",
                      metric: "18% Gain",
                      metricLabel: "Inventory Accuracy Improvement",
                      longDesc: "Translate raw databases into high-confidence predictive graphs using custom time-series forecasts, boosting algorithms, and feedback arrays."
                    },
                    vision: {
                      title: "Vision & Document AI",
                      tagline: "MULTIMODAL DECODING & OCR",
                      metric: "95%+ Accuracy",
                      metricLabel: "Field Parsing Precision",
                      longDesc: "Ingest invoices, contract forms, or live defect scans with hyper-precision multi-modal Transformers, ensuring safe VPC-isolated workflows."
                    },
                    cloud: {
                      title: "Cloud & Infrastructure",
                      tagline: "GPU COMPUTE & SCALABLE NETWORKS",
                      metric: "< 4ms Latency",
                      metricLabel: "Internal Router Gateway SLA",
                      longDesc: "Enterprise Kubernetes frameworks, isolated virtual clouds, vector clusters, and secure serverless hosting models tailored for massive transactional scaling."
                    }
                  }[servicesFilter] || {
                    title: "Core AI Systems",
                    tagline: "ADVANCED COGNITIVE LAYER",
                    metric: "3x Avg ROI",
                    metricLabel: "Measured Business Return",
                    longDesc: "Deep learning neural models, generative language intelligence, and custom fine-tuning engineered to address domain-specific enterprise constraints."
                  };

                  return (
                    <motion.div
                      key={servicesFilter}
                      initial={{ opacity: 0, scale: 0.98, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="rounded-[32px] bg-surface/50 border border-border/80 p-6 lg:p-8 relative overflow-hidden flex flex-col justify-between shadow-xl backdrop-blur-xl"
                    >
                      {/* Decorative grid pattern background */}
                      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none"></div>
                      <div className="absolute bottom-[-15%] right-[-15%] w-[320px] h-[320px] rounded-full bg-gradient-to-tr from-primary/5 via-secondary/10 to-glow/5 blur-[80px] pointer-events-none"></div>

                      <div className="space-y-6 relative z-10">
                        
                        {/* Upper presentation panel */}
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-border/60">
                          <div className="space-y-1 text-left">
                            <span className="text-[10px] font-bold font-mono tracking-widest text-primary uppercase block">
                              {meta.tagline}
                            </span>
                            <h3 className="text-2xl lg:text-3.5xl font-extrabold font-display tracking-tight text-text-primary leading-tight">
                              {meta.title}
                            </h3>
                          </div>
                          
                          {/* Bold ROI metric indicator box */}
                          <div className="px-4 py-3 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/25 text-left shrink-0 max-w-[180px]">
                            <span className="text-2xl lg:text-3xl font-black font-display text-primary block leading-none">
                              {meta.metric}
                            </span>
                            <span className="text-[10px] font-semibold text-text-secondary mt-1 block leading-tight">
                              {meta.metricLabel}
                            </span>
                          </div>
                        </div>

                        {/* Core Long Description */}
                        <p className="text-sm text-text-secondary font-light leading-relaxed text-left">
                          {meta.longDesc}
                        </p>

                        {/* Matching sub-services grid */}
                        <div className="space-y-3 text-left">
                          <span className="text-[10px] font-bold font-mono text-text-muted tracking-widest block uppercase">
                            DEPLOYABLE ARCHITECTURES
                          </span>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {SERVICES.filter(s => s.category === servicesFilter).map(service => (
                              <div
                                key={service.id}
                                className="p-4 rounded-2xl border border-border/60 bg-bg/30 hover:border-primary/40 hover:bg-bg/60 transition-all duration-300 group flex flex-col justify-between h-full"
                              >
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                      {getServiceIcon(service.id)}
                                    </div>
                                    <h4 className="text-sm font-bold text-text-primary tracking-tight">
                                      {service.title}
                                    </h4>
                                  </div>
                                  <p className="text-xs text-text-secondary leading-relaxed font-light">
                                    {service.description}
                                  </p>
                                </div>

                                <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-end">
                                  <a
                                    href="#contact"
                                    onClick={() => setFormData(prev => ({ ...prev, serviceInterest: service.title }))}
                                    className="text-[10px] font-bold font-mono tracking-wider text-primary uppercase inline-flex items-center space-x-1 hover:text-secondary transition-colors"
                                  >
                                    <span>Inquire Solution</span>
                                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>

                      {/* Lower direct CTA button */}
                      <div className="mt-6 pt-4 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                        <div className="flex items-center space-x-3 text-left">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-[11px] font-bold font-mono">
                            NA
                          </div>
                          <div>
                            <p className="text-xs font-bold text-text-primary">Standard VPC Integration</p>
                            <p className="text-[10px] text-text-muted font-mono uppercase">Full Isolation & Audit trail Compliance</p>
                          </div>
                        </div>
                        <a 
                          href="#contact" 
                          onClick={() => setFormData(prev => ({ ...prev, projectRequirements: `Interested in implementing ${meta.title} into our infrastructure.` }))}
                          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-primary/20 hover:shadow-xl inline-flex items-center justify-center space-x-2 transition-all"
                        >
                          <span>Architect This Capability</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>

                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* 4. SOLUTIONS SECTION (Enterprise Frameworks) */}
      <section id="solutions" className="py-16 lg:py-20 bg-surface/20 border-y border-border relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-left">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="space-y-4 mb-12 max-w-2xl"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block">SYSTEM SOLUTIONS</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-text-primary leading-[1.1]">
              Enterprise AI Frameworks
            </h2>
            <p className="text-base text-text-secondary font-light leading-relaxed">
              Highly secure, optimized structures engineered for massive dataset indexing, machine reasoning, and deep visual processing.
            </p>
          </motion.div>

          {/* Split layout: Tab buttons left, content right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* Tab list (Left Column) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-4 flex flex-col justify-start space-y-3"
            >
              {SOLUTIONS.map(sol => (
                <button
                  key={sol.id}
                  onClick={() => setActiveSolutionId(sol.id)}
                  className={`w-full p-5 rounded-2xl text-left border transition-all duration-300 flex items-center justify-between group ${
                    activeSolutionId === sol.id 
                      ? "bg-surface-elevated border-primary/50 shadow-md" 
                      : "bg-surface border-border hover:bg-surface-elevated/40 hover:border-border"
                  }`}
                >
                  <div>
                    <h3 className={`text-base font-bold font-display ${activeSolutionId === sol.id ? 'text-primary' : 'text-text-primary'}`}>
                      {sol.title}
                    </h3>
                    <p className="text-xs text-text-muted font-light mt-1 max-w-[280px] truncate">
                      {sol.description}
                    </p>
                  </div>
                  <div className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-colors ${
                    activeSolutionId === sol.id 
                      ? "bg-primary text-white border-primary" 
                      : "bg-surface border-border text-text-secondary group-hover:text-text-primary"
                  }`}>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </motion.div>

            {/* Dynamic Content Panel (Right Column) */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSolution.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full rounded-3xl bg-surface border border-border p-6 lg:p-8 relative overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300"
                >
                  {/* Decorative mesh background */}
                  <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none"></div>
                  <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-primary/5 to-secondary/10 blur-[60px]"></div>

                  <div className="space-y-6 z-10">
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/80">
                      <div>
                        <span className="text-[10px] font-bold tracking-widest font-mono text-primary uppercase block">FRAMEWORK CODE</span>
                        <h3 className="text-2xl font-bold font-display tracking-tight text-text-primary mt-1">
                          {activeSolution.title}
                        </h3>
                      </div>
                      <span className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-mono font-semibold self-start sm:self-auto">
                        {activeSolution.metric}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <p className="text-base text-text-secondary leading-relaxed font-light">
                        {activeSolution.description}
                      </p>

                      <div className="space-y-3 pt-2">
                        {activeSolution.bullets.map((b, i) => (
                          <div key={i} className="flex items-start space-x-3 text-sm text-text-primary">
                            <div className="w-5 h-5 rounded-md bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mt-0.5 shrink-0">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                            <span className="font-light">{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Elegant static visualization area */}
                  <div className="mt-8 pt-4 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4 z-10">
                    <div className="flex items-center space-x-3.5 text-left">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-xs font-bold font-mono">
                        NA
                      </div>
                      <div>
                        <p className="text-xs font-bold text-text-primary">Standard Deployment</p>
                        <p className="text-[10px] text-text-muted font-mono uppercase">Full VPC Isolation, SOC2 SLA</p>
                      </div>
                    </div>
                    <a 
                      href="#contact" 
                      onClick={() => setFormData(prev => ({ ...prev, projectRequirements: `Interested in implementing the ${activeSolution.title} framework.` }))}
                      className="px-6 py-3 rounded-xl bg-surface hover:bg-surface-elevated text-text-primary font-semibold text-sm border border-border inline-flex items-center space-x-2 transition-all"
                    >
                      <span>Inquire Blueprint</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* 5. INDUSTRIES SECTION */}
      <section id="industries" className="py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-left">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="space-y-4 mb-12 max-w-2xl"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block">INDUSTRY DOMAINS</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-text-primary leading-[1.1]">
              Connecting Sectors to AI
            </h2>
            <p className="text-base text-text-secondary font-light leading-relaxed">
              We engineer customized algorithmic pipelines for mission-critical industries, delivering enterprise performance boosts and absolute data isolation.
            </p>
          </motion.div>

          {/* Unified, Symmetric, and Highly-Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {INDUSTRIES.map((ind, idx) => {
              const flow = getIndustryFlow(ind.name);
              const details = getIndustryDetails(ind.name);

              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: idx * 0.05 }}
                  className={`group relative rounded-3xl bg-surface/45 border border-border/70 p-5 hover:bg-surface-elevated/50 hover:border-primary/45 hover:scale-[1.015] hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between h-full ${details.borderHover}`}
                >
                  {/* Subtle visual grid behind */}
                  <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none"></div>
                  
                  {/* Accent glow corner */}
                  <div className={`absolute top-[-10%] right-[-10%] w-28 h-28 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-all pointer-events-none ${details.accentDot}`}></div>

                  <div className="space-y-4">
                    {/* Top Row: Tech Styled Icon & proven impact badge */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-9 h-9 rounded-xl bg-bg/60 border border-border/60 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        {details.icon}
                      </div>
                      
                      <span className={`px-3 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-tight border ${details.badgeBg}`}>
                        {ind.metric}
                      </span>
                    </div>

                    {/* Middle Section: Title and premium description */}
                    <div className="space-y-1.5 text-left">
                      <h3 className="text-lg font-bold text-text-primary font-display tracking-tight group-hover:text-primary transition-colors flex items-center gap-2">
                        <span>{ind.name}</span>
                        <span className="text-sm opacity-60 filter saturate-[1.1]">{ind.emoji}</span>
                      </h3>
                      <p className="text-xs sm:text-[13px] text-text-secondary font-light leading-relaxed min-h-[64px]">
                        {ind.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom: Dynamic VPC Pipeline Flowchart */}
                  <div className="pt-4 mt-4 border-t border-border/40 space-y-3 font-mono text-[10px">
                    <div className="flex items-center justify-between text-[8px] font-bold text-text-muted uppercase tracking-widest">
                      <span>VPC ROUTE</span>
                      <span className="text-glow animate-pulse font-bold">ACTIVE PIPELINE</span>
                    </div>

                    <div className="flex items-center justify-between bg-bg/50 border border-border/30 rounded-xl p-2 gap-2 relative overflow-hidden group/pipeline">
                      <div className="flex flex-col text-left truncate max-w-[80px]">
                        <span className="text-[7px] text-text-muted uppercase font-bold">Ingest</span>
                        <span className="text-[9px] text-text-secondary font-sans truncate font-medium">{flow.input}</span>
                      </div>
                      
                      <div className="flex items-center justify-center shrink-0">
                        <ArrowRight className="w-3 h-3 text-text-muted animate-[pulse_1.5s_infinite]" />
                      </div>

                      <div className="flex flex-col text-left truncate max-w-[90px]">
                        <span className="text-[7px] text-primary uppercase font-bold">Pipeline</span>
                        <span className="text-[9px] text-primary font-sans font-semibold truncate">{flow.pipeline}</span>
                      </div>

                      <div className="flex items-center justify-center shrink-0">
                        <ArrowRight className="w-3 h-3 text-primary animate-[pulse_1s_infinite]" />
                      </div>

                      <div className="flex flex-col text-right truncate max-w-[70px]">
                        <span className="text-[7px] text-glow uppercase font-bold font-mono">Target</span>
                        <span className="text-[9px] text-glow font-sans font-bold truncate">{flow.output}</span>
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. TECH STACK SECTION */}
      <section id="techstack" className="py-16 lg:py-20 bg-surface/30 relative border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-left">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="space-y-4 mb-10 max-w-2xl"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block">OUR REPERTOIRE</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-text-primary leading-[1.1]">
              Enterprise Stack
            </h2>
            <p className="text-base text-text-secondary font-light leading-relaxed">
              We leverage production-grade platforms and open-source models to secure robust latency, tight isolation, and dynamic scalability. Hover over any node to see its simulated live VPC telemetry.
            </p>
          </motion.div>

          {/* Scrolling Tech ribbon at top to increase visual engagement */}
          <div className="mb-10 overflow-hidden py-3 relative border-y border-border/60 bg-bg/20">
            <div className="flex space-x-12 animate-[marquee_25s_linear_infinite] whitespace-nowrap min-w-full">
              {[...TECH_STACK, ...TECH_STACK].map((t, idx) => (
                <div key={idx} className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-tight text-text-muted hover:text-primary transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span>{t.name.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left side: Premium Vertical Systems Architecture Stack */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-8 space-y-4"
            >
              {[
                { key: "llm", title: "Cognitive Layer", subtitle: "Agentic Logic & Reasoning Engines", desc: "Frontier language models, stateful multi-agent frameworks, and vector memory loops." },
                { key: "language", title: "Execution Layer", subtitle: "Asynchronous APIs & Systems", desc: "High-performance asynchronous computation cores, data parsers, and custom RPC gateways." },
                { key: "infra", title: "Inference Layer", subtitle: "Deep Learning & Neural Systems", desc: "Custom neural network weights, vector similarity indexes, and model drift supervisors." },
                { key: "cloud", title: "Infrastructure Layer", subtitle: "Secure Cloud & Container Fabrics", desc: "ISO-27001/SOC-2 level isolated virtual private clouds and enterprise container clusters." }
              ].map((group, gIdx) => (
                <div 
                  key={group.key} 
                  className="group/layer bg-surface/40 border border-border/60 hover:bg-surface-elevated/45 hover:border-primary/30 rounded-3xl p-5 transition-all duration-300 relative overflow-hidden text-left"
                >
                  {/* Subtle active tier indicator left accent */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-border/40 group-hover/layer:bg-primary transition-colors duration-300"></div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                    
                    {/* Layer Meta Info */}
                    <div className="md:col-span-4 space-y-1.5 pr-2">
                      <div className="flex items-center space-x-2.5">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary">
                          TIER 0{gIdx + 1}
                        </span>
                        <span className="text-[9px] font-bold font-mono tracking-widest text-text-muted uppercase">
                          {group.title}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-text-primary font-display tracking-tight group-hover/layer:text-primary transition-colors">
                        {group.subtitle}
                      </h4>
                      <p className="text-xs text-text-secondary leading-relaxed font-light">
                        {group.desc}
                      </p>
                    </div>

                    {/* Tech Chips Grid */}
                    <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {TECH_STACK.filter(t => t.category === group.key).map((tech, idx) => {
                        const details = getTechDetails(tech.name);
                        const isHovered = hoveredTech?.name === tech.name;
                        return (
                          <div
                            key={idx}
                            onMouseEnter={() => setHoveredTech(tech)}
                            onMouseLeave={() => setHoveredTech(null)}
                            className={`p-3 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden group/chip flex items-center justify-between ${
                              isHovered 
                                ? "bg-surface-elevated/95 border-primary/50 shadow-md scale-[1.015]" 
                                : "bg-surface/30 border-border/40 text-text-primary hover:bg-surface-elevated/55 hover:border-primary/25"
                            }`}
                          >
                            <div className="flex items-center space-x-2.5 min-w-0">
                              <span className={`text-[10px] font-mono font-bold px-1.5 py-1 rounded border transition-colors flex items-center justify-center gap-1.5 bg-gradient-to-br ${details.bg} ${details.border} ${details.text} shrink-0`}>
                                {details.icon}
                                <span>{getTechMonogram(tech.name)}</span>
                              </span>
                              <span className={`text-xs font-bold tracking-tight transition-colors truncate ${
                                isHovered ? "text-primary" : "text-text-primary"
                              }`}>
                                {tech.name}
                              </span>
                            </div>

                            <div className="flex items-center space-x-1 shrink-0">
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                isHovered ? "bg-primary animate-ping" : "bg-glow/50 animate-pulse"
                              }`}></span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Right side: Interactive Tooltip Description Box / Telemetry Console */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-4 lg:sticky lg:top-32 h-full"
            >
              <div className="p-8 rounded-[32px] bg-surface/60 border border-border/80 relative overflow-hidden min-h-[440px] flex flex-col justify-between shadow-xl backdrop-blur-md">
                {/* Background mesh pattern */}
                <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none"></div>

                <AnimatePresence mode="wait">
                  {hoveredTech ? (
                    <motion.div
                      key={hoveredTech.name}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-6 z-10 text-left"
                    >
                      <div>
                        <span className="text-[10px] font-bold font-mono tracking-widest text-primary uppercase">
                          {hoveredTech.category.toUpperCase()} INTEGRATION
                        </span>
                        <h3 className="text-2xl font-extrabold font-display tracking-tight text-text-primary mt-1">
                          {hoveredTech.name}
                        </h3>
                      </div>
                      
                      <p className="text-xs text-text-secondary leading-relaxed font-light">
                        {hoveredTech.description}
                      </p>

                      {/* Dynamic Telemetry stats based on tech selection */}
                      <div className="space-y-3 pt-3 border-t border-border/60">
                        <span className="text-[9px] font-bold font-mono text-text-muted tracking-widest block uppercase">VPC TELEMETRY PROFILE</span>
                        
                        {[
                          { 
                            label: "Reliability Index", 
                            value: hoveredTech.name === "AWS" || hoveredTech.name === "GCP" ? "99.999%" : "99.98%",
                            percent: 98
                          },
                          { 
                            label: "Latency Profile", 
                            value: hoveredTech.name === "FastAPI" || hoveredTech.name === "Python" ? "< 4ms" : hoveredTech.name.includes("OpenAI") ? "< 220ms" : "< 15ms",
                            percent: hoveredTech.name === "FastAPI" ? 99 : hoveredTech.name.includes("OpenAI") ? 75 : 92
                          },
                          { 
                            label: "Scalability Threshold", 
                            value: hoveredTech.name === "Kubernetes" || hoveredTech.name === "AWS" ? "Infinite Cluster" : "SLA Tier-1",
                            percent: hoveredTech.name === "Kubernetes" || hoveredTech.name === "AWS" ? 100 : 88
                          }
                        ].map((stat, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between text-[11px] font-medium font-mono text-text-secondary">
                              <span>{stat.label}</span>
                              <span className="font-bold text-text-primary">{stat.value}</span>
                            </div>
                            <div className="h-1 bg-border rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${stat.percent}%` }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="h-full bg-gradient-to-r from-primary to-secondary"
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 flex items-center space-x-2 text-[10px] font-mono text-primary">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                        <span>SOC-2 BOUNDED CORE COMPLIANT</span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6 z-10 h-full flex flex-col justify-between text-left py-2"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-glow animate-pulse"></span>
                          <span className="text-[10px] font-bold font-mono tracking-widest text-glow uppercase">GLOBAL VPC GATEWAY CONNECTED</span>
                        </div>
                        <h3 className="text-xl font-extrabold font-display tracking-tight text-text-primary leading-tight">
                          Active Cluster Health
                        </h3>
                        <p className="text-xs text-text-secondary leading-relaxed font-light">
                          Enterprise infrastructure online. Hover over any technology node in the matrix to inspect specialized telemetry metrics, service SLA, and latency thresholds.
                        </p>
                      </div>

                      {/* Micro-chart showing live activity metrics */}
                      <div className="space-y-3.5 bg-bg/40 border border-border/40 rounded-2xl p-4 relative overflow-hidden">
                        <div className="flex items-center justify-between text-[9px] font-mono font-bold text-text-muted">
                          <span>CLUSTER WORKLOAD</span>
                          <span className="text-primary font-bold">HEALTHY (99.98% SLA)</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 font-mono text-[10px] text-text-secondary">
                          <div className="p-2 rounded bg-surface/40 border border-border/30">
                            <span className="text-[8px] block text-text-muted">GLOBAL LATENCY</span>
                            <span className="font-sans font-extrabold text-xs text-text-primary">4.2ms avg</span>
                          </div>
                          <div className="p-2 rounded bg-surface/40 border border-border/30">
                            <span className="text-[8px] block text-text-muted">ACTIVE CONTAINERS</span>
                            <span className="font-sans font-extrabold text-xs text-glow">24 / 24 Online</span>
                          </div>
                          <div className="p-2 rounded bg-surface/40 border border-border/30">
                            <span className="text-[8px] block text-text-muted">QUERY HIT RATE</span>
                            <span className="font-sans font-extrabold text-xs text-primary">1,480 req/s</span>
                          </div>
                          <div className="p-2 rounded bg-surface/40 border border-border/30">
                            <span className="text-[8px] block text-text-muted">VPC SECURITY</span>
                            <span className="font-sans font-extrabold text-xs text-text-primary">ISO27001 / SOC2</span>
                          </div>
                        </div>

                        {/* Pulse Heartbeat Visualizer */}
                        <div className="pt-2">
                          <div className="h-10 flex items-end justify-between gap-0.5">
                            {[40, 20, 65, 30, 85, 50, 45, 60, 25, 50, 75, 40, 95, 60, 30, 50, 40, 70, 85, 35].map((h, i) => (
                              <div 
                                key={i} 
                                className="flex-1 bg-primary/20 rounded-t-sm transition-all duration-300 hover:bg-primary/50" 
                                style={{ height: `${h}%` }}
                              ></div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center space-x-2 text-[10px] font-mono text-text-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-glow animate-ping"></span>
                        <span>ALL INTEL NODE DIAGNOSTICS DEPLOYED</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="z-10 pt-6 mt-6 border-t border-border/80 text-[10px] font-mono text-text-muted text-left">
                  INTELLIGENCE ARCHITECTURE — NORTHARC V2
                </div>

              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 7. PROCESS SECTION */}
      <section id="process" className="py-16 lg:py-20 relative overflow-hidden bg-surface/10 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-left">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="space-y-4 mb-10 max-w-2xl"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block">DELIVERY FRAMEWORK</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-text-primary leading-[1.1]">
              Our 5-Step Deployment Process
            </h2>
            <p className="text-base text-text-secondary font-light leading-relaxed">
              We approach every engagement with surgical alignment, tracing goals from audit to active production monitoring.
            </p>
          </motion.div>

          {/* Stepper block */}
          <div className="relative">
            {/* Horizontal connection line for desktop */}
            <div className="hidden lg:block absolute top-[32px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-primary via-secondary to-glow opacity-30 z-0"></div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-6 relative z-10">
              {DEPLOYMENT_STEPS.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  className="group text-left space-y-4 relative"
                >
                  
                  {/* Step circle container */}
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-surface border border-border flex items-center justify-center shadow-lg group-hover:border-primary/50 group-hover:shadow-xl group-hover:shadow-primary/5 group-hover:scale-[1.05] transition-all duration-300 z-10 relative">
                      <span className="text-lg font-bold font-display bg-gradient-to-tr from-primary to-secondary bg-clip-text text-transparent">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold font-display tracking-tight text-text-primary group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-text-secondary font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Mobile vertical connection line */}
                  {idx < 4 && (
                    <div className="lg:hidden absolute left-8 top-16 bottom-[-48px] w-[1px] bg-border/80"></div>
                  )}

                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 8. CONTACT SECTION (Booking & Solutions Desk) */}
      <section id="contact" className="py-16 lg:py-20 bg-surface/30 border-t border-border relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-left">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left column: Direct coordinate details */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="space-y-4"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block">RESERVE CONSULTATION</span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-text-primary leading-[1.1]">
                  Book a Consultation
                </h2>
                <p className="text-base text-text-secondary font-light leading-relaxed">
                  Partner with specialized systems engineers to audit your data bottlenecks and deploy robust, high-yielding deep neural architectures.
                </p>
              </motion.div>

              {/* Coordinates list */}
              <div className="space-y-5 pt-4">
                
                {[
                  {
                    icon: MapPin,
                    title: "Headquarters",
                    content: "Ahmedabad, Gujarat",
                    accent: "text-primary"
                  },
                  {
                    icon: Mail,
                    title: "Solutions Desk",
                    content: <a href="mailto:solutions@northarc.ai" className="text-primary hover:underline">solutions@northarc.ai</a>,
                    accent: "text-secondary"
                  },
                  {
                    icon: Phone,
                    title: "Direct Line",
                    content: <a href="tel:+918849969336" className="hover:text-text-primary transition-colors">+91 884 996 9336</a>,
                    accent: "text-glow"
                  },
                  {
                    icon: Clock,
                    title: "Guaranteed Response",
                    content: "Within 24 business hours",
                    accent: "text-text-muted"
                  }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="flex items-start space-x-4 group"
                    >
                      <div className={`p-3.5 rounded-2xl bg-surface border border-border ${item.accent} shadow-md group-hover:scale-[1.05] transition-all duration-300 shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="pt-1">
                        <h4 className="text-sm font-bold text-text-primary">{item.title}</h4>
                        <p className="text-sm text-text-secondary mt-0.5 font-light">{item.content}</p>
                      </div>
                    </motion.div>
                  );
                })}

              </div>

            </div>

            {/* Right column: Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-surface border border-border p-8 lg:p-10 relative overflow-hidden shadow-xl">
                {/* Visual grid background */}
                <div className="absolute inset-0 grid-bg opacity-20"></div>

                <AnimatePresence mode="wait">
                  {formSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12 space-y-6 relative z-10"
                    >
                      <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mx-auto shadow-lg shadow-primary/5">
                        <Check className="w-8 h-8" />
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold font-display tracking-tight text-text-primary">
                          Consultation Requested
                        </h3>
                        <p className="text-sm text-text-secondary font-light max-w-md mx-auto leading-relaxed">
                          Thank you for reaching out to NorthArc. Our specialized solutions desk will review your requirements and respond within 24 business hours.
                        </p>
                      </div>

                      <button
                        onClick={() => setFormSubmitted(false)}
                        className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm transition-all"
                      >
                        Submit Another Consultation
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleFormSubmit}
                      className="space-y-6 relative z-10"
                    >
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-text-muted block">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            className={`w-full bg-surface-elevated/45 border-b border-border hover:border-primary/50 focus:border-primary px-1.5 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-colors ${
                              formErrors.fullName ? "border-red-500" : ""
                            }`}
                          />
                          {formErrors.fullName && (
                            <p className="text-xs text-red-500 font-medium">{formErrors.fullName}</p>
                          )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-text-muted block">
                            Business Email *
                          </label>
                          <input
                            type="email"
                            name="businessEmail"
                            value={formData.businessEmail}
                            onChange={handleInputChange}
                            placeholder="john@company.com"
                            className={`w-full bg-surface-elevated/45 border-b border-border hover:border-primary/50 focus:border-primary px-1.5 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-colors ${
                              formErrors.businessEmail ? "border-red-500" : ""
                            }`}
                          />
                          {formErrors.businessEmail && (
                            <p className="text-xs text-red-500 font-medium">{formErrors.businessEmail}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Company Name */}
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-text-muted block">
                            Company Name *
                          </label>
                          <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            placeholder="Acme Corp"
                            className={`w-full bg-surface-elevated/45 border-b border-border hover:border-primary/50 focus:border-primary px-1.5 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-colors ${
                              formErrors.companyName ? "border-red-500" : ""
                            }`}
                          />
                          {formErrors.companyName && (
                            <p className="text-xs text-red-500 font-medium">{formErrors.companyName}</p>
                          )}
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-text-muted block">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="+91 99999 99999"
                            className="w-full bg-surface-elevated/45 border-b border-border hover:border-primary/50 focus:border-primary px-1.5 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Service Interest Dropdown */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-text-muted block">
                          Service Interest *
                        </label>
                        <select
                          name="serviceInterest"
                          value={formData.serviceInterest}
                          onChange={handleInputChange}
                          className={`w-full bg-surface bg-surface-elevated/45 border-b border-border hover:border-primary/50 focus:border-primary px-1.5 py-3 text-sm text-text-primary focus:outline-none transition-colors ${
                            formErrors.serviceInterest ? "border-red-500" : ""
                          }`}
                        >
                          <option value="">Select Service Area</option>
                          {SERVICES.map((s, i) => (
                            <option key={i} value={s.title}>{s.title}</option>
                          ))}
                        </select>
                        {formErrors.serviceInterest && (
                          <p className="text-xs text-red-500 font-medium">{formErrors.serviceInterest}</p>
                        )}
                      </div>

                      {/* Requirements Textarea */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-text-muted block">
                          Project Requirements
                        </label>
                        <textarea
                          name="projectRequirements"
                          value={formData.projectRequirements}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Tell us about your pipeline bottlenecks, available model data, or targeted automation metrics..."
                          className="w-full bg-surface-elevated/45 border-b border-border hover:border-primary/50 focus:border-primary px-1.5 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-colors resize-none"
                        ></textarea>
                      </div>

                      {/* Submit error display */}
                      {submitError && (
                        <div className="text-sm text-red-500 font-medium text-center bg-red-500/10 border border-red-500/20 py-2.5 px-4 rounded-xl">
                          {submitError}
                        </div>
                      )}

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-primary to-secondary hover:from-primary/95 hover:to-secondary/95 text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/35 transition-all duration-300 flex items-center justify-center space-x-2.5 text-base disabled:opacity-75 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                            <span>Requesting Secure Bridge...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span>Book a Consultation</span>
                          </>
                        )}
                      </button>

                    </motion.form>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER (Always deep dark background) */}
      <footer className="bg-[#05070B] border-t border-border py-16 text-left text-[#94A3B8] relative overflow-hidden">
        {/* Abstract design elements */}
        <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
            
            {/* Column 1: Logo & Tagline */}
            <div className="lg:col-span-4 space-y-6">
              <a href="#home" className="flex items-center space-x-3">
                <div className="relative w-9 h-9 flex items-center justify-center">
                  <img src={logoImg} alt="NorthArc Logo" className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold tracking-tight font-display text-white">NorthArc</span>
                  <span className="text-[8px] uppercase tracking-widest text-[#475569] font-semibold">Connecting Intelligence to Impact</span>
                </div>
              </a>
              
              <p className="text-sm font-light leading-relaxed text-[#94A3B8] max-w-sm">
                NorthArc is a specialized AI, Data Science, and Intelligent Systems firm that bridges the gap between cutting-edge research and real-world business outcomes.
              </p>

              {/* Social icons */}
              <div className="flex space-x-4 pt-1">
                <a href="#" className="p-2.5 rounded-lg bg-[#0F1420] hover:bg-primary/20 text-[#94A3B8] hover:text-white transition-all duration-200">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="p-2.5 rounded-lg bg-[#0F1420] hover:bg-primary/20 text-[#94A3B8] hover:text-white transition-all duration-200">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="p-2.5 rounded-lg bg-[#0F1420] hover:bg-primary/20 text-[#94A3B8] hover:text-white transition-all duration-200">
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Company Links */}
            <div className="lg:col-span-2.5 space-y-4">
              <h4 className="text-xs font-bold font-mono tracking-widest text-white uppercase">Company</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#home" className="hover:text-white transition-colors duration-200">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors duration-200">About Us</a></li>
                <li><a href="#services" className="hover:text-white transition-colors duration-200">Services</a></li>
                <li><a href="#industries" className="hover:text-white transition-colors duration-200">Industries</a></li>
              </ul>
            </div>

            {/* Column 3: Solutions Links */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-bold font-mono tracking-widest text-white uppercase">Solutions</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#solutions" onClick={() => setActiveSolutionId("workflows")} className="hover:text-white transition-colors duration-200">AI Agents</a></li>
                <li><a href="#solutions" onClick={() => setActiveSolutionId("assistants")} className="hover:text-white transition-colors duration-200">Knowledge Systems</a></li>
                <li><a href="#solutions" onClick={() => setActiveSolutionId("predictive")} className="hover:text-white transition-colors duration-200">Predictive Analytics</a></li>
                <li><a href="#solutions" onClick={() => setActiveSolutionId("docs")} className="hover:text-white transition-colors duration-200">Document AI</a></li>
              </ul>
            </div>

            {/* Column 4: Connect Links */}
            <div className="lg:col-span-2.5 space-y-4">
              <h4 className="text-xs font-bold font-mono tracking-widest text-white uppercase">Connect</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#contact" className="hover:text-white transition-colors duration-200">Book Consultation</a></li>
                <li><a href="#techstack" className="hover:text-white transition-colors duration-200">Tech Stack</a></li>
                <li><a href="#process" className="hover:text-white transition-colors duration-200">Our Process</a></li>
                <li><a href="mailto:solutions@northarc.ai" className="hover:text-white transition-colors duration-200">Email Us</a></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 mt-8 border-t border-[#1E2A45]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#475569]">
            <p>© 2026 NorthArc. All rights reserved. Built for global enterprise intelligence.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-[#94A3B8] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#94A3B8] transition-colors">Terms of Service</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
