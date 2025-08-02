"use client";
// Formulary introduction Games

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import formularyCss from "@/app/styles/formulary.module.css";
import Glimpse from "@/components/CreatorsForm/GamePresentationInside/Glimpse/Glimpse"; // Aperçu
import UserProfileSection from "@/components/UserProfileSection/UserProfileSection";
import ObligatoryButtons from "@/components/CreatorsForm/ObligatoryButtons/ObligatoryButtons";
import OptionalButtons from "@/components/CreatorsForm/OptionalButtons/OptionalButtons";
import GamePresentationSections from "@/components/CreatorsForm/GamePresentationSections/GamePresentationSections";
import TextOneByOne from "@/components/CreatorsForm/TextOneByOne/TextOneByOne";
import AllCompStripe from "@/components/AllCompStripe/AllCompStripe";
import { Press_Start_2P } from "next/font/google";
import Loading from "@/components/ForLayout/Loading/Loading";
import WeAreSendingData from "@/components/WeAreSendingData/WeAreSendingData";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { processPaymentSuccess } from "@/actions/process-payment-success";

// FORMULARY used by a the creator to introduce one game
const pressStart2P = Press_Start_2P({
  // Police d'écriture
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function AllCompIntroGameForm() {
  // Variable
  const { data: session } = useSession();
  const router = useRouter();

  // State
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState("");
  const [isIntroOfYourself, setIsIntroOfYourself] = useState("false");
  const [nameOfGame, setNameOfGame] = useState("");
  const [shortIntroduction, setShortIntroduction] = useState("");
  const [introductionOfTheGame, setIntroductionOfTheGame] = useState("");
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
  const [backgroundPreview, setBackgroundPreview] = useState("");
  const [filesToSend, setFilesToSend] = useState({});
  const [loading, setLoading] = useState(true);
  const [weAreSendingData, setWeAreSendingData] = useState(false);
  // Nouveaux états pour le paiement
  const [showPayment, setShowPayment] = useState(false);
  const [draftId, setDraftId] = useState(null);
  const [validatedFiles, setValidatedFiles] = useState(null);

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
      cache: "no-store", // Be sure to exploit the newest data
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
    setAvatar(data.user.logoUrl);
    setLoading(false);
  };

  // Fonction pour traiter les données après paiement réussi
  const handlePaymentSuccess = async (validatedData) => {
    try {
      setWeAreSendingData(true);

      // 1. Upload des images vers Cloudinary côté client
      console.log("Début de l'upload des images vers Cloudinary");
      console.log("ValidatedFiles:", validatedFiles);
      console.log(
        "NEXT_UPLOAD_PRESET_UNSIGNED:",
        process.env.NEXT_UPLOAD_PRESET_UNSIGNED
      );
      console.log(
        "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:",
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      );

      const uploadPromises = Object.entries(validatedFiles).map(
        async ([key, file]) => {
          if (file) {
            console.log(`Uploading ${key}:`, file);
            const formData = new FormData();
            formData.append("file", file);
            formData.append(
              "upload_preset",
              process.env.NEXT_UPLOAD_PRESET_UNSIGNED
            );

            try {
              console.log(`Sending ${key} to Cloudinary...`);
              const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
                {
                  method: "POST",
                  body: formData,
                }
              );

              if (!response.ok) {
                const errorData = await response.json();
                console.error(`Cloudinary error for ${key}:`, errorData);
                throw new Error(
                  `Erreur Cloudinary pour ${key}: ${
                    errorData.error || "Erreur inconnue"
                  }`
                );
              }

              const data = await response.json();
              console.log(`Upload successful for ${key}:`, data.secure_url);
              return { key, url: data.secure_url };
            } catch (error) {
              console.error(`Upload error for ${key}:`, error);
              throw error;
            }
          }
        }
      );

      // Attendre que tous les uploads soient terminés
      const uploadResults = await Promise.all(uploadPromises);
      const uploadedUrls = {};
      uploadResults.forEach((result) => {
        if (result) {
          uploadedUrls[result.key] = result.url;
        }
      });

      // 2. Traiter le paiement réussi avec les URLs uploadées
      const dataToProcess = {
        ...validatedData,
        uploadedUrls,
      };

      const result = await processPaymentSuccess(dataToProcess);

      // Nettoyer le sessionStorage et l'état
      sessionStorage.removeItem("validatedGameData");
      setValidatedFiles(null);

      toast.success("Présentation créée avec succès !");
      router.push("/");
    } catch (error) {
      console.error("Erreur lors du traitement après paiement:", error);
      toast.error("Erreur lors de la création de la présentation");
    } finally {
      setWeAreSendingData(false);
    }
  };

  // Si le paiement est affiché, ne pas afficher le formulaire
  if (showPayment && draftId) {
    return (
      <AllCompStripe
        draftId={draftId}
        gameName={nameOfGame}
        onPaymentSuccess={() => {
          // Récupérer les données validées du sessionStorage
          const validatedData = JSON.parse(
            sessionStorage.getItem("validatedGameData")
          );
          if (validatedData) {
            handlePaymentSuccess(validatedData);
          } else {
            toast.error("Données de présentation non trouvées");
            router.push("/");
          }
        }}
      />
    );
  }

  return loading || weAreSendingData ? (
    weAreSendingData ? (
      <WeAreSendingData
        filesToSend={filesToSend}
        nameOfGame={nameOfGame}
        avatar={avatar}
      /> // Loading component when we are sending data
    ) : (
      <Loading /> // Loading component when the page is not yet loaded
    )
  ) : (
    <>
      <section className="w-[95vw] largeScreen:w-[68vw] mx-auto px-0 tablet:px-8 text-white font-bold border border-purple-600 rounded-3xl bg-black/30">
        <div
          className={`m-4 min-h-[44px] largeScreen:min-h-[24px] text-xs laptop:text-sm ${formularyCss.shadowPurple}`}
        >
          {session?.user?.username && (
            <>
              <span className={`capitalize ${pressStart2P.className}`}>
                {session?.user.username}
              </span>
              <TextOneByOne
                frenchPhrase={
                  ", sur cette page, vous êtes invité à remplir la présentation de votre jeu."
                }
                englishPhrase={
                  ", on this page, you are invited to fill out the presentation of your game."
                }
              />
            </>
          )}
        </div>

        {/************ Mandatory Information **********************************************************/}
        <section className="flex" /* colonne + choix */>
          <div className="mr-4 hidden laptop:block">
            <ObligatoryButtons
              nameOfGame={nameOfGame}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              shortIntroduction={shortIntroduction}
              introductionOfTheGame={introductionOfTheGame}
              platform={platform}
              releaseDate={releaseDate}
              selectedAgePegi={selectedAgePegi}
              isUrlPoster={filesToSend.posterGlimpseFile || ""}
              SoloMulti={SoloMulti}
            />

            {/************ Optional Information **********************************************************/}
            <OptionalButtons
              nameOfGame={nameOfGame}
              setNameOfGame={setNameOfGame}
              urlBackgroundCloudinary={filesToSend.backgroundGlimpseFile || ""}
              genreOfGame={genreOfGame}
              videoLink={videoLink}
              webSiteOfThisGame={webSiteOfThisGame}
              webSiteOfThisCreator={webSiteOfThisCreator}
              steamLink={steamLink}
              epicGamesLink={epicGamesLink}
              urlImageOne={filesToSend.imageOneGlimpseFile || ""}
              urlImageTwo={filesToSend.imageTwoGlimpseFile || ""}
              urlImageThree={filesToSend.imageThreeGlimpseFile || ""}
            />
          </div>

          {/*************************** Frames ******************************************************/}
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
            setBackgroundPreview={setBackgroundPreview}
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
            isDarkMode={isDarkMode}
            isIntroOfYourself={isIntroOfYourself}
            setIsIntroOfYourself={setIsIntroOfYourself}
            filesToSend={filesToSend}
            setFilesToSend={setFilesToSend}
            setLoading={setLoading}
            setWeAreSendingData={setWeAreSendingData}
            onDraftCreated={(draftId, validatedData, filesToSend) => {
              if (validatedData) {
                // Nouvelles données validées, afficher le paiement
                setDraftId("temp-draft-id"); // ID temporaire pour le paiement
                setValidatedFiles(filesToSend); // Stocker les fichiers
                setShowPayment(true);
              } else if (draftId) {
                // Ancien flux avec draftId (pour compatibilité)
                setDraftId(draftId);
                setShowPayment(true);
              }
            }}
          />
        </section>
      </section>

      {/*************************** Glimpse ******************************************************/}
      <section
        style={{
          backgroundImage: backgroundPreview
            ? `url(${backgroundPreview})`
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
          SoloMulti={SoloMulti}
          genreOfGame={genreOfGame}
          videoLink={videoLink}
          webSiteOfThisGame={webSiteOfThisGame}
          webSiteOfThisCreator={webSiteOfThisCreator}
          isDarkMode={isDarkMode}
          steamLink={steamLink}
          epicGamesLink={epicGamesLink}
          filesToSend={filesToSend}
          isIntroOfYourself={isIntroOfYourself}
        />

        {/*************************** Biography of the creator *******************************************/}
        {isIntroOfYourself === "true" && <UserProfileSection user={user} />}
      </section>
    </>
  );
}
