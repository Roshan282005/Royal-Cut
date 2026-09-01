import React from 'react';
import { motion } from 'motion/react';
import { PACKAGES_DATA } from '../data/salonData';
import { PackageCard3D } from './PackageCard3D';
import { PackageItem } from '../types';
import { RoyalCutCrest } from './RoyalCutCrest';
import { ShieldCheck, Coffee, Sparkles } from 'lucide-react';

interface PackageSectionProps {
  onBookPackage: (pkg: PackageItem) => void;
}

export const PackageSection: React.FC<PackageSectionProps> = ({ onBookPackage }) => {
  return (
    <section
      id="packages"
      className="relative w-full py-32 sm:py-36 bg-[#070709] text-white overflow-hidden border-t border-zinc-900/80"
    >
      {/* Huge Barely-Visible Architectural Watermark */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none whitespace-nowrap z-0 font-serif-didot text-[18vw] font-normal tracking-[0.2em] text-white/[0.012] uppercase"
      >
        RITUALS
      </div>

      {/* Atmospheric Cinematic Lighting & Ambient Champagne Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-b from-[#c5a059]/[0.035] via-[#c5a059]/[0.015] to-transparent rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute -bottom-20 right-1/4 w-[500px] h-[350px] bg-[#c5a059]/[0.02] rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Subtle Marble / Wood Grain Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none z-0 opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER — Luxury New York Editorial Aesthetic */}
        <div className="relative text-center max-w-3xl mx-auto mb-20">
          {/* Subtle RC Monogram Watermark Behind Heading */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -translate-y-4 opacity-[0.035] pointer-events-none select-none z-0">
            <RoyalCutCrest className="w-56 h-56 text-[#c5a059]" />
          </div>

          <div className="relative z-10">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121216] border border-[#c5a059]/30 text-[10.5px] font-mono tracking-[0.3em] text-[#c5a059] uppercase font-semibold mb-5 shadow-sm"
            >
              <Sparkles className="w-3 h-3 text-[#c5a059]" />
              <span>THE ROYAL COLLECTION</span>
            </motion.div>

            {/* Main Headline in High-Fashion Serif (Didot / Bodoni) */}
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif-didot text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#f5f0e6] uppercase leading-[1.08]"
            >
              CHOOSE YOUR <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#edd9b2] via-[#c5a059] to-[#d8b467]">
                ROYAL RITUAL.
              </span>
            </motion.h2>

            {/* Thin Champagne-Gold Decorative Line with Central Diamond */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center gap-3 my-6 max-w-xs mx-auto"
            >
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#c5a059]/40 to-[#c5a059]" />
              <div className="w-1.5 h-1.5 rotate-45 border border-[#c5a059] bg-[#c5a059]/30" />
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#c5a059]/40 to-[#c5a059]" />
            </motion.div>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-sm sm:text-base text-zinc-300 font-sans-luxury max-w-2xl mx-auto leading-relaxed"
            >
              Curated grooming experiences designed around precision, relaxation and the modern gentleman.
            </motion.p>
          </div>
        </div>

        {/* 5 ELEGANT EDITORIAL PACKAGE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 xl:gap-4.5 items-stretch">
          {PACKAGES_DATA.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.75,
                delay: idx * 0.12,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="flex h-full"
            >
              <PackageCard3D
                pkg={pkg}
                index={idx}
                onBook={onBookPackage}
              />
            </motion.div>
          ))}
        </div>

        {/* REFINED PRIVATE CLUB CONCIERGE ASSURANCE FOOTER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 p-4 sm:p-5 rounded-lg bg-[#0d0d11]/80 border border-zinc-800/80 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 font-sans-luxury tracking-wide"
        >
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#c5a059] shrink-0" />
            <span>Curated rituals engineered for complete restoration and time efficiency.</span>
          </div>
          <div className="flex items-center gap-2 text-[#c5a059] font-medium shrink-0">
            <Coffee className="w-3.5 h-3.5" />
            <span>Complimentary Espresso & Pour-Over Bar</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
