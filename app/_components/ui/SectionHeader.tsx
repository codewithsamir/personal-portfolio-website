"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-20 space-y-4",
        align === "center" ? "text-center mx-auto max-w-3xl" : "text-left",
        className
      )}
    >
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]"
        >
          {subtitle}
        </motion.span>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-6xl font-black font-space-grotesk tracking-tight leading-[0.95]"
      >
        {title.split(" ").map((word, i) => (
          <span key={i} className={i % 2 !== 0 ? "text-gradient" : ""}>
            {word}{" "}
          </span>
        ))}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-muted-foreground leading-relaxed font-medium"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
