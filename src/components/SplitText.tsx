import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

type Split = "chars" | "words" | "lines";

interface SplitTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  split?: Split;
  delay?: number;
  stagger?: number;
  className?: string;
  /** class applied to each animated unit (for gradient text etc.) */
  unitClassName?: string;
}

/**
 * Scroll-triggered split-text reveal: each character / word / line rises
 * out of a mask with a blur burn-off. Collapses to static text when the
 * visitor prefers reduced motion.
 */
export function SplitText({
  children,
  as = "span",
  split = "chars",
  delay = 0,
  stagger = 0.03,
  className = "",
  unitClassName = "",
}: SplitTextProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  if (reduce) {
    return <Tag className={className}>{children}</Tag>;
  }

  const words = children.split(" ");

  const container = {
    hidden: {},
    show: { transition: { delayChildren: delay, staggerChildren: stagger } },
  };

  // A CSS filter on a background-clip:text element hides the glyphs in
  // Chromium, so gradient units rise without the blur burn-off.
  const blurSafe = !unitClassName.includes("gradient");

  const unit = {
    hidden: { opacity: 0, y: "0.9em", ...(blurSafe ? { filter: "blur(10px)" } : {}) },
    show: {
      opacity: 1,
      y: "0em",
      ...(blurSafe ? { filter: "blur(0px)" } : {}),
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      aria-label={children}
    >
      {words.map((word, wi) => (
        <span key={`${word}-${wi}`} className="inline-block overflow-hidden align-bottom">
          {split === "chars" ? (
            <span className="inline-block" aria-hidden>
              {Array.from(word).map((char, ci) => (
                <motion.span
                  key={`${char}-${ci}`}
                  variants={unit}
                  className={`inline-block ${unitClassName}`}
                >
                  {char}
                </motion.span>
              ))}
              {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
            </span>
          ) : (
            <motion.span variants={unit} className={`inline-block ${unitClassName}`} aria-hidden>
              {word}
              {wi < words.length - 1 && <>&nbsp;</>}
            </motion.span>
          )}
        </span>
      ))}
    </Tag>
  );
}

/** Paragraph / block that wipes up behind a mask on scroll. */
export function LineReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: "1.2em" }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
