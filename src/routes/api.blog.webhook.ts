import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

const API_KEY_ENV = "N8N_BLOG_API_KEY";

interface BlogPayload {
  action: "upsert" | "delete";
  slug: string;
  title?: string;
  excerpt?: string;
  content?: string;
  author?: string;
  published?: boolean;
  published_at?: string;
  featured_image?: string;
  categories?: string[];
  tags?: string[];
}

function getClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase not configured");
  return createClient(url, key);
}

async function upsertPost(supabase: ReturnType<typeof createClient>, payload: BlogPayload) {
  const { slug, title, excerpt, content, author, published, published_at, featured_image } = payload;
  if (!title || !content) throw new Error("title and content are required for upsert");

  const { data: existing } = await supabase.from("posts").select("id").eq("slug", slug).maybeSingle();

  const postData = {
    slug,
    title,
    excerpt: excerpt || title,
    content,
    author: author || "FLOLOGIXAUTOMATIONS",
    published: published ?? true,
    published_at: published_at || new Date().toISOString(),
    featured_image: featured_image || null,
    updated_at: new Date().toISOString(),
  };

  if (existing) {
    const { error } = await supabase.from("posts").update(postData).eq("id", existing.id);
    if (error) throw error;
  } else {
    const postDataWithCreated = { ...postData, created_at: new Date().toISOString() };
    const { error } = await supabase.from("posts").insert(postDataWithCreated);
    if (error) throw error;
  }

  // Sync categories
  if (payload.categories) {
    const { data: existingPost } = await supabase.from("posts").select("id").eq("slug", slug).single();
    if (existingPost) {
      await supabase.from("post_categories").delete().eq("post_id", existingPost.id);
      for (const name of payload.categories) {
        const catSlug = name.toLowerCase().replace(/\s+/g, "-");
        let { data: cat } = await supabase.from("categories").select("id").eq("slug", catSlug).maybeSingle();
        if (!cat) {
          const { data: newCat } = await supabase.from("categories").insert({ name, slug: catSlug }).select("id").single();
          cat = newCat;
        }
        if (cat) {
          await supabase.from("post_categories").insert({ post_id: existingPost.id, category_id: cat.id });
        }
      }
    }
  }

  // Sync tags
  if (payload.tags) {
    const { data: existingPost } = await supabase.from("posts").select("id").eq("slug", slug).single();
    if (existingPost) {
      await supabase.from("post_tags").delete().eq("post_id", existingPost.id);
      for (const name of payload.tags) {
        const tagSlug = name.toLowerCase().replace(/\s+/g, "-");
        let { data: tag } = await supabase.from("tags").select("id").eq("slug", tagSlug).maybeSingle();
        if (!tag) {
          const { data: newTag } = await supabase.from("tags").insert({ name, slug: tagSlug }).select("id").single();
          tag = newTag;
        }
        if (tag) {
          await supabase.from("post_tags").insert({ post_id: existingPost.id, tag_id: tag.id });
        }
      }
    }
  }
}

async function deletePost(supabase: ReturnType<typeof createClient>, slug: string) {
  const { data: post } = await supabase.from("posts").select("id").eq("slug", slug).single();
  if (!post) throw new Error("Post not found");
  await supabase.from("post_categories").delete().eq("post_id", post.id);
  await supabase.from("post_tags").delete().eq("post_id", post.id);
  const { error } = await supabase.from("posts").delete().eq("id", post.id);
  if (error) throw error;
}

export const Route = createFileRoute("/api/blog/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = request.headers.get("x-api-key");
        const expectedKey = process.env[API_KEY_ENV];

        if (!expectedKey || apiKey !== expectedKey) {
          return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }

        try {
          const payload: BlogPayload = await request.json();

          if (!payload.slug) {
            return new Response(JSON.stringify({ error: "slug is required" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          const supabase = getClient();

          if (payload.action === "delete") {
            await deletePost(supabase, payload.slug);
          } else {
            await upsertPost(supabase, payload);
          }

          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (err) {
          console.error("Blog webhook error:", err);
          return new Response(JSON.stringify({ error: err instanceof Error ? err.message : "Internal error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
