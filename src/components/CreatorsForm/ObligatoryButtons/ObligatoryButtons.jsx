import React from 'react';
const colorDark = "linear-gradient(70deg, rgba(25,21,70,1) 0%, rgba(9,9,121,0.5) 35%, rgba(25,21,70,1) 100%)";
const ObligatoryButtons = ({
  nameOfGame,
  isDarkMode,
  setIsDarkMode,
  shortIntroduction,
  introductionOfTheGame,
  platform,
  releaseDate,
  selectedAgePegi,
  urlPosterCloudinary,
  SoloMulti,
}) => {
  return (
    <section className="w-[241px] p-2 mb-3 rounded-xl font-bold neuphormismUndergroung">
      <div className="flex justify-center mt-3 laptop:mt-0 mx-auto">
        <div
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 bg-black text-white w-[200px] cursor-pointer rounded-xl"
        >
          Texte noir et fond blanc
        </div>
      </div>

      <div className="flex justify-center text-white text-xl mb-2">Obligatoire</div>
      <div className="bandeauTop">
        <div style={{ backgroundImage: colorDark }}>
          <div style={{ backgroundColor: shortIntroduction.length > 1 ? "green" : "transparent", padding: '0.3rem 0.5rem' }}>
            Introduction courte
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div style={{  backgroundColor: introductionOfTheGame.length > 1 ? "green" : "transparent", padding: '0.3rem 0.5rem' }}>
            Présentation détaillée
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div style={{ background: platform.length !== 0 ? "green" : "transparent", padding: '0.3rem 0.5rem' }}>
            Plate-forme
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div style={{ backgroundColor: releaseDate !== null ? "green" : "transparent", padding: '0.3rem 0.5rem' }}>
            Date de sortie
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div style={{ backgroundColor: selectedAgePegi.length != "" ? "green" : "transparent", padding: '0.3rem 0.5rem' }}>
            Pegi age & catégorie
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div style={{ backgroundColor: urlPosterCloudinary.length != "" ? "green" : "transparent", padding: '0.3rem 0.5rem' }}>
            Affiche
          </div>
        </div>

        <div style={{ backgroundImage: colorDark }}>
          <div style={{ backgroundColor: SoloMulti.length != "" ? "green" : "transparent", padding: '0.3rem 0.5rem' }}>
            Solo / Multi
          </div>
        </div>
      </div>
    </section>
  );
};

export default ObligatoryButtons;