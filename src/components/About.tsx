import React from 'react';
import { Award, HeartHandshake, ArrowRight, MessageCircle, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import { trackEvent, buildWhatsAppUrl, INSTAGRAM_URL, DOCTOR_NAME, INSTAGRAM_HANDLE } from '../utils/analytics';
import { DoctorPhoto } from './DoctorPhoto';

interface AboutProps {
  onOpenSchedule: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenSchedule }) => {
  const handleConsultWhatsApp = () => {
    trackEvent('lead_conversion_attempt', {
      cta_location: 'about_section_whatsapp',
      action: 'conhecer_trajetoria_dra_manoela'
    });
    const url = buildWhatsAppUrl('Olá Dra. Manoela Maia! Gostaria de entender como funciona a avaliação inicial no seu consultório no Itaigara.');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="sobre" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#070A11] border-y border-[#D8BCB2] dark:border-slate-800 relative transition-colors duration-300 overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/3 -left-20 w-[400px] h-[400px] bg-[#E8D5CE]/30 dark:bg-[#BA7A6A]/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[350px] h-[350px] bg-[#FAF0EC]/40 dark:bg-[#BA7A6A]/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Arched Doctor Portrait with offset block (Fade-in + Slide-right) */}
          <motion.div 
            className="lg:col-span-5 flex justify-center"
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[350px]">
              {/* Offset Soft Blush/Terracotta Backdrop Box with breathing floating effect */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-6 -left-3.5 w-4/5 h-[85%] bg-[#E8D5CE] dark:bg-slate-800/90 rounded-2xl -z-10 transition-colors" 
              />

              {/* Main Arched Photo Container (Clean - No Buttons / No Drag Triggers) */}
              <div className="relative bg-[#FAF6F2] dark:bg-slate-900 rounded-t-[120px] rounded-b-2xl overflow-hidden border border-[#D8BCB2] dark:border-slate-700 shadow-md">
                <div className="h-[370px] sm:h-[410px] w-full relative flex flex-col justify-end">
                  
                  {/* Photo Component of Dra Manoela Maia (Variant: about) */}
                  <div className="absolute inset-0 z-0">
                    <DoctorPhoto variant="about" className="w-full h-full" />
                  </div>

                  {/* Identification bottom label */}
                  <motion.div 
                    initial={{ y: 15, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="relative z-10 m-3.5 bg-white/95 dark:bg-[#1E293B]/95 backdrop-blur-md rounded-xl py-2.5 px-3.5 text-center border border-[#D8BCB2] dark:border-slate-700 shadow-xs"
                  >
                    <p className="text-xs font-bold text-[#1E293B] dark:text-slate-100">{DOCTOR_NAME}</p>
                    <p className="text-[10px] text-[#965A4B] dark:text-[#E8A290] font-semibold tracking-wide">
                      Harmonização Orofacial & Estética Dental · CRO-BA
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Instagram link badge directly to @manomaia with floating bounce */}
              <motion.a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  trackEvent('social_click', { network: 'instagram', profile: 'manomaia' });
                }}
                className="absolute -bottom-3 -right-2 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full border border-[#D8BCB2] dark:border-slate-700 shadow-sm flex items-center gap-2 text-xs font-medium text-[#1E293B] dark:text-slate-200 hover:text-[#BA7A6A] dark:hover:text-[#E8A290] hover:border-[#BA7A6A] dark:hover:border-[#E8A290] transition-all cursor-pointer z-20"
              >
                <Instagram className="w-3.5 h-3.5 text-[#BA7A6A] dark:text-[#E8A290]" />
                <span className="text-[11px] font-semibold text-[#BA7A6A] dark:text-[#E8A290]">{INSTAGRAM_HANDLE}</span>
                <span className="text-[10px] text-[#475569] dark:text-slate-300">Ver Casos ↗</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column: About Content (Fade-in + Slide-up) */}
          <motion.div 
            className="lg:col-span-7 flex flex-col justify-center"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs tracking-[0.25em] uppercase text-[#965A4B] dark:text-[#E8A290] font-bold mb-2 block">
              CONHEÇA A ESPECIALISTA
            </span>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[42px] font-medium tracking-tight text-[#1E293B] dark:text-slate-100 leading-tight mb-4 sm:mb-5">
              Cuidado Excepcional.{' '}
              <span className="italic block sm:inline text-[#BA7A6A] dark:text-[#E8A290]">
                Resultados Bonitos e Naturais.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#475569] dark:text-slate-300 leading-relaxed mb-4">
              Com sólida formação em Odontologia e especialização com foco em <strong className="text-[#1E293B] dark:text-slate-100 font-semibold">Harmonização Orofacial (HOF)</strong> e <strong className="text-[#1E293B] dark:text-slate-100 font-semibold">Estética Dental</strong>, a <strong className="text-[#1E293B] dark:text-slate-100 font-semibold">Dra. Manoela Maia</strong> atende no renomado <strong className="text-[#1E293B] dark:text-slate-100 font-semibold">Complexo Odonto-Médico Itaigara</strong> em Salvador.
            </p>

            <p className="text-sm sm:text-base text-[#475569] dark:text-slate-300 leading-relaxed mb-6 sm:mb-7">
              Sua filosofia de atendimento une a ciência anatômica à delicadeza artística: cada face é única e exige um olhar holístico onde dentes, lábios, mandíbula e contornos faciais dialogam em equilíbrio. O objetivo nunca é a transformação artificial, mas sim a valorização daquilo que você tem de melhor, com segurança, materiais padrão ouro e acompanhamento cuidadoso.
            </p>

            {/* Authority Bullet Points with staggered micro-motion */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-7">
              <motion.div 
                className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF9F6] dark:bg-[#1E293B] border border-[#D8BCB2] dark:border-slate-700 hover:shadow-xs transition-shadow"
                whileHover={{ y: -3 }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-8 h-8 rounded-lg bg-[#FAF0EC] dark:bg-slate-700 text-[#965A4B] dark:text-[#E8A290] flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#1E293B] dark:text-slate-100 mb-0.5">Visagismo & Precisão</h3>
                  <p className="text-[11px] text-[#475569] dark:text-slate-300">Integração precisa entre a estética do sorriso e a harmonização orofacial.</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF9F6] dark:bg-[#1E293B] border border-[#D8BCB2] dark:border-slate-700 hover:shadow-xs transition-shadow"
                whileHover={{ y: -3 }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-8 h-8 rounded-lg bg-[#FAF0EC] dark:bg-slate-700 text-[#965A4B] dark:text-[#E8A290] flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#1E293B] dark:text-slate-100 mb-0.5">Atendimento Acolhedor</h3>
                  <p className="text-[11px] text-[#475569] dark:text-slate-300">Consultório exclusivo na Sala 703 com ambiente calmo, seguro e sem pressa.</p>
                </div>
              </motion.div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConsultWhatsApp}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wide text-white bg-[#BA7A6A] hover:bg-[#A66757] dark:bg-[#A66757] dark:hover:bg-[#8C5243] transition-all duration-200 shadow-xs cursor-pointer hover:shadow-md"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Conversar com a Dra. Manoela</span>
              </motion.button>

              <motion.button
                whileHover={{ x: 4 }}
                onClick={onOpenSchedule}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E293B] dark:text-slate-200 hover:text-[#BA7A6A] dark:hover:text-[#E8A290] transition-colors py-2 px-3 cursor-pointer"
              >
                <span>Agendar Avaliação Inicial</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#BA7A6A] dark:text-[#E8A290]" />
              </motion.button>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
