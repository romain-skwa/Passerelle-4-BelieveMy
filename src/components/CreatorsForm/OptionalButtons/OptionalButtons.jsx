import React from 'react';

const OptionalButtons = ({
  nameOfGame,
  urlBackgroundCloudinary,
  genreOfGame,
  videoLink,
  webSiteOfThisGame,
  webSiteOfThisCreator,
  steamLink,
  epicGamesLink,
  isImageOne,
  setIsImageOne,
  urlImageOne,
  isImageTwo, setIsImageTwo, urlImageTwo, setUrlImageTwo,
  isImageThree, setIsImageThree, urlImageThree, setUrlImageThree,
  isBackgroundVisible,
  setIsBackgroundVisible,
  isCategoryVisible,
  setIsCategoryVisible,
  isVideoVisible,
  setIsVideoVisible,
  isWebsiteGameVisible,
  setIsWebsiteGameVisible,
  isWebsiteCreatorVisible,
  setIsWebsiteCreatorVisible,
  isSteamLinkVisible,
  setIsSteamLinkVisible,
  isEpicGamesLinkVisible,
  setIsEpicGamesLinkVisible,
}) => {
  return (
    <section className="border" style={{ cursor: nameOfGame.length >= 2 ? 'pointer' : 'not-allowed' }}>
      <div className="flex justify-center text-white text-xl">Facultatif</div>
      <div className="bandeauTop">
        <div
          onClick={() => setIsImageOne(!isImageOne)}
          style={{
            backgroundColor: urlImageOne.length != "" ? "green" : "#2e2d2c",
            border: isImageOne ? "2px solid white" : "2px solid black",
            opacity: nameOfGame.length >= 2 ? 1 : 0.5,
            pointerEvents: nameOfGame.length >= 2 ? 'auto' : 'none',
          }}
        >
          Image d'illustration n°1
        </div>

        <div
          onClick={() => setIsImageTwo(!isImageTwo)}
          style={{
            backgroundColor: urlImageTwo.length != "" ? "green" : "#2e2d2c",
            border: isImageTwo ? "2px solid white" : "2px solid black",
            opacity: nameOfGame.length >= 2 ? 1 : 0.5,
            pointerEvents: nameOfGame.length >= 2 ? 'auto' : 'none',
          }}
        >
          Image d'illustration n°2
        </div>

        <div
          onClick={() => setIsImageThree(!isImageThree)}
          style={{
            backgroundColor: urlImageThree.length != "" ? "green" : "#2e2d2c",
            border: isImageThree ? "2px solid white" : "2px solid black",
            opacity: nameOfGame.length >= 2 ? 1 : 0.5,
            pointerEvents: nameOfGame.length >= 2 ? 'auto' : 'none',
          }}
        >
          Image d'illustration n°3
        </div>

        <div
          onClick={() => setIsBackgroundVisible(!isBackgroundVisible)}
          style={{
            backgroundColor: urlBackgroundCloudinary.length != "" ? "green" : "#2e2d2c",
            border: isBackgroundVisible ? "2px solid white" : "2px solid black",
            opacity: nameOfGame.length >= 2 ? 1 : 0.5,
            pointerEvents: nameOfGame.length >= 2 ? 'auto' : 'none',
          }}
        >
          Arrière plan
        </div>

        <div
          onClick={() => setIsCategoryVisible(!isCategoryVisible)}
          style={{
            backgroundColor: genreOfGame.length != "" ? "green" : "#2e2d2c",
            border: isCategoryVisible ? "2px solid white" : "2px solid black",
            opacity: nameOfGame.length >= 2 ? 1 : 0.5,
            pointerEvents: nameOfGame.length >= 2 ? 'auto' : 'none',
          }}
        >
          Catégorie
        </div>

        <div
          onClick={() => setIsVideoVisible(!isVideoVisible)}
          style={{
            backgroundColor: videoLink.length != "" ? "green" : "#2e2d2c",
            border: isVideoVisible ? "2px solid white" : "2px solid black",
            opacity: nameOfGame.length >= 2 ? 1 : 0.5,
            pointerEvents: nameOfGame.length >= 2 ? 'auto' : 'none',
          }}
        >
          Vidéo youtube
        </div>

        <div
          onClick={() => setIsWebsiteGameVisible(!isWebsiteGameVisible)}
          style={{
            backgroundColor: webSiteOfThisGame.length != "" ? "green" : "#2e2d2c",
            border: isWebsiteGameVisible ? "2px solid white" : "2px solid black",
            opacity: nameOfGame.length >= 2 ? 1 : 0.5,
            pointerEvents: nameOfGame.length >= 2 ? 'auto' : 'none',
          }}
        >
          Site officiel du jeu
        </div>

        <div
          onClick={() => setIsWebsiteCreatorVisible(!isWebsiteCreatorVisible)}
          style={{
            backgroundColor: webSiteOfThisCreator.length != "" ? "green" : "#2e2d2c",
            border: isWebsiteCreatorVisible ? "2px solid white" : "2px solid black",
            opacity: nameOfGame.length >= 2 ? 1 : 0.5,
            pointerEvents: nameOfGame.length >= 2 ? 'auto' : 'none',
          }}
        >
          Site officiel des créateurs
        </div>

        <div
          onClick={() => setIsSteamLinkVisible(!isSteamLinkVisible)}
          style={{
            backgroundColor: steamLink.length != "" ? "green" : "#2e2d2c",
            border: isSteamLinkVisible ? "2px solid white" : "2px solid black",
            opacity: nameOfGame.length >= 2 ? 1 : 0.5,
            pointerEvents: nameOfGame.length >= 2 ? 'auto' : 'none',
          }}
        >
          Lien vers le site Steam
        </div>

        <div
          onClick={() => setIsEpicGamesLinkVisible(!isEpicGamesLinkVisible)}
          style={{
            backgroundColor: epicGamesLink.length != "" ? "green" : "#2e2d2c",
            border: isEpicGamesLinkVisible ? "2px solid white" : "2px solid black",
            opacity: nameOfGame.length >= 2 ? 1 : 0.5,
            pointerEvents: nameOfGame.length >= 2 ? 'auto' : 'none',
          }}
        >
          Lien vers le site Epic Games
        </div>
      </div>
    </section>
  );
};

export default OptionalButtons;