# Architecture rules
- Keep dedicated service landing content in the shared service catalogue and render it through the existing dynamic service route to preserve public URLs and sitemap discovery.
- Use a browser-safe public site origin in shared SEO helpers so server rendering and client navigation emit the same canonical URL.
