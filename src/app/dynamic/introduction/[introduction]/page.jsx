"use client";

import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

    
export default function Profile() {
    // Variable
    const params = useParams();
    const nameofgame = params.introduction; // Important de mettre le nom du dossier [profilecreators]
    //console.log(`On voit le contenu de nameofgame : `, nameofgame);
    // State
    const [game, setgame] = useState({});
    console.log(`On voit le contenu de game : `, game);
  
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
    };
    return(
        <GeneralLayout>
            <section className="text-white">
            <div>Ceci est la présentation du jeu {nameofgame}</div>
            <div>Nom du jeu {game.nameofgame} </div>
            <div>Le développeur {game.username} </div>
            <div>Description du jeu : {game.content} </div>
            </section>
        </GeneralLayout>
    )
}