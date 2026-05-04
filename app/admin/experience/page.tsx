"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash2, Briefcase, MapPin, Calendar, Edit3, X, Save } from "lucide-react";
import { DataTable, DataTableRow, DataTableCell } from "../_components/DataTable";

export default function ExperienceAdminPage() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    period: "",
    description: "",
    location: "",
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    const res = await fetch("/api/experience");
    const data = await res.json();
    setExperiences(data);
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      company: "",
      role: "",
      period: "",
      description: "",
      location: "",
    });
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleEdit = (exp: any) => {
    console.log("Editing experience:", exp);
    setEditingId(exp._id);
    setFormData({
      company: exp.company || "",
      role: exp.role || "",
      period: exp.period || "",
      description: exp.description || (exp.bullets ? exp.bullets.join("\n") : ""),
      location: exp.location || "",
    });
    setIsFormOpen(true);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.description) {
        toast.error("Description is required");
        return;
    }

    const method = editingId ? "PUT" : "POST";
    const payload = editingId ? { ...formData, id: editingId } : formData;

    try {
        const res = await fetch("/api/experience", {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          toast.success(editingId ? "Experience updated!" : "Experience added!");
          resetForm();
          fetchExperiences();
        } else {
          const err = await res.json();
          toast.error(err.error || "Something went wrong");
        }
    } catch (error) {
        toast.error("Failed to save experience");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this experience?")) return;
    const res = await fetch(`/api/experience?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Experience deleted");
      fetchExperiences();
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-space-grotesk tracking-tight">Work History</h1>
          <p className="text-muted-foreground mt-1">Manage your professional career timeline and achievements.</p>
        </div>
        {!isFormOpen && (
          <Button onClick={() => setIsFormOpen(true)} className="rounded-xl font-bold btn-gradient border-none h-11 text-white shadow-lg hover:shadow-primary/20 transition-all">
            <Plus size={18} className="mr-2" />
            Add Experience
          </Button>
        )}
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="p-10 rounded-[2.5rem] bg-background border border-border space-y-6 shadow-2xl animate-in fade-in slide-in-from-top-4 border-t-4 border-t-primary">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-black uppercase tracking-tight">
                {editingId ? "Edit Experience" : "New Experience Record"}
            </h2>
            <button type="button" onClick={resetForm} className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-all">
                <X size={20}/>
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Company Name</label>
              <Input 
                value={formData.company} 
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                placeholder="e.g. Google"
                className="rounded-xl h-12 border-2 focus:border-primary transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Job Role</label>
              <Input 
                value={formData.role} 
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                placeholder="e.g. Senior Frontend Developer"
                className="rounded-xl h-12 border-2 focus:border-primary transition-all"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Period</label>
              <Input 
                value={formData.period} 
                onChange={(e) => setFormData({...formData, period: e.target.value})}
                placeholder="e.g. Jan 2022 - Present"
                className="rounded-xl h-12 border-2 focus:border-primary transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Location</label>
              <Input 
                value={formData.location} 
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="e.g. Remote / New York"
                className="rounded-xl h-12 border-2 focus:border-primary transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Description / Bullet Points</label>
            <Textarea 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Detail your accomplishments. Use line breaks for separate bullets."
              className="rounded-2xl min-h-[160px] p-4 border-2 focus:border-primary transition-all font-medium leading-relaxed"
              required
            />
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-border/50">
            <Button type="button" variant="ghost" onClick={resetForm} className="rounded-xl px-8 h-12 font-bold">Cancel</Button>
            <Button type="submit" className="rounded-xl px-10 h-12 font-bold btn-gradient border-none text-white shadow-xl hover:shadow-primary/20 transition-all flex items-center gap-2">
              <Save size={18} />
              {editingId ? "Update Experience" : "Save Record"}
            </Button>
          </div>
        </form>
      )}

      <DataTable headers={["Role & Company", "Location", "Period", "Actions"]}>
        {experiences.length === 0 ? (
          <DataTableRow>
            <DataTableCell className="text-center py-12 text-muted-foreground italic" colSpan={4}>
              No experience records found. Click "Add Experience" to get started.
            </DataTableCell>
          </DataTableRow>
        ) : (
          experiences.map((exp) => (
            <DataTableRow key={exp._id}>
              <DataTableCell>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/10 shadow-inner">
                    <Briefcase size={22} />
                  </div>
                  <div>
                    <p className="font-black font-space-grotesk text-lg leading-tight tracking-tight">{exp.role}</p>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{exp.company}</p>
                  </div>
                </div>
              </DataTableCell>
              <DataTableCell>
                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                  <MapPin size={14} className="text-primary" />
                  {exp.location}
                </div>
              </DataTableCell>
              <DataTableCell>
                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                  <Calendar size={14} className="text-primary" />
                  {exp.period}
                </div>
              </DataTableCell>
              <DataTableCell>
                <div className="flex items-center gap-2">
                   <button onClick={() => handleEdit(exp)} className="p-3 rounded-xl bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20">
                     <Edit3 size={18} />
                   </button>
                   <button onClick={() => handleDelete(exp._id)} className="p-3 rounded-xl bg-muted text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all border border-transparent hover:border-destructive/20">
                     <Trash2 size={18} />
                   </button>
                </div>
              </DataTableCell>
            </DataTableRow>
          ))
        )}
      </DataTable>
    </div>
  );
}
