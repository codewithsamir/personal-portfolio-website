"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { toast } from "sonner";
import { Plus, Trash2, Wrench, ChevronRight, Edit3, X } from "lucide-react";

export default function SkillsAdminPage() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    category: "",
    items: [{ name: "", level: 80 }],
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const res = await fetch("/api/skills");
    const data = await res.json();
    setSkills(data);
    setLoading(false);
  };

  const handleEdit = (cat: any) => {
    setEditingId(cat._id);
    setFormData({
      category: cat.category,
      items: cat.items.map((i: any) => ({ name: i.name, level: i.level })),
    });
    setIsAdding(true);
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: "", level: 80 }],
    });
  };

  const handleRemoveItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const body = editingId ? { ...formData, id: editingId } : formData;

    const res = await fetch("/api/skills", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      toast.success(editingId ? "Category updated!" : "Skill category added!");
      setIsAdding(false);
      setEditingId(null);
      setFormData({ category: "", items: [{ name: "", level: 80 }] });
      fetchSkills();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    const res = await fetch(`/api/skills?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Category deleted");
      fetchSkills();
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-space-grotesk">Skills</h1>
          <p className="text-muted-foreground mt-1">Manage your technical expertise.</p>
        </div>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)} className="rounded-xl font-bold btn-gradient border-none h-11 text-white">
            <Plus size={18} className="mr-2" />
            Add Category
          </Button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="p-8 rounded-[2rem] bg-background border border-border space-y-6 shadow-xl animate-in fade-in slide-in-from-top-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{editingId ? "Edit Category" : "New Category"}</h2>
            <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-muted-foreground hover:text-foreground"><X size={20}/></button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold">Category Name</label>
            <Input 
              value={formData.category} 
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              placeholder="e.g. Frontend Development"
              className="rounded-xl h-12"
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold">Skill Items</label>
              <Button type="button" variant="outline" size="sm" onClick={handleAddItem} className="rounded-lg h-8">
                <Plus size={14} className="mr-1" /> Add Skill
              </Button>
            </div>
            {formData.items.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-center animate-in fade-in slide-in-from-left-2">
                <Input 
                  value={item.name} 
                  onChange={(e) => handleItemChange(idx, "name", e.target.value)}
                  placeholder="Skill name"
                  className="flex-1 rounded-xl h-10"
                  required
                />
                <Input 
                  type="number"
                  value={item.level} 
                  onChange={(e) => handleItemChange(idx, "level", parseInt(e.target.value))}
                  placeholder="Level %"
                  className="w-24 rounded-xl h-10"
                  min="0"
                  max="100"
                  required
                />
                <button type="button" onClick={() => handleRemoveItem(idx)} className="p-2 text-muted-foreground hover:text-destructive">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-border/50">
            <Button type="button" variant="ghost" onClick={() => { setIsAdding(false); setEditingId(null); }}>Cancel</Button>
            <Button type="submit" className="rounded-xl px-10 h-12 font-bold btn-gradient border-none text-white">
              {editingId ? "Update Category" : "Save Category"}
            </Button>
          </div>
        </form>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {skills.map((cat) => (
          <div key={cat._id} className="p-8 rounded-[2rem] bg-background border border-border space-y-6 hover:border-primary/30 transition-all hover:shadow-lg relative group">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3 text-primary font-bold">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Wrench size={20} />
                </div>
                <h3 className="text-xl font-space-grotesk">{cat.category}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleEdit(cat)} className="p-2 text-muted-foreground hover:text-primary transition-colors">
                  <Edit3 size={18} />
                </button>
                <button onClick={() => handleDelete(cat._id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="space-y-4 pt-4 border-t border-border/50">
              {cat.items.map((item: any, i: number) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold flex items-center gap-2">
                      <ChevronRight size={14} className="text-primary" />
                      {item.name}
                    </span>
                    <span className="text-xs font-black px-2 py-0.5 rounded-full bg-muted">{item.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all" style={{ width: `${item.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
