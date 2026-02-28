"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

type ToastType = "success" | "error" | "info" | "xp";

type Toast = {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
};

type ToastContextValue = {
  addToast: (message: string, type?: ToastType, duration?: number) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const ICONS: Record<ToastType, string> = {
  success: "?",
  error: "?",
  info: "?",
  xp: "?",
};

const COLORS: Record<ToastType, string> = {
  success:
    "bg-green-600 text-white dark:bg-green-500",
  error:
    "bg-red-600 text-white dark:bg-red-500",
  info:
    "bg-dz-grey-800 text-white dark:bg-dz-grey-200 dark:text-dz-black",
  xp:
    "bg-dz-orange-500 text-white",
};

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`flex items-center gap-2.5 rounded-xl px-4 py-3 shadow-lg text-sm font-medium pointer-events-auto min-w-[250px] max-w-[380px] ${COLORS[toast.type]}`}
      role="alert"
      aria-live="polite"
    >
      <span className="text-base leading-none shrink-0">{ICONS[toast.type]}</span>
      <span className="flex-1">{toast.message}</span>
      <button
        type="button"
        onClick={onRemove}
        className="opacity-60 hover:opacity-100 transition-opacity shrink-0 text-xs"
        aria-label="Bildirimi kapat"
      >
        ?
      </button>
    </motion.div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timeoutsRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const removeToast = useCallback((id: string) => {
    const t = timeoutsRef.current.get(id);
    if (t) {
      clearTimeout(t);
      timeoutsRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current.clear();
    };
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastType = "info", duration = 4000) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setToasts((prev) => [...prev, { id, message, type, duration }]);
      if (duration > 0) {
        const t = setTimeout(() => removeToast(id), duration);
        timeoutsRef.current.set(id, t);
      }
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 items-end pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <ToastItem
              key={toast.id}
              toast={toast}
              onRemove={() => removeToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
