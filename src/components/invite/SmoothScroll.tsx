import { useEffect } from "react";

type LenisLike = {
  raf: (t: number) => void;
  destroy: () => void;
  scrollTo: (target: string | HTMLElement | number, opts?: Record<string, unknown>) => void;
};

/**
 * Lenis smooth scrolling tuned for touch devices, mounted once on the client.
 * Also takes over in-page anchor jumps so every #link glides instead of snapping.
 * Disabled automatically when the user prefers reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let lenis: LenisLike | null = null;
    let cancelled = false;
    let onClick: ((e: MouseEvent) => void) | null = null;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const instance = new Lenis({
        // Slightly shorter, snappier glide: long durations feel laggy on phones.
        duration: 1,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
        smoothWheel: true,
        // Smooths native touch momentum so parallax layers track the finger.
        syncTouch: true,
        syncTouchLerp: 0.085,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
        gestureOrientation: "vertical",
      }) as unknown as LenisLike;
      lenis = instance;

      const loop = (time: number) => {
        instance.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      onClick = (e: MouseEvent) => {
        const anchor = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]');
        if (!anchor) return;
        const id = anchor.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        instance.scrollTo(target as HTMLElement, {
          offset: -8,
          duration: 1.5,
          easing: (t: number) => 1 - Math.pow(1 - t, 5),
        });
      };
      document.addEventListener("click", onClick);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      if (onClick) document.removeEventListener("click", onClick);
      lenis?.destroy();
    };
  }, []);

  return null;
}
