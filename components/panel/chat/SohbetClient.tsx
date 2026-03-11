"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/lib/hooks/useSupabase";
import { sanitizeTextInput } from "@/lib/sanitize";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquarePlus, Pin, Check, Share2, Trash2, Copy } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export type ChatMessage = {
  id: string;
  content: string;
  created_at: string;
  user_id?: string;
};

type Room = { id: string; name: string; slug: string };

export default function SohbetClient({
  rooms,
  roomId,
  roomName,
  roomSlug,
  initialMessages,
  currentUserId,
  currentUserName,
}: {
  rooms: Room[];
  roomId: string;
  roomName: string;
  roomSlug: string;
  initialMessages: ChatMessage[];
  currentUserId?: string;
  currentUserName?: string;
}) {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [reportingId, setReportingId] = useState<string | null>(null);
  const [reportReason, setReportReason] = useState("");
  const [savedPromptId, setSavedPromptId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const supabase = useSupabase();
  const { addToast } = useToast();

  useEffect(() => {
    return () => {
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
      if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
    };
  }, []);

  useEffect(() => {
    setMessages(initialMessages);
  }, [roomId, initialMessages]);

  useEffect(() => {
    const channel = supabase
      .channel(`chat:${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          const row = payload.new;
          if (
            row &&
            typeof row === "object" &&
            "id" in row &&
            "content" in row &&
            "created_at" in row
          ) {
            const msg = row as { id: string; content: string; created_at: string };
            setMessages((prev) =>
              prev.some((m) => m.id === msg.id)
                ? prev
                : [...prev, { id: msg.id, content: msg.content, created_at: msg.created_at }]
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, roomId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;
    setError("");
    setSending(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError("Oturum bulunamadı.");
      setSending(false);
      return;
    }
    const sanitized = sanitizeTextInput(text.slice(0, 2000));
    const { data, error: err } = await supabase
      .from("chat_messages")
      .insert({
        room_id: roomId,
        user_id: user.id,
        content: sanitized,
      })
      .select("id, content, created_at")
      .single();
    setSending(false);
    if (err) {
      setError(err.message);
      return;
    }
    setInput("");
    if (data && !messages.some((m) => m.id === data.id)) {
      setMessages((prev) => [...prev, data]);
    }
  }

  async function handleReport(messageId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error: err } = await supabase.from("chat_reports").insert({
      message_id: messageId,
      reporter_id: user.id,
      reason: reportReason.trim() || null,
    });
    if (err) {
      addToast("Rapor gönderilirken bir hata oluştu.", "error");
      return;
    }
    setReportingId(null);
    setReportReason("");
    addToast("Rapor başarıyla gönderildi.", "success");
  }

  async function saveToPromptHub(msgId: string, content: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase.from("prompts").insert({
      user_id: user.id,
      title: content.slice(0, 60) + (content.length > 60 ? "..." : ""),
      content: content,
      category: "genel",
    });
    if (!error) {
      setSavedPromptId(msgId);
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
      savedTimerRef.current = setTimeout(() => setSavedPromptId(null), 3000);
    }
  }

  async function handleShare(content: string, msgId: string) {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(msgId);
      addToast("Mesaj panoya kopyalandı!", "success");
      if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
      copiedTimerRef.current = setTimeout(() => setCopiedId(null), 2000);
    } catch {
      addToast("Kopyalama başarısız oldu.", "error");
    }
  }

  async function handleDelete(msgId: string) {
    const { error: err } = await supabase
      .from("chat_messages")
      .delete()
      .eq("id", msgId);
    if (err) {
      addToast("Mesaj silinemedi.", "error");
      return;
    }
    setMessages((prev) => prev.filter((m) => m.id !== msgId));
    addToast("Mesaj silindi.", "success");
  }

  function formatTime(iso: string) {
    const d = new Date(iso);
    return d.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Messages Main Area */}
      <div className="flex-1 flex flex-col rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 bg-dz-white/50 dark:bg-dz-black/30 backdrop-blur-sm overflow-hidden min-h-[500px] max-h-[80vh] shadow-xl">
        <div className="px-5 py-4 border-b border-dz-grey-200 dark:border-dz-grey-800 flex flex-wrap items-center justify-between gap-4 bg-dz-white dark:bg-dz-black/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-dz-orange-500/10 flex items-center justify-center text-dz-orange-500">
              <MessageSquarePlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-dz-black dark:text-white uppercase tracking-tight">{roomName}</h2>
              <p className="text-[10px] text-dz-grey-500 font-medium">Anonim Prompt & Bilgi Havuzu</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 flex flex-col bg-transparent">
          <AnimatePresence initial={false}>
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-center p-8 m-auto max-w-sm"
              >
                <div className="w-20 h-20 bg-dz-orange-500/10 dark:bg-dz-orange-500/20 text-dz-orange-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-dz-orange-500/10">
                  <MessageSquarePlus className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-dz-black dark:text-white mb-3">İlk Promptu Paylaş</h3>
                <p className="text-dz-grey-500 dark:text-dz-grey-400 text-sm mb-6 leading-relaxed">
                  Bu kanalda henüz paylaşım yapılmadı. Keşfettiğin bir promptu veya soruyu anonim olarak paylaşabilirsin.
                </p>
                <button
                  onClick={() => (document.querySelector('input[type="text"]') as HTMLInputElement)?.focus()}
                  className="bg-dz-orange-500 hover:bg-dz-orange-600 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-dz-orange-500/25 flex items-center gap-2"
                >
                  Paylaşıma Başla
                </button>
              </motion.div>
            ) : (
              messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col max-w-[90%] group"
                >
                  <div className="flex items-center gap-2 mb-1 pl-1">
                    <span className="text-[10px] font-bold text-dz-orange-500 uppercase tracking-tighter">
                      {msg.user_id === currentUserId ? (currentUserName || "Sen") : "AI Yolcusu"}
                    </span>
                    <span className="text-[10px] text-dz-grey-400">· {formatTime(msg.created_at)}</span>
                    <button
                      type="button"
                      onClick={() => handleShare(msg.content, msg.id)}
                      className={`opacity-0 group-hover:opacity-100 text-[10px] font-bold transition-opacity uppercase flex items-center gap-1 ${copiedId === msg.id ? 'text-green-500' : 'text-dz-grey-500 hover:text-dz-orange-500'}`}
                    >
                      {copiedId === msg.id ? (<><Check className="w-3 h-3" /> Kopyalandı</>) : (<><Share2 className="w-3 h-3" /> Paylaş</>)}
                    </button>
                    <button
                      type="button"
                      onClick={() => saveToPromptHub(msg.id, msg.content)}
                      className={`opacity-0 group-hover:opacity-100 text-[10px] font-bold transition-opacity uppercase flex items-center gap-1 ${savedPromptId === msg.id ? 'text-green-500' : 'text-dz-orange-500 hover:text-dz-orange-600'}`}
                    >
                      {savedPromptId === msg.id ? (<><Check className="w-3 h-3" /> Kaydedildi</>) : (<><Pin className="w-3 h-3" /> Hub'a Kaydet</>)}
                    </button>
                    {msg.user_id === currentUserId && (
                      <button
                        type="button"
                        onClick={() => handleDelete(msg.id)}
                        className="opacity-0 group-hover:opacity-100 text-[10px] font-bold text-dz-grey-400 hover:text-red-500 transition-opacity uppercase flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> Sil
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setReportingId((id) => (id === msg.id ? null : msg.id))}
                      className="opacity-0 group-hover:opacity-100 text-[10px] font-bold text-dz-grey-400 hover:text-red-500 transition-opacity uppercase"
                    >
                      Raporla
                    </button>
                  </div>
                  {reportingId === msg.id ? (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 mb-2 space-y-2">
                      <input
                        type="text"
                        value={reportReason}
                        onChange={(e) => setReportReason(e.target.value)}
                        placeholder="Şikayet nedeni..."
                        className="w-full rounded-lg border border-dz-grey-200 dark:border-dz-grey-700 bg-background px-3 py-1.5 text-xs"
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleReport(msg.id)}
                          className="text-xs font-bold rounded-lg bg-red-500 text-white px-3 py-1.5"
                        >
                          Raporu Gönder
                        </button>
                        <button
                          type="button"
                          onClick={() => { setReportingId(null); setReportReason(""); }}
                          className="text-xs font-bold text-dz-grey-500 px-2 py-1.5"
                        >
                          İptal
                        </button>
                      </div>
                    </div>
                  ) : null}
                  <div className="rounded-2xl rounded-tl-none bg-dz-white dark:bg-dz-grey-800 p-4 text-sm text-dz-black dark:text-dz-grey-200 border border-dz-grey-100 dark:border-dz-white/5 shadow-sm break-words leading-relaxed font-medium">
                    {msg.content}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleSend} className="p-5 border-t border-dz-grey-200 dark:border-dz-grey-800 bg-dz-white dark:bg-dz-black/40">
          {error && (
            <p className="text-xs font-bold text-red-600 dark:text-red-400 mb-3">{error}</p>
          )}
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Fikrini veya promptunu paylaş..."
              maxLength={2000}
              className="flex-1 rounded-xl border border-dz-grey-200 dark:border-dz-grey-700 bg-dz-grey-50 dark:bg-dz-grey-900 px-4 py-3 text-sm placeholder:text-dz-grey-400 focus:ring-2 focus:ring-dz-orange-500/20 outline-none transition-all"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              className="rounded-xl bg-dz-orange-500 px-6 py-3 text-sm font-black text-white hover:bg-dz-orange-600 disabled:opacity-50 shrink-0 shadow-lg shadow-dz-orange-500/20 transition-all active:scale-95 uppercase tracking-widest"
            >
              {sending ? "..." : "Gönder"}
            </button>
          </div>
          <div className="flex justify-between mt-2 px-1">
            <p className="text-[10px] text-dz-grey-500 font-bold uppercase tracking-tighter">Maks. 2000 Karakter · Anonim</p>
            <p className="text-[10px] text-dz-grey-500 font-bold uppercase tracking-tighter">Kişisel Veri Paylaşmayınız</p>
          </div>
        </form>
      </div>

      {/* Side Exploration Panel */}
      <div className="w-full lg:w-72 space-y-4">
        <div className="rounded-2xl border border-dz-orange-500/20 bg-dz-orange-500/5 p-5">
          <h3 className="text-xs font-black text-dz-orange-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-dz-orange-500 animate-pulse" />
            Trending Prompt Kategorileri
          </h3>
          <div className="space-y-2">
            {[
              { label: "💰 Freelance Gelir", count: "124" },
              { label: "✍️ İçerik Optimizasyonu", count: "89" },
              { label: "🚀 SaaS Fikirleri", count: "56" },
              { label: "🛡️ Güvenlik & Redline", count: "34" },
              { label: "📊 Veri Analizi", count: "78" },
            ].map((cat) => (
              <button key={cat.label} className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-dz-orange-500/10 transition-colors group">
                <span className="text-xs font-semibold text-dz-grey-700 dark:text-dz-grey-300 group-hover:text-dz-orange-500">{cat.label}</span>
                <span className="text-[10px] font-bold text-dz-grey-400 dark:text-dz-grey-500">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 p-5 bg-dz-white dark:bg-dz-black/20">
          <h3 className="text-xs font-black text-dz-grey-500 dark:text-dz-grey-400 uppercase tracking-widest mb-4">
            Hızlı Kısayollar
          </h3>
          <div className="grid gap-3">
            <button className="text-[10px] font-bold py-2 px-3 rounded-lg border border-dz-grey-200 dark:border-dz-grey-800 text-dz-grey-600 dark:text-dz-grey-400 hover:border-dz-orange-500 transition-colors uppercase text-left">
              📜 Prompt Kuralları
            </button>
            <button className="text-[10px] font-bold py-2 px-3 rounded-lg border border-dz-grey-200 dark:border-dz-grey-800 text-dz-grey-600 dark:text-dz-grey-400 hover:border-dz-orange-500 transition-colors uppercase text-left">
              ⚖️ Topluluk İlkeleri
            </button>
            <button className="text-[10px] font-bold py-2 px-3 rounded-lg border border-dz-grey-200 dark:border-dz-grey-800 text-dz-grey-600 dark:text-dz-grey-400 hover:border-dz-orange-500 transition-colors uppercase text-left">
              📢 Geri Bildirim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
