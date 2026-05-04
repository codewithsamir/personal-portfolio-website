import Link from "next/link";
import { Code2, Globe, Send } from "lucide-react";

export function Footer({ personalInfo }: { personalInfo: any }) {
  const currentYear = new Date().getFullYear();

  if (!personalInfo) return null;

  return (
    <footer className="bg-background border-t border-border pt-24 pb-12 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        
        <div className="grid md:grid-cols-12 gap-12 md:gap-20">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="text-3xl font-black font-space-grotesk tracking-tighter group flex items-center gap-1">
              <span className="text-foreground transition-colors group-hover:text-primary uppercase">SAMIR</span>
              <span className="text-muted-foreground/30 font-black">.</span>
            </Link>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-sm">
              Designing and developing intentional digital experiences that bridge the gap between complexity and clarity.
            </p>
          </div>

          {/* Quick Links / Sitemap */}
          <div className="md:col-span-3 space-y-6">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Navigation</p>
            <ul className="space-y-4">
              {['About', 'Experience', 'Projects', 'Services', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase()}`} className="text-sm font-bold hover:text-primary transition-colors uppercase tracking-widest text-muted-foreground/60">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-4 space-y-6">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Inquiries</p>
            <Link href={`mailto:${personalInfo.email}`} className="text-xl md:text-2xl font-bold font-space-grotesk hover:text-primary transition-all block">
              {personalInfo.email}
            </Link>
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Currently based in {personalInfo.location} 🇳🇵
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-8">
            <Link href={personalInfo.socials.github} target="_blank" className="text-muted-foreground hover:text-primary transition-all group">
              <Code2 size={20} />
            </Link>
            <Link href={personalInfo.socials.linkedin} target="_blank" className="text-muted-foreground hover:text-primary transition-all group">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </Link>
            <Link href={personalInfo.socials.twitter} target="_blank" className="text-muted-foreground hover:text-primary transition-all group">
              <Send size={20} />
            </Link>
          </div>
          
          <div className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em] flex flex-col md:flex-row items-center gap-4">
            <span>© {currentYear} Samir Rain</span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-muted-foreground/20" />
            <span>Built with Intention & precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
