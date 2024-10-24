"use client";

import { createIntroduction } from "@/actions/create-introduction";
import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";
import MyEditor from "@/components/MyEditor/MyEditor";
import EditorPerso from "@/components/EditorPerso/EditorPerso";
import Glimpse from "@/components/Glimpse/Glimpse";
import he from 'he';

// FORMULARY used by a the creator to introduce one game

export default function introductionGameForm() {
  // Variable
  const { data: session } = useSession();

  // State
  const [nameOfGame, setNameOfGame] = useState("");
  const [introductionOfTheGame, setIntroductionOfTheGame] = useState("");
  const [lienImage, setLienImage] = useState("");
  const [text, setText] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);


  // Function
  const onPrepare = async (e) => {
    e.preventDefault();

    try {
      const file = lienImage;
      if (!file) {
        return toast.error("Vous devez sélectionner un fichier image");
      }

      if (!file.name.match(/\.(jpg|jpeg|png)$/i)) {
        return toast.error(
          "Le lien de l'image doit être au format jpg, jpeg ou png"
        );
      }

      const formData = new FormData();
      formData.append("imageOne", file);
      formData.append("imageName", file.name);
      formData.append("nameOfGame", encodeURIComponent(nameOfGame));
      //formData.append("introductionOfTheGame", encodeURIComponent(introductionOfTheGame));
      formData.append("introductionOfTheGame",  he.encode(introductionOfTheGame));
      formData.append("isDarkMode", isDarkMode.toString()); 

      await createIntroduction(formData);
      toast.success("Présentation du jeu envoyée avec succès !");
    } catch (error) {
      return toast.error(error.message);
    }
  };
  return (
    <GeneralLayout>      
      <form onSubmit={onPrepare}  className="halfTransparentBlue">
        <p>
          {session?.user.username}, sur cette page, vous êtes invité à remplir
          de présentation de votre jeux.
        </p>
        <input
          type="text"
          name="nameOfGame"
          placeholder="Nom du jeu"
          className="px-3 py-2 rounded-md"      
          maxLength={80}
          size={80}
          value={nameOfGame}
          onChange={(e) => setNameOfGame(e.target.value)}
        />

        <div 
          className="p-2 bg-black text-white inline-block ml-2"
          onClick={() => setIsDarkMode(!isDarkMode)}
          >
            Texte noir et fond blanc
        </div>

        {/*<MyEditor value={introductionOfTheGame} onChange={(newContent) => setIntroductionOfTheGame(newContent)} />*/}
        <EditorPerso 
          setIntroductionOfTheGame={setIntroductionOfTheGame} 
          onTextChange={(newText) => {setIntroductionOfTheGame(newText); }} 
        />

        <Glimpse introductionOfTheGame={introductionOfTheGame} nameOfGame={nameOfGame} isDarkMode={isDarkMode}  />

        <input
          type="file"
          name="imageOne"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setLienImage(e.target.files[0])}
        />
        <button
          className="bg-green-500 p-3 mx-auto w-40 border-2 border-red-800 rounded-2xl m-2 disabled:bg-opacity-50 disabled:cursor-not-allowed disabled:border-none"
          disabled={nameOfGame.length < 1 || introductionOfTheGame.length < 1}/* Désactivé si les champs sont vides */
        >
          Envoyer
        </button>
      </form>

    </GeneralLayout>
  );
}
