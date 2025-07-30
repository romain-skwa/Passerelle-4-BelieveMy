"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Utilisation de next/navigation
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";
import formularyCss from "@/app/styles/formulary.module.css";

const genres = [
  { id: "Action", label: "Action" },
  { id: "Aventure", label: "Aventure" },
  { id: "Combat", label: "Combat" },
  { id: "Plate-forme", label: "Plate-forme" },
  { id: "RPG", label: "RPG" },
  { id: "Simulation", label: "Simulation" },
  { id: "Strategie", label: "Stratégie" },
  { id: "Sport", label: "Sport" },
  { id: "Course", label: "Course" },
  { id: "Horreur", label: "Horreur" },
  { id: "Multijoueur", label: "Multijoueur" },
  { id: "Independant", label: "Indépendant" },
];

const platforms = [
  "Windows",
  "Mac",
  "Linux",
  "PS5",
  "PS4",
  "Xbox One",
  "Xbox Series X/S",
  "Switch",
  "3DS",
  "iOS",
  "Android",
];

export default function SearchModal({ onClose }) {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // État pour le mot clé
  const router = useRouter();
  const { language } = useLanguage();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Met à jour l'état avec la valeur de l'input
  };

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
    // Create URL with "genres", "plateformes" and "searchTerm" as params
    const genresParam =
      selectedGenres.length > 0 ? selectedGenres.join(",") : "";
    const platformsParam =
      selectedPlatforms.length > 0 ? selectedPlatforms.join(",") : "";
    const searchTermParam = searchTerm.length > 0 ? searchTerm : "";

    const query = new URLSearchParams();
    if (genresParam) query.set("genres", genresParam);
    if (platformsParam) query.set("platforms", platformsParam);
    if (searchTermParam) query.set("searchTerm", searchTermParam);

    // Navigue vers la page des résultats en ajoutant les query params
    router.push(
      `/dynamic/searchResultsDetails/searchResultsDetails?${query.toString()}&lang=${language}`
    );
    console.log(
      `/dynamic/searchResultsDetails/searchResultsDetails?${query.toString()}`
    );
    onClose(); // Ferme la modale après la redirection
  };

  const handleOutsideClick = (event) => {
    const modal = document.getElementById("modal-content");
    if (modal && !modal.contains(event.target)) {
      onClose();
    }
  };

  return (
    <div onClick={handleOutsideClick} className="fixed inset-0 flex justify-center bg-black bg-opacity-50 z-50 text-black">
      <div id="modal-content" className={`rounded-lg p-4 z-50 h-[670px] tablet:h-[780px] my-auto ${formularyCss.neuphormismModalSearch}`}>
        <h2 className="text-lg font-bold text-center mb-2">Recherche détaillée</h2>
        <input
          type="text"
          value={searchTerm} // Lien avec l'état
          onChange={handleSearchChange} // Gestion du changement
          placeholder={language == "fr" ? "Nom du jeu" : "Game Name"}
          className="text-black placeholder-gray-500 outline-none px-1 w-[100%] tablet:w-[245px] border-2 rounded-xl" // Appliquez la couleur ici
        />

        <section className="flex">
          <div className="mt-4">
            <h3 className="text-md font-semibold">Genres</h3>
            {genres.map((genre) => (
              <div
                key={genre.id}
                className={`p-1 tablet:p-2 cursor-pointer hover:bg-gray-200 my-1 rounded ${
                  selectedGenres.includes(genre.id) ? "bg-black text-white" : ""
                }`}
                onClick={() => handleGenreToggle(genre.id)}
              >
                {genre.label}
              </div>
            ))}
          </div>

          <div className="mt-4 ml-4">
            <h3 className="text-md font-semibold">Plateformes</h3>
            {platforms.map((platform) => (
              <div
                key={platform}
                className={`p-1 tablet:p-2 cursor-pointer hover:bg-gray-200 my-1 rounded ${
                  selectedPlatforms.includes(platform) ? "bg-black text-white" : ""
                }`}
                onClick={() => handlePlatformToggle(platform)}
              >
                {platform}
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-col items-center">
          <div
            className={`mt-4 cursor-not-allowed ${
              !(
                selectedGenres.length > 0 ||
                selectedPlatforms.length > 0 ||
                searchTerm.length > 0
              )
                ? "opacity-50 "
                : "opacity-100 "
            }`}
          >
            <button
              className={`bg-green-500 px-4 py-2 rounded text-white ${
                !(
                  selectedGenres.length > 0 ||
                  selectedPlatforms.length > 0 ||
                  searchTerm.length > 0
                )
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={handleSearchClick}
              disabled={
                !(
                  selectedGenres.length > 0 ||
                  selectedPlatforms.length > 0 ||
                  searchTerm.length > 0
                )
              } // Désactive le bouton si la condition n'est pas remplie
            >
            {language == "fr" ? "Rechercher" : "Search"}  
            </button>
          </div>

          <button
            onClick={onClose}
            className="mt-2 bg-red-500 px-4 py-2 rounded text-white w-[100px] mx-auto"
            >
            {language == "fr" ? "Fermer" : "Close"}            
          </button>
        </div>

      </div>
    </div>
  );
}
