import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Star, ArrowRight, Scissors, Clock, Award, ShieldCheck } from 'lucide-react';
import { MASTERS_DATA } from '../data/salonData';
import { MasterBarber } from '../types';

interface MastersSectionProps {
  onBookWithMaster: (master: MasterBarber) => void;
}

interface EditorialMasterCardProps {
  master: MasterBarber;
  index: number;
  onBookWithMaster: (master: MasterBarber) => void;
}

const EditorialMasterCard: React.FC<EditorialMasterCardProps> = ({ master, index, onBookWithMaster }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  // Handle subtle 3D mouse tilt clamped to max 2.5 degrees
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
      opacity: 0.12,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  // Format signature name
  const signatureName = master.name.replace(/"[^"]*"\s*/, '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.18, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="perspective-1000 w-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        id={`master-card-${master.id}`}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.55s ease, border-color 0.5s ease',
        }}
        className="group relative flex flex-col justify-between rounded-xl overflow-hidden bg-[#0c0c10] border border-[#c5a059]/20 hover:border-[#c5a059]/60 transition-all duration-700 shadow-2xl hover:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_0_rgba(197,160,89,0.1)] hover:-translate-y-1.5"
      >
        {/* Subtle Dynamic Metallic Glare Layer */}
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(212, 175, 101, ${glarePos.opacity}) 0%, transparent 60%)`,
          }}
        />

        {/* Fine Material Noise / Surface Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/30 via-transparent to-black/40 pointer-events-none z-10" />

        {/* TOP: PORTRAIT PHOTOGRAPHY (approx 50-55% visual height) */}
        <div className="relative w-full h-[360px] sm:h-[400px] overflow-hidden bg-[#070709]">
          <img
            src={master.avatar}
            alt={`${master.name} - Master Barber & Stylist`}
            className="w-full h-full object-cover object-top filter contrast-[1.04] brightness-[1.02] group-hover:scale-[1.025] transition-transform duration-700 ease-out"
          />

          {/* Smooth Bottom Fade to merge seamlessly with content */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0c0c10] via-[#0c0c10]/85 to-transparent pointer-events-none" />

          {/* Top Left: Editorial Experience Badge */}
          <div className="absolute top-4 left-4 z-20">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-black/85 border border-[#c5a059]/35 backdrop-blur-md shadow-lg">
              <Clock className="w-3 h-3 text-[#c5a059]" />
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#ede5d4] uppercase font-semibold">
                {master.experience.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Top Right: Refined Rating Badge */}
          <div className="absolute top-4 right-4 z-20">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-black/85 border border-[#c5a059]/35 backdrop-blur-md shadow-lg">
              <Star className="w-3 h-3 fill-[#c5a059] text-[#c5a059]" />
              <span className="text-[11px] font-serif-display font-bold text-[#f5f0e6] tracking-wider">
                {master.rating.toFixed(2)}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono tracking-widest">
                • {master.reviewCount} REVIEWS
              </span>
            </div>
          </div>

          {/* Subtle Master Index Number (Architectural luxury touch) */}
          <div className="absolute bottom-3 right-4 z-20 select-none pointer-events-none">
            <span className="text-3xl font-serif-didot font-extralight text-[#c5a059]/20 tracking-tighter">
              0{index + 1}
            </span>
          </div>
        </div>

        {/* BOTTOM: EDITORIAL CONTENT AREA */}
        <div className="relative z-20 p-6 sm:p-7 flex-1 flex flex-col justify-between -mt-6">
          <div className="space-y-4">
            {/* Master Role */}
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
              <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-[#c5a059] uppercase font-semibold">
                {master.role}
              </span>
            </div>

            {/* Master Name */}
            <h3 className="font-serif-didot text-2xl sm:text-[28px] font-bold text-[#f7f2e7] tracking-tight leading-tight uppercase group-hover:text-white transition-colors duration-300">
              {master.name}
            </h3>

            {/* Signature Specialty Container with Left Gold Bar */}
            <div className="relative pl-3.5 py-1 border-l-2 border-[#c5a059]/70 bg-gradient-to-r from-[#c5a059]/[0.06] to-transparent rounded-r pr-2 transition-all duration-500 group-hover:border-[#c5a059] group-hover:from-[#c5a059]/[0.1]">
              <span className="block text-[9.5px] font-mono uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-1">
                SIGNATURE SPECIALTY
              </span>
              <p className="text-xs sm:text-[13px] text-[#ede5d4] font-medium leading-snug">
                {master.specialty}
              </p>
            </div>

            {/* Master Biography */}
            <p className="text-xs sm:text-[13px] text-zinc-400 font-sans-luxury leading-relaxed pt-1">
              {master.bio}
            </p>
          </div>

          {/* FOOTER: BESPOKE SIGNATURE & ACTION */}
          <div className="mt-7 pt-5 border-t border-zinc-800/80 flex items-center justify-between gap-4">
            {/* Elegant Bespoke Calligraphic Signature */}
            <div className="flex flex-col">
              <span className="text-[9px] font-mono tracking-[0.2em] text-zinc-500 uppercase">
                AUTHENTICATED
              </span>
              <span className="font-signature text-2xl sm:text-3xl text-[#d4af65] tracking-wide transform -rotate-1 select-none pointer-events-none drop-shadow-[0_2px_8px_rgba(197,160,89,0.2)]">
                {signatureName}
              </span>
            </div>

            {/* Luxury Text CTA with Animated Underline */}
            <button
              id={`book-with-master-${master.id}`}
              onClick={() => onBookWithMaster(master)}
              className="group/btn relative py-2 pl-2 text-right focus:outline-none"
            >
              <div className="inline-flex items-center gap-1.5 text-xs font-serif-display font-bold text-[#c5a059] tracking-[0.15em] uppercase group-hover/btn:text-[#deb86a] transition-colors duration-300">
                <span>BOOK WITH MASTER</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1.5 transition-transform duration-300" />
              </div>
              <span className="block h-[1px] w-0 group-hover/btn:w-full bg-gradient-to-r from-[#c5a059] to-[#deb86a] transition-all duration-300 mt-0.5 ml-auto" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const MastersSection: React.FC<MastersSectionProps> = ({ onBookWithMaster }) => {
  return (
    <section
      id="masters"
      className="relative w-full py-32 sm:py-36 bg-[#070709] text-white border-t border-zinc-900/80 overflow-hidden"
    >
      {/* BACKGROUND DEPTH & ATMOSPHERE */}
      {/* Huge subtle architectural watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span className="text-[14vw] font-serif-display font-black tracking-widest text-white/[0.015] uppercase transform -translate-y-8">
          MASTERS
        </span>
      </div>

      {/* Atmospheric Radial Ambient Gold Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#c5a059]/[0.025] blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute -bottom-24 left-1/4 w-[500px] h-[350px] bg-[#c5a059]/[0.02] blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Subtle Marble / Wood Grain Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none z-0 opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION INTRO / EDITORIAL HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121216] border border-[#c5a059]/30 text-[10.5px] font-mono tracking-[0.3em] text-[#c5a059] uppercase font-semibold mb-5 shadow-sm"
          >
            <Scissors className="w-3 h-3 text-[#c5a059]" />
            <span>THE HANDS BEHIND THE ROYAL STANDARD</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif-didot text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#f5f0e6] uppercase leading-[1.08]"
          >
            CRAFTED BY <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#edd9b2] via-[#c5a059] to-[#d8b467]">
              MASTERS OF THE CHAIR.
            </span>
          </motion.h2>

          {/* Decorative Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mx-auto my-6"
          />

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-sm sm:text-base text-zinc-300 font-sans-luxury max-w-2xl mx-auto leading-relaxed"
          >
            Precision, experience and an uncompromising eye for detail — every Royal Cut experience is shaped by a master.
          </motion.p>
        </div>

        {/* EDITORIAL MASTER BARBERS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 items-stretch">
          {MASTERS_DATA.map((master, idx) => (
            <EditorialMasterCard
              key={master.id}
              master={master}
              index={idx}
              onBookWithMaster={onBookWithMaster}
            />
          ))}
        </div>

        {/* SUBTLE BRAND FOOTER NOTE */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-[11px] font-mono tracking-[0.25em] text-zinc-500 uppercase flex items-center justify-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>ALL APPOINTMENTS GUARANTEED WITH YOUR CHOSEN MASTER BARBER</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
