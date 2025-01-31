import React from "react";
const colorDark = "linear-gradient(70deg, rgba(25,21,70,1) 0%, rgba(9,9,121,0.5) 35%, rgba(25,21,70,1) 100%)";
const greenColor = "linear-gradient(90deg, rgba(112,222,115,1) 0%, rgba(52,199,200,1) 30%, rgba(52,199,200,1) 70%, rgba(112,222,115,1) 100%)";

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
      <div className="flex justify-center text-white text-xl mb-2" style={{ textShadow: '3px 3px 4px blue' }}>
        Facultatif
      </div>
      
      <div className="bandeauTop">
        <div style={{ backgroundImage: colorDark }}>
          <div
            style={{
              backgroundImage: urlImageOne.length != "" ?  greenColor : colorDark,
              padding: "0.3rem 0.5rem",
            }}
          >
            Image d'illustration n°1
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div
            style={{
              backgroundImage:
                urlImageTwo.length != "" ?  greenColor : colorDark,
              padding: "0.3rem 0.5rem",
            }}
          >
            Image d'illustration n°2
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div
            style={{
              backgroundImage:
                urlImageThree.length != "" ?  greenColor : colorDark,
              padding: "0.3rem 0.5rem",
            }}
          >
            Image d'illustration n°3
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
            Arrière plan
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div
            style={{
              backgroundImage:
                genreOfGame.length != "" ?  greenColor : colorDark,
              padding: "0.3rem 0.5rem",
            }}
          >
            Catégorie
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div
            style={{
              backgroundImage: videoLink.length != "" ?  greenColor : colorDark,
              padding: "0.3rem 0.5rem",
            }}
          >
            Vidéo youtube
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div
            style={{
              backgroundImage:
                webSiteOfThisGame.length != "" ?  greenColor : colorDark,
              padding: "0.3rem 0.5rem",
            }}
          >
            Site officiel du jeu
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div
            style={{
              backgroundImage:
                webSiteOfThisCreator.length != "" ?  greenColor : colorDark,
              padding: "0.3rem 0.5rem",
            }}
          >
            Site officiel des créateurs
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div
            style={{
              backgroundImage: steamLink.length != "" ?  greenColor : colorDark,
              padding: "0.3rem 0.5rem",
            }}
          >
            Lien vers le site Steam
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
            Lien vers le site Epic Games
          </div>
        </div>
      </div>
    </section>
  );
};

export default OptionalButtons;
