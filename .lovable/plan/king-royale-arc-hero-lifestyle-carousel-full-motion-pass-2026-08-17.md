# King Royale — Arc Hero, Lifestyle Carousel, Full Motion Pass

Award-show quality upgrade: an arc hero built from the real King Royale bottle in 5 formats, a lifestyle carousel of people drinking the product, and a split-text animation language across the whole page.

## Amicro components

`npx @subhanhq/amicro add ...` has no runnable CLI binary in the published package — it ships a demo site whose bundle contains the component sources. The exact `card-arc-5` and `card-carousel` sources were extracted from that bundle and will be added as project files in `src/components/ui/card-arc-5.tsx` and `src/components/ui/card-carousel.tsx`, restyled with the site's emerald/gold/black tokens. `framer-motion` is already installed for them.

## Hero — card-arc-5 with 5 bottle formats

Uses only the client's own bottle image (the uploaded King Royale render, already a CDN asset). No AI-generated bottles — the 4 generated bottle files are deleted. Each arc card shows the same bottle, differentiated by scale, crop, tint of the glow behind it, and its label:

1. 330 ml — Petite
2. 500 ml — Crest Reserve
3. 1000 ml — Royale (center, largest, gold-lit, sits highest in the arc)
4. 750 ml — Dining
5. 750 ml Sparkling — Effervescence

Fanned-out arc on hover/scroll with spring physics, center card scaled up, emerald glow orb behind, gold caption strip under the active card. Headline, sub-copy and stat row keep their place beside the arc.

## Lifestyle carousel — 5 people with the product

New section between the collection and the mineral profile, built on `card-carousel`:

- 5 generated lifestyle photos of different people drinking King Royale — an actor on a night rooftop, a chef in a dark kitchen, an athlete after a run, a sommelier at a table, a traveller in an airport lounge. Generic non-celebrity subjects; the bottle in frame is described as the green-labelled gold-crest bottle so it reads as the client's product.
- Small files by design: 512×640, compressed jpg, `loading="lazy"` and `decoding="async"` so the section is fast.
- Caption + role label per slide, spring-based fan on hover, dot navigation, prev/next controls, keyboard arrows.

## Storytelling + animation pass

- **SplitText component** — splits headings into words and characters, animating each with staggered rise, blur and opacity on scroll. Applied to the hero headline and every section heading.
- **Line reveal** on paragraphs via a mask wipe.
- **Scroll narrative** through the source and process sections: sequenced steps that advance with scroll, gold progress line filling between them.
- **Micro-transitions**: card hover lift, gold underline sweep on links, letter-spacing expansion on buttons, stat counters rolling up, marquee, parallax glow orbs.
- Full `prefers-reduced-motion` fallback.

## Technical notes

- New files: `src/components/ui/card-arc-5.tsx`, `src/components/ui/card-carousel.tsx`, `src/components/HeroArc.tsx`, `src/components/LifestyleCarousel.tsx`, `src/components/SplitText.tsx`.
- `src/hooks/use-reveal.ts` gains a stagger helper and a scroll-progress hook.
- `src/routes/index.tsx` recomposed with the new hero and the carousel section.
- Bottle imagery comes from the existing `src/assets/king-royale-bottle.png.asset.json` pointer only.
- Lifestyle images live in `src/assets`; the existing PromoStudio keeps its live GPT Image 2 streaming.
- No backend or database changes.
