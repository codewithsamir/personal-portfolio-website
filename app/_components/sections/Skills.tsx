"use client";

import { SectionHeader } from "../ui/SectionHeader";
import { AnimatedSection } from "../ui/AnimatedSection";
import { motion } from "framer-motion";

export function Skills({ skills }: { skills: any[] }) {
  if (!skills || skills.length === 0) return null;

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="My Toolbox"
          subtitle="Skills"
          description="A comprehensive list of technologies I use to bring ideas to life."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((category, idx) => (
            <AnimatedSection key={category.category} delay={idx * 0.1} className="space-y-6">
              <h3 className="text-xl font-bold font-space-grotesk border-l-4 border-primary pl-4">
                {category.category}
              </h3>
              <div className="space-y-6">
                {category.items.map((skill: any) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-bold uppercase tracking-tight">{skill.name}</span>
                      <span className="text-xs font-medium text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          ))}
        </div>
        
        <div className="mt-20 p-8 rounded-3xl border border-dashed border-border bg-muted/20 text-center">
          <p className="text-muted-foreground font-medium italic">
            And many more tools like Webpack, Jest, Cypress, and AWS...
          </p>
        </div>
      </div>
    </section>
  );
}
