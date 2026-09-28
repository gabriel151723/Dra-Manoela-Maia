import React, { useState } from 'react';
import { Procedure } from '../data/procedures';
import { Sparkles } from 'lucide-react';

interface ProcedureVisualProps {
  procedure: Procedure;
}

export const ProcedureVisual: React.FC<ProcedureVisualProps> = ({ procedure }) => {
  const { id, title, categoryLabel, highlightTag } = procedure;
  const [hasError, setHasError] = useState(false);
  const [customImage] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(`procedure_photo_${id}`);
    }
    return null;
  });

  const renderIllustration = () => {
    switch (id) {
      case 'harmonizacao-full-face':
        // Harmonização Facial Estruturada - Proporção Áurea, Vetores Zigomático, Mandíbula e Mento
        return (
          <svg viewBox="0 0 400 180" className="w-full h-full object-cover select-none pointer-events-none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="hof-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FAF1ED" />
                <stop offset="50%" stopColor="#F3E2DB" />
                <stop offset="100%" stopColor="#E9D0C5" />
              </linearGradient>
              <linearGradient id="gold-line" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#BA7A6A" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#BA7A6A" />
              </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#hof-bg)" />
            
            {/* Subtle background facial architecture grid */}
            <circle cx="210" cy="90" r="75" stroke="#BA7A6A" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.35" />
            <circle cx="210" cy="90" r="50" stroke="#BA7A6A" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.25" />
            <line x1="210" y1="10" x2="210" y2="170" stroke="#BA7A6A" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.3" />
            <line x1="120" y1="90" x2="300" y2="90" stroke="#BA7A6A" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.3" />

            {/* Profile silhouette & facial contour lines */}
            <path
              d="M175 35 C190 35, 205 42, 210 52 C214 60, 215 68, 220 75 C223 79, 230 83, 230 88 C230 92, 224 95, 226 99 C228 103, 232 106, 231 112 C230 118, 222 122, 220 128 C218 134, 223 140, 218 146 C213 152, 198 152, 185 146 C165 137, 150 115, 152 85 C154 58, 162 38, 175 35 Z"
              fill="#FFFFFF"
              fillOpacity="0.45"
              stroke="#BA7A6A"
              strokeWidth="1.5"
            />

            {/* Zygomatic, Mandibular & Mental Lifting Vectors */}
            {/* Malar/Zygomatic vector */}
            <path d="M190 85 L255 60" stroke="url(#gold-line)" strokeWidth="2" strokeLinecap="round" className="transition-all duration-300 group-hover:stroke-width-3" />
            <polygon points="258,60 250,56 252,64" fill="#BA7A6A" />
            <circle cx="190" cy="85" r="3.5" fill="#BA7A6A" />

            {/* Mandibular jawline vector */}
            <path d="M185 140 L260 115" stroke="url(#gold-line)" strokeWidth="2" strokeLinecap="round" />
            <polygon points="263,115 255,111 257,119" fill="#BA7A6A" />
            <circle cx="185" cy="140" r="3.5" fill="#BA7A6A" />

            {/* Chin/Mento projection */}
            <path d="M218 146 L245 152" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 2" />
            <circle cx="218" cy="146" r="3" fill="#D4AF37" />

            {/* Phi proportion calipers & tag */}
            <g transform="translate(270, 70)">
              <rect x="0" y="0" width="70" height="22" rx="11" fill="#FFFFFF" fillOpacity="0.85" stroke="#BA7A6A" strokeWidth="1" />
              <text x="35" y="14" textAnchor="middle" fill="#965A4B" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
                φ 1.618 HOF
              </text>
            </g>
            <g transform="translate(270, 100)">
              <rect x="0" y="0" width="70" height="20" rx="6" fill="#BA7A6A" fillOpacity="0.12" stroke="#BA7A6A" strokeWidth="0.8" />
              <text x="35" y="13" textAnchor="middle" fill="#965A4B" fontSize="8" fontWeight="600" fontFamily="sans-serif">
                VETOR LIFT
              </text>
            </g>
          </svg>
        );

      case 'lentes-facetas-dentais':
        // Lentes de Contato & Facetas Dentais - Dentes Anteriores com Brilho, Translúcido e Halo Incisal
        return (
          <svg viewBox="0 0 400 180" className="w-full h-full object-cover select-none pointer-events-none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="lentes-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDF8F5" />
                <stop offset="50%" stopColor="#F5E8E2" />
                <stop offset="100%" stopColor="#EBD7CF" />
              </linearGradient>
              <linearGradient id="enamel-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFF9F5" />
                <stop offset="65%" stopColor="#FFFFFF" />
                <stop offset="90%" stopColor="#F4F8FA" />
                <stop offset="100%" stopColor="#DDEAF0" />
              </linearGradient>
              <radialGradient id="sparkle-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="40%" stopColor="#FFF2D6" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <rect width="400" height="180" fill="url(#lentes-bg)" />

            {/* Gingival Aesthetic Architecture (Gengiva Superior Rosada Natural) */}
            <path
              d="M90 70 C110 50, 130 50, 145 68 C160 48, 185 48, 200 66 C215 48, 240 48, 255 68 C270 50, 290 50, 310 70 L320 20 L80 20 Z"
              fill="#E8A99B"
              fillOpacity="0.45"
            />
            <path
              d="M90 70 C110 50, 130 50, 145 68 C160 48, 185 48, 200 66 C215 48, 240 48, 255 68 C270 50, 290 50, 310 70"
              stroke="#D48B7A"
              strokeWidth="1.5"
            />

            {/* Incisivo Lateral Direito (12) */}
            <path
              d="M100 68 C115 54, 135 54, 142 68 C144 95, 142 120, 140 135 C132 138, 115 138, 106 135 C102 120, 98 95, 100 68 Z"
              fill="url(#enamel-grad)"
              stroke="#C9B6AF"
              strokeWidth="1.2"
              className="drop-shadow-xs"
            />

            {/* Incisivo Central Direito (11) - Destaque */}
            <path
              d="M146 67 C165 48, 192 48, 198 67 C201 100, 199 130, 197 148 C185 151, 160 151, 148 148 C145 130, 143 100, 146 67 Z"
              fill="url(#enamel-grad)"
              stroke="#BA7A6A"
              strokeWidth="1.5"
              className="drop-shadow-sm"
            />
            {/* Lóbulo de esmalte e reflexo de luz vertical */}
            <path d="M156 75 C154 98, 154 125, 157 140" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            <path d="M188 78 C186 98, 186 125, 188 138" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <path d="M150 144 C165 147, 182 147, 195 144" stroke="#89C4D4" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />

            {/* Incisivo Central Esquerdo (21) - Destaque */}
            <path
              d="M202 67 C208 48, 235 48, 254 67 C257 100, 255 130, 252 148 C240 151, 215 151, 203 148 C201 130, 199 100, 202 67 Z"
              fill="url(#enamel-grad)"
              stroke="#BA7A6A"
              strokeWidth="1.5"
              className="drop-shadow-sm"
            />
            <path d="M212 75 C214 98, 214 125, 211 140" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            <path d="M244 78 C242 98, 242 125, 244 138" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <path d="M205 144 C220 147, 237 147, 250 144" stroke="#89C4D4" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />

            {/* Incisivo Lateral Esquerdo (22) */}
            <path
              d="M258 68 C265 54, 285 54, 300 68 C302 95, 298 120, 294 135 C285 138, 268 138, 260 135 C258 120, 256 95, 258 68 Z"
              fill="url(#enamel-grad)"
              stroke="#C9B6AF"
              strokeWidth="1.2"
              className="drop-shadow-xs"
            />

            {/* Sparkle Glint / Efeito de Brilho da Porcelana Pura */}
            <g transform="translate(195, 88)">
              <circle cx="0" cy="0" r="14" fill="url(#sparkle-grad)" opacity="0.9" />
              <path d="M0 -12 L0 12 M-12 0 L12 0" stroke="#BA7A6A" strokeWidth="1.2" />
              <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
            </g>
            <g transform="translate(240, 110)">
              <path d="M0 -7 L0 7 M-7 0 L7 0" stroke="#D4AF37" strokeWidth="1" />
              <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
            </g>

            {/* Badge de Cerâmica Feldspática / E.max */}
            <g transform="translate(30, 130)">
              <rect width="80" height="22" rx="11" fill="#FFFFFF" fillOpacity="0.9" stroke="#BA7A6A" strokeWidth="0.8" />
              <text x="40" y="14" textAnchor="middle" fill="#965A4B" fontSize="8.5" fontWeight="bold" fontFamily="sans-serif">
                CERÂMICA PURA
              </text>
            </g>
          </svg>
        );

      case 'toxina-botulinica':
        // Toxina Botulínica - Mapeamento Facial, Músculos Frontal, Corrugador e Orbicular com Pontos Nobres
        return (
          <svg viewBox="0 0 400 180" className="w-full h-full object-cover select-none pointer-events-none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="botox-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FAF1ED" />
                <stop offset="50%" stopColor="#F5E4DC" />
                <stop offset="100%" stopColor="#EBD4CA" />
              </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#botox-bg)" />

            {/* Mapeamento Anatômico da Testa e Olhos */}
            <path
              d="M110 145 C110 70, 140 35, 200 35 C260 35, 290 70, 290 145 Z"
              fill="#FFFFFF"
              fillOpacity="0.4"
              stroke="#BA7A6A"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />

            {/* Linhas de Expressão Suavizadas no Frontal (Antes -> Depois) */}
            <path d="M140 55 Q200 48 260 55" stroke="#BA7A6A" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            <path d="M145 70 Q200 63 255 70" stroke="#BA7A6A" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            <path d="M150 85 Q200 78 250 85" stroke="#BA7A6A" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />

            {/* Olhos e Sobrancelhas Suaves */}
            <path d="M145 105 Q170 95 190 102" stroke="#714B42" strokeWidth="2" strokeLinecap="round" />
            <path d="M210 102 Q230 95 255 105" stroke="#714B42" strokeWidth="2" strokeLinecap="round" />

            {/* Olhos serenos */}
            <path d="M150 120 Q170 128 185 120" stroke="#965A4B" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M215 120 Q230 128 250 120" stroke="#965A4B" strokeWidth="1.5" strokeLinecap="round" />

            {/* Pontos de Aplicação Estratégicos com Ondas de Relaxamento Muscular */}
            {/* Frontal Superior */}
            <g transform="translate(170, 60)">
              <circle cx="0" cy="0" r="9" stroke="#BA7A6A" strokeWidth="0.8" strokeDasharray="2 2" className="animate-ping" opacity="0.3" />
              <circle cx="0" cy="0" r="4" fill="#BA7A6A" />
              <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
            </g>
            <g transform="translate(200, 55)">
              <circle cx="0" cy="0" r="9" stroke="#BA7A6A" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.3" />
              <circle cx="0" cy="0" r="4" fill="#BA7A6A" />
              <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
            </g>
            <g transform="translate(230, 60)">
              <circle cx="0" cy="0" r="9" stroke="#BA7A6A" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.3" />
              <circle cx="0" cy="0" r="4" fill="#BA7A6A" />
              <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
            </g>

            {/* Glabela e Prócero (Ruga do Bravo) */}
            <g transform="translate(200, 95)">
              <circle cx="0" cy="0" r="11" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
              <circle cx="0" cy="0" r="4.5" fill="#D4AF37" />
              <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
            </g>
            <g transform="translate(185, 90)">
              <circle cx="0" cy="0" r="3.5" fill="#BA7A6A" />
            </g>
            <g transform="translate(215, 90)">
              <circle cx="0" cy="0" r="3.5" fill="#BA7A6A" />
            </g>

            {/* Cauda da Sobrancelha (Efeito Fox Eyes / Lifting Lateral) */}
            <path d="M260 102 L275 88" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
            <polygon points="278,85 270,89 276,95" fill="#D4AF37" />

            <path d="M140 102 L125 88" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
            <polygon points="122,85 130,89 124,95" fill="#D4AF37" />

            {/* Label de precisão milimétrica */}
            <g transform="translate(290, 45)">
              <rect width="90" height="22" rx="11" fill="#FFFFFF" fillOpacity="0.9" stroke="#BA7A6A" strokeWidth="0.8" />
              <text x="45" y="14" textAnchor="middle" fill="#965A4B" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                MICRODOSES HOF
              </text>
            </g>
          </svg>
        );

      case 'preenchimento-labial':
        // Preenchimento e Escultura Labial - Arco do Cupido, Tubérculos e Contorno com Volume
        return (
          <svg viewBox="0 0 400 180" className="w-full h-full object-cover select-none pointer-events-none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="lip-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDF5F2" />
                <stop offset="50%" stopColor="#F7E6DF" />
                <stop offset="100%" stopColor="#EED2C7" />
              </linearGradient>
              <linearGradient id="lip-tissue" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D98A7B" />
                <stop offset="50%" stopColor="#C97262" />
                <stop offset="100%" stopColor="#AE5646" />
              </linearGradient>
              <linearGradient id="cupid-line" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#BA7A6A" />
                <stop offset="50%" stopColor="#E5A496" />
                <stop offset="100%" stopColor="#BA7A6A" />
              </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#lip-bg)" />

            {/* Colunas do Filtro Nasal (Proporção Facial Superior) */}
            <line x1="188" y1="20" x2="192" y2="60" stroke="#BA7A6A" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
            <line x1="212" y1="20" x2="208" y2="60" stroke="#BA7A6A" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />

            {/* Lábio Superior com Arco do Cupido Definido */}
            <path
              d="M100 95 C130 90, 160 88, 185 70 C193 64, 200 68, 200 68 C200 68, 207 64, 215 70 C240 88, 270 90, 300 95 C275 105, 235 108, 200 108 C165 108, 125 105, 100 95 Z"
              fill="url(#lip-tissue)"
              stroke="#BA7A6A"
              strokeWidth="1.6"
              className="drop-shadow-sm"
            />

            {/* Borda Vermelha (Vermilion Border Highlight) */}
            <path
              d="M102 94 C132 89, 161 87, 185 70 C193 64, 200 68, 200 68 C200 68, 207 64, 215 70 C239 87, 268 89, 298 94"
              stroke="#FFF1ED"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* Lábio Inferior Esculpido e Hidratado (2 Tubérculos Centrais com Volume Proporcional) */}
            <path
              d="M102 96 C135 104, 165 106, 200 106 C235 106, 265 104, 298 96 C290 128, 255 148, 200 148 C145 148, 110 128, 102 96 Z"
              fill="url(#lip-tissue)"
              stroke="#BA7A6A"
              strokeWidth="1.6"
              className="drop-shadow-sm"
            />

            {/* Brilho Gloss e Reflexo de Hidratação Natural */}
            <ellipse cx="165" cy="120" rx="20" ry="10" fill="#FFFFFF" fillOpacity="0.45" />
            <ellipse cx="235" cy="120" rx="20" ry="10" fill="#FFFFFF" fillOpacity="0.45" />
            <ellipse cx="200" cy="85" rx="14" ry="5" fill="#FFFFFF" fillOpacity="0.35" />

            {/* Nodos de Volume e Ácido Hialurônico Reticulado */}
            <circle cx="165" cy="122" r="3.5" fill="#D4AF37" />
            <circle cx="235" cy="122" r="3.5" fill="#D4AF37" />
            <circle cx="200" cy="85" r="3" fill="#D4AF37" />

            {/* Badge de Escultura Labial */}
            <g transform="translate(30, 40)">
              <rect width="85" height="22" rx="11" fill="#FFFFFF" fillOpacity="0.9" stroke="#BA7A6A" strokeWidth="0.8" />
              <text x="42" y="14" textAnchor="middle" fill="#965A4B" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                ARCO DO CUPIDO
              </text>
            </g>
          </svg>
        );

      case 'bioestimulador-colageno':
        // Bioestimuladores de Colágeno (Sculptra & Radiesse) - Rede de Fibras Dérmicas, Microesferas e Neoelastingênese
        return (
          <svg viewBox="0 0 400 180" className="w-full h-full object-cover select-none pointer-events-none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bio-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FAF1ED" />
                <stop offset="50%" stopColor="#F2DFD7" />
                <stop offset="100%" stopColor="#E5CCC1" />
              </linearGradient>
              <radialGradient id="particle-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="40%" stopColor="#BA7A6A" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <rect width="400" height="180" fill="url(#bio-bg)" />

            {/* Camadas da Pele: Epiderme, Derme e Tecido Subcutâneo */}
            <path d="M0 45 C80 40, 160 48, 240 42 C320 36, 360 44, 400 40 L400 0 L0 0 Z" fill="#FCEEE8" fillOpacity="0.6" />
            <line x1="0" y1="45" x2="400" y2="40" stroke="#BA7A6A" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />

            {/* Rede Tridimensional de Fibras de Colágeno Tipo I & III (Lattice) */}
            <g stroke="#BA7A6A" strokeWidth="1.2" opacity="0.6">
              <path d="M60 80 Q120 120 180 80 T300 90" fill="none" />
              <path d="M40 120 Q110 70 170 130 T320 110" fill="none" />
              <path d="M80 60 Q150 140 220 70 T350 100" fill="none" />
              <path d="M120 140 Q180 80 250 135 T380 90" fill="none" />
              <path d="M50 100 Q130 150 210 95 T330 125" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
            </g>

            {/* Microesferas de PLLA / Hidroxiapatita de Cálcio ativando a neocolagênese */}
            {[
              { cx: 120, cy: 90, r: 8 },
              { cx: 165, cy: 115, r: 10 },
              { cx: 210, cy: 80, r: 9 },
              { cx: 255, cy: 110, r: 11 },
              { cx: 300, cy: 85, r: 8 },
              { cx: 180, cy: 140, r: 7 }
            ].map((p, i) => (
              <g key={i}>
                <circle cx={p.cx} cy={p.cy} r={p.r * 1.8} fill="url(#particle-glow)" opacity="0.45" />
                <circle cx={p.cx} cy={p.cy} r={p.r * 0.7} fill="#FFFFFF" stroke="#BA7A6A" strokeWidth="1.5" />
                <circle cx={p.cx - 1.5} cy={p.cy - 1.5} r={p.r * 0.25} fill="#D4AF37" />
              </g>
            ))}

            {/* Vetores de Firmeza e Tração Dérmica Upward */}
            <g stroke="#965A4B" strokeWidth="1.8" strokeLinecap="round">
              <line x1="140" y1="130" x2="140" y2="70" />
              <polygon points="140,65 136,73 144,73" fill="#965A4B" />

              <line x1="240" y1="135" x2="240" y2="75" />
              <polygon points="240,70 236,78 244,78" fill="#965A4B" />

              <line x1="310" y1="125" x2="310" y2="65" />
              <polygon points="310,60 306,68 314,68" fill="#965A4B" />
            </g>

            {/* Indicador de Firmeza Biológica */}
            <g transform="translate(25, 125)">
              <rect width="85" height="22" rx="11" fill="#FFFFFF" fillOpacity="0.9" stroke="#BA7A6A" strokeWidth="0.8" />
              <text x="42" y="14" textAnchor="middle" fill="#965A4B" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                COLÁGENO I & III
              </text>
            </g>
          </svg>
        );

      case 'clareamento-dental-laser':
        // Clareamento Dental em Consultório & Caseiro - Dente Luminoso com Escala de Cores Vita e Raios Fotônicos
        return (
          <svg viewBox="0 0 400 180" className="w-full h-full object-cover select-none pointer-events-none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="white-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5FBFC" />
                <stop offset="50%" stopColor="#EBF4F6" />
                <stop offset="100%" stopColor="#DCEBF0" />
              </linearGradient>
              <linearGradient id="tooth-bright" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#F8FCFD" />
                <stop offset="100%" stopColor="#E2F2F7" />
              </linearGradient>
              <radialGradient id="laser-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="35%" stopColor="#67E8F9" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <rect width="400" height="180" fill="url(#white-bg)" />

            {/* Aura Luminosa e Raios de Luz */}
            <circle cx="200" cy="90" r="65" fill="url(#laser-glow)" opacity="0.65" />
            <g stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" opacity="0.5">
              <line x1="200" y1="20" x2="200" y2="160" />
              <line x1="130" y1="90" x2="270" y2="90" />
              <line x1="150" y1="40" x2="250" y2="140" />
              <line x1="150" y1="140" x2="250" y2="40" />
            </g>

            {/* Dente Ícone de Alta Estética Lapidado */}
            <path
              d="M175 45 C185 38, 215 38, 225 45 C235 60, 238 90, 232 120 C228 138, 220 152, 212 152 C206 152, 204 140, 200 140 C196 140, 194 152, 188 152 C180 152, 172 138, 168 120 C162 90, 165 60, 175 45 Z"
              fill="url(#tooth-bright)"
              stroke="#0284C7"
              strokeWidth="1.5"
              className="drop-shadow-md"
            />
            {/* Brilho Especular na Coroa */}
            <path d="M182 55 C180 80, 182 105, 186 125" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M216 58 C218 80, 216 105, 212 125" stroke="#BAE6FD" strokeWidth="1.8" strokeLinecap="round" />

            {/* Estrelas de Brilho / Sparkles */}
            <g transform="translate(225, 55)">
              <path d="M0 -10 L0 10 M-10 0 L10 0" stroke="#0284C7" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
            </g>
            <g transform="translate(170, 105)">
              <path d="M0 -7 L0 7 M-7 0 L7 0" stroke="#38BDF8" strokeWidth="1.2" />
              <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
            </g>

            {/* Escala de Cores Vita Comparativa (Antes vs Depois) */}
            <g transform="translate(35, 60)">
              <rect width="60" height="60" rx="8" fill="#FFFFFF" fillOpacity="0.9" stroke="#0284C7" strokeWidth="0.8" />
              <text x="30" y="16" textAnchor="middle" fill="#0369A1" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                ESCALA VITA
              </text>
              <rect x="10" y="24" width="40" height="8" rx="2" fill="#EADCC7" />
              <text x="30" y="31" textAnchor="middle" fill="#5A4736" fontSize="6.5" fontWeight="bold">A3.5 (Antes)</text>
              <rect x="10" y="38" width="40" height="8" rx="2" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="0.5" />
              <text x="30" y="45" textAnchor="middle" fill="#0284C7" fontSize="6.5" fontWeight="bold">BL1 (Depois)</text>
            </g>
          </svg>
        );

      case 'fios-sustentacao-pdo':
        // Fios de Sustentação de PDO - Fios Espiculados Subcutâneos com Tração Mecânica e Lifting Imediato
        return (
          <svg viewBox="0 0 400 180" className="w-full h-full object-cover select-none pointer-events-none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="pdo-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FAF1ED" />
                <stop offset="50%" stopColor="#F4E3DC" />
                <stop offset="100%" stopColor="#E9D1C6" />
              </linearGradient>
            </defs>
            <rect width="400" height="180" fill="url(#pdo-bg)" />

            {/* Camadas da Pele e Plano SMAS */}
            <path d="M40 35 C140 25, 260 25, 360 35" stroke="#BA7A6A" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <path d="M40 85 C140 75, 260 75, 360 85" stroke="#BA7A6A" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.4" />
            <path d="M40 145 C140 135, 260 135, 360 145" stroke="#BA7A6A" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.4" />

            {/* Fio de PDO Espiculado Principal (Tração 45°) */}
            <g stroke="#BA7A6A" strokeWidth="3" strokeLinecap="round">
              <line x1="80" y1="135" x2="310" y2="55" />
            </g>
            <g stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round">
              <line x1="100" y1="155" x2="330" y2="75" />
            </g>

            {/* Espículas / Garras Bidirecionais de Ancoragem Dérmica */}
            {[
              { x: 120, y: 121 },
              { x: 155, y: 109 },
              { x: 190, y: 97 },
              { x: 225, y: 85 },
              { x: 260, y: 73 }
            ].map((pt, i) => (
              <g key={i}>
                <line x1={pt.x} y1={pt.y} x2={pt.x - 6} y2={pt.y - 10} stroke="#BA7A6A" strokeWidth="2" strokeLinecap="round" />
                <line x1={pt.x} y1={pt.y} x2={pt.x + 8} y2={pt.y + 8} stroke="#BA7A6A" strokeWidth="2" strokeLinecap="round" />
                <circle cx={pt.x} cy={pt.y} r="2.5" fill="#D4AF37" />
              </g>
            ))}

            {/* Vetor de Tração Upward */}
            <g stroke="#965A4B" strokeWidth="2" strokeLinecap="round">
              <line x1="310" y1="55" x2="340" y2="45" />
              <polygon points="345,43 336,44 338,51" fill="#965A4B" />
            </g>

            {/* Tag Técnica de Fios 100% Reabsorvíveis */}
            <g transform="translate(30, 45)">
              <rect width="90" height="22" rx="11" fill="#FFFFFF" fillOpacity="0.9" stroke="#BA7A6A" strokeWidth="0.8" />
              <text x="45" y="14" textAnchor="middle" fill="#965A4B" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                TRAÇÃO ESPICULADA
              </text>
            </g>
          </svg>
        );

      case 'skinbooster-glow':
        // Skinbooster & Revitalização Dérmica - Microgotículas de Hidratação Profunda, Esferas de AH e Viço Glow
        return (
          <svg viewBox="0 0 400 180" className="w-full h-full object-cover select-none pointer-events-none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="skin-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDF7F5" />
                <stop offset="50%" stopColor="#F9ECE6" />
                <stop offset="100%" stopColor="#EEDDD6" />
              </linearGradient>
              <radialGradient id="dew-glow" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="45%" stopColor="#E0F2FE" />
                <stop offset="85%" stopColor="#BA7A6A" />
                <stop offset="100%" stopColor="#965A4B" />
              </radialGradient>
              <radialGradient id="glow-ring" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#FED7AA" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <rect width="400" height="180" fill="url(#skin-bg)" />

            {/* Anéis de Viço e Glow Dérmico Radiante */}
            <circle cx="200" cy="90" r="75" fill="url(#glow-ring)" opacity="0.4" />
            <circle cx="200" cy="90" r="55" stroke="#BA7A6A" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
            <circle cx="200" cy="90" r="35" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />

            {/* Gotícula Central de Ácido Hialurônico Fluido (Skinbooster) */}
            <path
              d="M200 48 C200 48, 175 80, 175 102 C175 116, 186 128, 200 128 C214 128, 225 116, 225 102 C225 80, 200 48, 200 48 Z"
              fill="url(#dew-glow)"
              stroke="#BA7A6A"
              strokeWidth="1.5"
              className="drop-shadow-md"
            />
            {/* Brilho Especular na Gota */}
            <ellipse cx="192" cy="85" rx="5" ry="12" transform="rotate(-20 192 85)" fill="#FFFFFF" fillOpacity="0.85" />

            {/* Microesferas de Hidratação Circundantes */}
            {[
              { cx: 140, cy: 75, r: 8 },
              { cx: 155, cy: 120, r: 6 },
              { cx: 250, cy: 70, r: 7 },
              { cx: 245, cy: 115, r: 9 },
              { cx: 120, cy: 105, r: 5 },
              { cx: 280, cy: 95, r: 6 }
            ].map((d, i) => (
              <g key={i}>
                <circle cx={d.cx} cy={d.cy} r={d.r} fill="url(#dew-glow)" stroke="#BA7A6A" strokeWidth="0.8" opacity="0.85" />
                <circle cx={d.cx - d.r * 0.3} cy={d.cy - d.r * 0.3} r={d.r * 0.25} fill="#FFFFFF" />
              </g>
            ))}

            {/* Sparkles / Efeito Dewy Skin */}
            <g transform="translate(230, 50)">
              <path d="M0 -8 L0 8 M-8 0 L8 0" stroke="#D4AF37" strokeWidth="1.2" />
              <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
            </g>
            <g transform="translate(160, 60)">
              <path d="M0 -6 L0 6 M-6 0 L6 0" stroke="#BA7A6A" strokeWidth="1" />
              <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
            </g>

            {/* Badge de Hidratação Profunda */}
            <g transform="translate(30, 130)">
              <rect width="85" height="22" rx="11" fill="#FFFFFF" fillOpacity="0.9" stroke="#BA7A6A" strokeWidth="0.8" />
              <text x="42" y="14" textAnchor="middle" fill="#965A4B" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                GLOW & HYDRA
              </text>
            </g>
          </svg>
        );

      default:
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#FAF2EE] via-[#F5E6E0] to-[#EED9D1] dark:from-slate-800 dark:via-slate-800/90 dark:to-[#1E293B]" />
        );
    }
  };

  const hasCustomMedia = !!customImage && !hasError;

  return (
    <div className="relative h-40 sm:h-44 w-full overflow-hidden bg-gradient-to-br from-[#FAF2EE] via-[#F5E6E0] to-[#EED9D1] dark:from-slate-800 dark:via-slate-800/90 dark:to-[#1E293B] border-b border-[#E8D5CE] dark:border-slate-700/80 group/visual">
      {/* If custom image was uploaded, render real photo with lazy loading */}
      {hasCustomMedia ? (
        <>
          <img
            src={customImage!}
            alt={title}
            width={400}
            height={180}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/5 pointer-events-none" />
        </>
      ) : (
        renderIllustration()
      )}

      {/* Subtle Inner Vignette & Glass Shadow */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-black/5 pointer-events-none" />

      {/* Floating Badges Over Image */}
      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-start justify-between pointer-events-none z-10">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#965A4B] dark:text-[#E8A290] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-2xs border border-[#D8BCB2] dark:border-slate-700">
          {categoryLabel}
        </span>

        {highlightTag && (
          <span className="text-[10px] font-bold text-white bg-[#BA7A6A] px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1 backdrop-blur-xs">
            <Sparkles className="w-2.5 h-2.5" />
            {highlightTag}
          </span>
        )}
      </div>
    </div>
  );
};
