"use client";

import { useState } from "react";
import { useShoppingList } from "@/lib/hooks/use-shopping-list";
import { categorizeIngredient, CATEGORY_INFO } from "@/lib/data/ingredient-categories";
import { ShoppingCart, Trash2, CheckCircle2, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ListPage() {
  const {
    items,
    toggleChecked,
    clearChecked,
    clearAll,
    getUncheckedCount,
    addCustomItem,
    removeCustomItem,
  } = useShoppingList();
  const [newItem, setNewItem] = useState("");

  const uncheckedCount = getUncheckedCount();
  const checkedCount = items.filter((item) => item.checked).length;

  // Split custom and recipe items
  const customItems = items.filter((item) => item.isCustom);
  const recipeItems = items.filter((item) => !item.isCustom);

  // Group recipe items by category
  const grouped = recipeItems.reduce<Record<string, typeof recipeItems>>((acc, item) => {
    const category = categorizeIngredient(item.ingredient);
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  // Sort categories by sortOrder
  const sortedCategories = Object.keys(grouped).sort(
    (a, b) => (CATEGORY_INFO[a]?.sortOrder ?? 99) - (CATEGORY_INFO[b]?.sortOrder ?? 99)
  );

  const handleAddItem = () => {
    if (!newItem.trim()) return;
    addCustomItem(newItem);
    setNewItem("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAddItem();
  };

  if (items.length === 0 && !newItem) {
    return (
      <div className="px-4 py-5 max-w-lg mx-auto">
        <h1 className="text-xl font-bold mb-4">Shopping List</h1>

        {/* Add item input — always visible */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add an item..."
            className="flex-1 px-3 py-2 rounded-lg border border-border bg-card text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
          />
          <button
            onClick={handleAddItem}
            className="px-3 py-2 rounded-lg bg-amber-500 text-white font-medium text-sm hover:bg-amber-600 active:scale-[0.97] transition-all min-h-[44px]"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ShoppingCart className="w-12 h-12 text-muted-foreground/40 mb-4" />
          <h2 className="text-base font-semibold mb-1">No items yet</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-[250px]">
            Add your own items above, or add ingredients from any recipe.
          </p>
          <Link
            href="/explore"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-amber-500 text-white font-semibold text-sm hover:bg-amber-600 active:scale-[0.98] transition-all min-h-[44px]"
          >
            Browse Recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-5 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Shopping List</h1>
        <span className="text-sm text-muted-foreground">
          {uncheckedCount} item{uncheckedCount !== 1 ? "s" : ""} remaining
        </span>
      </div>

      {/* Add item input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add an item..."
          className="flex-1 px-3 py-2 rounded-lg border border-border bg-card text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
        />
        <button
          onClick={handleAddItem}
          className="px-3 py-2 rounded-lg bg-amber-500 text-white font-medium text-sm hover:bg-amber-600 active:scale-[0.97] transition-all min-h-[44px]"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Action buttons */}
      {checkedCount > 0 && (
        <div className="flex gap-2 mb-4">
          <button
            onClick={clearChecked}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-muted/50 border border-border text-sm font-medium hover:bg-muted transition-colors min-h-[44px]"
          >
            <CheckCircle2 className="w-4 h-4" />
            Clear Checked ({checkedCount})
          </button>
          <button
            onClick={clearAll}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-muted/50 border border-border text-sm font-medium text-red-600 hover:bg-red-50 transition-colors min-h-[44px]"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        </div>
      )}

      <div className="space-y-5">
        {/* Custom items section */}
        {customItems.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <span>&#x1F4DD;</span>
              Your Items
            </h2>
            <ul className="space-y-1">
              {customItems.map((item, i) => (
                <li key={`custom-${item.ingredient}-${i}`}>
                  <div className="flex items-center gap-3 text-sm min-h-[44px] py-2 px-3 rounded-lg hover:bg-muted/30 transition-colors">
                    <label className="flex items-center gap-3 flex-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleChecked(item.ingredient, item.recipeId)}
                        className="h-4 w-4 rounded border-border accent-amber-500 flex-shrink-0"
                      />
                      <span
                        className={cn(
                          item.checked && "line-through text-muted-foreground"
                        )}
                      >
                        {item.ingredient}
                      </span>
                    </label>
                    <button
                      onClick={() => removeCustomItem(item.ingredient)}
                      className="p-1.5 rounded-md text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
                      aria-label={`Remove ${item.ingredient}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recipe items grouped by category */}
        {sortedCategories.map((category) => {
          const info = CATEGORY_INFO[category] ?? CATEGORY_INFO["Other"];
          const categoryItems = grouped[category];
          return (
            <div key={category}>
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <span>{info.emoji}</span>
                {info.label}
              </h2>
              <ul className="space-y-1">
                {categoryItems.map((item, i) => (
                  <li key={`${item.recipeId}-${item.ingredient}-${i}`}>
                    <label className="flex items-start gap-3 text-sm cursor-pointer min-h-[44px] py-2 px-3 rounded-lg hover:bg-muted/30 transition-colors">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleChecked(item.ingredient, item.recipeId)}
                        className="mt-0.5 h-4 w-4 rounded border-border accent-amber-500 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className={cn(
                          "block",
                          item.checked && "line-through text-muted-foreground"
                        )}>
                          {item.ingredient}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {item.recipeName}
                        </span>
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
