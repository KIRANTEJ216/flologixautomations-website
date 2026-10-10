# n8n blog pipeline

`fla-blog-pipeline.workflow.json` drafts an SEO-optimised article with GPT,
hard-validates it, sends it to you for review, and publishes only on approval.

```
Manual Trigger → Build Prompt → GPT → Parse Draft → SEO Validate
                                    ↑                 │
                          (retry once on failure)   ├─ valid → Review → Wait for Approval
                                                    │              ├─ approve → Publish → Ping
                                                    │              └─ discard → Discarded
                                                    └─ invalid → Retries Left? → Give Up
```

## Import

n8n → **Workflows → Import from File** → pick `fla-blog-pipeline.workflow.json`.

Then replace these placeholders:

| Node | Placeholder | Replace with |
|---|---|---|
| `Send for Review` | `https://hooks.slack.com/services/REPLACE/ME/...` | Your Slack incoming webhook URL |
| `Publish` | `https://YOUR-DOMAIN.example/api/blog/webhook` | `https://<your-domain>/api/blog/webhook` |
| `Publish` | `x-api-key: =YOUR_N8N_BLOG_API_KEY` | Same value as `N8N_BLOG_API_KEY` in the app env |
| `Ping Search Engines` | `YOUR-DOMAIN.example` | Your domain |

### Credential

`Draft with GPT` uses **Header Auth** with:

- **Name**: `Authorization`
- **Value**: `Bearer sk-...`

The key lives in n8n's credential store, not in this file.

> This node calls the OpenAI Chat Completions API over HTTP rather than using
> n8n's native OpenAI node. That was deliberate: the native node's parameter
> schema shifts between n8n releases, which breaks imports, and
> `response_format: json_object` is what guarantees a parseable SEO payload. If
> you'd rather use the native node, delete `Draft with GPT`, drop in
> `@n8n/n8n-nodes-langchain.openAi`, and point its output at `Parse Draft` —
> `Parse Draft` reads `$json.choices[0].message.content`.

## Running it

Set these on the **Manual Trigger** node (n8n shows them as input fields in the
n8n-nodes-base.set **Edit Field List** panel — see "Trigger inputs" below):

| Field | Example | Default |
|---|---|---|
| `topic` | `n8n error handling patterns` | **required** |
| `focus_keyword` | `n8n error handling` | falls back to `topic` |
| `category` | `Workflow Automation` | `Workflow Automation` |
| `tags` | `n8n, error-handling` | derived from the draft |
| `word_target` | `1200` | `1200` |
| `model` | `gpt-4o` | `gpt-4o` |
| `min_words` | `800` | `800` |

### Trigger inputs

The `Manual Trigger` node in this file has no declared input fields, so n8n's UI
won't render a form for the values above. Either run it and let the defaults
apply, or declare them: open the Manual Trigger node, use **Edit Field List**, and
add the fields. `Build Prompt` reads them with `cfg.<name>` and supplies defaults,
so a bare run still works — it just can't set a topic.

### Reviewing

1. Run the workflow.
2. If the draft fails validation it retries once with the specific errors
   appended to the prompt, then stops with `Give Up`.
3. On success you get a Slack message with the draft, word count, and the SEO
   field lengths.
4. **Activate** the workflow (Slack won't give you the resume URL otherwise).
   Copy the Wait node's resume webhook URL.
5. Approve:
   ```bash
   curl -X POST '<resume-webhook-url>' \
     -H 'Content-Type: application/json' \
     -d '{"approve": true}'
   ```
   Reject instead with `{"approve": false, "note": "tighten the intro"}` — this
   records the reason rather than dropping it silently.
6. On approval the post goes live and the sitemap is pinged.

Drafts are always written with `published: false`. Nothing reaches the public
site until you approve it.

## What the validator enforces

Matches the thresholds in `src/routes/api.blog.webhook.ts` and
`src/routes/blog.$slug.tsx`, so the pipeline and the site agree:

**Blocking (draft is rejected)**

- title ≤ 60 chars and contains the focus keyword
- `meta_title` ≤ 60 chars
- slug is lowercase-kebab-case, ≤ 80 chars (the webhook rejects anything else)
- excerpt 140–160 chars
- body ≥ `min_words`
- no `#` H1 anywhere — `blog.$slug.tsx` already renders `<h1>`, so a second one
  is a duplicate-heading defect
- at least 2 `##` sections
- focus keyword present in the first 150 words
- **every internal link resolves to a route that exists** (exact-match allowlist)
- at least 2 FAQs — they render visibly *and* as `FAQPage` JSON-LD, and Google
  penalises schema-only FAQs
- non-empty categories and tags

**Non-blocking warnings** (shown in the review message)

- no bulleted or numbered list
- no internal links at all

## Editing the voice

Brand voice and the hard requirements live in the `Build Prompt` Code node, as a
plain array of strings joined with newlines. Edit that node — no wiring changes
needed. The internal-link allowlist there is what the prompt offers the model; the
one in `SEO Validate` is what it enforces. Keep them in sync when you add a
service page.
