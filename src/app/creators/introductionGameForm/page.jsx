"use client";

import { createIntroduction } from "@/actions/create-introduction";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import he from "he";
import "../../styles/formulary.css";
import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import Glimpse from "@/components/Glimpse/Glimpse"; // Aperçu
import UserProfileSection from "@/components/UserProfileSection/UserProfileSection";
import ObligatoryButtons from "@/components/ObligatoryButtons/ObligatoryButtons";
import OptionalButtons from "@/components/OptionalButtons/OptionalButtons";
import GamePresentationSections from "@/components/GamePresentationSections/GamePresentationSections";

// FORMULARY used by a the creator to introduce one game

export default function introductionGameForm() {
  // Variable
  const { data: session } = useSession();
  const router = useRouter();

  // State
  const [user, setUser] = useState({});
  const [isIntroOfYourself, setIsIntroOfYourself] = useState(false);
  const [nameOfGame, setNameOfGame] = useState("");
  const [shortIntroduction, setShortIntroduction] = useState("");
  const [introductionOfTheGame, setIntroductionOfTheGame] = useState("");
  const [urlPosterCloudinary, setUrlPosterCloudinary] = useState(""); 
  const [urlBackgroundCloudinary, setUrlBackgroundCloudinary] = useState("");
  const [urlImageOne, setUrlImageOne] = useState("");
  const [urlImageTwo, setUrlImageTwo] = useState("");
  const [urlImageThree, setUrlImageThree] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const [selectedAgePegi, setSelectedAgePegi] = useState("");
  const [selectedAdditionalPegi, setSelectedAdditionalPegi] = useState([]);
  const [releaseDate, setReleaseDate] = useState(null);
  const [platform, setPlatform] = useState([]);
  const [webSiteOfThisGame, setWebSiteOfThisGame] = useState("");
  const [webSiteOfThisCreator, setWebSiteOfThisCreator] = useState("");
  const [genreOfGame, setGenreOfGame] = useState([]);
  const [steamLink, setSteamLink] = useState("");
  const [epicGamesLink, setEpicGamesLink] = useState("");
  const [SoloMulti, setSoloMulti] = useState([]);
  
  const [isShortIntroVisible, setIsShortIntroVisible] = useState(false);
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [isPlatformVisible, setPlatformVisible] = useState(false);
  const [isReleaseDateVisible, setIsReleaseDateVisible] = useState(false);
  const [isPegiAgeVisible, setIsPegiAgeVisible] = useState(false);
  const [isPosterVisible, setIsPosterVisible] = useState(false);
  const [isBackgroundVisible, setIsBackgroundVisible] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [isWebsiteGameVisible, setIsWebsiteGameVisible] = useState(false);
  const [isWebsiteCreatorVisible, setIsWebsiteCreatorVisible] = useState(false);
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [isSteamLinkVisible, setIsSteamLinkVisible] = useState(false);
  const [isEpicGamesLinkVisible, setIsEpicGamesLinkVisible] = useState(false);
  const [isSoloMulti, setIsSoloMulti] = useState(false);
  const [isImageOne, setIsImageOne]  = useState("");
  const [isImageTwo, setIsImageTwo]  = useState("");
  const [isImageThree, setIsImageThree]  = useState("");

  const resetUrlPosterCloudinary = () => {
    setUrlPosterCloudinary(""); // Réinitialiser la valeur de urlPosterCloudinary
  };

  const resetUrlBackgroundCloudinary = () => {
    setUrlBackgroundCloudinary(""); // Réinitialiser la valeur de urlBackgroundCloudinary
  };

  /************* Récupérer les données concernant l'utilisateur ***************************/
  useEffect(() => { // to use the function fetchUserData only when the session is defined
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
      if (!urlPosterCloudinary) {return toast.error("Vous devez sélectionner un fichier image");}

      if (!urlPosterCloudinary.match(/\.(jpg|jpeg|png)$/i)) {
        return toast.error("Le lien de l'image doit être au format jpg, jpeg ou png");
      }

      if (!selectedAgePegi) {
        return toast.error("Vous devez sélectionner un âge parmi les options disponibles.");
      }

      // Vérifiez le nombre de caractères de la courte introduction
      if (shortIntroduction.length > 400 ){
        return toast.error("L'introduction doit comporter 400 caractères maximum.");
      }

      //Vérifiez le nombre de caractères de la présentation détaillée
      if (introductionOfTheGame.length > 10000){
        return toast.error("La présentation doit comporter 10 000 caractères maximum.");
      }
      // Vérifiez si au moins une plateforme est sélectionnée
      if (platform.length === 0) {
        return toast.error("Vous devez sélectionner au moins une plateforme.");
      }

      // Vérifiez si le site du jeu commence par "https://"
      if (webSiteOfThisGame && !webSiteOfThisGame.startsWith("https://")) {
        return toast.error("Le lien du site officiel doit commencer par 'https://'");
      }

      // Vérifiez si le site des créateurs commence par "https://"
      if (webSiteOfThisCreator && !webSiteOfThisCreator.startsWith("https://")) {
        return toast.error("Le lien du site officiel doit commencer par 'https://'");
      }

      // Vérification de la date de sortie
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
      if (steamLink && (!steamLink.startsWith("https://") || !steamLink.includes("steam"))) {
        return toast.error("Le lien vers Steam doit commencer par 'https://' et inclure steam");
      }

      // Function to send the data to createIntroduction function
      const formData = new FormData();
      formData.append("nameOfGame", encodeURIComponent(nameOfGame));
      formData.append("shortIntroduction", shortIntroduction);
      formData.append("introductionOfTheGame",he.encode(introductionOfTheGame));
      formData.append("platform", JSON.stringify(platform));
      formData.append("releaseDate", releaseDate);
      formData.append("urlPosterCloudinary", urlPosterCloudinary);
      formData.append("SoloMulti", JSON.stringify(SoloMulti));
      formData.append("selectedAgePegi", selectedAgePegi);
      formData.append("selectedAdditionalPegi", selectedAdditionalPegi);
      formData.append("genreOfGame", JSON.stringify(genreOfGame));
      formData.append("videoLink", videoLink);
      formData.append("steamLink", steamLink);
      formData.append("epicGamesLink", epicGamesLink);
      formData.append("webSiteOfThisGame", webSiteOfThisGame);
      formData.append("webSiteOfThisCreator", webSiteOfThisCreator);
      formData.append("isDarkMode", isDarkMode.toString());
      formData.append("isIntroOfYourself", isIntroOfYourself.toString());
      // Ajout conditionnel pour les images d'illustration
      if (urlImageOne) { formData.append("urlImageOneCloudinary", urlImageOne); }
      if (urlImageTwo) { formData.append("urlImageTwoCloudinary", urlImageTwo); }
      if (urlImageThree) { formData.append("urlImageThreeCloudinary", urlImageThree); }

      // Ajout conditionnel pour urlImageBackground
      if (urlBackgroundCloudinary) {
        formData.append("urlBackgroundCloudinary", urlBackgroundCloudinary);
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
      <section>
        <form
          onSubmit={onPrepare}
          className="w-[95vw] tablet:w-[84vw] laptop:w-[54vw] mx-auto border p-2"
          style={{ backgroundColor: "rgba(148, 163, 184, 0.7)" }}
        >
          <p>
            {session?.user.username}, sur cette page, vous êtes invité à remplir de présentation de votre jeux.
          </p>

          <div className="laptop:flex items-center mb-3">{/* Input Nom du Jeu*/}
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

          {/************ Boutons Obligatoires **********************************************************/}
          <ObligatoryButtons
            nameOfGame={nameOfGame}
            shortIntroduction={shortIntroduction}
            introductionOfTheGame={introductionOfTheGame}
            platform={platform}
            releaseDate={releaseDate}
            selectedAgePegi={selectedAgePegi}
            urlPosterCloudinary={urlPosterCloudinary}
            SoloMulti={SoloMulti}
            isShortIntroVisible={isShortIntroVisible} setIsShortIntroVisible={setIsShortIntroVisible}
            isEditorVisible={isEditorVisible} setIsEditorVisible={setIsEditorVisible}
            isPlatformVisible={isPlatformVisible} setPlatformVisible={setPlatformVisible}
            isReleaseDateVisible={isReleaseDateVisible} setIsReleaseDateVisible={setIsReleaseDateVisible}
            isPegiAgeVisible={isPegiAgeVisible} setIsPegiAgeVisible={setIsPegiAgeVisible}
            isPosterVisible={isPosterVisible} setIsPosterVisible={setIsPosterVisible}
            isSoloMulti={isSoloMulti} setIsSoloMulti={setIsSoloMulti}
          />

          {/************ Boutons Facultatifs **********************************************************/}
          <OptionalButtons
            nameOfGame={nameOfGame}
            urlBackgroundCloudinary={urlBackgroundCloudinary}
            genreOfGame={genreOfGame}
            videoLink={videoLink}
            webSiteOfThisGame={webSiteOfThisGame}
            webSiteOfThisCreator={webSiteOfThisCreator}
            steamLink={steamLink}
            epicGamesLink={epicGamesLink}
            isImageOne={isImageOne} setIsImageOne={setIsImageOne} urlImageOne={urlImageOne} setUrlImageOne={setUrlImageOne}
            isImageTwo={isImageTwo} setIsImageTwo={setIsImageTwo} urlImageTwo={urlImageTwo} setUrlImageTwo={setUrlImageTwo}
            isImageThree={isImageThree} setIsImageThree={setIsImageThree} urlImageThree={urlImageThree} setUrlImageThree={setUrlImageThree}
            isBackgroundVisible={isBackgroundVisible} setIsBackgroundVisible={setIsBackgroundVisible}
            isCategoryVisible={isCategoryVisible} setIsCategoryVisible={setIsCategoryVisible}
            isVideoVisible={isVideoVisible} setIsVideoVisible={setIsVideoVisible}
            isWebsiteGameVisible={isWebsiteGameVisible} setIsWebsiteGameVisible={setIsWebsiteGameVisible}
            isWebsiteCreatorVisible={isWebsiteCreatorVisible} setIsWebsiteCreatorVisible={setIsWebsiteCreatorVisible}
            isSteamLinkVisible={isSteamLinkVisible} setIsSteamLinkVisible={setIsSteamLinkVisible}
            isEpicGamesLinkVisible={isEpicGamesLinkVisible} setIsEpicGamesLinkVisible={setIsEpicGamesLinkVisible}
          />

          {/*************************** LES ENCADRÉS ******************************************************/}
          <GamePresentationSections
            nameOfGame={nameOfGame}
            isShortIntroVisible={isShortIntroVisible} setIsShortIntroVisible={setIsShortIntroVisible}
            shortIntroduction={shortIntroduction} setShortIntroduction={setShortIntroduction}
            isEditorVisible={isEditorVisible} 
            introductionOfTheGame={introductionOfTheGame} setIntroductionOfTheGame={setIntroductionOfTheGame}
            isPlatformVisible={isPlatformVisible} platform={platform} setPlatform={setPlatform}
            isReleaseDateVisible={isReleaseDateVisible}
            releaseDate={releaseDate} setReleaseDate={setReleaseDate}
            isPegiAgeVisible={isPegiAgeVisible} selectedAgePegi={selectedAgePegi} setSelectedAgePegi={setSelectedAgePegi}
            selectedAdditionalPegi={selectedAdditionalPegi} setSelectedAdditionalPegi={setSelectedAdditionalPegi}
            isSoloMulti={isSoloMulti} SoloMulti={SoloMulti} setSoloMulti={setSoloMulti}
            isPosterVisible={isPosterVisible} urlPosterCloudinary={urlPosterCloudinary} setUrlPosterCloudinary={setUrlPosterCloudinary}
            isImageOne={isImageOne} urlImageOne={urlImageOne} setUrlImageOne={setUrlImageOne}
            isImageTwo={isImageTwo} urlImageTwo={urlImageTwo} setUrlImageTwo={setUrlImageTwo}
            isImageThree={isImageThree} urlImageThree={urlImageThree} setUrlImageThree={setUrlImageThree}
            isBackgroundVisible={isBackgroundVisible} urlBackgroundCloudinary={urlBackgroundCloudinary} setUrlBackgroundCloudinary={setUrlBackgroundCloudinary}
            isVideoVisible={isVideoVisible} videoLink={videoLink} setVideoLink={setVideoLink}
            isWebsiteGameVisible={isWebsiteGameVisible} webSiteOfThisGame={webSiteOfThisGame} setWebSiteOfThisGame={setWebSiteOfThisGame}
            isWebsiteCreatorVisible={isWebsiteCreatorVisible} webSiteOfThisCreator={webSiteOfThisCreator} setWebSiteOfThisCreator={setWebSiteOfThisCreator}
            isSteamLinkVisible={isSteamLinkVisible} steamLink={steamLink} setSteamLink={setSteamLink}
            isEpicGamesLinkVisible={isEpicGamesLinkVisible} epicGamesLink={epicGamesLink} setEpicGamesLink={setEpicGamesLink}
            isCategoryVisible={isCategoryVisible} genreOfGame={genreOfGame} setGenreOfGame={setGenreOfGame}
          />

          {/**************** Ajout de la biographie du créateur [encadré] ***************************** */}
          <div className="flex justify-center">
            <div
              className="grasFondBleuborder border-black p-2 inline-block mt-3 mb-3 rounded-md font-bold text-white cursor-pointer"
              onClick={() => setIsIntroOfYourself(!isIntroOfYourself)}
            >
              Souhaitez-vous ajouter la présentation de vous-même ou de votre équipe ?
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
              Envoyer la présentation
            </button>
          </div>
        </form>
      </section>

      <section style={{
        backgroundImage: urlBackgroundCloudinary ? `url(${urlBackgroundCloudinary})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        }}>

        <Glimpse
            nameOfGame={nameOfGame}
            shortIntroduction={shortIntroduction}
            introductionOfTheGame={introductionOfTheGame}
            platform={platform}
            releaseDate={releaseDate}
            selectedAgePegi={selectedAgePegi}
            selectedAdditionalPegi={selectedAdditionalPegi}
            urlPosterCloudinary={urlPosterCloudinary}
            SoloMulti={SoloMulti}
            genreOfGame={genreOfGame}
            videoLink={videoLink}
            webSiteOfThisGame={webSiteOfThisGame}
            webSiteOfThisCreator={webSiteOfThisCreator}
            isDarkMode={isDarkMode}
            steamLink={steamLink}
            epicGamesLink={epicGamesLink}
            urlImageOne={urlImageOne}
            urlImageTwo={urlImageTwo}
            urlImageThree={urlImageThree}
          />

          {isIntroOfYourself && <UserProfileSection user={user} />}
      </section>
    </GeneralLayout>
  );
}