// Placeholder content — replace with Outpro.India's real service catalogue before launch.
export const services = [
  {
    slug: "business-process-outsourcing",
    name: "Business Process Outsourcing",
    short: "End-to-end back-office operations, run to your SLA.",
    icon: "Workflow",
    description:
      "We take ownership of repeatable back-office workflows — data processing, order management, reconciliation — and run them against agreed service levels, so your team can focus on judgment calls, not queues.",
    highlights: [
      "Dedicated pod with a named delivery lead",
      "SLA-backed turnaround and accuracy targets",
      "Weekly ops review with live dashboards",
    ],
  },
  {
    slug: "customer-experience-support",
    name: "Customer Experience Support",
    short: "Multichannel support desks that protect your brand voice.",
    icon: "Headset",
    description:
      "Voice, chat, and email support built around your tone of voice and escalation paths, staffed by agents trained on your product before they take a single ticket.",
    highlights: [
      "CSAT and first-response-time tracking",
      "Tiered escalation to your internal team",
      "Coverage across time zones",
    ],
  },
  {
    slug: "finance-and-accounting-ops",
    name: "Finance & Accounting Operations",
    short: "Bookkeeping, payables, and reporting on a monthly cadence.",
    icon: "Calculator",
    description:
      "From accounts payable to management reporting, we run the finance operations that keep the business auditable and on schedule, with clear handoffs to your controller or CFO.",
    highlights: [
      "Month-end close support",
      "AP/AR processing and reconciliation",
      "Audit-ready documentation trail",
    ],
  },
  {
    slug: "data-and-analytics-services",
    name: "Data & Analytics Services",
    short: "Clean data pipelines and recurring reporting, managed for you.",
    icon: "BarChart3",
    description:
      "We manage the unglamorous middle of your data stack — ingestion, cleaning, tagging, and recurring reports — so decisions are made on numbers your team actually trusts.",
    highlights: [
      "Recurring report packs on schedule",
      "Data quality checks built into the pipeline",
      "Handover in the tools you already use",
    ],
  },
  {
    slug: "managed-it-operations",
    name: "Managed IT Operations",
    short: "Tier 1–2 helpdesk and infrastructure monitoring.",
    icon: "ServerCog",
    description:
      "A monitored, ticketed helpdesk for infrastructure and end-user issues, with clear escalation into your engineering team for anything that needs deeper context.",
    highlights: [
      "24/5 or 24/7 coverage options",
      "Ticket SLAs by severity",
      "Monthly uptime and incident report",
    ],
  },
  {
    slug: "hr-and-payroll-administration",
    name: "HR & Payroll Administration",
    short: "Onboarding, payroll runs, and compliance paperwork, handled.",
    icon: "Users",
    description:
      "We administer the recurring HR calendar — onboarding checklists, payroll runs, statutory filings — so your HR team spends its time on people, not paperwork.",
    highlights: [
      "Payroll processed on a fixed monthly cycle",
      "Statutory compliance tracking",
      "Employee self-service onboarding flow",
    ],
  },
];

export function getServiceBySlug(slug) {
  return services.find((s) => s.slug === slug);
}
