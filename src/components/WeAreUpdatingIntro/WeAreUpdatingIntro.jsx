import { VT323 } from "next/font/google";
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";

const vt323 = VT323({
  // Police d'écriture
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function weAreUpdatingIntro({ comparaison }) {
  const { language } = useLanguage();

  return (
    <section className="flex flex-col w-full h-screen justify-center items-center">
      <section className="w-[95vw] tablet:w-[50vw] bg-black pb-2">
        <div
          className={`text-white text-center uppercase ${vt323.className} text-2xl mt-6`}
          style={{ letterSpacing: "0.1em" }}
        >
          {language === "fr" ? "Nous mettons à jour" : "We are updating"}
        </div>

        {comparaison.isNameOfGameChanged && (
          <div
            className={`text-white text-center uppercase ${vt323.className} text-xl mt-4`}
            style={{ letterSpacing: "0.1em" }}
          >
            {language === "fr" ? "Le nom du jeu" : "The name of the game"}
          </div>
        )}
        {comparaison.isShortIntroChanged && (
          <div
            className={`text-white text-center uppercase ${vt323.className} text-xl mt-4`}
            style={{ letterSpacing: "0.1em" }}
          >
            {language === "fr" ? "L'introduction" : "The introduction"}
          </div>
        )}
        {comparaison.isIntroChanged && (
          <div
            className={`text-white text-center uppercase ${vt323.className} text-xl mt-4`}
            style={{ letterSpacing: "0.1em" }}
          >
            {language === "fr"
              ? "La présentation détaillée"
              : "The detailed introduction"}
          </div>
        )}
        {comparaison.isPlatformChanged && (
          <div
            className={`text-white text-center uppercase ${vt323.className} text-xl mt-4`}
            style={{ letterSpacing: "0.1em" }}
          >
            {language === "fr"
              ? "La section plateforme"
              : "The platform section"}
          </div>
        )}
        {comparaison.isReleaseDateChanged && (
          <div
            className={`text-white text-center uppercase ${vt323.className} text-xl mt-4`}
            style={{ letterSpacing: "0.1em" }}
          >
            {language === "fr" ? "La date de sortie" : "The release date"}
          </div>
        )}
        {comparaison.isSelectedAgePegiChanged && (
          <div
            className={`text-white text-center uppercase ${vt323.className} text-xl mt-4`}
            style={{ letterSpacing: "0.1em" }}
          >
            {language === "fr"
              ? "L'âge PEGI sélectionné"
              : "The selected PEGI age"}
          </div>
        )}
        {comparaison.isSelectedAdditionalPegiChanged && (
          <div
            className={`text-white text-center uppercase ${vt323.className} text-xl mt-4`}
            style={{ letterSpacing: "0.1em" }}
          >
            {language === "fr"
              ? "Les PEGI de genre sélectionnés"
              : "The selected additional PEGI"}
          </div>
        )}
        {comparaison.isSoloMultiChanged && (
          <div
            className={`text-white text-center uppercase ${vt323.className} text-xl mt-4`}
            style={{ letterSpacing: "0.1em" }}
          >
            {language === "fr" ? "Le mode solo/multi" : "The solo/multi mode"}
          </div>
        )}
        {comparaison.isUrlPosterChanged && (
          <div
            className={`text-white text-center uppercase ${vt323.className} text-xl mt-4`}
            style={{ letterSpacing: "0.1em" }}
          >
            {language === "fr" ? "L'affiche" : "The poster"}
          </div>
        )}
        {comparaison.isUrlImageOneChanged && (
          <div
            className={`text-white text-center uppercase ${vt323.className} text-xl mt-4`}
            style={{ letterSpacing: "0.1em" }}
          >
            {language === "fr"
              ? "La première image"
              : "The URL of the first image"}
          </div>
        )}
        {comparaison.isUrlImageTwoChanged && (
          <div
            className={`text-white text-center uppercase ${vt323.className} text-xl mt-4`}
            style={{ letterSpacing: "0.1em" }}
          >
            {language === "fr"
              ? "L'URL de la deuxième image"
              : "The URL of the second image"}
          </div>
        )}
        {comparaison.isUrlImageThreeChanged && (
          <div
            className={`text-white text-center uppercase ${vt323.className} text-xl mt-4`}
            style={{ letterSpacing: "0.1em" }}
          >
            {language === "fr"
              ? "L'URL de la troisième image"
              : "The URL of the third image"}
          </div>
        )}
        {comparaison.isVideoLinkChanged && (
          <div
            className={`text-white text-center uppercase ${vt323.className} text-xl mt-4`}
            style={{ letterSpacing: "0.1em" }}
          >
            {language === "fr" ? "Le lien vidéo" : "The video link"}
          </div>
        )}
        {comparaison.isWebSiteOfThisCreatorChanged && (
          <div
            className={`text-white text-center uppercase ${vt323.className} text-xl mt-4`}
            style={{ letterSpacing: "0.1em" }}
          >
            {language === "fr"
              ? "Le lien vers le site web de ce créateur"
              : "The link to the website of this creator"}
          </div>
        )}
        {comparaison.isWebSiteOfThisGameChanged && (
          <div
            className={`text-white text-center uppercase ${vt323.className} text-xl mt-4`}
            style={{ letterSpacing: "0.1em" }}
          >
            {language === "fr"
              ? "Le lien vers le site web de ce jeu"
              : "The link to the website of this game"}
          </div>
        )}
      </section>
    </section>
  );
}
