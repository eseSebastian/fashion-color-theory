import { useState, useMemo, useCallback } from 'react';
import { 
  getColorScheme, 
  ColorScheme, 
  ColorInfo 
} from '../lib/colorTheory';

interface ColorSchemeHistory {
  baseColor: string;
  scheme: ColorScheme;
  colors: ColorInfo[];
  timestamp: number;
}

export function useColorScheme() {
  const [baseColor, setBaseColor] = useState<string>('#FF0000'); // default red
  const [schemeType, setSchemeType] = useState<ColorScheme>('complementary');
  const [history, setHistory] = useState<ColorSchemeHistory[]>(() => {
    // Try to load history from localStorage, but not using localStorage directly
    const storedHistory = sessionStorage.getItem('colorSchemeHistory');
    return storedHistory ? JSON.parse(storedHistory) : [];
  });

  const colors = useMemo(() => {
    return getColorScheme(baseColor, schemeType);
  }, [baseColor, schemeType]);

  const updateBaseColor = useCallback((color: string) => {
    setBaseColor(color);
    
    // Create history entry
    const newEntry: ColorSchemeHistory = {
      baseColor: color,
      scheme: schemeType,
      colors,
      timestamp: Date.now()
    };

    // Update history
    const updatedHistory = [
      newEntry, 
      ...history.slice(0, 4) // Keep last 5 entries
    ];
    
    setHistory(updatedHistory);
    
    // Persist to sessionStorage
    sessionStorage.setItem('colorSchemeHistory', JSON.stringify(updatedHistory));
  }, [colors, schemeType, history]);

  const updateSchemeType = useCallback((scheme: ColorScheme) => {
    setSchemeType(scheme);
    
    // Create history entry
    const newEntry: ColorSchemeHistory = {
      baseColor,
      scheme,
      colors,
      timestamp: Date.now()
    };

    // Update history
    const updatedHistory = [
      newEntry, 
      ...history.slice(0, 4) // Keep last 5 entries
    ];
    
    setHistory(updatedHistory);
    
    // Persist to sessionStorage
    sessionStorage.setItem('colorSchemeHistory', JSON.stringify(updatedHistory));
  }, [baseColor, colors, history]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    sessionStorage.removeItem('colorSchemeHistory');
  }, []);

  return {
    baseColor,
    schemeType,
    colors,
    history,
    updateBaseColor,
    updateSchemeType,
    clearHistory
  };
}
