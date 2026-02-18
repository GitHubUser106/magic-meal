"use client";

import { useRouter } from "next/navigation";
import { usePreferences } from "@/lib/hooks/use-preferences";
import { useSavedRecipes } from "@/lib/hooks/use-saved-recipes";
import { useShoppingList } from "@/lib/hooks/use-shopping-list";
import { Heart, ShoppingCart, Utensils, Users, ChefHat, RotateCcw, Trash2, MessageCircle } from "lucide-react";
import { useState } from "react";

const DIETARY_LABELS: Record<string, string> = {
  "no-preference": "I eat everything",
  "no-red-meat": "No red meat",
  "pescatarian": "Pescatarian",
  "vegetarian": "Vegetarian",
};

const HOUSEHOLD_LABELS: Record<number, string> = {
  1: "Just me",
  2: "2 people",
  3: "3-4 people",
  4: "5+ people",
};

const COMFORT_LABELS: Record<string, string> = {
  "beginner": "Total beginner",
  "some-experience": "Some experience",
  "comfortable": "Comfortable",
};

export default function ProfilePage() {
  const router = useRouter();
  const { preferences, resetPreferences, clearAllData } = usePreferences();
  const { savedIds } = useSavedRecipes();
  const { getUncheckedCount } = useShoppingList();
  const [showConfirm, setShowConfirm] = useState(false);

  const uncheckedCount = getUncheckedCount();

  function handleRedoOnboarding() {
    resetPreferences();
    router.push("/onboarding");
  }

  function handleClearAll() {
    clearAllData();
    setShowConfirm(false);
    router.push("/onboarding");
  }

  return (
    <div className="px-4 py-5 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-6">Profile</h1>

      {/* Stats */}
      <section className="mb-6">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Your MagicMeal
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card">
            <Heart className="w-5 h-5 text-red-500 flex-shrink-0" />
            <div>
              <p className="text-lg font-bold">{savedIds.length}</p>
              <p className="text-xs text-muted-foreground">Saved recipes</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card">
            <ShoppingCart className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <div>
              <p className="text-lg font-bold">{uncheckedCount}</p>
              <p className="text-xs text-muted-foreground">Shopping items</p>
            </div>
          </div>
        </div>
      </section>

      {/* Preferences */}
      <section className="mb-6">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Preferences
        </h2>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card">
            <Utensils className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold">Dietary</h3>
              <p className="text-xs text-muted-foreground">
                {DIETARY_LABELS[preferences.dietary] ?? preferences.dietary}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card">
            <Users className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold">Household size</h3>
              <p className="text-xs text-muted-foreground">
                {HOUSEHOLD_LABELS[preferences.householdSize] ?? `${preferences.householdSize} people`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card">
            <ChefHat className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold">Cooking comfort</h3>
              <p className="text-xs text-muted-foreground">
                {COMFORT_LABELS[preferences.cookingComfort] ?? preferences.cookingComfort}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Actions */}
      <section className="mb-8">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Actions
        </h2>
        <div className="space-y-2">
          <button
            onClick={handleRedoOnboarding}
            className="flex items-center gap-3 w-full p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors text-left min-h-[48px]"
          >
            <RotateCcw className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold">Redo Onboarding</h3>
              <p className="text-xs text-muted-foreground">Reset preferences and start fresh</p>
            </div>
          </button>

          <a
            href="mailto:johntomchick@gmail.com?subject=MagicMeal%20Beta%20Feedback"
            className="flex items-center gap-3 w-full p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors text-left min-h-[48px]"
          >
            <MessageCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold">Send Feedback</h3>
              <p className="text-xs text-muted-foreground">Tell us what you think</p>
            </div>
          </a>

          {showConfirm ? (
            <div className="p-4 rounded-lg border-2 border-red-300 bg-red-50">
              <p className="text-sm font-medium text-red-800 mb-3">
                This will delete all saved recipes, shopping list, and preferences. Are you sure?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleClearAll}
                  className="flex-1 py-2.5 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors min-h-[44px]"
                >
                  Yes, Clear Everything
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-2.5 rounded-lg bg-muted text-sm font-medium hover:bg-muted/80 transition-colors min-h-[44px]"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirm(true)}
              className="flex items-center gap-3 w-full p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors text-left min-h-[48px]"
            >
              <Trash2 className="w-5 h-5 text-red-500 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-red-600">Clear All Data</h3>
                <p className="text-xs text-muted-foreground">Remove everything and start over</p>
              </div>
            </button>
          )}
        </div>
      </section>

      <p className="text-xs text-muted-foreground text-center">
        MagicMeal v2.0
      </p>
    </div>
  );
}
