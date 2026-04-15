import { Shield, Users, Wrench, HeadphonesIcon } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const features = [
  { icon: Shield, title: "Guaranteed Results", desc: "Performance guarantees with defined SLAs and success metrics on every project." },
  { icon: Users, title: "Expert Team", desc: "Certified automation specialists and AI developers with years of experience." },
  { icon: Wrench, title: "Tech-Agnostic Approach", desc: "We recommend the best tools for your needs — Make, Monday, or custom solutions." },
  { icon: HeadphonesIcon, title: "End-to-End Support", desc: "From initial consultation to ongoing maintenance. 24/7 support for critical issues." },
];

const stats = [
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { label: "Average Implementation", text: "4 Weeks" },
  { value: 70, suffix: "%", label: "Cost Reduction Achieved" },
];

export function WhyUsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="why-us" className="relative py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-sm font-semibold uppercase tracking-widest text-neon-cyan">Why Choose Us</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
            What Sets Us{" "}
            <span className="bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">Apart</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`glass-card rounded-2xl border border-neon-purple/20 p-6 text-center transition-all duration-700 hover:border-neon-purple/50 hover:scale-[1.02] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              <div className="mx-auto inline-flex rounded-xl bg-neon-purple/10 p-3">
                <f.icon className="text-neon-purple" size={28} />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className={`mt-16 grid gap-6 rounded-2xl sm:grid-cols-3 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {stats.map((s) => (
            <div key={s.label} className="glass-card rounded-2xl p-8 text-center">
              <div className="text-3xl font-bold text-neon-cyan sm:text-4xl">
                {s.text ? s.text : <><AnimatedCounter target={s.value!} />{s.suffix}</>}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
