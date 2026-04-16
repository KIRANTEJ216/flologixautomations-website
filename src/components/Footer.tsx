import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="text-xl font-bold tracking-wider text-foreground">
              FLOLOGIXAUTOMATIONS
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Transforming businesses with intelligent AI automation solutions. Build, automate, and scale with our expert team.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Services</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" hash="services" className="hover:text-foreground transition-colors">Workflow Automation</Link></li>
              <li><Link to="/" hash="services" className="hover:text-foreground transition-colors">AI Agent Development</Link></li>
              <li><Link to="/" hash="services" className="hover:text-foreground transition-colors">WhatsApp Automation</Link></li>
              <li><Link to="/" hash="services" className="hover:text-foreground transition-colors">RAG Systems</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" hash="why-us" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link to="/" hash="case-studies" className="hover:text-foreground transition-colors">Case Studies</Link></li>
              <li><Link to="/" hash="contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Resources</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link to="/" hash="process" className="hover:text-foreground transition-colors">Our Process</Link></li>
              <li><Link to="/" hash="contact" className="hover:text-foreground transition-colors">Support</Link></li>
              <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">© 2026 FLOLOGIXAUTOMATIONS. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
