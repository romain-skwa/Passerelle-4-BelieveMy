"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/components/ForLayout/Loading/Loading";
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";
import formularyCss from "@/app/styles/formulary.module.css";

export default function AllCompResultsDetails(){
    const { language } = useLanguage();
      const [games, setGames] = useState([]); // All games found
      const [loading, setLoading] = useState(true);
      const searchParams = useSearchParams(); // Get all params from URL
    
      const genres = searchParams.get("genres"); // Get params 'genres' in the URL
      const platforms = searchParams.get("platforms"); // Get params 'platforms' in the l'URL
      const searchTerm = searchParams.get("searchTerm"); // Get params 'platforms' in the l'URL
    
      // According the language and the number, we display
      const [screenGenre, setScreenGenre] = useState([]);
      const [screenPlatform, setScreenPlatform] = useState([]);
      const [isOnlyOneGenre, setIsOnlyOneGenre] = useState([]);
      const [isOnlyOnePlatform, setIsOnlyOnePlatform] = useState([]);
    
      // Concerning the language and singular/plural ----------------------------------------------------------------
      useEffect(() => {
        if (language == "fr") {
          if (isOnlyOneGenre.length > 1) {
            setScreenGenre("Les catégories");
          } else {
            setScreenGenre("La catégorie");
          }
        } else {
          if (isOnlyOneGenre.length > 1) {
            setScreenGenre("The categories");
          } else {
            setScreenGenre("The categorie");
          }
        }
      }, [genres, language]);
    
      useEffect(() => {
        if (language == "fr") {
          if (isOnlyOnePlatform.length > 1) {
            setScreenPlatform("Les plate-formes");
          } else {
            setScreenPlatform("La plate-forme");
          }
        } else {
          if (isOnlyOnePlatform.length > 1) {
            setScreenPlatform("The platforms");
          } else {
            setScreenPlatform("The platform");
          }
        }
      }, [platforms, language]);
    
      // Check if Genres, Platform and searchTermString are defined before to send the request.--------------------------------
      useEffect(() => {
        if (genres || platforms || searchTerm) {
          const genreArray = genres ? genres.split(",") : [];
          const platformArray = platforms ? platforms.split(",") : [];
          const searchTermString = searchTerm ? searchTerm : "";
    
          setIsOnlyOneGenre(genreArray);
          setIsOnlyOnePlatform(platformArray);
    
          fetchGamesByGenresAndPlatforms(
            genreArray,
            platformArray,
            searchTermString
          );
        } else {
          toast.error(
            language == "fr"
              ? "Aucun genre ou plateforme trouvé dans l'URL"
              : "No genre or platform found in the URL"
          ); // Message d'erreur si genres ou plateformes manquants
        }
      }, [genres, platforms, searchTerm]);
    
      // Send the params to the API ---------------------------------------------------------------------------------
      const fetchGamesByGenresAndPlatforms = async (
        selectedGenres,
        selectedPlatforms,
        selectedTitle
      ) => {
        try {
          const response = await fetch("/api/searchByDetails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              genres: selectedGenres,
              platforms: selectedPlatforms,
              searchTerm: selectedTitle,
            }), // Envoi des genres et plateformes
            cache: "no-store", // Be sure to exploit the newest data
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
    
    return(
    <div>
        {loading ? (
          <Loading />
        ) : (
          <div className={`${formularyCss.neuphormism} bg-[rgba(255,255,255,0.90)] w-[95vw] tablet:w-[85vw] laptop:w-[900px] mx-auto rounded-md py-4 px-6 lg:w-2/3`}>
            <section className="text-center">
              <h1 className="text-center">
                {language == "fr"
                  ? "Résultats de votre recherche"
                  : "Results of your search"}{" "}
              </h1>
              <p>
                {genres && `${screenGenre} : ${genres.split(",").join(" ")}`}
              </p>
              <p>
                {platforms &&
                  ` ${screenPlatform} : ${platforms.split(",").join(", ")}`}
              </p>
              {games.length === 0 && (
                <p>
                  {language === "fr"
                    ? "Aucun jeu trouvé pour cette combinaison de genres et plateformes."
                    : "No game found for this combination of genres and platforms."}
                </p>
              )}
            </section>
            {games.length > 0 && (
              <ul className="mt-4 flex flex-wrap tablet:gap-4 gap-2 justify-center mx-auto ">
                {games.map((game) => (
                  <li
                    key={game._id}
                    className="rounded-xl overflow-hidden"
                    style={{ boxShadow: "5px 5px 8px rgba(0, 0, 0, 0.8)" }}
                  >
                    <Link href={`/dynamic/introduction/${game.nameofgame}`}>
                      <Image
                        src={
                          game.urlPosterCloudinary ||
                          `/presentation/${game.urlPoster}`
                        }
                        width={192}
                        height={311}
                        alt={decodeURIComponent(game.nameofgame)}
                        title={decodeURIComponent(game.nameofgame)}
                        className=" w-[154px] h-[248px] lg:w-[192px] lg:h-[311px] hover:scale-105 transition duration-300"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    )
}