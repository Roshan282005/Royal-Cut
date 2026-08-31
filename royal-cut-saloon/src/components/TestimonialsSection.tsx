import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/salonData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section
      id="testimonials"
      className="relative w-full py-28 bg-[#0a0a0d] text-white border-t border-zinc-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-serif-display tracking-[0.3em] text-[#c5a059] uppercase font-bold mb-3">
            <span>CLIENT PERSPECTIVES</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-[#f4ecd8] uppercase">
            THE ROYAL VERDICT
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-sans-luxury">
            Read authentic reviews from professionals, executives, and families who make Royal Cut their grooming sanctuary.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS_DATA.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-xl bg-[#121216]/90 border border-zinc-800/80 hover:border-[#c5a059]/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating stars & quote icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#c5a059] text-[#c5a059]" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-zinc-700" />
                </div>

                <p className="text-xs sm:text-sm text-zinc-200 font-sans-luxury leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800/70">
                <div className="flex items-center gap-1.5 mb-1">
                  <h4 className="font-serif-display text-sm font-bold text-white uppercase">
                    {t.clientName}
                  </h4>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059]" />
                </div>
                <p className="text-[11px] text-[#c5a059] font-medium mb-1">{t.role}</p>
                <span className="text-[10px] text-zinc-500 font-mono block">
                  Service: {t.service} • {t.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
