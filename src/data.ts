/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: number;
  title: string;
  description: string;
  category: 'core' | 'automation' | 'analytics' | 'vision' | 'cloud';
  categoryLabel: string;
}

export interface Industry {
  emoji: string;
  name: string;
  description: string;
  metric: string;
}

export interface TechItem {
  name: string;
  category: 'language' | 'llm' | 'cloud' | 'infra';
  description: string;
}

export interface DeploymentStep {
  number: string;
  title: string;
  description: string;
}

export interface Solution {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  metric: string;
}

export const SERVICES: Service[] = [
  {
    id: 1,
    title: "Artificial Intelligence Solutions",
    description: "End-to-end design and deployment of deep learning models, classification engines, and algorithmic decision systems tailored to your domain-specific requirements.",
    category: "core",
    categoryLabel: "Core AI"
  },
  {
    id: 2,
    title: "Generative AI Applications",
    description: "Custom LLM integrations, prompt engineering architectures, fine-tuned language models, and structured content generation systems for enterprise knowledge workflows.",
    category: "core",
    categoryLabel: "Core AI"
  },
  {
    id: 3,
    title: "AI Agents & Agentic Systems",
    description: "Autonomous multi-step software agents that browse, query, reason, and execute across APIs, databases, and external tools — with full observability and recovery logic.",
    category: "automation",
    categoryLabel: "Automation"
  },
  {
    id: 4,
    title: "Custom AI Development",
    description: "Proprietary neural network architectures trained on your domain data — from custom NLP models and computer vision classifiers to specialized recommendation engines.",
    category: "core",
    categoryLabel: "Core AI"
  },
  {
    id: 5,
    title: "Intelligent Automation",
    description: "Replace repetitive manual operations with self-correcting automation pipelines — from invoice processing and data entry to customer routing and compliance checks.",
    category: "automation",
    categoryLabel: "Automation"
  },
  {
    id: 6,
    title: "Data Science & Analytics",
    description: "Statistical modeling, feature engineering, exploratory analysis, and machine learning pipelines that transform raw enterprise data into actionable strategic intelligence.",
    category: "analytics",
    categoryLabel: "Analytics"
  },
  {
    id: 7,
    title: "Predictive Analytics",
    description: "Forecast customer behavior, equipment failures, demand curves, and market trends using time-series models, gradient boosting, and neural prediction architectures.",
    category: "analytics",
    categoryLabel: "Analytics"
  },
  {
    id: 8,
    title: "Recommendation Systems",
    description: "Collaborative and content-based filtering engines that personalize product suggestions, content feeds, and action recommendations to increase engagement and revenue.",
    category: "analytics",
    categoryLabel: "Analytics"
  },
  {
    id: 9,
    title: "Computer Vision",
    description: "Image classification, object detection, defect recognition, and spatial analysis models deployed for quality control, retail analytics, and industrial monitoring.",
    category: "vision",
    categoryLabel: "Vision & Docs"
  },
  {
    id: 10,
    title: "OCR & Document AI",
    description: "Intelligent document parsing that extracts structured data from invoices, contracts, medical records, and handwritten forms with 95%+ field-level accuracy.",
    category: "vision",
    categoryLabel: "Vision & Docs"
  },
  {
    id: 11,
    title: "Business Intelligence",
    description: "Automated dashboard architectures, KPI tracking systems, and data warehouse pipelines that give leadership real-time visibility into operational and financial metrics.",
    category: "cloud",
    categoryLabel: "Cloud & Infra"
  },
  {
    id: 12,
    title: "Cloud AI Solutions",
    description: "Architecting scalable, secure cloud deployments on AWS and GCP — from serverless inference APIs and GPU training clusters to managed vector databases and CI/CD pipelines.",
    category: "cloud",
    categoryLabel: "Cloud & Infra"
  }
];

export const INDUSTRIES: Industry[] = [
  {
    emoji: "📣",
    name: "Marketing & AdTech",
    description: "Real-time audience segmentation, generative copy pipelines, multi-touch attribution, and algorithmic bidding optimizers.",
    metric: "4.2x ROAS Improvement"
  },
  {
    emoji: "🛍️",
    name: "Retail & E-Commerce",
    description: "Deep personalized recommendations, demand forecasting models, automated catalog tagging, and dynamic pricing layers.",
    metric: "18% Stockout Reduction"
  },
  {
    emoji: "📈",
    name: "Financial Services (FS)",
    description: "HIPAA-grade predictive fraud detection, automated ledger anomaly audits, algorithmic risk mitigation, and compliance agents.",
    metric: "92% Faster Audits"
  },
  {
    emoji: "🩺",
    name: "Healthcare & Biotech",
    description: "Secure HIPAA-compliant EMR parsing, semantic research discovery engines, and automated patient intake systems.",
    metric: "80% Processing Savings"
  },
  {
    emoji: "🎬",
    name: "Media & Entertainment",
    description: "Vector similarity video/audio tagging, conversational search graphs, and real-time customized user feed engines.",
    metric: "2.5x Tagging Velocity"
  },
  {
    emoji: "📚",
    name: "Publishing & NLP",
    description: "Context-aware automated citation crawlers, high-accuracy draft summary assist, and multi-language translation nets.",
    metric: "65% Faster Edit Cycles"
  },
  {
    emoji: "💻",
    name: "AI/ML & Deep Learning",
    description: "Active model drift monitoring, custom embedding fine-tuning, autonomous agent networks, and cluster workload prediction.",
    metric: "35% Latency Reduction"
  },
  {
    emoji: "🏢",
    name: "Enterprise Operations",
    description: "Knowledge graph construction, cross-departmental secure automation, operational data warehouse sync, and visual KPI dashboards.",
    metric: "Multi-Million Annual Savings"
  }
];

export const TECH_STACK: TechItem[] = [
  {
    name: "Python",
    category: "language",
    description: "The primary language of AI. Used for custom deep learning networks, data engineering, and mathematical calculations."
  },
  {
    name: "OpenAI",
    category: "llm",
    description: "Integrating frontier LLMs for high-end reasoning, semantic understanding, and enterprise-grade multi-agent networks."
  },
  {
    name: "LangChain",
    category: "llm",
    description: "Orchestration layer for building state-driven agent workflows, long-term memory, and self-correcting execution pipelines."
  },
  {
    name: "TensorFlow",
    category: "infra",
    description: "Powering state-of-the-art predictive modelling, image classification, and high-performance neural architecture execution."
  },
  {
    name: "FastAPI",
    category: "language",
    description: "Asynchronous high-performance REST APIs to power real-time serverless AI model inference and back-office pipelines."
  },
  {
    name: "AWS",
    category: "cloud",
    description: "Providing secure private VPCs, elastic GPU instances, and production-grade sageMaker training environments."
  },
  {
    name: "GCP",
    category: "cloud",
    description: "Google Cloud Platform deployment including GKE cluster management, managed Vector Databases, and BigQuery ML layers."
  },
  {
    name: "Docker",
    category: "infra",
    description: "Standard containerization of all model servers, APIs, and automated parsing pipelines to ensure robust deployability."
  },
  {
    name: "Kubernetes",
    category: "infra",
    description: "Enterprise container orchestration to automatically scale active inference APIs and handle high-volume analytics loads."
  },
  {
    name: "Vector Databases",
    category: "infra",
    description: "Enabling semantic indexing, vector similarity searches, and dynamic knowledge base storage with millisecond response."
  },
  {
    name: "PyTorch",
    category: "infra",
    description: "Industry-standard machine learning framework for training neural networks, computer vision, and model customization."
  },
  {
    name: "Hugging Face",
    category: "llm",
    description: "Leveraging, fine-tuning, and adapting state-of-the-art open-source text models, embeddings, and tokenizers."
  }
];

export const DEPLOYMENT_STEPS: DeploymentStep[] = [
  {
    number: "01",
    title: "Discover",
    description: "Audit data assets, map bottlenecks, define success metrics."
  },
  {
    number: "02",
    title: "Design",
    description: "Architect solutions, select models, plan infrastructure."
  },
  {
    number: "03",
    title: "Build",
    description: "Engineer pipelines, train models, develop agent logic."
  },
  {
    number: "04",
    title: "Deploy",
    description: "Containerize, test in staging, ship to production VPCs."
  },
  {
    number: "05",
    title: "Scale",
    description: "Auto-scale clusters, monitor drift, optimize performance."
  }
];

export const SOLUTIONS: Solution[] = [
  {
    id: "workflows",
    title: "Intelligent Workflows",
    description: "Streamline operational and back-office pipelines with self-correcting automation.",
    bullets: [
      "End-to-end API orchestration",
      "Automated error recovery and visual logs",
      "Full system observability and audit trails"
    ],
    metric: "45% operational speedup"
  },
  {
    id: "assistants",
    title: "AI Assistants",
    description: "Empower teams with context-aware GenAI systems built on enterprise knowledge.",
    bullets: [
      "High-fidelity RAG (Retrieval-Augmented Generation) pipelines",
      "Custom brand guidelines and tone matching",
      "Multi-source document synthesis & citation mapping"
    ],
    metric: "90% faster document synthesis"
  },
  {
    id: "predictive",
    title: "Predictive Forecasting",
    description: "Anticipate market changes and equipment requirements with custom time-series models.",
    bullets: [
      "High-accuracy demand curve mapping",
      "Dynamic inventory level optimization",
      "Real-time sensor anomaly detection and alerting"
    ],
    metric: "97.4% predictive accuracy"
  },
  {
    id: "docs",
    title: "Document Automation",
    description: "Unify structured and unstructured data formats into structured analytical tables.",
    bullets: [
      "95%+ field-level extraction accuracy on handwriting",
      "Automated contract metadata tagging and compliance checks",
      "Multi-tenant HIPAA & GDPR aligned data handling"
    ],
    metric: "80% operational cost reduction"
  }
];
