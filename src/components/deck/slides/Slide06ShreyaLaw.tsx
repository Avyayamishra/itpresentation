"use client";

import { motion } from "framer-motion";
import { Gavel } from "lucide-react";
import {
  EASE_LUX,
  Eyebrow,
  LuxCard,
  SlideFooter,
  fade,
  rise,
  stagger,
  staggerFast,
} from "@/components/deck/primitives";

const happened = [
  {
    date: "Nov 2012",
    text: "Two young women in Palghar, Maharashtra are arrested — one wrote a Facebook post about the Mumbai shutdown after Bal Thackeray's death; her friend only liked it. Police use Section 66A of the IT Act, 2000.",
  },
  {
    date: "The Challenge",
    text: "Shreya Singhal, a law student, takes the case to the Supreme Court.",
  },
  {
    date: "24 March 2015",
    text: "The Court delivers its landmark judgment on free speech online.",
  },
];

const sections = [
  {
    id: "§ 66A",
    desc: "Sending \u201Coffensive\u201D or \u201Cannoying\u201D messages online was a crime.",
    verdict: "Struck Down",
    verdictStyle: "solid" as const,
    reason: "The words were too vague and it hurt free speech — Article 19(1)(a).",
  },
  {
    id: "§ 79",
    desc: "Online platforms are not blamed for users' posts if they follow the rules.",
    verdict: "Narrowed",
    verdictStyle: "outline" as const,
    reason: "A platform must remove a post only after a court order or a government notice.",
  },
  {
    id: "§ 69A",
    desc: "The government can order a website or page to be blocked.",
    verdict: "Kept",
    verdictStyle: "forest" as const,
    reason: "It has safeguards, like written reasons and a review.",
  },
];

function VerdictBadge({ style, children }: { style: "solid" | "outline" | "forest"; children: string }) {
  return (
    <span
      className={
        style === "solid"
          ? "rounded-full bg-gold-deep px-3.5 py-1.5 text-[9.5px] font-body font-semibold uppercase tracking-[0.22em] text-porcelain shadow-[0_4px_12px_-4px_rgba(131,103,58,0.6)]"
          : style === "outline"
            ? "rounded-full border border-gold/60 bg-porcelain/70 px-3.5 py-1.5 text-[9.5px] font-body font-semibold uppercase tracking-[0.22em] text-gold-deep"
            : "rounded-full border border-forest/50 bg-forest/5 px-3.5 py-1.5 text-[9.5px] font-body font-semibold uppercase tracking-[0.22em] text-forest"
      }
    >
      {children}
    </span>
  );
}

export default function Slide06ShreyaLaw() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="relative h-full w-full bg-ivory overflow-hidden px-16 pt-14 pb-20 flex flex-col"
    >
      <div
        className="absolute inset-y-0 right-0 w-[560px]"
        style={{
          background:
            "radial-gradient(60% 70% at 110% 40%, rgba(214,190,140,0.22), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 grid grid-cols-[420px_1fr] gap-12 flex-1 min-h-0">
        {/* ── left: story ── */}
        <div className="flex flex-col">
          <Eyebrow>Case III · IT Act, 2000</Eyebrow>
          <motion.h2
            variants={rise}
            className="font-display font-medium text-[52px] leading-[1.02] text-ink mt-4 tracking-[-0.01em]"
          >
            Shreya Singhal
          </motion.h2>
          <motion.p
            variants={fade}
            className="mt-1.5 text-[16px] font-display italic text-gold-deep"
          >
            a law that went too far
          </motion.p>

          <div className="mt-6 relative flex-1 flex flex-col justify-center pb-4">
            <motion.span
              className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-gold/60 via-gold/30 to-transparent"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.8, duration: 1.4, ease: EASE_LUX }}
              style={{ originY: 0 }}
              aria-hidden
            />
            <div className="flex flex-col gap-8 justify-center">
              {happened.map((h) => (
                <motion.div key={h.date} variants={rise} className="relative pl-8">
                  <span className="absolute left-0 top-[7px] h-[11px] w-[11px] rotate-45 border border-gold bg-ivory" aria-hidden />
                  <p className="text-[10.5px] font-body font-semibold uppercase tracking-[0.22em] text-gold-deep">
                    {h.date}
                  </p>
                  <p className="mt-1.5 text-[12.5px] font-body font-light text-ink-soft leading-relaxed">
                    {h.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── right: the three sections ── */}
        <motion.div variants={staggerFast} className="flex flex-col justify-center gap-5">
          {sections.map((s) => (
            <LuxCard key={s.id} className="px-8 py-5 flex items-center gap-7">
              <span className="font-display text-[34px] font-semibold text-transparent bg-clip-text bg-gradient-to-br from-gold-deep via-gold-deep to-gold leading-none w-[92px] shrink-0">
                {s.id}
              </span>
              <span className="self-stretch w-px bg-gold/20" aria-hidden />
              <div className="flex-1">
                <p className="text-[13.5px] font-body font-normal text-ink leading-snug">
                  {s.desc}
                </p>
                <p className="mt-1.5 text-[12px] font-body font-light italic text-ink-soft leading-relaxed">
                  {s.reason}
                </p>
              </div>
              <div className="shrink-0 self-center">
                <VerdictBadge style={s.verdictStyle}>{s.verdict}</VerdictBadge>
              </div>
            </LuxCard>
          ))}

          <motion.div variants={fade} className="flex items-center justify-center gap-4 pt-1">
            <span className="hairline-gold w-24" />
            <div className="flex items-center gap-2.5 text-ink-faint">
              <Gavel className="h-3.5 w-3.5 text-gold-deep" strokeWidth={1.5} />
              <span className="text-[10.5px] font-body font-light tracking-[0.14em] uppercase">
                Supreme Court of India · 24 March 2015
              </span>
            </div>
            <span className="hairline-gold w-24" />
          </motion.div>
        </motion.div>
      </div>

      <SlideFooter sources="SFLC.in; Legally India; Centre for Internet & Society; Supreme Court Observer" />
    </motion.div>
  );
}
