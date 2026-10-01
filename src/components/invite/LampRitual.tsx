import { useCallback, useEffect, useRef, useState } from "react";
import { invite } from "@/lib/invite.config";
import { haptic, reducedMotion } from "@/lib/frame";
import { Ornament } from "./Ornament";
import { Reveal } from "./Reveal";

const HOLD_MS = 1150;

type Spark = { id: number; x: number; dx: number; delay: number; size: number; hue: number };

/**
 * "Light the lamp" — press and hold the diya to start the celebration.
 * A South Indian wedding begins with the kuthuvilakku being lit; here the guest
 * does it themselves: the flame catches, the page blooms gold, petals lift,
 * and the couple's blessing is revealed.
 */
export function LampRitual() {
  const [progress, setProgress] = useState(0);
  const [lit, setLit] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [flash, setFlash] = useState(false);

  const holding = useRef(false);
  const raf = useRef(0);
  const start = useRef(0);
  const buzzed = useRef(0);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const ignite = useCallback(() => {
    holding.current = false;
    cancelAnimationFrame(raf.current);
    setProgress(1);
    setLit(true);
    setFlash(true);
    window.setTimeout(() => setFlash(false), 260);
    haptic([14, 40, 22, 60, 40]);

    const burst: Spark[] = Array.from({ length: 26 }, (_, i) => ({
      id: Date.now() + i,
      x: 50 + (Math.random() - 0.5) * 26,
      dx: (Math.random() - 0.5) * 160,
      delay: Math.random() * 0.5,
      size: 4 + Math.random() * 7,
      hue: Math.random() > 0.45 ? 38 : 18,
    }));
    setSparks(burst);
    window.setTimeout(() => setSparks([]), 3800);
  }, []);

  const frame = useCallback(() => {
    const p = Math.min(1, (performance.now() - start.current) / HOLD_MS);
    setProgress(p);
    if (p > buzzed.current + 0.2) {
      buzzed.current = p;
      haptic(6);
    }
    if (p >= 1) return ignite();
    if (holding.current) raf.current = requestAnimationFrame(frame);
  }, [ignite]);

  const press = () => {
    if (lit) return;
    if (reducedMotion()) return ignite();
    holding.current = true;
    buzzed.current = 0;
    start.current = performance.now();
    haptic(8);
    raf.current = requestAnimationFrame(frame);
  };

  const release = () => {
    if (lit || !holding.current) return;
    holding.current = false;
    cancelAnimationFrame(raf.current);
    const decay = () => {
      setProgress((p) => {
        const next = p - 0.06;
        if (next > 0) {
          raf.current = requestAnimationFrame(decay);
          return next;
        }
        return 0;
      });
    };
    raf.current = requestAnimationFrame(decay);
  };

  const R = 62;
  const C = 2 * Math.PI * R;

  return (
    <section
      id="ritual"
      className="relative px-5 py-20 text-center select-none"
      aria-labelledby="ritual-title"
    >
      {/* screen-wide warm bloom on ignition — fades away and leaves the page warmer */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-30 transition-opacity"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, color-mix(in oklab, var(--color-brass) 60%, transparent) 0%, transparent 68%)",
          opacity: flash ? 0.9 : 0,
          transitionDuration: flash ? "180ms" : "2400ms",
        }}
      />


      <Reveal>
        <p
          id="ritual-title"
          className="font-sans text-[0.6rem] tracking-[0.45em] text-brass uppercase"
        >
          begin with light
        </p>
        <Ornament className="mt-5 text-brass" />
      </Reveal>

      <div className="relative mx-auto mt-10 flex h-64 w-full max-w-sm items-end justify-center">
        {/* sparks / marigold lift */}
        {sparks.map((s) => (
          <span
            key={s.id}
            aria-hidden
            className="pointer-events-none absolute bottom-28 rounded-[60%_10%_60%_10%]"
            style={{
              left: `${s.x}%`,
              width: s.size,
              height: s.size * 0.7,
              background: `hsl(${s.hue} 85% 62%)`,
              boxShadow: `0 0 12px hsl(${s.hue} 90% 60% / 0.8)`,
              ["--dx" as string]: `${s.dx}px`,
              animation: `spark-rise 3.4s cubic-bezier(0.22,0.9,0.28,1) ${s.delay}s forwards`,
            }}
          />
        ))}

        <button
          type="button"
          onPointerDown={press}
          onPointerUp={release}
          onPointerLeave={release}
          onPointerCancel={release}
          onContextMenu={(e) => e.preventDefault()}
          aria-pressed={lit}
          aria-label={lit ? "The lamp is lit" : "Press and hold to light the lamp"}
          className="relative flex h-56 w-56 touch-none items-end justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-brass/70"
        >
          {/* hold progress ring */}
          <svg
            viewBox="0 0 140 140"
            aria-hidden
            className="absolute inset-0 h-full w-full -rotate-90"
          >
            <circle cx="70" cy="70" r={R} fill="none" stroke="currentColor" strokeWidth="1" className="text-brass/20" />
            <circle
              cx="70"
              cy="70"
              r={R}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-brass"
              style={{
                strokeDasharray: C,
                strokeDashoffset: C * (1 - progress),
                opacity: lit ? 0.5 : 1,
                transition: "opacity 700ms ease",
              }}
            />
          </svg>

          {/* halo */}
          <span
            aria-hidden
            className="absolute bottom-16 h-40 w-40 rounded-full transition-all duration-700"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--color-brass) 55%, transparent) 0%, transparent 70%)",
              opacity: lit ? 0.9 : 0.1 + progress * 0.5,
              transform: `scale(${0.7 + progress * 0.5})`,
            }}
          />

          {/* flame */}
          <span
            aria-hidden
            className="absolute bottom-[6.6rem] h-12 w-7 origin-bottom rounded-[50%_50%_45%_45%/60%_60%_40%_40%]"
            style={{
              background:
                "radial-gradient(ellipse at 50% 75%, #fff6d8 0%, #ffcf5c 38%, #f08a1d 68%, rgba(240,80,20,0) 78%)",
              filter: "blur(0.4px)",
              opacity: lit ? 1 : progress * 0.55,
              transform: `scaleY(${0.45 + progress * 0.55})`,
              animation: lit ? "lamp-flicker 1.6s ease-in-out infinite" : undefined,
              boxShadow: lit ? "0 0 42px 12px rgba(255,178,60,0.45)" : undefined,
            }}
          />

          {/* brass diya */}
          <svg viewBox="0 0 200 120" aria-hidden className="relative w-44">
            <defs>
              <linearGradient id="brassBody" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e8bd6d" />
                <stop offset="45%" stopColor="#a9762c" />
                <stop offset="70%" stopColor="#f0d190" />
                <stop offset="100%" stopColor="#7d5117" />
              </linearGradient>
            </defs>
            <path
              d="M18 40 C18 34 24 30 34 30 L166 30 C176 30 182 34 182 40 C182 46 176 50 166 50 L34 50 C24 50 18 46 18 40 Z"
              fill="url(#brassBody)"
            />
            <path
              d="M30 50 C34 86 60 104 100 104 C140 104 166 86 170 50 Z"
              fill="url(#brassBody)"
            />
            <path d="M92 12 L100 30 L108 12 C104 20 96 20 92 12 Z" fill="url(#brassBody)" />
            <ellipse cx="100" cy="110" rx="52" ry="7" fill="#00000055" />
          </svg>
        </button>
      </div>

      <p
        className="mt-2 font-sans text-[0.58rem] tracking-[0.34em] text-paper/70 uppercase transition-opacity duration-500"
        style={{ opacity: lit ? 0 : 1 }}
        aria-hidden={lit}
      >
        press &amp; hold the lamp
      </p>

      <div
        className="mx-auto mt-6 max-w-sm transition-all duration-1000"
        style={{
          opacity: lit ? 1 : 0,
          transform: lit ? "none" : "translateY(16px)",
        }}
        aria-hidden={!lit}
      >
        <p className="font-script text-3xl text-brass">Deepam ஏற்றியாச்சு</p>
        <p className="mt-3 font-serif text-lg text-paper/85 italic">
          The lamp is lit. May {invite.coupleLine[0]} &amp; {invite.coupleLine[1]} walk into a life
          as warm as this flame.
        </p>
        <a
          href="#venue"
          className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full border border-brass/50 px-7 font-sans text-[0.6rem] tracking-[0.3em] text-brass uppercase transition-transform active:scale-95"
        >
          view the venue
        </a>

      </div>
    </section>
  );
}
