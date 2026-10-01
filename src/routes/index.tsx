import { createFileRoute } from "@tanstack/react-router";
import { invite } from "@/lib/invite.config";
import { SmoothScroll } from "@/components/invite/SmoothScroll";
import { Hero } from "@/components/invite/Hero";
import { InviteCard } from "@/components/invite/InviteCard";
import { LampRitual } from "@/components/invite/LampRitual";

import { Countdown } from "@/components/invite/Countdown";
import { Story } from "@/components/invite/Story";
import { Events } from "@/components/invite/Events";
import { Venue } from "@/components/invite/Venue";
import { Gallery } from "@/components/invite/Gallery";
import { FooterBlessing } from "@/components/invite/FooterBlessing";
import { StickyBar } from "@/components/invite/StickyBar";

const title = `${invite.coupleLine.join(" & ")} · ${invite.dateLabel.number} ${invite.dateLabel.monthYear}`;
const description = `${invite.intro}, ${invite.coupleLine.join(" and ")} invite you to their wedding in ${invite.city} on ${invite.dateLabel.day}, ${invite.dateLabel.number} ${invite.dateLabel.monthYear} at ${invite.dateLabel.time}.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#2a0b0e" },
    ],
  }),
  component: Invitation,
});

function Invitation() {
  return (
    <main className="relative overflow-x-hidden">
      <SmoothScroll />
      <Hero />
      <InviteCard />
      <LampRitual />
      <Countdown iso={invite.weddingISO} />

      <Story />
      <Events />
      <Venue />
      <Gallery />
      <FooterBlessing />
      <StickyBar />
    </main>
  );
}
