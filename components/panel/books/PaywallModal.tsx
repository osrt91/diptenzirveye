"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Sparkles, X, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function PaywallModal({
    isOpen,
    onClose,
    title,
}: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
}) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-dz-white dark:bg-dz-grey-900 rounded-3xl overflow-hidden shadow-2xl border border-dz-grey-200 dark:border-dz-grey-800"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-dz-black dark:text-white" />
                        </button>

                        <div className="relative p-8 text-center flex flex-col items-center">
                            {/* Glow */}
                            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-dz-orange-500/20 to-transparent pointer-events-none" />

                            <div className="relative w-24 h-24 bg-gradient-to-br from-dz-orange-500 to-dz-amber-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-dz-orange-500/30">
                                <Lock className="w-10 h-10 text-white" />
                                <div className="absolute -top-1 -right-1 bg-white dark:bg-dz-grey-900 rounded-full p-1.5 shadow-sm">
                                    <Sparkles className="w-5 h-5 text-dz-amber-500" />
                                </div>
                            </div>

                            <h2 className="relative z-10 font-display font-black text-3xl text-dz-black dark:text-white mb-2">
                                Premium İçerik
                            </h2>
                            <p className="relative z-10 text-dz-grey-600 dark:text-dz-grey-400 mb-8 max-w-sm">
                                <strong className="text-dz-black dark:text-white">{title}</strong> içeriğine erişmek için Premium Akademi'ye katılmalısınız.
                            </p>

                            <Link
                                href="/fiyatlandirma"
                                className="relative w-full py-4 bg-dz-black dark:bg-white text-white dark:text-dz-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-black/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                Premium'a Yükselt <ChevronRight className="w-5 h-5" />
                            </Link>

                            <button
                                onClick={onClose}
                                className="mt-4 text-sm font-medium text-dz-grey-500 hover:text-dz-grey-800 dark:hover:text-dz-white transition-colors"
                            >
                                Belki Daha Sonra
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
