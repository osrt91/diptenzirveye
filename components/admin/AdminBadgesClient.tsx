"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getAIToolIcon } from "@/components/panel/chat/ai-tool-badges";

type Badge = {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    icon_emoji: string;
    xp_required: number;
    category: string | null;
};

const emptyBadge: Omit<Badge, "id"> = {
    slug: "",
    name: "",
    description: "",
    icon_emoji: "🏅",
    xp_required: 0,
    category: "general",
};

const categories = [
    { value: "general", label: "Genel" },
    { value: "xp", label: "XP" },
    { value: "streak", label: "Seri" },
    { value: "ai-tool", label: "AI Araç" },
];

export default function AdminBadgesClient({
    initialBadges,
}: {
    initialBadges: Badge[];
}) {
    const [badges, setBadges] = useState<Badge[]>(initialBadges);
    const [editing, setEditing] = useState<(Badge & { isNew?: boolean }) | null>(null);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState<string>("");

    const handleSave = async () => {
        if (!editing) return;
        setLoading(true);
        const supabase = createClient();

        const { data: newId } = await supabase.rpc("admin_upsert_badge", {
            p_id: editing.isNew ? null : editing.id,
            p_slug: editing.slug,
            p_name: editing.name,
            p_description: editing.description ?? "",
            p_icon_emoji: editing.icon_emoji,
            p_xp_required: editing.xp_required,
            p_category: editing.category ?? "general",
        });

        if (editing.isNew && newId) {
            setBadges((prev) => [...prev, { ...editing, id: newId }]);
        } else {
            setBadges((prev) =>
                prev.map((b) => (b.id === editing.id ? { ...editing } : b))
            );
        }

        setEditing(null);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu rozeti silmek istediğinizden emin misiniz?")) return;
        const supabase = createClient();
        await supabase.rpc("admin_delete_badge", { p_id: id });
        setBadges((prev) => prev.filter((b) => b.id !== id));
    };

    const filtered = filter ? badges.filter((b) => b.category === filter) : badges;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-display text-3xl font-bold text-dz-black dark:text-white tracking-tight">
                        Rozetler
                    </h1>
                    <p className="text-dz-grey-500 dark:text-white/40 text-sm mt-1">{badges.length} rozet</p>
                </div>
                <button
                    onClick={() =>
                        setEditing({
                            ...emptyBadge,
                            id: "new",
                            isNew: true,
                        } as Badge & { isNew: boolean })
                    }
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-all"
                >
                    <Plus className="w-3 h-3" /> Yeni Rozet
                </button>
            </div>

            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
                <button
                    onClick={() => setFilter("")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${!filter
                        ? "bg-dz-black dark:bg-white/10 text-white border border-dz-black dark:border-white/20"
                        : "text-dz-grey-500 dark:text-white/40 border border-transparent hover:text-dz-black dark:hover:text-white/60"
                        }`}
                >
                    Tümü ({badges.length})
                </button>
                {categories.map((cat) => {
                    const count = badges.filter((b) => b.category === cat.value).length;
                    return (
                        <button
                            key={cat.value}
                            onClick={() => setFilter(cat.value)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === cat.value
                                ? "bg-dz-black dark:bg-white/10 text-white border border-dz-black dark:border-white/20"
                                : "text-dz-grey-500 dark:text-white/40 border border-transparent hover:text-dz-black dark:hover:text-white/60"
                                }`}
                        >
                            {cat.label} ({count})
                        </button>
                    );
                })}
            </div>

            {/* Edit Modal */}
            <AnimatePresence>
                {editing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
                        onClick={() => setEditing(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-md rounded-2xl border border-white/10 bg-dz-grey-900 p-6 space-y-4"
                        >
                            <h2 className="font-display text-xl font-bold text-white">
                                {editing.isNew ? "Yeni Rozet" : "Rozet Düzenle"}
                            </h2>

                            <div className="grid gap-4">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-2">
                                        <label className="text-xs text-white/40 font-medium block mb-1">Ad</label>
                                        <input
                                            value={editing.name}
                                            onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                                            className="w-full rounded-xl bg-white/5 border border-white/10 text-white text-sm px-4 py-2.5 focus:outline-none focus:border-red-500/30"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-white/40 font-medium block mb-1">Emoji</label>
                                        <input
                                            value={editing.icon_emoji}
                                            onChange={(e) => setEditing({ ...editing, icon_emoji: e.target.value })}
                                            className="w-full rounded-xl bg-white/5 border border-white/10 text-white text-center text-2xl px-4 py-1.5 focus:outline-none focus:border-red-500/30"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-white/40 font-medium block mb-1">Slug</label>
                                        <input
                                            value={editing.slug}
                                            onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                                            className="w-full rounded-xl bg-white/5 border border-white/10 text-white text-sm px-4 py-2.5 focus:outline-none focus:border-red-500/30"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-white/40 font-medium block mb-1">Kategori</label>
                                        <select
                                            value={editing.category ?? "general"}
                                            onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                                            className="w-full rounded-xl bg-white/5 border border-white/10 text-white text-sm px-4 py-2.5 focus:outline-none focus:border-red-500/30"
                                        >
                                            {categories.map((c) => (
                                                <option key={c.value} value={c.value} className="bg-dz-grey-900">
                                                    {c.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-white/40 font-medium block mb-1">Açıklama</label>
                                    <textarea
                                        value={editing.description ?? ""}
                                        onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                                        className="w-full rounded-xl bg-white/5 border border-white/10 text-white text-sm px-4 py-2.5 focus:outline-none focus:border-red-500/30 h-16 resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-white/40 font-medium block mb-1">Gerekli XP</label>
                                    <input
                                        type="number"
                                        value={editing.xp_required}
                                        onChange={(e) => setEditing({ ...editing, xp_required: Number(e.target.value) })}
                                        className="w-full rounded-xl bg-white/5 border border-white/10 text-white text-sm px-4 py-2.5 focus:outline-none focus:border-red-500/30"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    onClick={() => setEditing(null)}
                                    className="px-4 py-2 rounded-xl text-white/50 hover:text-white text-sm transition-colors"
                                >
                                    <X className="w-3 h-3 inline mr-1" /> İptal
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={loading || !editing.name || !editing.slug}
                                    className="px-5 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
                                >
                                    <Save className="w-3 h-3 inline mr-1" /> {loading ? "..." : "Kaydet"}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Badges Grid */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((badge, i) => {
                    const AiIcon = getAIToolIcon(badge.slug);
                    return (
                        <motion.div
                            key={badge.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.03 }}
                            className="group rounded-2xl border border-dz-grey-200 dark:border-white/5 bg-dz-white dark:bg-white/[0.02] p-4 hover:border-dz-grey-300 dark:hover:border-white/10 transition-all flex items-start gap-4 shadow-sm dark:shadow-none"
                        >
                            <div className="w-12 h-12 rounded-xl bg-dz-grey-100 dark:bg-white/5 flex items-center justify-center text-2xl shrink-0">
                                {AiIcon ? <AiIcon className="w-7 h-7 drop-shadow-md text-dz-black dark:text-white" /> : badge.icon_emoji}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-dz-black dark:text-white text-sm">{badge.name}</h3>
                                <p className="text-xs text-dz-grey-500 dark:text-white/40 mt-0.5 line-clamp-1">{badge.description}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-[10px] text-dz-grey-500 dark:text-white/20 font-mono">{badge.slug}</span>
                                    <span className="text-[10px] text-orange-500 dark:text-orange-400/40">{badge.xp_required} XP</span>
                                    {badge.category && (
                                        <span className="text-[10px] text-dz-grey-600 dark:text-white/20 bg-dz-grey-100 dark:bg-white/5 px-1.5 py-0.5 rounded">
                                            {badge.category}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-1 shrink-0">
                                <button
                                    onClick={() => setEditing(badge)}
                                    className="p-2 rounded-lg text-dz-grey-400 dark:text-white/20 hover:text-dz-black dark:hover:text-white/60 hover:bg-dz-grey-100 dark:hover:bg-white/5 transition-all"
                                >
                                    <Edit className="w-3 h-3" />
                                </button>
                                <button
                                    onClick={() => handleDelete(badge.id)}
                                    className="p-2 rounded-lg text-red-400/20 hover:text-red-400 hover:bg-red-500/5 transition-all"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    );
}
