"use client";
// INTRODUCTION OF ONE GAME
// Dynamic page
import { useSession } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation"; // Avec le routeur App, next/Router ne peut pas être utilisé
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import he from "he";
import "../../../styles/formIntroYourself.css";
import Image from "next/image";
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";
import UserProfileSection from "@/components/UserProfileSection/UserProfileSection";
import Share from "@/components/CreatorsForm/IntroGame/Share/Share";
import logoPegi3 from "/public/logo/pegi_3.jpg";
import logoPegi7 from "/public/logo/pegi_7.jpg";
import logoPegi12 from "/public/logo/pegi_12.jpg";
import logoPegi16 from "/public/logo/pegi_16.jpg";
import logoPegi18 from "/public/logo/pegi_18.jpg";
import logoPegiSexe from "/public/logo/pegi_sexe.jpg";
import logoPegiOnline from "/public/logo/pegi_online.jpg";
import logoPegiNudite from "/public/logo/pegi_nudite.jpg";
import logoPegiJeuxHasard from "/public/logo/pegi_jeuxHasard.jpg";
import logoPegiViolence from "/public/logo/pegi_violence.jpg";
import logoPegiLangageGrossier from "/public/logo/pegi_langageGrossier.jpg";
import logoPegiPeur from "/public/logo/pegi_peur.jpg";
import logoPegiDrogue from "/public/logo/pegi_drogue.jpg";
import logoPegiDiscrimination from "/public/logo/pegi_discrimination.jpg";
import Loading from "@/components/ForLayout/Loading/Loading";
import iconeSteam from "/public/icons/steam-icon.png";
import iconeEpicGames from "/public/icons/epicGamesIcon.png";
import PlayerSolo from "/public/icons/solo.png";
import MultiPlayersLocal from "/public/icons/multiLocal.png";
import MultiPlayersOnline from "/public/icons/multiOnline2.jpg";
import UpdateIntro from "@/components/CreatorsForm/IntroGame/UpdateIntro/UpdateIntro";
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";
import Flag from "@/components/Flag/Flag";
import WeAreDeleting from "@/components/WeAreDeleting/WeAreDeleting";
import WeAreUpdatingIntro from "@/components/WeAreUpdatingIntro/WeAreUpdatingIntro";

export default function IntroductionGame({ params: { introduction } }) {
  // Variable
  const nameofgame = introduction;
  const { language } = useLanguage();
  const pathname = usePathname(); // Récupérer le chemin actuel pour le partage
  const searchParams = useSearchParams(); // Récupérer les paramètres de recherche, si nécessaire pour le partage

  // State
  const { data: session } = useSession(); 
  const [game, setgame] = useState({}); // game is defined when the data of introduction are loaded
  const username = game.username;
  const encodedUsername = encodeURIComponent(username);
  const [creatorOfThisGame, setCreatorOfThisGame] = useState(""); // creatorOfThisGame is also defined when the data of introduction are loaded
  const [userBio, setUserBio] = useState(undefined); // When the bio of the creator of this game is needed
  const [OnlyBio, setOnlyBio] = useState(undefined); // When the bio of the creator of this game is not asked

  /*************************************************/
  const [loading, setLoading] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState(""); // Sometimes there is an image as background
  /*************************************************/
  const [currentUrl, setCurrentUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [weAreDeleting, setWeAreDeleting] = useState(false);
  const [weAreUpdatingIntro, setWeAreUpdatingIntro] = useState(false);

  const [comparaison, setComparaison] = useState({
    // What are the changement ?
    isNameOfGameChanged: false,
    isShortIntroChanged: false,
    isDetailsIntroChanged: false,
    isPlatformChanged: false,
    isReleaseDateChanged: false,
    isSelectedAgePegiChanged: false,
    isSelectedAdditionalPegiChanged: false,
    isSoloMultiChanged: false,
    isUrlPosterChanged: false,
    isUrlPosterCloudinaryChanged: false,
    isUrlImageOneChanged: false,
    isUrlImageTwoChanged: false,
    isUrlImageThreeChanged: false,
    isUrlBackgroundChanged: false,
    isVideoLinkChanged: false,
    isWebSiteOfThisGameChanged: false,
    isWebSiteOfThisCreatorChanged: false,
    isSteamLinkChanged: false,
    isEpicGamesLinkChanged: false,
    isGenreOfGameChanged: false,
    isDarkModeChanged: false,
    isIntroOfYourselfChanged: false,
  });
  //console.log(`comparaison : `, comparaison);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  // Récupérer l'URL actuelle pour les éventuels partages sur les réseaux sociaux
  useEffect(() => {
    if (typeof window !== "undefined") {
      const fullUrl = `${window.location.origin}${pathname}${
        searchParams.toString() ? `?${searchParams.toString()}` : ""
      }`;
      setCurrentUrl(fullUrl);
    }
  }, [pathname, searchParams]); // Re-déclencher lorsque le chemin ou les paramètres changent

  useEffect(() => {
    if (!game) {
      notFound();
    }

    fetchgameData();
  }, []);

  // Function
  const fetchgameData = async () => {
    const response = await fetch("/api/introduction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nameofgame }),
    });

    const data = await response.json();

    if (!data) {
      throw new Error("Invalid JSON response");
    }

    if (!response.ok) {
      toast.error("Une erreur est intervenue");
    }

    setgame(data.game);
    setCreatorOfThisGame(encodeURIComponent(data?.game?.username));
    setLoading(false);
  };
    
  // When creatorOfThisGame is defined -----------------------------------------------------
  useEffect(() => {    
    // When the creator choose to show his biography, we get... his biography
    if (game.isIntroOfYourself === "true" && creatorOfThisGame) { // when game.isIntroOfYourself === "true"
        //console.log("isIntroOfYourself est à true donc on doit obtenir toutes les données du creatorOfThisGame dans userBio");
      const fetchDataCreatorOfThisGame = async () => {
        const response = await fetch("/api/getAllDataCreatorOfThisGame", {
          method:  "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ creatorOfThisGame }),
        });

        const data = await response.json();

        if (!data) {throw new Error("Invalid JSON response");}

        if (!response.ok) {toast.error("Une erreur est intervenue");}

        setUserBio(data.user);
      };

      fetchDataCreatorOfThisGame();
    } else if(creatorOfThisGame) {// when game.isIntroOfYourself === "false" or undefined
        //console.log("On devrait obtenir une donnée userBio avec seulement... la bio");
      const fetchDataCreatorOfThisGame = async () => {
        const response = await fetch("/api/getBioDataCreatorOfThisGame", {
          method:  "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ creatorOfThisGame }),
        });

        const data = await response.json();
        if (!data) {throw new Error("Invalid JSON response");}
        if (!response.ok) {toast.error("Une erreur est intervenue pendant qu'on cherchait la BIO");}
        
        setOnlyBio(data.user);
      };
      fetchDataCreatorOfThisGame();
    }
  }, [ creatorOfThisGame]);

  /**************************************************** */

  // Determining classes based on isDarkMode
  const isDarkMode = game.isDarkMode; 

  let isDarkClass;

  if (isDarkMode === "true") {
    isDarkClass = "text-white bg-[rgba(0,0,0,0.90)]";
  } else {
    // if (isDarkMode === "false") or undefined
    isDarkClass = "text-black bg-white";
  }

  // Check if videoLink exists and modify it if necessary
  if (game.videoLink && game.videoLink.includes("watch?v=")) {
    game.videoLink = game.videoLink.replace("watch?v=", "embed/");
  }

  // Convert selectedAdditionalPegi to array
  if (game.selectedAdditionalPegi) {
    // Vérifiez si c'est une chaîne avant de faire split
    if (typeof game.selectedAdditionalPegi === "string") {
      game.selectedAdditionalPegi = game.selectedAdditionalPegi
        .split(",")
        .map((item) => item.trim());
    }
  }

  const getPegiImage = (age) => {
    switch (age) {
      case "3":
        return { src: logoPegi3, title: "Pegi 3" };
      case "7":
        return { src: logoPegi7, title: "Pegi 7" };
      case "12":
        return { src: logoPegi12, title: "Pegi 12" };
      case "16":
        return { src: logoPegi16, title: "Pegi 16" };
      case "18":
        return { src: logoPegi18, title: "Pegi 18" };
      default:
        return null;
    }
  };

  const pegiImage = getPegiImage(game.selectedAgePegi);

  const getImageForPegi = (pegi) => {
    switch (pegi) {
      case "Jeux de Hasard":
        return { src: logoPegiJeuxHasard, title: "Jeux de Hasard" };
      case "Violence":
        return { src: logoPegiViolence, title: "Violence" };
      case "Langage Grossier":
        return { src: logoPegiLangageGrossier, title: "Langage Grossier" };
      case "Peur":
        return { src: logoPegiPeur, title: "Peur" };
      case "Sexe":
        return { src: logoPegiSexe, title: "Sexe" };
      case "Online":
        return { src: logoPegiOnline, title: "Online" };
      case "Nudité":
        return { src: logoPegiNudite, title: "Nudité" };
      case "Drogue":
        return { src: logoPegiDrogue, title: "Drogue" };
      case "Discrimination":
        return { src: logoPegiDiscrimination, title: "Discrimination" };
      default:
        return null;
    }
  };

  // Date formatting
  const formattedDate = game.releaseDate
    ? new Date(game.releaseDate).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Pas de date concernant ce jeu";

  // BackgroundImage
  useEffect(() => {
    if (game.urlBackgroundCloudinary) {
      setBackgroundImage(game.urlBackgroundCloudinary);
    }
  }, [game]);

  // List of game modes
  const SoloMultis = [
    { genre: "Solo", icon: PlayerSolo },
    { genre: "Multijoueur local", icon: MultiPlayersLocal },
    { genre: "Multijoueur en ligne", icon: MultiPlayersOnline },
  ];

  const translations = {
    "Multijoueur en ligne": {
      true: "Multijoueur en ligne",
      false: "Multiplayer online",
    },

    "Multijoueur local": {
      true: "Multijoueur local",
      false: "Local multiplayer",
    },

    Solo: {
      true: "Solo",
      false: "Solo",
    },
  };

  return weAreDeleting ? (
    <WeAreDeleting />
  ) : (
    <GeneralLayout backgroundImage={backgroundImage}>
      {loading ? (
        <Loading />
      ) : weAreUpdatingIntro ? (
        <WeAreUpdatingIntro comparaison={comparaison} session={session} />
      ) : (
        <section
          className={`${isDarkClass} w-[95vw] md:w-[75vw] xl:w-[50vw] mx-auto rounded-md p-4 neuphormism mt-4`}
        >
          <h1 className="p-4 min-h-[50px] text-3xl font-bold text-center">
            {decodeURIComponent(game.nameofgame)}{" "}
          </h1>
          {/**************** Affichage des plate-formes PC et Consoles ********************/}
          {game.platform && (
            <div
              className={`flex justify-center gap-2 items-center mt-4 flex-wrap`}
            >
              {game.platform.map((plat, index) => (
                <div
                  key={index}
                  className={`PlatformIntro
                                ${
                                  isDarkMode == true
                                    ? " border border-white"
                                    : " border-2 border-gray-700 "
                                } 
                                `}
                >
                  {plat}
                </div>
              ))}
            </div>
          )}

          {/******************** Affichage des images PEGI Age **************************/}
          {pegiImage && (
            <div
              className={`w-[95%] my-4 mx-auto flex ${
                game.selectedAdditionalPegi.length > 0
                  ? "justify-between"
                  : "justify-center"
              } align-middle gap-1`}
            >
              {/* Affichage de l'image Pegi AGE correspondante */}
              {pegiImage && (
                <Image
                  src={pegiImage.src}
                  alt={pegiImage.title}
                  title={pegiImage.title}
                  width={50}
                  height={50}
                  className="w-[50px] h-[50px]"
                  unoptimized={true}
                />
              )}

              {/**************** Affichage des PEGI Catégories (Violence, Multijoueur) ********************/}
              <div className={`flex gap-1`}>
                {game.selectedAdditionalPegi &&
                  Array.isArray(game.selectedAdditionalPegi) &&
                  game.selectedAdditionalPegi.length > 0 &&
                  game.selectedAdditionalPegi.map((pegi, index) => {
                    const pegiData = getImageForPegi(pegi);
                    return pegiData ? (
                      <Image
                        key={index}
                        src={pegiData.src}
                        alt={pegiData.title}
                        title={pegiData.title}
                        width={50}
                        height={50}
                        unoptimized={true}
                      />
                    ) : null; // Si aucune image n'est trouvée, ne rien afficher
                  })}
              </div>
            </div>
          )}

          {/******************* Affichage des catégories **********************/}
          {game.genreOfGame && (
            <div
              className={` flex justify-center gap-2 items-center flex-wrap`}
            >
              {game.genreOfGame.map((genre, index) => (
                <div
                  key={index}
                  style={{
                    fontSize: "15px",
                    padding: "0px 8px 4px",
                    letterSpacing: "0.1rem",
                  }}
                  className={`inline-flex items-center rounded-md 
                          ${
                            isDarkMode == true
                              ? " border border-white"
                              : " border-2 border-gray-700 "
                          } 
                          `}
                >
                  {genre}
                </div>
              ))}
            </div>
          )}
          {/******************* Solo / Multi ******************************/}
          {game.SoloMulti && game.SoloMulti.length > 0 && (
            <div className="flex justify-center mt-4 pb-2 gap-5 flex-wrap">
              {game.SoloMulti.includes("Solo") && (
                <div
                  className="buttonSoloMulti"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>
                    Solo {/* Affichez le nom du genre */}
                  </span>
                  <Image
                    src={PlayerSolo}
                    alt="Solo"
                    width={50}
                    height={50}
                    style={{
                      borderRadius: "10px",
                    }}
                  />
                </div>
              )}

              {game.SoloMulti.includes("Multijoueur local") && (
                <div
                  className="buttonSoloMulti"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>
                  {language == "fr" ? "Multijoueur local" : "Local Multiplayers"}
                  </span>
                  <Image
                    src={MultiPlayersLocal} // Assurez-vous que MultiPlayersLocal est importé correctement
                    alt="Multijoueur local"
                    width={50}
                    height={50}
                    style={{
                      borderRadius: "10px",
                    }}
                  />
                </div>
              )}

              {game.SoloMulti.includes("Multijoueur en ligne") && (
                <div
                  className="buttonSoloMulti"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>
                  {language == "fr" ? "Multijoueur en ligne" : "Online Multiplayers"}
                  </span>
                  <Image
                    src={MultiPlayersOnline} // Assurez-vous que MultiPlayersOnline est importé correctement
                    alt="Multijoueur en ligne"
                    width={50}
                    height={50}
                    style={{
                      borderRadius: "10px",
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {/***********************************************************************************************/}
          {/******************** Introduction courte en gras **********************************************/}
          {game.shortIntroduction ? (
            <div className="p-4 min-h-[50px] font-bold mx-4">
              {he.decode(game.shortIntroduction)}
            </div>
          ) : null}
          {/******************** Présentation détaillée ************************************************/}
          <div className="p-4">
            {game.content ? (
              <article
                dangerouslySetInnerHTML={{
                  __html: he.decode(game.content.toString()),
                }}
              />
            ) : (
              <div>
                {language === "fr" ? "Aucun contenu disponible" : "No content"}
              </div>
            )}
          </div>

          {/************ vidéo Youtube ****************/}
          {game.videoLink && (
            <div className="flex justify-center pt-6">
              <iframe
                width="560"
                height="315"
                src={game.videoLink}
                allowFullScreen
              ></iframe>
            </div>
          )}

          <section className="mt-4 flex flex-col laptop:flex-row laptop:justify-center gap-6">
            {/******************* Site officiel du jeu **********************/}
            {game.webSiteOfThisGame && (
              <div className="font-semibold border-2 border-black py-2 px-4 rounded-3xl w-[170px] mx-auto laptop:m-0">
                <a
                  href={game.webSiteOfThisGame}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {language === "fr"
                    ? "Site officiel du jeu"
                    : "Official website of this game"}
                </a>
              </div>
            )}
            {/******************* Site officiel des créateurs **********************/}
            {game.webSiteOfThisCreator && (
              <div className="font-semibold border-2 border-black py-2 px-4 rounded-3xl  w-[220px] mx-auto laptop:m-0">
                <a
                  href={game.webSiteOfThisCreator}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {language === "fr"
                    ? "Site officiel des créateurs"
                    : "Official website of the developers"}
                </a>
              </div>
            )}
          </section>

          {/******************* Logo Steam & EpicGames **********************/}
          <section className="pt-6 flex justify-center gap-6">
            {game.steamLink && (
              <>
                <a
                  href={game.steamLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={iconeSteam}
                    width={50}
                    height={50}
                    className="w-[50px] h-[50px] hover:scale-105 transition duration-300"
                    alt="Steam"
                    unoptimized={true}
                  />
                </a>
              </>
            )}

            {game.epicGamesLink && (
              <>
                <a
                  href={game.epicGamesLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={iconeEpicGames}
                    width={40}
                    height={40}
                    className="w-[40px] mt-[2px] h-[40px] hover:scale-105 transition duration-300"
                    alt="Steam"
                    unoptimized={true}
                  />
                </a>
              </>
            )}
          </section>

          {/************** Les images d'illustration **********************/}
          <section className="flex flex-col tablet:flex-row gap-2 justify-center items-center">
            {game.urlImageOneCloudinary && (
              <Image
                src={game.urlImageOneCloudinary}
                className="w-[275px] h-[154px] py-3 inline-block"
                width={275}
                height={154}
                unoptimized={true}
                alt={`urlImageOne - ${game.nameofgame}`}
                onClick={() => openModal(game.urlImageOneCloudinary)}
              />
            )}
            {game.urlImageTwoCloudinary && (
              <Image
                src={game.urlImageTwoCloudinary}
                className="w-[275px] h-[154px] py-3 inline-block"
                width={275}
                height={154}
                unoptimized={true}
                alt={`${game.nameofgame}`}
                onClick={() => openModal(game.urlImageTwoCloudinary)}
              />
            )}
            {game.urlImageThreeCloudinary && (
              <Image
                src={game.urlImageThreeCloudinary}
                className="w-[275px] h-[154px] py-3 inline-block"
                width={275}
                height={154}
                unoptimized={true}
                alt={`${game.nameofgame}`}
                onClick={() => openModal(game.urlImageThreeCloudinary)}
              />
            )}
          </section>

          {/************ Affichage Nom du créateur ou de sa Bio **********************/}
          {userBio ? (
            <>
              <div className={"p-4 pr-6 min-h-[50px] text-right"}>
                {language === "fr" ? "Date de sortie : " : "Release date : "}{" "}
                {formattedDate}.
              </div>
              <UserProfileSection user={userBio} />
            </>
          ) : (
            <section className="tablet:flex tablet:justify-between">
              <div className="p-1 tablet:p-4 tablet:inline-block text-center">
                <Link
                  href={`../../../dynamic/profilecreators/@${encodedUsername}?lang=${language}&creator=${encodedUsername}&bio=${OnlyBio?.bio}`}
                >
                  {language === "fr" ? "Jeu créé par : " : "Game created by : "}{" "}
                  {decodeURIComponent(game.username)}
                </Link>
              </div>
              {/******************* Date de sortie du jeu **********************/}
              <div
                className={
                  "p-1 tablet:p-4 pr-6 tablet:min-h-[50px] text-center tablet:text-right"
                }
              >
                {language === "fr" ? "Date de sortie : " : "Release date : "}{" "}
                {formattedDate}.
              </div>
            </section>
          )}

          {/********* Share *************************************************/}
          <Share currentUrl={currentUrl} />

          {/********* Flag *************************************************/}
          {game && session && (
            <Flag
              gameId={game._id}
              nameOfGame={game.nameofgame}
              session={session}
              pathname={pathname}
            />
          )}

          {/*** When the visitor is *********************************************************************/}
          {/*********************** the CREATOR of this game, *******************************************/}
          {/************************************************* he may change the introduction ************/}

          {session && session.user.email === game.email ? (
            <UpdateIntro
              game={game}
              fetchgameData={fetchgameData}
              setLoading={setLoading}
              setWeAreDeleting={setWeAreDeleting}
              setWeAreUpdatingIntro={setWeAreUpdatingIntro}
              setComparaison={setComparaison}
            />
          ) : null}
        </section>
      )}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
          onClick={closeModal} // Ferme la modal si on clique en dehors
        >
          <div
            className="relative bg-white rounded-lg p-4"
            onClick={(e) => e.stopPropagation()} // Empêche la fermeture si on clique à l'intérieur
          >
            <button
              className="absolute top-2 right-2 text-black"
              onClick={closeModal}
            >
              &times; {/* Symbole de fermeture */}
            </button>
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Image agrandie"
                width={800}
                height={600}
                unoptimized={true}
              />
            )}
          </div>
        </div>
      )}
    </GeneralLayout>
  );
}
