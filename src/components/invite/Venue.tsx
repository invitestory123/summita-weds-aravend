import { useState } from "react";
import { Navigation, MapPin } from "lucide-react";
import { invite } from "@/lib/invite.config";
import { Reveal } from "./Reveal";
import { Ornament } from "./Ornament";

/** Static OSM tile mosaic — no API key, upgrades to a live map on tap. */
function TileMosaic({ lat, lng, zoom = 15 }: { lat: number; lng: number; zoom: number }) {
  const n = 2 ** zoom;
  const x = Math.floor(((lng + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n,
  );
  const offsets = [-1, 0, 1];
  return (
    <div className="grid h-full w-full grid-cols-3 grid-rows-3">
      {offsets.map((dy) =>
        offsets.map((dx) => (
          <img
            key={`${dx}-${dy}`}
            src={`https://tile.openstreetmap.org/${zoom}/${x + dx}/${y + dy}.png`}
            alt=""
            aria-hidden
            loading="lazy"
            className="h-full w-full object-cover"
          />
        )),
      )}
    </div>
  );
}

export function Venue() {
  const [live, setLive] = useState(false);
  const { venue } = invite;
  const query = encodeURIComponent(venue.mapQuery);
  const embed = `https://www.google.com/maps?q=${query}&z=15&output=embed`;


  return (
    <section id="venue" className="relative px-5 py-20">
      <Reveal className="text-center">
        <p className="font-sans text-[0.6rem] tracking-[0.42em] text-brass uppercase">the venue</p>
        <Ornament className="mt-4 text-brass" />
        <h3 className="mt-6 font-display text-4xl tracking-wide text-paper uppercase">
          {venue.name}
        </h3>
        <p className="mx-auto mt-2 max-w-xs font-sans text-sm text-paper/60">{venue.address}</p>
      </Reveal>

      <Reveal delay={100} className="mx-auto mt-8 max-w-md">
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-brass/25">
          {live ? (
            <iframe
              title={`Map of ${venue.name}`}
              src={embed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setLive(true)}
              className="group relative h-full w-full"
              aria-label="Load interactive map"
            >
              <span className="absolute inset-0 block opacity-75 saturate-[0.55] transition-transform duration-700 group-hover:scale-105">
                <TileMosaic lat={venue.lat} lng={venue.lng} zoom={15} />
              </span>
              <span
                className="absolute inset-0 bg-maroon-deep/55 mix-blend-multiply"
                aria-hidden
              />

              <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-brass">
                <MapPin className="h-7 w-7" aria-hidden />
                <span className="font-sans text-[0.6rem] tracking-[0.3em] uppercase">
                  tap for interactive map
                </span>
              </span>
            </button>
          )}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <a
            href={venue.mapUrl || `https://www.google.com/maps/search/?api=1&query=${query}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-brass px-4 py-3 font-sans text-[0.62rem] tracking-[0.22em] text-primary-foreground uppercase active:scale-[0.97]"
          >
            <Navigation className="h-3.5 w-3.5" aria-hidden />
            Google Maps
          </a>
          <a
            href={`https://maps.apple.com/?q=${query}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-sm border border-brass/40 px-4 py-3 font-sans text-[0.62rem] tracking-[0.22em] text-brass uppercase hover:bg-brass/10 active:scale-[0.97]"
          >
            Apple Maps
          </a>
        </div>
      </Reveal>
    </section>
  );
}
