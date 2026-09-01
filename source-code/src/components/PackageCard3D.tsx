import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Clock, ArrowRight, Sparkles } from 'lucide-react';
import { PackageItem } from '../types';

interface PackageCard3DProps {
  pkg: PackageItem;
  index: number;
  onBook: (pkg: PackageItem) => void;
}

export const PackageCard3D: React.FC<PackageCard3DProps> = ({ pkg, index, onBook }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Tasteful 3D tilt clamped to max 2.2 degrees for luxury restraint
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -2.2;
    const rotY = ((x - centerX) / centerX) * 2.2;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.14,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
    setIsHovered(false);
  };

  const isRoyal = pkg.isPopular || pkg.name.toUpperCase() === 'ROYAL';
  const packageNumber = `Nº 0${index + 1}`;

  return (
    <div
      className={`perspective-1000 w-full h-full ${
        isRoyal ? 'z-20 xl:-translate-y-2' : 'z-10'
      }`}
      style={{ perspective: '1200px' }}
    >
      <div
        ref={cardRef}
        id={`package-card-${pkg.name.toLowerCase()}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${isHovered ? -5 : 0}px)`,
          transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease, border-color 0.5s ease',
        }}
        className={`group relative h-full rounded-xl overflow-hidden flex flex-col justify-between select-none transition-all duration-700 ${
          isRoyal
            ? 'bg-[#0c0c10] border border-[#c5a059]/60 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9),0_0_35px_0_rgba(197,160,89,0.15)] ring-1 ring-[#c5a059]/25 hover:border-[#c5a059]'
            : 'bg-[#0a0a0e] border border-zinc-800/80 hover:border-[#c5a059]/45 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.95),0_0_25px_0_rgba(197,160,89,0.08)]'
        }`}
      >
        {/* Subtle Dynamic Specular Glare Reflection */}
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-500 rounded-xl"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(212, 175, 101, ${glarePos.opacity}) 0%, transparent 65%)`,
          }}
        />

        {/* Fine Material Grain & Dark Marble Texture Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/25 via-transparent to-black/50 pointer-events-none z-10" />

        {/* Photographic Atmosphere Layer with Multi-Stop Dark Vignette */}
        {pkg.imageUrl && (
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
                loading="lazy"
              src={pkg.imageUrl}
              alt={pkg.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-20 group-hover:opacity-28 transition-all duration-700 ease-out group-hover:scale-105 filter saturate-[0.8] contrast-[1.12]"
            />
            {/* Gradient ensures pristine text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0e]/95 via-[#0c0c10]/95 to-[#08080b]" />
            <div className="absolute inset-0 bg-radial-vignette opacity-80" />
          </div>
        )}

        {/* Top Edge Champagne Highlight Bar */}
        <div
          className={`absolute top-0 left-0 right-0 h-[1.5px] transition-opacity duration-500 z-20 ${
            isRoyal
              ? 'bg-gradient-to-r from-transparent via-[#deb86a] to-transparent opacity-100'
              : 'bg-gradient-to-r from-transparent via-[#c5a059]/40 to-transparent opacity-0 group-hover:opacity-100'
          }`}
        />

        {/* FEATURED: Refined Editorial "THE SIGNATURE" Label */}
        {isRoyal && (
          <div className="absolute top-4 right-4 z-30">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-black/90 border border-[#c5a059]/50 backdrop-blur-md shadow-lg">
              <Sparkles className="w-2.5 h-2.5 text-[#c5a059]" />
              <span className="text-[9.5px] font-mono tracking-[0.25em] text-[#edd9b2] uppercase font-semibold">
                THE SIGNATURE
              </span>
            </div>
          </div>
        )}

        {/* CARD CONTENT */}
        <div className="relative z-20 p-6 sm:p-7 flex flex-col h-full justify-between">
          <div>
            {/* Top Eyebrow: Package Number & Duration */}
            <div className="flex items-center justify-between gap-2 mb-5">
              <span className="text-[11px] font-mono tracking-[0.25em] text-[#c5a059] uppercase font-semibold">
                {packageNumber}
              </span>
              {!isRoyal && (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-widest text-zinc-400">
                  <Clock className="w-3 h-3 text-[#c5a059]/80" />
                  {pkg.duration}
                </span>
              )}
            </div>

            {/* If Royal, display duration below badge */}
            {isRoyal && (
              <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-widest text-zinc-400 mb-3">
                <Clock className="w-3 h-3 text-[#c5a059]/80" />
                <span>{pkg.duration}</span>
              </div>
            )}

            {/* Package Name in High-Contrast Luxury Serif */}
            <h3 className="font-serif-didot text-2xl sm:text-3xl font-bold tracking-[0.06em] text-[#f7f2e7] uppercase leading-tight mb-4 group-hover:text-white transition-colors duration-300">
              {pkg.name}
            </h3>

            {/* Price Presentation: Large elegant champagne gold + Balanced "PER EXPERIENCE" */}
            <div className="mb-5">
              <div className="flex items-baseline gap-2">
                <span className="font-serif-didot text-3xl sm:text-4xl lg:text-[40px] font-normal text-[#c5a059] tracking-tight leading-none">
                  ${pkg.price}
                </span>
                <span className="text-[9.5px] font-mono tracking-[0.22em] text-zinc-400 uppercase font-medium">
                  PER EXPERIENCE
                </span>
              </div>
            </div>

            {/* Short Description */}
            <div className="min-h-[46px] mb-5 flex items-center">
              <p className="text-xs text-zinc-300/90 font-sans-luxury leading-relaxed tracking-wide">
                {pkg.description}
              </p>
            </div>

            {/* Thin Champagne-Gold Decorative Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#c5a059]/25 to-transparent mb-5" />

            {/* INCLUDES Label & Services Checklist */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 mb-3.5">
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#c5a059] uppercase font-semibold">
                  INCLUDES
                </span>
                <div className="h-px flex-1 bg-zinc-800/80" />
              </div>

              <div className="space-y-3">
                {pkg.includedServices.map((serviceName, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-[12.5px] text-zinc-300 font-sans-luxury leading-snug group-hover:text-zinc-100 transition-colors"
                  >
                    {/* Refined Minimalist Gold Circular Checkmark Mark */}
                    <div className="mt-1 w-3.5 h-3.5 rounded-full border border-[#c5a059]/60 flex items-center justify-center shrink-0 bg-[#c5a059]/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                    </div>
                    <span className="tracking-wide">{serviceName}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FOOTER: Luxury Editorial Text CTA */}
          <div className="pt-5 border-t border-zinc-800/70 mt-auto">
            <button
              id={`book-pkg-btn-${pkg.name.toLowerCase()}`}
              onClick={() => onBook(pkg)}
              className="group/cta w-full py-2.5 px-1 flex flex-col items-center justify-center text-center focus:outline-none transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center gap-2 font-serif-didot text-xs font-bold tracking-[0.2em] text-[#c5a059] uppercase group-hover/cta:text-[#deb86a] transition-colors duration-300">
                <span>
                  {isRoyal ? 'BOOK THIS RITUAL' : 'RESERVE EXPERIENCE'}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#c5a059] group-hover/cta:text-[#deb86a] transition-transform duration-300 group-hover/cta:translate-x-1.5" />
              </div>
              {/* Subtle underline extension effect on hover */}
              <span className="block h-[1px] w-12 group-hover/cta:w-32 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent transition-all duration-300 mt-1.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
