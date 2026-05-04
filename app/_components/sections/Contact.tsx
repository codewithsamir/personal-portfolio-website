"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SectionHeader } from "../ui/SectionHeader";
import { AnimatedSection } from "../ui/AnimatedSection";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Mail, Send, Code2, Globe } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function Contact({ personalInfo }: { personalInfo: any }) {
  if (!personalInfo) return null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Message sent successfully! I'll get back to you soon.");
        reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden bg-background">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-20">
          
          {/* Editorial Column */}
          <div className="lg:col-span-5 space-y-12">
            <AnimatedSection>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                  <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                  Available for new projects
                </div>
                <h2 className="text-5xl md:text-7xl font-black font-space-grotesk tracking-tighter leading-[0.9]">
                  Let's craft <br/>
                  <span className="text-muted-foreground/30 italic">something</span> <br/>
                  extraordinary.
                </h2>
                <p className="text-xl text-muted-foreground/80 leading-relaxed max-w-md">
                  Whether you're starting a new venture or scaling an existing product, I'm here to help you bridge the gap between vision and reality.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="space-y-8">
              <div className="group">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-4">Direct Contact</p>
                <Link 
                  href={`mailto:${personalInfo.email}`} 
                  className="text-2xl md:text-3xl font-bold font-space-grotesk hover:text-primary transition-all flex items-center gap-4 group/link"
                >
                  {personalInfo.email}
                  <Send size={24} className="opacity-0 -translate-x-4 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-primary" />
                </Link>
              </div>

              <div className="pt-8 border-t border-border/50">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-4">Social Presence</p>
                <div className="flex gap-6">
                  {[
                    { icon: Code2, label: "GitHub", href: personalInfo.socials.github },
                    { icon: Globe, label: "LinkedIn", href: personalInfo.socials.linkedin },
                    { icon: Send, label: "Twitter", href: personalInfo.socials.twitter }
                  ].map((social, i) => (
                    <Link
                      key={i}
                      href={social.href}
                      target="_blank"
                      className="group flex flex-col items-center gap-2"
                    >
                      <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-500">
                        <social.icon size={18} />
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">{social.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-muted/30 border border-border/50 space-y-2">
                <p className="text-xs font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  Response Promise
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  I typically respond to all inquiries within 12-24 hours. Your time is valuable, and I treat it with respect.
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <AnimatedSection delay={0.2} className="relative">
              <div className="absolute inset-0 bg-primary/5 blur-[80px] -z-10 rounded-full translate-y-12" />
              <div className="p-10 md:p-14 rounded-[3rem] bg-background/50 backdrop-blur-sm border border-border shadow-2xl relative overflow-hidden">
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/50 to-transparent" />
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Your Name</label>
                      <Input
                        {...register("name")}
                        placeholder="e.g. Samir Rain"
                        className="rounded-2xl h-14 px-6 border-none bg-muted/50 focus:bg-muted transition-all font-medium placeholder:text-muted-foreground/30"
                      />
                      {errors.name && <p className="text-[10px] font-bold text-destructive ml-1">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Email Address</label>
                      <Input
                        {...register("email")}
                        placeholder="hello@example.com"
                        className="rounded-2xl h-14 px-6 border-none bg-muted/50 focus:bg-muted transition-all font-medium placeholder:text-muted-foreground/30"
                      />
                      {errors.email && <p className="text-[10px] font-bold text-destructive ml-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">The Topic</label>
                    <Input
                      {...register("subject")}
                      placeholder="What should we talk about?"
                      className="rounded-2xl h-14 px-6 border-none bg-muted/50 focus:bg-muted transition-all font-medium placeholder:text-muted-foreground/30"
                    />
                    {errors.subject && <p className="text-[10px] font-bold text-destructive ml-1">{errors.subject.message}</p>}
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Detailed Message</label>
                    <Textarea
                      {...register("message")}
                      placeholder="Tell me about your vision, timeline, and goals..."
                      className="rounded-[2rem] min-h-[180px] p-7 border-none bg-muted/50 focus:bg-muted transition-all font-medium leading-relaxed placeholder:text-muted-foreground/30"
                    />
                    {errors.message && <p className="text-[10px] font-bold text-destructive ml-1">{errors.message.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-2xl h-16 text-sm font-black uppercase tracking-[0.2em] btn-gradient border-none text-white shadow-2xl hover:shadow-primary/20 transition-all group overflow-hidden relative"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isSubmitting ? "Dispatching..." : "Initialize Conversation"}
                      {!isSubmitting && <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
                    </span>
                  </Button>

                  <p className="text-center text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest pt-4">
                    SECURE END-TO-END COMMUNICATION
                  </p>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
