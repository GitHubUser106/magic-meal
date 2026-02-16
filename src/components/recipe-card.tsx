"use client";

import { type Recipe } from "@/lib/data/recipes";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface RecipeCardProps {
  recipe: Recipe;
  emoji?: string;
  onSave?: (id: string) => void;
  isSaved?: boolean;
  compact?: boolean;
}

export function RecipeCard({ recipe, emoji, onSave, isSaved = false, compact = false }: RecipeCardProps) {
  const displayEmoji = emoji ?? recipe.emoji;

  return (
    <Link href={`/recipe/${recipe.id}`} className="block">
      <Card className={cn(
        "hover:border-amber-300 transition-all active:scale-[0.98] relative",
        compact && "min-w-[200px] snap-start"
      )}>
        <CardContent className="p-4">
          {/* Save button */}
          {onSave && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onSave(recipe.id);
              }}
              className="absolute top-3 right-3 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
            >
              <Heart
                className={cn(
                  "w-5 h-5 transition-all",
                  isSaved
                    ? "fill-red-500 text-red-500 scale-110"
                    : "text-muted-foreground hover:text-red-400"
                )}
              />
            </button>
          )}

          {/* Emoji */}
          {displayEmoji && (
            <span className="text-2xl mb-2 block" role="img" aria-label={recipe.recipeName}>
              {displayEmoji}
            </span>
          )}

          {/* Title */}
          <h3 className="font-semibold text-sm pr-8">{recipe.recipeName}</h3>

          {/* Ingredients */}
          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
            {recipe.ingredients.join(" + ")}
          </p>

          {/* Badges */}
          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            <Badge variant="secondary" className="text-[10px]">
              {recipe.cookTime}
            </Badge>
            {recipe.difficulty && (
              <Badge variant="outline" className="text-[10px]">
                {recipe.difficulty}
              </Badge>
            )}
            {recipe.servings && (
              <Badge variant="outline" className="text-[10px]">
                {recipe.servings} {recipe.servings === 1 ? "serving" : "servings"}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
