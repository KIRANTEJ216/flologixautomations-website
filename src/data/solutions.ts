export interface Solution {
  slug: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  h1: string;
  intro: string;
  problem: string;
  approach: string[];
  outcome: string;
  relatedServices: string[];
  imageAlt: string;
}

export const solutions: Solution[] = [
  {
    slug: "reduce-operational-costs",
    title: "Reduce Operational Costs with AI Automation",
    metaTitle: "Reduce Business Costs with AI Automation | 70% Cost Savings",
    metaDesc: "Cut operational costs by 70% with AI automation. Automate manual processes, eliminate data entry errors, and reduce headcount without reducing output.",
    h1: "Reduce Operational Costs by 70% with AI Automation",
    intro: "Most businesses waste 20-30% of their revenue on manual, repetitive processes that could be automated. Data entry, invoice processing, report generation, customer follow-ups, and approval chains consume thousands of staff hours annually. We identify these hidden costs and eliminate them with custom n8n automation, AI agents, and process redesign.",
    problem: "Your team spends 30-40% of their time on tasks that could be automated — data entry between systems, manual report generation, invoice processing, customer follow-ups, and approval workflows. This hidden cost eats into margins and prevents your team from focusing on revenue-generating activities.",
    approach: [
      "Conduct a full process audit to identify every manual task and its true cost",
      "Map each process to an automation architecture with n8n workflows and AI agents",
      "Build and test automations in a staging environment with your real data",
      "Deploy with monitoring and measure actual time/cost savings against baseline",
      "Iterate and expand automation coverage to adjacent processes",
    ],
    outcome: "Our clients typically reduce operational costs by 50-70% within 90 days of deployment. A mid-sized company spending $500K/year on manual processes saves $250K-$350K annually after automation.",
    relatedServices: ["business-process-automation", "n8n-workflow-automation", "ai-agent-development"],
    imageAlt: "Cost reduction chart showing operational savings from AI automation implementation",
  },
  {
    slug: "improve-customer-response",
    title: "Improve Customer Response Time with AI Agents",
    metaTitle: "Improve Customer Response Time | AI Customer Support Agents",
    metaDesc: "Respond to customer inquiries instantly with AI agents. 24/7 automated support handling 80% of inquiries within 30 seconds.",
    h1: "Improve Customer Response Time with AI-Powered Automation",
    intro: "Customers expect responses in minutes, not hours. Yet most businesses take 12-24 hours to respond to inquiries. AI agents can respond instantly to common questions, route complex issues to the right team, and maintain context across conversations — all while learning from each interaction to improve over time.",
    problem: "Your customer support team is overwhelmed by repetitive questions, resulting in slow response times, inconsistent answers, and low customer satisfaction. Meanwhile, your support costs keep rising as you add more agents to handle the volume.",
    approach: [
      "Analyze your support tickets to identify the 80% that are repetitive and predictable",
      "Build an AI agent with access to your knowledge base, product docs, and CRM",
      "Configure confidence thresholds, escalation rules, and human handoff protocols",
      "Deploy across WhatsApp, website chat, Telegram, and email simultaneously",
      "Monitor, analyze, and continuously improve agent responses based on feedback",
    ],
    outcome: "Average response time drops from 12 hours to 30 seconds. Customer satisfaction scores increase by 40%. Support team handles 5x the volume without additional headcount.",
    relatedServices: ["ai-agent-development", "whatsapp-automation", "rag-systems"],
    imageAlt: "Customer support dashboard showing AI agent response times and satisfaction scores",
  },
  {
    slug: "scale-business-without-hiring",
    title: "Scale Your Business Without Hiring",
    metaTitle: "Scale Business Without Hiring | Automation for Growth",
    metaDesc: "Scale your business 10x without adding headcount. AI automation and workflow tools that multiply your team's output.",
    h1: "Scale Your Business 10x Without Hiring",
    intro: "Hiring is expensive, slow, and risky. Yet most businesses respond to increased demand by hiring more people — creating a cost structure that's unsustainable in the long run. We help businesses decouple growth from headcount by automating the processes that would otherwise require new hires.",
    problem: "Your business is growing, but every new client means more manual work. You're in a hiring cycle that's eating into margins: more revenue → more work → more hires → higher costs → thinner margins. You need a way to scale without linearly increasing headcount.",
    approach: [
      "Audit your current operations to find scalability bottlenecks",
      "Design automation-first processes that handle 10x volume without additional staff",
      "Build n8n workflows that connect your tools and eliminate manual handoffs",
      "Deploy AI agents that handle customer interactions, data processing, and reporting",
      "Measure capacity gains and identify the next automation frontier",
    ],
    outcome: "Clients consistently handle 3-5x more volume without hiring. One e-commerce client grew from 50 to 500 orders/day with the same team. A B2B services firm added 20 clients without adding staff.",
    relatedServices: ["business-process-automation", "n8n-workflow-automation", "ai-agent-development"],
    imageAlt: "Growth chart showing revenue scaling without headcount increase",
  },
  {
    slug: "automate-invoice-processing",
    title: "Automate Invoice Processing with AI OCR",
    metaTitle: "AI Invoice Processing Automation | OCR for Accounts Payable",
    metaDesc: "Automate invoice processing with AI OCR. Extract data from invoices, validate against POs, and post to ERP automatically. 99% accuracy.",
    h1: "Automate Invoice Processing with AI-Powered OCR",
    intro: "Manual invoice processing costs businesses $12-25 per invoice in labor. For a business processing 1,000 invoices/month, that's $12K-$25K monthly. AI-powered OCR automation reads invoices, extracts line items, validates against purchase orders, gets approval, and posts to your ERP — all without human touch.",
    problem: "Your accounts payable team spends hours manually entering invoice data, matching with POs, getting approvals, and posting entries. Errors from manual entry cause payment delays and supplier friction. Invoice processing backlogs grow during peak periods.",
    approach: [
      "Configure AI OCR to read invoices from email, upload portals, and scanned documents",
      "Set up validation rules for tax numbers, PO matching, and line-item extraction",
      "Build approval workflows with conditional routing based on amount and department",
      "Integrate with your ERP (Zoho Books, QuickBooks, Tally, SAP) for automatic posting",
      "Deploy with exception handling for edge cases and unmatched invoices",
    ],
    outcome: "Invoice processing cost drops from $15-25 to under $1 per invoice. Processing time reduces from 5 days to 2 hours. Accuracy exceeds 99% with automated PO matching and validation.",
    relatedServices: ["business-process-automation", "n8n-workflow-automation", "rag-systems"],
    imageAlt: "Invoice OCR dashboard showing automated data extraction and processing pipeline",
  },
  {
    slug: "improve-google-ranking",
    title: "Improve Google Ranking with SEO Automation",
    metaTitle: "SEO Automation Services | Improve Google Rankings",
    metaDesc: "Automate your SEO workflow with n8n. Content briefs, keyword tracking, rank monitoring, and technical SEO audits — all automated.",
    h1: "Improve Your Google Ranking with SEO Automation",
    intro: "SEO requires consistent effort across content creation, technical optimization, link building, and performance monitoring. Our SEO automation solutions help digital agencies and in-house teams automate repetitive SEO tasks — from generating content briefs to monitoring rankings and performing technical audits.",
    problem: "SEO is time-consuming. Manual rank checking, content optimization, technical audits, and competitor analysis consume hours that could be spent on strategy. Consistency suffers, and ranking improvements are slow.",
    approach: [
      "Automate daily rank tracking for your target keywords across locations",
      "Build automated content briefs with keyword data, competitor analysis, and outline suggestions",
      "Schedule weekly technical SEO audits with automated issue detection and reporting",
      "Integrate Google Search Console, Analytics, and Ahrefs data into unified dashboards",
      "Set up automated alerts for ranking drops, indexing issues, and opportunities",
    ],
    outcome: "SEO teams save 20+ hours per week on manual tracking and reporting. Content production accelerates 3x with automated briefs. Technical issues are caught and fixed within hours instead of weeks.",
    relatedServices: ["n8n-workflow-automation"],
    imageAlt: "SEO dashboard showing automated rank tracking and keyword performance metrics",
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
