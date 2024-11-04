// ApercuFormulaire.js
import React from "react";
import "../../app/styles/components.css";
import Image from "next/image";
import logoPegi3 from "../../../public/logo/pegi_3.jpg";
import logoPegi7 from "../../../public/logo/pegi_7.jpg";
import logoPegi12 from "../../../public/logo/pegi_12.jpg";
import logoPegi16 from "../../../public/logo/pegi_16.jpg";
import logoPegi18 from "../../../public/logo/pegi_18.jpg";
import logoPegiSexe from "../../../public/logo/pegi_sexe.jpg";
import logoPegiOnline from "../../../public/logo/pegi_online.jpg";
import logoPegiNudite from "../../../public/logo/pegi_nudite.jpg";
import logoPegiJeuxHasard from "../../../public/logo/pegi_jeuxHasard.jpg";
import logoPegiViolence from "../../../public/logo/pegi_violence.jpg";
import logoPegiLangageGrossier from "../../../public/logo/pegi_langageGrossier.jpg";
import logoPegiPeur from "../../../public/logo/pegi_peur.jpg";
import logoPegiDrogue from "../../../public/logo/pegi_drogue.jpg";
import logoPegiDiscrimination from "../../../public/logo/pegi_discrimination.jpg";

const pegiImages = {
  3: { src: logoPegi3, title: "Pegi 3" },
  7: { src: logoPegi7, title: "Pegi 7" },
  12: { src: logoPegi12, title: "Pegi 12" },
  16: { src: logoPegi16, title: "Pegi 16" },
  18: { src: logoPegi18, title: "Pegi 18" },
  "Jeux de Hasard": { src: logoPegiJeuxHasard, title: "Jeux de Hasard" },
  Violence: { src: logoPegiViolence, title: "Violence" },
  "Langage Grossier": {
    src: logoPegiLangageGrossier,
    title: "Langage Grossier",
  },
  Peur: { src: logoPegiPeur, title: "Peur" },
  Sexe: { src: logoPegiSexe, title: "Sexe" },
  Online: { src: logoPegiOnline, title: "Online" },
  Nudité: { src: logoPegiNudite, title: "Nudité" },
  Drogue: { src: logoPegiDrogue, title: "Drogue" },
  Discrimination: { src: logoPegiDiscrimination, title: "Discrimination" },
};
const ApercuFormulaire = ({
  introductionOfTheGame,
  nameOfGame,
  isDarkMode,
  selectedAgePegi,
  selectedAdditionalPegi,
  shortIntroduction,
  releaseDate,
}) => {
    // Formatage de la date
    const formattedDate = releaseDate ? new Date(releaseDate).toLocaleDateString("fr-FR", {
      day: 'numeric',  
      month: 'long',  
      year: 'numeric'  
    }) : '';
  return (
    <section>
      <h3>Aperçu :</h3>
      <div
        className={`p-4 min-h-[50px] text-3xl font-bold text-center ${
          isDarkMode ? "text-white bg-black" : "text-black bg-white"
        }`}
      >
        {nameOfGame}
      </div>

      {/**************** Affichage des images PEGI Age *******************/}
      <div
        className={`${
          isDarkMode ? "text-white bg-black" : "text-black bg-white"
        } flex justify-center gap-1`}
      >
        {selectedAgePegi && (
          <div
            className={`${
              isDarkMode ? "text-white bg-black" : "text-black bg-white"
            }`}
          >
            <Image
              src={pegiImages[selectedAgePegi].src} 
              alt={pegiImages[selectedAgePegi].title} 
              title={pegiImages[selectedAgePegi].title}
              width={50} 
              height={50} 
            />
          </div>
        )}

        {/**************** Affichage des images pour les catégories supplémentaires *******************/}
        <div
          className={`${
            isDarkMode ? "text-white bg-black" : "text-black bg-white"
          } flex gap-1`}
        >
          {selectedAdditionalPegi &&
            Array.isArray(selectedAdditionalPegi) &&
            selectedAdditionalPegi.length > 0 &&
            selectedAdditionalPegi.map((pegi, index) => {
              const pegiData = pegiImages[pegi]; // Récupère l'image et le titre
              return pegiData ? (
                <Image
                  key={index}
                  src={pegiData.src}
                  alt={pegiData.title}
                  title={pegiData.title} // Ajoutez le titre pour l'attribut title
                  width={50} // Ajustez la largeur selon vos besoins
                  height={50} // Ajustez la hauteur selon vos besoins
                />
              ) : null; // Si aucune image n'est trouvée, ne rien afficher
            })}
        </div>
      </div>
      {/******************* Date de sortie du jeu **********************/}
      <div
        className={`p-4 min-h-[50px] text-right ${
          isDarkMode ? "text-white bg-black" : "text-black bg-white "
        }`}
      >
        Sortie le {formattedDate}.
      </div>

      {/******************* Petite introduction en gras ******************************/}
      <div
        className={`p-4 min-h-[50px] font-bold ${
          isDarkMode ? "text-white bg-black" : "text-black bg-white "
        }`}
      >
        {shortIntroduction}
      </div>

      {/********************** Description détaillée *********************************/}
      <div
        className={`p-4 min-h-[50px] ${
          isDarkMode ? "text-white bg-black" : "text-black bg-white "
        }`}
        dangerouslySetInnerHTML={{ __html: introductionOfTheGame }}
      />
    </section>
  );
};

export default ApercuFormulaire;
