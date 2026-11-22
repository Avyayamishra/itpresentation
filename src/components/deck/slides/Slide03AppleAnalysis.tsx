"use client";

import { motion } from "framer-motion";
import { Handshake, Hourglass, Lightbulb } from "lucide-react";
import {
  EASE_LUX,
  Eyebrow,
  LuxCard,
  SlideFooter,
  fade,
  rise,
  stagger,
} from "@/components/deck/primitives";

const bars = [
  { label: "Apple asked for", value: 1000, display: "$1,000M", pct: 100, tone: "pale" },
  { label: "Samsung offered", value: 28, display: "$28M", pct: 8, tone: "light" },
  { label: "Jury decided", value: 539, display: "$539M", pct: 54, tone: "gold" },
] as const;

const cards = [
  {
    icon: Hourglass,
    title: "Business Impact",
    text: "Seven years of court fights and big legal bills for both firms. The money was small for such large companies, but the case left a lasting mark on US patent law.",
  },
  {
    icon: Handshake,
    title: "Solution Used",
    text: "Both sides settled in June 2018 instead of going to court again. This ended the fight, but the terms were not made public.",
  },
];

export default function Slide03AppleAnalysis() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="relative h-full w-full bg-ivory overflow-hidden px-16 pt-14 pb-20 flex flex-col"
    >
      <div
        className="absolute inset-y-0 left-0 w-[480px]"
        style={{
          background:
            "radial-gradient(70% 60% at -10% 30%, rgba(214,190,140,0.2), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="z-10">
        <Eyebrow>Case I · Analysis</Eyebrow>
        <motion.h2
          variants={rise}
          className="font-display font-medium text-[50px] leading-[1.04] text-ink mt-4 tracking-[-0.01em]"
        >
          What it cost{" "}
          <span className="font-light italic text-gold-deep">&amp;</span> what
          we learn
        </motion.h2>
      </div>

      <div className="relative z-10 mt-9 flex gap-8 flex-1 min-h-0">
        {/* ── chart card ── */}
        <LuxCard className="w-[44%] px-9 py-8 flex flex-col">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] font-body font-medium uppercase tracking-[0.3em] text-gold-deep">
              2018 Retrial
            </span>
            <span className="text-[10px] font-body font-light text-ink-faint tracking-[0.12em]">
              damages · $ million
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-7 flex-1 justify-center">
            {bars.map((b, i) => (
              <div key={b.label}>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-[12px] font-body font-normal text-ink tracking-[0.04em]">
                    {b.label}
                  </span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 + i * 0.18, duration: 0.6, ease: EASE_LUX }}
                    className="font-display text-[21px] font-semibold text-ink"
                  >
                    {b.display}
                  </motion.span>
                </div>
                <div className="h-[14px] rounded-[3px] bg-ink/[0.05] border border-gold/10 overflow-hidden">
                  <motion.div
                    className={
                      b.tone === "gold"
                        ? "h-full rounded-[3px] bg-gradient-to-r from-gold-light via-gold to-gold-deep shadow-[0_2px_10px_rgba(169,139,79,0.45)]"
                        : b.tone === "light"
                          ? "h-full rounded-[3px] bg-gold/45"
                          : "h-full rounded-[3px] bg-gold-pale border-r border-gold/30"
                    }
                    initial={{ width: 0 }}
                    animate={{ width: `${b.pct}%` }}
                    transition={{
                      delay: 0.55 + i * 0.18,
                      duration: 1.1,
                      ease: EASE_LUX,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <motion.p
            variants={fade}
            className="mt-6 pt-5 border-t border-gold/15 text-[12px] font-body font-light italic text-ink-soft leading-relaxed"
          >
            The jury landed closer to Apple&rsquo;s ask — but far below the
            billion.
          </motion.p>
        </LuxCard>

        {/* ── analysis cards ── */}
        <div className="flex-1 flex flex-col gap-5">
          {cards.map((c) => (
            <LuxCard key={c.title} className="flex-1 px-8 py-6 flex gap-6 items-center">
              <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-full border border-gold/35 bg-porcelain">
                <c.icon className="h-5 w-5 text-gold-deep" strokeWidth={1.4} />
              </div>
              <div>
                <h3 className="font-display text-[22px] font-semibold text-ink leading-none">
                  {c.title}
                </h3>
                <p className="mt-2.5 text-[12.5px] font-body font-light text-ink-soft leading-relaxed">
                  {c.text}
                </p>
              </div>
            </LuxCard>
          ))}

          <LuxCard gold className="flex-1 px-8 py-6 flex gap-6 items-center">
            <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-gold-deep/90">
              <Lightbulb className="h-5 w-5 text-porcelain" strokeWidth={1.4} />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-display text-[22px] font-semibold text-ink leading-none">
                  Our View
                </h3>
                <span className="h-3 w-px bg-gold-deep/40" />
                <span className="text-[9.5px] font-body font-medium uppercase tracking-[0.28em] text-gold-ink">
                  The Manager&rsquo;s Takeaway
                </span>
              </div>
              <p className="mt-2.5 text-[12.5px] font-body font-light text-ink-soft leading-relaxed">
                Copying a rival&rsquo;s design is risky and slow to settle.
                Check other firms&rsquo; patents before a launch, protect your
                own designs early, and settle when a fight costs more than it
                can win.
              </p>
            </div>
          </LuxCard>
        </div>
      </div>

      <SlideFooter sources="Bloomberg via Carrier Management and BNN Bloomberg; Reuters via VentureBeat; Capital Law" />
    </motion.div>
  );
}
