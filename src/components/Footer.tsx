import React from "react";
import { Linkedin, Mail, MapPin } from "lucide-react";
import logo from "../narc.png";

export function Footer() {
  return (
    <footer className="bg-bg border-t border-border/10 py-12 text-left relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute bottom-0 left-0 w-72 h-40 bg-glow/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Top grid: brand + link columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 mb-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-4">
            <a href="/" className="flex items-center gap-2">
              <img src={logo} alt="NorthArc Logo" className="w-8 h-8 object-contain shrink-0 rounded-lg" />
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold text-text-primary">NorthArc</span>
                <span className="text-[8px] uppercase tracking-widest text-text-secondary/40 font-semibold">Connecting Intelligence to Impact</span>
              </div>
            </a>
            <p className="text-xs text-text-secondary/50 font-light leading-relaxed">
              AI Engineering, Data Science &amp; Intelligent Automation, connecting intelligence to impact by turning AI into measurable business outcomes.
            </p>

            {/* Contact details */}
            <address className="not-italic space-y-2 pt-1">
              <a
                href="mailto:solutions@northarc.in"
                className="flex items-center gap-2 text-xs text-text-secondary/50 hover:text-primary transition-colors"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>solutions@northarc.in</span>
              </a>
              <p className="flex items-center gap-2 text-xs text-text-secondary/50">
                <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>Ahmedabad, Gujarat, India</span>
              </p>
            </address>

            {/* Social */}
            <div className="flex gap-2 pt-1">
              <a
                href="https://www.linkedin.com/company/northarc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="NorthArc on LinkedIn"
                className="p-2 rounded-lg border border-border/10 hover:border-primary/50 hover:text-primary text-text-secondary/40 transition-all duration-200"
              >
                <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Footer services navigation" className="space-y-3">
            <h4 className="text-[10px] font-bold font-mono tracking-widest text-text-secondary/60 uppercase">Services</h4>
            <ul className="space-y-2">
              <li><a href="/services/full-cycle-development" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">AI Product Development</a></li>
              <li><a href="/services/team-augmentation" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">AI Team Augmentation</a></li>
              <li><a href="/services/transformation-consulting" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">AI Transformation Consulting</a></li>
              <li><a href="/services/concept-design" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">AI Product Concept &amp; Design</a></li>
            </ul>
          </nav>

          {/* Products */}
          <nav aria-label="Footer products navigation" className="space-y-3">
            <h4 className="text-[10px] font-bold font-mono tracking-widest text-text-secondary/60 uppercase">Products</h4>
            <ul className="space-y-2">
              <li><a href="/products/ai-support-agent" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">AI Customer Support Agent</a></li>
              <li><a href="/products/voice-ai-calling-agent" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">Voice AI Calling Agent</a></li>
              <li><a href="/products/rag-knowledge-assistant" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">RAG Knowledge Assistant</a></li>
              <li><a href="/products/predictive-lead-scoring" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">Predictive Lead Scoring</a></li>
              <li><a href="/products" className="text-xs text-primary/70 hover:text-primary transition-colors">All Products</a></li>
            </ul>
          </nav>

          {/* Solutions */}
          <nav aria-label="Footer solutions navigation" className="space-y-3">
            <h4 className="text-[10px] font-bold font-mono tracking-widest text-text-secondary/60 uppercase">Solutions</h4>
            <ul className="space-y-2">
              <li><a href="/solutions/finance-insurance" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">Finance &amp; Insurance</a></li>
              <li><a href="/solutions/retail-ecommerce" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">Retail &amp; E-commerce</a></li>
              <li><a href="/solutions/healthcare" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">Healthcare</a></li>
              <li><a href="/solutions/saas-technology" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">SaaS &amp; Technology</a></li>
              <li><a href="/solutions" className="text-xs text-primary/70 hover:text-primary transition-colors">All Solutions</a></li>
            </ul>
          </nav>

          {/* Expertise */}
          <nav aria-label="Footer expertise navigation" className="space-y-3">
            <h4 className="text-[10px] font-bold font-mono tracking-widest text-text-secondary/60 uppercase">Expertise</h4>
            <ul className="space-y-2">
              <li><a href="/expertise/ai-ml" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">AI &amp; Machine Learning</a></li>
              <li><a href="/expertise/generative-ai" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">Generative AI</a></li>
              <li><a href="/expertise/big-data" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">Data Science &amp; Big Data</a></li>
              <li><a href="/expertise/reengineering" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">Modernization &amp; Reengineering</a></li>
              <li><a href="/expertise/web-mobile" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">Web &amp; Mobile Apps</a></li>
              <li><a href="/expertise/devops-security" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">DevOps &amp; Security</a></li>
              <li><a href="/expertise/support-maintenance" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">Support &amp; Maintenance</a></li>
              <li><a href="/expertise/low-code" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">Low-code / No-code</a></li>
              <li><a href="/expertise/qa-automation" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">QA &amp; Test Automation</a></li>
              <li><a href="/expertise/cloud-native" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">Cloud-native Services</a></li>
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Footer company navigation" className="space-y-3">
            <h4 className="text-[10px] font-bold font-mono tracking-widest text-text-secondary/60 uppercase">Company</h4>
            <ul className="space-y-2">
              <li><a href="/resources/case-studies" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">Case Studies</a></li>
              <li><a href="/resources/blogs" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">Blog</a></li>
              <li><a href="/contact" className="text-xs text-text-secondary/50 hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </nav>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-border/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-text-secondary/30">
          <p>© 2026 NorthArc. All rights reserved.</p>
          <p className="text-text-secondary/40">Connecting Intelligence to Impact.</p>
        </div>

      </div>
    </footer>
  );
}
