"use client";

import { createIntroduction } from "@/actions/create-introduction";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import he from "he";
import "../../styles/formulary.css";
import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import EditorPerso from "@/components/EditorPerso/EditorPerso";
import Glimpse from "@/components/Glimpse/Glimpse"; // Aperçu
import UserProfileSection from "@/components/UserProfileSection/UserProfileSection";
import Pegi from "@/components/Pegi/Pegi";
import ButtonSoloMulti from "@/components/ButtonSoloMulti/ButtonSoloMulti";
import Platform from "./../../../components/Platform/Platform";
import GenreOfGame from "./../../../components/GenreOfGame/GenreOfGame";

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
  const [lienImage, setLienImage] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
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
  const [SoloMulti, setSoloMulti] = useState([]);console.log(`SoloMulti : `, SoloMulti);

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

  const posterFile = lienImage;
  const backgroundFile = backgroundImage;

  const resetLienImage = () => {
    setLienImage(""); // Réinitialiser la valeur de lienImage
  };

  const resetbackgroundImage = () => {
    setBackgroundImage(""); // Réinitialiser la valeur de lienImage
  };

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
      if (!file) {return toast.error("Vous devez sélectionner un fichier image");}

      if (!file.name.match(/\.(jpg|jpeg|png)$/i)) {
        return toast.error("Le lien de l'image doit être au format jpg, jpeg ou png");
      }

      if (!selectedAgePegi) {
        return toast.error("Vous devez sélectionner un âge parmi les options disponibles.");
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
        return toast.error("Le lien vers Steam doit commencer par 'https://'");
      }

      // Function to send the data to createIntroduction function
      const formData = new FormData();
      formData.append("nameOfGame", encodeURIComponent(nameOfGame));
      formData.append("shortIntroduction", shortIntroduction);
      formData.append("introductionOfTheGame",he.encode(introductionOfTheGame));
      formData.append("platform", JSON.stringify(platform));
      formData.append("releaseDate", releaseDate);
      formData.append("poster", posterFile);
      formData.append("urlPoster", posterFile.name);
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
      // Ajout conditionnel pour urlImageBackground
      if (backgroundFile) {
        formData.append("imageBackground", backgroundFile);
        formData.append("urlImageBackground", backgroundFile.name);
      }

      // Debugging
      /*for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }*/
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
            {session?.user.username}, sur cette page, vous êtes invité à remplir
            de présentation de votre jeux.
          </p>

          <section >
            <div>Obligatoire</div>
            <div className="bandeauTop ">
              <div
                onClick={() => setIsShortIntroVisible(!isShortIntroVisible)}
                style={{
                  backgroundColor:
                    shortIntroduction.length > 1 ? "green" : "#2e2d2c",
                  border: isShortIntroVisible
                    ? "2px solid white"
                    : "2px solid black",
                }}
              >
                Introduction courte
              </div>

              <div
                onClick={() => setIsEditorVisible(!isEditorVisible)}
                style={{
                  backgroundColor:
                    introductionOfTheGame.length > 1 ? "green" : "#2e2d2c",
                  border: isEditorVisible ? "2px solid white" : "2px solid black",
                }}
              >
                Présentation détaillée
              </div>

              <div
                onClick={() => setPlatformVisible(!isPlatformVisible)}
                style={{
                  backgroundColor: platform.length != [] ? "green" : "#2e2d2c",
                  border: isPlatformVisible
                    ? "2px solid white"
                    : "2px solid black",
                }}
              >
                Plate-forme
              </div>

              <div
                onClick={() => setIsReleaseDateVisible(!isReleaseDateVisible)}
                style={{
                  backgroundColor: releaseDate != null ? "green" : "#2e2d2c",
                  border: isReleaseDateVisible
                    ? "2px solid white"
                    : "2px solid black",
                }}
              >
                Date de sortie
              </div>

              <div
                onClick={() => setIsPegiAgeVisible(!isPegiAgeVisible)}
                style={{
                  backgroundColor:
                    selectedAgePegi.length != "" ? "green" : "#2e2d2c",
                  border: isPegiAgeVisible
                    ? "2px solid white"
                    : "2px solid black",
                }}
              >
                Pegi age & catégorie
              </div>

              <div
                onClick={() => setIsPosterVisible(!isPosterVisible)}
                style={{
                  backgroundColor: lienImage.length != "" ? "green" : "#2e2d2c",
                  border: isPosterVisible ? "2px solid white" : "2px solid black",
                }}
              >
                Affiche
              </div>

              <div
                onClick={() => setIsSoloMulti(!isSoloMulti)}
                style={{
                  backgroundColor: SoloMulti.length != "" ? "green" : "#2e2d2c",
                  border: isSoloMulti ? "2px solid white" : "2px solid black",
                }}
              >
                Solo / Multi
              </div>
            </div>
          </section>

          <section>
            <div className="flex justify-center text-white">Facultatif</div>
            <div className="bandeauTop ">
              <div
                onClick={() => setIsBackgroundVisible(!isBackgroundVisible)}
                style={{
                  backgroundColor:
                    backgroundImage.length != "" ? "green" : "#2e2d2c",
                  border: isBackgroundVisible
                    ? "2px solid white"
                    : "2px solid black",
                }}
              >
                Arrière plan
              </div>

              <div
                onClick={() => setIsCategoryVisible(!isCategoryVisible)}
                style={{
                  backgroundColor: genreOfGame.length != "" ? "green" : "#2e2d2c",
                  border: isCategoryVisible
                    ? "2px solid white"
                    : "2px solid black",
                }}
              >
                Catégorie
              </div>

              <div
                onClick={() => setIsVideoVisible(!isVideoVisible)}
                style={{
                  backgroundColor: videoLink.length != "" ? "green" : "#2e2d2c",
                  border: isVideoVisible ? "2px solid white" : "2px solid black",
                }}
              >
                Vidéo youtube
              </div>

              <div
                onClick={() => setIsWebsiteGameVisible(!isWebsiteGameVisible)}
                style={{
                  backgroundColor:
                    webSiteOfThisGame.length != "" ? "green" : "#2e2d2c",
                  border: isWebsiteGameVisible
                    ? "2px solid white"
                    : "2px solid black",
                }}
              >
                Site officiel du jeu
              </div>

              <div
                onClick={() =>
                  setIsWebsiteCreatorVisible(!isWebsiteCreatorVisible)
                }
                style={{
                  backgroundColor:
                    webSiteOfThisCreator.length != "" ? "green" : "#2e2d2c",
                  border: isWebsiteCreatorVisible
                    ? "2px solid white"
                    : "2px solid black",
                }}
              >
                Site officiel des créateurs
              </div>

              <div
                onClick={() => setIsSteamLinkVisible(!isSteamLinkVisible)}
                style={{
                  backgroundColor: steamLink.length != "" ? "green" : "#2e2d2c",
                  border: isSteamLinkVisible
                    ? "2px solid white"
                    : "2px solid black",
                }}
              >
                Lien vers le site Steam
              </div>

              <div
                onClick={() => setIsEpicGamesLinkVisible(!isEpicGamesLinkVisible)}
                style={{
                  backgroundColor:
                    epicGamesLink.length != "" ? "green" : "#2e2d2c",
                  border: isEpicGamesLinkVisible
                    ? "2px solid white"
                    : "2px solid black",
                }}
              >
                Lien vers le site Epic Games
              </div>
            </div>
          </section>

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

          {/**************** Introduction courte ***************************** */}
          {isShortIntroVisible && (
            <div className="border p-2 my-2">
              <p
                className="text-white text-center font-bold mb-3"
                style={{ textShadow: "2px 2px 7px rgba(0, 0, 0, 1)" }}
              >
                Cette introduction courte sera affichée en gras
              </p>
              <textarea
                name="shortIntroduction"
                id="shortIntroduction"
                placeholder="Cette introduction courte sera affichée en gras"
                value={shortIntroduction}
                onChange={(e) => setShortIntroduction(e.target.value)}
              />
            </div>
          )}

          {/**************** Editeur de texte ********************************************** */}
          {isEditorVisible && (
            <EditorPerso
              introductionOfTheGame={introductionOfTheGame}
              setIntroductionOfTheGame={setIntroductionOfTheGame}
              onTextChange={(newText) => {
                setIntroductionOfTheGame(newText);
              }}
            />
          )}

          {isPlatformVisible && (
            <Platform platform={platform} setPlatform={setPlatform} />
          )}

          {/**************** Date ***************************** */}
          {isReleaseDateVisible && (
            <div className="my-2 flex">
              <p
                className="text-white font-bold mr-2"
                style={{ textShadow: "2px 2px 7px rgba(0, 0, 0, 1)" }}
              >
                Date de sortie :
              </p>
              <DatePicker
                className="pl-2"
                selected={releaseDate}
                dateFormat="dd/MM/yyyy"
                id="releaseDate"
                required
                onChange={(date) => setReleaseDate(date)}
              />
            </div>
          )}

          {/**************** Les deux catégories de PEGI ***************************** */}
          {isPegiAgeVisible && (
            <Pegi
              selectedAgePegi={selectedAgePegi}
              setSelectedAgePegi={setSelectedAgePegi}
              selectedAdditionalPegi={selectedAdditionalPegi}
              setSelectedAdditionalPegi={setSelectedAdditionalPegi}
            />
          )}

          {/**************** Sole ou Multi ***************************** */}
          {isSoloMulti && (
            <ButtonSoloMulti SoloMulti={SoloMulti} setSoloMulti={setSoloMulti} />
          )}

          {/**************** Ajout de la biographie du créateur ***************************** */}
          <div className="flex justify-center">
            <div
              className="grasFondBleuborder border-black p-2 inline-block mt-3 mb-3 rounded-md font-bold text-white cursor-pointer"
              onClick={() => setIsIntroOfYourself(!isIntroOfYourself)}
            >
              Souhaitez-vous ajouter la présentation de vous-même ou de votre
              équipe ?
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            {/**************** Affiche ***************************** */}
            {isPosterVisible && (
              <div className="w-[95%] tablet:w-[60%] p-1 pl-2 mt-4 border grasFondBleu">
                <p className="text-center tablet:inline-block">
                  Choisissez l'affiche du jeu{" "}
                </p>
                <input
                  type="file"
                  name="poster"
                  accept=".jpg, .jpeg, .png"
                  className="ml-4"
                  onChange={(e) => setLienImage(e.target.files[0])}
                />

                {lienImage && ( // Affiche le bouton seulement si une image est sélectionnée
                  <div
                    className="mt-2 p-2 bg-red-500 text-white text-center cursor-pointer"
                    onClick={resetLienImage}
                  >
                    Effacer l'image
                  </div>
                )}
              </div>
            )}
            {/**************** Arrière plan ***************************** */}
            {isBackgroundVisible && (
              <div className="w-[95%] tablet:w-[60%] p-1 pl-2 mt-4 border grasFondBleu">
                <p className="text-center tablet:inline-block">
                  Choisissez une image pour l'arrière plan{" "}
                </p>
                <input
                  type="file"
                  name="imageBackground"
                  accept=".jpg, .jpeg, .png"
                  className="ml-4"
                  onChange={(e) => setBackgroundImage(e.target.files[0])}
                />

                {backgroundImage && ( // Affiche le bouton seulement si une image est sélectionnée
                  <div
                    className="mt-2 p-2 bg-red-500 text-white text-center cursor-pointer"
                    onClick={resetbackgroundImage}
                  >
                    Effacer l'image d'arrière plan
                  </div>
                )}
              </div>
            )}
            {/**************** Lien vidéo Youtube ***************************** */}
            {isVideoVisible && (
              <input
                type="url"
                name="videoLink"
                placeholder="Lien YouTube de la vidéo"
                className="block w-[95%] tablet:w-[60%] p-1 pl-2 m-2"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
              />
            )}

            {/**************** Lien Site officiel du jeu***************************** */}
            {isWebsiteGameVisible && (
              <input
                type="url"
                name="webSiteOfThisGame"
                placeholder="Lien vers le site officiel du jeu"
                className="block w-[95%] tablet:w-[60%] p-1 pl-2"
                value={webSiteOfThisGame}
                onChange={(e) => setWebSiteOfThisGame(e.target.value)}
              />
            )}

            {/**************** Lien Site officiel des créateurs ***************************** */}
            {isWebsiteCreatorVisible && (
              <input
                type="url"
                name="webSiteOfThisCreator"
                placeholder="Lien vers le site officiel du/des créateur(s)"
                className="block w-[95%] tablet:w-[60%] p-1 pl-2"
                value={webSiteOfThisCreator}
                onChange={(e) => setWebSiteOfThisCreator(e.target.value)}
              />
            )}

            {/**************** Lien Steam ***************************** */}
            {isSteamLinkVisible && (
              <input
                type="url"
                name="steamLink"
                placeholder="Lien vers le site Steam"
                className="block w-[95%] tablet:w-[60%] p-1 pl-2"
                value={steamLink}
                onChange={(e) => setSteamLink(e.target.value)}
              />
            )}

            {/**************** Lien Epic Games ***************************** */}
            {isEpicGamesLinkVisible && (
              <input
                type="url"
                name="epicGamesLink"
                placeholder="Lien vers le site Epic Games"
                className="block w-[95%] tablet:w-[60%] p-1 pl-2"
                value={epicGamesLink}
                onChange={(e) => setEpicGamesLink(e.target.value)}
              />
            )}
          </div>

          {isCategoryVisible && (
            <GenreOfGame
              selectedGenres={genreOfGame}
              setSelectedGenres={setGenreOfGame}
            />
          )}

          <Glimpse
            nameOfGame={nameOfGame}
            shortIntroduction={shortIntroduction}
            introductionOfTheGame={introductionOfTheGame}
            platform={platform}
            releaseDate={releaseDate}
            selectedAgePegi={selectedAgePegi}
            selectedAdditionalPegi={selectedAdditionalPegi}
            lienImage={lienImage}
            SoloMulti={SoloMulti}
            genreOfGame={genreOfGame}
            videoLink={videoLink}
            webSiteOfThisGame={webSiteOfThisGame}
            webSiteOfThisCreator={webSiteOfThisCreator}
            isDarkMode={isDarkMode}
            steamLink={steamLink}
            epicGamesLink={epicGamesLink}
          />

          {isIntroOfYourself && <UserProfileSection user={user} />}

          <button
            className="bg-green-500 p-3 mx-auto w-40 border-2 border-red-800 rounded-2xl m-2 disabled:bg-opacity-50 disabled:cursor-not-allowed disabled:border-none"
            disabled={
              nameOfGame.length < 1 ||
              introductionOfTheGame.length < 1 ||
              platform < 1 ||
              shortIntroduction < 1 ||
              lienImage === ""
            } /* Désactivé si les champs sont vides */
          >
            Envoyer
          </button>
        </form>
      </section>
    </GeneralLayout>
  );
}
