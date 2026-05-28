import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { submitContactForm } from "@/utils/contact.functions";
import { useServerFn } from "@tanstack/react-start";

const benefits = [
  "Free process audit & automation assessment",
  "Custom solution proposal within 48 hours",
  "No obligation consultation",
  "Dedicated project manager",
];

const employeeOptions = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "500+",
];

export function ContactSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submitFn = useServerFn(submitContactForm);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const result = await submitFn({
        data: {
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          company: formData.get("company") as string,
          employees: formData.get("employees") as "1-10" | "11-50" | "51-200" | "201-500" | "500+",
          message: formData.get("message") as string,
        },
      });

      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
                contactus@flologixautomations.com
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
                onSubmit={handleSubmit}
              >
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Name</label>
                  <Input name="name" placeholder="Your name" className="bg-input/50 border-border/50 focus-visible:ring-neon-blue" required />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Email</label>
                  <Input name="email" type="email" placeholder="your@email.com" className="bg-input/50 border-border/50 focus-visible:ring-neon-blue" required />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Company</label>
                  <Input name="company" placeholder="Your company name" className="bg-input/50 border-border/50 focus-visible:ring-neon-blue" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Number of Employees</label>
                  <select
                    name="employees"
                    className="flex h-10 w-full rounded-md border border-border/50 bg-input/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue focus-visible:ring-offset-2"
                    required
                  >
                    <option value="" className="bg-background">Select range</option>
                    {employeeOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-background">{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">What would you like to automate?</label>
                  <Textarea name="message" placeholder="Describe your automation needs..." rows={4} className="bg-input/50 border-border/50 focus-visible:ring-neon-blue" required />
                </div>
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
                <Button type="submit" size="lg" disabled={loading} className="w-full glow-blue rounded-full bg-neon-blue text-primary-foreground hover:bg-neon-blue/80">
                  {loading ? (
                    <><Loader2 className="mr-2 animate-spin" size={18} /> Submitting...</>
                  ) : (
                    <>Request Free Consultation <ArrowRight className="ml-2" size={18} /></>
                  )}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  By submitting, you agree to our <a href="/privacy" className="underline hover:text-foreground">Privacy Policy</a> and <a href="/terms" className="underline hover:text-foreground">Terms of Service</a>. We'll get back to you within 24 hours. All automations we deliver are tuned for the best possible outcome, subject to data quality and third-party platform behavior.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
