"use client";
// INTRODUCTION OF ONE GAME
// Dynamic page
import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import he from "he";
import "../../../styles/TinyMce.css";
import UserProfileSection from "@/components/UserProfileSection/UserProfileSection";
import { toast } from "react-toastify";
import Image from "next/image";
import logoPegi3 from "../../../../../public/logo/pegi_3.jpg";
import logoPegi7 from "../../../../../public/logo/pegi_7.jpg";
import logoPegi12 from "../../../../../public/logo/pegi_12.jpg";
import logoPegi16 from "../../../../../public/logo/pegi_16.jpg";
import logoPegi18 from "../../../../../public/logo/pegi_18.jpg";
import logoPegiSexe from "../../../../../public/logo/pegi_sexe.jpg";
import logoPegiOnline from "../../../../../public/logo/pegi_online.jpg";
import logoPegiNudite from "../../../../..//public/logo/pegi_nudite.jpg";
import logoPegiJeuxHasard from "../../../../../public/logo/pegi_jeuxHasard.jpg";
import logoPegiViolence from "../../../../../public/logo/pegi_violence.jpg";
import logoPegiLangageGrossier from "../../../../../public/logo/pegi_langageGrossier.jpg";
import logoPegiPeur from "../../../../../public/logo/pegi_peur.jpg";
import logoPegiDrogue from "../../../../../public/logo/pegi_drogue.jpg";
import logoPegiDiscrimination from "../../../../../public/logo/pegi_discrimination.jpg";

export default function IntroductionGame() {
  // Variable
  const params = useParams();
  const nameofgame = decodeURIComponent(params.introduction); // Important de mettre le nom du dossier [profilecreators]

  // State
  const [game, setgame] = useState({});
  const [creatorOfThisGame, setCreatorOfThisGame] = useState();
  const [user, setUser] = useState(); // When the bio of the creator of this game is called
  
console.log(`contenu de game : `, game);/*
console.log(`creatorOfThisGame : `, creatorOfThisGame);
console.log(`user : `, user);*/


  /************************************************ */
  useEffect(() => {
    if (!nameofgame) {
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
    setCreatorOfThisGame(data.game.username);
  };

  useEffect(() => {
    if (game.isIntroOfYourself === "true" && creatorOfThisGame) {
      const fetchDataCreatorOfThisGame = async () => {
        const response = await fetch("/api/getDataCreatorOfThisGame", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ creatorOfThisGame }),
        });

        const data = await response.json();

        if (!data) {
          throw new Error("Invalid JSON response");
        }

        if (!response.ok) {
          toast.error("Une erreur est intervenue");
        }

        setUser(data.user); // Mettez à jour l'état `user` avec les données récupérées
      };

      fetchDataCreatorOfThisGame(); // Appelez la fonction ici
    }
  }, [game, creatorOfThisGame]); // Ajoutez `creatorOfThisGame` comme dépendance

  /**************************************************** */

  // Déterminer les classes en fonction de isDarkMode
  const isDarkMode = game.isDarkMode; // Récupérer la valeur

  let sectionClasses =
    "text-black bg-[rgba(255,255,225,1)] w-[95vw] md:w-[75vw] xl:w-[50vw] mx-auto rounded-md p-4"; // Valeur par défaut

  if (isDarkMode === "true") {
    sectionClasses =
      "text-white bg-[rgba(0,0,0,0.90)] w-[95vw] md:w-[75vw] xl:w-[50vw] mx-auto rounded-md p-4";
  } else {
    // if (isDarkMode === "false") or undefined
    sectionClasses =
      "text-black bg-[rgba(255,255,225,1)] w-[95vw] md:w-[75vw] xl:w-[50vw] mx-auto rounded-md p-4";
  }

  // Vérifiez si videoLink existe et modifiez-le si nécessaire
  if (game.videoLink && game.videoLink.includes("watch?v=")) {
    game.videoLink = game.videoLink.replace("watch?v=", "embed/");
  }

  // Convertir selectedAdditionalPegi en tableau
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
      case "Jeux de Hasard": return { src: logoPegiJeuxHasard, title: "Jeux de Hasard" };
      case "Violence": return { src: logoPegiViolence, title: "Violence" };
      case "Langage Grossier": return { src: logoPegiLangageGrossier, title: "Langage Grossier" };
      case "Peur": return { src: logoPegiPeur, title: "Peur" };
      case "Sexe": return { src: logoPegiSexe, title: "Sexe" };
      case "Online": return { src: logoPegiOnline, title: "Online" };
      case "Nudité": return { src: logoPegiNudite, title: "Nudité" };
      case "Drogue": return { src: logoPegiDrogue, title: "Drogue" };
      case "Discrimination": return { src: logoPegiDiscrimination, title: "Discrimination" };
      default: return null;
    }
  };

      // Formatage de la date
      const formattedDate = game.releaseDate ? new Date(game.releaseDate).toLocaleDateString("fr-FR", {
        day: 'numeric',  
        month: 'long',  
        year: 'numeric'  
      }) : 'Pas de date concernant ce jeu';

  return (
    <GeneralLayout>
      <section className={sectionClasses}>
        <div>
          Ceci est la présentation du jeu {decodeURIComponent(nameofgame)}
        </div>
        <div>Le développeur {game.username} </div>
        <div>Description du jeu : {game.content} </div>
        <div>Is black ou pas is black ? {game.isDarkMode} </div>
        <div>
          La présentation du créateur de ce jeu est-elle censée s'afficher ?{" "}
          {game.isIntroOfYourself}
        </div>
        <div>Pegi age : {game.selectedAgePegi} </div>
        <div>Pegi catégorie(s) : {game.selectedAdditionalPegi}</div>
        <br></br>

        <h1 className="p-4 min-h-[50px] text-3xl font-bold text-center">
          {decodeURIComponent(game.nameofgame)}{" "}
        </h1>

        {/**************** Affichage des plate-formes PC et Consoles ********************/}
          {game.platform && (
              <div className={` flex justify-center gap-2 items-center `}>
                {game.platform.map((plat, index) => (
                  <div
                    key={index}
                    style={{ fontSize: '13px', padding: '1px 4px',  letterSpacing: '0.1rem'}}
                    className={
                      `inline-flex items-center   rounded-md  h-auto
                      ${ isDarkMode == true ? " border border-white" : " border-2 border-gray-700 "} 
                      `}
                  >
                    {plat}
                  </div>
                ))}
              </div>
            )}  

        {/******************** Affichage des images PEGI Age **************************/}
        <div className={`w-[95%] mx-auto flex justify-between align-middle gap-1`}>
          {/* Affichage de l'image Pegi AGE correspondante */}
            {pegiImage && (
              <Image
                src={pegiImage.src}
                alt={pegiImage.title}
                title={pegiImage.title}
                width={50} // Ajustez la largeur selon vos besoins
                height={50} // Ajustez la hauteur selon vos besoins
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
                    title={pegiData.title} // Ajoutez le titre pour l'attribut title
                    width={50}
                    height={50}
                  />
                ) : null; // Si aucune image n'est trouvée, ne rien afficher
              })}
          </div>
        </div>

        {/******************* Date de sortie du jeu **********************/}
        <div className={"p-4 min-h-[50px] text-right"}>
          Sortie le {formattedDate}.
        </div>

        {/*********************************************************************************************/}
        {game.shortIntroduction ? (
          <div className="p-4 min-h-[50px] font-bold ">
            {game.shortIntroduction}
          </div>
        ) : null}
        {/*********************************************************************************************/}
        <div className="description">
          {game.content ? (
            <div
              dangerouslySetInnerHTML={{
                __html: he.decode(game.content.toString()),
              }}
            />
          ) : (
            <div>Aucun contenu disponible</div>
          )}
        </div>

        {/* Affichage conditionnel de l'iframe */}
        {game.videoLink && (
          <div>
            <iframe
              width="560"
              height="315"
              src={game.videoLink}
              allowFullScreen
            ></iframe>
          </div>
        )}
      </section>

      {user && <UserProfileSection user={user} />}
    </GeneralLayout>
  );
}
