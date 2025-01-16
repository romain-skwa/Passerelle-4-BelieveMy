"use client";

import { useSearchParams } from "next/navigation"; // Utilisation de useSearchParams
import { useEffect, useState } from "react";
import Loading from "@/components/Loading/Loading";
import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import { toast } from "react-toastify";
import Link from "next/link";

export default function searchResultsDetails() {
  const searchParams = useSearchParams();
  //console.log(`searchParams : `, searchParams);
  const genres = searchParams.get("genres"); // Récupère le paramètre 'genres' de l'URL
  console.log(`genres : `, genres);
  const platforms = searchParams.get("platforms"); // Récupère le paramètre 'platforms' de l'URL
  console.log(`platforms : `, platforms);

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // Vérifie si genres ou plateformes sont définis avant d'envoyer la requête.
  useEffect(() => {
    if (genres || platforms) {
      const genreArray = genres ? genres.split(",") : [];
      const platformArray = platforms ? platforms.split(",") : [];
      console.log(`genreArray : `, genreArray);
      console.log(`platformArray : `, platformArray);

      fetchGamesByGenresAndPlatforms(genreArray, platformArray);
    } else {
      toast.error("Aucun genre ou plateforme trouvé dans l'URL"); // Message d'erreur si genres ou plateformes manquants
    }
  }, [genres, platforms]);

  const fetchGamesByGenresAndPlatforms = async (selectedGenres, selectedPlatforms) => {
    try {
      const response = await fetch("/api/searchByDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ genres: selectedGenres, platforms: selectedPlatforms }), // Envoi des genres et plateformes
      });

      if (!response.ok) {
        console.error("Erreur de réponse:", response.statusText);
        throw new Error("Erreur de récupération des jeux");
      }

      const responseText = await response.text();
      const data = JSON.parse(responseText);

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
            <h1>
              Résultats pour :{" "}
              {genres && genres.split(",").join(" ")}
              {platforms && ` sur ${platforms.split(",").join(", ")}`}
            </h1>
            {games.length > 0 ? (
              <ul className="flex flex-wrap tablet:gap-4 gap-2 justify-center w-[95%] lg:w-2/3 mx-auto">
                {games.map((game) => (
                  <li key={game._id}>
                    <Link href={`/dynamic/introduction/${game.nameofgame}`}>
                      <img
                        src={game.urlPosterCloudinary || `/presentation/${game.urlPoster}`}
                        alt={decodeURIComponent(game.nameofgame)}
                        className="w-[154px] h-[248px] lg:w-[192px] lg:h-[311px] hover:scale-105 transition duration-300"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucun jeu trouvé pour cette combinaison de genres et plateformes.</p>
            )}
          </div>
        )}
      </div>
    </GeneralLayout>
  );
}
