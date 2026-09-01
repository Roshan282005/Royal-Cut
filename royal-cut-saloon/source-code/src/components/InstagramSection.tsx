import React from 'react';
import { motion } from 'motion/react';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { SALON_PHOTOS } from '../data/serviceImages';

// Real shop photos, shown on a loop until the client connects a live Instagram feed.
const FEED_PHOTOS = [SALON_PHOTOS.interior01, SALON_PHOTOS.interior02, SALON_PHOTOS.menuBoard, SALON_PHOTOS.interior01];

export const InstagramSection: React.FC = () => {
  return (
    <section
      id="instagram"
      className="relative w-full py-28 bg-[#08080a] text-white border-t border-zinc-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-serif-display tracking-[0.3em] text-[#c5a059] uppercase font-bold mb-3">
              <Instagram className="w-3.5 h-3.5" />
              <span>SOCIAL COMMUNITY</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#f4ecd8] uppercase">
              FOLLOW THE ROYAL STANDARD
            </h2>
            <p className="font-mono text-sm sm:text-base text-[#c5a059] mt-2">
              {SALON_INFO.instagram}
            </p>
          </div>

          <a
            href={SALON_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="instagram-follow-btn"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-[#16161c] border border-zinc-700 hover:border-[#c5a059] text-zinc-100 font-serif-display font-bold text-xs tracking-widest uppercase transition-all shadow-lg hover:text-[#c5a059]"
          >
            <Instagram className="w-4 h-4 text-[#c5a059]" />
            <span>FOLLOW ON INSTAGRAM</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Social Feed Grid — real shop photos linking out to the live Instagram profile.
            Swap FEED_PHOTOS for an embedded feed later if the client wants live post syncing. */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {FEED_PHOTOS.map((photo, idx) => (
            <motion.a
              key={idx}
              href={SALON_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              id={`instagram-post-${idx}`}
              className="group relative aspect-square rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800/80 cursor-pointer"
            >
              <img
                src={photo}
                alt="Royal Cut Saloon on Instagram"
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4 text-center">
                <Instagram className="w-6 h-6 text-[#c5a059]" />
                <span className="text-[11px] text-[#c5a059] font-mono font-medium">
                  View on Instagram
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
