"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ErtelemeModulu() {
  const [activeTab, setActiveTab] = useState<"5saniye" | "2dakika" | "parcala">("5saniye");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 border-b border-dz-grey-200 dark:border-dz-grey-800 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("5saniye")}
          className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${activeTab === "5saniye"
            ? "bg-dz-orange-500 text-white"
            : "text-dz-grey-600 hover:bg-dz-grey-100 dark:text-dz-grey-400 dark:hover:bg-dz-grey-800"
            }`}
        >
          AI Aktivasyon (5s)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("2dakika")}
          className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${activeTab === "2dakika"
            ? "bg-dz-orange-500 text-white"
            : "text-dz-grey-600 hover:bg-dz-grey-100 dark:text-dz-grey-400 dark:hover:bg-dz-grey-800"
            }`}
        >
          Mikro-Momentum (2dk)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("parcala")}
          className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${activeTab === "parcala"
            ? "bg-dz-orange-500 text-white"
            : "text-dz-grey-600 hover:bg-dz-grey-100 dark:text-dz-grey-400 dark:hover:bg-dz-grey-800"
            }`}
        >
          Kaos Filtresi
        </button>
      </div>

      <div className="bg-dz-white dark:bg-dz-grey-900 rounded-2xl p-6 border border-dz-grey-200 dark:border-dz-grey-800 min-h-[300px]">
        <AnimatePresence mode="wait">
          {activeTab === "5saniye" && <BesSaniyeKurali key="5s" />}
          {activeTab === "2dakika" && <IkiDakikaKurali key="2m" />}
          {activeTab === "parcala" && <GoreviParcala key="parcala" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

function BesSaniyeKurali() {
  const [count, setCount] = useState(5);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  const startCountdown = () => {
    setStarted(true);
    setDone(false);
    setCount(5);
    let current = 5;
    const interval = setInterval(() => {
      current -= 1;
      setCount(current);
      if (current === 0) {
        clearInterval(interval);
        setDone(true);
      }
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="text-center space-y-6 flex flex-col items-center justify-center p-4 h-full"
    >
      <h3 className="text-xl font-bold font-display text-dz-black dark:text-dz-white">
        AI Aktivasyon Sensörü (5 Saniye Preseti)
      </h3>
      <p className="text-dz-grey-600 dark:text-dz-grey-400 max-w-sm">
        Bir işi yapmaya karar verdiğinde 5'ten geriye say ve beynin erteleme mekanizması devreye girmeden fırla!
      </p>

      {!started || done ? (
        <div className="space-y-6 flex flex-col items-center">
          {done && (
            <div className="space-y-4 flex flex-col items-center">
              <div className="text-dz-orange-500 font-black text-4xl animate-bounce tracking-tight">
                FIRLA! 🚀
              </div>
              <div className="text-dz-green-500 font-bold text-xl">
                ŞİMDİ HAREKETE GEÇ!
              </div>
              <p className="text-sm font-medium text-dz-grey-600 dark:text-dz-grey-400 max-w-xs text-center">
                İlk adım atıldı. Beyninin seni durdurmasına izin verme, sadece yap!
              </p>
            </div>
          )}
          <button
            onClick={startCountdown}
            className="rounded-full bg-dz-orange-500 hover:bg-dz-orange-600 text-white font-bold py-3 px-8 text-lg transition-transform hover:scale-105 active:scale-95"
          >
            Geri Sayımı Başlat
          </button>
        </div>
      ) : (
        <motion.div
          key={count}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.5, opacity: 0 }}
          className="text-8xl font-black text-dz-orange-500"
        >
          {count}
        </motion.div>
      )}
    </motion.div>
  );
}

function IkiDakikaKurali() {
  const [timerStatus, setTimerStatus] = useState<"idle" | "running" | "ended">("idle");
  const [timeLeft, setTimeLeft] = useState(120);

  const startTimer = () => {
    setTimerStatus("running");
    let current = 120;
    const interval = setInterval(() => {
      current -= 1;
      setTimeLeft(current);
      if (current <= 0) {
        clearInterval(interval);
        setTimerStatus("ended");
      }
    }, 1000);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="text-center space-y-6 flex flex-col items-center justify-center p-4 h-full"
    >
      <h3 className="text-xl font-bold font-display text-dz-black dark:text-dz-white">
        Mikro-Momentum Modülatörü (2 Dakika)
      </h3>
      <p className="text-dz-grey-600 dark:text-dz-grey-400 max-w-md">
        Eğer bir iş 2 dakikadan az sürecekse, onu planlama, erteleme, hemen şimdi yap! Başlamak, momentum yaratır.
      </p>

      {timerStatus === "idle" && (
        <button
          onClick={startTimer}
          className="rounded-full bg-dz-blue-500 hover:bg-dz-blue-600 text-white font-bold py-3 px-8 text-lg transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-dz-blue-500/20"
        >
          2 Dakikayı Başlat & İşe Koyul
        </button>
      )}

      {timerStatus === "running" && (
        <div className="space-y-4">
          <div className="text-7xl font-mono font-black text-dz-blue-500 tracking-tight drop-shadow-md">
            {minutes}:{seconds.toString().padStart(2, "0")}
          </div>
          <p className="text-sm font-bold text-dz-grey-500 tracking-widest uppercase animate-pulse">
            {timeLeft > 60 ? "Sadece başla, devamı gelecek..." : "Momentum oluşuyor, hisset!"}
          </p>
        </div>
      )}

      {timerStatus === "ended" && (
        <div className="space-y-5 flex flex-col items-center">
          <div className="text-3xl font-black text-dz-green-500 tracking-tight">2 Dakika Doldu! 🎯</div>
          <p className="text-dz-grey-700 dark:text-dz-grey-300 font-medium max-w-xs leading-relaxed text-center">
            Başlamak işin en zor kısmıydı. Şu an bir ivme yakaladın, durmak zorunda değilsin. İstersen devam et!
          </p>
          <button
            onClick={() => {
              setTimerStatus("idle");
              setTimeLeft(120);
            }}
            className="mt-4 rounded-xl border border-dz-grey-200 dark:border-dz-grey-800 bg-dz-white dark:bg-dz-grey-900 px-6 py-2.5 font-bold text-dz-grey-600 dark:text-dz-grey-400 hover:text-dz-blue-500 dark:hover:text-dz-blue-400 transition-colors uppercase tracking-widest text-xs"
          >
            Yeni Momentum Başlat
          </button>
        </div>
      )}
    </motion.div>
  );
}

function GoreviParcala() {
  const [taskName, setTaskName] = useState("");
  const [subtasks, setSubtasks] = useState<{ id: string; text: string; done: boolean }[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName.trim()) return;
    setSubtasks([...subtasks, { id: crypto.randomUUID(), text: taskName, done: false }]);
    setTaskName("");
  };

  const toggleTask = (id: string) => {
    setSubtasks(subtasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const progress = subtasks.length === 0 ? 0 : Math.round((subtasks.filter((t) => t.done).length / subtasks.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6 h-full p-4 max-w-lg mx-auto"
    >
      <div className="text-center">
        <h3 className="text-xl font-bold font-display text-dz-black dark:text-dz-white">
          Kaos Filtresi (Görev Parçalayıcı)
        </h3>
        <p className="text-sm text-dz-grey-600 dark:text-dz-grey-400 mt-2">
          Büyük bir görev gözünü korkutuyorsa, onu 5-10 dakikada bitebilecek mikro adımlara böl.
        </p>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Küçük bir adım yaz... (Örn: Sadece Word belgesini aç)"
          className="flex-1 min-w-0 rounded-lg border border-dz-grey-200 dark:border-dz-grey-700 bg-dz-grey-50 dark:bg-dz-grey-800 px-3 py-2 text-sm text-dz-black dark:text-dz-white focus:outline-none focus:ring-2 focus:ring-dz-orange-500"
        />
        <button
          type="submit"
          disabled={!taskName.trim()}
          className="rounded-lg bg-dz-orange-500 px-4 py-2 font-medium text-white hover:bg-dz-orange-600 disabled:opacity-50"
        >
          Ekle
        </button>
      </form>

      {subtasks.length > 0 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-black uppercase text-dz-orange-500 tracking-widest">İlerleme: {progress}%</span>
              {progress === 100 && (
                <span className="text-[10px] font-black uppercase text-dz-green-500 tracking-widest animate-pulse">Kaos Yenildi 🏆</span>
              )}
            </div>
            <div className="h-3 w-full bg-dz-grey-200 dark:bg-dz-grey-800 rounded-full overflow-hidden shadow-inner flex">
              <div
                className="h-full bg-gradient-to-r from-dz-orange-500 to-dz-orange-400 transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            {subtasks.map((task) => (
              <label
                key={task.id}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${task.done
                  ? "bg-dz-green-50/50 border-dz-green-200 dark:bg-dz-green-900/10 dark:border-dz-green-900"
                  : "bg-dz-white border-dz-grey-200 dark:bg-dz-grey-800 dark:border-dz-grey-700 hover:border-dz-orange-300"
                  }`}
              >
                <div className="mt-0.5">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                    className="h-4 w-4 rounded border-dz-grey-300 text-dz-orange-500 focus:ring-dz-orange-500"
                  />
                </div>
                <span className={`text-sm font-medium ${task.done ? "text-dz-grey-400 line-through dark:text-dz-grey-500" : "text-dz-black dark:text-dz-white"}`}>
                  {task.text}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

