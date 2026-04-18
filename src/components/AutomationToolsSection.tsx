import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const tools = [
  { name: "n8n", letter: "n8n" },
  { name: "Make", letter: "Mk" },
  { name: "Zapier", letter: "Zp" },
  { name: "Node-RED", letter: "NR" },
  { name: "Activepieces", letter: "Ap" },
  { name: "Huginn", letter: "Hg" },
  { name: "Apache Airflow", letter: "Af" },
  { name: "Temporal", letter: "Tm" },
  { name: "Windmill", letter: "Wm" },
  { name: "Budibase", letter: "Bd" },
  { name: "Appsmith", letter: "As" },
  { name: "NocoDB", letter: "Nc" },
];

export function AutomationToolsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative py-20">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-neon-cyan">
            Open-Source & No-Code Stack
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
            Tools Powering Our{" "}
            <span className="bg-gradient-to-r from-neon-blue to-neon-cyan bg-clip-text text-transparent">
              Automations
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            We build on best-in-class open-source and no-code platforms — giving you flexibility, ownership, and zero vendor lock-in.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
          {tools.map((t, i) => (
            <div
              key={t.name}
              className={`group glass-card flex flex-col items-center justify-center gap-2 rounded-xl border border-border/40 px-4 py-6 grayscale opacity-60 transition-all duration-500 hover:grayscale-0 hover:opacity-100 hover:border-neon-blue/40 hover:scale-105 ${
                isVisible ? "opacity-60 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 60 + 200}ms` }}
              title={t.name}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-foreground/5 text-xs font-bold text-muted-foreground transition-colors group-hover:text-foreground">
                {t.letter}
              </div>
              <span className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                {t.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
