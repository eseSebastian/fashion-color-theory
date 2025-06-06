import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Predefined color palette
const PREDEFINED_COLORS = [
  '#FF0000',   // Red
  '#00FF00',   // Green
  '#0000FF',   // Blue
  '#FFFF00',   // Yellow
  '#FF00FF',   // Magenta
  '#00FFFF',   // Cyan
  '#FFA500',   // Orange
  '#800080',   // Purple
  '#008000',   // Dark Green
  '#000080',   // Navy
  '#FFC0CB',   // Pink
  '#A52A2A'    // Brown
];

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  const [localColor, setLocalColor] = useState(value);

  const handleColorChange = (newColor: string) => {
    setLocalColor(newColor);
    onChange(newColor);
  };

  return (
    <div className="color-picker space-y-4">
      <label 
        htmlFor="color-input" 
        className="block text-sm font-medium text-gray-700"
      >
        {t('colorPicker.label')}
      </label>
      
      <div className="flex items-center space-x-4">
        {/* Native color input */}
        <input 
          type="color" 
          id="color-input"
          value={localColor}
          onChange={(e) => handleColorChange(e.target.value)}
          className="w-16 h-16 rounded-full cursor-pointer"
          aria-label="Color picker"
        />
        
        {/* Color value display */}
        <div 
          className="w-24 h-12 flex items-center justify-center 
                     border border-gray-300 rounded-md 
                     bg-white text-gray-900 font-mono"
        >
          {localColor.toUpperCase()}
        </div>
      </div>
      
      {/* Predefined color palette */}
      <div className="mt-4 grid grid-cols-6 gap-2">
        {PREDEFINED_COLORS.map((color) => (
          <button
            key={color}
            type="button"
            aria-label={`Select ${color}`}
            style={{ backgroundColor: color }}
            className="w-8 h-8 rounded-full hover:scale-110 transition-transform"
            onClick={() => handleColorChange(color)}
          />
        ))}
      </div>
    </div>
  );
};
