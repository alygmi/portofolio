import React from 'react';
import {
  MapPin,
  ArrowRight,
  ShieldCheck,
  Database,
  GitMerge,
  Zap,
  CheckCircle2,
  FileCode2,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { RevealOnScroll } from './RevealOnScroll';

export const HeroBento: React.FC = () => {
  const { profile, impactMetrics } = PORTFOLIO_DATA;

  const accentClasses = {
    emerald: {
      border: 'hover:border-emerald-500/40',
      badge: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
      value: 'text-emerald-400',
    },
    sky: {
      border: 'hover:border-sky-500/40',
      badge: 'border-sky-500/30 bg-sky-500/10 text-sky-300',
      value: 'text-sky-400',
    },
    indigo: {
      border: 'hover:border-indigo-500/40',
      badge: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300',
      value: 'text-indigo-400',
    },
    amber: {
      border: 'hover:border-amber-500/40',
      badge: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
      value: 'text-amber-400',
    },
  };

  return (
    <section id="impact" className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-20">
      {/* Subtle Ambient Glow */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top Hero Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Engineering Value Proposition */}
          <RevealOnScroll direction="left" className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/90 px-3 py-1 text-xs text-zinc-300">
              <MapPin className="h-3.5 w-3.5 text-emerald-400" />
              <span>{profile.location}</span>
              <span className="text-zinc-600">•</span>
              <span className="font-mono text-emerald-400">4+ Years Production Exp</span>
            </div>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:leading-[1.12]">
              {profile.name}
            </h1>

            <p className="mt-2 font-mono text-base font-semibold text-emerald-400 sm:text-lg">
              {profile.headline}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
              {profile.summary}
            </p>

            <p className="mt-3 text-xs leading-relaxed text-zinc-400 sm:text-sm">
              {profile.subSummary}
            </p>

            {/* Primary CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#migrations"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-semibold text-zinc-950 shadow-lg shadow-emerald-500/10 transition-all hover:bg-emerald-400 sm:text-sm"
              >
                <span>Explore Engineering Case Studies</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/90 px-4 py-2.5 text-xs font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-800 sm:text-sm"
              >
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Protected Contact (Turnstile)</span>
              </a>
            </div>
          </RevealOnScroll>

          {/* Right Column: Architecture Snapshot Terminal Card */}
          <RevealOnScroll direction="right" delayMs={120} className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-900/70 shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950/80 px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                </div>
                <span className="font-mono text-[11px] text-zinc-400">
                  engineering-profile.json
                </span>
                <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[10px] text-emerald-400">
                  VERIFIED
                </span>
              </div>

              <div className="space-y-3 p-4 font-mono text-xs">
                <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/60 p-3">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Database className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Enterprise Data & ERP Layer</span>
                  </div>
                  <p className="mt-1 text-zinc-200">
                    SQL Server • SAP Business One • PostgreSQL • MySQL
                  </p>
                </div>

                <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/60 p-3">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <FileCode2 className="h-3.5 w-3.5 text-sky-400" />
                    <span>Polyglot Backend Runtimes</span>
                  </div>
                  <p className="mt-1 text-zinc-200">
                    Laravel (PHP) • Hono (Bun/TS) • FastAPI (Python) • Spring Boot (Java)
                  </p>
                </div>

                <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/60 p-3">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <GitMerge className="h-3.5 w-3.5 text-indigo-400" />
                    <span>Production Deliverables Philosophy</span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {['Strict Auth Rules', 'Automated Tests', 'Handover Docs', 'Zero-Downtime Migrations'].map(
                      (pill) => (
                        <span
                          key={pill}
                          className="inline-flex items-center gap-1 rounded border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-[11px] text-zinc-300"
                        >
                          <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                          {pill}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Bento Impact Grid (4 Key Metrics from CV) */}
        <div className="mt-12">
          <RevealOnScroll direction="up">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-emerald-400" />
                <h2 className="font-mono text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                  Quantified Engineering Impact (From CV)
                </h2>
              </div>
              <span className="hidden font-mono text-[11px] text-zinc-500 sm:inline">
                Real production metrics across retail, IoT, and accounting systems
              </span>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {impactMetrics.map((metric, idx) => {
              const style = accentClasses[metric.accent];
              return (
                <RevealOnScroll
                  key={metric.label}
                  delayMs={idx * 90}
                  direction="up"
                  className="h-full"
                >
                  <div
                    className={`group relative flex h-full flex-col justify-between rounded-2xl border border-zinc-800/90 bg-zinc-900/50 p-5 transition-all duration-200 hover:-translate-y-1 hover:bg-zinc-900/90 ${style.border}`}
                  >
                    <div>
                      <span
                        className={`inline-block rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium ${style.badge}`}
                      >
                        {metric.badge}
                      </span>
                      <div
                        className={`mt-4 font-mono text-3xl font-extrabold tracking-tight sm:text-4xl ${style.value}`}
                      >
                        {metric.value}
                      </div>
                      <h3 className="mt-1.5 text-sm font-semibold text-zinc-100">
                        {metric.label}
                      </h3>
                    </div>
                    <p className="mt-3 border-t border-zinc-800/80 pt-3 text-xs leading-relaxed text-zinc-400">
                      {metric.sublabel}
                    </p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
