"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PROTEINS, DOCTOR_IT_UP_BASES, getAllRecipes, type Recipe } from "@/lib/data/recipes";
import { RecipeCard } from "@/components/recipe-card";
import { useSavedRecipes } from "@/lib/hooks/use-saved-recipes";
import { Search, ChevronLeft } from "lucide-react";

type Filter =
  | { type: "none" }
  | { type: "protein"; id: string }
  | { type: "base"; id: string }
  | { type: "time"; minutes: number }
  | { type: "search"; query: string };

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="px-4 py-5 max-w-lg mx-auto"><h1 className="text-2xl font-bold mb-4">Explore Recipes</h1></div>}>
      <ExploreContent />
    </Suspense>
  );
}

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialProtein = searchParams.get("protein");
  const initialBase = searchParams.get("base");

  const [filter, setFilter] = useState<Filter>(
    initialProtein
      ? { type: "protein", id: initialProtein }
      : initialBase
      ? { type: "base", id: initialBase }
      : { type: "none" }
  );
  const [searchQuery, setSearchQuery] = useState("");
  const { toggleSave, isSaved } = useSavedRecipes();

  const allRecipes = useMemo(() => getAllRecipes(), []);

  const filteredRecipes = useMemo((): { title: string; emoji?: string; recipes: Recipe[] } | null => {
    switch (filter.type) {
      case "protein": {
        const protein = PROTEINS.find((p) => p.id === filter.id);
        if (!protein) return null;
        return { title: protein.name, emoji: protein.emoji, recipes: protein.pairings };
      }
      case "base": {
        const base = DOCTOR_IT_UP_BASES.find((b) => b.id === filter.id);
        if (!base) return null;
        return { title: base.name, emoji: base.emoji, recipes: base.recipes };
      }
      case "time": {
        const recipes = allRecipes.filter((r) => parseInt(r.cookTime) <= filter.minutes);
        return { title: `${filter.minutes} minutes or less`, recipes };
      }
      case "search": {
        const q = filter.query.toLowerCase();
        const recipes = allRecipes.filter(
          (r) =>
            r.recipeName.toLowerCase().includes(q) ||
            r.ingredients.some((ing) => ing.toLowerCase().includes(q))
        );
        return { title: `Results for "${filter.query}"`, recipes };
      }
      default:
        return null;
    }
  }, [filter, allRecipes]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      setFilter({ type: "search", query: searchQuery.trim() });
    }
  }

  function handleBack() {
    setFilter({ type: "none" });
    setSearchQuery("");
  }

  // Detail view — showing filtered recipes
  if (filteredRecipes) {
    return (
      <div className="px-4 py-5 max-w-lg mx-auto">
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 min-h-[44px]"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Explore
        </button>

        <div className="flex items-center gap-2 mb-4">
          {filteredRecipes.emoji && (
            <span className="text-2xl">{filteredRecipes.emoji}</span>
          )}
          <h2 className="text-xl font-bold">{filteredRecipes.title}</h2>
          <span className="text-base text-muted-foreground">
            ({filteredRecipes.recipes.length})
          </span>
        </div>

        {filteredRecipes.recipes.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">
            No recipes found.
          </p>
        ) : (
          <div className="space-y-3">
            {filteredRecipes.recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onSave={toggleSave}
                isSaved={isSaved(recipe.id)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Main explore view
  return (
    <div className="px-4 py-5 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Explore Recipes</h1>

      {/* Search */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 min-h-[44px]"
          />
        </div>
      </form>

      {/* By Protein */}
      <section className="mb-6">
        <h2 className="text-base font-semibold text-muted-foreground mb-3">
          By protein
        </h2>
        <div className="space-y-1">
          {PROTEINS.map((protein) => (
            <button
              key={protein.id}
              onClick={() => setFilter({ type: "protein", id: protein.id })}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors min-h-[44px]"
            >
              <span className="text-xl">{protein.emoji}</span>
              <span className="text-base font-medium flex-1 text-left">{protein.name}</span>
              <span className="text-sm text-muted-foreground">
                {protein.pairings.length} recipes
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* By Time */}
      <section className="mb-6">
        <h2 className="text-base font-semibold text-muted-foreground mb-3">
          By time
        </h2>
        <div className="flex gap-2">
          {[10, 20].map((mins) => (
            <button
              key={mins}
              onClick={() => setFilter({ type: "time", minutes: mins })}
              className="flex-1 p-3 rounded-lg border border-border bg-card hover:border-amber-300 transition-colors text-base font-medium min-h-[44px]"
            >
              {mins} min or less
            </button>
          ))}
        </div>
      </section>

      {/* Doctor It Up */}
      <section className="mb-6">
        <h2 className="text-base font-semibold text-muted-foreground mb-3">
          Doctor it up
        </h2>
        <div className="space-y-1">
          {DOCTOR_IT_UP_BASES.map((base) => (
            <button
              key={base.id}
              onClick={() => setFilter({ type: "base", id: base.id })}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors min-h-[44px]"
            >
              <span className="text-xl">{base.emoji}</span>
              <span className="text-base font-medium flex-1 text-left">{base.name}</span>
              <span className="text-sm text-muted-foreground">
                {base.recipes.length} {base.recipes.length === 1 ? "recipe" : "recipes"}
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
