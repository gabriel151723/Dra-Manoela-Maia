import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '../utils/analytics';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 350px
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    trackEvent('scroll_to_top_clicked', { source: 'floating_button' });
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="scroll-to-top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20, transition: { duration: 0.2 } }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          onClick={scrollToTop}
          aria-label="Voltar ao topo da página"
          title="Voltar ao topo"
          className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-40 group flex items-center gap-2 p-3 sm:px-3.5 sm:py-2.5 rounded-full bg-white/95 dark:bg-[#1E293B]/95 backdrop-blur-md border border-[#D8BCB2] dark:border-slate-700 hover:border-[#BA7A6A] dark:hover:border-[#E8A290] shadow-[0_6px_20px_-4px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_25px_-4px_rgba(186,122,106,0.3)] text-[#1E293B] dark:text-slate-200 transition-colors duration-200 cursor-pointer"
        >
          <div className="w-5 h-5 flex items-center justify-center text-[#BA7A6A] dark:text-[#E8A290] group-hover:-translate-y-0.5 transition-transform duration-200">
            <ArrowUp className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
          </div>
          <span className="hidden sm:inline text-xs font-semibold text-[#475569] dark:text-slate-300 group-hover:text-[#BA7A6A] dark:group-hover:text-[#E8A290] transition-colors pr-1">
            Topo
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
