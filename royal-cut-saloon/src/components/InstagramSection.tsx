import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Heart, MessageCircle, ArrowUpRight } from 'lucide-react';
import { SALON_INFO, INSTAGRAM_POSTS } from '../data/salonData';

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

        {/* Social Feed Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {INSTAGRAM_POSTS.map((post, idx) => (
            <motion.a
              key={post.id}
              href={SALON_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              id={`instagram-post-${post.id}`}
              className="group relative aspect-square rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800/80 cursor-pointer"
            >
              <img
                src={post.image}
                alt="Instagram Grooming Post"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4 text-center">
                <Instagram className="w-6 h-6 text-[#c5a059]" />
                <div className="flex items-center gap-4 text-xs font-mono text-zinc-200">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-[#c5a059] text-[#c5a059]" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 text-zinc-300" /> {post.comments}
                  </span>
                </div>
                <span className="text-[11px] text-[#c5a059] font-mono font-medium">
                  {post.tag}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
