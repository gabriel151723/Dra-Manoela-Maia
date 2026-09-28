import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Phone, Copy, Check, ExternalLink, Building2 } from 'lucide-react';
import { motion } from 'motion/react';
import { CLINIC_ADDRESS, WHATSAPP_DISPLAY, trackEvent } from '../utils/analytics';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=Complexo+Odonto+Medico+Itaigara+Av+Antonio+Carlos+Magalhaes+585+Salvador+BA';
  const wazeUrl = 'https://waze.com/ul?q=Complexo+Odonto-Medico+Itaigara+Salvador';

  const handleCopy = () => {
    navigator.clipboard.writeText(CLINIC_ADDRESS);
    setCopied(true);
    trackEvent('address_copy', { full_address: CLINIC_ADDRESS });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="localizacao" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#070A11] border-t border-[#D8BCB2] dark:border-slate-800 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Staggered Fade-in */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-14"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs tracking-[0.25em] uppercase text-[#965A4B] dark:text-[#E8A290] font-bold block mb-2">
            LOCALIZAÇÃO PRIVILEGIADA
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1E293B] dark:text-slate-100 leading-tight mb-3 sm:mb-4">
            Como Chegar ao Consultório
          </h2>
          <p className="text-sm sm:text-base text-[#475569] dark:text-slate-300">
            Localizado no mais tradicional e moderno complexo de saúde de Salvador, o Complexo Odonto-Médico Itaigara, com estacionamento privativo e fácil acesso pela Av. ACM.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
          
          {/* Left Details Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 bg-[#FAF9F6] dark:bg-[#1E293B] p-6 sm:p-8 rounded-3xl border border-[#D8BCB2] dark:border-slate-700 shadow-2xs flex flex-col justify-between"
          >
            <div className="space-y-6">
              
              {/* Address item */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FAF0EC] dark:bg-slate-700 text-[#965A4B] dark:text-[#E8A290] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#965A4B] dark:text-[#E8A290] mb-1">Endereço</h3>
                  <p className="text-sm font-bold text-[#1E293B] dark:text-slate-100 leading-snug mb-1">
                    Complexo Odonto-Médico Itaigara · Sala 703
                  </p>
                  <p className="text-xs text-[#475569] dark:text-slate-300 leading-relaxed mb-3">
                    Av. Antônio Carlos Magalhães, 585 - Sala 703<br />
                    Bairro Itaigara, Salvador - BA<br />
                    CEP 41800-700
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-[#D8BCB2] dark:border-slate-700 hover:border-[#BA7A6A] dark:hover:border-[#E8A290] text-xs font-semibold text-[#1E293B] dark:text-slate-200 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#10B981]" />
                        <span className="text-[#10B981]">Endereço copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#64748B] dark:text-slate-400" />
                        <span>Copiar endereço completo</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-[#D8BCB2]/70 dark:border-slate-700">
                <div className="w-10 h-10 rounded-xl bg-[#FAF0EC] dark:bg-slate-700 text-[#965A4B] dark:text-[#E8A290] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#965A4B] dark:text-[#E8A290] mb-1">Horário de Atendimento</h3>
                  <div className="space-y-1 text-xs text-[#475569] dark:text-slate-300">
                    <div className="flex justify-between gap-4">
                      <span>Segunda a Sexta:</span>
                      <strong className="text-[#1E293B] dark:text-slate-100 font-bold">08:00 às 19:00</strong>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Sábado:</span>
                      <strong className="text-[#1E293B] dark:text-slate-100 font-bold">08:00 às 13:00</strong>
                    </div>
                    <div className="flex justify-between gap-4 text-[#64748B] dark:text-slate-400">
                      <span>Domingo & Feriados:</span>
                      <span>Fechado</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Phone / Contact */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-[#D8BCB2]/70 dark:border-slate-700">
                <div className="w-10 h-10 rounded-xl bg-[#FAF0EC] dark:bg-slate-700 text-[#965A4B] dark:text-[#E8A290] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#965A4B] dark:text-[#E8A290] mb-1">Contato Direto & Agendamento</h3>
                  <p className="text-sm font-bold text-[#1E293B] dark:text-slate-100">{WHATSAPP_DISPLAY}</p>
                  <p className="text-[11px] text-[#475569] dark:text-slate-300">Consultas com hora previamente marcada</p>
                </div>
              </div>

            </div>

            {/* Quick GPS Buttons */}
            <div className="pt-5 mt-5 border-t border-[#D8BCB2]/70 dark:border-slate-700 grid grid-cols-2 gap-3">
              <motion.a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => trackEvent('map_route_click', { app: 'google_maps' })}
                className="inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-[#1E293B] hover:bg-black dark:bg-[#BA7A6A] dark:hover:bg-[#A66757] text-white text-xs font-bold transition-colors text-center"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Google Maps</span>
              </motion.a>

              <motion.a
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => trackEvent('map_route_click', { app: 'waze' })}
                className="inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-white hover:bg-[#FAF9F6] dark:bg-slate-800 dark:hover:bg-slate-700 border border-[#D8BCB2] dark:border-slate-700 text-[#1E293B] dark:text-slate-200 text-xs font-bold transition-colors text-center"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#BA7A6A] dark:text-[#E8A290]" />
                <span>Abrir no Waze</span>
              </motion.a>
            </div>

          </motion.div>

          {/* Right Styled Interactive Map Visual */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-[#FAF9F6] dark:bg-[#1E293B] rounded-3xl overflow-hidden border border-[#D8BCB2] dark:border-slate-700 shadow-2xs relative flex flex-col justify-between"
          >
            {/* Embedded Google Maps View */}
            <div className="relative w-full h-[320px] sm:h-[360px] lg:h-[400px]">
              <iframe
                title="Localização Consultório Dra Manoela Maia Itaigara"
                src="https://maps.google.com/maps?q=Complexo%20Odonto%20M%C3%A9dico%20Itaigara,%20Av%20Ant%C3%B4nio%20Carlos%20Magalh%C3%A3es,%20585,%20Salvador&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'contrast(1.02) saturate(1.1)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              {/* Floating Map Pin Badge */}
              <div className="absolute top-4 left-4 bg-white/95 dark:bg-[#1E293B]/95 backdrop-blur-md rounded-2xl py-2 px-3.5 border border-[#D8BCB2] dark:border-slate-700 shadow-md flex items-center gap-2 z-10 pointer-events-none">
                <div className="w-7 h-7 rounded-full bg-[#FAF0EC] dark:bg-slate-800 text-[#BA7A6A] dark:text-[#E8A290] flex items-center justify-center shrink-0">
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#1E293B] dark:text-slate-100 leading-tight">Odonto-Médico Itaigara</div>
                  <div className="text-[10px] text-[#475569] dark:text-slate-300">Sala 703 · 7º Andar</div>
                </div>
              </div>
            </div>

            {/* Bottom Hospital Infrastructure Highlights */}
            <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 border-t border-[#D8BCB2]/70 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-[#475569] dark:text-slate-300">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                Portaria com identificação segura
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#BA7A6A] dark:bg-[#E8A290]" />
                Estacionamento rotativo coberto
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#6366F1]" />
                Acessibilidade total para cadeirantes
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
