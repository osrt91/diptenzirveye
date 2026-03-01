"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Eye, EyeOff, Save, X, PenTool } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type BlogPost = {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    read_time: string;
    published: boolean;
    created_at: string;
    cover_image?: string;
};

const CATEGORIES = ["Verimlilik", "Odaklanma", "Psikoloji", "AI", "Alışkanlıklar", "Kariyer"];

function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i")
        .replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

export default function AdminBlogClient({ initialPosts }: { initialPosts: BlogPost[] }) {
    const [posts, setPosts] = useState(initialPosts);
    const [editing, setEditing] = useState<BlogPost | null>(null);
    const [creating, setCreating] = useState(false);
    const [form, setForm] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        category: "Verimlilik",
        read_time: "3 Dk Okuma",
        published: false,
        cover_image: "",
    });

    const supabase = createClient();

    const resetForm = () => {
        setForm({ title: "", slug: "", excerpt: "", content: "", category: "Verimlilik", read_time: "3 Dk Okuma", published: false, cover_image: "" });
        setEditing(null);
        setCreating(false);
    };

    const handleSave = async () => {
        const slug = form.slug || generateSlug(form.title);
        const payload = { ...form, slug };

        if (editing) {
            const { error } = await supabase.from("blog_posts").update(payload).eq("id", editing.id);
            if (!error) {
                setPosts((prev) => prev.map((p) => (p.id === editing.id ? { ...p, ...payload } : p)));
                resetForm();
            }
        } else {
            const { data, error } = await supabase.from("blog_posts").insert(payload).select().single();
            if (!error && data) {
                setPosts((prev) => [data, ...prev]);
                resetForm();
            }
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu yazıyı silmek istediğinizden emin misiniz?")) return;
        const { error } = await supabase.from("blog_posts").delete().eq("id", id);
        if (!error) setPosts((prev) => prev.filter((p) => p.id !== id));
    };

    const togglePublish = async (post: BlogPost) => {
        const { error } = await supabase.from("blog_posts").update({ published: !post.published }).eq("id", post.id);
        if (!error) setPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, published: !p.published } : p)));
    };

    const startEdit = (post: BlogPost) => {
        setEditing(post);
        setCreating(true);
        setForm({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            read_time: post.read_time,
            published: post.published,
            cover_image: post.cover_image || "",
        });
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-display font-bold">Blog Yazıları</h1>
                    <p className="text-sm text-dz-grey-500 mt-1">{posts.length} yazı</p>
                </div>
                <button
                    onClick={() => { resetForm(); setCreating(true); }}
                    className="flex items-center gap-2 bg-dz-orange-500 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-dz-orange-600 transition-colors"
                >
                    <Plus className="w-4 h-4" /> Yeni Yazı
                </button>
            </div>

            {creating && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-dz-white dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-white/10 rounded-2xl p-6 mb-8 space-y-4"
                >
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="font-display font-bold text-lg">{editing ? "Yazıyı Düzenle" : "Yeni Yazı"}</h2>
                        <button onClick={resetForm} className="text-dz-grey-400 hover:text-dz-black dark:hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold mb-1 text-dz-grey-500">Başlık</label>
                            <input
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })}
                                className="w-full rounded-lg border border-dz-grey-200 dark:border-white/10 bg-dz-grey-50 dark:bg-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dz-orange-500/30"
                                placeholder="Yazı başlığı"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold mb-1 text-dz-grey-500">Slug</label>
                            <input
                                value={form.slug}
                                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                                className="w-full rounded-lg border border-dz-grey-200 dark:border-white/10 bg-dz-grey-50 dark:bg-black px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-dz-orange-500/30"
                                placeholder="url-slug"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold mb-1 text-dz-grey-500">Özet</label>
                        <input
                            value={form.excerpt}
                            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                            className="w-full rounded-lg border border-dz-grey-200 dark:border-white/10 bg-dz-grey-50 dark:bg-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dz-orange-500/30"
                            placeholder="Kısa özet (blog listesinde görünür)"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold mb-1 text-dz-grey-500">Kapak Görseli URL</label>
                        <div className="flex gap-3">
                            <input
                                value={form.cover_image}
                                onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
                                className="w-full rounded-lg border border-dz-grey-200 dark:border-white/10 bg-dz-grey-50 dark:bg-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dz-orange-500/30"
                                placeholder="https://ornek.com/gorsel.jpg"
                            />
                            {form.cover_image && (
                                <img
                                    src={form.cover_image}
                                    alt="Önizleme"
                                    className="w-16 h-10 object-cover rounded-lg border border-dz-grey-200 dark:border-white/10 shrink-0"
                                />
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold mb-1 text-dz-grey-500">İçerik (Markdown destekli)</label>
                        <textarea
                            value={form.content}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                            rows={12}
                            className="w-full rounded-lg border border-dz-grey-200 dark:border-white/10 bg-dz-grey-50 dark:bg-black px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-dz-orange-500/30 resize-none"
                            placeholder="## Başlık&#10;&#10;Paragraf metni...&#10;&#10;- Madde 1&#10;- Madde 2"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-bold mb-1 text-dz-grey-500">Kategori</label>
                            <select
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                className="w-full rounded-lg border border-dz-grey-200 dark:border-white/10 bg-dz-grey-50 dark:bg-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dz-orange-500/30"
                            >
                                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold mb-1 text-dz-grey-500">Okuma Süresi</label>
                            <input
                                value={form.read_time}
                                onChange={(e) => setForm({ ...form, read_time: e.target.value })}
                                className="w-full rounded-lg border border-dz-grey-200 dark:border-white/10 bg-dz-grey-50 dark:bg-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dz-orange-500/30"
                                placeholder="3 Dk Okuma"
                            />
                        </div>
                        <div className="flex items-end">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={form.published}
                                    onChange={(e) => setForm({ ...form, published: e.target.checked })}
                                    className="w-4 h-4 rounded accent-dz-orange-500"
                                />
                                <span className="text-sm font-bold">Yayınla</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button onClick={resetForm} className="px-4 py-2 text-sm font-medium text-dz-grey-500 hover:text-dz-black dark:hover:text-white transition-colors">
                            İptal
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={!form.title.trim()}
                            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-green-600 transition-colors disabled:opacity-40"
                        >
                            <Save className="w-4 h-4" /> {editing ? "Güncelle" : "Kaydet"}
                        </button>
                    </div>
                </motion.div>
            )}

            <div className="space-y-3">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="flex items-center justify-between bg-dz-white dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-white/10 rounded-xl px-5 py-4"
                    >
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className={`w-2 h-2 rounded-full shrink-0 ${post.published ? "bg-green-500" : "bg-dz-grey-300"}`} />
                            <div className="min-w-0">
                                <h3 className="font-bold text-sm truncate">{post.title}</h3>
                                <p className="text-xs text-dz-grey-500 mt-0.5">
                                    {post.category} · {post.read_time} · {new Date(post.created_at).toLocaleDateString("tr-TR")}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <button
                                onClick={() => togglePublish(post)}
                                className={`p-2 rounded-lg transition-colors ${post.published ? "text-green-500 hover:bg-green-500/10" : "text-dz-grey-400 hover:bg-dz-grey-100 dark:hover:bg-white/5"}`}
                                title={post.published ? "Yayından Kaldır" : "Yayınla"}
                            >
                                {post.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>
                            <button
                                onClick={() => startEdit(post)}
                                className="p-2 rounded-lg text-dz-grey-400 hover:text-dz-orange-500 hover:bg-dz-orange-500/10 transition-colors"
                                title="Düzenle"
                            >
                                <PenTool className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleDelete(post.id)}
                                className="p-2 rounded-lg text-dz-grey-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                title="Sil"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}

                {posts.length === 0 && (
                    <div className="text-center py-16 text-dz-grey-500">
                        <PenTool className="w-8 h-8 mx-auto mb-3 opacity-30" />
                        <p>Henüz blog yazısı yok. İlk yazınızı oluşturun!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
