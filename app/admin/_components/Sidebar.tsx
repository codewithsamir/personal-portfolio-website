"use client";

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
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoutButton } from "./LogoutButton";

const sidebarLinks = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Personal Info", href: "/admin/personal", icon: User },
  { name: "Experience", href: "/admin/experience", icon: Briefcase },
  { name: "Projects", href: "/admin/projects", icon: FolderOpen },
  { name: "Skills", href: "/admin/skills", icon: Wrench },
  { name: "Services", href: "/admin/services", icon: Sparkles },
  { name: "Education", href: "/admin/education", icon: GraduationCap },
  { name: "Certifications", href: "/admin/certifications", icon: Award },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-background hidden md:flex flex-col sticky top-0 h-screen">
      <div className="p-6 border-b border-border">
        <Link href="/" className="text-xl font-bold font-space-grotesk tracking-tighter flex items-center gap-1 group">
          <span className="text-foreground transition-colors group-hover:text-primary uppercase">SAMIR</span>
          <span className="text-muted-foreground/30 font-black">.</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 ml-2 pt-1">Admin</span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all group relative",
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
            "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all",
            pathname === "/admin/settings" ? "bg-muted text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <Settings size={18} />
          Settings
        </Link>
        <LogoutButton />
      </div>
    </aside>
  );
}
