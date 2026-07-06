import type { LucideIcon } from "lucide-react";
import {
  PhoneCall,
  BookOpen,
  Headphones,
  Target,
  TrendingDown,
  Sparkles,
  LineChart,
  Users,
  ScanText,
  ReceiptText,
  Handshake,
  BarChart3,
} from "lucide-react";

export interface Product {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  icon: LucideIcon;
  accentColor: string;
  summary: string;
  problem: string;
  howItWorks: string[];
  outcomes: string[];
  features: string[];
  useCases: string[];
  techStack?: string[];
}

export const products: Product[] = [
  {
    id: 1,
    slug: "voice-ai-calling-agent",
    name: "Voice AI Calling Agent",
    tagline: "Human-quality phone conversations, at unlimited scale.",
    category: "Conversational AI",
    icon: PhoneCall,
    accentColor: "#1D75FF",
    summary:
      "An always-on voice agent that makes and answers calls in natural, human-sounding speech. It qualifies leads, books appointments, confirms orders, and follows up, handling thousands of simultaneous conversations without hold music, missed calls, or overtime. Every call is transcribed, scored, and pushed straight into your CRM.",
    problem:
      "Sales and support teams lose revenue to unanswered calls, slow follow-up, and the sheer cost of staffing phone lines across time zones and peak hours. Manual dialing and voicemail tag mean hot leads go cold and routine confirmations eat entire shifts.",
    howItWorks: [
      "Connects to your telephony, CRM, and calendar so the agent has full context before it ever dials or answers.",
      "Understands intent in real time using low-latency speech recognition and a conversation policy tuned to your scripts and compliance rules.",
      "Responds in natural, brand-matched speech, handling interruptions, objections, and multi-turn dialogue like a trained rep.",
      "Takes action mid-call, books the meeting, updates the record, triggers a payment link, or warm-transfers to a human.",
      "Logs a full transcript, outcome, and sentiment score to your systems for coaching and pipeline visibility.",
    ],
    outcomes: [
      "Answer 100% of inbound calls and place outbound follow-ups within seconds, day or night.",
      "Cut cost-per-contact by up to 60% versus staffed call center capacity.",
      "Book more qualified meetings by reaching every lead before competitors do.",
      "Recover revenue from abandoned carts, missed renewals, and no-show reminders automatically.",
    ],
    features: [
      "Natural, low-latency two-way voice with barge-in and interruption handling",
      "Inbound answering and high-volume outbound campaigns from one platform",
      "CRM, calendar, and payment integrations for real-time actions during the call",
      "Multilingual and accent-aware speech for global and regional audiences",
      "Compliance guardrails, call recording, and consent management",
      "Live transcripts, sentiment scoring, and warm human handoff",
    ],
    useCases: [
      "Outbound lead qualification and appointment setting for sales teams",
      "24/7 inbound reception, routing, and FAQ handling",
      "Payment reminders, renewal follow-ups, and order confirmations",
      "Post-purchase and appointment no-show reduction calls",
    ],
    techStack: ["Speech-to-Text", "Text-to-Speech", "LLM Orchestration", "Telephony (SIP/WebRTC)", "CRM & Calendar APIs"],
  },
  {
    id: 2,
    slug: "rag-knowledge-assistant",
    name: "RAG Knowledge Assistant",
    tagline: "Turn your company knowledge into instant, trusted answers.",
    category: "Generative AI",
    icon: BookOpen,
    accentColor: "#4DA6FF",
    summary:
      "A secure assistant that answers questions from your own documents, wikis, policies, and data, with citations you can verify. Instead of searching folders and pinging colleagues, your team asks in plain language and gets grounded, source-linked answers in seconds.",
    problem:
      "Critical knowledge is scattered across drives, wikis, tickets, and inboxes. Employees waste hours hunting for the right document, experts get interrupted with repeat questions, and new hires take months to become productive.",
    howItWorks: [
      "Securely ingests your documents, wikis, tickets, and databases and keeps them continuously in sync.",
      "Indexes content into a searchable knowledge base with strict access controls that mirror your permissions.",
      "Retrieves the most relevant passages for each question and grounds the model's answer in that source material.",
      "Returns a concise answer with inline citations, so every claim links back to the original document.",
    ],
    outcomes: [
      "Cut time-to-answer from hours to seconds across support, sales, and operations.",
      "Reduce expert interruptions and repetitive internal questions by up to 70%.",
      "Onboard new hires faster with a always-available subject-matter expert.",
      "Improve answer accuracy and trust with verifiable, cited responses.",
    ],
    features: [
      "Answers grounded in your content with inline source citations",
      "Connectors for SharePoint, Confluence, Google Drive, Notion, and databases",
      "Permission-aware retrieval so users only see what they are allowed to",
      "Continuous sync so answers reflect the latest documents",
      "Conversational follow-ups with retained context",
      "Deployable in your cloud or VPC for full data control",
    ],
    useCases: [
      "Internal help desk for HR, IT, and policy questions",
      "Sales and support enablement over product and pricing docs",
      "Field and frontline staff querying SOPs and manuals",
      "Analyst and research teams querying large document repositories",
    ],
    techStack: ["Vector Database", "Embeddings", "LLM", "Retrieval-Augmented Generation", "Document Pipelines"],
  },
  {
    id: 3,
    slug: "ai-support-agent",
    name: "AI Customer Support Agent",
    tagline: "Resolve support tickets automatically, around the clock.",
    category: "Conversational AI",
    icon: Headphones,
    accentColor: "#0EA5E9",
    summary:
      "A support agent that handles customer conversations across chat, email, and messaging, resolving common issues end to end and escalating the rest with full context. It deflects repetitive tickets, keeps response times near-instant, and frees your team for high-value work.",
    problem:
      "Support teams are buried in repetitive tickets, response times slip during peak periods, and staffing 24/7 coverage across channels is expensive. Customers churn when they wait too long for simple answers.",
    howItWorks: [
      "Connects to your help desk, knowledge base, and order or account systems for full customer context.",
      "Understands the customer's intent across chat, email, and messaging channels in their own language.",
      "Resolves common requests directly, order status, refunds, password resets, account changes, by taking real actions.",
      "Escalates complex or sensitive cases to a human agent with a complete conversation summary.",
      "Learns from resolved tickets and agent feedback to expand what it can handle over time.",
    ],
    outcomes: [
      "Automatically resolve up to 60% of incoming tickets without human involvement.",
      "Deliver instant first response and 24/7 coverage across every channel.",
      "Lower cost-per-ticket while improving CSAT with consistent, accurate answers.",
      "Free agents to focus on complex, high-value, and revenue-impacting cases.",
    ],
    features: [
      "Omnichannel support across chat, email, WhatsApp, and web",
      "Grounded answers from your knowledge base and past tickets",
      "Real actions via help desk, e-commerce, and account system integrations",
      "Seamless human handoff with full context and conversation history",
      "Multilingual understanding and brand-consistent tone",
      "Analytics on deflection rate, resolution time, and satisfaction",
    ],
    useCases: [
      "Tier-1 ticket deflection for e-commerce and SaaS support",
      "Order tracking, returns, and account self-service",
      "After-hours and overflow coverage during peak demand",
      "Multilingual support for global customer bases",
    ],
    techStack: ["LLM", "Retrieval-Augmented Generation", "Help Desk APIs", "Intent Classification", "Workflow Automation"],
  },
  {
    id: 4,
    slug: "predictive-lead-scoring",
    name: "Predictive Lead Scoring",
    tagline: "Spend your sales effort where it actually converts.",
    category: "Predictive ML",
    icon: Target,
    accentColor: "#1D75FF",
    summary:
      "Machine learning that ranks every lead by likelihood to convert, so sales and marketing focus on the prospects that matter. Built on first-party behavioral, CRM, and campaign data, it scores leads in real time and continuously improves as outcomes come in.",
    problem:
      "Sales teams waste time on leads that will never buy while high-intent prospects slip through the cracks. Generic scoring rules and gut feel lead to misallocated effort, higher acquisition costs, and lost revenue.",
    howItWorks: [
      "Unifies first-party data across web, app, CRM, and marketing platforms into a single lead profile.",
      "Engineers behavioral, demographic, and seasonality-aware features that actually predict conversion.",
      "Trains and blends multiple algorithms, often 10 to 12 models, with separate web and app models for accuracy.",
      "Scores leads in real time, hourly, or on a T-1 batch and pushes rankings back to sales and ad platforms.",
      "Continuously retrains on new outcomes so accuracy compounds over time.",
    ],
    outcomes: [
      "Drove +22% incremental sales for a life insurer through multi-model predictive scoring.",
      "Lifted conversion rate by +30% for a home-services brand via ML-scored audiences exported to ad platforms.",
      "Prioritize sales capacity on the highest-propensity leads to raise win rates.",
      "Lower customer acquisition cost by suppressing spend on low-intent prospects.",
    ],
    features: [
      "Multi-algorithm ensemble with separate web and app models",
      "First-party data integration across GA4, BigQuery, and CRM",
      "Real-time, hourly, and batch scoring modes",
      "Seasonality-aware feature engineering",
      "Scored audiences exportable to ad and marketing platforms",
      "Continuous retraining and model monitoring",
    ],
    useCases: [
      "Ranking inbound leads for sales prioritization",
      "Building high-propensity audiences for paid media",
      "Insurance, BFSI, and high-consideration purchase funnels",
      "Marketing qualified lead (MQL) to SQL routing",
    ],
    techStack: ["Python", "Scikit-learn / XGBoost", "BigQuery", "GA4", "CRM Integration", "Feature Store"],
  },
  {
    id: 5,
    slug: "churn-prediction",
    name: "Churn Prediction",
    tagline: "Know who's about to leave, before they do.",
    category: "Predictive ML",
    icon: TrendingDown,
    accentColor: "#4DA6FF",
    summary:
      "A predictive model that flags users and customers at risk of churning within a defined window, with enough lead time to act. It turns engagement, transaction, and support signals into a ranked risk list that powers targeted retention, not blanket discounts.",
    problem:
      "Businesses usually discover churn only after it happens, when win-back is expensive and unlikely. Retention teams lack the early, prioritized signal needed to intervene with the right customers at the right moment.",
    howItWorks: [
      "Analyzes historical engagement, transaction, and support data to learn the patterns that precede churn.",
      "Builds a feature set from behavioral signals like declining usage, broken streaks, and support friction.",
      "Predicts each user's churn risk within a chosen window and ranks them by likelihood.",
      "Explains why each user is at risk so retention teams can tailor the intervention.",
      "Feeds risk scores into campaign, CRM, and lifecycle tools to trigger targeted outreach.",
    ],
    outcomes: [
      "Identify at-risk users with enough lead time to run effective retention plays.",
      "Improve retention ROI by targeting interventions instead of discounting everyone.",
      "Protect recurring revenue by acting on early warning signals.",
      "Personalize outreach using the specific driver behind each user's risk.",
    ],
    features: [
      "Windowed churn prediction with configurable time horizons",
      "Explainable risk drivers for each flagged user",
      "Ranked, exportable risk lists for retention campaigns",
      "Behavioral, transactional, and support signal ingestion",
      "Integration with CRM and lifecycle marketing tools",
      "Ongoing accuracy monitoring and retraining",
    ],
    useCases: [
      "Subscription and SaaS retention programs",
      "App engagement and re-activation campaigns",
      "Banking, telecom, and membership churn reduction",
      "Proactive customer success prioritization",
    ],
    techStack: ["Python", "Gradient Boosting", "SHAP Explainability", "BigQuery ML", "Lifecycle Marketing APIs"],
  },
  {
    id: 6,
    slug: "recommendation-engine",
    name: "Recommendation Engine",
    tagline: "Show every customer what they're most likely to buy next.",
    category: "Predictive ML",
    icon: Sparkles,
    accentColor: "#6366F1",
    summary:
      "A personalization engine that recommends the right content, products, or offers to each user in real time. It combines behavioral signals, collaborative filtering, and content affinity to lift engagement, basket size, and conversion across web, app, and email.",
    problem:
      "Generic, one-size-fits-all merchandising buries relevant products and content. Without personalization, engagement stalls, cross-sell opportunities are missed, and customers leave without discovering what they actually wanted.",
    howItWorks: [
      "Captures user behavior, views, clicks, purchases, and content consumption, in real time.",
      "Learns user and item affinities using collaborative filtering and content-based models.",
      "Generates ranked recommendations for each user and context, including cross-category suggestions.",
      "Serves recommendations via API to web, app, email, and ad channels with low latency.",
      "Measures uplift and retrains continuously to keep recommendations fresh.",
    ],
    outcomes: [
      "Lifted engagement and conversion by +30% for a digital publisher's content recommendations.",
      "Increased click-through rate by +30% with cross-category product recommendations for a multi-category retailer.",
      "Grow average order value through relevant cross-sell and upsell.",
      "Increase repeat visits and time-on-site with personalized discovery.",
    ],
    features: [
      "Real-time personalized recommendations via API",
      "Collaborative filtering plus content-based affinity",
      "Cross-category and cross-sell recommendations",
      "Cold-start handling for new users and new items",
      "A/B testing and uplift measurement built in",
      "Deployable across web, app, email, and ad platforms",
    ],
    useCases: [
      "Product recommendations for e-commerce and marketplaces",
      "Content and article recommendations for publishers and media",
      "Personalized email and push campaigns",
      "Cross-category upsell for multi-line retailers",
    ],
    techStack: ["Python", "Collaborative Filtering", "Embeddings", "Real-Time Serving API", "BigQuery"],
  },
  {
    id: 7,
    slug: "demand-forecasting",
    name: "Demand Forecasting",
    tagline: "Stock, staff, and plan with confidence, not guesswork.",
    category: "Predictive ML",
    icon: LineChart,
    accentColor: "#0EA5E9",
    summary:
      "Time-series machine learning that forecasts demand at the SKU, store, or channel level, accounting for seasonality, promotions, and external drivers. It replaces spreadsheet guesswork with accurate, granular predictions that drive smarter inventory and planning decisions.",
    problem:
      "Inaccurate forecasts lead to stockouts that lose sales and overstock that ties up cash. Manual, spreadsheet-based planning can't capture seasonality, promotions, and demand volatility across many products and locations.",
    howItWorks: [
      "Consolidates historical sales, promotions, pricing, and external signals into a clean forecasting dataset.",
      "Models seasonality, trend, and event effects with modern time-series and ML techniques.",
      "Generates granular forecasts at the SKU, location, and channel level with confidence ranges.",
      "Surfaces forecasts in planning dashboards and pushes them into ERP and inventory systems.",
      "Backtests and retrains regularly to track accuracy and adapt to shifting demand.",
    ],
    outcomes: [
      "Reduce stockouts and lost sales with more accurate, granular forecasts.",
      "Cut excess inventory and free up working capital.",
      "Improve promotion and pricing planning with demand impact modeling.",
      "Replace manual forecasting effort with automated, continuously updated predictions.",
    ],
    features: [
      "SKU, store, and channel-level granular forecasts",
      "Seasonality, promotion, and event-aware modeling",
      "Confidence intervals for risk-aware planning",
      "External driver support (weather, holidays, macro signals)",
      "ERP and inventory system integration",
      "Automated backtesting and accuracy monitoring",
    ],
    useCases: [
      "Retail and CPG inventory and replenishment planning",
      "Workforce and capacity planning",
      "Supply chain and procurement optimization",
      "Financial and revenue forecasting",
    ],
    techStack: ["Python", "Time-Series ML", "Prophet / Gradient Boosting", "BigQuery", "ERP Integration"],
  },
  {
    id: 8,
    slug: "customer-segmentation",
    name: "Customer Segmentation",
    tagline: "Understand your customers as the distinct groups they are.",
    category: "Predictive ML",
    icon: Users,
    accentColor: "#1D75FF",
    summary:
      "Data-driven segmentation that groups customers by behavior, value, and lifecycle stage, going far beyond basic demographics. It reveals actionable segments and lifetime-value tiers so marketing, product, and CX can target each group with precision.",
    problem:
      "Treating all customers the same wastes budget and dilutes messaging. Static, demographic-only segments miss the behavioral patterns that actually drive value, leaving teams unable to personalize at scale.",
    howItWorks: [
      "Unifies behavioral, transactional, and profile data into a single customer view.",
      "Applies clustering and propensity models to discover natural, meaningful segments.",
      "Scores each customer for lifetime value and key propensities such as upsell or churn risk.",
      "Profiles each segment with clear, human-readable characteristics and recommended actions.",
      "Syncs segments to marketing, CRM, and ad platforms for immediate activation.",
    ],
    outcomes: [
      "Increase campaign ROI by targeting the right message to the right segment.",
      "Identify and prioritize high-lifetime-value customers for retention and growth.",
      "Personalize product and CX experiences at scale.",
      "Reduce wasted spend on low-value or misaligned audiences.",
    ],
    features: [
      "Behavioral, value-based, and lifecycle segmentation",
      "Lifetime value (LTV) and propensity scoring",
      "Human-readable segment profiles and recommended actions",
      "Dynamic segments that update as behavior changes",
      "Activation across CRM, email, and ad platforms",
      "First-party data and expert feature engineering (PredictN method)",
    ],
    useCases: [
      "Personalized marketing and lifecycle campaigns",
      "High-value customer identification and retention",
      "Product and pricing strategy by segment",
      "Audience building for paid media",
    ],
    techStack: ["Python", "Clustering (K-Means / HDBSCAN)", "LTV Modeling", "BigQuery", "CDP / CRM Integration"],
  },
  {
    id: 9,
    slug: "document-ai-ocr",
    name: "Document AI & OCR",
    tagline: "Eliminate manual document processing entirely.",
    category: "Document Intelligence",
    icon: ScanText,
    accentColor: "#4DA6FF",
    summary:
      "An intelligent document platform that reads, understands, and extracts structured data from forms, contracts, IDs, and scans, including messy handwriting and low-quality images. It converts paperwork into clean, validated data your systems can use instantly.",
    problem:
      "Teams spend countless hours manually keying data from documents, introducing errors and delays. Traditional OCR breaks on varied layouts, handwriting, and poor scans, forcing expensive human review.",
    howItWorks: [
      "Ingests documents from email, upload, scanners, or storage in any common format.",
      "Uses OCR and layout-aware AI to read text, tables, and handwriting across varied templates.",
      "Extracts the specific fields you need and structures them into clean, typed data.",
      "Validates and cross-checks extracted values against business rules and reference data.",
      "Delivers structured output to your database, ERP, or workflow, flagging only low-confidence items for review.",
    ],
    outcomes: [
      "Cut document processing time by up to 90% with automated extraction.",
      "Reduce data-entry errors with validation and confidence scoring.",
      "Free staff from repetitive keying for higher-value work.",
      "Scale document throughput without adding headcount.",
    ],
    features: [
      "OCR for printed and handwritten text across languages",
      "Layout-aware extraction for varied and complex templates",
      "Table, line-item, and key-value field extraction",
      "Business-rule validation and confidence scoring",
      "Human-in-the-loop review for low-confidence cases",
      "Integration with ERP, databases, and workflow tools",
    ],
    useCases: [
      "KYC and identity document processing",
      "Contract and agreement data extraction",
      "Forms, applications, and claims digitization",
      "Records digitization and archive migration",
    ],
    techStack: ["OCR", "Document AI Models", "LLM Extraction", "Validation Rules Engine", "Workflow Integration"],
  },
  {
    id: 10,
    slug: "invoice-automation",
    name: "Invoice Processing Automation",
    tagline: "Straight-through invoice processing, from inbox to ERP.",
    category: "Document Intelligence",
    icon: ReceiptText,
    accentColor: "#6366F1",
    summary:
      "End-to-end automation for accounts payable that captures invoices, extracts line items, matches them against purchase orders, and posts to your ERP, with exceptions routed for approval. It slashes manual AP effort and accelerates the entire pay cycle.",
    problem:
      "Accounts payable teams manually enter invoices, chase approvals, and reconcile against purchase orders, a slow, error-prone process that causes late payments, missed discounts, and no real-time spend visibility.",
    howItWorks: [
      "Captures invoices automatically from email, portals, and uploads in any format.",
      "Extracts header and line-item data using document AI tuned for financial documents.",
      "Performs two- and three-way matching against purchase orders and goods receipts.",
      "Routes exceptions and approvals through configurable workflows with clear audit trails.",
      "Posts approved invoices to your ERP and updates status end to end.",
    ],
    outcomes: [
      "Reduce invoice processing cost and cycle time by up to 80%.",
      "Capture early-payment discounts and avoid late fees.",
      "Improve accuracy with automated matching and validation.",
      "Gain real-time visibility into liabilities and spend.",
    ],
    features: [
      "Automated invoice capture from multiple channels",
      "Header and line-item extraction for financial documents",
      "Two- and three-way PO matching",
      "Configurable approval workflows and audit trails",
      "Exception handling with human review",
      "Direct posting to ERP and accounting systems",
    ],
    useCases: [
      "Accounts payable automation",
      "Vendor invoice and PO reconciliation",
      "Expense and receipt processing",
      "Shared-services finance operations",
    ],
    techStack: ["Document AI", "OCR", "Matching Engine", "Workflow Automation", "ERP Integration (SAP / Oracle / NetSuite)"],
  },
  {
    id: 11,
    slug: "ai-sales-agent",
    name: "AI Sales Agent",
    tagline: "An autonomous SDR that works your pipeline 24/7.",
    category: "Agentic AI",
    icon: Handshake,
    accentColor: "#0EA5E9",
    summary:
      "An agentic sales rep that researches prospects, personalizes outreach, qualifies interest, and books meetings across email and chat, autonomously and at scale. It executes multi-step sales plays, updates your CRM, and hands warm, qualified opportunities to your closers.",
    problem:
      "Sales development is expensive and inconsistent. Reps spend more time on research and admin than selling, follow-up falls through the cracks, and pipeline generation doesn't scale without linear headcount growth.",
    howItWorks: [
      "Researches each prospect using CRM, enrichment, and public signals to build context.",
      "Plans and executes a multi-step outreach sequence personalized to the account and persona.",
      "Engages in two-way conversations over email and chat, answering questions and handling objections.",
      "Qualifies interest against your criteria and books meetings directly on rep calendars.",
      "Logs every interaction to the CRM and hands off qualified opportunities with full context.",
    ],
    outcomes: [
      "Generate more qualified pipeline without adding SDR headcount.",
      "Reach every lead with personalized, timely follow-up, no drop-off.",
      "Book more meetings by responding in seconds, any hour.",
      "Free human reps to focus on high-value conversations and closing.",
    ],
    features: [
      "Autonomous multi-step outreach planning and execution",
      "Prospect research and personalization at scale",
      "Two-way email and chat conversations with objection handling",
      "Calendar-integrated meeting booking",
      "CRM logging and qualified-opportunity handoff",
      "Guardrails, approval modes, and brand-voice controls",
    ],
    useCases: [
      "Outbound prospecting and pipeline generation",
      "Inbound lead qualification and speed-to-lead",
      "Re-engagement of dormant leads and CRM revival",
      "Event and webinar follow-up at scale",
    ],
    techStack: ["LLM Agent Framework", "Tool Use / Function Calling", "CRM Integration", "Email & Calendar APIs", "Data Enrichment"],
  },
  {
    id: 12,
    slug: "ai-analytics-copilot",
    name: "AI Analytics Copilot",
    tagline: "Ask your data anything, in plain English.",
    category: "Generative AI",
    icon: BarChart3,
    accentColor: "#1D75FF",
    summary:
      "A conversational analytics assistant that lets anyone query business data, generate charts, and get explained insights without writing SQL. It connects to your warehouse and BI tools, turning natural-language questions into governed, accurate answers in seconds.",
    problem:
      "Business teams wait days for analysts to answer routine data questions, while analysts drown in ad-hoc report requests. The bottleneck slows decisions and leaves valuable data underused.",
    howItWorks: [
      "Connects securely to your data warehouse, BI tools, and defined metrics layer.",
      "Translates natural-language questions into governed queries against trusted, defined metrics.",
      "Generates charts, tables, and plain-language explanations of the results.",
      "Supports follow-up questions with retained context for true conversational analysis.",
      "Respects data permissions and definitions so answers stay accurate and consistent.",
    ],
    outcomes: [
      "Give every team self-serve access to trusted data in seconds, not days.",
      "Free analysts from ad-hoc requests to focus on deep, strategic work.",
      "Accelerate decisions with instant, explained insights.",
      "Increase data adoption and consistency across the organization.",
    ],
    features: [
      "Natural-language to SQL over your data warehouse",
      "Governed metrics layer for accurate, consistent answers",
      "Automatic chart and visualization generation",
      "Conversational follow-ups with retained context",
      "Permission-aware access and data governance",
      "Integration with warehouses and BI tools",
    ],
    useCases: [
      "Self-serve analytics for business and operations teams",
      "Executive and KPI reporting on demand",
      "Ad-hoc exploration without analyst bottlenecks",
      "Embedded analytics inside internal tools",
    ],
    techStack: ["LLM", "Text-to-SQL", "Semantic / Metrics Layer", "BigQuery / Snowflake", "BI Tool Integration"],
  },
];

export default products;
