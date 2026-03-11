"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Trash2, CheckCircle2, XCircle, MessageSquareText } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Testimonial = {
    id: string;
    name: string;
    role: string;
    text: string;
    rating: number;
    approved: boolean;
    created_at: string;
};

export default function AdminTestimonialsClient({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
    const [items, setItems] = useState(initialTestimonials);
    const supabase = createClient();

    const toggleApprove = async (item: Testimonial) => {
        const { error } = await supabase.from("testimonials").update({ approved: !item.approved }).eq("id", item.id);
        if (!error) setItems((prev) => prev.map((t) => (t.id === item.id ? { ...t, approved: !t.approved } : t)));
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu yorumu silmek istediğinizden emin misiniz?")) return;
        const { error } = await supabase.from("testimonials").delete().eq("id", id);
        if (!error) setItems((prev) => prev.filter((t) => t.id !== id));
    };

    const pending = items.filter((t) => !t.approved);
    const approved = items.filter((t) => t.approved);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-display font-bold text-dz-black dark:text-white">Kullanıcı Yorumları</h1>
                <p className="text-sm text-dz-grey-500 mt-1">
                    {items.length} yorum · {pending.length} onay bekliyor · {approved.length} yayında
                </p>
            </div>

            {pending.length > 0 && (
                <div>
                    <h2 className="text-sm font-bold text-dz-orange-500 uppercase tracking-wider mb-3">Onay Bekleyenler</h2>
                    <div className="space-y-3">
                        {pending.map((t) => (
                            <ReviewCard key={t.id} item={t} onApprove={() => toggleApprove(t)} onDelete={() => handleDelete(t.id)} />
                        ))}
                    </div>
                </div>
            )}

            {approved.length > 0 && (
                <div>
                    <h2 className="text-sm font-bold text-green-500 uppercase tracking-wider mb-3">Yayında</h2>
                    <div className="space-y-3">
                        {approved.map((t) => (
                            <ReviewCard key={t.id} item={t} onApprove={() => toggleApprove(t)} onDelete={() => handleDelete(t.id)} />
                        ))}
                    </div>
                </div>
            )}

            {items.length === 0 && (
                <div className="text-center py-16 text-dz-grey-500">
                    <MessageSquareText className="w-8 h-8 mx-auto mb-3 opacity-30" />
                    <p>Henüz kullanıcı yorumu yok.</p>
                </div>
            )}
        </div>
    );
}

function ReviewCard({ item, onApprove, onDelete }: { item: Testimonial & { approved: boolean }; onApprove: () => void; onDelete: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start gap-4 bg-dz-white dark:bg-dz-grey-900 border rounded-xl p-5 ${item.approved ? "border-green-200 dark:border-green-500/20" : "border-dz-orange-200 dark:border-dz-orange-500/20"}`}
        >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-dz-orange-500 to-dz-amber-400 flex items-center justify-center text-white font-bold text-xs shrink-0">
                {item.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-dz-black dark:text-white">{item.name}</span>
                    <span className="text-xs text-dz-grey-500 dark:text-white/40">{item.role}</span>
                </div>
                <div className="flex gap-0.5 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className={`w-3 h-3 ${i <= item.rating ? "text-dz-amber-400 fill-dz-amber-400" : "text-dz-grey-300 dark:text-white/20"}`} />
                    ))}
                </div>
                <p className="text-sm text-dz-grey-600 dark:text-white/60 line-clamp-3">{item.text}</p>
                <p className="text-[10px] text-dz-grey-400 dark:text-white/30 mt-2">{new Date(item.created_at).toLocaleDateString("tr-TR")}</p>
            </div>
            <div className="flex flex-col gap-1 shrink-0">
                <button
                    onClick={onApprove}
                    className={`p-2 rounded-lg transition-colors ${item.approved ? "text-dz-orange-500 hover:bg-dz-orange-500/10" : "text-green-500 hover:bg-green-500/10"}`}
                    title={item.approved ? "Yayından Kaldır" : "Onayla"}
                >
                    {item.approved ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                </button>
                <button onClick={onDelete} className="p-2 rounded-lg text-dz-grey-400 hover:text-red-500 hover:bg-red-500/10 transition-colors" title="Sil">
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    );
}
