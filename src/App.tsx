import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ProceduresGrid } from './components/ProceduresGrid';
import { Differentials } from './components/Differentials';
import { Testimonials } from './components/Testimonials';
import { LocationSection } from './components/LocationSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ScrollToTop } from './components/ScrollToTop';
import { ScheduleModal } from './components/ScheduleModal';
import { Procedure } from './data/procedures';
import { trackEvent } from './utils/analytics';

export default function App() {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null);

  // Global Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('site_theme');
        if (saved === 'dark' || saved === 'light') return saved;
      } catch {
        // Ignore storage errors
      }
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('site_theme', theme);
    } catch {
      // Ignore storage errors
    }
  }, [theme]);

  // Listen to system preference changes if user hasn't explicitly set preference
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      try {
        const saved = localStorage.getItem('site_theme');
        if (!saved) {
          setTheme(e.matches ? 'dark' : 'light');
        }
      } catch {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  // Dynamic OpenGraph og:url and canonical link setup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.origin + window.location.pathname;
      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (!ogUrl) {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrl);
      }
      ogUrl.setAttribute('content', currentUrl);

      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', currentUrl);
    }
  }, []);

  const handleToggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      trackEvent('theme_toggled', { theme: next });
      return next;
    });
  };

  const handleOpenSchedule = (procedure?: Procedure) => {
    setSelectedProcedure(procedure || null);
    setScheduleModalOpen(true);
  };

  const handleCloseSchedule = () => {
    setScheduleModalOpen(false);
    setSelectedProcedure(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0B0F19] text-[#1E293B] dark:text-slate-100 flex flex-col font-sans selection:bg-[#E8D5CE] selection:text-[#1E293B] transition-colors duration-300">
      {/* 1. Header Fixo Minimalista com Toggle de Tema no topo */}
      <Header
        onOpenSchedule={() => handleOpenSchedule()}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main className="flex-1">
        {/* 2. Hero Section (Dobra 01 - Alta Sofisticação) */}
        <Hero onOpenSchedule={() => handleOpenSchedule()} />

        {/* 3. About Us / Autoridade Profissional (Mano Maia) */}
        <About onOpenSchedule={() => handleOpenSchedule()} />

        {/* 4. Grid Interativo de Procedimentos */}
        <ProceduresGrid onSelectProcedure={(proc) => handleOpenSchedule(proc)} />

        {/* 5. Diferenciais e Rigor Técnico */}
        <Differentials />

        {/* 6. Prova Social Contundente (Google 5.0) */}
        <Testimonials />

        {/* 7. Localização e Rotas de Acesso (Complexo Odonto-Médico Itaigara) */}
        <LocationSection />

        {/* 8. Seção Completa de Dúvidas Frequentes (Última seção do site antes do rodapé) */}
        <FAQSection />
      </main>

      {/* 9. Rodapé Institucional */}
      <Footer />

      {/* 10. Botão Flutuante do WhatsApp */}
      <FloatingWhatsApp theme={theme} />

      {/* 11. Botão Flutuante 'Voltar ao Topo' (surge ao rolar a página) */}
      <ScrollToTop />

      {/* 12. Modal Interativo de Agendamento */}
      <ScheduleModal
        isOpen={scheduleModalOpen}
        onClose={handleCloseSchedule}
        initialProcedure={selectedProcedure}
      />
    </div>
  );
}
