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

export default function IntroductionGame() {
    // Variable
    const params = useParams();
    const nameofgame = decodeURIComponent(params.introduction); // Important de mettre le nom du dossier [profilecreators]

    // State
    const [game, setgame] = useState({});
    const [creatorOfThisGame, setCreatorOfThisGame] = useState();
    const [user, setUser] = useState();
console.log(`contenu de game : `, game);
console.log(`creatorOfThisGame : `, creatorOfThisGame);
console.log(`user : `, user);

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


    return(
        <GeneralLayout>
          <section className={sectionClasses}>
            <div>Ceci est la présentation du jeu {decodeURIComponent(nameofgame)}</div>
            <div>Le développeur {game.username} </div>
            <div>Description du jeu : {game.content} </div>
            <div>Is black ou pas is black ? {game.isDarkMode} </div>
            <div>La présentation du créateur de ce jeu est-elle censée s'afficher ? {game.isIntroOfYourself} </div>
            <h1>{decodeURIComponent(game.nameofgame)} </h1>
            <div className="description">
              {game.content ? (
                <div dangerouslySetInnerHTML={{ __html: he.decode(game.content.toString()) }} />
              ) : (
                <div>Aucun contenu disponible</div>
              )}
            </div>
        </section>
        {user && 
        <UserProfileSection user={user} />}

        </GeneralLayout>
    )
}