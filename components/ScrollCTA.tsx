"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Rocket } from "lucide-react";

export default function ScrollCTA() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    if (sessionStorage.getItem("dz-scroll-cta-dismissed")) {
      setDismissed(true);
      return;
    }

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 55 && !show) setShow(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed, show]);

  const dismiss = () => {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem("dz-scroll-cta-dismissed", "1");
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            className="fixed inset-0 z-50 bg-dz-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm p-4"
          >
            <div className="bg-dz-white dark:bg-background border border-dz-orange-500/30 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-dz-orange-500/10 blur-[80px] pointer-events-none" />

              <button onClick={dismiss} className="absolute top-4 right-4 text-dz-grey-400 hover:text-dz-black dark:hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-dz-orange-500 to-dz-amber-400 rounded-2xl flex items-center justify-center shadow-lg shadow-dz-orange-500/30">
                  <Rocket className="w-8 h-8 text-white" />
                </div>

                <h3 className="font-display text-xl font-bold text-dz-black dark:text-white mb-2">
                  AI Liderliğine Hazır Mısın?
                </h3>
                <p className="text-sm text-dz-grey-500 mb-6">
                  Ücretsiz analiz testini çöz ve sana özel 10 kitaplık yol haritanı hemen al.
                </p>

                <Link
                  href="/test"
                  onClick={dismiss}
                  className="block w-full bg-dz-orange-500 hover:bg-dz-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-dz-orange-500/20 mb-3"
                >
                  Ücretsiz Teste Başla
                </Link>
                <button onClick={dismiss} className="text-sm text-dz-grey-400 hover:text-dz-grey-600">
                  Daha sonra
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
