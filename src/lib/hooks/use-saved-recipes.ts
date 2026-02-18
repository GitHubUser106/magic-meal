"use client";

import { useState, useEffect, useCallback } from "react";
import { track } from "@vercel/analytics";

const STORAGE_KEY = "magic_meal_saved_recipes";

export function useSavedRecipes() {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSavedIds(JSON.parse(stored));
    } catch {
      // ignore parse errors
    }
  }, []);

  const toggleSave = useCallback((id: string) => {
    setSavedIds((prev) => {
      const isSaving = !prev.includes(id);
      const next = isSaving ? [...prev, id] : prev.filter((x) => x !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      if (isSaving) track("recipe_saved", { recipeId: id });
      return next;
    });
  }, []);

  const isSaved = useCallback(
    (id: string) => savedIds.includes(id),
    [savedIds]
  );

  return { savedIds, toggleSave, isSaved };
}
