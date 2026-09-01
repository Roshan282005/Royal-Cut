import React from 'react';
import { motion } from 'motion/react';
import { RoyalCutCrest } from './RoyalCutCrest';
import { SALON_PHOTOS } from '../data/serviceImages';
import {
  Clock,
  MapPin,
  Phone,
  Instagram,
  ArrowRight,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const scrollToServices = () => {
    const el = document.querySelector('#services');
    if (el) {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(el as HTMLElement, { offset: -70, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToExperience = () => {
    const el = document.querySelector('#brand-statement');
    if (el) {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(el as HTMLElement, { offset: -70, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#070709] text-white"
    >
      {/* 1. Real Shop Photo Background — swap SALON_PHOTOS.interior01 for a different real photo if the client sends more */}
      <div className="absolute inset-0">
        <img
          src={SALON_PHOTOS.interior01}
          alt="Royal Cut Saloon interior"
          fetchPriority="high"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* 2. Atmospheric Studio Lighting, Radial Glows & Vignette to keep text legible over the photo */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Soft Gold Atmospheric Glow behind center text */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-b from-[#c5a059]/12 via-[#c5a059]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Dark overlay so the photo reads as backdrop, not competing with text */}
        <div className="absolute inset-0 bg-[#070709]/75" />

        {/* Vertical vignette for header/scroll-indicator legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-[#070709]/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070709]/80 via-transparent to-[#070709]/80 hidden lg:block" />
      </div>

      {/* 3. Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 sm:pt-40 pb-20 w-full flex flex-col items-center text-center">
        
        {/* Top Royal Emblem & Heritage Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#14141a]/85 border border-[#c5a059]/35 backdrop-blur-md mb-6 shadow-2xl shadow-black/60 group hover:border-[#c5a059] transition-all duration-300"
        >
          <RoyalCutCrest className="w-4 h-4" />
          <span className="text-[10px] sm:text-xs font-serif-display tracking-[0.28em] text-[#f4ecd8] uppercase font-semibold">
            ROYAL CUT SALOON • NEW YORK
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse" />
        </motion.div>

        {/* Main Editorial Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="space-y-1 sm:space-y-2"
        >
          <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.06em] text-[#fcfbf7] leading-[1.04] uppercase select-none">
            LOOK GOOD.
          </h1>
          <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.06em] leading-[1.04] uppercase select-none">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fff4d6] via-[#deb86a] to-[#c5a059] drop-shadow-[0_2px_20px_rgba(197,160,89,0.35)]">
              FEEL ROYAL.
            </span>
          </h1>
        </motion.div>

        {/* Brand Philosophy Sub-Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 flex items-center justify-center gap-3 text-xs sm:text-sm tracking-[0.3em] font-serif-display text-[#c5a059] uppercase font-medium"
        >
          <span>BESPOKE MEN'S GROOMING</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-300">EAST MEADOW, NY</span>
        </motion.div>

        {/* Editorial Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-4 max-w-2xl text-xs sm:text-sm md:text-base text-zinc-300 font-sans-luxury font-normal leading-relaxed text-balance"
        >
          Precision barbering, artisanal straight razor rituals, and 24K rejuvenating treatments crafted for the modern gentleman.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          {/* Primary CTA: Champagne-Gold Metallic */}
          <button
            id="hero-primary-cta"
            onClick={onOpenBooking}
            className="w-full sm:w-auto relative group overflow-hidden px-8 py-4 rounded-lg bg-gradient-to-r from-[#deb86a] via-[#c5a059] to-[#b38e45] text-black font-serif-display font-bold text-xs sm:text-sm tracking-[0.2em] uppercase shadow-2xl shadow-[#c5a059]/20 hover:brightness-110 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5"
          >
            {/* Moving Light Shimmer Bar */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 pointer-events-none" />
            <span className="relative z-10 font-black">BOOK YOUR EXPERIENCE</span>
            <ArrowRight className="w-4 h-4 text-black relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary CTA: Smoked Glass with Thin Gold Border */}
          <button
            id="hero-secondary-cta"
            onClick={scrollToServices}
            className="w-full sm:w-auto relative group px-8 py-4 rounded-lg bg-[#111115]/80 text-[#f5ecd8] border border-[#c5a059]/40 hover:border-[#c5a059] hover:bg-[#16161c] hover:text-white font-serif-display font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 shadow-lg"
          >
            <span>EXPLORE SERVICES</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#c5a059] group-hover:translate-y-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* 4. Luxury Hero Information Bar (Minimalist Line Icons & Divided Columns) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85 }}
          className="mt-16 pt-8 border-t border-zinc-800/70 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl w-full"
        >
          {/* Card 1: Hours */}
          <div className="flex items-center sm:justify-center gap-3.5 p-3 rounded-lg bg-[#121216]/50 border border-zinc-800/60 backdrop-blur-sm group hover:border-[#c5a059]/40 transition-colors">
            <div className="w-9 h-9 rounded-full bg-[#181820] border border-[#c5a059]/30 flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-[#c5a059]" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-mono tracking-widest text-[#c5a059] uppercase block font-semibold">
                OPEN DAILY
              </span>
              <span className="text-xs font-serif-display text-zinc-200 tracking-wider font-medium">
                {SALON_INFO.hours}
              </span>
            </div>
          </div>

          {/* Card 2: Address */}
          <a
            href={SALON_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center sm:justify-center gap-3.5 p-3 rounded-lg bg-[#121216]/50 border border-zinc-800/60 backdrop-blur-sm group hover:border-[#c5a059]/40 transition-colors text-left"
          >
            <div className="w-9 h-9 rounded-full bg-[#181820] border border-[#c5a059]/30 flex items-center justify-center flex-shrink-0 group-hover:border-[#c5a059] transition-colors">
              <MapPin className="w-4 h-4 text-[#c5a059]" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#c5a059] uppercase block font-semibold">
                2242 HEMPSTEAD TPKE
              </span>
              <span className="text-xs font-serif-display text-zinc-200 tracking-wider font-medium">
                East Meadow, NY 11554
              </span>
            </div>
          </a>

          {/* Card 3: Phone */}
          <a
            href={`tel:${SALON_INFO.phoneRaw}`}
            className="flex items-center sm:justify-center gap-3.5 p-3 rounded-lg bg-[#121216]/50 border border-zinc-800/60 backdrop-blur-sm group hover:border-[#c5a059]/40 transition-colors text-left"
          >
            <div className="w-9 h-9 rounded-full bg-[#181820] border border-[#c5a059]/30 flex items-center justify-center flex-shrink-0 group-hover:border-[#c5a059] transition-colors">
              <Phone className="w-4 h-4 text-[#c5a059]" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#c5a059] uppercase block font-semibold">
                CALL US DIRECT
              </span>
              <span className="text-xs font-serif-display text-zinc-200 tracking-wider font-medium">
                {SALON_INFO.phone}
              </span>
            </div>
          </a>

          {/* Card 4: Instagram */}
          <a
            href={SALON_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center sm:justify-center gap-3.5 p-3 rounded-lg bg-[#121216]/50 border border-zinc-800/60 backdrop-blur-sm group hover:border-[#c5a059]/40 transition-colors text-left"
          >
            <div className="w-9 h-9 rounded-full bg-[#181820] border border-[#c5a059]/30 flex items-center justify-center flex-shrink-0 group-hover:border-[#c5a059] transition-colors">
              <Instagram className="w-4 h-4 text-[#c5a059]" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#c5a059] uppercase block font-semibold">
                INSTAGRAM
              </span>
              <span className="text-xs font-serif-display text-zinc-200 tracking-wider font-medium">
                {SALON_INFO.instagram}
              </span>
            </div>
          </a>
        </motion.div>

        {/* 5. Minimalist Refined Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          onClick={scrollToExperience}
          className="mt-14 flex flex-col items-center gap-2.5 cursor-pointer group"
        >
          <span className="text-[9px] tracking-[0.35em] font-serif-display uppercase text-zinc-400 group-hover:text-[#c5a059] transition-colors">
            SCROLL TO ENTER
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#c5a059] via-[#c5a059]/60 to-transparent relative overflow-hidden">
            <motion.div
              animate={{ y: [0, 32, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-3 bg-white"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
