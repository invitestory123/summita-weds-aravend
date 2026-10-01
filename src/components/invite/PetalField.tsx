import { useEffect, useState } from "react";

type Petal = {
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
  opacity: number;
};

/** Drifting jasmine petals. Client-only so SSR markup stays deterministic. */
export function PetalField({ count = 14 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPetals(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        delay: -Math.random() * 22,
        duration: 20 + Math.random() * 18,
        size: 4 + Math.random() * 5,
        drift: (Math.random() - 0.5) * 160,
        opacity: 0.12 + Math.random() * 0.28,

      })),
    );
  }, [count]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute top-0 rounded-[60%_10%_60%_10%] bg-paper blur-[1px]"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.62,
            opacity: p.opacity,
            ["--drift" as string]: `${p.drift}px`,
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
