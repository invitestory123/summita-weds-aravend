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
};

export const invite: InviteConfig = {
  brand: "InviteStory",
  bride: "Summita Segaran",
  groom: "Arvend Rajan",
  coupleLine: ["Arvend", "Summita"],
  hashtag: "#ArvendWedsSummita",
  intro: "Together with their families",
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
      year: "2020",
      title: "The first hello",
      text: "Two strangers, a chance conversation, and an effortless connection that neither of them expected.",
    },
    {
      year: "2022",
      title: "Penang evenings",
      text: "Countless shared laughs, quiet walks, and a realization that home was simply wherever they were together.",
    },
    {
      year: "2025",
      title: "The question",
      text: "He asked. She had already known the answer from the very beginning.",
    },
    {
      year: "2026",
      title: "You are invited",
      text: "With the blessings of our families, we begin our life together with joy and reverence.",
    },
  ],
  blessing: "Celebration · Tradition · Togetherness",
  families: [
    { side: "Son of", names: "Mr. Rajan & Family" },
    { side: "Daughter of", names: "Mr. Segaran & Family" },
  ],
  contacts: [
    { name: "Arvend", role: "Groom's side", phone: "" },
    { name: "Summita", role: "Bride's side", phone: "" },
  ],
};
