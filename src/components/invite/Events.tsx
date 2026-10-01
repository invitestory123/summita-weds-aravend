import { CalendarPlus, Clock, MapPin } from "lucide-react";
import { invite } from "@/lib/invite.config";
import { downloadIcs, googleCalendarUrl, isAppleDevice } from "@/lib/calendar";
import { Reveal } from "./Reveal";
import { Ornament } from "./Ornament";

function formatTime(iso: string) {
  const formatted = new Date(iso).toLocaleString("en-MY", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: invite.timeZone || "Asia/Kuala_Lumpur",
  });
  return `${formatted} onwards`;
}

export function Events() {
  const events = invite.events.filter((e) => e.id === "muhurtham");

  return (
    <section id="events" className="relative px-5 py-20">
      <Reveal className="text-center">
        <p className="font-sans text-[0.6rem] tracking-[0.42em] text-brass uppercase">
          the celebration
        </p>
        <Ornament className="mt-4 text-brass" />
      </Reveal>

      <div className="mx-auto mt-10 grid max-w-md gap-5">
        {events.map((e, i) => (
          <Reveal key={e.id} delay={i * 80}>
            <div className="relative">
              <span
                aria-hidden
                className="absolute -inset-[3px] rounded-sm bg-gradient-to-br from-brass/70 via-brass/20 to-brass/70 blur-[2px]"
              />
              <span
                aria-hidden
                className="absolute -inset-6 -z-10 rounded-full bg-brass/10 blur-3xl"
              />
              <article className="group relative overflow-hidden rounded-sm border border-brass/60 bg-maroon/60 p-6 shadow-[0_18px_60px_-20px_rgba(0,0,0,0.75)] backdrop-blur-sm transition-colors duration-500">
                <span className="mb-4 inline-block rounded-full border border-brass/50 bg-brass/15 px-3 py-1 font-sans text-[0.55rem] tracking-[0.3em] text-brass uppercase">
                  Muhurtham
                </span>

              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-3xl tracking-wide text-paper uppercase">
                  {e.name}
                </h3>
                {e.tamil ? (
                  <span className="font-serif text-sm text-brass/80">{e.tamil}</span>
                ) : null}
              </div>
              <p className="mt-2 font-sans text-sm text-paper/60">{e.description}</p>

              <dl className="mt-5 space-y-2 font-sans text-[0.78rem] text-paper/80">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-brass" aria-hidden />
                  <dd>{formatTime(e.start)}</dd>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brass" aria-hidden />
                  <dd>
                    {e.venue}
                    <span className="block text-paper/50">{e.address}</span>
                  </dd>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full ring-1 ring-paper/30"
                    style={{ backgroundColor: e.dressColor }}
                    aria-hidden
                  />
                  <dd>{e.dressCode}</dd>
                </div>
              </dl>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const entry = {
                      title: `${e.name} — ${invite.coupleLine.join(" & ")}`,
                      description: e.description,
                      location: `${e.venue}, ${e.address}`,
                      start: e.start,
                      end: e.end,
                    };
                    if (isAppleDevice()) downloadIcs(entry);
                    else window.open(googleCalendarUrl(entry), "_blank", "noopener");
                  }}
                  className="inline-flex items-center gap-2 rounded-sm bg-brass px-4 py-2.5 font-sans text-[0.62rem] tracking-[0.22em] text-primary-foreground uppercase transition-transform duration-200 active:scale-[0.97]"
                >
                  <CalendarPlus className="h-3.5 w-3.5" aria-hidden />
                  Add to calendar
                </button>
                <button
                  type="button"
                  onClick={() =>
                    downloadIcs({
                      title: `${e.name} — ${invite.coupleLine.join(" & ")}`,
                      description: e.description,
                      location: `${e.venue}, ${e.address}`,
                      start: e.start,
                      end: e.end,
                    })
                  }
                  className="inline-flex items-center gap-2 rounded-sm border border-brass/40 px-4 py-2.5 font-sans text-[0.62rem] tracking-[0.22em] text-brass uppercase transition-colors duration-200 hover:bg-brass/10 active:scale-[0.97]"
                >
                  .ics file
                </button>
              </div>
              </article>
            </div>

          </Reveal>
        ))}
      </div>
    </section>
  );
}
