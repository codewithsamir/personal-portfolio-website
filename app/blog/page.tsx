import { SectionHeader } from "../_components/ui/SectionHeader";
import { BlogCard } from "../_components/ui/BlogCard";
import { Breadcrumb } from "../_components/ui/Breadcrumb";
import { Navbar } from "../_components/layout/Navbar";
import { Footer } from "../_components/layout/Footer";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog";
import PersonalInfo from "@/models/PersonalInfo";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

async function getPosts() {
  await dbConnect();
  const posts = await Blog.find({ published: true }).sort({ publishedAt: -1, createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(posts));
}

export async function generateMetadata(): Promise<Metadata> {
  await dbConnect();
  const personal = await PersonalInfo.findOne().lean();

  const title = personal ? `${personal.name} | Blog` : "Blog | Portfolio";
  const description = "Articles and notes on software architecture, frontend engineering, and building for the modern web.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://samirrain.com.np/blog",
      siteName: personal ? `${personal.name} Portfolio` : "Portfolio",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogListPage() {
  const posts = await getPosts();
  await dbConnect();
  const personalData = await PersonalInfo.findOne().lean();
  const personalInfo = personalData ? JSON.parse(JSON.stringify(personalData)) : null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={[{ label: "Blog" }]} />

          <SectionHeader
            title="Notes & Writing"
            subtitle="The Blog"
            description="Thoughts on software architecture, frontend engineering, and lessons learned building products."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
            {posts.map((post: any, i: number) => (
              <BlogCard key={post._id} post={post} index={i} />
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-32 rounded-[3rem] bg-muted/20 border-2 border-dashed border-border mt-16">
              <p className="text-muted-foreground italic text-lg font-medium">No articles published yet. Check back soon!</p>
            </div>
          )}
        </div>
      </main>
      <Footer personalInfo={personalInfo} />
    </div>
  );
}
