import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from '../lib/translations.js';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const { t } = useTranslation(language);

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('nsl-language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      // Auto-detect browser language
      const browserLang = navigator.language || navigator.userLanguage;
      if (browserLang.startsWith('hi')) {
        setLanguage('hi');
      } else if (browserLang.startsWith('te')) {
        setLanguage('te');
      }
      // Default to English for other languages
    }
  }, []);

  // Save language preference
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('nsl-language', newLanguage);
  };

  const value = {
    language,
    changeLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
