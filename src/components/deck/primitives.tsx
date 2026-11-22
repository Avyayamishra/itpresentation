"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ═══ Motion language — slow, weighted, expensive-feeling ═══ */

export const EASE_LUX = [0.22, 1, 0.36, 1] as const;

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.4 } },
};

export const staggerFast = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } },
};

export const rise = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_LUX },
  },
};

export const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.1, ease: EASE_LUX } },
};

export const riseSoft = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_LUX },
  },
};

/* ═══ Eyebrow — letter-spaced label with optional flanking rules ═══ */

export function Eyebrow({
  children,
  className,
  rules = false,
}: {
  children: ReactNode;
  className?: string;
  rules?: boolean;
}) {
  return (
    <motion.span
      variants={fade}
      className={cn("eyebrow font-body inline-flex items-center gap-4", className)}
    >
      {rules && <span className="hairline-gold w-10" aria-hidden />}
      <span>{children}</span>
      {rules && <span className="hairline-gold w-10" aria-hidden />}
    </motion.span>
  );
}

/* ═══ Diamond — the maison ornament ═══ */

export function Diamond({
  className,
  size = 7,
  filled = true,
}: {
  className?: string;
  size?: number;
  filled?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block rotate-45 border-gold",
        filled ? "bg-gold/80 border-gold/80" : "border-gold/70",
        className
      )}
      style={{ width: size, height: size }}
    />
  );
}

/* ═══ Ornament divider — rule ◆ rule ═══ */

export function OrnamentDivider({ className }: { className?: string }) {
  return (
    <motion.div
      variants={fade}
      className={cn("flex items-center justify-center gap-3", className)}
      aria-hidden
    >
      <span className="hairline-gold w-16" />
      <Diamond size={5} />
      <Diamond size={8} />
      <Diamond size={5} />
      <span className="hairline-gold w-16" />
    </motion.div>
  );
}

/* ═══ Serif display headline with mixed italic-gold segment support ═══ */

export function Display({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.h1
      variants={rise}
      className={cn(
        "font-display font-medium text-ink leading-[1.02] tracking-[-0.01em]",
        className
      )}
    >
      {children}
    </motion.h1>
  );
}

/* ═══ Luxury card with mount reveal + hover sheen ═══ */

export function LuxCard({
  children,
  className,
  gold = false,
}: {
  children: ReactNode;
  className?: string;
  gold?: boolean;
}) {
  return (
    <motion.div
      variants={rise}
      whileHover={{ y: -4, transition: { duration: 0.4, ease: EASE_LUX } }}
      className={cn(
        "sheen",
        gold ? "card-lux-gold" : "card-lux",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

/* ═══ Animated counter — springs into view ═══ */

export function Counter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 2.2,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, mv, value]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${v.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}${suffix}`;
      }
    });
    return unsub;
  }, [spring, prefix, suffix, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}

/* ═══ Slide footer — sources + folio numeral ═══ */

export function SlideFooter({
  sources,
  className,
}: {
  sources?: string;
  className?: string;
}) {
  return (
    <motion.div
      variants={fade}
      className={cn(
        "absolute inset-x-16 bottom-7 flex items-end justify-between gap-8",
        className
      )}
    >
      {sources ? (
        <p className="text-[10px] font-body font-normal tracking-[0.08em] text-ink-faint max-w-[860px] leading-relaxed">
          <span className="font-body uppercase tracking-[0.28em] text-gold-ink text-[9px] mr-2">
            Sources
          </span>
          {sources}
        </p>
      ) : (
        <span />
      )}
    </motion.div>
  );
}

/* ═══ Small caps kicker chip ═══ */

export function Kicker({
  children,
  className,
  solid = false,
}: {
  children: ReactNode;
  className?: string;
  solid?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[9.5px] font-body font-medium uppercase tracking-[0.24em]",
        solid
          ? "bg-gold-deep text-porcelain"
          : "border border-gold/40 text-gold-deep bg-porcelain/60",
        className
      )}
    >
      {children}
    </span>
  );
}
