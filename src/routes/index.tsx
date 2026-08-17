import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { HeroArc } from "@/components/HeroArc";
import { LifestyleCarousel } from "@/components/LifestyleCarousel";
import {
  Marquee,
  Story,
  Products,
  Minerals,
  Process,
  Testimonials,
  Contact,
  Footer,
} from "@/components/Sections";
import { PromoStudio } from "@/components/PromoStudio";
import { Preloader } from "@/components/Preloader";
import { useReveal } from "@/hooks/use-reveal";

const TITLE = "King Royale — Natural Alpine Mineral Water";
const DESCRIPTION =
  "King Royale is a protected alpine mineral water, bottled at source in Valais. Explore the collection, mineral profile and trade enquiries.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <HeroArc />
        <Marquee />
        <Story />
        <Products />
        <LifestyleCarousel />
        <Minerals />
        <Process />
        <section id="studio" className="mx-auto max-w-7xl px-6 py-32">
          <PromoStudio />
        </section>
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
