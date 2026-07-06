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
    slug: "life-insurer-predictive-lead-scoring",
    client: "Leading Life Insurance Provider",
    industry: "Insurance & Finance",
    category: ["Predictive ML", "Lead Scoring"],
    title: "Predictive Lead Scoring Drives +22% Incremental Sales for a Life Insurer",
    excerpt:
      "A large life insurer was spending equally on every lead regardless of intent. Our team built a multi-algorithm propensity model on GA4, BigQuery and CRM data that ranks every prospect in real time, lifting incremental sales by 22%.",
    metrics: [
      { label: "Incremental Sales", value: "+22%" },
      { label: "Models Evaluated", value: "10-12" },
      { label: "Scoring Latency", value: "Real-time" },
    ],
    icon: TrendingUp,
    accentColor: "#1D75FF",
    featured: true,
    challenge:
      "One of India's largest life insurers was generating a high volume of digital leads but had no way to tell a serious buyer from a casual browser at the moment of contact. Every lead was routed to the tele-sales floor with equal priority, so agents spent the same effort on prospects who would never convert as on those ready to buy. Marketing had rich behavioural data in GA4, transactional history in the CRM, and event-level data in BigQuery, but none of it was being used to predict who would actually purchase a policy.",
    solution:
      "Our team built a predictive lead-scoring system that assigns every prospect a real-time propensity-to-buy score, combining GA4 behavioural signals, CRM history and BigQuery event data. Rather than a single model, we trained and ensembled 10-12 candidate algorithms and maintained separate web and app models to reflect the very different journeys on each surface.",
    sections: [
      {
        type: "h2",
        content: "The Problem: Every Lead Treated the Same",
      },
      {
        type: "p",
        content:
          "In high-consideration financial products, intent is everything. Two prospects can fill the same form on the same day and have completely different probabilities of buying, one has compared three plans and read the claims-ratio page twice, the other bounced in from a discount ad. The insurer's tele-sales team had no signal to distinguish them, so limited agent capacity was spread evenly across leads of wildly different quality.",
      },
      {
        type: "ul",
        items: [
          "Behavioural signals (pages viewed, plan comparisons, premium-calculator use) lived in GA4 but never reached the sales floor",
          "CRM captured demographics and past interactions but was disconnected from web intent",
          "No propensity signal meant high-intent leads aged in the queue while agents worked low-intent ones",
          "Seasonality (tax-saving season, salary cycles) strongly affected conversion but was ignored in prioritisation",
        ],
      },
      {
        type: "h2",
        content: "Our Approach: A Multi-Algorithm Propensity Engine",
      },
      {
        type: "p",
        content:
          "We framed the task as a supervised classification problem, will this lead convert within the policy-buying window, and invested heavily in feature engineering across first-party data. Expert-derived features consistently outperformed the generic conversion probabilities available out of the box in GA4.",
      },
      {
        type: "ul",
        items: [
          "Trained and benchmarked 10-12 algorithms (gradient-boosted trees, logistic regression, random forests) and ensembled the strongest performers",
          "Engineered hundreds of features from GA4 behaviour, CRM attributes, and BigQuery event streams",
          "Built separate web and app models because the two channels have structurally different journeys and drop-off patterns",
          "Encoded seasonality explicitly so the model adjusts for tax season, salary-credit cycles, and campaign bursts",
        ],
      },
      {
        type: "h3",
        content: "Scoring Cadence: T-1, Hourly, and Real-Time",
      },
      {
        type: "p",
        content:
          "Different downstream systems need scores at different speeds. We implemented a tiered scoring pipeline: a nightly T-1 batch for CRM segmentation and reporting, an hourly refresh for warm re-engagement, and a real-time scoring endpoint so agents see an up-to-the-moment propensity score the instant a lead lands.",
      },
      {
        type: "quote",
        content:
          "\"For the first time our agents open a lead already knowing how likely it is to close. High-propensity leads get called in minutes now, not hours. That single change is what moved the sales number.\" - Head of Digital Sales",
      },
      {
        type: "h2",
        content: "Results",
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "Incremental Sales Uplift", value: "+22%" },
          { label: "Algorithms Benchmarked", value: "10-12" },
          { label: "Scoring Modes", value: "T-1 / Hourly / Real-time" },
          { label: "Separate Models", value: "Web + App" },
          { label: "Feature Data Sources", value: "GA4 + BigQuery + CRM" },
          { label: "High-Intent Lead Response Time", value: "Minutes" },
        ],
      },
      {
        type: "callout",
        content:
          "Key Insight: The lift did not come from a fancier model, it came from putting a trustworthy propensity score in front of the sales team at the moment of contact, so finite agent capacity is spent on the leads most likely to buy.",
      },
    ],
    technologies: ["BigQuery ML", "Python (scikit-learn / XGBoost)", "GA4 BigQuery Export", "CRM Integration", "Vertex AI", "Cloud Functions"],
    outcome:
      "The insurer now prioritises every inbound lead by predicted propensity to buy, refreshed in real time. Redirecting agent effort toward high-intent prospects delivered a 22% increase in incremental sales without adding headcount or ad spend.",
  },
  {
    id: 2,
    slug: "home-services-ml-audience-scoring",
    client: "National Home-Services Brand",
    industry: "Consumer Services",
    category: ["Predictive ML", "Lead Scoring"],
    title: "ML-Scored Audiences Lift Conversion Rate by 30% for a Home-Services Brand",
    excerpt:
      "A national home-services brand was targeting broad audiences with generic bids. Our team scored users by purchase propensity and exported ML-ranked GA audiences straight into the ad platforms, raising conversion rate by 30%.",
    metrics: [
      { label: "Conversion Rate", value: "+30%" },
      { label: "Audiences Activated", value: "ML-scored" },
      { label: "Data Foundation", value: "GA4 + CRM" },
    ],
    icon: TrendingUp,
    accentColor: "#4DA6FF",
    featured: true,
    challenge:
      "A well-known home-services brand (water purifiers, appliances, service plans) was acquiring leads through paid media but treating its audience as one undifferentiated pool. Bids and creative were the same for a first-time visitor and a returning high-intent user. The brand had strong first-party data in GA4 and its CRM, but that data was not being turned into a signal the ad platforms could act on.",
    solution:
      "Our team built a propensity model that scores each user's likelihood to convert, then operationalised those scores as ML-ranked audience segments exported directly into Google and Meta ad platforms, so budget concentrates on the users most likely to buy.",
    sections: [
      {
        type: "h2",
        content: "From Broad Targeting to Propensity-Ranked Audiences",
      },
      {
        type: "p",
        content:
          "Paid media rewards precision. When every impression is priced the same regardless of who sees it, spend leaks toward users who will never convert. The opportunity was to let a model decide who is worth bidding up on, and to make that decision continuously as behaviour changes.",
      },
      {
        type: "ul",
        items: [
          "Engineered features from GA4 first-party behaviour and CRM purchase history",
          "Trained a propensity-to-convert model and validated lift against a holdout",
          "Bucketed scored users into tiered audiences (high / medium / low propensity)",
          "Automated export of ML-scored GA audiences into Google Ads and Meta for bid and budget concentration",
        ],
      },
      {
        type: "h2",
        content: "Closing the Loop Between Model and Media",
      },
      {
        type: "p",
        content:
          "The value is in activation, not just prediction. We built a pipeline that refreshes audience membership on a schedule, so a user who suddenly shows high intent is promoted into the high-propensity audience automatically and the ad platform bids accordingly, no manual list-pulling.",
      },
      {
        type: "quote",
        content:
          "\"We stopped paying premium prices to reach people who were never going to buy. The model tells the ad platforms who to chase, and our conversion rate followed.\" - Head of Performance Marketing",
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "Conversion Rate Uplift", value: "+30%" },
          { label: "Audience Tiers", value: "High / Med / Low" },
          { label: "Activation Channels", value: "Google + Meta" },
          { label: "Refresh Cadence", value: "Automated" },
          { label: "Data Foundation", value: "GA4 + CRM" },
        ],
      },
      {
        type: "callout",
        content:
          "Key Insight: A propensity model only creates value when its scores reach the systems that spend money. Exporting ML-ranked audiences directly into the ad platforms is what converted a good model into a 30% conversion lift.",
      },
    ],
    technologies: ["Python (scikit-learn / XGBoost)", "BigQuery", "GA4 Audiences", "Google Ads API", "Meta Conversions API", "Cloud Scheduler"],
    outcome:
      "The brand now bids on people, not just keywords. Concentrating spend on ML-scored high-propensity audiences lifted conversion rate by 30% while keeping media budget flat.",
  },
  {
    id: 3,
    slug: "two-wheeler-lead-cost-optimization",
    client: "Premium Two-Wheeler Manufacturer",
    industry: "Automotive",
    category: ["Predictive ML", "Attribution ML"],
    title: "Cost per Lead Cut by 26% for a Two-Wheeler Manufacturer with ML-Driven Spend",
    excerpt:
      "A premium two-wheeler manufacturer was over-paying for leads across a crowded channel mix. Our team combined propensity scoring with ML-based attribution to reallocate spend toward what actually drives qualified leads, cutting cost per lead by 26%.",
    metrics: [
      { label: "Cost per Lead", value: "−26%" },
      { label: "Lead Quality", value: "Higher" },
      { label: "Spend", value: "Reallocated" },
    ],
    icon: Zap,
    accentColor: "#1D75FF",
    featured: true,
    challenge:
      "A premium two-wheeler manufacturer was running lead-generation campaigns across search, social, display and video, but was optimising each channel to last-click cost per lead. That metric rewarded cheap, low-quality leads and punished channels that built genuine intent. Cost per lead was rising and the sales funnel was clogged with prospects who never showed up for a test ride.",
    solution:
      "Our team paired a lead-quality propensity model with a data-driven attribution model, so spend decisions optimise for the cost of an actual qualified lead, not the cost of any form-fill. Budget was systematically shifted toward the channels and audiences the models identified as genuinely productive.",
    sections: [
      {
        type: "h2",
        content: "The Cheap-Lead Trap",
      },
      {
        type: "p",
        content:
          "Optimising to raw cost per lead is a classic false economy. Channels that generate a flood of low-intent form-fills look efficient on a spreadsheet, while channels that build real purchase intent look expensive. The result is a budget that migrates toward volume and away from value.",
      },
      {
        type: "ul",
        items: [
          "Last-click CPL rewarded low-quality lead sources and starved intent-building channels",
          "No quality signal attached to a lead at the point of acquisition",
          "Multi-touch journeys (video and display building intent before a search click) were invisible to the optimiser",
          "Rising CPL with no corresponding rise in test-ride bookings",
        ],
      },
      {
        type: "h2",
        content: "Two Models, One Objective",
      },
      {
        type: "p",
        content:
          "We changed the objective from cost per form-fill to cost per qualified lead. A propensity model scores each lead's quality from GA4 and CRM signals; a data-driven attribution model distributes credit across the full journey. Together they reveal the true cost of a good lead by channel and audience.",
      },
      {
        type: "ul",
        items: [
          "Propensity model scores lead quality at acquisition using first-party behavioural and CRM features",
          "Data-driven attribution redistributes conversion credit across the multi-touch journey in BigQuery",
          "Blended view exposes true cost per qualified lead per channel, enabling confident reallocation",
          "Budget shifted away from cheap-but-junk sources toward intent-building channels",
        ],
      },
      {
        type: "quote",
        content:
          "\"Once we stopped optimising to the cheapest form-fill and started optimising to the cheapest good lead, our cost per lead dropped and our showroom footfall went up at the same time.\" - Digital Marketing Head",
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "Cost per Lead Reduction", value: "−26%" },
          { label: "Optimisation Target", value: "Qualified Lead" },
          { label: "Attribution Method", value: "Data-Driven" },
          { label: "Lead-Quality Scoring", value: "ML Propensity" },
          { label: "Data Sources", value: "GA4 + BigQuery + CRM" },
        ],
      },
      {
        type: "callout",
        content:
          "Key Insight: Cost per lead is only meaningful when the leads are comparable. Scoring lead quality and attributing credit correctly turned a rising-CPL problem into a 26% reduction, with better leads, not just cheaper ones.",
      },
    ],
    technologies: ["Python (scikit-learn / XGBoost)", "BigQuery", "Data-Driven Attribution", "GA4 BigQuery Export", "Google Ads API", "Looker Studio"],
    outcome:
      "By optimising media to the cost of a qualified lead rather than any lead, the manufacturer reduced cost per lead by 26% while improving the intent quality of the leads reaching its dealer network.",
  },
  {
    id: 4,
    slug: "mobile-app-churn-prediction",
    client: "Consumer Mobile App",
    industry: "Consumer Technology",
    category: ["Predictive ML", "Churn"],
    title: "Churn Prediction Model Flags At-Risk Users Before They Leave",
    excerpt:
      "A consumer app was losing users with no early warning. Our team built a churn-prediction model on behavioural event data that identifies users at risk within a defined window, powering targeted retention campaigns that reach users while they can still be saved.",
    metrics: [
      { label: "Early Warning", value: "In-window" },
      { label: "Model", value: "Interpretable" },
      { label: "Retention", value: "Targeted" },
    ],
    icon: LineChart,
    accentColor: "#4DA6FF",
    challenge:
      "A consumer mobile app with a large active base was seeing steady attrition but had no way to predict it. Retention efforts were reactive, win-back messages went out only after a user had already gone dark, by which point re-engagement rates were dismal. The team needed to know who was about to churn while there was still time to act.",
    solution:
      "Our team built a churn-prediction model trained on behavioural event data that estimates each user's probability of churning within a defined window, so retention campaigns can target at-risk users proactively rather than chasing users who have already left.",
    sections: [
      {
        type: "h2",
        content: "Predicting Attrition While It Can Still Be Stopped",
      },
      {
        type: "p",
        content:
          "The economics of retention flip entirely depending on timing. Reaching a user who is drifting, declining sessions, lengthening gaps between opens, dropping feature usage, is far cheaper and more effective than trying to resurrect someone who churned weeks ago. The whole value of a churn model is buying that lead time.",
      },
      {
        type: "ul",
        items: [
          "Engineered behavioural features: session frequency trend, recency, feature-usage decay, engagement depth",
          "Framed the problem as churn within a fixed forward window so scores are actionable, not just diagnostic",
          "Prioritised an interpretable model so the retention team knows why a user is flagged and can tailor the message",
          "Scored the active base on a recurring cadence to catch users at the point of drift",
        ],
      },
      {
        type: "h2",
        content: "From Score to Save",
      },
      {
        type: "p",
        content:
          "A churn score is only useful if it triggers the right intervention. We connected the model output to the retention stack so that users crossing a risk threshold flow into targeted campaigns, with the churn reason informing which message and incentive they receive.",
      },
      {
        type: "quote",
        content:
          "\"We used to fire win-back emails at people who were already gone. Now we reach them while they're wavering, and the model tells us what's pulling them away.\" - Head of Growth",
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "Prediction Horizon", value: "Forward Window" },
          { label: "Model Type", value: "Interpretable Classifier" },
          { label: "Scoring Cadence", value: "Recurring Batch" },
          { label: "Activation", value: "Targeted Retention" },
          { label: "Feature Basis", value: "Behavioural Events" },
        ],
      },
      {
        type: "callout",
        content:
          "Key Insight: The point of a churn model is not to explain attrition after the fact, it is to buy enough lead time to change the outcome. Predicting churn inside an actionable window is what makes retention spend pay off.",
      },
    ],
    technologies: ["Python (scikit-learn / XGBoost)", "BigQuery ML", "GA4 / Firebase Events", "Cloud Functions", "CRM / Marketing Automation"],
    outcome:
      "The app now identifies at-risk users before they lapse, routing them into targeted retention journeys informed by the predicted churn driver, shifting retention from reactive win-back to proactive save.",
  },
  {
    id: 5,
    slug: "digital-publisher-content-recommendation",
    client: "Digital Content Publisher",
    industry: "Media & Publishing",
    category: ["Recommenders", "Predictive ML"],
    title: "Content Recommendation Engine Lifts Engagement and Conversion by 30%",
    excerpt:
      "A digital publisher's readers consumed one article and left. Our team built a content recommendation engine that surfaces the next best read for each user, increasing engagement and conversion by 30%.",
    metrics: [
      { label: "Engagement / Conversion", value: "+30%" },
      { label: "Personalisation", value: "Per-user" },
      { label: "Recirculation", value: "Higher" },
    ],
    icon: LineChart,
    accentColor: "#1D75FF",
    challenge:
      "A digital content publisher was winning traffic but failing to keep it. Readers arrived on a single article from search or social and left immediately, the site had no intelligent way to surface what each reader should read next. Generic 'most popular' modules ignored individual interest and left a large recirculation opportunity untapped.",
    solution:
      "Our team built a content recommendation engine that models each user's content affinity from their reading behaviour and serves personalised next-article recommendations, turning single-article visits into multi-article sessions.",
    sections: [
      {
        type: "h2",
        content: "The One-and-Done Reader Problem",
      },
      {
        type: "p",
        content:
          "For an ad- and subscription-supported publisher, the second article a reader consumes is disproportionately valuable, it deepens engagement, raises subscription intent, and multiplies ad inventory. A static 'trending now' block treats a sports reader and a business reader identically and leaves that value on the table.",
      },
      {
        type: "ul",
        items: [
          "Built content affinity profiles from per-user reading history and on-page behaviour",
          "Combined collaborative signals (what similar readers read next) with content-based similarity",
          "Ranked candidate articles by predicted likelihood of engagement for each individual reader",
          "Served recommendations at the point of highest intent, the end of an actively-read article",
        ],
      },
      {
        type: "h2",
        content: "Personalisation That Compounds",
      },
      {
        type: "p",
        content:
          "Because the engine learns from each interaction, recommendations sharpen as a reader's history grows. The more a user reads, the better the next suggestion, which is precisely the flywheel a content business wants.",
      },
      {
        type: "quote",
        content:
          "\"Recirculation used to be an afterthought. Now the recommendation engine is one of our highest-performing surfaces, it's the difference between a bounce and a session.\" - Head of Product",
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "Engagement / Conversion Uplift", value: "+30%" },
          { label: "Recommendation Basis", value: "Per-User Affinity" },
          { label: "Approach", value: "Collaborative + Content" },
          { label: "Placement", value: "End-of-Article" },
          { label: "Learning", value: "Continuous" },
        ],
      },
      {
        type: "callout",
        content:
          "Key Insight: The most valuable moment in a content session is the end of an actively-read article. Serving a personalised, high-affinity recommendation there is what converted single visits into a 30% engagement lift.",
      },
    ],
    technologies: ["Python (implicit / LightFM)", "BigQuery", "GA4 BigQuery Export", "Vertex AI", "Recommendation API", "Cloud Run"],
    outcome:
      "The publisher turned single-article arrivals into multi-article sessions with a personalised recommendation engine, lifting engagement and conversion by 30% and materially increasing content recirculation.",
  },
  {
    id: 6,
    slug: "multi-category-retailer-product-recommendations",
    client: "Multi-Category Online Retailer",
    industry: "Retail & E-commerce",
    category: ["Recommenders", "Predictive ML"],
    title: "Cross-Category Product Recommendations Increase CTR by 30%",
    excerpt:
      "A multi-category retailer's recommendations were stuck within a single category. Our team built a cross-category recommender that connects behaviour across the catalogue, lifting recommendation click-through rate by 30%.",
    metrics: [
      { label: "Recommendation CTR", value: "+30%" },
      { label: "Scope", value: "Cross-Category" },
      { label: "Basket", value: "Broadened" },
    ],
    icon: BarChart3,
    accentColor: "#4DA6FF",
    challenge:
      "A large multi-category online retailer had recommendations that only worked within a category, a shopper browsing electronics never saw the relevant home or lifestyle products that similar shoppers frequently bought alongside. This siloed logic missed the retailer's biggest advantage: the breadth of its catalogue and the cross-category patterns hidden in its purchase data.",
    solution:
      "Our team built a cross-category recommendation model that learns affinities across the entire catalogue, surfacing complementary products from other categories and broadening baskets rather than merely deepening a single one.",
    sections: [
      {
        type: "h2",
        content: "Breaking the Category Silo",
      },
      {
        type: "p",
        content:
          "The strategic value of a multi-category retailer is exactly the connections a single-category recommender ignores. Buyers of a specific appliance disproportionately buy particular accessories, consumables, and adjacent lifestyle items. Surfacing those cross-category links is where the incremental clicks and revenue live.",
      },
      {
        type: "ul",
        items: [
          "Modelled item-to-item affinities across the full catalogue, not within categories only",
          "Blended co-purchase and co-view signals to capture complementary cross-category relationships",
          "Applied ranking that balances relevance, diversity, and business priority",
          "Served recommendations across product, cart, and post-purchase surfaces",
        ],
      },
      {
        type: "h2",
        content: "Ranking for Relevance and Discovery",
      },
      {
        type: "p",
        content:
          "A cross-category recommender must avoid two failure modes: recommending near-duplicates, and recommending irrelevant novelty. We tuned the ranking to introduce genuinely complementary products the shopper is likely to want but unlikely to have searched for on their own.",
      },
      {
        type: "quote",
        content:
          "\"Our recommendations finally reflect how people actually shop with us, across categories. The lift in click-through was immediate and it broadened baskets, not just deepened them.\". VP E-commerce",
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "Recommendation CTR Uplift", value: "+30%" },
          { label: "Recommendation Scope", value: "Cross-Category" },
          { label: "Signals Used", value: "Co-Purchase + Co-View" },
          { label: "Surfaces", value: "PDP / Cart / Post-Purchase" },
          { label: "Ranking Objective", value: "Relevance + Diversity" },
        ],
      },
      {
        type: "callout",
        content:
          "Key Insight: For a multi-category retailer, the recommendations that matter most are the ones a shopper would never have searched for themselves. Modelling affinities across the whole catalogue is what delivered the 30% CTR lift.",
      },
    ],
    technologies: ["Python (implicit / ALS)", "BigQuery", "GA4 BigQuery Export", "Vertex AI Matching Engine", "Recommendation API", "Cloud Run"],
    outcome:
      "The retailer's recommendations now span its full catalogue, surfacing complementary cross-category products that shoppers respond to, increasing recommendation click-through rate by 30% and broadening average baskets.",
  },
  {
    id: 7,
    slug: "retail-demand-forecasting",
    client: "Omnichannel Retail Chain",
    industry: "Retail & E-commerce",
    category: ["Forecasting", "Predictive ML"],
    title: "Demand Forecasting Sharpens Inventory and Campaign Planning",
    excerpt:
      "An omnichannel retailer planned demand on gut feel and last year's numbers. Our team built seasonality-aware forecasting models on first-party data that anticipate demand at SKU and channel level, turning planning into a data-driven, forward-looking process.",
    metrics: [
      { label: "Granularity", value: "SKU × Channel" },
      { label: "Seasonality", value: "Modelled" },
      { label: "Horizon", value: "Multi-Week" },
    ],
    icon: TrendingUp,
    accentColor: "#1D75FF",
    challenge:
      "An omnichannel retail chain planned inventory and marketing largely by extrapolating last year's totals and applying manual judgement. That approach missed shifting seasonality, promotional interactions, and channel-level differences, leading to stockouts on hot items, overstock on slow ones, and campaign budgets that were set before anyone knew what demand would look like.",
    solution:
      "Our team built demand-forecasting models that project future demand at SKU and channel granularity, explicitly encoding seasonality and promotional effects using first-party sales and behavioural data, giving planners a forward-looking view instead of a rear-view mirror.",
    sections: [
      {
        type: "h2",
        content: "Planning Forward, Not Backward",
      },
      {
        type: "p",
        content:
          "Extrapolating last year's numbers assumes the future looks like the past. It rarely does, demand shifts with seasonality, price, promotions, and channel mix. A forecasting model that learns these drivers lets planners commit inventory and budget with far more confidence than a manual guess.",
      },
      {
        type: "ul",
        items: [
          "Built forecasts at SKU × channel granularity so plans reflect real operating decisions",
          "Encoded seasonality, holiday effects, and promotional calendars as explicit features",
          "Used first-party sales history plus behavioural demand signals from GA4 and BigQuery",
          "Produced multi-week horizons aligned to procurement and campaign lead times",
        ],
      },
      {
        type: "h2",
        content: "Forecasts That Feed Real Decisions",
      },
      {
        type: "p",
        content:
          "A forecast is only useful if it lands in the planning process. We delivered forecasts into the retailer's inventory and marketing planning workflow, with the seasonality and promotion drivers surfaced so planners can sanity-check and adjust rather than blindly trust a black box.",
      },
      {
        type: "quote",
        content:
          "\"We're planning off what demand is going to be, not what it was last year. Stockouts on our fast movers dropped and we stopped over-committing budget ahead of soft periods.\" - Head of Planning",
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "Forecast Granularity", value: "SKU × Channel" },
          { label: "Seasonality Handling", value: "Explicit" },
          { label: "Promotional Effects", value: "Modelled" },
          { label: "Forecast Horizon", value: "Multi-Week" },
          { label: "Data Foundation", value: "First-Party Sales + GA4" },
        ],
      },
      {
        type: "callout",
        content:
          "Key Insight: Good forecasting is less about a single accuracy number and more about giving planners a trustworthy, driver-aware view of the future they can actually act on across inventory and marketing.",
      },
    ],
    technologies: ["Python (Prophet / statsmodels / XGBoost)", "BigQuery", "GA4 BigQuery Export", "Vertex AI", "Looker Studio", "Cloud Composer"],
    outcome:
      "The retailer replaced backward-looking manual planning with seasonality-aware, SKU- and channel-level demand forecasts, enabling sharper inventory commitments and better-timed marketing investment.",
  },
  {
    id: 8,
    slug: "propensity-ltv-modeling-predictn",
    client: "Subscription Consumer Business",
    industry: "Consumer Technology",
    category: ["Propensity", "Forecasting"],
    title: "Propensity & Lifetime-Value Modelling on First-Party Data",
    excerpt:
      "A subscription business treated all customers as equally valuable. Using our PredictN approach, propensity, LTV and forecasting built on first-party data and expert feature engineering, our team modelled who to invest in and how much they are worth.",
    metrics: [
      { label: "Signals Modelled", value: "Propensity + LTV" },
      { label: "Data", value: "First-Party" },
      { label: "Accuracy", value: "Beats generic GA4" },
    ],
    icon: Database,
    accentColor: "#4DA6FF",
    challenge:
      "A subscription consumer business was acquiring and serving all customers with the same intensity, unable to distinguish a high-lifetime-value loyalist from a one-and-done trial user. Marketing had access to generic GA4 predictive metrics, but those out-of-the-box scores were too coarse to drive confident budget and CRM decisions on real money.",
    solution:
      "Our team applied the PredictN approach, combining propensity scoring, lifetime-value modelling and forecasting on first-party data with expert feature engineering. Purpose-built models on the business's own data consistently outperformed the generic predictions available in GA4.",
    sections: [
      {
        type: "h2",
        content: "Beyond Generic Predictions",
      },
      {
        type: "p",
        content:
          "Off-the-shelf GA4 predictive metrics are a useful starting point, but they are trained generically and treat every business the same. A subscription business with distinctive retention dynamics needs models trained on its own first-party data and its own definition of value, which is where expert feature engineering makes the difference.",
      },
      {
        type: "ul",
        items: [
          "Propensity models score likelihood to convert, upgrade, or churn on first-party signals",
          "Lifetime-value models estimate each customer's expected long-run worth, not just next-purchase probability",
          "Forecasting projects aggregate value and cohort trajectories forward for planning",
          "Expert feature engineering on first-party data drove accuracy above generic GA4 model outputs",
        ],
      },
      {
        type: "h2",
        content: "Investing in the Right Customers",
      },
      {
        type: "p",
        content:
          "With propensity and LTV in hand, acquisition and retention spend can be tiered by expected value. High-LTV, high-propensity segments justify aggressive investment; low-value segments are served efficiently. The same scores feed CRM journeys so that lifecycle messaging matches each customer's predicted worth.",
      },
      {
        type: "quote",
        content:
          "\"The generic scores were directionally fine but we couldn't bet budget on them. Models built on our own data, with real feature engineering, gave us numbers we trust enough to allocate spend against.\" - Head of CRM",
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "Signals Modelled", value: "Propensity + LTV" },
          { label: "Forecasting", value: "Cohort-Level" },
          { label: "Data Foundation", value: "First-Party" },
          { label: "Feature Engineering", value: "Expert-Built" },
          { label: "Accuracy vs. Generic GA4", value: "Higher" },
        ],
      },
      {
        type: "callout",
        content:
          "Key Insight: Generic predictive metrics tell you roughly what is happening; models trained on your own first-party data with deliberate feature engineering tell you precisely enough to move budget. That precision is the whole point of PredictN.",
      },
    ],
    technologies: ["Python (scikit-learn / lifetimes)", "BigQuery ML", "GA4 BigQuery Export", "CRM Integration", "Vertex AI", "Looker Studio"],
    outcome:
      "The business now tiers acquisition and retention investment by predicted propensity and lifetime value, using first-party models that outperform generic GA4 metrics, turning 'treat everyone the same' into value-based decisioning.",
  },
  {
    id: 9,
    slug: "customer-segmentation-ml",
    client: "Consumer Brand",
    industry: "Retail & E-commerce",
    category: ["Segmentation", "Predictive ML"],
    title: "ML-Driven Customer Segmentation Replaces Guesswork with Behavioural Cohorts",
    excerpt:
      "A consumer brand marketed to broad, demographic segments. Our team built behaviour-based segmentation on first-party data, uncovering natural customer cohorts that made messaging, offers and lifecycle journeys measurably more relevant.",
    metrics: [
      { label: "Segments", value: "Behaviour-Based" },
      { label: "Method", value: "Unsupervised ML" },
      { label: "Activation", value: "CRM + Media" },
    ],
    icon: BarChart3,
    accentColor: "#1D75FF",
    challenge:
      "A consumer brand was segmenting its customers by broad demographics, age bands, city tiers, and messaging each group generically. These segments correlated poorly with actual behaviour, so campaigns were relevant to almost no one in particular. The brand had rich first-party behavioural data but no rigorous way to find the customer groups that actually behave differently.",
    solution:
      "Our team built an ML-driven segmentation using unsupervised learning on first-party behavioural, transactional and engagement data, revealing natural customer cohorts, then operationalised those segments across CRM and media so messaging matches how each cohort actually behaves.",
    sections: [
      {
        type: "h2",
        content: "Segments People Actually Belong To",
      },
      {
        type: "p",
        content:
          "Demographic segments are convenient but weak, two customers of the same age and city can behave completely differently. Behaviour-based segmentation groups customers by what they do (recency, frequency, category affinity, engagement patterns), producing cohorts that respond to different messages and offers.",
      },
      {
        type: "ul",
        items: [
          "Engineered behavioural, transactional and engagement features from first-party data",
          "Applied unsupervised clustering to surface natural cohorts rather than pre-imposed buckets",
          "Profiled each segment into a plain-language persona the marketing team could act on",
          "Activated segments across CRM journeys and media audiences for differentiated treatment",
        ],
      },
      {
        type: "h2",
        content: "From Cluster to Campaign",
      },
      {
        type: "p",
        content:
          "A statistical cluster only earns its keep once it changes what a customer receives. We translated each cohort into a clear persona with recommended messaging and offer strategy, and pushed segment membership into the systems that execute, so the segmentation drives real campaigns, not just a slide.",
      },
      {
        type: "quote",
        content:
          "\"We finally stopped talking to 'women 25-34' and started talking to how people actually shop with us. The segments feel real because they're built from behaviour, and our campaigns got sharper overnight.\" - Marketing Director",
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "Segmentation Basis", value: "Behavioural" },
          { label: "Method", value: "Unsupervised Clustering" },
          { label: "Output", value: "Actionable Personas" },
          { label: "Activation", value: "CRM + Media" },
          { label: "Data Foundation", value: "First-Party" },
        ],
      },
      {
        type: "callout",
        content:
          "Key Insight: Segmentation creates value only when the segments reflect behaviour and reach the systems that message customers. Behaviour-based cohorts, activated in CRM and media, make every campaign more relevant than demographic buckets ever could.",
      },
    ],
    technologies: ["Python (scikit-learn)", "BigQuery", "GA4 BigQuery Export", "K-Means / Clustering", "CRM Integration", "Looker Studio"],
    outcome:
      "The brand replaced demographic guesswork with behaviour-based cohorts derived from its own data, activated across CRM and media, making messaging, offers and lifecycle journeys measurably more relevant to how customers actually behave.",
  },
  {
    id: 10,
    slug: "real-time-scoring-mlops-pipeline",
    client: "Enterprise Data & Marketing Team",
    industry: "Cross-Industry",
    category: ["MLOps", "Predictive ML"],
    title: "Real-Time Predictive Scoring Pipeline with Production-Grade MLOps",
    excerpt:
      "Good models were stuck in notebooks. Our team built the MLOps backbone. GA4 and BigQuery data pipelines, T-1, hourly and real-time scoring, monitoring and retraining, that puts predictive scores into production reliably and keeps them accurate.",
    metrics: [
      { label: "Scoring Modes", value: "T-1 / Hourly / Real-time" },
      { label: "Monitoring", value: "Drift + Health" },
      { label: "Retraining", value: "Automated" },
    ],
    icon: Zap,
    accentColor: "#4DA6FF",
    featured: true,
    challenge:
      "An enterprise data and marketing team had proven the value of predictive models, lead scoring, propensity, churn, but every model lived in an analyst's notebook. Scores were produced manually and irregularly, there was no monitoring for accuracy decay, and pushing a model into a production system that could act on scores in real time was a recurring, painful project. The models were good; the operations around them were not.",
    solution:
      "Our team built the MLOps pipeline that turns models into dependable production services: automated GA4-to-BigQuery data pipelines, a tiered scoring engine (T-1 batch, hourly, and real-time), monitoring for data and prediction drift, and scheduled retraining, so predictions are always available, fresh, and trustworthy.",
    sections: [
      {
        type: "h2",
        content: "The Last Mile of Machine Learning",
      },
      {
        type: "p",
        content:
          "Most of the value of a model is lost in the last mile, getting it into production, keeping it fed with clean data, serving predictions where they are needed, and noticing when it silently degrades. A model that scores brilliantly in a notebook but requires a human to run it once a week is not a production asset.",
      },
      {
        type: "ul",
        items: [
          "Automated feature pipelines from the GA4 BigQuery export, with data-quality checks that halt bad runs",
          "Tiered serving: T-1 batch for segmentation, hourly for warm re-engagement, real-time endpoint for point-of-contact scoring",
          "A model registry and versioning so promotions to production are controlled and reversible",
          "Monitoring for input drift, prediction drift, and pipeline health, with alerting before scores go stale",
          "Scheduled retraining and validation so accuracy is maintained as behaviour shifts",
        ],
      },
      {
        type: "h2",
        content: "Reliability as a Feature",
      },
      {
        type: "p",
        content:
          "In production, reliability is the feature that matters most. Downstream systems, the sales floor, the ad platforms, the CRM, depend on scores arriving on time and being correct. We engineered the pipeline so a failed data load or a drifting model surfaces as an alert, not as a silent bad decision.",
      },
      {
        type: "quote",
        content:
          "\"Our models used to be a person running a notebook. Now they're a service, scores land on schedule, real-time scoring just works, and we get told when something drifts before it costs us anything.\" - Head of Data",
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "Serving Modes", value: "T-1 / Hourly / Real-time" },
          { label: "Data Pipeline", value: "Automated + Validated" },
          { label: "Model Governance", value: "Registry + Versioning" },
          { label: "Monitoring", value: "Drift + Health" },
          { label: "Retraining", value: "Scheduled" },
          { label: "Source", value: "GA4 + BigQuery" },
        ],
      },
      {
        type: "callout",
        content:
          "Key Insight: The difference between a model and a machine-learning product is everything that happens after training. A disciplined MLOps pipeline, pipelines, tiered serving, monitoring, retraining, is what lets predictive scoring be trusted in production.",
      },
    ],
    technologies: ["Vertex AI Pipelines", "BigQuery ML", "GA4 BigQuery Export", "Cloud Functions / Cloud Run", "Model Registry", "Cloud Monitoring"],
    outcome:
      "Predictive scoring became a dependable production service rather than a manual analyst task, with automated data pipelines, T-1/hourly/real-time serving, drift monitoring and scheduled retraining keeping scores available, fresh and accurate.",
  },
  {
    id: 11,
    slug: "marketing-mix-ml-attribution",
    client: "Multi-Channel Advertiser",
    industry: "Retail & E-commerce",
    category: ["Attribution ML", "Forecasting"],
    title: "ML-Based Marketing-Mix & Attribution Modelling Reveals True Channel ROI",
    excerpt:
      "A multi-channel advertiser optimised to last-click and starved its intent-building channels. Our team combined data-driven attribution with marketing-mix modelling to quantify each channel's true contribution, enabling confident, ML-guided budget reallocation.",
    metrics: [
      { label: "Attribution", value: "Data-Driven" },
      { label: "Channels Modelled", value: "Full Mix" },
      { label: "Budget", value: "ML-Guided" },
    ],
    icon: TrendingUp,
    accentColor: "#1D75FF",
    challenge:
      "A multi-channel advertiser was allocating budget on last-click attribution, which systematically over-credited bottom-funnel channels (brand search, shopping) and made upper-funnel channels (video, display, social) look worthless. Leadership suspected they were starving the very channels that built demand, but had no rigorous, model-based way to prove it or to decide how to reallocate.",
    solution:
      "Our team combined data-driven, path-level attribution with marketing-mix modelling to measure each channel's true incremental contribution across the full journey, then translated the model into concrete, confidence-weighted budget reallocation recommendations.",
    sections: [
      {
        type: "h2",
        content: "Two Lenses on the Same Question",
      },
      {
        type: "p",
        content:
          "Attribution and marketing-mix modelling answer 'what is each channel really worth' from different angles. Data-driven attribution works bottom-up from individual conversion paths; marketing-mix modelling works top-down on aggregate spend-and-outcome relationships including offline and brand effects. Used together, they triangulate a far more honest view than last-click alone.",
      },
      {
        type: "ul",
        items: [
          "Built data-driven attribution over full conversion paths in BigQuery, replacing last-click credit assignment",
          "Layered marketing-mix modelling to capture diminishing returns and channel interactions at the spend level",
          "Reconciled the two views to expose the true incremental contribution of each channel",
          "Modelled response curves so reallocation recommendations account for saturation, not just average ROI",
        ],
      },
      {
        type: "h2",
        content: "From Measurement to Money",
      },
      {
        type: "p",
        content:
          "The output is not a report, it is a budget decision. We turned the modelled contributions and response curves into a reallocation plan: pull spend from saturated, over-credited channels and fund undervalued intent-builders up to the point where their marginal return still beats the alternative.",
      },
      {
        type: "quote",
        content:
          "\"Last-click told us to cut the channels that were actually building our demand. The combined attribution and mix model gave us the evidence to reallocate with confidence instead of fear.\" - VP Marketing",
      },
      {
        type: "metrics-grid",
        metrics: [
          { label: "Attribution Method", value: "Data-Driven" },
          { label: "Mix Modelling", value: "Response Curves" },
          { label: "Channels Modelled", value: "Full Mix" },
          { label: "Output", value: "Reallocation Plan" },
          { label: "Data Foundation", value: "GA4 + BigQuery" },
        ],
      },
      {
        type: "callout",
        content:
          "Key Insight: Last-click attribution optimises for the channels that close, not the channels that create demand. Combining path-level attribution with marketing-mix modelling reveals true incremental value and turns measurement into a defensible budget decision.",
      },
    ],
    technologies: ["Python (marketing-mix modelling)", "BigQuery", "Data-Driven Attribution", "GA4 BigQuery Export", "Google Ads API", "Looker Studio"],
    outcome:
      "By triangulating data-driven attribution with marketing-mix modelling, the advertiser quantified each channel's true incremental contribution and reallocated budget with confidence, funding demand-building channels that last-click had wrongly written off.",
  },
];

export default caseStudies;
