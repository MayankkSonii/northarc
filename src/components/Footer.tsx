import React from "react";
import { Linkedin, Twitter, Github } from "lucide-react";
import logo from "../narc.png";

export function Footer() {
  return (
    <footer className="bg-bg border-t border-border/10 py-12 text-left relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute bottom-0 left-0 w-72 h-40 bg-glow/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Top grid: brand + 3 link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <a href="/" className="flex items-center gap-2">
              <img src={logo} alt="NorthArc Logo" className="w-8 h-8 object-contain shrink-0 rounded-lg" />
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold text-text-primary">NorthArc</span>
                <span className="text-[8px] uppercase tracking-widest text-text-secondary/40 font-semibold">Connecting Intelligence</span>
              </div>
            </a>
            <p className="text-xs text-text-secondary/50 font-light leading-relaxed">
              Specialized AI, Data Science, and Intelligent Systems firm bridging research and real-world outcomes.
            </p>
            <div className="flex gap-2 pt-1">
              {[Linkedin, Twitter, Github].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-lg border border-border/10 hover:border-primary/50 hover:text-primary text-text-secondary/40 transition-all duration-200">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold font-mono tracking-widest text-text-secondary/60 uppercase">Services</h4>
            <ul className="space-y-2">
              <li><a href="/services/full-cycle-development" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">Full-cycle Development</a></li>
              <li><a href="/services/team-augmentation" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">Team Augmentation</a></li>
              <li><a href="/services/transformation-consulting" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">Digital Transformation</a></li>
              <li><a href="/services/concept-design" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">Concept & Design</a></li>
            </ul>
          </div>

          {/* Expertise */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold font-mono tracking-widest text-text-secondary/60 uppercase">Expertise</h4>
            <ul className="space-y-2">
              <li><a href="/expertise/ai-ml" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">AI & Machine Learning</a></li>
              <li><a href="/expertise/big-data" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">Big Data & Analytics</a></li>
              <li><a href="/expertise/web-mobile" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">Web & Mobile Apps</a></li>
              <li><a href="/expertise/devops-security" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">DevOps & Security</a></li>
              <li><a href="/expertise/web3-blockchain" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">Web3 & Blockchain</a></li>
              <li><a href="/expertise/cloud-native" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">Cloud-native Services</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold font-mono tracking-widest text-text-secondary/60 uppercase">Company</h4>
            <ul className="space-y-2">
              <li><a href="/#solutions" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">Solutions</a></li>
              <li><a href="/contact" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-border/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-text-secondary/30">
          <p>© 2026 NorthArc. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-text-secondary/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-text-secondary/60 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}