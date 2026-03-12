"use client";

import { useState } from "react";
import { Bell, Send, Users, User, Zap, Trophy, Flame, BookOpen, MessageSquare, CheckCircle2 } from "lucide-react";

const NOTIFICATION_TYPES = [
  { value: "system", label: "Sistem", icon: <Bell className="w-4 h-4" /> },
  { value: "level_up", label: "Seviye Atlama", icon: <Zap className="w-4 h-4" /> },
  { value: "badge_earned", label: "Rozet Kazanma", icon: <Trophy className="w-4 h-4" /> },
  { value: "streak_reminder", label: "Seri Hatırlatma", icon: <Flame className="w-4 h-4" /> },
  { value: "new_content", label: "Yeni İçerik", icon: <BookOpen className="w-4 h-4" /> },
  { value: "community", label: "Topluluk", icon: <MessageSquare className="w-4 h-4" /> },
];

export default function AdminNotificationsClient() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("system");
  const [target, setTarget] = useState<"all" | "single">("all");
  const [userId, setUserId] = useState("");
  const [actionUrl, setActionUrl] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ sent: number } | null>(null);
  const [error, setError] = useState("");

  async function handleSend() {
    if (!title.trim() || !message.trim()) {
      setError("Başlık ve mesaj gerekli");
      return;
    }
    if (target === "single" && !userId.trim()) {
      setError("Kullanıcı ID gerekli");
      return;
    }

    setSending(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/admin/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          message: message.trim(),
          type,
          target,
          userId: target === "single" ? userId.trim() : undefined,
          actionUrl: actionUrl.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Bildirim gönderilemedi");

      setResult(data);
      setTitle("");
      setMessage("");
      setActionUrl("");
      setUserId("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-bold text-dz-black dark:text-dz-white">
          Bildirim Gönder
        </h2>
        <p className="text-sm text-dz-grey-500 dark:text-dz-grey-400 mt-1">
          Kullanıcılara site içi bildirim gönderin
        </p>
      </div>

      <div className="bg-dz-white dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-grey-800 rounded-2xl p-6 space-y-6">
        {/* Target */}
        <div>
          <label className="block text-sm font-bold text-dz-black dark:text-dz-white mb-2">
            Hedef
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setTarget("all")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all min-h-[44px] ${
                target === "all"
                  ? "bg-dz-orange-500/10 text-dz-orange-500 border-dz-orange-500/20"
                  : "bg-dz-grey-50 dark:bg-dz-grey-800 text-dz-grey-600 dark:text-dz-grey-400 border-dz-grey-200 dark:border-dz-grey-700 hover:border-dz-grey-300"
              }`}
            >
              <Users className="w-4 h-4" />
              Tüm Kullanıcılar
            </button>
            <button
              type="button"
              onClick={() => setTarget("single")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all min-h-[44px] ${
                target === "single"
                  ? "bg-dz-orange-500/10 text-dz-orange-500 border-dz-orange-500/20"
                  : "bg-dz-grey-50 dark:bg-dz-grey-800 text-dz-grey-600 dark:text-dz-grey-400 border-dz-grey-200 dark:border-dz-grey-700 hover:border-dz-grey-300"
              }`}
            >
              <User className="w-4 h-4" />
              Tek Kullanıcı
            </button>
          </div>
        </div>

        {target === "single" && (
          <div>
            <label className="block text-sm font-bold text-dz-black dark:text-dz-white mb-2">
              Kullanıcı ID
            </label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="uuid formatında kullanıcı ID"
              className="w-full px-4 py-3 rounded-xl border border-dz-grey-200 dark:border-dz-grey-700 bg-dz-grey-50 dark:bg-dz-grey-800 text-sm text-dz-black dark:text-dz-white focus:border-dz-orange-500 outline-none transition-colors min-h-[44px]"
            />
          </div>
        )}

        {/* Type */}
        <div>
          <label className="block text-sm font-bold text-dz-black dark:text-dz-white mb-2">
            Bildirim Tipi
          </label>
          <div className="flex flex-wrap gap-2">
            {NOTIFICATION_TYPES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setType(t.value)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-all min-h-[36px] ${
                  type === t.value
                    ? "bg-dz-orange-500/10 text-dz-orange-500 border-dz-orange-500/20"
                    : "bg-dz-grey-50 dark:bg-dz-grey-800 text-dz-grey-600 dark:text-dz-grey-400 border-dz-grey-200 dark:border-dz-grey-700"
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-bold text-dz-black dark:text-dz-white mb-2">
            Başlık
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Bildirim başlığı"
            className="w-full px-4 py-3 rounded-xl border border-dz-grey-200 dark:border-dz-grey-700 bg-dz-grey-50 dark:bg-dz-grey-800 text-sm text-dz-black dark:text-dz-white focus:border-dz-orange-500 outline-none transition-colors min-h-[44px]"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-bold text-dz-black dark:text-dz-white mb-2">
            Mesaj
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Bildirim mesajı"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-dz-grey-200 dark:border-dz-grey-700 bg-dz-grey-50 dark:bg-dz-grey-800 text-sm text-dz-black dark:text-dz-white focus:border-dz-orange-500 outline-none transition-colors resize-none"
          />
        </div>

        {/* Action URL */}
        <div>
          <label className="block text-sm font-bold text-dz-black dark:text-dz-white mb-2">
            Aksiyon URL <span className="font-normal text-dz-grey-500">(isteğe bağlı)</span>
          </label>
          <input
            type="text"
            value={actionUrl}
            onChange={(e) => setActionUrl(e.target.value)}
            placeholder="/panel/quiz veya /fiyatlar"
            className="w-full px-4 py-3 rounded-xl border border-dz-grey-200 dark:border-dz-grey-700 bg-dz-grey-50 dark:bg-dz-grey-800 text-sm text-dz-black dark:text-dz-white focus:border-dz-orange-500 outline-none transition-colors min-h-[44px]"
          />
        </div>

        {/* Error / Success */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}
        {result && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            {result.sent} kullanıcıya bildirim gönderildi
          </div>
        )}

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={sending}
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-dz-orange-500 hover:bg-dz-orange-600 text-white font-bold rounded-xl transition-colors disabled:opacity-50 min-h-[44px]"
        >
          <Send className="w-4 h-4" />
          {sending ? "Gönderiliyor..." : "Bildirim Gönder"}
        </button>
      </div>

      {/* Firebase Info */}
      <div className="bg-dz-white dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-grey-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-display text-lg font-bold text-dz-black dark:text-dz-white">
          Firebase Yapılandırması
        </h3>
        <p className="text-sm text-dz-grey-500 dark:text-dz-grey-400">
          Push bildirimleri için Firebase Cloud Messaging (FCM) kullanılıyor.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="bg-dz-grey-50 dark:bg-dz-grey-800 rounded-xl p-4">
            <p className="text-dz-grey-500 text-xs font-bold uppercase tracking-wider mb-1">Proje ID</p>
            <p className="font-mono text-dz-black dark:text-dz-white">{process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "—"}</p>
          </div>
          <div className="bg-dz-grey-50 dark:bg-dz-grey-800 rounded-xl p-4">
            <p className="text-dz-grey-500 text-xs font-bold uppercase tracking-wider mb-1">Sender ID</p>
            <p className="font-mono text-dz-black dark:text-dz-white">{process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "—"}</p>
          </div>
          <div className="bg-dz-grey-50 dark:bg-dz-grey-800 rounded-xl p-4">
            <p className="text-dz-grey-500 text-xs font-bold uppercase tracking-wider mb-1">Auth Domain</p>
            <p className="font-mono text-dz-black dark:text-dz-white">{process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "—"}</p>
          </div>
          <div className="bg-dz-grey-50 dark:bg-dz-grey-800 rounded-xl p-4">
            <p className="text-dz-grey-500 text-xs font-bold uppercase tracking-wider mb-1">App ID</p>
            <p className="font-mono text-dz-black dark:text-dz-white truncate">{process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "—"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
