import React from 'react';
import { Shield, Zap } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2.5">
          <BrandLogo className="h-7 w-7" />
          <span className="font-mono text-xs text-zinc-400">
            © {new Date().getFullYear()} {PORTFOLIO_DATA.profile.name}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-zinc-400">
          <span className="inline-flex items-center gap-1 rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-1">
            <Zap className="h-3 w-3 text-emerald-400" />
            Built with React 19 + TypeScript + Tailwind v4
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-1">
            <Shield className="h-3 w-3 text-sky-400" />
            Protected by Cloudflare Turnstile
          </span>
        </div>
      </div>
    </footer>
  );
};
