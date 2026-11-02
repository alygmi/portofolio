import React, { useEffect, useRef, useState } from 'react';
import {
  MASKED_CONTACT,
  revealProtectedContact,
  UnlockedContact,
} from '../utils/contactSecurity';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { RevealOnScroll } from './RevealOnScroll';

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

  const [senderName, setSenderName] = useState('');
  const [senderCompany, setSenderCompany] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [honeypotTrap, setHoneypotTrap] = useState('');
  const [formStatus, setFormStatus] = useState<
    'idle' | 'bot-blocked' | 'need-verification' | 'ready-sent'
  >('idle');

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 25;

    const tryRenderTurnstile = () => {
      if (window.turnstile && widgetContainerRef.current && !widgetIdRef.current) {
        setScriptLoaded(true);
        try {
          widgetIdRef.current = window.turnstile.render(widgetContainerRef.current, {
            sitekey: TURNSTILE_SITE_KEY,
            theme: 'light',
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
      className="border-t border-zinc-200 bg-zinc-100/50 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Clean Section Header */}
        <RevealOnScroll direction="up">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Get in Touch
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Available for backend and fullstack engineering roles. Complete the
              quick verification below to view or copy my email and WhatsApp number.
            </p>
          </div>
        </RevealOnScroll>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left 7 Cols: Direct Contact Card */}
          <RevealOnScroll direction="left" delayMs={80} className="lg:col-span-7">
            <div className="h-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs sm:p-8">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="text-base font-bold text-zinc-900">
                  Direct Contact
                </h3>
                <p className="mt-1 text-xs text-zinc-500">
                  {isUnlocked
                    ? 'Contact details unlocked — click to copy or open directly.'
                    : 'Protected against automated scrapers.'}
                </p>
              </div>

              {/* Email & WhatsApp Rows (Pure Typography) */}
              <div className="mt-6 space-y-4">
                {/* Email Card */}
                <div className="flex flex-col justify-between gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:flex-row sm:items-center">
                  <div>
                    <div className="text-xs text-zinc-500">Email</div>
                    <div
                      className={`mt-0.5 font-mono text-sm font-semibold ${
                        isUnlocked ? 'text-zinc-900' : 'text-zinc-400 select-none'
                      }`}
                    >
                      {unlockedData ? unlockedData.email : MASKED_CONTACT.email}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={!unlockedData}
                      onClick={() =>
                        unlockedData && handleCopy(unlockedData.email, 'email')
                      }
                      className={`inline-flex items-center rounded-lg border px-3 py-1.5 font-mono text-xs font-medium transition-all ${
                        unlockedData
                          ? 'border-zinc-300 bg-white text-zinc-700 hover:border-emerald-600 hover:text-emerald-700'
                          : 'cursor-not-allowed border-zinc-200 bg-zinc-100 text-zinc-400'
                      }`}
                    >
                      {copiedField === 'email' ? (
                        <span className="text-emerald-700">Copied</span>
                      ) : (
                        <span>Copy</span>
                      )}
                    </button>

                    {unlockedData && (
                      <a
                        href={unlockedData.mailtoUrl}
                        className="inline-flex items-center gap-1 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-600"
                      >
                        <span>Email ↗</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Phone / WhatsApp Card */}
                <div className="flex flex-col justify-between gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:flex-row sm:items-center">
                  <div>
                    <div className="text-xs text-zinc-500">
                      Phone / WhatsApp
                    </div>
                    <div
                      className={`mt-0.5 font-mono text-sm font-semibold ${
                        isUnlocked ? 'text-zinc-900' : 'text-zinc-400 select-none'
                      }`}
                    >
                      {unlockedData
                        ? unlockedData.phoneDisplay
                        : MASKED_CONTACT.phoneDisplay}
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
                      className={`inline-flex items-center rounded-lg border px-3 py-1.5 font-mono text-xs font-medium transition-all ${
                        unlockedData
                          ? 'border-zinc-300 bg-white text-zinc-700 hover:border-emerald-600 hover:text-emerald-700'
                          : 'cursor-not-allowed border-zinc-200 bg-zinc-100 text-zinc-400'
                      }`}
                    >
                      {copiedField === 'phone' ? (
                        <span className="text-emerald-700">Copied</span>
                      ) : (
                        <span>Copy</span>
                      )}
                    </button>

                    {unlockedData && (
                      <a
                        href={unlockedData.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500"
                      >
                        <span>WhatsApp ↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Cloudflare Turnstile Verification Zone */}
              <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <div className="text-xs font-medium text-zinc-700">
                      {isUnlocked
                        ? 'Verified — contact details are now visible above.'
                        : 'Complete verification to reveal email and phone number'}
                    </div>
                  </div>

                  <div className="flex flex-col items-start sm:items-end">
                    <div ref={widgetContainerRef} className="min-h-[65px]" />

                    {!isUnlocked && (scriptBlocked || !scriptLoaded) && (
                      <button
                        type="button"
                        onClick={handleFallbackHumanVerify}
                        className="mt-2 inline-flex items-center rounded-lg border border-zinc-300 bg-white px-3.5 py-2 font-mono text-xs text-zinc-800 transition-colors hover:border-emerald-600 hover:text-emerald-700"
                      >
                        Reveal Contact Details
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-100 pt-4 text-xs text-zinc-500">
                <span>Profiles</span>
                <div className="flex items-center gap-4 font-mono">
                  <a
                    href={PORTFOLIO_DATA.profile.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-700 hover:text-emerald-700"
                  >
                    {PORTFOLIO_DATA.profile.links.githubHandle} ↗
                  </a>
                  <a
                    href={PORTFOLIO_DATA.profile.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-700 hover:text-emerald-700"
                  >
                    {PORTFOLIO_DATA.profile.links.linkedinHandle} ↗
                  </a>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right 5 Cols: Quick Message Composer */}
          <RevealOnScroll direction="right" delayMs={180} className="lg:col-span-5">
            <form
              onSubmit={handleQuickMessageSubmit}
              className="flex h-full flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs sm:p-8"
            >
              <div>
                <h3 className="text-base font-bold text-zinc-900">
                  Send a Message
                </h3>
                <p className="mt-1 text-xs text-zinc-500">
                  Opens your default email client after verification.
                </p>

                {/* HONEYPOT FIELD */}
                <div
                  className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
                  aria-hidden="true"
                >
                  <label htmlFor="company_website_trap">
                    Leave this field blank
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
                      className="block font-mono text-xs text-zinc-700"
                    >
                      Name *
                    </label>
                    <input
                      id="senderName"
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Your name"
                      className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:border-emerald-600 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="senderCompany"
                      className="block font-mono text-xs text-zinc-700"
                    >
                      Company (Optional)
                    </label>
                    <input
                      id="senderCompany"
                      type="text"
                      value={senderCompany}
                      onChange={(e) => setSenderCompany(e.target.value)}
                      placeholder="Company or team"
                      className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:border-emerald-600 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="messageBody"
                      className="block font-mono text-xs text-zinc-700"
                    >
                      Message *
                    </label>
                    <textarea
                      id="messageBody"
                      rows={4}
                      required
                      value={messageBody}
                      onChange={(e) => setMessageBody(e.target.value)}
                      placeholder="How can I help?"
                      className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:border-emerald-600 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                {formStatus === 'need-verification' && (
                  <div className="mb-3 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                    Please complete the verification check on the left first.
                  </div>
                )}

                {formStatus === 'bot-blocked' && (
                  <div className="mb-3 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-xs text-rose-800">
                    Submission blocked.
                  </div>
                )}

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 text-xs font-semibold text-white transition-all hover:bg-emerald-600"
                >
                  <span>Send Email →</span>
                </button>
              </div>
            </form>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};
