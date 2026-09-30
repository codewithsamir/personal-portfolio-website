"use client";

import { useEffect, useState } from "react";
import { Mail, Trash2, Calendar, User, Tag, MessageCircle } from "lucide-react";
import { format } from "date-fns";
import { DataTable, DataTableRow, DataTableCell } from "../_components/DataTable";
import { toast } from "sonner";
import { useConfirm } from "../_components/ConfirmDialog";

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const confirm = useConfirm();

  useEffect(() => {
    fetch("/api/messages")
      .then((res) => res.json())
      .then((data) => {
        setMessages(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (msg: any) => {
    const ok = await confirm({
      title: "Delete this message?",
      description: `The inquiry from ${msg.name} will be permanently removed.`,
    });
    if (!ok) return;

    const res = await fetch(`/api/messages?id=${msg._id}`, { method: "DELETE" });
    if (res.ok) {
      setMessages((prev) => prev.filter((m) => m._id !== msg._id));
      toast.success("Message deleted");
    } else {
      toast.error("Failed to delete message");
    }
  };

  if (loading) return <div>Loading messages...</div>;

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-space-grotesk">Inquiries</h1>
        <p className="text-muted-foreground mt-1">Review and manage contact submissions from your website.</p>
      </div>

      <DataTable headers={["Sender", "Subject", "Message", "Received At", "Actions"]}>
        {messages.length === 0 ? (
          <DataTableRow>
            <DataTableCell className="text-center py-12 text-muted-foreground italic" colSpan={5}>
              No messages found yet.
            </DataTableCell>
          </DataTableRow>
        ) : (
          messages.map((msg) => (
            <DataTableRow key={msg._id}>
              <DataTableCell>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                    {msg.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold">{msg.name}</p>
                    <p className="text-xs text-muted-foreground">{msg.email}</p>
                  </div>
                </div>
              </DataTableCell>
              <DataTableCell>
                <span className="px-3 py-1 rounded-full bg-muted text-[10px] font-black uppercase tracking-wider">
                  {msg.subject}
                </span>
              </DataTableCell>
              <DataTableCell className="max-w-xs">
                <p className="line-clamp-2 text-muted-foreground leading-relaxed">
                  {msg.message}
                </p>
              </DataTableCell>
              <DataTableCell>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar size={14} />
                  {format(new Date(msg.createdAt), "MMM d, yyyy")}
                </div>
              </DataTableCell>
              <DataTableCell>
                <button 
                  onClick={() => handleDelete(msg)}
                  aria-label="Delete message"
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-destructive/10"
                >
                  <Trash2 size={18} />
                </button>
              </DataTableCell>
            </DataTableRow>
          ))
        )}
      </DataTable>
    </div>
  );
}
