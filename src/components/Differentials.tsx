import React from 'react';
import { ShieldCheck, Building2, Stethoscope, Microscope, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { trackEvent, buildWhatsAppUrl } from '../utils/analytics';
import { PillarVisual } from './PillarVisual';

export const Differentials: React.FC = () => {
  const handleFacilityCta = () => {
    trackEvent('facility_cta_click', {
      action: 'agendar_visita_consultorio'
    });
    const url = buildWhatsAppUrl('Olá Dra. Manoela Maia! Gostaria de agendar uma consulta no consultório do Complexo Odonto-Médico Itaigara.');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const pillars = [
    {
      id: 'visagismo-3d',
      tag: 'SCANNER 3D',
      icon: Microscope,
      title: 'Planejamento Visagista 3D',
      description: 'Análise global da dinâmica do sorriso, terços faciais e pontos de sustentação antes de qualquer procedimento invasivo.',
      imageSrc: '/visagismo_3d.jpg'
    },
    {
      id: 'produtos-originais',
      tag: '100% LACRADO',
      icon: ShieldCheck,
      title: '100% Produtos Originais',
      description: 'Utilização exclusiva das melhores marcas mundiais (Botox®, Juvederm®, Restylane®, Radiesse®) abertas na frente do paciente.',
      imageSrc: '/produtos_originais.jpg'
    },
    {
      id: 'odonto-medico-itaigara',
      tag: 'SALA 703',
      icon: Building2,
      title: 'Odonto-Médico Itaigara',
      description: 'Localização privilegiada na Sala 703 do Complexo Odonto-Médico Itaigara, com estacionamento privativo e infraestrutura hospitalar.',
      imageSrc: '/Itaigara Complexo.jpg'
    },
    {
      id: 'pos-24h',
      tag: 'SUPORTE 24H',
      icon: Stethoscope,
      title: 'Acompanhamento Pós 24h',
      description: 'Contato direto via WhatsApp para orientações pós-procedimento, retorno de revisão sem custos adicionais e segurança contínua.',
      imageSrc: '/pos_24h.jpg'
    }
  ];

  return (
    <section id="diferenciais" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#070A11] border-b border-[#D8BCB2] dark:border-slate-800 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading (Fade-in + Slide-up) */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs tracking-[0.25em] uppercase text-[#965A4B] dark:text-[#E8A290] font-bold block mb-2">
            RIGOR TÉCNICO & INFRAESTRUTURA
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1E293B] dark:text-slate-100 leading-tight mb-3 sm:mb-4">
            Por Que Escolher a Dra. Manoela Maia?
          </h2>
          <p className="text-sm sm:text-base text-[#475569] dark:text-slate-300">
            Consultório privativo no polo de saúde mais conceituado de Salvador, unindo biossegurança máxima, tecnologia diagnóstica e conforto.
          </p>
        </motion.div>

        {/* 4 Core Pillars Grid with Staggered Entrance and Bright Luxury Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-14 sm:mb-16">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-2xl overflow-hidden bg-[#FAF9F6] dark:bg-[#1E293B] border border-[#D8BCB2] dark:border-slate-700 hover:border-[#BA7A6A] dark:hover:border-[#E8A290] transition-all duration-300 shadow-2xs hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Dedicated Visual Image Banner */}
                  <div className="relative h-44 sm:h-48 w-full overflow-hidden rounded-t-2xl bg-[#FAF0EC] dark:bg-slate-800 border-b border-[#E8D5CE] dark:border-slate-700">
                    <PillarVisual
                      pillarId={pillar.id}
                      imageSrc={pillar.imageSrc}
                      title={pillar.title}
                    />

                    {/* Floating Badges Over Image */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-10">
                      {/* Icon Capsule */}
                      <div className="w-8.5 h-8.5 rounded-xl bg-white/95 dark:bg-slate-900/90 text-[#BA7A6A] dark:text-[#E8A290] border border-[#D8BCB2] dark:border-slate-700 flex items-center justify-center shadow-2xs backdrop-blur-xs">
                        <IconComponent className="w-4.5 h-4.5" />
                      </div>

                      {/* Tag Capsule */}
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#965A4B] dark:text-[#E8A290] bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-2xs border border-[#D8BCB2] dark:border-slate-700">
                        {pillar.tag}
                      </span>
                    </div>
                  </div>

                  {/* Card Content - Clean, Bright & Highly Readable */}
                  <div className="p-5 sm:p-6 text-left">
                    <h3 className="font-serif-luxury text-xl font-semibold text-[#1E293B] dark:text-slate-100 mb-2 leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#475569] dark:text-slate-300 leading-relaxed font-normal">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Facility Spotlight Banner (Fade-in + Slide-up) */}
        <motion.div 
          className="bg-gradient-to-r from-[#FAF2EE] via-[#F4E4DD] to-[#FAF2EE] dark:from-slate-900 dark:via-[#1E293B] dark:to-slate-900 rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#D8BCB2] dark:border-slate-700 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 shadow-xs"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-2xl text-left">
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#965A4B] dark:text-[#E8A290] block mb-2">
              SALA 703 · COMPLEXO ODONTO-MÉDICO ITAIGARA
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#1E293B] dark:text-slate-100 mb-3">
              Ambiente Projetado Para Sua Tranquilidade e Privacidade
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 leading-relaxed mb-6">
              Nosso consultório no Itaigara foi planejado para proporcionar uma experiência serena: atendimento com hora estritamente marcada, sem sala de espera cheia e com privacidade absoluta.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-[#1E293B] dark:text-slate-200">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#BA7A6A] dark:text-[#E8A290]" /> Poltrona odontológica com massagem e ergonomia</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#BA7A6A] dark:text-[#E8A290]" /> Ar condicionado com filtragem bacteriológica</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#BA7A6A] dark:text-[#E8A290]" /> Estacionamento coberto com manobrista</span>
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <button
              onClick={handleFacilityCta}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs font-semibold tracking-wide text-white bg-[#BA7A6A] hover:bg-[#A66757] dark:bg-[#A66757] dark:hover:bg-[#8C5243] transition-all shadow-xs cursor-pointer whitespace-nowrap hover:shadow-md"
            >
              Agendar Avaliação no Consultório
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
