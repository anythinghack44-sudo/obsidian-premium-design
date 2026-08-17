import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * amicro — card-arc-5
 * Five cards that fan out into an arc on hover.
 * Adapted to render arbitrary card content and site tokens.
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
  /** exactly five nodes, rendered inside the arc cards */
  children: React.ReactNode[];
  onActiveChange?: (index: number) => void;
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
}: CardArc5Props) {
  const [isHovered, setIsHovered] = React.useState(false);
  const reduce = useReducedMotion();
  const center = 2;
  const open = isHovered || defaultOpen || !!reduce;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex cursor-pointer items-center justify-center ${className}`}
    >
      {children.slice(0, 5).map((node, i) => {
        const dist = i - center;
        const targetRotate = open ? dist * (angle / center) * hoverIntensity : 0;
        const targetX = open ? dist * (gap / center) * hoverIntensity : 0;

        let targetY = 0;
        if (open) {
          if (Math.abs(dist) === 2) targetY = yOffset;
          else if (Math.abs(dist) === 1) targetY = -0.2 * yOffset;
          else targetY = -yOffset;
          targetY = targetY * hoverIntensity;
        }

        return (
          <motion.div
            key={i}
            onMouseEnter={() => onActiveChange?.(i)}
            animate={
              reduce
                ? { rotate: targetRotate, x: targetX, y: targetY }
                : {
                    rotate: targetRotate,
                    x: targetX,
                    y: targetY,
                    scale: open ? (dist === 0 ? 1.05 : 1) : 1,
                  }
            }
            transition={{ type: "spring", stiffness: 180, damping: 20, mass: 0.8, duration }}
            style={{ zIndex: 3 - Math.abs(dist), originX: 0.5, originY: 1 }}
            {...(reduce
              ? {}
              : { whileHover: { y: (targetY || 0) - 14, scale: 1.08, zIndex: 10 } })}
            className={`absolute inset-0 overflow-hidden rounded-2xl border border-border shadow-[0_24px_60px_-20px_oklch(0.05_0_0/0.9)] ${cardClassName}`}
          >
            {node}
          </motion.div>
        );
      })}
    </div>
  );
}
