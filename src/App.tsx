import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ColorPicker } from './components/ColorPicker';
import { SchemeSelector } from './components/SchemeSelector';
import { ColorResult } from './components/ColorResult';
import { useColorScheme } from './hooks/useColorScheme';
import './i18n'; // Import i18n configuration
import './styles/globals.css';

const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="
        px-3 py-1 rounded-full 
        bg-gray-100 hover:bg-gray-200 
        text-sm font-medium
        transition-colors
      "
    >
      {i18n.language === 'es' ? 'English' : 'Español'}
    </button>
  );
};

const App: React.FC = () => {
  const { t } = useTranslation();
  const {
    baseColor,
    schemeType,
    colors,
    history,
    updateBaseColor,
    updateSchemeType,
    clearHistory
  } = useColorScheme();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('app.title')}
          </h1>
          <LanguageToggle />
        </header>

        {/* Hero Section */}
        <section className="text-center">
          <h2 className="text-xl text-gray-600 mb-4">
            {t('app.description')}
          </h2>
        </section>

        {/* Color Selection Area */}
        <section className="grid md:grid-cols-2 gap-8">
          {/* Color Picker */}
          <div>
            <ColorPicker 
              value={baseColor} 
              onChange={updateBaseColor} 
            />
          </div>

          {/* Scheme Selector */}
          <div>
            <SchemeSelector 
              selectedScheme={schemeType}
              onSelectScheme={updateSchemeType}
            />
          </div>
        </section>

        {/* Color Results */}
        <section>
          <ColorResult colors={colors} />
        </section>

        {/* History Section (Optional) */}
        {history.length > 0 && (
          <section className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Recent Combinations</h3>
              <button 
                onClick={clearHistory}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Clear History
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {history.map((entry, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-md p-4"
                >
                  <div className="flex space-x-2 mb-2">
                    {entry.colors.map(color => (
                      <div 
                        key={color.hex}
                        className="w-8 h-8 rounded-full"
                        style={{ backgroundColor: color.hex }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600">
                    {new Date(entry.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm mt-8">
          <p>© {new Date().getFullYear()} Fashion Color Theory</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
