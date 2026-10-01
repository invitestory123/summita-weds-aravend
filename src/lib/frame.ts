import { useEffect } from "react";

type Fn = (t: number) => void;

const subs = new Set<Fn>();
let raf = 0;

function tick(t: number) {
  subs.forEach((fn) => fn(t));
  raf = subs.size ? requestAnimationFrame(tick) : 0;
}

/**
 * One shared rAF loop for every scroll-linked effect on the page.
 * Cheaper on mid-range Android than a scroll listener per component.
 */
export function subscribeFrame(fn: Fn) {
  subs.add(fn);
  if (!raf) raf = requestAnimationFrame(tick);
  return () => {
    subs.delete(fn);
    if (!subs.size && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };
}

export function useFrame(fn: Fn, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    return subscribeFrame(fn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);
}

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function reducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Coarse pointers (phones) get gentler parallax so nothing feels sea-sick. */
export function isTouch() {
  return typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
}

export function haptic(pattern: number | number[]) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      /* ignore */
    }
  }
}
