"use client";

import { useState, useEffect } from "react";
import { PRANKS, getFreePranks, getPremiumPranks } from "@/lib/pranks";

export default function Home() {
  const [selectedPrank, setSelectedPrank] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    setIsPremium(localStorage.getItem("panicsim_premium") === "true");
  }, []);

  const freePranks = getFreePranks();
  const premiumPranks = getPremiumPranks();

  const generateLink = () => {
    if (!selectedPrank) return "";
    const base = typeof window !== "undefined" ? window.location.origin : "";
    const params = new URLSearchParams({ p: selectedPrank });
    if (senderName.trim()) params.set("from", senderName.trim());
    return `${base}/prank?${params.toString()}`;
  };

  const copyLink = async () => {
    const link = generateLink();
    if (!link) return;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLink = async () => {
    const link = generateLink();
    if (!link) return;
    if (navigator.share) {
      await navigator.share({
        title: "Check this out...",
        text: "Someone sent you something important",
        url: link,
      });
    } else {
      copyLink();
    }
  };

  return (
    <div className="min-h-screen bg-black font-[family-name:var(--font-geist-sans)]">
      {/* Hero */}
      <div className="max-w-2xl mx-auto px-4 pt-16 pb-8 text-center">
        <div className="text-6xl mb-4">💀</div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
          PanicSim
        </h1>
        <p className="text-lg text-gray-400 mb-2">
          Send your friends a link they&apos;ll never forget.
        </p>
        <p className="text-sm text-gray-600">
          Fake virus scans. FBI warnings. Total system meltdowns. All harmless.
        </p>
      </div>

      {/* Prank Selector */}
      <div className="max-w-2xl mx-auto px-4 pb-6">
        <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Choose a prank</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {freePranks.map((prank) => (
            <button
              key={prank.id}
              onClick={() => setSelectedPrank(prank.id)}
              className={`p-4 rounded-xl border text-left transition-all ${
                selectedPrank === prank.id
                  ? "border-red-500 bg-red-500/10 shadow-lg shadow-red-500/20"
                  : "border-gray-800 bg-gray-900/50 hover:border-gray-600"
              }`}
            >
              <div className="text-2xl mb-2">{prank.icon}</div>
              <div className="font-semibold text-sm">{prank.name}</div>
              <div className="text-xs text-gray-500 mt-1">{prank.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Premium Pranks */}
      <div className="max-w-2xl mx-auto px-4 pb-6">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-sm uppercase tracking-wider text-gray-500">Premium pranks</h2>
          <span className="text-[10px] bg-gradient-to-r from-amber-500 to-orange-500 text-black px-2 py-0.5 rounded-full font-bold">
            {isPremium ? "UNLOCKED" : "$2.99"}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {premiumPranks.map((prank) => (
            <button
              key={prank.id}
              onClick={() => setSelectedPrank(prank.id)}
              className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
                selectedPrank === prank.id
                  ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/20"
                  : "border-gray-800 bg-gray-900/50 hover:border-gray-600"
              }`}
            >
              <div className="text-2xl mb-2">{prank.icon}</div>
              <div className="font-semibold text-sm">{prank.name}</div>
              <div className="text-xs text-gray-500 mt-1">{prank.description}</div>
              <div className="absolute top-2 right-2 text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-mono">
                PRO
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Config + Share */}
      {selectedPrank && (
        <div className="max-w-2xl mx-auto px-4 pb-16">
          <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-6 space-y-4">
            <div>
              <label className="text-sm text-gray-400 block mb-1.5">Your name (optional)</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Who's pranking?"
                maxLength={30}
                className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>

            {/* Link Preview */}
            <div className="bg-black/50 rounded-lg p-3 font-mono text-xs text-gray-400 break-all">
              {generateLink()}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={copyLink}
                className="flex-1 bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                {copied ? "Copied!" : "Copy Link"}
              </button>
              <button
                onClick={shareLink}
                className="flex-1 bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Share
              </button>
            </div>

            {/* Premium Gate */}
            {PRANKS.find((p) => p.id === selectedPrank)?.premium && !isPremium && (
              <a
                href="/api/checkout"
                className="block text-center bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold py-3 rounded-lg hover:opacity-90 transition-opacity text-sm"
              >
                Unlock Premium Pranks — $2.99
              </a>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-gray-700">
        PanicSim — 100% harmless pranks. No real data is accessed or harmed.
      </footer>
    </div>
  );
}
