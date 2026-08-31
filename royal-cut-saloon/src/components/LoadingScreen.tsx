import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RoyalCutCrest } from './RoyalCutCrest';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 600);
    }, 1400);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070709] text-white select-none"
        >
          <div className="flex flex-col items-center text-center px-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <RoyalCutCrest className="w-14 h-14 drop-shadow-[0_4px_15px_rgba(197,160,89,0.4)]" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif-display text-3xl sm:text-4xl tracking-[0.25em] text-[#f4ecd8] font-bold uppercase"
            >
              ROYAL CUT
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-2 text-[11px] sm:text-xs tracking-[0.35em] text-[#c5a059] font-medium uppercase"
            >
              SALOON • NEW YORK
            </motion.p>

            {/* Subtle Gold Loading Bar */}
            <div className="w-48 h-[2px] bg-zinc-900 rounded-full mt-8 overflow-hidden relative">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                className="w-full h-full bg-gradient-to-r from-transparent via-[#c5a059] to-transparent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

