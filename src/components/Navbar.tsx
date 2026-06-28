import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useRouter, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";


const sectionLinks = [
  { label: "Services", id: "services" },
  { label: "Process", id: "process" },
  { label: "Why Us", id: "why-us" },
  { label: "Case Studies", id: "case-studies" },
  { label: "Contact", id: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const navigate = useNavigate();
  const isHome = router.state.location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToSection = async (id: string) => {
    setMobileOpen(false);
    if (isHome) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      await navigate({ to: "/", hash: id });
      // After navigation, scroll to the section
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-card py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="text-xl font-bold tracking-wider text-foreground">
          FLOLOGIXAUTOMATIONS
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {sectionLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => goToSection(l.id)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </button>
          ))}
          <Link to="/blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Blog
          </Link>
          <ThemeToggle />
          <button onClick={() => goToSection("contact")}>
            <Button className="glow-blue rounded-full bg-foreground px-6 text-background hover:bg-foreground/85">
              Get Free Consultation
            </Button>
          </button>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>



      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="glass-card mt-2 flex flex-col gap-4 px-6 py-6 md:hidden">
          {sectionLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => goToSection(l.id)}
              className="text-left text-muted-foreground hover:text-foreground"
            >
              {l.label}
            </button>
          ))}
          <Link
            to="/blog"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(false)}
          >
            Blog
          </Link>
          <button onClick={() => goToSection("contact")}>
            <Button className="w-full glow-blue rounded-full bg-foreground text-background">
              Get Free Consultation
            </Button>
          </button>
        </div>
      )}
    </nav>
  );
}
