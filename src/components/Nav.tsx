import { useEffect, useState } from "react";

const LINKS = [
  { href: "#source", label: "Source" },
  { href: "#collection", label: "Collection" },
  { href: "#minerals", label: "Minerals" },
  { href: "#studio", label: "Studio" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-display text-2xl tracking-wide text-gold-gradient">King Royale</span>
          <span className="hidden text-[0.6rem] uppercase tracking-[0.4em] text-muted-foreground sm:inline">
            Est. 1926
          </span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="rounded-full border border-accent/40 bg-accent/10 px-6 py-2.5 text-[0.65rem] uppercase tracking-[0.28em] text-accent transition-all duration-500 hover:bg-accent/20 hover:tracking-[0.34em]"
        >
          Enquire
        </a>
      </nav>
    </header>
  );
}
