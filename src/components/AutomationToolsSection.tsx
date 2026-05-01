import { useScrollAnimation } from "@/hooks/use-scroll-animation";

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
            We build on best-in-class open-source and no-code automations platforms — giving you flexibility, ownership, and zero vendor lock-in.
          </p>
        </div>
      </div>
    </section>
  );
}
