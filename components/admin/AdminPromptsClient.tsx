"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, ThumbsUp, Lightbulb } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type ProfileData = { display_name?: string } | { display_name?: string }[] | null;

type Prompt = {
    id: string;
    title: string;
    content: string;
    category: string;
    upvote_count: number;
    created_at: string;
    user_id: string;
    profiles: ProfileData;
};

function getDisplayName(profiles: ProfileData) {
    if (!profiles) return "Anonim";
    if (Array.isArray(profiles)) return profiles[0]?.display_name || "Anonim";
    return profiles.display_name || "Anonim";
}

export default function AdminPromptsClient({
    initialPrompts,
}: {
    initialPrompts: Prompt[];
}) {
    const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts);

    const handleDelete = async (id: string) => {
        if (!confirm("Bu promptu silmek istediğinizden emin misiniz?")) return;
        const supabase = createClient();
        await supabase.rpc("admin_delete_prompt", { p_id: id });
        setPrompts((prev) => prev.filter((p) => p.id !== id));
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-display text-3xl font-bold text-dz-black dark:text-white tracking-tight">
                    Promptlar
                </h1>
                <p className="text-dz-grey-500 dark:text-white/40 text-sm mt-1">
                    {prompts.length} prompt — moderasyon paneli
                </p>
            </div>

            {prompts.length === 0 ? (
                <div className="rounded-2xl border border-dz-grey-200 dark:border-white/5 bg-white dark:bg-white/[0.02] p-12 text-center">
                    <Lightbulb className="w-8 h-8 text-dz-grey-300 dark:text-white/10 mx-auto mb-4" />
                    <p className="text-dz-grey-400 dark:text-white/30 text-sm">Henüz prompt bulunmuyor</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {prompts.map((prompt, i) => (
                        <motion.div
                            key={prompt.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.02 }}
                            className="rounded-2xl border border-dz-grey-200 dark:border-white/5 bg-white dark:bg-white/[0.02] p-5 hover:border-dz-grey-300 dark:hover:border-white/10 transition-all"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-bold text-dz-black dark:text-white text-sm">{prompt.title}</h3>
                                        <span className="text-[10px] bg-dz-grey-50 dark:bg-white/5 text-dz-grey-400 dark:text-white/30 px-2 py-0.5 rounded font-mono">
                                            {prompt.category}
                                        </span>
                                        <span className="flex items-center gap-1 text-xs text-amber-400/60">
                                            <ThumbsUp className="w-3 h-3" />
                                            {prompt.upvote_count}
                                        </span>
                                    </div>
                                    <p className="text-xs text-dz-grey-500 dark:text-white/40 line-clamp-2 mb-2">{prompt.content}</p>
                                    <div className="flex items-center gap-3 text-[10px] text-dz-grey-400 dark:text-white/20">
                                        <span>{getDisplayName(prompt.profiles)}</span>
                                        <span>•</span>
                                        <span>{new Date(prompt.created_at).toLocaleString("tr-TR")}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(prompt.id)}
                                    className="shrink-0 p-2 rounded-lg text-red-400/20 hover:text-red-400 hover:bg-red-500/5 transition-all"
                                    title="Promptu Sil"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
