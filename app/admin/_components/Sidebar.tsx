"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  FolderOpen,
  Wrench,
  Settings,
  MessageSquare,
  GraduationCap,
  Sparkles,
  User,
  Award,
  Newspaper,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoutButton } from "./LogoutButton";

const sidebarLinks = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Personal Info", href: "/admin/personal", icon: User },
  { name: "Experience", href: "/admin/experience", icon: Briefcase },
  { name: "Projects", href: "/admin/projects", icon: FolderOpen },
  { name: "Blog", href: "/admin/blog", icon: Newspaper },
  { name: "Skills", href: "/admin/skills", icon: Wrench },
  { name: "Services", href: "/admin/services", icon: Sparkles },
  { name: "Education", href: "/admin/education", icon: GraduationCap },
  { name: "Certifications", href: "/admin/certifications", icon: Award },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
];

function Brand() {
  return (
    <Link href="/" className="text-xl font-bold font-space-grotesk tracking-tighter flex items-center gap-1 group">
      <span className="text-foreground transition-colors group-hover:text-primary uppercase">SAMIR</span>
      <span className="text-muted-foreground/30 font-black">.</span>
      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 ml-2 pt-1">Admin</span>
    </Link>
  );
}

function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 md:py-2 rounded-xl text-sm font-medium transition-all group relative",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <link.icon size={18} className={cn(
                "transition-colors",
                isActive ? "text-primary" : "group-hover:text-primary"
              )} />
              {link.name}
              {isActive && (
                <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border space-y-1">
        <Link
          href="/admin/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 md:py-2 rounded-xl text-sm font-medium transition-all",
            pathname === "/admin/settings" ? "bg-muted text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <Settings size={18} />
          Settings
        </Link>
        <LogoutButton />
      </div>
    </>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-background hidden md:flex flex-col sticky top-0 h-screen shrink-0">
      <div className="p-6 border-b border-border">
        <Brand />
      </div>
      <SidebarContent pathname={pathname} />
    </aside>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Lock page scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="p-2 -ml-2 rounded-xl text-foreground hover:bg-muted transition-colors"
      >
        <Menu size={22} />
      </button>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-background border-r border-border flex flex-col shadow-2xl transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        aria-hidden={!open}
      >
        <div className="h-16 px-6 border-b border-border flex items-center justify-between">
          <Brand />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="p-2 -mr-2 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        {/* Close the drawer when any link inside it is tapped */}
        <div
          className="flex-1 flex flex-col min-h-0"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) setOpen(false);
          }}
        >
          <SidebarContent pathname={pathname} />
        </div>
      </aside>
    </div>
  );
}
