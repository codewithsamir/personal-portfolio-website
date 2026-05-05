import { headers } from "next/headers";
import { Sidebar } from "./_components/Sidebar";
import PersonalInfo from "@/models/PersonalInfo";
import dbConnect from "@/lib/mongodb";
import Image from "next/image";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const isLoginPage = headersList.get("x-is-login") === "true";

  await dbConnect();
  const info = await PersonalInfo.findOne().lean();

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
             <div className="flex items-center gap-3">
               <span className="text-xs font-bold text-muted-foreground hidden sm:block">{(info as any)?.name || "Admin"}</span>
               <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 relative overflow-hidden">
                 {(info as any)?.profileImage ? (
                    <Image src={(info as any).profileImage} alt="Admin" fill className="object-cover" />
                 ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-primary uppercase">
                      {(info as any)?.name?.charAt(0) || "A"}
                    </div>
                 )}
               </div>
             </div>
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
