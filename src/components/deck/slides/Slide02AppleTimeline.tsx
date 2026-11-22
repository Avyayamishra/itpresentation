"use client";

import { motion } from "framer-motion";
import { Scale } from "lucide-react";
import {
  EASE_LUX,
  Eyebrow,
  SlideFooter,
  fade,
  rise,
  stagger,
  staggerFast,
} from "@/components/deck/primitives";
import { cn } from "@/lib/utils";

const events = [
  {
    year: "2011",
    title: "The Suit",
    text: "Apple says Samsung copied the iPhone's look — round corners, the rim around the screen, the grid of icons — and takes it to court.",
  },
  {
    year: "2012",
    title: "$1 Billion Verdict",
    text: "A jury says Samsung must pay Apple over $1 billion for infringing its design patents.",
  },
  {
    year: "2016",
    title: "Supreme Court",
    text: "The whole profit of a phone cannot be taken when only some parts were copied — the case returns for a retrial.",
  },
  {
    year: "2018",
    title: "$539 Million Retrial",
    text: "A new jury sets the damages at $539 million after a seven-year fight.",
  },
  {
    year: "Jun 2018",
    title: "Settlement",
    text: "Both companies settle. The terms are kept secret, closing the patent war.",
    highlight: true,
  },
];

export default function Slide02AppleTimeline() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="relative h-full w-full bg-ivory overflow-hidden px-16 pt-14 pb-20 flex flex-col"
    >
      <div
        className="absolute inset-x-0 top-0 h-[300px]"
        style={{
          background:
            "radial-gradient(55% 80% at 78% -10%, rgba(214,190,140,0.22), transparent 70%)",
        }}
        aria-hidden
      />

      {/* header */}
      <div className="flex items-start justify-between gap-10 z-10">
        <div>
          <Eyebrow>Case I · The Patent Fight</Eyebrow>
          <motion.h2
            variants={rise}
            className="font-display font-medium text-[56px] leading-[1.02] text-ink mt-4 tracking-[-0.01em]"
          >
            Apple <span className="font-light italic text-gold-deep">v</span>{" "}
            Samsung
          </motion.h2>
          <motion.p
            variants={fade}
            className="mt-2 text-[15px] font-body font-light tracking-[0.05em] text-ink-soft"
          >
            <span className="italic font-display text-[17px] text-gold-deep">
              a fight over phone design
            </span>{" "}
            — seven years, two juries, one Supreme Court
          </motion.p>
        </div>

        {/* definition card */}
        <motion.div
          variants={rise}
          className="card-lux relative w-[350px] shrink-0 px-7 py-6 border-l-2 border-l-gold/70"
        >
          <div className="flex items-center gap-2.5 mb-3">
            <Scale className="h-4 w-4 text-gold-deep" strokeWidth={1.5} />
            <span className="text-[10px] font-body font-medium uppercase tracking-[0.3em] text-gold-deep">
              What is a patent?
            </span>
          </div>
          <p className="text-[13px] font-body font-light text-ink-soft leading-relaxed">
            A legal right that stops others from copying your invention or
            design for a fixed number of years.
          </p>
        </motion.div>
      </div>

      {/* timeline — years above the rule, diamonds on the rule */}
      <div className="relative z-10 mt-auto mb-auto pt-8">
        <motion.div variants={staggerFast} className="grid grid-cols-5 gap-6">
          {events.map((e, i) => (
            <motion.span
              key={e.year}
              className="font-display text-[28px] font-semibold leading-none text-gold-deep pb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.55 + i * 0.16,
                duration: 0.7,
                ease: EASE_LUX,
              }}
            >
              {e.year}
            </motion.span>
          ))}
        </motion.div>

        <div className="relative h-px mx-2">
          <motion.span
            className="absolute inset-y-0 left-0 right-0 origin-left bg-gradient-to-r from-gold-light/70 via-gold to-gold-deep h-px"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 1.6, ease: EASE_LUX }}
          />
        </div>

        <motion.div variants={staggerFast} className="grid grid-cols-5 gap-6 -mt-[5px]">
          {events.map((e, i) => (
            <motion.span
              key={e.year}
              initial={{ scale: 0, rotate: 135 }}
              animate={{ scale: 1, rotate: 45 }}
              transition={{
                delay: 0.75 + i * 0.16,
                duration: 0.55,
                ease: EASE_LUX,
              }}
              className={cn(
                "inline-block rotate-45 border border-gold h-[10px] w-[10px]",
                e.highlight
                  ? "bg-gold/85 border-gold/85 shadow-[0_0_0_4px_rgba(169,139,79,0.18)]"
                  : "bg-ivory"
              )}
            />
          ))}
        </motion.div>

        <motion.div variants={staggerFast} className="grid grid-cols-5 gap-6 mt-4">
          {events.map((e) => (
            <motion.div key={e.year} variants={rise} className="flex flex-col">
              <p className="text-[11px] font-body font-medium uppercase tracking-[0.22em] text-ink">
                {e.title}
              </p>
              <p className="mt-2 text-[12px] font-body font-light text-ink-soft leading-relaxed pr-2">
                {e.text}
              </p>
              {e.highlight && (
                <motion.span
                  variants={fade}
                  className="mt-3 self-start rounded-full bg-gold-deep px-3 py-1 text-[9px] font-body font-medium uppercase tracking-[0.24em] text-porcelain"
                >
                  Case Closed
                </motion.span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <SlideFooter sources="Verdict (2018); Reuters via VentureBeat; Bloomberg via BNN Bloomberg; Capital Law" />
    </motion.div>
  );
}
