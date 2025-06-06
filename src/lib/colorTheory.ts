import { hexToHSL, hslToHex } from './colorConversions';

export type ColorScheme = 
  | 'complementary' 
  | 'analogous' 
  | 'triadic' 
  | 'tetradic' 
  | 'monochromatic';

export interface ColorInfo {
  hex: string;
  name: string;
}

const COLOR_NAMES: Record<string, { es: string, en: string }> = {
  '#FF0000': { es: 'Rojo', en: 'Red' },
  '#00FF00': { es: 'Verde', en: 'Green' },
  '#0000FF': { es: 'Azul', en: 'Blue' },
  // Add more color names as needed
};

export function getColorName(hex: string, lang: 'es' | 'en' = 'es'): string {
  // Normalize the hex code
  const normalizedHex = hex.toUpperCase().startsWith('#') ? hex.toUpperCase() : `#${hex.toUpperCase()}`;
  
  // Try to find an exact match
  if (COLOR_NAMES[normalizedHex]) {
    return COLOR_NAMES[normalizedHex][lang];
  }
  
  // Fallback to hex if no name found
  return normalizedHex;
}

export function getComplementaryColor(baseHex: string): ColorInfo {
  const { h, s, l } = hexToHSL(baseHex);
  
  // Rotate hue by 180 degrees
  const complementaryHue = (h + 180) % 360;
  
  const complementaryHex = hslToHex(complementaryHue, s, l);
  
  return {
    hex: complementaryHex,
    name: getColorName(complementaryHex)
  };
}

export function getAnalogousColors(baseHex: string): ColorInfo[] {
  const { h, s, l } = hexToHSL(baseHex);
  
  // Get two colors on either side of the base color (30 degrees apart)
  const analogous1Hue = (h + 30) % 360;
  const analogous2Hue = (h - 30 + 360) % 360;
  
  return [
    {
      hex: hslToHex(analogous1Hue, s, l),
      name: getColorName(hslToHex(analogous1Hue, s, l))
    },
    {
      hex: hslToHex(analogous2Hue, s, l),
      name: getColorName(hslToHex(analogous2Hue, s, l))
    }
  ];
}

export function getTriadicColors(baseHex: string): ColorInfo[] {
  const { h, s, l } = hexToHSL(baseHex);
  
  // Get two colors that form an equilateral triangle on the color wheel
  const triadic1Hue = (h + 120) % 360;
  const triadic2Hue = (h - 120 + 360) % 360;
  
  return [
    {
      hex: hslToHex(triadic1Hue, s, l),
      name: getColorName(hslToHex(triadic1Hue, s, l))
    },
    {
      hex: hslToHex(triadic2Hue, s, l),
      name: getColorName(hslToHex(triadic2Hue, s, l))
    }
  ];
}

export function getTetradicColors(baseHex: string): ColorInfo[] {
  const { h, s, l } = hexToHSL(baseHex);
  
  // Get three additional colors that form a rectangle on the color wheel
  const tetradic1Hue = (h + 90) % 360;
  const tetradic2Hue = (h + 180) % 360;
  const tetradic3Hue = (h + 270) % 360;
  
  return [
    {
      hex: hslToHex(tetradic1Hue, s, l),
      name: getColorName(hslToHex(tetradic1Hue, s, l))
    },
    {
      hex: hslToHex(tetradic2Hue, s, l),
      name: getColorName(hslToHex(tetradic2Hue, s, l))
    },
    {
      hex: hslToHex(tetradic3Hue, s, l),
      name: getColorName(hslToHex(tetradic3Hue, s, l))
    }
  ];
}

export function getMonochromaticColors(baseHex: string): ColorInfo[] {
  const { h, s, l } = hexToHSL(baseHex);
  
  // Create variations by adjusting lightness
  const lightVariations = [
    { adjust: -20, label: 'Oscuro' },
    { adjust: 20, label: 'Claro' }
  ];
  
  return lightVariations.map(variation => ({
    hex: hslToHex(h, s, Math.max(0, Math.min(100, l + variation.adjust))),
    name: `${getColorName(baseHex)} ${variation.label}`
  }));
}

export function getColorScheme(baseHex: string, scheme: ColorScheme): ColorInfo[] {
  switch (scheme) {
    case 'complementary':
      const complementary = getComplementaryColor(baseHex);
      return [
        { 
          hex: baseHex, 
          name: getColorName(baseHex) 
        },
        complementary
      ];
    case 'analogous':
      return [
        { 
          hex: baseHex, 
          name: getColorName(baseHex) 
        },
        ...getAnalogousColors(baseHex)
      ];
    case 'triadic':
      return [
        { 
          hex: baseHex, 
          name: getColorName(baseHex) 
        },
        ...getTriadicColors(baseHex)
      ];
    case 'tetradic':
      return [
        { 
          hex: baseHex, 
          name: getColorName(baseHex) 
        },
        ...getTetradicColors(baseHex)
      ];
    case 'monochromatic':
      return [
        { 
          hex: baseHex, 
          name: getColorName(baseHex) 
        },
        ...getMonochromaticColors(baseHex)
      ];
    default:
      return [{ 
        hex: baseHex, 
        name: getColorName(baseHex) 
      }];
  }
}
