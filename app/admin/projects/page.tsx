"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { toast } from "sonner";
import { 
  Plus, 
  Trash2, 
  Globe, 
  Code2, 
  Settings, 
  Image as ImageIcon, 
  Upload, 
  Loader2, 
  X, 
  Star,
  Edit3
} from "lucide-react";
import { DataTable, DataTableRow, DataTableCell } from "../_components/DataTable";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    liveUrl: "",
    githubUrl: "",
    image: "",
    featured: false,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  };

  const handleEdit = (project: any) => {
    setEditingId(project._id);
    setFormData({
      title: project.title,
      description: project.description,
      techStack: project.techStack.join(", "),
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      image: project.image || "",
      featured: project.featured || false,
    });
    setIsAdding(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formDataUpload,
      });
      const data = await res.json();
      if (data.url) {
        setFormData({ ...formData, image: data.url });
        toast.success("Image uploaded!");
      } else {
        toast.error("Upload failed");
      }
    } catch (error) {
      toast.error("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const projectToSubmit = {
      ...formData,
      techStack: formData.techStack.split(",").map(t => t.trim()),
      slug: formData.title.toLowerCase().replace(/ /g, "-"),
    };

    const method = editingId ? "PUT" : "POST";
    const body = editingId ? { ...projectToSubmit, id: editingId } : projectToSubmit;

    const res = await fetch("/api/projects", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      toast.success(editingId ? "Project updated!" : "Project added!");
      setIsAdding(false);
      setEditingId(null);
      setFormData({ title: "", description: "", techStack: "", liveUrl: "", githubUrl: "", image: "", featured: false });
      fetchProjects();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Project deleted");
      fetchProjects();
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-space-grotesk">Projects</h1>
          <p className="text-muted-foreground mt-1">Showcase your best technical achievements.</p>
        </div>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)} className="rounded-xl font-bold btn-gradient border-none h-11 text-white">
            <Plus size={18} className="mr-2" />
            Add Project
          </Button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="p-10 rounded-[2.5rem] bg-background border border-border space-y-8 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{editingId ? "Edit Project" : "New Project"}</h2>
            <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-muted-foreground hover:text-foreground"><X size={20}/></button>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1 space-y-6">
               <div className="space-y-4">
                 <label className="text-sm font-bold ml-1 uppercase tracking-widest text-muted-foreground">Project Image</label>
                 <div className="relative aspect-video rounded-3xl bg-muted border-2 border-dashed border-border flex flex-col items-center justify-center overflow-hidden group">
                    {formData.image ? (
                      <>
                        <Image src={formData.image} alt="Preview" fill className="object-cover" />
                        <button 
                          type="button" 
                          onClick={() => setFormData({...formData, image: ""})}
                          className="absolute top-2 right-2 p-2 bg-background/80 backdrop-blur-md rounded-full text-destructive shadow-lg hover:bg-background transition-all"
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-3 p-8 text-center">
                         {uploading ? (
                           <Loader2 className="w-10 h-10 animate-spin text-primary" />
                         ) : (
                           <>
                             <ImageIcon size={24} className="text-muted-foreground" />
                             <label className="cursor-pointer">
                               <span className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2">
                                 <Upload size={14} /> Upload
                               </span>
                               <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                             </label>
                           </>
                         )}
                      </div>
                    )}
                 </div>
               </div>

               <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/50 border border-border">
                  <input 
                    type="checkbox" 
                    id="featured" 
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="w-5 h-5 accent-primary"
                  />
                  <label htmlFor="featured" className="text-sm font-bold cursor-pointer">
                    Featured on Landing Page
                  </label>
               </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1">Project Title</label>
                  <Input 
                    value={formData.title} 
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g. AI SaaS Platform"
                    className="rounded-xl h-12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1">Tech Stack</label>
                  <Input 
                    value={formData.techStack} 
                    onChange={(e) => setFormData({...formData, techStack: e.target.value})}
                    placeholder="Next.js, Tailwind, MongoDB"
                    className="rounded-xl h-12"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">Description</label>
                <Textarea 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Tell us about the project architecture..."
                  className="rounded-2xl min-h-[100px] p-4"
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1 text-xs">Live URL</label>
                  <Input 
                    value={formData.liveUrl} 
                    onChange={(e) => setFormData({...formData, liveUrl: e.target.value})}
                    placeholder="https://..."
                    className="rounded-xl h-10 text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1 text-xs">GitHub URL</label>
                  <Input 
                    value={formData.githubUrl} 
                    onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
                    placeholder="https://github.com/..."
                    className="rounded-xl h-10 text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-4 pt-6 border-t border-border/50">
            <Button type="button" variant="ghost" onClick={() => { setIsAdding(false); setEditingId(null); }} className="rounded-xl px-8 h-12">Cancel</Button>
            <Button type="submit" disabled={uploading} className="rounded-xl px-10 h-12 font-bold btn-gradient border-none text-white">
              {editingId ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </form>
      )}

      <DataTable headers={["Project", "Featured", "Tech Stack", "Actions"]}>
        {projects.length === 0 ? (
          <DataTableRow>
            <DataTableCell className="text-center py-12 text-muted-foreground italic" colSpan={4}>
              No projects created yet.
            </DataTableCell>
          </DataTableRow>
        ) : (
          projects.map((project) => (
            <DataTableRow key={project._id}>
              <DataTableCell>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-10 rounded-lg bg-muted border border-border relative overflow-hidden flex items-center justify-center">
                    {project.image ? (
                       <Image src={project.image} alt={project.title} fill className="object-cover" />
                    ) : (
                       <ImageIcon size={14} className="text-muted-foreground/30" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold font-space-grotesk text-md leading-none">{project.title}</p>
                    <p className="text-[10px] text-muted-foreground mt-1.5 truncate max-w-[150px]">{project.description}</p>
                  </div>
                </div>
              </DataTableCell>
              <DataTableCell>
                 {project.featured ? (
                   <span className="flex items-center gap-1 text-xs font-bold text-primary">
                     <Star size={14} fill="currentColor" /> Featured
                   </span>
                 ) : (
                   <span className="text-xs text-muted-foreground">Standard</span>
                 )}
              </DataTableCell>
              <DataTableCell>
                <div className="flex flex-wrap gap-2 max-w-[200px]">
                  {project.techStack.map((t: string) => (
                    <span key={t} className="px-2 py-0.5 rounded-lg bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest">
                      {t}
                    </span>
                  ))}
                </div>
              </DataTableCell>
              <DataTableCell>
                <div className="flex items-center gap-2">
                   <button onClick={() => handleEdit(project)} className="p-2 text-muted-foreground hover:text-primary transition-colors"><Edit3 size={18} /></button>
                   <button onClick={() => handleDelete(project._id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={18} /></button>
                </div>
              </DataTableCell>
            </DataTableRow>
          ))
        )}
      </DataTable>
    </div>
  );
}
