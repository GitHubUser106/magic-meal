"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PROTEINS, DOCTOR_IT_UP_BASES, getAllRecipes, type Protein, type DoctorItUpBase, type Recipe } from "@/lib/data/recipes";
import { track } from "@vercel/analytics";
import { RecipeCard } from "@/components/recipe-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSavedRecipes } from "@/lib/hooks/use-saved-recipes";
import { usePreferences } from "@/lib/hooks/use-preferences";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Quick picks for non-vegetarian users
const DEFAULT_QUICK_PICK_IDS = [
  "chicken-honey-garlic",
  "eggs-rice-soysauce",
  "cheese-grilled-tomato-soup",
  "beef-tortilla-cheese",
  "tofu-stirfry-rice",
];

// Quick picks for vegetarian users — swap meat recipes for vegetarian
const VEGGIE_QUICK_PICK_IDS = [
  "beans-tacos",
  "eggs-rice-soysauce",
  "cheese-grilled-tomato-soup",
  "cheese-pasta-butter",
  "tofu-stirfry-rice",
];

// Proteins only shown for vegetarian users (Eggs is universal — shown for everyone)
const VEGGIE_ONLY_IDS = ["black-beans", "cheese", "tofu"];

export default function CookPage() {
  const router = useRouter();
  const [timeFilter, setTimeFilter] = useState<number | null>(null);
  const [diceAnimating, setDiceAnimating] = useState(false);
  const { toggleSave, isSaved } = useSavedRecipes();
  const { preferences } = usePreferences();

  const isVegetarian = preferences.dietary === "vegetarian";

  const allRecipes = useMemo(() => getAllRecipes(), []);

  const handleSurpriseMe = useCallback(() => {
    const pool = allRecipes.filter((recipe) => {
      if (isVegetarian && !recipe.tags?.includes("vegetarian")) return false;
      if (timeFilter && parseInt(recipe.cookTime) > timeFilter) return false;
      return true;
    });
    if (pool.length === 0) return;
    track("surprise_me_used");
    setDiceAnimating(true);
    setTimeout(() => {
      const random = pool[Math.floor(Math.random() * pool.length)];
      router.push(`/recipe/${random.id}`);
    }, 600);
  }, [allRecipes, isVegetarian, timeFilter, router]);

  const quickPickIds = isVegetarian ? VEGGIE_QUICK_PICK_IDS : DEFAULT_QUICK_PICK_IDS;

  const quickPicks = useMemo(() => {
    let picks = quickPickIds
      .map((id) => allRecipes.find((r) => r.id === id))
      .filter((r): r is Recipe => r !== undefined);
    if (timeFilter) {
      picks = picks.filter((r) => parseInt(r.cookTime) <= timeFilter);
    }
    return picks;
  }, [allRecipes, timeFilter, quickPickIds]);

  // Build visible protein list based on dietary preference
  // Non-vegetarian: all proteins except veggie-only (Chicken, Ground Beef, Eggs, Canned Tuna, Bacon = 5)
  // Vegetarian: Eggs + veggie-only proteins (Eggs, Black Beans, Cheese, Tofu = 4)
  const visibleProteins = useMemo(() => {
    const filtered = timeFilter
      ? PROTEINS.map((p) => ({
          ...p,
          pairings: p.pairings.filter((r) => parseInt(r.cookTime) <= timeFilter),
        })).filter((p) => p.pairings.length > 0)
      : PROTEINS;

    if (isVegetarian) {
      return filtered.filter((p) => p.id === "eggs" || VEGGIE_ONLY_IDS.includes(p.id));
    }
    return filtered.filter((p) => !VEGGIE_ONLY_IDS.includes(p.id));
  }, [timeFilter, isVegetarian]);

  return (
    <div className="px-4 py-5 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold">
          <span className="mr-2">&#x2728;</span>
          MagicMeal
        </h1>
        <p className="text-base text-muted-foreground mt-0.5">
          Protein + 2 ingredients. Dinner, done.
        </p>
      </div>

      {/* Surprise Me */}
      <button
        onClick={handleSurpriseMe}
        className="w-full mb-5 px-4 py-3 rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/50 text-base font-semibold text-amber-800 hover:bg-amber-100/60 active:scale-[0.98] transition-all min-h-[44px] flex items-center justify-center gap-2"
      >
        <span
          className={cn(
            "inline-block text-lg",
            diceAnimating && "animate-dice-shake"
          )}
        >
          &#x1F3B2;
        </span>
        Surprise Me
      </button>

      {/* Time Picker */}
      <div className="flex items-center gap-2 mb-5">
        <span className="text-base text-muted-foreground">How much time?</span>
        {[10, 20].map((mins) => (
          <button
            key={mins}
            onClick={() => setTimeFilter(timeFilter === mins ? null : mins)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium border transition-all min-h-[32px]",
              timeFilter === mins
                ? "bg-amber-100 border-amber-400 text-amber-800"
                : "bg-card border-border text-muted-foreground hover:border-amber-200"
            )}
          >
            {mins === 10 ? "\u26A1" : "\u{1F373}"} {mins} min
          </button>
        ))}
        {timeFilter && (
          <button
            onClick={() => setTimeFilter(null)}
            className="text-xs text-muted-foreground hover:text-foreground min-h-[32px] px-2"
          >
            Clear
          </button>
        )}
      </div>

      {/* Quick Picks Carousel */}
      {quickPicks.length > 0 && (
        <section className="mb-6">
          <h2 className="text-base font-semibold text-muted-foreground mb-3">
            Quick picks
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
            {quickPicks.map((recipe) => (
              <div key={recipe.id} className="min-w-[200px] snap-start">
                <RecipeCard
                  recipe={recipe}
                  onSave={toggleSave}
                  isSaved={isSaved(recipe.id)}
                  compact
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Doctor It Up Carousel */}
      <section className="mb-6">
        <h2 className="text-base font-semibold text-muted-foreground mb-3">
          Doctor it up
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
          {DOCTOR_IT_UP_BASES.map((base) => (
            <Link
              key={base.id}
              href={`/explore?base=${base.id}`}
              className="min-w-[140px] snap-start"
            >
              <Card className="hover:border-amber-300 transition-all active:scale-[0.97]">
                <CardContent className="p-3 flex flex-col items-center gap-1">
                  <span className="text-2xl">{base.emoji}</span>
                  <span className="text-sm font-semibold text-center leading-tight">
                    {base.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {base.recipes.length} {base.recipes.length === 1 ? "upgrade" : "upgrades"}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Pick Your Protein */}
      {visibleProteins.length > 0 && (
        <section className="mb-6">
          <h2 className="text-base font-semibold text-muted-foreground mb-3">
            Pick your protein
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {visibleProteins.map((protein) => (
              <Link
                key={protein.id}
                href={`/explore?protein=${protein.id}`}
                className="flex flex-col items-center gap-1 p-3 rounded-xl border-2 border-border bg-card hover:border-amber-300 hover:bg-amber-50/50 active:scale-[0.97] transition-all min-h-[80px]"
              >
                <span className="text-2xl">{protein.emoji}</span>
                <span className="text-sm font-semibold leading-tight text-center">
                  {protein.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {protein.pairings.length} meals
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
