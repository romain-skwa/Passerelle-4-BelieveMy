"use client";

import { createIntroduction } from "@/actions/create-introduction";
import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

// FORMULARY used by a the creator to introduce one game

export default function formularyintroduction() {
  // Variable
  const { data: session } = useSession();

  // State
  const [nameOfGame, setNameOfGame] = useState("");
  const [textarea, setTextarea] = useState("");
  const [lienImage, setLienImage] = useState("");

  // Function
  const onPrepare = async () => {
    try {
      const file = lienImage;
  console.log(`file : `, file);
      if (!file) {  
        return toast.error("Vous devez sélectionner un fichier image");  
      }
  
      if (!file.name.match(/\.(jpg|jpeg|png)$/i)) {  
        return toast.error("Le lien de l'image doit être au format jpg, jpeg ou png");  
      }  
  
      const formData = new FormData();  
      formData.append("imageOne", file);
      formData.append("imageName", file.name);
      formData.append("nameOfGame", nameOfGame);  
      formData.append("introductionOfTheGame", textarea);  
  
      await createIntroduction(formData);  
      toast.success("Présentation du jeu envoyée avec succès !");  
    } catch (error) {  
      return toast.error(error.message);  
    }
  };
  return (
    <GeneralLayout>
      <p>
        Ici nous sommes dans la page de formulaire où les développeurs
        présenteront leurs jeux.
      </p>
      <form action={onPrepare}>
        <p>
          {decodeURIComponent(session?.user.username)}, sur cette page, vous
          êtes invité à remplir de présentation de votre jeux.
        </p>
        <input
          type="text"
          name="nameOfGame"
          placeholder="Nom du jeu"
          value={nameOfGame}
          onChange={(e) => setNameOfGame(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="présentez ici"
          name="introductionOfTheGame"
          value={textarea}
          onChange={(e) => setTextarea(e.target.value)}
          className="w-11/12 h-48 p-4 text-lg"
        />
        <input
          type="file"
          name="imageOne"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setLienImage(e.target.files[0])}
        />
        <button
          className="bg-green-500 p-3 mx-auto w-40 border-2 border-red-800 rounded-2xl m-2 disabled:bg-opacity-50 disabled:cursor-not-allowed disabled:border-none"
          disabled={nameOfGame.length < 1 || textarea.length < 1}
        >
          Envoyer
        </button>
      </form>
    </GeneralLayout>
  );
}
