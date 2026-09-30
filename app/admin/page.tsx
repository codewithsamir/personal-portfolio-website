"use client";

import { useEffect, useState } from "react";
import { 
  Briefcase, 
  FolderOpen, 
  MessageSquare, 
  TrendingUp,
  Eye,
  Sparkles
} from "lucide-react";
import { format } from "date-fns";

export default function AdminPage() {
  const [stats, setStats] = useState({
    projects: 0,
    experience: 0,
    messages: 0,
    recentMessages: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [portfolioRes, messagesRes] = await Promise.all([
          fetch("/api/portfolio"),
          fetch("/api/messages")
        ]);
        
        const portfolioData = await portfolioRes.json();
        const messagesData = await messagesRes.json();

        setStats({
          projects: portfolioData.projects?.length || 0,
          experience: portfolioData.experience?.length || 0,
          messages: messagesData.length || 0,
          recentMessages: messagesData.slice(0, 3)
        });
      } catch (error) {
        // console.error("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    { name: "Total Projects", value: stats.projects, icon: FolderOpen, color: "text-blue-500" },
    { name: "Work History", value: stats.experience, icon: Briefcase, color: "text-green-500" },
    { name: "Total Inquiries", value: stats.messages, icon: MessageSquare, color: "text-purple-500" },
    { name: "Live Site", value: "Active", icon: Sparkles, color: "text-orange-500" },
  ];

  if (loading) return <div className="animate-pulse space-y-8">
    <div className="h-20 bg-muted rounded-3xl w-1/3" />
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
      {[1,2,3,4].map(i => <div key={i} className="h-32 bg-muted rounded-3xl" />)}
    </div>
  </div>;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-2xl sm:text-4xl font-black font-space-grotesk tracking-tight">Welcome back, Samir</h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base font-medium italic">Your portfolio ecosystem is performing beautifully.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {statCards.map((stat) => (
          <div key={stat.name} className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-background border border-border shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group">
            <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
              <div className={`p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors ${stat.color}`}>
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-[10px] font-black text-green-500 flex items-center gap-1 uppercase tracking-widest bg-green-500/10 px-2 py-1 rounded-lg max-sm:hidden">
                <TrendingUp size={10} />
                Stable
              </span>
            </div>
            <p className="text-[10px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest text-muted-foreground truncate">{stat.name}</p>
            <h3 className="text-2xl sm:text-3xl font-black mt-1 font-space-grotesk truncate">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl sm:rounded-[2.5rem] bg-background border border-border h-[220px] sm:h-[400px] text-center flex flex-col items-center justify-center text-muted-foreground relative overflow-hidden group">
            <div className="absolute inset-0 bg-grid opacity-[0.02]" />
            <Sparkles size={48} className="text-primary/20 mb-4 animate-pulse" />
            <p className="font-bold italic">Analytics Engine Operational</p>
            <p className="text-sm mt-2">Traffic insights will appear here in the next update.</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="p-5 sm:p-8 rounded-3xl sm:rounded-[2.5rem] bg-background border border-border shadow-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 font-space-grotesk">
              <MessageSquare size={20} className="text-primary" />
              Latest Inquiries
            </h3>
            <div className="space-y-4">
              {stats.recentMessages.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">No messages yet.</p>
              ) : (
                stats.recentMessages.map((msg: any) => (
                  <div key={msg._id} className="p-5 rounded-2xl bg-muted/30 border border-border/50 text-sm hover:border-primary/30 transition-colors">
                    <div className="flex justify-between gap-2 mb-2">
                      <span className="font-bold truncate">{msg.name}</span>
                      <span className="text-[10px] font-black uppercase text-muted-foreground">
                        {format(new Date(msg.createdAt), "MMM d")}
                      </span>
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed italic">
                      "{msg.message}"
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
