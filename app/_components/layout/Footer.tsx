import Link from "next/link";
import { Code2, Globe, Send, Camera, Play, MessageCircle } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export function Footer({ personalInfo }: { personalInfo: any }) {
  const currentYear = new Date().getFullYear();

  if (!personalInfo) return null;

  const socialIcons: { [key: string]: any } = {
    github: FaGithub,
    linkedin: FaLinkedin,
    twitter: FaXTwitter,
    instagram: FaInstagram,
    facebook: FaFacebook,
    youtube: FaYoutube,
  };

  // Default navigation if no custom links provided
  const navigationLinks = personalInfo.footerLinks?.length > 0 
    ? personalInfo.footerLinks 
    : [
        { label: 'About', href: '#about' },
        { label: 'Experience', href: '#experience' },
        { label: 'Projects', href: '#projects' },
        { label: 'Services', href: '#services' }
      ];

  return (
    <footer className="bg-background border-t border-border pt-24 pb-12 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        
        <div className="grid md:grid-cols-12 gap-12 md:gap-20">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="text-3xl font-black font-space-grotesk tracking-tighter group flex items-center gap-1">
              <span className="text-foreground transition-colors group-hover:text-primary uppercase">{personalInfo.name.split(' ')[0]}</span>
              <span className="text-muted-foreground/30 font-black">.</span>
            </Link>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-sm">
              {personalInfo.footerDescription || "Designing and developing intentional digital experiences that bridge the gap between complexity and clarity."}
            </p>
          </div>

          {/* Quick Links / Sitemap */}
          <div className="md:col-span-3 space-y-6">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Navigation</p>
            <ul className="space-y-4">
              {navigationLinks.map((item: any) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm font-bold hover:text-primary transition-colors uppercase tracking-widest text-muted-foreground/60">
                    {item.label}
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
          <div className="flex flex-wrap gap-8">
            {Object.entries(personalInfo.socials || {}).map(([platform, url]) => {
              if (!url) return null;
              const Icon = socialIcons[platform] || Globe;
              return (
                <Link key={platform} href={url as string} target="_blank" className="text-muted-foreground hover:text-primary transition-all group">
                  <Icon size={20} />
                </Link>
              );
            })}
          </div>
          
          <div className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em] flex flex-col md:flex-row items-center gap-4">
            <span>© {currentYear} {personalInfo.name}</span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-muted-foreground/20" />
            <span>Built with Intention & precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
