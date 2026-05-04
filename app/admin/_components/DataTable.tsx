import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DataTableProps {
  headers: string[];
  children: ReactNode;
  className?: string;
}

export function DataTable({ headers, children, className }: DataTableProps) {
  return (
    <div className={cn("overflow-hidden rounded-[2rem] border border-border bg-background shadow-sm", className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              {headers.map((header) => (
                <th key={header} className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DataTableRow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <tr className={cn("hover:bg-muted/30 transition-colors group", className)}>
      {children}
    </tr>
  );
}

export function DataTableCell({ children, className, colSpan }: { children: ReactNode; className?: string; colSpan?: number }) {
  return (
    <td className={cn("px-6 py-4 text-sm font-medium", className)} colSpan={colSpan}>
      {children}
    </td>
  );
}
