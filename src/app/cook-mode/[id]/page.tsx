"use client";

import { use, useState, useEffect, useCallback, useRef } from "react";
import { notFound, useRouter } from "next/navigation";
import { getRecipeById } from "@/lib/data/recipes";
import { track } from "@vercel/analytics";
import { useSavedRecipes } from "@/lib/hooks/use-saved-recipes";
import { X, ChevronRight, ChevronLeft, Timer, Heart, Home, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Parse time from step text (e.g., "5 minutes", "8-10 min", "2 mins")
function parseTimerFromStep(step: string): number | null {
  const match = step.match(/(\d+)(?:\s*[-–]\s*\d+)?\s*min(?:ute)?s?/i);
  if (match) return parseInt(match[1]) * 60; // return seconds
  return null;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function CookModePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const recipe = getRecipeById(id);
  const router = useRouter();
  const { toggleSave, isSaved } = useSavedRecipes();

  const [currentStep, setCurrentStep] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerDone, setTimerDone] = useState(false);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  // Wake Lock
  useEffect(() => {
    async function requestWakeLock() {
      try {
        if ("wakeLock" in navigator) {
          wakeLockRef.current = await navigator.wakeLock.request("screen");
        }
      } catch {
        // Wake lock request failed (low battery, etc.)
      }
    }
    requestWakeLock();

    return () => {
      wakeLockRef.current?.release();
      wakeLockRef.current = null;
    };
  }, []);

  // Play a beep tone via Web Audio API
  const playBeep = useCallback(() => {
    try {
      const ctx = new AudioContext();
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.frequency.value = 880;
      oscillator.type = "sine";
      gain.gain.value = 0.3;

      oscillator.start();
      // Three short beeps
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.setValueAtTime(0, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.3, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0, ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.3, ctx.currentTime + 0.5);
      gain.gain.setValueAtTime(0, ctx.currentTime + 0.65);
      oscillator.stop(ctx.currentTime + 0.7);
    } catch {
      // Web Audio not available
    }
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!timerRunning || timerSeconds === null || timerSeconds <= 0) return;

    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev === null || prev <= 1) {
          setTimerRunning(false);
          setTimerDone(true);
          playBeep();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds, playBeep]);

  const handleExit = useCallback(() => {
    setShowExitConfirm(true);
  }, []);

  const confirmExit = useCallback(() => {
    router.back();
  }, [router]);

  if (!recipe) {
    notFound();
  }

  useEffect(() => {
    track("cook_mode_started", { recipeId: recipe.id });
  }, [recipe.id]);

  const totalSteps = recipe.instructions.length;
  const isDone = currentStep >= totalSteps;
  const stepText = isDone ? "" : recipe.instructions[currentStep];
  const stepTimerSeconds = isDone ? null : parseTimerFromStep(stepText);

  function startTimer(seconds: number) {
    setTimerSeconds(seconds);
    setTimerRunning(true);
    setTimerDone(false);
  }

  function toggleTimer() {
    setTimerRunning((r) => !r);
  }

  function clearTimer() {
    setTimerSeconds(null);
    setTimerRunning(false);
    setTimerDone(false);
  }

  useEffect(() => {
    if (isDone) {
      track("cook_mode_completed", { recipeId: recipe.id });
    }
  }, [isDone, recipe.id]);

  // Done screen
  if (isDone) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
        <div className="text-6xl mb-4">&#127881;</div>
        <h1 className="text-2xl font-bold mb-2">Done!</h1>
        <p className="text-muted-foreground mb-8">
          Nice work — {recipe.recipeName} is ready to eat.
        </p>

        <div className="w-full max-w-xs space-y-3">
          <button
            onClick={() => toggleSave(recipe.id)}
            className={cn(
              "w-full py-3.5 rounded-xl font-semibold text-base transition-all min-h-[48px] flex items-center justify-center gap-2",
              isSaved(recipe.id)
                ? "bg-red-50 text-red-600 border border-red-200"
                : "bg-amber-500 text-white hover:bg-amber-600"
            )}
          >
            <Heart
              className={cn(
                "w-5 h-5",
                isSaved(recipe.id) && "fill-red-500"
              )}
            />
            {isSaved(recipe.id) ? "Saved!" : "Save Recipe"}
          </button>

          <Link
            href="/cook"
            className="w-full py-3.5 rounded-xl font-semibold text-base border border-border hover:bg-muted/50 transition-all min-h-[48px] flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Exit confirmation overlay */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-6">
          <div className="bg-background rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h2 className="text-lg font-bold mb-2">Leave cook mode?</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Your progress on this recipe won&apos;t be saved.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 py-3 rounded-xl border border-border font-medium text-sm hover:bg-muted/50 transition-colors min-h-[44px]"
              >
                Keep Cooking
              </button>
              <button
                onClick={confirmExit}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white font-medium text-sm hover:bg-red-600 transition-colors min-h-[44px]"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="px-4 h-14 flex items-center justify-between flex-shrink-0">
        <button
          onClick={handleExit}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Exit cook mode"
        >
          <X className="w-6 h-6" />
        </button>
        <span className="text-sm text-muted-foreground font-medium">
          Step {currentStep + 1} of {totalSteps}
        </span>
        {/* Timer badge (persistent) */}
        {timerSeconds !== null && (
          <button
            onClick={toggleTimer}
            aria-live="assertive"
            aria-label={timerDone ? "Timer done" : `Timer: ${formatTime(timerSeconds)}`}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-bold min-h-[32px] flex items-center gap-1.5 transition-all",
              timerDone
                ? "bg-green-100 text-green-700 animate-pulse"
                : timerRunning
                ? "bg-amber-100 text-amber-700"
                : "bg-muted text-muted-foreground"
            )}
          >
            <Timer className="w-3.5 h-3.5" />
            {timerDone ? "Done!" : formatTime(timerSeconds)}
            {!timerDone && (timerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />)}
          </button>
        )}
        {timerSeconds === null && <div className="w-[44px]" />}
      </div>

      {/* Progress bar */}
      <div className="px-4 mb-6">
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-4">
        <p className="text-lg leading-relaxed text-center max-w-md">
          {stepText}
        </p>

        {/* Timer button for this step */}
        {stepTimerSeconds && timerSeconds === null && (
          <button
            onClick={() => startTimer(stepTimerSeconds)}
            className="mt-6 px-5 py-2.5 rounded-full bg-amber-100 text-amber-700 font-medium text-sm flex items-center gap-2 hover:bg-amber-200 transition-colors min-h-[44px]"
          >
            <Timer className="w-4 h-4" />
            Set Timer ({Math.floor(stepTimerSeconds / 60)} min)
          </button>
        )}

        {/* Timer done — dismiss */}
        {timerDone && (
          <button
            onClick={clearTimer}
            className="mt-6 px-5 py-2.5 rounded-full bg-green-100 text-green-700 font-medium text-sm min-h-[44px]"
          >
            Dismiss Timer
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="px-4 pb-8 flex-shrink-0">
        <button
          onClick={() => setCurrentStep((s) => s + 1)}
          className="w-full py-3.5 rounded-xl bg-amber-500 text-white font-semibold text-base hover:bg-amber-600 active:scale-[0.98] transition-all min-h-[48px] flex items-center justify-center gap-2"
        >
          {currentStep === totalSteps - 1 ? "Finish" : "Next Step"}
          <ChevronRight className="w-5 h-5" />
        </button>

        {currentStep > 0 && (
          <button
            onClick={() => setCurrentStep((s) => s - 1)}
            className="w-full mt-3 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center justify-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous Step
          </button>
        )}
      </div>
    </div>
  );
}
