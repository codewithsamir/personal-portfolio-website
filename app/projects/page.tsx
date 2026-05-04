import { SectionHeader } from "../_components/ui/SectionHeader";
import { ProjectCard } from "../_components/ui/ProjectCard";
import { Navbar } from "../_components/layout/Navbar";
import { Footer } from "../_components/layout/Footer";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import PersonalInfo from "@/models/PersonalInfo";

export const dynamic = 'force-dynamic';

async function getProjects() {
  await dbConnect();
  const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(projects));
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
          <SectionHeader
            title="All Technical Projects"
            subtitle="My Portfolio"
            description="A comprehensive gallery of my professional work, research, and technical experiments. Each project represents a unique challenge solved with modern architecture."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
            {projects.map((project: any, i: number) => (
              <ProjectCard key={project._id} project={project} index={i} />
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
