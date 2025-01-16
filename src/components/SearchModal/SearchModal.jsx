"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Utilisation de next/navigation

const genres = [
  { id: 'Action', label: 'Action' },
  { id: 'Aventure', label: 'Aventure' },
  { id: 'Combat', label: 'Combat' },
  { id: 'Plate-forme', label: 'Plate-forme' },
  { id: 'RPG', label: 'RPG' },
  { id: 'Simulation', label: 'Simulation' },
  { id: 'Strategie', label: 'Stratégie' },
  { id: 'Sport', label: 'Sport' },
  { id: 'Course', label: 'Course' },
  { id: 'Horreur', label: 'Horreur' },
  { id: 'Multijoueur', label: 'Multijoueur' },
  { id: 'Independant', label: 'Indépendant' },
];

const platforms = [
  'Windows', 'Mac', 'Linux', 'PS5', 'PS4', 'Xbox One', 'Xbox Series X/S', 
  'Switch', '3DS', 'iOS', 'Android'
];

export default function SearchModal({ onClose, onSelectGenre }) {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const router = useRouter();

  const handleGenreToggle = (genreId) => {
    setSelectedGenres((prevSelectedGenres) => {
      if (prevSelectedGenres.includes(genreId)) {
        return prevSelectedGenres.filter((id) => id !== genreId);
      } else {
        return [...prevSelectedGenres, genreId];
      }
    });
  };

  const handlePlatformToggle = (platform) => {
    setSelectedPlatforms((prevSelectedPlatforms) => {
      if (prevSelectedPlatforms.includes(platform)) {
        return prevSelectedPlatforms.filter((item) => item !== platform);
      } else {
        return [...prevSelectedPlatforms, platform];
      }
    });
  };

  const handleSearchClick = () => {
    // Génère l'URL avec les genres et plateformes comme search params
    const genresParam = selectedGenres.length > 0 ? selectedGenres.join(',') : '';
    const platformsParam = selectedPlatforms.length > 0 ? selectedPlatforms.join(',') : '';
    
    const query = new URLSearchParams();
    if (genresParam) query.set('genres', genresParam);
    if (platformsParam) query.set('platforms', platformsParam);

    // Navigue vers la page des résultats en ajoutant les query params
    router.push(`/dynamic/searchResultsDetails/searchResultsDetails?${query.toString()}`);
    console.log(`/dynamic/searchResultsDetails/searchResultsDetails?${query.toString()}`);
    onClose(); // Ferme la modale après la redirection
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-black">
      <div className="bg-white rounded-lg p-4 z-50">
        <h2 className="text-lg font-bold">Sélectionnez une catégorie</h2>

        <section className='flex'>
        <div className="mt-2">
          <h3 className="text-md font-semibold">Genres</h3>
          {genres.map((genre) => (
            <div
              key={genre.id}
              className={`p-2 cursor-pointer hover:bg-gray-200 ${
                selectedGenres.includes(genre.id) ? 'bg-blue-200' : ''
              }`}
              onClick={() => handleGenreToggle(genre.id)}
            >
              {genre.label}
            </div>
          ))}
        </div>

        <div className="mt-4">
          <h3 className="text-md font-semibold">Plateformes</h3>
          {platforms.map((platform) => (
            <div
              key={platform}
              className={`p-2 cursor-pointer hover:bg-gray-200 ${
                selectedPlatforms.includes(platform) ? 'bg-blue-200' : ''
              }`}
              onClick={() => handlePlatformToggle(platform)}
            >
              {platform}
            </div>
          ))}
        </div>
        </section>

        <div className="mt-4">
          {(selectedGenres.length > 0 || selectedPlatforms.length > 0) && (
            <button
              className="bg-green-500 px-4 py-2 rounded text-white"
              onClick={handleSearchClick}
            >
              Rechercher
            </button>
          )}
        </div>

        <button onClick={onClose} className="mt-4 bg-red-500 px-4 py-2 rounded text-black">
          Fermer
        </button>
      </div>
    </div>
  );
}
