import React, { useEffect, useRef, useState } from 'react';
import { PORTFOLIO_DATA, ExperienceItem } from '../data/portfolioData';
import { butterScrollTo } from '../utils/useButterScroll';

interface VirtualTimelineStep {
  stepIndex: number;
  cardIndex: number;
  subLock: 'top' | 'bottom' | 'single';
}

// Card 0 (PT Anyar Retail) has 7 rich bullets, so it locks at 'top' and 'bottom' before advancing.
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

  const [virtualStep, setVirtualStep] = useState<number>(0);
  const virtualStepRef = useRef<number>(0);
  const wheelCooldownRef = useRef<boolean>(false);

  const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null);

  const currentStepObj = VIRTUAL_STEPS[virtualStep] || VIRTUAL_STEPS[0];
  const activeIndex = currentStepObj.cardIndex;

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

  // Sync discrete virtualStep with window scroll position
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

      if (goingDown && current < VIRTUAL_STEPS.length - 1) {
        e.preventDefault();
        if (!wheelCooldownRef.current) {
          lockToVirtualStep(current + 1);
        }
        return;
      }

      if (goingUp && current > 0) {
        e.preventDefault();
        if (!wheelCooldownRef.current) {
          lockToVirtualStep(current - 1);
        }
      }
    };

    stageEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => stageEl.removeEventListener('wheel', handleWheel);
  }, [selectedExp]);

  const compactTrackHeightVh = 100 + (VIRTUAL_STEPS.length - 1) * 30;

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{ height: `${compactTrackHeightVh}vh` }}
      className="relative border-t border-zinc-200"
    >
      {/* Sticky Viewport Container */}
      <div
        ref={stickyStageRef}
        className="sticky top-14 flex h-[calc(100vh-3.5rem)] w-full flex-col justify-between overflow-hidden py-5 sm:py-8"
      >
        <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-between px-4 sm:px-6">
          {/* Top Header */}
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-zinc-200 pb-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                Professional Experience
              </h2>
              <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
                Production roles across retail operations, IoT backend services, and enterprise web systems.
              </p>
            </div>

            {/* Minimal Typography Navigation */}
            <div className="flex items-center gap-3 font-mono text-xs text-zinc-500">
              <button
                type="button"
                disabled={virtualStep === 0}
                onClick={() => lockToVirtualStep(virtualStep - 1)}
                className="px-1.5 py-0.5 text-zinc-500 transition-colors hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-25"
                title="Previous"
                aria-label="Previous"
              >
                ↑
              </button>
              <span>
                <strong className="text-zinc-900">0{activeIndex + 1}</strong> / 0{experiences.length}
              </span>
              <button
                type="button"
                disabled={virtualStep === VIRTUAL_STEPS.length - 1}
                onClick={() => lockToVirtualStep(virtualStep + 1)}
                className="px-1.5 py-0.5 text-zinc-500 transition-colors hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-25"
                title="Next"
                aria-label="Next"
              >
                ↓
              </button>
            </div>
          </div>

          {/* Center Stage: Full-Width 12-Col Grid */}
          <div className="my-auto grid w-full grid-cols-1 items-center gap-8 py-2 lg:grid-cols-12">
            {/* Left 3 Cols: Clean Vertical Line Timeline */}
            <div className="hidden w-full border-l border-zinc-200 lg:col-span-3 lg:flex lg:flex-col">
              {experiences.map((exp, idx) => {
                const isCurrent = idx === activeIndex;

                return (
                  <button
                    key={exp.id}
                    type="button"
                    onClick={() => jumpToCompanyCard(idx)}
                    className={`group relative -ml-px border-l-2 py-3 pl-4 text-left transition-all duration-200 ${
                      isCurrent
                        ? 'border-emerald-600 text-zinc-900'
                        : 'border-transparent text-zinc-400 hover:border-zinc-300 hover:text-zinc-700'
                    }`}
                  >
                    <div
                      className={`truncate text-xs font-semibold ${
                        isCurrent ? 'text-zinc-900' : 'text-zinc-500 group-hover:text-zinc-800'
                      }`}
                    >
                      {exp.company}
                    </div>
                    <div className="mt-0.5 truncate font-mono text-[11px] text-zinc-400">
                      {exp.period}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right 9 Cols: Active Role Card */}
            <div className="relative h-[min(410px,62vh)] w-full lg:col-span-9">
              {experiences.map((exp, idx) => {
                const isActive = idx === activeIndex;
                const isExitedUp = idx < activeIndex;

                const translateY = isActive ? 0 : isExitedUp ? -56 : 56;
                const scale = isActive ? 1 : 0.97;
                const opacity = isActive ? 1 : 0;

                return (
                  <div
                    key={exp.id}
                    style={{
                      opacity,
                      transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
                      transition:
                        'transform 440ms cubic-bezier(0.22, 1, 0.36, 1), opacity 360ms cubic-bezier(0.22, 1, 0.36, 1)',
                      zIndex: isActive ? 20 : 10,
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                    aria-hidden={!isActive}
                    className="absolute inset-0 w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
                  >
                    <div
                      ref={(el) => {
                        cardScrollRefs.current[idx] = el;
                      }}
                      className="flex h-full flex-col justify-between overflow-y-auto p-6 sm:p-8 [scrollbar-width:thin] [scrollbar-color:#d4d4d8_transparent]"
                    >
                      <div>
                        {/* Clean Card Header */}
                        <div className="flex flex-col justify-between gap-2 border-b border-zinc-100 pb-4 sm:flex-row sm:items-baseline">
                          <div>
                            <h3 className="text-lg font-bold text-zinc-900 sm:text-xl">
                              {exp.role}{' '}
                              <span className="font-normal text-zinc-400">·</span>{' '}
                              <span className="text-emerald-700">{exp.company}</span>
                            </h3>
                            <p className="mt-1 text-xs text-zinc-500">
                              {exp.domain}
                            </p>
                          </div>

                          <div className="shrink-0 font-mono text-xs text-zinc-500">
                            <span>{exp.period}</span>
                            <span className="mx-1.5 text-zinc-300">·</span>
                            <span className="text-zinc-400">{exp.location}</span>
                          </div>
                        </div>

                        {/* Bullet Points */}
                        <ul className="mt-4 space-y-2.5">
                          {exp.summaryBullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex items-start gap-3 text-xs leading-relaxed text-zinc-700 sm:text-[13px]"
                            >
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Footer: Plain Dot-Separated Tech Stack & Case Study Link */}
                      <div className="mt-6 flex flex-col justify-between gap-3 border-t border-zinc-100 pt-4 sm:flex-row sm:items-center">
                        <p className="font-mono text-xs text-zinc-500">
                          {exp.techStack.join(' · ')}
                        </p>

                        {exp.architectureNotes &&
                          exp.architectureNotes.length > 0 && (
                            <button
                              type="button"
                              onClick={() => setSelectedExp(exp)}
                              className="inline-flex shrink-0 items-center gap-1 self-start text-xs font-semibold text-emerald-700 underline decoration-emerald-600/40 underline-offset-4 transition-colors hover:text-emerald-600 sm:self-auto"
                            >
                              <span>
                                Read Case Notes ({exp.architectureNotes.length}) →
                              </span>
                            </button>
                          )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Minimal Progress Line */}
          <div className="flex items-center justify-between gap-4 border-t border-zinc-200 pt-3">
            <div className="flex items-center gap-1.5">
              {VIRTUAL_STEPS.map((stepObj) => {
                const isCurrent = stepObj.stepIndex === virtualStep;
                const exp = experiences[stepObj.cardIndex];
                return (
                  <button
                    key={stepObj.stepIndex}
                    type="button"
                    onClick={() => lockToVirtualStep(stepObj.stepIndex)}
                    title={exp.company}
                    aria-label={`Step ${stepObj.stepIndex + 1}`}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      isCurrent
                        ? 'w-6 bg-emerald-600'
                        : 'w-2 bg-zinc-300 hover:bg-zinc-400'
                    }`}
                  />
                );
              })}
            </div>

            <div className="font-mono text-[11px] text-zinc-500">
              {experiences[activeIndex]?.company}
            </div>
          </div>
        </div>
      </div>

      {/* Slide-Over Drawer for Case Notes (White Theme) */}
      {selectedExp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-end bg-zinc-900/40 backdrop-blur-sm"
          onClick={() => setSelectedExp(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Case Notes for ${selectedExp.company}`}
        >
          <div
            className="flex h-full w-full max-w-2xl flex-col justify-between overflow-y-auto border-l border-zinc-200 bg-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-start justify-between border-b border-zinc-200 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-zinc-900">
                    {selectedExp.role} · {selectedExp.company}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500">
                    {selectedExp.domain} ({selectedExp.period})
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedExp(null)}
                  className="rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 font-mono text-xs text-zinc-600 hover:text-zinc-900"
                  aria-label="Close modal"
                >
                  Close
                </button>
              </div>

              <div className="mt-6 space-y-6">
                {selectedExp.architectureNotes?.map((note) => (
                  <div
                    key={note.title}
                    className="border-b border-zinc-200 pb-6 last:border-b-0"
                  >
                    <h4 className="text-base font-bold text-zinc-900">
                      {note.title}
                    </h4>
                    <p className="mt-1 font-mono text-xs text-zinc-500">
                      {note.tags.join(' · ')}
                    </p>

                    <div className="mt-4 space-y-3 text-xs leading-relaxed text-zinc-700 sm:text-sm">
                      <p>
                        <strong className="text-zinc-900">Problem: </strong>
                        {note.problem}
                      </p>
                      <p>
                        <strong className="text-zinc-900">Solution: </strong>
                        {note.solution}
                      </p>
                      <p className="font-medium text-emerald-700">
                        <strong>Result: </strong>
                        {note.impact}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-end border-t border-zinc-200 pt-4">
              <button
                type="button"
                onClick={() => setSelectedExp(null)}
                className="rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
