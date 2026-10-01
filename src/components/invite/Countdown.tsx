import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { Ornament } from "./Ornament";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

export function Countdown({ iso }: { iso: string }) {
  const target = new Date(iso).getTime();
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const cells = [
    { label: "Days", value: t.days },
    { label: "Hours", value: t.hours },
    { label: "Minutes", value: t.minutes },
    { label: "Seconds", value: t.seconds },
  ];

  return (
    <section className="relative px-5 py-20 text-center">
      <Reveal>
        <p className="font-sans text-[0.68rem] tracking-[0.42em] text-brass uppercase">
          The lamps are lit in
        </p>
        <Ornament className="mt-5 text-brass" />
        <div className="mx-auto mt-8 grid max-w-md grid-cols-4 gap-2">
          {cells.map((c) => (
            <div
              key={c.label}
              className="relative rounded-sm border border-brass/25 bg-maroon/40 px-1 py-4 backdrop-blur-sm"
            >
              <span
                className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-brass/70 to-transparent"
                aria-hidden
              />
              <div
                className="font-display text-4xl leading-none font-medium tabular-nums shimmer-text sm:text-5xl"
                suppressHydrationWarning
              >
                {String(c.value).padStart(2, "0")}
              </div>
              <div className="mt-2 font-sans text-[0.55rem] tracking-[0.28em] text-paper/60 uppercase">
                {c.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
