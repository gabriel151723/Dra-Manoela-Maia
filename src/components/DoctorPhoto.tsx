import React, { useState, useEffect } from 'react';
import { DRA_MANOELA_PHOTO_DATA_URI } from '../data/doctorPhotoBase64';
import { getImageFromIndexedDB } from '../utils/imageStorage';

interface DoctorPhotoProps {
  className?: string;
  variant?: 'hero' | 'about' | 'avatar' | 'card';
  alt?: string;
}

export const DoctorPhoto: React.FC<DoctorPhotoProps> = ({
  className = '',
  variant = 'hero',
  alt = 'Dra. Manoela Maia - Especialista em Harmonização Orofacial e Estética Dental em Salvador'
}) => {
  const isAbout = variant === 'about';
  const isAvatar = variant === 'avatar';
  const isHero = variant === 'hero';

  // For 'about' variant, prioritize the second photo (Screenshot_20260928_123333_Chrome.jpg / dra_manoela_about.jpg)
  const [imageSrc, setImageSrc] = useState<string>(() => {
    if (typeof window !== 'undefined' && isAbout) {
      const local = localStorage.getItem('dra_manoela_photo_about');
      if (local) return local;
      return '/dra_manoela_about.jpg';
    }
    return DRA_MANOELA_PHOTO_DATA_URI;
  });

  const [hasTriedFallback, setHasTriedFallback] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (isAbout) {
      getImageFromIndexedDB('dra_manoela_photo_about').then((saved) => {
        if (isMounted && saved) {
          setImageSrc(saved);
        }
      });
    }

    // Listen for custom photo updates dispatched from About.tsx
    const handlePhotoUpdated = (e: CustomEvent<string>) => {
      if (isAbout && e.detail) {
        setImageSrc(e.detail);
      }
    };
    window.addEventListener('dra_photo_about_updated' as any, handlePhotoUpdated as any);

    return () => {
      isMounted = false;
      window.removeEventListener('dra_photo_about_updated' as any, handlePhotoUpdated as any);
    };
  }, [isAbout]);

  const handleError = () => {
    if (isAbout && !hasTriedFallback) {
      setHasTriedFallback(true);
      // Try alternate public filename if available
      setImageSrc('/Screenshot_20260928_123333_Chrome.jpg');
    } else {
      // Ultimate reliable fallback to original high-res URI
      setImageSrc(DRA_MANOELA_PHOTO_DATA_URI);
    }
  };

  return (
    <div className={`relative overflow-hidden select-none bg-[#FAF0EC] dark:bg-slate-900 ${className}`}>
      {/* Real Formatted Photo of Dra. Manoela Maia */}
      <img
        src={imageSrc}
        alt={alt}
        onError={handleError}
        className={`w-full h-full object-cover ${
          isAvatar
            ? 'object-center'
            : isAbout
            ? 'object-[center_18%]'
            : 'object-[center_12%]'
        } transition-transform duration-700 hover:scale-105`}
        loading="eager"
        decoding="async"
      />

      {/* Subtle luxury ambient grading overlay */}
      {!isAvatar && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
      )}
    </div>
  );
};
