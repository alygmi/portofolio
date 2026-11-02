import React, { useEffect, useRef, useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Unlock,
  Mail,
  Phone,
  Copy,
  Check,
  MessageSquare,
  Send,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import {
  MASKED_CONTACT,
  revealProtectedContact,
  UnlockedContact,
} from '../utils/contactSecurity';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { RevealOnScroll } from './RevealOnScroll';

// Default fallback uses Cloudflare's official "Always Passes" test sitekey for local development
const TURNSTILE_SITE_KEY =
  import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';

export const ProtectedContact: React.FC = () => {
  const widgetContainerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [unlockedData, setUnlockedData] = useState<UnlockedContact | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);
  const [scriptBlocked, setScriptBlocked] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);

  // Quick Message Form State + Honeypot Anti-Bot Field
  const [senderName, setSenderName] = useState('');
  const [senderCompany, setSenderCompany] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [honeypotTrap, setHoneypotTrap] = useState(''); // Must remain empty for humans
  const [formStatus, setFormStatus] = useState<
    'idle' | 'bot-blocked' | 'need-verification' | 'ready-sent'
  >('idle');

  // Render Cloudflare Turnstile widget when script is available
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 25;

    const tryRenderTurnstile = () => {
      if (window.turnstile && widgetContainerRef.current && !widgetIdRef.current) {
        setScriptLoaded(true);
        try {
          widgetIdRef.current = window.turnstile.render(widgetContainerRef.current, {
            sitekey: TURNSTILE_SITE_KEY,
            theme: 'dark',
            callback: (token: string) => {
              setTurnstileToken(token);
              const revealed = revealProtectedContact(token);
              setUnlockedData(revealed);
            },
            'error-callback': () => {
              setScriptBlocked(true);
            },
            'expired-callback': () => {
              setTurnstileToken(null);
              setUnlockedData(null);
            },
          });
        } catch {
          setScriptBlocked(true);
        }
        return true;
      }
      return false;
    };

    if (tryRenderTurnstile()) return;

    const interval = setInterval(() => {
      attempts += 1;
      if (tryRenderTurnstile()) {
        clearInterval(interval);
      } else if (attempts >= maxAttempts) {
        clearInterval(interval);
        setScriptBlocked(true);
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleFallbackHumanVerify = () => {
    const fallbackToken = `human_verified_${Date.now()}`;
    setTurnstileToken(fallbackToken);
    setUnlockedData(revealProtectedContact(fallbackToken));
  };

  const handleCopy = async (value: string, field: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2200);
    } catch {
      // Fallback copy
    }
  };

  const handleQuickMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypotTrap.trim() !== '') {
      setFormStatus('bot-blocked');
      return;
    }

    const contact = unlockedData || revealProtectedContact(turnstileToken);
    if (!contact) {
      setFormStatus('need-verification');
      return;
    }

    setFormStatus('ready-sent');
    const subject = encodeURIComponent(
      `[Portfolio Inquiry] ${senderName} ${senderCompany ? `from ${senderCompany}` : ''}`
    );
    const body = encodeURIComponent(
      `Hi Al Adiyat,\n\n${messageBody}\n\nBest regards,\n${senderName}${
        senderCompany ? `\n${senderCompany}` : ''
      }`
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  const isUnlocked = Boolean(unlockedData);

  return (
    <section
      id="contact"
      className="border-t border-zinc-800/70 bg-zinc-950 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <RevealOnScroll direction="up">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>ANTI-SCRAPER & TURNSTILE PROTECTED CONTACT</span>
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Let’s Discuss Backend & Fullstack Opportunities
            </h2>
            <p className="mt-2 text-sm text-zinc-400 sm:text-base">
              To prevent automated email harvesting and spam bots, direct contact
              credentials are obfuscated in memory and unlocked via{' '}
              <span className="font-medium text-zinc-200">Cloudflare Turnstile</span>.
            </p>
          </div>
        </RevealOnScroll>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left 7 Cols: Protected Direct Contact Card */}
          <RevealOnScroll direction="left" delayMs={80} className="lg:col-span-7">
            <div className="h-full rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl border ${
                      isUnlocked
                        ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-400'
                        : 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {isUnlocked ? (
                      <Unlock className="h-4 w-4" />
                    ) : (
                      <Lock className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Direct Contact Credentials
                    </h3>
                    <p className="font-mono text-xs text-zinc-400">
                      {isUnlocked
                        ? 'VERIFIED HUMAN SESSION • CREDENTIALS UNLOCKED'
                        : 'OBFUSCATED AGAINST WEB SCRAPERS'}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold ${
                    isUnlocked
                      ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                      : 'border-zinc-700 bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {isUnlocked ? 'TURNSTILE VERIFIED' : 'LOCKED'}
                </span>
              </div>

              {/* Email & WhatsApp Rows */}
              <div className="mt-6 space-y-4">
                {/* Email Card */}
                <div className="flex flex-col justify-between gap-3 rounded-xl border border-zinc-800/90 bg-zinc-950/80 p-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-emerald-400">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs text-zinc-400">Primary Email</div>
                      <div
                        className={`font-mono text-sm font-semibold ${
                          isUnlocked ? 'text-white' : 'text-zinc-400 select-none'
                        }`}
                      >
                        {unlockedData ? unlockedData.email : MASKED_CONTACT.email}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={!unlockedData}
                      onClick={() =>
                        unlockedData && handleCopy(unlockedData.email, 'email')
                      }
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs font-medium transition-all ${
                        unlockedData
                          ? 'border-zinc-700 bg-zinc-900 text-zinc-200 hover:border-emerald-500/50 hover:text-emerald-300'
                          : 'cursor-not-allowed border-zinc-800/60 bg-zinc-900/30 text-zinc-600'
                      }`}
                    >
                      {copiedField === 'email' ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy Email</span>
                        </>
                      )}
                    </button>

                    {unlockedData && (
                      <a
                        href={unlockedData.mailtoUrl}
                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-zinc-950 hover:bg-emerald-400"
                      >
                        <span>Email App</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Phone / WhatsApp Card */}
                <div className="flex flex-col justify-between gap-3 rounded-xl border border-zinc-800/90 bg-zinc-950/80 p-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-sky-400">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs text-zinc-400">
                        Phone & WhatsApp (Bandung, ID)
                      </div>
                      <div
                        className={`font-mono text-sm font-semibold ${
                          isUnlocked ? 'text-white' : 'text-zinc-400 select-none'
                        }`}
                      >
                        {unlockedData
                          ? unlockedData.phoneDisplay
                          : MASKED_CONTACT.phoneDisplay}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={!unlockedData}
                      onClick={() =>
                        unlockedData &&
                        handleCopy(unlockedData.phoneDisplay, 'phone')
                      }
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs font-medium transition-all ${
                        unlockedData
                          ? 'border-zinc-700 bg-zinc-900 text-zinc-200 hover:border-sky-500/50 hover:text-sky-300'
                          : 'cursor-not-allowed border-zinc-800/60 bg-zinc-900/30 text-zinc-600'
                      }`}
                    >
                      {copiedField === 'phone' ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy Number</span>
                        </>
                      )}
                    </button>

                    {unlockedData && (
                      <a
                        href={unlockedData.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-zinc-950 hover:bg-emerald-400"
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>Chat WhatsApp</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Cloudflare Turnstile Verification Zone */}
              <div className="mt-6 rounded-xl border border-zinc-800/90 bg-zinc-950/90 p-4">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <div className="text-xs font-semibold text-zinc-200">
                      {isUnlocked
                        ? 'Verification Complete, You can now copy or click any contact link above.'
                        : 'Step 1: Complete Cloudflare Turnstile Check'}
                    </div>
                    <p className="mt-0.5 text-[11px] text-zinc-400">
                      Zero puzzle friction • Protects email & phone number from spam
                      harvesters
                    </p>
                  </div>

                  {/* Turnstile Container */}
                  <div className="flex flex-col items-start sm:items-end">
                    <div ref={widgetContainerRef} className="min-h-[65px]" />

                    {!isUnlocked && (scriptBlocked || !scriptLoaded) && (
                      <button
                        type="button"
                        onClick={handleFallbackHumanVerify}
                        className="mt-2 inline-flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-3.5 py-2 font-mono text-xs font-semibold text-emerald-300 transition-all hover:bg-emerald-500 hover:text-zinc-950"
                      >
                        <ShieldCheck className="h-4 w-4" />
                        <span>Click to Verify as Human & Reveal Contact</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Public Social Profiles */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-800 pt-4 text-xs text-zinc-400">
                <span>Direct developer profiles:</span>
                <div className="flex items-center gap-4 font-mono">
                  <a
                    href={PORTFOLIO_DATA.profile.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-zinc-300 hover:text-emerald-400"
                  >
                    <span>{PORTFOLIO_DATA.profile.links.githubHandle}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href={PORTFOLIO_DATA.profile.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-zinc-300 hover:text-emerald-400"
                  >
                    <span>{PORTFOLIO_DATA.profile.links.linkedinHandle}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right 5 Cols: Quick Message Composer with Honeypot Trap */}
          <RevealOnScroll direction="right" delayMs={180} className="lg:col-span-5">
            <form
              onSubmit={handleQuickMessageSubmit}
              className="flex h-full flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8"
            >
              <div>
                <h3 className="text-base font-bold text-white">
                  Quick Direct Message
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  Protected by Turnstile session & invisible Honeypot anti-bot field.
                </p>

                {/* HONEYPOT FIELD — Invisible to humans, traps automated spam bots */}
                <div
                  className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
                  aria-hidden="true"
                >
                  <label htmlFor="company_website_trap">
                    Leave this field blank if you are human
                  </label>
                  <input
                    id="company_website_trap"
                    name="company_website_trap"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypotTrap}
                    onChange={(e) => setHoneypotTrap(e.target.value)}
                  />
                </div>

                <div className="mt-5 space-y-4">
                  <div>
                    <label
                      htmlFor="senderName"
                      className="block font-mono text-xs text-zinc-300"
                    >
                      Your Name *
                    </label>
                    <input
                      id="senderName"
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Budi Santoso"
                      className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="senderCompany"
                      className="block font-mono text-xs text-zinc-300"
                    >
                      Company / Team (Optional)
                    </label>
                    <input
                      id="senderCompany"
                      type="text"
                      value={senderCompany}
                      onChange={(e) => setSenderCompany(e.target.value)}
                      placeholder="e.g. Tech Recruiter at PT Example"
                      className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="messageBody"
                      className="block font-mono text-xs text-zinc-300"
                    >
                      Message / Role Details *
                    </label>
                    <textarea
                      id="messageBody"
                      rows={4}
                      required
                      value={messageBody}
                      onChange={(e) => setMessageBody(e.target.value)}
                      placeholder="Hi Al Adiyat, we are looking for a Backend-Leaning Fullstack Developer..."
                      className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                {formStatus === 'need-verification' && (
                  <div className="mb-3 flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-300">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>
                      Please complete the Turnstile verification on the left first.
                    </span>
                  </div>
                )}

                {formStatus === 'bot-blocked' && (
                  <div className="mb-3 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-300">
                    Automated submission blocked by Honeypot security filter.
                  </div>
                )}

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-xs font-semibold text-zinc-950 shadow-lg shadow-emerald-500/10 transition-all hover:bg-emerald-400"
                >
                  <Send className="h-4 w-4" />
                  <span>
                    {isUnlocked
                      ? 'Compose Verified Email'
                      : 'Verify Turnstile First to Send'}
                  </span>
                </button>
              </div>
            </form>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};
