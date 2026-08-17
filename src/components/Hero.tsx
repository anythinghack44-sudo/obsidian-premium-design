import { useRef } from "react";
import bottle from "@/assets/king-royale-bottle.png.asset.json";
import { useParallax } from "@/hooks/use-reveal";

export function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);
  useParallax(glowRef, 0.08);

  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-32">
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]"
      />
      <div className="pointer-events-none absolute right-[8%] top-24 -z-10 h-64 w-64 rounded-full bg-accent/10 blur-[100px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="reveal text-[0.65rem] uppercase tracking-[0.5em] text-accent">
            Natural Mineral Water
          </p>
          <h1 className="reveal mt-7 font-display text-6xl leading-[0.95] sm:text-7xl lg:text-8xl">
            Crowned by
            <br />
            <span className="text-gold-gradient">the mountain</span>
          </h1>
          <p className="reveal mt-8 max-w-lg text-base leading-relaxed text-muted-foreground">
            Drawn from a protected alpine aquifer, filtered for two decades through
            emerald stone, and sealed at source. King Royale is the water of quiet
            luxury — served where standards are absolute.
          </p>

          <div className="reveal mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#collection"
              className="rounded-full bg-[image:var(--gradient-gold)] px-9 py-4 text-[0.7rem] uppercase tracking-[0.3em] text-accent-foreground transition-all duration-500 hover:tracking-[0.38em]"
            >
              View the collection
            </a>
            <a
              href="#source"
              className="group inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-foreground"
            >
              Our source
              <span className="inline-block h-px w-8 bg-accent transition-all duration-500 group-hover:w-14" />
            </a>
          </div>

          <dl className="reveal mt-14 grid max-w-md grid-cols-3 gap-6">
            {[
              ["pH 7.8", "Alkaline balance"],
              ["190 mg/L", "Total minerals"],
              ["620 m", "Source depth"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-display text-2xl text-foreground">{value}</dt>
                <dd className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative flex justify-center">
          <div className="glow-orb absolute inset-x-8 top-10 -z-10 h-[70%] rounded-full bg-primary/25 blur-[90px]" />
          <img
            src={bottle.url}
            alt="King Royale 1000ml natural mineral water bottle"
            className="float-slow h-[34rem] w-auto object-contain drop-shadow-[0_40px_80px_oklch(0.4_0.1_168/0.55)] lg:h-[42rem]"
          />
        </div>
      </div>

      <div className="gold-line mx-auto max-w-7xl" />
    </section>
  );
}
