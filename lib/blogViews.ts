import { createHash } from "crypto";
import Blog from "@/models/Blog";
import BlogView from "@/models/BlogView";

const BOT_PATTERN = /bot|crawl|spider|slurp|preview|lighthouse|headless|facebookexternalhit|embedly|whatsapp|curl|wget/i;

function getVisitorId(ip: string, userAgent: string) {
  const salt = process.env.JWT_SECRET || "blog-views";
  return createHash("sha256").update(`${ip}|${userAgent}|${salt}`).digest("hex");
}

/**
 * Counts a view only the first time this visitor opens this post.
 * Returns true when a new unique view was recorded.
 */
export async function recordUniqueView(blogId: string, reqHeaders: Headers) {
  const userAgent = reqHeaders.get("user-agent") || "";
  if (!userAgent || BOT_PATTERN.test(userAgent)) return false;

  const ip =
    reqHeaders.get("x-forwarded-for")?.split(",")[0].trim() ||
    reqHeaders.get("x-real-ip") ||
    "unknown";

  const visitor = getVisitorId(ip, userAgent);

  try {
    const result = await BlogView.updateOne(
      { blog: blogId, visitor },
      { $setOnInsert: { blog: blogId, visitor } },
      { upsert: true }
    );
    if (result.upsertedCount !== 1) return false;

    await Blog.updateOne({ _id: blogId }, { $inc: { views: 1 } });
    return true;
  } catch {
    // Duplicate key from two simultaneous requests: already counted
    return false;
  }
}
