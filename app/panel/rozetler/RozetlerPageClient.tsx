"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import RozetlerGrid from "@/components/panel/gamification/RozetlerGrid";
import { Bot, Flame, Zap, LayoutGrid } from "lucide-react";

type Badge = {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    icon_emoji: string;
    xp_required: number;
};

// AI Araç rozetleri — seed data (client-side, Supabase'den gelen rozetlere eklenir)
const AI_TOOL_BADGES: Badge[] = [
    { id: "ai-chatgpt", slug: "chatgpt-kullanici", name: "ChatGPT Master", description: "ChatGPT ile ileri seviye prompt mühendisliği yap", icon_emoji: "🤖", xp_required: 0 },
    { id: "ai-claude", slug: "claude-kullanici", name: "Claude Analisti", description: "Claude AI ile derinlemesine veri ve metin analizi yap", icon_emoji: "🧠", xp_required: 0 },
    { id: "ai-gemini", slug: "gemini-kullanici", name: "Gemini Kaşifi", description: "Google Gemini ile multimodal (görsel/metin) çalış", icon_emoji: "✨", xp_required: 0 },
    { id: "ai-midjourney", slug: "midjourney-kullanici", name: "Midjourney Sanatçısı", description: "Midjourney ile premium görseller üret", icon_emoji: "🎨", xp_required: 0 },
    { id: "ai-cursor", slug: "cursor-kullanici", name: "Cursor Geliştiricisi", description: "Cursor AI ile kendi projeni kodla", icon_emoji: "💻", xp_required: 0 },
    { id: "ai-zapier", slug: "zapier-kullanici", name: "Zapier Otomasyoncusu", description: "Zapier ile iş akışlarını otomatikleştir", icon_emoji: "⚡", xp_required: 0 },
    { id: "ai-v0", slug: "v0-kullanici", name: "V0 Tasarımcısı", description: "V0 by Vercel ile arayüz tasarımları oluştur", icon_emoji: "📐", xp_required: 0 },
    { id: "ai-perplexity", slug: "perplexity-kullanici", name: "Perplexity Araştırmacısı", description: "Perplexity ile derinlemesine yapay zeka araştırması yap", icon_emoji: "🔍", xp_required: 0 },
    { id: "ai-notion", slug: "notion-kullanici", name: "Notion AI Lideri", description: "Notion AI ile çalışma alanını zenginleştir", icon_emoji: "📝", xp_required: 0 },
    { id: "ai-github", slug: "copilot-kullanici", name: "GitHub Copilot", description: "Copilot ile kod yazım hızını ikiye katla", icon_emoji: "🐙", xp_required: 0 },
    { id: "ai-deepseek", slug: "deepseek-kullanici", name: "DeepSeek Analisti", description: "DeepSeek ile ileri seviye kod analizi ve muhakeme yap", icon_emoji: "🔬", xp_required: 0 },
    { id: "ai-grok", slug: "grok-kullanici", name: "Grok Kullanıcısı", description: "Grok ile gerçek zamanlı bilgiye eriş ve analiz yap", icon_emoji: "⚡", xp_required: 0 },
];

const BOOK_BADGES: Badge[] = [
    { id: "book-1", slug: "book-1-tamamla", name: "İlk Adım", description: "AI Devrimini Anlamak kitabını tamamla", icon_emoji: "📖", xp_required: 100 },
    { id: "book-3", slug: "book-3-tamamla", name: "Araç Ustası", description: "3 kitabı tamamla", icon_emoji: "📚", xp_required: 300 },
    { id: "book-5", slug: "book-5-tamamla", name: "Bilgi Savaşçısı", description: "5 kitabı tamamla", icon_emoji: "⚔️", xp_required: 500 },
    { id: "book-10", slug: "book-10-tamamla", name: "Zirve Fatihi", description: "Tüm 10 kitabı tamamla - Tam sertifika", icon_emoji: "🏆", xp_required: 1000 },
];

const COMMUNITY_BADGES: Badge[] = [
    { id: "comm-first-msg", slug: "ilk-mesaj", name: "Ses Ver", description: "Sohbette ilk mesajını gönder", icon_emoji: "💬", xp_required: 0 },
    { id: "comm-10-msg", slug: "10-mesaj", name: "Aktif Üye", description: "10 mesaj paylaş", icon_emoji: "🗣️", xp_required: 0 },
    { id: "comm-prompt", slug: "ilk-prompt-hub", name: "Prompt Paylaşıcı", description: "Prompt Hub'a ilk paylaşımını yap", icon_emoji: "💡", xp_required: 0 },
    { id: "comm-pomodoro-10", slug: "pomodoro-10", name: "Odak Makinesi", description: "10 Pomodoro oturumu tamamla", icon_emoji: "🎯", xp_required: 0 },
    { id: "comm-pomodoro-50", slug: "pomodoro-50", name: "Zihin Motoru", description: "50 Pomodoro oturumu tamamla", icon_emoji: "🧠", xp_required: 0 },
    { id: "comm-note-10", slug: "note-10", name: "Not Ustası", description: "10 not oluştur", icon_emoji: "📝", xp_required: 0 },
];

const categories = [
    { key: undefined as string | undefined, label: "Tüm Rozetler", icon: LayoutGrid },
    { key: "ai-tool", label: "AI Araçları", icon: Bot },
    { key: "xp", label: "XP & Seviye", icon: Zap },
    { key: "streak", label: "Seri Ustası", icon: Flame },
    { key: "book", label: "Kitap", icon: LayoutGrid },
    { key: "community", label: "Topluluk", icon: Bot },
];

export default function RozetlerPageClient({
    badges: dbBadges,
    earnedBadgeIds,
}: {
    badges: Badge[];
    earnedBadgeIds: string[];
}) {
    const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);

    // Birleştir: DB rozetleri + AI araç rozetleri (çakışanları atla)
    const allBadges = useMemo(() => {
        const dbSlugs = new Set(dbBadges.map((b) => b.slug));
        const extras = [...AI_TOOL_BADGES, ...BOOK_BADGES, ...COMMUNITY_BADGES].filter((b) => !dbSlugs.has(b.slug));
        return [...dbBadges, ...extras];
    }, [dbBadges]);

    const earnedIds = useMemo(() => new Set(earnedBadgeIds), [earnedBadgeIds]);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="relative overflow-hidden rounded-3xl bg-dz-black dark:bg-dz-grey-900 border border-dz-grey-800 p-8 shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-dz-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-dz-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="font-display text-4xl font-black text-white tracking-tight">
                            Rozet Koleksiyonu
                        </h1>
                        <p className="text-dz-grey-400 mt-2 font-medium max-w-lg">
                            Yapay zeka araçlarında ustalaş, görevleri tamamla, sınırlarını zorla ve <span className="font-display"><span className="font-black">Dipten</span><span className="font-normal">Zirveye</span></span> ekosistemindeki seçkin rozetleri profiline ekle.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                        <div className="text-center">
                            <div className="text-2xl font-black text-dz-amber-400">{earnedIds.size}</div>
                            <div className="text-[10px] font-bold text-dz-grey-400 uppercase tracking-widest">Kazanılan</div>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div className="text-center">
                            <div className="text-2xl font-black text-white">{allBadges.length}</div>
                            <div className="text-[10px] font-bold text-dz-grey-400 uppercase tracking-widest">Toplam</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                    const isActive = activeCategory === cat.key;
                    const Icon = cat.icon;
                    return (
                        <motion.button
                            key={cat.key ?? "all"}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveCategory(cat.key)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${isActive
                                ? "bg-dz-orange-500 text-white shadow-md shadow-dz-orange-500/20"
                                : "bg-dz-grey-100 dark:bg-dz-grey-800 text-dz-grey-600 dark:text-dz-grey-400 hover:bg-dz-grey-200 dark:hover:bg-dz-grey-700"
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {cat.label}
                        </motion.button>
                    );
                })}
            </div>

            {/* Grid */}
            <RozetlerGrid
                badges={allBadges}
                earnedIds={earnedIds}
                activeCategory={activeCategory}
            />
        </div>
    );
}
