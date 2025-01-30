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
      setLoading(false); // End of loading
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
              <h1>
                Résultats de la recherche : <br></br>{" "}
                <span className="text-3xl">{nameofgame}</span>
              </h1>
            </div>
            <ul className="flex flex-wrap tablet:gap-4 gap-2 justify-center w-[95%] lg:w-2/3 mx-auto">
              {games.length > 0 ? (
                games.map((game) =>
                  game.urlPoster || game.urlPosterCloudinary ? ( // Check if these data exist
                    <li
                      key={game._id}
                      className="rounded mt-2 relative overflow-hidden tablet:shadow-xl bg-black/70"
                      style={{
                        boxShadow: "5px 5px 8px rgba(0, 0, 0, 0.8)",
                        padding: "10px",
                      }}
                    >
                      <Link href={`/dynamic/introduction/${game.nameofgame}`}>
                        <div className="relative">
                          <Image
                            src={
                              game.urlPosterCloudinary ||
                              `/presentation/${game.urlPoster}`
                            } // When urlPosterCloudinary exist, or urlPoster
                            width={192}
                            height={311}
                            className="w-[154px] h-[248px] lg:w-[192px] lg:h-[311px] hover:scale-105 transition duration-300"
                            alt={game.nameofgame || "Image du jeu"}
                            unoptimized={true}
                          />
                        </div>
                      </Link>
                      <div className="text-center mt-2 font-semibold capitalize text-white">
                        {decodeURIComponent(game.nameofgame).length > 16
                          ? `${decodeURIComponent(game.nameofgame).slice(
                              0,
                              16
                            )}...`
                          : decodeURIComponent(game.nameofgame)}
                      </div>
                    </li>
                  ) : (
                    <p key={game._id}>
                      Image non disponible pour {game.nameofgame}
                    </p> // When none of these data exist
                  )
                )
              ) : (
                <p className="text-white">Aucun jeu trouvé pour ces critères.</p>
              )}
            </ul>
          </div>
        </>
      )}
    </GeneralLayout>
  );
}
