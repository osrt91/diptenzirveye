"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowRight, Brain, Hourglass, Flame, Banknote, User, UserCircle, MinusCircle, CalendarDays, CalendarHeart, CalendarClock, CalendarCheck, GraduationCap, Briefcase, Rocket, Search, MapPin, AlertCircle, Compass, Timer, Clock, Infinity as InfinityIcon } from "lucide-react";

// Test Soruları Veri Yapısı
const testSorulari = [
    {
        id: "cinsiyet",
        soru: "Cinsiyetini seçer misin?",
        aciklama: "Sana özel bir deneyim sunabilmemiz için bilmemiz yeterli.",
        secenekler: [
            { id: "erkek", baslik: "Erkek", icon: <User className="w-5 h-5" /> },
            { id: "kadin", baslik: "Kadın", icon: <UserCircle className="w-5 h-5" /> },
            { id: "belirtmek_istemiyorum", baslik: "Belirtmek istemiyorum", icon: <MinusCircle className="w-5 h-5" /> },
        ],
    },
    {
        id: "yas",
        soru: "Yaş aralığın hangisi?",
        aciklama: "Öğrenme planını sana en uygun şekilde hazırlayalım.",
        secenekler: [
            { id: "18_24", baslik: "18 – 24 yaş", icon: <CalendarDays className="w-5 h-5" /> },
            { id: "25_34", baslik: "25 – 34 yaş", icon: <CalendarHeart className="w-5 h-5" /> },
            { id: "35_44", baslik: "35 – 44 yaş", icon: <CalendarClock className="w-5 h-5" /> },
            { id: "45_plus", baslik: "45 yaş ve üzeri", icon: <CalendarCheck className="w-5 h-5" /> },
        ],
    },
    {
        id: "meslek",
        soru: "Şu anda ne yapıyorsun?",
        aciklama: "Durumuna göre sana en doğru başlangıç noktasını belirleyelim.",
        secenekler: [
            { id: "ogrenci", baslik: "Öğrenciyim", icon: <GraduationCap className="w-5 h-5" /> },
            { id: "calisan", baslik: "Çalışıyorum / Profesyonelim", icon: <Briefcase className="w-5 h-5" /> },
            { id: "girisimci", baslik: "Girişimciyim / Serbest çalışıyorum", icon: <Rocket className="w-5 h-5" /> },
            { id: "is_arayan", baslik: "İş arıyorum / Kariyer değiştiriyorum", icon: <Search className="w-5 h-5" /> },
        ],
    },
    {
        id: "hedef",
        soru: "Bu yolculuktaki asıl hedefin ne?",
        aciklama: "Sana en uygun yol haritasını çizebilmemiz için önceliğini seç.",
        secenekler: [
            { id: "erteleme", baslik: "Erteleme alışkanlığımı yenmek", icon: <Hourglass className="w-5 h-5" /> },
            { id: "odak", baslik: "Odaklanmak ve derinlemesine çalışmak", icon: <Brain className="w-5 h-5" /> },
            { id: "motivasyon", baslik: "Sürekli motivasyonumu korumak", icon: <Flame className="w-5 h-5" /> },
            { id: "gelir", baslik: "Yapay zekâ ile gelir elde etmek", icon: <Banknote className="w-5 h-5" /> },
        ],
    },
    {
        id: "durum",
        soru: "Kendini şu an nasıl tanımlarsın?",
        aciklama: "Dürüst olmak, doğru başlangıcın yarısıdır.",
        secenekler: [
            { id: "baslangic", baslik: "Nereden başlayacağımı bilmiyorum", icon: <MapPin className="w-5 h-5" /> },
            { id: "yarim_birakma", baslik: "Başlıyorum ama yarım bırakıyorum", icon: <AlertCircle className="w-5 h-5" /> },
            { id: "tikanma", baslik: "Belli bir noktaya geldim ama tıkandım", icon: <Compass className="w-5 h-5" /> },
        ],
    },
    {
        id: "zaman",
        soru: "Günde kendine ne kadar vakit ayırabilirsin?",
        aciklama: "Programı senin temponla ilerleyecek şekilde ayarlayacağız.",
        secenekler: [
            { id: "15_dk", baslik: "Günde 15–20 dakika", icon: <Timer className="w-5 h-5" /> },
            { id: "1_saat", baslik: "Günde 1 saat kadar", icon: <Clock className="w-5 h-5" /> },
            { id: "sinirsiz", baslik: "Gerektiği kadar ayırabilirim", icon: <InfinityIcon className="w-5 h-5" /> },
        ],
    },
];

export default function TestAkisi() {
    const router = useRouter();
    const [mevcutSoruIndex, setMevcutSoruIndex] = useState(0);
    const [cevaplar, setCevaplar] = useState<Record<string, string>>({});
    const [analizEdiliyor, setAnalizEdiliyor] = useState(false);
    const [analizTamamlandi, setAnalizTamamlandi] = useState(false);

    // İlerleme yüzdesi
    const progress = ((mevcutSoruIndex) / testSorulari.length) * 100;

    const handleSecim = (soruId: string, secenekId: string) => {
        // Cevabı kaydet
        setCevaplar((prev) => ({ ...prev, [soruId]: secenekId }));

        // Biraz bekletip diğer soruya geç (Güzel bir hissiyat için)
        setTimeout(() => {
            sonrakiSoru();
        }, 400); // 400ms delay
    };

    const sonrakiSoru = () => {
        if (mevcutSoruIndex < testSorulari.length - 1) {
            setMevcutSoruIndex((prev) => prev + 1);
        } else {
            // Test bitti, analiz ekranına geç
            testiBitir();
        }
    };

    const testiBitir = async () => {
        setAnalizEdiliyor(true);
        try {
            const res = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answers: cevaplar }),
            });
            const data = await res.json();

            if (data.analysis) {
                // Save to sessionStorage for the next page to use
                sessionStorage.setItem("ai_analysis", data.analysis);
            }
        } catch {
            // silent fail - analysis is optional
        }

        setAnalizTamamlandi(true);
        setTimeout(() => {
            router.push("/test/sonuc");
        }, 800);
    };

    if (analizEdiliyor) {
        return (
            <AnimatePresence mode="wait">
                {!analizTamamlandi && (
                    <motion.div
                        key="analiz"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: -60, scale: 0.95 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="flex flex-col items-center justify-center text-center space-y-6 py-20"
                    >
                        <div className="relative w-32 h-32 flex items-center justify-center">
                            {/* Outer Pulse */}
                            <motion.div
                                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                className="absolute inset-0 rounded-full border border-dz-orange-500"
                            />
                            {/* Inner Spin */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                className="absolute inset-2 rounded-full border-t-2 border-r-2 border-dz-orange-400"
                            />
                            {/* Core Glow */}
                            <div className="w-12 h-12 bg-dz-orange-500 rounded-full shadow-[0_0_30px_rgba(249,115,22,0.6)] animate-pulse flex items-center justify-center">
                                <Brain className="w-5 h-5 text-white" />
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold font-display tracking-tight text-dz-black dark:text-white mb-2">Yapay Zeka Seni Analiz Ediyor</h2>
                            <p className="text-dz-grey-600 dark:text-dz-grey-400 font-mono text-sm max-w-sm mx-auto">
                                Öğrenme hızı hesaplanıyor... Profil eşleştiriliyor... Özel müfredat derleniyor...
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        );
    }

    const mevcutSoru = testSorulari[mevcutSoruIndex];

    return (
        <div className="bg-dz-grey-50 dark:bg-dz-white/5 border border-dz-grey-200 dark:border-dz-white/10 rounded-2xl p-6 md:p-10 backdrop-blur-sm relative overflow-hidden shadow-lg">

            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-32 bg-dz-orange-500/10 blur-[64px] rounded-full pointer-events-none" />

            {/* Üst Bar - Geri ve İlerleme */}
            <div className="flex items-center justify-between mb-8 relative z-10">
                <button
                    onClick={() => setMevcutSoruIndex((prev) => Math.max(0, prev - 1))}
                    className={`text-sm font-medium transition-colors ${mevcutSoruIndex === 0 ? "text-transparent pointer-events-none" : "text-dz-grey-600 dark:text-dz-white/50 hover:text-dz-black dark:hover:text-white"
                        }`}
                >
                    &larr; Geri
                </button>
                <span className="text-xs font-bold tracking-widest text-dz-orange-600 dark:text-dz-orange-500 uppercase bg-dz-orange-50 dark:bg-dz-orange-500/10 px-3 py-1 rounded-full border border-dz-orange-200 dark:border-transparent">
                    Adım {mevcutSoruIndex + 1} / {testSorulari.length}
                </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-dz-grey-200 dark:bg-dz-white/10 rounded-full mb-12 overflow-hidden relative z-10">
                <motion.div
                    className="h-full bg-dz-orange-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>

            {/* Soru Alanı */}
            <div className="min-h-[300px] relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={mevcutSoru.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display tracking-tight text-dz-black dark:text-white mb-3">
                            {mevcutSoru.soru}
                        </h2>
                        <p className="text-base sm:text-lg text-dz-grey-700 dark:text-dz-grey-300 mb-8 sm:mb-10">
                            {mevcutSoru.aciklama}
                        </p>

                        {/* Seçenekler */}
                        <div className="flex flex-col gap-4">
                            {mevcutSoru.secenekler.map((secenek) => {
                                const seciliMi = cevaplar[mevcutSoru.id] === secenek.id;

                                return (
                                    <button
                                        key={secenek.id}
                                        onClick={() => handleSecim(mevcutSoru.id, secenek.id)}
                                        className={`
                      w-full flex items-center justify-between p-5 rounded-xl border text-left transition-all duration-200 group shadow-sm
                      ${seciliMi
                                                ? 'border-dz-orange-500 bg-dz-orange-100 dark:bg-dz-orange-500/10'
                                                : 'border-dz-grey-200 dark:border-dz-white/10 bg-dz-white dark:bg-dz-grey-900 hover:border-dz-orange-300 dark:hover:border-dz-white/20 hover:bg-dz-grey-50 dark:hover:bg-dz-grey-800'
                                            }
                    `}
                                    >
                                        <div className="flex items-center gap-4">
                                            {secenek.icon && (
                                                <div className={`p-2 rounded-lg ${seciliMi ? 'bg-dz-orange-50 dark:bg-dz-orange-500/20 text-dz-orange-600 dark:text-dz-orange-500' : 'bg-dz-grey-100 dark:bg-dz-grey-800 text-dz-orange-400 group-hover:text-dz-orange-500 transition-colors'}`}>
                                                    {secenek.icon}
                                                </div>
                                            )}
                                            <span className={`text-lg font-medium ${seciliMi ? 'text-dz-black dark:text-white' : 'text-dz-grey-800 dark:text-dz-white/90'}`}>
                                                {secenek.baslik}
                                            </span>
                                        </div>

                                        <div className={`
                      flex items-center justify-center w-6 h-6 rounded-full border 
                      ${seciliMi ? 'border-dz-orange-500 bg-dz-orange-500 text-white' : 'border-dz-grey-300 dark:border-dz-white/20 text-transparent group-hover:border-dz-grey-400 dark:group-hover:border-dz-white/40'}
                    `}>
                                            <CheckCircle2 className="w-4 h-4" />
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

        </div>
    );
}
