// components/GamePresentationSections/GamePresentationSections.js
import { useEffect, useState } from "react";
import { updateIntroduction } from "@/actions/update-introduction";
import { useRouter } from "next/navigation";
import React from "react";
import EditorPerso from "@/components/CreatorsForm/GamePresentationInside/EditorPerso/EditorPerso";
import Platform from "@/components/CreatorsForm/GamePresentationInside/Platform/Platform";
import Pegi from "@/components/CreatorsForm/GamePresentationInside/Pegi/Pegi";
import ButtonSoloMulti from "@/components/CreatorsForm/GamePresentationInside/ButtonSoloMulti/ButtonSoloMulti";
import GenreOfGame from "../../GamePresentationInside/GenreOfGame/GenreOfGame";
import DatePicker from "react-datepicker";
import { ImageUpload } from "@/components/ImageUpload/ImageUpload";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";
import he from "he";
import { toast } from "react-toastify";

const UpdateIntro = ({ game, fetchgameData, setLoading }) => {
  const router = useRouter();
  const [gameId, setGameId] = useState();
  const [email, setEmail] = useState();
  const [nameOfGameUpdate, setNameOfGameUpdate] = useState();
  const [shortIntroductionUpdate, setShortIntroductionUpdate] = useState();
  const [introductionOfTheGameUpdate, setIntroductionOfTheGameUpdate] = useState();
  const [platformUpdate, setPlatformUpdate] = useState([]);
  const [releaseDateUpdate, setReleaseDateUpdate] = useState();
  const [selectedAgePegiUpdate, setSelectedAgePegiUpdate] = useState();
  const [selectedAdditionalPegiUpdate, setSelectedAdditionalPegiUpdate] = useState([]);
  const [soloMultiUpdate, setSoloMultiUpdate] = useState([]);
  const [urlPosterCloudinaryUpdate, setUrlPosterCloudinaryUpdate] = useState();
  const [urlImageOneCloudinaryUpdate, setUrlImageOneCloudinaryUpdate] = useState();
  const [urlImageTwoCloudinaryUpdate, setUrlImageTwoCloudinaryUpdate] = useState();
  const [urlImageThreeCloudinaryUpdate, setUrlImageThreeCloudinaryUpdate] = useState();
  const [urlBackgroundCloudinaryUpdate, setUrlBackgroundCloudinaryUpdate] = useState();
  const [videoLinkUpdate, setVideoLinkUpdate] = useState();
  const [webSiteOfThisGameUpdate, setWebSiteOfThisGameUpdate] = useState();
  const [webSiteOfThisCreatorUpdate, setWebSiteOfThisCreatorUpdate] = useState();
  const [steamLinkUpdate, setSteamLinkUpdate] = useState();
  const [epicGamesLinkUpdate, setEpicGamesLinkUpdate] = useState();
  const [genreOfGameUpdate, setGenreOfGameUpdate] = useState([]);
  const [isDarkModeUpdate, setIsDarkModeUpdate] = useState(false);
  const [isIntroOfYourselfUpdate, setIsIntroOfYourselfUpdate] = useState(false);
  //console.log(`Dans la page UpdateIntro, game.releaseDate : `, game.releaseDate);
  useEffect(() => {
    if (game && game._id) {
      setGameId(game._id);
    }
    if (game && game.email) {
      setEmail(game.email);
    }
    if (game && game.nameofgame) {
      const decodedNameOfGame = decodeURIComponent(game.nameofgame);
      setNameOfGameUpdate(decodedNameOfGame);
    }
    if (game && game.shortIntroduction) {
      const encodedShortIntroduction = he.decode(game.shortIntroduction);
      setShortIntroductionUpdate(encodedShortIntroduction);
    }
    if (game && game.content) {
      const encodedIntroductionOfTheGameUpdate = he.decode(game.content);
      setIntroductionOfTheGameUpdate(encodedIntroductionOfTheGameUpdate);
    }
    if (game && game.platform) {
      setPlatformUpdate(game.platform);
    }
    if (game && game.releaseDate) {
      // Convertir la chaîne de caractères en objet Date pour la vérification ligne 115
      const date = new Date(game.releaseDate);
      if (!isNaN(date.getTime())) {
        // Vérifiez si la date est valide
        setReleaseDateUpdate(date);
      } else {
        console.error("Date invalide :", game.releaseDate);
        toast.error("La date de sortie est invalide.");
      }
    }
    if (game && game.selectedAgePegi) {
      setSelectedAgePegiUpdate(game.selectedAgePegi);
    }
    if (game && game.selectedAdditionalPegi) {
      setSelectedAdditionalPegiUpdate(game.selectedAdditionalPegi);
    }
    if (game && game.SoloMulti) {
      setSoloMultiUpdate(game.SoloMulti);
    }
    if (game && game.urlPosterCloudinary) {
      setUrlPosterCloudinaryUpdate(game.urlPosterCloudinary);
    }
    if (game && !game.urlPosterCloudinary) {
      setUrlPosterCloudinaryUpdate(game.urlPoster);
    }
    if (game && game.urlImageOneCloudinary) {
      setUrlImageOneCloudinaryUpdate(game.urlImageOneCloudinary);
    }
    if (game && game.urlImageTwoCloudinary) {
      setUrlImageTwoCloudinaryUpdate(game.urlImageTwoCloudinary);
    }
    if (game && game.urlImageThreeCloudinary) {
      setUrlImageThreeCloudinaryUpdate(game.urlImageThreeCloudinary);
    }
    if (game && game.urlBackgroundCloudinary) {
      setUrlBackgroundCloudinaryUpdate(game.urlBackgroundCloudinary);
    }
    if (game && game.videoLink) {
      setVideoLinkUpdate(game.videoLink);
    }
    if (game && game.webSiteOfThisGame) {
      setWebSiteOfThisGameUpdate(game.webSiteOfThisGame);
    }
    if (game && game.webSiteOfThisCreator) {
      setWebSiteOfThisCreatorUpdate(game.webSiteOfThisCreator);
    }
    if (game && game.steamLink) {
      setSteamLinkUpdate(game.steamLink);
    }
    if (game && game.epicGamesLink) {
      setEpicGamesLinkUpdate(game.epicGamesLink);
    }
    if (game && game.genreOfGame) {
      setGenreOfGameUpdate(game.genreOfGame);
    }
  }, [game]);

  /****************** Envoyer les données à l'API createIntroduction **************************/
  const onPrepare = async (e) => {
    e.preventDefault();

    try {
      if (!urlPosterCloudinaryUpdate) {
        return toast.error("Vous devez sélectionner un fichier image");
      }

      if (!urlPosterCloudinaryUpdate.match(/\.(jpg|jpeg|png)$/i)) {
        return toast.error(
          "Le lien de l'image doit être au format jpg, jpeg ou png"
        );
      }

      if (!selectedAgePegiUpdate) {
        return toast.error(
          "Vous devez sélectionner un âge parmi les options disponibles."
        );
      }

      // Vérifiez le nombre de caractères de la courte introduction
      if (shortIntroductionUpdate.length > 400) {
        return toast.error(
          "L'introduction doit comporter 400 caractères maximum."
        );
      }

      //Vérifiez le nombre de caractères de la présentation détaillée
      if (introductionOfTheGameUpdate.length > 10000) {
        return toast.error(
          "La présentation doit comporter 10 000 caractères maximum."
        );
      }

      // Vérifiez si au moins une plateforme est sélectionnée
      if (platformUpdate.length === 0) {
        return toast.error("Vous devez sélectionner au moins une plateforme.");
      }

      // Vérifiez si le site du jeu commence par "https://"
      if (
        webSiteOfThisGameUpdate &&
        !webSiteOfThisGameUpdate.startsWith("https://")
      ) {
        return toast.error(
          "Le lien du site officiel doit commencer par 'https://'"
        );
      }

      // Vérifiez si le site des créateurs commence par "https://"
      if (
        webSiteOfThisCreatorUpdate &&
        !webSiteOfThisCreatorUpdate.startsWith("https://")
      ) {
        return toast.error(
          "Le lien du site officiel doit commencer par 'https://'"
        );
      }

      // Vérifiez que releaseDateUpdate est un objet Date valide
      if (
        !(releaseDateUpdate instanceof Date) ||
        isNaN(releaseDateUpdate.getTime())
      ) {
        return toast.error("Vous devez sélectionner une date de sortie.");
      }

      // Vérification de la date de sortie
      if (releaseDateUpdate) {
        const releaseDateUpdateString =
          releaseDateUpdate.toLocaleDateString("fr-FR"); // Format de la date en français
        const datePattern = /^\d{2}\/\d{2}\/\d{4}$/; // Expression régulière pour jj/mm/aaaa

        if (!datePattern.test(releaseDateUpdateString)) {
          return toast.error(
            "La date de sortie doit être au format jj/mm/aaaa (ex: 17/05/2025)"
          );
        }
      } else {
        return toast.error("Vous devez sélectionner une date de sortie.");
      }

      // Vérifiez si le site Steam commence par "https://"
      if (
        steamLinkUpdate &&
        (!steamLinkUpdate.startsWith("https://") ||
          !steamLinkUpdate.includes("steam"))
      ) {
        return toast.error(
          "Le lien vers Steam doit commencer par 'https://' et inclure steam"
        );
      }

      // Function to send the data to createIntroduction function
      const formData = new FormData();
      formData.append("gameId", gameId);
      formData.append("email", email);
      formData.append("nameOfGame", encodeURIComponent(nameOfGameUpdate));
      formData.append("shortIntroduction", he.encode(shortIntroductionUpdate));
      formData.append(
        "introductionOfTheGame",
        he.encode(introductionOfTheGameUpdate)
      );
      formData.append("platform", JSON.stringify(platformUpdate));
      formData.append("releaseDate", releaseDateUpdate);
      formData.append("urlPosterCloudinary", urlPosterCloudinaryUpdate);
      formData.append("SoloMulti", JSON.stringify(soloMultiUpdate));
      formData.append("selectedAgePegi", selectedAgePegiUpdate);
      formData.append("selectedAdditionalPegi", selectedAdditionalPegiUpdate);
      formData.append("genreOfGame", JSON.stringify(genreOfGameUpdate));
      formData.append("isDarkMode", isDarkModeUpdate.toString());
      formData.append("isIntroOfYourself", isIntroOfYourselfUpdate.toString());
      // Ajouts conditionnels
      if (videoLinkUpdate) {
        formData.append("videoLink", videoLinkUpdate);
      }
      if (steamLinkUpdate) {
        formData.append("steamLink", steamLinkUpdate);
      }
      if (epicGamesLinkUpdate) {
        formData.append("epicGamesLink", epicGamesLinkUpdate);
      }
      if (webSiteOfThisGameUpdate) {
        formData.append("webSiteOfThisGame", webSiteOfThisGameUpdate);
      }
      if (webSiteOfThisCreatorUpdate) {
        formData.append("webSiteOfThisCreator", webSiteOfThisCreatorUpdate);
      }
      if (urlImageOneCloudinaryUpdate) {
        formData.append("urlImageOneCloudinary", urlImageOneCloudinaryUpdate);
      }
      if (urlImageTwoCloudinaryUpdate) {
        formData.append("urlImageTwoCloudinary", urlImageTwoCloudinaryUpdate);
      }
      if (urlImageThreeCloudinaryUpdate) {
        formData.append(
          "urlImageThreeCloudinary",
          urlImageThreeCloudinaryUpdate
        );
      }
      if (urlBackgroundCloudinaryUpdate) {
        formData.append(
          "urlBackgroundCloudinary",
          urlBackgroundCloudinaryUpdate
        );
      }
      console.log("Form data:", formData);
      await updateIntroduction(formData);
      toast.success("Présentation du jeu a été mise à jour !");
      setLoading(true);
      fetchgameData();
      // Redirect
      router.replace(
        `/dynamic/introduction/${encodeURIComponent(nameOfGameUpdate)}`
      );
    } catch (error) {
      return toast.error(error.message);
    }
  };
  return (
    <form
      onSubmit={onPrepare}
      className="w-[95vw] tablet:w-[84vw] laptop:w-[95%] mx-auto border p-2 mt-4"
      style={{ backgroundColor: "rgba(148, 163, 184, 0.7)" }}
    >
      <div className="text-3xl">
        Il vous est possible de modifier la description de votre jeu
      </div>

      {/* Fond noir et Texte blanc */}
      <div className="flex justify-center w-full laptop:my-3">
        <div
          onClick={() => setIsDarkModeUpdate(!isDarkModeUpdate || "")}
          className="p-2 bg-black text-white inline-block ml-2 cursor-pointer"
        >
          Texte noir et fond blanc
        </div>
      </div>

      {/* Nom */}
      <input
        type="text"
        name="nameOfGameUpdate"
        placeholder={nameOfGameUpdate}
        className="px-3 py-2 rounded-md w-full flex-grow text-black "
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
      <EditorPerso
        introductionOfTheGame={introductionOfTheGameUpdate || ""}
        setIntroductionOfTheGame={setIntroductionOfTheGameUpdate}
        onTextChange={(newText) => {
          setIntroductionOfTheGameUpdate(newText);
        }}
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
        <p className="text-center">Choisissez l'affiche du jeu </p>
        <ImageUpload
          urlCloudinary={urlPosterCloudinaryUpdate || ""}
          setter={setUrlPosterCloudinaryUpdate}
          buttonText="Télécharger Affiche"
          tag={`Affiche - ${game.nameofgame}`}
          nameOfGame={game.nameofgame}
        />
        <div className="flex justify-center">
          <Image
            src={
              game.urlPosterCloudinary
                ? `${game.urlPosterCloudinary}`
                : `/presentation/${game.urlPoster}`
            }
            className="lg:w-[192px] lg:h-[311px] py-3 mt-3 inline-block "
            width={192}
            height={311}
            alt={`${game.nameofgame}`}
            unoptimized={true}
          />
        </div>
      </div>

      <section className="flex flex-col tablet:flex-row w-full gap-2 justify-center">
        {/* Image d'illustration n°1 [encadré] */}
        <div className="w-[95%] tablet:w-[30%] p-1 pl-2 mt-4 border grasFondBleu flex flex-col">
          <p className="text-center ">Choisissez l'image d'illustration n°1 </p>
          <ImageUpload
            urlCloudinary={urlImageOneCloudinaryUpdate || ""}
            setter={setUrlImageOneCloudinaryUpdate}
            buttonText="Télécharger l'image n°1"
            tag={`Image d'illustration n°1 - ${nameOfGameUpdate}`}
            nameOfGame={nameOfGameUpdate}
          />
          <Image
            src={urlImageOneCloudinaryUpdate || ""}
            className="w-[275px] h-[154px] py-3 inline-block"
            width={275}
            height={154}
            alt={urlImageOneCloudinaryUpdate ? `urlImageOne` : ""}
            unoptimized={true}
          />
        </div>

        {/* Image d'illustration n°2 [encadré] */}
        <div className="w-[95%] tablet:w-[30%] p-1 pl-2 mt-4 border grasFondBleu flex flex-col">
          <p className="text-center tablet:inline-block">
            Choisissez l'image d'illustration n°2{" "}
          </p>
          <ImageUpload
            urlCloudinary={urlImageTwoCloudinaryUpdate || ""}
            setter={setUrlImageTwoCloudinaryUpdate}
            buttonText="Télécharger l'image n°2"
            tag={`Image d'illustration n°2 - ${nameOfGameUpdate}`}
            nameOfGame={nameOfGameUpdate}
          />
          <Image
            src={urlImageTwoCloudinaryUpdate || ""}
            className="w-[275px] h-[154px] py-3 inline-block"
            width={275}
            height={154}
            alt={urlImageTwoCloudinaryUpdate ? `urlImageTwo` : ""}
            unoptimized={true}
          />
        </div>

        {/* Image d'illustration n°3 [encadré] */}
        <div className="w-[95%] tablet:w-[30%] p-1 pl-2 mt-4 border grasFondBleu flex flex-col">
          <p className="text-center tablet:inline-block">
            Choisissez l'image d'illustration n°3{" "}
          </p>
          <ImageUpload
            urlCloudinary={urlImageThreeCloudinaryUpdate || ""}
            setter={setUrlImageThreeCloudinaryUpdate}
            buttonText="Télécharger l'image n°3"
            tag={`Image d'illustration n°3`}
            nameOfGame={nameOfGameUpdate}
          />
          <Image
            src={urlImageThreeCloudinaryUpdate || ""}
            className="w-[275px] h-[154px] py-3 inline-block"
            width={275}
            height={154}
            alt={urlImageThreeCloudinaryUpdate ? `urlImageThree` : ""}
            unoptimized={true}
          />
        </div>
      </section>

      {/* Arrière plan [encadré] */}
      <div className="w-[95%] tablet:w-[40%] p-1 pl-2 mt-4 border grasFondBleu flex flex-col item-center mx-auto">
        <p className="text-center tablet:inline-block">
          Choisissez une image pour l'arrière plan{" "}
        </p>
        <ImageUpload
          urlCloudinary={urlBackgroundCloudinaryUpdate || ""}
          setter={setUrlBackgroundCloudinaryUpdate}
          buttonText="Télécharger Background"
          tag="Background"
          nameOfGame={nameOfGameUpdate}
        />
        <Image
          src={urlBackgroundCloudinaryUpdate || ""}
          className="w-[275px] h-[154px] py-3 mx-auto"
          width={275}
          height={154}
          alt={urlBackgroundCloudinaryUpdate ? `Background Image` : ""}
          unoptimized={true}
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

      {/**************** Ajout de la biographie du créateur [encadré] ***************************** */}
      <div className="flex justify-center">
        <div
          className="grasFondBleuborder border-black p-2 inline-block mt-3 mb-3 rounded-md font-bold text-white cursor-pointer"
          onClick={() => setIsIntroOfYourselfUpdate(!isIntroOfYourselfUpdate)}
        >
          Souhaitez-vous ajouter la présentation de vous-même ou de votre équipe
          ?
        </div>
      </div>

      {/* Bouton d'envoi */}
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
          } /* Désactivé si les champs sont vides */
        >
          Mettre à jour la présentation
        </button>
      </div>
    </form>
  );
};

export default UpdateIntro;
