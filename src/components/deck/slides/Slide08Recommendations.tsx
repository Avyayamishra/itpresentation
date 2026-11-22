"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import {
  EASE_LUX,
  Eyebrow,
  LuxCard,
  rise,
  stagger,
  staggerFast,
} from "@/components/deck/primitives";

const pillars = [
  {
    numeral: "I",
    title: "Protect your ideas",
    tag: "Case I · Apple v Samsung",
    items: [
      "Register your own designs and ideas early",
      "Check other firms' patents before a launch",
      "Keep clear records of who created what",
      "Think about a settlement before costs grow",
    ],
  },
  {
    numeral: "II",
    title: "Protect your systems",
    tag: "Case II · Colonial Pipeline",
    items: [
      "Use a second login step (like an OTP)",
      "Switch off old accounts, change leaked passwords",
      "Keep backups away from the main network",
      "Make an attack plan and practise it",
    ],
  },
  {
    numeral: "III",
    title: "Follow the law",
    tag: "Case III · Shreya Singhal",
    items: [
      "Know which parts of the IT Act apply to you",
      "Have a team to act on court and government orders",
      "Write clear rules for staff social media use",
      "Check for law changes every year",
    ],
  },
];

export default function Slide08Recommendations() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="relative h-full w-full bg-ivory overflow-hidden px-16 pt-14 pb-14 flex flex-col"
    >
      <div
        className="absolute inset-x-0 top-0 h-[300px]"
        style={{
          background:
            "radial-gradient(50% 80% at 50% -10%, rgba(214,190,140,0.24), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="z-10 text-center">
        <Eyebrow rules>Synthesis · The Manager&rsquo;s Playbook</Eyebrow>
        <motion.h2
          variants={rise}
          className="font-display font-medium text-[50px] leading-[1.04] text-ink mt-4 tracking-[-0.01em]"
        >
          What managers should do
        </motion.h2>
      </div>

      <motion.div
        variants={staggerFast}
        className="relative z-10 mt-9 grid grid-cols-3 gap-7 flex-1 min-h-0"
      >
        {pillars.map((p) => (
          <LuxCard key={p.numeral} className="px-8 py-7 flex flex-col">
            <div className="flex items-baseline justify-between">
              <span className="font-display text-[38px] font-light leading-none text-gold-deep/90">
                {p.numeral}
              </span>
              <span className="text-[9px] font-body font-medium uppercase tracking-[0.2em] text-ink-faint text-right">
                {p.tag}
              </span>
            </div>
            <div className="mt-4 pb-4 border-b border-gold/20">
              <h3 className="font-display text-[26px] font-semibold text-ink leading-tight">
                {p.title}
              </h3>
            </div>
            <ul className="mt-5 flex flex-col gap-4 flex-1">
              {p.items.map((item, j) => (
                <motion.li
                  key={item}
                  variants={rise}
                  className="flex items-start gap-3.5 text-[13px] font-body font-light text-ink-soft leading-relaxed"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 1.2 + j * 0.14 + pillars.indexOf(p) * 0.1,
                      duration: 0.5,
                      ease: EASE_LUX,
                    }}
                    className="mt-[1px] flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-deep shadow-[0_2px_8px_-2px_rgba(131,103,58,0.5)]"
                  >
                    <Check className="h-3 w-3 text-porcelain" strokeWidth={2.5} />
                  </motion.span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </LuxCard>
        ))}
      </motion.div>

      {/* big idea */}
      <motion.div
        variants={rise}
        className="relative z-10 mt-8 card-lux-gold px-12 py-5 flex items-center justify-center gap-6"
      >
        <span className="hairline-gold w-20 shrink-0" />
        <p className="font-display text-[21px] italic text-ink text-center leading-snug">
          Technology, law and people are linked —{" "}
          <span className="font-semibold not-italic text-gold-deep">
            one weak link can hurt the whole business.
          </span>
        </p>
        <span className="hairline-gold w-20 shrink-0" />
      </motion.div>
    </motion.div>
  );
}
