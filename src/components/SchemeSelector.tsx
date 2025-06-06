import React from 'react';
import { useTranslation } from 'react-i18next';
import { ColorScheme } from '../lib/colorTheory';

// SVG icons for different color schemes
const SchemeIcons = {
  complementary: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="40" fill="#FF0000" />
      <circle cx="50" cy="50" r="40" fill="#0000FF" opacity="0.5" transform="rotate(180 50 50)" />
    </svg>
  ),
  analogous: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="40" fill="#FF0000" />
      <circle cx="50" cy="50" r="30" fill="#FF8000" opacity="0.7" />
      <circle cx="50" cy="50" r="20" fill="#FF4000" opacity="0.7" />
    </svg>
  ),
  triadic: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="40" fill="#FF0000" />
      <circle cx="50" cy="50" r="40" fill="#00FF00" opacity="0.5" transform="rotate(120 50 50)" />
      <circle cx="50" cy="50" r="40" fill="#0000FF" opacity="0.5" transform="rotate(240 50 50)" />
    </svg>
  ),
  tetradic: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect x="10" y="10" width="80" height="80" fill="#FF0000" />
      <rect x="10" y="10" width="80" height="80" fill="#00FF00" opacity="0.5" transform="rotate(90 50 50)" />
      <rect x="10" y="10" width="80" height="80" fill="#0000FF" opacity="0.5" transform="rotate(180 50 50)" />
      <rect x="10" y="10" width="80" height="80" fill="#FFFF00" opacity="0.5" transform="rotate(270 50 50)" />
    </svg>
  ),
  monochromatic: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect x="20" y="20" width="60" height="60" fill="#FF0000" />
      <rect x="30" y="30" width="40" height="40" fill="#FF4040" opacity="0.7" />
      <rect x="40" y="40" width="20" height="20" fill="#FF8080" opacity="0.7" />
    </svg>
  )
};

interface SchemeSelectorProps {
  selectedScheme: ColorScheme;
  onSelectScheme: (scheme: ColorScheme) => void;
}

export const SchemeSelector: React.FC<SchemeSelectorProps> = ({ 
  selectedScheme, 
  onSelectScheme 
}) => {
  const { t } = useTranslation();

  const schemes: ColorScheme[] = [
    'complementary', 
    'analogous', 
    'triadic', 
    'tetradic', 
    'monochromatic'
  ];

  return (
    <div className="scheme-selector">
      <h2 className="text-lg font-semibold mb-4">
        {t('app.chooseColorScheme')}
      </h2>
      
      <div className="grid grid-cols-3 gap-4">
        {schemes.map((scheme) => (
          <button
            key={scheme}
            type="button"
            aria-label={t(`schemeSelector.${scheme}`)}
            className={`
              relative w-full aspect-square rounded-lg 
              border-2 transition-all duration-300 
              hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black
              ${selectedScheme === scheme 
                ? 'border-black shadow-lg' 
                : 'border-gray-300 opacity-70'}
            `}
            onClick={() => onSelectScheme(scheme)}
          >
            <div className="absolute inset-3">
              {SchemeIcons[scheme]}
            </div>
            <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs">
              {t(`schemeSelector.${scheme}`)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
