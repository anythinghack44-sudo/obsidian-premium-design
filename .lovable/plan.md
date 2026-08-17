# King Royale — Arc Hero, Lifestyle Carousel, Full Motion Pass

Upgrade the site to award-show quality: an arc-shaped hero showcasing 5 bottle variants, a lifestyle carousel of people enjoying the product, and a consistent split-text animation language across every section.

## 1. Amicro components

Run the amicro CLI to add both components into `src/components/ui`:

- `card-arc-5` — used for the hero bottle arc
- `card-carousel` — used for the lifestyle showcase

If a generated component clashes with the site's dark/emerald/gold tokens, restyle it with existing tokens only (no new palette).

## 2. Hero rebuild — arc of 5 bottle types

Replace the current single-bottle hero with the arc component holding 5 King Royale variants:

1. Still 330 ml — Petite
2. Still 750 ml — Dining
3. Still 1000 ml — Royale (center, largest, gold-lit)
4. Sparkling 750 ml — Effervescence
5. Glass 500 ml — Crest Reserve

Each card: bottle visual, format, one-line descriptor, hover lift + glow. Center card sits highest in the arc with an emerald glow orb behind it.

Bottle visuals: 4 new product renders generated with GPT Image 2 (agent-side, saved as project assets), plus the existing uploaded 1000 ml bottle for the center. All exported small (≈768px, jpg/webp where possible) and lazy-loaded below the fold so the page stays fast.

## 3. Lifestyle carousel — 5 people with the product

New section between the collection and the mineral profile, built on `card-carousel`:

- 5 generated images of different people enjoying King Royale (chef plating, actor on a rooftop, athlete post-run, sommelier at a table, business traveller in a lounge) — generic, non-celebrity subjects.
- Each slide has a short caption line and a role label.
- Images kept intentionally small (≈640×800, compressed jpg) with `loading="lazy"` and `decoding="async"` so the carousel loads fast.
- Auto-advance with pause on hover, drag/swipe on touch, keyboard arrows.

## 4. Storytelling + animation pass

A single motion language applied everywhere:

- **Split text**: new `SplitText` component that splits headings into words/characters and animates each with a staggered rise + blur-out on scroll. Applied to every section heading and the hero headline.
- **Line reveal**: paragraphs fade up line by line via a mask reveal.
- **Scroll narrative**: the source/process sections become a sequenced story — pinned copy with steps that advance as you scroll, gold progress line filling between steps.
- **Micro-transitions**: hover lift on cards, gold underline sweep on links, letter-spacing expansion on buttons, counter roll-up on stat numbers, marquee, parallax glow orbs (existing `useReveal` / `useParallax` extended).
- **Full `prefers-reduced-motion` fallback** — all motion collapses to instant state.

## 5. Technical notes

- New files: `src/components/HeroArc.tsx`, `src/components/LifestyleCarousel.tsx`, `src/components/SplitText.tsx`, plus amicro components in `src/components/ui`.
- `src/hooks/use-reveal.ts` extended with a stagger helper and a scroll-progress hook.
- `src/routes/index.tsx` recomposed with the new hero and carousel section.
- Generated imagery lives in `src/assets` (or CDN asset pointers) — no runtime generation on page load; the existing PromoStudio keeps its live GPT Image 2 streaming.
- No backend or database changes.
