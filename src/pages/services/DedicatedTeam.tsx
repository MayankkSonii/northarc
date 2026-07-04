import React from "react";
import { motion } from "motion/react";
import { staggerContainer, staggerItem, fadeUpVariant, viewportOnce } from "../../lib/animations";
import { AnimatedHeroVisual } from "../../components/AnimatedHeroVisual";
import {
  ArrowRight,
  ArrowDown,
  Check,
  Briefcase,
  Users,
  Settings,
  ShieldCheck,
  CheckCircle,
  HelpCircle
} from "lucide-react";

export default function DedicatedTeam() {
  const models = [
    {
      title: "Staff Augmentation",
      desc: "Integrate individual senior engineers directly into your local development loop. You manage the daily task load; we manage the administrative and HR overhead.",
      bullets: [
        "Rapid placement (average under 10 days)",
        "Direct control of engineering tasks",
        "Cost-effective scaling for active workloads",
        "Decoupled resource billing models"
      ]
    },
    {
      title: "Dedicated Team",
      desc: "Deploy an autonomous, full-cycle product squad consisting of developers, QA engineers, DevOps specialists, and a project manager. We manage the delivery roadmap.",
      bullets: [
        "Fully self-managed agile team structures",
        "Coordinated project management and delivery pipelines",
        "Integrated quality assurance checks and deployment loops",
        "Continuous progress audits and status reporting"
      ]
    }
  ];

  const benefits = [
    { num: "01", title: "Vetted Senior Talent", desc: "Access developers with verified technical expertise and clean code backgrounds." },
    { num: "02", title: "Rapid Engineering Deployments", desc: "Deploy resources and set up workspace credentials in under 10 working days." },
    { num: "03", title: "Complete IP & Code Ownership", desc: "100% intellectual property rights transfered upon codebase release." },
    { num: "04", title: "Flexible Resource Sizing", desc: "Scale engineer counts up or down on demand matching active business sprints." },
    { num: "05", title: "Integrated Security & NDAs", desc: "Rigorous NDAs and SOC-2 data compliance protocols protecting corporate assets." },
    { num: "06", title: "Daily Scrum Standups", desc: "Regular synchronizations, backlog grooming, and weekly status reviews." },
    { num: "07", title: "Managed HR & Admin Support", desc: "We coordinate payroll, workplace setups, and employee retention loops." },
    { num: "08", title: "Redundancy Safeguards", desc: "Built-in developer backup loops ensuring continuity in coding operations." },
    { num: "09", title: "Dedicated SLA Support", desc: "Continuous developer evaluation audits and pipeline scaling support." }
  ];

  return (
    <div className="bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans text-left">

      {/* Decorative Gradient Waves */}
      <div className="absolute right-[-10%] top-[5%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-primary/10 to-primary/15 blur-[130px] pointer-events-none z-0"></div>
      <div className="absolute left-[-8%] bottom-[15%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-secondary/8 to-glow/5 blur-[120px] pointer-events-none z-0 animate-float-delay"></div>

      {/* 1. HERO SECTION */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-6 md:px-12 lg:px-24 pt-28 pb-10 relative z-10 max-w-7xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 max-w-4xl lg:col-span-7">
          <motion.span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block" variants={staggerItem}>SERVICES / TEAM AUGMENTATION</motion.span>
          <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-text-primary leading-[1.08]" variants={staggerItem}>
            Dedicated Teams & Staff Augmentation
          </motion.h1>
          <motion.p className="text-sm sm:text-base text-text-secondary font-light max-w-xl leading-relaxed" variants={staggerItem}>
            Hire the right people. Control your project. Quickly ramp up development velocity without the recruiting overhead.
          </motion.p>
          <motion.div className="pt-4" variants={staggerItem}>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 border border-border/30 text-text-primary hover:bg-white hover:text-[#070b13] hover:border-border rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-300 group"
            >
              <span>Get in touch</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
          <motion.div className="flex items-center space-x-3 text-xs text-text-secondary font-light font-mono opacity-80 pt-12 lg:pt-0" variants={staggerItem}>
            <div className="w-8 h-8 rounded-full border border-border/20 flex items-center justify-center animate-bounce">
              <ArrowDown className="w-3.5 h-3.5" />
            </div>
            <span>Scroll to discover more</span>
          </motion.div>
        </motion.div>
        <div className="lg:col-span-5">
          <AnimatedHeroVisual icon={Users} title="Team velocity" eyebrow="Talent system" scene="team" />
        </div>
      </section>

      {/* 2. COLLABORATION OPTIONS */}
      <section className="section-padding-sm px-6 md:px-12 lg:px-24 border-t border-border/10 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 section-gap-sm">
          <div className="lg:col-span-4">
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">Flexible Collaboration Models</h2>
            <p className="text-sm text-text-secondary font-light mt-4 leading-relaxed">
              We offer two distinct engagement options to align with your internal workload demands, workspace protocols, and project scopes.
            </p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 content-gap lg:pl-12 border-l border-border/10">
            {models.map((model, i) => (
              <motion.div key={i} variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce} className="space-y-6">
                <h3 className="text-xl font-bold text-primary">{model.title}</h3>
                <p className="text-sm sm:text-sm text-text-secondary font-light leading-relaxed">{model.desc}</p>
                <ul className="space-y-3.5">
                  {model.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5 text-xs text-text-secondary font-light">
                      <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 9 CORE BENEFITS (01-09) */}
      <section className="section-padding-sm px-6 md:px-12 lg:px-24 border-t border-border/10 relative z-10 max-w-7xl mx-auto">
        <div className="content-gap">
          <div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">Key Value Propositions</h2>
            <p className="text-sm text-text-secondary font-light mt-2 max-w-md">
              Why leading enterprises partner with NorthArc to scale their technical teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 section-gap-sm">
            {benefits.map((item, i) => (
              <motion.div key={i} variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce} className="pt-6 border-t border-border/10 space-y-4 text-left">
                <span className="text-xs font-mono font-bold text-primary block">{item.num}</span>
                <h4 className="text-lg font-bold text-text-primary">{item.title}</h4>
                <p className="text-xs sm:text-sm text-text-secondary font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FOOTER CALL-TO-ACTION */}
      <section className="py-20 px-6 md:px-12 lg:px-24 border-t border-border/10 relative z-10 max-w-7xl mx-auto text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight leading-tight">
            Ready to Accelerate Your Development?
          </h2>
          <p className="text-sm sm:text-base text-text-secondary font-light max-w-xl mx-auto leading-relaxed">
            Schedule a scoping call with our solutions team to match your required technology stacks and developer capabilities.
          </p>
          <div className="pt-4">
            <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce} className="inline-flex items-center gap-2 border border-primary bg-primary hover:bg-transparent text-text-primary hover:text-primary rounded-full px-10 py-4 text-sm font-semibold transition-all duration-300 group">
              <span>Build Your Team</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
