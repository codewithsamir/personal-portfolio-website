"use client";

import { SectionHeader } from "../ui/SectionHeader";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BlogCard } from "../ui/BlogCard";

export function Blog({ posts }: { posts: any[] }) {
  if (!posts || posts.length === 0) return null;

  const featuredPosts = posts.filter((p) => p.featured).slice(0, 3);
  const displayPosts = featuredPosts.length > 0 ? featuredPosts : posts.slice(0, 3);

  return (
    <section id="blog" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2" />
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Latest Writing"
          subtitle="Blog"
          description="Notes on software architecture, frontend engineering, and building for the modern web."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {displayPosts.map((post, idx) => (
            <BlogCard key={post._id || idx} post={post} index={idx} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <Button asChild size="lg" className="rounded-2xl px-12 h-16 text-lg font-bold group btn-gradient border-none text-white shadow-xl hover:shadow-primary/20 transition-all">
            <Link href="/blog">
              Read All Articles
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
