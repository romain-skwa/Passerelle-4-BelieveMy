import React from 'react';
const colorDark = "linear-gradient(70deg, rgba(25,21,70,1) 0%, rgba(9,9,121,0.5) 35%, rgba(25,21,70,1) 100%)";
const greenColor = "linear-gradient(90deg, rgba(112,222,115,1) 0%, rgba(52,199,200,1) 30%, rgba(52,199,200,1) 70%, rgba(112,222,115,1) 100%)";
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
          className="p-2 bg-black text-white w-[200px] cursor-pointer rounded-xl border"
        >
          Texte noir et fond blanc
        </div>
      </div>

      <div className="flex justify-center text-white text-xl mb-2" style={{ textShadow: '3px 3px 4px blue' }}>Obligatoire</div>
      <div className="bandeauTop">
        <div style={{ backgroundImage: shortIntroduction.length > 1 ? greenColor : colorDark, padding: '0.3rem 0.5rem' }}>
          Introduction courte
        </div>

        <div style={{  backgroundImage: introductionOfTheGame.length > 1 ? greenColor : colorDark, padding: '0.3rem 0.5rem' }}>
          Présentation détaillée
        </div>

        <div style={{ backgroundImage: platform.length !== 0 ? greenColor : colorDark, padding: '0.3rem 0.5rem' }}>
          Plate-forme
        </div>

        <div style={{ backgroundImage: releaseDate !== null ? greenColor : colorDark, padding: '0.3rem 0.5rem' }}>
          Date de sortie
        </div>

        <div style={{ backgroundImage: selectedAgePegi.length != "" ? greenColor : colorDark, padding: '0.3rem 0.5rem' }}>
          Pegi age & catégorie
        </div>

        <div style={{ backgroundImage: urlPosterCloudinary.length != "" ? greenColor : colorDark, padding: '0.3rem 0.5rem' }}>
          Affiche
        </div>

        <div style={{ backgroundImage: SoloMulti.length != "" ? greenColor : colorDark, padding: '0.3rem 0.5rem' }}>
          Solo / Multi
        </div>
      </div>
    </section>
  );
};

export default ObligatoryButtons;