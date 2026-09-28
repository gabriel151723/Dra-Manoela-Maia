import React from 'react';
import { MessageCircle, MapPin, Phone, Instagram, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { WHATSAPP_DISPLAY, CLINIC_ADDRESS, INSTAGRAM_URL, buildWhatsAppUrl, trackEvent, DOCTOR_NAME, INSTAGRAM_HANDLE } from '../utils/analytics';
import { DoctorLogo } from './DoctorLogo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackEvent('footer_scroll_top');
  };

  return (
    <footer className="bg-[#FAF2EE] dark:bg-[#070A11] border-t border-[#D8BCB2] dark:border-slate-800 text-[#1E293B] dark:text-slate-100 pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#D8BCB2]/70 dark:border-slate-800"
        >
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full overflow-hidden shadow-xs border border-[#D8BCB2] dark:border-slate-700 flex items-center justify-center shrink-0 bg-[#0E8E89]">
                <DoctorLogo className="w-full h-full" showText={false} />
              </div>
              <div className="flex flex-col">
                <span className="font-serif-luxury text-2xl font-semibold tracking-wider text-[#1E293B] dark:text-slate-100">
                  DRA. MANOELA MAIA
                </span>
                <span className="text-[9px] tracking-[0.18em] uppercase text-[#965A4B] dark:text-[#E8A290] -mt-1 font-semibold">
                  Harmonização Orofacial & Estética Dental
                </span>
              </div>
            </div>

            <p className="text-xs text-[#475569] dark:text-slate-300 leading-relaxed max-w-sm mb-6">
              Harmonia entre estética do sorriso e rejuvenescimento facial natural, com técnicas avançadas e cuidado acolhedor no Complexo Odonto-Médico Itaigara em Salvador.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('social_click', { network: 'instagram' })}
                className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 border border-[#D8BCB2] dark:border-slate-700 hover:border-[#BA7A6A] dark:hover:border-[#E8A290] text-[#1E293B] dark:text-slate-200 hover:text-[#BA7A6A] dark:hover:text-[#E8A290] flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                aria-label={`Instagram de ${DOCTOR_NAME}`}
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={buildWhatsAppUrl(`Olá ${DOCTOR_NAME}! Gostaria de falar com o consultório.`)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('social_click', { network: 'whatsapp' })}
                className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 border border-[#D8BCB2] dark:border-slate-700 hover:border-[#BA7A6A] dark:hover:border-[#E8A290] text-[#1E293B] dark:text-slate-200 hover:text-[#25D366] flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#965A4B] dark:text-[#E8A290] mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs text-[#475569] dark:text-slate-300">
              <li>
                <a href="#inicio" className="hover:text-[#BA7A6A] dark:hover:text-[#E8A290] transition-colors">Início</a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-[#BA7A6A] dark:hover:text-[#E8A290] transition-colors">Sobre a Dra. Manoela</a>
              </li>
              <li>
                <a href="#procedimentos" className="hover:text-[#BA7A6A] dark:hover:text-[#E8A290] transition-colors">Procedimentos</a>
              </li>
              <li>
                <a href="#diferenciais" className="hover:text-[#BA7A6A] dark:hover:text-[#E8A290] transition-colors">Diferenciais</a>
              </li>
              <li>
                <a href="#avaliacoes" className="hover:text-[#BA7A6A] dark:hover:text-[#E8A290] transition-colors">Depoimentos</a>
              </li>
              <li>
                <a href="#localizacao" className="hover:text-[#BA7A6A] dark:hover:text-[#E8A290] transition-colors">Localização & Rotas</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#BA7A6A] dark:hover:text-[#E8A290] transition-colors font-medium">Dúvidas Frequentes</a>
              </li>
            </ul>
          </div>

          {/* Procedures Menu */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#965A4B] dark:text-[#E8A290] mb-4">
              Principais Tratamentos
            </h4>
            <ul className="space-y-2.5 text-xs text-[#475569] dark:text-slate-300">
              <li>
                <a href="#procedimentos" className="hover:text-[#BA7A6A] dark:hover:text-[#E8A290] transition-colors">Harmonização Facial Estruturada (HOF)</a>
              </li>
              <li>
                <a href="#procedimentos" className="hover:text-[#BA7A6A] dark:hover:text-[#E8A290] transition-colors">Lentes de Contato Dental & Facetas</a>
              </li>
              <li>
                <a href="#procedimentos" className="hover:text-[#BA7A6A] dark:hover:text-[#E8A290] transition-colors">Toxina Botulínica (Botox)</a>
              </li>
              <li>
                <a href="#procedimentos" className="hover:text-[#BA7A6A] dark:hover:text-[#E8A290] transition-colors">Preenchimento & Escultura Labial</a>
              </li>
              <li>
                <a href="#procedimentos" className="hover:text-[#BA7A6A] dark:hover:text-[#E8A290] transition-colors">Bioestimuladores de Colágeno</a>
              </li>
              <li>
                <a href="#procedimentos" className="hover:text-[#BA7A6A] dark:hover:text-[#E8A290] transition-colors">Clareamento Dental em Consultório</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#965A4B] dark:text-[#E8A290] mb-4">
              Contato & Consultório
            </h4>
            <div className="space-y-3 text-xs text-[#475569] dark:text-slate-300">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#BA7A6A] dark:text-[#E8A290] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#1E293B] dark:text-slate-100">{WHATSAPP_DISPLAY}</p>
                  <p className="text-[11px] text-[#64748B] dark:text-slate-400">WhatsApp para agendamentos</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Instagram className="w-4 h-4 text-[#BA7A6A] dark:text-[#E8A290] shrink-0 mt-0.5" />
                <div>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#1E293B] dark:text-slate-100 hover:text-[#BA7A6A] dark:hover:text-[#E8A290]"
                  >
                    {INSTAGRAM_HANDLE}
                  </a>
                  <p className="text-[11px] text-[#64748B] dark:text-slate-400">Instagram Oficial</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#BA7A6A] dark:text-[#E8A290] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#1E293B] dark:text-slate-100">{CLINIC_ADDRESS}</p>
                </div>
              </div>
            </div>
          </div>

        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#64748B] dark:text-slate-400">
          <p>© {new Date().getFullYear()} {DOCTOR_NAME} · Harmonização Orofacial & Estética Dental. CRO-BA.</p>
          <div className="flex items-center gap-4">
            <span className="text-[#64748B] dark:text-slate-400">Complexo Odonto-Médico Itaigara · Salvador - BA</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white dark:bg-slate-800 border border-[#D8BCB2] dark:border-slate-700 hover:border-[#BA7A6A] dark:hover:border-[#E8A290] text-[#1E293B] dark:text-slate-200 hover:text-[#BA7A6A] dark:hover:text-[#E8A290] transition-colors cursor-pointer"
              aria-label="Voltar ao topo"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
