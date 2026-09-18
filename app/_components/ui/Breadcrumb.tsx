import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center flex-wrap gap-2 mb-10 text-[10px] font-black uppercase tracking-widest">
      <Link
        href="/"
        className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
      >
        <Home size={12} />
        Home
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <ChevronRight size={12} className="text-muted-foreground/40" />
          {item.href ? (
            <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground truncate max-w-[220px]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
