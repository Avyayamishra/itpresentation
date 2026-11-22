"use client";

import { motion } from "framer-motion";
import { FileCheck2, MessageSquareHeart, ShieldBan } from "lucide-react";
import {
  Counter,
  Eyebrow,
  LuxCard,
  rise,
  stagger,
  staggerFast,
  fade,
} from "@/components/deck/primitives";

const implications = [
  {
    icon: FileCheck2,
    title: "Platforms get clearer rules",
    text: "Social media, video and shopping sites do not have to remove a post after every user complaint. They act on a court order or a government notice.",
  },
  {
    icon: MessageSquareHeart,
    title: "Online comments are safer",
    text: "People cannot be arrested under 66A for what they post. Other laws and company rules still apply to harmful posts.",
  },
  {
    icon: ShieldBan,
    title: "Blocking power remains",
    text: "The government can still order blocking under 69A, so companies need a team that can act on such orders fast. (Our view)",
  },
];

export default function Slide07ShreyaBusiness() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="relative h-full w-full bg-ivory overflow-hidden px-16 pt-14 pb-12 flex flex-col"
    >
      <div
        className="absolute inset-x-0 bottom-0 h-[380px]"
        style={{
          background:
            "radial-gradient(55% 80% at 50% 115%, rgba(214,190,140,0.26), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="z-10">
        <Eyebrow>Case III · Analysis</Eyebrow>
        <motion.h2
          variants={rise}
          className="font-display font-medium text-[50px] leading-[1.04] text-ink mt-4 tracking-[-0.01em]"
        >
          What it means{" "}
          <span className="font-light italic text-gold-deep">for business</span>
        </motion.h2>
      </div>

      <div className="relative z-10 mt-9 grid grid-cols-[1fr_430px] gap-8 flex-1 min-h-0">
        {/* ── implications ── */}
        <motion.div variants={staggerFast} className="flex flex-col gap-4 justify-center">
          {implications.map((it) => (
            <LuxCard key={it.title} className="px-8 py-5 flex items-start gap-6">
              <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-full border border-gold/35 bg-porcelain mt-1">
                <it.icon className="h-5 w-5 text-gold-deep" strokeWidth={1.4} />
              </div>
              <div>
                <h3 className="font-display text-[23px] font-semibold text-ink leading-none">
                  {it.title}
                </h3>
                <p className="mt-2.5 text-[13px] font-body font-light text-ink-soft leading-relaxed">
                  {it.text}
                </p>
              </div>
            </LuxCard>
          ))}
        </motion.div>

        {/* ── the 745 panel ── */}
        <LuxCard gold className="px-10 py-8 flex flex-col items-center text-center justify-center relative overflow-hidden">
          <span className="text-[9.5px] font-body font-semibold uppercase tracking-[0.32em] text-gold-deep">
            Did the problem end in 2015?
          </span>
          <span className="font-display italic text-[15px] text-ink-soft mt-1.5">
            Not fully.
          </span>
          <div className="mt-3 font-display text-[88px] font-semibold leading-none text-transparent bg-clip-text bg-gradient-to-br from-gold-deep via-[#9a7c44] to-[#c2a26b] drop-shadow-[0_6px_18px_rgba(131,103,58,0.25)]">
            <Counter value={745} />
          </div>
          <p className="mt-4 text-[12.5px] font-body font-light text-ink-soft leading-relaxed max-w-[300px]">
            cases under the struck-down Section 66A were still running in 11
            states in March 2021, said the rights group PUCL.
          </p>
          <motion.p
            variants={fade}
            className="mt-4 pt-4 border-t border-gold-deep/20 text-[12px] font-body font-light italic text-ink-soft leading-relaxed max-w-[310px]"
          >
            In 2021 the Supreme Court said it was <em className="text-gold-deep font-normal">shocked</em> that people were still being charged under this law.
          </motion.p>
        </LuxCard>
      </div>

      {/* lesson banner */}
      <motion.div
        variants={fade}
        className="relative z-10 mt-6 flex items-center justify-center gap-5"
      >
        <span className="hairline-gold w-24" />
        <p className="font-display italic text-[20px] text-ink text-center">
          A court ruling is not enough — managers must follow{" "}
          <span className="text-gold-deep font-semibold">how laws are really used</span>.
        </p>
        <span className="hairline-gold w-24" />
      </motion.div>
    </motion.div>
  );
}
