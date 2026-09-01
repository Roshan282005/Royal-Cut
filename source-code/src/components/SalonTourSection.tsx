import React from 'react';
import { Salon3DVisualization } from './3d/Salon3DVisualization';
import { Sparkles, MapPin, Coffee, Shield, Armchair, Flame } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export const SalonTourSection: React.FC = () => {
  const highlights = [
    {
      icon: Armchair,
      title: 'Custom Belmont Leather Chairs',
      desc: 'Ergonomically tuned hydraulic chairs offering full recline for hot towel rituals and facial therapy.',
    },
    {
      icon: Flame,
      title: 'Aromatherapy Steam Rituals',
      desc: 'Eucalyptus essential oil vapor stations and organic botanical pre-shave treatments.',
    },
    {
      icon: Coffee,
      title: 'Executive Lounge & Spirits',
      desc: 'Complimentary single-origin espresso, craft beverages, and private high-speed business WiFi.',
    },
    {
      icon: Shield,
      title: 'Hospital-Grade Sanitization',
      desc: 'UV-C sterilizers and single-use surgical grade razor blades for absolute hygiene confidence.',
    },
  ];

  return (
    <section
      id="salon-tour"
      className="relative w-full py-28 bg-[#08080a] text-white border-t border-zinc-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-serif-display tracking-[0.3em] text-[#c5a059] uppercase font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERIOR ARCHITECTURE</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#f4ecd8] uppercase">
            STEP INTO ROYAL
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-sans-luxury">
            Designed as an executive retreat. Black polished marble, warm architectural brass, and secluded stations built for unmatched comfort.
          </p>
        </div>

        {/* 3D Interactive Salon Visualization */}
        <div className="mb-14">
          <Salon3DVisualization />
        </div>

        {/* Facility Highlights Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((h, idx) => {
            const Icon = h.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#121216]/90 border border-zinc-800/80 hover:border-[#c5a059]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#1a1a22] border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif-display text-base font-bold text-white uppercase tracking-wider mb-2">
                  {h.title}
                </h3>
                <p className="text-xs text-zinc-400 font-sans-luxury leading-relaxed">
                  {h.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
