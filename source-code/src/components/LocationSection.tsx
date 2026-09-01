import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Navigation, Instagram, Compass, ExternalLink } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export const LocationSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="relative w-full py-28 bg-[#0a0a0d] text-white border-t border-zinc-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Contact & Location Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-serif-display tracking-[0.3em] text-[#c5a059] uppercase font-bold">
              <Compass className="w-3.5 h-3.5" />
              <span>EAST MEADOW FLAGSHIP</span>
            </div>

            <h2 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#f4ecd8] uppercase leading-tight">
              FIND YOUR ROYAL STANDARD
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 font-sans-luxury leading-relaxed">
              Conveniently located on Hempstead Turnpike in East Meadow with dedicated private parking for all clients.
            </p>

            {/* Info Cards */}
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-[#141418] border border-zinc-800 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1e1e26] border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest block">
                    Address
                  </span>
                  <p className="text-sm font-semibold text-white">
                    {SALON_INFO.address}
                  </p>
                  <span className="text-xs text-zinc-400">East Meadow, Long Island, NY</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#141418] border border-zinc-800 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1e1e26] border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest block">
                    Operating Schedule
                  </span>
                  <p className="text-sm font-semibold text-white">
                    {SALON_INFO.hours}
                  </p>
                  <span className="text-xs text-emerald-400 font-mono">Open 7 Days A Week</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#141418] border border-zinc-800 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1e1e26] border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest block">
                    Direct Salon Line
                  </span>
                  <a
                    href={`tel:${SALON_INFO.phoneRaw}`}
                    className="text-sm font-semibold text-[#c5a059] hover:underline"
                  >
                    {SALON_INFO.phone}
                  </a>
                  <span className="text-xs text-zinc-400 block">Call or Text for inquiries</span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={SALON_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="location-directions-btn"
                className="flex-1 min-w-[140px] px-5 py-3 rounded-md bg-[#c5a059] text-black font-serif-display font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[#deb86a] transition-all shadow-lg"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>DIRECTIONS</span>
              </a>

              <a
                href={`tel:${SALON_INFO.phoneRaw}`}
                id="location-call-btn"
                className="flex-1 min-w-[140px] px-5 py-3 rounded-md bg-[#16161c] border border-zinc-700 hover:border-[#c5a059] text-white font-serif-display font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>CALL SALON</span>
              </a>

              <a
                href={SALON_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="location-instagram-btn"
                className="p-3 rounded-md bg-[#16161c] border border-zinc-700 hover:border-[#c5a059] text-zinc-300 hover:text-[#c5a059] transition-all flex items-center justify-center"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Dark Premium Styled Map Container */}
          <div className="lg:col-span-7">
            <div className="relative w-full h-[400px] sm:h-[480px] rounded-xl overflow-hidden border border-zinc-800 bg-[#121216] shadow-2xl">
              {/* Styled Dark Google Maps Embed */}
              <iframe
                title="Royal Cut Saloon Location Map"
                src="https://maps.google.com/maps?q=2242+Hempstead+Tpke,+East+Meadow,+NY+11554&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 grayscale invert contrast-125 opacity-80 hover:opacity-100 transition-opacity duration-300"
                loading="lazy"
                allowFullScreen
              />

              {/* Floating Pin Card */}
              <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-xs p-4 rounded-lg bg-[#09090c]/95 border border-[#c5a059]/40 backdrop-blur-md shadow-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c5a059] animate-ping" />
                  <h4 className="font-serif-display text-sm font-bold text-white uppercase">
                    ROYAL CUT SALOON
                  </h4>
                </div>
                <p className="text-xs text-zinc-300">
                  2242 Hempstead Tpke, East Meadow, NY
                </p>
                <a
                  href={SALON_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-[#c5a059] font-mono mt-2 font-bold hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
