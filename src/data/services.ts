export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDesc: string;
  h1: string;
  intro: string;
  benefits: { title: string; desc: string }[];
  problems: string[];
  solutions: string[];
  steps: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  imageAlt: string;
  price: string;
  timeline: string;
}

export const services: Service[] = [
  {
    slug: "n8n-workflow-automation",
    title: "n8n Workflow Automation Services",
    shortTitle: "n8n Automation",
    metaTitle: "n8n Workflow Automation Services | Custom Automation Agency",
    metaDesc: "Expert n8n workflow automation services. Build custom multi-step workflows, API integrations, and business process automation. Cut costs up to 70%.",
    h1: "n8n Workflow Automation Services for Modern Businesses",
    intro: "n8n is the leading open-source workflow automation platform. Our certified n8n developers design, build, and maintain complex multi-step automations that connect your entire tech stack — from CRMs and ERPs to marketing tools and custom APIs. Unlike Zapier or Make, n8n gives you full data ownership, unlimited workflows, and the flexibility of custom code nodes.",
    benefits: [
      { title: "Full Data Ownership", desc: "Self-host n8n on your infrastructure. No third-party data leakage, no vendor lock-in, full GDPR compliance." },
      { title: "Unlimited Workflows", desc: "No per-workflow pricing. Build as many automations as you need without worrying about tier upgrades." },
      { title: "400+ Integrations", desc: "Pre-built nodes for Slack, Gmail, Salesforce, HubSpot, PostgreSQL, MongoDB, Stripe, and hundreds more." },
      { title: "Custom Code Support", desc: "Drop into JavaScript/Python code nodes when pre-built integrations aren't enough. Extend n8n with custom npm packages." },
      { title: "Error Handling & Retries", desc: "Built-in error workflows, retry logic, and notification chains ensure your automations never silently fail." },
      { title: "Enterprise Security", desc: "SSO, LDAP, environment variables, credential encryption, and audit logging for enterprise deployments." },
    ],
    problems: [
      "Repetitive manual data entry across multiple systems costing hours daily",
      "Fragmented tech stack with no integration between tools",
      "Expensive Zapier/Make subscription with workflow limits",
      "Data privacy concerns with cloud-only automation platforms",
      "Complex approval chains that require manual handoffs",
    ],
    solutions: [
      "Custom n8n workflows that connect every tool in your stack into unified automations",
      "Self-hosted n8n deployment with full data control and unlimited workflows",
      "Automated approval chains with Slack/Email notifications and conditional routing",
      "Real-time data sync between CRM, accounting, marketing, and support tools",
      "Scheduled batch processing for reports, data enrichment, and cleanup tasks",
    ],
    steps: [
      { title: "Process Audit", desc: "We map your current workflows, identify bottlenecks, and document automation opportunities with ROI estimates." },
      { title: "Architecture Design", desc: "Our team designs the n8n workflow architecture, data models, and error handling strategy." },
      { title: "Build & Test", desc: "We build your workflows in a staging environment with comprehensive testing and edge-case handling." },
      { title: "Deploy & Monitor", desc: "Production deployment with monitoring, alerting, and a 14-day hyper-care period." },
    ],
    faqs: [
      { q: "What is n8n and how is it different from Zapier?", a: "n8n is an open-source workflow automation platform. Unlike Zapier, n8n can be self-hosted on your infrastructure, has no per-workflow pricing, supports custom JavaScript/Python code, and gives you full control over your data." },
      { q: "Can n8n handle complex enterprise workflows?", a: "Yes. n8n supports conditional logic, loops, error handling, sub-workflows, webhook listeners, and custom code — capable of handling the most complex enterprise automation scenarios." },
      { q: "How long does it take to build an n8n workflow?", a: "Simple integrations take 1-3 days. Complex multi-step enterprise workflows take 1-3 weeks depending on integrations and edge cases." },
      { q: "Do you provide n8n hosting or do I self-host?", a: "We recommend self-hosting for data control. We can set up and manage your n8n instance on AWS, GCP, DigitalOcean, or your on-premise servers." },
    ],
    imageAlt: "n8n workflow automation dashboard showing multi-step workflow connections",
    price: "$2,500 - $15,000 per workflow",
    timeline: "1-3 weeks per workflow",
  },
  {
    slug: "ai-agent-development",
    title: "AI Agent Development Services",
    shortTitle: "AI Agents",
    metaTitle: "AI Agent Development Company | Custom AI Agents for Business",
    metaDesc: "Custom AI agent development using GPT-4, Claude, and open-source LLMs. Build customer support agents, lead qualifiers, and knowledge assistants.",
    h1: "Custom AI Agent Development for Business Automation",
    intro: "AI agents are autonomous software systems that perceive their environment, make decisions, and take actions to achieve specific goals. We build AI agents powered by GPT-4, Claude, Gemini, and open-source LLMs that integrate with your existing tools, learn from your data, and execute complex multi-step tasks without human intervention.",
    benefits: [
      { title: "24/7 Autonomous Operation", desc: "AI agents work around the clock handling customer inquiries, data processing, and routine decisions without breaks." },
      { title: "Multi-LLM Architecture", desc: "We use the best model for each task — GPT-4 for reasoning, Claude for analysis, open-source models for cost-sensitive operations." },
      { title: "Tool Integration", desc: "Agents can access your CRM, databases, APIs, and web browsers to gather information and execute actions." },
      { title: "Continuous Learning", desc: "Feedback loops and conversation logging allow agents to improve over time based on real interactions." },
      { title: "Human Handoff", desc: "Seamless escalation to human team members when the agent reaches confidence thresholds or complex scenarios." },
      { title: "Cost Optimization", desc: "Intelligent model routing ensures simple queries use cheaper models, reserving expensive LLMs for complex tasks." },
    ],
    problems: [
      "Customer support team overwhelmed by repetitive inquiries",
      "Lead qualification consuming sales team's valuable time",
      "Inconsistent responses across support channels",
      "Slow response times damaging customer satisfaction",
      "Knowledge buried in documents, not accessible to teams",
    ],
    solutions: [
      "AI customer support agents that handle 80% of inquiries instantly with accurate responses",
      "Lead qualification agents that score, prioritize, and route leads to sales",
      "Internal knowledge assistants that answer employee questions from company documents",
      "Multi-channel AI agents for website, WhatsApp, Telegram, and email",
      "AI-powered document processing for invoices, contracts, and reports",
    ],
    steps: [
      { title: "Discovery & Scope", desc: "We identify the highest-impact use cases for AI agents in your business and define success metrics." },
      { title: "Architecture Design", desc: "Design the agent's reasoning framework, tool access, memory system, and human handoff protocols." },
      { title: "Development & Training", desc: "Build the agent with custom prompts, knowledge base integration, and multi-turn conversation handling." },
      { title: "Testing & Deployment", desc: "Rigorous testing with real scenarios, A/B comparison with human performance, then production deployment." },
    ],
    faqs: [
      { q: "What's the difference between a chatbot and an AI agent?", a: "Chatbots follow scripted rules. AI agents use LLMs to understand context, reason about problems, access tools, and execute multi-step actions autonomously." },
      { q: "Which LLM models do you use?", a: "We're model-agnostic. We use GPT-4, GPT-4o, Claude 3.5, Gemini, and open-source models like Llama and Mistral — choosing the best for each use case." },
      { q: "Can AI agents integrate with our existing tools?", a: "Yes. Agents can connect to Salesforce, HubSpot, Zendesk, Slack, databases, and any REST API." },
      { q: "How do you ensure AI agents give accurate responses?", a: "We use RAG (Retrieval-Augmented Generation), prompt engineering, guardrails, confidence thresholds, and continuous monitoring to ensure accuracy." },
    ],
    imageAlt: "AI agent interface showing autonomous conversation with tool integration",
    price: "$5,000 - $25,000 per agent",
    timeline: "3-8 weeks per agent",
  },
  {
    slug: "whatsapp-automation",
    title: "WhatsApp Business Automation",
    shortTitle: "WhatsApp Bots",
    metaTitle: "WhatsApp Automation Services | WhatsApp Business API Agency",
    metaDesc: "WhatsApp automation services using WhatsApp Business API. Chatbots, bulk messaging, order notifications, and CRM integration. 10+ businesses served.",
    h1: "WhatsApp Automation Services for Business Growth",
    intro: "WhatsApp is the world's most popular messaging platform with 2+ billion users. We build WhatsApp automation solutions using the official WhatsApp Business API that help businesses automate customer engagement, send notifications, process orders, and qualify leads — all within the platform your customers already use daily.",
    benefits: [
      { title: "98% Open Rate", desc: "WhatsApp messages have 98% open rates within 3 minutes — far exceeding email and SMS marketing." },
      { title: "Official API Compliance", desc: "We use the official WhatsApp Business API. No bans, no rate limits, full compliance with Meta's policies." },
      { title: "Multi-Agent Support", desc: "Route conversations to the right team members with seamless handoff from chatbot to human agent." },
      { title: "Rich Media Messages", desc: "Send images, videos, PDFs, location pins, and interactive buttons within WhatsApp conversations." },
      { title: "CRM Integration", desc: "Sync WhatsApp conversations with your CRM — log messages, update contacts, and trigger automations." },
      { title: "Template Messages", desc: "Pre-approved message templates for order confirmations, shipping updates, appointment reminders, and more." },
    ],
    problems: [
      "Customers expect responses on WhatsApp but you're managing it manually",
      "Missed leads because WhatsApp messages aren't routed to the right team",
      "No way to send bulk notifications without getting banned",
      "Unable to track WhatsApp conversations in your CRM",
      "Manual order confirmations and shipping updates consuming staff time",
    ],
    solutions: [
      "AI-powered WhatsApp chatbot that handles customer inquiries 24/7",
      "Smart routing system that directs messages to the right department or agent",
      "WhatsApp Business API integration with your CRM for full conversation history",
      "Automated order confirmations, shipping updates, and appointment reminders",
      "Broadcast messaging for promotions, updates, and re-engagement campaigns",
    ],
    steps: [
      { title: "API Setup", desc: "We handle WhatsApp Business API registration, number verification, and template approval with Meta." },
      { title: "Chatbot Development", desc: "Build conversational flows, FAQ responses, and lead qualification logic for your WhatsApp bot." },
      { title: "CRM Integration", desc: "Connect WhatsApp with your CRM for automatic contact creation, conversation logging, and lead updates." },
      { title: "Launch & Optimize", desc: "Deploy, monitor conversations, analyze performance, and optimize flows based on real interactions." },
    ],
    faqs: [
      { q: "Do I need a new phone number for WhatsApp Business API?", desc: "You can use your existing number or get a new one. The number must be verified by Meta and cannot be registered with the regular WhatsApp app." },
      { q: "Can I send promotional messages on WhatsApp?", desc: "Yes, but promotional messages require pre-approved templates and must comply with Meta's messaging policies." },
      { q: "How long does WhatsApp Business API approval take?", desc: "Business verification takes 1-5 business days. Template approvals take 24-48 hours." },
      { q: "Which CRM platforms do you integrate with?", desc: "We integrate with Salesforce, HubSpot, Zoho, Pipedrive, Freshsales, and custom APIs." },
    ],
    imageAlt: "WhatsApp Business chat interface showing automated customer conversation",
    price: "$3,000 - $12,000 per setup",
    timeline: "2-4 weeks",
  },
  {
    slug: "telegram-bot-development",
    title: "Telegram Bot Development Services",
    shortTitle: "Telegram Bots",
    metaTitle: "Telegram Bot Development Company | Custom Telegram Bots",
    metaDesc: "Custom Telegram bot development for business automation. Command bots, inline queries, group management, payment integrations, and more.",
    h1: "Custom Telegram Bot Development for Business",
    intro: "Telegram offers the most flexible bot API of any messaging platform. We build custom Telegram bots that handle customer support, process orders, manage communities, automate notifications, and integrate with your business systems. Telegram bots can do everything from taking payments to moderating groups of 100,000+ members.",
    benefits: [
      { title: "100% Free API", desc: "Telegram's bot API is completely free with no per-message costs, no subscription tiers, and no usage limits." },
      { title: "Rich Bot Capabilities", desc: "Custom keyboards, inline queries, web apps, payments, file sharing, voice messages, and location sharing." },
      { title: "Group Management", desc: "Auto-moderation, welcome messages, spam filters, polls, and member analytics for Telegram groups." },
      { title: "Payment Integration", desc: "Telegram's built-in payment system supports Stripe, Razorpay, and 20+ other payment providers." },
      { title: "Web App Support", desc: "Build full web applications that open inside Telegram for seamless user experiences without leaving the app." },
      { title: "High Scalability", desc: "Telegram bots handle millions of users. Our architecture ensures your bot performs at any scale." },
    ],
    problems: [
      "Managing large Telegram groups manually is time-consuming and error-prone",
      "No automated system for customer inquiries on Telegram",
      "Manual order processing through Telegram messages",
      "Unable to automate notifications and updates to Telegram users",
      "Community management requires constant human moderation",
    ],
    solutions: [
      "Custom Telegram bot with AI-powered customer support and FAQ responses",
      "Automated group moderation with custom rules, spam detection, and member analytics",
      "Telegram bot integrated with your e-commerce platform for order processing",
      "Notification bot for real-time alerts, updates, and broadcasts",
      "Community management bot with welcome flows, polls, and engagement tracking",
    ],
    steps: [
      { title: "Bot Design", desc: "We design the bot architecture, conversation flows, and integration points with your systems." },
      { title: "Development", desc: "Build the bot with custom commands, inline queries, keyboards, and integration logic." },
      { title: "Integration Testing", desc: "Test the bot with real user scenarios, edge cases, and performance benchmarks." },
      { title: "Deployment", desc: "Deploy the bot on high-availability infrastructure with monitoring and analytics." },
    ],
    faqs: [
      { q: "How is Telegram bot development different from WhatsApp?", desc: "Telegram has a more flexible API with bot-initiated messages, inline queries, custom keyboards, and no template approval process." },
      { q: "Can a Telegram bot process payments?", desc: "Yes. Telegram supports payments through its native payment API with 20+ payment providers including Stripe." },
      { q: "Do I need coding skills to manage the bot?", desc: "No. We build admin panels that let your team manage responses, view analytics, and update content without code." },
      { q: "How many users can a Telegram bot handle?", desc: "Telegram bots have no hard user limit. Our infrastructure supports millions of concurrent users." },
    ],
    imageAlt: "Telegram bot interface showing custom keyboard and automated responses",
    price: "$2,000 - $10,000 per bot",
    timeline: "2-4 weeks",
  },
  {
    slug: "rag-systems",
    title: "RAG System Development | AI Knowledge Bases",
    shortTitle: "RAG Systems",
    metaTitle: "RAG System Development | AI Knowledge Base Solutions",
    metaDesc: "Build Retrieval-Augmented Generation (RAG) systems for intelligent document Q&A. Custom AI knowledge bases that answer questions from your data.",
    h1: "RAG Systems: Intelligent AI Knowledge Bases for Your Business",
    intro: "Retrieval-Augmented Generation (RAG) is the most effective way to build AI systems that can answer questions based on your specific data. Instead of training a model on your data (expensive and slow), RAG retrieves relevant information from your documents in real-time and feeds it to an LLM to generate accurate, contextual answers. We build production-ready RAG systems using vector databases, embedding models, and LLMs.",
    benefits: [
      { title: "Accurate Answers", desc: "Answers are grounded in your actual documents, not the LLM's general training data. Citations link back to source documents." },
      { title: "Cost-Effective", desc: "No expensive fine-tuning required. Just index your documents and query them with natural language." },
      { title: "Always Current", desc: "Update your knowledge base any time. The RAG system immediately starts using new information without retraining." },
      { title: "Full Control", desc: "Choose which documents are indexed, set access controls, and monitor exactly what information is being retrieved." },
      { title: "Multi-Format Support", desc: "Index PDFs, Word docs, web pages, databases, Notion pages, Confluence spaces, and code repositories." },
      { title: "Scalable Architecture", desc: "From 100 documents to 10 million, our RAG architecture scales horizontally with your data." },
    ],
    problems: [
      "Company knowledge is scattered across documents, wikis, and emails — hard to find",
      "New employees take months to learn internal processes and domain knowledge",
      "Customer support agents can't find product information quickly during calls",
      "Legal and compliance documents are underutilized because they're hard to search",
      "Subject matter experts spend hours answering the same questions repeatedly",
    ],
    solutions: [
      "Internal AI assistant that answers employee questions from all company documents",
      "Customer-facing FAQ system that pulls answers from product documentation",
      "Legal document analysis system for contract review and compliance questions",
      "Technical documentation search for engineering teams",
      "Research assistant that synthesizes information from thousands of documents",
    ],
    steps: [
      { title: "Data Assessment", desc: "We audit your document sources, classify data types, and design the ingestion pipeline." },
      { title: "Pipeline Setup", desc: "Build the document processing, chunking, embedding, and vector database indexing pipeline." },
      { title: "Query Optimization", desc: "Tune retrieval parameters, re-ranking, and LLM prompts for maximum answer accuracy." },
      { title: "Deployment & Monitoring", desc: "Deploy with usage analytics, feedback collection, and continuous improvement cycles." },
    ],
    faqs: [
      { q: "What's the difference between RAG and fine-tuning?", desc: "RAG retrieves relevant documents at query time and feeds them to the LLM. Fine-tuning trains the model on your data. RAG is cheaper, faster to update, and more transparent." },
      { q: "Which vector database do you use?", desc: "We use Pinecone, Weaviate, Qdrant, or pgvector depending on your scale, budget, and hosting preferences." },
      { q: "Can RAG handle images and scanned PDFs?", desc: "Yes. We use OCR for scanned documents, and multimodal models can process images, diagrams, and charts." },
      { q: "How accurate are RAG answers?", desc: "With proper chunking, embedding, and re-ranking, RAG systems achieve 90-95% answer accuracy on well-defined domains." },
    ],
    imageAlt: "RAG system architecture showing document ingestion and AI query flow",
    price: "$8,000 - $30,000 per system",
    timeline: "4-8 weeks",
  },
  {
    slug: "business-process-automation",
    title: "Business Process Automation Services",
    shortTitle: "Process Automation",
    metaTitle: "Business Process Automation Company | End-to-End Automation",
    metaDesc: "End-to-end business process automation for enterprises and startups. Automate workflows, reduce costs 70%, and scale without hiring.",
    h1: "End-to-End Business Process Automation Services",
    intro: "Business Process Automation (BPA) is the strategy of using technology to automate complex business processes and workflows beyond simple task automation. We analyze your entire operation — from lead generation to invoicing, from customer support to reporting — and design automation systems that eliminate manual work, reduce errors, and free your team to focus on high-value activities.",
    benefits: [
      { title: "70% Cost Reduction", desc: "Our clients typically reduce operational costs by 50-70% by eliminating manual data entry, handoffs, and review cycles." },
      { title: "5X Processing Speed", desc: "Automated processes run at machine speed. What took 3 days now takes 2 hours." },
      { title: "Zero Manual Errors", desc: "Eliminate typos, missed steps, and data entry mistakes. Automated processes execute precisely every time." },
      { title: "Full Audit Trail", desc: "Every action is logged, timestamped, and traceable. Perfect for compliance and ISO audits." },
      { title: "Scalable Operations", desc: "Handle 10x the volume without hiring. Automation scales linearly with your business growth." },
      { title: "Employee Satisfaction", desc: "Free your team from repetitive data entry. They focus on creative, strategic, and customer-facing work." },
    ],
    problems: [
      "Manual data entry between systems consuming hours daily",
      "Paper-based approval processes causing bottlenecks",
      "Invoicing and payment collection requiring manual follow-ups",
      "Customer onboarding requiring 10+ manual steps across teams",
      "Reporting and reconciliation consuming days each month",
    ],
    solutions: [
      "End-to-end order-to-cash automation from quote to payment reconciliation",
      "Procurement automation with approval workflows and PO management",
      "HR onboarding automation for employee document collection and system provisioning",
      "Automated invoice processing with AI-powered OCR and ERP integration",
      "Custom reporting automation that generates and distributes reports on schedule",
    ],
    steps: [
      { title: "Process Discovery", desc: "We document your current processes, interview stakeholders, and identify automation opportunities ranked by ROI." },
      { title: "Solution Design", desc: "Design the automated process flow, exception handling, and integration architecture." },
      { title: "Implementation", desc: "Build, test, and iterate the automation in a staging environment with your data." },
      { title: "Go-Live & Optimization", desc: "Deploy to production, train your team, and continuously optimize based on performance data." },
    ],
    faqs: [
      { q: "What processes can be automated?", desc: "Almost any repetitive, rule-based process can be automated — data entry, approvals, notifications, report generation, invoice processing, customer onboarding, and more." },
      { q: "How long does a typical automation project take?", desc: "Simple automations take 1-2 weeks. Complex enterprise-wide processes take 4-8 weeks depending on system integrations." },
      { q: "Do you integrate with legacy systems?", desc: "Yes. We connect to legacy systems via APIs, database connectors, file imports, or custom middleware when APIs aren't available." },
      { q: "What's your approach to change management?", desc: "We involve stakeholders from day one, provide comprehensive training, and run parallel operations during cutover to ensure zero disruption." },
    ],
    imageAlt: "Business process automation workflow showing connected systems and data flow",
    price: "$3,000 - $20,000 per process",
    timeline: "2-8 weeks per process",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServiceByTitle(title: string): Service | undefined {
  return services.find((s) => s.title.toLowerCase().includes(title.toLowerCase()) || s.shortTitle.toLowerCase().includes(title.toLowerCase()));
}
