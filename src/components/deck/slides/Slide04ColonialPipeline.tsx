"use client";

import { motion } from "framer-motion";
import {
  Counter,
  EASE_LUX,
  Eyebrow,
  fade,
  rise,
  stagger,
  staggerFast,
} from "@/components/deck/primitives";

const steps = [
  {
    n: "1",
    date: "Before May 7",
    text: "Hackers log in with a leaked password for an old VPN account.",
  },
  {
    n: "2",
    date: "May 7, 2021",
    text: "Ransomware locks the IT systems. Colonial shuts the pipeline.",
  },
  {
    n: "3",
    date: "May 8",
    text: "Colonial pays the ransom — about $4.4 million in bitcoin.",
  },
  {
    n: "4",
    date: "May 12",
    text: "The pipeline runs again after fuel shortages on the US East Coast.",
  },
  {
    n: "5",
    date: "June 7",
    text: "The US Justice Department takes back about $2.3 million.",
  },
];

const defs = [
  {
    term: "Ransomware",
    def: "a virus that locks files until money is paid",
  },
  {
    term: "VPN",
    def: "a safe link for staff to log in from outside the office",
  },
];

export default function Slide04ColonialPipeline() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="relative h-full w-full bg-ivory overflow-hidden px-16 pt-14 pb-20 flex flex-col"
    >
      <div
        className="absolute inset-x-0 top-0 h-[360px]"
        style={{
          background:
            "radial-gradient(55% 75% at 20% -10%, rgba(214,190,140,0.24), transparent 70%)",
        }}
        aria-hidden
      />

      {/* header */}
      <div className="z-10 flex items-end justify-between">
        <div>
          <Eyebrow>Case II · Cyberattack</Eyebrow>
          <motion.h2
            variants={rise}
            className="font-display font-medium text-[54px] leading-[1.02] text-ink mt-4 tracking-[-0.01em]"
          >
            Colonial Pipeline
          </motion.h2>
          <motion.p
            variants={fade}
            className="mt-1.5 text-[15px] font-body font-light text-ink-soft"
          >
            <span className="italic font-display text-[18px] text-gold-deep">
              one old password
            </span>{" "}
            — how a single leaked credential stopped fuel to the US East Coast
          </motion.p>
        </div>
        <motion.span
          variants={fade}
          className="font-display italic text-[15px] text-ink-faint pb-2"
        >
          DarkSide ransomware · May 2021
        </motion.span>
      </div>

      {/* stats band */}
      <motion.div
        variants={rise}
        className="relative z-10 mt-8 card-lux px-10 py-7 grid grid-cols-3"
      >
        {[
          {
            counter: <Counter value={4.4} prefix="$" suffix="M" decimals={1} />,
            caption: "ransom paid in bitcoin — about 75 BTC",
          },
          {
            counter: <Counter value={2.3} prefix="$" suffix="M" decimals={1} />,
            caption: "taken back later by the US Justice Department",
          },
          {
            counter: <Counter value={100} prefix="~" suffix=" GB" />,
            caption: "of company data stolen by the hackers",
          },
        ].map((s, i) => (
          <div
            key={i}
            className={
              i === 0
                ? "pr-10"
                : "pl-10 border-l border-gold/20"
            }
          >
            <div className="font-display text-[58px] font-semibold leading-none text-transparent bg-clip-text bg-gradient-to-br from-gold-deep via-[#9a7c44] to-[#c2a26b]">
              {s.counter}
            </div>
            <p className="mt-3 text-[12px] font-body font-light text-ink-soft leading-snug">
              {s.caption}
            </p>
          </div>
        ))}
      </motion.div>

      {/* incident timeline */}
      <motion.div
        variants={staggerFast}
        className="relative z-10 mt-9 flex-1 flex flex-col justify-center"
      >
        <div className="flex items-stretch gap-0">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              variants={rise}
              className="relative flex-1 px-5"
            >
              <div className="flex items-center">
                <motion.span
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.8 + i * 0.14,
                    duration: 0.7,
                    ease: EASE_LUX,
                  }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-porcelain font-display text-[17px] font-semibold text-gold-deep shadow-[0_4px_14px_-4px_rgba(169,139,79,0.4)]"
                >
                  {s.n}
                </motion.span>
                {i < steps.length - 1 && (
                  <motion.span
                    className="flex-1 h-px bg-gradient-to-r from-gold/45 to-gold/15 ml-3"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      delay: 0.95 + i * 0.14,
                      duration: 0.6,
                      ease: EASE_LUX,
                    }}
                    style={{ originX: 0 }}
                  />
                )}
              </div>
              <p className="mt-4 text-[11px] font-body font-medium uppercase tracking-[0.2em] text-gold-deep">
                {s.date}
              </p>
              <p className="mt-2 text-[12px] font-body font-light text-ink-soft leading-relaxed pr-3">
                {s.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* definitions + sources */}
      <motion.div
        variants={fade}
        className="relative z-10 flex items-end justify-between gap-8"
      >
        <div className="flex gap-3">
          {defs.map((d) => (
            <div
              key={d.term}
              className="flex items-baseline gap-2.5 rounded-full border border-gold/30 bg-porcelain/70 px-4 py-1.5"
            >
              <span className="text-[10.5px] font-body font-semibold uppercase tracking-[0.16em] text-gold-deep">
                {d.term}
              </span>
              <span className="text-[10.5px] font-body font-light text-ink-faint">
                {d.def}
              </span>
            </div>
          ))}
        </div>
        <p className="text-[10px] font-normal tracking-[0.08em] text-ink-faint text-right">
          <span className="font-body uppercase tracking-[0.28em] text-gold-ink text-[9px] mr-2">
            Sources
          </span>
          TechTarget; Al Jazeera; Threatpost
        </p>
      </motion.div>
    </motion.div>
  );
}
