"use client";

import { motion } from "framer-motion";
import { Users, Zap, BookOpen, Medal, Lightbulb, MessageSquare, Flag, Mail, TrendingUp } from "lucide-react";
import type { AdminStats } from "@/lib/admin";

const statCards = [
    { key: "total_users", label: "Toplam Kullanıcı", icon: Users, color: "from-blue-500 to-cyan-400" },
    { key: "active_today", label: "Bugün Aktif", icon: Zap, color: "from-green-500 to-emerald-400" },
    { key: "total_xp", label: "Toplam XP", icon: TrendingUp, color: "from-orange-500 to-amber-400" },
    { key: "total_books", label: "Kitap Sayısı", icon: BookOpen, color: "from-purple-500 to-violet-400" },
    { key: "total_badges", label: "Rozet Sayısı", icon: Medal, color: "from-yellow-500 to-amber-400" },
    { key: "total_prompts", label: "Toplam Prompt", icon: Lightbulb, color: "from-pink-500 to-rose-400" },
    { key: "total_messages", label: "Mesaj Sayısı", icon: MessageSquare, color: "from-teal-500 to-cyan-400" },
    { key: "total_reports", label: "Rapor Sayısı", icon: Flag, color: "from-red-500 to-rose-400" },
    { key: "waitlist_count", label: "Bekleme Listesi", icon: Mail, color: "from-indigo-500 to-blue-400" },
] as const;

export default function AdminDashboardClient({ stats }: { stats: AdminStats }) {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="font-display text-3xl font-bold text-white tracking-tight">
                    Genel Bakış
                </h1>
                <p className="text-white/40 text-sm mt-1">
                    Platformun genel durumu — Gerçek zamanlı istatistikler
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {statCards.map((card, i) => {
                    const Icon = card.icon;
                    const value = stats[card.key as keyof AdminStats];

                    return (
                        <motion.div
                            key={card.key}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-5 overflow-hidden hover:border-white/10 transition-all duration-300"
                        >
                            {/* Glow */}
                            <div
                                className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${card.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}
                            />

                            <div className="relative z-10 flex items-start justify-between">
                                <div>
                                    <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-2">
                                        {card.label}
                                    </p>
                                    <p className="text-3xl font-black text-white font-display">
                                        {typeof value === "number" ? value.toLocaleString("tr-TR") : value}
                                    </p>
                                </div>
                                <div
                                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} bg-opacity-20 flex items-center justify-center`}
                                >
                                    <Icon className="w-5 h-5 text-white/80" />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                <h2 className="font-display text-lg font-bold text-white mb-4">
                    Hızlı İşlemler
                </h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { href: "/admin/kullanicilar", label: "Kullanıcıları Yönet", icon: Users },
                        { href: "/admin/kitaplar", label: "Kitap Ekle/Düzenle", icon: BookOpen },
                        { href: "/admin/blog", label: "Blog Yazıları", icon: Lightbulb },
                        { href: "/admin/testimonials", label: "Yorumları İncele", icon: Mail },
                        { href: "/admin/kuponlar", label: "Kupon Yönetimi", icon: Medal },
                        { href: "/admin/raporlar", label: "Raporları İncele", icon: Flag },
                    ].map((action) => (
                        <a
                            key={action.href}
                            href={action.href}
                            className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-white/5 hover:border-white/10 transition-all"
                        >
                            <action.icon className="w-4 h-4" />
                            {action.label}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
