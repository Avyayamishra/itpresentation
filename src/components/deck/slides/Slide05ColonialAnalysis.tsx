"use client";

import { motion } from "framer-motion";
import { Fuel, ShieldCheck, TriangleAlert, KeyRound } from "lucide-react";
import {
  Diamond,
  Eyebrow,
  LuxCard,
  SlideFooter,
  rise,
  stagger,
  staggerFast,
} from "@/components/deck/primitives";

const quadrants = [
  {
    icon: TriangleAlert,
    title: "What Went Wrong",
    items: [
      "An old VPN account was still switched on",
      "Its password had leaked online",
      "No second login step (like an OTP) — the password alone was enough",
    ],
    gold: false,
  },
  {
    icon: Fuel,
    title: "What It Caused",
    items: [
      "The pipeline stopped and fuel ran short on the US East Coast",
      "The US government declared an emergency",
      "The hackers stole nearly 100 GB of data",
    ],
    gold: false,
  },
  {
    icon: ShieldCheck,
    title: "How to Prevent It",
    items: [
      "Close accounts that nobody uses",
      "Add a second login step for all remote access",
      "Keep safe backups and practise an attack plan",
    ],
    gold: false,
  },
  {
    icon: KeyRound,
    title: "Our Lessons",
    items: [
      "Simple habits matter more than costly tools",
      "Paying is risky — the unlock tool was slow, so Colonial used its own backups",
      "Paying is debated because it may fund criminals",
    ],
    gold: true,
  },
];

export default function Slide05ColonialAnalysis() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="relative h-full w-full bg-ivory overflow-hidden px-16 pt-14 pb-20 flex flex-col"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 60% at 85% 110%, rgba(214,190,140,0.22), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="z-10 flex items-end justify-between">
        <div>
          <Eyebrow>Case II · Analysis</Eyebrow>
          <motion.h2
            variants={rise}
            className="font-display font-medium text-[50px] leading-[1.04] text-ink mt-4 tracking-[-0.01em]"
          >
            Why it happened{" "}
            <span className="font-light italic text-gold-deep">&amp;</span> how
            to stop it
          </motion.h2>
        </div>
        <motion.p
          variants={rise}
          className="font-display italic text-[16px] text-ink-faint pb-2 text-right"
        >
          the breach was ordinary —
          <br />
          the consequences were not
        </motion.p>
      </div>

      <motion.div
        variants={staggerFast}
        className="relative z-10 mt-9 grid grid-cols-2 grid-rows-2 gap-6 flex-1"
      >
        {quadrants.map((q) => (
          <LuxCard
            key={q.title}
            gold={q.gold}
            className="px-7 py-5 flex flex-col overflow-hidden"
          >
            <div className="flex items-center gap-4">
              <div
                className={
                  q.gold
                    ? "shrink-0 flex h-11 w-11 items-center justify-center rounded-full bg-gold-deep/90"
                    : "shrink-0 flex h-11 w-11 items-center justify-center rounded-full border border-gold/35 bg-porcelain"
                }
              >
                <q.icon
                  className={q.gold ? "h-5 w-5 text-porcelain" : "h-5 w-5 text-gold-deep"}
                  strokeWidth={1.4}
                />
              </div>
              <h3 className="font-display text-[24px] font-semibold text-ink leading-none">
                {q.title}
              </h3>
              {q.gold && (
                <span className="ml-auto text-[9px] font-body font-medium uppercase tracking-[0.26em] text-gold-ink">
                  Our View
                </span>
              )}
            </div>
            <ul className="mt-3.5 flex flex-col gap-2">
              {q.items.map((item) => (
                <motion.li
                  key={item}
                  variants={rise}
                  className="flex items-start gap-3 text-[13px] font-body font-light text-ink-soft leading-relaxed"
                >
                  <Diamond size={5} className="mt-[7px] shrink-0 opacity-80" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </LuxCard>
        ))}
      </motion.div>

      <SlideFooter sources="TechTarget; Al Jazeera; BankInfoSecurity (citing Bloomberg); Threatpost" />
    </motion.div>
  );
}
