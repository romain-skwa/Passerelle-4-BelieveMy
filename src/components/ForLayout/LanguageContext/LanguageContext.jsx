"use client"
// LanguageContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr'); // Valeur par défaut

  useEffect(() => {
    const userLanguages = navigator.languages || [navigator.language]; // Récupère les langues préférées

    // Vérifie si la première langue est française ou un de ses dérivés
    const firstLanguage = userLanguages[0];
    const isFrenchPreferred = firstLanguage.startsWith('fr');

    // Détermine la langue détectée
    const detectedLanguage = isFrenchPreferred ? 'fr' : firstLanguage;

    setLanguage(detectedLanguage);
  }, []);

/************************************************************************* */

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};