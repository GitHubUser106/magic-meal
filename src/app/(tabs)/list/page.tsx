import { SHOPPING_LIST } from "@/lib/data/recipes";
import { ShoppingCart } from "lucide-react";

export default function ListPage() {
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
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Proteins
            </h3>
            <ul className="space-y-1">
              {SHOPPING_LIST.proteins.map((item, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="text-muted-foreground">&#9744;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Pairing ingredients
            </h3>
            <ul className="space-y-1">
              {SHOPPING_LIST.pairingIngredients.map((item, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="text-muted-foreground">&#9744;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Doctor it up bases
            </h3>
            <ul className="space-y-1">
              {SHOPPING_LIST.doctoredUpBases.map((item, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="text-muted-foreground">&#9744;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
