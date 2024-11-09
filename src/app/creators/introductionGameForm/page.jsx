"use client";

import { createIntroduction } from "@/actions/create-introduction";
import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import EditorPerso from "@/components/EditorPerso/EditorPerso";
import Glimpse from "@/components/Glimpse/Glimpse"; // Aperçu
import he from "he";
import UserProfileSection from "@/components/UserProfileSection/UserProfileSection";
import Pegi from "@/components/Pegi/Pegi";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Platform from './../../../components/Platform/Platform';
import GenreOfGame from './../../../components/GenreOfGame/GenreOfGame';

// FORMULARY used by a the creator to introduce one game

export default function introductionGameForm() {
  // Variable
  const { data: session } = useSession();
  const router = useRouter();

  // State
  const [nameOfGame, setNameOfGame] = useState("");
  const [introductionOfTheGame, setIntroductionOfTheGame] = useState("");
  const [lienImage, setLienImage] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isIntroOfYourself, setIsIntroOfYourself] = useState(false);
  const [user, setUser] = useState({});
  const [videoLink, setVideoLink] = useState("");
  const [selectedAgePegi, setSelectedAgePegi] = useState("");
  const [selectedAdditionalPegi, setSelectedAdditionalPegi] = useState([]);
  const [shortIntroduction, setShortIntroduction] = useState("");
  const [releaseDate, setReleaseDate] = useState(new Date());
  const [platform, setPlatform] = useState([]);
  const [webSiteOfThisGame, setWebSiteOfThisGame] = useState("");
  const [genreOfGame, setGenreOfGame] = useState([]);

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

  /****************** Envoyer les données à l'API createIntroduction **************************/
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

      if (!selectedAgePegi) {
        return toast.error(
          "Vous devez sélectionner un âge parmi les options disponibles."
        );
      }
    

    // Vérifiez si au moins une plateforme est sélectionnée

    if (platform.length === 0) {
      return toast.error("Vous devez sélectionner au moins une plateforme.");
      }

      // Function to send the data to createIntroduction function
      const formData = new FormData();
      formData.append("imageOne", file);
      formData.append("imageName", file.name);
      formData.append("videoLink", videoLink);
      formData.append("nameOfGame", encodeURIComponent(nameOfGame));
      formData.append("introductionOfTheGame", he.encode(introductionOfTheGame));
      formData.append("isDarkMode", isDarkMode.toString());
      formData.append("isIntroOfYourself", isIntroOfYourself.toString());
      formData.append("selectedAgePegi", selectedAgePegi);
      formData.append("selectedAdditionalPegi", selectedAdditionalPegi);
      formData.append("shortIntroduction", shortIntroduction);
      formData.append("releaseDate", releaseDate);
      formData.append("platform", JSON.stringify(platform));
      formData.append("webSiteOfThisGame", JSON.stringify(webSiteOfThisGame));
      formData.append("genreOfGame", JSON.stringify(genreOfGame));
      // Debugging

for (const [key, value] of formData.entries()) {

  console.log(key, value);

}
      await createIntroduction(formData);
      toast.success("Présentation du jeu envoyée avec succès !");
      // Redirect
      router.replace("/");
    } catch (error) {
      return toast.error(error.message);
    }
  };

  return (
    <GeneralLayout>
      <form
        onSubmit={onPrepare}
        className="w-[95vw] tablet:w-[84vw] laptop:w-[54vw] mx-auto border p-2"
        style={{ backgroundColor: "rgba(148, 163, 184, 0.7)" }}
      >
        <p>
          {session?.user.username}, sur cette page, vous êtes invité à remplir de présentation de votre jeux.
        </p>

        <div className="laptop:flex items-center">
          <input
            type="text"
            name="nameOfGame"
            placeholder="Nom du jeu"
            className="px-3 py-2 rounded-md w-full laptop:w-[70%] flex-grow"
            maxLength={80}
            size={80}
            value={nameOfGame}
            onChange={(e) => setNameOfGame(e.target.value)}
          />

          <div className="flex justify-center laptop:inline-block mt-3 laptop:mt-0">
            <div 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className="p-2 bg-black text-white inline-block ml-2 cursor-pointer"
            >
              Texte noir et fond blanc
            </div>
          </div>
        </div>

        <Platform platform={platform} setPlatform={setPlatform} />

        {/**************** Date ***************************** */}
        <div className="my-2 flex">
          <p className="text-white font-bold mr-2" style={{ textShadow: "2px 2px 7px rgba(0, 0, 0, 1)" }}>
            Date de sortie : 
          </p>
        <DatePicker className="pl-2" selected={releaseDate} dateFormat="dd/MM/yyyy" id="releaseDate" required onChange={(date) => setReleaseDate(date)} />
        </div>
        
        {/**************** Les deux catégories de PEGI ***************************** */}
        <Pegi
          selectedAgePegi={selectedAgePegi}
          setSelectedAgePegi={setSelectedAgePegi}
          selectedAdditionalPegi={selectedAdditionalPegi}
          setSelectedAdditionalPegi={setSelectedAdditionalPegi}
        />

        {/**************** Introduction courte ***************************** */}
        <div className="border p-2 my-2">
          <p
            className="text-white text-center font-bold mb-3"
            style={{ textShadow: "2px 2px 7px rgba(0, 0, 0, 1)" }}
          >
            Introduction courte et facultative qui sera affichée en gras
          </p>
          <textarea
            name="shortIntroduction"
            id="shortIntroduction"
            placeholder="Introduction courte et facultative qui sera affichée en gras"
            value={shortIntroduction}
            onChange={(e) => setShortIntroduction(e.target.value)}
          />
        </div>

        {/**************** Editeur de texte ********************************************** */}
        <EditorPerso
          setIntroductionOfTheGame={setIntroductionOfTheGame}
          onTextChange={(newText) => {
            setIntroductionOfTheGame(newText);
          }}
        />

        {/**************** Ajout de la biographie du créateur ***************************** */}
        <div className="flex justify-center">
          <div
            className=" grasFondBleuborder border-black p-2 inline-block mt-3 mb-3 rounded-md font-bold text-white cursor-pointer"
            onClick={() => setIsIntroOfYourself(!isIntroOfYourself)}
          >
            Souhaitez-vous ajouter la présentation de vous-même ou de votre équipe ?
          </div>
        </div>

        {/**************** Affiche ***************************** */}
        <div className="flex flex-col items-center">
          <div className="w-[95%] tablet:w-[60%] p-1 pl-2 mt-4 border grasFondBleu">
            <p className="text-center tablet:inline-block">Choisissez l'affiche du jeu </p>
            <input
              type="file"
              name="imageOne"
              accept=".jpg, .jpeg, .png"
              className="ml-4"
              onChange={(e) => setLienImage(e.target.files[0])}
            />
          </div>
            {/**************** Lien vidéo Youtube ***************************** */}
            <input
              type="url"
              name="videoLink"
              placeholder="Lien YouTube de la vidéo"
              className="block w-[95%] tablet:w-[60%] p-1 pl-2 m-2"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
            />
            
            {/**************** Lien Site officiel ***************************** */}
            <input
              type="url"
              name="webSiteOfThisGame"
              placeholder="Lien vers le site officiel du jeu"
              className="block w-[95%] tablet:w-[60%] p-1 pl-2"
              value={videoLink}
              onChange={(e) => setWebSiteOfThisGame(e.target.value)}
            />
        </div>

        <GenreOfGame selectedGenres={genreOfGame} setSelectedGenres={setGenreOfGame} />

        <Glimpse
          introductionOfTheGame={introductionOfTheGame}
          nameOfGame={nameOfGame}
          isDarkMode={isDarkMode}
          selectedAgePegi={selectedAgePegi}
          selectedAdditionalPegi={selectedAdditionalPegi}
          shortIntroduction={shortIntroduction}
          releaseDate={releaseDate}
          platform={platform}
          lienImage={lienImage}
        />
        {isIntroOfYourself && <UserProfileSection user={user} />}

        <button
          className="bg-green-500 p-3 mx-auto w-40 border-2 border-red-800 rounded-2xl m-2 disabled:bg-opacity-50 disabled:cursor-not-allowed disabled:border-none"
          disabled={
            nameOfGame.length < 1 || introductionOfTheGame.length < 1 || platform < 1 || shortIntroduction < 1 || lienImage === ""
          } /* Désactivé si les champs sont vides */
        >
          Envoyer
        </button>
      </form>
    </GeneralLayout>
  );
}
