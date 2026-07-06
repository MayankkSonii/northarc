import React from "react";
import { motion } from "motion/react";
import { staggerContainer, staggerItem, fadeUpVariant, viewportOnce } from "../../lib/animations";
import { AnimatedHeroVisual } from "../../components/AnimatedHeroVisual";
import { useSEO, breadcrumbJsonLd, SITE_URL, SITE_NAME } from "../../lib/seo";
import {
  Check,
  ArrowRight,
  ArrowDown,
  Database,
  LineChart,
  Layers,
  Cpu
} from "lucide-react";

export default function BigData() {
  useSEO({
    title: "Big Data & Data Science Engineering",
    description:
      "NorthArc engineers petabyte-scale data lakes, real-time pipelines, and analytics that turn raw data into business intelligence and faster, smarter decisions.",
    path: "/expertise/big-data",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Big Data & Data Science Engineering",
        name: "Big Data & Data Science Engineering",
        description:
          "Data lake engineering, real-time stream processing, data science analytics, and ML feature stores that turn enterprise data into measurable business intelligence.",
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        areaServed: "Worldwide",
        url: `${SITE_URL}/expertise/big-data`,
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Big Data & Data Science", path: "/expertise/big-data" },
      ]),
    ],
  });

  const capabilities = [
    { icon: Database, title: "Data Lake Engineering", desc: "Build petabyte-scale data lakes, warehouse schemas, and parquet storage configurations." },
    { icon: LineChart, title: "Data Science Analytics", desc: "Develop regression arrays, feature correlation matrices, and customized statistical profiles." },
    { icon: Layers, title: "Real-time Processing", desc: "Configure Apache Spark, Flink, and Kafka stream processing loops for sub-second dashboards." },
    { icon: Cpu, title: "ML Feature Store Integrations", desc: "Structure centralized feature stores to feed production models with latency tracking." }
  ];

  const processSteps = [
    { num: "01", title: "Data Audit & Assessment", desc: "Catalog existing databases, inspect schema bottlenecks, and estimate compute costs." },
    { num: "02", title: "Warehouse Architecture Design", desc: "Draft star schemas, partition keys, private network security limits, and replication models." },
    { num: "03", title: "Ingestion Pipeline Automation", desc: "Develop ETL/ELT pipelines, integrate dbt validation nodes, and configure automated cron runs." },
    { num: "04", title: "Stream Integration", desc: "Deploy Kafka nodes, set up sliding window statistics, and configure alerts loops." },
    { num: "05", title: "Model Features Setup", desc: "Structure offline/online data feature stores to feed active machine learning endpoints." },
    { num: "06", title: "Dashboard Calibrations", desc: "Deploy analytical dashboards, establish read replicas, and set up daily backup rules." }
  ];

  const highlights = [
    "ETL stream ingestion optimized to handle over 100,000 transactions per second.",
    "Integrated SOC-2 security compliance for enterprise database storage.",
    "Decoupled analytics infrastructure minimizing database processing overhead.",
    "Centralized metadata catalogs mapping data paths from source to dashboard."
  ];

  return (
    <div className="bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans text-left">

      {/* Wave Decorative Orbs */}
      <div className="absolute right-[-10%] top-[5%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-primary/10 to-primary/15 blur-[130px] pointer-events-none z-0"></div>

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-24 pt-28 pb-10 relative z-10 max-w-7xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block" variants={staggerItem}>EXPERTISE / BIG DATA</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-text-primary leading-[1.08]" variants={staggerItem}>
            Big Data & Data Science
          </h1>
          <p className="text-sm sm:text-base text-text-secondary font-light max-w-xl leading-relaxed" variants={staggerItem}>
            We engineer petabyte-scale data lakes, real-time pipelines, and analytics dashboards that turn scattered raw data into trusted business intelligence your teams can act on in seconds.
          </p>
          <div className="pt-4" variants={staggerItem}>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 border border-border/30 text-text-primary hover:bg-bg hover:text-text-primary hover:border-border rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-300 group"
            >
              <span>Get in touch</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
        <div className="pointer-events-none absolute right-6 top-[calc(50%+40px)] hidden w-[42%] -translate-y-1/2 lg:block">
          <AnimatedHeroVisual icon={Database} title="Data intelligence" eyebrow="Analytics engine" scene="data" />
        </div>

        {/* Scroll Indicator */}
        <div className="flex items-center space-x-3 text-xs text-text-secondary font-light font-mono opacity-80 pt-12 lg:pt-0" variants={staggerItem}>
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
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce}>Analytics Focus</h2>
            <p className="text-sm text-text-secondary font-light mt-4 leading-relaxed" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              We focus on data pipeline safety and structural scalability. We build automated data cleanings loops to ensure accurate downstream analytics.
            </p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:pl-12 border-l border-border/10">
            {capabilities.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={i} variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce} className="space-y-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-text-secondary font-light leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS STEPS */}
      <section className="py-16 px-6 md:px-12 lg:px-24 border-t border-border/10 relative z-10 max-w-7xl mx-auto">
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce}>The Data Journey</h2>
            <p className="text-sm text-text-secondary font-light mt-2 max-w-md" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              A systematic overview of how we align raw data points to real-time analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {processSteps.map((step, i) => (
              <motion.div key={i} variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce} className="pt-6 border-t border-border/10 space-y-4 text-left">
                <span className="text-xs font-mono font-bold text-primary block">{step.num}</span>
                <h4 className="text-lg font-bold text-text-primary">{step.title}</h4>
                <p className="text-xs sm:text-sm text-text-secondary font-light leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEES CHECKLIST & CTA */}
      <section className="py-20 px-6 md:px-12 lg:px-24 border-t border-border/10 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-light tracking-tight" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce}>Performance Benchmarks</h2>
            <p className="text-sm text-text-secondary font-light leading-relaxed" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              We leverage modern analytics frameworks. All database pipelines undergo latency tests and schema optimizations before final release.
            </p>
            <div className="space-y-4">
              {highlights.map((h, i) => (
                <motion.div key={i} variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce} className="flex items-start space-x-3 text-sm">
                  <div className="p-1 rounded bg-primary/15 text-primary mt-0.5 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-text-secondary font-light leading-relaxed">{h}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="max-w-md w-full rounded-3xl bg-surface/50 border border-border/10 p-8 text-center space-y-6" variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <h3 className="text-xl font-bold text-text-primary">Have data pipelines to optimize?</h3>
              <p className="text-xs text-text-secondary font-light">
                Connect with our data engineers to review warehouse options, map schemas, and schedule project kickoffs.
              </p>
              <a
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 border border-primary bg-primary hover:bg-transparent text-text-primary hover:text-primary rounded-full py-4 text-sm font-semibold transition-all duration-300 group"
              >
                <span>Request Data Audit</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}








