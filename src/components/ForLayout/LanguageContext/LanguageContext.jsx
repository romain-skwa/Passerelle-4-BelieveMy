"use client"
import { usePathname } from 'next/navigation';
// LanguageContext.js
import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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

  // Définir la fonction changeLanguage
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };  
    
/************************************************************************* */

  return (
    <LanguageContext.Provider value={{ 
      language,
      setLanguage,
      changeLanguage,
      }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};