"use client";

import { useEffect, useState, useCallback } from "react";
import type { PrankDef } from "@/lib/pranks";

interface PrankEngineProps {
  prank: PrankDef;
  onComplete: () => void;
}

export default function PrankEngine({ prank, onComplete }: PrankEngineProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const step = prank.steps[stepIndex];

  const advanceStep = useCallback(() => {
    if (stepIndex < prank.steps.length - 1) {
      setVisible(false);
      setTimeout(() => {
        setStepIndex((i) => i + 1);
        setVisible(true);
      }, 200);
    } else {
      // Hold last step for its duration then complete
      setTimeout(onComplete, 0);
    }
  }, [stepIndex, prank.steps.length, onComplete]);

  useEffect(() => {
    const timer = setTimeout(advanceStep, step.duration);
    return () => clearTimeout(timer);
  }, [stepIndex, step.duration, advanceStep]);

  // Vibrate on mobile for shake/flash effects
  useEffect(() => {
    if (step.effect === "shake" || step.effect === "flash") {
      navigator.vibrate?.(200);
    }
  }, [stepIndex, step.effect]);

  const effectClass = step.effect !== "none" ? `effect-${step.effect}` : "";

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center p-8 transition-colors duration-500 scanline ${effectClass}`}
      style={{ backgroundColor: step.bgColor || "#000" }}
    >
      {/* Fake progress bar at top */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-900">
        <div
          className="h-full bg-red-600 transition-all duration-1000 ease-linear"
          style={{ width: `${((stepIndex + 1) / prank.steps.length) * 100}%` }}
        />
      </div>

      {/* Main content */}
      <div
        className={`text-center max-w-md transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className={`text-2xl sm:text-4xl font-bold mb-4 font-[family-name:var(--font-geist-mono)] ${effectClass}`}>
          {step.text}
        </div>
        {step.subtext && (
          <div className="text-sm sm:text-base text-gray-300 whitespace-pre-line font-[family-name:var(--font-geist-mono)]">
            {step.subtext}
          </div>
        )}
      </div>

      {/* Fake system info */}
      <div className="fixed bottom-4 left-4 right-4 flex justify-between text-[10px] text-gray-700 font-[family-name:var(--font-geist-mono)]">
        <span>SYS_PROC: 0x{Math.random().toString(16).slice(2, 10)}</span>
        <span>KERNEL PANIC</span>
      </div>
    </div>
  );
}
