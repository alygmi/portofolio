import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { RevealOnScroll } from './RevealOnScroll';

export const SkillsAndEducation: React.FC = () => {
  const { skillGroups, education } = PORTFOLIO_DATA;

  return (
    <section
      id="skills"
      className="border-t border-zinc-200 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left 8 Cols: Technical Stack */}
          <div className="lg:col-span-8">
            <RevealOnScroll direction="up">
              <div className="border-b border-zinc-200 pb-4">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                  Skills & Tools
                </h2>
                <p className="mt-1 text-sm text-zinc-600">
                  Languages, frameworks, and databases used in production.
                </p>
              </div>
            </RevealOnScroll>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {skillGroups.map((group, idx) => (
                <RevealOnScroll
                  key={group.category}
                  delayMs={idx * 80}
                  direction="up"
                  className="h-full"
                >
                  <div className="h-full rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xs">
                    <h3 className="text-sm font-bold text-zinc-900">
                      {group.category}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500">
                      {group.description}
                    </p>
                    <p className="mt-4 border-t border-zinc-100 pt-3 font-mono text-xs leading-relaxed text-zinc-800">
                      {group.skills.join(' · ')}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>

          {/* Right 4 Cols: Education */}
          <div className="lg:col-span-4">
            <RevealOnScroll direction="up">
              <div className="border-b border-zinc-200 pb-4">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                  Education
                </h2>
                <p className="mt-1 text-sm text-zinc-600">
                  Academic background in Bandung.
                </p>
              </div>
            </RevealOnScroll>

            <div className="mt-6 space-y-4">
              {education.map((edu, idx) => (
                <RevealOnScroll
                  key={edu.institution}
                  delayMs={idx * 90 + 60}
                  direction="right"
                >
                  <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xs">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-base font-bold text-zinc-900">
                        {edu.institution}
                      </h3>
                      <span className="shrink-0 font-mono text-xs text-zinc-500">
                        {edu.period}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-zinc-700">
                      {edu.degree}
                    </p>
                    <p className="mt-1 text-xs text-zinc-400">{edu.location}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
