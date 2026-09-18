import { Schema, model, models } from "mongoose";

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String },
    tags: [{ type: String }],
    author: { type: String, default: "Admin" },
    published: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    readTime: { type: String, default: "5 min read" },
    views: { type: Number, default: 0 },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Blog = models.Blog || model("Blog", BlogSchema);

export default Blog;
