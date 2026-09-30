import { Schema, model, models } from "mongoose";

// One document per (post, visitor) pair, so each visitor is counted once per post.
// `visitor` is a salted hash of IP + user agent; the raw IP is never stored.
const BlogViewSchema = new Schema(
  {
    blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
    visitor: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

BlogViewSchema.index({ blog: 1, visitor: 1 }, { unique: true });

const BlogView = models.BlogView || model("BlogView", BlogViewSchema);

export default BlogView;
