"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { toast } from "sonner";
import { Plus, Trash2, GraduationCap, MapPin, Calendar, Edit3, X, Save } from "lucide-react";
import { DataTable, DataTableRow, DataTableCell } from "../_components/DataTable";

export default function EducationAdminPage() {
  const [education, setEducation] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    period: "",
    location: "",
  });

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    const res = await fetch("/api/education");
    const data = await res.json();
    setEducation(data);
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      institution: "",
      degree: "",
      period: "",
      location: "",
    });
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleEdit = (edu: any) => {
    setEditingId(edu._id);
    setFormData({
      institution: edu.institution || "",
      degree: edu.degree || "",
      period: edu.period || "",
      location: edu.location || "",
    });
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const method = editingId ? "PUT" : "POST";
    const payload = editingId ? { ...formData, id: editingId } : formData;

    try {
        const res = await fetch("/api/education", {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          toast.success(editingId ? "Education updated!" : "Education added!");
          resetForm();
          fetchEducation();
        } else {
          const err = await res.json();
          toast.error(err.error || "Something went wrong");
        }
    } catch (error) {
        toast.error("Failed to save education");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this education record?")) return;
    const res = await fetch(`/api/education?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Education record deleted");
      fetchEducation();
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
          <h1 className="text-3xl font-bold font-space-grotesk tracking-tight">Education</h1>
          <p className="text-muted-foreground mt-1">Manage your academic background and certifications.</p>
        </div>
        {!isFormOpen && (
          <Button onClick={() => setIsFormOpen(true)} className="rounded-xl font-bold btn-gradient border-none h-11 text-white shadow-lg hover:shadow-primary/20 transition-all">
            <Plus size={18} className="mr-2" />
            Add Education
          </Button>
        )}
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="p-10 rounded-[2.5rem] bg-background border border-border space-y-6 shadow-2xl animate-in fade-in slide-in-from-top-4 border-t-4 border-t-primary">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-black uppercase tracking-tight">
                {editingId ? "Edit Education" : "New Academic Record"}
            </h2>
            <button type="button" onClick={resetForm} className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-all">
                <X size={20}/>
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Institution</label>
              <Input 
                value={formData.institution} 
                onChange={(e) => setFormData({...formData, institution: e.target.value})}
                placeholder="e.g. Tribhuvan University"
                className="rounded-xl h-12 border-2 focus:border-primary transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Degree / Course</label>
              <Input 
                value={formData.degree} 
                onChange={(e) => setFormData({...formData, degree: e.target.value})}
                placeholder="e.g. B.Sc. CSIT"
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
                placeholder="e.g. 2018 - 2022"
                className="rounded-xl h-12 border-2 focus:border-primary transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Location</label>
              <Input 
                value={formData.location} 
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="e.g. Kathmandu, Nepal"
                className="rounded-xl h-12 border-2 focus:border-primary transition-all"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-border/50">
            <Button type="button" variant="ghost" onClick={resetForm} className="rounded-xl px-8 h-12 font-bold">Cancel</Button>
            <Button type="submit" className="rounded-xl px-10 h-12 font-bold btn-gradient border-none text-white shadow-xl hover:shadow-primary/20 transition-all flex items-center gap-2">
              <Save size={18} />
              {editingId ? "Update Education" : "Save Record"}
            </Button>
          </div>
        </form>
      )}

      <DataTable headers={["Degree & Institution", "Location", "Period", "Actions"]}>
        {education.length === 0 ? (
          <DataTableRow>
            <DataTableCell className="text-center py-12 text-muted-foreground italic" colSpan={4}>
              No education records found. Click "Add Education" to get started.
            </DataTableCell>
          </DataTableRow>
        ) : (
          education.map((edu) => (
            <DataTableRow key={edu._id}>
              <DataTableCell>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/10 shadow-inner">
                    <GraduationCap size={22} />
                  </div>
                  <div>
                    <p className="font-black font-space-grotesk text-lg leading-tight tracking-tight">{edu.degree}</p>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{edu.institution}</p>
                  </div>
                </div>
              </DataTableCell>
              <DataTableCell>
                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                  <MapPin size={14} className="text-primary" />
                  {edu.location}
                </div>
              </DataTableCell>
              <DataTableCell>
                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                  <Calendar size={14} className="text-primary" />
                  {edu.period}
                </div>
              </DataTableCell>
              <DataTableCell>
                <div className="flex items-center gap-2">
                   <button onClick={() => handleEdit(edu)} className="p-3 rounded-xl bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20">
                     <Edit3 size={18} />
                   </button>
                   <button onClick={() => handleDelete(edu._id)} className="p-3 rounded-xl bg-muted text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all border border-transparent hover:border-destructive/20">
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
