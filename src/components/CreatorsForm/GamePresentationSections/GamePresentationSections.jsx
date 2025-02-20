// components/GamePresentationSections/GamePresentationSections.js

import React from "react";
import EditorPerso from "@/components/CreatorsForm/GamePresentationInside/EditorPerso/EditorPerso";
import Platform from "../GamePresentationInside/Platform/Platform";
import Pegi from "@/components/CreatorsForm/GamePresentationInside/Pegi/Pegi";
import ButtonSoloMulti from "@/components/CreatorsForm/GamePresentationInside/ButtonSoloMulti/ButtonSoloMulti";
import GenreOfGame from "../GamePresentationInside/GenreOfGame/GenreOfGame";
import DatePicker from "react-datepicker";
import Image from "next/image";
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";
import ImageCloudinary from "@/components/ImageCloudinary/ImageCloudinary";
import { toast } from "react-toastify";
import { createIntroduction } from "@/actions/create-introduction";
import he from "he";
import { useRouter } from "next/navigation";

const GamePresentationSections = ({
  nameOfGame, setNameOfGame,
  shortIntroduction, setShortIntroduction,
  introductionOfTheGame, setIntroductionOfTheGame,
  platform, setPlatform,
  releaseDate, setReleaseDate,
  selectedAgePegi, setSelectedAgePegi,
  selectedAdditionalPegi, setSelectedAdditionalPegi,
  SoloMulti, setSoloMulti,
  urlPosterCloudinary, setUrlPosterCloudinary,
  urlImageOne, setUrlImageOne,
  urlImageTwo, setUrlImageTwo,
  urlImageThree, setUrlImageThree,
  urlBackgroundCloudinary, setUrlBackgroundCloudinary,
  videoLink, setVideoLink,
  webSiteOfThisGame, setWebSiteOfThisGame,
  webSiteOfThisCreator, setWebSiteOfThisCreator,
  steamLink, setSteamLink,
  epicGamesLink, setEpicGamesLink,
  genreOfGame, setGenreOfGame,
  isDarkMode,
  isIntroOfYourself,
}) => {
  if(urlPosterCloudinary){console.log(`urlPosterCloudinary dans le composant GamePresentationSections : `, urlPosterCloudinary);}
  if(urlImageOne){console.log(`urlImageOne dans le composant GamePresentationSections : `, urlImageOne);}
  const { language, changeLanguage } = useLanguage();
  const router = useRouter();
  
  /*********** Upload Image To Cloudinary ****************************************/
  const uploadImageToCloudinary = async (uploadFormData) => {
    try {
      const response = await fetch('/api/cloudinary/upload', {
        method: 'POST',
        body: uploadFormData,
        headers: {
          // Le navigateur définit automatiquement Content-Type pour FormData
          // 'Content-Type': 'multipart/form-data', // Pas nécessaire
          'Accept': 'application/json', // Indique que vous attendez une réponse JSON
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Image uploaded successfully:', data);
        return data.secure_url
      } else {
        console.error('Error uploading image in uploadImageToCloudinary function', response.statusText);
        return "";
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }
   
    /*********************************************************************************/
  /****************** Send data to API createIntroduction **************************/
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!selectedAgePegi) {
        return toast.error(
          "Vous devez sélectionner un âge parmi les options disponibles."
        );
      }

      //Vérifiez le nombre de caractères de la présentation détaillée
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
        webSiteOfThisCreator && !webSiteOfThisCreator.startsWith("https://")
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
   
          const formData = new FormData(event.target);
          console.dir(formData)
          for (let [name, value] of formData.entries()) {
            console.log(name, value);
          }
          const imagePoster = formData.get('urlPosterCloudinary');
          const imageOne = formData.get('urlImageOne');
          console.log(imagePoster, imageOne);

      // Les images à envoyer
      /*const formData = new FormData(event.target)
      console.log(`formData : `, formData);
      const imagePoster = formData.get(urlPosterCloudinary);
      const imageOne = formData.get(urlImageOne);*/
      const imageTwo = formData.get(urlImageTwo);
      const imageThree = formData.get(urlImageThree);
      const imageurlImageBackground = formData.get(urlBackgroundCloudinary);
      let imagePosterUrl = "";
      let imageOneUrl = "";
      let imageTwoUrl = "";
      let imageThreeUrl = "";
      let backgroundUrl = "";
      console.log(`D'abord, imagePoster : `, imagePoster, ` et ensuite, urlPosterCloudinary : `, urlPosterCloudinary);
      console.log(`D'abord, imageOne : `, imageOne, ` et ensuite, urlPosterCloudinary : `, urlImageOne);
  // Vérifiez si les fichiers sont bien récupérés

      if (!imagePoster) {
        console.error('Aucun fichier pour imagePoster');
      }
      if (!imageOne) {
        console.error('Aucun fichier pour imageOne');
      }

      if(imagePoster){
        const uploadFormData = new FormData();
        uploadFormData.append("file", imagePoster);
        console.log(`uploadFormData : `, uploadFormData);
        imagePosterUrl = await uploadImageToCloudinary(uploadFormData);
      }
      if(imageOne){
        const uploadFormData = new FormData();
        uploadFormData.append("file", imageOne);
        imageOneUrl = await uploadImageToCloudinary(uploadFormData);
      }
      if(imageTwo){
        const uploadFormData = new FormData();
        uploadFormData.append("file", imageTwo);
        imageTwoUrl = await uploadImageToCloudinary(uploadFormData);
      }
      if(imageThree){
        const uploadFormData = new FormData();
        uploadFormData.append("file", imageThree);
        imageThreeUrl = await uploadImageToCloudinary(uploadFormData);
      }
      if(imageurlImageBackground){
        const uploadFormData = new FormData();
        uploadFormData.append("file", imageurlImageBackground);
        backgroundUrl = await uploadImageToCloudinary(uploadFormData);
      }

      // Function to send the data to createIntroduction function
      
      const introductionFormaData = new FormData()
      introductionFormaData.append("nameOfGame", encodeURIComponent(nameOfGame));
      introductionFormaData.append("shortIntroduction", he.encode(shortIntroduction));
      introductionFormaData.append("introductionOfTheGame", he.encode(introductionOfTheGame));
      introductionFormaData.append("platform", JSON.stringify(platform));
      introductionFormaData.append("releaseDate", releaseDate);
      introductionFormaData.append("urlPosterCloudinary", imagePosterUrl);
      introductionFormaData.append("urlImageOneCloudinary", imageOneUrl);
      introductionFormaData.append("urlImageTwoCloudinary", imageTwoUrl);
      introductionFormaData.append("urlImageThreeCloudinary", imageThreeUrl);
      introductionFormaData.append("urlBackgroundCloudinary", backgroundUrl);
      introductionFormaData.append("SoloMulti", JSON.stringify(SoloMulti));
      introductionFormaData.append("selectedAgePegi", selectedAgePegi);
      introductionFormaData.append("selectedAdditionalPegi", selectedAdditionalPegi);
      introductionFormaData.append("genreOfGame", JSON.stringify(genreOfGame));
      introductionFormaData.append("videoLink", videoLink);
      introductionFormaData.append("steamLink", steamLink);
      introductionFormaData.append("epicGamesLink", epicGamesLink);
      introductionFormaData.append("webSiteOfThisGame", webSiteOfThisGame);
      introductionFormaData.append("webSiteOfThisCreator", webSiteOfThisCreator);
      introductionFormaData.append("isDarkMode", isDarkMode.toString());
      introductionFormaData.append("isIntroOfYourself", isIntroOfYourself.toString());

      await createIntroduction(introductionFormaData);
      toast.success("Présentation du jeu envoyée avec succès !");     
      // Redirect
      router.replace("/");
    } catch (error) {
      console.log(error);
      return toast.error(error.message);
    }
  };

  return (
    
    <form
      onSubmit={handleFormSubmit}
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

      {/**************** Editeur de texte ********************************************** */}
      <EditorPerso
        introductionOfTheGame={introductionOfTheGame}
        setIntroductionOfTheGame={setIntroductionOfTheGame}
        onTextChange={(newText) => {
          setIntroductionOfTheGame(newText);
        }}
      />

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
        
        <ImageCloudinary name="urlPosterCloudinary" imageSrc={urlPosterCloudinary}  setImageSrc={setUrlPosterCloudinary} />
      </div>

      <section className="flex flex-col tablet:flex-row w-[100%] justify-center  ">
        {/**************** Image d'illustration n°1 [encadré] ***************************** */}

        <div className="encadreViolet">
          <p className="choisissezLimage">
            {language === "fr"
              ? "Choisissez l'image d'illustration n°1"
              : "Choose illustration image #1."}{" "}
          </p>
          <ImageCloudinary name="urlImageOne" imageSrc={urlImageOne} setImageSrc={setUrlImageOne} />
        </div>

        {/**************** Image d'illustration n°2 [encadré] ***************************** */}
        <div className="encadreViolet">
          <p className="choisissezLimage">
            {language === "fr"
              ? "Choisissez l'image d'illustration n°2"
              : "Choose illustration image #2."}{" "}
          </p>
          <ImageCloudinary name="urlImageTwo" imageSrc={urlImageTwo} setImageSrc={setUrlImageTwo} />
        </div>

        {/**************** Image d'illustration n°3 [encadré] ***************************** */}
        <div className="encadreViolet">
          <p className="choisissezLimage">
            {language === "fr"
              ? "Choisissez l'image d'illustration n°3"
              : "Choose illustration image #3."}{" "}
          </p>
          <ImageCloudinary name="urlImageThree" imageSrc={urlImageThree} setImageSrc={setUrlImageThree}  />
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
          <ImageCloudinary name="urlBackgroundCloudinary" imageSrc={urlBackgroundCloudinary}  setImageSrc={setUrlBackgroundCloudinary} />
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
          className="neuphormismUndergroung inputLink"
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
          className="neuphormismUndergroung inputLink mx-2 tablet:mx-4"
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
          className="neuphormismUndergroung inputLink"
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
          className="neuphormismUndergroung inputLink"
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
          {language == "fr"
            ? "Souhaitez-vous ajouter la présentation de vous-même ou de votre équipe ?"
            : "Would you like to add a presentation of yourself or your team?"}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          className="bg-green-500 p-3 w-60 border-2 border-red-800 rounded-2xl m-2 disabled:bg-opacity-50 disabled:cursor-not-allowed disabled:border-none"
          disabled={
            nameOfGame.length < 1 ||
            introductionOfTheGame.length < 1 ||
            platform < 1 ||
            shortIntroduction < 1 ||
            urlPosterCloudinary === ""
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
