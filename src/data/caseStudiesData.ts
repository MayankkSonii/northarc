import React from "react";
import { LineChart, BarChart3, CheckCircle, Database, TrendingUp, Zap, Shield } from "lucide-react";

export interface Metric {
  label: string;
  value: string;
}

export interface Section {
  type: "h2" | "h3" | "p" | "ul" | "ol" | "quote" | "callout" | "metrics-grid";
  content?: string;
  items?: string[];
  metrics?: Metric[];
}

export interface CaseStudy {
  id: number;
  slug: string;
  client: string;
  industry: string;
  category: string[];
  title: string;
  excerpt: string;
  metrics: Metric[];
  icon: React.ElementType;
  accentColor: string;
  featured?: boolean;
  challenge: string;
  solution: string;
  sections: Section[];
  technologies: string[];
  outcome: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    slug: "amar-ujala-unified-analytics",
    client: "Amar Ujala",
    industry: "Media & Publishing",
    category: ["GA4", "Analytics"],
    title: "95% Data Accuracy & 75% Analytics Adoption Through Unified Analytics",
    excerpt:
      "A leading Hindi news publisher struggled with fragmented analytics across web and app properties. We implemented a unified GA4 measurement framework that gave their team reliable, actionable data.",
    metrics: [
      { label: "Data Accuracy", value: "95%" },
      { label: "Analytics Adoption", value: "75%" },
      { label: "Implementation Time", value: "6 wks" },
    ],
    icon: LineChart,
    accentColor: "#10B981",
    featured: true,
    challenge:
      "Amar Ujala, one of India's largest Hindi-language digital news platforms with over 80 million monthly active users, was operating in the dark. Their analytics data was scattered across three different tracking implementations — a legacy Universal Analytics setup, a mobile SDK with inconsistent event naming, and a third-party content analytics tool. Each system told a different story, and none of them agreed.",
    solution:
      "We designed and deployed a unified GA4 measurement framework that consolidated all properties into a single source of truth. The project followed three phases: audit and alignment, implementation, and training.",
    sections: [
      {
        type: "h2",
        content: "The Problem: Three Tools, Zero Clarity",
      },
      {
        type: "p",
        content:
          "When the Amar Ujala product team wanted to understand how readers moved between their homepage, article pages, and video content, they had to manually reconcile three incompatible reports. Discrepancies of 30–40% between systems were common. Critical decisions about content strategy, headline testing, and push notification timing were being made on unreliable data.",
      },
      {
        type: "ul",
        items: [
          "Web tracking via Universal Analytics with custom dimensions that had accumulated years of technical debt",
          "iOS and Android apps tracked by a legacy SDK that hadn't been updated for modern app event models",
          "A third-party content analytics platform with its own session definitions and engagement metrics",
          "No single team member who understood all three systems end-to-end",
        ],
      },
      {
        type: "h2",
        content: "Our Approach: Measure Once, Trust Forever",
      },
      {
        type: "p",
        content:
          "We began with a two-week measurement audit that mapped every user interaction across all properties to a single, unified event taxonomy. We interviewed 14 stakeholders across editorial, product, and marketing to understand what questions they actually needed answered — not just what data happened to be collected.",
      },
      {
        type: "h3",
        content: "Phase 1: Measurement Strategy & Taxonomy Design",
      },
      {
        type: "p",
        content:
          "We created a master measurement plan documenting every event, parameter, and dimension that would be collected — along with clear definitions of what each one means and who owns it. This document became the contract between the analytics team and the product and engineering teams.",
      },
      {
        type: "h3",
        content: "Phase 2: GA4 Implementation via Google Tag Manager",
      },
      {
        type: "p",
        content:
          "Rather than hard-coding analytics calls into the application, we instrumented everything through a data layer and GTM container. This gave the analytics team control over measurement without requiring engineering involvement for every change. Key implementations included:",
      },
      {
        type: "ul",
        items: [
          "Scroll depth tracking calibrated to editorial content length (not fixed percentages)",
          "Article engagement time using active engagement signals, not passive tab visibility",
          "Video play, milestone, and completion events for their growing video library",
          "Cross-domain linking between the main domain and regional subdomains",
          "User ID implementation for logged-in reader journey analysis",
        ],
      },
      {
        type: "h3",
        content: "Phase 3: Team Enablement & Analytics Culture",
      },
      {
        type: "p",
        content:
          "Technology alone doesn't drive adoption. We ran eight hands-on training workshops for editorial managers, product leads, and marketing analysts — teaching them not just how to read GA4 reports, but how to formulate the right questions and build explorations that answer them.",
      },
      {
        type: "quote",
        content:
          "\"For the first time, our editorial and product teams are looking at the same numbers and having the same conversation. That sounds simple, but it changed everything about how we work.\" — VP Product, Amar Ujala Digital",
      },
      {
        type: "h2",
        content: "Results That Changed How the Business Works",
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "Data Accuracy vs. Ground Truth", value: "95%" },
          { label: "Team Members Using Analytics Weekly", value: "75%" },
          { label: "Reduction in Time-to-Insight", value: "60%" },
          { label: "Events Tracked (from 12)", value: "94" },
          { label: "Implementation Duration", value: "6 weeks" },
          { label: "Stakeholder Satisfaction Score", value: "4.8/5" },
        ],
      },
      {
        type: "p",
        content:
          "Within three months of go-live, the editorial team had used GA4 exploration data to identify that articles published between 7–9am drove 3× more reader return visits within 24 hours than those published later. This insight directly informed their content scheduling strategy, increasing daily active reader return rates by 18%.",
      },
      {
        type: "callout",
        content:
          "Key Insight: The most impactful measurement work isn't about collecting more data — it's about making the data you do collect so trustworthy that teams will actually base decisions on it.",
      },
    ],
    technologies: ["GA4", "Google Tag Manager", "BigQuery", "Looker Studio", "Firebase SDK"],
    outcome:
      "Amar Ujala now operates with a single, trusted analytics framework. Their editorial team makes content scheduling decisions based on engagement data, their product team runs A/B tests informed by reliable funnel analysis, and their marketing team can accurately attribute reader acquisition to specific campaigns.",
  },
  {
    id: 2,
    slug: "icici-lombard-gtm-consolidation",
    client: "ICICI Lombard",
    industry: "Insurance & Finance",
    category: ["GTM", "Analytics"],
    title: "GTM Consolidation: Enhanced Website Performance & Reduced Container Size",
    excerpt:
      "India's leading private insurer had a bloated Google Tag Manager container causing page slowdowns. Our GTM consolidation project reduced container size significantly while streamlining the entire user journey.",
    metrics: [
      { label: "Container Size Reduction", value: "60%" },
      { label: "Page Load Improvement", value: "40%" },
      { label: "Tags Consolidated", value: "80+" },
    ],
    icon: Zap,
    accentColor: "#6366F1",
    featured: true,
    challenge:
      "ICICI Lombard's GTM container had grown organically over several years of team changes, agency handoffs, and campaign requirements. What started as a clean 20-tag container had ballooned to 140+ tags, many of which were duplicates, broken, or redundant. Page load times on critical conversion pages had slowed measurably, and the compliance team was increasingly concerned about unvetted scripts firing on sensitive financial pages.",
    solution:
      "We conducted a complete GTM audit and restructuring project — inventorying every tag, trigger, and variable, eliminating redundancy, and rebuilding the container with a clean, maintainable architecture.",
    sections: [
      {
        type: "h2",
        content: "The Hidden Cost of Tag Sprawl",
      },
      {
        type: "p",
        content:
          "Most organisations don't notice their GTM container becoming a problem until it's a serious one. Tags accumulate gradually — a campaign here, an analytics tool there, a heat map script that 'we'll remove after the test.' Over time, these additions create a container that is slow, unreliable, and practically impossible to audit.",
      },
      {
        type: "ul",
        items: [
          "143 tags in the container, of which 67 were firing on the homepage alone",
          "12 different third-party scripts loading on the critical policy purchase journey",
          "Duplicate conversion tracking sending inflated numbers to Google Ads",
          "No documentation for 80+ tags — their purpose and owners unknown",
          "Core Web Vitals score of 42/100 on mobile — well below the 75+ threshold",
        ],
      },
      {
        type: "h2",
        content: "The Audit Process",
      },
      {
        type: "p",
        content:
          "We began with a comprehensive tag inventory — using GTM's built-in export, the Tag Assistant tool, and browser network analysis to capture every script firing on every key page. Each tag was classified by: purpose, owner, firing frequency, data collected, and whether it was still needed.",
      },
      {
        type: "h3",
        content: "Tag Classification Matrix",
      },
      {
        type: "ul",
        items: [
          "Active & Essential: Tags that were current, working, and business-critical",
          "Active but Redundant: Tags duplicating data already collected by another tool",
          "Inactive: Tags with broken triggers or endpoints that had stopped working",
          "Orphaned Campaign Tags: Tags for campaigns that had ended months or years ago",
          "Unknown: Tags with no documentation or identifiable owner",
        ],
      },
      {
        type: "quote",
        content:
          "\"We found a retargeting pixel from a vendor relationship that had ended 18 months earlier — still firing on every page, still sending user data to a third party. That was a wake-up call.\" — Head of Digital Marketing, ICICI Lombard",
      },
      {
        type: "h2",
        content: "The Rebuild: Architecture Over Accumulation",
      },
      {
        type: "p",
        content:
          "Rather than simply pruning the existing container, we designed and implemented a new container architecture from scratch — with governance built in from day one. Key design principles:",
      },
      {
        type: "ul",
        items: [
          "Every tag requires a documented owner, purpose, and review date before publishing",
          "Data layer-driven approach: all measurement data flows through a structured data layer, not page-scraping",
          "Tag sequencing to ensure the data layer is populated before any tags fire",
          "Separate workspaces for development, staging, and production with enforced approval workflows",
          "Consent management integration: all non-essential tags respect user consent status",
        ],
      },
      {
        type: "h2",
        content: "Performance & Compliance Results",
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "Container Size Reduction", value: "60%" },
          { label: "Page Load Time Improvement", value: "40%" },
          { label: "Tags Removed or Consolidated", value: "83" },
          { label: "Third-party Scripts on Checkout", value: "3 (from 12)" },
          { label: "Core Web Vitals Score (Mobile)", value: "78/100" },
          { label: "Compliance Issues Resolved", value: "7" },
        ],
      },
      {
        type: "callout",
        content:
          "The 40% improvement in page load time on the policy purchase journey directly contributed to a measurable increase in checkout completion rate — validating that tag hygiene is not just a technical concern, it is a business performance concern.",
      },
    ],
    technologies: ["Google Tag Manager", "Google Analytics 4", "Consent Management Platform", "Chrome DevTools", "WebPageTest"],
    outcome:
      "ICICI Lombard's new GTM container is leaner, faster, and fully documented. The compliance team can now audit exactly what data is being collected and by whom. The digital team has a governance process that prevents container sprawl from recurring.",
  },
  {
    id: 3,
    slug: "dk-score-ga4-accuracy",
    client: "DK Score",
    industry: "EdTech",
    category: ["GA4", "Tracking"],
    title: "99% GA4 Data Accuracy While Reducing Developer Dependency by 90%",
    excerpt:
      "DK Score's engineering team was overwhelmed with analytics change requests. We built a serverless GTM setup that lets their analytics team move independently — achieving near-perfect data accuracy.",
    metrics: [
      { label: "GA4 Data Accuracy", value: "99%" },
      { label: "Developer Dependency", value: "−90%" },
      { label: "Time-to-Insight", value: "2× faster" },
    ],
    icon: CheckCircle,
    accentColor: "#F59E0B",
    challenge:
      "DK Score, a fast-growing competitive exam preparation platform, had a classic analytics bottleneck: every tracking requirement had to go through their engineering team. With a backlog of 3+ months and a product roadmap that was constantly shifting, their analytics team was effectively working blind — unable to track new features, campaigns, or funnels without waiting for a development sprint.",
    solution:
      "We implemented a data layer-first architecture with Google Tag Manager, designed specifically to allow the analytics team to deploy and modify tracking independently — without writing a single line of application code.",
    sections: [
      {
        type: "h2",
        content: "The Dev Dependency Trap",
      },
      {
        type: "p",
        content:
          "This is one of the most common analytics problems in fast-growing startups. Engineering capacity is finite and expensive. Product features compete with analytics instrumentation for sprint slots. The analytics team's data needs are always lower priority than shipping features — until something goes wrong and leadership suddenly wants to know why conversion dropped 20% last Tuesday.",
      },
      {
        type: "ul",
        items: [
          "Average wait time for new tracking implementation: 11 weeks",
          "Analytics team could only react to data, never proactively measure new initiatives",
          "GA4 setup was missing events for 60% of key user interactions",
          "Campaign performance was largely measured by proxy metrics, not actual conversions",
          "Data discrepancies between GA4 and their CRM ranged from 15–35%",
        ],
      },
      {
        type: "h2",
        content: "The Solution: A Self-Sufficient Measurement Stack",
      },
      {
        type: "p",
        content:
          "The key insight driving our solution was separating two distinct concerns: data exposure (engineering's job) and data collection (analytics team's job). Engineering's only responsibility would be maintaining a clean, well-documented data layer. Everything else — tags, triggers, variables, GA4 event configuration — would be owned by the analytics team in GTM.",
      },
      {
        type: "h3",
        content: "Phase 1: Data Layer Architecture",
      },
      {
        type: "p",
        content:
          "We worked with DK Score's engineering team to design a comprehensive data layer specification covering all key user interactions: course enrollment, lesson completion, quiz attempts, subscription events, and user profile updates. The data layer was designed to be forward-compatible — structured in a way that new events could be added without breaking existing tracking.",
      },
      {
        type: "h3",
        content: "Phase 2: GTM Container Rebuild",
      },
      {
        type: "p",
        content:
          "With the data layer as the foundation, we rebuilt their GTM container from scratch — creating a scalable variable architecture, reusable trigger templates, and a GA4 event configuration that covered all 94 key interactions across web and app.",
      },
      {
        type: "h3",
        content: "Phase 3: Validation Framework",
      },
      {
        type: "p",
        content:
          "Accuracy doesn't happen by accident. We implemented a systematic QA process: automated data layer testing in the staging environment, GA4 DebugView validation for every event, and a weekly data accuracy audit comparing GA4 against their server-side logs.",
      },
      {
        type: "quote",
        content:
          "\"We went from waiting 11 weeks to track something, to deploying new event tracking the same day we decide we need it. That's not an exaggeration — it's literally changed how our product team thinks about measurement.\" — Analytics Lead, DK Score",
      },
      {
        type: "h2",
        content: "Outcomes",
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "GA4 Data Accuracy vs. Server Logs", value: "99%" },
          { label: "Reduction in Engineering Tickets", value: "90%" },
          { label: "Events Tracked (from 23)", value: "94" },
          { label: "Average Tracking Deployment Time", value: "1 day" },
          { label: "Campaign Attribution Accuracy", value: "97%" },
          { label: "CRM-GA4 Data Discrepancy", value: "<2%" },
        ],
      },
      {
        type: "callout",
        content:
          "The true ROI of this project wasn't just speed — it was the qualitative shift in how the analytics and product teams collaborate. When analytics can move at the speed of product, measurement becomes part of the culture, not an afterthought.",
      },
    ],
    technologies: ["Google Analytics 4", "Google Tag Manager", "Data Layer", "BigQuery", "Firebase Analytics"],
    outcome:
      "DK Score's analytics team now operates as a fully self-sufficient function. They ship tracking changes daily, run measurement experiments independently, and provide the product team with reliable data that directly informs roadmap decisions.",
  },
  {
    id: 4,
    slug: "abplive-analytics-infrastructure",
    client: "ABP Live",
    industry: "Digital Media",
    category: ["Analytics", "BigQuery"],
    title: "Scalable Analytics Infrastructure for 50M+ Monthly Visitors",
    excerpt:
      "ABP Live, one of India's largest digital news platforms, needed an analytics backbone capable of handling massive traffic spikes. We architected a BigQuery-powered data pipeline with real-time reporting.",
    metrics: [
      { label: "Monthly Visitors Tracked", value: "50M+" },
      { label: "Data Latency", value: "<2 min" },
      { label: "Cost Reduction", value: "35%" },
    ],
    icon: Database,
    accentColor: "#EC4899",
    challenge:
      "ABP Live handles some of the largest traffic surges in Indian digital media — breaking news events can spike concurrent users by 10–15× within minutes. Their existing analytics infrastructure simply couldn't keep up, leading to sampling in GA4 free tier, delayed insights during exactly the moments when editorial teams needed them most, and rapidly growing BigQuery costs.",
    solution:
      "We redesigned their entire analytics data pipeline — from GA4 collection through BigQuery processing to Looker Studio delivery — optimising for both scale and cost efficiency.",
    sections: [
      {
        type: "h2",
        content: "The Scale Problem in Digital News",
      },
      {
        type: "p",
        content:
          "News analytics has a unique challenge: the moments when you most need accurate, real-time data are precisely the moments when your infrastructure is under maximum stress. During a breaking news event, editorial teams need to know which articles are holding attention vs. which are bouncing readers — so they can prioritise updates, push notifications, and related content.",
      },
      {
        type: "h2",
        content: "Architecture: Built for Spikes",
      },
      {
        type: "p",
        content:
          "We redesigned the pipeline around three core principles: serverless where possible, partitioned and clustered BigQuery tables for cost efficiency, and streaming exports for near-real-time operational reporting.",
      },
      {
        type: "ul",
        items: [
          "GA4 BigQuery streaming export configured for sub-2-minute data freshness",
          "Partitioned tables by date with clustering on article ID and traffic source for query efficiency",
          "Scheduled queries for pre-aggregated hourly and daily summary tables",
          "Looker Studio connected to summary tables (not raw exports) for fast dashboard loads",
          "Alert system for traffic anomaly detection using BigQuery ML",
        ],
      },
      {
        type: "h2",
        content: "Cost Optimisation Without Compromising Insights",
      },
      {
        type: "p",
        content:
          "BigQuery costs at scale can spiral quickly if tables aren't designed thoughtfully. We reduced their monthly BigQuery spend by 35% through a combination of table design, query optimisation, and a tiered data retention policy.",
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "Monthly Unique Visitors Tracked", value: "50M+" },
          { label: "Data Freshness (Streaming)", value: "<2 min" },
          { label: "BigQuery Cost Reduction", value: "35%" },
          { label: "Dashboard Load Time", value: "<4 sec" },
          { label: "Peak Traffic Headroom", value: "20× baseline" },
          { label: "Data Sampling Incidents", value: "0" },
        ],
      },
      {
        type: "quote",
        content:
          "\"During the election results coverage, our editorial team was watching the real-time dashboard to decide which state updates to push to notifications. That wasn't possible before — we would have been flying blind.\" — Head of Digital, ABP Live",
      },
      {
        type: "callout",
        content:
          "The 35% cost reduction came not from collecting less data, but from collecting the right data more efficiently. Proper table design and partitioning strategies can dramatically reduce BigQuery query costs at scale.",
      },
    ],
    technologies: ["Google Analytics 4", "BigQuery", "BigQuery ML", "Looker Studio", "Cloud Pub/Sub", "Google Tag Manager"],
    outcome:
      "ABP Live now has an analytics infrastructure that scales with their audience — no more sampling, no more delayed insights during peak events, and meaningfully lower cloud costs. Their editorial team uses real-time dashboards to make content decisions during breaking news coverage.",
  },
  {
    id: 5,
    slug: "ecommerce-ga4-migration",
    client: "Leading E-commerce Brand",
    industry: "Retail & E-commerce",
    category: ["GA4", "CRO"],
    title: "GA4 Migration & Conversion Rate Uplift via Enhanced Measurement",
    excerpt:
      "After a complex Universal Analytics to GA4 migration, we implemented enhanced e-commerce tracking that revealed hidden funnel drop-offs — enabling targeted optimisations that drove measurable revenue growth.",
    metrics: [
      { label: "Conversion Rate Uplift", value: "+28%" },
      { label: "Revenue Attributed", value: "+$2.4M" },
      { label: "Events Tracked", value: "120+" },
    ],
    icon: TrendingUp,
    accentColor: "#10B981",
    challenge:
      "A major D2C e-commerce brand had delayed their GA4 migration for over a year, accumulating technical debt and operating with incomplete data as Universal Analytics approached sunset. Their existing UA enhanced e-commerce setup was complex, and they feared losing the funnel visibility they'd built up over years.",
    solution:
      "We executed a phased migration that preserved historical context while unlocking GA4's superior funnel analysis capabilities — ultimately revealing conversion bottlenecks that the old UA setup had completely missed.",
    sections: [
      {
        type: "h2",
        content: "Why Migrations Fail — And How We Avoid It",
      },
      {
        type: "p",
        content:
          "Most GA4 migrations fail for one of two reasons: teams copy their UA event structure directly into GA4 (missing GA4's unique capabilities) or they try to recreate UA reports in GA4 (fighting the tool instead of leveraging it). We start every migration by mapping business questions, not report templates.",
      },
      {
        type: "h2",
        content: "The Migration Process",
      },
      {
        type: "ul",
        items: [
          "Full audit of existing UA custom dimensions, goals, and enhanced e-commerce events",
          "Business stakeholder interviews to document key questions GA4 must answer",
          "Design of new GA4 event schema optimised for exploration and funnel analysis",
          "Data layer implementation for all e-commerce events: view_item, add_to_cart, begin_checkout, purchase",
          "Custom dimensions and metrics configuration for product attributes and user segments",
          "Six-week parallel running period to validate GA4 data against UA",
          "Conversion of all UA-based dashboards to GA4 equivalents in Looker Studio",
        ],
      },
      {
        type: "h2",
        content: "The Hidden Bottleneck",
      },
      {
        type: "p",
        content:
          "GA4's funnel exploration tool revealed something their UA setup had completely hidden: 34% of users who added a product to cart and viewed the checkout page were abandoning specifically on the shipping information step — at a rate 3× higher for mobile users than desktop. UA's goals had masked this by aggregating checkout into a single step.",
      },
      {
        type: "quote",
        content:
          "\"We'd been optimising the wrong thing for two years. GA4's step-level funnel data showed us that our shipping form on mobile was the problem — not our product pages, not our pricing, not our checkout flow in general.\" — E-commerce Director",
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "Overall Conversion Rate Uplift", value: "+28%" },
          { label: "Mobile Checkout Completion", value: "+41%" },
          { label: "Annual Revenue Impact", value: "+$2.4M" },
          { label: "Events Tracked", value: "120+" },
          { label: "Data Migration Accuracy", value: "98%" },
          { label: "Parallel Running Period", value: "6 weeks" },
        ],
      },
    ],
    technologies: ["Google Analytics 4", "Google Tag Manager", "BigQuery", "Looker Studio", "Google Optimize"],
    outcome:
      "The GA4 migration delivered immediate analytical value by revealing funnel bottlenecks invisible in Universal Analytics. The conversion rate improvements from resulting product changes generated $2.4M in incremental annual revenue — making this one of the highest-ROI analytics projects the brand had undertaken.",
  },
  {
    id: 6,
    slug: "financial-services-bigquery-pipeline",
    client: "Financial Services Firm",
    industry: "Banking & Finance",
    category: ["BigQuery", "Analytics"],
    title: "BigQuery Data Pipeline Cuts Reporting Time from Days to Minutes",
    excerpt:
      "A leading financial services company's analysts spent 3+ days compiling weekly reports manually. We built automated BigQuery pipelines with Looker Studio dashboards, putting live insights at their fingertips.",
    metrics: [
      { label: "Reporting Time", value: "−95%" },
      { label: "Data Sources Unified", value: "12" },
      { label: "Manual Work Saved", value: "80 hrs/mo" },
    ],
    icon: BarChart3,
    accentColor: "#8B5CF6",
    challenge:
      "The digital analytics team at this financial services company spent every Monday and Tuesday of every week pulling data from 12 different systems, cleaning it in Excel, and compiling it into a PowerPoint deck for the Wednesday leadership review. By the time the data reached decision makers, it was already 5–7 days old. And if a leader asked a follow-up question that wasn't in the standard report, answering it took another 2 days.",
    solution:
      "We built a centralised BigQuery data warehouse that ingests, transforms, and serves data from all 12 source systems — with automated Looker Studio dashboards that refresh every four hours and a self-service exploration layer for ad-hoc analysis.",
    sections: [
      {
        type: "h2",
        content: "The True Cost of Manual Reporting",
      },
      {
        type: "p",
        content:
          "80 analyst-hours per month sounds like a lot. But the real cost is what wasn't happening during those 80 hours. Senior analysts who should be identifying trends, testing hypotheses, and advising strategy were instead copy-pasting cells in Excel. Manual reporting isn't just inefficient — it creates an organisation that reacts to the past rather than preparing for the future.",
      },
      {
        type: "h2",
        content: "Architecture: One Source of Truth",
      },
      {
        type: "ul",
        items: [
          "BigQuery as the central data warehouse for all 12 data sources",
          "Scheduled data transfers from GA4, CRM, paid media platforms, and internal databases",
          "Standardised transformation layer using BigQuery SQL for consistent metric definitions",
          "Automated data quality checks that alert the team to pipeline failures before reports are reviewed",
          "Looker Studio dashboards connected to optimised summary tables — not raw data",
          "Role-based access: executives see summary views, analysts access raw exploration layer",
        ],
      },
      {
        type: "quote",
        content:
          "\"The first week after launch, our analytics lead had two full days freed up. She used them to build a customer segmentation analysis we'd been talking about for a year. That's the real ROI.\" — Chief Digital Officer",
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "Report Compilation Time", value: "−95%" },
          { label: "Data Sources Unified", value: "12" },
          { label: "Manual Work Eliminated", value: "80 hrs/mo" },
          { label: "Data Freshness", value: "4 hrs" },
          { label: "Ad-hoc Query Response Time", value: "<30 min" },
          { label: "Dashboard Active Users", value: "47" },
        ],
      },
    ],
    technologies: ["BigQuery", "Looker Studio", "Cloud Composer", "dbt", "Google Analytics 4", "Salesforce Data Export"],
    outcome:
      "The financial services analytics team now operates as a strategic function rather than a reporting bureau. Leadership has trusted, up-to-date data available every morning. Analysts spend their time on analysis, not data preparation.",
  },
  {
    id: 7,
    slug: "healthcare-server-side-tracking",
    client: "Healthcare Portal",
    industry: "Healthcare",
    category: ["GTM", "Server-Side"],
    title: "HIPAA-Compliant Server-Side Tracking with 98% Data Completeness",
    excerpt:
      "Healthcare data regulations blocked client-side analytics on sensitive pages. We implemented server-side Google Tag Manager to maintain full measurement compliance without compromising patient privacy.",
    metrics: [
      { label: "Data Completeness", value: "98%" },
      { label: "Compliance Violations", value: "0" },
      { label: "Ad Blockers Bypassed", value: "100%" },
    ],
    icon: Shield,
    accentColor: "#06B6D4",
    challenge:
      "Healthcare digital platforms face a measurement paradox: the pages where users engage most meaningfully — symptom checkers, appointment booking flows, health assessment tools — are precisely the pages where collecting behavioural data is most legally sensitive. Standard client-side analytics had been blocked on these pages for compliance reasons, leaving the product team with no visibility into critical conversion funnels.",
    solution:
      "We designed and implemented a server-side GTM infrastructure that collects behavioural data (not health data) with full compliance — routing all analytics through a first-party server before it reaches any third-party analytics platform.",
    sections: [
      {
        type: "h2",
        content: "The Compliance-Measurement Tension",
      },
      {
        type: "p",
        content:
          "Healthcare compliance teams are right to be cautious about analytics on sensitive pages. Client-side JavaScript has no visibility controls — a third-party tracking script can theoretically read any data on the page, including health information typed into forms. But measuring nothing isn't a viable alternative when you're trying to reduce appointment abandonment and improve patient access to care.",
      },
      {
        type: "h2",
        content: "Server-Side GTM: How It Works",
      },
      {
        type: "p",
        content:
          "In server-side GTM, the client sends analytics events to a first-party server (in this case, hosted on the organisation's own cloud infrastructure) rather than directly to third-party platforms like Google Analytics. The server then decides — under controlled, auditable logic — what data to forward and to whom.",
      },
      {
        type: "ul",
        items: [
          "Events sent to first-party server: analytics.yourdomain.com (trusted by browsers)",
          "Server-side logic strips any potentially sensitive parameters before forwarding",
          "Only behavioural events (page views, button clicks, funnel steps) forwarded — never form field content",
          "Full audit trail of every data transformation maintained in server logs",
          "Ad blockers and ITP/ETP browser restrictions bypassed because requests go to a first-party domain",
        ],
      },
      {
        type: "quote",
        content:
          "\"We finally have visibility into our appointment booking funnel — compliant visibility. We identified that 28% of users were abandoning at the insurance verification step, which we'd never been able to measure before. That insight is already guiding our product roadmap.\" — VP Digital Product",
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "Data Completeness vs. Client-Side", value: "98%" },
          { label: "Compliance Violations", value: "0" },
          { label: "Ad Blocker Impact Eliminated", value: "100%" },
          { label: "Pages Now Measurable (from 0)", value: "34" },
          { label: "Appointment Funnel Visibility", value: "Full" },
          { label: "Legal Review Approval Time", value: "2 weeks" },
        ],
      },
    ],
    technologies: ["Server-Side Google Tag Manager", "Google Cloud Run", "Google Analytics 4", "Consent Management Platform", "Cloud Logging"],
    outcome:
      "The healthcare portal can now measure the full patient digital experience — compliantly. Product teams have funnel data that directly informs UX decisions, and the compliance team has complete auditability of what data is collected and forwarded.",
  },
  {
    id: 8,
    slug: "edtech-predictive-analytics",
    client: "EdTech Platform",
    industry: "Education Technology",
    category: ["Analytics", "ML"],
    title: "Predictive Analytics Model Reduces Student Churn by 42%",
    excerpt:
      "An online learning platform was losing students before course completion. We built predictive ML models on top of their GA4 data to identify at-risk students early, enabling timely interventions.",
    metrics: [
      { label: "Churn Reduction", value: "42%" },
      { label: "Model Accuracy", value: "87%" },
      { label: "Interventions Triggered", value: "15K+" },
    ],
    icon: LineChart,
    accentColor: "#F59E0B",
    challenge:
      "A subscription-based online learning platform had a serious retention problem: 52% of students who enrolled in a course never completed it, and 38% of paying subscribers churned within their first 90 days. The team knew engagement was the key driver, but couldn't identify which students were at risk early enough to intervene effectively.",
    solution:
      "We built a churn prediction model using BigQuery ML, trained on GA4 engagement data and course progress signals, that identifies at-risk students 14+ days before they churn — giving the engagement team enough time to intervene.",
    sections: [
      {
        type: "h2",
        content: "Turning Engagement Data into Prediction Signals",
      },
      {
        type: "p",
        content:
          "The foundation of the model was identifying which behavioural signals in GA4 were predictive of churn. We analysed 18 months of historical data to find the engagement patterns that preceded student dropout.",
      },
      {
        type: "ul",
        items: [
          "Lesson completion rate in the first 7 days: the strongest early predictor of 90-day retention",
          "Streak maintenance: students who broke a study streak and didn't return within 48 hours had 3× higher churn risk",
          "Session time trend: declining average session duration week-over-week was a leading churn indicator",
          "Content type engagement: students who only consumed video but never completed exercises had 2.5× churn risk",
          "Quiz score trajectory: consistently declining scores without instructor contact predicted dropout",
        ],
      },
      {
        type: "h2",
        content: "The Prediction Model",
      },
      {
        type: "p",
        content:
          "We used BigQuery ML's logistic regression model, trained on a feature set derived from the engagement signals above. The model was designed for interpretability — so the engagement team could understand why a student was flagged as at-risk, not just that they were.",
      },
      {
        type: "quote",
        content:
          "\"The model doesn't just tell us who is at risk — it tells us why. A student flagged for low exercise completion gets a different intervention message than one flagged for declining session time. That personalisation is what makes the outreach effective.\" — Head of Student Success",
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "90-Day Churn Reduction", value: "42%" },
          { label: "Model Prediction Accuracy", value: "87%" },
          { label: "Students Reached with Interventions", value: "15,400+" },
          { label: "Early Warning Lead Time", value: "14+ days" },
          { label: "Intervention Response Rate", value: "34%" },
          { label: "Course Completion Rate Uplift", value: "+28%" },
        ],
      },
    ],
    technologies: ["BigQuery ML", "Google Analytics 4", "BigQuery", "Looker Studio", "Cloud Functions", "Mailchimp API"],
    outcome:
      "The EdTech platform now proactively identifies at-risk students before they churn, enabling personalised outreach that has reduced 90-day churn by 42% and meaningfully improved course completion rates.",
  },
  {
    id: 9,
    slug: "media-network-real-time-dashboard",
    client: "National Media Network",
    industry: "Broadcasting",
    category: ["Analytics", "Dashboards"],
    title: "Real-Time Audience Intelligence Dashboard for 200+ Editorial Teams",
    excerpt:
      "A national broadcaster needed live audience data to inform editorial decisions. We built a real-time Looker Studio system pulling from GA4 and YouTube Analytics, serving 200+ reporters simultaneously.",
    metrics: [
      { label: "Dashboard Users", value: "200+" },
      { label: "Data Refresh Rate", value: "5 min" },
      { label: "Engagement Uplift", value: "+33%" },
    ],
    icon: BarChart3,
    accentColor: "#EC4899",
    challenge:
      "A major national broadcaster with both a digital news platform and a YouTube network needed their editorial teams to make content decisions based on real-time audience data. With 200+ journalists and editors across multiple bureaus, they needed a dashboard solution that was simultaneously powerful enough for analysts and simple enough for reporters on deadline.",
    solution:
      "We built a tiered Looker Studio dashboard system — an executive summary layer, a bureau-level performance view, and a journalist-level article performance tool — all connected to a live BigQuery pipeline combining GA4 and YouTube Analytics data.",
    sections: [
      {
        type: "h2",
        content: "Designing for the Newsroom",
      },
      {
        type: "p",
        content:
          "Newsroom analytics tools fail when they're built for analysts instead of journalists. A reporter on deadline doesn't have time to navigate complex filters or interpret nuanced metrics. The dashboard needed to answer one question clearly: 'How is my story performing right now, and what should I do about it?'",
      },
      {
        type: "ul",
        items: [
          "Executive Dashboard: KPIs, trending stories, audience reach — for leadership and editors-in-chief",
          "Bureau Dashboard: Section-level performance, topic trends, competitor benchmarking — for bureau heads",
          "Story Dashboard: Per-article engagement, traffic sources, scroll depth, related content performance — for individual journalists",
          "Alerts: Automated notifications when a story breaks out (traffic >3× baseline) or drops off unexpectedly",
        ],
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "Active Dashboard Users", value: "200+" },
          { label: "Data Refresh Frequency", value: "5 min" },
          { label: "Avg. Time-on-Article Uplift", value: "+33%" },
          { label: "Data Sources Unified", value: "4" },
          { label: "Custom Alerts Configured", value: "47" },
          { label: "Training Time per User", value: "45 min" },
        ],
      },
      {
        type: "quote",
        content:
          "\"Reporters are now checking the story dashboard the same way they check their inbox — it's become a natural part of how they work. That cultural shift happened faster than we expected.\" — Digital Editor-in-Chief",
      },
    ],
    technologies: ["Looker Studio", "BigQuery", "Google Analytics 4", "YouTube Analytics API", "Cloud Scheduler", "Data Studio Community Connectors"],
    outcome:
      "Editorial teams across the network now make content decisions informed by real-time audience data. Engagement metrics improved significantly as editors optimised stories, headlines, and related content based on live performance signals.",
  },
  {
    id: 10,
    slug: "retail-omnichannel-attribution",
    client: "Retail Chain",
    industry: "Retail",
    category: ["GA4", "Attribution"],
    title: "Omnichannel Attribution Model Reveals True Marketing ROI",
    excerpt:
      "A major retail chain was over-investing in last-click channels. Our data-driven attribution model across GA4 and CRM data showed the true impact of each touchpoint, redirecting ₹2Cr in misallocated spend.",
    metrics: [
      { label: "Misallocated Budget Reclaimed", value: "₹2Cr" },
      { label: "ROAS Improvement", value: "+55%" },
      { label: "Channels Modelled", value: "14" },
    ],
    icon: TrendingUp,
    accentColor: "#10B981",
    challenge:
      "A 200-store retail chain with a growing online presence was making media budget decisions based entirely on last-click attribution in Google Analytics. This gave all credit to the last marketing touchpoint before purchase — typically Google Shopping or brand search — while completely ignoring the role of display, YouTube, social media, and offline marketing in driving customer intent.",
    solution:
      "We built a custom data-driven attribution model combining GA4's conversion path data with their CRM purchase data and offline store transactions — giving a complete view of the customer journey across 14 channels.",
    sections: [
      {
        type: "h2",
        content: "The Last-Click Trap",
      },
      {
        type: "p",
        content:
          "Last-click attribution is simple and easy to implement, which is why it became the default in web analytics. But it fundamentally misrepresents how customers actually make purchasing decisions. For a retail brand, where a customer might see a YouTube ad, visit the website three times, and then search for the brand before buying, last-click attribution gives 100% of the credit to that final brand search — and zero to everything else that built intent.",
      },
      {
        type: "ul",
        items: [
          "Google Shopping and brand search were receiving 71% of conversion credit under last-click",
          "Display and YouTube campaigns appeared to have negative ROI — but were top-of-funnel drivers",
          "Social media campaigns showed poor conversion rates but high assisted conversion rates",
          "Offline store purchases, representing 60% of revenue, were completely unlinked from digital touchpoints",
          "Marketing budget allocations were based on last-click data — leading to systematic underinvestment in upper-funnel channels",
        ],
      },
      {
        type: "h2",
        content: "Building the Attribution Model",
      },
      {
        type: "p",
        content:
          "We used GA4's data-driven attribution as the foundation, then enhanced it by integrating offline purchase data from their CRM using hashed email matching. This allowed us to connect digital touchpoints to in-store purchases — something that was completely invisible in their existing setup.",
      },
      {
        type: "quote",
        content:
          "\"We discovered that customers who saw our YouTube ads spent 40% more on their first in-store visit. We had been on the verge of cutting YouTube entirely because the last-click ROAS looked terrible.\" — CMO",
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "Budget Reallocated (Misattributed)", value: "₹2Cr" },
          { label: "Blended ROAS Improvement", value: "+55%" },
          { label: "Marketing Channels Modelled", value: "14" },
          { label: "Offline-Digital Journeys Mapped", value: "480K+" },
          { label: "YouTube ROAS (True Attribution)", value: "4.2×" },
          { label: "Brand Search Cost Reduction", value: "22%" },
        ],
      },
    ],
    technologies: ["Google Analytics 4", "BigQuery", "Data-Driven Attribution", "CRM Integration", "Google Ads API", "Looker Studio"],
    outcome:
      "By understanding the true contribution of each marketing channel, the retail chain reallocated ₹2Cr from over-credited bottom-funnel channels to undervalued upper-funnel channels — resulting in a 55% improvement in blended ROAS within two quarters.",
  },
  {
    id: 11,
    slug: "travel-platform-funnel-analysis",
    client: "Travel Platform",
    industry: "Travel & Hospitality",
    category: ["GA4", "Funnel"],
    title: "GA4 Funnel Analysis Recovers 18% of Abandoned Bookings",
    excerpt:
      "A high-traffic travel booking site suffered from invisible checkout abandonment. Using GA4's funnel exploration and behavioural cohorts, we pinpointed friction points and guided product changes that recovered lost conversions.",
    metrics: [
      { label: "Booking Recovery", value: "18%" },
      { label: "Funnel Drop-off Reduced", value: "−31%" },
      { label: "Revenue Recovered", value: "$890K" },
    ],
    icon: Zap,
    accentColor: "#6366F1",
    challenge:
      "A travel booking platform with strong top-of-funnel traffic — 2.4M monthly visitors — was converting at just 1.2%. They knew they had a checkout abandonment problem but couldn't pinpoint where or why. Their previous analytics setup aggregated the multi-step booking process into a single goal completion, making funnel analysis practically impossible.",
    solution:
      "We instrumented the full booking journey with granular GA4 events, built step-level funnel explorations, and combined behavioural segmentation with session recordings to identify and prioritise friction points.",
    sections: [
      {
        type: "h2",
        content: "Instrumentation: Seeing the Full Funnel",
      },
      {
        type: "p",
        content:
          "The first step was building a complete measurement picture of the booking journey. We implemented 28 GA4 events across the funnel — from destination search to payment confirmation — with custom parameters capturing key context like destination type, booking window, party size, and device type.",
      },
      {
        type: "h2",
        content: "What the Funnel Data Revealed",
      },
      {
        type: "ul",
        items: [
          "Step 3 (room selection) had a 47% drop-off rate — nearly double any other step",
          "Mobile users at step 3 dropped off at 63%, vs. 31% for desktop users",
          "Users who saw '0 availability' messages on their first search had 89% abandonment rate",
          "Price display format confusion (taxes shown separately) caused measurable abandonment spikes",
          "Users who applied filters at any point converted at 3.4× the rate of non-filter users",
        ],
      },
      {
        type: "quote",
        content:
          "\"The funnel data didn't just tell us where people were dropping off — it told us which specific interactions at each step predicted whether someone would convert or abandon. That's a completely different level of insight.\" — Product Manager",
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "Booking Abandonment Recovered", value: "18%" },
          { label: "Step 3 Drop-off Reduction", value: "31%" },
          { label: "Annual Revenue Recovered", value: "$890K" },
          { label: "Mobile Conversion Rate Uplift", value: "+42%" },
          { label: "Overall Conversion Rate", value: "1.2% → 1.74%" },
          { label: "Events Instrumented", value: "28" },
        ],
      },
    ],
    technologies: ["Google Analytics 4", "GA4 Funnel Exploration", "Google Tag Manager", "BigQuery", "Hotjar Integration"],
    outcome:
      "By identifying and fixing the specific friction points revealed by GA4 funnel analysis, the travel platform recovered 18% of previously abandoned bookings — generating $890K in annual revenue recovery from analytics work that cost a fraction of that amount.",
  },
  {
    id: 12,
    slug: "saas-product-analytics",
    client: "SaaS Company",
    industry: "Software",
    category: ["Analytics", "Product"],
    title: "Product Analytics Framework Drives 61% Improvement in 90-Day Retention",
    excerpt:
      "A B2B SaaS startup's retention was plateauing. We built a comprehensive product analytics framework using GA4 + BigQuery, identifying core engagement patterns that shaped their product roadmap.",
    metrics: [
      { label: "90-Day Retention Uplift", value: "+61%" },
      { label: "Feature Adoption Tracked", value: "40+" },
      { label: "NPS Improvement", value: "+22 pts" },
    ],
    icon: Database,
    accentColor: "#8B5CF6",
    challenge:
      "A B2B SaaS company with 2,400 paying customers was experiencing a retention plateau. Their 90-day retention rate had stagnated at 61% despite strong initial growth, and the product team lacked the data infrastructure to understand which features were driving retention and which were failing to deliver value.",
    solution:
      "We built a comprehensive product analytics framework combining GA4 for user behaviour tracking, BigQuery for cohort analysis and retention modelling, and Looker Studio for product team dashboards — giving them their first clear view of the feature adoption patterns that predicted customer success.",
    sections: [
      {
        type: "h2",
        content: "Finding the Features That Drive Retention",
      },
      {
        type: "p",
        content:
          "The core analytical question was: which features do customers who stay use, that customers who churn don't? We ran a cohort analysis comparing the feature adoption patterns of retained vs. churned customers across their first 30 days of usage.",
      },
      {
        type: "ul",
        items: [
          "Customers who used the collaboration features within day 7 had 3.2× higher 90-day retention",
          "The API integration feature, used by only 18% of customers, had a near-zero churn rate among users",
          "Customers who never set up a scheduled report in their first 30 days had 71% churn by day 90",
          "Mobile app usage was positively correlated with retention — daily check-in users almost never churned",
          "Customers with 3+ active seats at day 30 were essentially guaranteed to renew",
        ],
      },
      {
        type: "h2",
        content: "From Insights to Product Changes",
      },
      {
        type: "p",
        content:
          "The analytics findings directly shaped the product roadmap. The onboarding flow was redesigned to guide new users toward the high-retention features within their first session. In-app prompts were added to drive scheduled report setup. The collaboration features were promoted more prominently in the UI.",
      },
      {
        type: "quote",
        content:
          "\"For the first time, our product roadmap decisions are data-driven rather than intuition-driven. When we debate whether to prioritise feature X or feature Y, we can look at the retention correlation data and have a much more grounded conversation.\" — CPO",
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "90-Day Retention Uplift", value: "+61%" },
          { label: "Features Tracked", value: "40+" },
          { label: "NPS Improvement", value: "+22 pts" },
          { label: "Onboarding Completion Rate", value: "+45%" },
          { label: "Time-to-First-Value", value: "−3 days" },
          { label: "Annual Recurring Revenue Impact", value: "+$1.8M" },
        ],
      },
    ],
    technologies: ["Google Analytics 4", "BigQuery", "BigQuery ML", "Looker Studio", "Segment", "Amplitude Integration"],
    outcome:
      "The SaaS company now has a product analytics system that directly informs roadmap prioritisation. The 61% improvement in 90-day retention — from 61% to 98.2% — transformed their unit economics and gave their sales team a compelling retention story for prospects.",
  },
  {
    id: 13,
    slug: "abp-live-video-completion-rates",
    client: "ABP Live",
    industry: "Digital Media",
    category: ["CRO", "GA4"],
    title: "How ABP LIVE Leveraged GA4 to Significantly Boost Video Completion Rates",
    excerpt:
      "ABP LIVE faced user drop-offs after article completion, leading to underutilization of its premium video content library. We used GA4 behavioral analytics and data-driven experimentation to increase session duration by 38% and improve engagement by 17%.",
    metrics: [
      { label: "Session Duration Uplift", value: "38%" },
      { label: "Engagement Improvement", value: "17%" },
      { label: "Video Completion Rate", value: "+43%" },
    ],
    icon: LineChart,
    accentColor: "#EC4899",
    featured: true,
    challenge:
      "ABP LIVE faced significant user drop-offs after article completion, resulting in underutilization of its premium video content library. The organization needed to bridge the gap between text-based reading and video consumption using behavioral data rather than subjective design decisions. The objective was to improve watch time, session depth, and content recirculation by creating seamless pathways from articles to videos.",
    solution:
      "We used GA4 behavioral analytics to identify content engagement patterns and implemented data-driven experimentation to optimize the transition from articles to videos. This included analyzing user journey data, identifying friction points, and testing optimized content pathways.",
    sections: [
      {
        type: "h2",
        content: "Understanding the Content Consumption Gap",
      },
      {
        type: "p",
        content:
          "ABP LIVE's analytics revealed that while users were consuming articles actively, the transition to video content was poor. Users who finished reading an article had a very low probability of clicking through to related videos, despite the video library containing high-quality, relevant content.",
      },
      {
        type: "h2",
        content: "The GA4 Insight-Driven Approach",
      },
      {
        type: "p",
        content:
          "Using GA4's behavioral analysis tools, we identified the specific points in the user journey where video engagement dropped off. We analyzed scroll depth, time on page, and subsequent navigation patterns to understand what content types and placements drove the highest video conversion rates.",
      },
      {
        type: "ul",
        items: [
          "Analyzed article-to-video transition patterns across 50+ content categories",
          "Identified optimal video placement timing based on article engagement curves",
          "Tested multiple content discovery mechanisms including inline embeds, end-of-article recommendations, and sidebar widgets",
          "Implemented personalized video recommendations based on reading history and content affinity",
        ],
      },
      {
        type: "h2",
        content: "Results and Impact",
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "Session Duration Uplift", value: "38%" },
          { label: "User Engagement Improvement", value: "17%" },
          { label: "Video Completion Rate Increase", value: "+43%" },
          { label: "Content Recirculation Rate", value: "+28%" },
        ],
      },
      {
        type: "quote",
        content:
          "The data-driven approach transformed how we think about content discovery. By understanding the behavioral signals that predict video engagement, we created a seamless content experience that keeps users engaged longer. — Head of Digital Product, ABP Live",
      },
    ],
    technologies: ["Google Analytics 4", "GA4 Explorations", "Google Tag Manager", "BigQuery", "Content Recommendation Engine"],
    outcome:
      "ABP LIVE significantly improved user engagement and video consumption through data-driven content optimization. The 38% increase in session duration and 43% improvement in video completion rates demonstrate the power of using GA4 insights to bridge content gaps.",
  },
  {
    id: 14,
    slug: "live-mint-website-performance",
    client: "Live Mint",
    industry: "Digital Media",
    category: ["GA4", "Performance"],
    title: "Live Mint Accelerates Website Performance with 43% Page Speed Gain",
    excerpt:
      "Live Mint struggled with poor Core Web Vitals and user experience due to the absence of a defined, measurement-led optimisation framework. We optimized their web performance and improved page speed metrics across the platform.",
    metrics: [
      { label: "Page Speed Improvement", value: "43%" },
      { label: "Performance Score Gain", value: "+35%" },
      { label: "User Experience Uplift", value: "+28%" },
    ],
    icon: Zap,
    accentColor: "#10B981",
    featured: true,
    challenge:
      "Live Mint struggled to improve page performance and user experience due to the absence of a defined, measurement-led optimisation framework. The Hindustan Times Group's digital properties had lower scores on critical Core Web Vitals (CWVs) like LCP, INP, and CLS, which impacted both user experience and search rankings.",
    solution:
      "We implemented a comprehensive performance optimization framework using GA4 to measure and track Core Web Vitals, combined with technical optimizations to improve page load times and overall site performance.",
    sections: [
      {
        type: "h2",
        content: "The Performance Challenge in Digital News",
      },
      {
        type: "p",
        content:
          "Digital news platforms face unique performance challenges: high ad density, rich media content, and the need for real-time updates. Live Mint's performance scores were below industry benchmarks, particularly on mobile devices where 70% of their traffic originates.",
      },
      {
        type: "h2",
        content: "Measurement-Led Optimization",
      },
      {
        type: "p",
        content:
          "Rather than guessing at performance issues, we used GA4's Web Vitals reporting to establish baseline measurements and identify the specific elements causing performance degradation. This data-driven approach ensured optimization efforts targeted the highest-impact issues.",
      },
      {
        type: "ul",
        items: [
          "Implemented GA4 Web Vitals monitoring for continuous performance tracking",
          "Optimized image delivery through next-generation formats and lazy loading",
          "Reduced JavaScript bundle size through code splitting and tree shaking",
          "Implemented strategic ad loading to minimize impact on Core Web Vitals",
          "Improved server response times through caching and CDN optimization",
        ],
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "Page Speed Improvement", value: "43%" },
          { label: "LCP Improvement", value: "2.1s → 1.2s" },
          { label: "Mobile Score Increase", value: "+35 pts" },
          { label: "Bounce Rate Reduction", value: "−18%" },
        ],
      },
    ],
    technologies: ["Google Analytics 4", "Core Web Vitals", "Google Tag Manager", "PageSpeed Insights", "Web Analytics"],
    outcome:
      "Live Mint achieved a 43% improvement in website performance through measurement-led optimization. The enhanced Core Web Vitals scores contributed to better user experience, reduced bounce rates, and improved search visibility.",
  },
  {
    id: 15,
    slug: "news-minute-subscription-growth",
    client: "The News Minute",
    industry: "Digital Media",
    category: ["CRO", "GA4"],
    title: "How The News Minute Scaled Subscriptions Through A/B Testing with GA4 Insights",
    excerpt:
      "The News Minute faced challenges converting engaged users into subscribers. We used GA4 insights and A/B testing to increase subscriptions by 12% and boost CTA clicks by 23%.",
    metrics: [
      { label: "Subscription Increase", value: "12%" },
      { label: "CTA Performance Uplift", value: "23%" },
      { label: "Mobile Conversion Rate", value: "+18%" },
    ],
    icon: TrendingUp,
    accentColor: "#6366F1",
    challenge:
      "The News Minute consistently attracted high-quality readership, but converting engaged users into subscribers remained a key challenge. Subscription entry points lacked consistent visibility across high-traffic surfaces, the subscription journey contained friction particularly on mobile devices, and there was limited visibility into how users interacted with subscription CTAs across the conversion funnel.",
    solution:
      "We implemented a data-driven experimentation framework using GA4 to understand user behavior and A/B testing to optimize subscription touchpoints. This included analyzing user journey data, identifying friction points, and testing optimized subscription flows.",
    sections: [
      {
        type: "h2",
        content: "The Subscription Challenge for Digital News",
      },
      {
        type: "p",
        content:
          "Digital-native news publishers like The News Minute face a unique challenge: building subscription revenue while maintaining free access for audience growth. The key is identifying the right moment and context to present subscription offers without disrupting the user experience.",
      },
      {
        type: "h2",
        content: "GA4-Powered Insights",
      },
      {
        type: "p",
        content:
          "Using GA4's funnel exploration and user segmentation capabilities, we identified the specific pages, articles, and user behaviors that predicted subscription intent. This allowed us to present subscription CTAs at the most opportune moments in the user journey.",
      },
      {
        type: "ul",
        items: [
          "Identified high-intent pages where users showed strongest subscription signals",
          "Analyzed mobile vs. desktop subscription funnel differences",
          "Mapped the optimal number of article views before presenting subscription offer",
          "Tested CTA copy, design, and placement variations",
        ],
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "Subscription Conversion Uplift", value: "12%" },
          { label: "CTA Click-Through Rate", value: "+23%" },
          { label: "Mobile Subscription Rate", value: "+18%" },
          { label: "Funnel Drop-off Reduction", value: "−15%" },
        ],
      },
    ],
    technologies: ["Google Analytics 4", "Google Optimize", "A/B Testing", "GA4 Funnel Exploration", "User Segmentation"],
    outcome:
      "The News Minute achieved a 12% increase in subscriptions and 23% improvement in CTA performance through data-driven experimentation. The optimized subscription framework now provides a scalable model for ongoing subscription growth.",
  },
  {
    id: 16,
    slug: "path-digital-mobilization",
    client: "PATH",
    industry: "Healthcare",
    category: ["Media", "Digital Health"],
    title: "How PATH Transformed Awareness Into Action Through Targeted Digital Mobilization",
    excerpt:
      "PATH's Take Charge Against TB initiative needed to bridge the gap between awareness and action. We designed a digital mobilization strategy that drove 1.8M+ digital self-screenings and 52K+ self-referrals for free TB testing.",
    metrics: [
      { label: "Digital Self-Screenings", value: "1.8M+" },
      { label: "Self-Referrals Generated", value: "52K+" },
      { label: "Awareness-to-Action Rate", value: "+34%" },
    ],
    icon: Shield,
    accentColor: "#06B6D4",
    challenge:
      "PATH's Take Charge Against TB initiative focused on addressing health care inequities and reducing TB underdiagnosis across vulnerable youth in urban poor communities in India. Reaching this audience required overcoming low TB literacy, widespread stigma, and fragmented digital behavior. Traditional awareness approaches lacked resonance, and there was no measurable funnel linking exposure to real health action.",
    solution:
      "We designed and executed a digital mobilization campaign that created a high-velocity, digitally measurable awareness-to-action engine. This included localized messaging, relatable narratives, and frictionless digital pathways to promote early symptom recognition and access to free government testing.",
    sections: [
      {
        type: "h2",
        content: "A Behavior Change Movement at Scale",
      },
      {
        type: "p",
        content:
          "The mission was not just a communication campaign, but a behavior change movement at scale, measured through tangible behaviors rather than subjective perceptions. We designed a digital model capable of not just creating awareness, but driving high-intent engagement and converting it into measurable health-seeking behaviors.",
      },
      {
        type: "ul",
        items: [
          "Developed localized, youth-focused storytelling across Delhi, Hyderabad, and Pune",
          "Created a simple symptom checker linked to government screening platforms",
          "Implemented hyper-local messaging tailored by city, language, and demographic",
          "Built a measurable funnel from awareness to digital self-screening to referral",
        ],
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "Digital Self-Screenings Completed", value: "1.8M+" },
          { label: "Self-Referrals for Free TB Testing", value: "52K+" },
          { label: "Awareness-to-Action Rate", value: "+34%" },
          { label: "Cities Covered", value: "3" },
          { label: "Languages Supported", value: "5+" },
        ],
      },
      {
        type: "quote",
        content:
          "This campaign proved that digital mobilization can drive real-world health outcomes. By meeting people where they are with culturally relevant messaging and frictionless tools, we enabled thousands to take action on their health. — PATH Digital Health Lead",
      },
    ],
    technologies: ["Digital Campaigns", "Behavioral Analytics", "Social Media", "Mobile-First Design", "Public Health Analytics"],
    outcome:
      "PATH successfully transformed awareness into action, completing 1.8M+ digital self-screenings and generating 52K+ self-referrals. The campaign established a repeatable, scalable model for digital public-health activation in urban India.",
  },
  {
    id: 17,
    slug: "consumer-electronics-retailer-ga4-accuracy",
    client: "Leading Consumer Electronics Retailer",
    industry: "Retail & E-commerce",
    category: ["GA4", "Analytics"],
    title: "From Tracking Blind Spots to Revenue Clarity: How a Leading Consumer Electronics Retailer in India Achieved 92% Accuracy",
    excerpt:
      "A leading consumer electronics retailer faced serious data integrity issues with GA4, including major mismatches between actual sales and reported revenue. We restored analytics trust by achieving 92% revenue accuracy and recovering ad attribution.",
    metrics: [
      { label: "Revenue Accuracy in GA4", value: "92%" },
      { label: "Conversion Rate Uplift", value: "+7.23%" },
      { label: "Ad Revenue Attribution Recovered", value: "100%" },
    ],
    icon: Database,
    accentColor: "#8B5CF6",
    challenge:
      "Despite strong business scale and heavy investment in marketing, the client was facing serious data integrity issues that prevented accurate revenue measurement and undermined decision-making. There was a major mismatch between actual sales and what GA4 was reporting — purchase and item revenue were being underreported. Google Ads and Meta Ads platforms were showing zero attributed revenue, making ROI of campaigns impossible to assess.",
    solution:
      "We conducted a comprehensive GA4 audit and implementation fix, addressing e-commerce purchase event implementation errors, restoring revenue attribution across advertising platforms, and implementing reliable data collection for payment methods and user behavior in checkout.",
    sections: [
      {
        type: "h2",
        content: "The Revenue Attribution Crisis",
      },
      {
        type: "p",
        content:
          "For an e-commerce business, accurate revenue tracking is foundational to every marketing decision. When GA4 reports don't match actual sales, businesses cannot optimize ad spend, evaluate campaign performance, or make informed product decisions. This retailer was effectively operating blind despite heavy marketing investment.",
      },
      {
        type: "ul",
        items: [
          "E-commerce purchase events incorrectly implemented, leading to missing transaction data",
          "Currency and tax calculation errors in GA4 purchase events",
          "Cross-domain tracking issues between website and payment gateway",
          "Missing custom dimensions for payment methods and product variants",
          "Google Ads and Meta Ads conversion tracking broken due to data layer issues",
        ],
      },
      {
        type: "h2",
        content: "Restoring Data Integrity",
      },
      {
        type: "p",
        content:
          "We began with a comprehensive audit of the GA4 implementation, comparing reported data against actual sales records to quantify the discrepancy. We then systematically fixed each data collection issue, implemented validation frameworks, and set up ongoing monitoring to prevent regression.",
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "Revenue Accuracy vs. Actual Sales", value: "92%" },
          { label: "Overall Conversion Rate Uplift", value: "+7.23%" },
          { label: "Ad Revenue Attribution Recovered", value: "100%" },
          { label: "Payment Method Tracking", value: "Full Visibility" },
          { label: "Checkout Funnel Visibility", value: "Complete" },
        ],
      },
    ],
    technologies: ["Google Analytics 4", "Google Tag Manager", "Google Ads", "Meta Ads", "Data Layer", "E-commerce Tracking"],
    outcome:
      "The consumer electronics retailer now has trustworthy analytics that accurately reflects business performance. The 92% revenue accuracy restored confidence in marketing ROI calculations, and the recovered ad attribution enabled proper campaign optimization.",
  },
  {
    id: 18,
    slug: "trust-bank-cro-optimization",
    client: "Trust Bank",
    industry: "Fintech & Banking",
    category: ["CRO", "Banking"],
    title: "Trust Bank Boosts New-to-Bank Onboarding by 5.7% with Smart CRO Optimization",
    excerpt:
      "Trust Bank noticed significant drop-offs at the onboarding entry screen due to confusing UI elements and unclear CTAs. We optimized the mobile onboarding journey, boosting new-to-bank conversions by 5.7%.",
    metrics: [
      { label: "Onboarding Conversion Uplift", value: "5.7%" },
      { label: "Additional NTB Onboardings", value: "4.2K+/mo" },
      { label: "First-Screen Drop-off Reduction", value: "−22%" },
    ],
    icon: TrendingUp,
    accentColor: "#EC4899",
    challenge:
      "While Trust Bank's app adoption was strong, the bank noticed significant drop-offs at the very first screen of its mobile onboarding journey. A prominent Existing Customer? Login button placed at the top often misled new-to-bank users and caused premature exits. Product cards lacked clear CTAs, creating confusion on how to begin the application process.",
    solution:
      "We redesigned the onboarding entry screen to reduce friction for new users while maintaining access for existing customers. This included repositioning the login button, clarifying product CTAs, and implementing A/B tested variations to optimize the user path.",
    sections: [
      {
        type: "h2",
        content: "The Onboarding Friction Problem",
      },
      {
        type: "p",
        content:
          "In digital banking, the first screen of the onboarding journey is critical. For Trust Bank, high-intent new-to-bank users were being lost before they could explore offerings. The prominent login button for existing customers created confusion and premature exits among new users.",
      },
      {
        type: "ul",
        items: [
          "Existing Customer? Login button positioned above NTB options, causing confusion",
          "Product cards lacked clear CTAs, creating ambiguity about how to begin",
          "High-intent users abandoning before completing onboarding",
          "Mobile-first design needed to address 95% mobile traffic patterns",
        ],
      },
      {
        type: "h2",
        content: "CRO-Driven Redesign",
      },
      {
        type: "p",
        content:
          "We implemented a data-driven redesign of the onboarding entry screen, using GA4 to track user behavior and A/B testing to validate optimizations. The goal was to reduce friction for new users while maintaining seamless access for existing customers.",
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "New-to-Bank Onboarding Uplift", value: "5.7%" },
          { label: "Additional NTB Onboardings", value: "4.2K+/mo" },
          { label: "First-Screen Drop-off Reduction", value: "−22%" },
          { label: "Mobile Completion Rate", value: "+15%" },
        ],
      },
      {
        type: "quote",
        content:
          "The onboarding optimization had an immediate and measurable impact on our NTB acquisition. By clarifying the user path and reducing friction, we unlocked thousands of additional customer onboarding opportunities per month. — Trust Bank Product Lead",
      },
    ],
    technologies: ["CRO", "A/B Testing", "GA4", "Mobile UX Optimization", "User Journey Mapping"],
    outcome:
      "Trust Bank achieved a 5.7% uplift in new-to-bank onboarding conversions, translating to over 4,200 additional customer onboardings per month. The optimized onboarding flow now serves as a model for frictionless digital banking experiences.",
  },
  {
    id: 19,
    slug: "tvs-electric-test-ride-engagement",
    client: "TVS Electric",
    industry: "Automotive & EV",
    category: ["CRO", "Automotive"],
    title: "From Browsers to Riders: How TVS Electric Achieved a 46% Uplift in Test Ride Engagement",
    excerpt:
      "TVS Electric faced challenges converting website visitors into test ride bookings due to unclear navigation and nested product variants. We optimized the user journey, achieving a 46% increase in test ride page views and 12% uplift in bookings.",
    metrics: [
      { label: "Test Ride Page Views", value: "+46%" },
      { label: "Test Ride Bookings", value: "+12%" },
      { label: "Mobile Conversion Rate", value: "+31%" },
    ],
    icon: Zap,
    accentColor: "#10B981",
    challenge:
      "Despite strong brand presence and healthy website traffic, TVS Electric visitors were dropping off before reaching test-ride and booking pages due to unclear navigation, nested product variants, and generic homepage CTAs. Finance and EMI information was buried or hard to access, reducing buyer confidence. With 95% mobile traffic, the multi-step journey created significant friction.",
    solution:
      "We simplified the user journey for test-ride and booking paths by optimizing navigation, enhancing finance option visibility, clarifying scooter variant information, and improving the mobile experience to reduce friction and drop-off.",
    sections: [
      {
        type: "h2",
        content: "The EV Purchase Journey Challenge",
      },
      {
        type: "p",
        content:
          "Electric vehicle purchase decisions require significant consideration — buyers need to understand financing, compare variants, and experience the product through test rides. TVS Electric's website was losing potential customers in the navigation and information discovery phase before they could commit to a test ride.",
      },
      {
        type: "ul",
        items: [
          "Visitors dropping off before reaching test-ride pages due to unclear navigation",
          "Homepage CTAs generic and lacking persuasive elements",
          "Finance and EMI information buried or hard to access",
          "Mobile users (95% of traffic) facing multi-click friction with too many screens",
          "Product variant information nested and difficult to compare",
        ],
      },
      {
        type: "h2",
        content: "Simplifying the Path to Test Ride",
      },
      {
        type: "p",
        content:
          "We redesigned the user journey to create a direct, frictionless path from homepage to test-ride booking. This included simplifying navigation, making finance options prominent, and optimizing the mobile experience to reduce the number of steps required to book a test ride.",
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "Test Ride Page Views Increase", value: "46%" },
          { label: "Test Ride Booking Uplift", value: "12%" },
          { label: "Mobile Conversion Rate", value: "+31%" },
          { label: "Checkout Completion Rate", value: "+24%" },
        ],
      },
      {
        type: "quote",
        content:
          "The optimization transformed our digital presence from a brochure site to a conversion engine. By understanding the EV buyer's journey and removing friction points, we significantly increased high-intent engagement. — TVS Electric Digital Head",
      },
    ],
    technologies: ["CRO", "Mobile UX Optimization", "User Journey Mapping", "A/B Testing", "GA4"],
    outcome:
      "TVS Electric achieved a 46% increase in test-ride page views and 12% uplift in test-ride bookings through user journey optimization. The simplified mobile experience reduced friction and converted more browsers into riders.",
  },
  {
    id: 20,
    slug: "hdfc-life-lead-submissions",
    client: "HDFC Life",
    industry: "Insurance & Finance",
    category: ["CRO", "Insurance"],
    title: "HDFC Life Boosts Lead Submissions by 217% with CRO Optimization",
    excerpt:
      "HDFC Life faced high bounce rates and low form completion despite strong website traffic. We optimized the user journey through CRO strategies and form design improvements, boosting overall lead submissions by 217%.",
    metrics: [
      { label: "Lead Submission Increase", value: "217%" },
      { label: "ROI Achieved", value: "400%" },
      { label: "Bounce Rate Reduction", value: "−35%" },
    ],
    icon: TrendingUp,
    accentColor: "#EF4444",
    challenge:
      "While HDFC Life's website attracted steady visitor traffic, the lead submission rate significantly lagged behind expectations. Key issues included high bounce rates on crucial product pages, low form completion rates despite strong traffic, overloaded first folds on landing pages causing friction, and CTAs that lacked urgency and persuasive triggers.",
    solution:
      "We implemented comprehensive CRO strategies including form optimization, landing page redesign, and A/B testing to enhance the user journey. This involved simplifying form fields, improving CTA visibility, adding persuasive elements, and optimizing page load experience.",
    sections: [
      {
        type: "h2",
        content: "The Insurance Digital Conversion Challenge",
      },
      {
        type: "p",
        content:
          "Insurance websites face unique conversion challenges — complex products, lengthy forms, and the need to build trust quickly. HDFC Life's high traffic but low conversion rate indicated that visitors were interested but the journey to lead submission had significant friction.",
      },
      {
        type: "ul",
        items: [
          "High bounce rates on crucial product pages despite strong traffic",
          "Overloaded first folds on landing pages causing decision paralysis",
          "Form fields too lengthy, causing abandonment mid-completion",
          "CTAs lacking urgency and persuasive triggers",
          "No clear value proposition on key landing pages",
        ],
      },
      {
        type: "h2",
        content: "CRO Strategy and Implementation",
      },
      {
        type: "p",
        content:
          "We conducted a comprehensive CRO audit using GA4 funnel analysis to identify drop-off points, heatmaps to understand user attention patterns, and form analytics to pinpoint abandonment triggers. Each insight was tested through a structured experimentation program.",
      },
      {
        type: "ul",
        items: [
          "Simplified lead capture forms by reducing fields from 12 to 6 essential fields",
          "Redesigned landing page first folds with clear value propositions and single CTAs",
          "Added social proof elements including customer testimonials and claim settlement ratios",
          "Implemented multi-step forms with progress indicators to reduce perceived effort",
          "Added urgency triggers and benefit-driven CTA copy",
        ],
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "Overall Lead Submissions Increase", value: "217%" },
          { label: "ROI Achieved", value: "400%" },
          { label: "Bounce Rate Reduction", value: "−35%" },
          { label: "Form Completion Rate", value: "+89%" },
          { label: "CTA Click-Through Rate", value: "+52%" },
        ],
      },
      {
        type: "quote",
        content:
          "The CRO transformation went beyond form optimization — it changed how we think about the digital customer journey. Every element was designed to reduce friction and build trust, resulting in a 217% increase in qualified leads. — HDFC Life Digital Head",
      },
    ],
    technologies: ["CRO", "A/B Testing", "GA4", "Form Analytics", "Heatmaps", "Landing Page Optimization"],
    outcome:
      "HDFC Life achieved a 217% increase in overall lead submissions with 400% ROI through comprehensive CRO optimization. The reduced bounce rates and improved form completion rates transformed their digital lead generation capabilities.",
  },
];

export default caseStudies;
