"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash2, Sparkles, Code, Layout, Link as LinkIcon, Smartphone, Database } from "lucide-react";

const availableIcons = [
  { name: "Code", icon: Code },
  { name: "Layout", icon: Layout },
  { name: "Link", icon: LinkIcon },
  { name: "Smartphone", icon: Smartphone },
  { name: "Database", icon: Database },
];

export default function ServicesAdminPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    icon: "Code",
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const res = await fetch("/api/services");
    const data = await res.json();
    setServices(data);
    setLoading(false);
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newService),
    });

    if (res.ok) {
      toast.success("Service added!");
      setIsAdding(false);
      setNewService({ title: "", description: "", icon: "Code" });
      fetchServices();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    const res = await fetch(`/api/services?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Service deleted");
      fetchServices();
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-space-grotesk">Services</h1>
          <p className="text-muted-foreground mt-1">Define what you offer to clients.</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} className="rounded-xl font-bold">
          <Plus size={18} className="mr-2" />
          Add Service
        </Button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddService} className="p-8 rounded-[2rem] bg-background border border-border space-y-6 shadow-xl animate-in fade-in slide-in-from-top-4">
          <div className="space-y-2">
            <label className="text-sm font-bold">Service Title</label>
            <Input 
              value={newService.title} 
              onChange={(e) => setNewService({...newService, title: e.target.value})}
              placeholder="e.g. Web Development"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold">Select Icon</label>
            <div className="flex flex-wrap gap-4">
               {availableIcons.map((item) => (
                 <button
                   key={item.name}
                   type="button"
                   onClick={() => setNewService({...newService, icon: item.name})}
                   className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                     newService.icon === item.name ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/50"
                   }`}
                 >
                   <item.icon size={24} />
                   <span className="text-[10px] font-bold uppercase">{item.name}</span>
                 </button>
               ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold">Description</label>
            <Textarea 
              value={newService.description} 
              onChange={(e) => setNewService({...newService, description: e.target.value})}
              placeholder="Explain the value you provide..."
              className="min-h-[120px]"
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
            <Button type="submit" className="px-8 font-bold">Create Service</Button>
          </div>
        </form>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service._id} className="p-8 rounded-[2.5rem] bg-background border border-border hover:border-primary/30 transition-all group flex flex-col items-start gap-6">
            <div className="flex justify-between w-full items-start">
               <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                 <Sparkles size={24} />
               </div>
               <button onClick={() => handleDelete(service._id)} className="p-2 text-muted-foreground hover:text-destructive">
                 <Trash2 size={18} />
               </button>
            </div>
            <div>
              <h3 className="text-xl font-bold font-space-grotesk mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
