import React, { useEffect, useState } from 'react';
import {
  Search,
  X,
  ArrowRight,
  GitBranch,
  Briefcase,
  Code2,
  ShieldCheck,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { butterScrollTo } from '../utils/useButterScroll';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandAction {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const navigateTo = (hash: string) => {
    onClose();
    const el = document.querySelector(hash);
    if (el) {
      const rect = el.getBoundingClientRect();
      butterScrollTo(window.scrollY + rect.top);
    }
  };

  const actions: CommandAction[] = [
    {
      id: 'nav-impact',
      title: 'View Proof of Impact & Metrics (Bento Grid)',
      subtitle: '3x Migrations, 94% Payload Reduction, 340+ Commits',
      category: 'Sections',
      icon: <Layers className="h-4 w-4 text-emerald-400" />,
      action: () => navigateTo('#impact'),
    },
    {
      id: 'nav-migrations',
      title: 'Explore 3 Production Codebase Migrations',
      subtitle: 'Golang → FastAPI, Zend → React, Node.js → Laravel',
      category: 'Sections',
      icon: <GitBranch className="h-4 w-4 text-sky-400" />,
      action: () => navigateTo('#migrations'),
    },
    {
      id: 'nav-experience',
      title: 'Inspect Experience & Architecture Case Studies',
      subtitle: 'PT Anyar Retail (SAP B1 / SQL Server), PT IoTera, PT Enakans',
      category: 'Sections',
      icon: <Briefcase className="h-4 w-4 text-indigo-400" />,
      action: () => navigateTo('#experience'),
    },
    {
      id: 'nav-projects',
      title: 'Test Key Projects & Interactive API Responses',
      subtitle: 'Task Management (Bun/Hono), SmartVending API, Sayurku, RoastMyCv',
      category: 'Sections',
      icon: <Code2 className="h-4 w-4 text-amber-400" />,
      action: () => navigateTo('#projects'),
    },
    {
      id: 'nav-contact',
      title: 'Unlock Email & WhatsApp (Cloudflare Turnstile)',
      subtitle: 'Anti-scraper protected contact details & quick message',
      category: 'Contact & Links',
      icon: <ShieldCheck className="h-4 w-4 text-emerald-400" />,
      action: () => navigateTo('#contact'),
    },
    {
      id: 'ext-github',
      title: 'Open GitHub Profile (@alygmi)',
      subtitle: PORTFOLIO_DATA.profile.links.github,
      category: 'Contact & Links',
      icon: <ExternalLink className="h-4 w-4 text-zinc-400" />,
      action: () => {
        window.open(PORTFOLIO_DATA.profile.links.github, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
    {
      id: 'ext-linkedin',
      title: 'Open LinkedIn Profile (in/aladiyat)',
      subtitle: PORTFOLIO_DATA.profile.links.linkedin,
      category: 'Contact & Links',
      icon: <ExternalLink className="h-4 w-4 text-zinc-400" />,
      action: () => {
        window.open(PORTFOLIO_DATA.profile.links.linkedin, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
  ];

  const filtered = actions.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/75 px-4 pt-20 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div className="flex items-center border-b border-zinc-800 px-4 py-3">
          <Search className="mr-3 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a section, tech stack (e.g. Laravel, FastAPI, SAP), or action..."
            className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
            aria-label="Close command palette"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Action List */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-zinc-500">
              No matching commands found for "{query}".
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={item.action}
                className="group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-zinc-800/80"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-medium text-zinc-100 group-hover:text-emerald-300">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-zinc-400">{item.subtitle}</div>
                  </div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-zinc-600 transition-transform group-hover:translate-x-0.5 group-hover:text-emerald-400" />
              </button>
            ))
          )}
        </div>

        {/* Footer Hint */}
        <div className="flex items-center justify-between border-t border-zinc-800/80 bg-zinc-950/60 px-4 py-2 text-[11px] text-zinc-500">
          <span>Navigate portfolio sections & engineering case studies</span>
          <span className="font-mono">ESC to close</span>
        </div>
      </div>
    </div>
  );
};
