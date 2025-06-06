import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ColorInfo } from '../lib/colorTheory';

interface ColorResultProps {
  colors: ColorInfo[];
}

export const ColorResult: React.FC<ColorResultProps> = ({ colors }) => {
  const { t } = useTranslation();
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopiedColor(hex);
      setTimeout(() => setCopiedColor(null), 2000);
    });
  };

  // Calculate contrast for text color
  const getContrastColor = (hexColor: string): string => {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    return luminance > 0.5 ? 'text-black' : 'text-white';
  };

  return (
    <div className="color-result-grid grid grid-cols-3 gap-4 mt-8">
      {colors.map((color, index) => (
        <div 
          key={`${color.hex}-${index}`}
          className="color-swatch relative rounded-lg shadow-md overflow-hidden"
          style={{ backgroundColor: color.hex }}
        >
          <button
            onClick={() => copyToClipboard(color.hex)}
            className={`
              absolute inset-0 flex flex-col items-center justify-center
              transition-opacity duration-300 opacity-0 hover:opacity-100
              bg-black bg-opacity-50 
              ${getContrastColor(color.hex)}
            `}
          >
            <span className="font-mono text-sm">
              {color.hex.toUpperCase()}
            </span>
            <span className="text-xs mt-1">
              {color.name}
            </span>
            {copiedColor === color.hex && (
              <span className="absolute bottom-2 text-xs bg-white bg-opacity-70 px-2 py-1 rounded">
                {t('colorResult.copiedToClipboard')}
              </span>
            )}
          </button>
          
          {/* Color display */}
          <div 
            className="w-full aspect-square flex items-end p-2"
            style={{ backgroundColor: color.hex }}
          >
            <div className={`
              text-xs font-mono font-semibold
              ${getContrastColor(color.hex)}
            `}>
              {color.hex.toUpperCase()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ColorInfo } from '../lib/colorTheory';

interface ColorResultProps {
  colors: ColorInfo[];
}

export const ColorResult: React.FC<ColorResultProps> = ({ colors }) => {
  const { t } = useTranslation();
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopiedColor(hex);
      setTimeout(() => setCopiedColor(null), 2000);
    });
  };

  // Calculate contrast for text color
  const getContrastColor = (hexColor: string): string => {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    return luminance > 0.5 ? 'text-black' : 'text-white';
  };

  return (
    <div className="color-result-grid grid grid-cols-3 gap-4 mt-8">
      {colors.map((color, index) => (
        <div 
          key={`${color.hex}-${index}`}
          className="color-swatch relative rounded-lg shadow-md overflow-