"use client";

import { useState, useEffect } from "react";
import { SHOPPING_LIST } from "@/lib/data/recipes";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "magic_meal_checklist";

function loadChecked(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return new Set(JSON.parse(stored));
  } catch {
    // Invalid JSON — start fresh
  }
  return new Set();
}

function saveChecked(checked: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...checked]));
}

export default function ListPage() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  useEffect(() => {
    setChecked(loadChecked());
  }, []);

  function toggle(key: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      saveChecked(next);
      return next;
    });
  }

  const sections = [
    { title: "Proteins", items: SHOPPING_LIST.proteins, prefix: "protein" },
    { title: "Pairing ingredients", items: SHOPPING_LIST.pairingIngredients, prefix: "pairing" },
    { title: "Doctor it up bases", items: SHOPPING_LIST.doctoredUpBases, prefix: "base" },
  ];

  return (
    <div className="px-4 py-5 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Shopping List</h1>

      <div className="bg-muted/30 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <ShoppingCart className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold">Starter grocery list</h2>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Everything you need to make multiple meals this week. Estimated cost: {SHOPPING_LIST.estimatedCost}
        </p>

        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.prefix}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item, i) => {
                  const key = `${section.prefix}-${i}`;
                  const isChecked = checked.has(key);
                  return (
                    <li key={key}>
                      <label className="flex items-start gap-2 text-sm cursor-pointer min-h-[36px] py-1">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggle(key)}
                          className="mt-0.5 h-4 w-4 rounded border-border accent-amber-500 flex-shrink-0"
                        />
                        <span className={cn(isChecked && "line-through text-muted-foreground")}>
                          {item}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
