"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Lock, X, Rocket, CheckCircle2, Crown } from "lucide-react";

type PaywallModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
};

export default function PaywallModal({ isOpen, onClose, title = "Premium İçerik" }: PaywallModalProps) {
    const highlights = [
        "10 Kitaplık Tam Eğitim Ekosistemi",
        "500+ Altın Prompt Mimarlığı",
        "Performans Kalibrasyon Çizelgeleri",
        "VIP Komünite & Sohbet Kanalları",
        "Abonelik Süresince Ücretsiz Güncellemeler"
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-dz-black/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50 p-4"
                    >
                        <div className="bg-white dark:bg-background border border-dz-orange-500/30 rounded-[2.5rem] shadow-[0_0_50px_rgba(249,115,22,0.15)] overflow-hidden relative">
                            {/* Premium Glow background */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-40 bg-dz-orange-500/10 blur-[100px] pointer-events-none" />

                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 text-dz-grey-400 hover:text-dz-black dark:hover:text-white transition-colors z-20 bg-dz-grey-100 dark:bg-dz-white/5 rounded-full"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <div className="p-8 md:p-10 relative z-10">
                                {/* Header */}
                                <div className="text-center mb-10">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dz-orange-500/10 text-dz-orange-500 text-[10px] font-black tracking-widest uppercase mb-4 border border-dz-orange-500/20">
                                        <Crown className="w-2.5 h-2.5" /> Premium Üyelik Gerekli
                                    </div>
                                    <h3 className="text-3xl font-display font-black text-dz-black dark:text-white mb-2 leading-tight">
                                        {title}
                                    </h3>
                                    <p className="text-dz-grey-500 text-sm max-w-xs mx-auto">
                                        Bu seviyeye ulaşmak için zirve yolculuğuna tam erişim sağlaman gerekiyor.
                                    </p>
                                </div>

                                {/* Features List */}
                                <div className="bg-dz-grey-50 dark:bg-dz-white/[0.03] border border-dz-grey-100 dark:border-dz-white/5 rounded-2xl p-6 mb-10">
                                    <h4 className="text-xs font-bold text-dz-grey-400 dark:text-dz-grey-500 uppercase tracking-widest mb-4">Üyeliğe Dahil Olanlar</h4>
                                    <ul className="grid gap-3">
                                        {highlights.map((text, idx) => (
                                            <motion.li
                                                key={idx}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 + (idx * 0.1) }}
                                                className="flex items-center gap-3 text-sm font-semibold text-dz-black dark:text-dz-grey-200"
                                            >
                                                <CheckCircle2 className="text-dz-orange-500 shrink-0" />
                                                {text}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-3">
                                    <Link
                                        href="/fiyatlar"
                                        className="group relative w-full flex items-center justify-center gap-3 bg-dz-orange-500 text-white font-black py-5 px-8 rounded-2xl hover:bg-dz-orange-600 transition-all shadow-xl shadow-dz-orange-500/30 overflow-hidden"
                                    >
                                        <span className="relative z-10 flex items-center gap-2 text-lg">
                                            Zirveye Katıl <Rocket className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </span>
                                        {/* Animated inner shine */}
                                        <motion.div
                                            animate={{ x: [-100, 400] }}
                                            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                            className="absolute top-0 bottom-0 w-20 bg-white/20 -skew-x-12 pointer-events-none"
                                        />
                                    </Link>

                                    <button
                                        onClick={onClose}
                                        className="w-full py-4 text-sm font-bold text-dz-grey-500 hover:text-dz-black dark:hover:text-dz-grey-300 transition-colors"
                                    >
                                        Daha sonra göz at
                                    </button>
                                </div>

                                <p className="text-[10px] text-center text-dz-grey-400 dark:text-dz-grey-600 mt-6 md:mt-8 uppercase tracking-tighter">
                                    3 Aylık Eğitim Programı • Sürekli Güncelleme • %100 Güvenli Ödeme
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
