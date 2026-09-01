import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_DATA } from '../data/salonData';
import { GalleryItem } from '../types';
import { Camera, X, ZoomIn } from 'lucide-react';

const CATEGORIES = ['ALL', 'HAIR', 'FADE', 'BEARD', 'GROOMING', 'SALON', 'TRANSFORMATIONS'] as const;

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const filteredItems = GALLERY_DATA.filter(
    (item) => activeCategory === 'ALL' || item.category === activeCategory
  );

  return (
    <section
      id="gallery"
      className="relative w-full py-28 bg-[#08080a] text-white border-t border-zinc-900 overflow-hidden"
    >
      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#c5a059]/[0.025] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header for Main Portfolio */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-serif-display tracking-[0.3em] text-[#c5a059] uppercase font-bold mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>PORTFOLIO</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#f4ecd8] uppercase">
            THE ROYAL GALLERY
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-sans-luxury">
            Explore authentic transformations, crisp fade transitions, and the architectural ambiance of our East Meadow salon.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              id={`gallery-cat-${cat.toLowerCase()}`}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#c5a059] text-black shadow-lg'
                  : 'bg-[#141418] text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Editorial Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                id={`gallery-item-${item.id}`}
                onClick={() => setActiveLightboxItem(item)}
                className="group relative h-80 sm:h-96 rounded-xl overflow-hidden cursor-pointer border border-zinc-800/80 bg-[#141418]"
              >
                <img
                loading="lazy"
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Hover overlay details */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-1 rounded bg-black/70 border border-zinc-700 text-[10px] font-mono tracking-widest text-[#c5a059] uppercase backdrop-blur-md">
                      {item.category}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#c5a059]/20 border border-[#c5a059] flex items-center justify-center text-[#c5a059] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="font-serif-display text-lg font-bold text-white uppercase tracking-wider mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-300 font-sans-luxury opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxItem(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={() => setActiveLightboxItem(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-zinc-900 border border-zinc-700 text-white hover:text-[#c5a059] transition-colors z-10"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full bg-[#121216] rounded-xl overflow-hidden border border-zinc-800 flex flex-col md:flex-row shadow-2xl"
            >
              <div className="md:w-3/5 h-[350px] md:h-[520px] bg-black">
                <img
                loading="lazy"
                  src={activeLightboxItem.imageUrl}
                  alt={activeLightboxItem.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono tracking-widest text-[#c5a059] uppercase block mb-2 font-bold">
                    {activeLightboxItem.category}
                  </span>
                  <h3 className="font-serif-display text-2xl font-bold text-white uppercase mb-3">
                    {activeLightboxItem.title}
                  </h3>
                  <p className="text-sm text-zinc-300 font-sans-luxury leading-relaxed mb-6">
                    {activeLightboxItem.caption}
                  </p>
                </div>

                <div className="pt-6 border-t border-zinc-800">
                  <span className="text-[11px] text-zinc-500 uppercase tracking-widest font-mono block mb-2">
                    Service Executed At:
                  </span>
                  <p className="text-xs text-zinc-300 font-medium">
                    Royal Cut Saloon • East Meadow, NY
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
