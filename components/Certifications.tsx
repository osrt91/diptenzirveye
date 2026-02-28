"use client";

import { motion } from "framer-motion";
import {
    ChatGPTIcon,
    ClaudeIcon,
    GeminiIcon,
    MidjourneyIcon,
    CursorIcon,
    ZapierIcon,
    DeepSeekIcon,
    PerplexityIcon,
    KimiIcon,
    GrokIcon,
    WindsurfIcon,
    V0Icon
} from "./panel/chat/ai-tool-badges";

const AI_CERT_TOOLS = [
    { name: "ChatGPT", desc: "Advanced Prompting", Icon: ChatGPTIcon },
    { name: "Claude 3", desc: "Long-context Analysis", Icon: ClaudeIcon },
    { name: "Cursor AI", desc: "AI-Assisted Coding", Icon: CursorIcon },
    { name: "DeepSeek", desc: "Reasoning & Logic", Icon: DeepSeekIcon },
    { name: "Gemini Pro", desc: "Multimodal Mastery", Icon: GeminiIcon },
    { name: "Grok", desc: "Real-time AI", Icon: GrokIcon },
    { name: "Kimi", desc: "Document Analysis", Icon: KimiIcon },
    { name: "Midjourney", desc: "Visual Architecture", Icon: MidjourneyIcon },
    { name: "Perplexity", desc: "AI Search Engine", Icon: PerplexityIcon },
    { name: "v0 by Vercel", desc: "Generative UI", Icon: V0Icon },
    { name: "Windsurf", desc: "AI IDE Mastery", Icon: WindsurfIcon },
    { name: "Zapier", desc: "Automated Workflows", Icon: ZapierIcon },
];

export default function Certifications() {
    return (
        <section className="py-24 bg-dz-white dark:bg-dz-black border-y border-dz-grey-200 dark:border-dz-grey-800 relative overflow-hidden">
            {/* Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-dz-orange-500/5 to-transparent dark:from-dz-orange-500/10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-display text-3xl sm:text-5xl font-black text-dz-black dark:text-dz-white mb-6 tracking-tight uppercase"
                    >
                        USTALIK KANITI: <span className="text-dz-orange-500">12 DİJİTAL SERTİFİKA</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-dz-grey-600 dark:text-dz-grey-400 max-w-3xl mx-auto"
                    >
                        Ekosistemi tamamladığında rastgele bir katılım belgesi değil, iş gücü piyasasında en çok aranan 12 farklı yapay zeka aracı için geçerli 'Yetkinlik Rozetleri' kazanırsın.
                    </motion.p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {AI_CERT_TOOLS.map((tool, idx) => (
                        <motion.div
                            key={tool.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5, type: "spring" }}
                            className="group relative flex flex-col items-center justify-center p-6 rounded-3xl bg-dz-grey-100 dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-grey-800 hover:border-dz-orange-500/50 hover:bg-white dark:hover:bg-dz-black transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-dz-orange-500/20"
                        >
                            {/* Glow */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-dz-orange-500/0 via-transparent to-dz-amber-500/0 group-hover:from-dz-orange-500/10 group-hover:to-dz-amber-500/10 transition-colors duration-500 pointer-events-none" />

                            <div className="mb-4 transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300">
                                <tool.Icon className="w-16 h-16" />
                            </div>
                            <h3 className="font-display font-bold text-lg text-dz-black dark:text-dz-white tracking-tight mb-1 text-center">
                                {tool.name}
                            </h3>
                            <p className="text-xs font-mono text-dz-orange-500 font-medium tracking-wider text-center">
                                {tool.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
