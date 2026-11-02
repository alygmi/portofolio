import React from 'react';
import { Command, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const navItems = [
    { label: 'Impact', href: '#impact' },
    { label: '3x Migrations', href: '#migrations' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects & API', href: '#projects' },
    { label: 'Tech Stack', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        {/* Brand Identity */}
        <a
          href="#"
          className="group flex items-center gap-2.5 text-left focus:outline-none"
        >
          <div className="transition-transform duration-200 group-hover:scale-105">
            <BrandLogo className="h-9 w-9 shadow-md shadow-emerald-500/10" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-semibold tracking-tight text-zinc-100">
                aladiyat.dev
              </span>
              <span className="hidden items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-medium text-emerald-400 sm:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                AVAILABLE
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Backend-Leaning Fullstack
            </p>
          </div>
        </a>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main Navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions: Command Palette & Protected Contact */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/90 px-2.5 py-1.5 text-xs text-zinc-300 transition-all hover:border-zinc-700 hover:bg-zinc-800"
            title="Open Quick Navigation (Ctrl + K)"
          >
            <Command className="h-3.5 w-3.5 text-zinc-400" />
            <span className="hidden sm:inline">Quick Jump</span>
            <kbd className="rounded border border-zinc-700 bg-zinc-950 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
              Ctrl K
            </kbd>
          </button>

          <a
            href={PORTFOLIO_DATA.profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900/60 px-2.5 py-1.5 font-mono text-xs text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white sm:inline-flex"
          >
            GitHub
            <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-zinc-950 shadow-sm transition-all hover:bg-emerald-400"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Hire / Contact</span>
          </a>
        </div>
      </div>
    </header>
  );
};
