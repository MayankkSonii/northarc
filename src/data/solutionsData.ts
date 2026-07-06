import type { LucideIcon } from "lucide-react";
import {
  HeartPulse,
  Landmark,
  ShoppingCart,
  Factory,
  Truck,
  Cloud,
  Newspaper,
  Megaphone,
  Headset,
  Settings2,
  Calculator,
  UserRound,
} from "lucide-react";

export interface Solution {
  id: number;
  slug: string;
  title: string;
  type: "industry" | "function";
  icon: LucideIcon;
  accentColor: string;
  tagline: string;
  summary: string;
  challenges: string[];
  offerings: string[];
  outcomes: string[];
  relatedProducts?: string[];
}

export const solutions: Solution[] = [
  // ─────────────────────────────  INDUSTRIES  ─────────────────────────────
  {
    id: 1,
    slug: "healthcare",
    title: "Healthcare",
    type: "industry",
    icon: HeartPulse,
    accentColor: "#1D75FF",
    tagline: "Free clinicians from paperwork and predict patient risk earlier.",
    summary:
      "We help hospitals, payers, and health-tech providers turn fragmented clinical and operational data into faster care and lower administrative cost — automating document-heavy workflows, surfacing patients at risk, and giving staff instant answers from policy and clinical knowledge, all inside secure, permission-aware systems.",
    challenges: [
      "Clinicians and back-office staff lose hours to manual data entry from forms, referrals, and scanned records.",
      "Patient and member risk signals are buried across EHR, claims, and engagement data until it is too late to intervene.",
      "Support and administrative teams can't scale to answer routine coverage, scheduling, and policy questions.",
      "Strict privacy and compliance requirements make it hard to adopt AI without airtight access controls.",
    ],
    offerings: [
      "Automated intake, claims, and clinical document processing with validation and human review for exceptions.",
      "Predictive risk and churn models that flag patients or members who need proactive outreach.",
      "A permission-aware knowledge assistant that answers policy, coverage, and clinical-protocol questions with citations.",
      "Round-the-clock voice and chat agents for appointment reminders, confirmations, and triage routing.",
    ],
    outcomes: [
      "Cut document and intake processing time by up to 90% while reducing keying errors.",
      "Intervene earlier with at-risk patients and members to improve retention and outcomes.",
      "Deflect routine administrative queries and reclaim clinician and staff time for care.",
      "Deploy inside your cloud or VPC with strict, permission-mirroring data controls.",
    ],
    relatedProducts: ["document-ai-ocr", "churn-prediction", "rag-knowledge-assistant", "voice-ai-calling-agent"],
  },
  {
    id: 2,
    slug: "finance-insurance",
    title: "Finance & Insurance",
    type: "industry",
    icon: Landmark,
    accentColor: "#4DA6FF",
    tagline: "Score risk, convert more policies, and automate the paperwork.",
    summary:
      "We help banks, insurers, and lenders grow the book while cutting operational drag — ranking leads by true propensity to convert, predicting churn and default risk, and automating KYC, claims, and invoice workflows end to end, with governance and auditability built in.",
    challenges: [
      "Sales teams chase low-intent leads while high-propensity prospects go untouched.",
      "Customer and policyholder churn is discovered only after it happens, when win-back is expensive.",
      "KYC, claims, and document review are slow, manual, and error-prone.",
      "Leaders lack fast, trustworthy answers from their own data without waiting on analysts.",
    ],
    offerings: [
      "Multi-model predictive lead scoring on first-party behavioral, CRM, and campaign data.",
      "Churn and retention models with explainable risk drivers for targeted intervention.",
      "Document AI for KYC, applications, and claims, plus straight-through invoice automation.",
      "A governed analytics copilot so teams query risk, portfolio, and performance data in plain English.",
    ],
    outcomes: [
      "Drove +22% incremental sales for a life insurer through multi-model predictive scoring.",
      "Prioritize sales capacity on the highest-propensity prospects to raise win rates.",
      "Protect recurring revenue by acting on early churn and attrition signals.",
      "Compress KYC, claims, and AP cycle times while improving accuracy and audit trails.",
    ],
    relatedProducts: ["predictive-lead-scoring", "churn-prediction", "document-ai-ocr", "ai-analytics-copilot"],
  },
  {
    id: 3,
    slug: "retail-ecommerce",
    title: "Retail & E-commerce",
    type: "industry",
    icon: ShoppingCart,
    accentColor: "#0EA5E9",
    tagline: "Personalize every visit, forecast demand, and lift basket size.",
    summary:
      "We help retailers and marketplaces grow revenue per customer and plan with confidence — serving real-time personalized recommendations, forecasting demand at SKU and store level, segmenting customers by value, and deflecting support tickets so teams focus on growth.",
    challenges: [
      "Generic, one-size-fits-all merchandising buries relevant products and stalls conversion.",
      "Inaccurate forecasts drive stockouts that lose sales and overstock that ties up cash.",
      "Marketing treats all customers the same, wasting spend on low-value audiences.",
      "Support volume spikes during promotions and peak seasons overwhelm the team.",
    ],
    offerings: [
      "Real-time recommendation engine for cross-sell, upsell, and personalized discovery across web, app, and email.",
      "Demand forecasting at SKU, store, and channel level with seasonality and promotion awareness.",
      "Behavioral and value-based customer segmentation with LTV and propensity scoring.",
      "AI support agents that resolve order, returns, and account queries around the clock.",
    ],
    outcomes: [
      "Increased click-through rate by +30% with cross-category product recommendations for a multi-category retailer.",
      "Reduce stockouts and excess inventory with granular, accurate forecasts.",
      "Grow average order value and repeat visits through relevant personalization.",
      "Automatically resolve up to 60% of support tickets during peak demand.",
    ],
    relatedProducts: ["recommendation-engine", "demand-forecasting", "customer-segmentation", "ai-support-agent"],
  },
  {
    id: 4,
    slug: "manufacturing",
    title: "Manufacturing",
    type: "industry",
    icon: Factory,
    accentColor: "#1D75FF",
    tagline: "Plan production accurately and automate the back office.",
    summary:
      "We help manufacturers plan with precision and cut administrative overhead — forecasting demand across products and channels, automating invoice and document processing against POs, and making SOPs and technical knowledge instantly searchable on the floor.",
    challenges: [
      "Spreadsheet-based planning can't capture demand volatility across many SKUs and plants.",
      "Accounts payable teams manually key invoices and reconcile them against purchase orders.",
      "Frontline and field staff struggle to find the right SOP, spec, or manual quickly.",
      "Procurement and capacity decisions rely on lagging, manual reports.",
    ],
    offerings: [
      "Demand forecasting to drive smarter inventory, procurement, and capacity planning.",
      "Invoice automation with two- and three-way PO matching straight into your ERP.",
      "Document AI to digitize forms, specs, and records into clean structured data.",
      "A knowledge assistant that answers SOP, spec, and manual questions with citations.",
    ],
    outcomes: [
      "Reduce stockouts and free up working capital with more accurate forecasts.",
      "Cut invoice processing cost and cycle time by up to 80%.",
      "Give floor and field staff instant, verifiable answers from technical documentation.",
      "Improve procurement and capacity planning with demand-impact modeling.",
    ],
    relatedProducts: ["demand-forecasting", "invoice-automation", "document-ai-ocr", "rag-knowledge-assistant"],
  },
  {
    id: 5,
    slug: "logistics",
    title: "Logistics & Supply Chain",
    type: "industry",
    icon: Truck,
    accentColor: "#4DA6FF",
    tagline: "Forecast demand, automate documents, and keep customers informed.",
    summary:
      "We help logistics and supply-chain operators run leaner and communicate faster — forecasting volume to plan fleet and warehouse capacity, automating shipping and customs paperwork, and handling status and tracking queries automatically across voice and chat.",
    challenges: [
      "Volume and capacity planning are reactive, leading to costly under- or over-staffing.",
      "Shipping, customs, and proof-of-delivery documents are processed manually and slowly.",
      "Customers flood support with repetitive tracking and status requests.",
      "Operational data is locked in systems that only analysts can query.",
    ],
    offerings: [
      "Demand and volume forecasting for fleet, warehouse, and workforce planning.",
      "Document AI for shipping docs, customs forms, and delivery records.",
      "Voice and chat agents that answer tracking, ETA, and status questions automatically.",
      "A conversational analytics copilot for on-demand operational reporting.",
    ],
    outcomes: [
      "Plan capacity with confidence and reduce costly under- and over-staffing.",
      "Cut document handling time and errors across the shipping lifecycle.",
      "Deflect repetitive tracking and status queries from human agents.",
      "Give operations teams self-serve, instant answers from their own data.",
    ],
    relatedProducts: ["demand-forecasting", "document-ai-ocr", "ai-support-agent", "ai-analytics-copilot"],
  },
  {
    id: 6,
    slug: "saas-technology",
    title: "SaaS & Technology",
    type: "industry",
    icon: Cloud,
    accentColor: "#6366F1",
    tagline: "Reduce churn, scale support, and generate pipeline autonomously.",
    summary:
      "We help SaaS and technology companies grow net revenue retention and pipeline efficiency — predicting churn with lead time to act, deflecting support tickets at scale, generating qualified pipeline with autonomous agents, and giving every team self-serve analytics.",
    challenges: [
      "Churn is spotted too late, eroding recurring revenue and net retention.",
      "Support ticket volume scales linearly with customers and headcount.",
      "Pipeline generation stalls without adding expensive SDR headcount.",
      "Product and go-to-market teams wait days for analysts to answer data questions.",
    ],
    offerings: [
      "Churn prediction with explainable drivers to power proactive customer success.",
      "AI support agents that resolve tier-1 tickets across chat, email, and messaging.",
      "An autonomous AI sales agent that researches, personalizes, and books meetings.",
      "An analytics copilot for self-serve product and revenue insights.",
    ],
    outcomes: [
      "Identify at-risk accounts with enough lead time to run effective retention plays.",
      "Automatically resolve up to 60% of incoming tickets, cutting cost-per-ticket.",
      "Generate more qualified pipeline without adding SDR headcount.",
      "Give every team trusted, self-serve data access in seconds, not days.",
    ],
    relatedProducts: ["churn-prediction", "ai-support-agent", "ai-sales-agent", "ai-analytics-copilot"],
  },
  {
    id: 7,
    slug: "media-publishing",
    title: "Media & Publishing",
    type: "industry",
    icon: Newspaper,
    accentColor: "#0EA5E9",
    tagline: "Lift engagement with personalization and unlock your archives.",
    summary:
      "We help media and publishing businesses grow engagement and subscriber value — recommending the right content to every reader, segmenting audiences for retention, and turning vast content archives into an instantly searchable, cited knowledge base.",
    challenges: [
      "Undifferentiated content feeds fail to hold reader attention and drive subscriptions.",
      "Audiences are treated as one block, diluting retention and conversion campaigns.",
      "Decades of archived content are hard to search, reuse, and monetize.",
      "Reader churn erodes subscription revenue before teams can react.",
    ],
    offerings: [
      "A recommendation engine for personalized content discovery across web, app, and email.",
      "Behavioral audience segmentation with LTV and propensity scoring for retention.",
      "A knowledge assistant that makes archives and research instantly searchable with citations.",
      "Churn prediction to protect and grow subscriber revenue.",
    ],
    outcomes: [
      "Lifted engagement and conversion by +30% for a digital publisher's content recommendations.",
      "Increase repeat visits and time-on-site with personalized discovery.",
      "Unlock and monetize archives with instant, cited search.",
      "Protect subscription revenue by acting on early churn signals.",
    ],
    relatedProducts: ["recommendation-engine", "customer-segmentation", "rag-knowledge-assistant", "churn-prediction"],
  },

  // ─────────────────────────────  FUNCTIONS  ─────────────────────────────
  {
    id: 8,
    slug: "sales-marketing",
    title: "Sales & Marketing",
    type: "function",
    icon: Megaphone,
    accentColor: "#1D75FF",
    tagline: "Focus effort where it converts and generate pipeline 24/7.",
    summary:
      "We help revenue teams spend effort where it pays off — ranking leads by true propensity to convert, building high-value audiences and segments, and deploying autonomous agents that research, personalize outreach, and book qualified meetings around the clock.",
    challenges: [
      "Reps waste time on low-intent leads while hot prospects slip through the cracks.",
      "Generic audiences and demographic segments miss the behavior that drives value.",
      "Follow-up is inconsistent and pipeline generation doesn't scale without headcount.",
      "Marketing can't tie spend to the audiences most likely to convert.",
    ],
    offerings: [
      "Predictive lead scoring on first-party behavioral, CRM, and campaign data.",
      "Behavioral and value-based segmentation with LTV and propensity scoring.",
      "An autonomous AI sales agent for prospecting, outreach, and meeting booking.",
      "Voice AI agents for high-volume qualification and speed-to-lead follow-up.",
    ],
    outcomes: [
      "Drove +22% incremental sales for a life insurer through multi-model predictive scoring.",
      "Lifted conversion rate by +30% for a home-services brand via ML-scored audiences.",
      "Generate more qualified pipeline without adding SDR headcount.",
      "Lower acquisition cost by suppressing spend on low-intent prospects.",
    ],
    relatedProducts: ["predictive-lead-scoring", "customer-segmentation", "ai-sales-agent", "voice-ai-calling-agent"],
  },
  {
    id: 9,
    slug: "customer-support",
    title: "Customer Support",
    type: "function",
    icon: Headset,
    accentColor: "#4DA6FF",
    tagline: "Resolve tickets automatically and answer instantly, 24/7.",
    summary:
      "We help support organizations deliver instant, consistent service at lower cost — resolving common tickets end to end across every channel, answering inbound calls with human-quality voice agents, and grounding every response in your own knowledge with citations.",
    challenges: [
      "Teams are buried in repetitive tickets and response times slip during peaks.",
      "Staffing 24/7 coverage across channels and time zones is expensive.",
      "Answers are inconsistent and knowledge is scattered across systems.",
      "Inbound calls go unanswered, sending customers to competitors.",
    ],
    offerings: [
      "AI support agents that resolve tier-1 tickets across chat, email, and messaging.",
      "Voice AI agents for inbound answering, routing, and FAQ handling.",
      "A permission-aware knowledge assistant for grounded, cited answers.",
      "Seamless human handoff with full context for complex cases.",
    ],
    outcomes: [
      "Automatically resolve up to 60% of incoming tickets without human involvement.",
      "Deliver instant first response and 24/7 coverage across every channel.",
      "Lower cost-per-ticket while improving CSAT with consistent answers.",
      "Free agents for complex, high-value, and revenue-impacting cases.",
    ],
    relatedProducts: ["ai-support-agent", "voice-ai-calling-agent", "rag-knowledge-assistant"],
  },
  {
    id: 10,
    slug: "operations",
    title: "Operations",
    type: "function",
    icon: Settings2,
    accentColor: "#0EA5E9",
    tagline: "Automate document work and plan with data, not guesswork.",
    summary:
      "We help operations teams remove manual drag and plan with confidence — automating document-heavy processes, forecasting demand for capacity and inventory planning, and giving teams instant, self-serve answers from operational data.",
    challenges: [
      "Manual document processing and data entry consume hours and introduce errors.",
      "Planning relies on spreadsheets that can't capture volatility across the business.",
      "SOPs and process knowledge are hard to find when frontline teams need them.",
      "Operational reporting bottlenecks on a small number of analysts.",
    ],
    offerings: [
      "Document AI to convert forms, records, and scans into clean structured data.",
      "Demand forecasting for inventory, capacity, and workforce planning.",
      "A knowledge assistant that answers SOP and process questions with citations.",
      "An analytics copilot for on-demand operational reporting in plain English.",
    ],
    outcomes: [
      "Cut document processing time by up to 90% with automated extraction.",
      "Plan inventory and capacity with accurate, granular forecasts.",
      "Give frontline teams instant, verifiable answers from process documentation.",
      "Remove analyst bottlenecks with self-serve operational insights.",
    ],
    relatedProducts: ["document-ai-ocr", "demand-forecasting", "rag-knowledge-assistant", "ai-analytics-copilot"],
  },
  {
    id: 11,
    slug: "finance-accounting",
    title: "Finance & Accounting",
    type: "function",
    icon: Calculator,
    accentColor: "#1D75FF",
    tagline: "Straight-through invoice processing and instant financial answers.",
    summary:
      "We help finance teams close faster and cut manual effort — automating accounts payable from inbox to ERP, extracting and validating data from financial documents, and letting anyone query financial performance in plain English against governed metrics.",
    challenges: [
      "AP teams manually key invoices, chase approvals, and reconcile against POs.",
      "Late payments and missed early-payment discounts erode margin.",
      "Financial documents require slow, error-prone manual data entry.",
      "Leaders wait on analysts for routine financial and spend reporting.",
    ],
    offerings: [
      "Invoice automation with two- and three-way PO matching straight into your ERP.",
      "Document AI for financial forms, statements, and receipts with validation.",
      "A governed analytics copilot for self-serve financial and spend reporting.",
      "Configurable approval workflows with clear audit trails.",
    ],
    outcomes: [
      "Reduce invoice processing cost and cycle time by up to 80%.",
      "Capture early-payment discounts and avoid late fees.",
      "Gain real-time visibility into liabilities and spend.",
      "Answer routine finance questions instantly against trusted metrics.",
    ],
    relatedProducts: ["invoice-automation", "document-ai-ocr", "ai-analytics-copilot"],
  },
  {
    id: 12,
    slug: "hr-recruiting",
    title: "HR & Recruiting",
    type: "function",
    icon: UserRound,
    accentColor: "#4DA6FF",
    tagline: "Answer employee questions instantly and predict attrition early.",
    summary:
      "We help HR and talent teams scale support and retain people — giving employees an always-available assistant for policy and benefits questions, automating document-heavy onboarding, and predicting attrition risk with enough lead time to act.",
    challenges: [
      "HR teams field the same policy, benefits, and leave questions endlessly.",
      "Onboarding and compliance paperwork is manual and slow.",
      "Employee attrition is discovered only after resignations land.",
      "New hires take months to find the information they need to be productive.",
    ],
    offerings: [
      "A permission-aware knowledge assistant for HR, benefits, and policy questions.",
      "Document AI to automate onboarding forms and compliance paperwork.",
      "Attrition prediction with explainable drivers for proactive retention.",
      "24/7 self-service answers that reduce repetitive HR workload.",
    ],
    outcomes: [
      "Reduce repetitive HR questions and interruptions by up to 70%.",
      "Onboard new hires faster with an always-available internal expert.",
      "Identify flight-risk employees with lead time to intervene.",
      "Automate onboarding paperwork and cut manual data entry.",
    ],
    relatedProducts: ["rag-knowledge-assistant", "document-ai-ocr", "churn-prediction"],
  },
];

export const industries: Solution[] = solutions.filter((s) => s.type === "industry");
export const functions: Solution[] = solutions.filter((s) => s.type === "function");

export default solutions;
