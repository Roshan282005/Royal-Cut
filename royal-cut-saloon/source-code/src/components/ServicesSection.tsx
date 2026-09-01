import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Scissors,
  Sparkles,
  Droplets,
  Crown,
  Search,
  Clock,
  ArrowRight,
  Shield,
  Palette,
  Flame,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';
import { SERVICES_DATA } from '../data/salonData';
import { SALON_PHOTOS } from '../data/serviceImages';
import { ServiceItem } from '../types';
import { Services3DCanvas } from './3d/Services3DCanvas';

// Used whenever a service is missing its own photo — keeps a real shop image instead of a stock placeholder
const FALLBACK_SERVICE_IMAGE = SALON_PHOTOS.menuBoard;

interface ServicesSectionProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onBookService: (service: ServiceItem) => void;
}

interface CategoryDef {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
}

const CATEGORY_TABS: CategoryDef[] = [
  { id: 'ALL', label: 'ALL SERVICES', icon: SlidersHorizontal },
  { id: 'HAIRCUTS', label: 'HAIRCUTS', icon: Scissors },
  { id: 'BEARD SERVICES', label: 'BEARD SERVICES', icon: Shield },
  { id: 'FACE CLEANING', label: 'FACE CLEANING', icon: Sparkles },
  { id: 'FACIALS', label: 'FACIALS', icon: Crown },
  { id: 'HAIR SPA', label: 'HAIR SPA', icon: Droplets },
  { id: 'HAIR TREATMENTS', label: 'HAIR TREATMENTS', icon: Flame },
  { id: 'COLOR SERVICES', label: 'COLOR SERVICES', icon: Palette },
  { id: 'ADD-ON SERVICES', label: 'ADD-ON SERVICES', icon: Sparkles },
];

// Safe image component with graceful fallback
const ServiceCardImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className = '' }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Fallback to a real shop photo if a service image link ever fails
  const fallbackUrl = FALLBACK_SERVICE_IMAGE;

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackUrl);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      referrerPolicy="no-referrer"
      loading="lazy"
      className={className}
    />
  );
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  selectedCategory,
  onSelectCategory,
  onBookService,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Normalize incoming category names (e.g. from ExperienceSection or legacy triggers)
  const normalizedCategory = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'ALL') return 'ALL';
    if (selectedCategory === 'BEARD' || selectedCategory === 'BEARD SERVICES') return 'BEARD SERVICES';
    if (selectedCategory === 'FACE' || selectedCategory === 'FACE CLEANING') return 'FACE CLEANING';
    if (selectedCategory === 'FACIALS') return 'FACIALS';
    if (selectedCategory === 'HAIR SPA') return 'HAIR SPA';
    if (selectedCategory === 'HAIR TREATMENTS') return 'HAIR TREATMENTS';
    if (selectedCategory === 'SPA & TREATMENT') return 'HAIR SPA';
    if (selectedCategory === 'COLOR' || selectedCategory === 'COLOR SERVICES') return 'COLOR SERVICES';
    if (selectedCategory === 'ADD-ONS' || selectedCategory === 'ADD-ON SERVICES') return 'ADD-ON SERVICES';
    return selectedCategory;
  }, [selectedCategory]);

  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((service) => {
      let matchesCat = false;
      if (normalizedCategory === 'ALL') {
        matchesCat = true;
      } else if (service.category === normalizedCategory) {
        matchesCat = true;
      }

      const matchesQuery =
        searchQuery.trim() === '' ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (service.categoryLabel && service.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCat && matchesQuery;
    });
  }, [normalizedCategory, searchQuery]);

  const babyService = useMemo(
    () => SERVICES_DATA.find((s) => s.id === 'hc-baby'),
    []
  );

  return (
    <section
      id="services"
      className="relative w-full py-32 bg-[#070709] text-white overflow-hidden border-t border-zinc-900"
    >
      {/* Background Subtle Gradient & Grain Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#c5a059]/10 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#c5a059]/5 rounded-full blur-3xl" />
      </div>

      {/* Giant Subtle Background Watermark Typography */}
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 select-none pointer-events-none z-0 text-center font-serif-display font-black text-[13vw] uppercase tracking-[0.25em] text-white/[0.02] whitespace-nowrap leading-none"
        aria-hidden="true"
      >
        SERVICES
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ======================================================== */}
        {/* 1. SERVICES HERO: EDITORIAL HEADER                       */}
        {/* ======================================================== */}
        <div className="relative mb-16 text-center max-w-4xl mx-auto">
          {/* Small Gold Crown Emblem Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16161c]/80 border border-[#c5a059]/30 text-[#c5a059] text-[11px] font-serif-display tracking-[0.3em] font-semibold uppercase mb-5 backdrop-blur-md shadow-lg shadow-black/40"
          >
            <Crown className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>OUR SERVICES</span>
          </motion.div>

          {/* Large Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#f4ecd8] uppercase leading-[1.05] mb-5"
          >
            CRAFTED FOR
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f4ecd8] via-[#e2c17c] to-[#c5a059]">
              GENTLEMEN
            </span>
          </motion.h2>

          {/* Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-sm sm:text-base font-serif-editorial italic text-[#c5a059] mb-2 tracking-wide">
              Precision. Style. Confidence.
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans-luxury leading-relaxed">
              Explore our premium grooming services, designed to keep you looking and feeling royal. Every appointment includes a dedicated master consultation.
            </p>
          </motion.div>

          {/* Thin Animated Gold Line */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#c5a059]/60 to-[#c5a059]" />
            <div className="w-2 h-2 rotate-45 border border-[#c5a059] bg-[#070709]" />
            <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-l from-transparent via-[#c5a059]/60 to-[#c5a059]" />
          </div>

          {/* 3D Craftsmanship Floating Tools Accent */}
          <div className="mt-2 mb -mb-6">
            <Services3DCanvas />
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. CATEGORY NAVIGATION & SEARCH BAR                      */}
        {/* ======================================================== */}
        <div className="mb-12 space-y-6">
          {/* Top Bar: Search Input & Quick Experience Details */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Luxury Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c5a059]/70" />
              <input
                type="text"
                id="service-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search haircuts, beard shaves, 24K facials..."
                className="w-full pl-10 pr-10 py-3 rounded-full bg-[#111115]/90 border border-zinc-800/80 text-xs sm:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#c5a059]/70 focus:ring-1 focus:ring-[#c5a059]/40 transition-all shadow-inner backdrop-blur-md"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-300 font-mono"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Service Philosophy Indicators */}
            <div className="hidden lg:flex items-center gap-6 text-xs text-zinc-400 font-sans-luxury">
              <span className="flex items-center gap-2 text-zinc-300">
                <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>30–60 Min Master Sessions</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-zinc-700" />
              <span className="text-[#deb86a] font-serif-editorial italic text-sm">
                Walk-ins Welcome • Appointments Guaranteed
              </span>
            </div>
          </div>

          {/* Horizontal Category Selector Pills */}
          <div className="relative">
            <div className="flex items-center gap-2.5 overflow-x-auto pb-3 pt-1 no-scrollbar scroll-smooth">
              {CATEGORY_TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = normalizedCategory === tab.id;

                return (
                  <button
                    key={tab.id}
                    id={`service-cat-tab-${tab.id.toLowerCase().replace(/[\s&]+/g, '-')}`}
                    onClick={() => {
                      onSelectCategory(tab.id);
                    }}
                    className={`relative px-4 sm:px-5 py-2.5 rounded-full text-xs font-serif-display font-semibold tracking-wider whitespace-nowrap uppercase transition-all duration-300 flex items-center gap-2 group ${
                      isActive
                        ? 'text-black shadow-lg shadow-[#c5a059]/20'
                        : 'text-zinc-400 hover:text-zinc-200 bg-[#111115]/80 hover:bg-[#16161c] border border-zinc-800/80 hover:border-zinc-700'
                    }`}
                  >
                    {/* Active Sliding Indicator Background */}
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryIndicator"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#deb86a] via-[#c5a059] to-[#b38e45] z-0 shadow-md"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Icon & Label */}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Icon
                        className={`w-3.5 h-3.5 transition-colors ${
                          isActive ? 'text-black' : 'text-[#c5a059] group-hover:text-[#deb86a]'
                        }`}
                      />
                      <span>{tab.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. FEATURED SPOTLIGHT: BABY'S FIRST ROYAL CUT ($100)     */}
        {/* ======================================================== */}
        {(normalizedCategory === 'ALL' || normalizedCategory === 'HAIRCUTS') &&
          babyService &&
          searchQuery.trim() === '' && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-14 rounded-2xl bg-gradient-to-br from-[#181510] via-[#121217] to-[#0c0c10] border border-[#c5a059]/40 shadow-2xl relative overflow-hidden group"
            >
              {/* Subtle Ambient Light Shimmer */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#c5a059]/5 via-transparent to-transparent pointer-events-none" />

              {/* Gold Top Accent Line with light sweep */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10 p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                {/* Left Side: Photo with Gold Framing */}
                <div className="w-full lg:w-5/12 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-xl overflow-hidden border border-zinc-700/60 shadow-xl flex-shrink-0 bg-[#16161c]">
                  <ServiceCardImage
                    src={babyService.imageUrl ?? FALLBACK_SERVICE_IMAGE}
                    alt="Baby's First Royal Cut"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090c] via-transparent to-transparent opacity-70 pointer-events-none" />
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-black/80 backdrop-blur-md border border-[#c5a059]/30 text-[10px] font-mono tracking-widest text-[#c5a059] uppercase font-semibold">
                    MILESTONE CEREMONY
                  </div>
                </div>

                {/* Right Side: Editorial Information */}
                <div className="w-full lg:w-7/12 flex flex-col justify-between space-y-5">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/40 text-[#f5ebd7] text-[11px] font-serif-display tracking-widest font-bold uppercase mb-3">
                      <Crown className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>SIGNATURE FAMILY HERITAGE</span>
                    </div>

                    <h3 className="font-serif-display text-2xl sm:text-4xl font-bold text-white tracking-wide uppercase leading-tight mb-2">
                      BABY'S FIRST ROYAL CUT
                    </h3>
                    <p className="text-xs sm:text-sm font-serif-editorial italic text-[#c5a059] tracking-wider mb-3">
                      A FIRST CUT WORTH REMEMBERING.
                    </p>
                    <p className="text-xs sm:text-sm text-zinc-300 font-sans-luxury leading-relaxed">
                      A bespoke lifetime milestone ceremony designed with patient, ultra-gentle styling. Includes a commemorative Royal Certificate of Bravery, velvet keepsake pouch for the first curl, and a private station portrait session.
                    </p>
                  </div>

                  {/* Feature Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-zinc-300">
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-black/40 border border-zinc-800">
                      <CheckCircle2 className="w-4 h-4 text-[#c5a059] flex-shrink-0" />
                      <span className="text-[11px] font-medium">Framed Certificate</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-black/40 border border-zinc-800">
                      <CheckCircle2 className="w-4 h-4 text-[#c5a059] flex-shrink-0" />
                      <span className="text-[11px] font-medium">Keepsake Hair Lock</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-black/40 border border-zinc-800">
                      <CheckCircle2 className="w-4 h-4 text-[#c5a059] flex-shrink-0" />
                      <span className="text-[11px] font-medium">Dedicated Station</span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-zinc-800/80">
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 block">
                        Ceremony Experience
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif-display text-3xl sm:text-4xl font-bold text-[#c5a059]">
                          $100
                        </span>
                        <span className="text-xs text-zinc-500 font-sans-luxury">
                          / 45 min private session
                        </span>
                      </div>
                    </div>

                    <button
                      id="book-baby-cut-spotlight-btn"
                      onClick={() => onBookService(babyService)}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#deb86a] via-[#c5a059] to-[#b38e45] text-black font-serif-display font-bold text-xs tracking-widest uppercase hover:brightness-110 transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group/btn"
                    >
                      <span>RESERVE CEREMONY</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        {/* ======================================================== */}
        {/* 4. 3-COLUMN EDITORIAL SERVICE CARDS GRID (16:10)         */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          <AnimatePresence mode="popLayout">
            {filteredServices
              .filter((service) => {
                // If in ALL or HAIRCUTS without search, the baby cut is spotlighted above.
                if ((normalizedCategory === 'ALL' || normalizedCategory === 'HAIRCUTS') && searchQuery.trim() === '') {
                  return service.id !== 'hc-baby';
                }
                return true;
              })
              .map((service, index) => {
                const isHovered = hoveredCardId === service.id;

                return (
                  <motion.div
                    key={service.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    id={`service-card-${service.id}`}
                    onMouseEnter={() => setHoveredCardId(service.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    onClick={() => onBookService(service)}
                    className="group relative rounded-xl bg-[#111115]/95 border border-zinc-800/80 hover:border-[#c5a059]/50 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/70 flex flex-col justify-between overflow-hidden cursor-pointer backdrop-blur-md"
                  >
                    {/* Top Gold Sweep Highlight on Hover */}
                    <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

                    <div>
                      {/* Cinematic Service Photography (approx 45% card height) */}
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#16161c]">
                        <ServiceCardImage
                          src={service.imageUrl ?? FALLBACK_SERVICE_IMAGE}
                          alt={service.name}
                          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106 opacity-85 group-hover:opacity-100"
                        />
                        {/* Soft Gradient Overlay into card content */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111115] via-[#111115]/40 to-transparent pointer-events-none" />

                        {/* Top Category Badge */}
                        <div className="absolute top-3 left-3 z-10">
                          <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-zinc-800 text-[10px] font-mono tracking-widest text-[#c5a059] uppercase font-bold">
                            {service.categoryLabel || service.category}
                          </span>
                        </div>

                        {/* Duration Pill (Top Right) */}
                        <div className="absolute top-3 right-3 z-10">
                          <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-zinc-800 text-[10px] text-zinc-300 font-sans-luxury flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#c5a059]" />
                            {service.duration}
                          </span>
                        </div>
                      </div>

                      {/* Card Body Information */}
                      <div className="p-5 sm:p-6">
                        {/* Service Title & Price Header */}
                        <div className="flex items-start justify-between gap-3 mb-2.5">
                          <h4 className="font-serif-display text-lg sm:text-xl font-bold text-zinc-100 group-hover:text-[#f4ecd8] transition-colors leading-snug">
                            {service.name}
                          </h4>
                          <span className="font-serif-display text-xl sm:text-2xl font-bold text-[#c5a059] whitespace-nowrap tracking-tight">
                            ${service.price}
                          </span>
                        </div>

                        {/* Short Luxury Description */}
                        <p className="text-xs text-zinc-400 font-sans-luxury leading-relaxed line-clamp-2">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer: Refined BOOK NOW -> Interaction */}
                    <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-zinc-800/60 mt-auto flex items-center justify-between">
                      <span className="text-[11px] font-mono text-zinc-500 tracking-wider uppercase">
                        MASTER CRAFT
                      </span>

                      <button
                        id={`book-service-btn-${service.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onBookService(service);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-serif-display font-bold tracking-widest text-[#c5a059] group-hover:text-[#f4ecd8] transition-colors"
                      >
                        <span>BOOK NOW</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-20 bg-[#111115]/50 rounded-2xl border border-zinc-800 p-8 max-w-md mx-auto">
            <Search className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
            <h4 className="font-serif-display text-lg text-zinc-300 font-semibold mb-1">
              No Services Found
            </h4>
            <p className="text-xs text-zinc-500 font-sans-luxury mb-4">
              We couldn't find any services matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('ALL');
              }}
              className="px-4 py-2 rounded-full bg-[#1c1c22] border border-zinc-700 text-xs text-[#c5a059] font-serif-display tracking-wider uppercase hover:border-[#c5a059]"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Editorial Quote / Callout */}
        <div className="mt-16 text-center max-w-xl mx-auto border-t border-zinc-900 pt-10">
          <p className="text-xs sm:text-sm font-serif-editorial italic text-zinc-400">
            "Every cut is sculpted to your personal anatomy, bone structure, and hairline flow. Never rushed, always royal."
          </p>
          <span className="text-[10px] font-mono tracking-widest text-[#c5a059] uppercase block mt-2 font-bold">
            — THE ROYAL CUT MASTER CRAFTSMEN
          </span>
        </div>
      </div>
    </section>
  );
};
