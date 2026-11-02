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
            const targetUrl = project.liveUrl || project.repoUrl;
            const linkLabel = project.liveUrl
              ? 'Live ↗'
              : project.repoUrl
              ? 'GitHub ↗'
              : 'Internal / Assessment';

            const cardInner = (
              <>
                {/* Top Backend Endpoint Strip (Replaces a Frontend Screenshot) */}
                <div className="border-b border-zinc-200 bg-zinc-900 px-5 py-3.5 font-mono text-xs text-zinc-300 transition-colors group-hover:bg-zinc-950">
                  <div className="flex items-center justify-between gap-2 text-[11px] text-zinc-400">
                    <span>{project.interactivePreview.method}</span>
                    <span className="text-emerald-400">
                      {project.interactivePreview.statusCode}
                    </span>
                  </div>
                  <div className="mt-1 truncate text-xs font-medium text-zinc-100">
                    {project.interactivePreview.endpointOrTitle}
                  </div>
                </div>

                {/* Simple Body: Title + Short Description + Tech Stack */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-base font-bold text-zinc-900 transition-colors group-hover:text-emerald-700">
                        {project.title}
                      </h3>
                      <span className="shrink-0 font-mono text-xs text-zinc-500 group-hover:text-zinc-900">
                        {linkLabel}
                      </span>
                    </div>

                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-600 sm:text-sm">
                      {project.description}
                    </p>
                  </div>

                  <p className="mt-4 border-t border-zinc-100 pt-3 font-mono text-xs text-zinc-500">
                    {project.techStack.join(' · ')}
                  </p>
                </div>
              </>
            );

            return (
              <RevealOnScroll
                key={project.id}
                delayMs={(idx % 2) * 80}
                direction="up"
                className="h-full"
              >
                {targetUrl ? (
                  <a
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
                  >
                    {cardInner}
                  </a>
                ) : (
                  <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xs">
                    {cardInner}
                  </div>
                )}
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
