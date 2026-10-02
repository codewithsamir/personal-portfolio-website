import { SectionHeader } from "../_components/ui/SectionHeader";
import { ProjectCard } from "../_components/ui/ProjectCard";
import { Breadcrumb } from "../_components/ui/Breadcrumb";
import { Navbar } from "../_components/layout/Navbar";
import { Footer } from "../_components/layout/Footer";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import PersonalInfo from "@/models/PersonalInfo";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

async function getProjects() {
  await dbConnect();
  const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(projects));
}

export async function generateMetadata(): Promise<Metadata> {
  await dbConnect();
  const personal = await PersonalInfo.findOne().lean();
  
  const name = personal?.name || "Samir Rain";
  const title = "Projects";
  const description = `Web development projects by ${name}, a Full Stack Developer in Nepal: real-world apps built with React, Next.js, Django, Node.js and MongoDB.`;

  return {
    title,
    description,
    alternates: { canonical: "/projects" },
    openGraph: {
      title: `${title} | ${name}`,
      description,
      url: "/projects",
      siteName: name,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${name}`,
      description,
    },
  };
}

export default async function AllProjectsPage() {
  const projects = await getProjects();
  await dbConnect();
  const personalData = await PersonalInfo.findOne().lean();
  const personalInfo = personalData ? JSON.parse(JSON.stringify(personalData)) : null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={[{ label: "Projects" }]} />

          <SectionHeader
            title="All Technical Projects"
            subtitle="My Portfolio"
            description="A comprehensive gallery of my professional work, research, and technical experiments. Each project represents a unique challenge solved with modern architecture."
          />

          <div className="flex flex-wrap justify-center gap-10 mt-20">
            {projects.map((project: any, i: number) => (
              <div
                key={project._id}
                className="w-full md:w-[calc((100%-2.5rem)/2)] lg:w-[calc((100%-5rem)/3)]"
              >
                <ProjectCard project={project} index={i} />
              </div>
            ))}
          </div>
          
          {projects.length === 0 && (
            <div className="text-center py-32 rounded-[3rem] bg-muted/20 border-2 border-dashed border-border mt-16">
               <p className="text-muted-foreground italic text-lg font-medium">No projects found in the database. Add some from the admin panel!</p>
            </div>
          )}
        </div>
      </main>
      <Footer personalInfo={personalInfo} />
    </div>
  );
}
