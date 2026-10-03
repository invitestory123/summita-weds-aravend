import { useState, useEffect } from "react";
import { invite } from "@/lib/invite.config";
import { Ornament } from "./Ornament";
import { Volume2, Sparkles } from "lucide-react";
import paper from "@/assets/paper-texture.jpg";

interface OpenInvitationProps {
  onOpen?: () => void;
}

export function OpenInvitation({ onOpen }: OpenInvitationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Lock background scrolling while the welcome card is visible
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleOpen = () => {
    if (isFading || isOpen) return;

    // Start background music immediately within the user gesture context
    try {
      const w = (window as unknown as { weddingAudio?: { play: () => void } }).weddingAudio;
      if (w && typeof w.play === "function") {
        w.play();
      } else {
        const audio = document.getElementById("wedding-bg-audio") as HTMLAudioElement | null;
        if (audio) {
          audio.muted = false;
          audio.play().catch(console.error);
        }
      }
    } catch (e) {
      console.error("Audio playback error:", e);
    }

    setIsFading(true);
    if (onOpen) onOpen();

    setTimeout(() => {
      setIsOpen(true);
      document.body.style.overflow = "";
    }, 700);
  };

  if (isOpen) return null;

  return (
    <aside
      aria-label="Welcome Invitation Gate"
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-all duration-700 ease-out ${
        isFading
          ? "opacity-0 scale-105 pointer-events-none"
          : "opacity-100 scale-100 bg-maroon-deep/95 backdrop-blur-md"
      }`}
    >
      {/* Decorative Aura Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,146,47,0.18)_0%,transparent_70%)] pointer-events-none" />

      {/* Main Royal Invitation Envelope Card */}
      <div
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleOpen();
          }
        }}
        className="deckle grain relative mx-auto w-full max-w-sm cursor-pointer rounded-2xl border border-brass/40 px-6 py-10 text-center shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] sm:max-w-md sm:px-8 sm:py-12 transition-transform duration-300 hover:scale-[1.01] active:scale-[0.99]"
        style={{
          backgroundImage: `url(${paper})`,
          backgroundSize: "cover",
        }}
      >
        {/* Ornate corner accents */}
        <div className="absolute top-3 left-3 h-5 w-5 border-t-2 border-l-2 border-brass/60" />
        <div className="absolute top-3 right-3 h-5 w-5 border-t-2 border-r-2 border-brass/60" />
        <div className="absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-brass/60" />
        <div className="absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-brass/60" />

        {/* Intro Tag */}
        <p className="font-sans text-[0.62rem] font-medium tracking-[0.32em] text-ink/75 uppercase">
          {invite.intro}
        </p>

        {/* Traditional Ornament */}
        <Ornament className="mx-auto mt-3 h-4 text-maroon" />

        {/* Couple Names */}
        <div className="mt-5 space-y-1">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold tracking-wide text-maroon">
            {invite.coupleLine[0]}
          </h1>
          <span className="font-serif text-xl sm:text-2xl italic text-brass/90">&amp;</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-wide text-maroon">
            {invite.coupleLine[1]}
          </h2>
        </div>

        {/* Date & Location */}
        <div className="mt-6 border-y border-brass/30 py-3">
          <p className="font-serif text-base sm:text-lg text-ink/90 font-medium">
            {invite.dateLabel.day}, {invite.dateLabel.number} {invite.dateLabel.monthYear}
          </p>
          <p className="mt-1 font-sans text-xs tracking-wider text-ink/70">
            {invite.venue.name} · {invite.city}
          </p>
        </div>

        {/* Open CTA Button */}
        <div className="mt-7">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleOpen();
            }}
            className="group relative inline-flex items-center gap-2.5 rounded-full border border-brass/60 bg-gradient-to-r from-maroon to-maroon-deep px-7 py-3 font-serif text-base font-medium tracking-wide text-brass shadow-[0_8px_25px_rgba(42,11,14,0.6)] transition-all duration-300 hover:scale-105 hover:border-brass hover:shadow-[0_10px_30px_rgba(201,146,47,0.35)] active:scale-95"
          >
            <Sparkles className="h-4 w-4 animate-spin text-brass/80 duration-1000" />
            <span>Open Invitation</span>
            <Volume2 className="h-4 w-4 text-brass/80" />
          </button>
          <p className="mt-3 text-[0.65rem] font-sans tracking-widest text-ink/60 uppercase">
            Tap to open &amp; play music ♫
          </p>
        </div>
      </div>
    </aside>
  );
}
