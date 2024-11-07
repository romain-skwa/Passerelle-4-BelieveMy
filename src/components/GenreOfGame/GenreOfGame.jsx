// GenreOfGame.js
import React from 'react';

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

const GenreOfGame = ({ selectedGenres, setSelectedGenres }) => {
  const handleGenreChange = (event) => {
    const genre = event.target.value;
    setSelectedGenres((prevSelected) => {
      if (prevSelected.includes(genre)) {
        // Si le genre est déjà sélectionné, le retirer
        return prevSelected.filter((g) => g !== genre);
      } else {
        // Sinon, l'ajouter
        return [...prevSelected, genre];
      }
    });
  };

  return (
    <div className="my-4">
      <p className="text-white font-bold mb-2">Sélectionnez le ou les genres du jeu :</p>
      {genres.map((genre) => (
        <label key={genre.id} className="block">
          <input
            type="checkbox"
            value={genre.id}
            checked={selectedGenres.includes(genre.id)}
            onChange={handleGenreChange}
            className="mr-2"
          />
          {genre.label}
        </label>
      ))}
    </div>
  );
};

export default GenreOfGame;