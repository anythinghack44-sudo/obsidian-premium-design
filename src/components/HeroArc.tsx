import { useRef, useState } from "react";
import bottle from "@/assets/king-royale-bottle.png.asset.json";
import CardArc5 from "@/components/ui/card-arc-5";
import { SplitText, LineReveal } from "@/components/SplitText";
import { useParallax } from "@/hooks/use-reveal";

const FORMATS = [
  { size: "330 ml", name: "Petite", note: "Amenity", scale: "h-[11rem]" },
  { size: "500 ml", name: "Crest Reserve", note: "Glass", scale: "h-[12.5rem]" },
  { size: "1000 ml", name: "Royale", note: "Signature", scale: "h-[14.5rem]" },
  { size: "750 ml", name: "Dining", note: "Table", scale: "h-[13rem]" },
  { size: "750 ml", name: "Effervescence", note: "Sparkling", scale: "h-[12.5rem]" },
];

export function HeroArc() {
  const glowRef = useRef<HTMLDivElement>(null);
  useParallax(glowRef, 0.08);
  const [active, setActive] = useState(2);

  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-32">
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]"
      />
      <div className="pointer-events-none absolute right-[8%] top-24 -z-10 h-64 w-64 rounded-full bg-accent/10 blur-[100px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 pb-28 lg:grid-cols-[1fr_1fr]">
        <div>
          <SplitText
            as="p"
            split="words"
            stagger={0.05}
            className="text-[0.65rem] uppercase tracking-[0.5em] text-accent"
          >
            Natural Mineral Water
          </SplitText>

          <h1 className="mt-7 font-display text-6xl leading-[0.95] sm:text-7xl lg:text-8xl">
            <SplitText as="span" className="block" stagger={0.035}>
              Crowned by
            </SplitText>
            <SplitText
              as="span"
              className="block" unitClassName="text-gold-gradient" split="words"
              delay={0.25}
              stagger={0.035}
            >
              the mountain
            </SplitText>
          </h1>

          <LineReveal delay={0.35} className="mt-8">
            <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
              Drawn from a protected alpine aquifer, filtered for two decades through
              emerald stone, and sealed at source. King Royale is the water of quiet
              luxury — served where standards are absolute.
            </p>
          </LineReveal>

          <LineReveal delay={0.45} className="mt-10">
            <div className="flex flex-wrap items-center gap-4">
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
          </LineReveal>

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

        <div className="relative flex flex-col items-center justify-center overflow-hidden px-4 py-10">
          <div className="glow-orb pointer-events-none absolute top-6 -z-10 h-[26rem] w-[26rem] rounded-full bg-primary/25 blur-[90px]" />

          <CardArc5
            className="h-[19rem] w-[9.5rem] lg:h-[23rem] lg:w-[11rem]"
            defaultOpen
            angle={24}
            gap={240}
            yOffset={26}
            cardClassName="surface-lux flex flex-col items-center justify-end pb-6"
            onActiveChange={setActive}
          >
            {FORMATS.map((f, i) => (
              <div key={f.name} className="flex h-full w-full flex-col items-center justify-end pb-6">
                <img
                  src={bottle.url}
                  alt={`King Royale ${f.size} ${f.name} bottle`}
                  width={512}
                  height={768}
                  {...(i === 2 ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
                  decoding="async"
                  className={`${f.scale} w-auto object-contain drop-shadow-[0_30px_60px_oklch(0.4_0.1_168/0.55)]`}
                />
                <span className="mt-5 text-[0.55rem] uppercase tracking-[0.32em] text-accent">
                  {f.size}
                </span>
                <span className="mt-1 font-display text-xl text-foreground">{f.name}</span>
              </div>
            ))}
          </CardArc5>

          <div className="mt-10 flex flex-col items-center">
            <div className="gold-line w-40" />
            <p className="mt-4 text-[0.6rem] uppercase tracking-[0.35em] text-muted-foreground">
              {FORMATS[active]?.note} · {FORMATS[active]?.size}
            </p>
            <p className="mt-2 text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground/60">
              Hover a bottle to explore the format
            </p>
          </div>
        </div>
      </div>

      <div className="gold-line mx-auto max-w-7xl" />
    </section>
  );
}
