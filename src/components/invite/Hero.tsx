import { useEffect, useRef, useState } from "react";
import { invite } from "@/lib/invite.config";
const heroFlatlay = "https://media.invitestory.in/toran-telugu/src/assets/hero-flatlay.jpg";
const jasmine = "https://media.invitestory.in/toran-telugu/src/assets/jasmine-strand.png";
import { PetalField } from "./PetalField";
import { AuroraGlow } from "./AuroraGlow";
import { Ornament } from "./Ornament";
import { isTouch, lerp, reducedMotion, useFrame } from "@/lib/frame";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const bg = useRef<HTMLImageElement>(null);
  const leaf1 = useRef<HTMLImageElement>(null);
  const leaf2 = useRef<HTMLImageElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const cue = useRef<HTMLAnchorElement>(null);
  const eased = useRef(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setMounted(true);
    setAnimate(!reducedMotion());
  }, []);

  // Parallax runs on the shared rAF loop and is eased frame-by-frame, so it
  // stays glued to Lenis' smoothed scroll instead of jumping with raw events.
  useFrame(() => {
    const y = window.scrollY;
    if (y > window.innerHeight * 1.2 && eased.current > window.innerHeight * 1.2) return;
    eased.current = lerp(eased.current, y, 0.16);
    const s = eased.current;
    const depth = isTouch() ? 0.62 : 1; // gentler on phones
    if (bg.current) {
      bg.current.style.transform = `translate3d(0, ${s * 0.28 * depth}px, 0) scale(1.12)`;
    }
    if (leaf1.current) {
      leaf1.current.style.transform = `translate3d(0, ${s * -0.12 * depth}px, 0) rotate(8deg)`;
    }
    if (leaf2.current) {
      leaf2.current.style.transform = `translate3d(0, ${s * -0.18 * depth}px, 0) rotate(-12deg) scaleX(-1)`;
    }
    if (content.current) {
      content.current.style.opacity = String(Math.max(0, 1 - s / 480));
      content.current.style.transform = `translate3d(0, ${s * 0.08}px, 0)`;
    }
    if (cue.current) {
      cue.current.style.opacity = String(Math.max(0, 1 - s / 240));
    }
  }, animate);

  const [first, second] = invite.coupleLine;

  return (
    <header className="grain relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 text-center">
      <img
        ref={bg}
        src={heroFlatlay}
        alt=""
        aria-hidden
        width={1088}
        height={1600}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        style={{ transform: "scale(1.12)" }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-maroon-deep/75 via-maroon-deep/55 to-maroon-deep"
        aria-hidden
      />
      <AuroraGlow />
      <PetalField count={16} />

      <img
        ref={leaf1}
        src={jasmine}
        alt=""
        aria-hidden
        width={512}
        height={1024}
        className="pointer-events-none absolute -top-16 -left-10 w-28 opacity-80 will-change-transform sm:w-36"
        style={{
          transform: "rotate(8deg)",
          filter: "drop-shadow(0 12px 24px rgba(0,0,0,.45))",
        }}
      />
      <img
        ref={leaf2}
        src={jasmine}
        alt=""
        aria-hidden
        width={512}
        height={1024}
        className="pointer-events-none absolute -top-24 -right-8 w-24 opacity-70 will-change-transform sm:w-32"
        style={{
          transform: "rotate(-12deg) scaleX(-1)",
          filter: "drop-shadow(0 12px 24px rgba(0,0,0,.45))",
        }}
      />

      <div ref={content} className="relative z-10 w-full max-w-lg will-change-transform">
        <p
          className="font-sans text-[0.6rem] tracking-[0.5em] text-brass-soft/80 uppercase transition-all duration-1000"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(12px)" }}
        >
          {invite.intro}
        </p>

        <Ornament className="mt-6 text-brass" />

        <h1 className="mt-8 flex flex-col items-center leading-[0.82]">
          <Word text={first} mounted={mounted} delay={200} />
          <span
            className="my-1 font-script text-4xl text-brass transition-all duration-1000 sm:text-5xl"
            style={{
              transitionDelay: "700ms",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "scale(0.8)",
            }}
          >
            and
          </span>
          <Word text={second} mounted={mounted} delay={900} />
        </h1>

        <p
          className="mt-8 font-sans text-[0.62rem] tracking-[0.36em] text-paper/75 uppercase transition-all duration-1000"
          style={{
            transitionDelay: "1500ms",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateY(10px)",
          }}
        >
          invite you to celebrate their wedding
        </p>

        <div
          className="mt-7 flex items-center justify-center gap-4 font-serif text-paper transition-all duration-1000"
          style={{
            transitionDelay: "1700ms",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateY(10px)",
          }}
        >
          <span className="text-sm tracking-[0.2em] uppercase">{invite.dateLabel.day}</span>
          <span className="h-8 w-px bg-brass/40" aria-hidden />
          <span className="text-center">
            <span className="block font-display text-4xl leading-none text-brass">
              {invite.dateLabel.number}
            </span>
            <span className="block text-[0.6rem] tracking-[0.28em] uppercase">
              {invite.dateLabel.monthYear}
            </span>
          </span>
          <span className="h-8 w-px bg-brass/40" aria-hidden />
          <span className="text-sm tracking-[0.2em] uppercase">{invite.dateLabel.time}</span>
        </div>
      </div>

      <a
        ref={cue}
        href="#invitation"
        className="absolute bottom-6 z-10 flex min-h-12 flex-col items-center justify-end gap-2 px-6 text-brass/80"
      >
        <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase">scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-brass/25">
          <span className="absolute inset-x-0 top-0 h-4 animate-[petal-fall_2.4s_ease-in-out_infinite] bg-brass" />
        </span>
      </a>
    </header>
  );
}

function Word({ text, mounted, delay }: { text: string; mounted: boolean; delay: number }) {
  return (
    <span className="flex justify-center overflow-hidden">
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="font-display text-[clamp(3.4rem,17vw,6.5rem)] font-semibold tracking-[0.02em] text-paper uppercase"
          style={{
            display: "inline-block",
            transition: "transform 900ms cubic-bezier(0.16,1,0.3,1), opacity 700ms ease",
            transitionDelay: `${delay + i * 65}ms`,
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateY(90%) rotate(6deg)",
            textShadow: "0 8px 30px rgba(0,0,0,.5)",
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}
