// components/GamePresentationSections/GamePresentationSections.js

import React from 'react';
import EditorPerso from "@/components/EditorPerso/EditorPerso";
import Platform from "../Platform/Platform";
import Pegi from "@/components/Pegi/Pegi";
import ButtonSoloMulti from "@/components/ButtonSoloMulti/ButtonSoloMulti";
import GenreOfGame from "../GenreOfGame/GenreOfGame";
//import ImageUpload from "../ImageUpload/ImageUpload";
import DatePicker from "react-datepicker";
import { ImageUpload } from "@/components/ImageUpload/ImageUpload";
import Image from "next/image";
import { useEffect } from 'react';

const GamePresentationSections = ({
  nameOfGame,
  isShortIntroVisible,
  shortIntroduction,
  setShortIntroduction,
  isEditorVisible,
  introductionOfTheGame,
  setIntroductionOfTheGame,
  isPlatformVisible,
  platform,
  setPlatform,
  isReleaseDateVisible,
  releaseDate,
  setReleaseDate,
  isPegiAgeVisible,
  selectedAgePegi,
  setSelectedAgePegi,
  selectedAdditionalPegi,
  setSelectedAdditionalPegi,
  isSoloMulti,
  SoloMulti,
  setSoloMulti,
  isPosterVisible,
  isImageOne, urlImageOne, setUrlImageOne,
  isImageTwo, urlImageTwo, setUrlImageTwo,
  isImageThree, urlImageThree, setUrlImageThree,
  urlPosterCloudinary,
  setUrlPosterCloudinary,
  isBackgroundVisible,
  urlBackgroundCloudinary,
  setUrlBackgroundCloudinary,
  isVideoVisible,
  videoLink,
  setVideoLink,
  isWebsiteGameVisible,
  webSiteOfThisGame,
  setWebSiteOfThisGame,
  isWebsiteCreatorVisible,
  webSiteOfThisCreator,
  setWebSiteOfThisCreator,
  isSteamLinkVisible,
  steamLink,
  setSteamLink,
  isEpicGamesLinkVisible,
  epicGamesLink,
  setEpicGamesLink,
  isCategoryVisible,
  genreOfGame,
  setGenreOfGame,
}) => {

  return (
      
    <div>
      {/**************** Introduction courte ***************************** */}
      {isShortIntroVisible && (
        <div className="border p-2 my-2">
          <p className="text-white text-center font-bold mb-3" style={{ textShadow: "2px 2px 7px rgba(0, 0, 0, 1)" }}>
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
          <p className="text-white font-bold mr-2" style={{ textShadow: "2px 2px 7px rgba(0, 0, 0, 1)" }}>
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
      
      {/**************** Affiche [encadré] ***************************** */}
      {isPosterVisible && (
        <div className="w-[95%] tablet:w-[380px] p-4 mt-4 border grasFondBleu mx-auto">
          <p className="text-center">
            Choisissez l'affiche du jeu{" "}
          </p>
          <ImageUpload 
            urlCloudinary={urlPosterCloudinary}
            setter={setUrlPosterCloudinary}
            buttonText="Télécharger Affiche" 
            tag={`Affiche - ${nameOfGame}`}
            nameOfGame={nameOfGame}
          />
          {urlPosterCloudinary && (
            <div className='flex justify-center'>
              <Image
                src={urlPosterCloudinary}
                className="lg:w-[192px] lg:h-[311px] py-3 mt-3 inline-block "
                width={192}
                height={311}
                alt={`${nameOfGame}`}
              />
            </div>
          )}
        </div>
      )}

      <section className='flex flex-col tablet:flex-row w-full gap-2 justify-center'>
        {/**************** Image d'illustration n°1 [encadré] ***************************** */}
        {isImageOne && (
          <div className="w-[95%] tablet:w-[30%] p-1 pl-2 mt-4 border grasFondBleu flex flex-col">
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
              />
            )}
          </div>
        )}

        {/**************** Image d'illustration n°2 [encadré] ***************************** */}
        {isImageTwo && (
          <div className="w-[95%] tablet:w-[30%] p-1 pl-2 mt-4 border grasFondBleu flex flex-col">
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
              />
            )}
          </div>
        )}

        {/**************** Image d'illustration n°3 [encadré] ***************************** */}
        {isImageThree && (
          <div className="w-[95%] tablet:w-[30%] p-1 pl-2 mt-4 border grasFondBleu flex flex-col">
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
              />
            )}
          </div>
        )}
      </section>

      {/**************** Arrière plan [encadré] ***************************** */}
      {isBackgroundVisible && (
        <div className="w-[95%] tablet:w-[60%] p-1 pl-2 mt-4 border grasFondBleu">
          <p className="text-center tablet:inline-block">
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
      )}

      {/**************** Lien vidéo Youtube [encadré] ***************************** */}
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

      {/**************** Lien Site officiel du jeu [encadré]***************************** */}
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

      {/**************** Lien Site officiel des créateurs [encadré] ***************************** */}
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

      {/**************** Lien Steam [encadré] ***************************** */}
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

      {/**************** Lien Epic Games [encadré] ***************************** */}
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
      
      {/**************** Catégories [encadré] ***************************** */}
      {isCategoryVisible && (
        <GenreOfGame
          selectedGenres={genreOfGame}
          setSelectedGenres={setGenreOfGame}
        />
      )}
    </div>
  );
};

export default GamePresentationSections;