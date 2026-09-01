import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Membership3DCard } from './3d/Membership3DCard';
import { SALON_INFO } from '../data/salonData';

type MembershipTier = 'FOUNDER' | 'GOLD' | 'BLACK';

interface TierDetail {
  id: MembershipTier;
  name: string;
  badge: string;
  serial: string;
  tagline: string;
}

const TIERS: TierDetail[] = [
  {
    id: 'FOUNDER',
    name: 'FOUNDER VIP',
    badge: 'TIER 01 • INAUGURAL',
    serial: '001 / VIP',
    tagline: 'The ultimate founding credential for lifetime patrons.'
  },
  {
    id: 'GOLD',
    name: 'ROYAL GOLD',
    badge: 'TIER 02 • SIGNATURE',
    serial: '042 / GOLD',
    tagline: 'Signature priority access and monthly restoration rituals.'
  },
  {
    id: 'BLACK',
    name: 'OBSIDIAN BLACK',
    badge: 'TIER 03 • STEALTH',
    serial: '018 / OBSIDIAN',
    tagline: 'Understated stealth luxury for executive grooming cadence.'
  }
];

export const MembershipSection: React.FC = () => {
  const [activeTier, setActiveTier] = useState<MembershipTier>('FOUNDER');
  const [clientPhone, setClientPhone] = useState('');
  const [enrolled, setEnrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Verified authentic benefits from salon records
  const benefits = [
    {
      title: 'Priority Line & Private Station',
      detail: 'Direct priority booking with dedicated master barber station.'
    },
    {
      title: 'Scalp Acupressure & Hot Towels',
      detail: 'Complimentary aromatherapy hot towel & scalp revival with every cut.'
    },
    {
      title: 'Royal Espresso & Malt Lounge',
      detail: 'Access to the private salon refreshment bar and beverage lounge.'
    },
    {
      title: '15% Privilege on Products',
      detail: 'Privilege discount across all luxury Italian grooming and styling lines.'
    },
    {
      title: 'Private Styling Masterclasses',
      detail: 'Invitations to exclusive evening grooming and beard craft sessions.'
    },
    {
      title: '24-Hour Event Readiness',
      detail: 'Emergency priority styling accommodation for weddings and galas.'
    }
  ];

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientPhone.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setEnrolled(true);
    }, 450);
  };

  return (
    <section
      id="membership"
      className="relative w-full py-28 lg:py-36 bg-[#070709] text-[#f4ecd8] border-t border-zinc-900/90 overflow-hidden"
    >
      {/* Cinematic Luxury Salon Background with Soft Focus Ambient Practical Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Warm Amber Practical Overhead Glows */}
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-[#c5a059]/[0.04] rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -right-32 w-[600px] h-[600px] bg-[#8a682b]/[0.035] rounded-full blur-[160px]" />
        
        {/* Subtle Dark Woodgrain & Marble Texture Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_40%,transparent_20%,#070709_90%)]" />
        
        {/* Fine Architectural Grid Lines */}
        <div className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_right,#c5a059_1px,transparent_1px),linear-gradient(to_bottom,#c5a059_1px,transparent_1px)] bg-[size:5rem_5rem]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ================= LEFT COLUMN: 3D HERO MEMBERSHIP CARD ================= */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            {/* Minimal Luxury Tier Selector */}
            <div className="w-full max-w-md flex items-center justify-between p-1.5 rounded-full bg-[#111116]/90 border border-[#c5a059]/25 backdrop-blur-md mb-6 shadow-2xl">
              {TIERS.map((tier) => {
                const isActive = activeTier === tier.id;
                return (
                  <button
                    key={tier.id}
                    id={`membership-tier-btn-${tier.id.toLowerCase()}`}
                    onClick={() => setActiveTier(tier.id)}
                    className={`relative flex-1 py-2 px-3 rounded-full text-[11px] sm:text-xs font-serif-display font-medium tracking-[0.14em] uppercase transition-all duration-300 ${
                      isActive
                        ? 'text-[#0a0a0c] font-bold shadow-lg'
                        : 'text-[#9c8e76] hover:text-[#f4ecd8]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTierPill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#d6b26d] via-[#fae4b2] to-[#c5a059] shadow-[0_0_20px_rgba(197,160,89,0.35)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{tier.name}</span>
                  </button>
                );
              })}
            </div>

            {/* 3D Physical Metal Card Presentation */}
            <div className="w-full">
              <Membership3DCard
                activeTier={activeTier}
                onSelectTier={setActiveTier}
              />
            </div>

            {/* Selected Tier Editorial Subtext */}
            <div className="mt-4 text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTier}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-1"
                >
                  <p className="text-[10px] font-mono tracking-[0.25em] text-[#c5a059] uppercase font-semibold">
                    {TIERS.find((t) => t.id === activeTier)?.badge}
                  </p>
                  <p className="text-xs text-[#a09789] font-sans-luxury max-w-sm">
                    {TIERS.find((t) => t.id === activeTier)?.tagline}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: EDITORIAL COPY & PRIVILEGES ================= */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Custom SVG Crown Eyebrow */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2.5">
                <svg
                  className="w-4 h-4 text-[#c5a059]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V17H19V19Z" />
                </svg>
                <span className="text-xs font-serif-display tracking-[0.28em] text-[#c5a059] uppercase font-bold">
                  THE ROYAL CLUB
                </span>
                <span className="w-12 h-[1px] bg-gradient-to-r from-[#c5a059]/60 to-transparent" />
              </div>

              {/* High-Contrast Editorial Serif Headline */}
              <h2 className="font-serif-bodoni text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-[#faf6ee] uppercase leading-[1.12]">
                FOR GENTLEMEN<br />
                WHO DON'T<br />
                COMPROMISE ON<br />
                <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#fae4b2] via-[#deb86a] to-[#c5a059]">
                  THEIR APPEARANCE.
                </span>
              </h2>
            </div>

            {/* Editorial Body Description */}
            <p className="text-sm sm:text-base text-[#c8c2b5] font-sans-luxury leading-relaxed max-w-xl">
              The Royal Club is an exclusive private collective for discerning clients who demand flawless consistency, zero waiting time, and bespoke luxury treatment on every visit to East Meadow.
            </p>

            {/* Privileges in Two-Column Editorial Layout */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-center justify-between border-b border-[#c5a059]/20 pb-2">
                <span className="text-[11px] font-mono tracking-[0.2em] text-[#c5a059] uppercase font-bold">
                  VIP Collective Privileges
                </span>
                <span className="text-[10px] text-[#8e8576] font-mono uppercase">
                  Privilege Access
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-1">
                {benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    {/* Custom Gold Check-Circle SVG */}
                    <div className="mt-0.5 shrink-0 w-4 h-4 rounded-full border border-[#c5a059]/50 flex items-center justify-center bg-[#15151b]">
                      <svg
                        className="w-2.5 h-2.5 text-[#c5a059]"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.5 6.2L4.8 8.5L9.5 3.5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-serif-display font-semibold text-[#f4ecd8] tracking-wide">
                        {b.title}
                      </h4>
                      <p className="text-[11px] text-[#9c9384] font-sans-luxury leading-tight">
                        {b.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* VIP Concierge Phone Input & CTA */}
            <div className="pt-4 border-t border-zinc-800/90 space-y-3">
              {enrolled ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-lg bg-[#121216] border border-[#c5a059]/40 text-[#f5ebd7] text-xs space-y-1.5 shadow-xl"
                >
                  <div className="font-bold flex items-center gap-2 text-[#c5a059] font-serif-display tracking-wider">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    VIP INQUIRY RECEIVED • {TIERS.find((t) => t.id === activeTier)?.name}
                  </div>
                  <p className="text-[#b5ac9d] leading-relaxed">
                    Our Salon Concierge will contact <span className="text-[#f4ecd8] font-mono font-bold">{clientPhone}</span> with tier credential availability and private onboarding details.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleEnrollSubmit} className="flex flex-col sm:flex-row gap-3">
                  {/* Obsidian Glass Concierge Input */}
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#c5a059]/70">
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      id="membership-phone-input"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="Enter phone for VIP invitation..."
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-md bg-[#121216]/90 border border-[#c5a059]/30 text-xs text-[#faf6ee] placeholder-[#7a7265] focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]/40 transition-all font-sans-luxury"
                    />
                  </div>

                  {/* Champagne Gold Action Button */}
                  <button
                    type="submit"
                    id="join-royal-club-btn"
                    disabled={isSubmitting}
                    className="relative group px-6 py-3 rounded-md bg-gradient-to-r from-[#c5a059] via-[#deb86a] to-[#b38f48] text-[#0a0a0c] font-serif-display font-bold text-xs tracking-[0.16em] uppercase hover:brightness-110 active:scale-[0.99] transition-all whitespace-nowrap shadow-[0_4px_20px_rgba(197,160,89,0.25)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <svg
                      className="w-3.5 h-3.5 text-[#0a0a0c]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5Z" />
                    </svg>
                    <span>{isSubmitting ? 'PROCESSING...' : 'JOIN THE ROYAL CLUB'}</span>
                  </button>
                </form>
              )}

              {/* Sub-Footnote */}
              <div className="flex items-center justify-between text-[10px] text-[#787063] font-sans-luxury pt-1">
                <span>* Tier dues calculated upon consultation.</span>
                <span>Direct concierge line: <a href={`tel:${SALON_INFO.phone}`} className="text-[#c5a059] hover:underline font-mono">{SALON_INFO.phone}</a></span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
