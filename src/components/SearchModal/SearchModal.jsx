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

export default function SearchModal({ onClose, onSelectGenre }) {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const router = useRouter(); // Utilisation du hook useRouter

  const handleGenreToggle = (genreId) => {
    setSelectedGenres((prevSelectedGenres) => {
      if (prevSelectedGenres.includes(genreId)) {
        return prevSelectedGenres.filter((id) => id !== genreId);
      } else {
        return [...prevSelectedGenres, genreId];
      }
    });
  };

  const handleSearchClick = () => {
    if (selectedGenres.length > 0) {
        console.log("Genres sélectionnés:", selectedGenres);
      // Navigation vers la page des résultats avec les genres sélectionnés
      router.push(`/dynamic/GenreSearchResults/${encodeURIComponent(selectedGenres.join(','))}`);
      console.log(`/dynamic/GenreSearchResults/${encodeURIComponent(selectedGenres.join(','))}`);
      onClose(); // Ferme la modale après la redirection
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-black">
      <div className="bg-white rounded-lg p-4 z-50">
        <h2 className="text-lg font-bold">Sélectionnez une catégorie</h2>
        <div className="mt-2">
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
          {/* Lien qui redirige l'utilisateur vers les résultats de recherche */}
          {selectedGenres.length > 0 && (
            <button
              className="bg-green-500 px-4 py-2 rounded text-white"
              onClick={handleSearchClick} // Gère la navigation dans la modale
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
