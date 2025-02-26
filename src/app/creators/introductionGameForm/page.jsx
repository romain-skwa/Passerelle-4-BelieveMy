"use client";
// Formulary  introduction Games

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/formulary.css";
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";
import Glimpse from "@/components/CreatorsForm/GamePresentationInside/Glimpse/Glimpse"; // Aperçu
import UserProfileSection from "@/components/UserProfileSection/UserProfileSection";
import ObligatoryButtons from "@/components/CreatorsForm/ObligatoryButtons/ObligatoryButtons";
import OptionalButtons from "@/components/CreatorsForm/OptionalButtons/OptionalButtons";
import GamePresentationSections from "@/components/CreatorsForm/GamePresentationSections/GamePresentationSections";
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

  // State
  const [user, setUser] = useState({});
  const [isIntroOfYourself, setIsIntroOfYourself] = useState(false);
  const [nameOfGame, setNameOfGame] = useState("");
  const [shortIntroduction, setShortIntroduction] = useState("");
  const [introductionOfTheGame, setIntroductionOfTheGame] = useState("");
  const [urlPosterCloudinary, setUrlPosterCloudinary] = useState(""); console.log(`urlPosterCloudinary à la déclaration `, urlPosterCloudinary);
  const [urlImageOne, setUrlImageOne] = useState(""); console.log(`urlImageOne à la déclaration `, urlImageOne);
  const [urlImageTwo, setUrlImageTwo] = useState(""); console.log(`urlImageTwo à la déclaration `, urlImageTwo);
  const [urlImageThree, setUrlImageThree] = useState(""); console.log(`urlImageThree à la déclaration `, urlImageThree);
  const [urlBackgroundCloudinary, setUrlBackgroundCloudinary] = useState(""); console.log(`urlBackgroundCloudinary à la déclaration `, urlBackgroundCloudinary);
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

  console.log(`backgroundPreview à la déclaration : `, backgroundPreview);
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

  return (
    <GeneralLayout>
      {/*<section className="h-[100px] largeScreen:h-[66px] flex flex-col  shadowPurple">*/}
      <section className="w-[95vw] largeScreen:w-[68vw] mx-auto px-0 tablet:px-8 text-white font-bold border border-purple-600 rounded-3xl bg-black/30">
      <div className="m-4 min-h-[44px] largeScreen:min-h-[24px] text-xs laptop:text-sm shadowPurple">
            {session?.user?.username &&
            <>
                <span className={`capitalize ${pressStart2P.className}`}>{session?.user.username}</span>                 
                <TextOneByOne 
                  frenchPhrase={", sur cette page, vous êtes invité à remplir la présentation de votre jeu."} 
                  englishPhrase={", on this page, you are invited to fill out the presentation of your game."}
                />      
             </>  
            }
              </div>
          <section className="flex" /* colonne + choix */>
            <div className="mr-4 hidden laptop:block">
              {/************ Informations Obligatoires **********************************************************/}
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

              {/************ Informations Facultatifs **********************************************************/}
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
              nameOfGame={nameOfGame} setNameOfGame={setNameOfGame}
              shortIntroduction={shortIntroduction} setShortIntroduction={setShortIntroduction}
              introductionOfTheGame={introductionOfTheGame} setIntroductionOfTheGame={setIntroductionOfTheGame}
              platform={platform} setPlatform={setPlatform}
              releaseDate={releaseDate} setReleaseDate={setReleaseDate}
              selectedAgePegi={selectedAgePegi} setSelectedAgePegi={setSelectedAgePegi}
              selectedAdditionalPegi={selectedAdditionalPegi} setSelectedAdditionalPegi={setSelectedAdditionalPegi}
              SoloMulti={SoloMulti} setSoloMulti={setSoloMulti}
              urlPosterCloudinary={urlPosterCloudinary} setUrlPosterCloudinary={setUrlPosterCloudinary}
              urlImageOne={urlImageOne} setUrlImageOne={setUrlImageOne}
              urlImageTwo={urlImageTwo} setUrlImageTwo={setUrlImageTwo}
              urlImageThree={urlImageThree} setUrlImageThree={setUrlImageThree}
              setUrlBackgroundCloudinary={setUrlBackgroundCloudinary}
              setBackgroundPreview={setBackgroundPreview}
              videoLink={videoLink} setVideoLink={setVideoLink}
              webSiteOfThisGame={webSiteOfThisGame} setWebSiteOfThisGame={setWebSiteOfThisGame}
              webSiteOfThisCreator={webSiteOfThisCreator} setWebSiteOfThisCreator={setWebSiteOfThisCreator}
              steamLink={steamLink} setSteamLink={setSteamLink}
              epicGamesLink={epicGamesLink} setEpicGamesLink={setEpicGamesLink}
              genreOfGame={genreOfGame} setGenreOfGame={setGenreOfGame}
              isDarkMode={isDarkMode}
              isIntroOfYourself={isIntroOfYourself}
              setIsIntroOfYourself={setIsIntroOfYourself}
              filesToSend={filesToSend}
              setFilesToSend={setFilesToSend}
            />
          </section>
      </section>

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
          urlPosterCloudinary={urlPosterCloudinary}
          urlImageOne={urlImageOne}
          urlImageTwo={urlImageTwo}
          urlImageThree={urlImageThree}
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

        {isIntroOfYourself && <UserProfileSection user={user} />}
      </section>
    </GeneralLayout>
  );
}
