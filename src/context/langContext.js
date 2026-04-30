// src/context/LangContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { setAppLanguage, loadAppLanguage } from "../utils/lang";
import i18n from "../i18n";

// Context banao
const LangContext = createContext();

// Provider — poori app ko wrap karega
export const LangProvider = ({ children }) => {
  const [locale, setLocale] = useState(i18n.locale);

  useEffect(() => {
    // App open hone par pehle saved language load karo
    const init = async () => {
      await loadAppLanguage();
      setLocale(i18n.locale);
    };
    init();
  }, []);

  // Yeh function SelectLang call karega
  const changeLanguage = async (langCode) => {
    await setAppLanguage(langCode);
    setLocale(langCode); // yeh re-render trigger karega
  };

  return (
    <LangContext.Provider value={{ locale, changeLanguage, t: (key) => i18n.t(key) }}>
      {children}
    </LangContext.Provider>
  );
};

// Yeh hook har screen mein use karenge
export const useLang = () => useContext(LangContext);