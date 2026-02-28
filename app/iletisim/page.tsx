"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function IletisimPage() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");

        const form = e.currentTarget;
        const data = new FormData(form);
        const name = data.get("name") as string;
        const email = data.get("email") as string;
        const subject = data.get("subject") as string;
        const message = data.get("message") as string;

        try {
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    name: `[İletişim - ${subject}] ${name}`,
                    interest: `contact: ${message.slice(0, 500)}`,
                }),
            });

            if (res.ok) {
                setStatus("success");
                form.reset();
            } else {
                const result = await res.json();
                if (result.message?.includes("zaten")) {
                    setStatus("success");
                    form.reset();
                } else {
                    setErrorMsg(result.error || "Bir hata oluştu.");
                    setStatus("error");
                }
            }
        } catch {
            setErrorMsg("Bağlantı hatası. Lütfen tekrar deneyin.");
            setStatus("error");
        }
    };

    return (
        <main className="min-h-screen bg-dz-white dark:bg-dz-black text-dz-black dark:text-dz-white">
            <Navbar />
            <div className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                            Bize Ulaşın
                        </h1>
                        <p className="text-lg text-dz-grey-500 max-w-xl mx-auto">
                            Sorularınız, önerileriniz veya iş birliği teklifleriniz için bizimle iletişime geçin.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-8"
                        >
                            <div className="bg-dz-grey-50 dark:bg-dz-grey-900 rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 p-8 space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-dz-orange-500/10 flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5 text-dz-orange-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-display font-bold mb-1">E-posta</h3>
                                        <p className="text-dz-grey-500">destek@diptenzirveye.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-dz-orange-500/10 flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-dz-orange-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-display font-bold mb-1">Konum</h3>
                                        <p className="text-dz-grey-500">Türkiye</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-dz-orange-500/5 to-dz-amber-400/5 rounded-2xl border border-dz-orange-200 dark:border-dz-orange-500/20 p-8">
                                <h3 className="font-display font-bold text-lg mb-2">Hızlı Yanıt Garantisi</h3>
                                <p className="text-dz-grey-500 text-sm leading-relaxed">
                                    Mesajlarınıza en geç 24 saat içinde dönüş yapıyoruz. Acil konular için e-posta konu başlığına <strong className="text-dz-orange-500">[ACİL]</strong> yazabilirsiniz.
                                </p>
                            </div>
                        </motion.div>

                        <motion.form
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            onSubmit={handleSubmit}
                            className="bg-dz-grey-50 dark:bg-dz-grey-900 rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 p-8 space-y-5"
                        >
                            <div>
                                <label htmlFor="name" className="block text-sm font-bold mb-2">Ad Soyad</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="w-full rounded-xl border border-dz-grey-200 dark:border-dz-grey-700 bg-dz-white dark:bg-dz-black px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-dz-orange-500/30 focus:border-dz-orange-400 transition-all"
                                    placeholder="Adınızı girin"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-bold mb-2">E-posta</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full rounded-xl border border-dz-grey-200 dark:border-dz-grey-700 bg-dz-white dark:bg-dz-black px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-dz-orange-500/30 focus:border-dz-orange-400 transition-all"
                                    placeholder="ornek@email.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-bold mb-2">Konu</label>
                                <select
                                    id="subject"
                                    name="subject"
                                    className="w-full rounded-xl border border-dz-grey-200 dark:border-dz-grey-700 bg-dz-white dark:bg-dz-black px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-dz-orange-500/30 focus:border-dz-orange-400 transition-all"
                                >
                                    <option value="Genel">Genel Soru</option>
                                    <option value="Teknik">Teknik Destek</option>
                                    <option value="Ödeme">Ödeme Sorunu</option>
                                    <option value="Öneri">Öneri / Geri Bildirim</option>
                                    <option value="İş Birliği">İş Birliği</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-bold mb-2">Mesaj</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    required
                                    className="w-full rounded-xl border border-dz-grey-200 dark:border-dz-grey-700 bg-dz-white dark:bg-dz-black px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-dz-orange-500/30 focus:border-dz-orange-400 transition-all resize-none"
                                    placeholder="Mesajınızı yazın..."
                                />
                            </div>

                            {status === "error" && (
                                <p className="text-sm text-red-500 font-medium">{errorMsg}</p>
                            )}

                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full flex items-center justify-center gap-2 bg-dz-orange-500 hover:bg-dz-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-dz-orange-500/20 hover:shadow-dz-orange-500/30 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
                            >
                                {status === "success" ? (
                                    <><CheckCircle2 className="w-4 h-4" /> Mesajınız Gönderildi!</>
                                ) : status === "loading" ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" /> Gönderiliyor...</>
                                ) : (
                                    <><Send className="w-4 h-4" /> Gönder</>
                                )}
                            </button>
                        </motion.form>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
