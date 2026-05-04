"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        toast.success("Logged out successfully");
        router.refresh();
        router.push("/admin");
      }
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-all"
    >
      <LogOut size={18} />
      Logout
    </button>
  );
}
