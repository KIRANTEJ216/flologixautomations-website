export interface Industry {
  slug: string;
  name: string;
  metaTitle: string;
  metaDesc: string;
  h1: string;
  intro: string;
  challenges: string[];
  automationOpportunities: { title: string; desc: string }[];
  stats: string[];
  solutions: string[];
  imageAlt: string;
}

export const industries: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    metaTitle: "AI Automation for Healthcare | Medical Workflow Automation",
    metaDesc: "Healthcare automation solutions for patient scheduling, medical records, billing, and compliance reporting. HIPAA-compliant AI agents.",
    h1: "AI Automation for Healthcare: Streamline Medical Operations",
    intro: "Healthcare providers spend 30% of their revenue on administrative tasks. From patient scheduling to insurance billing, medical records management to compliance reporting — these manual processes consume resources that could be spent on patient care. Our healthcare automation solutions handle administrative workflows so your medical staff can focus on what matters most.",
    challenges: ["Excessive paperwork consuming clinical staff time", "Manual patient scheduling causing no-shows and gaps", "Insurance claim processing taking 30+ days on average", "Compliance documentation requiring hundreds of hours monthly", "Scattered patient data across multiple systems"],
    automationOpportunities: [
      { title: "Patient Scheduling Automation", desc: "AI-powered scheduling that reduces no-shows by 40% with automated reminders, waitlist management, and intelligent slot optimization." },
      { title: "Medical Billing Automation", desc: "Automated claim submission, denial management, and payment posting that reduces days in A/R by 50%." },
      { title: "HIPAA-Compliant AI Agent", desc: "Patient inquiry handling for FAQs, appointment booking, prescription refills, and insurance verification — all HIPAA compliant." },
      { title: "Clinical Documentation", desc: "AI-assisted documentation from voice notes, automated coding suggestions, and intelligent health record organization." },
    ],
    stats: ["30% of healthcare revenue spent on administration", "40% reduction in no-shows with automated scheduling", "50% faster insurance claim processing", "$150K average annual savings per clinic"],
    solutions: ["Patient intake and scheduling automation", "Medical billing and insurance claim processing", "HIPAA-compliant AI chatbot for patient inquiries", "Electronic health record (EHR) integration and data sync", "Compliance reporting and audit documentation automation"],
    imageAlt: "Healthcare professional using tablet with AI automation dashboard showing patient data",
  },
  {
    slug: "e-commerce",
    name: "E-commerce",
    metaTitle: "AI Automation for E-commerce | Online Store Automation",
    metaDesc: "E-commerce automation solutions for order processing, inventory management, customer support, and marketing. Scale your online store without hiring.",
    h1: "AI Automation for E-commerce: Scale Your Online Store",
    intro: "E-commerce businesses face intense competition and razor-thin margins. Every manual process — from order fulfillment to customer support — eats into profitability. Our e-commerce automation solutions handle the repetitive tasks so you can focus on growth, product, and customer experience.",
    challenges: ["Manual order processing taking hours daily", "Inventory management across multiple channels causing stockouts", "Customer support volume overwhelming small teams", "Abandoned cart recovery left to manual email follow-ups", "Supplier communication and purchase order management"],
    automationOpportunities: [
      { title: "Order-to-Cash Automation", desc: "End-to-end order processing from Shopify/WooCommerce to warehouse management, payment reconciliation, and customer notifications." },
      { title: "Multi-Channel Inventory Sync", desc: "Real-time inventory sync across Amazon, Shopify, Etsy, and physical stores — preventing overselling and stockouts." },
      { title: "AI Customer Support Agent", desc: "Handles 80% of customer inquiries about orders, returns, shipping, and product questions instantly." },
      { title: "Marketing Automation", desc: "Abandoned cart recovery, post-purchase follow-ups, review requests, and personalized product recommendations." },
    ],
    stats: ["€4.4 trillion global e-commerce sales in 2025", "70% of carts are abandoned — automation recovers 15%", "AI support agents handle 80% of inquiries", "Automated inventory sync reduces stockouts by 60%"],
    solutions: ["Order processing and fulfillment automation", "Multi-channel inventory management and sync", "AI chatbot for customer support and order inquiries", "Marketing automation for abandoned cart recovery", "Supplier and purchase order management workflows"],
    imageAlt: "E-commerce dashboard showing automated order processing and inventory management",
  },
  {
    slug: "financial-services",
    name: "Financial Services",
    metaTitle: "AI Automation for Financial Services | Fintech Automation",
    metaDesc: "Financial services automation for compliance reporting, invoice processing, reconciliation, and customer onboarding. Secure, auditable, AI-powered.",
    h1: "AI Automation for Financial Services: Transform Fintech Operations",
    intro: "Financial institutions operate under strict regulatory requirements while managing millions of transactions. The cost of manual processing, compliance errors, and delayed reporting is immense. Our financial services automation solutions help banks, fintechs, and accounting firms automate critical processes while maintaining full audit trails and regulatory compliance.",
    challenges: ["Manual reconciliation taking days to complete", "Compliance reporting requiring hundreds of hours monthly", "Invoice processing with human data entry errors", "Customer onboarding requiring 15+ manual verification steps", "Fraud detection relying on manual review"],
    automationOpportunities: [
      { title: "Invoice Processing & OCR", desc: "AI-powered invoice OCR that reads invoices, extracts line items, validates tax numbers, and posts to ERP automatically." },
      { title: "Automated Reconciliation", desc: "Bank statement matching against ledger entries with AI fuzzy matching for partial or complex reconciliations." },
      { title: "Compliance Reporting", desc: "Automated regulatory report generation for RBI, SEC, FCA, and other regulators with audit-proof documentation." },
      { title: "Customer Onboarding Automation", desc: "Automated KYC/AML checks, document verification, and account setup across banking systems." },
    ],
    stats: ["85% of finance teams still use manual data entry", "AI OCR achieves 99% invoice accuracy", "70% faster reconciliations with automation", "$2M+ annual savings for mid-size financial firms"],
    solutions: ["AI-powered invoice OCR and accounts payable automation", "Bank reconciliation and financial close automation", "Regulatory compliance reporting and audit trails", "Customer onboarding and KYC/AML verification workflows", "Fraud detection alerts and automated investigation triggers"],
    imageAlt: "Financial dashboard showing automated invoice processing and reconciliation metrics",
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    metaTitle: "AI Automation for Manufacturing | Industry 4.0 Solutions",
    metaDesc: "Manufacturing automation solutions for supply chain management, quality control, inventory tracking, and production reporting. Industry 4.0 ready.",
    h1: "AI Automation for Manufacturing: Industry 4.0 in Action",
    intro: "Manufacturers face pressure to reduce costs, improve quality, and accelerate delivery — all while managing complex supply chains and production lines. Our manufacturing automation solutions connect your ERP, MES, and supply chain systems into unified workflows that eliminate manual data entry, reduce production delays, and improve quality tracking.",
    challenges: ["Manual data entry between ERP and production systems", "Supply chain disruptions requiring rapid replanning", "Quality control data scattered across paper forms and spreadsheets", "Inventory tracking not synced with production schedule", "Maintenance scheduling still done on whiteboards"],
    automationOpportunities: [
      { title: "Production Workflow Automation", desc: "Automated work order creation, material requisition, and production tracking across ERP and MES systems." },
      { title: "Supply Chain Integration", desc: "Real-time supplier communication, PO automation, shipping tracking, and inventory level monitoring." },
      { title: "Quality Control Automation", desc: "Digital quality checks with automated data collection, deviation alerts, and corrective action workflows." },
      { title: "Maintenance Management", desc: "Automated preventive maintenance scheduling, work order generation, and spare parts inventory management." },
    ],
    stats: ["Manufacturing leads AI adoption at 93% implementation rate", "30% reduction in production delays with automation", "50% faster quality issue resolution", "40% lower inventory carrying costs"],
    solutions: ["Production order and work instruction automation", "Supply chain visibility and supplier communication workflows", "Quality control digitalization with automated data collection", "Preventive maintenance scheduling and work order management", "Inventory tracking and material requirement planning (MRP)"],
    imageAlt: "Manufacturing plant floor with digital automation dashboard showing production metrics",
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    metaTitle: "AI Automation for Real Estate | Property Management Automation",
    metaDesc: "Real estate automation for lead management, property inquiries, document processing, and transaction management. Automate your property business.",
    h1: "AI Automation for Real Estate: Automate Property Operations",
    intro: "Real estate professionals juggle lead follow-ups, property inquiries, document management, and transaction coordination — often using a patchwork of tools and manual processes. Our real estate automation solutions help agents, brokers, and property managers automate repetitive tasks, respond to leads instantly, and close deals faster.",
    challenges: ["Lead response time averaging 24+ hours", "Property inquiry management scattered across phone, email, and WhatsApp", "Document collection and verification requiring manual follow-ups", "Transaction coordination with 10+ stakeholders per deal", "Property listing updates across 5+ portals manually"],
    automationOpportunities: [
      { title: "Lead Response Automation", desc: "Instant AI response to property inquiries from website, WhatsApp, and portals — qualifying leads before human contact." },
      { title: "Document Management", desc: "Automated document collection, verification checklists, and e-signature workflows for transactions." },
      { title: "Multi-Portal Listing Sync", desc: "Automated property listing updates across Magicbricks, 99acres, Housing.com, and your website." },
      { title: "Transaction Coordination", desc: "End-to-end deal tracking with automated reminders, milestone updates, and stakeholder notifications." },
    ],
    stats: ["48% of real estate agents miss leads due to slow response", "AI response within 30 seconds increases conversion 5x", "70% of property inquiries happen outside business hours", "Automated document workflows reduce closing time by 40%"],
    solutions: ["AI lead qualification and instant response system", "WhatsApp integration for property inquiry handling", "Document collection and e-signature automation", "Multi-portal listing synchronization", "Transaction management and stakeholder coordination"],
    imageAlt: "Real estate agent using tablet with AI property management automation dashboard",
  },
  {
    slug: "education",
    name: "Education",
    metaTitle: "AI Automation for Education | EdTech Process Automation",
    metaDesc: "Education automation solutions for student enrollment, fee collection, communication, and reporting. Automate administrative tasks in educational institutions.",
    h1: "AI Automation for Education: Streamline Institution Management",
    intro: "Educational institutions — from schools to universities — are burdened by administrative tasks that divert resources from education. Admissions, fee collection, timetabling, parent communication, and compliance reporting consume hundreds of staff hours. Our education automation solutions digitize and automate these processes, letting educators focus on teaching.",
    challenges: ["Admission applications processed manually with error-prone data entry", "Fee collection and reconciliation consuming finance team hours", "Parent-teacher communication scattered across WhatsApp, email, and notes", "Timetable generation requiring days of manual scheduling", "Compliance reporting for accreditation taking weeks to compile"],
    automationOpportunities: [
      { title: "Admission Process Automation", desc: "Automated application intake, document verification, entrance test scheduling, and offer letter generation." },
      { title: "Fee Management Automation", desc: "Automated fee reminders, payment reconciliation, receipt generation, and defaulter tracking." },
      { title: "Parent Communication", desc: "Multi-channel communication automation for fee dues, events, exam schedules, and student progress via WhatsApp and email." },
      { title: "Accreditation Reporting", desc: "Automated data collection from across departments for NAAC, NBA, and other accreditation reports." },
    ],
    stats: ["40+ hours per week saved on administrative tasks", "90% faster admission processing with automation", "60% reduction in fee collection follow-ups", "70% improvement in parent satisfaction scores"],
    solutions: ["Student admission and enrollment workflow automation", "Fee collection, reconciliation, and defaulter management", "Parent communication automation via WhatsApp and email", "Timetable and resource scheduling automation", "Accreditation and compliance report generation"],
    imageAlt: "Modern educational institution with digital automation systems for administration",
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
