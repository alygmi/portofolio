import React, { useEffect, useRef, useState } from 'react';
import {
  Briefcase,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Cpu,
  X,
  CheckCircle2,
  Layers,
  MapPin,
  Calendar,
  ChevronsDown,
  ChevronsUp,
} from 'lucide-react';
import { PORTFOLIO_DATA, ExperienceItem } from '../data/portfolioData';
import { butterScrollTo } from '../utils/useButterScroll';

interface VirtualTimelineStep {
  stepIndex: number;
  cardIndex: number;
  subLock: 'top' | 'bottom' | 'single';
}

// Build virtual lock steps:
// Card 0 (PT Anyar Retail) has 7 rich bullets, so it gets 2 lock points: 'top' and 'bottom'.
// Cards 1..4 fit in a single view, so each gets 1 lock point: 'single'.
const VIRTUAL_STEPS: VirtualTimelineStep[] = [
  { stepIndex: 0, cardIndex: 0, subLock: 'top' },
  { stepIndex: 1, cardIndex: 0, subLock: 'bottom' },
  { stepIndex: 2, cardIndex: 1, subLock: 'single' },
  { stepIndex: 3, cardIndex: 2, subLock: 'single' },
  { stepIndex: 4, cardIndex: 3, subLock: 'single' },
  { stepIndex: 5, cardIndex: 4, subLock: 'single' },
];

export const ExperienceSection: React.FC = () => {
  const { experiences } = PORTFOLIO_DATA;
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyStageRef = useRef<HTMLDivElement | null>(null);
  const cardScrollRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Discrete virtual step (0..5)
  const [virtualStep, setVirtualStep] = useState<number>(0);
  const virtualStepRef = useRef<number>(0);
  const wheelCooldownRef = useRef<boolean>(false);

  const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null);

  const currentStepObj = VIRTUAL_STEPS[virtualStep] || VIRTUAL_STEPS[0];
  const activeIndex = currentStepObj.cardIndex;
  const activeSubLock = currentStepObj.subLock;

  // Whenever virtualStep changes, lock the active card's internal scroll position to Top or Bottom
  useEffect(() => {
    const step = VIRTUAL_STEPS[virtualStep];
    if (!step) return;

    const cardEl = cardScrollRefs.current[step.cardIndex];
    if (!cardEl) return;

    if (step.subLock === 'bottom') {
      const maxScroll = cardEl.scrollHeight - cardEl.clientHeight;
      cardEl.scrollTo({
        top: Math.max(0, maxScroll),
        behavior: 'smooth',
      });
    } else {
      cardEl.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [virtualStep]);

  // Sync discrete virtualStep with window scroll position (when user drags scrollbar or touch scrolls)
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || wheelCooldownRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollableDistance = rect.height - viewportHeight;

      if (scrollableDistance <= 0) return;

      const rawProgress = -rect.top / scrollableDistance;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      const snappedStep = Math.round(
        clampedProgress * (VIRTUAL_STEPS.length - 1)
      );
      if (snappedStep !== virtualStepRef.current) {
        virtualStepRef.current = snappedStep;
        setVirtualStep(snappedStep);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper to jump & lock to a specific virtualStep (0..5)
  const lockToVirtualStep = (nextStep: number) => {
    const clampedStep = Math.max(
      0,
      Math.min(VIRTUAL_STEPS.length - 1, nextStep)
    );
    virtualStepRef.current = clampedStep;
    setVirtualStep(clampedStep);

    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionTopAbsolute = window.scrollY + rect.top;
    const scrollableDistance = rect.height - window.innerHeight;
    const targetProgress =
      VIRTUAL_STEPS.length > 1 ? clampedStep / (VIRTUAL_STEPS.length - 1) : 0;

    wheelCooldownRef.current = true;
    butterScrollTo(sectionTopAbsolute + targetProgress * scrollableDistance);

    setTimeout(() => {
      wheelCooldownRef.current = false;
    }, 430);
  };

  // Helper when user clicks a company in the left rail or progress dots
  const jumpToCompanyCard = (cardIdx: number) => {
    const foundStep = VIRTUAL_STEPS.find((s) => s.cardIndex === cardIdx);
    if (foundStep) {
      lockToVirtualStep(foundStep.stepIndex);
    }
  };

  // Discrete wheel step-lock on the sticky stage
  useEffect(() => {
    const stageEl = stickyStageRef.current;
    if (!stageEl) return;

    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current || selectedExp) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const isPinned = rect.top <= 64 && rect.bottom >= window.innerHeight - 40;
      if (!isPinned) return;

      const goingDown = e.deltaY > 12;
      const goingUp = e.deltaY < -12;
      const current = virtualStepRef.current;

      // Step forward through virtual steps (0: Anyar Top -> 1: Anyar Bottom -> 2: IoTera -> ...)
      if (goingDown && current < VIRTUAL_STEPS.length - 1) {
        e.preventDefault();
        if (!wheelCooldownRef.current) {
          lockToVirtualStep(current + 1);
        }
        return;
      }

      // Step backward through virtual steps
      if (goingUp && current > 0) {
        e.preventDefault();
        if (!wheelCooldownRef.current) {
          lockToVirtualStep(current - 1);
        }
      }
      // At step 0 going up, or last step going down: allow natural page scroll!
    };

    stageEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => stageEl.removeEventListener('wheel', handleWheel);
  }, [selectedExp]);

  // Compact scroll track: 100vh viewport + 30vh per virtual step
  const compactTrackHeightVh = 100 + (VIRTUAL_STEPS.length - 1) * 30;

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{ height: `${compactTrackHeightVh}vh` }}
      className="relative border-t border-zinc-800/70"
    >
      {/* Sticky Viewport Container */}
      <div
        ref={stickyStageRef}
        className="sticky top-14 flex h-[calc(100vh-3.5rem)] flex-col justify-center overflow-hidden py-6 sm:py-10"
      >
        {/* Subtle ambient glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-3xl transition-transform duration-500"
          style={{
            transform: `translate3d(-50%, calc(-50% + ${(activeIndex - 2) * 18}px), 0)`,
          }}
          aria-hidden="true"
        />

        <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-between px-4 sm:px-6">
          {/* Top Header + Step Controls */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 font-mono text-xs text-indigo-300">
                <Briefcase className="h-3.5 w-3.5" />
                <span>STEP-LOCKED CAREER TIMELINE (2022 – 2026)</span>
              </div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Professional Experience
              </h2>
            </div>

            {/* Right: Prev/Next Step Buttons & Counter */}
            <div className="flex items-center gap-2.5">
              {activeIndex === 0 && (
                <div className="hidden items-center gap-1 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-mono text-xs text-emerald-300 sm:flex">
                  {activeSubLock === 'top' ? (
                    <>
                      <ChevronsDown className="h-3.5 w-3.5 animate-bounce" />
                      <span>PT Anyar Retail: Top View (1/2)</span>
                    </>
                  ) : (
                    <>
                      <ChevronsUp className="h-3.5 w-3.5" />
                      <span>PT Anyar Retail: Bottom View (2/2)</span>
                    </>
                  )}
                </div>
              )}

              <div className="flex items-center rounded-xl border border-zinc-800 bg-zinc-900/90 p-1">
                <button
                  type="button"
                  disabled={virtualStep === 0}
                  onClick={() => lockToVirtualStep(virtualStep - 1)}
                  className="rounded-lg p-1.5 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                  title="Previous Step"
                  aria-label="Previous Step"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <span className="px-2.5 font-mono text-xs">
                  <strong className="text-emerald-400">0{activeIndex + 1}</strong>
                  <span className="text-zinc-600"> / </span>
                  <span className="text-zinc-400">0{experiences.length}</span>
                </span>
                <button
                  type="button"
                  disabled={virtualStep === VIRTUAL_STEPS.length - 1}
                  onClick={() => lockToVirtualStep(virtualStep + 1)}
                  className="rounded-lg p-1.5 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                  title="Next Step"
                  aria-label="Next Step"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Center Stage: Left Timeline Rail + Locked Single Active Card */}
          <div className="my-auto grid grid-cols-1 items-center gap-6 py-3 lg:grid-cols-12">
            {/* Left 3 Cols: Interactive Vertical Progress Rail (Desktop) */}
            <div className="hidden lg:col-span-3 lg:flex lg:flex-col lg:gap-2">
              {experiences.map((exp, idx) => {
                const isCurrent = idx === activeIndex;
                const isPast = idx < activeIndex;

                return (
                  <button
                    key={exp.id}
                    type="button"
                    onClick={() => jumpToCompanyCard(idx)}
                    className={`group flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-all duration-300 ${
                      isCurrent
                        ? 'border-emerald-500/60 bg-emerald-500/10 text-white shadow-lg shadow-emerald-500/5 scale-[1.02]'
                        : 'border-transparent bg-zinc-900/30 text-zinc-500 hover:border-zinc-800 hover:bg-zinc-900/60 hover:text-zinc-300'
                    }`}
                  >
                    <div
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-bold transition-colors ${
                        isCurrent
                          ? 'bg-emerald-500 text-zinc-950'
                          : isPast
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      0{idx + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={`truncate text-xs font-semibold ${
                            isCurrent ? 'text-white' : 'text-zinc-400'
                          }`}
                        >
                          {exp.company}
                        </span>
                        {idx === 0 && isCurrent && (
                          <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 font-mono text-[9px] text-emerald-300">
                            {activeSubLock === 'top' ? 'TOP' : 'BTM'}
                          </span>
                        )}
                      </div>
                      <div className="truncate font-mono text-[10px] text-zinc-500">
                        {exp.period}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right 9 Cols: Discrete Step-Locked Card Stage */}
            <div className="relative h-[435px] sm:h-[415px] lg:col-span-9">
              {experiences.map((exp, idx) => {
                const isActive = idx === activeIndex;
                const isExitedUp = idx < activeIndex;

                const translateY = isActive ? 0 : isExitedUp ? -64 : 64;
                const scale = isActive ? 1 : isExitedUp ? 0.95 : 0.96;
                const opacity = isActive ? 1 : 0;

                const isCardZeroTopLock =
                  idx === 0 && isActive && activeSubLock === 'top';
                const isCardZeroBottomLock =
                  idx === 0 && isActive && activeSubLock === 'bottom';

                return (
                  <div
                    key={exp.id}
                    style={{
                      opacity,
                      transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
                      transition:
                        'transform 460ms cubic-bezier(0.22, 1, 0.36, 1), opacity 380ms cubic-bezier(0.22, 1, 0.36, 1)',
                      zIndex: isActive ? 20 : 10,
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                    aria-hidden={!isActive}
                    className="absolute inset-0 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/95 shadow-2xl"
                  >
                    {/* Inner Scrollable Content Container controlled by Top/Bottom Lock */}
                    <div
                      ref={(el) => {
                        cardScrollRefs.current[idx] = el;
                      }}
                      className="flex h-full flex-col justify-between overflow-y-auto p-5 sm:p-7 [scrollbar-width:thin] [scrollbar-color:#27272a_transparent]"
                    >
                      <div>
                        {/* Card Header */}
                        <div className="flex flex-col justify-between gap-3 border-b border-zinc-800/80 pb-3.5 sm:flex-row sm:items-center">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-400">
                                LOCKED CARD 0{idx + 1} OF 0{experiences.length}
                              </span>
                              {idx === 0 && (
                                <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 font-mono text-[10px] font-medium text-sky-300">
                                  {activeSubLock === 'top'
                                    ? 'PART 1/2 (TOP)'
                                    : 'PART 2/2 (BOTTOM)'}
                                </span>
                              )}
                              <span className="font-mono text-xs text-zinc-400">
                                {exp.domain}
                              </span>
                            </div>
                            <h3 className="mt-1.5 text-lg font-bold text-white sm:text-xl">
                              {exp.role}{' '}
                              <span className="text-zinc-500"> || </span>{' '}
                              <span className="text-emerald-400">{exp.company}</span>
                            </h3>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                            <span className="inline-flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-950 px-2.5 py-1 font-mono">
                              <Calendar className="h-3.5 w-3.5 text-emerald-400" />
                              {exp.period}
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-950 px-2.5 py-1">
                              <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                              {exp.location}
                            </span>
                          </div>
                        </div>

                        {/* Bullet Points */}
                        <ul className="mt-3.5 space-y-2.5">
                          {exp.summaryBullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex items-start gap-2.5 text-xs leading-relaxed text-zinc-300 sm:text-[13px]"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Footer: Tech Stack Badges & Deep Dive Trigger */}
                      <div className="mt-5 flex flex-col justify-between gap-3 border-t border-zinc-800/70 pt-4 sm:flex-row sm:items-center">
                        <div className="flex flex-wrap gap-1.5">
                          {exp.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md border border-zinc-800 bg-zinc-950 px-2 py-0.5 font-mono text-[11px] text-zinc-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {exp.architectureNotes &&
                          exp.architectureNotes.length > 0 && (
                            <button
                              type="button"
                              onClick={() => setSelectedExp(exp)}
                              className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 font-mono text-xs font-semibold text-emerald-300 transition-all hover:bg-emerald-500 hover:text-zinc-950 sm:self-auto"
                            >
                              <Cpu className="h-3.5 w-3.5" />
                              <span>
                                Architecture Notes ({exp.architectureNotes.length})
                              </span>
                              <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                          )}
                      </div>
                    </div>

                    {/* Bottom Gradient Hint when Card 1 is at Top Lock */}
                    {isCardZeroTopLock && (
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center bg-gradient-to-t from-zinc-950 via-zinc-950/85 to-transparent pt-10 pb-3">
                        <button
                          type="button"
                          onClick={() => lockToVirtualStep(1)}
                          className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-zinc-900/95 px-3.5 py-1 font-mono text-[11px] font-medium text-emerald-300 shadow-lg hover:bg-emerald-500 hover:text-zinc-950"
                        >
                          <ChevronsDown className="h-3.5 w-3.5 animate-bounce" />
                          <span>Scroll once to view bottom details & stack (2/2)</span>
                        </button>
                      </div>
                    )}

                    {/* Top Subtle Pill when Card 1 is at Bottom Lock */}
                    {isCardZeroBottomLock && (
                      <div className="pointer-events-none absolute right-5 top-3 z-20 hidden sm:block">
                        <button
                          type="button"
                          onClick={() => lockToVirtualStep(0)}
                          className="pointer-events-auto inline-flex items-center gap-1 rounded-full border border-zinc-700 bg-zinc-950/90 px-2.5 py-0.5 font-mono text-[10px] text-zinc-300 hover:border-emerald-500/40 hover:text-emerald-300"
                        >
                          <ChevronsUp className="h-3 w-3" />
                          <span>Back to Top (1/2)</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Progress Dots */}
          <div className="flex items-center justify-between gap-4 border-t border-zinc-800/60 pt-3">
            <div className="flex items-center gap-2">
              {VIRTUAL_STEPS.map((stepObj) => {
                const isCurrent = stepObj.stepIndex === virtualStep;
                const exp = experiences[stepObj.cardIndex];
                return (
                  <button
                    key={stepObj.stepIndex}
                    type="button"
                    onClick={() => lockToVirtualStep(stepObj.stepIndex)}
                    title={`${exp.company} ${
                      stepObj.subLock !== 'single' ? `(${stepObj.subLock})` : ''
                    }`}
                    aria-label={`Jump to step ${stepObj.stepIndex + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isCurrent
                        ? 'w-8 bg-emerald-400'
                        : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                    }`}
                  />
                );
              })}
            </div>

            <div className="font-mono text-[11px] text-zinc-500">
              PT Anyar Retail locks at Top (1/2) & Bottom (2/2) before advancing
            </div>
          </div>
        </div>
      </div>

      {/* Slide-Over / Modal Drawer for Deep-Dive Architecture Notes */}
      {selectedExp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-end bg-black/75 backdrop-blur-sm"
          onClick={() => setSelectedExp(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Architecture Notes for ${selectedExp.company}`}
        >
          <div
            className="flex h-full w-full max-w-2xl flex-col justify-between overflow-y-auto border-l border-zinc-800 bg-zinc-950 p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
                <div>
                  <span className="font-mono text-xs text-emerald-400">
                    UNDER THE HOOD • ENGINEERING CASE STUDY
                  </span>
                  <h3 className="mt-1 text-xl font-bold text-white">
                    {selectedExp.company},  {selectedExp.role}
                  </h3>
                  <p className="mt-0.5 text-xs text-zinc-400">
                    {selectedExp.domain} ({selectedExp.period})
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedExp(null)}
                  className="rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-zinc-400 hover:text-white"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-6 space-y-5">
                {selectedExp.architectureNotes?.map((note, idx) => (
                  <div
                    key={note.title}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-emerald-400">
                        CASE STUDY #0{idx + 1}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {note.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-zinc-800 px-2 py-0.5 font-mono text-[10px] text-zinc-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h4 className="mt-2 text-base font-bold text-white">
                      {note.title}
                    </h4>

                    <div className="mt-4 space-y-3 text-xs leading-relaxed sm:text-sm">
                      <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/70 p-3">
                        <span className="font-mono text-[11px] font-semibold text-amber-400 uppercase">
                          1. Production Problem:
                        </span>
                        <p className="mt-1 text-zinc-300">{note.problem}</p>
                      </div>

                      <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/70 p-3">
                        <span className="font-mono text-[11px] font-semibold text-sky-400 uppercase">
                          2. Architectural Solution:
                        </span>
                        <p className="mt-1 text-zinc-300">{note.solution}</p>
                      </div>

                      <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-emerald-200">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                        <span>
                          <strong>Impact:</strong> {note.impact}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-zinc-800 pt-4">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <Layers className="h-4 w-4 text-emerald-400" />
                <span>Documented with NDA-safe architectural abstractions</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedExp(null)}
                className="rounded-lg bg-zinc-800 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-700"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
