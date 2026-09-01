import React from 'react';
import { Instagram, Phone, MapPin, Clock, ArrowUp } from 'lucide-react';
import { RoyalCutCrest } from './RoyalCutCrest';
import { SALON_INFO } from '../data/salonData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: 'Packages', href: '#packages' },
    { label: 'Masters', href: '#masters' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Membership', href: '#membership' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative bg-[#050507] text-white border-t border-zinc-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-zinc-900">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <RoyalCutCrest className="w-9 h-9 drop-shadow-[0_2px_8px_rgba(197,160,89,0.3)]" />
              <div className="flex flex-col">
                <span className="font-serif-display text-xl font-bold tracking-[0.2em] text-[#f4ecd8] leading-none">
                  {SALON_INFO.name}
                </span>
                <span className="text-[9px] tracking-[0.28em] text-[#c5a059] font-medium mt-1 uppercase">
                  SALOON • NY
                </span>
              </div>
            </div>

            <p className="text-xs font-serif-display tracking-[0.25em] text-[#c5a059] font-bold uppercase">
              {SALON_INFO.tagline}
            </p>

            <p className="text-xs text-zinc-400 font-sans-luxury leading-relaxed">
              East Meadow's premier luxury salon dedicated to precision haircuts, beard sculpting, and restorative skincare.
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-serif-display text-xs font-bold uppercase tracking-[0.2em] text-[#c5a059] mb-4">
              DIRECTORY
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-sans-luxury">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-[#c5a059] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Schedule & Contact */}
          <div>
            <h4 className="font-serif-display text-xs font-bold uppercase tracking-[0.2em] text-[#c5a059] mb-4">
              EAST MEADOW FLAGSHIP
            </h4>
            <div className="space-y-3 text-xs text-zinc-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span>{SALON_INFO.address}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span>{SALON_INFO.hours}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <a href={`tel:${SALON_INFO.phoneRaw}`} className="text-zinc-300 hover:text-[#c5a059]">
                  {SALON_INFO.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Social & Back to top */}
          <div className="space-y-4">
            <h4 className="font-serif-display text-xs font-bold uppercase tracking-[0.2em] text-[#c5a059] mb-4">
              CONNECT
            </h4>
            <a
              href={SALON_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#121216] border border-zinc-800 text-xs text-zinc-300 hover:text-[#c5a059] hover:border-[#c5a059]/40 transition-colors"
            >
              <Instagram className="w-4 h-4 text-[#c5a059]" />
              <span>{SALON_INFO.instagram}</span>
            </a>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                id="footer-scroll-top-btn"
                className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-600 font-sans-luxury">
          <p>© {new Date().getFullYear()} Royal Cut Saloon. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Precision Grooming • Luxury Atmosphere</span>
            <span>East Meadow, NY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
