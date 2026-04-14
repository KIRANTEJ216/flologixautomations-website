import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, CheckCircle, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const benefits = [
  "Free process audit & automation assessment",
  "Custom solution proposal within 48 hours",
  "No obligation consultation",
  "Dedicated project manager",
];

export function ContactSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="relative py-24">
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-neon-blue/5 blur-[120px]" />

      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-sm font-semibold uppercase tracking-widest text-neon-cyan">Get Started</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
            Ready to{" "}
            <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Transform Your Business?
            </span>
          </h2>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* Left */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <p className="text-lg text-muted-foreground">
              Join 10+ businesses in India that have revolutionized their operations with our automation solutions.
            </p>

            <ul className="mt-8 space-y-4">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <CheckCircle className="text-neon-cyan shrink-0" size={20} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="text-neon-blue" size={18} />
                hello@flologixautomations.com
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="text-neon-blue" size={18} />
                India &amp; Worldwide
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className={`transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            {submitted ? (
              <div className="glass-card flex flex-col items-center justify-center rounded-2xl p-12 text-center">
                <CheckCircle className="text-neon-cyan" size={48} />
                <h3 className="mt-4 text-xl font-semibold">Thank You!</h3>
                <p className="mt-2 text-muted-foreground">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form
                className="glass-card space-y-5 rounded-2xl border border-border/50 p-8"
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              >
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Name</label>
                  <Input placeholder="Your name" className="bg-input/50 border-border/50 focus-visible:ring-neon-blue" required />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Email</label>
                  <Input type="email" placeholder="your@email.com" className="bg-input/50 border-border/50 focus-visible:ring-neon-blue" required />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Company</label>
                  <Input placeholder="Your company name" className="bg-input/50 border-border/50 focus-visible:ring-neon-blue" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">What would you like to automate?</label>
                  <Textarea placeholder="Describe your automation needs..." rows={4} className="bg-input/50 border-border/50 focus-visible:ring-neon-blue" required />
                </div>
                <Button type="submit" size="lg" className="w-full glow-blue rounded-full bg-neon-blue text-primary-foreground hover:bg-neon-blue/80">
                  Request Free Consultation <ArrowRight className="ml-2" size={18} />
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  By submitting, you agree to our privacy policy. We'll get back to you within 24 hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
