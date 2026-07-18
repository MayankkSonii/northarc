import React from "react";
import ExpertiseLayout from "../../components/ExpertiseLayout";
import type { PageContent } from "../../components/pageLayoutTypes";
import { useSEO, breadcrumbJsonLd, SITE_URL, SITE_NAME } from "../../lib/seo";
import { Layers, Cpu, Database, Server } from "lucide-react";

export default function CloudNative() {
  useSEO({
    title: "Cloud Application Development | AWS, Azure & GCP Cloud Services",
    description:
      "NorthArc delivers cloud application development services on AWS, Azure, and GCP. From AWS cloud migration services to cloud-native application development, we are your enterprise cloud solutions provider for secure cloud infrastructure services.",
    path: "/expertise/cloud-native",
    keywords:
      "Cloud Application Development, Cloud Migration, AWS, Azure, GCP, Cloud Application Development Services, AWS Cloud Migration Services, Cloud Native Application Development, Enterprise Cloud Solutions Provider, Secure Cloud Infrastructure Services",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Cloud-Native Development",
        name: "Cloud-Native Development & Microservices",
        description:
          "Cloud-native engineering, elastic container clusters, serverless architectures, distributed storage, and gRPC microservices built to scale reliably and control cost.",
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        areaServed: "Worldwide",
        url: `${SITE_URL}/expertise/cloud-native`,
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Cloud-Native", path: "/expertise/cloud-native" },
      ]),
    ],
  });

  const content: PageContent = {
    eyebrow: "EXPERTISE / CLOUD-NATIVE",
    title: "Cloud-native Services",
    intro:
      "We architect globally distributed microservices, elastic containers, and secure serverless clusters that scale automatically through traffic spikes while keeping your infrastructure costs in check.",
    heroIcon: Server,
    heroScene: "cloud",
    heroTitle: "Cloud topology",
    accent: "#4DA6FF",
    capsTitle: "Cloud Focus",
    capsIntro:
      "We leverage cloud-native services to speed up project execution. We write custom API extensions to keep systems scaling cleanly.",
    capabilities: [
      { icon: Server, title: "Elastic Container Arrays", desc: "Build highly scalable, isolated cloud services using container cluster models." },
      { icon: Cpu, title: "Serverless Architectures", desc: "Configure serverless cloud logic layers minimizing runtime compute overheads." },
      { icon: Database, title: "Distributed Storage", desc: "Set up globally replicated database models, index caches, and cluster layers." },
      { icon: Layers, title: "gRPC Microservices", desc: "Connect frontend applications and backend databases with low-latency APIs." },
    ],
    processTitle: "The Cloud Journey",
    processIntro:
      "A systematic overview of how we align infrastructure templates to container releases.",
    process: [
      { num: "01", title: "Target Architecture Auditing", desc: "Assess active database metrics, analyze request volumes, and map subnets scopes." },
      { num: "02", title: "Serverless Schema Mapping", desc: "Draft micro-routing details, configure VPC rules, and define database structures." },
      { num: "03", title: "Container Cluster Assembly", desc: "Deploy Kubernetes pods, configure ingress nodes, and set up load balancing gateways." },
      { num: "04", title: "Global Replication Sync", desc: "Configure multi-region database replications, write sync schedules, and configure backups." },
      { num: "05", title: "Integration Validation Runs", desc: "Perform functional checks, evaluate interface load speeds, and check database queries." },
      { num: "06", title: "Deployment & Telemetry Release", desc: "Verify domain routings, set up user access permissions, and calibrate backups." },
    ],
    proofTitle: "Delivery Benchmarks",
    proofIntro:
      "We operate under standard testing guidelines. All container deployments and custom API bridges undergo integration checks and data validations before launch.",
    highlights: [
      "Uptime scalability: handle rapid 10x traffic spikes with automatic container scale-ups.",
      "Decoupled serverless computation layers minimizing server rental costs.",
      "Integrated database synchronization pathways securing global transaction consistency.",
      "Complete code metrics monitoring using Prometheus and Grafana panels.",
    ],
    ctaTitle: "Need a cloud-native build?",
    ctaIntro:
      "Connect with our cloud-native engineers to review server configurations, map databases, and schedule prototyping runs.",
    ctaLabel: "Request Container Build",
  };

  return <ExpertiseLayout content={content} />;
}
