"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";

export default function MadeByThisCreator({ user, usernameEncoded }) {
  const { language, changeLanguage } = useLanguage();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = user ? decodeURIComponent(user.username) : decodeURIComponent(usernameEncoded);
  const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);
  const [oneGameOr, setOneGameOr] = useState();

  const fetchgameData = async () => {
    try {
      const response = await fetch("/api/MadeByThisCreator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: user ? user.username : usernameEncoded }), // Utilisation de user.username ou usernameEncoded
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Une erreur est survenue");
        return;
      }

      // Vérifiez si des jeux existent dans data.games
      if (data.games && data.games.length > 0) {
        setGames(data.games);
        if (data.games && data.games.length === 1) {
          setOneGameOr(
            language == "fr" ? "Le jeu créé par" : "The game created by"
          );
        } else {
          setOneGameOr(
            language == "fr" ? "Les jeux créés par" : "The games created by"
          );
        }
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

  useEffect(() => {
    fetchgameData(); // Appel de la fonction pour récupérer les données
  }, [user, usernameEncoded, language]); 

  return (
    <div>
      {loading ? (
        <p>{language == "fr" ? "Chargement des jeux... " : "Loading... "}</p>
      ) : (
        <>
          <p className="text-center">
            {oneGameOr} {capitalizedUsername}{" "}
          </p>
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
                <Link href={`/dynamic/introduction/${game.nameofgame}`}>
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
