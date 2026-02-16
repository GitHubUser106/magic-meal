"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePreferences } from "@/lib/hooks/use-preferences";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const DIETARY_OPTIONS = [
  { value: "no-preference", label: "I eat everything", emoji: "🍽️" },
  { value: "no-red-meat", label: "No red meat", emoji: "🐔" },
  { value: "pescatarian", label: "Pescatarian", emoji: "🐟" },
  { value: "vegetarian", label: "Vegetarian", emoji: "🥗" },
];

const HOUSEHOLD_OPTIONS = [
  { value: 1, label: "Just me", emoji: "🧑" },
  { value: 2, label: "2 people", emoji: "👫" },
  { value: 3, label: "3-4 people", emoji: "👨‍👩‍👧" },
  { value: 4, label: "5+ people", emoji: "👨‍👩‍👧‍👦" },
];

const COMFORT_OPTIONS = [
  { value: "beginner", label: "Total beginner", emoji: "🌱", desc: "Never really cooked before" },
  { value: "some-experience", label: "Some experience", emoji: "🍳", desc: "Can make a few things" },
  { value: "comfortable", label: "Comfortable", emoji: "👨‍🍳", desc: "I cook regularly" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { completeOnboarding } = usePreferences();
  const [step, setStep] = useState(0);
  const [dietary, setDietary] = useState("no-preference");
  const [householdSize, setHouseholdSize] = useState(2);
  const [cookingComfort, setCookingComfort] = useState("beginner");

  const totalSteps = 4;

  function handleComplete() {
    completeOnboarding({ dietary, householdSize, cookingComfort });
    router.push("/cook");
  }

  function handleSkip() {
    completeOnboarding({ dietary, householdSize, cookingComfort });
    router.push("/cook");
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress bar */}
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-amber-500 transition-all duration-300"
          style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col px-6 py-8">
        {/* Step 0: Welcome */}
        {step === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <span className="text-6xl mb-6">✨</span>
            <h1 className="text-2xl font-bold mb-3">Welcome to Magic Meal</h1>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-[280px] mb-8">
              Real meals from stuff you already have. Let&apos;s personalize your experience in 30 seconds.
            </p>
            <button
              onClick={() => setStep(1)}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-amber-500 text-white font-semibold text-base hover:bg-amber-600 active:scale-[0.98] transition-all min-h-[48px]"
            >
              Get Started
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Step 1: Dietary */}
        {step === 1 && (
          <div className="flex-1 flex flex-col">
            <h1 className="text-xl font-bold mb-2">What do you eat?</h1>
            <p className="text-sm text-muted-foreground mb-6">
              We&apos;ll show you the most relevant recipes.
            </p>
            <div className="space-y-3 flex-1">
              {DIETARY_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setDietary(option.value)}
                  className={cn(
                    "flex items-center gap-4 w-full p-4 rounded-xl border-2 text-left transition-all min-h-[56px]",
                    dietary === option.value
                      ? "border-amber-500 bg-amber-50"
                      : "border-border hover:border-amber-300"
                  )}
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="font-medium text-sm">{option.label}</span>
                </button>
              ))}
            </div>
            <div className="pt-6 space-y-3">
              <button
                onClick={() => setStep(2)}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-amber-500 text-white font-semibold text-base hover:bg-amber-600 active:scale-[0.98] transition-all min-h-[48px]"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={handleSkip}
                className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px]"
              >
                Skip for now
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Household Size */}
        {step === 2 && (
          <div className="flex-1 flex flex-col">
            <h1 className="text-xl font-bold mb-2">How many people?</h1>
            <p className="text-sm text-muted-foreground mb-6">
              We&apos;ll adjust serving suggestions.
            </p>
            <div className="grid grid-cols-2 gap-3 flex-1">
              {HOUSEHOLD_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setHouseholdSize(option.value)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 text-center transition-all min-h-[100px]",
                    householdSize === option.value
                      ? "border-amber-500 bg-amber-50"
                      : "border-border hover:border-amber-300"
                  )}
                >
                  <span className="text-3xl">{option.emoji}</span>
                  <span className="font-medium text-sm">{option.label}</span>
                </button>
              ))}
            </div>
            <div className="pt-6 space-y-3">
              <button
                onClick={() => setStep(3)}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-amber-500 text-white font-semibold text-base hover:bg-amber-600 active:scale-[0.98] transition-all min-h-[48px]"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={handleSkip}
                className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px]"
              >
                Skip for now
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Cooking Comfort */}
        {step === 3 && (
          <div className="flex-1 flex flex-col">
            <h1 className="text-xl font-bold mb-2">Cooking comfort level?</h1>
            <p className="text-sm text-muted-foreground mb-6">
              No wrong answer — we&apos;ll meet you where you are.
            </p>
            <div className="space-y-3 flex-1">
              {COMFORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setCookingComfort(option.value)}
                  className={cn(
                    "flex items-center gap-4 w-full p-4 rounded-xl border-2 text-left transition-all min-h-[56px]",
                    cookingComfort === option.value
                      ? "border-amber-500 bg-amber-50"
                      : "border-border hover:border-amber-300"
                  )}
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <div>
                    <span className="font-medium text-sm block">{option.label}</span>
                    <span className="text-xs text-muted-foreground">{option.desc}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="pt-6 space-y-3">
              <button
                onClick={handleComplete}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-amber-500 text-white font-semibold text-base hover:bg-amber-600 active:scale-[0.98] transition-all min-h-[48px]"
              >
                Start Cooking
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={handleSkip}
                className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px]"
              >
                Skip for now
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 pb-8">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              i === step ? "bg-amber-500 w-6" : i < step ? "bg-amber-300" : "bg-muted-foreground/20"
            )}
          />
        ))}
      </div>
    </div>
  );
}
