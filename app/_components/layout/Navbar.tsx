"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "../ui/ThemeToggle";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Services", href: "#services" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6",
        isScrolled ? "py-4" : "py-8"
      )}
    >
      <div className={cn(
        "max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 py-3 rounded-full transition-all duration-700 border border-transparent",
        isScrolled ? "bg-background/80 backdrop-blur-xl shadow-lg border-border" : "bg-background/10 backdrop-blur-md"
      )}>
        <Link
          href="/"
          className="flex items-center gap-2 group"
        >
          <div className="relative w-10 h-10 overflow-hidden">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" 
            />
          </div>
          <span className="text-xl font-bold font-space-grotesk tracking-tighter text-foreground transition-colors group-hover:text-primary uppercase">SAMIR</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground transition-all hover:text-foreground relative group whitespace-nowrap"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="h-4 w-[1px] bg-border mx-1" />
          <ThemeToggle />
          <Button asChild size="sm" className="rounded-full px-5 font-bold btn-gradient border-none h-10 text-white text-[10px] uppercase tracking-widest shadow-lg whitespace-nowrap">
            <Link href="#contact">Talk to me</Link>
          </Button>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex lg:hidden items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="lg:hidden bg-background/95 backdrop-blur-2xl mt-4 rounded-[2rem] overflow-hidden border border-border shadow-2xl p-8"
          >
            <ul className="flex flex-col gap-8 text-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-bold font-space-grotesk block text-muted-foreground hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <Button asChild className="w-full rounded-full font-bold py-7 text-lg btn-gradient border-none text-white">
                  <Link href="#contact" onClick={() => setMobileMenuOpen(false)}>Talk to me</Link>
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
