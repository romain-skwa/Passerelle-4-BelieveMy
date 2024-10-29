"use client";

import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import he from 'he';
import "../../../styles/TinyMce.css";

export default function IntroductionGame() {
    // Variable
    const params = useParams();
    const nameofgame = decodeURIComponent(params.introduction); // Important de mettre le nom du dossier [profilecreators]
    
    // State
    const [game, setgame] = useState({});

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
    };
    
    // Déterminer les classes en fonction de isDarkMode
    const isDarkMode = game.isDarkMode !== undefined ? game.isDarkMode : false; // Récupérer la valeur
    const sectionClasses = isDarkMode 
        ? "text-white bg-[rgba(0,0,0,0.90)] w-[95vw] md:w-[75vw] xl:w-[50vw] mx-auto rounded-md p-4" 
        : "text-black bg-[rgba(255,255,225,0.90)] w-[95vw] md:w-[75vw] xl:w-[50vw] mx-auto rounded-md p-4";

    return(
        <GeneralLayout>
          <section className={sectionClasses}>
            <div>Ceci est la présentation du jeu {decodeURIComponent(nameofgame)}</div>
            <div>Le développeur {game.username} </div>
            <div>Description du jeu : {game.content} </div>
            <div>Is black ou pas is black ? {game.isDarkMode} </div>
            <h1>{decodeURIComponent(game.nameofgame)} </h1>
            <div className="description">
              {game.content ? (
                <div dangerouslySetInnerHTML={{ __html: he.decode(game.content.toString()) }} />
              ) : (
                <div>Aucun contenu disponible</div>
              )}
            </div>
        </section>
        </GeneralLayout>
    )
}