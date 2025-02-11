"use client";
// Formulary  introduction Games
import { createIntroduction } from "@/actions/create-introduction";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import he from "he";
import "../../styles/formulary.css";
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";
import Glimpse from "@/components/CreatorsForm/GamePresentationInside/Glimpse/Glimpse"; // Aperçu
import UserProfileSection from "@/components/UserProfileSection/UserProfileSection";
import ObligatoryButtons from "@/components/CreatorsForm/ObligatoryButtons/ObligatoryButtons";
import OptionalButtons from "@/components/CreatorsForm/OptionalButtons/OptionalButtons";
import GamePresentationSections from "@/components/CreatorsForm/GamePresentationSections/GamePresentationSections";
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";
import TextOneByOne from "@/components/TextOneByOne/TextOneByOne";
import { Press_Start_2P } from "next/font/google";

// FORMULARY used by a the creator to introduce one game
const pressStart2P = Press_Start_2P({
  // Police d'écriture
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function introductionGameForm() {
  // Variable
  const { data: session } = useSession();
  const router = useRouter();
  const { language,
       setPublicIdArray,
          setShouldDeleteAllImages,
           setIsUrlContent,
           } = useLanguage();

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
  /************* Get data about user filling out the form ***************************/
  useEffect(() => {
    // to use the function fetchUserData only when the session is defined
    fetchUserData();
  }, [session]);

  // Function to get all data about the connected user
  const fetchUserData = async () => {
    const response = await fetch("/api/getAllUserDataSession", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      //There is no body with method GET
    });

    const data = await response.json();

    if (!data) {
      throw new Error("Invalid JSON response");
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Utilisateur non authentifié");
    }

    setUser(data.user);
  };

  /*********************************************************************************/
  /****************** Send data to API createIntroduction **************************/
  const onPrepare = async (e) => {
    e.preventDefault();
    try {
      if (!urlPosterCloudinary) {
        return toast.error("Vous devez sélectionner un fichier image");
      }

      if (!urlPosterCloudinary.match(/\.(jpg|jpeg|png)$/i)) {
        return toast.error(
          "Le lien de l'image doit être au format jpg, jpeg ou png"
        );
      }

      if (!selectedAgePegi) {
        return toast.error(
          "Vous devez sélectionner un âge parmi les options disponibles."
        );
      }

      // Vérifiez le nombre de caractères de la courte introduction
      if (shortIntroduction.length > 400) {
        return toast.error(
          "L'introduction doit comporter 400 caractères maximum."
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

      // Function to send the data to createIntroduction function
      const formData = new FormData();
      formData.append("nameOfGame", encodeURIComponent(nameOfGame));
      formData.append("shortIntroduction", he.encode(shortIntroduction));
      formData.append("introductionOfTheGame", he.encode(introductionOfTheGame));
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
      if (urlImageOne) {formData.append("urlImageOneCloudinary", urlImageOne);}
      if (urlImageTwo) {formData.append("urlImageTwoCloudinary", urlImageTwo);}
      if (urlImageThree) {formData.append("urlImageThreeCloudinary", urlImageThree);}
      // Ajout conditionnel pour urlImageBackground
      if (urlBackgroundCloudinary) {formData.append("urlBackgroundCloudinary", urlBackgroundCloudinary);}

      await createIntroduction(formData);
      toast.success("Présentation du jeu envoyée avec succès !");
      setShouldDeleteAllImages(false);
      console.log("Normalement, ShouldDeleteAllImages est passé à False");
      // Redirect
      router.replace("/");
    } catch (error) {
      return toast.error(error.message);
    }
  };

  /************* Delete all images when user leave this page without submit the formulary - Part 1 ***************/
  /************************************************************************** Part 2 in Language Context ********/
  // Fonction pour extraire l'ID public de l'URL Cloudinary
    const extractPublicIdFromUrl = (url) => {    
      const uploadIndex = url.indexOf('upload') + 7;
      const startIndex = url.indexOf('/', uploadIndex) + 1;
      const endIndex = url.lastIndexOf('.');
      return url.slice(startIndex, endIndex !== -1 ? endIndex : undefined);
    };
  
  // useEffect pour mettre à jour le tableau publicIdArray lorsque les URLs changent
    useEffect(() => {
      const newPublicIdArray = [
        extractPublicIdFromUrl(urlPosterCloudinary),
        extractPublicIdFromUrl(urlImageOne),
        extractPublicIdFromUrl(urlImageTwo),
        extractPublicIdFromUrl(urlImageThree),
        extractPublicIdFromUrl(urlBackgroundCloudinary),
      ];
      setPublicIdArray(newPublicIdArray);
      console.log("Public ID Array:", newPublicIdArray);
    }, [urlPosterCloudinary, urlImageOne, urlImageTwo, urlImageThree, urlBackgroundCloudinary]);

    /***** Is there content in URL data ? *******/
    useEffect(() => {
      if(urlPosterCloudinary || urlImageOne || urlImageTwo || urlImageThree || urlBackgroundCloudinary){
        setIsUrlContent(true);
      }else{
        setIsUrlContent(false);
      }
    }, [urlPosterCloudinary, urlImageOne, urlImageTwo, urlImageThree, urlBackgroundCloudinary]);

  return (
    <GeneralLayout>
      <section>
        <form
          onSubmit={onPrepare}
          className=" w-[95vw] largeScreen:w-[68vw] mx-auto px-0 tablet:px-8 text-white font-bold border border-purple-600 rounded-3xl"
        >
          <div className="h-[100px] largeScreen:h-[66px] flex justify-center align-middle shadowPurple">
            {session?.user?.username &&
              <div className="m-4 text-xs laptop:text-sm">
                <span className={`capitalize ${pressStart2P.className}`}>{session?.user.username}</span>                 
              <TextOneByOne 
                frenchPhrase={", sur cette page, vous êtes invité à remplir la présentation de votre jeu."} 
                englishPhrase={", on this page, you are invited to fill out the presentation of your game."}
              />         
              </div>
            }
          </div>
          <section className="flex" /* colonne + choix */>
            <div className="mr-4 hidden laptop:block">
              {/************ Boutons Obligatoires **********************************************************/}
              <ObligatoryButtons
                nameOfGame={nameOfGame}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                shortIntroduction={shortIntroduction}
                introductionOfTheGame={introductionOfTheGame}
                platform={platform}
                releaseDate={releaseDate}
                selectedAgePegi={selectedAgePegi}
                urlPosterCloudinary={urlPosterCloudinary}
                SoloMulti={SoloMulti}
              />

              {/************ Boutons Facultatifs **********************************************************/}
              <OptionalButtons
                nameOfGame={nameOfGame}
                setNameOfGame={setNameOfGame}
                urlBackgroundCloudinary={urlBackgroundCloudinary}
                genreOfGame={genreOfGame}
                videoLink={videoLink}
                webSiteOfThisGame={webSiteOfThisGame}
                webSiteOfThisCreator={webSiteOfThisCreator}
                steamLink={steamLink}
                epicGamesLink={epicGamesLink}
                urlImageOne={urlImageOne}
                urlImageTwo={urlImageTwo}
                urlImageThree={urlImageThree}
              />
            </div>

            {/*************************** LES ENCADRÉS ******************************************************/}
            <GamePresentationSections
              nameOfGame={nameOfGame}
              setNameOfGame={setNameOfGame}
              shortIntroduction={shortIntroduction}
              setShortIntroduction={setShortIntroduction}
              introductionOfTheGame={introductionOfTheGame}
              setIntroductionOfTheGame={setIntroductionOfTheGame}
              platform={platform}
              setPlatform={setPlatform}
              releaseDate={releaseDate}
              setReleaseDate={setReleaseDate}
              selectedAgePegi={selectedAgePegi}
              setSelectedAgePegi={setSelectedAgePegi}
              selectedAdditionalPegi={selectedAdditionalPegi}
              setSelectedAdditionalPegi={setSelectedAdditionalPegi}
              SoloMulti={SoloMulti}
              setSoloMulti={setSoloMulti}
              urlPosterCloudinary={urlPosterCloudinary}
              setUrlPosterCloudinary={setUrlPosterCloudinary}
              urlImageOne={urlImageOne}
              setUrlImageOne={setUrlImageOne}
              urlImageTwo={urlImageTwo}
              setUrlImageTwo={setUrlImageTwo}
              urlImageThree={urlImageThree}
              setUrlImageThree={setUrlImageThree}
              urlBackgroundCloudinary={urlBackgroundCloudinary}
              setUrlBackgroundCloudinary={setUrlBackgroundCloudinary}
              videoLink={videoLink}
              setVideoLink={setVideoLink}
              webSiteOfThisGame={webSiteOfThisGame}
              setWebSiteOfThisGame={setWebSiteOfThisGame}
              webSiteOfThisCreator={webSiteOfThisCreator}
              setWebSiteOfThisCreator={setWebSiteOfThisCreator}
              steamLink={steamLink}
              setSteamLink={setSteamLink}
              epicGamesLink={epicGamesLink}
              setEpicGamesLink={setEpicGamesLink}
              genreOfGame={genreOfGame}
              setGenreOfGame={setGenreOfGame}
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
      </section>

      <section
        style={{
          backgroundImage: urlBackgroundCloudinary
            ? `url(${urlBackgroundCloudinary})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
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
