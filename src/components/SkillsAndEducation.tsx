import React from 'react';
import { Cpu, GraduationCap, Award, Check } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { RevealOnScroll } from './RevealOnScroll';

export const SkillsAndEducation: React.FC = () => {
  const { skillGroups, education } = PORTFOLIO_DATA;

  return (
    <section
      id="skills"
      className="border-t border-zinc-800/70 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left 8 Cols: Technical Stack Matrix */}
          <div className="lg:col-span-8">
            <RevealOnScroll direction="up">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 font-mono text-xs text-emerald-400">
                <Cpu className="h-3.5 w-3.5" />
                <span>TECHNICAL ARSENAL</span>
              </div>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Production Tech Stack & Tooling
              </h2>
              <p className="mt-2 text-sm text-zinc-400">
                Battle-tested across multi-brand retail operations, enterprise ERP
                integrations, and IoT platforms.
              </p>
            </RevealOnScroll>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {skillGroups.map((group, idx) => (
                <RevealOnScroll
                  key={group.category}
                  delayMs={idx * 90}
                  direction="up"
                  className="h-full"
                >
                  <div className="h-full rounded-2xl border border-zinc-800/90 bg-zinc-900/40 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/70">
                    <h3 className="text-sm font-bold text-white">
                      {group.category}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-400">
                      {group.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-950 px-2.5 py-1 font-mono text-xs text-zinc-200 transition-colors hover:border-emerald-500/40 hover:text-emerald-300"
                        >
                          <Check className="h-3 w-3 text-emerald-400" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>

          {/* Right 4 Cols: Education & Engineering Standards */}
          <div className="lg:col-span-4">
            <RevealOnScroll direction="up">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 font-mono text-xs text-sky-400">
                <GraduationCap className="h-3.5 w-3.5" />
                <span>ACADEMIC FOUNDATION</span>
              </div>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">
                Education
              </h2>
              <p className="mt-2 text-sm text-zinc-400">
                Formal Software Engineering background combined with continuous
                industry delivery since 2022.
              </p>
            </RevealOnScroll>

            <div className="mt-6 space-y-4">
              {education.map((edu, idx) => (
                <RevealOnScroll
                  key={edu.institution}
                  delayMs={idx * 100 + 80}
                  direction="right"
                >
                  <div className="rounded-2xl border border-zinc-800/90 bg-zinc-900/40 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700">
                    <span className="inline-block rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-400">
                      {edu.period}
                    </span>
                    <h3 className="mt-2 text-base font-bold text-white">
                      {edu.institution}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-zinc-300">
                      {edu.degree}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">{edu.location}</p>
                  </div>
                </RevealOnScroll>
              ))}

              {/* Engineering Discipline Callout */}
              <RevealOnScroll delayMs={260} direction="scale">
                <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-5">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase">
                    <Award className="h-4 w-4 text-emerald-400" />
                    <span>Why Teams Trust My Code</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-300">
                    Starting my career in <strong>API Regression Testing</strong> and{' '}
                    <strong>Technical Writing</strong> shaped how I engineer software:
                    every feature ships with explicit authorization checks, edge-case
                    handling, and clear handover documentation.
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
