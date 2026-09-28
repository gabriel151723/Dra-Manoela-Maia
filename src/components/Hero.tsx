import React from 'react';
import { Star, MessageCircle, ShieldCheck, Sparkles, ChevronRight, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { trackEvent, buildWhatsAppUrl } from '../utils/analytics';
import { DoctorPhoto } from './DoctorPhoto';
import { DoctorLogo } from './DoctorLogo';

interface HeroProps {
  onOpenSchedule: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenSchedule }) => {
  const handlePrimaryWhatsApp = () => {
    trackEvent('lead_conversion_attempt', {
      cta_location: 'hero_primary_whatsapp',
      action: 'agendamento_hero_direto',
      channel: 'whatsapp'
    });
    const url = buildWhatsAppUrl(`Olá Dra. Manoela Maia! Vi seu site e gostaria de agendar uma consulta de avaliação para harmonização orofacial / estética dental.`);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleOpenInteractive = () => {
    trackEvent('cta_click', {
      cta_location: 'hero_interactive_schedule',
      action: 'abrir_modal_agendamento'
    });
    onOpenSchedule();
  };

  return (
    <section id="inicio" className="relative pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 lg:pb-14 overflow-hidden transition-colors duration-300">
      {/* Subtle luxury ambient glow backgrounds with gentle pulsation */}
      <motion.div 
        animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.35, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#E8D5CE]/30 dark:bg-[#BA7A6A]/10 rounded-full blur-3xl -z-10 pointer-events-none translate-x-1/3 -translate-y-1/4 max-w-full" 
      />
      <motion.div 
        animate={{ scale: [1, 1.06, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/2 left-0 w-[350px] h-[350px] bg-[#F1E5E0]/35 dark:bg-[#BA7A6A]/10 rounded-full blur-3xl -z-10 pointer-events-none -translate-x-1/3 max-w-full" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Copywriting & High CRO Elements */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Immediate Social Proof Badge with Smooth Slide-in */}
            <motion.div 
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 dark:bg-slate-800/95 border border-[#D8BCB2] dark:border-slate-700 shadow-2xs w-fit mb-4 sm:mb-5 transition-colors"
            >
              <div className="flex items-center text-[#F59E0B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B]" />
                ))}
              </div>
              <span className="text-xs font-semibold text-[#1E293B] dark:text-slate-100">5.0</span>
              <span className="text-neutral-400 dark:text-slate-500">|</span>
              <span className="text-[11px] font-medium text-[#475569] dark:text-slate-300">
                Mais de 48 avaliações reais no Google Maps
              </span>
            </motion.div>

            {/* High-Impact Headline with Rich Stagger */}
            <motion.h1 
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif-luxury text-3xl sm:text-4xl lg:text-[44px] xl:text-5xl font-medium tracking-tight text-[#1E293B] dark:text-slate-100 leading-[1.15] mb-3 sm:mb-4"
            >
              Realce Sua Beleza.{' '}
              <span className="italic font-normal text-[#BA7A6A] dark:text-[#E8A290] block sm:inline">
                Eleve Sua Confiança.
              </span>
            </motion.h1>

            {/* Authoritative Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base text-[#475569] dark:text-slate-300 font-normal leading-relaxed max-w-xl mb-6"
            >
              <strong className="text-[#1E293B] dark:text-slate-100 font-semibold inline-flex items-center gap-1.5 align-baseline">
                <span className="inline-block w-5 h-5 rounded-full overflow-hidden shadow-2xs border border-[#0E8E89]/40 align-middle shrink-0 -translate-y-0.5">
                  <DoctorLogo className="w-full h-full" showText={false} />
                </span>
                <span>Dra. Manoela Maia</span>
              </strong> — Odontologia estética de alta precisão e Harmonização Orofacial (HOF) em Salvador. Protocolos individualizados que integram a harmonia dos traços faciais ao seu melhor sorriso.
            </motion.p>

            {/* CTAs with Micro-Animations & Tracking */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6 sm:mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePrimaryWhatsApp}
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-white bg-[#BA7A6A] hover:bg-[#A66757] dark:bg-[#A66757] dark:hover:bg-[#8C5243] transition-all duration-300 shadow-[0_8px_20px_-4px_rgba(186,122,106,0.45)] hover:shadow-[0_12px_25px_-4px_rgba(186,122,106,0.6)] cursor-pointer overflow-hidden"
              >
                {/* Micro-shimmer on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                </div>
                <span>Agendar Avaliação no WhatsApp</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleOpenInteractive}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-xs sm:text-sm font-medium text-[#1E293B] dark:text-slate-200 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 border border-[#D8BCB2] dark:border-slate-700 hover:border-[#BA7A6A] dark:hover:border-[#E8A290] transition-all duration-200 shadow-2xs cursor-pointer"
              >
                <span>Conhecer Procedimentos</span>
                <ChevronRight className="w-4 h-4 text-[#BA7A6A] dark:text-[#E8A290]" />
              </motion.button>
            </motion.div>

            {/* Quick Trust Pillars */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="pt-4 sm:pt-5 border-t border-[#E8D5CE]/80 dark:border-slate-800 grid grid-cols-3 gap-3 sm:gap-4"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-[#BA7A6A] dark:text-[#E8A290] font-semibold text-xs mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Segurança</span>
                </div>
                <span className="text-[11px] sm:text-xs text-[#64748B] dark:text-slate-400">Produtos ANVISA & marcas ouro</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-[#BA7A6A] dark:text-[#E8A290] font-semibold text-xs mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Naturalidade</span>
                </div>
                <span className="text-[11px] sm:text-xs text-[#64748B] dark:text-slate-400">Harmonização facial autêntica</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-[#BA7A6A] dark:text-[#E8A290] font-semibold text-xs mb-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>Odonto-Médico</span>
                </div>
                <span className="text-[11px] sm:text-xs text-[#64748B] dark:text-slate-400">Itaigara, Sala 703 com conforto</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Visual Anchor with Arched Aesthetics and Framer Motion floating elements */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            <div className="relative w-full max-w-[310px] sm:max-w-[350px] lg:max-w-[370px]">
              {/* Backing decorative colored slab */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="absolute -top-2.5 -right-2.5 w-full h-full bg-[#E8D5CE] dark:bg-slate-800/80 rounded-t-[120px] rounded-b-3xl -z-10" 
              />
              
              {/* Floating Badge 1 - Top Right with continuous gentle float */}
              <motion.div 
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.08 }}
                className="absolute -top-3 -right-2 sm:-right-4 bg-white/95 dark:bg-[#1E293B]/95 backdrop-blur-md rounded-2xl py-2 px-3 sm:px-3.5 border border-[#D8BCB2] dark:border-slate-700 shadow-md flex items-center gap-2 z-20 cursor-default"
              >
                <div className="w-7 h-7 rounded-full bg-[#FAF0EC] dark:bg-slate-800 text-[#BA7A6A] dark:text-[#E8A290] flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#1E293B] dark:text-slate-100 leading-tight">Visagismo Facial</div>
                  <div className="text-[10px] text-[#475569] dark:text-slate-300">Harmonia & Naturalidade</div>
                </div>
              </motion.div>

              {/* Main Arched Visual Frame */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-[#FAF6F2] dark:bg-slate-900 rounded-t-[120px] rounded-b-3xl overflow-hidden border border-[#D8BCB2] dark:border-slate-700 shadow-md"
              >
                
                {/* Photo Container */}
                <div className="relative h-[370px] sm:h-[410px] lg:h-[430px] w-full flex flex-col justify-between">
                  
                  {/* Top Bar inside frame with Official Logo & Identification */}
                  <div className="w-full flex justify-between items-center p-3 sm:p-3.5 z-10 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      {/* Ultra High-Res Circular Logo */}
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden shadow-md border border-white/50 shrink-0 bg-[#0E8E89]">
                        <DoctorLogo className="w-full h-full" showText={false} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] sm:text-[11px] tracking-[0.16em] uppercase text-white font-bold drop-shadow-md leading-tight">
                          DRA. MANOELA MAIA
                        </span>
                        <span className="text-[8px] sm:text-[9px] text-[#A7F3D0] font-medium tracking-wide">
                          Reabilitação Oral &amp; Estética
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-semibold text-white border border-white/20">
                      CRO-BA
                    </span>
                  </div>

                  {/* Doctor Portrait */}
                  <div className="absolute inset-0 z-0">
                    <DoctorPhoto variant="hero" className="w-full h-full" />
                  </div>

                  {/* Bottom Vignette with Elegant Subtle Nameplate */}
                  <div className="relative z-10 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-between">
                    <div>
                      <p className="text-xs font-bold text-white drop-shadow-sm">Harmonização Orofacial</p>
                      <p className="text-[10px] text-white/80">Estética Dental Integrada</p>
                    </div>
                  </div>

                </div>

              </motion.div>

              {/* Floating Badge 2 - Bottom Left with continuous gentle float (counter-phase) */}
              <motion.div 
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                whileHover={{ scale: 1.08 }}
                className="absolute -bottom-3 -left-2 sm:-left-4 bg-white/95 dark:bg-[#1E293B]/95 backdrop-blur-md rounded-2xl py-2 px-3 sm:px-3.5 border border-[#D8BCB2] dark:border-slate-700 shadow-md flex items-center gap-2.5 z-20 cursor-default"
              >
                <div className="w-7 h-7 rounded-full bg-[#10B981]/15 text-[#059669] dark:text-[#34D399] flex items-center justify-center font-bold text-xs shrink-0">
                  ✓
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#1E293B] dark:text-slate-100 leading-tight">Avaliação Integrada</div>
                  <div className="text-[10px] text-[#475569] dark:text-slate-300">Itaigara · Sala 703</div>
                </div>
              </motion.div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
