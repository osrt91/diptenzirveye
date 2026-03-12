"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Shield, Zap, Medal, Edit, Check, X, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { AdminUser } from "@/lib/admin";
import { useToast } from "@/components/ui/Toast";

export default function AdminUsersClient({
    initialUsers,
}: {
    initialUsers: AdminUser[];
}) {
    const [users, setUsers] = useState<AdminUser[]>(initialUsers);
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editXp, setEditXp] = useState(0);
    const [loading, setLoading] = useState(false);
    const [roleLoading, setRoleLoading] = useState<string | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const { addToast } = useToast();

    const handleSearch = async () => {
        setLoading(true);
        const supabase = createClient();
        const { data } = await supabase.rpc("admin_list_users", {
            lim: 50,
            off: 0,
            search,
        });
        setUsers(data ?? []);
        setLoading(false);
    };

    const handleUpdateXp = async (userId: string) => {
        const supabase = createClient();
        await supabase.rpc("admin_update_user_xp", {
            target_user_id: userId,
            new_xp: editXp,
        });
        setUsers((prev) =>
            prev.map((u) =>
                u.id === userId ? { ...u, total_xp: editXp, level: Math.max(1, Math.floor(editXp / 100) + 1) } : u
            )
        );
        setEditingId(null);
    };

    const handleDeleteUser = async (userId: string) => {
        try {
            const res = await fetch("/api/admin/users", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId }),
            });
            const data = await res.json();
            if (!res.ok) {
                addToast(data.error || "Silme hatası", "error");
                return;
            }
            setUsers((prev) => prev.filter((u) => u.id !== userId));
            addToast("Kullanıcı başarıyla silindi", "success");
        } catch {
            addToast("Kullanıcı silinemedi", "error");
        } finally {
            setDeleteConfirm(null);
        }
    };

    const handleRoleChange = async (userId: string, newRole: string) => {
        setRoleLoading(userId);
        const supabase = createClient();
        const isAdmin = newRole === "admin";
        await supabase.from("profiles").update({ role: newRole, is_admin: isAdmin }).eq("id", userId);
        setUsers((prev) =>
            prev.map((u) => (u.id === userId ? { ...u, role: newRole, is_admin: isAdmin } : u))
        );
        setRoleLoading(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-display text-3xl font-bold text-dz-black dark:text-white tracking-tight">
                        Kullanıcılar
                    </h1>
                    <p className="text-dz-grey-500 dark:text-white/40 text-sm mt-1">
                        {users.length} kullanıcı listeleniyor
                    </p>
                </div>
            </div>

            {/* Search */}
            <div className="flex gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dz-grey-400 dark:text-white/20 w-4 h-4" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        placeholder="Kullanıcı adı ile ara..."
                        className="w-full rounded-xl border border-dz-grey-200 dark:border-white/10 bg-dz-grey-50 dark:bg-dz-grey-800 text-dz-black dark:text-white placeholder:text-dz-grey-400 dark:placeholder:text-white/20 pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-red-500/30 focus:ring-1 focus:ring-red-500/20 transition-all"
                    />
                </div>
                <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="px-6 min-h-[44px] rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-all disabled:opacity-50"
                >
                    {loading ? "..." : "Ara"}
                </button>
            </div>

            {/* Users Table */}
            <div className="rounded-2xl border border-dz-grey-200 dark:border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                        <thead>
                            <tr className="border-b border-dz-grey-200 dark:border-white/5 bg-white dark:bg-white/[0.02]">
                                <th className="text-left text-xs font-bold text-dz-grey-500 dark:text-white/40 uppercase tracking-wider px-5 py-3 whitespace-nowrap">
                                    Kullanıcı
                                </th>
                                <th className="text-left text-xs font-bold text-dz-grey-500 dark:text-white/40 uppercase tracking-wider px-5 py-3 whitespace-nowrap">
                                    Seviye / XP
                                </th>
                                <th className="text-left text-xs font-bold text-dz-grey-500 dark:text-white/40 uppercase tracking-wider px-5 py-3 whitespace-nowrap">
                                    Seri
                                </th>
                                <th className="text-left text-xs font-bold text-dz-grey-500 dark:text-white/40 uppercase tracking-wider px-5 py-3 whitespace-nowrap">
                                    Rozetler
                                </th>
                                <th className="text-left text-xs font-bold text-dz-grey-500 dark:text-white/40 uppercase tracking-wider px-5 py-3 whitespace-nowrap">
                                    Rol
                                </th>
                                <th className="text-right text-xs font-bold text-dz-grey-500 dark:text-white/40 uppercase tracking-wider px-5 py-3 whitespace-nowrap">
                                    İşlem
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dz-grey-200 dark:divide-white/5">
                            {users.map((user, i) => (
                                <motion.tr
                                    key={user.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.02 }}
                                    className="hover:bg-dz-grey-100 dark:hover:bg-white/[0.02] transition-colors"
                                >
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                                {(user.display_name || "?")[0].toUpperCase()}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-dz-black dark:text-white truncate">
                                                    {user.display_name || "Anonim"}
                                                </p>
                                                <p className="text-xs text-dz-grey-400 dark:text-white/30 font-mono truncate">
                                                    {user.id.slice(0, 8)}...
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        {editingId === user.id ? (
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    value={editXp}
                                                    onChange={(e) => setEditXp(Number(e.target.value))}
                                                    className="w-24 rounded-lg bg-dz-grey-50 dark:bg-dz-grey-800 border border-dz-grey-200 dark:border-white/10 text-dz-black dark:text-white text-sm px-3 py-1.5 focus:outline-none focus:border-red-500/30"
                                                />
                                                <button
                                                    onClick={() => handleUpdateXp(user.id)}
                                                    className="w-9 h-9 flex items-center justify-center rounded-lg text-green-400 hover:text-green-300 hover:bg-green-500/10 transition-colors"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setEditingId(null)}
                                                    className="w-9 h-9 flex items-center justify-center rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div>
                                                <span className="text-sm font-bold text-dz-black dark:text-white">Lv.{user.level}</span>
                                                <span className="text-xs text-dz-grey-400 dark:text-white/30 ml-2">{user.total_xp} XP</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="flex items-center gap-1 text-sm text-amber-400">
                                            <Zap className="w-3 h-3" />
                                            {user.streak} gün
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="flex items-center gap-1 text-sm text-dz-grey-600 dark:text-white/60">
                                            <Medal className="w-3 h-3" />
                                            {user.badge_count}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <select
                                            value={user.role || (user.is_admin ? "admin" : "user")}
                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                            disabled={roleLoading === user.id}
                                            className={`text-xs font-bold rounded-full px-3 py-1.5 border cursor-pointer focus:outline-none transition-colors ${
                                                (user.role || (user.is_admin ? "admin" : "user")) === "admin"
                                                    ? "text-red-400 bg-red-500/10 border-red-500/20"
                                                    : (user.role === "moderator")
                                                    ? "text-purple-400 bg-purple-500/10 border-purple-500/20"
                                                    : "text-dz-grey-500 dark:text-white/40 bg-dz-grey-50 dark:bg-white/5 border-dz-grey-200 dark:border-white/10"
                                            } disabled:opacity-40`}
                                        >
                                            <option value="user">Kullanıcı</option>
                                            <option value="moderator">Moderatör</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => {
                                                    setEditingId(user.id);
                                                    setEditXp(user.total_xp);
                                                }}
                                                className="w-11 h-11 flex items-center justify-center rounded-lg text-dz-grey-400 dark:text-white/30 hover:text-dz-grey-700 dark:hover:text-white/70 hover:bg-dz-grey-100 dark:hover:bg-white/5 transition-colors"
                                                title="XP Düzenle"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            {!user.is_admin && (
                                                deleteConfirm === user.id ? (
                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            onClick={() => handleDeleteUser(user.id)}
                                                            className="w-11 h-11 flex items-center justify-center rounded-lg text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                                            title="Silmeyi onayla"
                                                        >
                                                            <Check className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => setDeleteConfirm(null)}
                                                            className="w-11 h-11 flex items-center justify-center rounded-lg text-dz-grey-400 hover:text-dz-grey-600 hover:bg-dz-grey-100 dark:hover:bg-white/5 transition-colors"
                                                            title="İptal"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => setDeleteConfirm(user.id)}
                                                        className="w-11 h-11 flex items-center justify-center rounded-lg text-dz-grey-400 dark:text-white/20 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                                        title="Kullanıcıyı Sil"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )
                                            )}
                                        </div>
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
