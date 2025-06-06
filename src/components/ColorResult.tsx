import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ColorInfo } from '../lib/colorTheory';

interface ColorResultProps {
  colors: ColorInfo[];
}

export const ColorResult: React.FC<ColorResultProps> = ({ colors }) => {
  const { t } = useTranslation();
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  // Calculate color luminance for contrast
  const calculateLuminance = useCallback((hexColor: string): number => {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16) / 255;
    const g = parseInt(hexColor.slice(3, 5), 16) / 255;
    const b = parseInt(hexColor.slice(5, 7), 16) / 255;

    // Calculate relative luminance (standard sRGB)
    const a = [r, g, b].map((v) => {
      return v <= 0.03928 
        ? v / 12.92 
        : Math.pow((v + 0.055) / 1.055, 2.4);
    });

    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }, []);

  // Determine text color based on background luminance
  const getContrastColor = useCallback((hexColor: string): string => {
    const luminance = calculateLuminance(hexColor);
    return luminance > 0.5 ? 'text-black' : 'text-white';
  }, [calculateLuminance]);

  // Calculate contrast ratio
  const getContrastRatio = useCallback((color1: string, color2: string): number => {
    const luminance1 = calculateLuminance(color1);
    const luminance2 = calculateLuminance(color2);

    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);

    return (lighter + 0.05) / (darker + 0.05);
  }, [calculateLuminance]);

  // Copy color to clipboard
  const copyToClipboard = useCallback((hex: string) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopiedColor(hex);
      setTimeout(() => setCopiedColor(null), 2000);
    });
  }, []);

  // Render color swatch
  const renderColorSwatch = useCallback((color: ColorInfo, index: number) => {
    const contrastColor = getContrastColor(color.hex);
    
    return (
      <div 
        key={`${color.hex}-${index}`}
        className="color-swatch relative rounded-lg shadow-md overflow-hidden group"
        style={{ backgroundColor: color.hex }}
      >
        {/* Hover overlay */}
        <div 
          className={`
            absolute inset-0 
            bg-black bg-opacity-0 group-hover:bg-opacity-50
            transition-all duration-300
            flex flex-col items-center justify-center
            opacity-0 group-hover:opacity-100
            ${contrastColor}
          `}
        >
          {/* Color details on hover */}
          <button 
            onClick={() => copyToClipboard(color.hex)}
            className="flex flex-col items-center justify-center"
          >
            <span className="font-mono text-sm">
              {color.hex.toUpperCase()}
            </span>
            <span className="text-xs mt-1">
              {color.name}
            </span>
          </button>

          {/* Copied notification */}
          {copiedColor === color.hex && (
            <div className="absolute bottom-2 bg-white bg-opacity-80 px-2 py-1 rounded text-xs text-black">
              {t('colorResult.copiedToClipboard')}
            </div>
          )}
        </div>

        {/* Color base display */}
        <div 
          className={`
            w-full aspect-square 
            flex items-end p-3
            ${contrastColor}
          `}
        >
          <div className="flex flex-col">
            <span className="font-mono text-xs font-semibold">
              {color.hex.toUpperCase()}
            </span>
            <span className="text-xs">
              {color.name}
            </span>
          </div>
        </div>
      </div>
    );
  }, [copyToClipboard, getContrastColor, t, copiedColor]);

  // If no colors, show placeholder
  if (colors.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        {t('colorResult.noColors')}
      </div>
    );
  }

  return (
    <div className="color-result-grid grid grid-cols-3 gap-4 mt-8">
      {colors.map(renderColorSwatch)}
    </div>
  );
};
