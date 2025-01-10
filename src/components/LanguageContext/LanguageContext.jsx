"use client"
// LanguageContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr'); // Valeur par défaut

  useEffect(() => {
    const userLanguage = navigator.language || navigator.userLanguage; // Pour les anciens navigateurs
    setLanguage(userLanguage);
  }, []);

  // Définir la fonction changeLanguage
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, changeLanguage  }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};