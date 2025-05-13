import React from "react";
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";
import formularyCss from "@/app/styles/formulary.module.css";

const colorDark =
  "linear-gradient(70deg, rgba(25,21,70,1) 0%, rgba(9,9,121,0.5) 35%, rgba(25,21,70,1) 100%)";
const greenColor =
  "linear-gradient(90deg, rgba(112,222,115,1) 0%, rgba(52,199,200,1) 30%, rgba(52,199,200,1) 70%, rgba(112,222,115,1) 100%)";
const ObligatoryButtons = ({
  nameOfGame,
  isDarkMode,
  setIsDarkMode,
  shortIntroduction,
  introductionOfTheGame,
  platform,
  releaseDate,
  selectedAgePegi,
  isUrlPoster,
  SoloMulti,
}) => {
  const { language } = useLanguage();
  return (
    <section className={`w-[241px] p-2 mb-3 rounded-xl font-bold ${formularyCss.neuphormismUndergroung}`}>
      <div className="flex justify-center mt-3 laptop:mt-0 mx-auto">
        {/* is Dark Mode */}
        <div
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 bg-black text-white w-[200px] cursor-pointer rounded-xl border"
        >
          {language == "fr"
            ? "Texte noir et fond blanc"
            : "Black text and white background"}
        </div>
      </div>
      
      {/* List ------------------ */}
      <div className="flex justify-center text-white text-xl mb-2" style={{ textShadow: "3px 3px 4px blue" }}>
        {language == "fr" ? "Obligatoire" : "Obligatory"}
      </div>

      <div className={formularyCss.bandeauTop}>
        {/* Name of game */}
        <div
          style={{
            backgroundImage:
              nameOfGame.length > 1 ? greenColor : colorDark,
            padding: "0.3rem 0.5rem",
          }}
        >
          {language === "fr" ? "Nom du jeu" : "Name of game"}
        </div>

        {/* Short introduction */}
        <div
          style={{
            backgroundImage:
              shortIntroduction.length > 1 ? greenColor : colorDark,
            padding: "0.3rem 0.5rem",
          }}
        >
          {language === "fr" ? "Introduction courte" : "Short introduction"}
        </div>

        {/* Detailed presentation */}
        <div
          style={{
            backgroundImage:
              introductionOfTheGame.length > 1 ? greenColor : colorDark,
            padding: "0.3rem 0.5rem",
          }}
        >
          {language === "fr"
            ? "Présentation détaillée"
            : "Detailed presentation"}
        </div>

        {/* Platform */}
        <div
          style={{
            backgroundImage: platform.length !== 0 ? greenColor : colorDark,
            padding: "0.3rem 0.5rem",
          }}
        >
          {language === "fr" ? "Plate-forme" : "Platform"}
        </div>

        {/* Release date */}
        <div
          style={{
            backgroundImage: releaseDate !== null ? greenColor : colorDark,
            padding: "0.3rem 0.5rem",
          }}
        >
          {language === "fr" ? "Date de sortie" : "Release date"}
        </div>

        {/* PEGI age & category */}
        <div
          style={{
            backgroundImage:
              selectedAgePegi.length != "" ? greenColor : colorDark,
            padding: "0.3rem 0.5rem",
          }}
        >
          {language === "fr" ? "Pegi âge & catégorie" : "PEGI age & category"}
        </div>

        {/* Poster */}
        <div
          style={{
            backgroundImage:
              isUrlPoster.length != "" ? greenColor : colorDark,
            padding: "0.3rem 0.5rem",
          }}
        >
          {language === "fr" ? "Affiche" : "Poster"}
        </div>

        {/* Solo / Multi */}
        <div
          style={{
            backgroundImage: SoloMulti.length != "" ? greenColor : colorDark,
            padding: "0.3rem 0.5rem",
          }}
        >
          {language === "fr" ? "Solo / Multi" : "Solo / Multi"}
        </div>
      </div>
    </section>
  );
};

export default ObligatoryButtons;
