"use client";

import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Mark premium as unlocked in localStorage
    localStorage.setItem("panicsim_premium", "true");
    setShow(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div
        className={`text-center max-w-sm transition-all duration-700 ${
          show ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold mb-2">Premium Unlocked!</h1>
        <p className="text-gray-400 text-sm mb-6">
          You now have access to all 6 pranks including Matrix Breach, Ransomware, and Ghost in the Machine.
        </p>
        <a
          href="/"
          className="block bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold py-4 rounded-xl hover:opacity-90 transition-opacity"
        >
          Start Pranking →
        </a>
      </div>
    </div>
  );
}
