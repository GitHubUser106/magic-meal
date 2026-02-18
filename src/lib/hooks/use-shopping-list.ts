"use client";

import { useState, useEffect, useCallback } from "react";
import { getRecipeById } from "@/lib/data/recipes";
import { track } from "@vercel/analytics";

const STORAGE_KEY = "magic_meal_shopping_list";

export interface ShoppingItem {
  ingredient: string;
  recipeId: string;
  recipeName: string;
  checked: boolean;
  isCustom?: boolean;
}

interface StoredData {
  items: ShoppingItem[];
}

function loadData(): StoredData {
  if (typeof window === "undefined") return { items: [] };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore parse errors
  }
  return { items: [] };
}

function saveData(data: StoredData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>([]);

  useEffect(() => {
    setItems(loadData().items);
  }, []);

  const addRecipe = useCallback((recipeId: string) => {
    setItems((prev) => {
      // Don't add if already present
      if (prev.some((item) => item.recipeId === recipeId)) return prev;

      const recipe = getRecipeById(recipeId);
      if (!recipe) return prev;

      const newItems: ShoppingItem[] = recipe.ingredients.map((ingredient) => ({
        ingredient,
        recipeId,
        recipeName: recipe.recipeName,
        checked: false,
      }));

      const next = [...prev, ...newItems];
      saveData({ items: next });
      track("shopping_list_add", { recipeId });
      return next;
    });
  }, []);

  const removeRecipe = useCallback((recipeId: string) => {
    setItems((prev) => {
      const next = prev.filter((item) => item.recipeId !== recipeId);
      saveData({ items: next });
      return next;
    });
  }, []);

  const hasRecipe = useCallback(
    (recipeId: string) => items.some((item) => item.recipeId === recipeId),
    [items]
  );

  const toggleChecked = useCallback((ingredient: string, recipeId: string) => {
    setItems((prev) => {
      const next = prev.map((item) =>
        item.ingredient === ingredient && item.recipeId === recipeId
          ? { ...item, checked: !item.checked }
          : item
      );
      saveData({ items: next });
      return next;
    });
  }, []);

  const clearChecked = useCallback(() => {
    setItems((prev) => {
      const next = prev.filter((item) => !item.checked);
      saveData({ items: next });
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setItems([]);
    saveData({ items: [] });
  }, []);

  const addCustomItem = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setItems((prev) => {
      const newItem: ShoppingItem = {
        ingredient: trimmed,
        recipeId: "custom",
        recipeName: "Your item",
        checked: false,
        isCustom: true,
      };
      const next = [newItem, ...prev];
      saveData({ items: next });
      return next;
    });
  }, []);

  const removeCustomItem = useCallback((ingredient: string) => {
    setItems((prev) => {
      const next = prev.filter(
        (item) => !(item.isCustom && item.ingredient === ingredient)
      );
      saveData({ items: next });
      return next;
    });
  }, []);

  const getUncheckedCount = useCallback(
    () => items.filter((item) => !item.checked).length,
    [items]
  );

  return {
    items,
    addRecipe,
    removeRecipe,
    hasRecipe,
    toggleChecked,
    clearChecked,
    clearAll,
    getUncheckedCount,
    addCustomItem,
    removeCustomItem,
  };
}
