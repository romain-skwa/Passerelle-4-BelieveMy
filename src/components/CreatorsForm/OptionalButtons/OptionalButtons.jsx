import React from "react";
const colorDark =
  "linear-gradient(70deg, rgba(25,21,70,1) 0%, rgba(9,9,121,0.5) 35%, rgba(25,21,70,1) 100%)";

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
  return (
    <section className="w-[241px] p-2 font-bold rounded-xl neuphormismUndergroung">
      <div className="flex justify-center text-white text-xl mb-2">
        Facultatif
      </div>
      
      <div className="bandeauTop">
        <div style={{ backgroundImage: colorDark }}>
          <div
            style={{
              backgroundColor: urlImageOne.length != "" ? "green" : "transparent",
              padding: "0.3rem 0.5rem",
            }}
          >
            Image d'illustration n°1
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div
            style={{
              backgroundColor:
                urlImageTwo.length != "" ? "green" : "transparent",
              padding: "0.3rem 0.5rem",
            }}
          >
            Image d'illustration n°2
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div
            style={{
              backgroundColor:
                urlImageThree.length != "" ? "green" : "transparent",
              padding: "0.3rem 0.5rem",
            }}
          >
            Image d'illustration n°3
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div
            style={{
              backgroundColor:
                urlBackgroundCloudinary.length != "" ? "green" : "transparent",
              padding: "0.3rem 0.5rem",
            }}
          >
            Arrière plan
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div
            style={{
              backgroundColor:
                genreOfGame.length != "" ? "green" : "transparent",
              padding: "0.3rem 0.5rem",
            }}
          >
            Catégorie
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div
            style={{
              backgroundColor: videoLink.length != "" ? "green" : "transparent",
              padding: "0.3rem 0.5rem",
            }}
          >
            Vidéo youtube
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div
            style={{
              backgroundColor:
                webSiteOfThisGame.length != "" ? "green" : "transparent",
              padding: "0.3rem 0.5rem",
            }}
          >
            Site officiel du jeu
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div
            style={{
              backgroundColor:
                webSiteOfThisCreator.length != "" ? "green" : "transparent",
              padding: "0.3rem 0.5rem",
            }}
          >
            Site officiel des créateurs
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div
            style={{
              backgroundColor: steamLink.length != "" ? "green" : "transparent",
              padding: "0.3rem 0.5rem",
            }}
          >
            Lien vers le site Steam
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div
            style={{
              backgroundColor:
                epicGamesLink.length != "" ? "green" : "transparent",
              padding: "0.3rem 0.5rem",
            }}
          >
            Lien vers le site Epic Games
          </div>
        </div>
      </div>
    </section>
  );
};

export default OptionalButtons;
