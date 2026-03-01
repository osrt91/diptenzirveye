"use client";

import { useState } from "react";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, BookOpen, Medal, MessageSquare, Lightbulb, ArrowLeft, Shield, Flag, PenTool, Ticket, Star, Menu, X } from "lucide-react";
import { FaChartBar } from "react-icons/fa";

type NavItem = {
    href: string;
    label: string;
    icon: React.ReactNode;
};

const links: NavItem[] = [
    { href: "/admin", label: "Genel Bakış", icon: <FaChartBar className="w-4 h-4" /> },
    { href: "/admin/kullanicilar", label: "Kullanıcılar", icon: <Users className="w-4 h-4" /> },
    { href: "/admin/kitaplar", label: "Kitaplar", icon: <BookOpen className="w-4 h-4" /> },
    { href: "/admin/rozetler", label: "Rozetler", icon: <Medal className="w-4 h-4" /> },
    { href: "/admin/mesajlar", label: "Mesajlar", icon: <MessageSquare className="w-4 h-4" /> },
    { href: "/admin/raporlar", label: "Raporlar", icon: <Flag className="w-4 h-4" /> },
    { href: "/admin/promptlar", label: "Promptlar", icon: <Lightbulb className="w-4 h-4" /> },
    { href: "/admin/blog", label: "Blog Yazıları", icon: <PenTool className="w-4 h-4" /> },
    { href: "/admin/kuponlar", label: "Kuponlar", icon: <Ticket className="w-4 h-4" /> },
    { href: "/admin/testimonials", label: "Yorumlar", icon: <Star className="w-4 h-4" /> },
];

export default function AdminShell({
    user,
    children,
}: {
    user: User;
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-dz-grey-50 dark:bg-background text-dz-black dark:text-white">
            {/* Mobile Header */}
            <div className="fixed top-0 left-0 right-0 z-50 lg:hidden flex items-center justify-between px-4 py-3 bg-dz-white/90 dark:bg-dz-grey-900/90 backdrop-blur-md border-b border-dz-grey-200 dark:border-white/5">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="w-9 h-9 rounded-xl bg-dz-grey-100 dark:bg-dz-grey-800 flex items-center justify-center"
                    aria-label="Menüyü aç"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <span className="font-display font-bold text-sm">Admin Paneli</span>
                <div className="w-9" />
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 shrink-0 border-r border-dz-grey-200 dark:border-white/5 bg-dz-white dark:bg-dz-grey-900 flex flex-col transition-transform duration-200 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                {/* Logo */}
                <div className="p-5 border-b border-dz-grey-200 dark:border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                            <Shield className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h1 className="font-display font-bold text-dz-black dark:text-white text-sm tracking-tight">
                                Admin Paneli
                            </h1>
                            <p className="text-[10px] text-dz-grey-500 dark:text-white/40 font-mono">Dipten<span className="text-dz-orange-500">Zirveye</span></p>
                        </div>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden w-8 h-8 rounded-lg bg-dz-grey-100 dark:bg-dz-grey-800 flex items-center justify-center"
                        aria-label="Menüyü kapat"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
                    {links.map(({ href, label, icon }) => {
                        const isActive =
                            pathname === href || (href !== "/admin" && pathname.startsWith(href));
                        return (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
                                    ? "bg-red-500/10 text-red-500 dark:text-red-400 border border-red-500/20"
                                    : "text-dz-grey-600 dark:text-white/50 hover:bg-dz-grey-100 dark:hover:bg-white/5 hover:text-dz-black dark:hover:text-white/80 border border-transparent"
                                    }`}
                            >
                                <span className={isActive ? "text-red-500 dark:text-red-400" : "text-dz-grey-400 dark:text-white/30"}>
                                    {icon}
                                </span>
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-3 border-t border-dz-grey-200 dark:border-white/5 space-y-2">
                    <Link
                        href="/panel"
                        className="flex items-center gap-2 text-xs text-dz-grey-600 dark:text-white/40 hover:text-dz-black dark:hover:text-white/70 transition-colors px-3 py-2"
                    >
                        <ArrowLeft className="w-3 h-3" />
                        Kullanıcı Paneline Dön
                    </Link>
                    <div className="px-3 py-2 text-xs text-dz-grey-400 dark:text-white/20 font-mono truncate">
                        {user.email}
                    </div>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 overflow-y-auto pt-14 lg:pt-0">
                <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">{children}</div>
            </main>
        </div>
    );
}
