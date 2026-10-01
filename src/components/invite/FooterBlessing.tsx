import { invite } from "@/lib/invite.config";
import footerBg from "@/assets/footer-bg.jpg";
import { Ornament } from "./Ornament";
import { PetalField } from "./PetalField";

export function FooterBlessing() {
  return (
    <footer className="relative isolate overflow-hidden grain">
      <img
        src={footerBg}
        alt=""
        aria-hidden
        loading="lazy"
        width={1200}
        height={912}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-maroon-deep via-maroon-deep/70 to-maroon-deep"
        aria-hidden
      />
      <PetalField count={8} />

      <div className="relative px-5 py-24 text-center">
        <p className="font-script text-5xl text-brass">{invite.hashtag.replace("#", "")}</p>
        <Ornament className="mt-6 text-brass" />
        <h2 className="mt-8 font-display text-[clamp(2.6rem,13vw,5rem)] leading-[0.85] tracking-wide text-paper uppercase">
          {invite.coupleLine[0]}
          <span className="mx-3 font-script text-3xl lowercase">and</span>
          {invite.coupleLine[1]}
        </h2>
        <p className="mt-6 font-serif text-lg text-paper/70 italic">
          "May you be blessed with a hundred years of togetherness."
        </p>
        <p className="mt-10 font-sans text-[0.55rem] tracking-[0.36em] text-paper/40 uppercase">
          {invite.blessing}
        </p>
        <p className="mt-3 font-sans text-[0.5rem] tracking-[0.3em] text-paper/30 uppercase">
          invitation by {invite.brand}
        </p>
      </div>
            <a
          href="https://www.instagram.com/invitestory.in/"
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block text-[10px] uppercase tracking-[0.35em] text-current opacity-70 transition-opacity hover:opacity-100"
        >
          Follow @invitestory.in on Instagram
        </a>
      </footer>

  );
}
