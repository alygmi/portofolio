import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { RevealOnScroll } from './RevealOnScroll';

const INITIAL_VISIBLE_COUNT = 4;

export const ProjectsSection: React.FC = () => {
  const { projects, profile } = PORTFOLIO_DATA;
  const [showAllProjects, setShowAllProjects] = useState(false);

  const visibleProjects = showAllProjects
    ? projects
    : projects.slice(0, INITIAL_VISIBLE_COUNT);

  const hiddenCount = Math.max(0, projects.length - INITIAL_VISIBLE_COUNT);

  return (
    <section
      id="projects"
      className="border-t border-zinc-200 bg-zinc-100/50 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Clean Section Header */}
        <RevealOnScroll direction="up">
          <div className="flex flex-col justify-between gap-4 border-b border-zinc-200 pb-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                Projects
              </h2>
              <p className="mt-1 text-sm text-zinc-600">
                Selected backend services and repositories from{' '}
                <a
                  href={`${profile.links.github}?tab=repositories`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono font-medium text-emerald-700 underline decoration-emerald-600/40 underline-offset-4 hover:text-emerald-600"
                >
                  github.com/alygmi
                </a>
                .
              </p>
            </div>

            <div className="font-mono text-xs text-zinc-500">
              {visibleProjects.length} of {projects.length}
            </div>
          </div>
        </RevealOnScroll>

        {/* Simplified Clickable Backend Cards Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {visibleProjects.map((project, idx) => {
            const links = [
              project.liveUrl && { label: 'Live', href: project.liveUrl },
              project.docsUrl && { label: 'API Docs', href: project.docsUrl },
              project.repoUrl && { label: 'GitHub', href: project.repoUrl },
            ].filter(Boolean) as { label: string; href: string }[];

            return (
              <RevealOnScroll
                key={project.id}
                delayMs={(idx % 2) * 80}
                direction="up"
                className="h-full"
              >
                <article className="flex h-full flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xs transition-colors duration-200 hover:border-zinc-300">
                  <div>
                    <h3 className="text-base font-bold text-zinc-900">
                      {project.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      {project.subtitle}
                    </p>
                    <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-zinc-600 sm:text-sm">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-zinc-100 pt-3">
                    <p className="font-mono text-xs text-zinc-500">
                      {project.techStack.join(' · ')}
                    </p>

                    <div className="flex shrink-0 items-center gap-3 font-mono text-xs">
                      {links.length > 0 ? (
                        links.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-zinc-700 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-emerald-700 hover:decoration-emerald-600"
                          >
                            {link.label} ↗
                          </a>
                        ))
                      ) : (
                        <span className="text-zinc-400">Private</span>
                      )}
                    </div>
                  </div>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Show More / Show Less Toggle Button */}
        {hiddenCount > 0 && (
          <RevealOnScroll delayMs={100} direction="up">
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllProjects((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-2.5 font-mono text-xs font-medium text-zinc-700 shadow-2xs transition-colors hover:border-zinc-400 hover:text-zinc-900"
              >
                {showAllProjects
                  ? 'Show Less ↑'
                  : `Show More (${hiddenCount} more) ↓`}
              </button>
            </div>
          </RevealOnScroll>
        )}
      </div>
    </section>
  );
};
