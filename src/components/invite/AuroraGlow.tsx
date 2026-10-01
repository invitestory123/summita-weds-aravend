import { lazy, Suspense, useEffect, useState } from "react";

const Aurora = lazy(() => import("../Aurora"));

/** WebGL aurora glow, mounted only after hydration. */
export function AuroraGlow() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setReady(true), 300);
    return () => clearTimeout(id);
  }, []);

  if (!ready) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] opacity-55 mix-blend-screen"
    >
      <Suspense fallback={null}>
        <Aurora colorStops={["#7b1f2b", "#c9922f", "#1f6b4a"]} amplitude={0.9} blend={0.6} speed={0.4} />
      </Suspense>
    </div>
  );
}
