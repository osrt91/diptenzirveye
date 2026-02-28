export default function PanelLoading() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-dz-orange-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-dz-grey-500 dark:text-dz-grey-400 font-medium">
          Yükleniyor…
        </p>
      </div>
    </div>
  );
}
