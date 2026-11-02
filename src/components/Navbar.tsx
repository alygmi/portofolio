import React from 'react';

const NAV_ITEMS = [
  { label: 'About', href: '#home' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/90 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        {/* Pure Typography Brand Identity (Icon kept in browser tab title only) */}
        <a
          href="#home"
          className="flex items-baseline gap-2.5 text-left focus:outline-none"
        >
          <span className="text-sm font-bold tracking-tight text-zinc-900">
            Al Adiyat
          </span>
          <span className="hidden font-mono text-[11px] text-zinc-400 sm:inline">
            / Fullstack Developer
          </span>
        </a>

        {/* Clean Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-2.5 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 sm:px-3 sm:text-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};
