"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { toast } from "sonner";
import { Plus, Save, Trash2, Camera, Play, MessageCircle, Image as ImageIcon, Upload, Loader2, X, Code2, Globe, Send } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";

export default function PersonalInfoPage() {
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/personal")
      .then((res) => res.json())
      .then((data) => {
        // Ensure nested structures exist
        const defaultData = {
          ...data,
          socials: {
            github: "",
            linkedin: "",
            twitter: "",
            instagram: "",
            facebook: "",
            youtube: "",
            ...(data?.socials || {})
          },
          footerLinks: data?.footerLinks || []
        };
        setInfo(defaultData);
        setLoading(false);
      });
  }, []);

  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setInfo({ ...info, profileImage: data.url });
        toast.success("Profile image uploaded!");
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

  const addFooterLink = () => {
    setInfo({
      ...info,
      footerLinks: [...(info.footerLinks || []), { label: "", href: "" }]
    });
  };

  const updateFooterLink = (index: number, field: string, value: string) => {
    const newLinks = [...info.footerLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setInfo({ ...info, footerLinks: newLinks });
  };

  const removeFooterLink = (index: number) => {
    const newLinks = info.footerLinks.filter((_: any, i: number) => i !== index);
    setInfo({ ...info, footerLinks: newLinks });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold font-space-grotesk">Personal Info</h1>
        <p className="text-muted-foreground mt-1">Manage your identity and branding.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Core Identity */}
        <div className="p-8 rounded-[2rem] bg-background border border-border space-y-8 shadow-sm">
          <h2 className="text-xl font-bold font-space-grotesk border-b border-border pb-4">Core Identity</h2>
          
          <div className="flex flex-col md:flex-row gap-10">
            {/* Profile Image Column */}
            <div className="md:w-1/3 space-y-4">
              <label className="text-sm font-bold ml-1 uppercase tracking-widest text-muted-foreground">Profile Image</label>
              <div className="relative aspect-square w-full max-w-[240px] rounded-full bg-muted border-2 border-dashed border-border flex flex-col items-center justify-center overflow-hidden group mx-auto md:mx-0">
                {info?.profileImage ? (
                  <>
                    <Image src={info.profileImage} alt="Profile" fill className="object-cover" />
                    <button 
                      type="button" 
                      onClick={() => setInfo({...info, profileImage: ""})}
                      className="absolute top-2 right-2 p-2 bg-background/80 backdrop-blur-md rounded-full text-destructive shadow-lg hover:bg-background transition-all opacity-0 group-hover:opacity-100"
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
                          <input type="file" accept="image/*" className="hidden" onChange={handleProfileImageUpload} />
                        </label>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Info Column */}
            <div className="md:w-2/3 space-y-6">
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
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold ml-1">Footer Description</label>
            <Textarea 
              value={info?.footerDescription || ""} 
              onChange={(e) => setInfo({...info, footerDescription: e.target.value})}
              className="rounded-2xl min-h-[80px]"
              placeholder="Appears in the footer section..."
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

        {/* Social Presence */}
        <div className="p-8 rounded-[2rem] bg-background border border-border space-y-6 shadow-sm">
          <h2 className="text-xl font-bold font-space-grotesk border-b border-border pb-4">Social Presence</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1 flex items-center gap-2"><FaGithub size={14}/> GitHub URL</label>
              <Input 
                value={info?.socials?.github || ""} 
                onChange={(e) => setInfo({...info, socials: {...info.socials, github: e.target.value}})}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1 flex items-center gap-2"><FaLinkedin size={14}/> LinkedIn URL</label>
              <Input 
                value={info?.socials?.linkedin || ""} 
                onChange={(e) => setInfo({...info, socials: {...info.socials, linkedin: e.target.value}})}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1 flex items-center gap-2"><FaXTwitter size={14}/> Twitter / X URL</label>
              <Input 
                value={info?.socials?.twitter || ""} 
                onChange={(e) => setInfo({...info, socials: {...info.socials, twitter: e.target.value}})}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1 flex items-center gap-2"><FaInstagram size={14}/> Instagram URL</label>
              <Input 
                value={info?.socials?.instagram || ""} 
                onChange={(e) => setInfo({...info, socials: {...info.socials, instagram: e.target.value}})}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1 flex items-center gap-2"><FaFacebook size={14}/> Facebook URL</label>
              <Input 
                value={info?.socials?.facebook || ""} 
                onChange={(e) => setInfo({...info, socials: {...info.socials, facebook: e.target.value}})}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1 flex items-center gap-2"><FaYoutube size={14}/> YouTube URL</label>
              <Input 
                value={info?.socials?.youtube || ""} 
                onChange={(e) => setInfo({...info, socials: {...info.socials, youtube: e.target.value}})}
                className="rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Custom Footer Links */}
        <div className="p-8 rounded-[2rem] bg-background border border-border space-y-6 shadow-sm">
          <div className="flex justify-between items-center border-b border-border pb-4">
            <h2 className="text-xl font-bold font-space-grotesk">Navigation Links</h2>
            <Button type="button" variant="outline" size="sm" onClick={addFooterLink} className="rounded-full">
              <Plus size={16} className="mr-2" /> Add Link
            </Button>
          </div>
          
          <div className="space-y-4">
            {info?.footerLinks?.map((link: any, index: number) => (
              <div key={index} className="grid md:grid-cols-12 gap-4 items-end bg-muted/30 p-4 rounded-2xl relative group">
                <div className="md:col-span-5 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Label</label>
                  <Input 
                    value={link.label}
                    onChange={(e) => updateFooterLink(index, "label", e.target.value)}
                    placeholder="e.g. Portfolio"
                    className="rounded-xl bg-background"
                  />
                </div>
                <div className="md:col-span-6 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">URL (e.g. #projects or https://...)</label>
                  <Input 
                    value={link.href}
                    onChange={(e) => updateFooterLink(index, "href", e.target.value)}
                    placeholder="e.g. #projects"
                    className="rounded-xl bg-background"
                  />
                </div>
                <div className="md:col-span-1">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeFooterLink(index)}
                    className="text-destructive hover:bg-destructive/10 rounded-xl"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            ))}
            
            {(!info?.footerLinks || info.footerLinks.length === 0) && (
              <p className="text-center text-muted-foreground py-8 italic">No custom navigation links added yet.</p>
            )}
          </div>
        </div>

        <div className="flex justify-end sticky bottom-8 z-50">
          <Button type="submit" disabled={saving} className="rounded-2xl px-12 h-16 font-bold group shadow-2xl btn-gradient border-none text-white">
            {saving ? "Saving Changes..." : "Apply All Updates"}
            <Save size={20} className="ml-3 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </form>
    </div>
  );
}
