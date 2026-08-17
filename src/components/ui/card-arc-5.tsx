import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * amicro — card-arc
 * A set of cards that fan out into an arc on hover / tap.
 * Adapted to render arbitrary card content and site tokens.
 *
 * Accessibility:
 * - each card is focusable and activatable by keyboard (Enter / Space)
 * - tapping a card selects it instantly (fast spring, no hover required)
 * - honours prefers-reduced-motion: the arc opens statically, no springs
 */

export interface CardArc5Props {
  angle?: number;
  gap?: number;
  yOffset?: number;
  duration?: number;
  hoverIntensity?: number;
  cardClassName?: string;
  className?: string;
  /** fan the arc open by default (hover then lifts individual cards) */
  defaultOpen?: boolean;
  /** card nodes, rendered inside the arc */
  children: React.ReactNode[];
  onActiveChange?: (index: number) => void;
  labels?: string[];
}

export default function CardArc5({
  angle = 30,
  gap = 70,
  yOffset = 10,
  duration = 0.5,
  hoverIntensity = 1,
  cardClassName = "",
  className = "",
  defaultOpen = false,
  children,
  onActiveChange,
  labels,
}: CardArc5Props) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [tapped, setTapped] = React.useState<number | null>(null);
  const reduce = useReducedMotion();
  const cards = React.Children.toArray(children);
  const count = cards.length;
  const center = (count - 1) / 2;
  const open = isHovered || defaultOpen || !!reduce;

  const select = (i: number) => {
    setTapped(i);
    onActiveChange?.(i);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex cursor-pointer items-center justify-center ${className}`}
    >
      {cards.map((node, i) => {
        const dist = i - center;
        const span = Math.max(center, 0.5);
        const targetRotate = open ? (dist / span) * angle * hoverIntensity : 0;
        const targetX = open ? (dist / span) * gap * hoverIntensity : 0;
        const isTapped = tapped === i;

        let targetY = 0;
        if (open) {
          targetY = (Math.abs(dist) / span) * yOffset * hoverIntensity - yOffset * 0.5;
        }
        if (isTapped && !reduce) targetY -= 14;

        return (
          <motion.div
            key={i}
            role="button"
            tabIndex={0}
            aria-label={labels?.[i]}
            aria-pressed={isTapped}
            onMouseEnter={() => onActiveChange?.(i)}
            onFocus={() => onActiveChange?.(i)}
            onClick={() => select(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                select(i);
              }
            }}
            animate={
              reduce
                ? { rotate: targetRotate, x: targetX, y: targetY }
                : {
                    rotate: targetRotate,
                    x: targetX,
                    y: targetY,
                    scale: open ? (isTapped ? 1.08 : dist === 0 ? 1.05 : 1) : 1,
                  }
            }
            transition={
              reduce
                ? { duration: 0 }
                : isTapped
                  ? { type: "spring", stiffness: 520, damping: 26, mass: 0.5 }
                  : { type: "spring", stiffness: 180, damping: 20, mass: 0.8, duration }
            }
            style={{
              zIndex: (isTapped ? 10 : 0) + Math.round(count - Math.abs(dist)),
              originX: 0.5,
              originY: 1,
            }}
            {...(reduce
              ? {}
              : {
                  whileHover: { y: targetY - 14, scale: 1.08, zIndex: 20 },
                  whileTap: { scale: 1.02 },
                })}
            className={`absolute inset-0 overflow-hidden rounded-2xl border shadow-[0_24px_55px_-28px_oklch(0.35_0.05_168/0.45)] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent ${
              isTapped ? "border-accent/60" : "border-border"
            } ${cardClassName}`}
          >
            {node}
          </motion.div>
        );
      })}
    </div>
  );
}
