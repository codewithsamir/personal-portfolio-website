import { AnimatedSection } from "./AnimatedSection";
import { ArrowRight, Calendar, Clock, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { cleanBlogTitle } from "@/lib/blog";

export function BlogCard({ post, index }: { post: any; index: number }) {
  const date = post.publishedAt || post.createdAt;
  const title = cleanBlogTitle(post.title);

  return (
    <AnimatedSection delay={index * 0.1} className="group h-full">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-background border border-border/50 h-full flex flex-col hover:border-primary/50 transition-all duration-700 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)]">
          <div className="aspect-[16/10] relative overflow-hidden bg-muted">
            {post.coverImage ? (
              <Image
                src={post.coverImage}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/50 text-muted-foreground/5 font-black text-4xl md:text-5xl italic uppercase font-space-grotesk tracking-widest pointer-events-none px-6 text-center">
                <span className="line-clamp-3 wrap-break-word">{title}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
          </div>

          <div className="p-6 md:p-8 flex-1 flex flex-col">
            <div className="flex items-center gap-4 mb-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              {date && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  {format(new Date(date), "MMM d, yyyy")}
                </span>
              )}
              {post.readTime && (
                <span className="flex items-center gap-1.5">
                  <Clock size={12} />
                  {post.readTime}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Eye size={12} />
                {post.views ?? 0}
              </span>
            </div>

            <div className="space-y-3 mb-6 flex-1">
              <h3
                title={title}
                className="text-2xl font-black font-space-grotesk tracking-tighter leading-tight line-clamp-2 wrap-break-word group-hover:text-primary transition-colors"
              >
                {title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 font-medium">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-6 border-t border-border/50 flex justify-between items-center">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2.5 text-foreground group-hover:text-primary transition-all">
                Read Article
                <div className="w-7 h-7 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500">
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </span>

              {post.tags?.[0] && (
                <span className="px-3 py-1 rounded-full glass border border-primary/5 text-[8px] font-black uppercase tracking-widest text-muted-foreground">
                  {post.tags[0]}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </AnimatedSection>
  );
}
