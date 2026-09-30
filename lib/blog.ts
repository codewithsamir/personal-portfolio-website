// Splits metadata that was pasted into a blog title, e.g.
// "My Post Slug: my-post Tags: React, SEO Meta description: A short summary"
// into { title: "My Post", slug: "my-post", tags: [...], description: "..." }.
const META_MARKER = /\s+(Slug|Tags|Meta description)\s*:\s*/i;

export function parseBlogTitle(raw: string = "") {
  const parts = raw.split(new RegExp(META_MARKER.source, "gi"));
  const result: { title: string; slug?: string; tags?: string[]; description?: string } = {
    title: parts[0].trim(),
  };

  for (let i = 1; i < parts.length - 1; i += 2) {
    const key = parts[i].toLowerCase();
    const value = parts[i + 1].trim();
    if (!value) continue;
    if (key === "slug") result.slug = value;
    else if (key === "tags") result.tags = value.split(",").map((t) => t.trim()).filter(Boolean);
    else result.description = value;
  }

  return result;
}

export function cleanBlogTitle(raw: string = "") {
  return parseBlogTitle(raw).title;
}
