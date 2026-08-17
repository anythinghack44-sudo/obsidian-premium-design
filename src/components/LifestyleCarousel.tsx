import CardCarousel from "@/components/ui/card-carousel";
import { SplitText, LineReveal } from "@/components/SplitText";
import actor from "@/assets/life-actor.jpg";
import chef from "@/assets/life-chef.jpg";
import athlete from "@/assets/life-athlete.jpg";
import sommelier from "@/assets/life-sommelier.jpg";
import traveller from "@/assets/life-traveller.jpg";

const SLIDES = [
  {
    src: chef,
    title: "The Kitchen",
    role: "Head Chef",
    caption: "Poured beside the pass, where the palate is reset between every course.",
  },
  {
    src: athlete,
    title: "After the Run",
    role: "Endurance Athlete",
    caption: "Minerals returned in the same balance the body just spent.",
  },
  {
    src: actor,
    title: "Rooftop, Midnight",
    role: "Screen Actor",
    caption: "The last hour of a long day, poured cold above the city.",
  },
  {
    src: sommelier,
    title: "The Dining Room",
    role: "Sommelier",
    caption: "Served first, before the wine, because the water sets the standard.",
  },
  {
    src: traveller,
    title: "Gate 12",
    role: "Frequent Flyer",
    caption: "Carried through terminals, uncompromised at thirty thousand feet.",
  },
];

export function LifestyleCarousel() {
  return (
    <section id="moments" className="border-y border-border bg-card/20 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <SplitText
            as="p"
            split="words"
            className="text-[0.65rem] uppercase tracking-[0.45em] text-accent"
          >
            The Moments
          </SplitText>
          <h2 className="mt-6 font-display text-5xl leading-[1.05] sm:text-6xl">
            <SplitText as="span" className="block">
              Poured by people who
            </SplitText>
            <SplitText as="span" className="block" unitClassName="text-gold-gradient" split="words" delay={0.2}>
              choose carefully
            </SplitText>
          </h2>
          <LineReveal delay={0.3} className="mt-7">
            <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
              Five settings, one bottle. From the pass of a dark kitchen to a rooftop
              at midnight, King Royale travels with people who notice detail.
            </p>
          </LineReveal>
        </div>

        <CardCarousel className="mt-16" images={SLIDES} />
      </div>
    </section>
  );
}
