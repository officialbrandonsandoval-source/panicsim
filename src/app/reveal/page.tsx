"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { getPrankById } from "@/lib/pranks";

function RevealContent() {
  const searchParams = useSearchParams();
  const prankId = searchParams.get("p");
  const from = searchParams.get("from");
  const prank = prankId ? getPrankById(prankId) : null;
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Brief delay before showing the reveal for dramatic effect
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div
        className={`text-center max-w-sm transition-all duration-700 ${
          showContent ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="text-7xl mb-6">😂</div>
        <h1 className="text-3xl font-bold mb-2">YOU GOT PRANKED!</h1>
        {from && (
          <p className="text-gray-400 mb-1">
            by <span className="text-white font-semibold">{from}</span>
          </p>
        )}
        {prank && (
          <p className="text-gray-600 text-sm mb-8">
            Prank: {prank.icon} {prank.name}
          </p>
        )}

        <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-5 mb-6">
          <p className="text-sm text-gray-400 mb-1">Your device is completely fine.</p>
          <p className="text-xs text-gray-600">No data was accessed. Nothing was harmed. It was all fake.</p>
        </div>

        {/* Viral CTA */}
        <a
          href="/"
          className="block bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 transition-colors text-base mb-3"
        >
          🔥 Get Them Back — Prank a Friend
        </a>

        <a
          href="/"
          className="block text-gray-500 hover:text-gray-300 text-sm transition-colors"
        >
          Create your own prank →
        </a>

        {/* Social proof / share buttons */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <p className="text-xs text-gray-600 mb-3">Share this moment</p>
          <div className="flex gap-2 justify-center">
            <ShareButton
              label="Copy Link"
              onClick={() => {
                const url = typeof window !== "undefined" ? window.location.origin : "";
                navigator.clipboard.writeText(url);
              }}
            />
            <ShareButton
              label="Share"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "I just got pranked on PanicSim",
                    text: "You have to try this — send a fake virus to your friend",
                    url: typeof window !== "undefined" ? window.location.origin : "",
                  });
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ShareButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-xs text-gray-400 hover:text-white hover:border-gray-500 transition-all"
    >
      {label}
    </button>
  );
}

export default function RevealPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-gray-600 text-sm">Loading...</div>
        </div>
      }
    >
      <RevealContent />
    </Suspense>
  );
}
