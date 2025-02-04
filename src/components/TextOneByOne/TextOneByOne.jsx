"use client";
import { useState, useEffect, useRef } from "react";
import { Press_Start_2P } from "next/font/google";
import { useLanguage } from "@/components/LanguageContext/LanguageContext";

const pressStart2P = Press_Start_2P({
  // Police d'écriture
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function TextOneByOne() {
  const { language } = useLanguage();
  const [index, setIndex] = useState(0);
  const [phraseAAficher, setPhraseAAficher] = useState("");
/*
  const phrase = language === "fr" 
    ? "Présentez votre parcours. Évoquez vos jeux. C'est à vous..." 
    : "Present your background. Mention your games. It's your turn...";
*/
const phrase = "Présentez votre parcours. Évoquez vos jeux. C'est à vous...";
  useEffect(() => {
    if((index > (phrase.length - 1)) || (!phrase)) {
        return;
      }
    const interval = setTimeout(() => {
      setPhraseAAficher((prev) => prev + phrase[index]); // Met à jour l'état avec la lettre actuelle
      setIndex((prev) => prev + 1)
      if(index > (phrase.length - 1)){clearTimeout(interval)}
    }, 200)
    
    return () => clearTimeout(interval)     

  }, [index]);


  return (
    <div className={`${pressStart2P.className} textareaIntroYourself h-20`}>
      {phraseAAficher}
    </div>
  );
}