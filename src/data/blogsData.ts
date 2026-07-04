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
    slug: "agentic-web-bot-traffic-ga4",
    category: "Agentic AI",
    tags: ["AI Agents", "GA4", "Bot Traffic"],
    title: "The Agentic Web Problem: Bot Traffic in GA4 Explained",
    excerpt:
      "As AI agents increasingly browse the web autonomously, your GA4 data is being polluted with non-human traffic. Learn how to identify agentic bot sessions, filter them correctly, and protect your measurement integrity.",
    date: "Jul 2026",
    readTime: "8 min read",
    accentColor: "#10B981",
    featured: true,
    author: "Analytics Engineering Team",
    authorRole: "Data & Analytics",
    sections: [
      {
        type: "h2",
        content: "What Is the Agentic Web?",
      },
      {
        type: "p",
        content:
          "The web has always had bots — Googlebot, Bingbot, scraping scripts, uptime monitors. Analytics platforms like GA4 have long filtered known bot traffic using the IAB/ABC International Spiders and Bots List. But something fundamentally different is happening now. AI-powered agents are browsing the web not to index it, but to act on it — filling out forms, reading product descriptions, comparing prices, and navigating multi-step user flows. These agents look like humans to your analytics stack. And they're in your GA4 data right now.",
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
          "They navigate multi-step flows — product pages, comparison pages, checkout flows",
          "They generate session duration and engagement metrics that look human",
          "GA4's built-in bot filtering doesn't catch them because they aren't on known bot lists",
          "They often trigger conversion events — add_to_cart, begin_checkout — that inflate your conversion metrics",
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
          "AI agents can navigate pages far faster than humans. A session that views 12 product pages in 45 seconds — with engagement events on each — is almost certainly not human. In GA4 Explorations, filter for sessions with time_per_page below a human minimum threshold (typically < 3 seconds for content pages).",
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
          "Agentic traffic isn't going away — it's going to grow dramatically as AI assistants, shopping agents, and research tools become mainstream. The analytics community needs to build detection and filtering into standard measurement frameworks, the same way we normalised spam filtering and bot exclusion in previous eras. Start auditing your GA4 data for agentic patterns now, before the signal-to-noise ratio deteriorates further.",
      },
      {
        type: "quote",
        content:
          "\"The question isn't whether AI agents are in your analytics data. They are. The question is what percentage of your conversion data they currently account for — and whether you have any idea.\"",
      },
    ],
  },
  {
    id: 2,
    slug: "ai-incident-diagnosis-analytics",
    category: "AI Analytics",
    tags: ["AI", "Data Pipelines", "Root Cause Analysis"],
    title: "AI Incident Diagnosis: From Alert to Answer in Seconds",
    excerpt:
      "When your data pipeline fails at 2am, every minute costs you. We explore how AI-powered incident diagnosis systems can automatically detect anomalies, trace root causes, and surface actionable fixes — before your CMO notices.",
    date: "Jun 2026",
    readTime: "6 min read",
    accentColor: "#F59E0B",
    featured: true,
    author: "Data Engineering Team",
    authorRole: "Analytics Engineering",
    sections: [
      {
        type: "h2",
        content: "The Problem with Traditional Data Alerts",
      },
      {
        type: "p",
        content:
          "Most analytics teams have some form of alerting — a Slack notification when a scheduled query fails, an email when a dashboard hasn't refreshed, maybe a PagerDuty integration for critical pipelines. These alerts tell you that something went wrong. They don't tell you what, why, or how to fix it. By the time a human investigates, identifies the root cause, and applies a fix, hours have passed. If the failure happened at 2am, the first person who knows about it might be the CMO wondering why the weekly report looks wrong.",
      },
      {
        type: "h2",
        content: "What AI-Powered Incident Diagnosis Looks Like",
      },
      {
        type: "p",
        content:
          "An effective AI incident diagnosis system doesn't just detect failures — it reasons about them. When a pipeline fails, the system should:",
      },
      {
        type: "ol",
        items: [
          "Detect the anomaly automatically — without requiring a human to notice it",
          "Classify the failure type based on error signatures and historical patterns",
          "Trace the root cause by walking the dependency graph upstream from the failure point",
          "Assess the blast radius — which downstream reports, dashboards, and decisions are affected",
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
          "The foundation is statistical anomaly detection on your key pipeline metrics: row counts, null rates, value distributions, processing times. Tools like BigQuery ML's ARIMA_PLUS model can detect when a metric deviates from expected seasonal patterns — including distinguishing a genuine failure from a normal weekend traffic dip.",
      },
      {
        type: "h3",
        content: "Layer 2: Dependency Mapping",
      },
      {
        type: "p",
        content:
          "Every table in your data warehouse has upstream dependencies — raw data sources, transformation jobs, external API calls. Maintaining a graph of these dependencies allows the system to answer 'if this table is wrong, what caused it?' rather than just 'this table is wrong.'",
      },
      {
        type: "h3",
        content: "Layer 3: LLM-Powered Root Cause Analysis",
      },
      {
        type: "p",
        content:
          "This is where modern AI changes the game. By providing an LLM with the error logs, the pipeline dependency graph, and historical incident patterns, you can generate natural language root cause summaries that a human analyst can immediately understand and act on — rather than raw stack traces.",
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
          "Teams that implement AI-powered incident diagnosis typically see mean time to resolution (MTTR) drop by 70–85%. More importantly, they shift from reactive firefighting to proactive reliability management — because the system surfaces patterns across incidents that humans would miss in one-off investigations.",
      },
      {
        type: "callout",
        content:
          "The goal isn't to replace human judgment — it's to ensure that when human judgment is needed, the human arrives with full context, not a blank error screen.",
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
    slug: "ga4-data-pipeline-explained",
    category: "GA4",
    tags: ["GA4", "Data Pipeline", "BigQuery"],
    title: "GA4 Data Pipeline: What Happens Between Collection and Report",
    excerpt:
      "GA4 doesn't show you raw hits — it processes, samples, and aggregates them before they reach your reports. Understanding this pipeline is critical for data teams who need to know when to trust their numbers.",
    date: "Jun 2026",
    readTime: "7 min read",
    accentColor: "#6366F1",
    featured: false,
    author: "Analytics Engineering Team",
    authorRole: "Data & Analytics",
    sections: [
      {
        type: "h2",
        content: "The GA4 Data Pipeline: A Mental Model",
      },
      {
        type: "p",
        content:
          "Many analytics practitioners treat GA4 as a black box: events go in, reports come out. But between collection and reporting, GA4 applies a series of transformations — some transparent, some not — that materially affect your numbers. Understanding this pipeline helps you know when to trust your reports, when to be suspicious, and when to go to BigQuery for the unmodified truth.",
      },
      {
        type: "h2",
        content: "Stage 1: Collection",
      },
      {
        type: "p",
        content:
          "GA4 collects data through the Measurement Protocol, gtag.js, Firebase SDK, or Google Tag Manager. At this stage, events are structured with a name, timestamp, and parameter payload. The collection layer applies minimal transformation — primarily validation (rejecting malformed events) and deduplication (within a short time window).",
      },
      {
        type: "h2",
        content: "Stage 2: Processing",
      },
      {
        type: "p",
        content:
          "Processing is where most of the interesting — and potentially surprising — transformations happen. GA4 applies:",
      },
      {
        type: "ul",
        items: [
          "Session attribution: events are grouped into sessions using a 30-minute inactivity timeout (configurable to 1–7.5 hours)",
          "Source/medium attribution: traffic source is assigned to the session using last-non-direct attribution by default",
          "User identification: events are associated with a user via user_id (if set), device ID, or modelled identity",
          "Bot filtering: known bots from the IAB list are removed (but not all bots — see our agentic traffic article)",
          "Spam filtering: GA4 applies proprietary spam detection that can occasionally remove legitimate traffic",
          "Conversion crediting: conversion events are attributed back to the traffic source that drove the session",
        ],
      },
      {
        type: "h2",
        content: "Stage 3: Aggregation & Reporting",
      },
      {
        type: "p",
        content:
          "GA4's standard reports show pre-aggregated data, not row-level event data. This is why standard reports are fast and don't sample — the aggregation is already done. However, this also means that ad-hoc analysis questions that weren't anticipated in the aggregation design can't be answered from standard reports.",
      },
      {
        type: "h3",
        content: "When Sampling Applies",
      },
      {
        type: "p",
        content:
          "Sampling in GA4 applies specifically in Explorations (not standard reports) when your date range includes more than a threshold number of events. When sampling is active, GA4 analyses a representative subset of your data and extrapolates. The sampling percentage is shown in the Exploration interface.",
      },
      {
        type: "callout",
        content:
          "If sampling is affecting your analysis, the BigQuery export is your escape route. BigQuery contains 100% of raw, unsampled event data — and you can apply any aggregation logic you need at query time.",
      },
      {
        type: "h2",
        content: "Stage 4: BigQuery Export",
      },
      {
        type: "p",
        content:
          "The BigQuery export runs daily (for the previous day's data) or streaming (for near-real-time data). It contains a row per event, with all parameters available as columns. Critically, this data is not processed the same way as GA4 reports in all dimensions — session and user attribution logic may differ slightly from what you see in the GA4 interface.",
      },
      {
        type: "h2",
        content: "Practical Implications for Data Teams",
      },
      {
        type: "ul",
        items: [
          "Never compare GA4 standard report numbers with BigQuery-derived numbers and expect them to match exactly — they use different processing paths",
          "For accurate funnel analysis on large datasets, use BigQuery — not GA4 Explorations which may sample",
          "Session-level metrics in BigQuery require reconstruction using session_id — they aren't pre-calculated",
          "The 'engaged session' definition in GA4 (>10s or conversion or >1 page) is applied at processing time — you can reconstruct it in BigQuery but must apply the same logic",
          "Data in GA4 standard reports can change up to 72 hours after collection as late-arriving events are processed",
        ],
      },
      {
        type: "quote",
        content:
          "\"The most important thing to understand about GA4 is that 'the data' isn't a single thing — it's a family of derived views of an underlying event stream. Each view makes different tradeoffs between freshness, completeness, and granularity.\"",
      },
    ],
  },
  {
    id: 4,
    slug: "data-quality-monitoring-analytics",
    category: "Data Quality",
    tags: ["Analytics Intelligence", "BigQuery", "Data Quality"],
    title: "Data Quality Monitoring: Stop Bad Data Before It Hits Your CMO",
    excerpt:
      "Bad data that reaches leadership erodes trust in analytics. This guide walks through building automated data quality monitoring using BigQuery, scheduled queries, and alerting pipelines.",
    date: "Jun 2026",
    readTime: "9 min read",
    accentColor: "#EC4899",
    featured: false,
    author: "Data Engineering Team",
    authorRole: "Analytics Engineering",
    sections: [
      {
        type: "h2",
        content: "The High Cost of Bad Data Reaching Leadership",
      },
      {
        type: "p",
        content:
          "Every analytics team has experienced it: a number in the weekly report that looks wrong. The CMO asks about it in the review meeting. You spend the next two hours investigating, discover it was a tracking bug from three days ago, and then spend the rest of the week explaining why the numbers were wrong and rebuilding trust. Data quality failures that reach decision makers don't just create extra work — they damage the credibility of the entire analytics function.",
      },
      {
        type: "h2",
        content: "The Four Dimensions of Data Quality",
      },
      {
        type: "ul",
        items: [
          "Completeness: Are all expected events and records present? (e.g., did today's GA4 export arrive? Does it have the expected row count?)",
          "Accuracy: Do the values make sense given business context? (e.g., is the conversion rate within the normal range?)",
          "Consistency: Do related metrics agree with each other? (e.g., does the transaction count in GA4 match the order count in the CRM?)",
          "Timeliness: Did the data arrive when expected? (e.g., is the hourly pipeline running on schedule?)",
        ],
      },
      {
        type: "h2",
        content: "Building Your Data Quality Monitoring Stack",
      },
      {
        type: "h3",
        content: "Layer 1: Row Count & Freshness Checks",
      },
      {
        type: "p",
        content:
          "The simplest and most valuable checks are completeness checks: did the data arrive, and is there roughly the expected amount of it? These can be implemented as BigQuery scheduled queries that run immediately after each pipeline finishes.",
      },
      {
        type: "code",
        content: `-- Daily row count check with anomaly detection
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
        content: "Layer 2: Business Rule Validation",
      },
      {
        type: "p",
        content:
          "Beyond row counts, you need checks that verify your data makes business sense. These are domain-specific rules that encode what 'normal' looks like for your business:",
      },
      {
        type: "ul",
        items: [
          "Conversion rate should be between X% and Y% (based on historical range)",
          "Revenue should not be zero on business days",
          "Transaction count in GA4 should be within Z% of CRM transaction count",
          "All expected traffic sources should be present (no major channel suddenly disappearing)",
          "No individual dimension value should account for >90% of total sessions (spike detection)",
        ],
      },
      {
        type: "h3",
        content: "Layer 3: Cross-System Consistency Checks",
      },
      {
        type: "p",
        content:
          "The most sophisticated — and most valuable — checks compare data across systems. If GA4 says 1,247 transactions but your CRM recorded 1,089, that 12% discrepancy needs explanation before the weekly revenue report goes to leadership.",
      },
      {
        type: "h2",
        content: "Alerting: Getting to the Right Person Fast",
      },
      {
        type: "p",
        content:
          "Data quality checks are only useful if the right person is notified immediately when they fail. Build your alerting with clear severity levels: critical failures (pipeline down, zero data) go to PagerDuty or immediate Slack DMs. Warnings (anomalies, cross-system discrepancies) go to the team channel. Informational items go into a monitoring dashboard for daily review.",
      },
      {
        type: "callout",
        content:
          "The goal of data quality monitoring is not to achieve zero data quality issues — it's to ensure that when issues occur, they're caught and resolved before they affect any decision that matters.",
      },
      {
        type: "quote",
        content:
          "\"We went from discovering data problems when our CMO asked about them, to discovering them 18 hours before the report is sent. That shift completely changed our relationship with leadership.\"",
      },
    ],
  },
  {
    id: 5,
    slug: "analytics-maturity-model",
    category: "Analytics Strategy",
    tags: ["Analytics Maturity", "Data Quality", "AI in Analytics"],
    title: "Analytics Maturity Model: Which Stage Is Your Business At?",
    excerpt:
      "Most companies think they're more analytically mature than they really are. The Analytics Maturity Model cuts through the noise with a clear five-stage framework — from ad-hoc reporting to autonomous decision intelligence.",
    date: "Jun 2026",
    readTime: "5 min read",
    accentColor: "#10B981",
    featured: false,
    author: "Strategy Team",
    authorRole: "Analytics Strategy",
    sections: [
      {
        type: "h2",
        content: "Why Most Companies Overestimate Their Analytics Maturity",
      },
      {
        type: "p",
        content:
          "In our experience working with hundreds of organisations, there's a consistent pattern: companies grade their own analytics maturity significantly higher than an objective assessment would. A team that has GA4 installed and a couple of Looker Studio dashboards often describes themselves as 'data-driven.' A team that runs some SQL queries considers themselves 'advanced.' This overestimation matters because it prevents organisations from accurately diagnosing their actual constraints — and from investing in the right capabilities to address them.",
      },
      {
        type: "h2",
        content: "The Five Stages",
      },
      {
        type: "h3",
        content: "Stage 1: Descriptive — What Happened?",
      },
      {
        type: "p",
        content:
          "At Stage 1, analytics means reporting. Teams produce regular reports — traffic, conversions, revenue — that describe what happened in the past. Data is typically collected in one or two tools, reports are largely manual or templated, and analytics is reactive: you look at data after decisions are made, not before.",
      },
      {
        type: "p",
        content:
          "Hallmarks: Standard GA4 reports, monthly PowerPoint decks, manual Excel manipulation. Most organisations are here, even if they don't know it.",
      },
      {
        type: "h3",
        content: "Stage 2: Diagnostic — Why Did It Happen?",
      },
      {
        type: "p",
        content:
          "Stage 2 organisations have moved beyond reporting to investigation. When a metric changes, they have the tools and skills to understand why. This requires more sophisticated data infrastructure: BigQuery for ad-hoc analysis, funnel visualisations, cohort analysis, and a culture of asking questions rather than just producing outputs.",
      },
      {
        type: "h3",
        content: "Stage 3: Predictive — What Will Happen?",
      },
      {
        type: "p",
        content:
          "Predictive analytics uses historical patterns to forecast future outcomes. Churn prediction models, demand forecasting, customer lifetime value models, and propensity to purchase scores are all Stage 3 capabilities. This stage requires ML infrastructure, data science expertise, and — critically — a business culture willing to make decisions based on model outputs rather than intuition.",
      },
      {
        type: "h3",
        content: "Stage 4: Prescriptive — What Should We Do?",
      },
      {
        type: "p",
        content:
          "Prescriptive analytics doesn't just tell you what will happen — it tells you what to do about it. Recommendation engines, automated bid management, dynamic pricing algorithms, and personalisation systems are all prescriptive. The system doesn't just surface an insight; it takes or recommends an action.",
      },
      {
        type: "h3",
        content: "Stage 5: Autonomous — What Is the System Deciding?",
      },
      {
        type: "p",
        content:
          "At Stage 5, analytics systems make decisions autonomously, within defined guardrails. Algorithmic trading, fully automated marketing campaigns, self-optimising product ranking — these are Stage 5 capabilities. Human oversight moves from decision-making to objective-setting and guardrail management.",
      },
      {
        type: "h2",
        content: "How to Assess Your Current Stage",
      },
      {
        type: "ul",
        items: [
          "Can your team answer 'why' questions about metric changes within 24 hours? (Stage 2 threshold)",
          "Do you have any working predictive models in production? (Stage 3 threshold)",
          "Are any decisions made automatically based on model outputs? (Stage 4 threshold)",
          "Do you have autonomous systems that act without human approval? (Stage 5 threshold)",
        ],
      },
      {
        type: "callout",
        content:
          "There's no universal 'right' stage to be at. Stage 5 autonomy is appropriate for some decisions (bid management) and completely inappropriate for others (customer communications). The goal is to be at the right stage for each type of decision you make.",
      },
      {
        type: "h2",
        content: "The Most Impactful Transition: Stage 1 to Stage 2",
      },
      {
        type: "p",
        content:
          "In practice, the most transformative analytics investment for most organisations is the transition from Stage 1 to Stage 2: from reporting what happened to understanding why. This transition requires a data warehouse, reliable data pipelines, and the analytical skills to use them. It doesn't require ML, AI, or data science. But it requires more investment than most organisations realise — and more cultural change than any technology can provide.",
      },
      {
        type: "quote",
        content:
          "\"Every organisation wants to talk about AI and predictive analytics. But most of them can't yet reliably answer 'why did our conversion rate drop last Tuesday?' Fix the diagnostic gap first.\"",
      },
    ],
  },
  {
    id: 6,
    slug: "bigquery-pipeline-failures-ai-agents",
    category: "BigQuery",
    tags: ["BigQuery", "AI Agents", "GCP"],
    title: "BigQuery Pipeline Failures: How AI Agents Fix Them First",
    excerpt:
      "Pipeline failures in BigQuery are inevitable — but slow recovery is not. We examine how autonomous AI agents can monitor your scheduled queries, detect failures in real time, and trigger self-healing playbooks.",
    date: "Jun 2026",
    readTime: "7 min read",
    accentColor: "#8B5CF6",
    featured: false,
    author: "Data Engineering Team",
    authorRole: "Analytics Engineering",
    sections: [
      {
        type: "h2",
        content: "The Anatomy of a BigQuery Pipeline Failure",
      },
      {
        type: "p",
        content:
          "BigQuery pipeline failures fall into a small number of common categories, each with recognisable signatures and known remediation paths. This is what makes them excellent candidates for AI-assisted (or even autonomous) resolution:",
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
          "Monitor BigQuery job completion events via Cloud Pub/Sub. Every scheduled query completion — success or failure — generates an event that can trigger your agent. Configure alerts for: job failures, jobs running longer than their SLA, and jobs producing fewer rows than expected.",
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
          "Not all pipeline failures should be auto-remediated. Business logic errors, data quality failures with unknown root causes, and failures in pipelines feeding critical financial or compliance reporting should always involve a human. The goal of automation is to handle the routine and predictable failures — freeing human attention for the failures that genuinely require judgment.",
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
    author: "Analytics Engineering Team",
    authorRole: "Data & Analytics",
    sections: [
      {
        type: "h2",
        content: "What Does '(Not Set)' Actually Mean?",
      },
      {
        type: "p",
        content:
          "'(Not Set)' in GA4 means that a dimension value was expected but not available for a given row of data. It's not a bug in GA4 — it's a signal that either the data was never collected, the data was collected but not associated with the session or user at report time, or the dimension you're looking at isn't applicable to the events you're analysing.",
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
          "The page_view event fired before the session_start — a GTM sequencing issue",
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
          "Cross-domain tracking not configured — user crosses domains and loses session context",
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
          "If a custom dimension you've created shows (not set) for some events, the parameter simply wasn't included in those events when they fired. This is normal — not every event needs every custom dimension. However, if you're seeing (not set) for events where the parameter should always be present:",
      },
      {
        type: "ul",
        items: [
          "Verify the parameter name in GTM matches exactly the custom dimension key registered in GA4 Admin (case-sensitive)",
          "Check that the variable in GTM resolves correctly on those pages — undefined variables become undefined, not empty strings",
          "Confirm the custom dimension is registered in GA4 Admin — unregistered parameters are still collected but won't appear in standard reports",
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
          "When an audience condition includes a custom dimension that shows (not set) for many users, it usually means the dimension was registered after users had already established their profile. GA4 doesn't backfill dimension values — only future events will populate the dimension.",
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
          "Document expected (not set) rates for each dimension — some (not set) is normal, unexpected increases are the signal",
        ],
      },
      {
        type: "quote",
        content:
          "\"(Not Set) is GA4's way of telling you something about your measurement design. The question isn't just how to fix it — it's why it's appearing, which is often more informative than the fix itself.\"",
      },
    ],
  },
  {
    id: 8,
    slug: "ab-testing-process-framework",
    category: "CRO",
    tags: ["A/B Testing", "CRO", "Experimentation"],
    title: "How to do A/B Testing: A Proven Process and Framework",
    excerpt:
      "Most A/B tests fail not because of bad ideas — but because of bad process. This guide gives you a repeatable, statistically sound framework for running experiments that produce decisions your team can act on confidently.",
    date: "May 2026",
    readTime: "10 min read",
    accentColor: "#F59E0B",
    featured: false,
    author: "Optimisation Team",
    authorRole: "CRO & Experimentation",
    sections: [
      {
        type: "h2",
        content: "Why Most A/B Tests Are a Waste of Time",
      },
      {
        type: "p",
        content:
          "The failure rate for A/B tests is alarmingly high — not in the sense that tests show no winner (that's expected and fine) but in the sense that many tests produce results that teams can't act on. Either the test ran too short, the sample size was too small, the winning variant's improvement was within the margin of error, or the methodology was flawed in a way that invalidated the result. Good testing isn't about running more tests — it's about running better ones.",
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
          "This is where most tests go wrong. You cannot decide to stop a test when it looks like one variant is winning — that's p-hacking, and it produces false positives at a high rate. Before launching, calculate the required sample size based on:",
      },
      {
        type: "ul",
        items: [
          "Your current baseline conversion rate",
          "The minimum detectable effect (MDE) — the smallest improvement worth acting on",
          "Your required statistical power (typically 80%)",
          "Your desired significance threshold (typically 95% or p < 0.05)",
        ],
      },
      {
        type: "p",
        content:
          "If your required sample size will take more than 4–6 weeks to reach at your current traffic levels, consider whether the test is worth running at all — or whether you can increase the MDE threshold.",
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
          "Once launched: run for at least two full business cycles (typically two weeks minimum), don't make changes to either variant during the test, monitor for data collection issues but don't look at results until sample size is reached, and watch for novelty effect — a spike in the variant at launch that reverts as users habituate.",
      },
      {
        type: "h3",
        content: "Step 5: Analysis & Decision",
      },
      {
        type: "p",
        content:
          "When your pre-determined sample size is reached, analyse the primary metric and key secondary metrics. Record: the result (win/loss/inconclusive), the statistical significance, the observed effect size, and what you learned about your hypothesis. Then ship the winner or — equally valuable — document what you learned from an inconclusive result.",
      },
      {
        type: "h2",
        content: "Common Testing Mistakes and How to Avoid Them",
      },
      {
        type: "ul",
        items: [
          "Stopping tests early based on observed results — always run to your pre-calculated sample size",
          "Testing multiple changes at once in an A/B test — that's a multivariate test and requires much more traffic",
          "Not accounting for seasonality — don't run a test that spans Black Friday without acknowledging the confound",
          "Using conversion rate as your only metric — also track revenue per visitor, AOV, and downstream metrics",
          "Not running QA before launch — a broken test variant is worse than no test",
          "Ignoring segment-level results — a test that loses overall might win strongly for a key segment, which is itself an insight",
        ],
      },
      {
        type: "callout",
        content:
          "The most valuable output of A/B testing is often not the winning variant — it's the validated understanding of why users behave the way they do. Document your learnings systematically, and you'll build a knowledge base that accelerates every future test.",
      },
      {
        type: "quote",
        content:
          "\"An A/B test that tells you what doesn't work is worth just as much as one that tells you what does — as long as you had a good hypothesis that you actually learned from.\"",
      },
    ],
  },
];

export default blogPosts;
