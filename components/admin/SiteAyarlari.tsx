"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  Search,
  Shield,
  Bot,
  Save,
  Loader2,
  CheckCircle2,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";

type Setting = {
  key: string;
  value: string;
  label: string;
  category: string;
  is_secret: boolean;
  updated_at: string;
};

const CATEGORY_META: Record<string, { label: string; icon: React.ReactNode; description: string }> = {
  analytics: {
    label: "Analitik & Takip",
    icon: <BarChart3 className="w-5 h-5" />,
    description: "Google Analytics, Tag Manager, Clarity, Facebook Pixel, TikTok Pixel ayarları",
  },
  seo: {
    label: "SEO & Doğrulama",
    icon: <Search className="w-5 h-5" />,
    description: "Google Search Console ve Facebook domain doğrulama kodları",
  },
  security: {
    label: "Güvenlik",
    icon: <Shield className="w-5 h-5" />,
    description: "reCAPTCHA ve diğer güvenlik ayarları",
  },
  chatbot: {
    label: "AI Chatbot",
    icon: <Bot className="w-5 h-5" />,
    description: "AI koç/danışman ayarları, karşılama mesajı ve system prompt",
  },
};

export default function SiteAyarlari() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.settings) {
        setSettings(data.settings);
        const vals: Record<string, string> = {};
        for (const s of data.settings) {
          vals[s.key] = s.value;
        }
        setEditValues(vals);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(key: string) {
    setSaving(key);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value: editValues[key] ?? "" }),
      });
      if (res.ok) {
        setSaved(key);
        setTimeout(() => setSaved(null), 2000);
      }
    } catch {
      // ignore
    } finally {
      setSaving(null);
    }
  }

  const grouped = settings.reduce<Record<string, Setting[]>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-dz-orange-500" />
        <span className="ml-3 text-dz-grey-500">Ayarlar yükleniyor...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold text-dz-black dark:text-white">
            Site Ayarları
          </h1>
          <p className="text-sm text-dz-grey-500 dark:text-white/50 mt-1">
            Tracking kodları, SEO, güvenlik ve chatbot ayarlarını buradan yönetebilirsiniz.
          </p>
        </div>
        <button
          onClick={fetchSettings}
          className="flex items-center gap-2 px-3 py-2.5 min-h-[44px] text-sm rounded-xl bg-dz-grey-100 dark:bg-dz-grey-800 hover:bg-dz-grey-200 dark:hover:bg-dz-grey-700 transition-colors shrink-0"
        >
          <RefreshCw className="w-4 h-4" />
          Yenile
        </button>
      </div>

      {Object.entries(CATEGORY_META).map(([cat, meta]) => {
        const items = grouped[cat];
        if (!items?.length) return null;

        return (
          <div
            key={cat}
            className="bg-dz-white dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-grey-800 rounded-2xl overflow-hidden"
          >
            <div className="p-4 sm:p-5 border-b border-dz-grey-100 dark:border-dz-grey-800 bg-dz-grey-50/50 dark:bg-dz-grey-900/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-dz-orange-500/10 dark:bg-dz-orange-500/20 flex items-center justify-center text-dz-orange-500">
                  {meta.icon}
                </div>
                <div>
                  <h2 className="font-display font-bold text-dz-black dark:text-white text-sm">
                    {meta.label}
                  </h2>
                  <p className="text-xs text-dz-grey-500 dark:text-white/40">
                    {meta.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-dz-grey-100 dark:divide-dz-grey-800">
              {items.map((s) => {
                const isSecret = s.is_secret;
                const isVisible = showSecrets[s.key];
                const hasChanged = editValues[s.key] !== s.value;
                const isSaving = saving === s.key;
                const isSaved = saved === s.key;
                const isTextarea =
                  s.key === "chatbot_welcome_message" || s.key === "chatbot_system_prompt";

                return (
                  <div key={s.key} className="p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                      <div className="sm:w-1/3 shrink-0">
                        <label
                          htmlFor={`setting-${s.key}`}
                          className="text-sm font-medium text-dz-black dark:text-white"
                        >
                          {s.label}
                        </label>
                        <p className="text-xs text-dz-grey-400 dark:text-white/30 mt-0.5 font-mono">
                          {s.key}
                        </p>
                      </div>
                      <div className="flex-1 flex gap-2">
                        <div className="flex-1 relative">
                          {isTextarea ? (
                            <textarea
                              id={`setting-${s.key}`}
                              value={editValues[s.key] ?? ""}
                              onChange={(e) =>
                                setEditValues((prev) => ({
                                  ...prev,
                                  [s.key]: e.target.value,
                                }))
                              }
                              rows={3}
                              className="w-full text-sm bg-dz-grey-50 dark:bg-dz-grey-800 border border-dz-grey-200 dark:border-dz-grey-700 rounded-xl px-3 py-2.5 outline-none focus:border-dz-orange-500 transition-colors text-dz-black dark:text-white resize-y"
                            />
                          ) : (
                            <input
                              id={`setting-${s.key}`}
                              type={isSecret && !isVisible ? "password" : "text"}
                              value={editValues[s.key] ?? ""}
                              onChange={(e) =>
                                setEditValues((prev) => ({
                                  ...prev,
                                  [s.key]: e.target.value,
                                }))
                              }
                              className="w-full text-sm bg-dz-grey-50 dark:bg-dz-grey-800 border border-dz-grey-200 dark:border-dz-grey-700 rounded-xl px-3 py-2.5 outline-none focus:border-dz-orange-500 transition-colors text-dz-black dark:text-white pr-10"
                            />
                          )}
                          {isSecret && !isTextarea && (
                            <button
                              type="button"
                              onClick={() =>
                                setShowSecrets((prev) => ({
                                  ...prev,
                                  [s.key]: !prev[s.key],
                                }))
                              }
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-dz-grey-400 hover:text-dz-grey-600 dark:hover:text-white/60"
                              aria-label={isVisible ? "Gizle" : "Göster"}
                            >
                              {isVisible ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          )}
                        </div>
                        <button
                          onClick={() => handleSave(s.key)}
                          disabled={!hasChanged || isSaving}
                          className={`shrink-0 px-3 py-2.5 min-h-[44px] rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                            isSaved
                              ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                              : hasChanged
                                ? "bg-dz-orange-500 text-white hover:bg-dz-orange-600"
                                : "bg-dz-grey-100 dark:bg-dz-grey-800 text-dz-grey-400 dark:text-white/30 border border-transparent"
                          }`}
                        >
                          {isSaving ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : isSaved ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <Save className="w-4 h-4" />
                          )}
                          {isSaved ? "Kaydedildi" : "Kaydet"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
