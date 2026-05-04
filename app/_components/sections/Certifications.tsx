"use client";

import { SectionHeader } from "../ui/SectionHeader";
import { AnimatedSection } from "../ui/AnimatedSection";
import { Award, ExternalLink } from "lucide-react";

export function Certifications({ certifications }: { certifications: any[] }) {
  if (!certifications || certifications.length === 0) return null;

  return (
    <section id="certifications" className="py-24 px-6 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Professional Certifications"
          subtitle="Credentials"
          description="Verified technical specializations and credentials from global industry leaders."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {certifications.map((cert, idx) => (
            <AnimatedSection 
                key={cert._id} 
                delay={idx * 0.1}
                className="p-8 rounded-[2.5rem] bg-background border border-border hover:border-primary/50 transition-all hover:shadow-2xl group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
              
              <div className="relative z-10 space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <Award size={28} />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-space-grotesk tracking-tight leading-tight">{cert.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{cert.issuer}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                    <span className="text-[10px] font-bold text-primary">{cert.date}</span>
                  </div>
                </div>

                {cert.link && (
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors group/link"
                  >
                    Verify Credential
                    <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
