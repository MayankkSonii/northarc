import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Check,
  Play,
  Terminal as TerminalIcon,
  ShieldCheck,
  Server,
  Activity
} from "lucide-react";
import { SOLUTIONS } from "../data";

export default function Solutions() {
  const [activeSolutionId, setActiveSolutionId] = useState<string>("workflows");
  const [simulatingId, setSimulatingId] = useState<string | null>(null);
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const [simStep, setSimStep] = useState(0);

  const activeSolution = SOLUTIONS.find(s => s.id === activeSolutionId) || SOLUTIONS[0];

  return (
    <div className="pt-24 pb-12 bg-bg min-h-screen relative grid-bg">
      <div className="absolute top-10 left-10 w-[30vw] h-[30vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[35vw] h-[35vw] rounded-full bg-secondary/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-left">

        {/* Whizoid styled vertical section title decoration */}
        <div className="hidden xl:block absolute left-[-4rem] top-[10rem] origin-left rotate-90 text-[10px] tracking-[0.6em] font-mono text-text-muted uppercase">
          B u i e p r i n t s
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-4 content-space-sm max-w-2xl text-left"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block">SYSTEM SOLUTIONS</span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-text-primary leading-[1.1]">
            Enterprise AI Frameworks
          </h2>
          <p className="text-base text-text-secondary font-light leading-relaxed">
            Highly secure architectures designed to optimize datasets, compile agent logic pipelines, and execute model predictions.
          </p>
        </motion.div>

        {/* Tab Selection + Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 section-gap-sm items-stretch">

          {/* List selection */}
          <div className="lg:col-span-4 flex flex-col justify-start space-y-4">
            {SOLUTIONS.map(sol => (
              <button
                key={sol.id}
                onClick={() => {
                  setActiveSolutionId(sol.id);
                  setSimulatingId(null);
                  setSimLogs([]);
                  setSimStep(0);
                }}
                className={`w-full p-6 rounded-2xl text-left border transition-all duration-300 flex items-center justify-between group ${activeSolutionId === sol.id
                    ? "bg-surface-elevated border-primary/50 shadow-md shadow-primary/5"
                    : "bg-surface/50 border-border/60 hover:bg-surface-elevated/40 hover:border-primary/20"
                  }`}
              >
                <div className="text-left">
                  <h3 className={`text-base font-bold font-display ${activeSolutionId === sol.id ? 'text-primary' : 'text-text-primary'}`}>
                    {sol.title}
                  </h3>
                  <p className="text-xs text-text-muted font-light mt-1 max-w-[280px] truncate">
                    {sol.description}
                  </p>
                </div>
                <div className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-colors shrink-0 ${activeSolutionId === sol.id
                    ? "bg-primary text-white border-primary"
                    : "bg-surface border-border text-text-secondary group-hover:text-text-primary"
                  }`}>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>

          {/* Solution details layout */}
          <div className="lg:col-span-8 flex flex-col space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSolution.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full rounded-3xl bg-surface/60 border border-border p-8 relative overflow-hidden flex flex-col justify-between shadow-xl backdrop-blur-md"
              >
                <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-primary/5 to-secondary/10 blur-[60px]"></div>

                <div className="space-y-8 z-10 text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/80">
                    <div>
                      <span className="text-[10px] font-bold tracking-widest font-mono text-primary uppercase block">FRAMEWORK BLUEPRINT</span>
                      <h3 className="text-2xl font-bold font-display tracking-tight text-text-primary mt-1">
                        {activeSolution.title}
                      </h3>
                    </div>
                    <span className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/15 text-primary text-xs font-mono font-bold self-start sm:self-auto uppercase tracking-wide">
                      {activeSolution.metric}
                    </span>
                  </div>

                  <div className="space-y-6">
                    <p className="text-base text-text-secondary leading-relaxed font-light">
                      {activeSolution.description}
                    </p>

                    <div className="space-y-3.5 pt-2">
                      {activeSolution.bullets.map((b, i) => (
                        <div key={i} className="flex items-start space-x-3 text-sm text-text-primary">
                          <div className="w-5 h-5 rounded-md bg-primary/10 border border-primary/25 text-primary flex items-center justify-center mt-0.5 shrink-0">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-light">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4 z-10">
                  <a
                    href="/contact"
                    className="px-6 py-3 rounded-full border border-border/30 text-text-primary hover:bg-bg hover:text-text-primary bg-transparent inline-flex items-center space-x-2 text-xs font-semibold transition-all cursor-pointer"
                  >
                    <span>Inquire Framework</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Simulated Live Console Log */}
            <AnimatePresence>
              {simulatingId === activeSolutionId && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="w-full rounded-2xl bg-[#020617] border border-border p-5 shadow-2xl relative overflow-hidden text-left"
                >
                  {/* Console Header */}
                  <div className="flex items-center justify-between border-b border-border/80 pb-3 mb-3 text-xs font-mono text-text-secondary">
                    <div className="flex items-center space-x-2">
                      <TerminalIcon className="w-4 h-4 text-primary animate-pulse" />
                      <span className="font-bold text-[10px] tracking-widest text-primary uppercase">COGNITIVE COMPUTE NODE</span>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary uppercase font-bold tracking-tight">VPC ISOLATED</span>
                  </div>

                  {/* Log body */}
                  <div className="font-mono text-xs text-glow/90 space-y-1.5 max-h-[160px] overflow-y-auto">
                    {simLogs.map((log, i) => (
                      <div key={i} className="leading-relaxed whitespace-pre-wrap">
                        {log}
                      </div>
                    ))}
                    {simStep < 8 && (
                      <div className="flex items-center space-x-1 text-text-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                        <span className="text-[10px]">Processing node buffer...</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}








