import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-200 bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <div className="font-mono text-xs text-zinc-600">
          © {new Date().getFullYear()} {PORTFOLIO_DATA.profile.name}
        </div>

        <div className="flex items-center gap-5 font-mono text-xs text-zinc-500">
          <a
            href={PORTFOLIO_DATA.profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-900"
          >
            GitHub
          </a>
          <a
            href={PORTFOLIO_DATA.profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-900"
          >
            LinkedIn
          </a>
          <span>{PORTFOLIO_DATA.profile.location}</span>
        </div>
      </div>
    </footer>
  );
};
