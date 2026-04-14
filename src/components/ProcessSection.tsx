import { Search, Code, Rocket, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const steps = [
  { num: "01", icon: Search, title: "Process Discovery", desc: "We analyze your workflows, identify bottlenecks, and document automation opportunities." },
  { num: "02", icon: Code, title: "Build & Develop", desc: "Our experts build custom n8n workflows and AI solutions tailored to your needs." },
  { num: "03", icon: Rocket, title: "Launch & Test", desc: "Thorough testing in staging before going live. Comprehensive training for your team." },
  { num: "04", icon: TrendingUp, title: "Optimize & Scale", desc: "Post-launch monitoring, feedback, and continuous optimization as you grow." },
];

export function ProcessSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="process" className="relative py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-sm font-semibold uppercase tracking-widest text-neon-cyan">Our Process</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
            A Proven Approach to{" "}
            <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
              Automation Success
            </span>
          </h2>
        </div>

        <div className="relative mt-16 grid gap-8 md:grid-cols-4">
          {/* Connecting line */}
          <div className="absolute top-16 left-0 right-0 hidden h-px bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple md:block" />

          {steps.map((s, i) => (
            <div
              key={s.num}
              className={`relative text-center transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150 + 200}ms` }}
            >
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-neon-blue/30 bg-background">
                <span className="text-lg font-bold text-neon-blue">{s.num}</span>
                <div className="absolute inset-0 rounded-full bg-neon-blue/10 animate-glow-pulse" />
              </div>
              <div className="mt-6 glass-card rounded-2xl p-6">
                <s.icon className="mx-auto text-neon-cyan" size={28} />
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-12 text-center transition-all duration-700 delay-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <a href="#contact">
            <Button size="lg" className="glow-blue rounded-full bg-neon-blue px-8 text-primary-foreground hover:bg-neon-blue/80">
              Start Your Automation Journey
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
