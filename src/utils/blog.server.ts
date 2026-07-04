import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  published_at: string;
  categories: { name: string; slug: string }[];
  tags: { name: string; slug: string }[];
  featured_image?: string;
}

export interface Post extends PostMeta {
  html: string;
}

function getClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_URL and SUPABASE_ANON_KEY must be set");
  }
  return createClient(url, key);
}

export const fetchAllPosts = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const supabase = getClient();
      const { data, error } = await supabase
        .from("posts")
        .select(`
          slug, title, excerpt, author, published_at, featured_image,
          categories!post_categories(name, slug),
          tags!post_tags(name, slug)
        `)
        .eq("published", true)
        .order("published_at", { ascending: false });

      if (error) throw error;
      return { posts: data as PostMeta[], error: null };
    } catch (err) {
      console.error("fetchAllPosts error:", err);
      return { posts: [], error: "Failed to load posts" };
    }
  });

export const fetchPost = createServerFn({ method: "GET" })
  .handler(async ({ data: slug }: { data: string }) => {
    try {
      const supabase = getClient();
      const { data, error } = await supabase
        .from("posts")
        .select(`
          slug, title, excerpt, content, author, published_at, featured_image,
          categories!post_categories(name, slug),
          tags!post_tags(name, slug)
        `)
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error || !data) return { post: null, error: "Post not found" };

      const html = DOMPurify.sanitize(
        await marked.parse(data.content)
      );

      const { content: _, ...meta } = data;
      return { post: { ...meta, html } as Post, error: null };
    } catch (err) {
      console.error("fetchPost error:", err);
      return { post: null, error: "Failed to load post" };
    }
  });
