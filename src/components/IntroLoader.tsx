import React, { useEffect, useState } from 'react';

interface IntroLoaderProps {
  onComplete: () => void;
}

/**
 * Endfield-Inspired Technical White Shutter Loader
 *
 * - Deliberate, readable ~3.1s multi-stage counter (000 -> 100) + 450ms hold at 100%
 * - Pure typography (no icon on page; icon stays in browser tab title only)
 * - Splits open vertically (top & bottom shutters) over 850ms to reveal the portfolio
 */
export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isSplitting, setIsSplitting] = useState<boolean>(false);
  const [isRemoved, setIsRemoved] = useState<boolean>(false);

  useEffect(() => {
    let rafId: number;
    const durationMs = 3100; // Deliberate 3.1s boot sequence so users can read & feel the pacing
    const startTime = performance.now();

    // Multi-stage pacing curve: steady climb with subtle organic cadence slows around 35% and 78%
    const getPacedProgress = (t: number): number => {
      if (t <= 0) return 0;
      if (t >= 1) return 1;

      if (t < 0.32) {
        // 0% -> 34%
        const local = t / 0.32;
        return 0.34 * (1 - Math.pow(1 - local, 2));
      } else if (t < 0.45) {
        // Brief cadence slow 34% -> 42%
        const local = (t - 0.32) / 0.13;
        return 0.34 + 0.08 * local;
      } else if (t < 0.78) {
        // Climb 42% -> 86%
        const local = (t - 0.45) / 0.33;
        return 0.42 + 0.44 * (1 - Math.pow(1 - local, 2));
      } else {
        // Final lock 86% -> 100%
        const local = (t - 0.78) / 0.22;
        return 0.86 + 0.14 * (1 - Math.pow(1 - local, 3));
      }
    };

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / durationMs);
      const paced = getPacedProgress(t);
      const currentVal = Math.round(paced * 100);

      setProgress(currentVal);

      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        // Hold at 100% for 450ms so the user clearly registers completion before shutter opens
        setTimeout(() => {
          setIsSplitting(true);
        }, 450);
        setTimeout(() => {
          setIsRemoved(true);
          onComplete();
        }, 1350);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [onComplete]);

  if (isRemoved) return null;

  const statusText =
    progress < 35
      ? 'INITIALIZING RUNTIME'
      : progress < 75
      ? 'LOADING ARCHITECTURE DATA'
      : progress < 100
      ? 'PREPARING INTERFACE'
      : 'READY';

  const formattedNum = String(progress).padStart(3, '0');

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Top Shutter Panel */}
      <div
        style={{
          transform: isSplitting ? 'translate3d(0, -100%, 0)' : 'translate3d(0, 0, 0)',
          transition: 'transform 850ms cubic-bezier(0.76, 0, 0.24, 1)',
        }}
        className="relative flex h-1/2 w-full flex-col justify-between border-b border-zinc-200 bg-zinc-50 px-6 pt-6 pb-4 sm:px-12 sm:pt-10"
      >
        {/* Top Corner Crosshairs & Metadata */}
        <div className="flex items-center justify-between font-mono text-[11px] tracking-widest text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="font-bold text-zinc-900">+</span>
            <span>AL ADIYAT // PORTFOLIO</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">BANDUNG, ID</span>
            <span className="font-bold text-zinc-900">+</span>
          </div>
        </div>

        {/* Center Typography sitting just above the split seam */}
        <div className="mx-auto flex w-full max-w-md flex-col items-center">
          <div className="mb-2 flex items-center gap-3 font-mono text-xs tracking-widest text-zinc-800 uppercase">
            <span className="font-bold text-zinc-900">Al Adiyat Nur Rusuli Jaya</span>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-500">Fullstack</span>
          </div>
        </div>
      </div>

      {/* Center Razor-Thin Progress Line along the seam */}
      <div
        style={{
          opacity: isSplitting ? 0 : 1,
          transition: 'opacity 250ms ease',
        }}
        className="absolute inset-x-0 top-1/2 z-10 h-[2px] -translate-y-1/2 bg-zinc-200"
      >
        <div
          style={{ width: `${progress}%` }}
          className="h-full bg-emerald-600 transition-none"
        />
      </div>

      {/* Bottom Shutter Panel */}
      <div
        style={{
          transform: isSplitting ? 'translate3d(0, 100%, 0)' : 'translate3d(0, 0, 0)',
          transition: 'transform 850ms cubic-bezier(0.76, 0, 0.24, 1)',
        }}
        className="relative flex h-1/2 w-full flex-col justify-between bg-zinc-50 px-6 pt-4 pb-6 sm:px-12 sm:pb-10"
      >
        {/* Status Indicator right below the split seam */}
        <div className="mx-auto flex w-full max-w-md items-center justify-between font-mono text-[11px] tracking-wider text-zinc-500">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-emerald-600" />
            {statusText}
          </span>
          <span className="font-semibold text-zinc-900">{formattedNum}%</span>
        </div>

        {/* Bottom Corner Crosshairs & Giant Endfield-Style Counter */}
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-3 font-mono text-[11px] tracking-widest text-zinc-400">
            <span className="font-bold text-zinc-900">+</span>
            <span>FOLIO 2026</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="font-mono text-5xl font-extrabold tracking-tighter text-zinc-900 sm:text-7xl">
              {formattedNum}
            </span>
            <span className="font-mono text-sm font-bold text-emerald-600">%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
