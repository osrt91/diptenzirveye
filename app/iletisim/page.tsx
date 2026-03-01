"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle2, Loader2, MessageCircle, Clock, Instagram } from "lucide-react";
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
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-dz-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-dz-amber-400/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-dz-orange-500/30 bg-dz-orange-500/10 text-dz-orange-600 dark:text-dz-orange-400 text-sm font-bold tracking-wide uppercase mb-6">
                            <MessageCircle className="w-4 h-4" /> İletişim
                        </span>
                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                            Bize{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-dz-orange-500 to-dz-amber-400">
                                Ulaşın
                            </span>
                        </h1>
                        <p className="text-lg text-dz-grey-600 dark:text-dz-grey-400 max-w-2xl mx-auto">
                            Sorularınız, önerileriniz veya iş birliği teklifleriniz için bizimle iletişime geçin. Size en kısa sürede dönüş yapacağız.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-5 gap-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-2 space-y-6"
                        >
                            <div className="bg-dz-grey-50 dark:bg-dz-grey-900 rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 p-6 space-y-5">
                                <h3 className="font-display font-bold text-lg">İletişim Bilgileri</h3>
                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-dz-orange-500/10 flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5 text-dz-orange-500" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm mb-0.5">E-posta</p>
                                        <a href="mailto:destek@diptenzirveye.com" className="text-sm text-dz-grey-500 hover:text-dz-orange-500 transition-colors">
                                            destek@diptenzirveye.com
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-dz-orange-500/10 flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-dz-orange-500" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm mb-0.5">Konum</p>
                                        <p className="text-sm text-dz-grey-500">Türkiye</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-dz-orange-500/10 flex items-center justify-center shrink-0">
                                        <Instagram className="w-5 h-5 text-dz-orange-500" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm mb-0.5">Sosyal Medya</p>
                                        <a href="https://instagram.com/diptenzirveye" target="_blank" rel="noopener noreferrer" className="text-sm text-dz-grey-500 hover:text-dz-orange-500 transition-colors">
                                            @diptenzirveye
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-dz-orange-500/5 to-dz-amber-400/5 rounded-2xl border border-dz-orange-200 dark:border-dz-orange-500/20 p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-9 h-9 rounded-lg bg-dz-orange-500/10 flex items-center justify-center shrink-0">
                                        <Clock className="w-4 h-4 text-dz-orange-500" />
                                    </div>
                                    <h3 className="font-display font-bold">Hızlı Yanıt Garantisi</h3>
                                </div>
                                <p className="text-dz-grey-500 text-sm leading-relaxed">
                                    Mesajlarınıza en geç 24 saat içinde dönüş yapıyoruz. Acil konular için e-posta konu başlığına <strong className="text-dz-orange-500">[ACİL]</strong> yazabilirsiniz.
                                </p>
                            </div>

                            <div className="bg-dz-grey-50 dark:bg-dz-grey-900 rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 p-6">
                                <h3 className="font-display font-bold mb-4">Sıkça Sorulan</h3>
                                <div className="space-y-4 text-sm">
                                    <div>
                                        <p className="font-bold mb-1">Üyeliğimi nasıl iptal ederim?</p>
                                        <p className="text-dz-grey-500 leading-relaxed">Panel &gt; Profil sayfasından veya bize e-posta göndererek iptal edebilirsiniz.</p>
                                    </div>
                                    <div className="border-t border-dz-grey-200 dark:border-dz-grey-800 pt-4">
                                        <p className="font-bold mb-1">İade politikanız nedir?</p>
                                        <p className="text-dz-grey-500 leading-relaxed">İlk 7 gün içinde koşulsuz iade garantisi sunuyoruz.</p>
                                    </div>
                                    <div className="border-t border-dz-grey-200 dark:border-dz-grey-800 pt-4">
                                        <p className="font-bold mb-1">Teknik destek ne kadar sürede yanıt verir?</p>
                                        <p className="text-dz-grey-500 leading-relaxed">Teknik konularda genellikle 12 saat içinde dönüş yapıyoruz.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.form
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            onSubmit={handleSubmit}
                            className="lg:col-span-3 bg-dz-grey-50 dark:bg-dz-grey-900 rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 p-8 space-y-6"
                        >
                            <h2 className="font-display font-bold text-xl mb-2">Mesaj Gönderin</h2>

                            <div className="grid sm:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold mb-2">Ad Soyad</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        className="w-full rounded-xl border border-dz-grey-200 dark:border-dz-grey-700 bg-dz-white dark:bg-dz-grey-950 px-4 py-3 text-sm placeholder:text-dz-grey-400 focus:outline-none focus:ring-2 focus:ring-dz-orange-500/30 focus:border-dz-orange-400 transition-all"
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
                                        className="w-full rounded-xl border border-dz-grey-200 dark:border-dz-grey-700 bg-dz-white dark:bg-dz-grey-950 px-4 py-3 text-sm placeholder:text-dz-grey-400 focus:outline-none focus:ring-2 focus:ring-dz-orange-500/30 focus:border-dz-orange-400 transition-all"
                                        placeholder="ornek@email.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-bold mb-2">Konu</label>
                                <select
                                    id="subject"
                                    name="subject"
                                    className="w-full rounded-xl border border-dz-grey-200 dark:border-dz-grey-700 bg-dz-white dark:bg-dz-grey-950 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-dz-orange-500/30 focus:border-dz-orange-400 transition-all appearance-none"
                                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239ca3af' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
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
                                    rows={6}
                                    required
                                    className="w-full rounded-xl border border-dz-grey-200 dark:border-dz-grey-700 bg-dz-white dark:bg-dz-grey-950 px-4 py-3 text-sm placeholder:text-dz-grey-400 focus:outline-none focus:ring-2 focus:ring-dz-orange-500/30 focus:border-dz-orange-400 transition-all resize-none"
                                    placeholder="Mesajınızı yazın..."
                                />
                            </div>

                            {status === "error" && (
                                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20">
                                    <p className="text-sm text-red-600 dark:text-red-400 font-medium">{errorMsg}</p>
                                </div>
                            )}

                            {status === "success" ? (
                                <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                                    <p className="text-sm font-bold text-green-700 dark:text-green-400">Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağız.</p>
                                </div>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="w-full flex items-center justify-center gap-2 bg-dz-orange-500 hover:bg-dz-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-dz-orange-500/20 hover:shadow-dz-orange-500/30 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:hover:scale-100"
                                >
                                    {status === "loading" ? (
                                        <><Loader2 className="w-4 h-4 animate-spin" /> Gönderiliyor...</>
                                    ) : (
                                        <><Send className="w-4 h-4" /> Gönder</>
                                    )}
                                </button>
                            )}
                        </motion.form>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
