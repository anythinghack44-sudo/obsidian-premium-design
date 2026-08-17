import { useEffect } from "react";

/**
 * Micro-transition engine: reveals any element carrying `.reveal`
 * once it scrolls into view. Staggering is done via inline
 * transitionDelay on the element itself.
 */
export function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);
}

/** Parallax offset driven by scroll position. */
export function useParallax(ref: React.RefObject<HTMLElement | null>, factor = 0.15) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.transform = `translate3d(0, ${window.scrollY * factor}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [ref, factor]);
}
