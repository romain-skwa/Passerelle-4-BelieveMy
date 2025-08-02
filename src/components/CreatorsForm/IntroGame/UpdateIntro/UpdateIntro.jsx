import { useEffect, useRef, useState } from "react";
import { updateIntroduction } from "@/actions/update-introduction";
import { useRouter } from "next/navigation";
import React from "react";
import Platform from "@/components/CreatorsForm/GamePresentationInside/Platform/Platform";
import Pegi from "@/components/CreatorsForm/GamePresentationInside/Pegi/Pegi";
import ButtonSoloMulti from "@/components/CreatorsForm/GamePresentationInside/ButtonSoloMulti/ButtonSoloMulti";
import GenreOfGame from "../../GamePresentationInside/GenreOfGame/GenreOfGame";
import DatePicker from "react-datepicker";
import ImageCloudinaryUpdate from "@/components/ImageCloudinaryUpdate/ImageCloudinaryUpdate";
import "react-datepicker/dist/react-datepicker.css";
import he from "he";
import { toast } from "react-toastify";
import MyEditor from "@/components/TinyMceEditor/TinyMceEditor";

const UpdateIntro = ({
  game,
  fetchgameData,
  setLoading,
  setWeAreUpdatingIntro,
  comparaison,
  setComparaison,
}) => {
  const router = useRouter();
  const [gameId, setGameId] = useState();
  const [email, setEmail] = useState();
  const [shortIntroductionUpdate, setShortIntroductionUpdate] = useState();
  const [introductionOfTheGameUpdate, setIntroductionOfTheGameUpdate] = useState();
  const [platformUpdate, setPlatformUpdate] = useState([]);
  const [releaseDateUpdate, setReleaseDateUpdate] = useState();
  const [selectedAgePegiUpdate, setSelectedAgePegiUpdate] = useState();
  const [selectedAdditionalPegiUpdate, setSelectedAdditionalPegiUpdate] = useState([]);
  const [soloMultiUpdate, setSoloMultiUpdate] = useState([]);
  const [urlPosterCloudinaryUpdate, setUrlPosterCloudinaryUpdate] = useState();
  const [urlPosterUpdate, setUrlPosterUpdate] = useState();
  const [urlImageOneCloudinaryUpdate, setUrlImageOneCloudinaryUpdate] =  useState();
  const [urlImageTwoCloudinaryUpdate, setUrlImageTwoCloudinaryUpdate] =  useState();
  const [urlImageThreeCloudinaryUpdate, setUrlImageThreeCloudinaryUpdate] = useState();
  const [urlBackgroundCloudinaryUpdate, setUrlBackgroundCloudinaryUpdate] = useState();
  const [videoLinkUpdate, setVideoLinkUpdate] = useState();
  const [filesToSend, setFilesToSend] = useState({});
  const [webSiteOfThisGameUpdate, setWebSiteOfThisGameUpdate] = useState();
  const [webSiteOfThisCreatorUpdate, setWebSiteOfThisCreatorUpdate] = useState();
  const [steamLinkUpdate, setSteamLinkUpdate] = useState();
  const [epicGamesLinkUpdate, setEpicGamesLinkUpdate] = useState();
  const [genreOfGameUpdate, setGenreOfGameUpdate] = useState([]);
  const [isDarkModeUpdate, setIsDarkModeUpdate] = useState(false);
  const [isIntroOfYourselfUpdate, setIsIntroOfYourselfUpdate] = useState(false);
  const [upDateIntro, setUpDateIntro] = useState(false);
  const [nameOfGameUpdate, setNameOfGameUpdate] = useState();

  // Get data about this game
  useEffect(() => {
    if (game && game._id) setGameId(game._id);
    if (!upDateIntro) return;
    if (game && game.email) setEmail(game.email);
    if (game && game.nameofgame) {
      const decodedNameOfGame = decodeURIComponent(game.nameofgame);
      setNameOfGameUpdate(decodedNameOfGame);
      initialNameOfGameRef.current = decodedNameOfGame;
    }
    if (game && game.shortIntroduction) {
      const decodedShortIntroduction = he.decode(game.shortIntroduction);
      setShortIntroductionUpdate(decodedShortIntroduction);
      initialShortIntroductionRef.current = decodedShortIntroduction;
    }
    if (game && game.content) {
      const decodedIntroductionOfTheGameUpdate = he.decode(game.content);
      setIntroductionOfTheGameUpdate(decodedIntroductionOfTheGameUpdate);
      initialIntroductionOfTheGameRef.current = decodedIntroductionOfTheGameUpdate;
    }
    if (game && game.platform) {setPlatformUpdate(game.platform);initialPlatformRef.current = game.platform;}
    if (game && game.selectedAgePegi) {setSelectedAgePegiUpdate(game.selectedAgePegi);initialSelectedAgePegiRef.current = game.selectedAgePegi;}
    if (game && game.selectedAdditionalPegi) {setSelectedAdditionalPegiUpdate(game.selectedAdditionalPegi);initialSelectedAdditionalPegiRef.current = game.selectedAdditionalPegi;}
    if (game && game.SoloMulti) {setSoloMultiUpdate(game.SoloMulti);initialSoloMultiRef.current = game.SoloMulti;}
    if (game && game.urlPosterCloudinary) {
      setUrlPosterCloudinaryUpdate(game.urlPosterCloudinary);
      initialUrlPosterCloudinaryRef.current = game.urlPosterCloudinary;
    } else {
      setUrlImageOneCloudinaryUpdate("");
      initialUrlImageOneRef.current = "";
    }
    if (game && game.urlPoster) {
      setUrlPosterUpdate(game.urlPoster);
      initialUrlPosterRef.current = game.urlPoster;
    } else {setUrlPosterUpdate("");initialUrlPosterRef.current = "";}
    if (game && game.urlImageOneCloudinary) {setUrlImageOneCloudinaryUpdate(game.urlImageOneCloudinary);initialUrlImageOneRef.current = game.urlImageOneCloudinary;}
    if (game && game.urlImageTwoCloudinary) {setUrlImageTwoCloudinaryUpdate(game.urlImageTwoCloudinary);initialUrlImageTwoRef.current = game.urlImageTwoCloudinary;}
    if (game && game.urlImageThreeCloudinary) {setUrlImageThreeCloudinaryUpdate(game.urlImageThreeCloudinary);initialUrlImageThreeRef.current = game.urlImageThreeCloudinary;}
    if (game && game.urlBackgroundCloudinary) {setUrlBackgroundCloudinaryUpdate(game.urlBackgroundCloudinary);initialUrlBackgroundRef.current = game.urlBackgroundCloudinary;}
    if (game && game.videoLink) {setVideoLinkUpdate(game.videoLink);initialVideoLinkRef.current = game.videoLink;}
    if (game && game.webSiteOfThisGame) {setWebSiteOfThisGameUpdate(game.webSiteOfThisGame);initialWebSiteOfThisGameRef.current = game.webSiteOfThisGame;}
    if (game && game.webSiteOfThisCreator) {setWebSiteOfThisCreatorUpdate(game.webSiteOfThisCreator);initialWebSiteOfThisCreatorRef.current = game.webSiteOfThisCreator;}
    if (game && game.steamLink) {setSteamLinkUpdate(game.steamLink);initialSteamLinkRef.current = game.steamLink;}
    if (game && game.epicGamesLink) {setEpicGamesLinkUpdate(game.epicGamesLink);initialEpicGamesLinkRef.current = game.epicGamesLink;}
    if (game && game.genreOfGame) {setGenreOfGameUpdate(game.genreOfGame);initialGenreOfGameRef.current = game.genreOfGame;}
    if (game && game.isDarkMode) {setIsDarkModeUpdate(game.isDarkMode);initialIsDarkModeRef.current = game.isDarkMode;}
    if (game && game.isIntroOfYourself) {setIsIntroOfYourselfUpdate(game.isIntroOfYourself);initialIsIntroOfYourselfRef.current = game.isIntroOfYourself;}
    if (game && game.releaseDate) {
      const date = new Date(game.releaseDate);
      if (!isNaN(date.getTime())) {
        setReleaseDateUpdate(date);
        initialReleaseDateRef.current = date;
      } else {
        console.error("Date invalide :", game.releaseDate);
        toast.error("La date de sortie est invalide.");
      }
    }
  }, [game, upDateIntro]);

  // Keep initial data in useRef
  const initialNameOfGameRef = useRef();
  const initialShortIntroductionRef = useRef();
  const initialIntroductionOfTheGameRef = useRef();
  const initialPlatformRef = useRef([]);
  const initialReleaseDateRef = useRef();
  const initialSelectedAgePegiRef = useRef();
  const initialSelectedAdditionalPegiRef = useRef([]);
  const initialSoloMultiRef = useRef([]);
  const initialUrlPosterCloudinaryRef = useRef();
  const initialUrlPosterRef = useRef();
  const initialUrlImageOneRef = useRef();
  const initialUrlImageTwoRef = useRef();
  const initialUrlImageThreeRef = useRef();
  const initialUrlBackgroundRef = useRef();
  const initialVideoLinkRef = useRef();
  const initialWebSiteOfThisGameRef = useRef();
  const initialWebSiteOfThisCreatorRef = useRef();
  const initialSteamLinkRef = useRef();
  const initialEpicGamesLinkRef = useRef();
  const initialGenreOfGameRef = useRef([]);
  const initialIsDarkModeRef = useRef(false);
  const initialIsIntroOfYourselfRef = useRef(false);

  // Compare initial data with actual data
  useEffect(() => {
    if (!upDateIntro) return;
    setComparaison({
      isNameOfGameChanged: nameOfGameUpdate !== initialNameOfGameRef.current,
      isShortIntroChanged: shortIntroductionUpdate !== initialShortIntroductionRef.current,
      isDetailsIntroChanged: introductionOfTheGameUpdate !== initialIntroductionOfTheGameRef.current,
      isPlatformChanged: JSON.stringify(platformUpdate) !== JSON.stringify(initialPlatformRef.current),
      isReleaseDateChanged: releaseDateUpdate !== initialReleaseDateRef.current,
      isSelectedAgePegiChanged: selectedAgePegiUpdate !== initialSelectedAgePegiRef.current,
      isSelectedAdditionalPegiChanged: JSON.stringify(selectedAdditionalPegiUpdate) !== JSON.stringify(initialSelectedAdditionalPegiRef.current),
      isSoloMultiChanged: JSON.stringify(soloMultiUpdate) !== JSON.stringify(initialSoloMultiRef.current),
      isUrlPosterCloudinaryChanged: urlPosterCloudinaryUpdate !== initialUrlPosterCloudinaryRef.current,
      isUrlPosterChanged: urlPosterUpdate !== initialUrlPosterRef.current,
      isUrlImageOneChanged: urlImageOneCloudinaryUpdate !== initialUrlImageOneRef.current,
      isUrlImageTwoChanged: urlImageTwoCloudinaryUpdate !== initialUrlImageTwoRef.current,
      isUrlImageThreeChanged: urlImageThreeCloudinaryUpdate !== initialUrlImageThreeRef.current,
      isUrlBackgroundChanged: urlBackgroundCloudinaryUpdate !== initialUrlBackgroundRef.current,
      isVideoLinkChanged: videoLinkUpdate !== initialVideoLinkRef.current,
      isWebSiteOfThisGameChanged: webSiteOfThisGameUpdate !== initialWebSiteOfThisGameRef.current,
      isWebSiteOfThisCreatorChanged: webSiteOfThisCreatorUpdate !== initialWebSiteOfThisCreatorRef.current,
      isSteamLinkChanged: steamLinkUpdate !== initialSteamLinkRef.current,
      isEpicGamesLinkChanged: epicGamesLinkUpdate !== initialEpicGamesLinkRef.current,
      isGenreOfGameChanged: JSON.stringify(genreOfGameUpdate) !== JSON.stringify(initialGenreOfGameRef.current),
      isDarkModeChanged: isDarkModeUpdate !== initialIsDarkModeRef.current,
      isIntroOfYourselfChanged: isIntroOfYourselfUpdate !== initialIsIntroOfYourselfRef.current,
    });
  }, [
    nameOfGameUpdate,
    shortIntroductionUpdate,
    introductionOfTheGameUpdate,
    platformUpdate,
    releaseDateUpdate,
    selectedAgePegiUpdate,
    selectedAdditionalPegiUpdate,
    soloMultiUpdate,
    urlPosterCloudinaryUpdate,
    urlPosterUpdate,
    urlImageOneCloudinaryUpdate,
    urlImageTwoCloudinaryUpdate,
    urlImageThreeCloudinaryUpdate,
    urlBackgroundCloudinaryUpdate,
    videoLinkUpdate,
    webSiteOfThisGameUpdate,
    webSiteOfThisCreatorUpdate,
    steamLinkUpdate,
    epicGamesLinkUpdate,
    genreOfGameUpdate,
    isDarkModeUpdate,
    isIntroOfYourselfUpdate,
    upDateIntro,
  ]);

  // Fonction pour uploader les images vers Cloudinary
  const uploadImagesToCloudinary = async () => {
    const uploadPromises = [];
    const uploadedUrls = {};

    for (const [key, file] of Object.entries(filesToSend)) {
      const formData = new FormData();
      formData.append('file', file);

      const uploadPromise = fetch('/api/cloudinary/upload', {
        method: 'POST',
        body: formData,
      }).then(response => response.json())
        .then(result => {
          if (result.secure_url) {
            uploadedUrls[key] = result.secure_url;
          }
        })
        .catch(error => {
          console.error(`Erreur upload ${key}:`, error);
        });

      uploadPromises.push(uploadPromise);
    }

    await Promise.all(uploadPromises);
    return uploadedUrls;
  };

  // Envoyer les données à l'API createIntroduction
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setWeAreUpdatingIntro(true);
    try {
      if (comparaison.isNameOfGameChanged) {
        const gameToCheck = encodeURIComponent(nameOfGameUpdate);
        const response = await fetch("/api/checkIfGameExists", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gameToCheck }),
          cache: "no-store",
        });
        if (!response.ok)
          throw new Error("Erreur lors de la vérification du jeu");
        const data = await response.json();
        if (data.exists) {
          setWeAreUpdatingIntro(false);
          return toast.error(
            "Ce nom de jeu existe déjà dans la base de données."
          );
        }
      } else console.log("Le nom du jeu n'a pas été changé");

      if (!urlPosterCloudinaryUpdate && !urlPosterUpdate) {setWeAreUpdatingIntro(false);return toast.error("Vous devez sélectionner un fichier image");}
      if (urlPosterCloudinaryUpdate && !urlPosterCloudinaryUpdate.match(/\.(jpg|jpeg|png)$/i)) {
        setWeAreUpdatingIntro(false);
        return toast.error("L'image doit être au format jpg, jpeg ou png");
      }
      if (urlPosterUpdate && !urlPosterUpdate.match(/\.(jpg|jpeg|png)$/i)) {
        setWeAreUpdatingIntro(false);
        return toast.error("L'image doit être au format jpg, jpeg ou png");
      }
      if (!selectedAgePegiUpdate) {
        setWeAreUpdatingIntro(false);
        return toast.error("Vous devez sélectionner un âge parmi les options disponibles.");
      }
      if (shortIntroductionUpdate.length > 400) {
        setWeAreUpdatingIntro(false);
        return toast.error("L'introduction doit comporter 400 caractères maximum.");
      }
      if (introductionOfTheGameUpdate.length > 10000) {
        setWeAreUpdatingIntro(false);
        return toast.error("La présentation doit comporter 10 000 caractères maximum.");
      }
      if (platformUpdate.length === 0) {
        setWeAreUpdatingIntro(false);
        return toast.error("Vous devez sélectionner au moins une plateforme.");
      }
      if (webSiteOfThisGameUpdate && !webSiteOfThisGameUpdate.startsWith("https://")) {
        setWeAreUpdatingIntro(false);
        return toast.error("Le lien du site officiel doit commencer par 'https://'");
      }
      if (webSiteOfThisCreatorUpdate && !webSiteOfThisCreatorUpdate.startsWith("https://")) {
        setWeAreUpdatingIntro(false);
        return toast.error("Le lien du site officiel doit commencer par 'https://'");
      }
      if (!(releaseDateUpdate instanceof Date) || isNaN(releaseDateUpdate.getTime())) {
        setWeAreUpdatingIntro(false);
        return toast.error("Vous devez sélectionner une date de sortie.");
      }
      if (releaseDateUpdate) {
        const releaseDateUpdateString = releaseDateUpdate.toLocaleDateString("fr-FR");
        const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!datePattern.test(releaseDateUpdateString)) {
          setWeAreUpdatingIntro(false);
          return toast.error("La date de sortie doit être au format jj/mm/aaaa (ex: 17/05/2025)");
        }
      } 
      else return toast.error("Vous devez sélectionner une date de sortie.");
      if (steamLinkUpdate && (!steamLinkUpdate.startsWith("https://") || !steamLinkUpdate.includes("steam"))) {
        setWeAreUpdatingIntro(false);
        return toast.error("Le lien vers Steam doit commencer par 'https://' et inclure steam");
      }

      // Upload des images vers Cloudinary si nécessaire
      let uploadedUrls = {};
      if (Object.keys(filesToSend).length > 0) {
        uploadedUrls = await uploadImagesToCloudinary();
      }

      const formData = new FormData();
      formData.append("gameId", gameId);
      formData.append("email", email);
      formData.append("nameOfGame", encodeURIComponent(nameOfGameUpdate));
      formData.append("shortIntroduction", he.encode(shortIntroductionUpdate));
      formData.append("introductionOfTheGame",he.encode(introductionOfTheGameUpdate));
      formData.append("platform", JSON.stringify(platformUpdate));
      formData.append("releaseDate", releaseDateUpdate);
      formData.append("SoloMulti", JSON.stringify(soloMultiUpdate));
      formData.append("selectedAgePegi", selectedAgePegiUpdate);
      formData.append("selectedAdditionalPegi", selectedAdditionalPegiUpdate);
      formData.append("genreOfGame", JSON.stringify(genreOfGameUpdate));
      formData.append("isDarkMode", isDarkModeUpdate.toString());
      formData.append("isIntroOfYourself", isIntroOfYourselfUpdate.toString());
      if (urlPosterCloudinaryUpdate)formData.append("urlPosterCloudinary", urlPosterCloudinaryUpdate);
      if (urlPosterUpdate) formData.append("urlPoster", urlPosterUpdate);
      if (videoLinkUpdate) formData.append("videoLink", videoLinkUpdate);
      if (steamLinkUpdate) formData.append("steamLink", steamLinkUpdate);
      if (epicGamesLinkUpdate) formData.append("epicGamesLink", epicGamesLinkUpdate);
      if (webSiteOfThisGameUpdate) formData.append("webSiteOfThisGame", webSiteOfThisGameUpdate);
      if (webSiteOfThisCreatorUpdate) formData.append("webSiteOfThisCreator", webSiteOfThisCreatorUpdate);
      // Utiliser les nouvelles URLs uploadées ou les existantes
      if (uploadedUrls.posterGlimpseFile || urlPosterCloudinaryUpdate) {
        formData.append("urlPosterCloudinary", uploadedUrls.posterGlimpseFile || urlPosterCloudinaryUpdate);
      }
      if (uploadedUrls.imageOneGlimpseFile || urlImageOneCloudinaryUpdate) {
        formData.append("urlImageOneCloudinary", uploadedUrls.imageOneGlimpseFile || urlImageOneCloudinaryUpdate);
      }
      if (uploadedUrls.imageTwoGlimpseFile || urlImageTwoCloudinaryUpdate) {
        formData.append("urlImageTwoCloudinary", uploadedUrls.imageTwoGlimpseFile || urlImageTwoCloudinaryUpdate);
      }
      if (uploadedUrls.imageThreeGlimpseFile || urlImageThreeCloudinaryUpdate) {
        formData.append("urlImageThreeCloudinary", uploadedUrls.imageThreeGlimpseFile || urlImageThreeCloudinaryUpdate);
      }
      if (uploadedUrls.backgroundGlimpseFile || urlBackgroundCloudinaryUpdate) {
        formData.append("urlBackgroundCloudinary", uploadedUrls.backgroundGlimpseFile || urlBackgroundCloudinaryUpdate);
      }
      //console.log("Form data:", formData);
      await updateIntroduction(formData);
      toast.success("Présentation du jeu a été mise à jour !");
      setWeAreUpdatingIntro(false);
      setLoading(true);
      fetchgameData();
      router.replace(`/dynamic/introduction/${encodeURIComponent(nameOfGameUpdate)}?nameofgame=${encodeURIComponent(nameOfGameUpdate)}`);
    } catch (error) {
      return toast.error(error.message);
    }
  };

  return (
    <>
      {upDateIntro ? (
        <form
          onSubmit={handleFormSubmit}
          className="w-[87vw] tablet:w-[100%] laptop:w-[95%] tablet:mx-auto border p-2 mt-4"
          style={{ backgroundColor: "rgba(148, 163, 184, 0.7)" }}
        >
          {/* Fond noir et Texte blanc */}
          <section className="flex justify-center">
            <div className="py-2 px-4 bg-black text-white ml-2 tablet:inline-flex align-middle my-3 rounded-xl border">
              <span>Mode Sombre : Texte blanc sur fond noir</span>
              <div className="ml-4">
                <label>
                  <input
                    type="radio"
                    value="true"
                    className="mx-2"
                    checked={isDarkModeUpdate === "true"}
                    onChange={() => setIsDarkModeUpdate("true")}
                  />
                  Oui
                </label>
                <label className="ml-4">
                  <input
                    type="radio"
                    value="false"
                    className="mx-2"
                    checked={isDarkModeUpdate === "false"}
                    onChange={() => setIsDarkModeUpdate("false")}
                  />
                  Non
                </label>
              </div>
            </div>
          </section>

          {/* Nom */}
          <input
            type="text"
            name="nameOfGameUpdate"
            placeholder={nameOfGameUpdate}
            className="px-3 py-2 rounded-md w-full flex-grow text-black"
            maxLength={80}
            size={80}
            value={nameOfGameUpdate ? nameOfGameUpdate : ""}
            onChange={(e) => setNameOfGameUpdate(e.target.value)}
          />

          {/* Introduction courte */}
          <div className="border p-2 my-2">
            <p
              className="text-white text-center font-bold mb-3"
              style={{ textShadow: "2px 2px 7px rgba(0, 0, 0, 1)" }}
            >
              Cette introduction courte sera affichée en gras
            </p>
            <textarea
              name="shortIntroductionUpdate"
              id="shortIntroductionUpdate"
              value={shortIntroductionUpdate ? shortIntroductionUpdate : ""}
              onChange={(e) => setShortIntroductionUpdate(e.target.value)}
              className="text-black w-[100%] p-2"
            />
          </div>
          {/* Présentation détaillée */}
          <MyEditor
            introductionOfTheGame={introductionOfTheGameUpdate || ""}
            setIntroductionOfTheGame={setIntroductionOfTheGameUpdate}
          />
          {/* Plateforme */}
          <Platform platform={platformUpdate} setPlatform={setPlatformUpdate} />

          {/* Date de sortie */}
          <div className="my-2 flex">
            <p
              className="text-white font-bold mr-2"
              style={{ textShadow: "2px 2px 7px rgba(0, 0, 0, 1)" }}
            >
              Date de sortie :
            </p>
            <DatePicker
              className="pl-2"
              selected={releaseDateUpdate}
              dateFormat="dd/MM/yyyy"
              id="releaseDateUpdate"
              required
              onChange={(date) => setReleaseDateUpdate(date)}
            />
          </div>

          {/* PEGI */}
          <Pegi
            selectedAgePegi={selectedAgePegiUpdate}
            setSelectedAgePegi={setSelectedAgePegiUpdate}
            selectedAdditionalPegi={selectedAdditionalPegiUpdate}
            setSelectedAdditionalPegi={setSelectedAdditionalPegiUpdate}
          />

          {/* Solo ou Multi */}
          <ButtonSoloMulti
            SoloMulti={soloMultiUpdate || ""}
            setSoloMulti={setSoloMultiUpdate}
          />

          {/* Affiche [encadré] */}
          <div className="w-[95%] tablet:w-[380px] p-4 mt-4 border grasFondBleu mx-auto">
            <p className="text-center">Choisissez l'affiche du jeu</p>
            <ImageCloudinaryUpdate
              name="posterGlimpseFile"
              urlCloudinary={urlPosterCloudinaryUpdate || ""}
              setUrlCloudinary={setUrlPosterCloudinaryUpdate}
              buttonText="Télécharger Affiche"
              setFilesToSend={setFilesToSend}
            />
          </div>

          <section className="flex flex-col tablet:flex-row w-full gap-2 justify-center">
            {/* Image d'illustration n°1 [encadré] */}
            <div className="w-[95%] tablet:w-[30%] p-1 pl-2 mt-4 border grasFondBleu flex flex-col">
              <p className="text-center">
                Choisissez l'image d'illustration n°1
              </p>
              <ImageCloudinaryUpdate
                name="imageOneGlimpseFile"
                urlCloudinary={urlImageOneCloudinaryUpdate || ""}
                setUrlCloudinary={setUrlImageOneCloudinaryUpdate}
                buttonText="Télécharger l'image n°1"
                setFilesToSend={setFilesToSend}
              />
            </div>

            {/* Image d'illustration n°2 [encadré] */}
            <div className="w-[95%] tablet:w-[30%] p-1 pl-2 mt-4 border grasFondBleu flex flex-col">
              <p className="text-center tablet:inline-block">
                Choisissez l'image d'illustration n°2
              </p>
              <ImageCloudinaryUpdate
                name="imageTwoGlimpseFile"
                urlCloudinary={urlImageTwoCloudinaryUpdate || ""}
                setUrlCloudinary={setUrlImageTwoCloudinaryUpdate}
                buttonText="Télécharger l'image n°2"
                setFilesToSend={setFilesToSend}
              />
            </div>

            {/* Image d'illustration n°3 [encadré] */}
            <div className="w-[95%] tablet:w-[30%] p-1 pl-2 mt-4 border grasFondBleu flex flex-col">
              <p className="text-center tablet:inline-block">
                Choisissez l'image d'illustration n°3
              </p>
              <ImageCloudinaryUpdate
                name="imageThreeGlimpseFile"
                urlCloudinary={urlImageThreeCloudinaryUpdate || ""}
                setUrlCloudinary={setUrlImageThreeCloudinaryUpdate}
                buttonText="Télécharger l'image n°3"
                setFilesToSend={setFilesToSend}
              />
            </div>
          </section>

          {/* Arrière plan [encadré] */}
          <div className="w-[95%] tablet:w-[40%] p-1 pl-2 mt-4 border grasFondBleu flex flex-col item-center mx-auto">
            <p className="text-center tablet:inline-block">
              Choisissez une image pour l'arrière plan
            </p>
            <ImageCloudinaryUpdate
              name="backgroundGlimpseFile"
              urlCloudinary={urlBackgroundCloudinaryUpdate || ""}
              setUrlCloudinary={setUrlBackgroundCloudinaryUpdate}
              buttonText="Télécharger Background"
              setFilesToSend={setFilesToSend}
            />
          </div>

          {/* Lien vidéo Youtube [encadré] */}
          <section className="flex flex-col justify-center items-center border rounded-md my-4 py-4">
            <p>Lien Vidéo Youtube</p>
            <input
              type="url"
              name="videoLinkUpdate"
              placeholder="Lien YouTube de la vidéo"
              className="block w-[95%] tablet:w-[60%] p-1 pl-2 m-2 text-black"
              value={videoLinkUpdate || ""}
              onChange={(e) => setVideoLinkUpdate(e.target.value)}
            />
            {videoLinkUpdate && (
              <iframe
                width="560"
                height="315"
                src={
                  videoLinkUpdate.includes("watch?v=")
                    ? videoLinkUpdate.replace("watch?v=", "embed/")
                    : videoLinkUpdate
                }
                allowFullScreen
              ></iframe>
            )}
          </section>

          <section className="flex flex-col items-center gap-2">
            {/* Lien Site officiel du jeu [encadré] */}
            <input
              type="url"
              name="webSiteOfThisGameUpdate"
              placeholder="Lien vers le site officiel du jeu"
              className="block w-[95%] tablet:w-[60%] p-1 pl-2 text-black"
              value={webSiteOfThisGameUpdate || ""}
              onChange={(e) => setWebSiteOfThisGameUpdate(e.target.value)}
            />
            {/* Lien Site officiel des créateurs [encadré] */}
            <input
              type="url"
              name="webSiteOfThisCreatorUpdate"
              placeholder="Lien vers le site officiel du/des créateur(s)"
              className="block w-[95%] tablet:w-[60%] p-1 pl-2 text-black"
              value={webSiteOfThisCreatorUpdate || ""}
              onChange={(e) => setWebSiteOfThisCreatorUpdate(e.target.value)}
            />
            {/* Lien Steam [encadré] */}
            <input
              type="url"
              name="steamLinkUpdate"
              placeholder="Lien vers le site Steam"
              className="block w-[95%] tablet:w-[60%] p-1 pl-2 text-black"
              value={steamLinkUpdate || ""}
              onChange={(e) => setSteamLinkUpdate(e.target.value)}
            />
            {/* Lien Epic Games [encadré] */}
            <input
              type="url"
              name="epicGamesLinkUpdate"
              placeholder="Lien vers le site Epic Games"
              className="block w-[95%] tablet:w-[60%] p-1 pl-2 text-black"
              value={epicGamesLinkUpdate || ""}
              onChange={(e) => setEpicGamesLinkUpdate(e.target.value)}
            />
          </section>

          {/* Catégories [encadré] */}
          <GenreOfGame
            selectedGenres={genreOfGameUpdate || ""}
            setSelectedGenres={setGenreOfGameUpdate}
          />

          {/* Ajout de la biographie du créateur [encadré] */}
          <div className="flex justify-center">
            <div className="grasFondBleuborder border-black p-2 inline-block mt-3 mb-3 rounded-md font-bold text-white cursor-pointer">
              Souhaitez-vous ajouter la présentation de vous-même ou de votre
              équipe ?
              <div className="flex justify-center mt-2 w-full">
                <label className="flex items-center mr-4">
                  <input
                    type="checkbox"
                    checked={isIntroOfYourselfUpdate === "true"}
                    onChange={() => setIsIntroOfYourselfUpdate("true")}
                    className="mr-2"
                  />
                  Oui
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isIntroOfYourselfUpdate === "false"}
                    onChange={() => setIsIntroOfYourselfUpdate("false")}
                    className="mr-2"
                  />
                  Non
                </label>
              </div>
            </div>
          </div>

          {/* UPDATE the introduction */}
          <div className="flex justify-center">
            <button
              className="bg-green-500 p-3 w-60 border-2 border-red-800 rounded-2xl m-2 disabled:bg-opacity-50 disabled:cursor-not-allowed disabled:border-none"
              disabled={
                !nameOfGameUpdate ||
                nameOfGameUpdate.length < 1 ||
                !introductionOfTheGameUpdate ||
                introductionOfTheGameUpdate.length < 1 ||
                platformUpdate < 1 ||
                !shortIntroductionUpdate ||
                shortIntroductionUpdate.length < 1 ||
                urlPosterCloudinaryUpdate === ""
              }
            >
              Mettre à jour la présentation
            </button>
          </div>
        </form>
      ) : (
        <div className="flex justify-center">
          <button
            onClick={() => setUpDateIntro(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          >
            Je veux modifier cette présentation
          </button>
        </div>
      )}
    </>
  );
};

export default UpdateIntro;
