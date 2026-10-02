export type InviteEvent = {
  id: string;
  name: string;
  tamil?: string;
  description: string;
  /** ISO 8601 with timezone offset */
  start: string;
  end: string;
  venue: string;
  address: string;
  dressCode: string;
  /** CSS color for the dress-code dot */
  dressColor: string;
};

export type InviteConfig = {
  brand: string;
  bride: string;
  groom: string;
  /** order the names appear */
  coupleLine: [string, string];
  hashtag: string;
  intro: string;
  timeZone?: string;
  /** Main muhurtham moment used for the countdown */
  weddingISO: string;
  dateLabel: {
    day: string;
    number: string;
    monthYear: string;
    time: string;
  };
  city: string;
  venue: {
    name: string;
    address: string;
    lat: number;
    lng: number;
    mapQuery: string;
    mapUrl?: string;
  };
  events: InviteEvent[];
  story: { year: string; title: string; text: string }[];
  blessing: string;
  families: { side: string; names: string }[];
  contacts: { name: string; role: string; phone: string }[];
  music?: {
    track: string;
    title?: string;
  };
};

export const invite: InviteConfig = {
  brand: "InviteStory",
  bride: "Summita Segaran",
  groom: "Arvend Rajan",
  coupleLine: ["Arvend", "Summita"],
  hashtag: "#ArvendWedsSummita",
  intro: "Together with their families",
  music: {
    track: "./asbg.mp3",
    title: "Naane Varugiraen",
  },
  timeZone: "Asia/Kuala_Lumpur",
  weddingISO: "2026-11-22T09:30:00+08:00",
  dateLabel: {
    day: "Sunday",
    number: "22",
    monthYear: "November 2026",
    time: "9:30 AM",
  },
  city: "Pulau Pinang",
  venue: {
    name: "Temple Hall, Arulmigu Karumariamman Temple",
    address: "1548, Jalan Todak, Seberang Jaya, 13700 Perai, Pulau Pinang",
    lat: 5.3947,
    lng: 100.395,
    mapQuery: "Arulmigu Karumariamman Temple, Jalan Todak, Seberang Jaya, Pulau Pinang",
    mapUrl: "https://maps.app.goo.gl/W5h6uZu2hvPMM6QC6",
  },
  events: [
    {
      id: "muhurtham",
      name: "Muhurtham",
      tamil: "முகூர்த்தம்",
      description: "The sacred wedding ceremony and tying of the thaali.",
      start: "2026-11-22T09:30:00+08:00",
      end: "2026-11-22T13:30:00+08:00",
      venue: "Temple Hall, Arulmigu Karumariamman Temple",
      address: "1548, Jalan Todak, Seberang Jaya, 13700 Perai, Pulau Pinang",
      dressCode: "Traditional Silks",
      dressColor: "#c9922f",
    },
  ],
  story: [
    {
      year: "2014",
      title: "The first crossing",
      text: "Two university mates, moving through the same circles and crossing paths from time to time — never knowing where the story would eventually lead.",
    },
    {
      year: "2021",
      title: "A chance encounter",
      text: "Years later, they crossed paths again at court. A brief meeting, a small favour, and then life carried on.",
    },
    {
      year: "2024",
      title: "Almost, but not quite",
      text: "They crossed paths once more and started talking. The timing wasn’t quite right, and the conversations eventually faded — for the moment.",
    },
    {
      year: "2025",
      title: "The beginning",
      text: "The message that changed everything\nA playful Instagram DM in May turned into everyday conversations, shared laughter, and something neither of them expected. By June, they went on their first date.",
    },
    {
      year: "2025",
      title: "A little more official",
      text: "What started with a message became something real. By October, they were surrounded by family and celebrating their Nitchiyam — the beginning of their journey towards marriage.",
    },
    {
      year: "2026",
      title: "The question",
      text: "In February, came the proposal. In May, surrounded by their families, they got engaged.",
    },
    {
      year: "2026",
      title: "You are invited",
      text: "After years of crossing paths, missed chances and one very well-timed DM, they’re finally beginning their life together.",
    },
  ],
  blessing: "Celebration · Tradition · Togetherness",
  families: [
    { side: "Son of", names: "Mr and Mrs Rajandran" },
    { side: "Daughter of", names: "Mr and Mrs Segaran" },
  ],
  contacts: [
    { name: "Arvend", role: "Groom's side", phone: "" },
    { name: "Summita", role: "Bride's side", phone: "" },
  ],
};
