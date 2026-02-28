"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck } from "lucide-react";
import { useState } from "react";

type PaytrCheckoutModalProps = {
    isOpen: boolean;
    onClose: () => void;
    planId: string;
    planName: string;
};

export default function PaytrCheckoutModal({
    isOpen,
    onClose,
    planId,
    planName,
}: PaytrCheckoutModalProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [iframeToken, setIframeToken] = useState<string | null>(null);

    async function startCheckout() {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/paytr/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ planId }),
            });
            const data = await res.json();
            if (data.token) {
                setIframeToken(data.token);
            } else {
                setError(data.error || "Ödeme başlatılamadı.");
            }
        } catch {
            setError("Bağlantı hatası. Tekrar deneyin.");
        } finally {
            setLoading(false);
        }
    }

    function handleClose() {
        setIframeToken(null);
        setError("");
        onClose();
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 z-50 bg-dz-black/80 backdrop-blur-md"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl z-50 p-4"
                    >
                        <div className="bg-white dark:bg-background border border-dz-grey-200 dark:border-dz-grey-800 rounded-3xl shadow-2xl overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-dz-grey-200 dark:border-dz-grey-800">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="w-5 h-5 text-green-500" />
                                    <div>
                                        <h3 className="font-display font-bold text-dz-black dark:text-white text-sm">
                                            Güvenli Ödeme
                                        </h3>
                                        <p className="text-[10px] text-dz-grey-500">
                                            {planName} · PayTR Altyapısı
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="p-2 text-dz-grey-400 hover:text-dz-black dark:hover:text-white transition-colors rounded-full bg-dz-grey-100 dark:bg-dz-grey-800"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-6 min-h-[400px] flex items-center justify-center">
                                {!iframeToken && !loading && !error && (
                                    <div className="text-center space-y-4">
                                        <div className="w-16 h-16 mx-auto rounded-2xl bg-dz-orange-500/10 flex items-center justify-center">
                                            <ShieldCheck className="w-8 h-8 text-dz-orange-500" />
                                        </div>
                                        <h4 className="font-display font-bold text-dz-black dark:text-white">
                                            {planName}
                                        </h4>
                                        <p className="text-sm text-dz-grey-500 max-w-xs mx-auto">
                                            Ödeme işleminiz PayTR güvenli altyapısı üzerinden
                                            gerçekleştirilecektir.
                                        </p>
                                        <button
                                            onClick={startCheckout}
                                            className="px-8 py-3 rounded-xl bg-dz-orange-500 text-white font-bold hover:bg-dz-orange-600 transition-colors shadow-lg shadow-dz-orange-500/20"
                                        >
                                            Ödemeyi Başlat
                                        </button>
                                    </div>
                                )}

                                {loading && (
                                    <div className="flex flex-col items-center gap-3 text-dz-grey-500">
                                        <div className="w-8 h-8 border-3 border-dz-orange-500 border-t-transparent rounded-full animate-spin" />
                                        <p className="text-sm font-medium">
                                            Ödeme formu hazırlanıyor...
                                        </p>
                                    </div>
                                )}

                                {error && (
                                    <div className="text-center space-y-3">
                                        <p className="text-sm text-red-500 font-medium">{error}</p>
                                        <button
                                            onClick={startCheckout}
                                            className="text-sm text-dz-orange-500 font-bold hover:underline"
                                        >
                                            Tekrar Dene
                                        </button>
                                    </div>
                                )}

                                {iframeToken && (
                                    <iframe
                                        src={`https://www.paytr.com/odeme/guvenli/${iframeToken}`}
                                        className="w-full h-[500px] rounded-lg border-0"
                                        title="PayTR Ödeme"
                                    />
                                )}
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-3 border-t border-dz-grey-200 dark:border-dz-grey-800 text-center">
                                <p className="text-[10px] text-dz-grey-400 uppercase tracking-wider">
                                    256-bit SSL · 3D Secure · PayTR Lisanslı Altyapı
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
