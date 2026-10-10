import sanitizeHtml from "sanitize-html";
import type { Attributes, Tag } from "sanitize-html";

/**
 * HTML sanitiser for rendered markdown.
 *
 * Replaces `isomorphic-dompurify`, which pulled in jsdom (7.5 MB of the server
 * bundle) and, worse, threw `ReferenceError: __dirname is not defined in ES
 * module scope` under nitro's ESM output — taking /blog down with a 500.
 * `sanitize-html` is pure JS on top of htmlparser2, so it works in both the
 * dev server and the Vercel function bundle.
 *
 * The allowlist is deliberately tight. Post bodies are markdown rendered by
 * `marked`, which passes raw HTML straight through, so this is the only thing
 * standing between an n8n-generated draft and a stored XSS.
 */
const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "br",
    "hr",
    "strong",
    "em",
    "b",
    "i",
    "u",
    "s",
    "mark",
    "sub",
    "sup",
    "ul",
    "ol",
    "li",
    "blockquote",
    "pre",
    "code",
    "a",
    "img",
    "table",
    "thead",
    "tbody",
    "tfoot",
    "tr",
    "th",
    "td",
    "caption",
    "figure",
    "figcaption",
    "div",
    "span",
    "small",
  ],
  allowedAttributes: {
    a: ["href", "title", "target", "rel"],
    img: ["src", "alt", "title", "width", "height", "loading"],
    code: ["class"],
    pre: ["class"],
    th: ["scope", "colspan", "rowspan"],
    td: ["colspan", "rowspan"],
    "*": ["id"],
  },
  // Only these schemes. Blocks javascript:, data:, and vbscript: payloads.
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesByTag: { img: ["http", "https"] },
  allowProtocolRelative: false,
  // Nothing may load or execute from our origin on the blog's behalf.
  allowedIframeHostnames: [],
  disallowedTagsMode: "discard",
  enforceHtmlBoundary: true,
  transformTags: {
    // Outbound links open in a new tab and cannot reach back through
    // window.opener. Internal links are left alone — bouncing the reader to a
    // new tab to reach another page of the same site is worse UX, and there is
    // no reverse-tabnabbing risk to mitigate.
    a: (tagName: string, attribs: Attributes): Tag => {
      const href = attribs.href ?? "";
      const isInternal = href.startsWith("/") || href.startsWith("#");
      const next: Attributes = isInternal
        ? { href }
        : { href, target: "_blank", rel: "noopener noreferrer" };
      return { tagName, attribs: next };
    },
    img: sanitizeHtml.simpleTransform("img", { loading: "lazy" }),
  },
};

export function sanitizeHtmlContent(html: string): string {
  return sanitizeHtml(html, SANITIZE_OPTIONS);
}
