"use client";
import { useState, useEffect } from "react";
import { Press_Start_2P } from "next/font/google";
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";

const pressStart2P = Press_Start_2P({
  // Police d'écriture
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function TextOneByOne({frenchPhrase, englishPhrase}) {
  const { language } = useLanguage();
  const [index, setIndex] = useState(0);
  const [phraseAAficher, setPhraseAAficher] = useState("");

  const phrase = language === "fr"  ? frenchPhrase : englishPhrase;

  //const phrase = "Présentez votre parcours. Évoquez vos jeux. C'est à vous...";
  useEffect(() => {
    if (index > phrase.length - 1 || !phrase) {
      return;
    }
    const interval = setTimeout(() => {
      setPhraseAAficher((prev) => prev + phrase[index]); // Met à jour l'état avec la lettre actuelle
      setIndex((prev) => prev + 1);
      if (index > phrase.length - 1) {
        clearTimeout(interval);
      }
    }, 70);

    return () => clearTimeout(interval);
  }, [index]);

  useEffect(() => {
    setPhraseAAficher("");
    setIndex(0);
  }, [language]);

  return (
    <span className={`${pressStart2P.className} text-[10px] tablet:text-sm`}>
      {phraseAAficher}
    </span>
  );
}
