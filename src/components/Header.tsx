import React, { useState, useEffect } from 'react';
import { MessageCircle, Menu, X, ArrowUpRight, Moon, Sun } from 'lucide-react';
import { motion, useScroll, useSpring } from 'motion/react';
import { trackEvent, WHATSAPP_DISPLAY, buildWhatsAppUrl, DOCTOR_NAME } from '../utils/analytics';
import { DoctorLogo } from './DoctorLogo';

interface HeaderProps {
  onOpenSchedule: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSchedule, theme, onToggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('inicio');

  // Framer Motion scroll tracking with spring easing for the reading progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 24,
    restDelta: 0.001
  });

  const navLinks = [
    { id: 'inicio', label: 'Início', href: '#inicio' },
    { id: 'sobre', label: 'Sobre a Dra. Manoela', href: '#sobre' },
    { id: 'procedimentos', label: 'Procedimentos', href: '#procedimentos' },
    { id: 'diferenciais', label: 'Diferenciais', href: '#diferenciais' },
    { id: 'avaliacoes', label: 'Depoimentos', href: '#avaliacoes' },
    { id: 'localizacao', label: 'Localização', href: '#localizacao' },
    { id: 'faq', label: 'Dúvidas', href: '#faq' }
  ];

  // ScrollSpy Mechanism: calculates current section in viewport
  useEffect(() => {
    const sectionIds = ['inicio', 'sobre', 'procedimentos', 'diferenciais', 'avaliacoes', 'localizacao', 'faq'];

    const handleScrollSpy = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 15);

      const headerOffset = 80;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // When reaching near the bottom of the page, highlight the last section (faq)
      if (windowHeight + scrollY >= documentHeight - 60) {
        setActiveSection('faq');
        return;
      }

      let currentId = 'inicio';
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop - headerOffset - 20;
          if (scrollY >= top) {
            currentId = id;
          }
        }
      }
      setActiveSection(currentId);
    };

    handleScrollSpy();
    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    window.addEventListener('resize', handleScrollSpy, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScrollSpy);
      window.removeEventListener('resize', handleScrollSpy);
    };
  }, []);

  const handleCtaClick = () => {
    trackEvent('cta_click', {
      cta_location: 'header_main_button',
      action: 'agendar_avaliacao'
    });
    onOpenSchedule();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF9F6]/95 dark:bg-[#0F172A]/95 backdrop-blur-md shadow-[0_4px_16px_-8px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_16px_-8px_rgba(0,0,0,0.5)] border-b border-[#D8BCB2]/70 dark:border-slate-800 py-1.5 sm:py-2'
          : 'bg-[#FAF9F6]/90 dark:bg-[#0B0F19]/90 backdrop-blur-xs border-b border-[#D8BCB2]/40 dark:border-slate-800/60 py-2 sm:py-2.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Wordmark & Logo */}
          <a
            href="#inicio"
            className="group flex items-center gap-2 focus:outline-hidden"
            onClick={() => {
              setActiveSection('inicio');
              trackEvent('navigation_click', { target: 'logo_home' });
            }}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden shadow-xs border border-[#D8BCB2] dark:border-slate-700 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0 bg-[#0E8E89]">
              <DoctorLogo className="w-full h-full" showText={false} />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-luxury text-lg sm:text-xl font-semibold tracking-wide text-[#1E293B] dark:text-slate-100 leading-tight">
                DRA. MANOELA MAIA
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.16em] uppercase text-[#965A4B] dark:text-[#E8A290] font-semibold leading-tight">
                Harmonização Orofacial & Estética Dental
              </span>
            </div>
          </a>

          {/* Desktop Navigation with Animated ScrollSpy Indicator */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            <nav className="flex items-center gap-1 xl:gap-1.5 text-xs font-semibold tracking-wide" aria-label="Navegação Principal">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    className={`relative px-2.5 py-1 rounded-full transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? 'text-[#8C5243] dark:text-[#FAD5CB] font-bold'
                        : 'text-[#475569] dark:text-slate-300 hover:text-[#BA7A6A] dark:hover:text-[#E8A290]'
                    }`}
                    onClick={() => {
                      setActiveSection(link.id);
                      trackEvent('navigation_click', { target: link.label });
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {/* Framer Motion Spring Pill for Active Section */}
                    {isActive && (
                      <motion.span
                        layoutId="scrollspy-active-indicator"
                        className="absolute inset-0 bg-[#FAF0EC] dark:bg-slate-800 rounded-full border border-[#D8BCB2] dark:border-slate-700/80 -z-10 shadow-2xs"
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Dark Mode Manual Toggle */}
            <button
              onClick={onToggleTheme}
              type="button"
              className="p-1.5 rounded-full text-[#475569] dark:text-slate-300 hover:text-[#BA7A6A] dark:hover:text-[#E8A290] hover:bg-[#FAF0EC] dark:hover:bg-slate-800 transition-colors cursor-pointer border border-transparent hover:border-[#D8BCB2] dark:hover:border-slate-700 ml-1"
              title={theme === 'dark' ? 'Alternar para Modo Claro' : 'Alternar para Modo Escuro'}
              aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-[#E8A290]" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-[#8C5243]" />
              )}
            </button>
          </div>

          {/* Right Action Zone: Operational Status + CTA + Mobile controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Operational Status (CRO trust element) */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#10B981]/10 dark:bg-[#10B981]/15 border border-[#10B981]/25 text-[10px] sm:text-[11px] font-semibold text-[#047857] dark:text-[#34D399]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#10B981]"></span>
              </span>
              <span>Atendimento Aberto</span>
            </div>

            {/* Direct WhatsApp CTA Button */}
            <button
              onClick={handleCtaClick}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide text-white bg-[#BA7A6A] hover:bg-[#A66757] dark:bg-[#A66757] dark:hover:bg-[#8C5243] transition-all duration-200 shadow-[0_2px_10px_-2px_rgba(186,122,106,0.4)] hover:shadow-[0_4px_14px_-2px_rgba(186,122,106,0.5)] active:scale-[0.98] whitespace-nowrap cursor-pointer"
            >
              <span>Agendar Avaliação</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>

            {/* Mobile Theme Toggle */}
            <button
              onClick={onToggleTheme}
              type="button"
              className="lg:hidden p-1.5 rounded-lg text-[#1E293B] dark:text-slate-200 hover:bg-[#FAF0EC] dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title={theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[#E8A290]" /> : <Moon className="w-4 h-4 text-[#8C5243]" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg text-[#1E293B] dark:text-slate-200 hover:bg-[#FAF0EC] dark:hover:bg-slate-800 focus:outline-hidden cursor-pointer"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown with ScrollSpy Highlighting */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F6] dark:bg-[#0F172A] border-b border-[#D8BCB2] dark:border-slate-800 px-4 pt-2.5 pb-5 animate-in slide-in-from-top-3 duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#10B981]/10 dark:bg-[#10B981]/15 text-xs font-semibold text-[#047857] dark:text-[#34D399]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#10B981]"></span>
              </span>
              <span>Atendimento Aberto no WhatsApp</span>
            </div>

            <button
              onClick={onToggleTheme}
              type="button"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-[#D8BCB2] dark:border-slate-700 bg-white dark:bg-slate-800 text-[#475569] dark:text-slate-200"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-[#E8A290]" /> : <Moon className="w-3.5 h-3.5 text-[#8C5243]" />}
              <span>{theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}</span>
            </button>
          </div>

          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => {
                    setActiveSection(link.id);
                    setMobileMenuOpen(false);
                    trackEvent('mobile_nav_click', { target: link.label });
                  }}
                  className={`text-xs sm:text-sm font-semibold py-1.5 px-2.5 rounded-xl transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-[#FAF0EC] dark:bg-slate-800 text-[#8C5243] dark:text-[#FAD5CB] font-bold border-l-2 border-[#BA7A6A] dark:border-[#E8A290]'
                      : 'text-[#334155] dark:text-slate-200 hover:text-[#BA7A6A] dark:hover:text-[#E8A290]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#BA7A6A] dark:bg-[#E8A290]" />
                  )}
                </a>
              );
            })}

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleCtaClick();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#BA7A6A] text-white font-semibold text-xs tracking-wide shadow-sm cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Agendar Avaliação Direta</span>
              </button>
              <a
                href={buildWhatsAppUrl('Olá Dra. Manoela Maia! Gostaria de tirar uma dúvida sobre os procedimentos no consultório.')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('cta_click', { cta_location: 'mobile_menu_whatsapp_direct' })}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-[#BA7A6A] dark:border-[#E8A290] text-[#BA7A6A] dark:text-[#E8A290] font-semibold text-xs text-center cursor-pointer"
              >
                <span>Falar pelo WhatsApp: {WHATSAPP_DISPLAY}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Framer Motion Scroll Progress Bar (Fixa no fundo do Header) */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#BA7A6A] via-[#E8A290] to-[#BA7A6A] dark:from-[#BA7A6A] dark:via-[#FAD5CB] dark:to-[#E8A290] origin-left shadow-[0_1px_6px_rgba(186,122,106,0.5)] dark:shadow-[0_1px_6px_rgba(232,162,144,0.4)] pointer-events-none"
        style={{ scaleX }}
        role="progressbar"
        aria-label="Progresso de leitura da página"
      />
    </header>
  );
};
