export interface Service {
  dedicatedLanding?: boolean;
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
    "slug": "n8n-workflow-automation",
    "title": "n8n Development & Workflow Automation",
    "shortTitle": "n8n Development",
    "metaTitle": "n8n Development & Workflow Automation",
    "metaDesc": "Custom n8n development for API integrations, webhook workflows and business process automation. Connect your apps with Flologix. Book a free consultation.",
    "h1": "n8n Development Services",
    "intro": "Connect disconnected business tools with custom n8n workflows built around your actual processes. FLOLOGIXAUTOMATIONS designs API integrations, webhook automations and multi-step workflows that move data between your CRM, spreadsheets, inbox and operational systems. Whether you are starting with one repetitive task or extending an existing n8n setup, we define the inputs, rules and exceptions before building.",
    "benefits": [
      {
        "title": "Workflows built around your process",
        "desc": "Combine triggers, conditions and data transformations rather than forcing your team into a generic template."
      },
      {
        "title": "API and webhook integrations",
        "desc": "Connect supported applications and custom endpoints with explicit field mapping and credential handling."
      },
      {
        "title": "Recoverable failures",
        "desc": "Plan retries, duplicate prevention and exception notifications so your team can investigate failed runs."
      }
    ],
    "problems": [
      "Website leads are copied into a CRM and spreadsheet by hand.",
      "Separate systems require repeated exports and imports.",
      "Existing workflows break when an API response or data format changes."
    ],
    "solutions": [
      "Lead capture: receive a form webhook, validate required fields, create a CRM record and notify the owner.",
      "Invoice routing: collect invoice details, send exceptions for review and pass approved records to your accounting process.",
      "Reporting: gather scheduled data from connected tools and deliver a consolidated report."
    ],
    "steps": [
      {
        "title": "Map the workflow",
        "desc": "Agree on the trigger, source applications, destination fields and business rules."
      },
      {
        "title": "Build the integration",
        "desc": "Configure n8n nodes, API calls, transformations and credentials for the agreed scope."
      },
      {
        "title": "Test exceptions",
        "desc": "Check missing fields, duplicate events, access failures and recovery behaviour."
      },
      {
        "title": "Handover",
        "desc": "Document the workflow and agree on monitoring, ownership and future changes."
      }
    ],
    "faqs": [
      {
        "q": "Can you improve an existing n8n workflow?",
        "a": "Yes. We can review its triggers, node configuration, mappings and error paths before recommending changes."
      },
      {
        "q": "Can n8n connect to an app without a dedicated node?",
        "a": "An integration may be possible through its API or webhooks. We first check authentication, endpoint access and provider limits."
      },
      {
        "q": "What do you need to scope n8n development?",
        "a": "Share the task, the applications involved, sample field names and the intended result. Do not send passwords or API secrets through the consultation form."
      }
    ],
    "imageAlt": "",
    "price": "Scoped after consultation",
    "timeline": "Based on project scope",
    "dedicatedLanding": true
  },
  {
    "slug": "ai-agent-development",
    "title": "Custom AI Agent Development",
    "shortTitle": "AI Agents",
    "metaTitle": "AI Agent Development for Business",
    "metaDesc": "AI agent development for customer support, lead qualification and internal knowledge. Connect business tools with review controls. Discuss your use case.",
    "h1": "AI Agent Development for Business",
    "intro": "Build AI agents for specific business tasks, not open-ended autonomy. FLOLOGIXAUTOMATIONS combines language models, approved knowledge sources and tool integrations to help teams answer questions, qualify enquiries and prepare actions. Each agent has a defined scope, clear escalation rules and checks before sensitive changes are made.",
    "benefits": [
      {
        "title": "Grounded business answers",
        "desc": "Connect approved documents or structured records so responses can use relevant business context."
      },
      {
        "title": "Controlled tool access",
        "desc": "Limit which systems an agent can read or update and require human approval for higher-impact actions."
      },
      {
        "title": "Human escalation",
        "desc": "Route uncertain answers, exceptions and out-of-scope requests to the right person."
      }
    ],
    "problems": [
      "Support staff repeatedly search for the same product or policy information.",
      "Sales teams manually review and classify incoming enquiries.",
      "An experimental chatbot lacks clear access controls or escalation rules."
    ],
    "solutions": [
      "Customer support assistant: retrieve relevant help content, draft a response and escalate unresolved issues.",
      "Lead qualification agent: collect agreed details, summarise the enquiry and prepare a CRM handoff.",
      "Internal knowledge assistant: search approved documents and surface source references where available."
    ],
    "steps": [
      {
        "title": "Define the task",
        "desc": "Specify the audience, acceptable actions, knowledge sources and success criteria."
      },
      {
        "title": "Design the boundaries",
        "desc": "Set tool permissions, retrieval rules, approval points and fallback responses."
      },
      {
        "title": "Evaluate real scenarios",
        "desc": "Test representative questions, unsupported requests and misleading inputs."
      },
      {
        "title": "Launch with review",
        "desc": "Introduce the agent with feedback collection and an agreed review process."
      }
    ],
    "faqs": [
      {
        "q": "How is an AI agent different from a chatbot?",
        "a": "A chatbot mainly responds in a conversation. An AI agent may also retrieve information or call permitted tools to complete a defined task."
      },
      {
        "q": "Can an AI agent use our CRM?",
        "a": "Yes, where the CRM provides appropriate integration access. Read and write permissions should be limited to the agreed task."
      },
      {
        "q": "Can AI agents guarantee correct answers?",
        "a": "No. Model responses can be incorrect. Grounding, evaluations and human review reduce risk but do not eliminate it."
      }
    ],
    "imageAlt": "",
    "price": "Scoped after consultation",
    "timeline": "Based on project scope",
    "dedicatedLanding": true
  },
  {
    "slug": "whatsapp-automation",
    "title": "WhatsApp Business Automation",
    "shortTitle": "WhatsApp Automations",
    "metaTitle": "WhatsApp Automation & Business API Integration",
    "metaDesc": "WhatsApp Business automation for enquiries, reminders and CRM handoffs. Custom chatbot flows using the official API. Book a free consultation.",
    "h1": "WhatsApp Business Automation Services",
    "intro": "Turn WhatsApp enquiries into structured business workflows. FLOLOGIXAUTOMATIONS builds WhatsApp Business API integrations for customer questions, lead capture, reminders and operational updates. Conversations can feed your CRM and route to a person when a customer needs more than an automated response. Messaging design follows applicable consent, template and provider requirements.",
    "benefits": [
      {
        "title": "Structured enquiry capture",
        "desc": "Collect the details your team needs and route qualified enquiries to the correct owner."
      },
      {
        "title": "Connected conversation records",
        "desc": "Pass agreed contact and conversation fields to your CRM instead of relying on manual notes."
      },
      {
        "title": "Support handoff",
        "desc": "Provide an escalation path for exceptions, sensitive questions and requests for a human."
      }
    ],
    "problems": [
      "Customer enquiries remain in individual inboxes without a clear owner.",
      "Appointment reminders and order updates are sent manually.",
      "Sales staff re-enter WhatsApp enquiry details in the CRM."
    ],
    "solutions": [
      "Enquiry bot: ask qualification questions, record answers and alert the sales team.",
      "Appointment workflow: send eligible reminders and route rescheduling requests to your booking process.",
      "Order notifications: trigger approved status updates from your commerce or operational system."
    ],
    "steps": [
      {
        "title": "Check account readiness",
        "desc": "Review your WhatsApp Business setup, integration provider and required access."
      },
      {
        "title": "Design the conversation",
        "desc": "Define customer entry points, consent handling, templates and human handoff."
      },
      {
        "title": "Connect business systems",
        "desc": "Map CRM, booking or order fields and test inbound and outbound events."
      },
      {
        "title": "Validate before launch",
        "desc": "Test conversation paths and provider requirements before enabling the agreed workflows."
      }
    ],
    "faqs": [
      {
        "q": "Do you use the official WhatsApp Business API?",
        "a": "Our WhatsApp automation work uses the official business API or an appropriate provider integration, subject to account eligibility."
      },
      {
        "q": "Can WhatsApp automate promotional messages?",
        "a": "Eligible messaging requires appropriate consent and must follow current Meta policies, template rules and applicable law."
      },
      {
        "q": "Are WhatsApp messaging fees included?",
        "a": "Platform and provider fees depend on your account and usage. We clarify these separately when scoping the work."
      }
    ],
    "imageAlt": "",
    "price": "Scoped after consultation",
    "timeline": "Based on project scope",
    "dedicatedLanding": true
  },
  {
    "slug": "telegram-bot-development",
    "title": "Telegram Bot Development",
    "shortTitle": "Telegram Bots",
    "metaTitle": "Telegram Bot Development & Integrations",
    "metaDesc": "Custom Telegram bot development for commands, notifications, community workflows and CRM integrations. Plan your business bot with Flologix.",
    "h1": "Telegram Bot Development Services",
    "intro": "Give your customers or team a clear way to interact with business processes inside Telegram. FLOLOGIXAUTOMATIONS develops Telegram bots with commands, interactive buttons and webhook integrations for enquiries, notifications and community workflows. The bot is designed around who can use each command, which information it can access and how exceptions reach your team.",
    "benefits": [
      {
        "title": "Task-focused commands",
        "desc": "Create predictable command and button flows for common requests rather than long manual exchanges."
      },
      {
        "title": "Business event notifications",
        "desc": "Deliver relevant alerts from connected systems to authorised users or groups."
      },
      {
        "title": "Permission-aware workflows",
        "desc": "Restrict administrative actions and review what information is shared in group conversations."
      }
    ],
    "problems": [
      "Team alerts are posted manually and missed across separate tools.",
      "Repeated community questions take time away from moderators.",
      "Telegram requests do not reach the system where work is tracked."
    ],
    "solutions": [
      "Team notification bot: receive operational events and send actionable updates to an authorised chat.",
      "Enquiry bot: capture a request and create a CRM record or support ticket.",
      "Community assistant: provide approved answers and flag moderation events for human review."
    ],
    "steps": [
      {
        "title": "Define users and commands",
        "desc": "Identify the audience, permitted actions and notification destinations."
      },
      {
        "title": "Build bot interactions",
        "desc": "Implement commands, buttons, input validation and webhook event handling."
      },
      {
        "title": "Test permissions and limits",
        "desc": "Check chat access, duplicate updates, provider limits and error responses."
      },
      {
        "title": "Document operations",
        "desc": "Hand over command details, configuration guidance and a maintenance plan."
      }
    ],
    "faqs": [
      {
        "q": "Can a Telegram bot connect to our CRM?",
        "a": "Yes, when the CRM offers suitable integration access. We map bot input to the required records and fields."
      },
      {
        "q": "Can bots message anyone on Telegram?",
        "a": "No. Bots need an allowed interaction or chat relationship and remain subject to Telegram permissions and platform limits."
      },
      {
        "q": "Can a bot manage a Telegram group?",
        "a": "A bot can perform permitted moderation actions when it has the required group rights. We define the actions and human review path before implementation."
      }
    ],
    "imageAlt": "",
    "price": "Scoped after consultation",
    "timeline": "Based on project scope",
    "dedicatedLanding": true
  },
  {
    "slug": "crm-integrations",
    "title": "CRM Integration & Automation Services",
    "shortTitle": "CRM Integrations",
    "metaTitle": "CRM Integration & Sales Workflow Automation",
    "metaDesc": "CRM integration services for lead capture, contact sync and sales handoffs. Connect forms, messaging and business tools. Book a free consultation.",
    "h1": "CRM Integration Services",
    "intro": "Keep customer information moving between the tools your team already uses. FLOLOGIXAUTOMATIONS builds CRM integrations that connect website forms, messaging channels and operational applications to your sales process. We focus on field mapping, record ownership and duplicate handling so an integration does more than copy data: it supports the next step your team needs to take.",
    "benefits": [
      {
        "title": "Consistent lead capture",
        "desc": "Map incoming enquiries to the required contact, company and deal fields."
      },
      {
        "title": "Clear record ownership",
        "desc": "Agree which system owns each field and what happens when records conflict."
      },
      {
        "title": "Connected sales handoffs",
        "desc": "Trigger tasks and notifications when a lead reaches an agreed stage."
      }
    ],
    "problems": [
      "Leads from forms and messaging channels are entered into the CRM manually.",
      "Contact records are duplicated or contain conflicting information.",
      "Sales and operations use separate systems without a reliable handoff."
    ],
    "solutions": [
      "Form-to-CRM workflow: validate an enquiry, check for a matching contact and assign a follow-up task.",
      "Contact synchronisation: exchange agreed fields between supported systems with explicit conflict rules.",
      "Sales-to-operations handoff: pass approved deal details to onboarding, invoicing or project tools."
    ],
    "steps": [
      {
        "title": "Review the CRM setup",
        "desc": "Check available API access, custom fields, permissions and existing workflows."
      },
      {
        "title": "Map records and ownership",
        "desc": "Define matching rules, required fields, direction of sync and conflict handling."
      },
      {
        "title": "Build and test",
        "desc": "Validate representative records, duplicates, failed requests and retries."
      },
      {
        "title": "Roll out carefully",
        "desc": "Agree the initial rollout, monitoring responsibilities and documentation."
      }
    ],
    "faqs": [
      {
        "q": "Which CRM platforms can you integrate?",
        "a": "We assess platforms such as HubSpot, Salesforce, Zoho and Pipedrive, along with custom systems. Feasibility depends on the available API, account permissions and subscription features."
      },
      {
        "q": "Can you build a two-way CRM integration?",
        "a": "Yes, where both systems support it. Two-way sync needs explicit ownership and conflict rules to avoid update loops."
      },
      {
        "q": "Will an integration remove existing duplicates?",
        "a": "Not automatically. Existing record cleanup is a separate scope; we can assess it alongside duplicate prevention for new events."
      }
    ],
    "imageAlt": "",
    "price": "Scoped after consultation",
    "timeline": "Based on project scope",
    "dedicatedLanding": true
  },
  {
    slug: "rag-systems",
    title: "RAG System Development | AI Knowledge Bases",
    shortTitle: "RAG Systems",
    metaTitle: "RAG System Development | AI Knowledge Bases",
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
      { q: "What's the difference between RAG and fine-tuning?", a: "RAG retrieves relevant documents at query time and feeds them to the LLM. Fine-tuning trains the model on your data. RAG is cheaper, faster to update, and more transparent." },
      { q: "Which vector database do you use?", a: "We use Pinecone, Weaviate, Qdrant, or pgvector depending on your scale, budget, and hosting preferences." },
      { q: "Can RAG handle images and scanned PDFs?", a: "Yes. We use OCR for scanned documents, and multimodal models can process images, diagrams, and charts." },
      { q: "How accurate are RAG answers?", a: "With proper chunking, embedding, and re-ranking, RAG systems achieve 90-95% answer accuracy on well-defined domains." },
    ],
    imageAlt: "RAG system architecture showing document ingestion and AI query flow",
    price: "$8,000 - $30,000 per system",
    timeline: "4-8 weeks",
  },
  {
    slug: "business-process-automation",
    title: "Business Process Automation Services",
    shortTitle: "Process Automation",
    metaTitle: "Business Process Automation Company | End-to-End",
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
      { q: "What processes can be automated?", a: "Almost any repetitive, rule-based process can be automated — data entry, approvals, notifications, report generation, invoice processing, customer onboarding, and more." },
      { q: "How long does a typical automation project take?", a: "Simple automations take 1-2 weeks. Complex enterprise-wide processes take 4-8 weeks depending on system integrations." },
      { q: "Do you integrate with legacy systems?", a: "Yes. We connect to legacy systems via APIs, database connectors, file imports, or custom middleware when APIs aren't available." },
      { q: "What's your approach to change management?", a: "We involve stakeholders from day one, provide comprehensive training, and run parallel operations during cutover to ensure zero disruption." },
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
