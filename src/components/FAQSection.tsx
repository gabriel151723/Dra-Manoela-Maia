import React, { useState, useCallback } from 'react';
import { ChevronDown, MessageCircle, HelpCircle, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { buildWhatsAppUrl, trackEvent, DOCTOR_NAME } from '../utils/analytics';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS_DATA: FaqItem[] = [
  {
    id: 'localizacao',
    question: 'Onde fica localizado o consultório da Dra. Manoela Maia?',
    answer: 'Nosso consultório está localizado no tradicional Complexo Odonto-Médico Itaigara, na Sala 703 — Av. Antônio Carlos Magalhães, 585, Itaigara, Salvador - BA. O edifício conta com portaria com identificação biométrica, elevadores inteligentes e estacionamento rotativo coberto com manobrista.'
  },
  {
    id: 'avaliacao-inicial',
    question: 'Como funciona a primeira consulta de avaliação?',
    answer: 'A consulta de avaliação é um momento exclusivo com duração aproximada de 1 hora. Realizamos um mapeamento anatômico e visagista completo da face e do sorriso, registro fotográfico em alta resolução e o planejamento de um protocolo sob medida para as suas expectativas, priorizando resultados naturais e seguros.'
  },
  {
    id: 'convenio-reembolso',
    question: 'O consultório atende por convênio ou planos de saúde?',
    answer: 'Para garantir o mais alto padrão de biossegurança, tempo dedicado sem pressa e materiais de padrão internacional (Botox®, Juvederm®, Restylane®), nossos atendimentos são estritamente particulares. Emitimos nota fiscal detalhada e relatório técnico completo para você solicitar o reembolso junto ao seu plano de saúde.'
  },
  {
    id: 'procedimentos-realizados',
    question: 'Quais os procedimentos de Harmonização e Odontologia realizados?',
    answer: 'Realizamos Harmonização Orofacial completa (aplicação de toxina botulínica / Botox, preenchimento com ácido hialurônico em lábios, olheiras, mandíbula e malar, bioestimuladores de colágeno como Radiesse e Sculptra, fios de sustentação e Skinbooster) e Odontologia Estética (facetas em resina e porcelana, lentes de contato e clareamento dental).'
  },
  {
    id: 'anestesia-dor',
    question: 'Os procedimentos no consultório causam dor ou desconforto?',
    answer: 'O conforto do paciente é prioridade absoluta. Utilizamos anestésicos tópicos hospitalares de alta eficácia e bloqueios odontológicos locais refinados para tornar praticamente qualquer procedimento indolor. Pacientes com sensibilidade ou fobia recebem acolhimento personalizado.'
  },
  {
    id: 'recuperacao-rotina',
    question: 'Posso voltar às minhas atividades normais no mesmo dia?',
    answer: 'A maioria dos procedimentos de harmonização permite retorno imediato ao trabalho e às atividades rotineiras leves. Recomendamos apenas evitar esforço físico intenso nas primeiras 24 a 48 horas e evitar exposição solar direta sem filtro solar.'
  },
  {
    id: 'durabilidade-resultados',
    question: 'Qual a durabilidade média dos resultados da Harmonização Orofacial?',
    answer: 'A toxina botulínica possui durabilidade média de 4 a 6 meses. Já os preenchimentos com ácido hialurônico variam de 12 a 18 meses, dependendo da região e do metabolismo individual. Os bioestimuladores continuam estimulando a neoformação de colágeno por até 2 anos.'
  },
  {
    id: 'como-agendar',
    question: 'Como faço para agendar minha consulta de avaliação no Itaigara?',
    answer: 'O agendamento é feito de forma rápida e humanizada diretamente com a nossa equipe via WhatsApp. Basta clicar no botão de agendamento na página para escolher o dia e período mais convenientes para você.'
  }
];

export const FAQSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('localizacao');

  // Sound and haptic toggle
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('faq_page_sound_enabled');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const triggerFeedback = useCallback((type: 'open' | 'close' = 'open') => {
    if (!soundEnabled) return;

    // Web Audio Micro Sound
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        const baseFreq = type === 'close' ? 440 : 620;
        const endFreq = type === 'close' ? 320 : 760;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + 0.035);

        gain.gain.setValueAtTime(0.025, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.038);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.04);

        setTimeout(() => {
          ctx.close().catch(() => {});
        }, 120);
      }
    } catch {
      // Audio not supported
    }

    // Haptic vibration
    try {
      if ('vibrate' in navigator && typeof navigator.vibrate === 'function') {
        navigator.vibrate(10);
      }
    } catch {
      // Ignore
    }
  }, [soundEnabled]);

  const toggleSound = () => {
    setSoundEnabled(prev => {
      const next = !prev;
      try {
        localStorage.setItem('faq_page_sound_enabled', String(next));
      } catch {
        // Ignore
      }
      return next;
    });
  };

  const handleToggle = (id: string) => {
    const isCurrentlyOpen = openFaqId === id;
    triggerFeedback(isCurrentlyOpen ? 'close' : 'open');
    setOpenFaqId(prev => (prev === id ? null : id));
    trackEvent('page_faq_accordion_toggled', { faq_id: id, state: isCurrentlyOpen ? 'closed' : 'opened' });
  };

  const handleWhatsAppCta = () => {
    trackEvent('lead_conversion_attempt', {
      cta_location: 'faq_section_footer_cta',
      action: 'duvidas_frequentes_whatsapp'
    });
    const url = buildWhatsAppUrl(`Olá ${DOCTOR_NAME}! Estive na seção de Dúvidas Frequentes do seu site e gostaria de esclarecer uma dúvida personalizada.`);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-[#FAF9F6] dark:bg-[#0B0F19] border-t border-[#D8BCB2] dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Reveal */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0EC] dark:bg-slate-800 text-[#8C5243] dark:text-[#E8A290] text-xs font-bold uppercase tracking-wider mb-3 border border-[#D8BCB2] dark:border-slate-700">
            <HelpCircle className="w-3.5 h-3.5 text-[#BA7A6A] dark:text-[#E8A290]" />
            <span>Transparência e Cuidado</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E293B] dark:text-slate-100 tracking-tight leading-tight">
            Dúvidas Frequentes
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#475569] dark:text-slate-300 leading-relaxed">
            Respostas claras para as principais perguntas sobre atendimentos, procedimentos, segurança e agendamento no consultório.
          </p>

          {/* Sound & Haptic toggle pill */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#475569] dark:text-slate-300 font-medium">
            <span>Feedback tátil & sonoro ao clicar:</span>
            <button
              onClick={toggleSound}
              type="button"
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer border ${
                soundEnabled
                  ? 'bg-[#FAF2EE] dark:bg-slate-800 text-[#BA7A6A] dark:text-[#E8A290] border-[#D8BCB2] dark:border-slate-700'
                  : 'bg-white dark:bg-slate-900 text-[#64748B] dark:text-slate-400 border-[#D8BCB2] dark:border-slate-700'
              }`}
              title={soundEnabled ? 'Clique para silenciar sons' : 'Clique para ativar sons'}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Ativado</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Desativado</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Accordion List with Staggered Framer Motion items */}
        <div className="space-y-3">
          {FAQS_DATA.map((item, index) => {
            const isOpen = openFaqId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-white dark:bg-[#1E293B] border-[#BA7A6A] dark:border-[#E8A290] shadow-sm'
                    : 'bg-white/90 dark:bg-[#1E293B]/70 border-[#D8BCB2] dark:border-slate-700 hover:border-[#BA7A6A] dark:hover:border-slate-600'
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleToggle(item.id)}
                  aria-expanded={isOpen}
                  className="w-full px-5 py-4 sm:px-6 sm:py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-mono font-bold transition-colors ${
                      isOpen ? 'text-[#BA7A6A] dark:text-[#E8A290]' : 'text-[#8C5243] dark:text-[#E8A290]'
                    }`}>
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <span className={`text-sm sm:text-base font-bold leading-snug transition-colors ${
                      isOpen
                        ? 'text-[#8C5243] dark:text-[#FAD5CB]'
                        : 'text-[#1E293B] dark:text-slate-100 hover:text-[#BA7A6A] dark:hover:text-[#E8A290]'
                    }`}>
                      {item.question}
                    </span>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen
                      ? 'bg-[#FAF0EC] dark:bg-slate-800 text-[#BA7A6A] dark:text-[#E8A290] rotate-180'
                      : 'bg-[#FAF0EC] dark:bg-slate-800 text-[#8C5243] dark:text-[#E8A290]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key={`faq-content-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 border-t border-[#D8BCB2]/50 dark:border-slate-700/80">
                        <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 leading-relaxed pl-7">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Banner at bottom of FAQ with Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 sm:mt-12 rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#FAF2EE] via-[#F5E6E0] to-[#FAF2EE] dark:from-slate-900 dark:via-[#1E293B] dark:to-slate-900 border border-[#D8BCB2] dark:border-slate-700 text-center shadow-2xs"
        >
          <p className="text-xs font-bold uppercase tracking-wider text-[#965A4B] dark:text-[#E8A290] mb-1.5">
            Ainda tem alguma dúvida específica?
          </p>
          <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#1E293B] dark:text-slate-100 mb-2">
            Fale Diretamente com a Equipe da Dra. Manoela
          </h3>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 max-w-lg mx-auto mb-5 leading-relaxed">
            Estamos prontos para explicar cada etapa dos procedimentos e ajudar você a encontrar o melhor horário no consultório Itaigara.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleWhatsAppCta}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] transition-all duration-200 shadow-2xs hover:shadow-sm cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Tirar Dúvida no WhatsApp</span>
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};
