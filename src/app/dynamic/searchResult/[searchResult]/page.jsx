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

export default function SearchIntroductionGame() {
  // Variable
  const params = useParams();
  const nameofgame = decodeURIComponent(params.searchResult);

  // State
  const [games, setGames] = useState([]); // All all found are in this array
  console.log(games);
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
          <section className="flex flex-wrap tablet:gap-4 gap-2 justify-center w-[95%] lg:w-2/3 mx-auto">
            {games.length > 0 ? (
              games.map(
                (game) =>
                  game.urlPoster && (
                    <div
                      key={game._id}
                      className="mt-2 relative w-[150px] tablet:w-[192px] h-[243px] tablet:h-[311px] overflow-hidden tablet:shadow-xl shadow-black"
                    >
                      <Link
                        href={`/dynamic/introduction/${encodeURIComponent(
                          game.nameofgame
                        )}`}
                      >
                        <Image
                          src={`/presentation/${game.urlPoster}`}
                          layout="fill" // Utilisez layout="fill" pour remplir le conteneur
                          objectFit="cover" // Utilisez objectFit pour couvrir le conteneur
                          alt={`${game.urlPoster}`}
                        />
                      </Link>
                    </div>
                  )
              )
            ) : (
              <p>Aucun jeu trouvé</p>
            )}
          </section>
        </>
      )}
    </GeneralLayout>
  );
}
