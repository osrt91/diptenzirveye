"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, Save, X, BookOpen, Image } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Book = {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    sort_order: number;
    cover_url: string | null;
    verb: string | null;
    icon_name: string | null;
};

const emptyBook: Omit<Book, "id"> = {
    slug: "",
    title: "",
    description: "",
    sort_order: 0,
    cover_url: "",
    verb: "",
    icon_name: "",
};

export default function AdminBooksClient({
    initialBooks,
}: {
    initialBooks: Book[];
}) {
    const [books, setBooks] = useState<Book[]>(initialBooks);
    const [editing, setEditing] = useState<(Book & { isNew?: boolean }) | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        if (!editing) return;
        setLoading(true);
        const supabase = createClient();

        const { data: newId } = await supabase.rpc("admin_upsert_book", {
            p_id: editing.isNew ? null : editing.id,
            p_slug: editing.slug,
            p_title: editing.title,
            p_description: editing.description ?? "",
            p_sort_order: editing.sort_order,
            p_cover_url: editing.cover_url ?? "",
            p_verb: editing.verb ?? "",
            p_icon_name: editing.icon_name ?? "",
        });

        if (editing.isNew && newId) {
            setBooks((prev) => [...prev, { ...editing, id: newId }]);
        } else {
            setBooks((prev) =>
                prev.map((b) => (b.id === editing.id ? { ...editing } : b))
            );
        }

        setEditing(null);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu kitabı silmek istediğinizden emin misiniz?")) return;
        const supabase = createClient();
        await supabase.rpc("admin_delete_book", { p_id: id });
        setBooks((prev) => prev.filter((b) => b.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-display text-3xl font-bold text-white tracking-tight">
                        Kitaplar
                    </h1>
                    <p className="text-white/40 text-sm mt-1">{books.length} kitap</p>
                </div>
                <button
                    onClick={() =>
                        setEditing({
                            ...emptyBook,
                            id: "new",
                            sort_order: books.length + 1,
                            isNew: true,
                        } as Book & { isNew: boolean })
                    }
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-all"
                >
                    <Plus className="w-3 h-3" /> Yeni Kitap
                </button>
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
                            className="w-full max-w-lg rounded-2xl border border-white/10 bg-dz-grey-900 p-6 space-y-4"
                        >
                            <h2 className="font-display text-xl font-bold text-white">
                                {editing.isNew ? "Yeni Kitap" : "Kitap Düzenle"}
                            </h2>

                            <div className="grid gap-4">
                                <div>
                                    <label className="text-xs text-white/40 font-medium block mb-1">Başlık</label>
                                    <input
                                        value={editing.title}
                                        onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                                        className="w-full rounded-xl bg-white/5 border border-white/10 text-white text-sm px-4 py-2.5 focus:outline-none focus:border-red-500/30"
                                    />
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
                                        <label className="text-xs text-white/40 font-medium block mb-1">Sıra</label>
                                        <input
                                            type="number"
                                            value={editing.sort_order}
                                            onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })}
                                            className="w-full rounded-xl bg-white/5 border border-white/10 text-white text-sm px-4 py-2.5 focus:outline-none focus:border-red-500/30"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-white/40 font-medium block mb-1">Açıklama</label>
                                    <textarea
                                        value={editing.description ?? ""}
                                        onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                                        className="w-full rounded-xl bg-white/5 border border-white/10 text-white text-sm px-4 py-2.5 focus:outline-none focus:border-red-500/30 h-20 resize-none"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-white/40 font-medium block mb-1">Fiil (verb)</label>
                                        <input
                                            value={editing.verb ?? ""}
                                            onChange={(e) => setEditing({ ...editing, verb: e.target.value })}
                                            className="w-full rounded-xl bg-white/5 border border-white/10 text-white text-sm px-4 py-2.5 focus:outline-none focus:border-red-500/30"
                                            placeholder="Örn: Anlarsın"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-white/40 font-medium block mb-1">İkon Adı</label>
                                        <input
                                            value={editing.icon_name ?? ""}
                                            onChange={(e) => setEditing({ ...editing, icon_name: e.target.value })}
                                            className="w-full rounded-xl bg-white/5 border border-white/10 text-white text-sm px-4 py-2.5 focus:outline-none focus:border-red-500/30"
                                            placeholder="Örn: FaBrain"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-white/40 font-medium block mb-1">Kapak URL</label>
                                    <input
                                        value={editing.cover_url ?? ""}
                                        onChange={(e) => setEditing({ ...editing, cover_url: e.target.value })}
                                        className="w-full rounded-xl bg-white/5 border border-white/10 text-white text-sm px-4 py-2.5 focus:outline-none focus:border-red-500/30"
                                        placeholder="https://..."
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
                                    disabled={loading || !editing.title || !editing.slug}
                                    className="px-5 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
                                >
                                    <Save className="w-3 h-3 inline mr-1" /> {loading ? "Kaydediliyor..." : "Kaydet"}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Books Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {books.map((book, i) => (
                    <motion.div
                        key={book.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="group relative rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-white/10 transition-all"
                    >
                        {/* Cover */}
                        <div className="h-32 bg-gradient-to-br from-orange-500/20 to-amber-500/10 relative overflow-hidden">
                            {book.cover_url ? (
                                <img
                                    src={book.cover_url}
                                    alt={book.title}
                                    className="w-full h-full object-cover opacity-40"
                                    width={280}
                                    height={128}
                                    loading="lazy"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <Image className="w-8 h-8 text-white/10" />
                                </div>
                            )}
                            <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-lg">
                                #{book.sort_order}
                            </div>
                        </div>

                        <div className="p-4 space-y-2">
                            <h3 className="font-display font-bold text-white text-sm">{book.title}</h3>
                            <p className="text-xs text-white/40 line-clamp-2">{book.description}</p>
                            <div className="flex items-center gap-2 text-[10px] text-white/20 font-mono">
                                <span>{book.slug}</span>
                                {book.verb && (
                                    <>
                                        <span>•</span>
                                        <span className="text-orange-400/50">{book.verb}</span>
                                    </>
                                )}
                            </div>

                            <div className="flex gap-2 pt-2">
                                <button
                                    onClick={() => setEditing(book)}
                                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-white/5 text-white/50 text-xs hover:bg-white/10 hover:text-white transition-all"
                                >
                                    <Edit className="w-3 h-3" /> Düzenle
                                </button>
                                <button
                                    onClick={() => handleDelete(book.id)}
                                    className="px-3 py-2 rounded-lg bg-red-500/5 text-red-400/50 text-xs hover:bg-red-500/10 hover:text-red-400 transition-all"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
