import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const techs = [
  "n8n", "Monday.com", "ChatGPT", "Claude", "HubSpot", "Airtable",
  "Notion", "Slack", "Google", "Zapier", "Make", "Salesforce",
  "WhatsApp", "Telegram", "Python", "JavaScript",
];

export function TechnologiesSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-sm font-semibold uppercase tracking-widest text-neon-cyan">Technologies</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
            Tools We{" "}
            <span className="bg-gradient-to-r from-neon-cyan to-neon-blue bg-clip-text text-transparent">
              Work With
            </span>
          </h2>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
          {techs.map((t, i) => (
            <div
              key={t}
              className={`glass-card rounded-xl border border-border/50 px-5 py-3 text-sm font-medium text-muted-foreground transition-all duration-500 hover:border-neon-blue/50 hover:text-foreground hover:scale-105 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
              style={{ transitionDelay: `${i * 50 + 200}ms` }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
