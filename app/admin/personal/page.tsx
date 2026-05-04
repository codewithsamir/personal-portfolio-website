"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function PersonalInfoPage() {
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/personal")
      .then((res) => res.json())
      .then((data) => {
        setInfo(data);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/personal", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      });
      if (res.ok) {
        toast.success("Personal information updated!");
      }
    } catch (error) {
      toast.error("Failed to update.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-space-grotesk">Personal Info</h1>
        <p className="text-muted-foreground mt-1">Manage your identity and branding.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-8 rounded-[2rem] bg-background border border-border space-y-6 shadow-sm">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">Full Name</label>
              <Input 
                value={info?.name || ""} 
                onChange={(e) => setInfo({...info, name: e.target.value})}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">Tagline</label>
              <Input 
                value={info?.tagline || ""} 
                onChange={(e) => setInfo({...info, tagline: e.target.value})}
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold ml-1">Bio Summary</label>
            <Textarea 
              value={info?.summary || ""} 
              onChange={(e) => setInfo({...info, summary: e.target.value})}
              className="rounded-2xl min-h-[120px]"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">Email</label>
              <Input 
                value={info?.email || ""} 
                onChange={(e) => setInfo({...info, email: e.target.value})}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">Phone</label>
              <Input 
                value={info?.phone || ""} 
                onChange={(e) => setInfo({...info, phone: e.target.value})}
                className="rounded-xl"
              />
            </div>
             <div className="space-y-2">
              <label className="text-sm font-bold ml-1">WhatsApp URL</label>
              <Input 
                value={info?.whatsapp || ""} 
                onChange={(e) => setInfo({...info, whatsapp: e.target.value})}
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold ml-1">Resume Link</label>
            <Input 
              value={info?.resume || ""} 
              onChange={(e) => setInfo({...info, resume: e.target.value})}
              className="rounded-xl"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving} className="rounded-xl px-8 h-12 font-bold group">
            {saving ? "Saving..." : "Save Changes"}
            <Save size={18} className="ml-2 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </form>
    </div>
  );
}
