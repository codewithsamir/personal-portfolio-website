import { Fragment } from "react";
import { Navbar } from "@/app/_components/layout/Navbar";
import { Footer } from "@/app/_components/layout/Footer";
import { AdSlot } from "@/app/_components/ui/AdSlot";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog";
import PersonalInfo from "@/models/PersonalInfo";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, Clock, Eye } from "lucide-react";
import { Breadcrumb } from "@/app/_components/ui/Breadcrumb";
import { format } from "date-fns";
import { parseBlogTitle } from "@/lib/blog";
import { recordUniqueView } from "@/lib/blogViews";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

async function getPost(slug: string) {
  await dbConnect();
  const post = await Blog.findOne({ slug, published: true }).lean();
  if (!post) return null;
  const data = JSON.parse(JSON.stringify(post));
  const parsed = parseBlogTitle(data.title);
  data.title = parsed.title;
  if (!data.excerpt && parsed.description) data.excerpt = parsed.description;
  if (!data.tags?.length && parsed.tags) data.tags = parsed.tags;
  return data;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: "Article Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    authors: [{ name: "Samir Rain", url: "https://samirrain.com.np" }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      authors: ["Samir Rain"],
      publishedTime: post.publishedAt || post.createdAt,
      modifiedTime: post.updatedAt,
      url: `https://samirrain.com.np/blog/${post.slug}`,
      images: post.coverImage ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  // Count each visitor once per post, however many times they open it
  const counted = await recordUniqueView(post._id, await headers());
  const views = (post.views ?? 0) + (counted ? 1 : 0);

  await dbConnect();
  const personalData = await PersonalInfo.findOne().lean();
  const personalInfo = personalData ? JSON.parse(JSON.stringify(personalData)) : null;

  const date = post.publishedAt || post.createdAt;
  const paragraphs = post.content.split(/\n\s*\n/).filter((p: string) => p.trim());

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-40 pb-32 px-6">
        <article className="max-w-3xl mx-auto">
          <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />

          <div className="flex flex-wrap gap-2 mb-6">
            {(post.tags || []).map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1
            title={post.title}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-space-grotesk tracking-tighter leading-[1.1] pb-1 mb-8 line-clamp-2 wrap-break-word"
          >
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-xs font-bold text-muted-foreground uppercase tracking-widest mb-12">
            <span className="flex items-center gap-2">
              <Calendar size={14} />
              {date ? format(new Date(date), "MMMM d, yyyy") : ""}
            </span>
            {post.readTime && (
              <span className="flex items-center gap-2">
                <Clock size={14} />
                {post.readTime}
              </span>
            )}
            <span className="flex items-center gap-2">
              <Eye size={14} />
              {views} {views === 1 ? "view" : "views"}
            </span>
            {post.author && <span>By {post.author}</span>}
          </div>

          {post.coverImage && (
            <div className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden mb-14 border border-border shadow-2xl">
              <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
            </div>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
            {paragraphs.map((para: string, i: number) => (
              <Fragment key={i}>
                <p className="text-lg text-foreground/90 leading-relaxed font-medium whitespace-pre-line">
                  {para}
                </p>
                {i === 1 && <AdSlot slot="0000000000" className="my-10" />}
              </Fragment>
            ))}
          </div>
        </article>
      </main>
      <Footer personalInfo={personalInfo} />
    </div>
  );
}
