import React, { useState } from 'react';
import { GitBranch, ArrowRight, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { RevealOnScroll } from './RevealOnScroll';

export const MigrationShowcase: React.FC = () => {
  const { migrations } = PORTFOLIO_DATA;
  const [activeId, setActiveId] = useState<string>(migrations[0].id);

  const activeMigration =
    migrations.find((item) => item.id === activeId) || migrations[0];

  return (
    <section
      id="migrations"
      className="border-t border-zinc-800/70 bg-zinc-950/60 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <RevealOnScroll direction="up">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 font-mono text-xs text-sky-300">
              <GitBranch className="h-3.5 w-3.5" />
              <span>SIGNATURE ENGINEERING TRACK RECORD</span>
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              3 Production Codebase Migrations Led
            </h2>
            <p className="mt-2 text-sm text-zinc-400 sm:text-base">
              Modernizing legacy systems in production without breaking business continuity.
              Select a migration below to inspect the architectural problem, transition strategy,
              and code comparison.
            </p>
          </div>
        </RevealOnScroll>

        {/* Interactive Selector Tabs */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {migrations.map((item, idx) => {
            const isSelected = item.id === activeId;
            return (
              <RevealOnScroll key={item.id} delayMs={idx * 90} direction="up">
                <button
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className={`flex h-full w-full flex-col justify-between rounded-xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                    isSelected
                      ? 'border-emerald-500/60 bg-emerald-500/10 shadow-lg shadow-emerald-500/5'
                      : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-zinc-400">
                      MIGRATION 0{idx + 1}
                    </span>
                    <span
                      className={`rounded px-2 py-0.5 font-mono text-[10px] ${
                        isSelected
                          ? 'bg-emerald-500 text-zinc-950 font-semibold'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {item.period}
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="text-sm font-bold text-zinc-100">{item.title}</div>
                    <div className="mt-1 flex items-center gap-1.5 font-mono text-xs text-emerald-400">
                      <span className="truncate text-zinc-400">{item.fromStack}</span>
                      <ArrowRight className="h-3 w-3 shrink-0 text-emerald-400" />
                      <span className="truncate font-semibold">{item.toStack}</span>
                    </div>
                  </div>
                </button>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Active Migration Case Study Panel */}
        <RevealOnScroll delayMs={180} direction="scale">
          <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-4">
              <div>
                <span className="font-mono text-xs text-emerald-400">
                  {activeMigration.companyContext}
                </span>
                <h3 className="mt-1 text-xl font-bold text-white">
                  {activeMigration.fromStack}{' '}
                  <span className="text-emerald-400">→</span> {activeMigration.toStack}
                </h3>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{activeMigration.outcomeMetrics}</span>
              </div>
            </div>

            {/* Problem & Strategy Grid */}
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="space-y-4 lg:col-span-5">
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase">
                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                    <span>The Legacy Bottleneck</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                    {activeMigration.problemStatement}
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
                  <div className="text-xs font-semibold text-zinc-200 uppercase">
                    Engineering Execution
                  </div>
                  <ul className="mt-3 space-y-2.5">
                    {activeMigration.engineeringApproach.map((step) => (
                      <li
                        key={step}
                        className="flex items-start gap-2.5 text-xs leading-relaxed text-zinc-300"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Code Comparison Before vs After */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-7">
                <div className="overflow-hidden rounded-xl border border-rose-500/20 bg-zinc-950">
                  <div className="flex items-center justify-between border-b border-zinc-800 bg-rose-950/20 px-4 py-2">
                    <span className="font-mono text-xs font-semibold text-rose-300">
                      BEFORE: {activeMigration.fromStack}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500">Legacy Pattern</span>
                  </div>
                  <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-zinc-300">
                    <code>{activeMigration.codeSnippetBefore}</code>
                  </pre>
                </div>

                <div className="overflow-hidden rounded-xl border border-emerald-500/30 bg-zinc-950">
                  <div className="flex items-center justify-between border-b border-zinc-800 bg-emerald-950/20 px-4 py-2">
                    <span className="font-mono text-xs font-semibold text-emerald-300">
                      AFTER: {activeMigration.toStack}
                    </span>
                    <span className="font-mono text-[10px] text-emerald-400">
                      Production Upgraded
                    </span>
                  </div>
                  <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-emerald-200">
                    <code>{activeMigration.codeSnippetAfter}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
