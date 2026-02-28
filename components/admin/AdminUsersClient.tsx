"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Shield, Zap, Medal, Edit, Check, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { AdminUser } from "@/lib/admin";

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
                    <h1 className="font-display text-3xl font-bold text-white tracking-tight">
                        Kullanıcılar
                    </h1>
                    <p className="text-white/40 text-sm mt-1">
                        {users.length} kullanıcı listeleniyor
                    </p>
                </div>
            </div>

            {/* Search */}
            <div className="flex gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        placeholder="Kullanıcı adı ile ara..."
                        className="w-full rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-red-500/30 focus:ring-1 focus:ring-red-500/20 transition-all"
                    />
                </div>
                <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="px-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-all disabled:opacity-50"
                >
                    {loading ? "..." : "Ara"}
                </button>
            </div>

            {/* Users Table */}
            <div className="rounded-2xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full table-fixed">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                <th className="text-left text-xs font-bold text-white/40 uppercase tracking-wider px-5 py-3 w-[30%]">
                                    Kullanıcı
                                </th>
                                <th className="text-left text-xs font-bold text-white/40 uppercase tracking-wider px-5 py-3 w-[20%]">
                                    Seviye / XP
                                </th>
                                <th className="text-left text-xs font-bold text-white/40 uppercase tracking-wider px-5 py-3 w-[12%]">
                                    Seri
                                </th>
                                <th className="text-left text-xs font-bold text-white/40 uppercase tracking-wider px-5 py-3 w-[10%]">
                                    Rozetler
                                </th>
                                <th className="text-left text-xs font-bold text-white/40 uppercase tracking-wider px-5 py-3 w-[18%]">
                                    Rol
                                </th>
                                <th className="text-right text-xs font-bold text-white/40 uppercase tracking-wider px-5 py-3 w-[10%]">
                                    İşlem
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {users.map((user, i) => (
                                <motion.tr
                                    key={user.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.02 }}
                                    className="hover:bg-white/[0.02] transition-colors"
                                >
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                                {(user.display_name || "?")[0].toUpperCase()}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-white truncate">
                                                    {user.display_name || "Anonim"}
                                                </p>
                                                <p className="text-xs text-white/30 font-mono truncate">
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
                                                    className="w-24 rounded-lg bg-white/5 border border-white/10 text-white text-sm px-3 py-1.5 focus:outline-none focus:border-red-500/30"
                                                />
                                                <button
                                                    onClick={() => handleUpdateXp(user.id)}
                                                    className="text-green-400 hover:text-green-300"
                                                >
                                                    <Check className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => setEditingId(null)}
                                                    className="text-red-400 hover:text-red-300"
                                                >
                                                    <X className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div>
                                                <span className="text-sm font-bold text-white">Lv.{user.level}</span>
                                                <span className="text-xs text-white/30 ml-2">{user.total_xp} XP</span>
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
                                        <span className="flex items-center gap-1 text-sm text-white/60">
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
                                                    : "text-white/40 bg-white/5 border-white/10"
                                            } disabled:opacity-40`}
                                        >
                                            <option value="user">Kullanıcı</option>
                                            <option value="moderator">Moderatör</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        <button
                                            onClick={() => {
                                                setEditingId(user.id);
                                                setEditXp(user.total_xp);
                                            }}
                                            className="text-white/30 hover:text-white/70 transition-colors"
                                            title="XP Düzenle"
                                        >
                                            <Edit className="w-4 h-4" />
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
