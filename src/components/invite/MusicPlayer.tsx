import { useEffect, useState, useRef } from "react";
import { Disc3, VolumeX } from "lucide-react";
import { invite } from "@/lib/invite.config";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let audio = document.getElementById("wedding-bg-audio") as HTMLAudioElement | null;
    if (!audio) {
      audio = document.createElement("audio");
      audio.id = "wedding-bg-audio";
      audio.loop = true;
      audio.preload = "auto";
      audio.src = invite.music?.track || "./asbg.mp3";
      document.body.appendChild(audio);
    }
    audio.volume = 0.75;
    audioRef.current = audio;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    if (!audio.paused) {
      setIsPlaying(true);
    }

    const startAudio = () => {
      if (audio && audio.paused) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            cleanupListeners();
          })
          .catch(() => {
            // Autoplay held by browser until user gesture
          });
      }
    };

    const cleanupListeners = () => {
      const events = ["click", "touchstart", "touchend", "pointerdown", "scroll", "keydown"];
      events.forEach((evt) => {
        window.removeEventListener(evt, startAudio, true);
        document.removeEventListener(evt, startAudio, true);
      });
    };

    const events = ["click", "touchstart", "touchend", "pointerdown", "scroll", "keydown"];
    events.forEach((evt) => {
      window.addEventListener(evt, startAudio, { passive: true, capture: true });
      document.addEventListener(evt, startAudio, { passive: true, capture: true });
    });

    // Attempt autoplay immediately
    startAudio();

    return () => {
      audio?.removeEventListener("play", onPlay);
      audio?.removeEventListener("pause", onPause);
      cleanupListeners();
    };
  }, []);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(console.error);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 sm:top-6 sm:right-6">
      <button
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
