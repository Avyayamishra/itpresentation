"use client";

import {
  AnimatePresence,
  MotionConfig,
  motion,
  type Variants,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  Maximize,
  Minimize,
  StickyNote,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { slides } from "@/data/deck";
import { EASE_LUX } from "@/components/deck/primitives";
import { cn } from "@/lib/utils";

const CANVAS_W = 1280;
const CANVAS_H = 720;

const slideVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 110 : -110,
    opacity: 0,
    scale: 0.982,
    filter: "blur(10px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -110 : 110,
    opacity: 0,
    scale: 0.982,
    filter: "blur(10px)",
  }),
};

function CornerOrnaments() {
  const base =
    "absolute w-7 h-7 border-gold/50 pointer-events-none z-20";
  return (
    <div aria-hidden>
      <span className={cn(base, "top-2.5 left-2.5 border-t border-l")} />
      <span className={cn(base, "top-2.5 right-2.5 border-t border-r")} />
      <span className={cn(base, "bottom-2.5 left-2.5 border-b border-l")} />
      <span className={cn(base, "bottom-2.5 right-2.5 border-b border-r")} />
    </div>
  );
}

/* Full hairline frame — the maison envelope */
function InnerFrame() {
  return (
    <span
      aria-hidden
      className="absolute inset-[10px] border border-gold/[0.16] pointer-events-none z-10"
    />
  );
}

/* Guilloché echo — engraved quarter on content slides */
function GuillocheEcho() {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: EASE_LUX }}
      className="absolute -bottom-16 -right-16 w-[210px] h-[210px] pointer-events-none z-[5]"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="absolute rounded-full border border-gold/[0.12]"
          style={{ inset: `${i * 22}px` }}
        />
      ))}
    </motion.div>
  );
}

function AmbientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-ivory-deep" />
      <motion.div
        className="blob-champagne absolute -top-48 -left-40 w-[720px] h-[720px] rounded-full opacity-60"
        animate={{ x: [0, 50, 0], y: [0, 36, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="blob-champagne absolute -bottom-56 -right-44 w-[820px] h-[820px] rounded-full opacity-50"
        animate={{ x: [0, -44, 0], y: [0, -30, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="blob-champagne absolute top-1/3 left-1/2 w-[520px] h-[520px] rounded-full opacity-30"
        animate={{ x: [0, 30, -20, 0], y: [0, -24, 20, 0] }}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="grain absolute inset-0" />
    </div>
  );
}

export default function Deck() {
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);
  const [notesOpen, setNotesOpen] = useState(false);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const [idle, setIdle] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const total = slides.length;
  const current = slides[index];

  const go = useCallback(
    (dir: number) => {
      setShowHint(false);
      setState(([i]) => [
        Math.min(Math.max(i + dir, 0), total - 1),
        dir,
      ]);
    },
    [total]
  );

  const jump = useCallback(
    (target: number) => {
      setShowHint(false);
      setState(([i]) => [Math.min(Math.max(target, 0), total - 1), target >= i ? 1 : -1]);
    },
    [total]
  );

  /* ── responsive canvas scaling ── */
  useLayoutEffect(() => {
    const update = () => {
      const isNarrow = window.innerWidth < 640;
      const reservedH = notesOpen
        ? (isNarrow ? 360 : 300)
        : (isNarrow ? 176 : 140);
      const s = Math.min(
        (window.innerWidth - (isNarrow ? 12 : 100)) / CANVAS_W,
        (window.innerHeight - reservedH) / CANVAS_H
      );
      setScale(Math.min(s, 1.6));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [notesOpen]);

  /* ── idle detection for control auto-hide ── */
  const pokeIdle = useCallback(() => {
    setIdle(false);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setIdle(true), 3600);
  }, []);

  useEffect(() => {
    idleTimer.current = setTimeout(() => setIdle(true), 3600);
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  /* ── fullscreen sync ── */
  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void document.documentElement.requestFullscreen();
    }
  }, []);

  /* ── keyboard ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key;
      if (key === "Escape") {
        if (overviewOpen) setOverviewOpen(false);
        else if (notesOpen) setNotesOpen(false);
        return;
      }
      if (overviewOpen) {
        if (key === "o" || key === "O") setOverviewOpen(false);
        return;
      }
      switch (key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
          e.preventDefault();
          go(1);
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          go(-1);
          break;
        case "Home":
          jump(0);
          break;
        case "End":
          jump(total - 1);
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
        case "n":
        case "N":
          setNotesOpen((v) => !v);
          break;
        case "o":
        case "O":
        case "g":
        case "G":
          setOverviewOpen(true);
          break;
      }
      pokeIdle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, jump, total, overviewOpen, notesOpen, toggleFullscreen, pokeIdle]);

  /* ── hide hint after a while ── */
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 7000);
    return () => clearTimeout(t);
  }, []);

  /* ── touch swipe ── */
  const onTouchStart = (e: React.TouchEvent) => {
    pokeIdle();
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current || overviewOpen) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) > 64 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      go(dx < 0 ? 1 : -1);
    }
    touchStart.current = null;
  };

  const notesVisible = notesOpen && !overviewOpen;

  return (
    <MotionConfig reducedMotion="user">
    <div
      className="fixed inset-0 overflow-hidden select-none"
      onMouseMove={pokeIdle}
      onClick={pokeIdle}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AmbientBackground />

      {/* ── stage ── */}
      <main
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-[padding] duration-500 pb-24 md:pb-0",
          notesVisible && "pb-0 md:pb-[15rem]"
        )}
      >
        <div
          className="relative transition-[width,height] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
          style={{
            width: CANVAS_W * scale,
            height: CANVAS_H * scale,
          }}
        >
          <div
            className="absolute top-0 left-0 origin-top-left transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
            style={{
              width: CANVAS_W,
              height: CANVAS_H,
              transform: `scale(${scale})`,
            }}
          >
            <div className="relative w-full h-full bg-ivory border border-gold-pale shadow-[0_48px_120px_-32px_rgba(87,66,29,0.35),0_0_0_1px_rgba(255,255,255,0.7)_inset]">
              <CornerOrnaments />
              <InnerFrame />
              <AnimatePresence>{index !== 0 && <GuillocheEcho key="guilloche" />}</AnimatePresence>
              <AnimatePresence
                custom={direction}
                mode="popLayout"
                initial={true}
              >
                <motion.section
                  key={current.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.9, ease: EASE_LUX }}
                  className="absolute inset-0 overflow-hidden"
                  aria-label={`Slide ${index + 1} of ${total}: ${current.label}`}
                >
                  <current.component />
                </motion.section>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      {/* ── edge navigation arrows ── */}
      <button
        onClick={() => go(-1)}
        disabled={index === 0}
        aria-label="Previous slide"
        className={cn(
          "hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 h-11 w-11 items-center justify-center rounded-full border border-gold/35 bg-porcelain/80 backdrop-blur-sm text-ink transition-all duration-500",
          index === 0
            ? "opacity-0 pointer-events-none"
            : idle
              ? "opacity-0 hover:opacity-100 pointer-events-auto"
              : "opacity-90 hover:bg-porcelain hover:border-gold/60 hover:scale-105"
        )}
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
      </button>
      <button
        onClick={() => go(1)}
        disabled={index === total - 1}
        aria-label="Next slide"
        className={cn(
          "hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 h-11 w-11 items-center justify-center rounded-full border border-gold/35 bg-porcelain/80 backdrop-blur-sm text-ink transition-all duration-500",
          index === total - 1
            ? "opacity-0 pointer-events-none"
            : idle
              ? "opacity-0 hover:opacity-100 pointer-events-auto"
              : "opacity-90 hover:bg-porcelain hover:border-gold/60 hover:scale-105"
        )}
      >
        <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
      </button>

      {/* ── bottom control bar ── */}
      <motion.div
        animate={{ opacity: idle && !notesVisible ? 0 : 1, y: idle && !notesVisible ? 12 : 0 }}
        transition={{ duration: 0.6, ease: EASE_LUX }}
        className={cn(
          "absolute inset-x-0 bottom-0 z-30 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 px-6 pb-4 md:pb-5",
          notesVisible && "pb-[13.5rem]"
        )}
      >
        <div className="flex items-baseline gap-1.5 justify-end">
          <span className="font-display text-[24px] md:text-[28px] font-medium text-ink leading-none">
            {current.numeral}
          </span>
          <span className="text-[10px] md:text-[11px] tracking-[0.3em] text-ink-faint font-body">
            / {slides[total - 1].numeral}
          </span>
        </div>

        {/* segmented progress */}
        <nav
          className="flex items-center gap-1.5 md:gap-2"
          aria-label="Slide progress"
        >
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => jump(i)}
              title={s.label}
              aria-label={`Go to slide ${i + 1}: ${s.label}`}
              className="group py-2"
            >
              <span
                className={cn(
                  "block h-[3px] rounded-full transition-all duration-700",
                  i === index
                    ? "w-8 md:w-10 bg-gradient-to-r from-gold-deep via-gold to-gold-light"
                    : i < index
                      ? "w-4 md:w-6 bg-gold/55 group-hover:bg-gold"
                      : "w-4 md:w-6 bg-ink/15 group-hover:bg-gold/50"
                )}
              />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          {[
            {
              label: notesVisible ? "Hide notes" : "Presenter notes (N)",
              icon: StickyNote,
              active: notesVisible,
              onClick: () => setNotesOpen((v) => !v),
            },
            {
              label: "Overview (O)",
              icon: Grid3X3,
              active: overviewOpen,
              onClick: () => setOverviewOpen(true),
            },
            {
              label: isFullscreen ? "Exit fullscreen (F)" : "Fullscreen (F)",
              icon: isFullscreen ? Minimize : Maximize,
              active: false,
              onClick: toggleFullscreen,
            },
          ].map(({ label, icon: Icon, active, onClick }) => (
            <button
              key={label}
              onClick={onClick}
              title={label}
              aria-label={label}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300",
                active
                  ? "border-gold/70 bg-gold-pale text-gold-deep"
                  : "border-gold/25 bg-porcelain/70 text-ink-soft hover:border-gold/60 hover:text-gold-deep hover:scale-105"
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={1.5} />
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── first-visit hint ── */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.8, ease: EASE_LUX, delay: 1 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 hidden md:flex items-center gap-4 rounded-full border border-gold/25 bg-porcelain/85 backdrop-blur px-5 py-2 text-[10.5px] tracking-[0.18em] uppercase text-ink-soft font-body"
          >
            <span>← → navigate</span>
            <span className="hairline-gold w-6" />
            <span>N notes</span>
            <span className="hairline-gold w-6" />
            <span>O overview</span>
            <span className="hairline-gold w-6" />
            <span>F fullscreen</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── presenter notes drawer ── */}
      <AnimatePresence>
        {notesVisible && (
          <motion.aside
            initial={{ y: 260, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 260, opacity: 0 }}
            transition={{ duration: 0.65, ease: EASE_LUX }}
            className="absolute bottom-0 inset-x-0 z-40 border-t border-gold/30 bg-ivory/[0.97] backdrop-blur-md shadow-[0_-20px_60px_-20px_rgba(87,66,29,0.25)]"
            aria-label="Presenter notes"
          >
            <div className="mx-auto max-w-5xl px-8 py-5">
              <div className="flex items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <StickyNote className="h-4 w-4 text-gold-deep" strokeWidth={1.5} />
                  <span className="eyebrow font-body">Presenter Notes</span>
                  <span className="hairline-gold w-12" />
                  <span className="font-display text-lg italic text-ink/80">
                    {current.label}
                  </span>
                </div>
                <button
                  onClick={() => setNotesOpen(false)}
                  aria-label="Close notes"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 text-ink-soft hover:border-gold/60 hover:text-gold-deep transition-colors"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
              <p className="text-[13px] leading-relaxed text-ink-soft max-h-28 overflow-y-auto lux-scroll pr-3 font-body">
                {current.notes}
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── overview grid ── */}
      <AnimatePresence>
        {overviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_LUX }}
            className="absolute inset-0 z-50 bg-ivory/92 backdrop-blur-xl overflow-y-auto lux-scroll"
            role="dialog"
            aria-label="Slide overview"
          >
            <div className="mx-auto max-w-[1000px] px-6 md:px-8 py-8 md:py-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <span className="eyebrow font-body">Deck Overview</span>
                  <span className="hairline-gold w-16" />
                  <span className="font-display italic text-ink-soft">
                    {total} slides
                  </span>
                </div>
                <button
                  onClick={() => setOverviewOpen(false)}
                  aria-label="Close overview"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-porcelain text-ink-soft hover:border-gold/60 hover:text-gold-deep transition-colors"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {slides.map((s, i) => (
                  <motion.button
                    key={s.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.6, ease: EASE_LUX }}
                    onClick={() => {
                      jump(i);
                      setOverviewOpen(false);
                    }}
                    className={cn(
                      "group text-left",
                      i === index && "ring-1 ring-gold/70"
                    )}
                  >
                    <div
                      className={cn(
                        "relative overflow-hidden border transition-all duration-500 bg-ivory",
                        i === index
                          ? "border-gold/70 shadow-[0_16px_40px_-16px_rgba(87,66,29,0.35)]"
                          : "border-gold/25 group-hover:border-gold/60 group-hover:shadow-[0_16px_40px_-16px_rgba(87,66,29,0.3)] group-hover:-translate-y-1"
                      )}
                    >
                      <div className="w-full aspect-video relative overflow-hidden pointer-events-none">
                        <div
                          className="absolute top-0 left-0 origin-top-left"
                          style={{
                            width: CANVAS_W,
                            height: CANVAS_H,
                            transform: "scale(0.2475)",
                          }}
                        >
                          <s.component />
                        </div>
                      </div>
                      <span
                        className={cn(
                          "absolute top-2 left-2 px-2 py-0.5 text-[9px] tracking-[0.2em] font-body uppercase rounded-sm",
                          i === index
                            ? "bg-gold-deep text-porcelain"
                            : "bg-porcelain/85 text-gold-deep"
                        )}
                      >
                        {s.numeral}
                      </span>
                    </div>
                    <p className="mt-2.5 text-[12px] tracking-[0.06em] text-ink-soft font-body group-hover:text-gold-deep transition-colors">
                      {s.label}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </MotionConfig>
  );
}
