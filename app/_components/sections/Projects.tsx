"use client";

import { SectionHeader } from "../ui/SectionHeader";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "../ui/ProjectCard";

export function Projects({ projects }: { projects: any[] }) {
  if (!projects || projects.length === 0) return null;

  // Filter to only featured projects for the landing page
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
  
  // If no featured projects, just show first 3
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3);

  return (
    <section id="projects" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Featured Work"
          subtitle="Portfolio"
          description="A selection of my high-impact technical projects. Focused on performance, scalability, and user experience."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {displayProjects.map((project, idx) => (
            <ProjectCard key={project._id || idx} project={project} index={idx} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <Button asChild size="lg" className="rounded-2xl px-12 h-16 text-lg font-bold group btn-gradient border-none text-white shadow-xl hover:shadow-primary/20 transition-all">
            <Link href="/projects">
              Explore All Projects
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
