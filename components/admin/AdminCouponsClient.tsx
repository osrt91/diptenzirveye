"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Save, X, Ticket, ToggleLeft, ToggleRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Coupon = {
    id: string;
    code: string;
    discount_percent: number;
    max_uses: number | null;
    used_count: number;
    active: boolean;
    expires_at: string | null;
    created_at: string;
};

export default function AdminCouponsClient({ initialCoupons }: { initialCoupons: Coupon[] }) {
    const [coupons, setCoupons] = useState(initialCoupons);
    const [creating, setCreating] = useState(false);
    const [form, setForm] = useState({ code: "", discount_percent: 10, max_uses: "", expires_at: "" });

    const supabase = createClient();

    const handleCreate = async () => {
        const code = form.code.trim().toUpperCase();
        if (!code) return;

        const payload = {
            code,
            discount_percent: form.discount_percent,
            max_uses: form.max_uses ? parseInt(form.max_uses) : null,
            expires_at: form.expires_at || null,
            active: true,
        };

        const { data, error } = await supabase.from("coupons").insert(payload).select().single();
        if (!error && data) {
            setCoupons((prev) => [data, ...prev]);
            setForm({ code: "", discount_percent: 10, max_uses: "", expires_at: "" });
            setCreating(false);
        }
    };

    const toggleActive = async (coupon: Coupon) => {
        const { error } = await supabase.from("coupons").update({ active: !coupon.active }).eq("id", coupon.id);
        if (!error) setCoupons((prev) => prev.map((c) => (c.id === coupon.id ? { ...c, active: !c.active } : c)));
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu kuponu silmek istediğinizden emin misiniz?")) return;
        const { error } = await supabase.from("coupons").delete().eq("id", id);
        if (!error) setCoupons((prev) => prev.filter((c) => c.id !== id));
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
                <div>
                    <h1 className="text-2xl font-display font-bold text-dz-black dark:text-white">Kuponlar</h1>
                    <p className="text-sm text-dz-grey-500 dark:text-white/40 mt-1">{coupons.length} kupon · {coupons.filter((c) => c.active).length} aktif</p>
                </div>
                <button
                    onClick={() => setCreating(true)}
                    className="flex items-center gap-2 bg-dz-orange-500 text-white px-4 py-2.5 min-h-[44px] rounded-xl font-bold text-sm hover:bg-dz-orange-600 transition-colors"
                >
                    <Plus className="w-4 h-4" /> Yeni Kupon
                </button>
            </div>

            {creating && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-dz-white dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-grey-700 rounded-2xl p-6 mb-8 space-y-4"
                >
                    <div className="flex items-center justify-between">
                        <h2 className="font-display font-bold text-lg text-dz-black dark:text-white">Yeni Kupon Oluştur</h2>
                        <button onClick={() => setCreating(false)} className="w-11 h-11 flex items-center justify-center rounded-lg text-dz-grey-400 hover:text-dz-black dark:hover:text-white hover:bg-dz-grey-100 dark:hover:bg-white/5 transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold mb-1 text-dz-grey-500">Kupon Kodu</label>
                            <input
                                value={form.code}
                                onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                                className="w-full rounded-lg border border-dz-grey-200 dark:border-dz-grey-700 bg-dz-grey-50 dark:bg-dz-grey-800 px-3 py-2 text-sm text-dz-black dark:text-white font-mono uppercase focus:outline-none focus:ring-2 focus:ring-dz-orange-500/30"
                                placeholder="HOSGELDIN"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold mb-1 text-dz-grey-500">İndirim (%)</label>
                            <input
                                type="number"
                                min={1}
                                max={100}
                                value={form.discount_percent}
                                onChange={(e) => setForm({ ...form, discount_percent: parseInt(e.target.value) || 0 })}
                                className="w-full rounded-lg border border-dz-grey-200 dark:border-dz-grey-700 bg-dz-grey-50 dark:bg-dz-grey-800 px-3 py-2 text-sm text-dz-black dark:text-white focus:outline-none focus:ring-2 focus:ring-dz-orange-500/30"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold mb-1 text-dz-grey-500">Maks. Kullanım (boş = sınırsız)</label>
                            <input
                                type="number"
                                min={1}
                                value={form.max_uses}
                                onChange={(e) => setForm({ ...form, max_uses: e.target.value })}
                                className="w-full rounded-lg border border-dz-grey-200 dark:border-dz-grey-700 bg-dz-grey-50 dark:bg-dz-grey-800 px-3 py-2 text-sm text-dz-black dark:text-white focus:outline-none focus:ring-2 focus:ring-dz-orange-500/30"
                                placeholder="Sınırsız"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold mb-1 text-dz-grey-500">Son Kullanma Tarihi (opsiyonel)</label>
                            <input
                                type="date"
                                value={form.expires_at}
                                onChange={(e) => setForm({ ...form, expires_at: e.target.value })}
                                className="w-full rounded-lg border border-dz-grey-200 dark:border-dz-grey-700 bg-dz-grey-50 dark:bg-dz-grey-800 px-3 py-2 text-sm text-dz-black dark:text-white focus:outline-none focus:ring-2 focus:ring-dz-orange-500/30"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button onClick={() => setCreating(false)} className="px-4 py-2.5 min-h-[44px] text-sm font-medium text-dz-grey-500 dark:text-white/50 hover:text-dz-black dark:hover:text-white transition-colors">İptal</button>
                        <button
                            onClick={handleCreate}
                            disabled={!form.code.trim() || form.discount_percent < 1}
                            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2.5 min-h-[44px] rounded-xl font-bold text-sm hover:bg-red-600 disabled:opacity-40"
                        >
                            <Save className="w-4 h-4" /> Oluştur
                        </button>
                    </div>
                </motion.div>
            )}

            <div className="space-y-3">
                {coupons.map((coupon) => (
                    <div
                        key={coupon.id}
                        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-dz-white dark:bg-dz-grey-900 border rounded-xl px-5 py-4 transition-opacity ${coupon.active ? "border-dz-grey-200 dark:border-dz-grey-700" : "border-dz-grey-100 dark:border-dz-grey-800 opacity-50"}`}
                    >
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${coupon.active ? "bg-dz-orange-500/10 text-dz-orange-500" : "bg-dz-grey-100 dark:bg-dz-grey-800 text-dz-grey-400"}`}>
                                <Ticket className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                                <div className="flex items-center gap-3">
                                    <span className="font-mono font-bold text-sm tracking-wider text-dz-black dark:text-white">{coupon.code}</span>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 font-bold">%{coupon.discount_percent}</span>
                                </div>
                                <p className="text-xs text-dz-grey-500 mt-0.5">
                                    {coupon.used_count}/{coupon.max_uses ?? "∞"} kullanım
                                    {coupon.expires_at && ` · Son: ${new Date(coupon.expires_at).toLocaleDateString("tr-TR")}`}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <button
                                onClick={() => toggleActive(coupon)}
                                className={`w-11 h-11 flex items-center justify-center rounded-lg transition-colors ${coupon.active ? "text-green-500 hover:bg-green-500/10" : "text-dz-grey-400 hover:bg-dz-grey-100 dark:hover:bg-dz-grey-800"}`}
                                title={coupon.active ? "Devre Dışı Bırak" : "Aktif Et"}
                            >
                                {coupon.active ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                            </button>
                            <button
                                onClick={() => handleDelete(coupon.id)}
                                className="w-11 h-11 flex items-center justify-center rounded-lg text-dz-grey-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                title="Sil"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}

                {coupons.length === 0 && (
                    <div className="text-center py-16 text-dz-grey-500">
                        <Ticket className="w-8 h-8 mx-auto mb-3 opacity-30" />
                        <p>Henüz kupon yok. İlk kuponu oluşturun!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
