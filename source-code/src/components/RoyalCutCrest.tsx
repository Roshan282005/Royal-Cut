import React from 'react';

interface RoyalCutCrestProps {
  className?: string;
  size?: number;
  variant?: 'gold' | 'monochrome' | 'white';
}

export const RoyalCutCrest: React.FC<RoyalCutCrestProps> = ({
  className = 'w-9 h-9',
  variant = 'gold',
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-all duration-300 shrink-0`}
      aria-label="Royal Cut Saloon Crest"
    >
      <defs>
        {/* Luxury Champagne Gold Multi-Stop Metallic Gradient */}
        <linearGradient id="rcGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#faecd0" />
          <stop offset="25%" stopColor="#deb86a" />
          <stop offset="50%" stopColor="#c5a059" />
          <stop offset="75%" stopColor="#e8cf99" />
          <stop offset="100%" stopColor="#8d6e2e" />
        </linearGradient>

        {/* Specular Highlight Gradient */}
        <linearGradient id="rcGoldHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#deb86a" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#8d6e2e" stopOpacity="0.05" />
        </linearGradient>

        {/* Shield Inner Dark Obsidian Fill */}
        <linearGradient id="rcShieldDark" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#141418" />
          <stop offset="100%" stopColor="#08080a" />
        </linearGradient>

        {/* Linear Gold Stroke Gradient */}
        <linearGradient id="rcStrokeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8d6e2e" />
          <stop offset="50%" stopColor="#faecd0" />
          <stop offset="100%" stopColor="#c5a059" />
        </linearGradient>
      </defs>

      {/* 1. Outer Shield Outline with Obsidian Fill */}
      <path
        d="M 50 14 C 68 14 82 18 84 32 C 84 56 68 76 50 86 C 32 76 16 56 16 32 C 18 18 32 14 50 14 Z"
        fill="url(#rcShieldDark)"
        stroke={variant === 'white' ? '#ffffff' : 'url(#rcGoldGrad)'}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 2. Inner Shield Engraved Hairline */}
      <path
        d="M 50 18 C 65 18 78 22 79 33 C 79 53 65 71 50 80 C 35 71 21 53 21 33 C 22 22 35 18 50 18 Z"
        fill="none"
        stroke={variant === 'white' ? '#ffffff' : 'url(#rcStrokeGrad)'}
        strokeWidth="0.75"
        strokeOpacity="0.6"
      />

      {/* 3. Refined Crown Finial (Top of Crest) */}
      {/* Crown Base */}
      <path
        d="M 37 13 L 63 13 L 61 16 L 39 16 Z"
        fill="url(#rcGoldGrad)"
      />
      {/* Crown 3 Peaks */}
      <path
        d="M 37 13 L 34 6 L 44 10 L 50 3 L 56 10 L 66 6 L 63 13 Z"
        fill="url(#rcGoldGrad)"
        stroke={variant === 'white' ? '#ffffff' : '#f7e7c4'}
        strokeWidth="0.5"
      />
      {/* Crown Jewels (3 micro jewels) */}
      <circle cx="34" cy="5" r="1" fill="#ffffff" />
      <circle cx="50" cy="2" r="1.2" fill="#ffffff" />
      <circle cx="66" cy="5" r="1" fill="#ffffff" />

      {/* 4. Engraved Star / Diamond Accent */}
      <path
        d="M 50 21 L 51.5 24.5 L 55 26 L 51.5 27.5 L 50 31 L 48.5 27.5 L 45 26 L 48.5 24.5 Z"
        fill="url(#rcGoldGrad)"
      />

      {/* 5. Custom Interlocking 'RC' Luxury Monogram */}
      {/* Letter 'R' */}
      <path
        d="M 36 36 L 47 36 C 52 36 54 39 54 43 C 54 47 51 50 46 50 L 36 50 Z M 36 40 L 36 46 L 45 46 C 47.5 46 49 45 49 43 C 49 41 47.5 40 45 40 Z"
        fill="url(#rcGoldGrad)"
      />
      <path
        d="M 36 36 L 41 36 L 41 64 L 36 64 Z"
        fill="url(#rcGoldGrad)"
      />
      <path
        d="M 44 48 L 54 64 L 48 64 L 39 50 Z"
        fill="url(#rcGoldGrad)"
      />

      {/* Letter 'C' (Intertwined with R) */}
      <path
        d="M 64 42 C 61 38 56 36 50 36 C 40 36 33 44 33 52 C 33 60 40 68 50 68 C 57 68 62 65 65 60 L 61 57 C 58 61 54 63 50 63 C 43 63 38 58 38 52 C 38 46 43 41 50 41 C 54 41 58 43 61 46 Z"
        fill="url(#rcGoldGrad)"
        fillOpacity="0.95"
      />

      {/* 6. Lower Crest Ribbon / Tail Spike */}
      <circle cx="50" cy="74" r="1.5" fill="url(#rcGoldGrad)" />
      <path
        d="M 48 78 L 50 82 L 52 78 Z"
        fill="url(#rcGoldGrad)"
      />
    </svg>
  );
};

