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
import formularyCss from "@/app/styles/formulary.module.css";
import componentsCss from "@/app/styles/components.module.css";

const GamePresentationSections = ({
  nameOfGame,
  setNameOfGame,
  shortIntroduction,
  setShortIntroduction,
  introductionOfTheGame,
  setIntroductionOfTheGame,
  platform,
  setPlatform,
  releaseDate,
  setReleaseDate,
  selectedAgePegi,
  setSelectedAgePegi,
  selectedAdditionalPegi,
  setSelectedAdditionalPegi,
  SoloMulti,
  setSoloMulti,
  setBackgroundPreview,
  videoLink,
  setVideoLink,
  webSiteOfThisGame,
  setWebSiteOfThisGame,
  webSiteOfThisCreator,
  setWebSiteOfThisCreator,
  steamLink,
  setSteamLink,
  epicGamesLink,
  setEpicGamesLink,
  genreOfGame,
  setGenreOfGame,
  isDarkMode,
  isIntroOfYourself,
  setIsIntroOfYourself,
  filesToSend,
  setFilesToSend,
  setWeAreSendingData,
  onDraftCreated, // Nouvelle prop pour communiquer avec le parent
}) => {
  const { language } = useLanguage();
  const router = useRouter();

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
      /***** Check if the name already exists *********************************************************** */
      const gameToCheck = encodeURIComponent(nameOfGame); // Assurez-vous que le nom du jeu est correctement encodé
      console.log(`gameToCheck : `, gameToCheck);
      const response = await fetch("/api/checkIfGameExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameToCheck }),
        cache: "no-store", // Be sure to exploit the newest data
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la vérification du jeu");
      }

      const data = await response.json();
      if (data.exists) {
        setWeAreSendingData(false);
        return toast.error(
          "Ce nom de jeu existe déjà dans la base de données. GamePresentationSections"
        );
      }
      /************************************************************************** */

      if (!filesToSend || filesToSend.length === 0) {
        return toast.error("Vous devez sélectionner au moins un fichier image");
      }

      if (!selectedAgePegi) {
        return toast.error(
          "Vous devez sélectionner un âge parmi les options disponibles."
        );
      }

      //Vérifiez le nombre de caractères de l'introduction détaillée.
      if (shortIntroduction.length > 1000) {
        return toast.error(
          "L'introduction doit comporter 1000 caractères maximum."
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
          setWeAreSendingData(false);
          return toast.error(
            "La date de sortie doit être au format jj/mm/aaaa (ex: 17/05/2025)"
          );
        }
      } else {
        setWeAreSendingData(false);
        return toast.error("Vous devez sélectionner une date de sortie.");
      }

      // Vérifiez si le site Steam commence par "https://"
      if (
        steamLink &&
        (!steamLink.startsWith("https://") || !steamLink.includes("steam"))
      ) {
        setWeAreSendingData(false);
        return toast.error(
          "Le lien vers Steam doit commencer par 'https://' et inclure steam"
        );
      }

      // Si toutes les validations sont passées, on peut procéder au paiement
      // Les images seront uploadées seulement après paiement réussi
      console.log(
        "Toutes les validations sont passées, on peut procéder au paiement"
      );

      // Créer un objet temporaire avec toutes les données validées (sans les fichiers)
      const validatedData = {
        nameOfGame,
        shortIntroduction,
        introductionOfTheGame,
        platform,
        releaseDate,
        SoloMulti,
        selectedAgePegi,
        selectedAdditionalPegi,
        genreOfGame,
        videoLink,
        steamLink,
        epicGamesLink,
        webSiteOfThisGame,
        webSiteOfThisCreator,
        isDarkMode,
        isIntroOfYourself,
      };

      // Stocker temporairement les données validées (sans les fichiers)
      sessionStorage.setItem(
        "validatedGameData",
        JSON.stringify(validatedData)
      );

      // Notifier le parent que les données sont validées et prêtes pour le paiement
      // Passer les fichiers séparément car ils ne peuvent pas être sérialisés
      onDraftCreated(null, validatedData, filesToSend);
    } catch (error) {
      console.log(error);
      setWeAreSendingData(false);
      return toast.error(error.message);
    }
  };

  // Cette vérification n'est plus nécessaire car les images seront uploadées après paiement

  // Cette fonction n'est plus nécessaire car les données sont maintenant traitées après paiement

  return (
    <form
      onSubmit={handleSendSubmit}
      className={`${formularyCss.neuphormismFormularyIntroductionGame} w-full mb-4 rounded-lg`}
    >
      <div className="laptop:flex items-center mb-3 w-[100%]">
        {/* Input Nom du Jeu*/}
        <input
          type="text"
          name="nameOfGame"
          placeholder="Nom du jeu entièrement en minuscule"
          className={`px-3 py-2 rounded-md w-[92%] tablet:w-[100%] mx-4 mt-4 text-white ${formularyCss.neuphormismUndergroung}`}
          maxLength={80}
          size={80}
          value={nameOfGame}
          onChange={(e) => setNameOfGame(e.target.value.toLowerCase())}
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
          name={`${formularyCss.shortIntroduction}`}
          placeholder="Cette introduction courte sera affichée en gras"
          value={shortIntroduction}
          onChange={(e) => setShortIntroduction(e.target.value)}
          className={`${formularyCss.shortIntroduction} ${formularyCss.neuphormismUndergroung}`}
        />
      </div>

      {/**************** Text Editor ********************************************** */}
      <TinyMceEditor setIntroductionOfTheGame={setIntroductionOfTheGame} />

      {/**************** Platform ***************************** */}
      <Platform platform={platform} setPlatform={setPlatform} />

      {/**************** Date ***************************** */}
      <div className="my-2 flex justify-center border rounded-3xl py-2 w-[300px] tablet:w-[380px] mx-auto bg-black/70">
        <p
          className="text-white font-bold mr-2"
          style={{ textShadow: "2px 2px 7px rgba(0, 0, 0, 1)" }}
        >
          {language === "fr" ? "Date de sortie : " : "Release date : "}
        </p>
        <DatePicker
          className="pl-2 text-black w-[130px]"
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

      <div className={`${componentsCss.encadreViolet}`}>
        <p className={`${componentsCss.choisissezLimage}`}>
          {language === "fr"
            ? "Choisissez l'affiche du jeu"
            : "Choose the game's poster"}{" "}
        </p>

        <ImageCloudinary
          name="posterGlimpseFile"
          setFilesToSend={setFilesToSend}
        />
      </div>

      <section className="flex flex-col tablet:flex-row w-[100%] justify-center">
        {/**************** Image d'illustration n°1 [encadré] ***************************** */}

        <div className={`${componentsCss.encadreViolet}`}>
          <p className={`${componentsCss.choisissezLimage}`}>
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
        <div className={`${componentsCss.encadreViolet}`}>
          <p className={`${componentsCss.choisissezLimage}`}>
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
        <div className={`${componentsCss.encadreViolet}`}>
          <p className={`${componentsCss.choisissezLimage}`}>
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
      <div className={`w-[90%] p-2 mx-auto mt-4 ${componentsCss.grasFondBleu}`}>
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
          placeholder={
            language === "fr"
              ? "Lien YouTube de la vidéo"
              : "YouTube link of the video."
          }
          className={`${formularyCss.neuphormismUndergroung} ${formularyCss.inputLink}`}
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />

        {/**************** Lien Site officiel du jeu [encadré] ***************************** */}
        <input
          type="url"
          name="webSiteOfThisGame"
          placeholder={
            language === "fr"
              ? "Lien vers le site officiel du jeu"
              : "Link to the official game website."
          }
          className={`${formularyCss.neuphormismUndergroung} ${formularyCss.inputLink} mx-2 tablet:mx-4`}
          value={webSiteOfThisGame}
          onChange={(e) => setWebSiteOfThisGame(e.target.value)}
        />

        {/**************** Lien Site officiel des créateurs [encadré] ***************************** */}
        <input
          type="url"
          name="webSiteOfThisCreator"
          placeholder={
            language === "fr"
              ? "Lien vers le site officiel du/des créateur(s)"
              : "Link to the official website of the creator(s)."
          }
          className={`${formularyCss.neuphormismUndergroung} ${formularyCss.inputLink}`}
          value={webSiteOfThisCreator}
          onChange={(e) => setWebSiteOfThisCreator(e.target.value)}
        />

        {/**************** Lien Steam [encadré] ***************************** */}
        <input
          type="url"
          name="steamLink"
          placeholder={
            language === "fr"
              ? "Lien vers le site Steam"
              : "Link to the Steam page."
          }
          className={`${formularyCss.neuphormismUndergroung} ${formularyCss.inputLink}`}
          value={steamLink}
          onChange={(e) => setSteamLink(e.target.value)}
        />

        {/**************** Lien Epic Games [encadré] ***************************** */}
        <input
          type="url"
          name="epicGamesLink"
          placeholder={
            language === "fr"
              ? "Lien vers le site Epic Games"
              : "Link to the Epic Games site."
          }
          className={`${formularyCss.neuphormismUndergroung} ${formularyCss.inputLink}`}
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
      <div className="flex flex-col justify-center items-center mx-auto">
        <div
          className={`${componentsCss.grasFondBleu} border p-2 flex justify-center mt-3 mb-3 font-bold text-white rounded-3xl py-2 w-[320px] tablet:w-[620px]`}
        >
          {language == "fr"
            ? "Souhaitez-vous ajouter la présentation de vous-même ou de votre équipe ?"
            : "Would you like to add a presentation of yourself or your team ?"}
        </div>
        <div className="flex justify-center mt-2 w-full">
          <label className="flex items-center mr-4">
            <input
              type="radio"
              name="biographyChoice"
              checked={isIntroOfYourself === "true"}
              onChange={() => setIsIntroOfYourself("true")}
              className="mr-2"
            />
            Oui
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="biographyChoice"
              checked={isIntroOfYourself === "false"}
              onChange={() => setIsIntroOfYourself("false")}
              className="mr-2"
            />
            Non
          </label>
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
          {language == "fr"
            ? "Envoyer la présentation"
            : "Submit the presentation"}
        </button>
      </div>
    </form>
  );
};

export default GamePresentationSections;
