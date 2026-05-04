"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { toast } from "sonner";
import { Palette, Save, RotateCcw, Monitor, Moon, Sun, History, Star } from "lucide-react";

export default function SettingsPage() {
  const [theme, setTheme] = useState<any>({
    primaryColor: "#0ea5e9",
    accentColor: "#8b5cf6",
    borderRadius: "1rem",
    fontFamily: "Space Grotesk",
    darkMode: true,
    history: []
  });
  const [loading, setLoading] = useState(true);

  const presets = [
    { name: "Classic Deep Space", primary: "#0ea5e9", accent: "#8b5cf6" },
    { name: "Midnight Purple", primary: "#7c3aed", accent: "#db2777" },
    { name: "Emerald Knight", primary: "#10b981", accent: "#064e3b" },
    { name: "Sunset Gold", primary: "#f59e0b", accent: "#ef4444" },
    { name: "Arctic Ice", primary: "#06b6d4", accent: "#3b82f6" },
  ];

  useEffect(() => {
    fetchTheme();
  }, []);

  const fetchTheme = async () => {
    const res = await fetch("/api/theme");
    const data = await res.json();
    if (data && !data.error) {
      setTheme(data);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    const res = await fetch("/api/theme", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(theme),
    });
    if (res.ok) {
      toast.success("Theme settings updated!");
      fetchTheme(); // Refresh to see updated history
    }
  };

  const applyPreset = (primary: string, accent: string) => {
    setTheme({ ...theme, primaryColor: primary, accentColor: accent });
    toast.info("Applied theme combo. Click Save to persist.");
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="max-w-5xl space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold font-space-grotesk">Settings</h1>
        <p className="text-muted-foreground mt-1">Customize your portfolio's global appearance and behavior.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Brand Colors */}
                <div className="p-8 rounded-[2.5rem] bg-background border border-border space-y-6 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="flex items-center gap-3 text-primary font-bold">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Palette size={20} />
                    </div>
                    <h3 className="text-xl font-space-grotesk">Brand Colors</h3>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground/50 ml-1">Primary</label>
                        <div className="flex gap-4">
                        <Input 
                            type="color" 
                            value={theme.primaryColor} 
                            onChange={(e) => setTheme({...theme, primaryColor: e.target.value})}
                            className="w-16 h-12 p-1 rounded-xl cursor-pointer border-none"
                        />
                        <Input 
                            value={theme.primaryColor} 
                            onChange={(e) => setTheme({...theme, primaryColor: e.target.value})}
                            className="flex-1 rounded-xl h-12 font-mono text-xs uppercase"
                        />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground/50 ml-1">Accent</label>
                        <div className="flex gap-4">
                        <Input 
                            type="color" 
                            value={theme.accentColor} 
                            onChange={(e) => setTheme({...theme, accentColor: e.target.value})}
                            className="w-16 h-12 p-1 rounded-xl cursor-pointer border-none"
                        />
                        <Input 
                            value={theme.accentColor} 
                            onChange={(e) => setTheme({...theme, accentColor: e.target.value})}
                            className="flex-1 rounded-xl h-12 font-mono text-xs uppercase"
                        />
                        </div>
                    </div>
                </div>
                </div>

                {/* Global Styles */}
                <div className="p-8 rounded-[2.5rem] bg-background border border-border space-y-6 shadow-xl">
                <div className="flex items-center gap-3 text-primary font-bold">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Monitor size={20} />
                    </div>
                    <h3 className="text-xl font-space-grotesk">Typography</h3>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground/50 ml-1">Border Radius</label>
                        <select 
                        value={theme.borderRadius}
                        onChange={(e) => setTheme({...theme, borderRadius: e.target.value})}
                        className="w-full h-12 rounded-xl bg-background border border-input px-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none transition-all"
                        >
                        <option value="0">Sharp Edges</option>
                        <option value="0.5rem">Modern (8px)</option>
                        <option value="1rem">Premium (16px)</option>
                        <option value="2rem">Extra Round (32px)</option>
                        <option value="9999px">Pill Style</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground/50 ml-1">Font Family</label>
                        <select 
                        value={theme.fontFamily}
                        onChange={(e) => setTheme({...theme, fontFamily: e.target.value})}
                        className="w-full h-12 rounded-xl bg-background border border-input px-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none transition-all"
                        >
                        <option value="Inter">Inter (Clean)</option>
                        <option value="Space Grotesk">Space Grotesk (Modern)</option>
                        <option value="Outfit">Outfit (Friendly)</option>
                        <option value="Plus Jakarta Sans">Plus Jakarta Sans (Corporate)</option>
                        </select>
                    </div>
                </div>
                </div>
            </div>

            {/* Presets */}
            <div className="p-8 rounded-[2.5rem] bg-background border border-border space-y-6 shadow-xl">
                <div className="flex items-center gap-3 text-primary font-bold">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Star size={20} />
                    </div>
                    <h3 className="text-xl font-space-grotesk">Official Presets</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {presets.map((p) => (
                        <button 
                            key={p.name}
                            onClick={() => applyPreset(p.primary, p.accent)}
                            className="p-4 rounded-2xl border border-border hover:border-primary transition-all text-left space-y-2 group"
                        >
                            <div className="flex gap-1 h-2 rounded-full overflow-hidden">
                                <div className="flex-1" style={{ background: p.primary }} />
                                <div className="flex-1" style={{ background: p.accent }} />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-tighter truncate group-hover:text-primary">{p.name}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* History / Saved */}
        <div className="lg:col-span-1 p-8 rounded-[2.5rem] bg-background border border-border space-y-6 shadow-xl flex flex-col h-full">
            <div className="flex items-center gap-3 text-primary font-bold">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <History size={20} />
                </div>
                <h3 className="text-xl font-space-grotesk">Color History</h3>
            </div>
            
            <div className="flex-1 space-y-3 overflow-y-auto max-h-[600px] pr-2">
                {theme.history && theme.history.length > 0 ? (
                    theme.history.slice().reverse().map((h: any, idx: number) => (
                        <button 
                            key={idx}
                            onClick={() => applyPreset(h.primaryColor, h.accentColor)}
                            className="w-full p-4 rounded-2xl bg-muted/30 border border-transparent hover:border-primary transition-all flex items-center gap-4 group"
                        >
                            <div className="w-10 h-10 rounded-xl flex flex-col overflow-hidden rotate-45 scale-75 group-hover:rotate-0 group-hover:scale-100 transition-all">
                                <div className="flex-1" style={{ background: h.primaryColor }} />
                                <div className="flex-1" style={{ background: h.accentColor }} />
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] font-bold text-muted-foreground">{new Date(h.timestamp).toLocaleDateString()}</p>
                                <p className="text-xs font-black uppercase tracking-widest">{h.primaryColor}</p>
                            </div>
                        </button>
                    ))
                ) : (
                    <div className="text-center py-10 opacity-30 italic text-sm">
                        No history yet. Your choices will appear here!
                    </div>
                )}
            </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-8 border-t border-border/50">
        <Button variant="outline" onClick={() => {
            applyPreset("#0ea5e9", "#8b5cf6");
            toast.info("Restored original vibes. Click save to apply.");
        }} className="rounded-xl h-12 px-6 flex items-center gap-2 border-dashed border-2 border-muted-foreground/30 hover:border-primary/50 transition-all font-bold">
          <RotateCcw size={18} /> Reset to Defaults
        </Button>

        <div className="flex gap-4">
            <Button variant="ghost" onClick={fetchTheme} className="rounded-xl h-12 px-8 font-bold">
                Discard
            </Button>
            <Button onClick={handleSave} className="rounded-xl h-12 px-12 font-bold btn-gradient border-none text-white shadow-xl flex items-center gap-2">
                <Save size={18} /> Save Settings
            </Button>
        </div>
      </div>
    </div>
  );
}
