import React from 'react';

const ObligatoryButtons = ({
  nameOfGame,
  shortIntroduction,
  introductionOfTheGame,
  platform,
  releaseDate,
  selectedAgePegi,
  urlPosterCloudinary,
  SoloMulti,
  isShortIntroVisible,
  setIsShortIntroVisible,
  isEditorVisible,
  setIsEditorVisible,
  isPlatformVisible,
  setPlatformVisible,
  isReleaseDateVisible,
  setIsReleaseDateVisible,
  isPegiAgeVisible,
  setIsPegiAgeVisible,
  isPosterVisible,
  setIsPosterVisible,
  isSoloMulti,
  setIsSoloMulti,
}) => {
  return (
    <section className="border mb-3" style={{ cursor: nameOfGame.length >= 2 ? 'pointer' : 'not-allowed' }}>
      <div className="flex justify-center text-white text-xl">Obligatoire</div>
      <div className="bandeauTop">
        <div
          onClick={() => setIsShortIntroVisible(!isShortIntroVisible)}
          style={{
            backgroundColor: shortIntroduction.length > 1 ? "green" : "#2e2d2c",
            border: isShortIntroVisible ? "2px solid white" : "2px solid black",
            opacity: nameOfGame.length >= 2 ? 1 : 0.5,
            pointerEvents: nameOfGame.length >= 2 ? 'auto' : 'none',
          }}
        >
          Introduction courte
        </div>

        <div
          onClick={() => setIsEditorVisible(!isEditorVisible)}
          style={{
            backgroundColor: introductionOfTheGame.length > 1 ? "green" : "#2e2d2c",
            border: isEditorVisible ? "2px solid white" : "2px solid black",
            opacity: nameOfGame.length >= 2 ? 1 : 0.5,
            pointerEvents: nameOfGame.length >= 2 ? 'auto' : 'none',
          }}
        >
          Présentation détaillée
        </div>

        <div
          onClick={() => setPlatformVisible(!isPlatformVisible)}
          style={{
            backgroundColor: platform.length !== 0 ? "green" : "#2e2d2c",
            border: isPlatformVisible ? "2px solid white" : "2px solid black",
            opacity: nameOfGame.length >= 2 ? 1 : 0.5,
            pointerEvents: nameOfGame.length >= 2 ? 'auto' : 'none',
          }}
        >
          Plate-forme
        </div>

        <div
          onClick={() => setIsReleaseDateVisible(!isReleaseDateVisible)}
          style={{
            backgroundColor: releaseDate !== null ? "green" : "#2e2d2c",
            border: isReleaseDateVisible ? "2px solid white" : "2px solid black",
            opacity: nameOfGame.length >= 2 ? 1 : 0.5,
            pointerEvents: nameOfGame.length >= 2 ? 'auto' : 'none',
          }}
        >
          Date de sortie
        </div>

        <div
          onClick={() => setIsPegiAgeVisible(!isPegiAgeVisible)}
          style={{
            backgroundColor: selectedAgePegi.length != "" ? "green" : "#2e2d2c",
            border: isPegiAgeVisible ? "2px solid white" : "2px solid black",
            opacity: nameOfGame.length >= 2 ? 1 : 0.5,
            pointerEvents: nameOfGame.length >= 2 ? 'auto' : 'none',
          }}
        >
          Pegi age & catégorie
        </div>

        <div
          onClick={() => setIsPosterVisible(!isPosterVisible)}
          style={{
            backgroundColor: urlPosterCloudinary.length != "" ? "green" : "#2e2d2c",
            border: isPosterVisible ? "2px solid white" : "2px solid black",
            opacity: nameOfGame.length >= 2 ? 1 : 0.5,
            pointerEvents: nameOfGame.length >= 2 ? 'auto' : 'none',
          }}
        >
          Affiche
        </div>

        <div
          onClick={() => setIsSoloMulti(!isSoloMulti)}
          style={{
            backgroundColor: SoloMulti.length != "" ? "green" : "#2e2d2c",
            border: isSoloMulti ? "2px solid white" : "2px solid black",
            opacity: nameOfGame.length >= 2 ? 1 : 0.5,
            pointerEvents: nameOfGame.length >= 2 ? 'auto' : 'none',
          }}
        >
          Solo / Multi
        </div>
      </div>
    </section>
  );
};

export default ObligatoryButtons;