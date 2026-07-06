export interface BlogSection {
  type: "h2" | "h3" | "p" | "ul" | "ol" | "quote" | "callout" | "code";
  content?: string;
  items?: string[];
  language?: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  category: string;
  tags: string[];
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  accentColor: string;
  featured?: boolean;
  author: string;
  authorRole: string;
  sections: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "ai-agents-are-reshaping-the-web",
    category: "AI Agents",
    tags: ["AI Agents", "Agentic AI", "Autonomous Systems"],
    title: "AI Agents Are Now Your Customers: What the Agentic Web Means for Your Business",
    excerpt:
      "Autonomous AI agents are already browsing, comparing, and buying on the open web. Learn how the agentic shift changes how customers reach you, how to tell agent traffic from human traffic, and how to prepare your digital experience for a world where software makes the purchase.",
    date: "Jul 2026",
    readTime: "8 min read",
    accentColor: "#1D75FF",
    featured: true,
    author: "NorthArc Team",
    authorRole: "AI Engineering",
    sections: [
      {
        type: "h2",
        content: "What Is the Agentic Web?",
      },
      {
        type: "p",
        content:
          "The web has always had bots. Googlebot, Bingbot, scraping scripts, uptime monitors. Analytics platforms like GA4 have long filtered known bot traffic using the IAB/ABC International Spiders and Bots List. But something fundamentally different is happening now. AI-powered agents are browsing the web not to index it, but to act on it, filling out forms, reading product descriptions, comparing prices, and navigating multi-step user flows. These agents look like humans to your analytics stack. And they're in your GA4 data right now.",
      },
      {
        type: "h2",
        content: "Why Agentic Traffic Is Different",
      },
      {
        type: "p",
        content:
          "Traditional bots are relatively easy to identify. They use known user agents, they don't execute JavaScript, they don't engage with page content, and they often appear in server logs without a corresponding GA4 session. AI agents are different in every one of these dimensions:",
      },
      {
        type: "ul",
        items: [
          "They use real browsers (often Chromium-based) that execute JavaScript and fire GA4 events normally",
          "They have realistic viewport sizes, user agents, and screen resolutions",
          "They navigate multi-step flows, product pages, comparison pages, checkout flows",
          "They generate session duration and engagement metrics that look human",
          "GA4's built-in bot filtering doesn't catch them because they aren't on known bot lists",
          "They often trigger conversion events, add_to_cart, begin_checkout, that inflate your conversion metrics",
        ],
      },
      {
        type: "h2",
        content: "How to Identify Agentic Sessions in GA4",
      },
      {
        type: "p",
        content:
          "There's no single definitive signal that identifies an AI agent session. Instead, you're looking for clusters of unusual patterns that, in combination, strongly suggest non-human traffic:",
      },
      {
        type: "h3",
        content: "Signal 1: Navigation Speed",
      },
      {
        type: "p",
        content:
          "AI agents can navigate pages far faster than humans. A session that views 12 product pages in 45 seconds, with engagement events on each, is almost certainly not human. In GA4 Explorations, filter for sessions with time_per_page below a human minimum threshold (typically < 3 seconds for content pages).",
      },
      {
        type: "h3",
        content: "Signal 2: Implausible Event Sequences",
      },
      {
        type: "p",
        content:
          "AI agents follow task scripts, not natural browsing patterns. Look for sessions that go directly from a landing page to checkout without the browsing, back-navigation, and comparison behaviour of real shoppers. The event sequence in GA4's Path Exploration can reveal these robotic funnels.",
      },
      {
        type: "h3",
        content: "Signal 3: Network Characteristics",
      },
      {
        type: "p",
        content:
          "Many AI agents run in cloud infrastructure. Sessions originating from AWS, Google Cloud, or Azure IP ranges, combined with behavioural anomalies, are strong candidates for filtering. You can pass IP-derived network type as a custom dimension via your data layer.",
      },
      {
        type: "h3",
        content: "Signal 4: Missing Human Micro-Interactions",
      },
      {
        type: "p",
        content:
          "Real humans scroll inconsistently, move their mouse, pause on images, and sometimes navigate back. AI agents often interact with pages in a programmatic sequence: load → extract → proceed. You can detect absence of scroll events or mouse movement events on pages where real users almost always scroll.",
      },
      {
        type: "callout",
        content:
          "Important: Don't filter aggressively based on single signals. A legitimate user on a fast connection might look like a bot on speed metrics alone. Build a composite scoring approach that requires multiple signals before classifying a session as agentic.",
      },
      {
        type: "h2",
        content: "Filtering Strategies in GA4",
      },
      {
        type: "p",
        content:
          "Once you've identified agentic traffic patterns, you have several options for handling them in GA4:",
      },
      {
        type: "h3",
        content: "Option 1: Internal Traffic Filter",
      },
      {
        type: "p",
        content:
          "If your agentic traffic comes from known IP ranges, you can define them as internal traffic in GA4 Admin → Data Streams → Internal Traffic. This is the cleanest approach but only works for traffic with predictable IP origins.",
      },
      {
        type: "h3",
        content: "Option 2: Custom Event Parameter + Audience Exclusion",
      },
      {
        type: "p",
        content:
          "Pass a custom parameter (e.g., session_type: 'suspected_bot') when your detection logic identifies an agentic session, then use this parameter to build an excluded audience in your GA4 data filters.",
      },
      {
        type: "h3",
        content: "Option 3: BigQuery Post-Processing",
      },
      {
        type: "p",
        content:
          "For sophisticated analysis, export your raw GA4 data to BigQuery and apply your detection model at query time. This gives you maximum flexibility to refine your criteria without permanently filtering data from GA4.",
      },
      {
        type: "code",
        content: `-- BigQuery: Flag suspected agentic sessions
SELECT
  session_id,
  COUNT(event_name) as event_count,
  MIN(event_timestamp) as session_start,
  MAX(event_timestamp) as session_end,
  TIMESTAMP_DIFF(
    TIMESTAMP_MICROS(MAX(event_timestamp)),
    TIMESTAMP_MICROS(MIN(event_timestamp)),
    SECOND
  ) as session_duration_seconds,
  COUNT(event_name) / NULLIF(
    TIMESTAMP_DIFF(
      TIMESTAMP_MICROS(MAX(event_timestamp)),
      TIMESTAMP_MICROS(MIN(event_timestamp)),
      SECOND
    ), 0
  ) as events_per_second,
  -- Flag if > 0.5 events/second AND > 8 events
  CASE
    WHEN COUNT(event_name) > 8
    AND (COUNT(event_name) / NULLIF(
      TIMESTAMP_DIFF(
        TIMESTAMP_MICROS(MAX(event_timestamp)),
        TIMESTAMP_MICROS(MIN(event_timestamp)),
        SECOND
      ), 0
    )) > 0.5 THEN 'suspected_agentic'
    ELSE 'likely_human'
  END as session_classification
FROM \`your_project.analytics_XXXXXXX.events_*\`
WHERE _TABLE_SUFFIX = FORMAT_DATE('%Y%m%d', CURRENT_DATE())
GROUP BY session_id
ORDER BY events_per_second DESC`,
        language: "sql",
      },
      {
        type: "h2",
        content: "The Broader Measurement Implication",
      },
      {
        type: "p",
        content:
          "Agentic traffic isn't going away, it's going to grow dramatically as AI assistants, shopping agents, and research tools become mainstream. The analytics community needs to build detection and filtering into standard measurement frameworks, the same way we normalised spam filtering and bot exclusion in previous eras. Start auditing your GA4 data for agentic patterns now, before the signal-to-noise ratio deteriorates further.",
      },
      {
        type: "quote",
        content:
          "\"The question isn't whether AI agents are in your analytics data. They are. The question is what percentage of your conversion data they currently account for, and whether you have any idea.\"",
      },
    ],
  },
  {
    id: 2,
    slug: "llm-agents-for-incident-diagnosis",
    category: "AI Engineering",
    tags: ["LLM Agents", "AIOps", "Root Cause Analysis"],
    title: "LLM Agents for Incident Diagnosis: From Alert to Answer in Seconds",
    excerpt:
      "When a critical system fails at 2am, every minute costs you. We explore how LLM-powered diagnostic agents automatically detect anomalies, reason over logs and dependencies, and surface the root cause with a fix, turning hours of firefighting into a two-paragraph summary.",
    date: "Jun 2026",
    readTime: "6 min read",
    accentColor: "#4DA6FF",
    featured: true,
    author: "NorthArc Team",
    authorRole: "AI Engineering",
    sections: [
      {
        type: "h2",
        content: "The Problem with Traditional Data Alerts",
      },
      {
        type: "p",
        content:
          "Most analytics teams have some form of alerting, a Slack notification when a scheduled query fails, an email when a dashboard hasn't refreshed, maybe a PagerDuty integration for critical pipelines. These alerts tell you that something went wrong. They don't tell you what, why, or how to fix it. By the time a human investigates, identifies the root cause, and applies a fix, hours have passed. If the failure happened at 2am, the first person who knows about it might be the CMO wondering why the weekly report looks wrong.",
      },
      {
        type: "h2",
        content: "What AI-Powered Incident Diagnosis Looks Like",
      },
      {
        type: "p",
        content:
          "An effective AI incident diagnosis system doesn't just detect failures, it reasons about them. When a pipeline fails, the system should:",
      },
      {
        type: "ol",
        items: [
          "Detect the anomaly automatically, without requiring a human to notice it",
          "Classify the failure type based on error signatures and historical patterns",
          "Trace the root cause by walking the dependency graph upstream from the failure point",
          "Assess the blast radius, which downstream reports, dashboards, and decisions are affected",
          "Propose or execute a fix, or route the incident to the appropriate human with full context",
          "Log the resolution for future training data",
        ],
      },
      {
        type: "h2",
        content: "Architecture: Building an Intelligent Monitoring System",
      },
      {
        type: "h3",
        content: "Layer 1: Anomaly Detection",
      },
      {
        type: "p",
        content:
          "The foundation is statistical anomaly detection on your key pipeline metrics: row counts, null rates, value distributions, processing times. Tools like BigQuery ML's ARIMA_PLUS model can detect when a metric deviates from expected seasonal patterns, including distinguishing a genuine failure from a normal weekend traffic dip.",
      },
      {
        type: "h3",
        content: "Layer 2: Dependency Mapping",
      },
      {
        type: "p",
        content:
          "Every table in your data warehouse has upstream dependencies, raw data sources, transformation jobs, external API calls. Maintaining a graph of these dependencies allows the system to answer 'if this table is wrong, what caused it?' rather than just 'this table is wrong.'",
      },
      {
        type: "h3",
        content: "Layer 3: LLM-Powered Root Cause Analysis",
      },
      {
        type: "p",
        content:
          "This is where modern AI changes the game. By providing an LLM with the error logs, the pipeline dependency graph, and historical incident patterns, you can generate natural language root cause summaries that a human analyst can immediately understand and act on, rather than raw stack traces.",
      },
      {
        type: "code",
        content: `# Simplified example: LLM root cause analysis
import anthropic

def diagnose_pipeline_failure(error_log: str, dependency_context: dict) -> str:
    client = anthropic.Anthropic()
    
    prompt = f"""
You are a data engineering expert diagnosing a pipeline failure.

Error Log:
{error_log}

Pipeline Dependencies:
{dependency_context}

Provide:
1. Root cause (1 sentence)
2. Affected downstream systems
3. Recommended fix
4. Estimated resolution time
"""
    
    message = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}]
    )
    
    return message.content[0].text`,
        language: "python",
      },
      {
        type: "h2",
        content: "Real-World Results",
      },
      {
        type: "p",
        content:
          "Teams that implement AI-powered incident diagnosis typically see mean time to resolution (MTTR) drop by 70–85%. More importantly, they shift from reactive firefighting to proactive reliability management, because the system surfaces patterns across incidents that humans would miss in one-off investigations.",
      },
      {
        type: "callout",
        content:
          "The goal isn't to replace human judgment, it's to ensure that when human judgment is needed, the human arrives with full context, not a blank error screen.",
      },
      {
        type: "quote",
        content:
          "\"Our on-call rotation used to mean waking up to a wall of error messages and spending 90 minutes figuring out what happened. Now the system sends us a two-paragraph summary with the fix already applied or the next step clearly defined.\"",
      },
    ],
  },
  {
    id: 3,
    slug: "feature-pipelines-for-production-ml",
    category: "MLOps",
    tags: ["Feature Engineering", "ML Pipelines", "MLOps"],
    title: "Feature Pipelines for Production ML: From Raw Events to Model-Ready Signals",
    excerpt:
      "A model is only as good as the features you feed it. This guide walks through the pipeline that turns raw behavioural and transactional data into reliable, model-ready features, and the design choices that separate a demo from a system your business can trust in production.",
    date: "Jun 2026",
    readTime: "7 min read",
    accentColor: "#6366F1",
    featured: false,
    author: "NorthArc Team",
    authorRole: "AI Engineering",
    sections: [
      {
        type: "h2",
        content: "The Feature Pipeline: A Mental Model",
      },
      {
        type: "p",
        content:
          "Most teams obsess over model architecture and neglect the pipeline that produces the features the model learns from. Yet in production ML, the feature pipeline is where the majority of accuracy, and the majority of failures, actually live. Between raw event data and a model-ready feature vector sits a series of transformations that materially affect what your model can learn and how reliably it performs after deployment.",
      },
      {
        type: "h2",
        content: "Stage 1: Ingestion",
      },
      {
        type: "p",
        content:
          "Raw signal arrives from many sources, behavioural event streams, transactional systems, CRM records, and third-party enrichment. At this stage the priority is faithful capture: validating schemas, rejecting malformed records, and deduplicating within a short window. Resist the urge to transform here. The ingestion layer's only job is to land trustworthy raw data that everything downstream can depend on.",
      },
      {
        type: "h2",
        content: "Stage 2: Transformation & Feature Engineering",
      },
      {
        type: "p",
        content:
          "This is where most of the value, and most of the subtle bugs, are created. A robust feature layer applies:",
      },
      {
        type: "ul",
        items: [
          "Entity resolution: stitching events to a stable user or account ID across devices and sessions",
          "Windowed aggregations: recency, frequency, and monetary features computed over rolling time windows",
          "Behavioural sequences: ordered event paths that capture intent, not just counts",
          "Categorical encoding and normalisation applied consistently between training and serving",
          "Leakage guards: ensuring no feature encodes information that would not be available at prediction time",
          "First-party enrichment: joining expert-engineered domain features that generic models never see",
        ],
      },
      {
        type: "h2",
        content: "Stage 3: The Training / Serving Boundary",
      },
      {
        type: "p",
        content:
          "The single most common cause of a model that performs well offline but fails in production is training/serving skew, the features computed at training time are subtly different from those computed at inference. A disciplined feature pipeline computes features through shared logic so that the same transformation runs in batch training and in real-time serving. When that logic diverges, your offline metrics become fiction.",
      },
      {
        type: "h3",
        content: "Batch vs. Real-Time Features",
      },
      {
        type: "p",
        content:
          "Not every feature needs to be fresh to the second. Design your pipeline in tiers: T-1 batch features for slow-moving signals (lifetime value, historical propensity), hourly features for medium-velocity behaviour, and real-time features for in-session intent. Matching feature freshness to the decision being made keeps cost down without sacrificing the accuracy that actually moves the outcome.",
      },
      {
        type: "callout",
        content:
          "If a feature is expensive to compute in real time but only marginally improves the model, precompute it in batch. The goal is not maximum freshness everywhere, it is the right freshness for each signal that drives the decision.",
      },
      {
        type: "h2",
        content: "Stage 4: The Feature Store",
      },
      {
        type: "p",
        content:
          "A feature store gives your organisation a single, versioned source of truth for features, reused across models, consistent between training and serving, and monitored for drift. Even a lightweight feature store pays for itself the first time two teams stop re-deriving the same customer feature three slightly different ways and getting three slightly different answers.",
      },
      {
        type: "h2",
        content: "Practical Implications for AI Teams",
      },
      {
        type: "ul",
        items: [
          "Version your features the way you version code, a silent change to a transformation is a silent change to every model that consumes it",
          "Monitor feature distributions in production; drift in an input is an early warning long before accuracy visibly degrades",
          "Guard aggressively against leakage, a feature that looks predictive offline but uses future information will collapse in production",
          "Share transformation logic between training and serving to eliminate skew",
          "Treat data freshness as a design parameter per feature, not a single global setting",
        ],
      },
      {
        type: "quote",
        content:
          "\"The most important thing to understand about a production model is that 'the data' isn't a single thing, it's a family of derived features of an underlying event stream. Every transformation on the path to the model is a design decision that shows up later as accuracy or as an incident.\"",
      },
    ],
  },
  {
    id: 4,
    slug: "monitoring-ml-models-in-production",
    category: "MLOps",
    tags: ["Model Monitoring", "Data Drift", "MLOps"],
    title: "Monitoring ML Models in Production: Catch Drift Before It Costs You",
    excerpt:
      "A model that was accurate at launch is not accurate forever. This guide walks through building automated monitoring for production ML, data drift, prediction drift, and input quality checks, so degrading models are caught and retrained before they quietly erode revenue.",
    date: "Jun 2026",
    readTime: "9 min read",
    accentColor: "#EC4899",
    featured: false,
    author: "NorthArc Team",
    authorRole: "AI Engineering",
    sections: [
      {
        type: "h2",
        content: "The Silent Failure of a Degrading Model",
      },
      {
        type: "p",
        content:
          "Traditional software fails loudly: it throws an error, a page goes down, someone gets paged. Machine learning fails silently. A churn model or a lead-scoring model keeps returning confident predictions long after the world it was trained on has shifted underneath it. Nobody gets an alert. The only symptom is a slow, invisible decline in the outcome the model was supposed to improve, until a quarter later someone asks why conversion is down. Monitoring is what turns that silent failure into an early, actionable signal.",
      },
      {
        type: "h2",
        content: "The Four Things You Must Monitor",
      },
      {
        type: "ul",
        items: [
          "Input data quality: are the features arriving complete, on time, and in the expected ranges the model was trained on?",
          "Data drift: has the distribution of the inputs shifted away from the training distribution?",
          "Prediction drift: has the distribution of the model's own outputs shifted in a way that isn't explained by seasonality?",
          "Ground-truth performance: once actual outcomes arrive, how does live accuracy compare to the offline benchmark?",
        ],
      },
      {
        type: "h2",
        content: "Building Your Model Monitoring Stack",
      },
      {
        type: "h3",
        content: "Layer 1: Input Freshness & Completeness Checks",
      },
      {
        type: "p",
        content:
          "The simplest and most valuable checks are completeness checks: did the feature data arrive, and is there roughly the expected amount of it before scoring runs? A model scoring against stale or partial features will produce confident nonsense. These checks can run immediately before each batch scoring job or continuously ahead of a real-time endpoint.",
      },
      {
        type: "code",
        content: `-- Daily scoring-volume check with anomaly detection
-- Flags when today's feature/scoring row count deviates from the recent norm
WITH daily_counts AS (
  SELECT
    event_date,
    COUNT(*) as event_count,
    AVG(COUNT(*)) OVER (
      ORDER BY event_date
      ROWS BETWEEN 14 PRECEDING AND 1 PRECEDING
    ) as avg_14d,
    STDDEV(COUNT(*)) OVER (
      ORDER BY event_date
      ROWS BETWEEN 14 PRECEDING AND 1 PRECEDING
    ) as stddev_14d
  FROM \`project.analytics_XXXXXXX.events_*\`
  WHERE _TABLE_SUFFIX >= FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL 15 DAY))
  GROUP BY event_date
)
SELECT
  event_date,
  event_count,
  avg_14d,
  (event_count - avg_14d) / NULLIF(stddev_14d, 0) as z_score,
  CASE
    WHEN ABS((event_count - avg_14d) / NULLIF(stddev_14d, 0)) > 3 THEN 'ANOMALY'
    WHEN ABS((event_count - avg_14d) / NULLIF(stddev_14d, 0)) > 2 THEN 'WARNING'
    ELSE 'OK'
  END as status
FROM daily_counts
ORDER BY event_date DESC`,
        language: "sql",
      },
      {
        type: "h3",
        content: "Layer 2: Data & Prediction Drift Detection",
      },
      {
        type: "p",
        content:
          "Beyond volume checks, you need to know whether the world has shifted away from what the model learned. Compare live feature and output distributions against a training baseline using tests such as Population Stability Index (PSI) or Kolmogorov–Smirnov, and encode domain rules for what 'normal' looks like:",
      },
      {
        type: "ul",
        items: [
          "Each key feature's distribution should stay within a stable PSI band versus the training snapshot",
          "The model's predicted-positive rate should stay within its historical, seasonality-adjusted range",
          "No single input category should suddenly dominate, a sign of an upstream data break",
          "Null and out-of-range rates for critical features should stay below their trained tolerance",
          "Score calibration should hold: predicted probabilities should still track observed outcomes",
        ],
      },
      {
        type: "h3",
        content: "Layer 3: Ground-Truth Performance Tracking",
      },
      {
        type: "p",
        content:
          "The most valuable checks arrive later, when actual outcomes become known. Once real conversions, churn events, or purchases land, join them back to the predictions the model made and track live precision, recall, and lift against the offline benchmark. A quiet gap between promised and delivered lift is the clearest signal that a retrain is overdue.",
      },
      {
        type: "h2",
        content: "Alerting and the Retraining Loop",
      },
      {
        type: "p",
        content:
          "Monitoring is only useful if it drives action. Wire clear severity levels: a hard input break (missing features, pipeline down) pages on-call; sustained drift or a measured drop in live lift opens a retraining ticket; minor fluctuations flow to a dashboard for review. The end state is a closed loop where degradation is detected, a retrain is triggered, and the new model is validated before it replaces the old one.",
      },
      {
        type: "callout",
        content:
          "The goal of model monitoring is not to keep a model frozen and perfect, it's to know, before your business does, when reality has drifted far enough that the model needs to be retrained.",
      },
      {
        type: "quote",
        content:
          "\"We used to find out a model had gone stale when the numbers it was supposed to move started sliding. Now drift alerts fire weeks earlier, and retraining is a scheduled event, not a fire drill.\"",
      },
    ],
  },
  {
    id: 5,
    slug: "ai-maturity-model",
    category: "AI Strategy",
    tags: ["AI Maturity", "AI Strategy", "Decision Intelligence"],
    title: "The AI Maturity Model: Which Stage Is Your Business Really At?",
    excerpt:
      "Most companies believe they're more AI-mature than they really are. The AI Maturity Model cuts through the hype with a clear five-stage framework, from descriptive reporting to autonomous, agent-driven decisions, so you can invest in the capability that actually moves you forward.",
    date: "Jun 2026",
    readTime: "5 min read",
    accentColor: "#1D75FF",
    featured: false,
    author: "NorthArc Team",
    authorRole: "AI Strategy",
    sections: [
      {
        type: "h2",
        content: "Why Most Companies Overestimate Their AI Maturity",
      },
      {
        type: "p",
        content:
          "In our experience working with dozens of organisations, there's a consistent pattern: companies grade their own AI maturity significantly higher than an objective assessment would. A team that has a few dashboards and has run a ChatGPT pilot often describes itself as 'AI-driven.' A team with one model in production considers itself 'advanced.' This overestimation matters because it prevents organisations from accurately diagnosing their real constraints, and from investing in the right capabilities to address them.",
      },
      {
        type: "h2",
        content: "The Five Stages",
      },
      {
        type: "h3",
        content: "Stage 1: Descriptive. What Happened?",
      },
      {
        type: "p",
        content:
          "At Stage 1, intelligence means reporting. Teams produce regular reports, traffic, conversions, revenue, that describe what happened in the past. Data is typically collected in one or two tools, reports are largely manual or templated, and the organisation is reactive: it looks at data after decisions are made, not before. There is no model in the loop.",
      },
      {
        type: "p",
        content:
          "Hallmarks: standard dashboards, monthly decks, manual spreadsheet work, and AI limited to occasional ad-hoc use of a chatbot. Most organisations are here, even if they describe themselves otherwise.",
      },
      {
        type: "h3",
        content: "Stage 2: Diagnostic. Why Did It Happen?",
      },
      {
        type: "p",
        content:
          "Stage 2 organisations have moved beyond reporting to investigation. When a metric changes, they have the data foundation and skills to understand why. This requires a real data warehouse, clean and well-modelled data, cohort and funnel analysis, and, increasingly. LLM-assisted analysis that lets a business user interrogate data in natural language. This is the essential data foundation that everything above it depends on.",
      },
      {
        type: "h3",
        content: "Stage 3: Predictive. What Will Happen?",
      },
      {
        type: "p",
        content:
          "Predictive ML uses historical patterns to forecast future outcomes. Churn prediction, demand forecasting, customer lifetime value, and propensity-to-purchase scoring are all Stage 3 capabilities. This stage requires ML infrastructure, data science expertise, and, critically, a business culture willing to make decisions based on model outputs rather than intuition. This is where AI starts producing measurable financial return.",
      },
      {
        type: "h3",
        content: "Stage 4: Prescriptive. What Should We Do?",
      },
      {
        type: "p",
        content:
          "Prescriptive AI doesn't just tell you what will happen, it tells you what to do about it. Recommendation engines, next-best-action systems, dynamic pricing, and personalisation are all prescriptive. Retrieval-augmented (RAG) assistants that answer from your own knowledge base and recommend an action also live here. The system doesn't just surface an insight; it recommends or takes the action.",
      },
      {
        type: "h3",
        content: "Stage 5: Autonomous. What Is the System Deciding?",
      },
      {
        type: "p",
        content:
          "At Stage 5, AI systems make and execute decisions autonomously within defined guardrails. Agentic workflows that plan and act across multiple steps, self-optimising campaigns, and closed-loop automation are Stage 5 capabilities. Human oversight moves from making each decision to setting objectives and managing guardrails.",
      },
      {
        type: "h2",
        content: "How to Assess Your Current Stage",
      },
      {
        type: "ul",
        items: [
          "Can your team answer 'why' questions about metric changes within 24 hours? (Stage 2 threshold)",
          "Do you have any working predictive ML models in production? (Stage 3 threshold)",
          "Are any actions recommended or taken automatically based on model outputs? (Stage 4 threshold)",
          "Do you have agentic systems that plan and act without human approval? (Stage 5 threshold)",
        ],
      },
      {
        type: "callout",
        content:
          "There's no universal 'right' stage to be at. Stage 5 autonomy is appropriate for some decisions (bid management, ranking) and completely inappropriate for others (high-stakes customer communications). The goal is to be at the right stage for each type of decision you make.",
      },
      {
        type: "h2",
        content: "The Most Impactful Transition: Stage 2 to Stage 3",
      },
      {
        type: "p",
        content:
          "Every organisation wants to jump straight to autonomous agents, but the transition that unlocks the most value for most businesses is Stage 2 to Stage 3: from understanding why something happened to reliably predicting what will happen and acting on it. That is where AI stops being a talking point and starts changing the numbers. It depends on a trustworthy data foundation, ML infrastructure, and, most of all, the organisational willingness to let a model, rather than a gut feeling, drive a decision.",
      },
      {
        type: "quote",
        content:
          "\"Every organisation wants to talk about autonomous AI agents. But most can't yet reliably predict which customers will churn next month. Build the predictive foundation first, the autonomy is only as trustworthy as the models underneath it.\"",
      },
    ],
  },
  {
    id: 6,
    slug: "self-healing-data-pipelines-ai-agents",
    category: "AI Agents",
    tags: ["AI Agents", "Self-Healing Pipelines", "AIOps"],
    title: "Self-Healing Data Pipelines: How AI Agents Fix Failures First",
    excerpt:
      "Data pipeline failures are inevitable, slow recovery is not. We examine how autonomous AI agents monitor your jobs, detect failures in real time, reason over the error with an LLM, and run self-healing playbooks that resolve routine breaks before a human ever wakes up.",
    date: "Jun 2026",
    readTime: "7 min read",
    accentColor: "#8B5CF6",
    featured: false,
    author: "NorthArc Team",
    authorRole: "AI Engineering",
    sections: [
      {
        type: "h2",
        content: "The Anatomy of a Data Pipeline Failure",
      },
      {
        type: "p",
        content:
          "Whatever warehouse or orchestrator you run on, data pipeline failures fall into a small number of common categories, each with recognisable signatures and known remediation paths. That predictability is exactly what makes them excellent candidates for AI-assisted, or even fully autonomous, resolution:",
      },
      {
        type: "ul",
        items: [
          "Source data unavailability: upstream table hasn't arrived yet, or arrived with a different schema",
          "Query logic errors: usually from schema changes in source tables breaking downstream queries",
          "Resource exceeded errors: queries hitting memory or byte billing limits",
          "Permission errors: service account permission changes breaking a previously working job",
          "Quota exceeded: hitting project-level or user-level quotas during peak processing windows",
          "Data quality failures: data arrived but failed validation checks (null rates, range violations)",
        ],
      },
      {
        type: "h2",
        content: "Building a Self-Healing Pipeline Agent",
      },
      {
        type: "p",
        content:
          "A self-healing pipeline agent operates in a closed loop: detect → diagnose → remediate → verify → log. Here's how each phase works in practice:",
      },
      {
        type: "h3",
        content: "Detect",
      },
      {
        type: "p",
        content:
          "Monitor BigQuery job completion events via Cloud Pub/Sub. Every scheduled query completion, success or failure, generates an event that can trigger your agent. Configure alerts for: job failures, jobs running longer than their SLA, and jobs producing fewer rows than expected.",
      },
      {
        type: "h3",
        content: "Diagnose",
      },
      {
        type: "p",
        content:
          "Parse the error message and cross-reference it with your failure taxonomy. For structured errors (quota exceeded, permission denied), the classification is deterministic. For complex logic errors, use an LLM to parse the full error context and suggest the root cause.",
      },
      {
        type: "h3",
        content: "Remediate",
      },
      {
        type: "p",
        content:
          "For each failure category, maintain a playbook of automated remediations. Retry transient failures after a delay. For quota issues, reschedule to off-peak windows. For schema changes, run a schema diff against the previous successful run and alert the owning team with the specific column change.",
      },
      {
        type: "code",
        content: `# Simplified self-healing agent logic
def handle_pipeline_failure(job_id: str, error: dict) -> str:
    error_type = classify_error(error["reason"], error["message"])
    
    match error_type:
        case "QUOTA_EXCEEDED":
            # Reschedule to next off-peak window
            schedule_retry(job_id, delay_hours=2)
            return "Rescheduled to off-peak window"
            
        case "NOT_FOUND":
            # Source table missing - check if delayed
            if is_expected_delay(job_id):
                schedule_retry(job_id, delay_minutes=30)
                return "Source table delayed - retry scheduled"
            else:
                alert_data_owner(job_id, error)
                return "Source table missing - owner notified"
                
        case "RESOURCE_EXCEEDED":
            # Try with reduced complexity
            if try_with_billing_tier_upgrade(job_id):
                return "Retried with on-demand pricing"
            alert_engineering(job_id, "Query needs optimisation")
            return "Escalated to engineering"
            
        case _:
            # Unknown failure - LLM diagnosis + human escalation
            diagnosis = llm_diagnose(error)
            alert_on_call(job_id, diagnosis)
            return f"Escalated with diagnosis: {diagnosis[:100]}"`,
        language: "python",
      },
      {
        type: "h2",
        content: "What Automation Can't (and Shouldn't) Fix",
      },
      {
        type: "p",
        content:
          "Not all pipeline failures should be auto-remediated. Business logic errors, data quality failures with unknown root causes, and failures in pipelines feeding critical financial or compliance reporting should always involve a human. The goal of automation is to handle the routine and predictable failures, freeing human attention for the failures that genuinely require judgment.",
      },
      {
        type: "callout",
        content:
          "A good heuristic: if you've solved the same failure type three times manually, it should be automated. If you're solving a failure type for the first time, it needs human investigation.",
      },
      {
        type: "quote",
        content:
          "\"Our mean time to resolution for BigQuery failures dropped from 3.2 hours to 11 minutes after deploying the agent. More importantly, our engineers stopped getting woken up at 4am for failures that the system could handle itself.\"",
      },
    ],
  },
  {
    id: 7,
    slug: "fix-not-set-in-ga4",
    category: "GA4",
    tags: ["GA4", "Not Set", "Troubleshooting"],
    title: "How to Fix '(Not Set)' in GA4: The Complete Troubleshooting Guide",
    excerpt:
      "\"(Not Set)\" dimensions in GA4 are one of the most common data quality issues. This comprehensive guide covers every scenario where (not set) appears and gives you the exact steps to resolve each one.",
    date: "May 2026",
    readTime: "12 min read",
    accentColor: "#06B6D4",
    featured: false,
    author: "NorthArc Team",
    authorRole: "Data & Analytics",
    sections: [
      {
        type: "h2",
        content: "What Does '(Not Set)' Actually Mean?",
      },
      {
        type: "p",
        content:
          "'(Not Set)' in GA4 means that a dimension value was expected but not available for a given row of data. It's not a bug in GA4, it's a signal that either the data was never collected, the data was collected but not associated with the session or user at report time, or the dimension you're looking at isn't applicable to the events you're analysing.",
      },
      {
        type: "p",
        content:
          "The frustrating truth is that '(Not Set)' can appear for many different reasons depending on which dimension you're looking at. Here's a complete breakdown of the most common scenarios and their fixes.",
      },
      {
        type: "h2",
        content: "Scenario 1: (Not Set) in Landing Page",
      },
      {
        type: "p",
        content:
          "This is the most common and most impactful occurrence. When landing page shows (not set), it typically means one of:",
      },
      {
        type: "ul",
        items: [
          "Direct navigation without a landing page event (app sessions, cross-device sessions)",
          "The page_view event fired before the session_start, a GTM sequencing issue",
          "Server-side rendering pages where the GA4 tag fires before the URL is populated",
          "App sessions being included in a web-focused report",
        ],
      },
      {
        type: "p",
        content:
          "Fix: In GTM, ensure your GA4 Configuration tag fires before your page_view event using tag sequencing. For app traffic in web reports, add a filter excluding the app stream or create separate explorations.",
      },
      {
        type: "h2",
        content: "Scenario 2: (Not Set) in Source/Medium",
      },
      {
        type: "p",
        content:
          "Source and medium appearing as (not set) is more complex because attribution is session-level, not event-level. Common causes:",
      },
      {
        type: "ul",
        items: [
          "Cross-domain tracking not configured, user crosses domains and loses session context",
          "App-to-web handoffs without referral exclusions",
          "URL parameters being stripped by redirect chains before GA4 fires",
          "Sessions starting from events that don't have page_location set (some push notification flows)",
        ],
      },
      {
        type: "h2",
        content: "Scenario 3: (Not Set) in Custom Dimensions",
      },
      {
        type: "p",
        content:
          "If a custom dimension you've created shows (not set) for some events, the parameter simply wasn't included in those events when they fired. This is normal, not every event needs every custom dimension. However, if you're seeing (not set) for events where the parameter should always be present:",
      },
      {
        type: "ul",
        items: [
          "Verify the parameter name in GTM matches exactly the custom dimension key registered in GA4 Admin (case-sensitive)",
          "Check that the variable in GTM resolves correctly on those pages, undefined variables become undefined, not empty strings",
          "Confirm the custom dimension is registered in GA4 Admin, unregistered parameters are still collected but won't appear in standard reports",
          "Check if the parameter is being truncated (GA4 truncates parameter values over 100 characters for string parameters)",
        ],
      },
      {
        type: "h2",
        content: "Scenario 4: (Not Set) in Event Scoped vs. User/Session Scoped Dimensions",
      },
      {
        type: "p",
        content:
          "This is a conceptual issue rather than a data collection issue. If you create a user-scoped custom dimension, GA4 can only report its value for events where that parameter was explicitly included. If you add user_type as a user-scoped dimension but only pass it on the login event, then all other events for that user will show (not set) for user_type in event-level reports.",
      },
      {
        type: "callout",
        content:
          "Rule of thumb: If a dimension value should be consistent across all events in a session (like user login status), consider making it a session-scoped dimension. If it should persist across sessions (like account type), make it user-scoped and set it on every relevant event, not just once.",
      },
      {
        type: "h2",
        content: "Scenario 5: (Not Set) in GA4 Audiences",
      },
      {
        type: "p",
        content:
          "When an audience condition includes a custom dimension that shows (not set) for many users, it usually means the dimension was registered after users had already established their profile. GA4 doesn't backfill dimension values, only future events will populate the dimension.",
      },
      {
        type: "h2",
        content: "Prevention: A Measurement QA Checklist",
      },
      {
        type: "ul",
        items: [
          "After every GTM publish, verify key events in GA4 DebugView before going live",
          "Check custom dimension values in the GA4 Realtime report during testing",
          "Export a sample of raw events from BigQuery weekly and audit for unexpected (not set) rates",
          "Set up automated data quality checks that alert when (not set) rate for critical dimensions exceeds a threshold",
          "Document expected (not set) rates for each dimension, some (not set) is normal, unexpected increases are the signal",
        ],
      },
      {
        type: "quote",
        content:
          "\"(Not Set) is GA4's way of telling you something about your measurement design. The question isn't just how to fix it, it's why it's appearing, which is often more informative than the fix itself.\"",
      },
    ],
  },
  {
    id: 8,
    slug: "experimentation-framework-for-ai-features",
    category: "Experimentation",
    tags: ["Experimentation", "A/B Testing", "AI Evaluation"],
    title: "How to Evaluate AI Features: A Proven Experimentation Framework",
    excerpt:
      "Shipping an AI feature without a rigorous experiment is how you convince yourself something works when it doesn't. This guide gives you a repeatable, statistically sound framework for testing AI-driven changes, from model-scored audiences to LLM-powered experiences, so you act on real lift, not the demo effect.",
    date: "May 2026",
    readTime: "10 min read",
    accentColor: "#F59E0B",
    featured: false,
    author: "NorthArc Team",
    authorRole: "AI Engineering",
    sections: [
      {
        type: "h2",
        content: "Why Most AI Experiments Prove Nothing",
      },
      {
        type: "p",
        content:
          "AI features are especially easy to fool yourself about. A model-scored audience, a new recommendation engine, or an LLM-powered flow always looks impressive in a demo, but the demo effect is not lift. The failure rate for experiments is alarmingly high, not because tests show no winner (that's expected and fine) but because many produce results teams can't act on: the test ran too short, the sample was too small, the improvement fell within the margin of error, or the methodology was flawed in a way that invalidated the result. Good evaluation isn't about running more tests, it's about running ones that give you a decision you can trust. The framework below applies whether you're testing a button colour or a large language model.",
      },
      {
        type: "h2",
        content: "The Five-Step Testing Framework",
      },
      {
        type: "h3",
        content: "Step 1: Hypothesis Formation",
      },
      {
        type: "p",
        content:
          "A good test hypothesis has three components: the change, the expected outcome, and the reason. Not 'we'll test a green button,' but 'changing the CTA button from grey to green will increase click-through rate because green has higher visual contrast against our current page background and creates a stronger visual hierarchy.' The reason matters because it determines what you learn even if the test doesn't win.",
      },
      {
        type: "h3",
        content: "Step 2: Sample Size Calculation",
      },
      {
        type: "p",
        content:
          "This is where most tests go wrong. You cannot decide to stop a test when it looks like one variant is winning, that's p-hacking, and it produces false positives at a high rate. Before launching, calculate the required sample size based on:",
      },
      {
        type: "ul",
        items: [
          "Your current baseline conversion rate",
          "The minimum detectable effect (MDE), the smallest improvement worth acting on",
          "Your required statistical power (typically 80%)",
          "Your desired significance threshold (typically 95% or p < 0.05)",
        ],
      },
      {
        type: "p",
        content:
          "If your required sample size will take more than 4–6 weeks to reach at your current traffic levels, consider whether the test is worth running at all, or whether you can increase the MDE threshold.",
      },
      {
        type: "h3",
        content: "Step 3: Test Setup & QA",
      },
      {
        type: "p",
        content:
          "Before launching, verify: randomisation is working correctly (50/50 split if that's your design), the control variant looks identical to the current production experience, the test variant implements the hypothesis change correctly, GA4 or your analytics tool is recording the test exposure event and the primary metric event, and there are no console errors or rendering issues in either variant.",
      },
      {
        type: "h3",
        content: "Step 4: Running the Test",
      },
      {
        type: "p",
        content:
          "Once launched: run for at least two full business cycles (typically two weeks minimum), don't make changes to either variant during the test, monitor for data collection issues but don't look at results until sample size is reached, and watch for novelty effect, a spike in the variant at launch that reverts as users habituate.",
      },
      {
        type: "h3",
        content: "Step 5: Analysis & Decision",
      },
      {
        type: "p",
        content:
          "When your pre-determined sample size is reached, analyse the primary metric and key secondary metrics. Record: the result (win/loss/inconclusive), the statistical significance, the observed effect size, and what you learned about your hypothesis. Then ship the winner or, equally valuable, document what you learned from an inconclusive result.",
      },
      {
        type: "h2",
        content: "Common Testing Mistakes and How to Avoid Them",
      },
      {
        type: "ul",
        items: [
          "Stopping tests early based on observed results, always run to your pre-calculated sample size",
          "Testing multiple changes at once in an A/B test, that's a multivariate test and requires much more traffic",
          "Not accounting for seasonality, don't run a test that spans Black Friday without acknowledging the confound",
          "Using conversion rate as your only metric, also track revenue per visitor, AOV, and downstream metrics",
          "Not running QA before launch, a broken test variant is worse than no test",
          "Ignoring segment-level results, a test that loses overall might win strongly for a key segment, which is itself an insight",
        ],
      },
      {
        type: "callout",
        content:
          "The most valuable output of A/B testing is often not the winning variant, it's the validated understanding of why users behave the way they do. Document your learnings systematically, and you'll build a knowledge base that accelerates every future test.",
      },
      {
        type: "quote",
        content:
          "\"An A/B test that tells you what doesn't work is worth just as much as one that tells you what does, as long as you had a good hypothesis that you actually learned from.\"",
      },
    ],
  },
];

export default blogPosts;
