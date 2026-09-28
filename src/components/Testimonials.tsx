import React from 'react';
import { TESTIMONIALS_DATA } from '../data/testimonials';
import { Star, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { trackEvent, buildWhatsAppUrl } from '../utils/analytics';

export const Testimonials: React.FC = () => {
  return (
    <section id="avaliacoes" className="py-16 sm:py-20 lg:py-24 bg-[#FAF6F2]/50 dark:bg-[#0B0F19] relative transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Staggered Fade-in */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-14"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs tracking-[0.25em] uppercase text-[#965A4B] dark:text-[#E8A290] font-bold block mb-2">
            PROVA SOCIAL VERIFICADA
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1E293B] dark:text-slate-100 leading-tight mb-3">
            Pacientes Reais. Histórias Reais.
          </h2>
          <div className="flex items-center justify-center gap-2 text-xs text-[#475569] dark:text-slate-300">
            <div className="flex text-[#F59E0B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B]" />
              ))}
            </div>
            <span className="font-bold text-[#1E293B] dark:text-slate-100">5.0 de 5.0 estrelas</span>
            <span>·</span>
            <span>Avaliações reais no Google Maps</span>
          </div>
        </motion.div>

        {/* 3-Cards Desktop Grid / Mobile with Framer Motion cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-8">
          {TESTIMONIALS_DATA.slice(0, 3).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="bg-white dark:bg-[#1E293B] rounded-2xl p-6 sm:p-7 border border-[#D8BCB2] dark:border-slate-700 shadow-2xs flex flex-col justify-between hover:shadow-lg transition-all relative"
            >
              {/* Elegant quote icon */}
              <div className="text-[#BA7A6A] dark:text-[#E8A290] font-serif-luxury text-5xl leading-none -mb-3 select-none">
                “
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 leading-relaxed my-4 flex-1">
                {item.text}
              </p>

              {/* Star Rating */}
              <div className="flex items-center gap-1 text-[#F59E0B] mb-4">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#F59E0B]" />
                ))}
              </div>

              {/* Patient Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#FAF0EC] dark:border-slate-700">
                <div className="w-9 h-9 rounded-full bg-[#FAF0EC] dark:bg-slate-750 text-[#BA7A6A] dark:text-[#E8A290] flex items-center justify-center font-bold text-xs">
                  {item.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-[#1E293B] dark:text-slate-100">{item.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-[#10B981]" />
                  </div>
                  <span className="text-[10px] text-[#475569] dark:text-slate-300 font-medium">{item.roleOrLocation} · {item.procedure}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Navigation Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-2.5 h-2.5 rounded-full bg-[#BA7A6A] dark:bg-[#E8A290]" />
          <div className="w-2 h-2 rounded-full bg-[#D8BCB2] dark:bg-slate-700" />
          <div className="w-2 h-2 rounded-full bg-[#D8BCB2] dark:bg-slate-700" />
        </div>

        {/* CTA below social proof with interactive motion button */}
        <motion.div 
          className="text-center mt-10 sm:mt-12"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              trackEvent('lead_conversion_attempt', {
                cta_location: 'testimonials_footer_cta',
                action: 'agendar_apos_avaliacoes'
              });
              const url = buildWhatsAppUrl('Olá Dra. Manoela Maia! Li os depoimentos de pacientes no seu site e gostaria de agendar minha avaliação.');
              window.open(url, '_blank', 'noopener,noreferrer');
            }}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold tracking-wide text-white bg-[#BA7A6A] hover:bg-[#A66757] dark:bg-[#A66757] dark:hover:bg-[#8C5243] transition-all duration-200 shadow-2xs cursor-pointer hover:shadow-md"
          >
            <span>Desejo Agendar Minha Avaliação</span>
            <span>→</span>
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};
