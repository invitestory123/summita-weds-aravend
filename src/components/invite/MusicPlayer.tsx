import { useEffect, useState, useRef } from "react";
import { Disc3, VolumeX } from "lucide-react";
import { invite } from "@/lib/invite.config";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const audio = document.getElementById("wedding-bg-audio") as HTMLAudioElement | null;
    if (!audio) return;

    const onPlay = () => {
      setIsPlaying(true);
      setShowPrompt(false);
    };
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    if (!audio.paused) {
      setIsPlaying(true);
    } else {
      const timer = setTimeout(() => {
        if (audio.paused) {
          setShowPrompt(true);
        }
      }, 1500);
      return () => {
        clearTimeout(timer);
        audio.removeEventListener("play", onPlay);
        audio.removeEventListener("pause", onPause);
      };
    }

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPrompt(false);
    const w = (window as unknown as { weddingAudio?: { toggle: () => void } }).weddingAudio;
    if (w) {
      w.toggle();
    } else {
      const audio = document.getElementById("wedding-bg-audio") as HTMLAudioElement | null;
      if (audio) {
        if (audio.paused) {
          audio.play().catch(console.error);
        } else {
          audio.pause();
        }
      }
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 sm:top-6 sm:right-6">
      {showPrompt && !isPlaying && (
        <button
          type="button"
          onClick={toggleMusic}
          className="animate-pulse rounded-full border border-brass/60 bg-maroon-deep/90 px-3 py-1 text-xs font-serif tracking-wider text-brass shadow-lg backdrop-blur-md transition-all hover:bg-maroon-deep active:scale-95"
        >
          ♫ Play Music
        </button>
      )}

      <button
        id="music-toggle-btn"
        type="button"
        onClick={toggleMusic}
        aria-label={isPlaying ? "Mute background music" : "Play background music"}
        title={isPlaying ? "Mute background music" : "Play background music"}
        className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-brass/50 bg-maroon-deep/85 text-brass shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-brass hover:bg-maroon-deep active:scale-95 sm:h-12 sm:w-12"
      >
        {isPlaying ? (
          <>
            <span className="absolute inset-0 rounded-full border border-brass/40 animate-ping opacity-30 pointer-events-none" />
            <Disc3 className="h-5 w-5 animate-[spin_4s_linear_infinite] text-brass sm:h-6 sm:w-6" />
          </>
        ) : (
          <VolumeX className="h-5 w-5 text-brass/70 transition-transform group-hover:scale-110 sm:h-6 sm:w-6" />
        )}
      </button>
    </div>
  );
}
