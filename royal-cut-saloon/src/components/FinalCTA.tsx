import React from 'react';
import { motion } from 'motion/react';
import { Emblem3DCanvas } from './3d/Emblem3DCanvas';
import { Calendar, Phone, Sparkles } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface FinalCTAProps {
  onOpenBooking: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenBooking }) => {
  return (
    <section
      id="final-cta"
      className="relative w-full py-28 md:py-36 bg-[#070709] text-white border-t border-zinc-900 overflow-hidden text-center"
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#c5a059]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Subtle 3D Floating Metallic Emblem */}
        <Emblem3DCanvas />

        {/* Small Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-xs font-serif-display tracking-[0.35em] text-[#c5a059] uppercase font-bold mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>LOOK GOOD. FEEL ROYAL.</span>
          <Sparkles className="w-3.5 h-3.5" />
        </motion.div>

        {/* Large Cinematic Typography */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif-display text-3xl sm:text-5xl md:text-6xl font-black tracking-[0.06em] text-[#f4ecd8] uppercase leading-tight max-w-3xl"
        >
          YOUR NEXT
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f4ecd8] via-[#deb86a] to-[#c5a059]">
            SIGNATURE LOOK
          </span>
          <br />
          STARTS HERE.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-xl text-sm sm:text-base text-zinc-300 font-sans-luxury"
        >
          Step into our East Meadow sanctuary. Precision shears, 24K rituals, and master craftsmanship waiting for you daily from 9:00 AM to 10:00 PM.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            id="final-book-btn"
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-9 py-4 rounded-md bg-[#c5a059] text-black font-serif-display font-bold text-xs sm:text-sm tracking-[0.2em] uppercase shadow-2xl hover:bg-[#deb86a] hover:shadow-[#c5a059]/30 transition-all transform active:scale-95 flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>BOOK YOUR EXPERIENCE</span>
          </button>

          <a
            href={`tel:${SALON_INFO.phoneRaw}`}
            id="final-call-btn"
            className="w-full sm:w-auto px-8 py-4 rounded-md bg-[#14141a] text-zinc-200 border border-zinc-700 hover:border-[#c5a059] hover:text-[#f4ecd8] font-serif-display font-medium text-xs sm:text-sm tracking-[0.2em] uppercase backdrop-blur-md transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-[#c5a059]" />
            <span>CALL {SALON_INFO.phone}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
