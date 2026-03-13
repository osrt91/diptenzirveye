"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import DZLogo from "@/components/DZLogo";
import { FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { label: "AI Müfredatı", href: "/#mufredat" },
      { label: "Önizleme", href: "/panel-onizleme" },
      { label: "Blog", href: "/blog" },
      { label: "Sıkça Sorulan Sorular", href: "/#sss" },
    ],
  },
  {
    // NOTE: /panel/* routes require authentication; unauthenticated users
    // will be redirected to /giris by the auth middleware.
    title: "Kariyer & Eğitim",
    links: [
      { label: "Eylem İvmesi Serisi", href: "/panel/erteleme" },
      { label: "Liderlik Tablosu", href: "/panel/siralama" },
      { label: "Topluluk", href: "/panel/sohbet" },
      { label: "Sertifikalar", href: "/panel/sertifika" },
    ],
  },
  {
    title: "Yasal & Destek",
    links: [
      { label: "Gizlilik Politikası", href: "/gizlilik" },
      { label: "Kullanım Koşulları", href: "/kosullar" },
      { label: "KVKK Aydınlatma", href: "/kvkk" },
      { label: "İletişim", href: "/iletisim" },
    ],
  },
];

const socials = [
  { icon: <FaTwitter />, href: "https://x.com/diptenzirveye", label: "Twitter" },
  { icon: <FaInstagram />, href: "https://instagram.com/diptenzirveye", label: "Instagram" },
  { icon: <FaYoutube />, href: "https://youtube.com/@diptenzirveye", label: "YouTube" },
  { icon: <FaLinkedin />, href: "https://linkedin.com/company/diptenzirveye", label: "LinkedIn" },
];

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: "", interest: "newsletter" }),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-2xl px-6 py-4">
        <span className="text-green-400 text-2xl">✓</span>
        <span className="text-green-400 font-bold">Başarıyla abone oldun!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2 bg-dz-black/80 dark:bg-dz-black p-2 rounded-2xl border border-dz-white/10 shadow-inner">
      <div className="pl-4 text-dz-grey-500 hidden sm:block">
        <Mail className="w-5 h-5" />
      </div>
      <label htmlFor="footer-newsletter-email" className="sr-only">E-posta adresin</label>
      <input
        id="footer-newsletter-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-posta adresin"
        required
        className="bg-transparent border-none text-dz-white placeholder:text-dz-grey-600 focus:outline-none focus:ring-0 w-full sm:w-64 px-4 sm:px-2 py-3 sm:py-0 min-w-0"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-dz-orange-500 hover:bg-dz-orange-600 text-white px-6 py-3 min-h-[44px] rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] w-full sm:w-auto disabled:opacity-50"
      >
        {status === "loading" ? "..." : <>Abone Ol <ArrowRight className="w-4 h-4" /></>}
      </button>
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-dz-black dark:bg-background text-dz-grey-400 overflow-hidden pt-20 border-t border-dz-white/5">

      {/* Dynamic Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-dz-orange-500/50 to-transparent" />
      <div className="absolute -top-[200px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-dz-orange-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(var(--dz-white) 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* Top Newsletter & CTA Section */}
        <div className="bg-dz-white/5 dark:bg-dz-white/[0.02] border border-dz-white/10 rounded-3xl p-6 sm:p-8 md:p-12 mb-16 backdrop-blur-md shadow-2xl relative overflow-hidden group flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-dz-orange-500/20 blur-[80px] rounded-full group-hover:bg-dz-orange-500/30 transition-all duration-700 pointer-events-none" />

          <div className="max-w-xl relative z-10">
            <h3 className="font-display font-bold text-3xl text-dz-white mb-3">AI Çağında Geri Kalma.</h3>
            <p className="text-dz-grey-500 text-lg">Milyarlarca verinin özetlendiği en güçlü bültene tıkla, haftalık 1 kritik prompt ve araç analizini gelen kutunda gör.</p>
          </div>

          <div className="w-full lg:w-auto flex-shrink-0 relative z-10">
            <NewsletterForm />
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 px-4">

          {/* Brand Col */}
          <div className="lg:col-span-5 pr-0 md:pr-12">
            <Link href="/" className="inline-flex items-center mb-6 text-dz-white">
              <DZLogo size="lg" />
            </Link>
            <p className="text-dz-grey-500 leading-relaxed mb-8 max-w-sm">
              Sadece bilgiyi tüketen değil, yapay zekayı bir asistan olarak kullanarak geleceği üreten liderlerin buluşma noktası.
            </p>
            <div className="flex gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-12 h-12 rounded-2xl bg-dz-white/5 border border-dz-white/10 flex items-center justify-center text-dz-grey-400 hover:text-white hover:bg-dz-orange-500 hover:border-dz-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Cols */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {footerLinks.map((col) => (
              <div key={col.title}>
                <h4 className="text-white font-bold mb-6 tracking-wide">{col.title}</h4>
                <ul className="space-y-4">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-dz-grey-500 hover:text-dz-orange-400 transition-colors font-medium flex items-center gap-2 group"
                      >
                        <span className="w-1 h-1 rounded-full bg-dz-orange-500/0 group-hover:bg-dz-orange-500 transition-colors" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dz-white/10 bg-dz-black pb-[env(safe-area-inset-bottom,0px)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-dz-grey-600 font-medium text-center md:text-left">
            © {new Date().getFullYear()} <span className="font-display"><span className="font-black">Dipten</span><span className="font-normal text-dz-orange-500">Zirveye</span></span>. Tüm hakları saklıdır.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-dz-grey-600 font-medium">
            <span>Türkiye&apos;de Tasarlandı 🇹🇷</span>
            <div className="w-1 h-1 rounded-full bg-dz-grey-700" />
            <span className="flex items-center gap-2 cursor-default" title="Tüm sistemler çalışıyor">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Tüm Sistemler Aktif
            </span>
          </div>
        </div>
      </div>

    </footer>
  );
}
