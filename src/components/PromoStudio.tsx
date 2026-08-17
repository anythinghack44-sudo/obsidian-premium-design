import { useState } from "react";
import { streamImage } from "@/lib/streamImage";

const PRESETS = [
  "A single bottle rising from a black marble plinth, water crown splash frozen mid-air",
  "Bottle on an emerald silk drape with golden crown motif light rays behind",
  "Ice cavern press shot, bottle backlit with cold emerald glow and drifting frost",
];

export function PromoStudio() {
  const [prompt, setPrompt] = useState<string>(PRESETS[0] ?? "");
  const [src, setSrc] = useState<string | null>(null);
  const [isFinal, setIsFinal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setError(null);
    setSrc(null);
    setIsFinal(false);
    try {
      await streamImage("/api/generate-image", prompt, (dataUrl, final) => {
        setSrc(dataUrl);
        if (final) setIsFinal(true);
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
      <div className="reveal">
        <p className="text-xs uppercase tracking-[0.4em] text-accent">Campaign Studio</p>
        <h2 className="mt-5 font-display text-4xl leading-[1.05] sm:text-5xl">
          Compose a <span className="text-gold-gradient">King Royale</span> promotion
        </h2>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
          Describe the mood and our studio renders a bespoke campaign still in the house
          palette — deep black, emerald, and gold.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p}
              onClick={() => setPrompt(p)}
              className="rounded-full border border-border px-4 py-2 text-left text-xs text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
            >
              {p.split(",")[0]}
            </button>
          ))}
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          className="mt-6 w-full resize-none rounded-lg border border-border bg-card/60 p-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent/60"
          placeholder="Describe your campaign still…"
        />

        <button
          onClick={generate}
          disabled={loading}
          className="mt-5 inline-flex items-center gap-3 rounded-full border border-accent/40 bg-accent/10 px-8 py-3.5 text-xs uppercase tracking-[0.28em] text-accent transition-all duration-500 hover:bg-accent/20 hover:tracking-[0.34em] disabled:opacity-50"
        >
          {loading ? "Rendering…" : "Render campaign"}
        </button>

        {error && <p className="mt-4 text-xs text-destructive">{error}</p>}
      </div>

      <div className="reveal surface-lux relative aspect-square overflow-hidden rounded-2xl">
        {src ? (
          <img
            src={src}
            alt="Generated King Royale campaign visual"
            className={
              isFinal
                ? "h-full w-full object-cover blur-0 transition-[filter] duration-700"
                : "h-full w-full object-cover blur-2xl transition-[filter] duration-700"
            }
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <div className="glow-orb h-24 w-24 rounded-full bg-primary/25 blur-2xl" />
            <p className="max-w-xs px-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {loading ? "Composing your visual" : "Your campaign still appears here"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
