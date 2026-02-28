"use client";

import { useState, useEffect, useRef, useCallback, type DependencyList } from "react";

type AutoSaveStatus = "idle" | "saving" | "saved" | "error";

const DEBOUNCE_MS = 1500;

export function useAutoSave(
  saveFn: () => Promise<void>,
  deps: DependencyList,
  enabled: boolean = true
) {
  const [status, setStatus] = useState<AutoSaveStatus>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);
  const saveFnRef = useRef(saveFn);
  saveFnRef.current = saveFn;

  const save = useCallback(async () => {
    setStatus("saving");
    try {
      await saveFnRef.current();
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!enabled) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setStatus("idle");
    timeoutRef.current = setTimeout(() => {
      save();
    }, DEBOUNCE_MS);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, deps);

  return { status, save };
}
