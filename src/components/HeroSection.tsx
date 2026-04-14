import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const stats = [
  { value: 40, suffix: "+", label: "Workflows Automated" },
  { value: 10, suffix: "+", label: "Customers Served" },
  { value: 500, suffix: "+", label: "Hours Saved" },
];

export function HeroSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-20">
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute top-20 -left-40 h-[500px] w-[500px] rounded-full bg-neon-blue/10 blur-[120px] animate-float" />
      <div className="pointer-events-none absolute top-40 -right-40 h-[400px] w-[400px] rounded-full bg-neon-purple/10 blur-[120px] animate-float" style={{ animationDelay: "2s" }} />
      <div className="pointer-events-none absolute bottom-20 left-1/3 h-[300px] w-[300px] rounded-full bg-neon-cyan/8 blur-[100px] animate-float" style={{ animationDelay: "4s" }} />

      <div ref={ref} className="relative mx-auto max-w-7xl px-4 sm:px-6 text-center">
        {/* Trust badge */}
        <div
          className={`mb-8 inline-flex items-center gap-2 rounded-full border border-neon-blue/30 bg-neon-blue/5 px-4 py-2 text-sm text-neon-cyan transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-block h-2 w-2 rounded-full bg-neon-cyan animate-glow-pulse" />
          Trusted by 10+ businesses around India
        </div>

        {/* Headline */}
        <h1
          className={`mx-auto max-w-5xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Transform Your Business with{" "}
          <span className="bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple bg-clip-text text-transparent">
            Intelligent AI Automations
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`mx-auto mt-6 max-w-3xl text-lg text-muted-foreground sm:text-xl transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          We build custom n8n workflows, AI agents, WhatsApp & Telegram bots, RAG systems, and automation solutions that eliminate repetitive tasks, reduce costs, and help you scale faster.
        </p>

        {/* CTAs */}
        <div
          className={`mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <a href="#contact">
            <Button size="lg" className="glow-blue rounded-full bg-neon-blue px-8 text-lg text-primary-foreground hover:bg-neon-blue/80">
              Get Free Consultation <ArrowRight className="ml-2" size={18} />
            </Button>
          </a>
          <a href="#case-studies">
            <Button size="lg" variant="outline" className="rounded-full border-neon-blue/30 px-8 text-lg hover:bg-neon-blue/10">
              <Play className="mr-2" size={18} /> View Our Work
            </Button>
          </a>
        </div>

        {/* Stats */}
        <div
          className={`mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3 transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {stats.map((s) => (
            <div key={s.label} className="glass-card rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-neon-blue sm:text-4xl">
                <AnimatedCounter target={s.value} />{s.suffix}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
