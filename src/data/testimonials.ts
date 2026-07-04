export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  location: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: { metric: string; value: string }[];
  testimonial: Testimonial;
  imageAlt: string;
}

export const testimonials: Testimonial[] = [
  { name: "Rajesh K.", role: "CTO", company: "Hyderabad SaaS Firm", text: "FlologixAutomations built our customer onboarding automation in 3 weeks. What used to take 2 days now happens in 2 hours. The ROI was immediate.", rating: 5, location: "Hyderabad" },
  { name: "Sarah M.", role: "Operations Director", company: "Dallas Logistics Firm", text: "Our invoice processing went from 3 days to 3 hours after FlologixAutomations deployed their AI OCR solution. Best investment we made this year.", rating: 5, location: "Dallas" },
  { name: "Priya S.", role: "VP Operations", company: "Mumbai Fintech", text: "FlologixAutomations deployed our AI agent for customer support in just 4 weeks. It handles 75% of inquiries autonomously. Game changer.", rating: 5, location: "Mumbai" },
  { name: "Arun P.", role: "Founder", company: "Bangalore SaaS Startup", text: "We were spending 40 hours/week on manual reporting. FlologixAutomations automated it in 2 weeks. We've scaled to 3x revenue without adding headcount.", rating: 5, location: "Bangalore" },
  { name: "Michael L.", role: "COO", company: "NYC Financial Services", text: "FlologixAutomations built a compliance reporting automation that saves us $200K/year in manual audit preparation.", rating: 5, location: "New York" },
  { name: "James W.", role: "Head of Operations", company: "London Fintech", text: "The AI agent FlologixAutomations built for our compliance team handles 200+ daily queries. It's like having 5 extra team members.", rating: 5, location: "London" },
  { name: "Anita R.", role: "Director of Operations", company: "Dubai E-commerce", text: "We automated our entire order-to-cash process with FlologixAutomations. Order processing time dropped from 4 hours to 15 minutes daily.", rating: 5, location: "Dubai" },
  { name: "David C.", role: "CEO", company: "Singapore Logistics", text: "The WhatsApp bot they built handles 1,000+ customer inquiries daily. Our support costs dropped 60% in the first quarter.", rating: 5, location: "Singapore" },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "marketing-agency-5x-capacity",
    title: "Marketing Agency Scales 5x Capacity with Workflow Automation",
    metaTitle: "Marketing Agency 5x Capacity with n8n Automation | Case Study",
    metaDesc: "How a marketing agency automated client reporting, campaign management, and lead processing — scaling from 20 to 100 clients without hiring.",
    client: "GrowthLab Marketing",
    industry: "Marketing Agency",
    challenge: "GrowthLab Marketing was managing 20 clients with a team of 12. Client reporting took 3 days each month, campaign optimization required manual data collection from 8 platforms, and lead intake was a manual email process. They needed to scale to 100 clients but couldn't afford to triple their headcount.",
    solution: "We built an n8n automation system that: (1) Automated client reporting by pulling data from Google Ads, Meta, LinkedIn, and Analytics into unified monthly reports; (2) Created automated campaign optimization workflows that adjust budgets based on performance; (3) Implemented automated lead intake from website forms to CRM with Slack notifications; (4) Built a client onboarding workflow that provisions tools and sends welcome sequences automatically.",
    results: [
      { metric: "Client Capacity", value: "5x (20 to 100 clients)" },
      { metric: "Reporting Time", value: "3 days → 15 minutes" },
      { metric: "Lead Response", value: "24 hours → 5 minutes" },
      { metric: "Team Size", value: "No additional hires" },
    ],
    testimonial: { name: "Alex T.", role: "CEO", company: "GrowthLab Marketing", text: "FlologixAutomations didn't just automate our processes — they transformed our business model. We can now take on any client without worrying about operational capacity.", rating: 5, location: "Dallas" },
    imageAlt: "Marketing agency dashboard showing automated client reporting and campaign management",
  },
  {
    slug: "financial-services-compliance-automation",
    title: "Financial Services Firm Cuts Compliance Reporting Time by 80%",
    metaTitle: "Financial Services Compliance Automation | Case Study",
    metaDesc: "How a financial services firm automated regulatory compliance reporting, saving $200K annually and reducing reporting time from 2 weeks to 2 days.",
    client: "Atlas Financial Advisors",
    industry: "Financial Services",
    challenge: "Atlas Financial Advisors spent 2 weeks every month compiling compliance reports for SEBI and internal auditors. Data was scattered across 6 systems, requiring manual extraction, validation, and formatting. Two senior analysts spent 50% of their time on this process, and the manual nature led to occasional errors and missed deadlines.",
    solution: "We deployed: (1) An n8n workflow that automatically extracts data from all 6 systems; (2) Automated validation rules that check data consistency and flag anomalies; (3) A reporting engine that generates SEBI-compliant reports in the required format; (4) An audit trail system that logs every data point and transformation for auditor review; (5) Automated distribution to stakeholders on schedule.",
    results: [
      { metric: "Reporting Time", value: "2 weeks → 2 days" },
      { metric: "Annual Savings", value: "$200,000" },
      { metric: "Error Rate", value: "Zero errors in 6 months" },
      { metric: "Analyst Capacity Freed", value: "50% → 5%" },
    ],
    testimonial: { name: "Michael L.", role: "COO", company: "Atlas Financial Advisors", text: "FlologixAutomations built a compliance reporting automation that saves us $200K/year in manual audit preparation.", rating: 5, location: "New York" },
    imageAlt: "Financial compliance dashboard showing automated report generation and validation",
  },
  {
    slug: "b2b-services-shipment-automation",
    title: "B2B Services Firm Improves On-Time Shipments from 63% to 95%",
    metaTitle: "B2B Supply Chain Automation | On-Time Delivery Case Study",
    metaDesc: "How a B2B services company automated supply chain workflows, improving on-time shipments from 63% to 95% and reducing manual coordination by 40 hours/week.",
    client: "Pinnacle Logistics Solutions",
    industry: "B2B Logistics",
    challenge: "Pinnacle Logistics handled 500+ shipments monthly across 3 warehouses. Their coordination was manual — emails, spreadsheets, and phone calls. Only 63% of shipments went out on time. Customer complaints were rising, and the operations team was working 60-hour weeks just to keep up.",
    solution: "We implemented: (1) An n8n workflow connecting their ERP, warehouse management system, and shipping carriers; (2) Automated order-to-shipment pipeline with real-time status tracking; (3) AI-powered exception handling that automatically reroutes shipments when issues arise; (4) A customer notification system providing real-time updates via WhatsApp and email; (5) A reporting dashboard for management visibility into operations.",
    results: [
      { metric: "On-Time Shipments", value: "63% → 95%" },
      { metric: "Manual Hours Saved", value: "40 hours/week" },
      { metric: "Customer Complaints", value: "80% reduction" },
      { metric: "Team Overtime", value: "Eliminated entirely" },
    ],
    testimonial: { name: "Sarah M.", role: "Operations Director", company: "Pinnacle Logistics Solutions", text: "Our invoice processing went from 3 days to 3 hours after FlologixAutomations deployed their AI OCR solution. Best investment we made this year.", rating: 5, location: "Dallas" },
    imageAlt: "Supply chain dashboard showing real-time shipment tracking and automation metrics",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
