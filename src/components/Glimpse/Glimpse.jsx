// ApercuFormulaire.js
import React from 'react';
import "../../app/styles/components.css";

const ApercuFormulaire = ({ introductionOfTheGame, nameOfGame, isDarkMode }) => {
  return (
    <section>
      <h3>Aperçu :</h3>
      <h2 className={`apercu ${isDarkMode ? 'text-white bg-black' : 'text-black bg-white'}`}>
        {nameOfGame}
      </h2>

      <div 
        className={`apercu ${isDarkMode ? 'text-white bg-black' : 'text-black bg-white '}`} 
        dangerouslySetInnerHTML={{ __html: introductionOfTheGame }} 
      />
    </section>       
  );
};

export default ApercuFormulaire;