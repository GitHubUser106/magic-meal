"use client";

import { useState } from "react";
import { PROTEINS, DOCTOR_IT_UP_BASES, type Protein, type DoctorItUpBase, type Recipe } from "@/lib/data/recipes";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type View = "home" | "protein" | "base" | "recipe";

export default function Home() {
  const [view, setView] = useState<View>("home");
  const [selectedProtein, setSelectedProtein] = useState<Protein | null>(null);
  const [selectedBase, setSelectedBase] = useState<DoctorItUpBase | null>(null);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

  function handleBack() {
    if (view === "recipe") {
      setSelectedRecipeId(null);
      setView(selectedProtein ? "protein" : "base");
    } else if (view === "protein" || view === "base") {
      setSelectedProtein(null);
      setSelectedBase(null);
      setView("home");
    }
  }

  // Get the selected recipe
  const allRecipes: Recipe[] = [
    ...(selectedProtein?.pairings ?? []),
    ...(selectedBase?.recipes ?? []),
  ];
  const selectedRecipe = selectedRecipeId
    ? allRecipes.find((r) => r.id === selectedRecipeId)
    : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-5 max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              <span className="mr-2">&#x2728;</span>
              Magic Meal
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Protein + 2 ingredients. Dinner, done.
            </p>
          </div>
          {view !== "home" && (
            <button
              onClick={handleBack}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Go back"
            >
              &larr; Back
            </button>
          )}
        </div>

        {/* Home View */}
        {view === "home" && (
          <div className="space-y-6">
            {/* Protein Section */}
            <section>
              <h2 className="text-sm font-semibold text-muted-foreground mb-3">
                Pick your protein
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {PROTEINS.map((protein) => (
                  <button
                    key={protein.id}
                    onClick={() => {
                      setSelectedProtein(protein);
                      setView("protein");
                    }}
                    className="flex flex-col items-center gap-1 p-3 rounded-xl border-2 border-border bg-card hover:border-amber-300 hover:bg-amber-50/50 active:scale-[0.97] transition-all min-h-[80px]"
                  >
                    <span className="text-2xl">{protein.emoji}</span>
                    <span className="text-xs font-semibold leading-tight text-center">
                      {protein.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {protein.pairings.length} meals
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Doctor It Up Section */}
            <section>
              <h2 className="text-sm font-semibold text-muted-foreground mb-3">
                Doctor it up
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {DOCTOR_IT_UP_BASES.map((base) => (
                  <button
                    key={base.id}
                    onClick={() => {
                      setSelectedBase(base);
                      setView("base");
                    }}
                    className="flex flex-col items-center gap-1 p-3 rounded-xl border-2 border-border bg-card hover:border-amber-300 hover:bg-amber-50/50 active:scale-[0.97] transition-all min-h-[80px]"
                  >
                    <span className="text-2xl">{base.emoji}</span>
                    <span className="text-xs font-semibold leading-tight text-center">
                      {base.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {base.recipes.length} {base.recipes.length === 1 ? "upgrade" : "upgrades"}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Protein Combos View */}
        {view === "protein" && selectedProtein && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">{selectedProtein.emoji}</span>
              <div>
                <h2 className="text-lg font-bold">{selectedProtein.name}</h2>
                <p className="text-xs text-muted-foreground">
                  {selectedProtein.pairings.length} meals &middot; {selectedProtein.whyIncluded}
                </p>
              </div>
            </div>
            {selectedProtein.pairings.map((recipe) => (
              <button
                key={recipe.id}
                onClick={() => {
                  setSelectedRecipeId(recipe.id);
                  setView("recipe");
                }}
                className="w-full text-left"
              >
                <Card className="hover:border-amber-300 transition-all active:scale-[0.99]">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-sm">{recipe.recipeName}</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {recipe.ingredients.join(" + ")}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <Badge variant="secondary" className="text-[10px]">
                          {recipe.cookTime}
                        </Badge>
                        {recipe.difficulty && (
                          <span className="text-[10px] text-muted-foreground">
                            {recipe.difficulty}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>
        )}

        {/* Doctor It Up View */}
        {view === "base" && selectedBase && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">{selectedBase.emoji}</span>
              <div>
                <h2 className="text-lg font-bold">{selectedBase.name}</h2>
                <p className="text-xs text-muted-foreground">
                  {selectedBase.recipes.length} {selectedBase.recipes.length === 1 ? "way" : "ways"} to make it actually good
                </p>
              </div>
            </div>
            {selectedBase.recipes.map((recipe) => (
              <button
                key={recipe.id}
                onClick={() => {
                  setSelectedRecipeId(recipe.id);
                  setView("recipe");
                }}
                className="w-full text-left"
              >
                <Card className="hover:border-amber-300 transition-all active:scale-[0.99]">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-sm">{recipe.recipeName}</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {recipe.ingredients.join(" + ")}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <Badge variant="secondary" className="text-[10px]">
                          {recipe.cookTime}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>
        )}

        {/* Recipe Detail View */}
        {view === "recipe" && selectedRecipe && (
          <div>
            <h2 className="text-xl font-bold mb-1">{selectedRecipe.recipeName}</h2>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="secondary">{selectedRecipe.cookTime}</Badge>
              {selectedRecipe.difficulty && (
                <Badge variant="outline">{selectedRecipe.difficulty}</Badge>
              )}
              {selectedRecipe.servings && (
                <Badge variant="outline">
                  {selectedRecipe.servings} {selectedRecipe.servings === 1 ? "serving" : "servings"}
                </Badge>
              )}
            </div>

            {/* Ingredients */}
            <div className="mb-5">
              <h3 className="text-sm font-semibold mb-2">What you need</h3>
              <ul className="space-y-1">
                {selectedRecipe.ingredients.map((ing, i) => (
                  <li key={i} className="text-sm flex items-start gap-2">
                    <span className="text-muted-foreground mt-0.5">&#8226;</span>
                    {ing}
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-muted-foreground mt-2 italic">
                + salt, pepper, oil, and pantry staples you already have
              </p>
            </div>

            {/* Equipment */}
            {selectedRecipe.equipment && selectedRecipe.equipment.length > 0 && (
              <div className="mb-5">
                <h3 className="text-sm font-semibold mb-2">Equipment</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedRecipe.equipment.join(", ")}
                </p>
              </div>
            )}

            {/* Steps */}
            <div className="mb-5">
              <h3 className="text-sm font-semibold mb-2">Steps</h3>
              <ol className="space-y-3">
                {selectedRecipe.instructions.map((step, i) => (
                  <li key={i} className="text-sm flex gap-3">
                    <span className="font-bold text-amber-600 shrink-0">
                      {i + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Pro Tips */}
            {selectedRecipe.proTips && selectedRecipe.proTips.length > 0 && (
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3 space-y-2">
                {selectedRecipe.proTips.map((tip, i) => (
                  <p key={i} className="text-sm">
                    <span className="font-semibold">Pro tip:</span> {tip}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
