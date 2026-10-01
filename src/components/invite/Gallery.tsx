import { useEffect, useState } from "react";
import { X } from "lucide-react";
const c1 = "https://media.invitestory.in/toran-telugu/src/assets/couple-1.jpg";
const c2 = "https://media.invitestory.in/toran-telugu/src/assets/couple-2.jpg";
const c3 = "https://media.invitestory.in/toran-telugu/src/assets/couple-3.jpg";
const c4 = "https://media.invitestory.in/toran-telugu/src/assets/couple-4.jpg";
import { Reveal } from "./Reveal";
import { Ornament } from "./Ornament";

const photos = [
  { src: c1, alt: "The couple at a temple corridor at golden hour" },
  { src: c2, alt: "The couple laughing in the Nilgiris tea hills" },
  { src: c3, alt: "Mehendi-covered hands held together" },
  { src: c4, alt: "A gopuram at dawn with brass lamps" },
];

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section id="gallery" className="relative py-20">
      <Reveal className="px-5 text-center">
        <p className="font-sans text-[0.6rem] tracking-[0.42em] text-brass uppercase">moments</p>
        <Ornament className="mt-4 text-brass" />
      </Reveal>

      <div
        data-lenis-prevent
        data-lenis-prevent-touch
        className="h-scroll mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative aspect-[3/4] w-[72vw] max-w-xs shrink-0 snap-center overflow-hidden rounded-sm border border-brass/20"
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              width={912}
              height={1200}
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
            />
            <span
              className="absolute inset-0 bg-gradient-to-t from-maroon-deep/70 via-transparent to-transparent"
              aria-hidden
            />
          </button>
        ))}
      </div>
      <p className="px-5 text-center font-sans text-[0.55rem] tracking-[0.3em] text-paper/40 uppercase">
        swipe · tap to enlarge
      </p>

      {open !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-maroon-deep/95 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute top-5 right-5 text-brass"
            aria-label="Close"
            onClick={() => setOpen(null)}
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={photos[open]!.src}
            alt={photos[open]!.alt}
            className="max-h-[85vh] w-auto rounded-sm animate-scale-in"
          />
        </div>
      ) : null}
    </section>
  );
}
