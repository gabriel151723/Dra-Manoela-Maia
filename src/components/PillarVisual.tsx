import React, { useState } from 'react';
import { Building2, MapPin } from 'lucide-react';

interface PillarVisualProps {
  pillarId: string;
  imageSrc?: string;
  fallbackSrc?: string;
  title: string;
}

export const PillarVisual: React.FC<PillarVisualProps> = ({
  pillarId,
  imageSrc,
  fallbackSrc,
  title
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(imageSrc);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  // Luxury clinical vector fallback (Warm beige, champagne gold, rose bronze)
  const renderVisualContent = () => {
    switch (pillarId) {
      case 'visagismo-3d':
        return (
          <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#FDFBF9] via-[#F8EFEA] to-[#EEDDD6]">
            <svg viewBox="0 0 400 200" className="w-full h-full object-cover select-none pointer-events-none" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="visag-glow-clean" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="60%" stopColor="#F5E4DC" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
              <rect width="400" height="200" fill="transparent" />
              <circle cx="200" cy="100" r="85" fill="url(#visag-glow-clean)" />

              {/* Aesthetic facial geometry guides */}
              <g stroke="#BA7A6A" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5">
                <circle cx="200" cy="100" r="70" />
                <circle cx="200" cy="100" r="45" />
                <line x1="200" y1="15" x2="200" y2="185" />
                <line x1="110" y1="100" x2="290" y2="100" />
              </g>

              {/* Facial harmony oval & proportion vector */}
              <path
                d="M200 35 C175 35, 155 55, 155 85 C155 110, 175 140, 200 165 C225 140, 245 110, 245 85 C245 55, 225 35, 200 35 Z"
                fill="#FFFFFF"
                fillOpacity="0.75"
                stroke="#BA7A6A"
                strokeWidth="1.8"
              />
              <path d="M175 90 L200 115 L225 90" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
              
              {[
                { x: 200, y: 35 },
                { x: 165, y: 75 },
                { x: 235, y: 75 },
                { x: 200, y: 115 },
                { x: 200, y: 165 }
              ].map((pt, idx) => (
                <circle key={idx} cx={pt.x} cy={pt.y} r="3" fill="#D4AF37" />
              ))}

              {/* Golden ratio luxury badge */}
              <g transform="translate(295, 20)">
                <rect width="78" height="25" rx="12.5" fill="#FFFFFF" fillOpacity="0.95" stroke="#BA7A6A" strokeWidth="1" />
                <text x="39" y="16.5" textAnchor="middle" fill="#965A4B" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                  φ 1.618
                </text>
              </g>
            </svg>
            <div className="absolute bottom-2.5 left-3 text-[10px] font-semibold text-[#8C5243] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs px-2 py-0.5 rounded-md border border-[#D8BCB2]/60">
              Mapeamento de Proporção Áurea
            </div>
          </div>
        );

      case 'produtos-originais':
        return (
          <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#FDFBF9] via-[#F6EEE9] to-[#EBDBD3]">
            <svg viewBox="0 0 400 200" className="w-full h-full object-cover select-none pointer-events-none" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gold-seal-pure" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDE68A" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
              </defs>
              <circle cx="190" cy="100" r="75" fill="#FFFFFF" fillOpacity="0.8" />

              {/* Sealed glass vial / pharmaceutical ampoule */}
              <g transform="translate(150, 30)">
                <rect x="24" y="0" width="32" height="14" rx="3" fill="url(#gold-seal-pure)" stroke="#997A15" strokeWidth="0.8" />
                <rect x="28" y="14" width="24" height="8" fill="#523832" />
                <path
                  d="M28 22 L28 34 L12 48 L12 125 C12 130 16 135 22 135 L58 135 C64 135 68 130 68 125 L68 48 L52 34 L52 22 Z"
                  fill="#FFFFFF"
                  fillOpacity="0.9"
                  stroke="#BA7A6A"
                  strokeWidth="1.6"
                />
                <rect x="18" y="85" width="44" height="42" rx="3" fill="#BA7A6A" fillOpacity="0.25" />
                <rect x="16" y="52" width="48" height="40" rx="2" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
                <rect x="20" y="58" width="40" height="4" fill="#965A4B" />
                <line x1="56" y1="52" x2="56" y2="92" stroke="url(#gold-seal-pure)" strokeWidth="3" />
              </g>

              {/* 100% Original Gold Medal Badge */}
              <g transform="translate(285, 90)">
                <circle cx="30" cy="30" r="28" fill="url(#gold-seal-pure)" stroke="#FFFFFF" strokeWidth="2.5" />
                <path d="M21 30 L28 37 L40 23" stroke="#4A2810" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                <text x="30" y="48" textAnchor="middle" fill="#4A2810" fontSize="7" fontWeight="bold">
                  100% ORIGINAL
                </text>
              </g>
            </svg>
            <div className="absolute bottom-2.5 left-3 text-[10px] font-semibold text-[#8C5243] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs px-2 py-0.5 rounded-md border border-[#D8BCB2]/60">
              Botox® · Juvederm® · Restylane®
            </div>
          </div>
        );

      case 'odonto-medico-itaigara':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-5 bg-gradient-to-br from-[#FAF5F2] via-[#F4E8E2] to-[#EBD7CE] text-center relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-white/95 text-[#965A4B] border border-[#D8BCB2] shadow-sm flex items-center justify-center mb-2.5">
              <Building2 className="w-6 h-6 text-[#BA7A6A]" />
            </div>
            <h4 className="font-serif-luxury text-base sm:text-lg font-semibold text-[#1E293B] mb-1">
              Complexo Odonto-Médico Itaigara
            </h4>
            <div className="flex items-center gap-1 text-[11px] text-[#64748B] mb-1">
              <MapPin className="w-3 h-3 text-[#BA7A6A] shrink-0" />
              <span>Av. ACM, 585 · Sala 703</span>
            </div>
            <span className="text-[10px] font-bold text-[#965A4B] bg-white/85 px-2.5 py-0.5 rounded-full border border-[#D8BCB2]/80 mt-1">
              Polo Médico de Referência em Salvador
            </span>
          </div>
        );

      case 'pos-24h':
      default:
        return (
          <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#FBFDFC] via-[#F2FBF6] to-[#E4F5EB]">
            <svg viewBox="0 0 400 200" className="w-full h-full object-cover select-none pointer-events-none" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="200" cy="100" r="75" fill="#10B981" fillOpacity="0.1" />

              <path
                d="M30 100 L135 100 L145 75 L155 125 L165 65 L175 120 L185 90 L195 100 L370 100"
                stroke="#BA7A6A"
                strokeWidth="2.2"
                strokeLinecap="round"
                opacity="0.8"
              />

              <g transform="translate(170, 50)">
                <path
                  d="M30 0 C48 0 60 12 60 28 C60 55 42 70 30 78 C18 70 0 55 0 28 C0 12 12 0 30 0 Z"
                  fill="#FFFFFF"
                  stroke="#10B981"
                  strokeWidth="2"
                />
                <circle cx="30" cy="35" r="18" fill="#25D366" />
                <path
                  d="M30 25 C24.5 25 20 29.5 20 35 C20 37 20.6 38.8 21.6 40.4 L20.5 44.5 L24.8 43.5 C26.3 44.2 28.1 44.7 30 44.7 C35.5 44.7 40 40.2 40 35 C40 29.5 35.5 25 30 25 Z"
                  fill="#FFFFFF"
                />
              </g>

              <g transform="translate(245, 30)">
                <rect width="60" height="26" rx="13" fill="#FFFFFF" stroke="#10B981" strokeWidth="1.4" />
                <text x="30" y="17.5" textAnchor="middle" fill="#065F46" fontSize="10.5" fontWeight="bold">
                  24 Horas
                </text>
              </g>
            </svg>
            <div className="absolute bottom-2.5 left-3 text-[10px] font-semibold text-[#047857] bg-white/85 dark:bg-slate-900/80 backdrop-blur-xs px-2 py-0.5 rounded-md border border-[#A7F3D0]">
              WhatsApp Médico Direto & Acompanhamento
            </div>
          </div>
        );
    }
  };

  const isShowingImage = Boolean(currentSrc) && !hasError && isLoaded;

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-[#FAF0EC] dark:bg-slate-900">
      {/* Always render vector fallback as the solid base */}
      {renderVisualContent()}

      {/* If currentSrc is provided, render image on top with graceful opacity transition on load */}
      {Boolean(currentSrc) && !hasError && (
        <img
          src={currentSrc}
          alt={title}
          width={400}
          height={200}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => {
            setIsLoaded(true);
            setHasError(false);
          }}
          onError={handleImageError}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 hover:scale-105 ${
            isLoaded ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
          }`}
        />
      )}

      {/* Dark gradient overlay on top of photo */}
      {isShowingImage && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-10" />
      )}
    </div>
  );
};
