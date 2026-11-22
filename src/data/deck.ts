import type { ComponentType } from "react";
import Slide01Cover from "@/components/deck/slides/Slide01Cover";
import Slide02AppleTimeline from "@/components/deck/slides/Slide02AppleTimeline";
import Slide03AppleAnalysis from "@/components/deck/slides/Slide03AppleAnalysis";
import Slide04ColonialPipeline from "@/components/deck/slides/Slide04ColonialPipeline";
import Slide05ColonialAnalysis from "@/components/deck/slides/Slide05ColonialAnalysis";
import Slide06ShreyaLaw from "@/components/deck/slides/Slide06ShreyaLaw";
import Slide07ShreyaBusiness from "@/components/deck/slides/Slide07ShreyaBusiness";
import Slide08Recommendations from "@/components/deck/slides/Slide08Recommendations";
import Slide09Sources from "@/components/deck/slides/Slide09Sources";

export interface SlideDef {
  id: string;
  /** Roman numeral shown in the counter & overview */
  numeral: string;
  /** Short label for overview tiles */
  label: string;
  /** Speaker notes extracted from the original deck */
  notes: string;
  component: ComponentType;
}

export const DECK_TITLE = "Patents, Cyberattacks & Cyber Law";

export const slides: SlideDef[] = [
  {
    id: "cover",
    numeral: "I",
    label: "Cover — Three Cases",
    notes:
      "Speaker: Member 1 (about 30 seconds). Simple opening: Today we show three real stories. One is about copying phone designs (patent). One is about a computer attack on a fuel company (cybercrime). One is about an Indian law that was too wide (IT Act). For each story we tell what happened, what it cost, how it ended, and what managers can learn.",
    component: Slide01Cover,
  },
  {
    id: "case-1-story",
    numeral: "II",
    label: "Case I · Apple v Samsung",
    notes:
      "Speaker: Member 1 (about 40 seconds). In 2011 Apple took Samsung to court. Apple said Samsung copied how the iPhone looks - the round corners, the rim around the screen and the grid of icons. A patent is a legal right that stops others from copying your idea or design. In 2012 a jury said Samsung must pay over 1 billion dollars. In 2016 the US Supreme Court said you cannot always take the whole profit of a phone if only some parts were copied. In 2018 a new jury said 539 million dollars. Soon after, both sides settled.",
    component: Slide02AppleTimeline,
  },
  {
    id: "case-1-analysis",
    numeral: "III",
    label: "Case I · Analysis",
    notes:
      "Speaker: Member 2 (about 40 seconds). Look at the chart. Apple wanted about 1 billion dollars. Samsung said it should pay only 28 million. The jury chose 539 million - closer to Apple. For both companies the money was small, but the fight took seven years and a lot of legal cost. Our own view: copying a rival's design can become a long and costly fight. Managers should check other people's patents before launching a product, protect their own designs early, and think about settling when the fight costs more than the win.",
    component: Slide03AppleAnalysis,
  },
  {
    id: "case-2-story",
    numeral: "IV",
    label: "Case II · Colonial Pipeline",
    notes:
      "Speaker: Member 3 (about 40 seconds). Colonial Pipeline carries fuel in the United States. In May 2021 a hacker group called DarkSide got into its computers and locked them with ransomware. Ransomware is a virus that locks your files until you pay. The company shut the pipeline, and there were fuel shortages on the East Coast. Colonial paid about 4.4 million dollars. Later the US Justice Department got back about 2.3 million dollars. The hackers also stole nearly 100 GB of data.",
    component: Slide04ColonialPipeline,
  },
  {
    id: "case-2-analysis",
    numeral: "V",
    label: "Case II · Analysis",
    notes:
      "Speaker: Member 4 (about 40 seconds). The hackers did not use a clever trick. They used a password for an old account that nobody needed anymore, and that account had no second login step. The password had leaked online. A second step, like an OTP, could have stopped them. Managers should close old accounts, use a second login step, keep backups and have a plan ready. Also note: Colonial paid, but the unlock tool was slow, so they restored from their own backups. Whether to pay is a big debate, because paying may encourage criminals.",
    component: Slide05ColonialAnalysis,
  },
  {
    id: "case-3-story",
    numeral: "VI",
    label: "Case III · Shreya Singhal",
    notes:
      "Speaker: Member 5 (about 40 seconds). In 2012 two young women in Palghar were arrested over a Facebook post - one wrote it, the other only liked it - under Section 66A of the IT Act. A law student, Shreya Singhal, went to the Supreme Court. On 24 March 2015 the Court struck down Section 66A because it was too vague and hurt free speech. It also said that under Section 79, online platforms must remove content only after a court order or government notice. And it kept Section 69A, where the government can block websites, because it has safeguards.",
    component: Slide06ShreyaLaw,
  },
  {
    id: "case-3-analysis",
    numeral: "VII",
    label: "Case III · Analysis",
    notes:
      "Speaker: Member 6 (about 40 seconds). What does this mean for business? Platforms like social media and shopping sites get clearer rules: they must act on a court order or a government notice, not on every complaint. People cannot be arrested under 66A. But the government can still block websites under 69A, so companies need a team to handle such orders. Critical point: even after the 2015 judgment, the police kept using Section 66A. In March 2021 the group PUCL said 745 cases were still running in 11 states, and the Supreme Court was shocked. So managers should not only know the law on paper, they should watch how it is used.",
    component: Slide07ShreyaBusiness,
  },
  {
    id: "recommendations",
    numeral: "VIII",
    label: "What Managers Should Do",
    notes:
      "Speaker: all members share (about 40 seconds). Our three cases give three simple rules. One: protect your ideas - register them and check others' patents. Two: protect your systems - second login step, close old accounts, keep backups. Three: follow the law and watch how it is applied. The big idea: technology, law and people are linked, and one weak link can hurt the whole business.",
    component: Slide08Recommendations,
  },
  {
    id: "sources",
    numeral: "IX",
    label: "Sources & Thanks",
    notes:
      "Closing: thank you, we are ready for questions. Key numbers were checked against more than one source where possible.",
    component: Slide09Sources,
  },
];
