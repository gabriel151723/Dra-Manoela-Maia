import React, { useState, useRef, useEffect } from 'react';
import { PROCEDURES_DATA, Procedure } from '../data/procedures';
import { Clock, RefreshCw, Calendar, ArrowRight, MessageCircle, Sparkles, ChevronLeft, ChevronRight, Smile, ShieldCheck, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { trackEvent, buildWhatsAppUrl } from '../utils/analytics';
import { ProcedureVisual } from './ProcedureVisual';

interface ProceduresGridProps {
  onSelectProcedure: (procedure: Procedure) => void;
}

// Custom hook for frictionless mouse drag-to-scroll with window-level tracking
function useDragScroll<T extends HTMLElement>(onScrollUpdate?: () => void) {
  const ref = useRef<T>(null);
  const [isDragging, setIsDragging] = useState(false);
  const didDragRef = useRef(false);

  const onMouseDown = (e: React.MouseEvent) => {
    // Only drag with left mouse button (e.button === 0)
    if (e.button !== 0 || !ref.current) return;
    
    const container = ref.current;
    const startX = e.pageX;
    const startScrollLeft = container.scrollLeft;
    didDragRef.current = false;
    setIsDragging(true);

    // Disable smooth scroll and snap while actively dragging with mouse
    container.style.scrollBehavior = 'auto';
    container.style.scrollSnapType = 'none';
    document.body.style.userSelect = 'none';

    const onMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.pageX - startX;
      if (Math.abs(dx) > 3) {
        didDragRef.current = true;
      }
      container.scrollLeft = startScrollLeft - dx;
      if (onScrollUpdate) onScrollUpdate();
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      setIsDragging(false);
      document.body.style.userSelect = '';
      if (container) {
        container.style.scrollBehavior = '';
        container.style.scrollSnapType = '';
      }
      setTimeout(() => {
        didDragRef.current = false;
        if (onScrollUpdate) onScrollUpdate();
      }, 80);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return { ref, isDragging, didDragRef, onMouseDown };
}

export const ProceduresGrid: React.FC<ProceduresGridProps> = ({ onSelectProcedure }) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const categories = [
    { id: 'todos', label: 'Todos os Procedimentos', icon: Sparkles, count: PROCEDURES_DATA.length, filterFn: () => true },
    { id: 'facial', label: 'Harmonização (HOF)', icon: Sparkles, count: PROCEDURES_DATA.filter(p => p.category === 'facial').length, filterFn: (p: Procedure) => p.category === 'facial' },
    { id: 'botox', label: 'Toxina Botulínica (Botox)', icon: Sparkles, count: 1, filterFn: (p: Procedure) => p.id === 'toxina-botulinica' },
    { id: 'labios', label: 'Preenchimento Labial', icon: Heart, count: 1, filterFn: (p: Procedure) => p.id === 'preenchimento-labial' },
    { id: 'dental', label: 'Estética Dental', icon: Smile, count: PROCEDURES_DATA.filter(p => p.category === 'dental').length, filterFn: (p: Procedure) => p.category === 'dental' },
    { id: 'lentes', label: 'Lentes de Contato Dental', icon: Smile, count: 1, filterFn: (p: Procedure) => p.id === 'lentes-facetas-dentais' },
    { id: 'clareamento', label: 'Clareamento Dental', icon: Smile, count: 1, filterFn: (p: Procedure) => p.id === 'clareamento-dental-laser' },
    { id: 'bioestimuladores', label: 'Bioestimuladores de Colágeno', icon: ShieldCheck, count: PROCEDURES_DATA.filter(p => p.category === 'bioestimuladores').length, filterFn: (p: Procedure) => p.category === 'bioestimuladores' },
    { id: 'fios', label: 'Fios de Sustentação PDO', icon: ShieldCheck, count: 1, filterFn: (p: Procedure) => p.id === 'fios-sustentacao-pdo' },
    { id: 'pele', label: 'Pele & Glow (Skinbooster)', icon: Heart, count: PROCEDURES_DATA.filter(p => p.category === 'pele').length, filterFn: (p: Procedure) => p.category === 'pele' }
  ];

  // Drag hooks for tabs, cards, and top category cards
  const checkTabsScroll = () => {
    if (tabsDrag.ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsDrag.ref.current;
      setCanScrollLeft(scrollLeft > 6);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
    }
  };

  const tabsDrag = useDragScroll<HTMLDivElement>(() => checkTabsScroll());
  const topCardsDrag = useDragScroll<HTMLDivElement>();

  useEffect(() => {
    checkTabsScroll();
    const handleResize = () => checkTabsScroll();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScrollTabs = (direction: 'left' | 'right') => {
    if (tabsDrag.ref.current) {
      const offset = direction === 'left' ? -280 : 280;
      tabsDrag.ref.current.scrollBy({ left: offset, behavior: 'smooth' });
      setTimeout(checkTabsScroll, 350);
    }
  };

  const handleTabsWheel = (e: React.WheelEvent) => {
    if (!tabsDrag.ref.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      tabsDrag.ref.current.scrollLeft += e.deltaY * 0.9;
      checkTabsScroll();
    }
  };

  const handleTabClick = (tabId: string) => {
    setActiveCategory(tabId);
    trackEvent('tab_filter_click', { filter: tabId });
  };

  const currentCategoryObj = categories.find(c => c.id === activeCategory) || categories[0];
  const filteredProcedures = PROCEDURES_DATA.filter(currentCategoryObj.filterFn);

  const handleProcedureClick = (procedure: Procedure) => {
    trackEvent('procedure_card_click', {
      procedure_id: procedure.id,
      procedure_title: procedure.title,
      category: procedure.category,
      cta_location: 'procedures_grid'
    });
    
    // Direct WhatsApp with customized contextual message
    const url = buildWhatsAppUrl(procedure.whatsappMessage);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="procedimentos" className="py-16 sm:py-20 lg:py-24 bg-[#FAF6F2]/60 dark:bg-[#0B0F19] relative transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Fade-in + Slide-up) */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-14"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs tracking-[0.25em] uppercase text-[#965A4B] dark:text-[#E8A290] font-bold block mb-2">
            PROCEDIMENTOS
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1E293B] dark:text-slate-100 leading-tight mb-3">
            Harmonização Orofacial & Estética Dental
          </h2>
          <p className="text-sm sm:text-base text-[#475569] dark:text-slate-300">
            Soluções personalizadas pela Dra. Manoela Maia, integrando o alinhamento dos traços faciais à estética do sorriso com precisão científica e bom gosto.
          </p>
        </motion.div>

        {/* Horizontal Swipeable Category Cards (Mobile & Desktop) */}
        <motion.div 
          ref={topCardsDrag.ref}
          onMouseDown={topCardsDrag.onMouseDown}
          className={`flex md:grid md:grid-cols-4 gap-3.5 sm:gap-5 mb-8 overflow-x-auto pb-3 pt-1 px-1 no-scrollbar select-none cursor-grab ${
            topCardsDrag.isDragging ? 'cursor-grabbing' : ''
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Item 1: Harmonização Facial */}
          <button
            onClick={() => {
              if (topCardsDrag.didDragRef.current) return;
              handleTabClick('facial');
            }}
            className={`min-w-[240px] sm:min-w-[260px] md:min-w-0 flex-1 shrink-0 snap-start group p-4 sm:p-5 rounded-2xl transition-all duration-300 flex flex-col items-center text-center cursor-pointer ${
              activeCategory === 'facial'
                ? 'bg-white dark:bg-[#1E293B] shadow-md border-2 border-[#BA7A6A] dark:border-[#E8A290]'
                : 'bg-white/80 dark:bg-[#1E293B]/70 hover:bg-white dark:hover:bg-[#1E293B] border border-[#D8BCB2] dark:border-slate-700'
            }`}
          >
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-3 transition-colors ${
              activeCategory === 'facial'
                ? 'bg-[#FAF0EC] dark:bg-slate-700 text-[#BA7A6A] dark:text-[#E8A290]'
                : 'bg-[#FAF6F4] dark:bg-slate-800 text-[#965A4B] dark:text-slate-300 group-hover:bg-[#FAF0EC] dark:group-hover:bg-slate-700'
            }`}>
              <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 stroke-current fill-none stroke-[1.2]">
                <circle cx="12" cy="11" r="7" />
                <path d="M9 10a.5.5 0 0 1 1 0" />
                <path d="M14 10a.5.5 0 0 1 1 0" />
                <path d="M12 11.5v1.5" />
                <path d="M10 15c.8.6 1.4.8 2 .8s1.2-.2 2-.8" strokeLinecap="round" />
                <path d="M8 5c1-1 2.5-1.5 4-1.5s3 .5 4 1.5" />
              </svg>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E293B] dark:text-slate-100 mb-1">Harmonização (HOF)</span>
            <span className="text-[11px] text-[#475569] dark:text-slate-300 line-clamp-1">Full face, Botox e lábios</span>
            <span className="mt-2 text-[10px] font-bold text-[#BA7A6A] dark:text-[#E8A290] flex items-center gap-1">
              Ver opções <ArrowRight className="w-3 h-3" />
            </span>
          </button>

          {/* Item 2: Estética Dental */}
          <button
            onClick={() => {
              if (topCardsDrag.didDragRef.current) return;
              handleTabClick('dental');
            }}
            className={`min-w-[240px] sm:min-w-[260px] md:min-w-0 flex-1 shrink-0 snap-start group p-4 sm:p-5 rounded-2xl transition-all duration-300 flex flex-col items-center text-center cursor-pointer ${
              activeCategory === 'dental'
                ? 'bg-white dark:bg-[#1E293B] shadow-md border-2 border-[#BA7A6A] dark:border-[#E8A290]'
                : 'bg-white/80 dark:bg-[#1E293B]/70 hover:bg-white dark:hover:bg-[#1E293B] border border-[#D8BCB2] dark:border-slate-700'
            }`}
          >
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-3 transition-colors ${
              activeCategory === 'dental'
                ? 'bg-[#FAF0EC] dark:bg-slate-700 text-[#BA7A6A] dark:text-[#E8A290]'
                : 'bg-[#FAF6F4] dark:bg-slate-800 text-[#965A4B] dark:text-slate-300 group-hover:bg-[#FAF0EC] dark:group-hover:bg-slate-700'
            }`}>
              <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 stroke-current fill-none stroke-[1.2]">
                <path d="M12 4c-3.5 0-6 1.5-6 5 0 3 1.5 6 3 9.5 1 2.5 1.5 3.5 3 3.5s2-1 3-3.5c1.5-3.5 3-6.5 3-9.5 0-3.5-2.5-5-6-5z" />
                <path d="M12 8v4" />
              </svg>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E293B] dark:text-slate-100 mb-1">Estética Dental</span>
            <span className="text-[11px] text-[#475569] dark:text-slate-300 line-clamp-1">Lentes, facetas e clareamento</span>
            <span className="mt-2 text-[10px] font-bold text-[#BA7A6A] dark:text-[#E8A290] flex items-center gap-1">
              Ver opções <ArrowRight className="w-3 h-3" />
            </span>
          </button>

          {/* Item 3: Bioestimuladores & Fios */}
          <button
            onClick={() => {
              if (topCardsDrag.didDragRef.current) return;
              handleTabClick('bioestimuladores');
            }}
            className={`min-w-[240px] sm:min-w-[260px] md:min-w-0 flex-1 shrink-0 snap-start group p-4 sm:p-5 rounded-2xl transition-all duration-300 flex flex-col items-center text-center cursor-pointer ${
              activeCategory === 'bioestimuladores'
                ? 'bg-white dark:bg-[#1E293B] shadow-md border-2 border-[#BA7A6A] dark:border-[#E8A290]'
                : 'bg-white/80 dark:bg-[#1E293B]/70 hover:bg-white dark:hover:bg-[#1E293B] border border-[#D8BCB2] dark:border-slate-700'
            }`}
          >
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-3 transition-colors ${
              activeCategory === 'bioestimuladores'
                ? 'bg-[#FAF0EC] dark:bg-slate-700 text-[#BA7A6A] dark:text-[#E8A290]'
                : 'bg-[#FAF6F4] dark:bg-slate-800 text-[#965A4B] dark:text-slate-300 group-hover:bg-[#FAF0EC] dark:group-hover:bg-slate-700'
            }`}>
              <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 stroke-current fill-none stroke-[1.2]">
                <path d="M12 3v3m0 12v3M4.2 7.8l2.1 2.1m11.4 0l2.1-2.1M4.2 16.2l2.1-2.1m11.4 0l2.1 2.1" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E293B] dark:text-slate-100 mb-1">Colágeno & Fios</span>
            <span className="text-[11px] text-[#475569] dark:text-slate-300 line-clamp-1">Radiesse, Sculptra e PDO</span>
            <span className="mt-2 text-[10px] font-bold text-[#BA7A6A] dark:text-[#E8A290] flex items-center gap-1">
              Ver opções <ArrowRight className="w-3 h-3" />
            </span>
          </button>

          {/* Item 4: Pele & Glow */}
          <button
            onClick={() => {
              if (topCardsDrag.didDragRef.current) return;
              handleTabClick('pele');
            }}
            className={`min-w-[240px] sm:min-w-[260px] md:min-w-0 flex-1 shrink-0 snap-start group p-4 sm:p-5 rounded-2xl transition-all duration-300 flex flex-col items-center text-center cursor-pointer ${
              activeCategory === 'pele'
                ? 'bg-white dark:bg-[#1E293B] shadow-md border-2 border-[#BA7A6A] dark:border-[#E8A290]'
                : 'bg-white/80 dark:bg-[#1E293B]/70 hover:bg-white dark:hover:bg-[#1E293B] border border-[#D8BCB2] dark:border-slate-700'
            }`}
          >
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-3 transition-colors ${
              activeCategory === 'pele'
                ? 'bg-[#FAF0EC] dark:bg-slate-700 text-[#BA7A6A] dark:text-[#E8A290]'
                : 'bg-[#FAF6F4] dark:bg-slate-800 text-[#965A4B] dark:text-slate-300 group-hover:bg-[#FAF0EC] dark:group-hover:bg-slate-700'
            }`}>
              <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 stroke-current fill-none stroke-[1.2]">
                <path d="M12 2l2.4 5.6L20 10l-4.4 4 1.4 6-5-3.2-5 3.2 1.4-6L4 10l5.6-2.4z" />
              </svg>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E293B] dark:text-slate-100 mb-1">Pele & Glow</span>
            <span className="text-[11px] text-[#475569] dark:text-slate-300 line-clamp-1">Skinbooster e hidratação</span>
            <span className="mt-2 text-[10px] font-bold text-[#BA7A6A] dark:text-[#E8A290] flex items-center gap-1">
              Ver opções <ArrowRight className="w-3 h-3" />
            </span>
          </button>
        </motion.div>

        {/* Horizontal Scrollable Procedure Classification Tabs */}
        <motion.div 
          className="relative max-w-full mx-auto mb-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Scroll Navigation Header with Active Category Info & Arrow Controls */}
          <div className="flex items-center justify-between gap-3 mb-3 px-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1E293B] dark:text-slate-200">
              <span className="inline-block w-2 h-2 rounded-full bg-[#BA7A6A] dark:bg-[#E8A290]" />
              <span>Filtrando: <strong className="text-[#BA7A6A] dark:text-[#E8A290]">{currentCategoryObj.label}</strong> ({filteredProcedures.length})</span>
            </div>

            {/* Always Interactive Left & Right Scroll Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleScrollTabs('left')}
                className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-[#D8BCB2] dark:border-slate-700 flex items-center justify-center text-[#1E293B] dark:text-slate-200 hover:bg-[#FAF0EC] dark:hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
                title="Deslizar abas para a esquerda"
                aria-label="Deslizar abas para a esquerda"
              >
                <ChevronLeft className="w-4 h-4 text-[#BA7A6A] dark:text-[#E8A290]" />
              </button>
              <button
                type="button"
                onClick={() => handleScrollTabs('right')}
                className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-[#D8BCB2] dark:border-slate-700 flex items-center justify-center text-[#1E293B] dark:text-slate-200 hover:bg-[#FAF0EC] dark:hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
                title="Deslizar abas para a direita"
                aria-label="Deslizar abas para a direita"
              >
                <ChevronRight className="w-4 h-4 text-[#BA7A6A] dark:text-[#E8A290]" />
              </button>
            </div>
          </div>

          {/* Horizontal Scroll Track (Mouse drag + Touch swipe + Wheel) */}
          <div className="relative group/track rounded-2xl bg-white/40 dark:bg-slate-900/40 p-1.5 border border-[#D8BCB2]/60 dark:border-slate-800 backdrop-blur-xs">
            {/* Left fade gradient */}
            <div
              className={`pointer-events-none absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[#FAF6F2] dark:from-[#0B0F19] to-transparent z-10 rounded-l-2xl transition-opacity duration-300 ${
                canScrollLeft ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Scrollable ribbon */}
            <div
              ref={tabsDrag.ref}
              onScroll={checkTabsScroll}
              onMouseDown={tabsDrag.onMouseDown}
              onWheel={handleTabsWheel}
              className={`w-full flex items-center gap-2 sm:gap-2.5 overflow-x-auto py-2 px-3 sm:px-4 no-scrollbar select-none cursor-grab ${
                tabsDrag.isDragging ? 'cursor-grabbing' : ''
              }`}
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {categories.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeCategory === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      if (tabsDrag.didDragRef.current) return;
                      handleTabClick(tab.id);
                    }}
                    className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#1E293B] dark:bg-[#BA7A6A] text-white shadow-md ring-2 ring-[#BA7A6A]/30 dark:ring-white/20'
                        : 'bg-white/95 dark:bg-[#1E293B]/95 text-[#475569] dark:text-slate-300 hover:text-[#1E293B] dark:hover:text-white border border-[#D8BCB2] dark:border-slate-700 hover:border-[#BA7A6A]/60'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#E8A290] dark:text-white' : 'text-[#BA7A6A] dark:text-[#E8A290]'}`} />
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#FAF0EC] dark:bg-slate-800 text-[#965A4B] dark:text-slate-300'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Right fade gradient */}
            <div
              className={`pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#FAF6F2] dark:from-[#0B0F19] to-transparent z-10 rounded-r-2xl transition-opacity duration-300 ${
                canScrollRight ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>

          {/* Interactive Help Hint with Motion */}
          <div className="flex items-center justify-center gap-2 mt-2.5 text-[11px] text-[#8C7A74] dark:text-slate-400 font-medium">
            <span className="text-[#BA7A6A] dark:text-[#E8A290]">⟵</span>
            <span>Arraste com o mouse ou deslize para explorar as 10 categorias</span>
            <span className="text-[#BA7A6A] dark:text-[#E8A290]">⟶</span>
          </div>
        </motion.div>

        {/* Procedures Grid Cards with Framer Motion Staggered entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredProcedures.map((proc, index) => (
            <motion.div
              key={proc.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                y: -6,
                scale: 1.018,
                transition: { duration: 0.25, ease: [0.25, 1, 0.5, 1] }
              }}
              whileTap={{
                scale: 0.99,
                transition: { duration: 0.15 }
              }}
              className="bg-white dark:bg-[#1E293B] rounded-2xl border border-[#D8BCB2] dark:border-slate-700 shadow-2xs hover:shadow-xl hover:border-[#BA7A6A]/60 dark:hover:border-[#E8A290]/60 transition-shadow duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
            >
              <div>
                {/* Specific Non-Generic Visual Header Banner corresponding to each procedure */}
                <ProcedureVisual procedure={proc} />

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="font-serif-luxury text-2xl font-semibold text-[#1E293B] dark:text-slate-100 group-hover:text-[#BA7A6A] dark:group-hover:text-[#E8A290] transition-colors mb-1 leading-snug">
                    {proc.title}
                  </h3>
                  
                  <p className="text-xs text-[#BA7A6A] dark:text-[#E8A290] font-semibold mb-3">
                    {proc.subtitle}
                  </p>

                  <p className="text-xs text-[#475569] dark:text-slate-300 leading-relaxed mb-5">
                    {proc.description}
                  </p>

                  {/* Bullet points */}
                  <div className="space-y-2 mb-6">
                    {proc.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#334155] dark:text-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#BA7A6A] dark:text-[#E8A290] mt-1.5 shrink-0" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Meta Specs (Tabular Discipline) */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-[#FAF0EC] dark:border-slate-700 text-[11px] mb-6 bg-[#FAF9F6] dark:bg-slate-900 px-3 rounded-xl border border-[#E8D5CE]/60 dark:border-slate-800">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#64748B] dark:text-slate-400 flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3 text-[#BA7A6A] dark:text-[#E8A290]" /> Sessão
                      </span>
                      <span className="font-semibold text-[#1E293B] dark:text-slate-100 truncate">{proc.duration}</span>
                    </div>

                    <div className="flex flex-col border-x border-[#E8D5CE] dark:border-slate-700 px-2">
                      <span className="text-[10px] text-[#64748B] dark:text-slate-400 flex items-center gap-1 font-medium">
                        <RefreshCw className="w-3 h-3 text-[#BA7A6A] dark:text-[#E8A290]" /> Retorno
                      </span>
                      <span className="font-semibold text-[#1E293B] dark:text-slate-100 truncate">{proc.recovery}</span>
                    </div>

                    <div className="flex flex-col text-right">
                      <span className="text-[10px] text-[#64748B] dark:text-slate-400 flex items-center justify-end gap-1 font-medium">
                        <Calendar className="w-3 h-3 text-[#BA7A6A] dark:text-[#E8A290]" /> Duração
                      </span>
                      <span className="font-semibold text-[#1E293B] dark:text-slate-100 truncate">{proc.results}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0">
                <button
                  onClick={() => handleProcedureClick(proc)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-white bg-[#BA7A6A] hover:bg-[#A66757] dark:bg-[#A66757] dark:hover:bg-[#8C5243] transition-all duration-200 shadow-2xs hover:shadow-sm cursor-pointer group-hover:scale-[1.01]"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span className="truncate">Quero saber mais sobre este procedimento</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Notice (Fade-in) */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-xs text-[#475569] dark:text-slate-300">
            Deseja saber qual o plano de tratamento ideal para seu rosto e sorriso?{' '}
            <button
              onClick={() => {
                const url = buildWhatsAppUrl('Olá Dra. Manoela Maia! Gostaria de uma avaliação personalizada para harmonização e estética dental.');
                window.open(url, '_blank', 'noopener,noreferrer');
              }}
              className="text-[#BA7A6A] dark:text-[#E8A290] font-bold underline underline-offset-4 hover:text-[#965A4B] dark:hover:text-[#FAD5CB] cursor-pointer"
            >
              Fale diretamente com a Dra. Manoela no WhatsApp
            </button>
          </p>
        </motion.div>

      </div>
    </section>
  );
};
