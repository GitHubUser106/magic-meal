"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePreferences } from "@/lib/hooks/use-preferences";

export default function Home() {
  const router = useRouter();
  const { preferences, isLoaded } = usePreferences();

  useEffect(() => {
    if (!isLoaded) return;
    if (preferences.onboarded) {
      router.replace("/cook");
    } else {
      router.replace("/onboarding");
    }
  }, [isLoaded, preferences.onboarded, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-muted-foreground">Loading...</span>
      </div>
    </div>
  );
}
