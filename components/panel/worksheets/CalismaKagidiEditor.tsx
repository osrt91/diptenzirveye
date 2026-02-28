"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSupabase } from "@/lib/hooks/useSupabase";
import { useRouter } from "next/navigation";
import { useAutoSave } from "@/lib/hooks/useAutoSave";
import AutoSaveIndicator from "@/components/ui/AutoSaveIndicator";

export default function CalismaKagidiEditor({
  id,
  initialTitle,
  initialContent,
}: {
  id: string;
  initialTitle: string;
  initialContent: string;
}) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const router = useRouter();
  const supabase = useSupabase();

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const hasChanges = title !== initialTitle || content !== initialContent;

  const saveFn = useCallback(async () => {
    const { error } = await supabase
      .from("study_sheets")
      .update({ title, content, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) throw new Error(error.message);
    router.refresh();
  }, [supabase, title, content, id, router]);

  const { status, save } = useAutoSave(saveFn, [title, content], hasChanges);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Link
          href="/panel/calisma-kagitlari"
          className="text-sm text-dz-grey-600 dark:text-dz-grey-400 hover:underline"
        >
          ← Çalışma kağıtları
        </Link>
        <div className="flex items-center gap-3">
          <AutoSaveIndicator status={status} />
          {hasChanges && (
            <button
              type="button"
              onClick={save}
              className="rounded-lg bg-dz-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-dz-orange-600"
            >
              Kaydet
            </button>
          )}
        </div>
      </div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full font-display text-2xl font-bold bg-transparent border-b border-dz-grey-200 dark:border-dz-grey-700 pb-2 text-dz-black dark:text-dz-white"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={16}
        className="w-full rounded-lg border border-dz-grey-200 dark:border-dz-grey-700 bg-dz-grey-100/50 dark:bg-dz-grey-900/50 p-4 text-foreground font-mono text-sm"
        placeholder="İçerik..."
      />
    </div>
  );
}
