import { SectionHeader } from "../ui/SectionHeader";
import { AnimatedSection } from "../ui/AnimatedSection";
import { GraduationCap, Award } from "lucide-react";

export function Education({ education }: { education: any[] }) {
  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            title="Academic Background"
            subtitle="Learning"
            align="center"
            className="mb-16"
          />
          <div className="space-y-12">
            {education.map((item, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1}>
                <div className="flex flex-col md:flex-row gap-8 p-10 rounded-[2.5rem] border border-border bg-muted/5 hover:border-primary/30 transition-all group">
                  <div className="w-20 h-20 rounded-3xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <GraduationCap size={32} />
                  </div>
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                        {item.period}
                      </span>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        {item.location}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-2xl md:text-3xl font-black font-space-grotesk tracking-tight leading-tight">
                        {item.degree}
                      </h3>
                      <p className="text-xl font-bold text-muted-foreground italic">
                        {item.institution}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
