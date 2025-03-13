// components/GamePresentationSections/GamePresentationSections.js

import React, { useEffect, useState } from "react";
import Platform from "../GamePresentationInside/Platform/Platform";
import Pegi from "@/components/CreatorsForm/GamePresentationInside/Pegi/Pegi";
import ButtonSoloMulti from "@/components/CreatorsForm/GamePresentationInside/ButtonSoloMulti/ButtonSoloMulti";
import GenreOfGame from "../GamePresentationInside/GenreOfGame/GenreOfGame";
import DatePicker from "react-datepicker";
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";
import ImageCloudinary from "@/components/ImageCloudinary/ImageCloudinary";
import { toast } from "react-toastify";
import { createIntroduction } from "@/actions/create-introduction";
import he from "he";
import { useRouter } from "next/navigation";
import { Cloudinary } from "@cloudinary/url-gen";
import TinyMceEditor from "@/components/TinyMceEditor/TinyMceEditor";


const GamePresentationSections = ({
  nameOfGame,
  setNameOfGame,
  shortIntroduction,  setShortIntroduction,
  introductionOfTheGame,  setIntroductionOfTheGame,
  platform,  setPlatform,
  releaseDate,  setReleaseDate,
  selectedAgePegi,  setSelectedAgePegi,
  selectedAdditionalPegi,  setSelectedAdditionalPegi,
  SoloMulti,  setSoloMulti,
  setBackgroundPreview,
  videoLink,  setVideoLink,
  webSiteOfThisGame,  setWebSiteOfThisGame,
  webSiteOfThisCreator,  setWebSiteOfThisCreator,
  steamLink,  setSteamLink,
  epicGamesLink,  setEpicGamesLink,
  genreOfGame,  setGenreOfGame,
  isDarkMode,
  isIntroOfYourself,  setIsIntroOfYourself,
  filesToSend,  setFilesToSend,
  setWeAreSendingData,
}) => {
  const { language } = useLanguage();
  const router = useRouter();
   console.log(SoloMulti);
  /********* Variable ************************************************************/
  // When the images have been sent to Cloudinary, their URLs are stored in urlMongoDB.
  const [urlMongoDB, setUrlMongoDB] = useState("");

  // When backgroundGlimpseFile exist, we extract the Url from the file.
  // And we send it to introductionGameForm to display it.
  useEffect(() => {
    if (filesToSend.backgroundGlimpseFile) {
      const url = URL.createObjectURL(filesToSend.backgroundGlimpseFile);
      setBackgroundPreview(url);
    } else {
      setBackgroundPreview("");
    }
  }, [filesToSend.backgroundGlimpseFile]);

  // (1-2) Send data to API createIntroduction  -- try catch -- verifications - Upload Image To Cloudinary
  // (3)   Are all url ready to be sent ?       -- useEffect
  // (4)   Send data to MongoDB                 -- try catch

  /****************** Send data to API createIntroduction *****************************************************/
  /** 1 **** verification *******/
  const handleSendSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!filesToSend || filesToSend.length === 0) {
        return toast.error("Vous devez sélectionner au moins un fichier image");      
      }      

      if (!selectedAgePegi) {
        return toast.error(
          "Vous devez sélectionner un âge parmi les options disponibles."
        );
      }

      //Vérifiez le nombre de caractères de la présentation détaillée.
      if (introductionOfTheGame.length > 10000) {
        return toast.error(
          "La présentation doit comporter 10 000 caractères maximum."
        );
      }
      // Vérifiez si au moins une plateforme est sélectionnée
      if (platform.length === 0) {
        return toast.error("Vous devez sélectionner au moins une plateforme.");
      }

      // Vérifiez si le site du jeu commence par "https://"
      if (webSiteOfThisGame && !webSiteOfThisGame.startsWith("https://")) {
        return toast.error(
          "Le lien du site officiel doit commencer par 'https://'"
        );
      }

      // Vérifiez si le site des créateurs commence par "https://"
      if (
        webSiteOfThisCreator &&
        !webSiteOfThisCreator.startsWith("https://")
      ) {
        return toast.error(
          "Le lien du site officiel doit commencer par 'https://'"
        );
      }

      // Vérification du format de la date de sortie
      if (releaseDate) {
        const releaseDateString = releaseDate.toLocaleDateString("fr-FR"); // Format de la date en français
        const datePattern = /^\d{2}\/\d{2}\/\d{4}$/; // Expression régulière pour jj/mm/aaaa

        if (!datePattern.test(releaseDateString)) {
          return toast.error(
            "La date de sortie doit être au format jj/mm/aaaa (ex: 17/05/2025)"
          );
        }
      } else {
        return toast.error("Vous devez sélectionner une date de sortie.");
      }

      // Vérifiez si le site Steam commence par "https://"
      if (
        steamLink &&
        (!steamLink.startsWith("https://") || !steamLink.includes("steam"))
      ) {
        return toast.error(
          "Le lien vers Steam doit commencer par 'https://' et inclure steam"
        );
      }

      /*** 2 ******** Upload Image To Cloudinary ***************************************************************/
      const cld = new Cloudinary({
        cloud: {
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        },
        url: {
          secure: true,
        },
      });

      const uploadPromises = Object.entries(filesToSend).map(
        async ([key, file]) => {
          if (file) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset",process.env.NEXT_UPLOAD_PRESET_UNSIGNED);

            try {
              const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
                {
                  method: "POST",
                  body: formData,
                }
              );
              const data = await response.json();
              console.log(`Upload successful for ${key}:`, data.secure_url);

              // Stocker l'URL dans l'état approprié
              setUrlMongoDB((prev) => ({
                ...prev,
                [key]: data.secure_url, // Mettez à jour l'URL directement dans sendImages
              }));
            } catch (error) {
              console.error(`Upload error for ${key}:`, error);
            }
          }
        }
      );

      // Attendez que tous les téléchargements soient terminés
      await Promise.all(uploadPromises);
    } catch (error) {
      console.log(error);
      return toast.error(error.message);
    }
  };

  // ** 3 ** Are all url ready to be sent ? ********************************************************************
  useEffect(() => {
    const checkUrls = async () => {
      // Check urlMongoDB contain all values before to call handleFormSubmit
      if (Object.keys(urlMongoDB).length < Object.keys(filesToSend).length) {
        console.log("Il reste des URL à stocker dans urlMongoDB.");
      } else if (/* Two conditions*/Object.keys(urlMongoDB).length === Object.keys(filesToSend).length && Object.keys(filesToSend).length > 0) {
        console.log("Maintenant que les images ont été envoyées, on lance la fonction handleFormSubmit pour envoyer les données à mongoDB");
        await handleFormSubmit();
      }
    };
    checkUrls();
  }, [urlMongoDB]);

  /****** 4 ************** Send data to MongoDB ********************************************************** */
  const handleFormSubmit = async () => {
    setWeAreSendingData(true);
    try {
      // Function to send the data to createIntroduction function
      const introductionFormaData = new FormData();
      introductionFormaData.append("nameOfGame", encodeURIComponent(nameOfGame));
      introductionFormaData.append("shortIntroduction", he.encode(shortIntroduction) );
      introductionFormaData.append("introductionOfTheGame", he.encode(introductionOfTheGame));
      introductionFormaData.append("platform", JSON.stringify(platform));
      introductionFormaData.append("releaseDate", releaseDate);
      introductionFormaData.append("urlPosterCloudinary", urlMongoDB.posterGlimpseFile || "");
      introductionFormaData.append("urlImageOneCloudinary",urlMongoDB.imageOneGlimpseFile || "");
      introductionFormaData.append("urlImageTwoCloudinary",urlMongoDB.imageTwoGlimpseFile || "");
      introductionFormaData.append("urlImageThreeCloudinary",urlMongoDB.imageThreeGlimpseFile || "");
      introductionFormaData.append("urlBackgroundCloudinary",urlMongoDB.backgroundGlimpseFile || "");
      introductionFormaData.append("SoloMulti", JSON.stringify(SoloMulti));
      introductionFormaData.append("selectedAgePegi", selectedAgePegi);
      introductionFormaData.append("selectedAdditionalPegi",selectedAdditionalPegi);
      introductionFormaData.append("genreOfGame", JSON.stringify(genreOfGame));
      introductionFormaData.append("videoLink", videoLink);
      introductionFormaData.append("steamLink", steamLink);
      introductionFormaData.append("epicGamesLink", epicGamesLink);
      introductionFormaData.append("webSiteOfThisGame", webSiteOfThisGame);
      introductionFormaData.append("webSiteOfThisCreator",webSiteOfThisCreator);
      introductionFormaData.append("isDarkMode", isDarkMode.toString());
      introductionFormaData.append("isIntroOfYourself",isIntroOfYourself.toString());

      await createIntroduction(introductionFormaData);
      toast.success("Présentation du jeu envoyée avec succès !");
      console.log("Présentation du jeu envoyée avec succès !");

      // Redirect
      router.replace("/");
    } catch (error) {
      console.log(error);
      return toast.error(error.message);
    } finally {
      console.log(
        "----------------------------- C'est tout bon ! ---------------------------------------"
      );
    }
  };

  return (
    <form
      onSubmit={handleSendSubmit}
      className="neuphormismFormularyIntroductionGame w-full mb-4 rounded-lg"
    >
      <div className="laptop:flex items-center mb-3 w-[100%]">
        {/* Input Nom du Jeu*/}
        <input
          type="text"
          name="nameOfGame"
          placeholder="Nom du jeu"
          className="px-3 py-2 rounded-md w-[92%] tablet:w-[100%] mx-4 mt-4 text-white neuphormismUndergroung"
          maxLength={80}
          size={80}
          value={nameOfGame}
          onChange={(e) => setNameOfGame(e.target.value)}
        />
      </div>

      {/**************** Introduction courte ******************************/}
      <div className="p-2 my-2">
        <p
          className="text-white text-center font-bold mb-3"
          style={{ textShadow: "2px 2px 7px rgba(0, 0, 0, 1)" }}
        >
          {language == "fr"
            ? "Cette introduction courte sera affichée en gras"
            : "This short introduction will be displayed in bold."}
        </p>
        <textarea
          name="shortIntroduction"
          id="shortIntroduction"
          placeholder="Cette introduction courte sera affichée en gras"
          value={shortIntroduction}
          onChange={(e) => setShortIntroduction(e.target.value)}
          className="text-white neuphormismUndergroung"
        />
      </div>

      {/**************** Text Editor ********************************************** */}
      <TinyMceEditor setIntroductionOfTheGame={setIntroductionOfTheGame} />

      {/**************** Platform ***************************** */}
      <Platform platform={platform} setPlatform={setPlatform} />

      {/**************** Date ***************************** */}
      <div className="my-2 flex justify-center">
        <p
          className="text-white font-bold mr-2"
          style={{ textShadow: "2px 2px 7px rgba(0, 0, 0, 1)" }}
        >
          {language === "fr" ? "Date de sortie :" : "Release date:"}
        </p>
        <DatePicker
          className="pl-2 text-black"
          selected={releaseDate}
          dateFormat="dd/MM/yyyy"
          id="releaseDate"
          required
          onChange={(date) => setReleaseDate(date)}
        />
      </div>

      {/**************** Les deux catégories de PEGI ***************************** */}
      <Pegi
        selectedAgePegi={selectedAgePegi}
        setSelectedAgePegi={setSelectedAgePegi}
        selectedAdditionalPegi={selectedAdditionalPegi}
        setSelectedAdditionalPegi={setSelectedAdditionalPegi}
      />

      {/**************** Sole ou Multi ***************************** */}

      <ButtonSoloMulti SoloMulti={SoloMulti} setSoloMulti={setSoloMulti} />

      {/**************** Image Affiche [encadré] ***************************** */}

      <div className="encadreViolet">
        <p className="choisissezLimage">
          {language === "fr"
            ? "Choisissez l'affiche du jeu"
            : "Choose the game's poster."}{" "}
        </p>

        <ImageCloudinary
          name="posterGlimpseFile"
          setFilesToSend={setFilesToSend}
        />
      </div>

      <section className="flex flex-col tablet:flex-row w-[100%] justify-center">
        {/**************** Image d'illustration n°1 [encadré] ***************************** */}

        <div className="encadreViolet">
          <p className="choisissezLimage">
            {language === "fr"
              ? "Choisissez l'image d'illustration n°1"
              : "Choose illustration image #1."}{" "}
          </p>
          <ImageCloudinary
            name="imageOneGlimpseFile"
            setFilesToSend={setFilesToSend}
          />
        </div>

        {/**************** Image d'illustration n°2 [encadré] ***************************** */}
        <div className="encadreViolet">
          <p className="choisissezLimage">
            {language === "fr"
              ? "Choisissez l'image d'illustration n°2"
              : "Choose illustration image #2."}{" "}
          </p>
          <ImageCloudinary
            name="imageTwoGlimpseFile"
            setFilesToSend={setFilesToSend}
          />
        </div>

        {/**************** Image d'illustration n°3 [encadré] ***************************** */}
        <div className="encadreViolet">
          <p className="choisissezLimage">
            {language === "fr"
              ? "Choisissez l'image d'illustration n°3"
              : "Choose illustration image #3."}{" "}
          </p>
          <ImageCloudinary
            name="imageThreeGlimpseFile"
            setFilesToSend={setFilesToSend}
          />
        </div>
      </section>

      {/**************** Arrière plan [encadré] ***************************** */}
      <div className="w-[90%] p-2 mx-auto mt-4 grasFondBleu">
        <p className="text-center mb-2">
          {language === "fr"
            ? "Choisissez une image pour l'arrière-plan"
            : "Choose an image for the background."}{" "}
        </p>

        <div className="flex justify-center ">
          <ImageCloudinary
            name="backgroundGlimpseFile"
            setFilesToSend={setFilesToSend}
          />
        </div>
      </div>

      <section className="flex flex-col items-center">
        {/**************** Lien vidéo Youtube [encadré] ***************************** */}
        <input
          type="url"
          name="videoLink"
          placeholder={ language === "fr" ? "Lien YouTube de la vidéo" : "YouTube link of the video."}
          className="neuphormismUndergroung inputLink"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />

        {/**************** Lien Site officiel du jeu [encadré] ***************************** */}
        <input
          type="url"
          name="webSiteOfThisGame"
          placeholder={language === "fr" ? "Lien vers le site officiel du jeu" : "Link to the official game website."}
          className="neuphormismUndergroung inputLink mx-2 tablet:mx-4"
          value={webSiteOfThisGame}
          onChange={(e) => setWebSiteOfThisGame(e.target.value)}
        />

        {/**************** Lien Site officiel des créateurs [encadré] ***************************** */}
        <input
          type="url"
          name="webSiteOfThisCreator"
          placeholder={language === "fr" ? "Lien vers le site officiel du/des créateur(s)" : "Link to the official website of the creator(s)."}
          className="neuphormismUndergroung inputLink"
          value={webSiteOfThisCreator}
          onChange={(e) => setWebSiteOfThisCreator(e.target.value)}
        />

        {/**************** Lien Steam [encadré] ***************************** */}
        <input
          type="url"
          name="steamLink"
          placeholder={language === "fr" ? "Lien vers le site Steam" : "Link to the Steam page."}
          className="neuphormismUndergroung inputLink"
          value={steamLink}
          onChange={(e) => setSteamLink(e.target.value)}
        />

        {/**************** Lien Epic Games [encadré] ***************************** */}
        <input
          type="url"
          name="epicGamesLink"
          placeholder={language === "fr" ? "Lien vers le site Epic Games" : "Link to the Epic Games site."}
          className="neuphormismUndergroung inputLink"
          value={epicGamesLink}
          onChange={(e) => setEpicGamesLink(e.target.value)}
        />

        {/**************** Catégories [encadré] ***************************** */}
        <GenreOfGame
          selectedGenres={genreOfGame}
          setSelectedGenres={setGenreOfGame}
        />
      </section>

      {/**************** Ajout de la biographie du créateur [encadré] ***************************** */}
      <div className="flex justify-center">
        <div
          className="grasFondBleuborder border-black p-2 inline-block mt-3 mb-3 rounded-md font-bold text-white cursor-pointer"
          onClick={() => setIsIntroOfYourself(!isIntroOfYourself)}
        >
          {language == "fr" ? "Souhaitez-vous ajouter la présentation de vous-même ou de votre équipe ?" : "Would you like to add a presentation of yourself or your team?"}
        </div>
      </div>

      {/******************* Paiement ********************************** */}
     

      <div className="flex justify-center">
        <button
          className="bg-green-500 p-3 w-60 border-2 border-red-800 rounded-2xl m-2 disabled:bg-opacity-50 disabled:cursor-not-allowed disabled:border-none"
          disabled={
            nameOfGame.length < 1 ||
            introductionOfTheGame.length < 1 ||
            platform < 1 ||
            shortIntroduction < 1 ||
            urlMongoDB.posterGlimpseFile === ""
          } /* Désactivé si les champs sont vides */
        >
          {language == "fr" ? "Envoyer la présentation" : "Submit the presentation"}
        </button>
      </div>
    </form>
  );
};

export default GamePresentationSections;
