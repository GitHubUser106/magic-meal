"use client";

import { use, useEffect } from "react";
import { notFound } from "next/navigation";
import { track } from "@vercel/analytics";
import { getRecipeById, getRecipeContext } from "@/lib/data/recipes";
import { useSavedRecipes } from "@/lib/hooks/use-saved-recipes";
import { useShoppingList } from "@/lib/hooks/use-shopping-list";
import { Badge } from "@/components/ui/badge";
import { Heart, ChevronLeft, Clock, ChefHat, Users, Lightbulb, ShoppingCart, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const recipe = getRecipeById(id);
  const context = getRecipeContext(id);
  const router = useRouter();
  const { toggleSave, isSaved } = useSavedRecipes();
  const { addRecipe, hasRecipe } = useShoppingList();
  const inList = hasRecipe(id);

  if (!recipe) {
    notFound();
  }

  useEffect(() => {
    track("recipe_opened", {
      recipeId: recipe.id,
      recipeName: recipe.recipeName,
    });
  }, [recipe.id, recipe.recipeName]);

  const emoji = context?.type === "protein"
    ? context.parent.emoji
    : context?.type === "base"
    ? context.parent.emoji
    : recipe.emoji;

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground min-h-[44px] min-w-[44px]"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <button
            onClick={() => toggleSave(recipe.id)}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={isSaved(recipe.id) ? "Unsave recipe" : "Save recipe"}
          >
            <Heart
              className={cn(
                "w-6 h-6 transition-all",
                isSaved(recipe.id)
                  ? "fill-red-500 text-red-500"
                  : "text-muted-foreground hover:text-red-400"
              )}
            />
          </button>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Hero */}
        <div className="text-center mb-6">
          {emoji && <span className="text-5xl mb-3 block" role="img" aria-label={recipe.recipeName}>{emoji}</span>}
          <h1 className="text-2xl font-bold">{recipe.recipeName}</h1>
          {context && (
            <p className="text-sm text-muted-foreground mt-1">
              {context.type === "protein"
                ? `${context.parent.name} recipe`
                : `${context.parent.name} upgrade`}
            </p>
          )}
        </div>

        {/* Badges */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">{recipe.cookTime}</span>
          </div>
          {recipe.difficulty && (
            <div className="flex items-center gap-1.5">
              <ChefHat className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{recipe.difficulty}</span>
            </div>
          )}
          {recipe.servings && (
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {recipe.servings} {recipe.servings === 1 ? "serving" : "servings"}
              </span>
            </div>
          )}
        </div>

        {/* Start Cooking CTA */}
        <Link
          href={`/cook-mode/${recipe.id}`}
          className="block w-full text-center py-3.5 rounded-xl bg-amber-500 text-white font-semibold text-base hover:bg-amber-600 active:scale-[0.98] transition-all mb-3 min-h-[48px]"
        >
          Start Cooking
        </Link>

        {/* Add to Shopping List */}
        <button
          onClick={() => {
            if (!inList) {
              addRecipe(recipe.id);
              toast.success("Added to shopping list", {
                action: {
                  label: "View list",
                  onClick: () => router.push("/list"),
                },
              });
            }
          }}
          disabled={inList}
          className={cn(
            "flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium transition-all mb-8 min-h-[48px]",
            inList
              ? "bg-muted text-muted-foreground cursor-default"
              : "bg-muted/50 border border-border text-foreground hover:bg-muted active:scale-[0.98]"
          )}
        >
          {inList ? (
            <>
              <Check className="w-4 h-4" />
              In Shopping List
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Add to Shopping List
            </>
          )}
        </button>

        {/* Ingredients */}
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            What you need
          </h2>
          <div className="space-y-2">
            {recipe.ingredients.map((ingredient, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                <span className="text-amber-500 font-bold text-sm mt-0.5">{i + 1}</span>
                <span className="text-sm">{ingredient}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Equipment */}
        {recipe.equipment && recipe.equipment.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Equipment
            </h2>
            <div className="flex flex-wrap gap-2">
              {recipe.equipment.map((item, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {item}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* Instructions */}
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Steps
          </h2>
          <div className="space-y-4">
            {recipe.instructions.map((step, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </div>
                <p className="text-sm leading-relaxed pt-0.5">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pro Tips */}
        {recipe.proTips && recipe.proTips.length > 0 && (
          <section className="mb-6">
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <h2 className="text-sm font-semibold text-amber-800">Pro Tips</h2>
              </div>
              <ul className="space-y-2">
                {recipe.proTips.map((tip, i) => (
                  <li key={i} className="text-sm text-amber-900 leading-relaxed">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Why these pairings */}
        {recipe.whyThesePairings && (
          <section className="mb-8">
            <div className="rounded-xl bg-muted/30 p-4">
              <h2 className="text-sm font-semibold mb-2">Why these pairings work</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {recipe.whyThesePairings}
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
