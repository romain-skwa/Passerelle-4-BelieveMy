import React from "react";
import "@/app/styles/formulary.css";
import PlayerSolo from "/public/icons/solo.png";
import MultiPlayersLocal from "/public/icons/multiLocal.png";
import MultiPlayersOnline from "/public/icons/multiOnline2.jpg";
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";

const ButtonSoloMulti = ({ SoloMulti, setSoloMulti }) => {
  // Liste des traductions
  const translations = {
    fr: {
      Solo: "Solo",
      "Multijoueur local": "Multijoueur local",
      "Multijoueur en ligne": "Multijoueur en ligne",
    },
    en: {
      Solo: "Solo",
      "Multijoueur local": "Local Multiplayer",
      "Multijoueur en ligne": "Online Multiplayer",
    },
  };

  // Récupérer la langue actuelle
  const { language } = useLanguage();

  // Liste des modes de jeu
  const SoloMultis = [
    { genre: "Solo", icon: PlayerSolo },
    { genre: "Multijoueur local", icon: MultiPlayersLocal },
    { genre: "Multijoueur en ligne", icon: MultiPlayersOnline },
  ];

  const handleSoloMultiClick = (SoloMultiGenre) => {
    setSoloMulti((prevSoloMultis) => {
      if (prevSoloMultis.includes(SoloMultiGenre)) {
        // Si le mode de jeu est déjà sélectionné, le retirer
        return prevSoloMultis.filter((gm) => gm !== SoloMultiGenre);
      } else {
        // Sinon, l'ajouter
        return [...prevSoloMultis, SoloMultiGenre];
      }
    });
  };

  return (
    <div className="buttonSoloMulti-container">
      {SoloMultis.map(({ genre, icon }) => (
        <div
          key={genre}
          onClick={() => handleSoloMultiClick(genre)}
          className={`buttonSoloMulti ${
            SoloMulti.includes(genre)
              ? "text-white bg-green-800"
              : "text-black bg-white"
          }`}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          <span style={{ marginRight: "10px" }}>
            {translations[language][genre]}
          </span>{" "}
          {/* Texte traduit */}
          <img
            src={icon.src}
            alt={genre}
            style={{ width: "50px", height: "50px", borderRadius: "10px" }}
            className={`buttonSoloMulti ${
              SoloMulti.includes(genre)
                ? "border-2 border-green-800"
                : "border-2 border-white"
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default ButtonSoloMulti;
