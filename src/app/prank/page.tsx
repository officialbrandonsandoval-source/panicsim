"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useCallback } from "react";
import { getPrankById } from "@/lib/pranks";
import PrankEngine from "@/components/PrankEngine";

function PrankContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const prankId = searchParams.get("p");
  const from = searchParams.get("from");
  const [started, setStarted] = useState(false);

  const prank = prankId ? getPrankById(prankId) : null;

  const handleComplete = useCallback(() => {
    const params = new URLSearchParams();
    params.set("p", prankId || "");
    if (from) params.set("from", from);
    router.push(`/reveal?${params.toString()}`);
  }, [prankId, from, router]);

  if (!prank) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="text-4xl mb-4">🤔</div>
          <p className="text-gray-400">Invalid prank link</p>
          <a href="/" className="text-red-500 underline text-sm mt-2 inline-block">
            Create your own prank
          </a>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <div className="text-center max-w-sm">
          {from && (
            <p className="text-gray-500 text-sm mb-6">
              {from} sent you something...
            </p>
          )}
          <div className="text-5xl mb-4">⚠️</div>
          <h1 className="text-xl font-bold mb-2">System Alert</h1>
          <p className="text-gray-400 text-sm mb-6">
            A critical notification requires your attention.
          </p>
          <button
            onClick={() => setStarted(true)}
            className="bg-red-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-red-700 transition-colors text-sm w-full"
          >
            View Alert
          </button>
        </div>
      </div>
    );
  }

  return <PrankEngine prank={prank} onComplete={handleComplete} />;
}

export default function PrankPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-gray-600 text-sm">Loading...</div>
        </div>
      }
    >
      <PrankContent />
    </Suspense>
  );
}
