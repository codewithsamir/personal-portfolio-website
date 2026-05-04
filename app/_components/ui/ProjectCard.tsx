import { AnimatedSection } from "./AnimatedSection";
import { Button } from "./button";
import { ArrowRight, Code2, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function ProjectCard({ project, index }: { project: any; index: number }) {
  return (
    <AnimatedSection delay={index * 0.1} className="group h-full">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-background border border-border/50 h-full flex flex-col hover:border-primary/50 transition-all duration-700 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)]">
        {/* Project Image Container */}
        <div className="aspect-[16/10] relative overflow-hidden bg-muted group/img">
          {(project.image || project.coverImage) ? (
            <Image
              src={project.image || project.coverImage}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-1000 group-hover/img:scale-110"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50 text-muted-foreground/5 font-black text-7xl italic uppercase font-space-grotesk tracking-widest pointer-events-none">
              {project.title}
            </div>
          )}

          {/* Subtle Overlay Gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />

          {/* Action Badge */}
          <div className="absolute top-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <div className="flex gap-3">
              {project.liveUrl && (
                <Link href={project.liveUrl} target="_blank" className="w-10 h-10 rounded-full glass border border-white/20 flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all">
                  <ExternalLink size={16} />
                </Link>
              )}
              {project.githubUrl && (
                <Link href={project.githubUrl} target="_blank" className="w-10 h-10 rounded-full glass border border-white/20 flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all">
                  <Code2 size={16} />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-10 flex-1 flex flex-col">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((tech: string) => (
              <span
                key={tech}
                className="px-4 py-1.5 rounded-full glass border border-primary/5 text-[9px] font-black uppercase tracking-widest text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="space-y-4 mb-8 flex-1">
            <h3 className="text-3xl font-black font-space-grotesk tracking-tighter leading-tight group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed line-clamp-3 font-medium">
              {project.description}
            </p>
          </div>

          <div className="pt-8 border-t border-border/50 flex justify-between items-center">
            <Link
              href={project.liveUrl || "#"}
              target="_blank"
              className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 text-foreground hover:text-primary transition-all group/link"
            >
              View Project
              <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover/link:bg-primary group-hover/link:text-white group-hover/link:border-primary transition-all duration-500">
                <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            <span className="text-[10px] font-bold text-muted-foreground/20 italic tracking-widest">
              / {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </span>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
