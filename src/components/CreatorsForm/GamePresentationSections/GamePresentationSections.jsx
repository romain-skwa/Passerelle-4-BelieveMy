// components/GamePresentationSections/GamePresentationSections.js

import React from "react";
import EditorPerso from "@/components/CreatorsForm/GamePresentationInside/EditorPerso/EditorPerso";
import Platform from "../GamePresentationInside/Platform/Platform";
import Pegi from "@/components/CreatorsForm/GamePresentationInside/Pegi/Pegi";
import ButtonSoloMulti from "@/components/CreatorsForm/GamePresentationInside/ButtonSoloMulti/ButtonSoloMulti";
import GenreOfGame from "../GamePresentationInside/GenreOfGame/GenreOfGame";
import DatePicker from "react-datepicker";
import { ImageUpload } from "@/components/ImageUpload/ImageUpload";
import Image from "next/image";

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
  urlImageOne,
  setUrlImageOne,
  urlImageTwo,
  setUrlImageTwo,
  urlImageThree,
  setUrlImageThree,
  urlPosterCloudinary,
  setUrlPosterCloudinary,
  urlBackgroundCloudinary,
  setUrlBackgroundCloudinary,
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
}) => {
  return (
    <div className="neuphormismFormularyIntroductionGame w-full mb-4 rounded-lg">
      
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
          Cette introduction courte sera affichée en gras
        </p>
        <textarea
          name="shortIntroduction"
          id="shortIntroduction"
          placeholder="Cette introduction courte sera affichée en gras"
          value={shortIntroduction}
          onChange={(e) => setShortIntroduction(e.target.value)}
          className='text-white neuphormismUndergroung'
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
            Date de sortie :
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

        <div className="w-[95%] tablet:w-[260px] p-4 mt-4 grasFondBleu mx-auto rounded-2xl">
          <p className="text-center">Choisissez l'affiche du jeu </p>
          <ImageUpload
            urlCloudinary={urlPosterCloudinary}
            setter={setUrlPosterCloudinary}
            buttonText="Télécharger Affiche"
            tag={`Affiche - ${nameOfGame}`}
            nameOfGame={nameOfGame}
          />
          {urlPosterCloudinary && (
            <div className="flex justify-center">
              <Image
                src={urlPosterCloudinary}
                className="lg:w-[192px] lg:h-[311px] py-3 mt-3 inline-block "
                width={192}
                height={311}
                alt={`${nameOfGame}`}
                unoptimized={true}
              />
            </div>
          )}
        </div>

      <section className="flex flex-col tablet:flex-row w-[100%] justify-center  ">
        {/**************** Image d'illustration n°1 [encadré] ***************************** */}

          <div className="w-[95%] tablet:w-[28%] p-2 mx-auto mt-4 grasFondBleu flex flex-col rounded-2xl">
            <p className="text-center ">
              Choisissez l'image d'illustration n°1{" "}
            </p>
            <ImageUpload
              urlCloudinary={urlImageOne}
              setter={setUrlImageOne}
              buttonText="Télécharger l'image n°1"
              tag={`Image d'illustration n°1 - ${nameOfGame}`}
              nameOfGame={nameOfGame}
            />
            {urlImageOne && (
              <Image
                src={urlImageOne}
                className="w-[275px] h-[154px] py-3 inline-block"
                width={275}
                height={154}
                alt={`urlImageOne - ${nameOfGame}`}
                unoptimized={true}
              />
            )}
          </div>

        {/**************** Image d'illustration n°2 [encadré] ***************************** */}
          <div className="w-[95%] tablet:w-[28%] p-2 mx-auto mt-4 grasFondBleu flex flex-col rounded-2xl">
            <p className="text-center tablet:inline-block">
              Choisissez l'image d'illustration n°2{" "}
            </p>
            <ImageUpload
              urlCloudinary={urlImageTwo}
              setter={setUrlImageTwo}
              buttonText="Télécharger l'image n°2"
              tag={`Image d'illustration n°2 - ${nameOfGame}`}
              nameOfGame={nameOfGame}
            />
            {urlImageTwo && (
              <Image
                src={urlImageTwo}
                className="w-[275px] h-[154px] py-3 inline-block"
                width={275}
                height={154}
                alt={`${nameOfGame}`}
                unoptimized={true}
              />
            )}
          </div>

        {/**************** Image d'illustration n°3 [encadré] ***************************** */}
          <div className="w-[95%] tablet:w-[28%] p-2 mx-auto mt-4 grasFondBleu flex flex-col rounded-2xl">
            <p className="text-center tablet:inline-block">
              Choisissez l'image d'illustration n°3{" "}
            </p>
            <ImageUpload
              urlCloudinary={urlImageThree}
              setter={setUrlImageThree}
              buttonText="Télécharger l'image n°3"
              tag={`Image d'illustration n°3 - ${nameOfGame}`}
              nameOfGame={nameOfGame}
            />
            {urlImageThree && (
              <Image
                src={urlImageThree}
                className="w-[275px] h-[154px] py-3 inline-block"
                width={275}
                height={154}
                alt={`${nameOfGame}`}
                unoptimized={true}
              />
            )}
          </div>
      </section>

      {/**************** Arrière plan [encadré] ***************************** */}
        <div className="w-[90%] largeScreen:w-[100%] p-2 mx-auto mt-4 grasFondBleu">
          <p className="text-center ">
            Choisissez une image pour l'arrière plan{" "}
          </p>
          <ImageUpload
            urlCloudinary={urlBackgroundCloudinary}
            setter={setUrlBackgroundCloudinary}
            buttonText="Télécharger Background"
            tag="Background"
            nameOfGame={nameOfGame}
          />
        </div>
      
      <section className="flex flex-col items-center">
        {/**************** Lien vidéo Youtube [encadré] ***************************** */}
          <input
            type="url"
            name="videoLink"
            placeholder="Lien YouTube de la vidéo"
            className="neuphormismUndergroung inputLink"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
          />

        {/**************** Lien Site officiel du jeu [encadré] ***************************** */}
          <input
            type="url"
            name="webSiteOfThisGame"
            placeholder="Lien vers le site officiel du jeu"
            className="neuphormismUndergroung inputLink mx-2 tablet:mx-4"
            value={webSiteOfThisGame}
            onChange={(e) => setWebSiteOfThisGame(e.target.value)}
          />

        {/**************** Lien Site officiel des créateurs [encadré] ***************************** */}
          <input
            type="url"
            name="webSiteOfThisCreator"
            placeholder="Lien vers le site officiel du/des créateur(s)"
            className="neuphormismUndergroung inputLink"
            value={webSiteOfThisCreator}
            onChange={(e) => setWebSiteOfThisCreator(e.target.value)}
          />

        {/**************** Lien Steam [encadré] ***************************** */}
          <input
            type="url"
            name="steamLink"
            placeholder="Lien vers le site Steam"
            className="neuphormismUndergroung inputLink"
            value={steamLink}
            onChange={(e) => setSteamLink(e.target.value)}
          />

        {/**************** Lien Epic Games [encadré] ***************************** */}
          <input
            type="url"
            name="epicGamesLink"
            placeholder="Lien vers le site Epic Games"
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
    </div>
  );
};

export default GamePresentationSections;
