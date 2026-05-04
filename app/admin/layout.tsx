import { headers } from "next/headers";
import { Sidebar } from "./_components/Sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const isLoginPage = headersList.get("x-is-login") === "true";

  // If it's the login page, don't wrap with sidebar/header
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 border-b border-border bg-background flex items-center justify-between px-8 sticky top-0 z-20">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Admin Console
          </h2>
          <div className="flex items-center gap-4">
             <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/20" />
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
