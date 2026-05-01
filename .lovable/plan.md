
# FlologixAutomations — Dark Futuristic AI Agency Website

## Design Theme
- **Dark background** (#0a0a0f / deep navy-black) with glowing neon accent colors (electric blue #3B82F6, cyan #06B6D4, purple #8B5CF6)
- Glowing card borders, subtle gradient mesh backgrounds, floating particle-like decorative elements
- Smooth scroll navigation, fade-in animations on scroll using Intersection Observer
- Modern sans-serif typography (Inter/system fonts)

## Single Scrolling Page Structure (index.tsx)

### 1. **Sticky Navigation Bar**
- Logo "FlologixAutomations" with glow effect
- Nav links: Services, Process, Why Us, Case Studies, Contact
- "Get Free Consultation" CTA button with glow border
- Mobile hamburger menu

### 2. **Hero Section**
- Large headline: "Transform Your Business with Intelligent AI Automations"
- Subtitle about AI Automations, AI agents, WhatsApp Automation/Telegram bots
- Two CTA buttons: "Get Free Consultation" + "View Our Work"
- Animated stats bar: 40+ Workflows | 10+ Customers | 500+ Hours Saved
- Decorative glowing gradient orbs in background
- "Trusted by 10+ businesses around India" badge

### 3. **Services Section** (6 cards in grid)
- **Workflow Development** — workflow automation, API integrations
- **AI Agent Development** — GPT-4, Claude-powered agents
- **WhatsApp Automation** — Business API, chatbots, automated messaging
- **Telegram Bot Development** — custom bots and automation
- **RAG Systems** — intelligent document Q&A, knowledge bases
- **Process Digitization** — manual-to-digital workflow conversion
- Each card: icon, title, bullet points, glowing border on hover

### 4. **Process Section** (4-step timeline)
- Vertical/horizontal timeline with glowing step numbers (01-04)
- Process Discovery → Build & Develop → Launch & Test → Optimize & Scale
- Each step with icon and description
- "Start Your Automation Journey" CTA

### 5. **Why Choose Us Section**
- 4 feature cards: Guaranteed Results, Expert Team, Tech-Agnostic, End-to-End Support
- Stats row: 98% Client Satisfaction | 4 Weeks Avg Implementation | 70% Cost Reduction
- Glowing accent borders

### 6. **Case Studies Section**
- 3 case study cards with dark glass-morphism style
- Marketing Agency (5X capacity), Financial Services (2X capacity), B2B Services (95% on-time)
- Each with metric highlights and "Get Similar Results" button
- "View All Case Studies" link

### 7. **Technologies Section**
- Logo/icon grid of tools: Monday, ChatGPT, Claude, HubSpot, Airtable, Notion, Slack, Google, Zapier, Make, Salesforce, WhatsApp, Telegram, Python, JavaScript
- Subtle floating animation on icons

### 8. **Contact/CTA Section**
- Split layout: left side with benefits list + email, right side with contact form
- Form: Name, Email, Company, Message textarea
- "Request Free Consultation" submit button with glow effect

### 9. **Footer**
- 3-column layout: About, Services links, Company links
- Copyright, Privacy Policy, Terms of Service links

## Technical Approach
- All content in `src/routes/index.tsx` with component sections extracted to `src/components/`
- Shared components: Navbar, Footer, Section wrappers
- Custom CSS animations for glow effects and scroll-triggered fade-ins
- Dark theme colors configured in `src/styles.css`
- Fully responsive (mobile-first)
- Smooth scroll behavior for nav links
