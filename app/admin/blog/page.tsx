"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { toast } from "sonner";
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  Upload,
  Loader2,
  X,
  Star,
  Edit3,
  Eye,
  EyeOff,
  BarChart3,
} from "lucide-react";
import { DataTable, DataTableRow, DataTableCell } from "../_components/DataTable";
import Image from "next/image";

const emptyForm = {
  title: "",
  excerpt: "",
  content: "",
  tags: "",
  coverImage: "",
  published: false,
  featured: false,
  readTime: "5 min read",
};

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch("/api/blogs");
    const data = await res.json();
    setPosts(data);
    setLoading(false);
  };

  const handleEdit = (post: any) => {
    setEditingId(post._id);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      tags: (post.tags || []).join(", "),
      coverImage: post.coverImage || "",
      published: post.published || false,
      featured: post.featured || false,
      readTime: post.readTime || "5 min read",
    });
    setIsAdding(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("folder", "portfolio-blog");

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formDataUpload,
      });
      const data = await res.json();
      if (data.url) {
        setFormData({ ...formData, coverImage: data.url });
        toast.success("Cover image uploaded!");
      } else {
        toast.error("Upload failed");
      }
    } catch (error) {
      toast.error("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const postToSubmit = {
      ...formData,
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      slug: formData.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-"),
    };

    const method = editingId ? "PUT" : "POST";
    const body = editingId ? { ...postToSubmit, id: editingId } : postToSubmit;

    const res = await fetch("/api/blogs", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      toast.success(editingId ? "Post updated!" : "Post created!");
      setIsAdding(false);
      setEditingId(null);
      setFormData(emptyForm);
      fetchPosts();
    } else {
      const err = await res.json();
      toast.error(err.error || "Something went wrong");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    const res = await fetch(`/api/blogs?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Post deleted");
      fetchPosts();
    }
  };

  const togglePublished = async (post: any) => {
    const res = await fetch("/api/blogs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: post._id, published: !post.published }),
    });
    if (res.ok) {
      toast.success(!post.published ? "Post published" : "Post unpublished");
      fetchPosts();
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-space-grotesk">Blog</h1>
          <p className="text-muted-foreground mt-1">Write and publish articles to your site.</p>
        </div>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)} className="rounded-xl font-bold btn-gradient border-none h-11 text-white">
            <Plus size={18} className="mr-2" />
            New Post
          </Button>
        )}
      </div>

      {!isAdding && posts.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <div className="p-6 rounded-[1.5rem] bg-background border border-border">
            <p className="text-3xl font-black font-space-grotesk text-primary">{posts.length}</p>
            <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mt-1">Total Posts</p>
          </div>
          <div className="p-6 rounded-[1.5rem] bg-background border border-border">
            <p className="text-3xl font-black font-space-grotesk text-primary">{posts.filter((p) => p.published).length}</p>
            <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mt-1">Published</p>
          </div>
          <div className="p-6 rounded-[1.5rem] bg-background border border-border">
            <p className="text-3xl font-black font-space-grotesk text-primary flex items-center gap-2">
              <BarChart3 size={22} />
              {posts.reduce((sum, p) => sum + (p.views || 0), 0)}
            </p>
            <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mt-1">Total Views</p>
          </div>
        </div>
      )}

      {isAdding && (
        <form onSubmit={handleSubmit} className="p-10 rounded-[2.5rem] bg-background border border-border space-y-8 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{editingId ? "Edit Post" : "New Post"}</h2>
            <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); setFormData(emptyForm); }} className="text-muted-foreground hover:text-foreground"><X size={20}/></button>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1 space-y-6">
              <div className="space-y-4">
                <label className="text-sm font-bold ml-1 uppercase tracking-widest text-muted-foreground">Cover Image</label>
                <div className="relative aspect-video rounded-3xl bg-muted border-2 border-dashed border-border flex flex-col items-center justify-center overflow-hidden group">
                  {formData.coverImage ? (
                    <>
                      <Image src={formData.coverImage} alt="Preview" fill className="object-cover" />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, coverImage: "" })}
                        className="absolute top-2 right-2 p-2 bg-background/80 backdrop-blur-md rounded-full text-destructive shadow-lg hover:bg-background transition-all"
                      >
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-3 p-8 text-center">
                      {uploading ? (
                        <Loader2 className="w-10 h-10 animate-spin text-primary" />
                      ) : (
                        <>
                          <ImageIcon size={24} className="text-muted-foreground" />
                          <label className="cursor-pointer">
                            <span className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2">
                              <Upload size={14} /> Upload
                            </span>
                            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                          </label>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">Read Time</label>
                <Input
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                  placeholder="e.g. 5 min read"
                  className="rounded-xl h-11"
                />
              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/50 border border-border">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-5 h-5 accent-primary"
                />
                <label htmlFor="published" className="text-sm font-bold cursor-pointer">
                  Published (visible on site)
                </label>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/50 border border-border">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 accent-primary"
                />
                <label htmlFor="featured" className="text-sm font-bold cursor-pointer">
                  Featured on Homepage
                </label>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Building Scalable Next.js Applications"
                  className="rounded-xl h-12"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">Tags</label>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Next.js, React, Architecture"
                  className="rounded-xl h-12"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">Excerpt</label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="A short summary shown on the blog listing card..."
                  className="rounded-2xl min-h-[80px] p-4"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">Content</label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your article content here. Supports plain paragraphs — separate paragraphs with a blank line."
                  className="rounded-2xl min-h-[280px] p-4 font-mono text-sm"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-border/50">
            <Button type="button" variant="ghost" onClick={() => { setIsAdding(false); setEditingId(null); setFormData(emptyForm); }} className="rounded-xl px-8 h-12">Cancel</Button>
            <Button type="submit" disabled={uploading} className="rounded-xl px-10 h-12 font-bold btn-gradient border-none text-white">
              {editingId ? "Update Post" : "Create Post"}
            </Button>
          </div>
        </form>
      )}

      <DataTable headers={["Post", "Status", "Views", "Tags", "Actions"]}>
        {posts.length === 0 ? (
          <DataTableRow>
            <DataTableCell className="text-center py-12 text-muted-foreground italic" colSpan={5}>
              No blog posts created yet.
            </DataTableCell>
          </DataTableRow>
        ) : (
          posts.map((post) => (
            <DataTableRow key={post._id}>
              <DataTableCell>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-10 rounded-lg bg-muted border border-border relative overflow-hidden flex items-center justify-center">
                    {post.coverImage ? (
                      <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                    ) : (
                      <ImageIcon size={14} className="text-muted-foreground/30" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold font-space-grotesk text-md leading-none">{post.title}</p>
                    <p className="text-[10px] text-muted-foreground mt-1.5 truncate max-w-[200px]">{post.excerpt}</p>
                  </div>
                </div>
              </DataTableCell>
              <DataTableCell>
                <button
                  onClick={() => togglePublished(post)}
                  className="flex items-center gap-1.5 text-xs font-bold"
                >
                  {post.published ? (
                    <span className="flex items-center gap-1 text-primary">
                      <Eye size={14} /> Published
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <EyeOff size={14} /> Draft
                    </span>
                  )}
                </button>
                {post.featured && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-amber-500 mt-1">
                    <Star size={10} fill="currentColor" /> Featured
                  </span>
                )}
              </DataTableCell>
              <DataTableCell>
                <span className="flex items-center gap-1.5 text-sm font-bold">
                  <Eye size={14} className="text-muted-foreground" />
                  {post.views || 0}
                </span>
              </DataTableCell>
              <DataTableCell>
                <div className="flex flex-wrap gap-2 max-w-[200px]">
                  {(post.tags || []).map((t: string) => (
                    <span key={t} className="px-2 py-0.5 rounded-lg bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest">
                      {t}
                    </span>
                  ))}
                </div>
              </DataTableCell>
              <DataTableCell>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit(post)} className="p-2 text-muted-foreground hover:text-primary transition-colors"><Edit3 size={18} /></button>
                  <button onClick={() => handleDelete(post._id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={18} /></button>
                </div>
              </DataTableCell>
            </DataTableRow>
          ))
        )}
      </DataTable>
    </div>
  );
}
