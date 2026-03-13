"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/**
 * "Ana Ekrana Ekle" banner — PWA yüklenmemişse gösterilir.
 * Sadece mobilde veya uyumlu tarayıcılarda aktif olur.
 */
export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        // Daha önce kapatılmışsa gösterme
        if (localStorage.getItem("dz-install-dismissed") === "1") {
            setDismissed(true);
            return;
        }

        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
        };

        window.addEventListener("beforeinstallprompt", handler);
        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
            setDeferredPrompt(null);
        }
    };

    const handleDismiss = () => {
        setDismissed(true);
        localStorage.setItem("dz-install-dismissed", "1");
    };

    if (!deferredPrompt || dismissed) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg"
            >
                <div className="bg-dz-white dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-grey-800 rounded-2xl p-4 shadow-2xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-dz-orange-500 to-dz-amber-400 flex items-center justify-center shrink-0 shadow-lg shadow-dz-orange-500/20">
                        <span className="text-white text-xl font-bold">D</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-dz-black dark:text-dz-white">Ana Ekrana Ekle</p>
                        <p className="text-xs text-dz-grey-500 truncate"><span className="font-display"><span className="font-black">Dipten</span><span className="font-normal text-dz-orange-500">Zirveye</span></span>&apos;yi uygulama gibi kullan</p>
                    </div>
                    <button
                        onClick={handleInstall}
                        className="bg-dz-orange-500 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-dz-orange-600 transition-colors shrink-0"
                    >
                        Yükle
                    </button>
                    <button
                        onClick={handleDismiss}
                        className="text-dz-grey-400 hover:text-dz-grey-600 transition-colors shrink-0"
                        aria-label="Kapat"
                    >
                        ✕
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
