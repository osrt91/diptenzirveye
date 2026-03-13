"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Zap, CheckCircle2, Flame } from "lucide-react";

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function AnimatedNumber({ target, duration = 1.5 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const increment = target / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count.toLocaleString("tr-TR")}</span>;
}

const stats = [
  {
    icon: Users,
    label: "Aktif Kullanıcı",
    getValue: () => randInt(80, 300),
    gradient: "from-dz-orange-500 to-dz-amber-400",
    bg: "bg-dz-orange-500/10",
  },
  {
    icon: Zap,
    label: "Bugün Kazanılan XP",
    getValue: () => randInt(2000, 8000),
    gradient: "from-yellow-500 to-amber-400",
    bg: "bg-yellow-500/10",
  },
  {
    icon: CheckCircle2,
    label: "Tamamlanan Görev",
    getValue: () => randInt(15, 60),
    gradient: "from-emerald-500 to-green-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Flame,
    label: "Seri Ortalaması",
    getValue: () => randInt(3, 12),
    gradient: "from-red-500 to-orange-400",
    bg: "bg-red-500/10",
    suffix: " gün",
  },
];

export default function ActivityTicker() {
  const [values, setValues] = useState<number[]>([]);

  useEffect(() => {
    setValues(stats.map((s) => s.getValue()));

    const interval = setInterval(() => {
      setValues(stats.map((s) => s.getValue()));
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  if (values.length === 0) return null;

  return (
    <section className="px-4 py-16 md:py-20 bg-dz-white dark:bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-dz-orange-500/20 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-10"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>
          <span className="text-sm font-bold text-dz-grey-600 dark:text-dz-grey-400 uppercase tracking-widest font-mono">
            Canlı Platform Aktivitesi
          </span>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-dz-grey-200 dark:border-dz-white/10 bg-dz-grey-50 dark:bg-dz-white/[0.03] p-5 text-center hover:border-dz-orange-300 dark:hover:border-dz-orange-500/30 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 transition-all"
              >
                <div className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center mx-auto mb-3`}>
                  <Icon className="w-5 h-5 text-dz-orange-500" />
                </div>
                <div className="font-display text-2xl md:text-3xl font-black text-dz-black dark:text-dz-white mb-1">
                  <AnimatedNumber target={values[i] ?? 0} />
                  {stat.suffix && <span className="text-base font-medium text-dz-grey-500">{stat.suffix}</span>}
                </div>
                <div className="text-xs font-medium text-dz-grey-500 uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
