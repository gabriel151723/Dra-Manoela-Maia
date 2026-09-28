import React from 'react';

interface DoctorLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
}

export const DoctorLogo: React.FC<DoctorLogoProps> = ({
  className = 'w-10 h-10',
  size,
  showText = true,
}) => {
  return (
    <span 
      className={`inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={size ? { width: size, height: size } : undefined}
      title="Dra. Manoela Maia - Reabilitação Oral & Odontologia Estética"
    >
      <svg 
        viewBox="0 0 320 320" 
        className="w-full h-full drop-shadow-xs"
        aria-label="Logo Dra. Manoela Maia - Reabilitação Oral e Odontologia Estética"
        role="img"
      >
        <defs>
          <radialGradient id="tealGradLogo" cx="42%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#14A8A2" />
            <stop offset="60%" stopColor="#0E8E89" />
            <stop offset="100%" stopColor="#096E6A" />
          </radialGradient>
          <linearGradient id="ringGlowLogo" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.06" />
          </linearGradient>
        </defs>

        {/* Circular Base with refined dental teal color tone */}
        <circle cx="160" cy="160" r="154" fill="url(#tealGradLogo)" />
        <circle cx="160" cy="160" r="152" fill="none" stroke="url(#ringGlowLogo)" strokeWidth="2.5" />

        {/* Stylized Monogram M */}
        <g transform="translate(160, 102) scale(1.05)" fill="#FFFFFF">
          <path d="M -54,-62 C -36,-64 -18,-35 -8,-16 C -2,-4 0,-4 6,-16 C 16,-35 34,-64 52,-62 C 67,-60 69,-40 64,-20 C 58,4 47,38 33,62 C 30,67 25,69 22,65 C 20,61 22,53 25,44 C 33,21 38,-4 36,-24 C 34,-38 27,-44 18,-34 C 8,-22 2,-4 -2,8 C -4,12 -8,12 -10,8 C -14,-4 -20,-22 -30,-34 C -39,-44 -46,-38 -48,-24 C -50,-4 -45,21 -37,44 C -34,53 -32,61 -34,65 C -37,69 -42,67 -45,62 C -59,38 -70,4 -76,-20 C -81,-40 -70,-60 -54,-62 Z M -34,-26 C -31,-14 -32,10 -37,28 C -36,29 -35,28 -34,26 C -29,11 -25,-10 -22,-20 C -18,-32 -13,-42 -8,-48 C -12,-48 -18,-45 -22,-40 C -28,-33 -32,-27 -34,-26 Z M 22,-20 C 25,-10 29,11 34,26 C 35,28 36,29 37,28 C 32,10 31,-14 34,-26 C 32,-27 28,-33 22,-40 C 18,-45 12,-48 8,-48 C 13,-42 18,-32 22,-20 Z" />
        </g>

        {showText && (
          <>
            {/* Title: Dra. Manoela Maia */}
            <text 
              x="160" 
              y="238" 
              textAnchor="middle" 
              fill="#FFFFFF" 
              fontFamily="'Cormorant Garamond', Georgia, serif" 
              fontSize="23" 
              fontWeight="600" 
              letterSpacing="0.6"
            >
              Dra. Manoela Maia
            </text>

            {/* Subtitle line 1: REABILITAÇÃO ORAL & */}
            <text 
              x="160" 
              y="258" 
              textAnchor="middle" 
              fill="#E2F8F5" 
              fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" 
              fontSize="8" 
              fontWeight="600" 
              letterSpacing="2.2"
            >
              REABILITAÇÃO ORAL &amp;
            </text>

            {/* Subtitle line 2: ODONTOLOGIA ESTÉTICA */}
            <text 
              x="160" 
              y="271" 
              textAnchor="middle" 
              fill="#E2F8F5" 
              fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" 
              fontSize="8" 
              fontWeight="600" 
              letterSpacing="2.2"
            >
              ODONTOLOGIA ESTÉTICA
            </text>
          </>
        )}
      </svg>
    </span>
  );
};
