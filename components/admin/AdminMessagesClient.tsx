"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, MessageSquare } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type ProfileData = { display_name?: string } | { display_name?: string }[] | null;
type RoomData = { name?: string } | { name?: string }[] | null;

type Message = {
    id: string;
    content: string;
    created_at: string;
    user_id: string;
    room_id: string;
    chat_rooms: RoomData;
    profiles: ProfileData;
};

function getDisplayName(profiles: ProfileData) {
    if (!profiles) return "Anonim";
    if (Array.isArray(profiles)) return profiles[0]?.display_name || "Anonim";
    return profiles.display_name || "Anonim";
}

function getRoomName(chat_rooms: RoomData) {
    if (!chat_rooms) return "—";
    if (Array.isArray(chat_rooms)) return chat_rooms[0]?.name || "—";
    return chat_rooms.name || "—";
}

export default function AdminMessagesClient({
    initialMessages,
}: {
    initialMessages: Message[];
}) {
    const [messages, setMessages] = useState<Message[]>(initialMessages);

    const handleDelete = async (id: string) => {
        if (!confirm("Bu mesajı silmek istediğinizden emin misiniz?")) return;
        const supabase = createClient();
        await supabase.rpc("admin_delete_message", { p_id: id });
        setMessages((prev) => prev.filter((m) => m.id !== id));
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-display text-3xl font-bold text-dz-black dark:text-white tracking-tight">
                    Mesajlar
                </h1>
                <p className="text-dz-grey-500 dark:text-white/40 text-sm mt-1">
                    Son {messages.length} mesaj
                </p>
            </div>

            <div className="rounded-2xl border border-dz-grey-200 dark:border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[650px]">
                        <thead>
                            <tr className="border-b border-dz-grey-200 dark:border-white/5 bg-white dark:bg-white/[0.02]">
                                <th className="text-left text-xs font-bold text-dz-grey-500 dark:text-white/40 uppercase tracking-wider px-5 py-3 whitespace-nowrap">
                                    Kullanıcı
                                </th>
                                <th className="text-left text-xs font-bold text-dz-grey-500 dark:text-white/40 uppercase tracking-wider px-5 py-3 whitespace-nowrap">
                                    Oda
                                </th>
                                <th className="text-left text-xs font-bold text-dz-grey-500 dark:text-white/40 uppercase tracking-wider px-5 py-3 whitespace-nowrap">
                                    Mesaj
                                </th>
                                <th className="text-left text-xs font-bold text-dz-grey-500 dark:text-white/40 uppercase tracking-wider px-5 py-3 whitespace-nowrap">
                                    Tarih
                                </th>
                                <th className="text-right text-xs font-bold text-dz-grey-500 dark:text-white/40 uppercase tracking-wider px-5 py-3 whitespace-nowrap">
                                    İşlem
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dz-grey-200 dark:divide-white/5">
                            {messages.map((msg, i) => (
                                <motion.tr
                                    key={msg.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.01 }}
                                    className="hover:bg-dz-grey-100 dark:hover:bg-white/[0.02] transition-colors"
                                >
                                    <td className="px-5 py-3">
                                        <span className="text-sm text-dz-grey-700 dark:text-white/70">
                                            {getDisplayName(msg.profiles)}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3">
                                        <span className="inline-flex items-center gap-1 text-xs text-dz-grey-500 dark:text-white/40 bg-dz-grey-50 dark:bg-white/5 px-2 py-1 rounded">
                                            <MessageSquare className="w-3 h-3" />
                                            {getRoomName(msg.chat_rooms)}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 max-w-md">
                                        <p className="text-sm text-dz-grey-600 dark:text-white/60 truncate">{msg.content}</p>
                                    </td>
                                    <td className="px-5 py-3">
                                        <span className="text-xs text-dz-grey-400 dark:text-white/30 font-mono">
                                            {new Date(msg.created_at).toLocaleString("tr-TR")}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-right">
                                        <button
                                            onClick={() => handleDelete(msg.id)}
                                            className="w-11 h-11 flex items-center justify-center rounded-lg text-red-400/30 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                            title="Mesajı Sil"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
