"use client";

import { motion } from "framer-motion";
import {
  Diamond,
  EASE_LUX,
  Eyebrow,
  OrnamentDivider,
  fade,
  rise,
  stagger,
} from "@/components/deck/primitives";

const cases = [
  {
    numeral: "I",
    title: "Apple v Samsung",
    line: "A fight over who owns phone designs",
  },
  {
    numeral: "II",
    title: "Colonial Pipeline",
    line: "A computer attack that stopped fuel supply",
  },
  {
    numeral: "III",
    title: "Shreya Singhal",
    line: "India's IT Act, 2000 and free speech online",
  },
];

/* Guilloché-inspired engraved circles — a quiet nod to fine watchmaking */
function Guilloche({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="absolute rounded-full border border-gold/[0.13]"
          style={{
            inset: `${i * 34}px`,
          }}
        />
      ))}
      <span className="absolute inset-[62px] rounded-full border border-gold/[0.2]" />
    </div>
  );
}

export default function Slide01Cover() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="relative h-full w-full bg-ivory overflow-hidden px-20 flex flex-col"
    >
      {/* ambient washes */}
      <div
        className="absolute inset-x-0 top-0 h-[420px]"
        style={{
          background:
            "radial-gradient(60% 90% at 50% -10%, rgba(214,190,140,0.28), transparent 70%)",
        }}
        aria-hidden
      />
      <Guilloche className="absolute -left-24 -top-24 w-[300px] h-[300px]" />
      <Guilloche className="absolute -right-28 -bottom-28 w-[340px] h-[340px]" />

      <div className="flex-1 flex flex-col items-center justify-center text-center z-10 -mt-3">
        <Eyebrow rules>IT for Managers · Mini-Capstone Project</Eyebrow>

        <motion.h1
          variants={rise}
          className="font-display font-medium text-ink leading-[0.98] tracking-[-0.015em] text-[84px] mt-8"
        >
          Patents, Cyberattacks
          <br />
          <span className="font-light">&amp; </span>
          <em className="shimmer-gold font-semibold">Cyber Law</em>
        </motion.h1>

        <OrnamentDivider className="mt-9" />

        <motion.p
          variants={fade}
          className="mt-7 text-[14.5px] font-body font-light tracking-[0.14em] uppercase text-ink-soft"
        >
          Three real cases — and what managers can learn from them
        </motion.p>

        {/* the three cases */}
        <div className="mt-14 grid grid-cols-3 gap-6 w-full max-w-[1020px]">
          {cases.map((c) => (
            <motion.div
              key={c.numeral}
              variants={rise}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.45, ease: EASE_LUX }}
              className="sheen card-lux relative px-7 pt-7 pb-6 text-left"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-[30px] font-light text-gold leading-none">
                  {c.numeral}
                </span>
                <Diamond size={5} className="opacity-70" />
              </div>
              <p className="mt-4 font-display text-[23px] font-semibold text-ink leading-tight">
                {c.title}
              </p>
              <p className="mt-2.5 text-[12px] font-body font-light text-ink-soft leading-relaxed">
                {c.line}
              </p>
              <span
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-gold-deep via-gold to-gold-light origin-left"
                style={{ width: "100%" }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* folio */}
      <motion.div
        variants={fade}
        className="relative z-10 pb-12 flex items-center justify-center gap-5"
      >
        <span className="hairline-gold w-20" />
        <p className="text-[10px] font-body tracking-[0.42em] uppercase text-ink-faint">
          A Mini-Capstone Study · MMXXV
        </p>
        <span className="hairline-gold w-20" />
      </motion.div>
    </motion.div>
  );
}
