import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, Home, Newspaper, FolderOpen } from "lucide-react";
import { Navbar } from "@/app/_components/layout/Navbar";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for doesn't exist or has been moved.",
  robots: { index: false, follow: true },
};

const quickLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Projects", href: "/projects", icon: FolderOpen },
  { name: "Blog", href: "/blog", icon: Newspaper },
];

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.03] mask-radial pointer-events-none" />

        <div className="max-w-xl w-full text-center space-y-8 relative z-10">
          <p className="text-[7rem] sm:text-[10rem] leading-none font-black font-space-grotesk tracking-tighter bg-gradient-to-br from-primary to-primary/30 bg-clip-text text-transparent select-none">
            404
          </p>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black font-space-grotesk tracking-tighter">
              Page not found
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg">
              The page you&apos;re looking for doesn&apos;t exist or may have been moved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl font-bold btn-gradient text-white shadow-lg hover:shadow-primary/20 transition-all"
            >
              <ArrowLeft size={18} />
              Back to Home
            </Link>
          </div>

          <div className="pt-6 border-t border-border/50">
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">
              Or try one of these
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                >
                  <link.icon size={16} />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
