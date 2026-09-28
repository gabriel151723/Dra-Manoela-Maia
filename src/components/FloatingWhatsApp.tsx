import React, { useState, useEffect } from 'react';
import { MessageCircle, X, HelpCircle, ArrowDown, Lock, Tag, MapPin, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { buildWhatsAppUrl, trackEvent, DOCTOR_NAME } from '../utils/analytics';
import { DoctorPhoto } from './DoctorPhoto';

interface FloatingWhatsAppProps {
  theme?: 'light' | 'dark';
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ theme }) => {
  const [showGreetingPopup, setShowGreetingPopup] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [activeQuickActionId, setActiveQuickActionId] = useState<string | null>(null);
  const [hasUnreadBadge, setHasUnreadBadge] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('whatsapp_greeting_read') !== 'true';
    }
    return true;
  });

  // Fallback dark detection if not provided via prop
  const [systemDark, setSystemDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setSystemDark(e.matches);
    };
    mediaQuery.addEventListener('change', handleThemeChange);
    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

  const isDark = theme ? theme === 'dark' : systemDark;

  useEffect(() => {
    // 5 seconds dwell trigger for welcoming concierge greeting
    const timer = setTimeout(() => {
      if (!hasInteracted && hasUnreadBadge) {
        setShowGreetingPopup(true);
        trackEvent('concierge_greeting_displayed', {
          dwell_seconds: 5,
          location: 'floating_whatsapp'
        });
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [hasInteracted, hasUnreadBadge]);

  const markMessageAsRead = () => {
    setHasUnreadBadge(false);
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('whatsapp_greeting_read', 'true');
      } catch {
        // Safe fallback in restricted environments
      }
    }
  };

  const handleOpenWhatsApp = (customMsg?: string) => {
    setHasInteracted(true);
    setShowGreetingPopup(false);
    markMessageAsRead();
    trackEvent('lead_conversion_attempt', {
      cta_location: 'floating_whatsapp_button',
      action: 'whatsapp_flutuante_clique'
    });
    const defaultMsg = `Olá ${DOCTOR_NAME}! Estive no seu site e gostaria de agendar uma consulta de avaliação no consultório Itaigara.`;
    const url = buildWhatsAppUrl(customMsg || defaultMsg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleQuickAction = (topicId: string, customMsg: string) => {
    if (activeQuickActionId) return; // Prevent double taps during transition
    setActiveQuickActionId(topicId);

    trackEvent('lead_conversion_attempt', {
      cta_location: 'popup_quick_action',
      topic: topicId,
      action: `quick_action_${topicId}`
    });

    const url = buildWhatsAppUrl(customMsg);

    // Visual confirmation state (scale 0.95 + brightness change) before closing and opening WhatsApp
    setTimeout(() => {
      setHasInteracted(true);
      setShowGreetingPopup(false);
      markMessageAsRead();
      setActiveQuickActionId(null);
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 220);
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackEvent('greeting_popup_dismissed');
    setShowGreetingPopup(false);
    setHasInteracted(true);
    markMessageAsRead();
    setActiveQuickActionId(null);
  };

  const handleScrollToFAQ = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowGreetingPopup(false);
    setHasInteracted(true);
    markMessageAsRead();
    trackEvent('popup_nav_to_faq_clicked');
    const element = document.getElementById('faq');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickActions = [
    {
      id: 'precos',
      label: 'Preços',
      icon: Tag,
      tooltip: 'Valores e condições de pagamento',
      message: `Olá ${DOCTOR_NAME}! Gostaria de saber mais sobre a média de valores e formas de pagamento dos procedimentos.`
    },
    {
      id: 'localizacao',
      label: 'Localização',
      icon: MapPin,
      tooltip: 'Endereço e acesso no Itaigara',
      message: `Olá ${DOCTOR_NAME}! Gostaria de confirmar a localização do consultório no Complexo Odonto-Médico Itaigara e informações sobre o estacionamento.`
    },
    {
      id: 'agendar',
      label: 'Agendar',
      icon: Calendar,
      tooltip: 'Consultar horários disponíveis',
      message: `Olá ${DOCTOR_NAME}! Gostaria de verificar os horários disponíveis para agendar minha avaliação inicial.`
    }
  ];

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      
      {/* Concierge Greeting Card (Clean & Focused) */}
      <AnimatePresence>
        {showGreetingPopup && (
          <motion.div
            key="concierge-greeting-popup"
            initial={{ opacity: 0, scale: 0.75, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.82,
              y: 14,
              transition: { duration: 0.2, ease: [0.32, 0, 0.67, 0] }
            }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              mass: 0.8
            }}
            style={{ transformOrigin: 'bottom right' }}
            className={`mb-3 w-[calc(100vw-28px)] min-[350px]:w-[calc(100vw-40px)] sm:w-80 max-w-[320px] backdrop-blur-md p-3 min-[350px]:p-4.5 max-[350px]:p-3 rounded-xl min-[350px]:rounded-2xl max-[350px]:rounded-xl relative origin-bottom-right transition-all duration-300 ${
              isDark
                ? 'bg-[#0F172A]/96 border border-slate-700/80 ring-1 ring-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] text-slate-100'
                : 'bg-white/98 border border-[#D8BCB2] ring-1 ring-black/5 shadow-[0_22px_50px_-10px_rgba(30,41,59,0.22),0_8px_20px_-4px_rgba(186,122,106,0.15)] text-slate-900'
            }`}
          >
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className={`absolute top-2 right-2 min-[350px]:top-2.5 min-[350px]:right-2.5 p-1 rounded-full transition-colors z-10 cursor-pointer ${
                isDark
                  ? 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                  : 'text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100'
              }`}
              aria-label="Fechar saudação"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Clinician Header with real avatar */}
            <div className="flex items-center gap-2.5 min-[350px]:gap-3 mb-2.5 min-[350px]:mb-3 pr-6">
              <div className={`w-8.5 h-8.5 min-[350px]:w-9 min-[350px]:h-9 rounded-full overflow-hidden border shrink-0 ${
                isDark ? 'border-[#E8A290]/40' : 'border-[#BA7A6A]/30'
              }`}>
                <DoctorPhoto variant="avatar" className="w-full h-full" />
              </div>
              <div>
                <p className={`text-xs font-bold leading-tight ${isDark ? 'text-slate-100' : 'text-[#1E293B]'}`}>
                  {DOCTOR_NAME}
                </p>
                <p className="text-[10px] text-[#10B981] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block animate-pulse" />
                  Atendimento no consultório
                </p>
              </div>
            </div>

            {/* Friendly Greeting Message */}
            <p className={`text-[11px] min-[350px]:text-xs leading-relaxed mb-2.5 min-[350px]:mb-3 ${isDark ? 'text-slate-300' : 'text-[#475569]'}`}>
              Olá! ✨ Seja bem-vindo(a). Gostaria de tirar dúvidas sobre os procedimentos ou verificar horários para sua avaliação?
            </p>

            {/* Quick Access Buttons for Common Questions */}
            <div className="mb-2.5 min-[350px]:mb-3">
              <div className="flex items-center justify-between text-[10px] font-semibold mb-1 text-[#64748B] dark:text-slate-400">
                <span>Dúvidas frequentes:</span>
                <span className="text-[9px] text-[#BA7A6A] dark:text-[#E8A290]">Toque para falar</span>
              </div>
              <motion.div
                className="grid grid-cols-3 gap-1 min-[350px]:gap-1.5"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.12
                    }
                  }
                }}
              >
                {quickActions.map((qa) => {
                  const Icon = qa.icon;
                  const isSelected = activeQuickActionId === qa.id;
                  return (
                    <motion.button
                      key={qa.id}
                      type="button"
                      variants={{
                        hidden: { opacity: 0, y: 8, scale: 0.94 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: {
                            duration: 0.25,
                            ease: [0.16, 1, 0.3, 1]
                          }
                        }
                      }}
                      whileHover={!activeQuickActionId ? { scale: 1.03 } : undefined}
                      whileTap={{ scale: 0.95 }}
                      animate={
                        isSelected
                          ? { scale: 0.95, filter: 'brightness(1.22)' }
                          : { scale: 1, filter: 'brightness(1)' }
                      }
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      onClick={() => handleQuickAction(qa.id, qa.message)}
                      className={`py-1.5 min-[350px]:py-2 px-1 min-[350px]:px-1.5 rounded-lg min-[350px]:rounded-xl text-center text-[10px] min-[350px]:text-[11px] font-semibold flex flex-col items-center justify-center gap-0.5 min-[350px]:gap-1 transition-all border cursor-pointer ${
                        isSelected
                          ? isDark
                            ? 'bg-[#BA7A6A]/30 text-white border-[#E8A290] ring-2 ring-[#E8A290]/60 shadow-inner'
                            : 'bg-[#FAF0EC] text-[#965A4B] border-[#BA7A6A] ring-2 ring-[#BA7A6A]/50 shadow-inner'
                          : isDark
                            ? 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border-slate-700/80 hover:border-[#E8A290]/60'
                            : 'bg-[#FAF6F4] hover:bg-[#FAF0EC] text-[#334155] border-[#E8D5CE] hover:border-[#BA7A6A]/60'
                      }`}
                      title={qa.tooltip}
                    >
                      <Icon className={`w-3.5 h-3.5 transition-transform duration-150 ${
                        isSelected ? 'scale-110 text-[#BA7A6A] dark:text-[#E8A290]' : 'text-[#BA7A6A] dark:text-[#E8A290]'
                      }`} />
                      <span className="leading-tight">{qa.label}</span>
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <motion.button
              whileTap={{ scale: 0.95, backgroundColor: '#1da851' }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.12 }}
              onClick={() => handleOpenWhatsApp()}
              className="w-full py-2 min-[350px]:py-2.5 px-3 min-[350px]:px-3.5 rounded-lg min-[350px]:rounded-xl bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1da851] text-white text-[11px] min-[350px]:text-xs font-semibold flex items-center justify-center gap-1.5 min-[350px]:gap-2 shadow-xs hover:shadow-md transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Falar no WhatsApp</span>
            </motion.button>

            {/* Confidentiality & Security Trust Badge */}
            <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-[#64748B] dark:text-slate-400 font-medium select-none">
              <Lock className="w-3 h-3 text-[#10B981] dark:text-[#34D399] shrink-0" />
              <span>Ambiente seguro e confidencial</span>
            </div>

            {/* Link to FAQ section at the bottom of the page */}
            <div className="mt-2.5 pt-2.5 border-t border-[#E8D5CE]/40 dark:border-slate-800 text-center">
              <button
                onClick={handleScrollToFAQ}
                className={`inline-flex items-center gap-1.5 text-[11px] font-medium transition-colors cursor-pointer ${
                  isDark ? 'text-[#E8A290] hover:text-white' : 'text-[#BA7A6A] hover:text-[#965A4B]'
                }`}
              >
                <HelpCircle className="w-3 h-3" />
                <span>Ver dúvidas frequentes no site</span>
                <ArrowDown className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating WhatsApp Button */}
      <motion.button
        animate={{
          y: [0, -6, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => handleOpenWhatsApp()}
        className="group relative flex items-center justify-center w-14 h-14 sm:w-15 sm:h-15 rounded-[22px] sm:rounded-[26px] bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[0_8px_25px_-4px_rgba(37,211,102,0.5)] hover:shadow-[0_12px_30px_-4px_rgba(37,211,102,0.7)] transition-shadow duration-300 cursor-pointer"
        aria-label="Falar no WhatsApp com a Dra. Manoela Maia"
      >
        {/* Subtle Pulse Rings */}
        <span className="absolute -inset-1 rounded-[25px] sm:rounded-[29px] bg-[#25D366]/25 animate-ping-slow pointer-events-none" />
        
        {/* Unread Message Notification Dot - disappears smoothly when greeting message is closed or read */}
        <AnimatePresence>
          {hasUnreadBadge && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute top-0 right-0 flex h-4 w-4"
              aria-label="1 nova mensagem não lida"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E11D48] opacity-75 pointer-events-none"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#E11D48] text-[9px] font-bold text-white items-center justify-center border-2 border-white shadow-xs">
                1
              </span>
            </motion.span>
          )}
        </AnimatePresence>

        {/* WhatsApp Icon */}
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-white transition-transform group-hover:scale-110" />
      </motion.button>

    </div>
  );
};
