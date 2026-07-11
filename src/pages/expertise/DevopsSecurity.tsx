import { useSEO, breadcrumbJsonLd, SITE_URL, SITE_NAME } from "../../lib/seo";
import ExpertiseLayout from "../../components/ExpertiseLayout";
import type { PageContent } from "../../components/pageLayoutTypes";
import {
  Server,
  GitBranch,
  Layers,
  ShieldCheck,
} from "lucide-react";

export default function DevopsSecurity() {
  useSEO({
    title: "DevOps Services | CI/CD, Kubernetes & Cloud DevOps Solutions",
    description:
      "NorthArc provides DevOps consulting services for enterprises — CI/CD pipeline implementation services, Kubernetes deployment services, and infrastructure automation services. Our cloud DevOps solutions deliver zero-downtime releases with DevSecOps best practices.",
    path: "/expertise/devops-security",
    keywords:
      "DevOps Services, CI/CD, Docker, Kubernetes, DevSecOps, DevOps Consulting Services for Enterprises, CI/CD Pipeline Implementation Services, Kubernetes Deployment Services, Cloud DevOps Solutions, Infrastructure Automation Services",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "DevOps & Cloud Security Engineering",
        name: "DevOps & Cloud Security Engineering",
        description:
          "Infrastructure as Code, CI/CD pipelines, Kubernetes orchestration, and SOC-2-aligned security and monitoring that let teams ship faster with zero-downtime deployments.",
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        areaServed: "Worldwide",
        url: `${SITE_URL}/expertise/devops-security`,
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "DevOps & Security", path: "/expertise/devops-security" },
      ]),
    ],
  });

  const content: PageContent = {
    eyebrow: "EXPERTISE / DEVOPS & SECURITY",
    title: "DevOps & Security Architecture",
    intro:
      "We automate your delivery pipeline and harden your infrastructure. SOC-2-aligned cloud, CI/CD, and continuous monitoring that help your team ship faster with zero-downtime, secure releases.",
    heroIcon: ShieldCheck,
    heroScene: "security",
    heroTitle: "Secure delivery",
    accent: "#1D75FF",

    capsTitle: "Operations Focus",
    capsIntro:
      "We compile highly secure infrastructures. We prioritize automated network controls, SOC-2 alignment, and metrics tracking to prevent data leaks.",
    capabilities: [
      { icon: GitBranch, title: "Infrastructure as Code", desc: "Build reproducible, audited cloud containers using automated Terraform configurations." },
      { icon: Server, title: "Kubernetes Orchestration", desc: "Configure high-availability compute node arrays with Helm and Kubernetes steering wheels." },
      { icon: Layers, title: "Continuous Integration", desc: "Build test-driven release pipelines using automated GitHub Actions and Docker files." },
      { icon: ShieldCheck, title: "Security & Monitoring", desc: "Set up Grafana dashboards, Prometheus logs, VPC isolations, and IAM governance rules." },
    ],

    processTitle: "The Operations Workflow",
    processIntro:
      "A systematic overview of how we align infrastructure templates to container releases.",
    process: [
      { num: "01", title: "Cloud Architecture Auditing", desc: "Evaluate active hosting nodes, inspect server overheads, and map out security scopes." },
      { num: "02", title: "IaC Template Configuration", desc: "Write Terraform declarations, configure VPC routers, and define subnets layout." },
      { num: "03", title: "Kubernetes Node Clustering", desc: "Deploy Kubernetes pods, set up load balancing gateways, and configure database access layers." },
      { num: "04", title: "Prometheus Monitoring Setup", desc: "Calibrate Grafana widgets, set up alert triggers, and configure data backup loops." },
      { num: "05", title: "Security Verification", desc: "Conduct network penetration tests, configure firewalls, and audit access logs." },
      { num: "06", title: "Operations Handoff & SLAs", desc: "Coordinate operational runbooks, establish incident management SLAs, and scale host arrays." },
    ],

    proofTitle: "Security Standards",
    proofIntro:
      "We leverage cloud security keys and strict VPC rules. All workloads are monitored continuously using diagnostic tools to block potential intrusion.",
    highlights: [
      "VPC network layouts providing isolated database security tiering.",
      "Automated zero-downtime rolling deployment strategies.",
      "Integrated Prometheus metrics alerts avoiding system overloads.",
      "Significant cost savings via serverless compute resource scaling.",
    ],

    ctaTitle: "Need infrastructure optimization?",
    ctaIntro:
      "Connect with our DevOps architects to audit server deployments, review VPC networks, and budget automation pipelines.",
    ctaLabel: "Request Cloud Setup",
  };

  return <ExpertiseLayout content={content} />;
}
