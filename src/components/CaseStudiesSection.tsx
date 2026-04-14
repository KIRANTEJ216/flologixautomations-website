import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const cases = [
  {
    tag: "Marketing Agency",
    title: "5X Capacity, 2.4X Onboarding Speed",
    desc: "Migrated entire business operations to Monday.com with automated onboarding that reduced launch time from 14 days to 5 days.",
    metrics: [
      { value: "5X", label: "Capacity Increase" },
      { value: "2.4X Faster", label: "Onboarding Speed" },
    ],
  },
  {
    tag: "Financial Services",
    title: "2X More Capacity With Better Systems",
    desc: "Streamlined accounting firm operations by integrating Monday.com with FinancialCents, automating sales to recurring tasks.",
    metrics: [
      { value: "2X", label: "Capacity Doubled" },
      { value: "Without New Hires", label: "Client Work Increased" },
    ],
  },
  {
    tag: "B2B Services",
    title: "From 63% to 95% On-Time Shipments",
    desc: "Created centralized order management system replacing existing CRM, with automated notifications and handoffs across departments.",
    metrics: [
      { value: "95%", label: "On-Time Rate" },
      { value: "+32%", label: "Improvement" },
    ],
  },
];

export function CaseStudiesSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="case-studies" className="relative py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-sm font-semibold uppercase tracking-widest text-neon-cyan">Case Studies</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
            Real Results for{" "}
            <span className="bg-gradient-to-r from-neon-blue to-neon-cyan bg-clip-text text-transparent">
              Real Businesses
            </span>
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {cases.map((c, i) => (
            <div
              key={c.tag}
              className={`glass-card group rounded-2xl border border-neon-blue/20 p-6 transition-all duration-700 hover:border-neon-blue/50 hover:scale-[1.02] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150 + 200}ms` }}
            >
              <span className="inline-block rounded-full bg-neon-blue/10 px-3 py-1 text-xs font-medium text-neon-blue">
                {c.tag}
              </span>
              <h3 className="mt-4 text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                {c.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="text-2xl font-bold text-neon-cyan">{m.value}</div>
                    <div className="text-xs text-muted-foreground">{m.label}</div>
                  </div>
                ))}
              </div>

              <a href="#contact" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-neon-blue transition-colors hover:text-neon-cyan">
                Get Similar Results <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
