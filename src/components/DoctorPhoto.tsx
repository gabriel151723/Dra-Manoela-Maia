import React, { useState } from 'react';
import { DRA_MANOELA_PHOTO_DATA_URI, DRA_MANOELA_ABOUT_PHOTO_DATA_URI } from '../data/doctorPhotoBase64';

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

  // Reliable permanent embedded photos:
  // variant === 'about' always receives the second photo (DRA_MANOELA_ABOUT_PHOTO_DATA_URI)
  // variant === 'hero' (and others) receives the first photo (DRA_MANOELA_PHOTO_DATA_URI)
  const [imageSrc, setImageSrc] = useState<string>(
    isAbout ? DRA_MANOELA_ABOUT_PHOTO_DATA_URI : DRA_MANOELA_PHOTO_DATA_URI
  );

  const handleError = () => {
    // Guaranteed fallback to respective embedded data URI
    setImageSrc(isAbout ? DRA_MANOELA_ABOUT_PHOTO_DATA_URI : DRA_MANOELA_PHOTO_DATA_URI);
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
        referrerPolicy="no-referrer"
      />

      {/* Subtle luxury ambient grading overlay */}
      {!isAvatar && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
      )}
    </div>
  );
};

