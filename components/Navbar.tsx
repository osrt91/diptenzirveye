"use client";

import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import DZLogo from "@/components/DZLogo";
import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);

    const isDark = resolvedTheme === "dark";

    const handleGoogleSignIn = async () => {
        const supabase = createClient();
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3" aria-label="Ana navigasyon">
            <div className="max-w-7xl mx-auto flex items-center justify-between bg-dz-white/80 dark:bg-dz-black/80 backdrop-blur-xl border border-dz-grey-200 dark:border-dz-white/10 rounded-2xl px-5 py-3 shadow-lg shadow-dz-black/5 dark:shadow-dz-black/30">

                {/* Logo */}
                <Link href="/" className="font-display text-xl font-bold text-dz-black dark:text-dz-white tracking-tight flex items-center gap-1">
                    <DZLogo size="sm" />
                    Dipten<span className="text-dz-orange-500">Zirveye</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    <Link href="/blog" className="text-sm font-medium text-dz-grey-600 dark:text-dz-grey-400 hover:text-dz-black dark:hover:text-dz-white transition-colors">
                        Blog
                    </Link>
                    <Link href="/test" className="text-sm font-medium text-dz-grey-600 dark:text-dz-grey-400 hover:text-dz-black dark:hover:text-dz-white transition-colors">
                        Ücretsiz Seviyeni Ölç
                    </Link>
                    <Link href="/panel-onizleme" className="text-sm font-medium text-dz-grey-600 dark:text-dz-grey-400 hover:text-dz-black dark:hover:text-dz-white transition-colors">
                        Akademiye Giriş
                    </Link>

                    {/* Theme Toggle */}
                    <button
                        onClick={() => setTheme(isDark ? "light" : "dark")}
                        className="w-9 h-9 rounded-xl bg-dz-grey-100 dark:bg-dz-grey-800 border border-dz-grey-200 dark:border-dz-white/10 flex items-center justify-center hover:bg-dz-grey-200 dark:hover:bg-dz-grey-700 transition-colors"
                        aria-label="Temayı değiştir"
                    >
                        {isDark ? (
                            <svg className="w-4 h-4 text-dz-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4 text-dz-grey-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                        )}
                    </button>

                    {/* Login CTA */}
                    <div className="flex items-center gap-2">
                        <Link href="/giris" className="text-sm font-bold bg-dz-orange-500 text-white px-5 py-2 rounded-xl hover:bg-dz-orange-600 transition-colors shadow-sm shadow-dz-orange-500/20">
                            Giriş Yap
                        </Link>
                        <button onClick={handleGoogleSignIn} className="w-9 h-9 flex items-center justify-center rounded-xl bg-dz-grey-100 dark:bg-dz-grey-800 border border-dz-grey-200 dark:border-dz-white/10 hover:bg-dz-grey-200 dark:hover:bg-dz-grey-700 transition-colors text-dz-black dark:text-dz-white" aria-label="Google ile Giriş Yap">
                            <FaGoogle className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Mobile: Theme + Hamburger */}
                <div className="flex md:hidden items-center gap-2">
                    <button
                        onClick={() => setTheme(isDark ? "light" : "dark")}
                        className="w-9 h-9 rounded-xl bg-dz-grey-100 dark:bg-dz-grey-800 border border-dz-grey-200 dark:border-dz-white/10 flex items-center justify-center"
                        aria-label="Temayı değiştir"
                    >
                        {isDark ? (
                            <svg className="w-4 h-4 text-dz-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4 text-dz-grey-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                        )}
                    </button>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="w-9 h-9 rounded-xl bg-dz-grey-100 dark:bg-dz-grey-800 border border-dz-grey-200 dark:border-dz-white/10 flex items-center justify-center"
                        aria-label="Menü"
                        aria-expanded={menuOpen}
                    >
                        <svg className="w-5 h-5 text-dz-grey-700 dark:text-dz-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {menuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-4 right-4 top-[70px] z-50 md:hidden bg-dz-white/95 dark:bg-dz-black/95 backdrop-blur-xl border border-dz-grey-200 dark:border-dz-white/10 rounded-2xl p-4 shadow-2xl"
                    >
                        <div className="flex flex-col gap-3">
                            <Link href="/blog" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-dz-grey-700 dark:text-dz-grey-300 hover:text-dz-orange-500 py-2 px-3 rounded-xl hover:bg-dz-grey-100 dark:hover:bg-dz-grey-800 transition-colors">
                                Blog
                            </Link>
                            <Link href="/test" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-dz-grey-700 dark:text-dz-grey-300 hover:text-dz-orange-500 py-2 px-3 rounded-xl hover:bg-dz-grey-100 dark:hover:bg-dz-grey-800 transition-colors">
                                Ücretsiz Seviyeni Ölç
                            </Link>
                            <Link href="/panel-onizleme" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-dz-grey-700 dark:text-dz-grey-300 hover:text-dz-orange-500 py-2 px-3 rounded-xl hover:bg-dz-grey-100 dark:hover:bg-dz-grey-800 transition-colors">
                                Akademiye Giriş
                            </Link>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <Link href="/giris" onClick={() => setMenuOpen(false)} className="text-sm font-bold text-center flex items-center justify-center bg-dz-orange-500 text-white py-3 px-4 rounded-xl hover:bg-dz-orange-600 transition-colors">
                                    Giriş Yap
                                </Link>
                                <button onClick={() => { setMenuOpen(false); handleGoogleSignIn(); }} className="text-sm font-bold text-center flex items-center justify-center gap-2 bg-dz-grey-100 dark:bg-dz-grey-800 text-dz-black dark:text-dz-white border border-dz-grey-200 dark:border-dz-white/10 py-3 px-4 rounded-xl hover:bg-dz-grey-200 dark:hover:bg-dz-grey-700 transition-colors">
                                    <FaGoogle className="w-4 h-4" />
                                    Google
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
