"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Lock, Rocket, Crown, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import PaytrCheckoutModal from "@/components/panel/core/PaytrCheckoutModal";

function PaymentStatusToast() {
    const searchParams = useSearchParams();
    const paymentStatus = searchParams.get("status");

    if (paymentStatus === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md mx-auto mt-8 p-4 rounded-xl bg-green-100 dark:bg-green-500/10 border border-green-300 dark:border-green-500/20 text-center"
            >
                <p className="text-sm font-bold text-green-700 dark:text-green-400">
                    🎉 Ödeme başarılı! Premium erişiminiz aktif edildi.
                </p>
            </motion.div>
        );
    }
    if (paymentStatus === "fail") {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md mx-auto mt-8 p-4 rounded-xl bg-red-100 dark:bg-red-500/10 border border-red-300 dark:border-red-500/20 text-center"
            >
                <p className="text-sm font-bold text-red-700 dark:text-red-400">
                    Ödeme işlemi başarısız oldu. Tekrar deneyebilirsiniz.
                </p>
            </motion.div>
        );
    }
    return null;
}

export default function PricingPage() {
    const [showCheckout, setShowCheckout] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [couponResult, setCouponResult] = useState<{ valid: boolean; discount_percent: number; discounted_price: number } | null>(null);
    const [couponLoading, setCouponLoading] = useState(false);
    const [couponError, setCouponError] = useState("");

    const applyCoupon = async () => {
        if (!couponCode.trim()) return;
        setCouponLoading(true);
        setCouponError("");
        setCouponResult(null);
        try {
            const res = await fetch("/api/coupon", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: couponCode }),
            });
            const data = await res.json();
            if (res.ok && data.valid) {
                setCouponResult(data);
            } else {
                setCouponError(data.error || "Geçersiz kupon.");
            }
        } catch {
            setCouponError("Bağlantı hatası.");
        } finally {
            setCouponLoading(false);
        }
    };

    const plans = [
        {
            name: "Eylem Başlatıcı (Free)",
            price: "0₺",
            period: "Süresiz",
            description: "AI devrimine ilk adımı risksiz ve tamamen ücretsiz at.",
            features: [
                "Kitap 1: AI Zihin Yapısına Tam Erişim",
                "Eylem İvmesi (Aktivasyon) Modülü",
                "Temel Prompt Kütüphanesi (15+ Prompt)",
                "Komünite: Genel Kanal Erişimi",
                "Zihin Motoru (Focus Engine) Standart",
            ],
            notIncluded: [
                "2-10 Arası Masterclass Kitapları",
                "Performans Kalibrasyon Çizelgeleri",
                "Nexus Protokolü (Stratejik Hedefleme)",
                "500+ Altın Prompt Mimarlığı",
                "Vertex AI Kişiselleştirilmiş Koç",
            ],
            buttonText: "Hemen Başla",
            buttonLink: "/kayit-ol",
            buttonClass: "bg-dz-grey-200 dark:bg-dz-grey-800 text-dz-black dark:text-white hover:bg-dz-grey-300 dark:hover:bg-dz-grey-700",
            icon: <Lock className="w-5 h-5 text-dz-grey-500" />,
            popular: false,
        },
        {
            name: "Zirve Masterclass (3 Aylık)",
            price: "999,99₺",
            period: " / ay",
            badge: "3 Aylık Taahhüt",
            description: "Yapay zekayı bir kazanç makinesine dönüştürecek tüm sistemin anahtarı. Minimum 3 aylık kapsamlı eğitim programı.",
            features: [
                "10 Masterclass Kitaba Tam Erişim",
                "500+ Altın Prompt Mimarlığı",
                "Performans Kalibrasyon Çarkı (Momentum)",
                "Nexus Protokolü (Lazer Odaklı Hedefleme)",
                "Vertex AI Destekli Kişiselleştirilmiş Koç",
                "Yeni Masterclass İçeriklerine Ücretsiz Erişim",
                "3 Aylık Toplam: 2.999,97₺",
            ],
            notIncluded: [],
            buttonText: "Masterclass'ı Başlat",
            buttonLink: "/fiyatlar",
            buttonAction: () => setShowCheckout(true),
            buttonClass: "bg-dz-orange-500 text-white hover:bg-dz-orange-600 shadow-[0_0_20px_rgba(249,115,22,0.4)]",
            icon: <Crown className="w-5 h-5 text-dz-orange-500" />,
            popular: true,
        }
    ];

    return (
        <main className="min-h-screen bg-dz-grey-50 dark:bg-dz-black selection:bg-dz-orange-500/30 selection:text-dz-orange-500">
            <Navbar />

            <section className="pt-32 pb-20 px-4 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-dz-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(var(--dz-white) 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />

                <div className="max-w-5xl mx-auto text-center mb-16 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-dz-orange-500/30 bg-dz-orange-500/10 text-dz-orange-600 dark:text-dz-orange-400 text-sm font-bold tracking-wide uppercase mb-6"
                    >
                        <Rocket /> Kariyerine Yatırım Yap
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-dz-black dark:text-white mb-6 tracking-tight"
                    >
                        AI Çağında Geride Kalmamak <br className="hidden md:block" /> İçin <span className="text-transparent bg-clip-text bg-gradient-to-r from-dz-orange-500 to-dz-amber-400">Tek Bir Karar</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-dz-grey-600 dark:text-dz-grey-400 max-w-2xl mx-auto mb-10"
                    >
                        Sadece tüketen değil, yapay zekayı bir asistan olarak kullanarak geleceği inşa eden liderlerin arasına katıl. Tüm masterclass içeriğini aç.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dz-orange-500/10 border border-dz-orange-500/20"
                    >
                        <span className="text-sm font-bold text-dz-orange-600 dark:text-dz-orange-400">Minimum 3 Aylık Kapsamlı Eğitim Programı</span>
                    </motion.div>
                </div>

                {/* Pricing Cards */}
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                            className={`relative flex flex-col rounded-3xl p-8 backdrop-blur-xl border ${plan.popular
                                ? "bg-dz-white dark:bg-dz-grey-900 border-dz-orange-500/50 shadow-2xl shadow-dz-orange-500/10 scale-100 md:scale-105 z-20"
                                : "bg-dz-white/80 dark:bg-dz-white/[0.02] border-dz-grey-200 dark:border-dz-white/10 shadow-lg z-10"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-dz-orange-600 to-dz-amber-400 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                                    En Çok Tercih Edilen
                                </div>
                            )}

                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-3 rounded-xl ${plan.popular ? "bg-dz-orange-500/10" : "bg-dz-grey-100 dark:bg-dz-grey-800"}`}>
                                    {plan.icon}
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-xl text-dz-black dark:text-white">{plan.name}</h3>
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl sm:text-4xl md:text-5xl font-black text-dz-black dark:text-white tracking-tight">{plan.price}</span>
                                    <span className="text-dz-grey-500 font-medium">{plan.period}</span>
                                </div>
                                <p className="text-sm text-dz-grey-500 mt-2 min-h-10">{plan.description}</p>
                            </div>

                            <div className="space-y-6 mb-8 flex-1">
                                {/* Olanlar */}
                                <ul className="space-y-3">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                            <span className="text-dz-black dark:text-dz-grey-300 font-medium text-sm leading-relaxed">{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Olmayanlar (Çizik) */}
                                {plan.notIncluded.length > 0 && (
                                    <ul className="space-y-3 border-t border-dz-grey-200 dark:border-dz-white/10 pt-6">
                                        {plan.notIncluded.map((f, j) => (
                                            <li key={j} className="flex items-start gap-3 opacity-50">
                                                <span className="w-5 h-5 flex items-center justify-center text-dz-grey-400 shrink-0 mt-0.5">✕</span>
                                                <span className="text-dz-grey-500 text-sm line-through">{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {plan.popular ? (
                                <button
                                    onClick={plan.buttonAction}
                                    className={`w-full min-h-[44px] py-4 px-6 rounded-xl font-bold text-center transition-all duration-300 flex items-center justify-center gap-2 ${plan.buttonClass}`}
                                >
                                    {plan.buttonText}
                                    <ArrowRight className="w-5 h-5 shrink-0" />
                                </button>
                            ) : (
                                <Link
                                    href={plan.buttonLink}
                                    className={`w-full min-h-[44px] py-4 px-6 rounded-xl font-bold text-center transition-all duration-300 flex items-center justify-center gap-2 ${plan.buttonClass}`}
                                >
                                    {plan.buttonText}
                                </Link>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Kupon Girişi */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="max-w-md mx-auto mt-12 relative z-10"
                >
                    <div className="bg-dz-white/80 dark:bg-dz-white/[0.03] border border-dz-grey-200 dark:border-dz-white/10 rounded-2xl p-6 backdrop-blur-md">
                        <p className="text-sm font-bold text-dz-black dark:text-white mb-3">Kupon Kodun Var Mı?</p>
                        <div className="flex gap-2">
                            <label htmlFor="coupon-input" className="sr-only">Kupon kodu gir</label>
                            <input
                                id="coupon-input"
                                type="text"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                                placeholder="KUPON KODU"
                                className="flex-1 min-w-0 rounded-lg border border-dz-grey-200 dark:border-dz-grey-700 bg-dz-grey-50 dark:bg-dz-black px-4 py-3 text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-dz-orange-500/30"
                            />
                            <button
                                onClick={applyCoupon}
                                disabled={couponLoading || !couponCode.trim()}
                                className="px-5 min-h-[44px] py-3 rounded-lg bg-dz-orange-500 text-white font-bold text-sm hover:bg-dz-orange-600 transition-colors disabled:opacity-40"
                            >
                                {couponLoading ? "..." : "Uygula"}
                            </button>
                        </div>
                        {couponError && (
                            <p className="text-xs text-red-500 font-medium mt-2">{couponError}</p>
                        )}
                        {couponResult && (
                            <div className="mt-3 p-3 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-lg">
                                <p className="text-sm font-bold text-green-700 dark:text-green-400">
                                    %{couponResult.discount_percent} indirim uygulandı!
                                </p>
                                <p className="text-xs text-green-600 dark:text-green-400/80 mt-1">
                                    <span className="line-through">999,99₺</span> → <span className="font-bold text-lg">{couponResult.discounted_price}₺</span> /ay
                                </p>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Payment Status Toast */}
                <Suspense fallback={null}>
                    <PaymentStatusToast />
                </Suspense>
            </section>

            <PaytrCheckoutModal
                isOpen={showCheckout}
                onClose={() => setShowCheckout(false)}
                planId="masterclass-3ay"
                planName="Zirve Masterclass (3 Aylık)"
            />

            <Footer />
        </main>
    );
}
