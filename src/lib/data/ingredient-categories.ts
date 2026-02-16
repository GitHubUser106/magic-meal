// ============================================================
// Magic Meal — Ingredient Category Mapping
// Maps common ingredient strings to grocery aisle categories
// ============================================================

export interface CategoryInfo {
  label: string;
  emoji: string;
  sortOrder: number;
}

export const CATEGORY_INFO: Record<string, CategoryInfo> = {
  "Produce": { label: "Produce", emoji: "🥬", sortOrder: 0 },
  "Meat & Seafood": { label: "Meat & Seafood", emoji: "🥩", sortOrder: 1 },
  "Dairy & Eggs": { label: "Dairy & Eggs", emoji: "🧀", sortOrder: 2 },
  "Frozen": { label: "Frozen", emoji: "🧊", sortOrder: 3 },
  "Bread & Bakery": { label: "Bread & Bakery", emoji: "🍞", sortOrder: 4 },
  "Canned Goods": { label: "Canned Goods", emoji: "🥫", sortOrder: 5 },
  "Pantry & Dry Goods": { label: "Pantry & Dry Goods", emoji: "🫙", sortOrder: 6 },
  "Condiments & Sauces": { label: "Condiments & Sauces", emoji: "🍯", sortOrder: 7 },
  "Other": { label: "Other", emoji: "🛒", sortOrder: 8 },
};

// Maps partial ingredient strings to their grocery category
const INGREDIENT_MAP: [string, string][] = [
  // Produce
  ["banana", "Produce"],
  ["tomato", "Produce"],
  ["lettuce", "Produce"],
  ["celery", "Produce"],
  ["green onion", "Produce"],
  ["onion", "Produce"],
  ["garlic", "Produce"],

  // Meat & Seafood
  ["chicken breast", "Meat & Seafood"],
  ["chicken", "Meat & Seafood"],
  ["ground beef", "Meat & Seafood"],
  ["bacon", "Meat & Seafood"],
  ["hot dog", "Meat & Seafood"],

  // Dairy & Eggs
  ["egg", "Dairy & Eggs"],
  ["cheese", "Dairy & Eggs"],
  ["cheddar", "Dairy & Eggs"],
  ["american cheese", "Dairy & Eggs"],
  ["parmesan", "Dairy & Eggs"],
  ["butter", "Dairy & Eggs"],
  ["milk", "Dairy & Eggs"],

  // Frozen
  ["frozen broccoli", "Frozen"],
  ["frozen mixed", "Frozen"],
  ["frozen peas", "Frozen"],
  ["frozen", "Frozen"],

  // Bread & Bakery
  ["bread", "Bread & Bakery"],
  ["bun", "Bread & Bakery"],
  ["hamburger bun", "Bread & Bakery"],
  ["english muffin", "Bread & Bakery"],
  ["tortilla", "Bread & Bakery"],
  ["taco shell", "Bread & Bakery"],
  ["cracker", "Bread & Bakery"],
  ["tortilla chip", "Bread & Bakery"],

  // Canned Goods
  ["canned tuna", "Canned Goods"],
  ["canned chicken", "Canned Goods"],
  ["canned black bean", "Canned Goods"],
  ["canned bean", "Canned Goods"],
  ["campbell", "Canned Goods"],
  ["cream of mushroom", "Canned Goods"],
  ["tomato soup", "Canned Goods"],

  // Pantry & Dry Goods
  ["instant rice", "Pantry & Dry Goods"],
  ["rice", "Pantry & Dry Goods"],
  ["pasta", "Pantry & Dry Goods"],
  ["spaghetti", "Pantry & Dry Goods"],
  ["penne", "Pantry & Dry Goods"],
  ["rotini", "Pantry & Dry Goods"],
  ["elbow macaroni", "Pantry & Dry Goods"],
  ["ramen", "Pantry & Dry Goods"],
  ["instant ramen", "Pantry & Dry Goods"],
  ["mac & cheese", "Pantry & Dry Goods"],
  ["oat", "Pantry & Dry Goods"],
  ["flour", "Pantry & Dry Goods"],

  // Condiments & Sauces
  ["marinara", "Condiments & Sauces"],
  ["bbq sauce", "Condiments & Sauces"],
  ["salsa", "Condiments & Sauces"],
  ["soy sauce", "Condiments & Sauces"],
  ["hot sauce", "Condiments & Sauces"],
  ["mayo", "Condiments & Sauces"],
  ["ketchup", "Condiments & Sauces"],
  ["mustard", "Condiments & Sauces"],
];

export function categorizeIngredient(ingredient: string): string {
  const lower = ingredient.toLowerCase();
  for (const [partial, category] of INGREDIENT_MAP) {
    if (lower.includes(partial)) {
      return category;
    }
  }
  return "Other";
}
