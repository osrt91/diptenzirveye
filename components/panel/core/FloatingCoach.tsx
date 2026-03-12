"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, Loader2 } from "lucide-react";

type Message = {
    id: string;
    text: string;
    isAi: boolean;
};

type FloatingCoachProps = {
    chatbotEnabled?: boolean;
    welcomeMessage?: string;
};

export default function FloatingCoach({
    chatbotEnabled = true,
    welcomeMessage,
}: FloatingCoachProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            text: welcomeMessage || "Merhaba! Ben DiptenZirveye AI Danışmanın. Sana nasıl yardımcı olabilirim? AI öğrenme yolculuğun, hedeflerin veya platformumuz hakkında her şeyi sorabilirsin.",
            isAi: true,
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const abortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = useCallback(async () => {
        const text = input.trim();
        if (!text || loading) return;

        const userMsg: Message = { id: crypto.randomUUID(), text, isAi: false };
        const aiMsgId = crypto.randomUUID();

        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            abortRef.current?.abort();
            const controller = new AbortController();
            abortRef.current = controller;

            const res = await fetch("/api/coach", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    question: text,
                    history: messages.slice(-6).map((m) => ({
                        role: m.isAi ? "model" : "user",
                        text: m.text,
                    })),
                }),
                signal: controller.signal,
            });

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                throw new Error(data?.response || "API hatası");
            }

            const contentType = res.headers.get("content-type") || "";

            if (contentType.includes("text/event-stream") && res.body) {
                // Streaming response
                setMessages((prev) => [...prev, { id: aiMsgId, text: "", isAi: true }]);

                const reader = res.body.getReader();
                const decoder = new TextDecoder();
                let buffer = "";

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    buffer += decoder.decode(value, { stream: true });
                    const lines = buffer.split("\n");
                    buffer = lines.pop() || "";

                    for (const line of lines) {
                        if (!line.startsWith("data: ")) continue;
                        const payload = line.slice(6).trim();
                        if (payload === "[DONE]") break;
                        try {
                            const { text: chunk } = JSON.parse(payload);
                            if (chunk) {
                                setMessages((prev) =>
                                    prev.map((m) =>
                                        m.id === aiMsgId ? { ...m, text: m.text + chunk } : m
                                    )
                                );
                            }
                        } catch {
                            // skip malformed JSON
                        }
                    }
                }
            } else {
                // Non-streaming fallback (JSON response)
                const data = await res.json();
                setMessages((prev) => [
                    ...prev,
                    { id: aiMsgId, text: data.response || "Bir hata oluştu, tekrar dene.", isAi: true },
                ]);
            }
        } catch (err) {
            if (err instanceof Error && err.name === "AbortError") return;
            setMessages((prev) => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    text: "Bağlantı hatası. Lütfen tekrar dene.",
                    isAi: true,
                },
            ]);
        } finally {
            setLoading(false);
        }
    }, [input, loading, messages]);

    if (!chatbotEnabled) return null;

    return (
        <div className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom,1.5rem))] right-4 sm:right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="mb-4 w-[calc(100vw-2rem)] sm:w-96 bg-dz-white dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-grey-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[70dvh]"
                    >
                        <div className="p-4 bg-gradient-to-r from-dz-orange-500 to-dz-amber-500 flex items-center justify-between text-white shrink-0">
                            <div className="flex items-center gap-2 font-bold text-sm">
                                <Sparkles className="w-5 h-5" /> AI Danışman
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                                aria-label="Chatbotu kapat"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[400px] bg-dz-grey-50 dark:bg-dz-grey-900/50">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.isAi ? "justify-start" : "justify-end"}`}
                                >
                                    <div
                                        className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                                            msg.isAi
                                                ? "bg-dz-white dark:bg-dz-grey-800 text-dz-black dark:text-dz-white border border-dz-grey-200 dark:border-dz-grey-700 rounded-tl-sm"
                                                : "bg-dz-orange-500 text-white rounded-tr-sm"
                                        }`}
                                    >
                                        {msg.text || (loading && msg.isAi ? "" : msg.text)}
                                    </div>
                                </motion.div>
                            ))}

                            {loading && messages[messages.length - 1]?.text === "" && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-dz-white dark:bg-dz-grey-800 border border-dz-grey-200 dark:border-dz-grey-700 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin text-dz-orange-500" />
                                        <span className="text-xs text-dz-grey-500 dark:text-dz-grey-400">Düşünüyor...</span>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={bottomRef} />
                        </div>

                        <div className="p-3 border-t border-dz-grey-200 dark:border-dz-grey-800 bg-dz-white dark:bg-dz-grey-900 shrink-0">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Bir şeyler sor..."
                                    className="flex-1 text-sm bg-dz-grey-50 dark:bg-dz-grey-800 border border-dz-grey-200 dark:border-dz-grey-700 rounded-xl px-3 py-2.5 outline-none focus:border-dz-orange-500 transition-colors text-dz-black dark:text-dz-white"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={loading || !input.trim()}
                                    className="bg-dz-orange-500 text-white p-2.5 flex items-center justify-center rounded-xl hover:bg-dz-orange-600 transition-colors disabled:opacity-40"
                                    aria-label="Mesaj gönder"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-gradient-to-br from-dz-orange-500 to-dz-amber-500 text-white font-bold rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(249,115,22,0.4)] border border-white/20"
                aria-label={isOpen ? "Chatbotu kapat" : "AI Danışmanı aç"}
            >
                {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-7 h-7" />}
            </motion.button>
        </div>
    );
}
