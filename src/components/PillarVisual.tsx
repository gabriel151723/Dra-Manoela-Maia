import React, { useState, useEffect, useRef } from 'react';
import { Building2, Upload, Camera } from 'lucide-react';
import { saveImageToIndexedDB, getImageFromIndexedDB, persistImageToServer } from '../utils/imageStorage';

interface PillarVisualProps {
  pillarId: string;
  imageSrc?: string;
  title: string;
}

export const PillarVisual: React.FC<PillarVisualProps> = ({ pillarId, imageSrc, title }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Responsive srcset generator
  const getSrcSet = (src: string) => {
    if (!src) return undefined;
    if (src.startsWith('data:') || src.startsWith('blob:')) {
      return `${src} 1x, ${src} 2x`;
    }
    return `${src} 400w, ${src} 800w, ${src} 1200w`;
  };

  // Suggested server filename for permanent disk save
  const serverFilename = (() => {
    switch (pillarId) {
      case 'visagismo-3d':
        return 'visagismo_3d.jpg';
      case 'produtos-originais':
        return 'produtos_originais.jpg';
      case 'odonto-medico-itaigara':
        return 'Itaigara Complexo.jpg';
      case 'pos-24h':
        return 'pos_24h.jpg';
      default:
        return `${pillarId}.jpg`;
    }
  })();

  // Load from IndexedDB or localStorage on mount
  useEffect(() => {
    let isMounted = true;
    getImageFromIndexedDB(`pillar_${pillarId}`).then((saved) => {
      if (isMounted && saved) {
        setCustomImage(saved);
        setHasError(false);
      } else {
        // Check localStorage fallback
        const local = localStorage.getItem(`pillar_photo_${pillarId}`) ||
          (pillarId === 'odonto-medico-itaigara' ? localStorage.getItem('itaigara_custom_photo') : null);
        if (isMounted && local) {
          setCustomImage(local);
          setHasError(false);
          // Migrate to IndexedDB
          saveImageToIndexedDB(`pillar_${pillarId}`, local);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [pillarId]);

  const processFile = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const result = event.target?.result as string;
      if (result) {
        setCustomImage(result);
        setHasError(false);
        // Persist to IndexedDB (no 5MB limit)
        await saveImageToIndexedDB(`pillar_${pillarId}`, result);
        // Persist to server disk in /public/
        await persistImageToServer(serverFilename, result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    }
  };

  const activeSrc = customImage || imageSrc;
  const isImageActive = activeSrc && !hasError;

  // Clear, light, elegant clinical aesthetics (Warm beige, champagne gold, rose bronze)
  const renderVisualContent = () => {
    switch (pillarId) {
      case 'visagismo-3d':
        return (
          <svg viewBox="0 0 400 200" className="w-full h-full object-cover select-none pointer-events-none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="visag-light-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDFBF9" />
                <stop offset="50%" stopColor="#F8EFEA" />
                <stop offset="100%" stopColor="#EEDDD6" />
              </linearGradient>
              <radialGradient id="visag-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#F5E4DC" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <rect width="400" height="200" fill="url(#visag-light-bg)" />
            <circle cx="200" cy="100" r="85" fill="url(#visag-glow)" />

            <g stroke="#BA7A6A" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.45">
              <circle cx="200" cy="100" r="70" />
              <circle cx="200" cy="100" r="45" />
              <line x1="200" y1="15" x2="200" y2="185" />
              <line x1="110" y1="100" x2="290" y2="100" />
            </g>

            <path
              d="M200 35 C175 35, 155 55, 155 85 C155 110, 175 140, 200 165 C225 140, 245 110, 245 85 C245 55, 225 35, 200 35 Z"
              fill="#FFFFFF"
              fillOpacity="0.6"
              stroke="#BA7A6A"
              strokeWidth="1.6"
            />
            <path d="M175 90 L200 115 L225 90" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" />
            
            {[
              { x: 200, y: 35 },
              { x: 165, y: 75 },
              { x: 235, y: 75 },
              { x: 200, y: 115 },
              { x: 200, y: 165 }
            ].map((pt, idx) => (
              <circle key={idx} cx={pt.x} cy={pt.y} r="2.8" fill="#D4AF37" />
            ))}

            <g transform="translate(295, 20)">
              <rect width="75" height="24" rx="12" fill="#FFFFFF" fillOpacity="0.95" stroke="#BA7A6A" strokeWidth="1" />
              <text x="37" y="16" textAnchor="middle" fill="#965A4B" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">
                φ 1.618
              </text>
            </g>
          </svg>
        );

      case 'produtos-originais':
        return (
          <svg viewBox="0 0 400 200" className="w-full h-full object-cover select-none pointer-events-none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="prod-light-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDFBF9" />
                <stop offset="50%" stopColor="#F6EEE9" />
                <stop offset="100%" stopColor="#EBDBD3" />
              </linearGradient>
              <linearGradient id="gold-seal-bright" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#B45309" />
              </linearGradient>
            </defs>
            <rect width="400" height="200" fill="url(#prod-light-bg)" />
            <circle cx="190" cy="100" r="75" fill="#FFFFFF" fillOpacity="0.75" />

            <g transform="translate(150, 30)">
              <rect x="24" y="0" width="32" height="14" rx="3" fill="url(#gold-seal-bright)" stroke="#997A15" strokeWidth="0.8" />
              <rect x="28" y="14" width="24" height="8" fill="#523832" />
              <path
                d="M28 22 L28 34 L12 48 L12 125 C12 130 16 135 22 135 L58 135 C64 135 68 130 68 125 L68 48 L52 34 L52 22 Z"
                fill="#FFFFFF"
                fillOpacity="0.85"
                stroke="#BA7A6A"
                strokeWidth="1.5"
              />
              <rect x="18" y="85" width="44" height="42" rx="3" fill="#BA7A6A" fillOpacity="0.2" />
              <rect x="16" y="52" width="48" height="40" rx="2" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
              <rect x="20" y="58" width="40" height="4" fill="#965A4B" />
              <line x1="56" y1="52" x2="56" y2="92" stroke="url(#gold-seal-bright)" strokeWidth="3" />
            </g>

            <g transform="translate(290, 95)">
              <circle cx="28" cy="28" r="26" fill="url(#gold-seal-bright)" stroke="#FFFFFF" strokeWidth="2" />
              <path d="M20 28 L26 34 L37 21" stroke="#523832" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
              <text x="28" y="44" textAnchor="middle" fill="#523832" fontSize="6.5" fontWeight="bold">
                100% ORIGINAL
              </text>
            </g>
          </svg>
        );

      case 'odonto-medico-itaigara':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#FAF5F2] via-[#F4E8E2] to-[#EBD7CE] text-center relative overflow-hidden">
            <div className="w-11 h-11 rounded-xl bg-white/95 text-[#965A4B] border border-[#D8BCB2] shadow-xs flex items-center justify-center mb-2">
              <Building2 className="w-6 h-6 text-[#BA7A6A]" />
            </div>
            <h4 className="font-serif-luxury text-sm sm:text-base font-semibold text-[#1E293B] mb-0.5">
              Complexo Odonto-Médico Itaigara
            </h4>
            <p className="text-[10px] sm:text-[11px] text-[#64748B] mb-2 max-w-[240px]">
              Sala 703 · Av. ACM, 585 · Itaigara, Salvador BA
            </p>
          </div>
        );

      case 'pos-24h':
        return (
          <svg viewBox="0 0 400 200" className="w-full h-full object-cover select-none pointer-events-none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="pos-light-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FBFDFC" />
                <stop offset="50%" stopColor="#F2FBF6" />
                <stop offset="100%" stopColor="#E4F5EB" />
              </linearGradient>
            </defs>
            <rect width="400" height="200" fill="url(#pos-light-bg)" />
            <circle cx="200" cy="100" r="75" fill="#10B981" fillOpacity="0.08" />

            <path
              d="M30 100 L135 100 L145 75 L155 125 L165 65 L175 120 L185 90 L195 100 L370 100"
              stroke="#BA7A6A"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.75"
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
              <rect width="55" height="24" rx="12" fill="#FFFFFF" stroke="#10B981" strokeWidth="1.2" />
              <text x="32" y="16" textAnchor="middle" fill="#065F46" fontSize="9.5" fontWeight="bold">
                24h
              </text>
            </g>
          </svg>
        );

      default:
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#FAF5F2] to-[#EBD7CE]" />
        );
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative w-full h-full overflow-hidden transition-all duration-200 group/img ${
        isDragging ? 'ring-2 ring-[#BA7A6A] ring-inset bg-amber-50/20' : ''
      }`}
    >
      {/* Hidden file input for clicking to choose */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* If an image is loaded, render the real photo with lazy loading & responsive srcSet */}
      {isImageActive ? (
        <>
          <img
            src={activeSrc}
            srcSet={getSrcSet(activeSrc)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
            alt={title}
            width={400}
            height={200}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            referrerPolicy="no-referrer"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
              isLoaded ? 'opacity-100 filter-none' : 'opacity-85 blur-2xs'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5 pointer-events-none" />
          
          {/* Subtle change trigger only on hover when image already exists */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            title="Trocar imagem"
            className="absolute top-3 right-3 opacity-0 group-hover/img:opacity-100 p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-opacity cursor-pointer z-20"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        </>
      ) : (
        /* If no image yet, show aesthetic visual + discreet drag/drop click prompt */
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-full cursor-pointer relative"
          title="Clique ou arraste a imagem para adicionar"
        >
          {renderVisualContent()}

          {/* Discreet drop hint */}
          <div className="absolute bottom-2 inset-x-2 flex items-center justify-center pointer-events-none">
            <span className="text-[10px] font-medium text-[#784337] dark:text-[#E8A290] bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs border border-[#D8BCB2] dark:border-slate-700 flex items-center gap-1.5">
              <Upload className="w-3 h-3 text-[#BA7A6A]" />
              <span>Arraste a foto ou clique para anexar</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
