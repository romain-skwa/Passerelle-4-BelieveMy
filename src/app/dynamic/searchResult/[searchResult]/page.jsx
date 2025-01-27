"use client";
// INTRODUCTION OF ONE GAME
// Dynamic page
import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/components/Loading/Loading";
import "@/app/styles/introduction.css";

export default function SearchIntroductionGame() {
  // Variable
  const params = useParams();
  const nameofgame = decodeURIComponent(params.searchResult);

  // State
  const [games, setGames] = useState([]); // All all found are in this array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!nameofgame) {
      notFound();
      return;
    }

    fetchgameData();
  }, [nameofgame]);

  const fetchgameData = async () => {
    try {
      const response = await fetch("/api/searchResult", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nameofgame }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Une erreur est survenue");
        return;
      }

      // Vérifiez si des jeux existent dans data.games
      if (data.games && data.games.length > 0) {
        setGames(data.games);
      } else {
        toast.error("Aucun jeu trouvé");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
      toast.error(
        "Une erreur est survenue lors de la récupération des données."
      );
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  return (
    <GeneralLayout>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="bg-[rgba(3,3,3,0.8)] w-[95vw] tablet:w-[85vw] laptop:w-[900px] mx-auto rounded-md py-4 px-6 lg:w-2/3 neuphormism">

          <div className="flex justify-center w-full text-white text-center">
            <h1>Résultats de la recherche : <br></br> <span className="text-3xl">{nameofgame}</span></h1>
          </div>
          <ul className="flex flex-wrap tablet:gap-4 gap-2 justify-center w-[95%] lg:w-2/3 mx-auto">
            {games.length > 0 ? (
              games.map((game) =>
                game.urlPoster || game.urlPosterCloudinary ? ( // Vérifie si l'un des deux existe
                  <li
                    key={game._id}
                    className="mt-2 relative w-[150px] tablet:w-[192px] h-[243px] tablet:h-[311px] rounded-xl overflow-hidden tablet:shadow-xl shadow-black"
                    style={{ boxShadow: '5px 5px 8px rgba(0, 0, 0, 0.8)' }}
                  >
                    <Link
                      href={`/dynamic/introduction/${(game.nameofgame)}`}
                    >
                      <Image
                        src={ game.urlPosterCloudinary || `/presentation/${game.urlPoster}` } // Utilise urlPosterCloudinary si disponible, sinon urlPoster
                        width={192} height={311}
                        className=" w-[154px] h-[248px] lg:w-[192px] lg:h-[311px] hover:scale-105 transition duration-300"
                        alt={game.nameofgame || "Image du jeu"}
                        unoptimized={true}
                      />
                    </Link>
                  </li>
                ) : (
                  <p key={game._id}>
                    Image non disponible pour {game.nameofgame}
                  </p> // Si aucune des deux n'est présente
                )
              )
            ) : (
              <p>Aucun jeu trouvé pour ces critères.</p>
            )}
          </ul>
          </div>
        </>
      )}
    </GeneralLayout>
  );
}
