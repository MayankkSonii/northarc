import React from "react";
import ExpertiseLayout from "../../components/ExpertiseLayout";
import type { PageContent } from "../../components/pageLayoutTypes";
import { useSEO, breadcrumbJsonLd, SITE_URL, SITE_NAME } from "../../lib/seo";
import { Database, LineChart, Layers, Cpu } from "lucide-react";

export default function BigData() {
  useSEO({
    title: "AI Development Services | Big Data, Analytics & Machine Learning",
    description:
      "NorthArc delivers AI development services for big data and analytics — machine learning development company building petabyte-scale data lakes, real-time pipelines, and AI automation solutions for businesses that turn raw data into measurable business intelligence.",
    path: "/expertise/big-data",
    keywords:
      "AI Development Services, AI Software Development, Machine Learning, AI Analytics, Big Data, Machine Learning Development Company, AI Automation Solutions for Businesses, Custom AI Development Services for Enterprises, Data Science Engineering",
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

  const content: PageContent = {
    eyebrow: "EXPERTISE / BIG DATA",
    title: "Big Data & Data Science",
    intro:
      "We engineer petabyte-scale data lakes, real-time pipelines, and analytics dashboards that turn scattered raw data into trusted business intelligence your teams can act on in seconds.",
    heroIcon: Database,
    heroScene: "data",
    heroTitle: "Data intelligence",
    accent: "#0EA5E9",
    capsTitle: "Analytics Focus",
    capsIntro:
      "We focus on data pipeline safety and structural scalability. We build automated data cleanings loops to ensure accurate downstream analytics.",
    capabilities: [
      { icon: Database, title: "Data Lake Engineering", desc: "Build petabyte-scale data lakes, warehouse schemas, and parquet storage configurations." },
      { icon: LineChart, title: "Data Science Analytics", desc: "Develop regression arrays, feature correlation matrices, and customized statistical profiles." },
      { icon: Layers, title: "Real-time Processing", desc: "Configure Apache Spark, Flink, and Kafka stream processing loops for sub-second dashboards." },
      { icon: Cpu, title: "ML Feature Store Integrations", desc: "Structure centralized feature stores to feed production models with latency tracking." },
    ],
    processTitle: "The Data Journey",
    processIntro:
      "A systematic overview of how we align raw data points to real-time analytics.",
    process: [
      { num: "01", title: "Data Audit & Assessment", desc: "Catalog existing databases, inspect schema bottlenecks, and estimate compute costs." },
      { num: "02", title: "Warehouse Architecture Design", desc: "Draft star schemas, partition keys, private network security limits, and replication models." },
      { num: "03", title: "Ingestion Pipeline Automation", desc: "Develop ETL/ELT pipelines, integrate dbt validation nodes, and configure automated cron runs." },
      { num: "04", title: "Stream Integration", desc: "Deploy Kafka nodes, set up sliding window statistics, and configure alerts loops." },
      { num: "05", title: "Model Features Setup", desc: "Structure offline/online data feature stores to feed active machine learning endpoints." },
      { num: "06", title: "Dashboard Calibrations", desc: "Deploy analytical dashboards, establish read replicas, and set up daily backup rules." },
    ],
    proofTitle: "Performance Benchmarks",
    proofIntro:
      "We leverage modern analytics frameworks. All database pipelines undergo latency tests and schema optimizations before final release.",
    highlights: [
      "ETL stream ingestion optimized to handle over 100,000 transactions per second.",
      "Integrated SOC-2 security compliance for enterprise database storage.",
      "Decoupled analytics infrastructure minimizing database processing overhead.",
      "Centralized metadata catalogs mapping data paths from source to dashboard.",
    ],
    ctaTitle: "Have data pipelines to optimize?",
    ctaIntro:
      "Connect with our data engineers to review warehouse options, map schemas, and schedule project kickoffs.",
    ctaLabel: "Request Data Audit",
  };

  return <ExpertiseLayout content={content} />;
}
