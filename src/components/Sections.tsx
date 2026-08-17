import bottle from "@/assets/king-royale-bottle.png.asset.json";
import { SplitText, LineReveal } from "@/components/SplitText";

/* ---------------- Marquee ---------------- */

const MARKS = [
  "NSF Certified",
  "ISO 22000",
  "Michelin Partner",
  "Halal Certified",
  "Alpine Protected Source",
  "BRCGS AA",
  "Carbon Neutral Bottling",
];

export function Marquee() {
  return (
    <section className="overflow-hidden border-y border-border py-6">
      <div className="marquee-track flex w-max gap-14 whitespace-nowrap">
        {[...MARKS, ...MARKS].map((m, i) => (
          <span
            key={`${m}-${i}`}
            className="text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground"
          >
            {m}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Story ---------------- */

export function Story() {
  return (
    <section id="source" className="mx-auto max-w-7xl px-6 py-32">
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
        <div className="reveal">
          <p className="text-[0.65rem] uppercase tracking-[0.45em] text-accent">The Source</p>
          <h2 className="mt-6 font-display text-5xl leading-[1.05] sm:text-6xl">
            <SplitText as="span" className="block">Twenty years</SplitText>
            <SplitText as="span" className="block text-gold-gradient" delay={0.2}>
              underground
            </SplitText>
          </h2>
          <p className="mt-7 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Snowmelt enters the massif at 2,400 metres and disappears into a labyrinth
            of dolomite and emerald serpentine. Two decades later it emerges at our
            sealed wellhead, naturally sterile, mineral-rich, and untouched by air.
          </p>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Nothing is added. Nothing is taken away. The bottle is filled less than
            forty metres from the spring, under inert nitrogen, in a single closed run.
          </p>
          <div className="gold-line mt-10 max-w-xs" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {[
            ["01", "Protected aquifer", "3,100 hectares of legally sealed catchment."],
            ["02", "Zero treatment", "No chlorination, no ozonation, no remineralisation."],
            ["03", "Bottled at source", "Filled 38 m from the wellhead under nitrogen."],
            ["04", "Traced per batch", "Every cap carries a lot code and lab profile."],
          ].map(([n, title, copy], i) => (
            <article
              key={n}
              className="reveal lift surface-lux rounded-xl p-7"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className="font-display text-3xl text-accent/70">{n}</span>
              <h3 className="mt-4 text-sm uppercase tracking-[0.18em] text-foreground">{title}</h3>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Products ---------------- */

const PRODUCTS = [
  {
    size: "330 ml",
    name: "Petite",
    copy: "Table service and in-room amenity. Case of 24.",
    scale: "h-40",
  },
  {
    size: "750 ml",
    name: "Dining",
    copy: "The restaurant standard, still or sparkling. Case of 12.",
    scale: "h-52",
  },
  {
    size: "1000 ml",
    name: "Royale",
    copy: "The signature format with gold crest label. Case of 12.",
    scale: "h-64",
  },
];

export function Products() {
  return (
    <section id="collection" className="border-y border-border bg-card/20 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal max-w-2xl">
          <p className="text-[0.65rem] uppercase tracking-[0.45em] text-accent">The Collection</p>
          <h2 className="mt-6 font-display text-5xl leading-[1.05] sm:text-6xl">
            <SplitText as="span" className="block">Three formats,</SplitText>
            <SplitText as="span" className="block text-gold-gradient" delay={0.2}>
              one standard
            </SplitText>
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <article
              key={p.size}
              className="reveal lift surface-lux group flex flex-col items-center rounded-2xl px-8 pb-10 pt-12 text-center"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="relative flex h-72 items-end justify-center">
                <div className="glow-orb absolute bottom-6 h-32 w-32 rounded-full bg-primary/25 blur-3xl" />
                <img
                  src={bottle.url}
                  alt={`King Royale ${p.size} bottle`}
                  className={`${p.scale} w-auto object-contain transition-transform duration-700 group-hover:-translate-y-3`}
                />
              </div>
              <p className="mt-8 text-[0.6rem] uppercase tracking-[0.35em] text-accent">{p.size}</p>
              <h3 className="mt-3 font-display text-3xl">{p.name}</h3>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{p.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Minerals ---------------- */

const MINERALS = [
  ["Calcium", "62 mg/L", 62],
  ["Magnesium", "28 mg/L", 34],
  ["Bicarbonate", "184 mg/L", 88],
  ["Potassium", "4 mg/L", 12],
  ["Silica", "16 mg/L", 22],
  ["Sodium", "6 mg/L", 9],
] as const;

export function Minerals() {
  return (
    <section id="minerals" className="mx-auto max-w-7xl px-6 py-32">
      <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div className="reveal">
          <p className="text-[0.65rem] uppercase tracking-[0.45em] text-accent">Composition</p>
          <h2 className="mt-6 font-display text-5xl leading-[1.05]">
            <SplitText as="span" className="block">A profile you can</SplitText>
            <SplitText as="span" className="block text-gold-gradient" delay={0.2}>
              taste
            </SplitText>
          </h2>
          <p className="mt-7 text-sm leading-relaxed text-muted-foreground">
            Soft on the palate, faintly sweet, with a long mineral finish that clears
            between courses. Dry residue 190 mg/L at 180°C.
          </p>
        </div>

        <div className="surface-lux reveal rounded-2xl p-8 sm:p-10">
          {MINERALS.map(([name, value, pct], i) => (
            <div key={name} className={i === 0 ? "" : "mt-7"}>
              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-[0.22em] text-foreground">{name}</span>
                <span className="text-xs text-muted-foreground">{value}</span>
              </div>
              <div className="mt-3 h-px w-full bg-border">
                <div
                  className="h-px bg-[image:var(--gradient-gold)] transition-[width] duration-1000 ease-out"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Process ---------------- */

const STEPS = [
  ["Capture", "Sealed wellhead draws from 620 m with zero surface contact."],
  ["Rest", "Water settles in mirror-polished steel for 12 hours."],
  ["Fill", "Nitrogen-flushed line fills and caps in one closed pass."],
  ["Verify", "Each lot is lab-profiled before it leaves the valley."],
];

export function Process() {
  return (
    <section className="border-y border-border bg-card/20 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-display text-5xl leading-[1.05]">
          <SplitText as="span" className="block">From spring to</SplitText>
          <SplitText as="span" className="block text-gold-gradient" delay={0.2}>
            seal
          </SplitText>
        </h2>
        <div className="mt-16 grid gap-10 md:grid-cols-4">
          {STEPS.map(([title, copy], i) => (
            <div key={title} className="reveal" style={{ transitionDelay: `${i * 130}ms` }}>
              <div className="gold-line" />
              <span className="mt-6 block text-[0.6rem] uppercase tracking-[0.35em] text-accent">
                Step {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-2xl">{title}</h3>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */

const QUOTES = [
  ["It is the only still water we pour without asking.", "Head Sommelier, Maison Verre"],
  ["Guests notice it before they notice the glassware.", "General Manager, The Aldwyn"],
  ["Consistent to the milligram, batch after batch.", "Beverage Director, Ortolan Group"],
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <div className="grid gap-8 md:grid-cols-3">
        {QUOTES.map(([quote, author], i) => (
          <figure
            key={author}
            className="reveal lift surface-lux rounded-2xl p-9"
            style={{ transitionDelay: `${i * 110}ms` }}
          >
            <span className="font-display text-5xl leading-none text-accent/50">&ldquo;</span>
            <blockquote className="mt-4 font-display text-xl leading-snug text-foreground">
              {quote}
            </blockquote>
            <figcaption className="mt-6 text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
              {author}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Contact + Footer ---------------- */

export function Contact() {
  return (
    <section id="contact" className="border-t border-border py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2">
        <div className="reveal">
          <p className="text-[0.65rem] uppercase tracking-[0.45em] text-accent">Enquiries</p>
          <h2 className="mt-6 font-display text-5xl leading-[1.05]">
            <SplitText as="span" className="block">Pour something</SplitText>
            <SplitText as="span" className="block text-gold-gradient" delay={0.2}>
              rarer
            </SplitText>
          </h2>
          <p className="mt-7 max-w-md text-sm leading-relaxed text-muted-foreground">
            Wholesale, hospitality and private-label enquiries are handled personally
            by our house team, usually within one business day.
          </p>
          <div className="mt-10 space-y-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <p>trade@kingroyale.water</p>
            <p>+41 27 555 0140</p>
            <p>Valais, Switzerland</p>
          </div>
        </div>

        <form
          className="reveal surface-lux space-y-5 rounded-2xl p-8 sm:p-10"
          onSubmit={(e) => e.preventDefault()}
        >
          {[
            { label: "Name", type: "text", ph: "Your name" },
            { label: "Company", type: "text", ph: "Hotel, group or distributor" },
            { label: "Email", type: "email", ph: "you@company.com" },
          ].map((f) => (
            <label key={f.label} className="block">
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
                {f.label}
              </span>
              <input
                type={f.type}
                placeholder={f.ph}
                className="mt-2 w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-colors focus:border-accent/60"
              />
            </label>
          ))}
          <label className="block">
            <span className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
              Message
            </span>
            <textarea
              rows={4}
              placeholder="Volumes, formats and timelines"
              className="mt-2 w-full resize-none rounded-lg border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-colors focus:border-accent/60"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-[image:var(--gradient-gold)] px-8 py-4 text-[0.68rem] uppercase tracking-[0.3em] text-accent-foreground transition-all duration-500 hover:tracking-[0.38em]"
          >
            Send enquiry
          </button>
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <span className="font-display text-xl text-gold-gradient">King Royale</span>
        <p className="text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
          © {new Date().getFullYear()} King Royale Waters — All rights reserved
        </p>
      </div>
    </footer>
  );
}
