"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Send, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

export function Hero({ personalInfo }: { personalInfo: any }) {
  if (!personalInfo) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-background">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--primary)/0.05,transparent_70%)]" />
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-1000" />

        {/* Animated Orbits */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/5 rounded-full animate-spin-slow opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-secondary/5 rounded-full animate-reverse-spin opacity-20" />
      </div>

      <div className="container px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          <div className="flex flex-col items-center gap-6">


            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass border border-primary/20"
            >
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Available for Strategic Roles</span>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-9xl lg:text-[11rem] font-black font-space-grotesk tracking-tighter leading-[0.8] text-foreground"
            >
              {personalInfo.name.split(" ").map((word: string, i: number) => (
                <span key={i} className={i === 1 ? "text-gradient block" : "block"}>
                  {word}
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-3xl text-muted-foreground font-medium tracking-tight leading-relaxed max-w-3xl mx-auto"
            >
              A <span className="text-foreground font-black underline decoration-primary/30 decoration-4 underline-offset-8">{personalInfo.role}</span> with {personalInfo.yearsOfExperience} years of experience.
              Mentor to <span className="text-primary font-bold">{personalInfo.learnerCount} developers</span>.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-6"
          >
            <Button asChild size="lg" className="rounded-2xl px-12 h-16 text-lg font-black uppercase tracking-widest btn-gradient border-none text-white shadow-2xl hover:scale-105 transition-all">
              <Link href="#projects">
                Explore Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-2xl px-12 h-16 text-lg font-black uppercase tracking-widest border-2 hover:bg-muted/50 transition-all backdrop-blur-md">
              <a href={personalInfo.resume} target="_blank">
                Curriculum Vitae
                <Download className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>

          {/* Social Proof / Tech Stack Marquee vibe */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4 pt-16 opacity-40 hover:opacity-100 transition-opacity duration-700"
          >
            {["React", "Next.js", "Django", "Node.js", "PostgreSQL", "MongoDB", "AI/LLM"].map((tech, i) => (
              <span
                key={tech}
                className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 border border-border rounded-lg"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Modern Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[2px] h-12 bg-linear-to-b from-primary to-transparent rounded-full opacity-50"
      />
    </section>
  );
}
