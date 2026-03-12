"use client";

import { FolderOpen, Download, Lock, FileText, Headphones, Rocket, Wrench } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { topTierTools, ToolCategory } from "@/components/panel/chat/unified-tool-data";

const folders = [
  {
    title: "Kitap Özetleri ve PDF'ler",
    description: "Her kitabın önemli noktalarını özet olarak içerir. Hızlı tekrar için ideal.",
    isLocked: false,
    items: 12,
    icon: <FileText className="w-6 h-6" />,
    contents: [
      "AI Devrimini Anlamak - Özet (PDF)",
      "Prompt Mühendisliği - Hızlı Başvuru Kartı",
      "AI Araçları Seçim Rehberi - Karşılaştırma Tablosu",
      "Eylem İvmesi Serisi - 90 Günlük Plan",
      "AI ile İlk Gelirim - Başlangıç Rehberi",
    ],
  },
  {
    title: "Gelişmiş Komut Şablonları (Promptlar)",
    description: "ChatGPT, Claude, Gemini ve diğer araçlar için hazır prompt koleksiyonu.",
    isLocked: false,
    items: 45,
    icon: <Rocket className="w-6 h-6" />,
    contents: [
      "İçerik Üretimi - 20 Prompt Şablonu",
      "Veri Analizi - 10 İleri Prompt",
      "Kod Yazımı - 8 Framework Prompt",
      "SEO Optimizasyonu - 5 Strateji Prompt",
      "İş Planı Oluşturma - 2 Master Prompt",
    ],
  },
  {
    title: "Premium Araç Kılavuzları",
    description: "Midjourney, Cursor, Zapier gibi araçların detaylı kullanım rehberleri.",
    isLocked: true,
    items: 8,
    icon: <FileText className="w-6 h-6" />,
    contents: [
      "Midjourney Ustası Rehberi",
      "Cursor AI ile Kod Yazma",
      "Zapier Otomasyon Şemaları",
      "Claude Yaratıcı Yazarlık",
    ],
  },
  {
    title: "Sesli Eğitim Notları",
    description: "Yolda, sporda veya uyumadan önce dinleyebileceğin ses kayıtları.",
    isLocked: true,
    items: 5,
    icon: <Headphones className="w-6 h-6" />,
    contents: [
      "AI Temelleri - Sesli Özet (15 dk)",
      "Prompt Mühendisliği - Sesli Rehber (22 dk)",
      "Odaklanma Teknikleri - Sesli Eğitim (18 dk)",
    ],
  },
];

export default function KaynaklarPage() {
  const [activeTab, setActiveTab] = useState<"dosyalar" | "araclar">("dosyalar");
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | "Tümü">("Tümü");

  const categories = ["Tümü", ...Array.from(new Set(topTierTools.map(t => t.category)))];

  const filteredTools = selectedCategory === "Tümü"
    ? topTierTools
    : topTierTools.filter(t => t.category === selectedCategory);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-dz-black dark:text-dz-white">
          Kaynaklar & Endüstri Platformları
        </h1>
        <p className="text-dz-grey-600 dark:text-dz-grey-400 mt-2">
          Akademi boyunca ihtiyacınız olacak dokümanlara ve sektör standardı yapay zeka araçlarına buradan ulaşabilirsiniz.
        </p>
      </div>

      {/* TABS */}
      <div className="flex z-10 relative bg-dz-grey-100 dark:bg-dz-grey-900/50 p-1.5 rounded-2xl w-fit">
        <button
          type="button"
          onClick={() => setActiveTab("dosyalar")}
          className={`relative px-6 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${activeTab === "dosyalar"
            ? "text-dz-white shadow-md bg-dz-orange-500"
            : "text-dz-grey-500 hover:text-dz-black dark:hover:text-dz-white"
            }`}
        >
          <span className="relative z-10 flex items-center gap-2">
            <FolderOpen className="w-4 h-4" />
            Kütüphane & Klasörler
          </span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("araclar")}
          className={`relative px-6 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${activeTab === "araclar"
            ? "text-dz-white shadow-md bg-dz-orange-500"
            : "text-dz-grey-500 hover:text-dz-black dark:hover:text-dz-white"
            }`}
        >
          <span className="relative z-10 flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            Endüstri Araçları & Platformlar
          </span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "dosyalar" ? (
          <motion.div
            key="dosyalar"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid gap-6 md:grid-cols-2"
          >
            {folders.map((folder, index) => (
              <div
                key={index}
                className="group relative flex flex-col p-6 border border-dz-grey-200 dark:border-dz-grey-800 rounded-3xl bg-dz-white dark:bg-dz-grey-900 hover:border-dz-orange-300 dark:hover:border-dz-orange-500/30 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-dz-orange-500/20 to-dz-amber-500/10 text-dz-orange-500 rounded-2xl flex items-center justify-center">
                    {folder.icon}
                  </div>
                  {folder.isLocked && (
                    <span className="bg-dz-grey-200 dark:bg-dz-grey-800 text-dz-grey-500 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <Lock className="w-3 h-3" /> PREMIUM
                    </span>
                  )}
                </div>
                <h3 className="font-display font-bold text-lg text-dz-black dark:text-dz-white mb-1 group-hover:text-dz-orange-500 transition-colors">
                  {folder.title}
                </h3>
                <p className="text-sm text-dz-grey-500 dark:text-dz-grey-400 mb-4">
                  {folder.description}
                </p>

                {/* Content List */}
                <div className="space-y-2 mb-4">
                  {folder.contents.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-dz-grey-600 dark:text-dz-grey-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-dz-orange-500/50 shrink-0" />
                      {folder.isLocked ? (
                        <span className="blur-[2px] select-none">{item}</span>
                      ) : (
                        <span>{item}</span>
                      )}
                    </div>
                  ))}
                </div>

                <p className="text-sm font-medium text-dz-orange-500 mt-auto flex items-center gap-2 pt-3 border-t border-dz-grey-100 dark:border-dz-grey-800">
                  <Download className="w-3 h-3" /> {folder.items} Dosya
                </p>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="araclar"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat as typeof selectedCategory)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${selectedCategory === cat
                    ? "bg-dz-orange-500 text-white border-dz-orange-500"
                    : "bg-dz-white dark:bg-dz-grey-900 text-dz-grey-500 border-dz-grey-200 dark:border-dz-grey-800 hover:border-dz-orange-300 dark:hover:border-dz-orange-500/50"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredTools.map((tool, idx) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group flex flex-col items-center bg-dz-white dark:bg-dz-grey-900 p-6 rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 hover:border-dz-orange-500 transition-all shadow-sm hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-16 h-16 flex items-center justify-center mb-4">
                    <tool.Icon className="w-full h-full drop-shadow-sm group-hover:drop-shadow-lg transition-all transform group-hover:scale-110" />
                  </div>
                  <h3 className="font-display font-bold text-center text-dz-black dark:text-white mb-1">
                    {tool.name}
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-dz-orange-500 bg-dz-orange-500/10 px-2 py-0.5 rounded-full mb-3">
                    {tool.category}
                  </span>
                  {tool.description && (
                    <p className="text-xs text-center text-dz-grey-500 dark:text-dz-grey-400 line-clamp-3">
                      {tool.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
