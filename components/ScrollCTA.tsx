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
    if (typeof window !== "undefined" && sessionStorage.getItem("dz-scroll-cta-dismissed")) {
      setDismissed(true);
      return;
    }

    const handleScroll = () => {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const scrollPercent = (window.scrollY / scrollable) * 100;
      if (scrollPercent > 60) setShow(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  const dismiss = () => {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem("dz-scroll-cta-dismissed", "1");
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
        >
          <Link
            href="/test"
            onClick={dismiss}
            className="group flex items-center gap-2.5 bg-gradient-to-r from-dz-orange-500 to-dz-amber-500 hover:from-dz-orange-600 hover:to-dz-amber-600 text-white font-bold py-3 px-6 rounded-full shadow-xl shadow-dz-orange-500/30 transition-all hover:shadow-2xl hover:shadow-dz-orange-500/40 hover:scale-105"
          >
            <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="text-sm">Hemen Başla</span>
          </Link>
          <button
            onClick={dismiss}
            className="w-7 h-7 rounded-full bg-dz-grey-200 dark:bg-dz-grey-800 text-dz-grey-500 hover:text-dz-grey-700 dark:hover:text-dz-grey-300 flex items-center justify-center transition-colors shadow-md"
            aria-label="Kapat"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
