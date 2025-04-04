// Component used  with listOfYourGames, props : usernameEncoded, usernameDecoded, setHowManyGame
"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";

export default function MadeByThisCreator({ user, usernameEncoded, usernameDecoded, setHowManyGame }) {
  const { language } = useLanguage();
  const [games, setGames] = useState([]); console.log(games);
  const [loading, setLoading] = useState(true);
  const [oneGameOr, setOneGameOr] = useState("Aucun jeu n'a été présenté par ");
 
  const fetchgameData = async () => {
    try {
      const response = await fetch("/api/MadeByThisCreator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: user ? user.username : usernameEncoded }), // When we are on listOfYourGames, usernameEncoded is necessary.
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Une erreur est survenue");
        return;
      }

      // Vérifiez si des jeux existent dans data.games,
      if (data.games && data.games.length > 0) {
        setGames(data.games);
        if (data.games && data.games.length === 1) {
          setOneGameOr(language === "fr" ? "Le jeu créé par" : "The game created by");
          if (typeof setHowManyGame === 'function') {setHowManyGame(1);}
        } else {
          setOneGameOr(language === "fr" ? "Les jeux créés par" : "The games created by");
          if (typeof setHowManyGame === 'function') {setHowManyGame(2);}
        }
      } else {
        if (typeof setHowManyGame === 'function') {setHowManyGame(0);}
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

  useEffect(() => {
    fetchgameData(); // Appel de la fonction pour récupérer les données
  }, [user, usernameEncoded, language]); 

  return (
    <div>
      {loading ? (
        <p className="text-white text-3xl">Chargement des affiches</p>
      ) : (
        <>
        <div className="flex justify-center">
          <p className="text-white bg-black/70 border-2 py-3 px-4 rounded-full m-2 text-center inline-block">
            {oneGameOr} <span className="uppercase">{user ? decodeURIComponent(user.username) : (usernameDecoded)}</span>{" "}
          </p>
        </div>
          <section className="flex flex-wrap tablet:gap-4 gap-2 justify-center w-[95%] laptop:w-full mx-auto">
            {games.map((game) => (
              <div
                key={game._id}
                className="rounded mt-2 relative overflow-hidden tablet:shadow-xl bg-black/70"
                style={{
                  boxShadow: "5px 5px 8px rgba(0, 0, 0, 0.8)",
                  padding: "10px",
                }}
              >
                <Link href={`dynamic/introduction/${game.nameofgame}?nameOfGame=${game?.nameofgame}&description=${game?.shortIntroduction}`}>
                  <div className="relative">
                    <Image
                      src={
                        game.urlPosterCloudinary
                          ? `${game.urlPosterCloudinary}`
                          : `/presentation/${game.urlPoster}`
                      }
                      width={173}
                      height={280}
                      className="w-[146px] h-[240px] laptop:w-[173px] laptop:h-[280px] hover:scale-105 transition duration-300"
                      alt={`${game.nameofgame}`}
                      title={decodeURIComponent(game.nameofgame)}
                      unoptimized={true}
                    />
                  </div>
                </Link>

                <div className="text-center mt-2 font-semibold capitalize text-white">
                  {decodeURIComponent(game.nameofgame).length > 16
                    ? `${decodeURIComponent(game.nameofgame).slice(0, 16)}...`
                    : decodeURIComponent(game.nameofgame)}
                </div>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  );
}
