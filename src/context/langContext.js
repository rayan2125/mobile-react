import React, { createContext, useState, useEffect, useContext } from 'react';
import i18n from '../i18n/i18n';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    // Initialize i18n
    i18n.init().then(() => {
      setCurrentLang(i18n.getCurrentLanguage());
    });

    // Listen for changes
    const unsubscribe = i18n.addListener((lang) => {
      setCurrentLang(lang);
    });

    return unsubscribe;
  }, []);

  const changeLanguage = async (langCode) => {
    await i18n.setLanguage(langCode);
    setCurrentLang(langCode);
  };

  const t = (key, params) => i18n.t(key, params);

  return (
    <LanguageContext.Provider value={{
      currentLang,
      changeLanguage,
      t,
      availableLanguages: i18n.getAvailableLanguages()
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};