import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Scissors, Sparkles, Droplets, Shield } from 'lucide-react';

interface ExperienceSectionProps {
  onSelectCategory: (category: string) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onSelectCategory }) => {
  const [activeHover, setActiveHover] = useState<number | null>(null);

  const experiences = [
    {
      num: '01',
      title: 'HAIR',
      category: 'HAIRCUTS',
      icon: Scissors,
      tagline: 'Precision cuts, fades and signature styling.',
      description: 'Engineered for distinction. Whether a surgical skin fade, scissor-sculpted crop, or classic executive taper, we calibrate every line to your lifestyle.',
      image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1000&q=80',
    },
    {
      num: '02',
      title: 'BEARD',
      category: 'BEARD SERVICES',
      icon: Shield,
      tagline: 'Defined shapes, clean lines and professional finishing.',
      description: 'Master razor sculpting, hot towel aromatherapy shaves, conditioning botanical beard balms, and natural pigment blending.',
      image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1000&q=80',
    },
    {
      num: '03',
      title: 'SKIN',
      category: 'FACIALS',
      icon: Sparkles,
      tagline: 'Deep cleaning, facials and premium skincare.',
      description: 'Executive dermatological treatments including 24K Gold renewal masks, Diamond crystal polishes, pore detoxifications, and cryo globe therapy.',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80',
    },
    {
      num: '04',
      title: 'SPA',
      category: 'HAIR SPA',
      icon: Droplets,
      tagline: 'Relaxation, restoration and advanced hair treatments.',
      description: 'Complete scalp revitalizing rituals, organic keratin bond reconstruction, acupressure neck & head massage, and ionic steam infusion.',
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1000&q=80',
    },
  ];

  return (
    <section
      id="experience"
      className="relative w-full py-28 bg-[#08080a] text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-serif-display tracking-[0.3em] text-[#c5a059] uppercase font-semibold mb-3">
              <span>FOUR PILLARS OF LUXURY</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#f4ecd8] uppercase">
              THE ROYAL EXPERIENCE
            </h2>
          </div>
          <p className="max-w-md text-sm text-zinc-400 font-sans-luxury">
            Each discipline at Royal Cut is executed with surgical attention, pharmaceutical-grade formulas, and true bespoke comfort.
          </p>
        </div>

        {/* Cinematic Grid of 4 Experiences */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            const isHovered = activeHover === index;

            return (
              <motion.div
                key={exp.num}
                id={`experience-card-${exp.title.toLowerCase()}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setActiveHover(index)}
                onMouseLeave={() => setActiveHover(null)}
                onClick={() => {
                  onSelectCategory(exp.category);
                  const el = document.querySelector('#services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative h-[420px] rounded-xl overflow-hidden cursor-pointer border border-zinc-800/80 bg-[#121216] transition-all duration-500 hover:border-[#c5a059]/60 hover:shadow-2xl hover:shadow-[#c5a059]/10 flex flex-col justify-between p-6"
              >
                {/* Background Image with Zoom & Dark Gradient */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 opacity-30 group-hover:opacity-45"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090c] via-[#09090c]/70 to-[#09090c]/40" />
                </div>

                {/* Top Info */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-mono text-xs tracking-widest text-[#c5a059] font-bold">
                    {exp.num}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-[#18181c]/80 border border-zinc-700/80 flex items-center justify-center text-[#c5a059] group-hover:bg-[#c5a059] group-hover:text-black transition-all">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 mt-auto">
                  <h3 className="font-serif-display text-2xl font-bold text-white tracking-widest uppercase mb-2 group-hover:text-[#f4ecd8] transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xs font-serif-editorial text-[#c5a059] italic text-base mb-3 leading-snug">
                    {exp.tagline}
                  </p>
                  <p className="text-xs text-zinc-400 font-light line-clamp-3 leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-serif-display font-semibold tracking-widest text-[#c5a059] group-hover:translate-x-1.5 transition-transform duration-300">
                    <span>VIEW SERVICES</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Subtle Hover Border Accent */}
                <div
                  className={`absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
