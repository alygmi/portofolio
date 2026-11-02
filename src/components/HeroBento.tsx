import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { RevealOnScroll } from './RevealOnScroll';

export const HeroBento: React.FC = () => {
  const { profile } = PORTFOLIO_DATA;

  return (
    <section
      id="home"
      className="relative overflow-hidden py-16 sm:py-24 lg:flex lg:min-h-[calc(100vh-4rem)] lg:items-center"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Value Proposition */}
          <RevealOnScroll direction="left" className="lg:col-span-7">
            <p className="font-mono text-xs tracking-wide text-zinc-500">
              {profile.location} <span className="mx-1.5 text-zinc-300">/</span>{' '}
              <span className="font-semibold text-emerald-700">4+ Years Experience</span>
            </p>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl lg:leading-[1.12]">
              {profile.name}
            </h1>

            <p className="mt-2 font-mono text-base font-semibold text-emerald-700 sm:text-lg">
              {profile.headline}
            </p>

            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-700 sm:text-base">
              {profile.summary}
            </p>

            <p className="mt-3 max-w-2xl text-xs leading-relaxed text-zinc-500 sm:text-sm">
              {profile.subSummary}
            </p>

            {/* Primary & Secondary CTAs (Pure Typography) */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#experience"
                className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-600"
              >
                <span>View Experience</span>
                <span aria-hidden="true">→</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-800 transition-colors hover:border-zinc-400 hover:bg-zinc-100"
              >
                <span>Get in Touch</span>
              </a>
            </div>
          </RevealOnScroll>

          {/* Right Column: Clean Technical Spec Card (Pure Typography) */}
          <RevealOnScroll direction="right" delayMs={120} className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-lg shadow-zinc-200/50">
              <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-100/80 px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
                </div>
                <span className="font-mono text-[11px] text-zinc-500">
                  stack-overview.ts
                </span>
                <span className="w-8" aria-hidden="true" />
              </div>

              <div className="space-y-3 p-5 font-mono text-xs">
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3.5">
                  <div className="font-semibold text-zinc-800">
                    Backend & API
                  </div>
                  <p className="mt-1.5 leading-relaxed text-zinc-600">
                    Laravel (PHP) · Hono (Bun/TS) · FastAPI (Python) · Spring Boot (Java)
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3.5">
                  <div className="font-semibold text-zinc-800">
                    Databases & Enterprise Systems
                  </div>
                  <p className="mt-1.5 leading-relaxed text-zinc-600">
                    SQL Server · SAP Business One · PostgreSQL · MySQL
                  </p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};
