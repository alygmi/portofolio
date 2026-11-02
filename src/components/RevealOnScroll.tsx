import React, { useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  delayMs?: number;
  direction?: 'up' | 'left' | 'right' | 'scale';
  className?: string;
}

/**
 * RevealOnScroll Component
 *
 * Memberikan animasi masuk yang mulus (spring-like cubic-bezier) setiap kali
 * card atau section masuk ke dalam layar saat di-scroll.
 */
export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  delayMs = 0,
  direction = 'up',
  className = '',
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Reset saat elemen benar-benar keluar layar agar animasi muncul lagi
          // setiap kali user scroll kembali ke section tersebut
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getHiddenTransform = () => {
    switch (direction) {
      case 'left':
        return 'translate3d(-32px, 12px, 0) scale(0.97)';
      case 'right':
        return 'translate3d(32px, 12px, 0) scale(0.97)';
      case 'scale':
        return 'translate3d(0, 20px, 0) scale(0.93)';
      case 'up':
      default:
        return 'translate3d(0, 34px, 0) scale(0.97)';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translate3d(0, 0, 0) scale(1)'
          : getHiddenTransform(),
        transitionProperty: 'opacity, transform',
        transitionDuration: '680ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: isVisible ? `${delayMs}ms` : '0ms',
        willChange: 'opacity, transform',
      }}
      className={className}
    >
      {children}
    </div>
  );
};
