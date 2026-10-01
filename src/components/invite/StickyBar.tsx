import { useEffect, useState } from "react";
import { CalendarPlus, MapPin } from "lucide-react";
import { invite } from "@/lib/invite.config";
import { downloadIcs, googleCalendarUrl, isAppleDevice } from "@/lib/calendar";

export function StickyBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const main = invite.events[invite.events.length - 1]!;
  const entry = {
    title: `${invite.coupleLine.join(" & ")} — ${main.name}`,
    description: `${invite.hashtag} · ${main.description}`,
    location: `${main.venue}, ${main.address}`,
    start: main.start,
    end: main.end,
  };

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 transition-all duration-500"
      style={{
        transform: show ? "translateY(0)" : "translateY(140%)",
        opacity: show ? 1 : 0,
      }}
      aria-label="Quick actions"
    >
      <div className="mx-auto flex max-w-md items-stretch gap-1 rounded-full border border-brass/30 bg-maroon-deep/85 p-1.5 backdrop-blur-md">
        <button

          type="button"
          onClick={() =>
            isAppleDevice() ? downloadIcs(entry) : window.open(googleCalendarUrl(entry), "_blank", "noopener")
          }
          className="flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-full font-sans text-[0.58rem] tracking-[0.18em] text-paper uppercase transition-transform duration-150 active:scale-95"
        >
          <CalendarPlus className="h-4 w-4 text-brass" aria-hidden />
          Save date
        </button>
        <a
          href={invite.venue.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(invite.venue.mapQuery)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-full bg-brass font-sans text-[0.58rem] tracking-[0.18em] text-primary-foreground uppercase transition-transform duration-150 active:scale-95"
        >
          <MapPin className="h-4 w-4" aria-hidden />
          Directions
        </a>
      </div>

    </nav>
  );
}
