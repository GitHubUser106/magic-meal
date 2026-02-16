"use client";

import { useMemo } from "react";
import { getRecipeById } from "@/lib/data/recipes";
import { RecipeCard } from "@/components/recipe-card";
import { useSavedRecipes } from "@/lib/hooks/use-saved-recipes";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function SavedPage() {
  const { savedIds, toggleSave, isSaved } = useSavedRecipes();

  const savedRecipes = useMemo(
    () => savedIds.map(getRecipeById).filter(Boolean),
    [savedIds]
  );

  return (
    <div className="px-4 py-5 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Saved Recipes</h1>

      {savedRecipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Heart className="w-12 h-12 text-muted-foreground/30 mb-4" />
          <h2 className="text-lg font-semibold mb-1">No saved recipes yet</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-[240px]">
            Tap the heart on any recipe to save it here
          </p>
          <Link
            href="/cook"
            className="px-5 py-2.5 rounded-full bg-amber-500 text-white font-medium text-sm hover:bg-amber-600 transition-colors min-h-[44px] flex items-center"
          >
            Start cooking &rarr;
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {savedRecipes.map((recipe) =>
            recipe ? (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onSave={toggleSave}
                isSaved={isSaved(recipe.id)}
              />
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
