import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';

/**
 * TEMPORARY PROMO BANNER — Back to School
 * -----------------------------------------------------------------------
 * This is intentionally its own isolated component (not baked into the
 * homepage layout) so it's a one-line remove in App.tsx when the promo ends:
 *   just delete the <BackToSchoolBanner /> line and its import.
 *
 * To change the copy/dates for a *different* future promo, edit the
 * constants below — no other file needs to change.
 */
const PROMO_TEXT = 'BACK TO SCHOOL SPECIAL';
const PROMO_DETAIL = "Fresh cut, fresh year — ask in-store for this month's student pricing.";
const DISMISS_KEY = 'rcs-back-to-school-banner-dismissed';

interface BackToSchoolBannerProps {
  onOpenBooking: () => void;
}

export const BackToSchoolBanner: React.FC<BackToSchoolBannerProps> = ({ onOpenBooking }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = typeof window !== 'undefined' && window.localStorage.getItem(DISMISS_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      // localStorage unavailable — banner just won't persist dismissal, harmless
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="relative z-[60] w-full overflow-hidden bg-gradient-to-r from-[#b38e45] via-[#c5a059] to-[#deb86a] text-black"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onOpenBooking}
              className="flex-1 flex items-center justify-center gap-2 sm:gap-3 text-left group"
            >
              <Sparkles className="w-4 h-4 flex-shrink-0" />
              <span className="text-[11px] sm:text-xs font-serif-display font-bold tracking-[0.15em] uppercase">
                {PROMO_TEXT}
              </span>
              <span className="hidden sm:inline text-[11px] font-sans-luxury font-medium truncate">
                — {PROMO_DETAIL}
              </span>
              <span className="text-[11px] sm:text-xs font-bold underline underline-offset-2 group-hover:no-underline whitespace-nowrap">
                Book now
              </span>
            </button>

            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss promotion banner"
              className="flex-shrink-0 p-1 rounded-full hover:bg-black/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
