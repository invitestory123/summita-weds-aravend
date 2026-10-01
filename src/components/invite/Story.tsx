import { invite } from "@/lib/invite.config";
import { Reveal } from "./Reveal";
import { Ornament } from "./Ornament";

export function Story() {
  return (
    <section id="story" className="relative px-5 py-20">
      <Reveal className="text-center">
        <p className="font-sans text-[0.6rem] tracking-[0.42em] text-brass uppercase">our story</p>
        <Ornament className="mt-4 text-brass" />
      </Reveal>

      <div className="relative mx-auto mt-12 max-w-md">
        <span
          className="absolute top-0 bottom-0 left-[13px] w-px bg-gradient-to-b from-transparent via-brass/40 to-transparent"
          aria-hidden
        />
        <ol className="space-y-10">
          {invite.story.map((s, i) => (
            <li key={s.year}>
              <Reveal from={i % 2 === 0 ? "left" : "right"} delay={i * 60}>
                <div className="relative pl-12">
                  <span
                    className="absolute top-2 left-[7px] h-3.5 w-3.5 rounded-full border border-brass bg-maroon-deep"
                    aria-hidden
                  >
                    <span className="absolute inset-1 rounded-full bg-brass" />
                  </span>
                  <p className="font-display text-2xl text-brass">{s.year}</p>
                  <h3 className="mt-1 font-serif text-xl text-paper">{s.title}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-paper/65">{s.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
