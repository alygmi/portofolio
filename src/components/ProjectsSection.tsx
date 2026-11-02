import React, { useState } from 'react';
import {
  Code2,
  Play,
  CheckCircle2,
  Terminal,
  Sparkles,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FolderGit2,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { RevealOnScroll } from './RevealOnScroll';

const INITIAL_VISIBLE_COUNT = 4;

export const ProjectsSection: React.FC = () => {
  const { projects, profile } = PORTFOLIO_DATA;
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [simulatedIds, setSimulatedIds] = useState<Record<string, boolean>>({
    'task-management-platform': true,
  });
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const visibleProjects = showAllProjects
    ? projects
    : projects.slice(0, INITIAL_VISIBLE_COUNT);

  const hiddenCount = Math.max(0, projects.length - INITIAL_VISIBLE_COUNT);

  const handleRunSimulation = (id: string) => {
    setLoadingId(id);
    setTimeout(() => {
      setSimulatedIds((prev) => ({ ...prev, [id]: !prev[id] }));
      setLoadingId(null);
    }, 200);
  };

  return (
    <section
      id="projects"
      className="border-t border-zinc-800/70 bg-zinc-950/60 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <RevealOnScroll direction="up">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-300">
                <Code2 className="h-3.5 w-3.5" />
                <span>KEY PROJECTS & GITHUB REPOSITORIES (@ALYGMI)</span>
              </div>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Fullstack & Backend Systems Showcase
              </h2>
              <p className="mt-2 text-sm text-zinc-400 sm:text-base">
                Combining flagship engineering assessments with real open-source
                repositories from{' '}
                <a
                  href={`${profile.links.github}?tab=repositories`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-emerald-400 underline decoration-emerald-500/40 underline-offset-4 hover:text-emerald-300"
                >
                  github.com/alygmi
                </a>
                .
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
              <FolderGit2 className="h-4 w-4 text-emerald-400" />
              <span>
                Showing <strong className="text-white">{visibleProjects.length}</strong> of{' '}
                <strong className="text-white">{projects.length}</strong> curated projects
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* Projects Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {visibleProjects.map((project, idx) => {
            const isExpanded = Boolean(simulatedIds[project.id]);
            const isSimulating = loadingId === project.id;

            return (
              <RevealOnScroll
                key={project.id}
                delayMs={(idx % 2) * 110}
                direction="up"
                className="h-full"
              >
                <div className="flex h-full flex-col justify-between rounded-2xl border border-zinc-800/90 bg-zinc-900/50 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900/80">
                  <div>
                    {/* Top Badge & Repo / Live Links */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold ${
                          project.featured
                            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                            : 'border-sky-500/30 bg-sky-500/10 text-sky-300'
                        }`}
                      >
                        {project.badge}
                      </span>

                      <div className="flex items-center gap-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-md border border-emerald-500/40 bg-emerald-500/15 px-2 py-0.5 font-mono text-[11px] font-medium text-emerald-300 transition-colors hover:bg-emerald-500 hover:text-zinc-950"
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-md border border-zinc-700 bg-zinc-950 px-2 py-0.5 font-mono text-[11px] text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
                          >
                            <span>GitHub Repo</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 className="mt-3 text-xl font-bold text-white">
                      {project.title}
                    </h3>
                    <p className="mt-0.5 font-mono text-xs text-zinc-400">
                      {project.subtitle}
                    </p>

                    <p className="mt-2.5 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <ul className="mt-4 space-y-2 border-t border-zinc-800/80 pt-4">
                      {project.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-xs text-zinc-300"
                        >
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Interactive Mock API / Payload Inspector */}
                  <div className="mt-6 border-t border-zinc-800/80 pt-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded border border-zinc-800 bg-zinc-950 px-2 py-0.5 font-mono text-[11px] text-zinc-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRunSimulation(project.id)}
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs font-medium transition-all ${
                          isExpanded
                            ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300'
                            : 'border-zinc-700 bg-zinc-950 text-zinc-200 hover:border-emerald-500/40 hover:text-emerald-300'
                        }`}
                      >
                        {isSimulating ? (
                          <RefreshCw className="h-3.5 w-3.5 animate-spin text-emerald-400" />
                        ) : isExpanded ? (
                          <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                        ) : (
                          <Play className="h-3.5 w-3.5 text-emerald-400" />
                        )}
                        <span>
                          {isExpanded ? 'Hide API Payload' : 'Simulate API Contract'}
                        </span>
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="mt-4 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/90 bg-zinc-900/90 px-3.5 py-2 font-mono text-[11px]">
                          <div className="flex items-center gap-2">
                            <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 font-bold text-emerald-300">
                              {project.interactivePreview.method}
                            </span>
                            <span className="truncate text-zinc-300">
                              {project.interactivePreview.endpointOrTitle}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px]">
                            <span className="text-emerald-400">
                              {project.interactivePreview.statusCode}
                            </span>
                            <span className="text-zinc-500">•</span>
                            <span className="text-zinc-400">
                              {project.interactivePreview.latency}
                            </span>
                          </div>
                        </div>
                        <pre className="overflow-x-auto p-3.5 font-mono text-xs leading-relaxed text-emerald-200/95">
                          <code>{project.interactivePreview.payloadJson}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Show More / Show Less Toggle Button with Arrow */}
        {hiddenCount > 0 && (
          <RevealOnScroll delayMs={120} direction="up">
            <div className="mt-10 flex flex-col items-center justify-center">
              <div className="relative flex w-full items-center justify-center">
                <div className="absolute inset-x-0 top-1/2 h-px bg-zinc-800/80" />
                <button
                  type="button"
                  onClick={() => setShowAllProjects((prev) => !prev)}
                  className="group relative z-10 inline-flex items-center gap-2.5 rounded-2xl border border-emerald-500/40 bg-zinc-900 px-6 py-3 font-mono text-xs font-semibold text-emerald-300 shadow-xl transition-all hover:border-emerald-400 hover:bg-emerald-500 hover:text-zinc-950 sm:text-sm"
                >
                  {showAllProjects ? (
                    <>
                      <span>Show Less Projects (Keep Top 4 Featured)</span>
                      <ChevronUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                    </>
                  ) : (
                    <>
                      <span>
                        Show More Projects (+{hiddenCount} Repositories from GitHub)
                      </span>
                      <ChevronDown className="h-4 w-4 animate-bounce transition-transform group-hover:translate-y-0.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </RevealOnScroll>
        )}

        {/* Subtle Note */}
        <div className="mt-6 flex items-center justify-center gap-2 text-center font-mono text-xs text-zinc-500">
          <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
          <span>
            Click "Simulate API Contract" on any card to inspect the backend JSON
            response structure.
          </span>
        </div>
      </div>
    </section>
  );
};
