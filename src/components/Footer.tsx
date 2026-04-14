export function Footer() {
  return (
    <footer className="border-t border-border/50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <span className="text-xl font-bold">
              <span className="text-neon-blue">Flo</span>logix<span className="text-neon-cyan">Automations</span>
            </span>
            <p className="mt-3 text-sm text-muted-foreground">
              Transforming businesses with intelligent AI automation solutions. Build, automate, and scale with our expert team.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold">Services</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-foreground transition-colors">n8n Development</a></li>
              <li><a href="#services" className="hover:text-foreground transition-colors">AI Agent Development</a></li>
              <li><a href="#services" className="hover:text-foreground transition-colors">WhatsApp Automation</a></li>
              <li><a href="#services" className="hover:text-foreground transition-colors">RAG Systems</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#case-studies" className="hover:text-foreground transition-colors">Case Studies</a></li>
              <li><a href="#contact" className="hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold">Resources</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">© 2026 FlologixAutomations. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
