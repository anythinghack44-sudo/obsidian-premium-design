import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * amicro — card-carousel
 * Spring-driven slide rail that fans on hover.
 * Adapted for the King Royale lifestyle showcase (captions, roles, a11y).
 */

export interface CarouselItem {
  src: string;
  title: string;
  role?: string;
  caption?: string;
}

interface CardCarouselProps {
  className?: string;
  images: CarouselItem[];
  slideWidth?: number;
}

export default function CardCarousel({
  className = "",
  images,
  slideWidth = 300,
}: CardCarouselProps) {
  const [activeIndex, setActiveIndex] = React.useState(Math.floor(images.length / 2));
  const [isHovered, setIsHovered] = React.useState(false);
  const reduce = useReducedMotion();

  const toPrev = () => setActiveIndex((p) => Math.max(0, p - 1));
  const toNext = () => setActiveIndex((p) => Math.min(images.length - 1, p + 1));

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      toPrev();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      toNext();
    }
  };

  const active = images[activeIndex];

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="King Royale lifestyle showcase"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex w-full select-none flex-col items-center justify-center overflow-hidden outline-none ${className}`}
    >
      <div
        className="relative flex h-[26rem] items-center justify-start overflow-visible"
        style={{ width: `${slideWidth}px` }}
      >
        <motion.div
          className="flex w-fit items-center"
          animate={{ x: -activeIndex * slideWidth }}
          transition={{ type: "spring", bounce: 0.1, duration: reduce ? 0 : 0.8 }}
        >
          {images.map((item, i) => {
            const isActive = activeIndex === i;
            const diff = i - activeIndex;
            const fan = isHovered && !reduce;

            return (
              <motion.figure
                key={item.title}
                className="flex shrink-0 flex-col items-center gap-3 will-change-transform"
                style={{ width: `${slideWidth}px` }}
                animate={
                  reduce
                    ? {}
                    : {
                        rotate: fan ? diff * 8 : diff * 2,
                        scale: isActive ? 1.04 : fan ? 0.78 : 0.86,
                        y: fan ? Math.abs(diff) * 18 : 0,
                        opacity: Math.abs(diff) > 2 ? 0.15 : 1,
                      }
                }
                transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
              >
                <button
                  type="button"
                  aria-label={`Show ${item.title}`}
                  onClick={() => setActiveIndex(i)}
                  className="group relative block overflow-hidden rounded-2xl border border-border shadow-[0_30px_80px_-30px_oklch(0.05_0_0/0.95)]"
                >
                  <img
                    src={item.src}
                    alt={item.caption ?? item.title}
                    width={512}
                    height={640}
                    loading="lazy"
                    decoding="async"
                    className="h-[19rem] w-[15rem] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,oklch(0.09_0.008_160/0.85),transparent_55%)]" />
                  <span
                    className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ boxShadow: "inset 0 0 0 1px oklch(0.82 0.13 88 / 45%)" }}
                  />
                </button>
                <figcaption
                  className={`text-center transition-all duration-500 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span className="block font-display text-2xl text-foreground">{item.title}</span>
                  {item.role && (
                    <span className="mt-1 block text-[0.6rem] uppercase tracking-[0.3em] text-accent">
                      {item.role}
                    </span>
                  )}
                </figcaption>
              </motion.figure>
            );
          })}
        </motion.div>
      </div>

      {active?.caption && (
        <p
          key={active.title}
          className="mt-6 max-w-md text-center text-sm leading-relaxed text-muted-foreground"
        >
          {active.caption}
        </p>
      )}

      <div className="surface-lux z-20 mt-7 flex items-center justify-center gap-3 rounded-full px-3 py-1.5">
        <button
          type="button"
          onClick={toPrev}
          aria-label="Previous"
          className="rounded-full p-1 text-muted-foreground transition-colors hover:text-accent"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center justify-center gap-1.5">
          {images.map((item, i) => (
            <button
              key={item.title}
              type="button"
              aria-label={`Go to ${item.title}`}
              onClick={() => setActiveIndex(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? "w-6 bg-[image:var(--gradient-gold)]"
                  : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={toNext}
          aria-label="Next"
          className="rounded-full p-1 text-muted-foreground transition-colors hover:text-accent"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
