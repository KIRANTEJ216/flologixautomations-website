import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function AutomationToolsSection() {
  const { ref, isVisible } = useScrollAnimation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

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
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" className="group">
              <a href="#contact" onClick={handleClick}>
                Get Your Free Consultation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
