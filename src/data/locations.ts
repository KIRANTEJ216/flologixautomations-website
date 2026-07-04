export interface Location {
  slug: string;
  city: string;
  state: string;
  country: string;
  metaTitle: string;
  metaDesc: string;
  h1: string;
  intro: string;
  population: string;
  businesses: string;
  nearbyLandmarks: string[];
  localTestimonial: { name: string; role: string; text: string };
  industries: string[];
  serviceArea: string[];
  imageAlt: string;
  lat: string;
  lng: string;
}

export const locations: Location[] = [
  {
    slug: "hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    metaTitle: "AI Automation Agency in Hyderabad | n8n Workflow Experts",
    metaDesc: "Top AI automation agency in Hyderabad. Custom n8n workflows, AI agents, WhatsApp bots for businesses in Hitech City, Gachibowli & Madhapur.",
    h1: "AI Automation Agency in Hyderabad — N8n Workflows & AI Agents",
    intro: "Hyderabad is India's fastest-growing tech hub, home to thousands of startups, SaaS companies, and global enterprises. Yet most businesses still rely on manual processes for data entry, customer support, lead management, and reporting. We help Hyderabad businesses automate their operations using n8n workflows, AI agents, and custom automation solutions — cutting costs by up to 70% and freeing teams to focus on growth.",
    population: "10.5 million",
    businesses: "15,000+ startups and enterprises",
    nearbyLandmarks: ["Hitech City", "Gachibowli", "Madhapur", "Jubilee Hills", "Banjara Hills", "Kondapur", "Secunderabad", "Shamshabad"],
    localTestimonial: { name: "Rajesh K.", role: "CTO, Hyderabad SaaS Firm", text: "FlologixAutomations built our customer onboarding automation in 3 weeks. What used to take 2 days now happens in 2 hours. The ROI was immediate." },
    industries: ["IT & SaaS", "Pharmaceuticals", "Fintech", "E-commerce", "Education Technology"],
    serviceArea: ["Cyberabad", "Hitech City", "Gachibowli", "Madhapur", "Kondapur", "Jubilee Hills", "Banjara Hills", "Secunderabad"],
    imageAlt: "Hyderabad skyline with Hitech City buildings representing business automation hub",
    lat: "17.3850",
    lng: "78.4867",
  },
  {
    slug: "dallas",
    city: "Dallas",
    state: "Texas",
    country: "United States",
    metaTitle: "AI Automation Agency in Dallas | Workflow Automation Texas",
    metaDesc: "Expert AI automation agency serving Dallas-Fort Worth. Custom n8n workflows, AI agents, WhatsApp bots for Texas businesses.",
    h1: "AI Automation Agency in Dallas — Workflow Automation for Texas Businesses",
    intro: "Dallas-Fort Worth is home to 23 Fortune 500 companies and a thriving ecosystem of startups and mid-market businesses. From Plano to Irving, companies are looking to automate operations, reduce manual work, and leverage AI. We help Dallas businesses implement custom n8n workflows, deploy AI agents, and build automation systems that integrate with their existing tech stack.",
    population: "7.5 million (DFW metro)",
    businesses: "23 Fortune 500 headquarters, 100,000+ businesses",
    nearbyLandmarks: ["Downtown Dallas", "Plano", "Irving", "Frisco", "Richardson Telecom Corridor", "Addison", "Las Colinas", "Fort Worth"],
    localTestimonial: { name: "Sarah M.", role: "Operations Director, Dallas Logistics Firm", text: "Our invoice processing went from 3 days to 3 hours after FlologixAutomations deployed their AI OCR solution. Best investment we made this year." },
    industries: ["Logistics & Supply Chain", "Financial Services", "Healthcare", "Real Estate", "Oil & Gas"],
    serviceArea: ["Dallas", "Fort Worth", "Plano", "Irving", "Frisco", "Richardson", "Addison", "Carrollton"],
    imageAlt: "Dallas downtown skyline representing business automation services in Texas",
    lat: "32.7767",
    lng: "-96.7970",
  },
  {
    slug: "mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    metaTitle: "AI Automation Agency in Mumbai | n8n & AI Agents",
    metaDesc: "Leading AI automation agency in Mumbai. Automate workflows, build AI agents, and integrate WhatsApp bots for businesses in BKC, Andheri & Lower Parel.",
    h1: "AI Automation Agency in Mumbai — Automate Your Business Operations",
    intro: "Mumbai is India's financial and commercial capital, housing the headquarters of India's largest banks, insurance companies, and media houses. Despite being at the forefront of technology adoption, many Mumbai businesses still struggle with manual processes, legacy system integration, and operational inefficiency. We help Mumbai businesses transform their operations with cutting-edge AI automation.",
    population: "21 million (metro)",
    businesses: "5,000+ corporate headquarters, 50,000+ SMEs",
    nearbyLandmarks: ["BKC (Bandra Kurla Complex)", "Andheri", "Lower Parel", "Nariman Point", "Powai", "Worli", "Colaba", "Thane"],
    localTestimonial: { name: "Priya S.", role: "VP Operations, Mumbai Fintech", text: "FlologixAutomations deployed our AI agent for customer support in just 4 weeks. It handles 75% of inquiries autonomously. Game changer." },
    industries: ["Banking & Finance", "Insurance", "Media & Entertainment", "Logistics", "Healthcare"],
    serviceArea: ["South Mumbai", "BKC", "Andheri", "Powai", "Lower Parel", "Worli", "Thane", "Navi Mumbai"],
    imageAlt: "Mumbai skyline showing Bandra-Worli Sea Link representing business district",
    lat: "19.0760",
    lng: "72.8777",
  },
  {
    slug: "bangalore",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    metaTitle: "AI Automation Agency in Bangalore | n8n & AI Development",
    metaDesc: "Bangalore's AI automation experts. Custom n8n workflows, AI agents, and RAG systems for startups and enterprises in Electronic City, Whitefield & MG Road.",
    h1: "AI Automation Agency in Bangalore — Automation for India's Silicon Valley",
    intro: "Bangalore is India's Silicon Valley, home to the world's largest tech campuses and thousands of innovative startups. Yet even the most tech-savvy companies have manual processes that slow them down. From Electronic City to Whitefield, we help Bangalore businesses automate their workflows, deploy AI agents, and build RAG systems that transform how they operate.",
    population: "13 million (metro)",
    businesses: "10,000+ startups, 500+ global R&D centers",
    nearbyLandmarks: ["Electronic City", "Whitefield", "MG Road", "Koramangala", "Indiranagar", "JP Nagar", "Hebbal", "Yeshwanthpur"],
    localTestimonial: { name: "Arun P.", role: "Founder, Bangalore SaaS Startup", text: "We were spending 40 hours/week on manual reporting. FlologixAutomations automated it in 2 weeks. We've scaled to 3x revenue without adding headcount." },
    industries: ["IT & Software", "E-commerce", "EdTech", "HealthTech", "Deep Tech"],
    serviceArea: ["Electronic City", "Whitefield", "Koramangala", "Indiranagar", "MG Road", "JP Nagar", "Marathahalli", "Hebbal"],
    imageAlt: "Bangalore skyline with tech parks representing India's startup hub",
    lat: "12.9716",
    lng: "77.5946",
  },
  {
    slug: "new-york",
    city: "New York",
    state: "New York",
    country: "United States",
    metaTitle: "AI Automation Agency in New York | Business Automation NYC",
    metaDesc: "Expert AI automation services in New York City. n8n workflow automation, AI agents, and process automation for NYC businesses.",
    h1: "AI Automation Agency in New York City — Automate to Scale",
    intro: "New York City is the world's business capital, home to more Fortune 500 headquarters than any other city. From Wall Street to Silicon Alley, NYC businesses operate at a pace where every minute counts. We help New York companies automate their critical business processes — from financial reporting to customer onboarding — enabling them to operate faster, with fewer errors, and at lower cost.",
    population: "8.5 million (city), 19 million (metro)",
    businesses: "45+ Fortune 500 headquarters, 200,000+ businesses",
    nearbyLandmarks: ["Manhattan", "Brooklyn", "Wall Street", "Silicon Alley", "Midtown", "Long Island City", "Staten Island", "Jersey City"],
    localTestimonial: { name: "Michael L.", role: "COO, NYC Financial Services", text: "FlologixAutomations built a compliance reporting automation that saves us $200K/year in manual audit preparation." },
    industries: ["Financial Services", "Media & Advertising", "Technology", "Healthcare", "Real Estate"],
    serviceArea: ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island", "Long Island City", "Jersey City", "Hoboken"],
    imageAlt: "New York City skyline with Manhattan skyscrapers representing business automation",
    lat: "40.7128",
    lng: "-74.0060",
  },
  {
    slug: "london",
    city: "London",
    state: "Greater London",
    country: "United Kingdom",
    metaTitle: "AI Automation Agency in London | n8n Workflow Experts UK",
    metaDesc: "London's AI automation agency. Custom n8n workflows, AI agents, and RAG systems for UK businesses in The City, Canary Wharf & Shoreditch.",
    h1: "AI Automation Agency in London — UK Business Automation Experts",
    intro: "London is Europe's largest economy and a global hub for finance, technology, and professional services. From the Square Mile to Canary Wharf, from Shoreditch startups to Mayfair enterprises, London businesses are increasingly turning to automation to maintain their competitive edge. We help London companies implement sophisticated n8n workflows, AI agents, and business process automation that deliver measurable ROI.",
    population: "9 million (city), 14 million (metro)",
    businesses: "18 Fortune 500 HQs, 500,000+ registered businesses",
    nearbyLandmarks: ["The City (Square Mile)", "Canary Wharf", "Shoreditch", "Mayfair", "Camden", "Kensington", "Westminster", "Camden"],
    localTestimonial: { name: "James W.", role: "Head of Operations, London Fintech", text: "The AI agent FlologixAutomations built for our compliance team handles 200+ daily queries. It's like having 5 extra team members." },
    industries: ["Financial Services", "Technology", "Professional Services", "Creative Industries", "Healthcare"],
    serviceArea: ["City of London", "Canary Wharf", "Shoreditch", "Mayfair", "Soho", "Camden", "Kensington", "Westminster"],
    imageAlt: "London skyline with Tower Bridge and Canary Wharf financial district",
    lat: "51.5074",
    lng: "-0.1278",
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
