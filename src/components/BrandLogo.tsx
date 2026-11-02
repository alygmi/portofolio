import React from 'react';

interface BrandLogoProps {
  className?: string;
}

/**
 * Custom Geometric "A" Monogram Logo with Emerald & Cyan Circuit Accents
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({ className = 'h-9 w-9' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="brandBgGrad"
          x1="0"
          y1="0"
          x2="64"
          y2="64"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#18181b" />
          <stop offset="100%" stopColor="#09090b" />
        </linearGradient>
        <linearGradient
          id="brandBorderGrad"
          x1="0"
          y1="0"
          x2="64"
          y2="64"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#10b981" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient
          id="brandAMainGrad"
          x1="14"
          y1="12"
          x2="50"
          y2="52"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#6ee7b7" />
          <stop offset="55%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient
          id="brandAccentCyan"
          x1="20"
          y1="30"
          x2="48"
          y2="44"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
      </defs>

      {/* Outer Squircle Shield */}
      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        rx="16"
        fill="url(#brandBgGrad)"
        stroke="url(#brandBorderGrad)"
        strokeWidth="2.5"
      />

      {/* Subtle Tech Grid Lines */}
      <path
        d="M14 16H50M14 48H50"
        stroke="#27272a"
        strokeWidth="1"
        strokeDasharray="2 3"
      />

      {/* Main Geometric 'A' Monogram */}
      <path
        d="M32 12L15 50H23.5L32 29.5L40.5 50H49L32 12Z"
        fill="url(#brandAMainGrad)"
      />

      {/* Dynamic Slash Crossbar Accent */}
      <path
        d="M21 38.5L43 33.5L45.5 39.5L18.5 44.5L21 38.5Z"
        fill="url(#brandAccentCyan)"
      />

      {/* Apex Glow Node & Corner Status Dot */}
      <circle cx="32" cy="12" r="2.8" fill="#a7f3d0" />
      <circle cx="50" cy="15" r="2.5" fill="#38bdf8" />
    </svg>
  );
};
