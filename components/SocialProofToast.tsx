"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, X } from "lucide-react";

const NAMES = [
  "Ahmet", "Mehmet", "Zeynep", "Elif", "Emre", "Selin", "Burak", "Kaan",
  "Defne", "Ali", "Fatma", "Can", "Deniz", "Ece", "Mert", "Ayşe",
];
const CITIES = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Konya", "Adana", "Trabzon"];
const ACTIONS = ["kayıt oldu", "teste başladı", "premium'a geçti", "akademiye katıldı"];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function SocialProofToast() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [msg, setMsg] = useState({ name: "", city: "", action: "", time: "" });

  useEffect(() => {
    if (dismissed) return;

    const showToast = () => {
      const minutes = Math.floor(Math.random() * 15) + 1;
      setMsg({
        name: randomItem(NAMES),
        city: randomItem(CITIES),
        action: randomItem(ACTIONS),
        time: `${minutes} dk önce`,
      });
      setShow(true);
      setTimeout(() => setShow(false), 5000);
    };

    const initialDelay = setTimeout(showToast, 8000);
    const interval = setInterval(showToast, 25000 + Math.random() * 15000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 left-6 z-50 max-w-xs"
        >
          <div className="bg-dz-white dark:bg-dz-grey-900 border border-dz-grey-200 dark:border-dz-grey-800 rounded-xl px-4 py-3 shadow-2xl shadow-dz-black/10 dark:shadow-dz-black/40 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-dz-orange-500 to-dz-amber-400 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-dz-black dark:text-dz-white truncate">
                {msg.name} ({msg.city})
              </p>
              <p className="text-xs text-dz-grey-500">
                {msg.action} · {msg.time}
              </p>
            </div>
            <button
              onClick={() => { setShow(false); setDismissed(true); }}
              className="text-dz-grey-400 hover:text-dz-grey-600 shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
