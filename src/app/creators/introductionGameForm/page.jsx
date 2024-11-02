"use client";

import { createIntroduction } from "@/actions/create-introduction";
import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import EditorPerso from "@/components/EditorPerso/EditorPerso";
import Glimpse from "@/components/Glimpse/Glimpse"; // Aperçu
import he from "he";
import UserProfileSection from "@/components/UserProfileSection/UserProfileSection";
import Pegi from "@/components/Pegi/Pegi";

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
  const [isIntroOfYourself, setIsIntroOfYourself] = useState(false);
  const [user, setUser] = useState({});
  const [videoLink, setVideoLink] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedAdditional, setSelectedAdditional] = useState([]); 

   // Ajoutez cela à formData

  /************* Récupérer les données concernant l'utilisateur ***************************/
  useEffect(() => {
    // to use the function fetchUserData when the session is defined
    fetchUserData();
  }, [session]);

  // Function to get all data about the connected user
  const fetchUserData = async () => {
    const response = await fetch("/api/getAllUserDataSession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(session?.user?.username),
    });

    const data = await response.json();

    if (!data) {
      throw new Error("Invalid JSON response");
    }

    if (!response.ok) {
      toast.error("Une erreur est intervenue");
    }

    setUser(data.user);
  };
  
  /****************** Envoyer les données à l'API createIntroduction ***************** */
  const onPrepare = async (e) => {
    e.preventDefault();

    try {
      const file = lienImage;
      if (!file) {return toast.error("Vous devez sélectionner un fichier image");}

      if (!file.name.match(/\.(jpg|jpeg|png)$/i)) {return toast.error("Le lien de l'image doit être au format jpg, jpeg ou png");}

      if (!selectedAge) {return toast.error("Vous devez sélectionner un âge parmi les options disponibles.");}

      // Function to send the data to createIntroduction function
      const formData = new FormData();
      formData.append("imageOne", file);
      formData.append("imageName", file.name);
      formData.append("videoLink", videoLink);
      formData.append("nameOfGame", encodeURIComponent(nameOfGame));
      formData.append("introductionOfTheGame",he.encode(introductionOfTheGame));
      formData.append("isDarkMode", isDarkMode.toString());
      formData.append("isIntroOfYourself", isIntroOfYourself.toString());
      formData.append("selectedAge", selectedAge);
      formData.append("selectedAdditional", selectedAdditional);

      await createIntroduction(formData);
      toast.success("Présentation du jeu envoyée avec succès !");
    } catch (error) {
      return toast.error(error.message);
    }
  };
  
  return (
    <GeneralLayout>
      <form onSubmit={onPrepare} className="w-[53vw] mx-auto border p-2">
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

        <Pegi 
        selectedAge={selectedAge} 
        setSelectedAge={setSelectedAge} 
        selectedAdditional={selectedAdditional} 
        setSelectedAdditional={setSelectedAdditional} 
        />
        {/*<MyEditor value={introductionOfTheGame} onChange={(newContent) => setIntroductionOfTheGame(newContent)} />*/}
        <EditorPerso
          setIntroductionOfTheGame={setIntroductionOfTheGame}
          onTextChange={(newText) => {
            setIntroductionOfTheGame(newText);
          }}
        />

        <div
          className="border border-black p-2 inline-block mt-3 rounded-md font-bold text-white cursor-pointer"
          style={{
            textShadow: "2px 2px 7px rgba(0, 0, 0, 1)",
            backgroundColor: "rgba(148, 163, 184, 0.7)",
          }}
          onClick={() => setIsIntroOfYourself(!isIntroOfYourself)}
        >
          Souhaitez-vous ajouter la présentation de vous-même ou de votre équipe
          ?
        </div>

        <Glimpse
          introductionOfTheGame={introductionOfTheGame}
          nameOfGame={nameOfGame}
          isDarkMode={isDarkMode}
        />
        {isIntroOfYourself && <UserProfileSection user={user} />}

        <input
          type="file"
          name="imageOne"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setLienImage(e.target.files[0])}
        />

        <input
          type="url"
          name="videoLink"
          placeholder="Lien YouTube de la vidéo"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />

        <button
          className="bg-green-500 p-3 mx-auto w-40 border-2 border-red-800 rounded-2xl m-2 disabled:bg-opacity-50 disabled:cursor-not-allowed disabled:border-none"
          disabled={
            nameOfGame.length < 1 || introductionOfTheGame.length < 1
          } /* Désactivé si les champs sont vides */
        >
          Envoyer
        </button>
      </form>
    </GeneralLayout>
  );
}
