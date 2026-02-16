"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Compass, Heart, ShoppingCart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useShoppingList } from "@/lib/hooks/use-shopping-list";

const TABS = [
  { href: "/cook", label: "Cook", icon: Sparkles },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/saved", label: "Saved", icon: Heart },
  { href: "/list", label: "List", icon: ShoppingCart },
  { href: "/profile", label: "Profile", icon: User },
];

export function TabBar() {
  const pathname = usePathname();
  const { getUncheckedCount } = useShoppingList();
  const uncheckedCount = getUncheckedCount();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-background border-t border-border z-50 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-14">
        {TABS.map((tab) => {
          const isActive = pathname.startsWith(tab.href);
          const showBadge = tab.href === "/list" && uncheckedCount > 0;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex flex-col items-center gap-0.5 min-w-[44px] min-h-[44px] justify-center px-2 transition-colors",
                isActive
                  ? "text-amber-600"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="relative">
                <tab.icon className="w-5 h-5" aria-hidden="true" />
                {showBadge && (
                  <span className="absolute -top-1.5 -right-2.5 bg-amber-500 text-white text-[9px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full px-1">
                    {uncheckedCount > 99 ? "99+" : uncheckedCount}
                  </span>
                )}
              </span>
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
