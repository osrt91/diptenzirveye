"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowRight, Brain, Hourglass, Flame, Banknote, User, UserCircle, MinusCircle, CalendarDays, CalendarHeart, CalendarClock, CalendarCheck, GraduationCap, Briefcase, Rocket, Search, MapPin, AlertCircle, Compass, Timer, Clock, Infinity as InfinityIcon } from "lucide-react";

// Test Sorular? Veri Yap?s?
const testSorulari = [
    {
        id: "cinsiyet",
        soru: "Cinsiyetini se?er misin?",
        aciklama: "Sana daha ki?isel bir deneyim sunmam?za yard?mc? olur.",
        secenekler: [
            { id: "erkek", baslik: "Erkek", icon: <User className="w-5 h-5" /> },
            { id: "kadin", baslik: "Kad?n", icon: <UserCircle className="w-5 h-5" /> },
            { id: "belirtmek_istemiyorum", baslik: "Belirtmek ?stemiyorum", icon: <MinusCircle className="w-5 h-5" /> },
        ],
    },
    {
        id: "yas",
        soru: "Ya? aral???n nedir?",
        aciklama: "??renme plan?n? ya??na uygun hale getirmek istiyoruz.",
        secenekler: [
            { id: "18_24", baslik: "18 ? 24", icon: <CalendarDays className="w-5 h-5" /> },
            { id: "25_34", baslik: "25 ? 34", icon: <CalendarHeart className="w-5 h-5" /> },
            { id: "35_44", baslik: "35 ? 44", icon: <CalendarClock className="w-5 h-5" /> },
            { id: "45_plus", baslik: "45 ve ?zeri", icon: <CalendarCheck className="w-5 h-5" /> },
        ],
    },
    {
        id: "meslek",
        soru: "?u an ne yap?yorsun?",
        aciklama: "Mevcut durumuna g?re en uygun ba?lang?? noktas?n? belirleyelim.",
        secenekler: [
            { id: "ogrenci", baslik: "??renci", icon: <GraduationCap className="w-5 h-5" /> },
            { id: "calisan", baslik: "?al??an / Profesyonel", icon: <Briefcase className="w-5 h-5" /> },
            { id: "girisimci", baslik: "Giri?imci / Freelancer", icon: <Rocket className="w-5 h-5" /> },
            { id: "is_arayan", baslik: "?? Ar?yor / Kariyer De?i?tiriyor", icon: <Search className="w-5 h-5" /> },
        ],
    },
    {
        id: "hedef",
        soru: "DiptenZirveye ser?venindeki temel hedefin ne?",
        aciklama: "Sana en uygun yol haritas?n? ?izebilmemiz i?in en b?y?k ?nceli?ini se?.",
        secenekler: [
            { id: "erteleme", baslik: "Erteleme Al??kanl???n? Yenmek", icon: <Hourglass className="w-5 h-5" /> },
            { id: "odak", baslik: "Odaklanma ve Derin ?al??ma", icon: <Brain className="w-5 h-5" /> },
            { id: "motivasyon", baslik: "S?rekli Motivasyon Kazanmak", icon: <Flame className="w-5 h-5" /> },
            { id: "gelir", baslik: "AI ile Gelir Elde Etmek", icon: <Banknote className="w-5 h-5" /> },
        ],
    },
    {
        id: "durum",
        soru: "?u anki durumunu nas?l tan?mlars?n?",
        aciklama: "Kendi analizinde d?r?st olmak ba?lang?c?n yar?s?d?r.",
        secenekler: [
            { id: "baslangic", baslik: "Nereden ba?layaca??m? bilmiyorum", icon: <MapPin className="w-5 h-5" /> },
            { id: "yarim_birakma", baslik: "Ba?l?yorum ama hep yar?m kal?yor", icon: <AlertCircle className="w-5 h-5" /> },
            { id: "tikanma", baslik: "Belirli bir noktaya geldim ama t?kand?m", icon: <Compass className="w-5 h-5" /> },
        ],
    },
    {
        id: "zaman",
        soru: "G?nde kendine ne kadar zaman ay?rabilirsin?",
        aciklama: "Program? senin h?z?na g?re ayarlayaca??z.",
        secenekler: [
            { id: "15_dk", baslik: "Sadece 15-20 Dakika", icon: <Timer className="w-5 h-5" /> },
            { id: "1_saat", baslik: "1 Saat civar?", icon: <Clock className="w-5 h-5" /> },
            { id: "sinirsiz", baslik: "Gerekti?i kadar ay?rabilirim", icon: <InfinityIcon className="w-5 h-5" /> },
        ],
    },
];

export default function TestAkisi() {
    const router = useRouter();
    const [mevcutSoruIndex, setMevcutSoruIndex] = useState(0);
    const [cevaplar, setCevaplar] = useState<Record<string, string>>({});
    const [analizEdiliyor, setAnalizEdiliyor] = useState(false);
    const [analizTamamlandi, setAnalizTamamlandi] = useState(false);

    // ?lerleme y?zdesi
    const progress = ((mevcutSoruIndex) / testSorulari.length) * 100;

    const handleSecim = (soruId: string, secenekId: string) => {
        // Cevab? kaydet
        setCevaplar((prev) => ({ ...prev, [soruId]: secenekId }));

        // Biraz bekletip di?er soruya ge? (G?zel bir hissiyat i?in)
        setTimeout(() => {
            sonrakiSoru();
        }, 400); // 400ms delay
    };

    const sonrakiSoru = () => {
        if (mevcutSoruIndex < testSorulari.length - 1) {
            setMevcutSoruIndex((prev) => prev + 1);
        } else {
            // Test bitti, analiz ekran?na ge?
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
        } catch (error) {
            console.error("Analiz ?a?r?s? ba?ar?s?z:", error);
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
                                ??renme h?z? hesaplan?yor... Profil e?le?tiriliyor... ?zel m?fredat derleniyor...
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

            {/* ?st Bar - Geri ve ?lerleme */}
            <div className="flex items-center justify-between mb-8 relative z-10">
                <button
                    onClick={() => setMevcutSoruIndex((prev) => Math.max(0, prev - 1))}
                    className={`text-sm font-medium transition-colors ${mevcutSoruIndex === 0 ? "text-transparent pointer-events-none" : "text-dz-grey-600 dark:text-dz-white/50 hover:text-dz-black dark:hover:text-white"
                        }`}
                >
                    &larr; Geri
                </button>
                <span className="text-xs font-bold tracking-widest text-dz-orange-600 dark:text-dz-orange-500 uppercase bg-dz-orange-50 dark:bg-dz-orange-500/10 px-3 py-1 rounded-full border border-dz-orange-200 dark:border-transparent">
                    Ad?m {mevcutSoruIndex + 1} / {testSorulari.length}
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

            {/* Soru Alan? */}
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

                        {/* Se?enekler */}
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
