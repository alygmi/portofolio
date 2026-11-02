import { useEffect } from 'react';

/**
 * Custom Butter-Smooth Inertia Scroll Engine (Lenis-style physics)
 *
 * - Membuat scroll wheel terasa licin ("like butter") dengan momentum glide 60/120fps.
 * - 100% aman untuk section #experience: jika event wheel sudah di-preventDefault()
 *   oleh ExperienceSection (saat step-lock card aktif), engine ini otomatis mengalah
 *   dan tidak ikut campur.
 */

let globalTargetY = 0;
let globalCurrentY = 0;
let globalRafId: number | null = null;
let isGliding = false;

function clampScrollY(y: number): number {
  const maxScroll = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight
  );
  return Math.max(0, Math.min(maxScroll, y));
}

function runGlideLoop() {
  const diff = globalTargetY - globalCurrentY;

  if (Math.abs(diff) > 0.35) {
    // Damping factor 0.115 -> licin, mulus, dan punya efek meluncur (inertia)
    globalCurrentY += diff * 0.115;
    window.scrollTo(0, globalCurrentY);
    globalRafId = requestAnimationFrame(runGlideLoop);
  } else {
    globalCurrentY = globalTargetY;
    window.scrollTo(0, globalTargetY);
    isGliding = false;
    globalRafId = null;
  }
}

export function butterScrollTo(targetY: number) {
  globalCurrentY = window.scrollY;
  globalTargetY = clampScrollY(targetY);
  if (!isGliding) {
    isGliding = true;
    globalRafId = requestAnimationFrame(runGlideLoop);
  }
}

export function useButterScroll() {
  useEffect(() => {
    globalCurrentY = window.scrollY;
    globalTargetY = window.scrollY;

    const handleWheel = (e: WheelEvent) => {
      // 1. Jika ExperienceSection (atau modal/drawer) sudah melakukan e.preventDefault(),
      //    jangan sentuh scroll sama sekali agar step-lock Experience tidak terganggu!
      if (e.defaultPrevented) {
        return;
      }

      // 2. Jika user sedang scroll di dalam elemen internal yang punya scrollbar sendiri (misal modal)
      const targetEl = e.target as HTMLElement | null;
      if (targetEl && targetEl.closest('[role="dialog"]')) {
        return;
      }

      // 3. Abaikan pinch-zoom (ctrlKey)
      if (e.ctrlKey || e.metaKey) {
        return;
      }

      e.preventDefault();

      if (!isGliding) {
        globalCurrentY = window.scrollY;
        globalTargetY = window.scrollY;
      }

      // Normalize delta (mouse wheel vs trackpad) & berikan multiplier 1.25x supaya licin
      const delta =
        e.deltaMode === 1
          ? e.deltaY * 36
          : e.deltaMode === 2
          ? e.deltaY * window.innerHeight
          : e.deltaY;

      globalTargetY = clampScrollY(globalTargetY + delta * 1.28);

      if (!isGliding) {
        isGliding = true;
        globalRafId = requestAnimationFrame(runGlideLoop);
      }
    };

    const handleNativeScroll = () => {
      // Sinkronkan posisi saat user geser scrollbar manual atau pakai tombol keyboard
      if (!isGliding) {
        globalCurrentY = window.scrollY;
        globalTargetY = window.scrollY;
      }
    };

    // Tangkap klik anchor link (#impact, #migrations, dll.) supaya ikut meluncur licin
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') {
        e.preventDefault();
        butterScrollTo(0);
        return;
      }

      const destEl = document.querySelector(hash);
      if (destEl) {
        e.preventDefault();
        const rect = destEl.getBoundingClientRect();
        butterScrollTo(window.scrollY + rect.top);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleNativeScroll, { passive: true });
    document.addEventListener('click', handleAnchorClick);

    return () => {
      if (globalRafId !== null) cancelAnimationFrame(globalRafId);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleNativeScroll);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
}
