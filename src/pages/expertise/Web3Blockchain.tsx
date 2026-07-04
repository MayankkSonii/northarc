import React from "react";
import { motion } from "motion/react";
import { AnimatedHeroVisual } from "../../components/AnimatedHeroVisual";
import {
  ArrowRight,
  ArrowDown,
  Check,
  Lock,
  Layers,
  Database,
  Cpu
} from "lucide-react";

export default function Web3Blockchain() {
  const capabilities = [
    { icon: Lock, title: "Smart Contract Engineering", desc: "Build Solidity and Rust smart contracts for EVM (Ethereum, Polygon) and Solana network limits." },
    { icon: Layers, title: "Decentralized APIs", desc: "Configure Web3.js and Ethers.js client links, wallet connections, and index subgraphs." },
    { icon: Database, title: "Ledger Infrastructure", desc: "Set up private ledger chains, distribute consensus nodes, and setup decentralized databases." },
    { icon: Cpu, title: "Gas Audits & Optimization", desc: "Run Hardhat and Foundry testing suites to optimize contract execution and minimize fees." }
  ];

  const processSteps = [
    { num: "01", title: "Contract Scoping & Specs", desc: "Define contract properties, map out transaction states, and construct workflow blueprints." },
    { num: "02", title: "Foundry / Hardhat Development", desc: "Write smart contracts code, execute local diagnostic runs, and configure unit check loops." },
    { num: "03", title: "Audit & Exploit Assessment", desc: "Run static analysis checks, verify contract gas outputs, and audit security compliance." },
    { num: "04", title: "Testnet Deploy & Sandbox Runs", desc: "Deploy compiled bytecodes to test networks, execute mock queries, and check validation states." },
    { num: "05", title: "Mainnet Launch & Monitoring", desc: "Deploy finalized bytecode, verify contract source code, and set up event logs alert triggers." },
    { num: "06", title: "Continuous Contract Tuning", desc: "Configure multi-sig proxy contract routes, monitor gas price curves, and audit state updates." }
  ];

  const highlights = [
    "Zero contract exploit incidents across all deployed mainnet nodes.",
    "Gas-efficient coding design patterns reducing transaction fees.",
    "Integrated Multi-Sig secure wallet access configurations.",
    "Decentralized ledger indexes providing rapid transaction query speeds."
  ];

  return (
    <div className="bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans text-left">

      {/* Wave Decorative Orbs */}
      <div className="absolute right-[-10%] top-[5%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-primary/10 to-primary/15 blur-[130px] pointer-events-none z-0"></div>

      {/* 1. HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-24 pt-28 pb-10 relative z-10 max-w-7xl mx-auto">
        <div className="space-y-8 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block">EXPERTISE / WEB3 & BLOCKCHAIN</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-text-primary leading-[1.08]">
            Web3 and Blockchain Engineering
          </h1>
          <p className="text-sm sm:text-base text-text-secondary font-light max-w-xl leading-relaxed">
            We engineer secure smart contracts, configure decentralized storage protocols, and deploy decentralized application (dApp) frameworks.
          </p>
          <div className="pt-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 border border-border/30 text-text-primary hover:bg-surface hover:text-text-primary hover:border-border rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-300 group"
            >
              <span>Get in touch</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
        <div className="pointer-events-none absolute right-6 top-[calc(50%+40px)] hidden w-[42%] -translate-y-1/2 lg:block">
          <AnimatedHeroVisual icon={Lock} title="Chain network" eyebrow="Web3 systems" scene="security" />
        </div>

        {/* Scroll Indicator */}
        <div className="flex items-center space-x-3 text-xs text-text-secondary font-light font-mono opacity-80 pt-12 lg:pt-0">
          <div className="w-8 h-8 rounded-full border border-border/20 flex items-center justify-center animate-bounce">
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
          <span>Scroll to discover more</span>
        </div>
      </section>

      {/* 2. CORE CAPABILITIES */}
      <section className="py-16 px-6 md:px-12 lg:px-24 border-t border-border/10 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">Decentralized Focus</h2>
            <p className="text-sm text-text-secondary font-light mt-4 leading-relaxed">
              We compile highly secure ledger integrations. We prioritize static audit checks, gas parameters reviews, and multi-sig setups to prevent contract exploits.
            </p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:pl-12 border-l border-border/10">
            {capabilities.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="space-y-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-text-secondary font-light leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. PROCESS STEPS */}
      <section className="py-16 px-6 md:px-12 lg:px-24 border-t border-border/10 relative z-10 max-w-7xl mx-auto">
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">The Web3 Process</h2>
            <p className="text-sm text-text-secondary font-light mt-2 max-w-md">
              A systematic overview of how we compile smart contracts and deploy decentralized solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {processSteps.map((step, i) => (
              <div key={i} className="pt-6 border-t border-border/10 space-y-4 text-left">
                <span className="text-xs font-mono font-bold text-primary block">{step.num}</span>
                <h4 className="text-lg font-bold text-text-primary">{step.title}</h4>
                <p className="text-xs sm:text-sm text-text-secondary font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GUARANTEES CHECKLIST & CTA */}
      <section className="py-20 px-6 md:px-12 lg:px-24 border-t border-border/10 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-light tracking-tight">Smart Contract Standards</h2>
            <p className="text-sm text-text-secondary font-light leading-relaxed">
              We leverage modern Solidity patterns and strict consensus rules. All deployed contracts undergo vulnerability checks and multi-signature approvals to secure assets.
            </p>
            <div className="space-y-4">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start space-x-3 text-sm">
                  <div className="p-1 rounded bg-primary/15 text-primary mt-0.5 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-text-secondary font-light leading-relaxed">{h}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="max-w-md w-full rounded-3xl bg-surface/50 border border-border/10 p-8 text-center space-y-6">
              <h3 className="text-xl font-bold text-text-primary">Need a smart contract build?</h3>
              <p className="text-xs text-text-secondary font-light">
                Connect with our Web3 architects to analyze ledger configurations, choose consensus engines, and review code security controls.
              </p>
              <a
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 border border-primary bg-primary hover:bg-transparent text-text-primary hover:text-primary rounded-full py-4 text-sm font-semibold transition-all duration-300 group"
              >
                <span>Build Web3 Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}








