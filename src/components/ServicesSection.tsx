import { Workflow, Bot, MessageCircle, Send, BookOpen, Cog } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const services = [
  {
    icon: Workflow,
    title: "n8n Development",
    desc: "Custom workflow automation using n8n — the powerful open-source platform.",
    points: ["Self-hosted or cloud solutions", "Complex multi-step workflows", "API integrations & webhooks", "Custom code snippets"],
    color: "neon-blue" as const,
  },
  {
    icon: Bot,
    title: "AI Agent Development",
    desc: "Intelligent AI agents powered by GPT-4, Claude, and other LLMs.",
    points: ["Customer support agents", "Internal knowledge assistants", "Lead qualification bots", "Multi-language support"],
    color: "neon-purple" as const,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Automation",
    desc: "Automate customer engagement via WhatsApp Business API.",
    points: ["Chatbot development", "Bulk messaging & campaigns", "Order notifications", "CRM integration"],
    color: "neon-cyan" as const,
  },
  {
    icon: Send,
    title: "Telegram Bot Development",
    desc: "Custom Telegram bots for business automation and engagement.",
    points: ["Command-based bots", "Inline query bots", "Group management", "Payment integrations"],
    color: "neon-blue" as const,
  },
  {
    icon: BookOpen,
    title: "RAG Systems",
    desc: "Retrieval-Augmented Generation for intelligent document Q&A.",
    points: ["Knowledge base creation", "Document search & retrieval", "Custom AI assistants", "Enterprise data integration"],
    color: "neon-purple" as const,
  },
  {
    icon: Cog,
    title: "Process Digitization",
    desc: "Transform manual workflows into automated digital processes.",
    points: ["Process analysis & mapping", "Digital workflow design", "Legacy system integration", "Training & documentation"],
    color: "neon-cyan" as const,
  },
];

const colorMap = {
  "neon-blue": { text: "text-neon-blue", glow: "glow-blue", bg: "bg-neon-blue/10", border: "border-neon-blue/20 hover:border-neon-blue/50" },
  "neon-cyan": { text: "text-neon-cyan", glow: "glow-cyan", bg: "bg-neon-cyan/10", border: "border-neon-cyan/20 hover:border-neon-cyan/50" },
  "neon-purple": { text: "text-neon-purple", glow: "glow-purple", bg: "bg-neon-purple/10", border: "border-neon-purple/20 hover:border-neon-purple/50" },
};

export function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="services" className="relative py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-sm font-semibold uppercase tracking-widest text-neon-cyan">Our Services</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
            Comprehensive{" "}
            <span className="bg-gradient-to-r from-neon-blue to-neon-cyan bg-clip-text text-transparent">
              Automation Solutions
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            From n8n development to AI agents, WhatsApp bots to RAG systems — we provide end-to-end automation services.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const c = colorMap[s.color];
            return (
              <div
                key={s.title}
                className={`group glass-card rounded-2xl border p-6 transition-all duration-500 hover:scale-[1.02] ${c.border} ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                <div className={`inline-flex rounded-xl p-3 ${c.bg}`}>
                  <s.icon className={c.text} size={28} />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <ul className="mt-4 space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className={`h-1.5 w-1.5 rounded-full ${c.bg} ${c.text}`} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
