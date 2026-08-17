# King Royale — Premium Water Brand Site

A single-page, dark-black luxury site for the King Royale 1000ml mineral water bottle, with scroll micro-transitions and an AI campaign studio powered by GPT Image 2.

## Visual direction

- Deep black background with emerald green and gold accents, matching the bottle label.
- Serif display headings (Cormorant Garamond) with clean sans body (Inter).
- Glass surfaces, soft emerald glow orbs, thin gold divider lines, grain texture overlay.
- Every color already exists as a token in `src/styles.css` — no new palette needed.

## Page structure (built at `/`)

1. **Sticky nav** — wordmark, section links, gold "Order" pill; blurs on scroll.
2. **Hero** — full-height. Bottle image (already uploaded as an asset) floating with slow drift and emerald glow behind it, gold-gradient headline, dual CTAs, scroll cue.
3. **Trust marquee** — infinite scrolling strip of certifications / retail partners.
4. **Purity story** — split layout: alpine-source narrative + stat cards (TDS, pH, mineral profile).
5. **Product showcase** — 3 size variants (330ml / 750ml / 1000ml) as lifting glass cards with specs.
6. **Mineral composition** — animated bar rows for calcium, magnesium, potassium, silica.
7. **Process timeline** — 4 steps from spring capture to sealed bottle, revealed in sequence.
8. **Campaign Studio** — the existing `PromoStudio` component (GPT Image 2, streaming with blurred partial previews). Keep as-is, drop into the page.
9. **Testimonials** — 3 quote cards from hospitality clients.
10. **Contact / CTA band** — enquiry form (frontend only) + footer with contact details.

## Micro-transitions (Amicro-inspired)

Reuse the existing `useReveal` hook and CSS keyframes already in the project:
- Scroll-triggered rise+fade on every section, staggered per child.
- Parallax drift on hero bottle and background glow.
- Hover lift on all cards, gold underline sweep on links, tracking expansion on buttons.
- Full `prefers-reduced-motion` fallback (already in the stylesheet).

## Technical notes

- New components under `src/components/` (Nav, Hero, Marquee, Story, Products, Minerals, Process, Testimonials, Contact, Footer), composed in `src/routes/index.tsx` — this replaces the placeholder index.
- Bottle uses the existing `src/assets/king-royale-bottle.png.asset.json` CDN pointer.
- Image generation route `src/routes/api/generate-image.ts` stays on `openai/gpt-image-2`, streaming, unchanged.
- SEO head() on the index route: King Royale title, description, og/twitter tags.
- No backend or database — the enquiry form is presentational unless you want it to actually send.
