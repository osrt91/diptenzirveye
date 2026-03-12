import dynamic from "next/dynamic";

const PomodoroTimer = dynamic(
  () => import("@/components/panel/tools/PomodoroTimer"),
  {
    loading: () => (
      <div className="animate-pulse rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 bg-dz-grey-100/50 dark:bg-dz-grey-900/50 p-8 min-h-[300px]" />
    ),
  }
);

export default function PomodoroPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="font-display text-2xl font-bold text-dz-black dark:text-dz-white">
          Zihin Motoru (Focus Engine)
        </h1>
        <p className="text-dz-grey-600 dark:text-dz-grey-400 mt-1">
          Lazer odağıyla çalış, dinlen, momentumu koru. Derin çalışma oturumlarını optimize et.
        </p>
      </div>
      <PomodoroTimer />
    </div>
  );
}
