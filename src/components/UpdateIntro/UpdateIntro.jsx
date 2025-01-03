// components/GamePresentationSections/GamePresentationSections.js
import { useEffect, useState } from "react";

import React from "react";
import EditorPerso from "@/components/EditorPerso/EditorPerso";
import Platform from "@/components/Platform/Platform";
import Pegi from "@/components/Pegi/Pegi";
import ButtonSoloMulti from "@/components/ButtonSoloMulti/ButtonSoloMulti";
import GenreOfGame from "../GenreOfGame/GenreOfGame";
import DatePicker from "react-datepicker";
import { ImageUpload } from "@/components/ImageUpload/ImageUpload";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";

const UpdateIntro = ({ game }) => {

  const [shortIntroductionUpdate, setShortIntroductionUpdate] = useState();
  const [introductionOfTheGameUpdate, setIntroductionOfTheGameUpdate] = useState();
  const [platformUpdate, setPlatformUpdate] = useState([]);
  const [releaseDate, setReleaseDate] = useState();
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
console.log(`Dans la page UpdateIntro, genreOfGameUpdate : `, genreOfGameUpdate);
console.log(`Dans la page UpdateIntro, game.genreOfGame : `, game.genreOfGame);
  useEffect(() => {
    if (game && game.shortIntroduction) { setShortIntroductionUpdate(game.shortIntroduction); }
    if (game && game.introductionOfTheGame) { setIntroductionOfTheGameUpdate(game.introductionOfTheGame); }
    if (game && game.platform) { setPlatformUpdate(game.platform); }
    if (game && game.selectedAgePegi) { setSelectedAgePegiUpdate(game.selectedAgePegi); }
    if (game && game.selectedAdditionalPegi) { setSelectedAdditionalPegiUpdate(game.selectedAdditionalPegi); }
    if (game && game.SoloMulti) { setSoloMultiUpdate(game.SoloMulti); }
    if (game && game.urlPosterCloudinary) { setUrlPosterCloudinaryUpdate(game.urlPosterCloudinary); }
    if (game && !game.urlPosterCloudinary) { setUrlPosterCloudinaryUpdate(game.urlPoster); }
    if (game && game.urlImageOneCloudinary) { setUrlImageOneCloudinaryUpdate(game.urlImageOneCloudinary); }
    if (game && game.urlImageTwoCloudinary) { setUrlImageTwoCloudinaryUpdate(game.urlImageTwoCloudinary); }
    if (game && game.urlImageThreeCloudinary) { setUrlImageThreeCloudinaryUpdate(game.urlImageThreeCloudinary); }
    if (game && game.urlBackgroundCloudinary) { setUrlBackgroundCloudinaryUpdate(game.urlBackgroundCloudinary); }
    if (game && game.videoLink) { setVideoLinkUpdate(game.videoLink); }
    if (game && game.webSiteOfThisGame) { setWebSiteOfThisGameUpdate(game.webSiteOfThisGame); }
    if (game && game.webSiteOfThisCreator) { setWebSiteOfThisGameUpdate(game.webSiteOfThisCreator); }
    if (game && game.steamLink) { setSteamLinkUpdate(game.steamLink); }
    if (game && game.epicGamesLink) { setEpicGamesLinkUpdate(game.epicGamesLink); }
    if (game && game.genreOfGame) { setGenreOfGameUpdate(game.genreOfGame); }
  }, [game]);
  return (
    <section className="mt-4">
        <div className="text-4xl">Il vous est possible de modifier la description de votre jeu</div>
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
          value={shortIntroductionUpdate || ""}
          onChange={(e) => setShortIntroductionUpdate(e.target.value)}
        />
      </div>
      {/* Présentation détaillée */}
      <EditorPerso
        introductionOfTheGame={game.content || ""}
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
          selected={releaseDate}
          dateFormat="dd/MM/yyyy"
          id="releaseDate"
          required
          onChange={(date) => setReleaseDate(date)}
        />
      </div>

         {/* PEGI */}
        <Pegi selectedAgePegi={selectedAgePegiUpdate} setSelectedAgePegi={setSelectedAgePegiUpdate}
            selectedAdditionalPegi={selectedAdditionalPegiUpdate} setSelectedAdditionalPegi={setSelectedAdditionalPegiUpdate}
        />

        {/* Solo ou Multi */}
        <ButtonSoloMulti SoloMulti={soloMultiUpdate || ""} setSoloMulti={setSoloMultiUpdate} />

        {/* Affiche [encadré] */}
        <div className="w-[95%] tablet:w-[380px] p-4 mt-4 border grasFondBleu mx-auto">
            <p className="text-center">Choisissez l'affiche du jeu </p>
            <ImageUpload
                urlCloudinary={urlPosterCloudinaryUpdate || ""}
                setter={setUrlPosterCloudinaryUpdate}
                buttonText="Télécharger Affiche"
                tag={`Affiche - ${game.nameOfGame}`}
                nameOfGame={game.nameOfGame}
            />
            <div className="flex justify-center">
                <Image
                    src={game.urlPosterCloudinary ? `${game.urlPosterCloudinary}` : `/presentation/${game.urlPoster}`}
                    className="lg:w-[192px] lg:h-[311px] py-3 mt-3 inline-block "
                    width={192}
                    height={311}
                    alt={`${game.nameOfGame}`}
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
                    tag={`Image d'illustration n°1 - ${game.nameOfGame}`}
                    nameOfGame={game.nameOfGame}
                />
                <Image
                    src={urlImageOneCloudinaryUpdate || ""}
                    className="w-[275px] h-[154px] py-3 inline-block"
                    width={275}
                    height={154}
                    alt={`urlImageOne - ${game.nameOfGame}`}
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
                    tag={`Image d'illustration n°2 - ${game.nameOfGame}`}
                    nameOfGame={game.nameOfGame}
                />
                <Image
                    src={urlImageTwoCloudinaryUpdate || ""}
                    className="w-[275px] h-[154px] py-3 inline-block"
                    width={275}
                    height={154}
                    alt={`${game.nameOfGame}`}
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
                    tag={`Image d'illustration n°3 - ${game.nameOfGame}`}
                    nameOfGame={game.nameOfGame}
                />
                <Image
                    src={urlImageThreeCloudinaryUpdate || ""}
                    className="w-[275px] h-[154px] py-3 inline-block"
                    width={275}
                    height={154}
                    alt={`${game.nameOfGame}`}
                    unoptimized={true}
                />
            </div>

            {/* Arrière plan [encadré] */}
            <div className="w-[95%] tablet:w-[60%] p-1 pl-2 mt-4 border grasFondBleu">
            <p className="text-center tablet:inline-block">
            Choisissez une image pour l'arrière plan{" "}
            </p>
            <ImageUpload
                urlCloudinary={urlBackgroundCloudinaryUpdate || ""}
                setter={setUrlBackgroundCloudinaryUpdate}
                buttonText="Télécharger Background"
                tag="Background"
                nameOfGame={game.nameOfGame}
            />
            <Image
                src={urlBackgroundCloudinaryUpdate || ""}
                className="w-[275px] h-[154px] py-3 inline-block"
                width={275}
                height={154}
                alt={`${game.nameOfGame}`}
                unoptimized={true}
            />
            </div>
        </section>

        {/* Lien vidéo Youtube [encadré] */}
        <section className="flex flex-col justify-center items-center border rounded-md my-4 py-4">
            <p>Lien Vidéo Youtube</p>
            <input
                type="url"
                name="videoLinkUpdate"
                placeholder="Lien YouTube de la vidéo"
                className="block w-[95%] tablet:w-[60%] p-1 pl-2 m-2 text-black"
                value={videoLinkUpdate || ""}
                onChange={(e) => setVideoLink(e.target.value)}
            />
            {videoLinkUpdate &&
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
            }
        </section>

        <section>
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
    </section>
  );
};

export default UpdateIntro;
