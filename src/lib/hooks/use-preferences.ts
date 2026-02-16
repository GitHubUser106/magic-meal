"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "magic_meal_preferences";

export interface Preferences {
  onboarded: boolean;
  dietary: string;
  householdSize: number;
  cookingComfort: string;
}

const DEFAULT_PREFERENCES: Preferences = {
  onboarded: false,
  dietary: "no-preference",
  householdSize: 2,
  cookingComfort: "beginner",
};

function loadPreferences(): Preferences {
  if (typeof window === "undefined") return DEFAULT_PREFERENCES;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
  } catch {
    // ignore parse errors
  }
  return DEFAULT_PREFERENCES;
}

function savePreferences(prefs: Preferences) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

export function usePreferences() {
  const [preferences, setPreferences] = useState<Preferences>(DEFAULT_PREFERENCES);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setPreferences(loadPreferences());
    setIsLoaded(true);
  }, []);

  const completeOnboarding = useCallback((data: Partial<Omit<Preferences, "onboarded">>) => {
    setPreferences((prev) => {
      const next: Preferences = { ...prev, ...data, onboarded: true };
      savePreferences(next);
      return next;
    });
  }, []);

  const resetPreferences = useCallback(() => {
    setPreferences(DEFAULT_PREFERENCES);
    savePreferences(DEFAULT_PREFERENCES);
  }, []);

  const clearAllData = useCallback(() => {
    // Clear all MagicMeal localStorage keys
    const keys = [
      "magic_meal_preferences",
      "magic_meal_saved_recipes",
      "magic_meal_shopping_list",
      "magic_meal_checklist",
    ];
    keys.forEach((key) => localStorage.removeItem(key));
    setPreferences(DEFAULT_PREFERENCES);
  }, []);

  return {
    preferences,
    isLoaded,
    completeOnboarding,
    resetPreferences,
    clearAllData,
  };
}
