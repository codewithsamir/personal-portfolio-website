import { SectionHeader } from "../ui/SectionHeader";
import { AnimatedSection } from "../ui/AnimatedSection";
import { 
  Code, 
  Layout, 
  Link as LinkIcon, 
  Database, 
  Terminal, 
  Smartphone,
  Rocket
} from "lucide-react";

const iconMap: Record<string, any> = {
  Code: Code,
  Layout: Layout,
  Link: LinkIcon,
};

export function Services({ services }: { services: any[] }) {
  if (!services || services.length === 0) return null;

  return (
    <section id="services" className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="What I Offer"
          subtitle="Services"
          description="Providing specialized solutions tailored to modern digital needs."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const Icon = iconMap[service.icon] || Code;
            return (
              <AnimatedSection key={service.title} delay={idx * 0.1}>
                <div className="p-10 rounded-[2.5rem] bg-background border border-border hover:border-primary transition-all duration-500 group h-full">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 font-space-grotesk">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
        
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
           {[
             { label: "Performance Audit", icon: Terminal },
             { label: "Responsive Design", icon: Smartphone },
             { label: "DB Architecture", icon: Database },
             { label: "SEO Optimization", icon: Rocket }
           ].map((item, idx) => {
             const Icon = item.icon || Terminal;
             return (
               <div key={item.label} className="flex items-center gap-3 p-4 rounded-2xl border border-border/50 bg-background/50">
                 <Icon size={18} className="text-primary" />
                 <span className="text-xs font-bold uppercase tracking-wider">{item.label}</span>
               </div>
             )
           })}
        </div>
      </div>
    </section>
  );
}
