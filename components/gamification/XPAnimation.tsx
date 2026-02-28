"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";

type XPEvent = {
    id: string;
    amount: number;
    label?: string;
};

/**
 * Sağlayıcı: XP kazanıldığında "+15 XP" floating animasyon gösterir.
 * useXPAnimation hook'u ile tetiklenir.
 */
export function XPAnimationProvider({ children }: { children: React.ReactNode }) {
    const [events, setEvents] = useState<XPEvent[]>([]);

    const trigger = useCallback((amount: number, label?: string) => {
        const id = `${Date.now()}-${Math.random()}`;
        setEvents((prev) => [...prev, { id, amount, label }]);
        // 2 saniye sonra temizle
        setTimeout(() => {
            setEvents((prev) => prev.filter((e) => e.id !== id));
        }, 2000);
    }, []);

    return (
        <XPAnimationContext.Provider value={{ trigger }}>
            {children}
            {/* Floating XP Animations */}
            <div className="fixed top-20 right-8 z-[9999] pointer-events-none">
                <AnimatePresence>
                    {events.map((e) => (
                        <motion.div
                            key={e.id}
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -40, scale: 0.6 }}
                            transition={{ duration: 0.5 }}
                            className="mb-2"
                        >
                            <div className="bg-dz-orange-500 text-white font-bold text-lg px-4 py-2 rounded-xl shadow-lg shadow-dz-orange-500/30 flex items-center gap-2">
                                <span className="text-2xl">⚡</span>
                                <span>+{e.amount} XP</span>
                                {e.label && <span className="text-xs font-normal opacity-80">— {e.label}</span>}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </XPAnimationContext.Provider>
    );
}

// Context
import { createContext, useContext } from "react";

type XPContextType = {
    trigger: (amount: number, label?: string) => void;
};

const XPAnimationContext = createContext<XPContextType>({
    trigger: () => { },
});

export function useXPAnimation() {
    return useContext(XPAnimationContext);
}
