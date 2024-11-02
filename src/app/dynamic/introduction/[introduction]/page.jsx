"use client";
// INTRODUCTION OF ONE GAME
  // Dynamic page
import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import he from 'he';
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
    const [user, setUser] = useState();// When the bio of the creator of this game is called
    /*
console.log(`contenu de game : `, game);
console.log(`creatorOfThisGame : `, creatorOfThisGame);
console.log(`user : `, user);
*/

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
  
      if (!data) {throw new Error("Invalid JSON response");}
  
      if (!response.ok) {toast.error("Une erreur est intervenue");}
  
      setgame(data.game);
      setCreatorOfThisGame(data.game.username)
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
    
          setUser (data.user); // Mettez à jour l'état `user` avec les données récupérées
        };
    
        fetchDataCreatorOfThisGame(); // Appelez la fonction ici
      }
    }, [game, creatorOfThisGame]); // Ajoutez `creatorOfThisGame` comme dépendance

    /**************************************************** */

    // Déterminer les classes en fonction de isDarkMode
    const isDarkMode = game.isDarkMode ; // Récupérer la valeur
    
    let sectionClasses = "text-black bg-[rgba(255,255,225,1)] w-[95vw] md:w-[75vw] xl:w-[50vw] mx-auto rounded-md p-4"; // Valeur par défaut

    if (isDarkMode === "true") {
      sectionClasses = "text-white bg-[rgba(0,0,0,0.90)] w-[95vw] md:w-[75vw] xl:w-[50vw] mx-auto rounded-md p-4";  
    } else{  // if (isDarkMode === "false") or undefined
      sectionClasses = "text-black bg-[rgba(255,255,225,1)] w-[95vw] md:w-[75vw] xl:w-[50vw] mx-auto rounded-md p-4";  
    }

    // Vérifiez si videoLink existe et modifiez-le si nécessaire
    if (game.videoLink && game.videoLink.includes("watch?v=")) {
      game.videoLink = game.videoLink.replace("watch?v=", "embed/");
    }

    // Convertir selectedAdditional en tableau
    if (game.selectedAdditional) {
      // Vérifiez si c'est une chaîne avant de faire split
      if (typeof game.selectedAdditional === 'string') {
          game.selectedAdditional = game.selectedAdditional.split(',').map(item => item.trim());
      }
    }

    const getPegiImage = (age) => {
      switch (age) {  
        case "3":  
          return logoPegi3;  
        case "7":  
          return logoPegi7;  
        case "12":  
          return logoPegi12;  
        case "16":  
          return logoPegi16;  
        case "18":  
          return logoPegi18;  
        default:  
          return null; // ou une image par défaut  
      }  
    };

      const getImageForPegi = (pegi) => {
        switch (pegi) {
          case 'Jeux de Hasard':
              return logoPegiJeuxHasard;
          case 'Violence':
              return logoPegiViolence;
          case 'Langage Grossier':
              return logoPegiLangageGrossier;
          case 'Peur':
              return logoPegiPeur;
          case 'Sexe':
              return logoPegiSexe;
          case 'Online':
              return logoPegiOnline; 
          case 'Nudité':
              return logoPegiNudite; 
          case 'Drogue':
              return logoPegiDrogue; 
          case 'Discrimination':
              return logoPegiDiscrimination; 
          default:
              return null; 
      }
    };
    return(
        <GeneralLayout>
          <section className={sectionClasses}>
            <div>Ceci est la présentation du jeu {decodeURIComponent(nameofgame)}</div>
            <div>Le développeur {game.username} </div>
            <div>Description du jeu : {game.content} </div>
            <div>Is black ou pas is black ? {game.isDarkMode} </div>
            <div>La présentation du créateur de ce jeu est-elle censée s'afficher ? {game.isIntroOfYourself}</div>
            <div>Pegi age : {game.selectedAge} </div>
            <div>Pegi catégorie(s) : {game.selectedAdditional}</div>
            <br></br>
            <h1>{decodeURIComponent(game.nameofgame)} </h1>
            <div className="description">
              {game.content ? (
                <div dangerouslySetInnerHTML={{ __html: he.decode(game.content.toString()) }} />
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

            {/* Affichage de l'image Pegi correspondante */}
            {game.selectedAge && (
              <div>
                <Image 
                  src={getPegiImage(game.selectedAge)} 
                  alt={`Logo Pegi ${game.selectedAge}`} 
                  width={50} // Ajustez la largeur selon vos besoins
                  height={50} // Ajustez la hauteur selon vos besoins
                />
              </div>
              )}

        <div>
          {game.selectedAdditional && Array.isArray(game.selectedAdditional) && game.selectedAdditional.length > 0 && (
              game.selectedAdditional.map((pegi, index) => {
                  const src = getImageForPegi(pegi);
                  return src ? (
                      <Image 
                          key={index} 
                          src={src} 
                          alt={`Logo Pegi ${pegi}`} 
                          width={100} 
                          height={100} 
                      />
                  ) : null; // Si aucune image n'est trouvée, ne rien afficher
              })
          )}
        </div>

        </section>
        {user && 
        <UserProfileSection user={user} />}

        </GeneralLayout>
    )
}