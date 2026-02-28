"use client";

import { motion } from "framer-motion";
import { DeepSeekIcon, KimiIcon, WindsurfIcon, AntigravityIcon, BananaIcon, CursorIcon, ClaudeIcon, YandexIcon, GrokIcon, KaggleIcon, HuggingFaceIcon, FigmaIcon, TrelloIcon, CanvaIcon, NotionIcon, PerplexityIcon } from "./panel/chat/ai-tool-badges";

const items = [
  { title: "Rozet koleksiyonu", desc: "Kitap ve modül tamamladıkça rozetler açılır" },
  { title: "DZ Coin", desc: "Görev ve challenge tamamlayarak kazan, harca" },
  { title: "Level sistemi", desc: "XP biriktir, seviye atla, liderlik tablosunda yer al" },
];

export default function GamificationShowcase() {
  return (
    <section className="px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-dz-black dark:text-dz-white text-center mb-4"
        >
          Gamification
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-dz-grey-600 dark:text-dz-grey-400 mb-12"
        >
          Görünmeyen gelişim, görünür hâle gelir. XP, level, streak.
        </motion.p>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-dz-orange-200 dark:border-dz-orange-800 bg-dz-orange-50 dark:bg-dz-grey-800 p-6 text-center"
            >
              <div
                className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-dz-amber-500 font-mono font-bold"
                style={{
                  background: "linear-gradient(135deg, var(--dz-orange-500), var(--dz-amber-400))",
                  color: "#0d0d0d",
                }}
              >
                {i + 1}
              </div>
              <h3 className="font-display font-semibold text-dz-black dark:text-dz-white">
                {item.title}
              </h3>
              <p className="text-sm text-dz-grey-600 dark:text-dz-grey-400 mt-2">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-xl font-display font-bold text-dz-black dark:text-dz-white mb-6">
            Eğitim Ve Becerilerinle Açılmayı Bekleyen Gerçek Rozetler
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "Antigravity", Icon: AntigravityIcon },
              { name: "Banana", Icon: BananaIcon },
              { name: "Canva", Icon: CanvaIcon },
              { name: "Claude 3", Icon: ClaudeIcon },
              { name: "Cursor AI", Icon: CursorIcon },
              { name: "DeepSeek", Icon: DeepSeekIcon },
              { name: "Figma", Icon: FigmaIcon },
              { name: "Grok", Icon: GrokIcon },
              { name: "HuggingFace", Icon: HuggingFaceIcon },
              { name: "Kaggle", Icon: KaggleIcon },
              { name: "Kimi", Icon: KimiIcon },
              { name: "Notion", Icon: NotionIcon },
              { name: "Perplexity", Icon: PerplexityIcon },
              { name: "Trello", Icon: TrelloIcon },
              { name: "Windsurf", Icon: WindsurfIcon },
              { name: "Yandex", Icon: YandexIcon }
            ].map((badge, idx) => (
              <motion.div
                key={badge.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative flex flex-col items-center bg-white dark:bg-dz-grey-900 p-4 rounded-xl border border-dz-grey-200 dark:border-dz-grey-800 shadow-sm hover:border-dz-orange-500 transition-colors"
              >
                <badge.Icon className="w-12 h-12 group-hover:drop-shadow-lg" />
                <span className="text-[10px] font-bold text-dz-grey-500 mt-2 tracking-wider uppercase text-center w-full min-w-[3.5rem] max-w-[5rem] overflow-hidden truncate">
                  {badge.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
