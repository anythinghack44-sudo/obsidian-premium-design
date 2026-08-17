import { useEffect, useState } from "react";

/**
 * Brand preloader: a bottle silhouette filling with water while the
 * hero video, fonts and imagery settle. Fades out once the window has
 * loaded (or after a hard cap so it never traps the visitor).
 */
export function Preloader() {
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const finish = () => setDone(true);

    if (document.readyState === "complete") {
      const t = window.setTimeout(finish, 500);
      return () => window.clearTimeout(t);
    }

    window.addEventListener("load", finish);
    const cap = window.setTimeout(finish, 3500);
    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(cap);
    };
  }, []);

  useEffect(() => {
    if (!done) return;
    document.body.style.overflow = "";
    const t = window.setTimeout(() => setGone(true), 900);
    return () => window.clearTimeout(t);
  }, [done]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden={done}
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-700 ${
        done ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative flex h-32 w-16 items-end justify-center">
        <span className="preload-ripple absolute bottom-2 h-16 w-16 rounded-full border border-accent/40" />
        {/* bottle silhouette */}
        <div className="relative h-32 w-14 overflow-hidden rounded-b-[1.1rem] rounded-t-[0.55rem] border border-accent/40">
          <div className="preload-fill absolute inset-x-0 bottom-0 h-full bg-[image:var(--gradient-emerald)] opacity-80" />
          <div className="absolute inset-x-3 top-0 h-6 rounded-b-md border-x border-b border-accent/30" />
        </div>
      </div>

      <span className="mt-8 font-display text-2xl tracking-wide text-gold-gradient">
        King Royale
      </span>
      <span className="mt-3 text-[0.55rem] uppercase tracking-[0.45em] text-muted-foreground">
        Pouring the experience
      </span>

      <div className="mt-6 h-px w-40 overflow-hidden bg-border">
        <div
          className={`h-px bg-[image:var(--gradient-gold)] transition-[width] duration-[1200ms] ease-out ${
            done ? "w-full" : "w-1/3"
          }`}
        />
      </div>
    </div>
  );
}
