import { User, Utensils, Users, ChefHat } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="px-4 py-5 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-6">Profile</h1>

      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card">
          <Utensils className="w-5 h-5 text-muted-foreground" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold">Dietary preferences</h3>
            <p className="text-xs text-muted-foreground">Meat-eater, vegetarian, etc.</p>
          </div>
          <span className="text-xs text-amber-600 font-medium">Coming soon</span>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card">
          <Users className="w-5 h-5 text-muted-foreground" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold">Household size</h3>
            <p className="text-xs text-muted-foreground">Adjust serving sizes</p>
          </div>
          <span className="text-xs text-amber-600 font-medium">Coming soon</span>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card">
          <ChefHat className="w-5 h-5 text-muted-foreground" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold">Cooking skill level</h3>
            <p className="text-xs text-muted-foreground">Total beginner to comfortable</p>
          </div>
          <span className="text-xs text-amber-600 font-medium">Coming soon</span>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-8">
        Magic Meal v1.0
      </p>
    </div>
  );
}
