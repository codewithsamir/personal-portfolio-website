"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { toast } from "sonner";
import { Lock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        toast.success("Welcome back, Samir!");
        router.push("/admin");
      } else {
        toast.error("Incorrect password.");
      }
    } catch (error) {
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-6">
      <div className="absolute inset-0 bg-grid opacity-[0.03] mask-radial" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full p-12 rounded-[2.5rem] bg-background border border-border shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center text-center space-y-6 mb-10">
          <div className="w-16 h-16 rounded-3xl bg-primary flex items-center justify-center text-white shadow-[0_0_30px_rgba(var(--primary),0.3)]">
            <Lock size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black font-space-grotesk tracking-tighter flex items-center justify-center gap-2">
              <span className="text-gradient">SAMIR.</span>ADMIN
            </h1>
            <p className="text-muted-foreground mt-2 font-medium">Please enter your master password to continue.</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold ml-1 uppercase tracking-widest text-muted-foreground">Master Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="rounded-2xl h-14 px-6 border-muted bg-muted/10 focus:bg-background transition-all text-center text-xl tracking-[0.5em]"
              required
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading} 
            className="w-full rounded-2xl h-14 text-lg font-bold btn-gradient border-none group"
          >
            {loading ? "Authenticating..." : "Unlock Dashboard"}
            <Sparkles size={20} className="ml-2 group-hover:rotate-12 transition-transform" />
          </Button>
        </form>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          Protected by Samir's Custom Security 🔒
        </p>
      </motion.div>
    </div>
  );
}
