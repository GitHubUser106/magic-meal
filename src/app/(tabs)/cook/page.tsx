"use client";

import { useState, useMemo } from "react";
import { PROTEINS, DOCTOR_IT_UP_BASES, getAllRecipes, type Protein, type DoctorItUpBase, type Recipe } from "@/lib/data/recipes";
import { RecipeCard } from "@/components/recipe-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSavedRecipes } from "@/lib/hooks/use-saved-recipes";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Curated quick picks — popular, fast recipes
const QUICK_PICK_IDS = [
  "chicken-tortilla-cheese",
  "beef-buns-cheese",
  "eggs-bread-cheese",
  "cheese-grilled-tomato-soup",
  "chicken-honey-garlic",
  "tofu-stirfry-rice",
];

export default function CookPage() {
  const [timeFilter, setTimeFilter] = useState<number | null>(null);
  const { toggleSave, isSaved } = useSavedRecipes();

  const allRecipes = useMemo(() => getAllRecipes(), []);

  const quickPicks = useMemo(() => {
    let picks = allRecipes.filter((r) => QUICK_PICK_IDS.includes(r.id));
    if (timeFilter) {
      picks = picks.filter((r) => parseInt(r.cookTime) <= timeFilter);
    }
    return picks;
  }, [allRecipes, timeFilter]);

  const VEGGIE_IDS = ["eggs", "black-beans", "cheese", "tofu"];

  const filteredProteins = useMemo(() => {
    const filtered = timeFilter
      ? PROTEINS.map((p) => ({
          ...p,
          pairings: p.pairings.filter((r) => parseInt(r.cookTime) <= timeFilter),
        })).filter((p) => p.pairings.length > 0)
      : PROTEINS;
    return {
      meat: filtered.filter((p) => !VEGGIE_IDS.includes(p.id)),
      veggie: filtered.filter((p) => VEGGIE_IDS.includes(p.id)),
    };
  }, [timeFilter]);

  return (
    <div className="px-4 py-5 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold">
          <span className="mr-2">&#x2728;</span>
          Magic Meal
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Protein + 2 ingredients. Dinner, done.
        </p>
      </div>

      {/* Time Picker */}
      <div className="flex items-center gap-2 mb-5">
        <span className="text-sm text-muted-foreground">How much time?</span>
        {[10, 20].map((mins) => (
          <button
            key={mins}
            onClick={() => setTimeFilter(timeFilter === mins ? null : mins)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium border transition-all min-h-[32px]",
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
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">
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
        <h2 className="text-sm font-semibold text-muted-foreground mb-3">
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
                  <span className="text-xs font-semibold text-center leading-tight">
                    {base.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {base.recipes.length} {base.recipes.length === 1 ? "upgrade" : "upgrades"}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Pick Your Protein */}
      <section className="mb-6">
        <h2 className="text-sm font-semibold text-muted-foreground mb-3">
          Pick your protein
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {filteredProteins.meat.map((protein) => (
            <Link
              key={protein.id}
              href={`/explore?protein=${protein.id}`}
              className="flex flex-col items-center gap-1 p-3 rounded-xl border-2 border-border bg-card hover:border-amber-300 hover:bg-amber-50/50 active:scale-[0.97] transition-all min-h-[80px]"
            >
              <span className="text-2xl">{protein.emoji}</span>
              <span className="text-xs font-semibold leading-tight text-center">
                {protein.name}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {protein.pairings.length} meals
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Vegetarian */}
      {filteredProteins.veggie.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">
            Vegetarian
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {filteredProteins.veggie.map((protein) => (
              <Link
                key={protein.id}
                href={`/explore?protein=${protein.id}`}
                className="flex flex-col items-center gap-1 p-3 rounded-xl border-2 border-border bg-card hover:border-amber-300 hover:bg-amber-50/50 active:scale-[0.97] transition-all min-h-[80px]"
              >
                <span className="text-2xl">{protein.emoji}</span>
                <span className="text-xs font-semibold leading-tight text-center">
                  {protein.name}
                </span>
                <span className="text-[10px] text-muted-foreground">
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
