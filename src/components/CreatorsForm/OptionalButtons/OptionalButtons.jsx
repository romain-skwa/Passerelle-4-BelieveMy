import React from "react";
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";
import formularyCss from "@/app/styles/formulary.module.css";

const colorDark =
  "linear-gradient(70deg, rgba(25,21,70,1) 0%, rgba(9,9,121,0.5) 35%, rgba(25,21,70,1) 100%)";
const greenColor =
  "linear-gradient(90deg, rgba(112,222,115,1) 0%, rgba(52,199,200,1) 30%, rgba(52,199,200,1) 70%, rgba(112,222,115,1) 100%)";

const OptionalButtons = ({
  nameOfGame,
  urlBackgroundCloudinary,
  genreOfGame,
  videoLink,
  webSiteOfThisGame,
  webSiteOfThisCreator,
  steamLink,
  epicGamesLink,
  urlImageOne,
  urlImageTwo,
  urlImageThree,
}) => {
  const { language } = useLanguage();
  return (
    <section className={`w-[241px] p-2 font-bold rounded-xl  ${formularyCss.neuphormismUndergroung}`}>
      <div
        className="flex justify-center text-white text-xl mb-2"
        style={{ textShadow: "3px 3px 4px blue" }}
      >
        {language == "fr" ? "Facultatif" : "Optional"}
      </div>

      <div className={formularyCss.bandeauTop}>
        <div style={{ backgroundImage: colorDark }}>
          <div
            style={{
              backgroundImage:
                urlImageOne.length != "" ? greenColor : colorDark,
              padding: "0.3rem 0.5rem",
            }}
          >
            {language === "fr"
              ? "Image d'illustration n°1"
              : "Illustration image #1"}
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div
            style={{
              backgroundImage:
                urlImageTwo.length != "" ? greenColor : colorDark,
              padding: "0.3rem 0.5rem",
            }}
          >
            {language === "fr"
              ? "Image d'illustration n°2"
              : "Illustration image #2"}
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div
            style={{
              backgroundImage:
                urlImageThree.length != "" ? greenColor : colorDark,
              padding: "0.3rem 0.5rem",
            }}
          >
            {language === "fr"
              ? "Image d'illustration n°3"
              : "Illustration image #3"}
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div
            style={{
              backgroundImage:
                urlBackgroundCloudinary.length != "" ? greenColor : colorDark,
              padding: "0.3rem 0.5rem",
            }}
          >
            {language === "fr" ? "Arrière plan" : "Background"}
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div
            style={{
              backgroundImage:
                genreOfGame.length != "" ? greenColor : colorDark,
              padding: "0.3rem 0.5rem",
            }}
          >
            {language === "fr" ? "Catégorie" : "Category"}
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div
            style={{
              backgroundImage: videoLink.length != "" ? greenColor : colorDark,
              padding: "0.3rem 0.5rem",
            }}
          >
            {language === "fr" ? "Vidéo youtube" : "Youtube video"}
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div
            style={{
              backgroundImage:
                webSiteOfThisGame.length != "" ? greenColor : colorDark,
              padding: "0.3rem 0.5rem",
            }}
          >
            {language === "fr" ? "Site officiel du jeu" : "Official website"}
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div
            style={{
              backgroundImage:
                webSiteOfThisCreator.length != "" ? greenColor : colorDark,
              padding: "0.3rem 0.5rem",
            }}
          >
            {language === "fr"
              ? "Site officiel des créateurs"
              : "Webiste of creators"}
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div
            style={{
              backgroundImage: steamLink.length != "" ? greenColor : colorDark,
              padding: "0.3rem 0.5rem",
            }}
          >
            {language === "fr" ? "Lien vers le site Steam" : "Steam link"}
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div
            style={{
              backgroundImage:
                epicGamesLink.length != "" ? greenColor : colorDark,
              padding: "0.3rem 0.5rem",
            }}
          >
            {language === "fr" ? "Lien vers le site Epic" : "Epic link"}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OptionalButtons;
