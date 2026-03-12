"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useSupabase } from "@/lib/hooks/useSupabase";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";
import { motion } from "framer-motion";
import { xpToLevel, xpProgressInLevel } from "@/lib/xp";
import { Camera, Shield, Key, LogOut, Mail, Calendar, User, CheckCircle, Trash2 } from "lucide-react";
import {
  ChatGPTIcon,
  ClaudeIcon,
  GeminiIcon,
  DeepSeekIcon,
  KimiIcon,
  WindsurfIcon,
  CursorIcon,
  GrokIcon,
  MidjourneyIcon,
  ZapierIcon,
  PerplexityIcon,
  V0Icon,
  KaggleIcon,
  HuggingFaceIcon,
  FigmaIcon,
} from "../chat/ai-tool-badges";

type UserStats = {
  total_xp: number;
  current_streak_days: number;
  completed_books: number;
  completed_pomodoros: number;
  total_notes: number;
  total_sheets: number;
  member_since: string;
};

const AI_CERT_TOOLS = [
  { name: "ChatGPT", slug: "chatgpt", desc: "İleri Seviye Prompting", Icon: ChatGPTIcon },
  { name: "Claude 3", slug: "claude", desc: "Uzun Bağlam Analizi", Icon: ClaudeIcon },
  { name: "Cursor AI", slug: "cursor", desc: "AI Destekli Kodlama", Icon: CursorIcon },
  { name: "DeepSeek", slug: "deepseek", desc: "Akıl Yürütme & Mantık", Icon: DeepSeekIcon },
  { name: "Gemini Pro", slug: "gemini", desc: "Çoklu Ortam Ustalığı", Icon: GeminiIcon },
  { name: "Grok", slug: "grok", desc: "Gerçek Zamanlı AI", Icon: GrokIcon },
  { name: "Kimi", slug: "kimi", desc: "Doküman Analizi", Icon: KimiIcon },
  { name: "Midjourney", slug: "midjourney", desc: "Görsel Mimari", Icon: MidjourneyIcon },
  { name: "Perplexity", slug: "perplexity", desc: "AI Arama Motoru", Icon: PerplexityIcon },
  { name: "v0 by Vercel", slug: "v0", desc: "Üretken Arayüz", Icon: V0Icon },
  { name: "Windsurf", slug: "windsurf", desc: "AI IDE Ustalığı", Icon: WindsurfIcon },
  { name: "Zapier", slug: "zapier", desc: "Otomatik İş Akışları", Icon: ZapierIcon },
  { name: "Kaggle", slug: "kaggle", desc: "Veri Bilimi", Icon: KaggleIcon },
  { name: "HuggingFace", slug: "huggingface", desc: "ML Model Merkezi", Icon: HuggingFaceIcon },
  { name: "Figma", slug: "figma", desc: "UI/UX Tasarım", Icon: FigmaIcon },
];

export default function ProfilClient({
  displayName,
  email,
  stats,
  earnedBadgeSlugs = [],
  avatarUrl,
}: {
  displayName: string;
  email: string;
  stats: UserStats;
  earnedBadgeSlugs?: string[];
  avatarUrl?: string | null;
}) {
  const earnedSet = new Set(earnedBadgeSlugs);
  const [name, setName] = useState(displayName);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(avatarUrl || null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const savedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const passwordSavedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const supabase = useSupabase();
  const { addToast } = useToast();

  const level = xpToLevel(stats.total_xp);
  const progressPct = xpProgressInLevel(stats.total_xp);
  const hasNameChanged = name.trim() !== displayName;

  useEffect(() => {
    return () => {
      if (savedTimeoutRef.current) clearTimeout(savedTimeoutRef.current);
      if (passwordSavedTimeoutRef.current) clearTimeout(passwordSavedTimeoutRef.current);
    };
  }, []);

  async function handleSaveName() {
    const trimmed = name.trim();
    if (!trimmed || saving) return;
    setSaving(true);
    setError("");
    setSaved(false);

    const { error: err } = await supabase.auth.updateUser({
      data: { full_name: trimmed },
    });

    setSaving(false);
    if (err) { setError(err.message); return; }
    setSaved(true);
    router.refresh();
    if (savedTimeoutRef.current) clearTimeout(savedTimeoutRef.current);
    savedTimeoutRef.current = setTimeout(() => setSaved(false), 3000);
  }

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setError("Dosya boyutu 2MB'den küçük olmalı.");
      return;
    }

    setUploadingAvatar(true);
    setError("");

    const preview = URL.createObjectURL(file);
    setAvatarPreview(preview);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setUploadingAvatar(false); return; }

    const ext = file.name.split(".").pop();
    const filePath = `avatars/${user.id}.${ext}`;

    const { error: uploadErr } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadErr) {
      setError("Yükleme hatası: " + uploadErr.message);
      setUploadingAvatar(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(filePath);

    await supabase.auth.updateUser({
      data: { avatar_url: urlData.publicUrl },
    });

    setUploadingAvatar(false);
    router.refresh();
  }

  async function handleChangePassword() {
    setPasswordError("");
    setPasswordSaved(false);

    if (newPassword.length < 6) {
      setPasswordError("Yeni şifre en az 6 karakter olmalı.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Şifreler eşleşmedi.");
      return;
    }

    setPasswordSaving(true);
    const { error: err } = await supabase.auth.updateUser({ password: newPassword });
    setPasswordSaving(false);

    if (err) {
      setPasswordError(err.message);
      return;
    }

    setPasswordSaved(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    if (passwordSavedTimeoutRef.current) clearTimeout(passwordSavedTimeoutRef.current);
    passwordSavedTimeoutRef.current = setTimeout(() => setPasswordSaved(false), 3000);
  }

  async function handleDeleteAccount() {
    setDeleting(true);
    try {
      const res = await fetch("/api/account/delete", { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        addToast(data.error || "Hesap silinemedi", "error");
        setDeleting(false);
        setDeleteConfirm(false);
        return;
      }
      await supabase.auth.signOut();
      router.push("/");
    } catch {
      addToast("Hesap silinemedi. Lütfen tekrar deneyin.", "error");
      setDeleting(false);
      setDeleteConfirm(false);
    }
  }

  async function handleSignOut() {
    try {
      const { error: err } = await supabase.auth.signOut();
      if (err) {
        addToast("Çıkış yapılırken hata oluştu: " + err.message, "error");
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      addToast("Çıkış yapılamadı. Lütfen tekrar deneyin.", "error");
    }
  }

  const initials = (name || email)[0]?.toUpperCase() || "?";

  const statCards = useMemo(() => [
    { label: "Toplam XP", value: `${stats.total_xp} XP`, sub: `Seviye ${level}`, color: "text-dz-orange-500" },
    { label: "Seri", value: `${stats.current_streak_days} gün`, sub: "Üst üste aktif", color: "text-dz-amber-500" },
    { label: "Tamamlanan Kitap", value: String(stats.completed_books), sub: "kitap bitirildi", color: "text-dz-orange-600" },
    { label: "Zihin Motoru", value: String(stats.completed_pomodoros), sub: "oturum tamamlandı", color: "text-dz-orange-500" },
    { label: "Notlar", value: String(stats.total_notes), sub: "not oluşturuldu", color: "text-dz-grey-600 dark:text-dz-grey-400" },
    { label: "Çalışma Kağıtları", value: String(stats.total_sheets), sub: "kağıt oluşturuldu", color: "text-dz-grey-600 dark:text-dz-grey-400" },
  ], [stats, level]);

  return (
    <div className="space-y-6">
      {/* Profile Header with Avatar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 bg-gradient-to-r from-dz-orange-500/5 to-dz-amber-500/5 p-6"
      >
        <div className="flex items-start gap-5">
          <div className="relative group">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-dz-orange-100 dark:bg-dz-orange-200 flex items-center justify-center shrink-0 border-2 border-dz-orange-500/30">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Profil" className="w-full h-full object-cover" width={80} height={80} />
              ) : (
                <span className="font-display text-3xl font-bold text-dz-orange-600">{initials}</span>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingAvatar}
              className="absolute -bottom-1 -right-1 w-8 h-8 bg-dz-orange-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-dz-orange-600 transition-colors"
            >
              <Camera className="w-4 h-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={handleAvatarUpload}
            />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="font-display text-2xl font-bold text-dz-black dark:text-dz-white truncate">
              {displayName || "Adsız Kullanıcı"}
            </h2>
            <div className="flex items-center gap-2 mt-1 min-w-0">
              <Mail className="w-3.5 h-3.5 text-dz-grey-400 shrink-0" />
              <p className="text-sm text-dz-grey-500 truncate">{email}</p>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="w-3.5 h-3.5 text-dz-grey-400" />
              <p className="text-xs text-dz-grey-400">
                Üye: {new Date(stats.member_since).toLocaleDateString("tr-TR", {
                  year: "numeric", month: "long", day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex justify-between text-xs text-dz-grey-500 mb-1">
            <span>Seviye {level}</span>
            <span>{Math.round(progressPct * 100)}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-dz-grey-200 dark:bg-dz-grey-700 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPct * 100}%` }}
              transition={{ duration: 0.8 }}
              className="h-full rounded-full bg-gradient-to-r from-dz-orange-500 to-dz-amber-400"
            />
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div>
        <h3 className="font-display text-lg font-semibold text-dz-black dark:text-dz-white mb-4">İstatistikler</h3>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {statCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-dz-grey-200 dark:border-dz-grey-800 bg-dz-white dark:bg-dz-grey-900 p-4"
            >
              <p className="text-xs font-medium text-dz-grey-500">{card.label}</p>
              <p className={`mt-1 font-display text-xl font-bold ${card.color}`}>{card.value}</p>
              <p className="text-xs text-dz-grey-400">{card.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Certifications */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-semibold text-dz-black dark:text-dz-white">Yeterlilik Sertifikaları</h3>
          <span className="text-[10px] font-bold text-dz-orange-500 uppercase tracking-widest bg-dz-orange-500/10 px-2 py-0.5 rounded-full border border-dz-orange-500/20">
            Masterclass Yetkinliği
          </span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-8 gap-2">
          {AI_CERT_TOOLS.map((tool, idx) => {
            const earned = earnedSet.has(tool.slug);
            return (
              <motion.div
                key={tool.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-500 bg-dz-white dark:bg-dz-black shadow-sm ${earned
                  ? "border-dz-orange-500/30 text-dz-orange-500 shadow-dz-orange-500/5 ring-1 ring-dz-orange-500/10"
                  : "border-dz-grey-200 dark:border-dz-grey-800 text-dz-grey-300 dark:text-dz-grey-600 grayscale opacity-50"
                  }`}
              >
                <div className={`mb-2 transition-transform duration-500 ${earned ? "scale-110" : "scale-90"}`}>
                  <tool.Icon className="w-8 h-8" />
                </div>
                <span className={`text-[9px] font-black uppercase tracking-wider ${earned ? "text-dz-black dark:text-white" : "text-dz-grey-400 dark:text-dz-grey-600"}`}>
                  {tool.name}
                </span>
                {earned && <span className="mt-0.5 text-[7px] font-bold text-green-500 uppercase tracking-wider">✓ Kazanıldı</span>}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Edit Profile + Change Password — side by side */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 bg-dz-white dark:bg-dz-grey-900 p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-dz-orange-500" />
            <h3 className="font-display text-lg font-semibold text-dz-black dark:text-dz-white">Profili Düzenle</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="display-name" className="block text-sm font-medium text-dz-grey-600 dark:text-dz-grey-400 mb-1">Görünen Ad</label>
              <input
                id="display-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-dz-grey-200 dark:border-dz-grey-700 bg-background px-3 py-2.5 text-sm"
                placeholder="Adını gir"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dz-grey-600 dark:text-dz-grey-400 mb-1">E-posta</label>
              <input type="email" value={email} disabled className="w-full rounded-lg border border-dz-grey-200 dark:border-dz-grey-700 bg-dz-grey-100 dark:bg-dz-grey-800 px-3 py-2.5 text-sm text-dz-grey-500 cursor-not-allowed" />
            </div>
            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
            {saved && <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Kaydedildi.</p>}
            <button
              type="button"
              onClick={handleSaveName}
              disabled={!hasNameChanged || saving}
              className="rounded-lg bg-dz-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-dz-orange-600 disabled:opacity-50 transition-colors"
            >
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 bg-dz-white dark:bg-dz-grey-900 p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Key className="w-5 h-5 text-dz-orange-500" />
            <h3 className="font-display text-lg font-semibold text-dz-black dark:text-dz-white">Şifre Değiştir</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dz-grey-600 dark:text-dz-grey-400 mb-1">Yeni Şifre</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-lg border border-dz-grey-200 dark:border-dz-grey-700 bg-background px-3 py-2.5 text-sm"
                placeholder="En az 6 karakter"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dz-grey-600 dark:text-dz-grey-400 mb-1">Şifre Tekrar</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border border-dz-grey-200 dark:border-dz-grey-700 bg-background px-3 py-2.5 text-sm"
                placeholder="Şifreyi tekrarla"
              />
            </div>
            {passwordError && <p className="text-sm text-red-600 dark:text-red-400">{passwordError}</p>}
            {passwordSaved && <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Şifre değiştirildi.</p>}
            <button
              type="button"
              onClick={handleChangePassword}
              disabled={passwordSaving || !newPassword}
              className="rounded-lg bg-dz-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-dz-orange-600 disabled:opacity-50 transition-colors"
            >
              {passwordSaving ? "Değiştiriliyor..." : "Şifreyi Değiştir"}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Security & Account */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-red-500" />
          <h3 className="font-display text-lg font-semibold text-dz-black dark:text-dz-white">Hesap & Güvenlik</h3>
        </div>
        <p className="text-sm text-dz-grey-500 mb-4">Hesabınızdan çıkış yapmak, destek almak veya hesabınızı silmek için aşağıdaki seçenekleri kullanabilirsiniz.</p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-lg border border-red-300 dark:border-red-800 px-5 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Çıkış Yap
          </button>
          <a
            href="/iletisim"
            className="flex items-center gap-2 rounded-lg border border-dz-grey-200 dark:border-dz-grey-700 px-5 py-2.5 text-sm font-medium text-dz-grey-600 dark:text-dz-grey-400 hover:bg-dz-grey-100 dark:hover:bg-dz-grey-800 transition-colors"
          >
            <Mail className="w-4 h-4" /> Destek
          </a>
        </div>

        {/* Delete Account */}
        <div className="mt-6 pt-4 border-t border-red-200 dark:border-red-900/30">
          {!deleteConfirm ? (
            <button
              type="button"
              onClick={() => setDeleteConfirm(true)}
              className="flex items-center gap-2 text-xs text-dz-grey-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Hesabımı kalıcı olarak sil
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                Bu işlem geri alınamaz. Tüm verileriniz (XP, rozetler, notlar, sohbetler) kalıcı olarak silinecek.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                  className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> {deleting ? "Siliniyor..." : "Evet, Hesabımı Sil"}
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteConfirm(false)}
                  className="rounded-lg border border-dz-grey-200 dark:border-dz-grey-700 px-4 py-2 text-sm font-medium text-dz-grey-600 dark:text-dz-grey-400 hover:bg-dz-grey-100 dark:hover:bg-dz-grey-800 transition-colors"
                >
                  İptal
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
