"use client";

import { useState, useOptimistic, startTransition } from "react";
import { useSupabase } from "@/lib/hooks/useSupabase";
import { useXP } from "@/lib/hooks/useXP";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, GripVertical, Sparkles, Plus, Rocket } from "lucide-react";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  xp_reward: number;
};

type OptimisticAction =
  | { type: "add"; task: Task }
  | { type: "toggle"; id: string };

export default function DashboardDailyTasks({
  initialTasks,
  userId,
  taskDate,
}: {
  initialTasks: Task[];
  userId: string;
  taskDate: string;
}) {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = useSupabase();
  const { awardXP } = useXP();
  const { addToast } = useToast();

  const [optimisticTasks, addOptimistic] = useOptimistic(
    tasks,
    (state: Task[], action: OptimisticAction) => {
      if (action.type === "add") {
        return [...state, action.task];
      }
      if (action.type === "toggle") {
        return state.map((t) =>
          t.id === action.id ? { ...t, completed: !t.completed } : t
        );
      }
      return state;
    }
  );

  const todoTasks = optimisticTasks.filter(t => !t.completed);
  const doneTasks = optimisticTasks.filter(t => t.completed);

  async function addTask() {
    const title = newTitle.trim();
    if (!title || loading) return;

    const tempId = `temp-${Date.now()}`;
    const tempTask: Task = { id: tempId, title, completed: false, xp_reward: 10 };

    addOptimistic({ type: "add", task: tempTask });
    setNewTitle("");
    setLoading(true);

    const { data, error } = await supabase
      .from("daily_tasks")
      .insert({
        user_id: userId,
        title,
        task_date: taskDate,
        xp_reward: 10,
      })
      .select()
      .single();

    setLoading(false);
    if (!error && data) {
      setTasks((prev) => [...prev, data]);
      addToast("Görev vizyona eklendi!", "success");
      router.refresh();
    } else {
      addToast(error?.message ?? "Görev eklenemedi.", "error");
    }
  }

  async function toggleTask(id: string, completed: boolean) {
    startTransition(() => addOptimistic({ type: "toggle", id }));

    const { error } = await supabase
      .from("daily_tasks")
      .update({ completed: !completed, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (!error) {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !completed } : t))
      );
      if (!completed) {
        const task = tasks.find((t) => t.id === id);
        const xp = task?.xp_reward ?? 10;
        await awardXP(xp, task?.title ?? "Görev tamamlandı");
        addToast(`Mükemmel! +${xp} XP hesabında!`, "xp");
      }
      router.refresh();
    } else {
      addToast(error.message, "error");
    }
  }

  const renderTask = (task: Task) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      key={task.id}
      className={`group relative flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 shadow-sm
        ${task.completed
          ? "bg-dz-white dark:bg-dz-grey-900 border-dz-grey-200 dark:border-dz-white/10 opacity-70 cursor-default"
          : "bg-dz-white dark:bg-dz-grey-900 border-dz-grey-200 dark:border-dz-white/10 hover:border-dz-orange-400 dark:hover:border-dz-orange-500/50 hover:shadow-md cursor-pointer"
        }
      `}
      onClick={() => !task.id.startsWith("temp-") && toggleTask(task.id, task.completed)}
    >
      <GripVertical className="w-4 h-4 text-dz-grey-300 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity absolute left-1" />

      <div className="shrink-0 pl-2">
        {task.completed ? (
          <CheckCircle2 className="w-6 h-6 text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
        ) : (
          <Circle className="w-6 h-6 text-dz-grey-400 group-hover:text-dz-orange-500 transition-colors" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className={`text-sm font-semibold truncate transition-colors ${task.completed ? "text-dz-grey-500 line-through" : "text-dz-black dark:text-white group-hover:text-dz-orange-600 dark:group-hover:text-dz-orange-400"
          }`}>
          {task.title}
        </h4>
      </div>

      <div className={`shrink-0 text-xs font-bold px-2 py-1 rounded border ${task.completed
          ? "bg-green-50 dark:bg-green-500/10 text-green-600 border-green-200 dark:border-green-500/20"
          : "bg-dz-orange-50 dark:bg-dz-orange-500/10 text-dz-orange-600 border-dz-orange-200 dark:border-dz-orange-500/20"
        }`}>
        +{task.xp_reward} XP
      </div>

    </motion.div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Bir aksiyon adımı planla..."
            className="w-full pl-4 pr-12 py-3.5 rounded-2xl border border-dz-grey-200 dark:border-dz-white/10 bg-dz-white dark:bg-dz-grey-900 text-sm font-medium focus:outline-none focus:border-dz-orange-500 dark:focus:border-dz-orange-500 transition-colors shadow-sm text-dz-black dark:text-white"
          />
          <button
            type="button"
            onClick={addTask}
            disabled={loading || !newTitle.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-xl bg-dz-orange-500 text-white hover:bg-dz-orange-600 disabled:opacity-50 transition-colors shadow-lg shadow-dz-orange-500/20"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KANBAN BOARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* YAPILACAKLAR */}
        <div className="bg-dz-grey-50/50 dark:bg-background/50 rounded-3xl p-5 border border-dz-grey-200 dark:border-dz-white/5">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="font-display font-bold text-dz-black dark:text-white flex items-center gap-2">
              <Rocket className="w-4 h-4 text-dz-orange-500" />
              Sıradaki Adımlar
            </h3>
            <span className="text-xs font-bold bg-dz-white dark:bg-dz-grey-900 px-2 py-1 rounded-full border border-dz-grey-200 dark:border-dz-white/10 text-dz-grey-600 dark:text-dz-grey-400 shadow-sm">
              {todoTasks.length}
            </span>
          </div>

          <div className="space-y-3 min-h-[150px]">
            <AnimatePresence mode="popLayout">
              {todoTasks.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full py-10 text-center text-dz-grey-400"
                >
                  <Sparkles className="w-8 h-8 mb-2 opacity-20" />
                  <p className="text-sm font-medium">Bütün görevleri bitirdin!</p>
                  <p className="text-xs">Ustalığa bir adım daha yaklaştın.</p>
                </motion.div>
              ) : (
                todoTasks.map(renderTask)
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* TAMAMLANANLAR */}
        <div className="bg-dz-grey-50/50 dark:bg-background/50 rounded-3xl p-5 border border-dz-grey-200 dark:border-dz-white/5">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="font-display font-bold text-dz-black dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Kazanılan Zaferler
            </h3>
            <span className="text-xs font-bold bg-dz-white dark:bg-dz-grey-900 px-2 py-1 rounded-full border border-dz-grey-200 dark:border-dz-white/10 text-dz-grey-600 dark:text-dz-grey-400 shadow-sm">
              {doneTasks.length}
            </span>
          </div>

          <div className="space-y-3 min-h-[150px]">
            <AnimatePresence mode="popLayout">
              {doneTasks.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full py-10 text-center text-dz-grey-500 border-2 border-dashed border-dz-grey-200 dark:border-dz-white/10 rounded-2xl"
                >
                  <p className="text-sm font-medium mb-1">Henüz zafer yok.</p>
                  <p className="text-xs lg:max-w-xs">İlk adımı at ve XP'leri toplamaya başla!</p>
                </motion.div>
              ) : (
                doneTasks.map(renderTask)
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
