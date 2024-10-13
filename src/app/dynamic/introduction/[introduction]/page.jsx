"use client";

import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import he from 'he';

export default function Profile() {
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
            <div>Ceci est la présentation du jeu {decodeURIComponent(nameofgame)}</div>
            <div>Nom du jeu {decodeURIComponent(game.nameofgame)} </div>
            <div>Le développeur {game.username} </div>
            <div>Description du jeu : {game.content} </div>
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