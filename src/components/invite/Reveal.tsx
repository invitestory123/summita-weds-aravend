import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** delay in ms */
  delay?: number;
  from?: "up" | "left" | "right" | "scale";
};

const offsets: Record<NonNullable<Props["from"]>, string> = {
  up: "translate3d(0, 42px, 0)",
  left: "translate3d(-36px, 0, 0)",
  right: "translate3d(36px, 0, 0)",
  scale: "scale(0.94)",
};

export function Reveal({ children, className, delay = 0, from = "up" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : offsets[from],
        transition: `opacity 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1000ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
