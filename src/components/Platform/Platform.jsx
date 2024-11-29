import React from 'react';
import "../../app/styles/formulary.css";

const ButtonPlatform = ({platform, setPlatform}) => {
    // Liste des plateformes
    const platforms = [
        'Windows',
        'Mac',
        'Linux',
        'PS5',
        'PS4',
        'Xbox One',
        'Xbox Series X/S',
        'Switch',
        '3DS',
        'iOS',
        'Android'
    ];

    const handlePlatformClick = (platformName) => {
        setPlatform((prevPlatforms) => {
          if (prevPlatforms.includes(platformName)) {
            // Si la plateforme est déjà sélectionnée, la retirer
            return prevPlatforms.filter((p) => p !== platformName);
          } else {
            // Sinon, l'ajouter
            return [...prevPlatforms, platformName];
          }
        });
      };

    return (
    <div className='buttonPlatform-container'>
        {platforms.map((platformName) => (
        <div
            key={platformName}
            onClick={() => handlePlatformClick(platformName)}
            className={`buttonPlatform ${platform.includes(platformName) ? 'bg-green-900 border border-white' : 'bg-gray-800 border-2 border-gray-600'}`}
        >
            {platformName}
        </div>
        ))}
    </div>
    );
};

export default ButtonPlatform;