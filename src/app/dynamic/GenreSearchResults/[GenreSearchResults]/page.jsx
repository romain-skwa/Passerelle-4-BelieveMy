"use client";

import { useParams } from "next/navigation"; // Utilisation de useParams pour récupérer le paramètre dynamique
import { useEffect, useState } from "react";
import Loading from "@/components/Loading/Loading";
import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import { toast } from "react-toastify";
import Link from "next/link";

export default function GenreSearchResults() {
  const params = useParams();
  const genres = params.GenreSearchResults; // Récupère le paramètre dynamique 'genres' de l'URL
  const [games, setGames] = useState([]);
  console.log(`games, le résultat final : `, games);
  const [loading, setLoading] = useState(true);

  // Vérifie si genres est bien défini et s'il y a des valeurs avant d'envoyer la requête.
  useEffect(() => {
    if (genres) {
      const genreArray = decodeURIComponent(genres).split(","); // Décodage des genres et séparation
      fetchGamesByGenres(genreArray);
    } else {
      toast.error("Aucun genre trouvé dans l'URL"); // Message d'erreur si genres est manquant
    }
  }, [genres]);

  const fetchGamesByGenres = async (selectedGenres) => {
    try {
      const response = await fetch("/api/searchByGenre", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ genres: selectedGenres }), // Envoi du tableau de genres
      });

      // Vérifie si la réponse est réussie (status 200-299)
      if (!response.ok) {
        console.error("Erreur de réponse:", response.statusText);
        throw new Error("Erreur de récupération des jeux");
      }

      // Log de la réponse brute pour aider au débogage
      const responseText = await response.text();

      // Vérifie si la réponse est en JSON
      const data = JSON.parse(responseText);
      console.log("Données JSON récupérées : ", data);

      if (data.error) {
        console.error("Erreur dans l'API:", data.error);
        toast.error(`Erreur : ${data.error}`);
      } else {
        setGames(data.games || []);
      }
    } catch (error) {
      console.error("Erreur dans la récupération des jeux:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GeneralLayout>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <h1>Résultats pour : {decodeURIComponent(genres).split(",").join(" ")}</h1>
            {games.length > 0 ? (
              <ul className="flex flex-wrap tablet:gap-4 gap-2 justify-center w-[95%] lg:w-2/3 mx-auto">
                {games.map((game) => (
                  <li key={game._id}>
                    {game.urlPosterCloudinary ? (
                      <Link href={`/dynamic/introduction/${game.nameofgame}`}>
                        <img
                          src={game.urlPosterCloudinary}
                          alt={decodeURIComponent(game.nameofgame)}
                          className="w-[154px] h-[248px] lg:w-[192px] lg:h-[311px] hover:scale-105 transition duration-300"
                        />
                      </Link>
                    ) : game.urlPoster ? (
                      <Link href={`/dynamic/introduction/${game.nameofgame}`}>
                        <img
                          src={`/presentation/${game.urlPoster}`} // URL par défaut pour l'image
                          alt={decodeURIComponent(game.nameofgame)}
                          className="w-[154px] h-[248px] lg:w-[192px] lg:h-[311px] hover:scale-105 transition duration-300"
                        />
                      </Link>
                    ) : (
                      <p>Image non disponible pour ce jeu.</p> // Message d'erreur si aucune image n'est disponible
                    )}
                  </li>
                ))}
              </ul>
            ) : (
                <p className="bg-amber-500">
                {genres && genres.split(",").length > 1
                  ? `Aucun jeu trouvé pour les catégories : ${decodeURIComponent(genres).split(",").join(", ")}`
                  : `Aucun jeu trouvé pour la catégorie : ${decodeURIComponent(genres)}`
                }
              </p>
            )}
          </div>
        )}
      </div>
    </GeneralLayout>
  );
}
