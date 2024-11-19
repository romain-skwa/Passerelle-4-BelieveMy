"use client";
// INTRODUCTION OF ONE GAME
// Dynamic page
import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";

export default function IntroductionGame() {
  // Variable
  const params = useParams();
  console.log(`params : `, params);

  const nameofgame = decodeURIComponent(params.searchResult);  // Important de mettre le nom du dossier [profilecreators]
  console.log(`nameofgame : `, nameofgame);
  
  // State
  const [game, setgame] = useState(null); // Initialiser à null
  console.log(`game : `, game);

  /************************************************ */
  useEffect(() => {
    if (!nameofgame) {
      notFound();
      return; // Ajoutez un retour pour éviter d'appeler fetchgameData si nameofgame est absent
    }

    fetchgameData();
  }, [nameofgame]); // Ajoutez nameofgame comme dépendance

  // Function
  const fetchgameData = async () => {
    try {
      const response = await fetch("/api/searchResult", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nameofgame }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Une erreur est survenue");
        return; // Ne pas continuer si la réponse n'est pas OK
      }

      // Vérifiez si data.game existe avant de l'utiliser
      if (data.game) {
        setgame(data.game);
      } else {
        toast.error("Aucun jeu trouvé");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
      toast.error("Une erreur est survenue lors de la récupération des données.");
    }
  };

  /**************************************************** */

  return (
    <GeneralLayout>
      <section>
        {game ? (
          <>
            {game.imageOne && (
              <Image
                src={`/presentation/${game.imageOne}`}
                className="h-[311px] hover:scale-105 transition duration-300"
                width={192}
                height={311}
                alt={`${game.imageOne}`}
              />
            )}
            {/* Ajoutez d'autres détails sur le jeu ici */}
          </>
        ) : (
          <p>Chargement du jeu...</p> // Message de chargement ou autre contenu par défaut
        )}
      </section>
    </GeneralLayout>
  );
}