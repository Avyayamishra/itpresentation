"use client";

import { motion } from "framer-motion";
import {
  Diamond,
  Eyebrow,
  OrnamentDivider,
  rise,
  stagger,
  staggerFast,
  fade,
} from "@/components/deck/primitives";

const groups = [
  {
    case: "Case I",
    title: "Apple v Samsung",
    entries: [
      ["Verdict", "Apple and Samsung patent war (2018), verdict.co.uk"],
      ["Reuters via VentureBeat", "Apple and Samsung settle 7-year U.S. patent dispute (2018)"],
      ["Bloomberg via BNN Bloomberg", "Apple's US$539M in damages a big win over Samsung (2018)"],
      ["Carrier Management (Bloomberg)", "25 May 2018, carriermanagement.com"],
      ["Capital Law", "Apple and Samsung settle their seven-year patent dispute"],
    ],
  },
  {
    case: "Case II",
    title: "Colonial Pipeline",
    entries: [
      ["TechTarget", "FBI seized Colonial Pipeline ransom using private key (2021)"],
      ["TechTarget", "Colonial Pipeline hack explained, techtarget.com"],
      ["Al Jazeera", "Hackers breached Colonial Pipeline with one compromised password (4 June 2021)"],
      ["BankInfoSecurity", "Colonial attackers used compromised VPN credentials (2021)"],
      ["Threatpost", "DarkSide pwned Colonial with old VPN password (2021)"],
    ],
  },
  {
    case: "Case III",
    title: "Shreya Singhal case",
    entries: [
      ["Supreme Court of India", "AIR 2015 SC 1523 · WP (Crl) No. 167 of 2012"],
      ["SFLC.in", "Software Freedom Law Centre India"],
      ["Legally India", "24 March 2015, legallyindia.com"],
      ["Supreme Court Observer", "Section 66A: the dead law that still haunts India"],
      ["Journals of India", "Section 66A of IT Act (2021)"],
      ["Mondaq · Centre for Internet & Society", "Section 66A commentary and case analysis"],
    ],
  },
];

export default function Slide09Sources() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="relative h-full w-full bg-ivory overflow-hidden px-16 pt-14 pb-10 flex flex-col"
    >
      <div
        className="absolute inset-x-0 top-0 h-[280px]"
        style={{
          background:
            "radial-gradient(50% 75% at 30% -10%, rgba(214,190,140,0.2), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="z-10 flex items-end justify-between">
        <div>
          <Eyebrow>Appendix · Bibliography</Eyebrow>
          <motion.h2
            variants={rise}
            className="font-display font-medium text-[46px] leading-[1.04] text-ink mt-3.5 tracking-[-0.01em]"
          >
            Sources we used
          </motion.h2>
        </div>
        <motion.p
          variants={fade}
          className="max-w-[330px] text-right text-[11px] font-body font-light italic text-ink-faint leading-relaxed pb-2"
        >
          Key dates and amounts were checked against more than one source where
          possible. Figures are as reported at the time.
        </motion.p>
      </div>

      <motion.div
        variants={staggerFast}
        className="relative z-10 mt-8 grid grid-cols-3 gap-8"
      >
        {groups.map((g) => (
          <motion.div key={g.case} variants={rise} className="flex flex-col">
            <div className="flex items-baseline gap-3 pb-3 border-b border-gold/30">
              <span className="text-[9.5px] font-body font-semibold uppercase tracking-[0.28em] text-gold-deep">
                {g.case}
              </span>
              <span className="font-display italic text-[16px] text-ink">
                {g.title}
              </span>
            </div>
            <ul className="mt-4 flex flex-col gap-3.5">
              {g.entries.map(([src, ref]) => (
                <li key={src + ref} className="flex items-start gap-3">
                  <Diamond size={4} className="mt-[6px] shrink-0 opacity-60" />
                  <p className="text-[11.5px] font-body font-light leading-relaxed text-ink-soft">
                    <span className="font-normal text-ink">{src}</span>
                    {" — "}
                    {ref}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* closing */}
      <div className="relative z-10 mt-auto flex flex-col items-center">
        <OrnamentDivider />
        <motion.p
          variants={rise}
          className="mt-4 font-display text-[38px] font-medium text-ink leading-none"
        >
          Thank <span className="italic shimmer-gold font-semibold">you</span>
        </motion.p>
        <motion.p
          variants={fade}
          className="mt-3 text-[11px] font-body font-light uppercase tracking-[0.4em] text-ink-soft"
        >
          We welcome your questions
        </motion.p>
      </div>
    </motion.div>
  );
}
