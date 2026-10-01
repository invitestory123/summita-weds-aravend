import { useRef, useState, useEffect } from "react";
import { invite } from "@/lib/invite.config";
import paper from "@/assets/paper-texture.jpg";
const gopuram = "https://media.invitestory.in/toran-telugu/src/assets/gopuram.png";
import { Ornament, SmallDots } from "./Ornament";
import { Reveal } from "./Reveal";
import { clamp, isTouch, lerp, reducedMotion, useFrame } from "@/lib/frame";

export function InviteCard() {
  const ref = useRef<HTMLDivElement>(null);
  const tilt = useRef(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => setAnimate(!reducedMotion()), []);

  useFrame(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.bottom < -120 || rect.top > window.innerHeight + 120) return;
    const target = clamp(
      (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight,
      -1,
      1,
    );
    tilt.current = lerp(tilt.current, target, 0.12);
    const t = tilt.current * (isTouch() ? 0.7 : 1);
    el.style.transform = `rotateX(${t * 7}deg) translate3d(0, ${t * -14}px, 0)`;
  }, animate);

  return (
    <section id="invitation" className="relative px-5 py-16" style={{ perspective: "1400px" }}>
      <div
        ref={ref}
        className="relative mx-auto max-w-md will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >

        <Reveal from="scale">
          <div
            className="deckle grain relative px-7 py-12 text-center text-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)]"
            style={{
              backgroundImage: `url(${paper})`,
              backgroundSize: "cover",
            }}
          >
            <p className="font-sans text-[0.58rem] tracking-[0.34em] text-ink/70 uppercase">
              {invite.intro}
            </p>
            <Ornament className="mt-4 text-maroon" />

            <div className="mt-6 space-y-4">
              {invite.families.map((f) => (
                <div key={f.side}>
                  <p className="font-sans text-[0.52rem] tracking-[0.3em] text-ink/55 uppercase">
                    {f.side}
                  </p>
                  <p className="font-serif text-lg text-maroon">{f.names}</p>
                </div>
              ))}
            </div>

            <SmallDots className="mt-7 text-maroon" />

            <p className="mt-7 font-serif text-xl italic text-ink/80">
              request the pleasure of your company at the wedding of
            </p>

            <h2 className="mt-5 font-display text-3xl sm:text-4xl leading-tight font-semibold tracking-wide text-maroon uppercase">
              {invite.groom}
              <span className="my-1.5 block font-script text-2xl sm:text-3xl normal-case">and</span>
              {invite.bride}
            </h2>

            <div className="mt-8 flex items-center justify-center gap-4">
              <span className="font-serif text-sm tracking-[0.18em] text-ink uppercase">
                {invite.dateLabel.day}
              </span>
              <span className="h-9 w-px bg-maroon/30" aria-hidden />
              <span>
                <span className="block font-display text-4xl leading-none text-maroon">
                  {invite.dateLabel.number}
                </span>
                <span className="block font-sans text-[0.5rem] tracking-[0.26em] text-ink/70 uppercase">
                  {invite.dateLabel.monthYear}
                </span>
              </span>
              <span className="h-9 w-px bg-maroon/30" aria-hidden />
              <span className="font-serif text-sm tracking-[0.18em] text-ink uppercase">
                at {invite.dateLabel.time}
              </span>
            </div>

            <SmallDots className="mt-8 text-maroon" />

            <p className="mt-7 font-sans text-[0.55rem] tracking-[0.34em] text-ink/70 uppercase">
              venue
            </p>
            <p className="font-display text-3xl tracking-wide text-leaf-deep uppercase">
              {invite.city}
            </p>

            <img
              src={gopuram}
              alt="Line illustration of a South Indian gopuram"
              loading="lazy"
              width={1024}
              height={700}
              className="mx-auto mt-4 w-52 opacity-90"
            />

            <p className="mt-4 font-sans text-[0.55rem] tracking-[0.3em] text-ink/70 uppercase">
              {invite.blessing}
            </p>
            <Ornament className="mt-4 text-maroon" />
            <p className="mt-4 font-sans text-[0.52rem] tracking-[0.28em] text-ink/60 uppercase">
              we can't wait to celebrate with you
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
