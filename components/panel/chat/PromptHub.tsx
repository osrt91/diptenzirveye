"use client";

import { useState, useRef, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowBigUp,
    Plus,
    X,
    Search,
    Sparkles,
    Copy,
    Check,
    MessageSquare,
    TrendingUp,
    ScrollText,
    Scale,
    Megaphone,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

type Prompt = {
    id: string;
    title: string;
    content: string;
    category: string;
    upvote_count: number;
    created_at: string;
};

const CATEGORIES = [
    { key: "all", label: "Tümü", emoji: "🌐", desc: "Tüm kütüphane" },
    { key: "freelance", label: "Freelance", emoji: "💰", desc: "Müşteri ve gelir" },
    { key: "icerik", label: "İçerik", emoji: "✍️", desc: "Sosyal medya & blog" },
    { key: "saas", label: "SaaS", emoji: "🚀", desc: "Yazılım ve ürün" },
    { key: "veri", label: "Veri Analizi", emoji: "📊", desc: "Tablo ve grafik" },
    { key: "genel", label: "Genel", emoji: "💡", desc: "Günlük asistan" },
];

export default function PromptHub({
    initialPrompts,
    userVotedIds,
    userId,
}: {
    initialPrompts: Prompt[];
    userVotedIds: string[];
    userId: string;
}) {
    const [prompts, setPrompts] = useState(initialPrompts);
    const [activeCategory, setActiveCategory] = useState("all");
    const [search, setSearch] = useState("");
    const [showAdd, setShowAdd] = useState(false);

    // Add Prompt State
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [newCategory, setNewCategory] = useState("genel");
    const [saving, setSaving] = useState(false);

    const [votedIds, setVotedIds] = useState<Set<string>>(new Set(userVotedIds));
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [showRules, setShowRules] = useState(false);
    const [showGuidelines, setShowGuidelines] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const supabase = createClient();

    // Compute real category counts from prompts data
    const categoryCounts = CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
        if (cat.key === "all") {
            acc[cat.key] = prompts.length;
        } else {
            acc[cat.key] = prompts.filter((p) => p.category === cat.key).length;
        }
        return acc;
    }, {});

    const filtered = prompts
        .filter((p) => activeCategory === "all" || p.category === activeCategory)
        .filter(
            (p) =>
                !search ||
                p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.content.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => b.upvote_count - a.upvote_count);

    async function handleVote(promptId: string) {
        const wasVoted = votedIds.has(promptId);

        setVotedIds((prev) => {
            const next = new Set(prev);
            if (wasVoted) next.delete(promptId);
            else next.add(promptId);
            return next;
        });

        setPrompts((prev) =>
            prev.map((p) =>
                p.id === promptId
                    ? { ...p, upvote_count: p.upvote_count + (wasVoted ? -1 : 1) }
                    : p
            )
        );

        await supabase.rpc("toggle_prompt_vote", { p_prompt_id: promptId });
    }

    async function handleAdd() {
        if (!newTitle.trim() || !newContent.trim() || saving) return;
        setSaving(true);

        const { data, error } = await supabase
            .from("prompts")
            .insert({
                user_id: userId,
                title: newTitle.trim(),
                content: newContent.trim(),
                category: newCategory,
            })
            .select()
            .single();

        if (!error && data) {
            setPrompts((prev) => [data, ...prev]);
            setNewTitle("");
            setNewContent("");
            setShowAdd(false);
        }
        setSaving(false);
    }

    const copyTimerRef = useRef<ReturnType<typeof setTimeout>>(null);
    const promptGridRef = useRef<HTMLDivElement>(null);
    const feedbackRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        return () => { if (copyTimerRef.current) clearTimeout(copyTimerRef.current); };
    }, []);

    function handleCopy(id: string, content: string) {
        navigator.clipboard.writeText(content);
        setCopiedId(id);
        if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
        copyTimerRef.current = setTimeout(() => setCopiedId(null), 2000);
    }

    function categoryLabel(key: string) {
        return CATEGORIES.find((c) => c.key === key) || CATEGORIES[5];
    }

    // Highlight Variables like [Variable] in yellow
    const renderPromptContent = (text: string) => {
        const regex = /(\[[^\]]+\])/g;
        const parts = text.split(regex);
        return parts.map((part, i) => {
            if (part.match(regex)) {
                return (
                    <span key={i} className="text-dz-orange-500 font-bold bg-dz-orange-500/10 px-1 rounded inline-block mx-0.5">
                        {part}
                    </span>
                );
            }
            return part;
        });
    };

    return (
        <div className="min-h-[calc(100vh-100px)] relative">

            {/* --- HERO HEADER --- */}
            <div className="relative rounded-3xl bg-gradient-to-br from-[#111] via-dz-grey-900 to-[#0a0a0a] border border-dz-white/10 p-8 md:p-12 mb-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-dz-orange-500/20 blur-[120px] rounded-full pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-dz-orange-500/30 bg-dz-orange-500/10 text-dz-orange-500 text-xs font-bold tracking-wide uppercase mb-4">
                            <Sparkles className="w-3.5 h-3.5" /> Altın Kütüphane
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
                            Prompt <span className="text-transparent bg-clip-text bg-gradient-to-r from-dz-orange-500 to-amber-400">Hub</span>
                        </h1>
                        <p className="text-dz-grey-400 max-w-lg">
                            Test edilmiş, kanıtlanmış ve topluluk tarafından oylanmış en güçlü promptlar. Kopyala, değişkenleri doldur ve sihrin gerçekleşmesini izle.
                        </p>
                    </div>

                    <button
                        onClick={() => setShowAdd(true)}
                        className="group relative flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-dz-orange-500 hover:bg-dz-orange-600 text-white font-bold transition-all shadow-xl shadow-dz-orange-500/20 hover:shadow-dz-orange-500/40 hover:-translate-y-1 w-full md:w-auto"
                    >
                        <Plus className="w-5 h-5" />
                        Kendi Promptunu Paylaş
                        <div className="absolute inset-0 h-full w-full rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_1.5s_infinite]" />
                    </button>
                </div>
            </div>

            {/* Add Prompt Modal (Popup) */}
            <AnimatePresence>
                {showAdd && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                            onClick={() => setShowAdd(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-dz-white dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-white/10 rounded-3xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-50 max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="font-display font-bold text-2xl text-dz-black dark:text-white">Yeni Prompt Ekle</h3>
                                    <p className="text-xs text-dz-grey-500 mt-1">Toplulukla en iyi çalışan AI komutunu paylaş.</p>
                                </div>
                                <button onClick={() => setShowAdd(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-dz-grey-100 dark:bg-dz-white/5 text-dz-grey-500 hover:text-dz-black dark:hover:text-white transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-dz-grey-600 dark:text-dz-grey-400 uppercase mb-1.5">Kategori</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {CATEGORIES.filter((c) => c.key !== "all").map((cat) => (
                                            <button
                                                key={cat.key}
                                                onClick={() => setNewCategory(cat.key)}
                                                className={`flex flex-col items-center justify-center gap-1 py-3 rounded-xl border transition-all ${newCategory === cat.key
                                                    ? "bg-dz-orange-500/10 border-dz-orange-500 text-dz-orange-600 dark:text-dz-orange-500"
                                                    : "bg-dz-grey-50 dark:bg-dz-white/5 border-transparent text-dz-grey-500 hover:bg-dz-grey-100 dark:hover:bg-dz-white/10"}`}
                                            >
                                                <span className="text-xl">{cat.emoji}</span>
                                                <span className="text-xs font-bold">{cat.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-dz-grey-600 dark:text-dz-grey-400 uppercase mb-1.5">Başlık</label>
                                    <input
                                        type="text"
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                        placeholder="Örn: Kusursuz YouTube Video Senaryosu Aracı"
                                        className="w-full rounded-xl border border-dz-grey-200 dark:border-dz-white/10 bg-dz-grey-50 dark:bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-dz-orange-500/50 text-dz-black dark:text-white font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-dz-grey-600 dark:text-dz-grey-400 uppercase mb-1.5 flex justify-between">
                                        <span>Prompt İçeriği</span>
                                        <span className="text-dz-orange-500 font-normal">İpucu: [Hedef Kitle] gibi değişkenler kullan</span>
                                    </label>
                                    <textarea
                                        value={newContent}
                                        onChange={(e) => setNewContent(e.target.value)}
                                        placeholder="Sen usta bir metin yazarısın. Bana [Konu] hakkında [Hedef Kitle] için..."
                                        rows={6}
                                        className="w-full rounded-xl border border-dz-grey-200 dark:border-dz-white/10 bg-dz-grey-50 dark:bg-background px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-dz-orange-500/50 text-dz-black dark:text-white font-medium font-mono leading-relaxed"
                                    />
                                </div>

                                <button
                                    onClick={handleAdd}
                                    disabled={saving || !newTitle.trim() || !newContent.trim()}
                                    className="w-full py-4 rounded-xl bg-dz-orange-500 text-white font-bold text-sm hover:bg-dz-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-dz-orange-500/20"
                                >
                                    {saving ? "Yükleniyor..." : "Hub'a Gönder"}
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <div className="flex flex-col lg:flex-row gap-8">

                {/* --- SIDEBAR --- */}
                <div className="w-full lg:w-64 shrink-0 space-y-6">
                    {/* Arama Box */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Search className="w-4 h-4 text-dz-grey-400" />
                        </div>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Prompt Ara..."
                            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-dz-grey-200 dark:border-dz-white/10 bg-dz-white dark:bg-dz-grey-900 text-sm focus:outline-none focus:border-dz-orange-500 dark:focus:border-dz-orange-500 transition-colors shadow-sm dark:text-white"
                        />
                    </div>

                    {/* Kategoriler Listesi */}
                    <div className="bg-dz-white dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-white/10 rounded-2xl p-2 shadow-sm">
                        <div className="p-3 text-xs font-bold text-dz-grey-400 uppercase tracking-widest mb-1">
                            Kategoriler
                        </div>
                        <div className="space-y-1">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.key}
                                    onClick={() => {
                                        setActiveCategory(cat.key);
                                        promptGridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                                    }}
                                    aria-pressed={activeCategory === cat.key}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer select-none ${activeCategory === cat.key
                                            ? "bg-dz-orange-500/10 text-dz-orange-600 dark:text-dz-orange-500 font-bold"
                                            : "text-dz-grey-600 dark:text-dz-grey-400 hover:bg-dz-grey-50 dark:hover:bg-dz-white/5 font-medium"
                                        }`}
                                >
                                    <span className="text-lg">{cat.emoji}</span>
                                    <div className="flex-1 flex items-center justify-between">
                                        <div>
                                            <div className="text-sm">{cat.label}</div>
                                            {activeCategory === cat.key && (
                                                <div className="text-[10px] text-dz-orange-500/80 font-normal leading-none mt-1">
                                                    {cat.desc}
                                                </div>
                                            )}
                                        </div>
                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeCategory === cat.key
                                            ? "bg-dz-orange-500/20 text-dz-orange-600 dark:text-dz-orange-400"
                                            : "bg-dz-grey-100 dark:bg-dz-white/10 text-dz-grey-400"
                                        }`}>
                                            {categoryCounts[cat.key] ?? 0}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Trending Prompt Categories */}
                    <div className="bg-dz-white dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-white/10 rounded-2xl p-2 shadow-sm">
                        <div className="p-3 flex items-center gap-2 text-xs font-bold text-dz-grey-400 uppercase tracking-widest mb-1">
                            <TrendingUp className="w-3.5 h-3.5" /> Trend Kategoriler
                        </div>
                        <div className="space-y-1">
                            {CATEGORIES.filter((c) => c.key !== "all")
                                .map((cat) => ({
                                    ...cat,
                                    count: categoryCounts[cat.key] ?? 0,
                                    totalVotes: prompts
                                        .filter((p) => p.category === cat.key)
                                        .reduce((sum, p) => sum + p.upvote_count, 0),
                                }))
                                .sort((a, b) => b.totalVotes - a.totalVotes || b.count - a.count)
                                .map((cat) => (
                                    <button
                                        key={cat.key}
                                        onClick={() => {
                                            setActiveCategory(cat.key);
                                            promptGridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                                        }}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer select-none ${activeCategory === cat.key
                                            ? "bg-dz-orange-500/10 text-dz-orange-600 dark:text-dz-orange-500 font-bold"
                                            : "text-dz-grey-600 dark:text-dz-grey-400 hover:bg-dz-grey-50 dark:hover:bg-dz-white/5 font-medium"
                                        }`}
                                    >
                                        <span className="text-lg">{cat.emoji}</span>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm truncate">{cat.label}</div>
                                        </div>
                                        <div className="flex items-center gap-1.5 shrink-0">
                                            <span className="text-[10px] font-bold text-dz-grey-400">
                                                ({cat.count})
                                            </span>
                                            {cat.totalVotes > 0 && (
                                                <span className="flex items-center gap-0.5 text-[10px] text-dz-orange-500 font-bold">
                                                    <ArrowBigUp className="w-3 h-3" />{cat.totalVotes}
                                                </span>
                                            )}
                                        </div>
                                    </button>
                                ))}
                        </div>
                    </div>

                    {/* Quick Shortcuts */}
                    <div className="bg-dz-white dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-white/10 rounded-2xl p-2 shadow-sm">
                        <div className="p-3 text-xs font-bold text-dz-grey-400 uppercase tracking-widest mb-1">
                            Hizli Kisayollar
                        </div>
                        <div className="space-y-1">
                            <button
                                onClick={() => setShowRules((prev) => !prev)}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer select-none text-dz-grey-600 dark:text-dz-grey-400 hover:bg-dz-grey-50 dark:hover:bg-dz-white/5 font-medium"
                            >
                                <ScrollText className="w-4 h-4 shrink-0" />
                                <span className="text-sm flex-1">Prompt Kurallari</span>
                                {showRules ? <ChevronUp className="w-3.5 h-3.5 shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 shrink-0" />}
                            </button>
                            <AnimatePresence>
                                {showRules && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-3 pb-3 text-xs text-dz-grey-500 dark:text-dz-grey-400 space-y-1.5 leading-relaxed">
                                            <p>1. Baslik acik ve anlasilir olmali.</p>
                                            <p>2. [Degisken] seklinde yer tutucular kullan.</p>
                                            <p>3. Prompt en az 20 karakter olmali.</p>
                                            <p>4. Kopyala-yapistir mantigi ile calismali.</p>
                                            <p>5. Spam veya alakasiz icerik paylasilmamali.</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                onClick={() => setShowGuidelines((prev) => !prev)}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer select-none text-dz-grey-600 dark:text-dz-grey-400 hover:bg-dz-grey-50 dark:hover:bg-dz-white/5 font-medium"
                            >
                                <Scale className="w-4 h-4 shrink-0" />
                                <span className="text-sm flex-1">Topluluk Ilkeleri</span>
                                {showGuidelines ? <ChevronUp className="w-3.5 h-3.5 shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 shrink-0" />}
                            </button>
                            <AnimatePresence>
                                {showGuidelines && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-3 pb-3 text-xs text-dz-grey-500 dark:text-dz-grey-400 space-y-1.5 leading-relaxed">
                                            <p>- Saygiyla yaklasalim, yapici olalim.</p>
                                            <p>- Baskalarina ait promptlari oy ile destekleyelim.</p>
                                            <p>- Zararli veya yaniltici icerikler paylasilmamali.</p>
                                            <p>- En iyi promptlar topluluk oylamasiyla one cikar.</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                onClick={() => setShowFeedback((prev) => !prev)}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer select-none text-dz-grey-600 dark:text-dz-grey-400 hover:bg-dz-grey-50 dark:hover:bg-dz-white/5 font-medium"
                            >
                                <Megaphone className="w-4 h-4 shrink-0" />
                                <span className="text-sm flex-1">Geri Bildirim</span>
                                {showFeedback ? <ChevronUp className="w-3.5 h-3.5 shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 shrink-0" />}
                            </button>
                            <AnimatePresence>
                                {showFeedback && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-3 pb-3 space-y-2">
                                            <textarea
                                                ref={feedbackRef}
                                                placeholder="Hub hakkinda dusuncelerini paylas..."
                                                rows={3}
                                                className="w-full rounded-lg border border-dz-grey-200 dark:border-dz-white/10 bg-dz-grey-50 dark:bg-background px-3 py-2 text-xs resize-none focus:outline-none focus:ring-1 focus:ring-dz-orange-500/50 text-dz-black dark:text-white"
                                            />
                                            <button
                                                onClick={async () => {
                                                    const text = feedbackRef.current?.value?.trim();
                                                    if (!text) return;
                                                    await supabase.from("feedback").insert({ user_id: userId, message: text, source: "prompt_hub" });
                                                    if (feedbackRef.current) feedbackRef.current.value = "";
                                                    setShowFeedback(false);
                                                }}
                                                className="w-full py-2 rounded-lg bg-dz-orange-500 text-white text-xs font-bold hover:bg-dz-orange-600 transition-colors"
                                            >
                                                Gonder
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* --- PROMPT GRID --- */}
                <div className="flex-1" ref={promptGridRef}>
                    {filtered.length === 0 ? (
                        <div className="bg-dz-white dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-white/10 rounded-3xl p-12 text-center shadow-lg">
                            <div className="w-20 h-20 mx-auto rounded-full bg-dz-grey-100 dark:bg-dz-white/5 flex items-center justify-center mb-4">
                                <MessageSquare className="w-8 h-8 text-dz-grey-400" />
                            </div>
                            <h3 className="text-xl font-display font-bold text-dz-black dark:text-white mb-2">Burası biraz boş kalmış</h3>
                            <p className="text-dz-grey-500 max-w-sm mx-auto">
                                Aradığın kriterlerde henüz paylaşılmış bir prompt yok. İlk paylaşan sen olmak ister misin?
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {filtered.map((prompt, i) => {
                                const voted = votedIds.has(prompt.id);
                                const cat = categoryLabel(prompt.category);

                                return (
                                    <motion.div
                                        key={prompt.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: (i % 8) * 0.05 }}
                                        className="group relative flex flex-col h-full rounded-2xl border border-dz-grey-200 dark:border-dz-white/10 bg-dz-white dark:bg-dz-grey-900 overflow-hidden hover:border-dz-orange-300 dark:hover:border-dz-orange-500/50 hover:shadow-2xl hover:-translate-y-1 hover:shadow-dz-orange-500/10 transition-all duration-300"
                                    >
                                        {/* Glow Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-dz-orange-500/0 to-amber-500/0 group-hover:from-dz-orange-500/5 group-hover:to-transparent transition-colors duration-500 pointer-events-none" />

                                        {/* Card Header */}
                                        <div className="p-5 pb-3 flex items-start justify-between gap-4 border-b border-dz-grey-100 dark:border-dz-white/5">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="flex items-center justify-center w-5 h-5 rounded bg-dz-grey-100 dark:bg-dz-white/10 text-[10px]">
                                                        {cat.emoji}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-dz-grey-500 dark:text-dz-grey-400 tracking-wider uppercase">
                                                        {cat.label}
                                                    </span>
                                                </div>
                                                <h3 className="font-display font-bold text-lg text-dz-black dark:text-white leading-snug truncate">
                                                    {prompt.title}
                                                </h3>
                                            </div>

                                            {/* Upvote Pill */}
                                            <button
                                                onClick={() => handleVote(prompt.id)}
                                                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all border ${voted
                                                        ? "bg-dz-orange-500 text-white border-dz-orange-500 shadow-md shadow-dz-orange-500/30"
                                                        : "bg-dz-grey-50 dark:bg-background text-dz-grey-500 hover:text-dz-orange-500 border-dz-grey-200 dark:border-dz-white/10 hover:border-dz-orange-500/50"
                                                    }`}
                                            >
                                                <ArrowBigUp className={`w-4 h-4 ${voted ? "fill-white" : ""}`} />
                                                <span className="font-bold text-xs">{prompt.upvote_count}</span>
                                            </button>
                                        </div>

                                        {/* Prompt Display (Fake Code Editor Look) */}
                                        <div
                                            className="flex-1 p-5 bg-dz-grey-50/50 dark:bg-background/50 cursor-pointer"
                                            onClick={() => setExpandedId(expandedId === prompt.id ? null : prompt.id)}
                                        >
                                            <div className={`relative text-sm text-dz-grey-600 dark:text-dz-grey-400 font-mono leading-relaxed ${expandedId === prompt.id ? "max-h-80 overflow-y-auto" : "line-clamp-4"}`}>
                                                {renderPromptContent(prompt.content)}
                                            </div>
                                            {prompt.content.length > 200 && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setExpandedId(expandedId === prompt.id ? null : prompt.id);
                                                    }}
                                                    className="mt-2 flex items-center gap-1 text-[11px] font-bold text-dz-orange-500 hover:text-dz-orange-600 transition-colors"
                                                >
                                                    {expandedId === prompt.id ? (
                                                        <><ChevronUp className="w-3.5 h-3.5" /> Daralt</>
                                                    ) : (
                                                        <><ChevronDown className="w-3.5 h-3.5" /> Devamini Gor</>
                                                    )}
                                                </button>
                                            )}
                                        </div>

                                        {/* Footer Controls */}
                                        <div className="p-4 bg-dz-white dark:bg-dz-grey-900 border-t border-dz-grey-100 dark:border-dz-white/5 flex items-center justify-between mt-auto">
                                            <div className="text-[10px] font-bold text-dz-grey-400 bg-dz-grey-100 dark:bg-background px-2 py-1 rounded">
                                                {new Date(prompt.created_at).toLocaleDateString("tr-TR")}
                                            </div>

                                            <button
                                                onClick={() => handleCopy(prompt.id, prompt.content)}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${copiedId === prompt.id
                                                        ? "bg-green-500/10 text-green-600 dark:text-green-500"
                                                        : "bg-dz-orange-500/10 text-dz-orange-600 dark:text-dz-orange-500 hover:bg-dz-orange-500 hover:text-white"
                                                    }`}
                                            >
                                                {copiedId === prompt.id ? (
                                                    <>
                                                        <Check className="w-3.5 h-3.5" /> Kopyalandı!
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="w-3.5 h-3.5" /> Kullan
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
