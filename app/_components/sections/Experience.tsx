import { SectionHeader } from "../ui/SectionHeader";
import { AnimatedSection } from "../ui/AnimatedSection";
import { MapPin } from "lucide-react";

export function Experience({ experience }: { experience: any[] }) {
  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" className="py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-20">
          {/* Sticky Header Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <SectionHeader
              title="Career Narrative"
              subtitle="The Journey"
              description="A chronicle of technical evolution and leadership across various digital landscapes."
              align="left"
              className="mb-0"
            />
          </div>

          {/* Timeline Column */}
          <div className="lg:col-span-8 space-y-24 relative">
            {/* Vertical Line */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-linear-to-b from-primary/30 via-border to-transparent hidden md:block" />

            {experience.map((item, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1} className="relative md:pl-12">
                {/* Visual Connector */}
                <div className="absolute left-[-5px] top-2 w-[11px] h-[11px] rounded-full bg-background border-2 border-primary hidden md:block" />
                
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                        {item.period}
                      </span>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        <MapPin size={12} className="text-primary/50" />
                        {item.location}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-3xl md:text-5xl font-black font-space-grotesk tracking-tight text-foreground">
                        {item.role}
                      </h3>
                      <p className="text-xl font-bold text-muted-foreground italic">
                        at {item.company}
                      </p>
                    </div>
                  </div>

                  <div className="max-w-2xl">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Highlights/Tags if any (Optional - but makes it look pro) */}
                  <div className="flex flex-wrap gap-3">
                    {["Strategy", "Scale", "Innovation"].map(tag => (
                      <span key={tag} className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40 border border-border/50 px-3 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
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
