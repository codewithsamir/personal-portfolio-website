import { SectionHeader } from "../ui/SectionHeader";
import { AnimatedSection } from "../ui/AnimatedSection";
import { Code2, Cpu, Globe, Rocket, Download } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

const strengths = [
   {
      title: "Problem Solving",
      description: "Approaching complex challenges with analytical thinking and efficient solutions.",
      icon: Cpu,
   },
   {
      title: "Performance",
      description: "Optimizing every line of code for maximum speed and smooth user interactions.",
      icon: Rocket,
   },
   {
      title: "Global Standards",
      description: "Adhering to international best practices in accessibility and clean architecture.",
      icon: Globe,
   },
   {
      title: "Modern UI/UX",
      description: "Bridging the gap between beautiful design and functional implementation.",
      icon: Code2,
   },
];

export function About({ personalInfo, projectsCount = 0 }: { personalInfo: any, projectsCount?: number }) {
   if (!personalInfo) return null;

   return (
      <section id="about" className="py-24 px-6 relative overflow-hidden">
         <div className="absolute inset-0 bg-muted/20 -z-10" />
         <div className="max-w-7xl mx-auto">
            <SectionHeader
               title="About Me"
               subtitle="Identity"
               description="A brief overview of who I am and what drives my passion for web development."
            />

            <div className="grid lg:grid-cols-2 gap-16 items-center">
               <AnimatedSection className="space-y-8">
                  <div className="relative group max-w-[300px] mx-auto lg:mx-0">
                     {/* Animated gradient glow */}
                     <div className="absolute -inset-3 bg-gradient-to-tr from-primary via-secondary to-primary rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-700 animate-spin-slow" />

                     {/* Rotating dashed ring accent */}
                     <div className="absolute -inset-5 rounded-full border-2 border-dashed border-primary/20 animate-spin-slow [animation-duration:20s]" />

                     <div className="relative rounded-full overflow-hidden border-[6px] border-background aspect-square shadow-2xl ring-1 ring-border bg-muted">
                        <Image
                           src={personalInfo.profileImage || "/samir-rain.jpg"}
                           alt={`${personalInfo.name}, Full Stack Developer from Janakpur, Nepal`}
                           fill
                           sizes="(max-width: 768px) 100vw, 33vw"
                           className="object-cover object-top group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Subtle inner shading for depth */}
                        <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5" />
                     </div>

                     {/* Live status chip */}
                     <div className="absolute bottom-3 right-3 flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-background border border-border shadow-lg z-10">
                        <span className="relative flex h-2.5 w-2.5">
                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                           <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-foreground">Available</span>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <h3 className="text-3xl font-black font-space-grotesk tracking-tight">
                        Hi, I'm <span className="text-gradient">{personalInfo.name}</span>.
                     </h3>
                     <p className="text-lg text-muted-foreground leading-relaxed">
                        {personalInfo.summary}
                     </p>

                     <div className="flex flex-wrap gap-4">
                        <Button asChild className="rounded-2xl px-8 h-12 font-bold btn-gradient border-none text-white">
                           <a href="/api/resume" target="_blank" rel="noopener noreferrer">
                              Download CV
                              <Download className="ml-2 h-4 w-4" />
                           </a>
                        </Button>
                     </div>

                     <div className="pt-4 flex flex-wrap gap-4">
                        <div className="px-6 py-4 rounded-2xl bg-background border border-border">
                           <p className="text-3xl font-black text-primary font-space-grotesk">{personalInfo.yearsOfExperience || "3+"}</p>
                           <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Years Exp</p>
                        </div>
                        <div className="px-6 py-4 rounded-2xl bg-background border border-border">
                           <p className="text-3xl font-black text-primary font-space-grotesk">{projectsCount > 0 ? `${projectsCount}+` : "0"}</p>
                           <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Projects</p>
                        </div>
                     </div>
                  </div>
               </AnimatedSection>

               <div className="grid sm:grid-cols-2 gap-6">
                  {strengths.map((item, i) => (
                     <AnimatedSection key={item.title} delay={i * 0.1}>
                        <div className="p-8 rounded-[2rem] bg-background border border-border hover:border-primary/50 transition-all hover:shadow-xl group h-full">
                           <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                              <item.icon size={28} />
                           </div>
                           <h4 className="text-xl font-black mb-2 font-space-grotesk uppercase tracking-tighter">{item.title}</h4>
                           <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                              {item.description}
                           </p>
                        </div>
                     </AnimatedSection>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
}
