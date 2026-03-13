"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Lock, Shield, CreditCard, Eye, Star, Users, Rocket } from "lucide-react";
import Link from "next/link";

const features = [
  { icon: <Eye className="w-5 h-5" />, title: "Sıfır Risk, Tam Momentum", desc: "İlk modül (Eylem İvmesi) tamamen ücretsiz. Eğer tek bir sayfa bile seni harekete geçirmezse, kayıtsız şartsız durabilirsin." },
  { icon: <Star className="w-5 h-5" />, title: "500+ Altın Prompt Mimarlığı", desc: "Deneme yanılma ile zaman kaybetme. Gerçek dünyada test edilmiş, 'nokta atışı' sonuç veren prompt kütüphanesini kopyala-yapıştır yap." },
  { icon: <Users className="w-5 h-5" />, title: "100+ Yeni Nesil Gelir Kapısı", desc: "Sadece araç öğrenme. Yapay zekayı bir çalışan gibi kullanarak dijital varlıklar üretmeyi ve yeni gelir kapıları açmayı keşfet." },
  { icon: <Rocket className="w-5 h-5" />, title: "Manuel İş Yükünü Sıfırla", desc: "Zamanını manuel işlere değil, stratejiye ayır. Değerini 10x artıracak AI otomasyonlarıyla kariyerinde devrim yarat." },
];

const pricingTiers = [
  {
    name: "Giriş (Sıfır Risk)",
    price: "₺0",
    period: "/ sonsuza kadar",
    desc: "İlk kitabı ve temel AI araçlarını tamamen ücretsiz keşfet.",
    highlight: false,
    cta: "Ücretsiz Başla",
    features: [
      { text: "Kitap 1: AI Devrimine Giriş", included: true },
      { text: "Eylem İvmesi (Aktivasyon) Modülü", included: true },
      { text: "Temel Prompt Kütüphanesi", included: true },
      { text: "XP ve Rozet Sistemi", included: true },
      { text: "Diğer 9 Masterclass Kitabı", included: false },
      { text: "Performans Kalibrasyon Çizelgeleri", included: false },
      { text: "VIP Topluluk & AI Coaching", included: false },
    ],
  },
  {
    name: "Zirve Masterclass (3 Aylık)",
    price: "₺999,99",
    period: "/ ay",
    desc: "3 aylık kapsamlı eğitim programı. Tüm masterclass ekosistemine tam erişim.",
    highlight: true,
    badge: "En Popüler",
    cta: "Hemen Başla",
    features: [
      { text: "10 Masterclass Kitaba Tam Erişim", included: true },
      { text: "500+ Altın Prompt Mimarlığı", included: true },
      { text: "Performans Kalibrasyon Çarkı (Momentum)", included: true },
      { text: "Lazer Odaklı Hedef Matrisi (Nexus)", included: true },
      { text: "Sürekli Güncellenen AI Kaynak Havuzu", included: true },
      { text: "VIP Topluluk & Prompt Paylaşım Merkezi", included: true },
      { text: "Abonelik Süresince Ücretsiz Güncellemeler", included: true },
    ],
  },
];

export default function Benefits() {
  return (
    <section className="px-4 pt-24 md:pt-32 pb-8 bg-dz-grey-50 dark:bg-background relative overflow-hidden">

      <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-dz-orange-500/20 to-transparent" />
      <div className="absolute left-[10%] bottom-[10%] w-[600px] h-[600px] bg-dz-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Başlık */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-dz-orange-500/30 bg-dz-orange-500/10 text-dz-orange-500 text-sm font-bold tracking-wide uppercase mb-6 shadow-[0_0_15px_rgba(249,115,22,0.15)]"
          >
            Neden <span className="font-black">Dipten</span><span className="font-normal text-dz-orange-500">Zirveye</span>?
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-dz-black dark:text-dz-white mb-6 uppercase tracking-tight"
          >
            Önce Dene, <span className="text-transparent bg-clip-text bg-gradient-to-r from-dz-orange-500 to-dz-amber-400">Sonra Karar Ver.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-center text-dz-grey-600 dark:text-dz-grey-400 max-w-2xl mx-auto text-lg/relaxed"
          >
            İlk kitabımız tamamen ücretsiz. Platformu tanı, değerini gör, beğenirsen devam et. Seni ikna etmek bizim işimiz.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="bg-dz-white dark:bg-dz-white/[0.03] border border-dz-grey-200 dark:border-dz-white/10 rounded-2xl p-6 text-center group hover:border-dz-orange-300 dark:hover:border-dz-orange-500/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-dz-orange-500/10 flex items-center justify-center text-dz-orange-500 mx-auto mb-4 group-hover:bg-dz-orange-500 group-hover:text-white transition-colors">
                {f.icon}
              </div>
              <h3 className="font-bold text-dz-black dark:text-dz-white mb-2 min-w-0 break-words">{f.title}</h3>
              <p className="text-sm text-dz-grey-500 dark:text-dz-grey-400 min-w-0 break-words">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Fiyat Kartları */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              className={`relative rounded-3xl p-8 md:p-10 flex flex-col h-full min-h-[520px] transition-all duration-300 hover:-translate-y-2 ${tier.highlight
                ? "border-2 border-dz-orange-500 bg-dz-orange-500/5 shadow-[0_0_30px_rgba(249,115,22,0.15)] hover:shadow-[0_0_50px_rgba(249,115,22,0.25)]"
                : "border border-dz-grey-200 dark:border-dz-white/5 bg-dz-white dark:bg-dz-white/[0.02] backdrop-blur-md hover:border-dz-grey-300 dark:hover:border-dz-white/10"
                }`}
            >
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-dz-orange-500 text-white dark:text-dz-black font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white dark:bg-dz-black animate-pulse" />
                  {tier.badge}
                </div>
              )}

              <h3 className={`text-2xl font-display font-bold mb-2 ${tier.highlight ? "text-dz-orange-500" : "text-dz-black dark:text-dz-white"}`}>
                {tier.name}
              </h3>
              <div className="text-dz-grey-500 text-sm mb-6">{tier.desc}</div>

              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-4xl font-black text-dz-black dark:text-dz-white">{tier.price}</span>
                <span className="text-dz-grey-500">{tier.period}</span>
              </div>

              {tier.highlight ? (
                <div className="inline-flex items-center gap-2 mb-8 bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-red-500/20 w-fit">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  Erken Erişim: Sadece 14 Kişi Sınırlı Kontenjan
                </div>
              ) : (
                <div className="mb-8" />
              )}

              <ul className="space-y-3 mb-8 flex-grow">
                {tier.features.map((f) => (
                  <li key={f.text} className={`flex items-start gap-3 min-w-0 ${f.included ? "text-dz-grey-700 dark:text-dz-grey-300" : "text-dz-grey-400 dark:text-dz-grey-600 line-through"}`}>
                    <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${f.included ? (tier.highlight ? "text-dz-orange-500" : "text-dz-grey-400 dark:text-dz-grey-500") : "text-dz-grey-300 dark:text-dz-grey-700"}`} />
                    <span className="min-w-0">{f.text}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={tier.highlight ? "/api/checkout?products=e3157e14-ce82-4a1c-ab27-d60e138e05cd" : "/test"}
                className={`w-full min-h-[44px] py-4 rounded-xl font-bold text-center block transition-colors ${tier.highlight
                  ? "bg-dz-orange-500 text-white hover:bg-dz-orange-600 shadow-lg shadow-dz-orange-500/20"
                  : "border border-dz-grey-200 dark:border-dz-white/10 text-dz-black dark:text-dz-white hover:bg-dz-grey-100 dark:hover:bg-dz-white/5"
                  }`}
              >
                {tier.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60"
        >
          <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-dz-grey-100 dark:bg-dz-white/5 flex items-center justify-center">
              <Lock className="w-4 h-4 text-dz-grey-500" />
            </div>
            <span className="text-sm font-medium text-dz-grey-500">256-Bit SSL<br />Güvenli Ödeme</span>
          </div>
          <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-dz-grey-100 dark:bg-dz-white/5 flex items-center justify-center">
              <Shield className="w-4 h-4 text-dz-grey-500" />
            </div>
            <span className="text-sm font-medium text-dz-grey-500">İçerik<br />Koruma Sistemi</span>
          </div>
          <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-dz-grey-100 dark:bg-dz-white/5 flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-dz-grey-500" />
            </div>
            <span className="text-sm font-medium text-dz-grey-500">SSL ile<br />Güvenli Ödeme</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
