import React from "react";
import { motion } from "motion/react";
import { AnimatedHeroVisual } from "../../components/AnimatedHeroVisual";
import { 
  Check, 
  ArrowRight, 
  ArrowDown, 
  Layers, 
  Settings, 
  Cpu, 
  Smartphone 
} from "lucide-react";

export default function LowCode() {
  const capabilities = [
    { icon: Layers, title: "Platform Integrations", desc: "Integrate and configure enterprise low-code systems (FlutterFlow, Retool, Bubble, Webflow)." },
    { icon: Settings, title: "Custom Logic Bridges", desc: "Develop Node/Python serverless logic to extend default platform operations." },
    { icon: Cpu, title: "Database Configurations", desc: "Connect frontend builders to SQL, Firestore, or Postgres databases via secure REST APIs." },
    { icon: Smartphone, title: "Rapid UI Prototyping", desc: "Deploy internal admin tools, dashboard panels, and customer portals in days." }
  ];

  const processSteps = [
    { num: "01", title: "Tool & Platform Scoping", desc: "Identify features constraints, compare retarget options, and select platform stacks." },
    { num: "02", title: "API Bridge Blueprinting", desc: "Draft micro-routing details, map out custom endpoints, and define database structures." },
    { num: "03", title: "UI Layout Assembly", desc: "Construct interface screens, customize theme variables, and link data queries." },
    { num: "04", title: "Custom Back-end Injection", desc: "Deploy serverless backend workers, configure security groups, and write custom actions." },
    { num: "05", title: "End-to-End Testing Runs", desc: "Perform functional checks, evaluate interface load speeds, and check database queries." },
    { num: "06", title: "Launch & Metric Auditing", desc: "Verify domain routings, set up user access permissions, and calibrate backups." }
  ];

  const highlights = [
    "Average deployment speed: deliver functioning internal apps in under 15 days.",
    "Decoupled custom logic layers ensuring clean scalability options.",
    "Integrated database encryption and secure authentication loops.",
    "Flexible backend integrations supporting standard REST/GraphQL APIs."
  ];

  return (
    <div className="bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans text-left">
      
      {/* Wave Decorative Orbs */}
      <div className="absolute right-[-10%] top-[5%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-primary/10 to-primary/15 blur-[130px] pointer-events-none z-0"></div>

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-24 pt-28 pb-10 relative z-10 max-w-7xl mx-auto">
        <div className="space-y-8 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block">EXPERTISE / RETOOL & LOW-CODE</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-text-primary leading-[1.08]">
            Low-code / No-code Integrations
          </h1>
          <p className="text-sm sm:text-base text-text-secondary font-light max-w-xl leading-relaxed">
            We build internal tools, database admin dashboards, and custom client portals rapidly by integrating Retool, FlutterFlow, and Bubble builders with secure serverless backends.
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
          <AnimatedHeroVisual icon={Layers} title="Rapid build" eyebrow="Low-code stack" scene="design" />
        </div>

        {/* Scroll Indicator */}
        <div className="flex items-center space-x-3 text-xs text-text-secondary font-light font-mono opacity-80 pt-12 lg:pt-0">
          <div className="w-8 h-8 rounded-full border border-border/20 flex items-center justify-center animate-bounce">
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
          <span>Scroll to discover more</span>
        </div>
      </section>

      {/* CORE CAPABILITIES */}
      <section className="py-16 px-6 md:px-12 lg:px-24 border-t border-border/10 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">Rapid Build Focus</h2>
            <p className="text-sm text-text-secondary font-light mt-4 leading-relaxed">
              We leverage builder interfaces to speed up project scoping. We write custom API extensions to keep systems scaling cleanly without vendor lock-ins.
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

      {/* PROCESS STEPS */}
      <section className="py-16 px-6 md:px-12 lg:px-24 border-t border-border/10 relative z-10 max-w-7xl mx-auto">
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">The Integration Journey</h2>
            <p className="text-sm text-text-secondary font-light mt-2 max-w-md">
              A systematic overview of how we configure low-code layers and write custom microservices.
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

      {/* GUARANTEES CHECKLIST & CTA */}
      <section className="py-20 px-6 md:px-12 lg:px-24 border-t border-border/10 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-light tracking-tight">Delivery Benchmarks</h2>
            <p className="text-sm text-text-secondary font-light leading-relaxed">
              We operate under standard testing guidelines. All Retool dashboards and custom API bridges undergo integration checks and data validations before launch.
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
              <h3 className="text-xl font-bold text-text-primary">Need a Retool panel built?</h3>
              <p className="text-xs text-text-secondary font-light">
                Connect with our low-code engineers to review builder platforms, map databases, and schedule prototyping runs.
              </p>
              <a 
href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 border border-primary bg-primary hover:bg-transparent text-text-primary hover:text-primary rounded-full py-4 text-sm font-semibold transition-all duration-300 group"
              >
                <span>Request Custom Retool Build</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}








