import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { RoyalCutCrest } from './RoyalCutCrest';
import { EditorialCrest3D } from './3d/EditorialCrest3D';
import { SALON_PHOTOS } from '../data/serviceImages';

interface FeatureColumn {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  icon: React.ReactNode;
}

export const BrandStatement: React.FC = () => {
  const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax scroll progression for layered cinematic depth
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Layer 1: Background moves slowly
  const bgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  // Layer 2: 3D Emblem moves with subtle middle-ground depth
  const crestY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Layer 3: Foreground typography moves minimally
  const textY = useTransform(scrollYProgress, [0, 1], [15, -15]);

  const features: FeatureColumn[] = [
    {
      id: 'precision',
      number: '01',
      title: 'UNCOMPROMISING PRECISION',
      subtitle: 'ARTISANAL CUTTING MASTERY',
      description:
        'Every line, taper, and texture is calibrated to complement your bone structure and personal profile.',
      imageUrl:
        'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-[#deb86a]"
        >
          {/* Refined Minimalist Precision Shears & Calibrated Axis */}
          <path d="M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path d="M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <line x1="20" y1="4" x2="8.12" y2="15.88" />
          <line x1="14.47" y1="14.48" x2="20" y2="20" />
          <line x1="8.12" y1="8.12" x2="12" y2="12" />
        </svg>
      ),
    },
    {
      id: 'rituals',
      number: '02',
      title: 'FIVE-STAR RITUALS',
      subtitle: 'RESTORATIVE GROOMING SESSIONS',
      description:
        'Warm eucalyptus towel compresses, artisanal straight-razor finishes, and scalp acupressure therapies.',
      imageUrl:
        'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1200&q=80',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-[#deb86a]"
        >
          {/* Refined Minimalist Hot Towel Ritual & Aromatic Steam */}
          <path d="M4 16c0 2.2 1.8 4 4 4h8c2.2 0 4-1.8 4-4v-4H4v4z" />
          <path d="M4 12V8c0-2.2 1.8-4 4-4h8c2.2 0 4 1.8 4 4v4" />
          <path d="M8 2v2" />
          <path d="M12 2v2" />
          <path d="M16 2v2" />
          <line x1="7" y1="16" x2="17" y2="16" />
        </svg>
      ),
    },
    {
      id: 'atmosphere',
      number: '03',
      title: 'BESPOKE ATMOSPHERE',
      subtitle: 'NEW YORK SANCTUARY',
      description:
        'An intimate private members lounge framed with dark walnut, Italian leather, and quiet hospitality.',
      imageUrl:
        'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=80',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-[#deb86a]"
        >
          {/* Refined Architectural Archway & Sanctuary Emblem */}
          <path d="M4 21V9a8 8 0 0 1 16 0v12" />
          <path d="M4 21h16" />
          <path d="M9 21v-7a3 3 0 0 1 6 0v7" />
          <line x1="12" y1="3" x2="12" y2="6" />
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="brand-statement"
      className="relative w-full py-28 sm:py-36 lg:py-44 bg-[#060608] text-[#e4e4e7] overflow-hidden selection:bg-[#c5a059]/30"
    >
      {/* ======================================================== */}
      {/* 1. CINEMATIC BACKGROUND: DARK MARBLE, WOOD & SHADOWS     */}
      {/* ======================================================== */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {/* Subtle Dark Luxury Interior Atmosphere */}
        <img
          src={SALON_PHOTOS.interior02}
          alt="Royal Cut Saloon Sanctuary Interior"
          className="w-full h-full object-cover object-center opacity-[0.06] scale-110 filter grayscale contrast-125"
          loading="lazy"
        />

        {/* Deep Black Vignette & Studio Shadows */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060608] via-[#060608]/85 to-[#060608]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#060608_75%)]" />

        {/* Soft Warm Amber Backlight (Subtle depth behind typography) */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-b from-[#c5a059]/10 via-[#c5a059]/3 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Architectural Subtle Gold Axis Guidelines */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#deb86a]/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#deb86a]/20 to-transparent" />
      </motion.div>

      {/* Large Subtle Editorial Watermark */}
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 select-none pointer-events-none z-0 text-center font-serif-bodoni font-black text-[14vw] uppercase tracking-[0.2em] text-white/[0.012] whitespace-nowrap leading-none"
        aria-hidden="true"
      >
        THE STANDARD
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ======================================================== */}
        {/* 2. SECTION HEADER: — THE ROYAL STANDARD — & MONOGRAM     */}
        {/* ======================================================== */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
          {/* Eyebrow with Thin Gold Rules */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-4 sm:gap-6 mb-4"
          >
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#deb86a]/80" />
            <span className="text-[11px] sm:text-xs font-serif-display tracking-[0.38em] text-[#deb86a] uppercase font-bold">
              THE ROYAL STANDARD
            </span>
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#deb86a]/80" />
          </motion.div>

          {/* Refined RC Monogram (Small Luxury Anchor) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-1"
          >
            <RoyalCutCrest className="w-6 h-6 text-[#deb86a] drop-shadow-[0_2px_10px_rgba(197,160,89,0.3)] opacity-95" />
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* 3. MAIN EDITORIAL HEADLINE & 3D METALLIC CREST DEPTH     */}
        {/* ======================================================== */}
        <div className="relative max-w-4xl mx-auto text-center mb-16 sm:mb-20">
          {/* Centered 3D Metallic Plaque Layer (Cinematic parallax depth) */}
          <motion.div
            style={{ y: crestY }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 pointer-events-none opacity-30 sm:opacity-40 -z-10"
          >
            <EditorialCrest3D className="w-full h-full" />
          </motion.div>

          {/* High-Contrast New York Editorial Headline */}
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-1.5 sm:space-y-2.5"
          >
            <h2 className="font-serif-bodoni text-3xl sm:text-5xl md:text-6xl font-bold tracking-[0.03em] text-[#f7f5f0] leading-[1.08] uppercase text-balance">
              GROOMING IS NOT A
              <br />
              ROUTINE.
            </h2>

            <div className="pt-1.5 sm:pt-2">
              <span className="font-serif-editorial italic text-3xl sm:text-5xl md:text-6xl font-normal tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#fae8c8] via-[#e5c07b] to-[#c5a059] block drop-shadow-[0_2px_12px_rgba(197,160,89,0.25)]">
                it’s a statement.
              </span>
            </div>
          </motion.div>

          {/* Supporting Editorial Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 sm:mt-10 max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-zinc-300 font-sans-luxury font-light leading-relaxed text-balance"
          >
            Royal Cut Saloon combines precision barbering, modern styling, and premium grooming into an experience built around confidence, detail, and individuality.
          </motion.p>

          {/* Fine Gold Center Divider Rule */}
          <div className="flex items-center justify-center gap-3 mt-10">
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#deb86a]/40 to-[#deb86a]" />
            <div className="w-1.5 h-1.5 rotate-45 border border-[#deb86a] bg-[#060608]" />
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#deb86a]/40 to-[#deb86a]" />
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. THREE EDITORIAL FEATURE COLUMNS (MAGAZINE SPREAD)     */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {features.map((feature, idx) => {
            const isHovered = hoveredColumn === feature.id;

            return (
              <motion.div
                key={feature.id}
                id={`royal-standard-col-${feature.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.8,
                  delay: 0.35 + idx * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => setHoveredColumn(feature.id)}
                onMouseLeave={() => setHoveredColumn(null)}
                className="group relative bg-[#0c0c10]/80 border border-zinc-800/80 hover:border-[#deb86a]/45 transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between overflow-hidden cursor-default backdrop-blur-md p-8 sm:p-9 rounded-lg"
              >
                {/* 1. Subtle Editorial Photography Background */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <img
                    src={feature.imageUrl}
                    alt={feature.title}
                    className="w-full h-full object-cover object-center opacity-[0.07] group-hover:opacity-[0.14] scale-105 group-hover:scale-108 transition-all duration-700 ease-out filter grayscale group-hover:grayscale-0 contrast-125"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c10] via-[#0c0c10]/80 to-transparent" />
                </div>

                {/* 2. Top Minimal Gold Accent Line (Extends on hover) */}
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#deb86a] to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />

                {/* 3. Subtle Warm Ambient Gleam on Hover */}
                <div className="absolute -inset-full bg-gradient-to-r from-transparent via-[#deb86a]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

                {/* 4. Large Subtle Background Number */}
                <div
                  className="absolute top-4 right-6 font-serif-bodoni font-black text-5xl sm:text-6xl text-white/[0.04] group-hover:text-[#deb86a]/15 select-none pointer-events-none transition-colors duration-500 leading-none"
                  aria-hidden="true"
                >
                  {feature.number}
                </div>

                {/* 5. Column Header & Line Icon */}
                <div className="relative z-10">
                  {/* Clean Icon Container */}
                  <div className="w-10 h-10 rounded-md bg-[#14141c] border border-[#deb86a]/25 flex items-center justify-center mb-6 group-hover:border-[#deb86a] group-hover:-translate-y-0.5 transition-all duration-300 shadow-sm">
                    {feature.icon}
                  </div>

                  {/* Subtitle / Category Eyebrow */}
                  <span className="text-[10px] font-mono tracking-[0.25em] text-[#deb86a] uppercase font-semibold block mb-2">
                    {feature.subtitle}
                  </span>

                  {/* High-Contrast Editorial Column Title */}
                  <h3 className="font-serif-bodoni text-lg sm:text-xl font-bold tracking-[0.04em] text-[#f7f5f0] group-hover:text-[#fff6df] group-hover:translate-x-0.5 transition-all duration-300 leading-snug uppercase mb-3.5">
                    {feature.title}
                  </h3>

                  {/* Supporting Description */}
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans-luxury leading-relaxed group-hover:text-zinc-300 transition-colors">
                    {feature.description}
                  </p>
                </div>

                {/* 6. Refined Column Footer / Metric Bar */}
                <div className="relative z-10 pt-6 mt-8 border-t border-zinc-800/60 flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                    STANDARD {feature.number}
                  </span>

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-[1px] bg-zinc-800 group-hover:w-12 group-hover:bg-[#deb86a]/70 transition-all duration-500" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* 5. EDITORIAL SIGNATURE STRIP                             */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 sm:mt-20 pt-8 border-t border-zinc-800/50 text-center max-w-xl mx-auto"
        >
          <p className="text-xs sm:text-sm font-serif-editorial italic text-zinc-400">
            "We believe that a man's appearance is his signature. We ensure it speaks with quiet authority."
          </p>
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#deb86a] uppercase block mt-2.5 font-semibold">
            ROYAL CUT SALOON • EST. NEW YORK
          </span>
        </motion.div>
      </div>

      {/* ======================================================== */}
      {/* 6. CINEMATIC SEAMLESS TRANSITION TO NEXT SECTION         */}
      {/* ======================================================== */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#08080a] via-[#08080a]/60 to-transparent pointer-events-none z-20" />
    </section>
  );
};
