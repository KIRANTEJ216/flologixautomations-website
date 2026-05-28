import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
}

export interface Post extends PostMeta {
  html: string;
}

// Eagerly import all markdown files at build time
const modules = import.meta.glob("/src/content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    meta[key] = value;
  }
  return { meta, body: match[2] };
}

const posts: Post[] = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.split("/").pop()!.replace(/\.md$/, "");
    const { meta, body } = parseFrontmatter(raw);
    return {
      slug,
      title: meta.title || slug,
      date: meta.date || "",
      excerpt: meta.excerpt || "",
      author: meta.author || "FLOLOGIXAUTOMATIONS",
      html: DOMPurify.sanitize(marked.parse(body, { async: false }) as string),
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getAllPosts(): PostMeta[] {
  return posts.map(({ html: _html, ...meta }) => meta);
}

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
