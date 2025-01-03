// ApercuFormulaire.js
import React, { useState } from "react";
import "../../app/styles/components.css";
import "../../app/styles/introduction.css";
import Image from "next/image";
import logoPegi3 from "/public/logo/pegi_3.jpg";
import logoPegi7 from "/public/logo/pegi_7.jpg";
import logoPegi12 from "/public/logo/pegi_12.jpg";
import logoPegi16 from "/public/logo/pegi_16.jpg";
import logoPegi18 from "/public/logo/pegi_18.jpg";
import logoPegiSexe from "/public/logo/pegi_sexe.jpg";
import logoPegiOnline from "/public/logo/pegi_online.jpg";
import logoPegiNudite from "/public/logo/pegi_nudite.jpg";
import logoPegiJeuxHasard from "/public/logo/pegi_jeuxHasard.jpg";
import logoPegiViolence from "/public/logo/pegi_violence.jpg";
import logoPegiLangageGrossier from "/public/logo/pegi_langageGrossier.jpg";
import logoPegiPeur from "/public/logo/pegi_peur.jpg";
import logoPegiDrogue from "/public/logo/pegi_drogue.jpg";
import logoPegiDiscrimination from "/public/logo/pegi_discrimination.jpg";
import iconeSteam from "/public/icons/steam-icon.png";
import iconeEpicGames from "/public/icons/epicGamesIcon.png";
import PlayerSolo from "/public/icons/solo.png";
import MultiPlayersLocal from "/public/icons/multiLocal.png";
import MultiPlayersOnline from "/public/icons/muliOnline.jpg";

const pegiImages = {
  3: { src: logoPegi3, title: "Pegi 3" },
  7: { src: logoPegi7, title: "Pegi 7" },
  12: { src: logoPegi12, title: "Pegi 12" },
  16: { src: logoPegi16, title: "Pegi 16" },
  18: { src: logoPegi18, title: "Pegi 18" },
  "Jeux de Hasard": { src: logoPegiJeuxHasard, title: "Jeux de Hasard" },
  Violence: { src: logoPegiViolence, title: "Violence" },
  "Langage Grossier": {
    src: logoPegiLangageGrossier,
    title: "Langage Grossier",
  },
  Peur: { src: logoPegiPeur, title: "Peur" },
  Sexe: { src: logoPegiSexe, title: "Sexe" },
  Online: { src: logoPegiOnline, title: "Online" },
  Nudité: { src: logoPegiNudite, title: "Nudité" },
  Drogue: { src: logoPegiDrogue, title: "Drogue" },
  Discrimination: { src: logoPegiDiscrimination, title: "Discrimination" },
};
const ApercuFormulaire = ({
  introductionOfTheGame,
  nameOfGame,
  isDarkMode,
  selectedAgePegi,
  selectedAdditionalPegi,
  shortIntroduction,
  releaseDate,
  platform,
  urlPosterCloudinary,
  genreOfGame,
  videoLink,
  webSiteOfThisGame,
  webSiteOfThisCreator,
  steamLink,
  epicGamesLink,
  SoloMulti,
  urlImageOne,
  urlImageTwo,
  urlImageThree,
}) => {
  const [clickedDivision, setClickedDivision] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  // Formatage de la date
  const formattedDate = releaseDate
    ? new Date(releaseDate).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  // Liste des modes de jeu
  const SoloMultis = [
    { genre: "Solo", icon: PlayerSolo },
    { genre: "Multijoueur local", icon: MultiPlayersLocal },
    { genre: "Multijoueur en ligne", icon: MultiPlayersOnline },
  ];
  const displayOrder = ["Solo", "Multijoueur local", "Multijoueur en ligne"];
  return (
    <>
      <section
        className={`w-[95vw] md:w-[75vw] xl:w-[50vw] mx-auto rounded-md p-4 neuphormism mt-4 ${
          isDarkMode ? "text-white bg-[#121212]" : "text-black bg-white"
        } `}
      >
        <h3>Aperçu de la présentation de votre jeu :</h3>

        <div className="flex justify-center">
          <div className={`p-4 min-h-[50px] text-3xl font-bold text-center`}>
            {nameOfGame}
          </div>
        </div>

        {/**************** Affichage des plate-formes PC et Consoles *******************/}
        {platform && (
          <div className={` flex justify-center gap-2 items-center `}>
            {platform.map((plat, index) => (
              <div
                key={index}
                className={`buttonPlatform ${
                  isDarkMode
                    ? "text-white border border-white"
                    : "text-black border-2 border-gray-700 "
                } `}
              >
                {plat}
              </div>
            ))}
          </div>
        )}

        {/********************************** PEGI *******************************************************************************/}
        <div
          className={`w-[95%] my-4 mx-auto flex align-middle gap-1  ${
            selectedAdditionalPegi.length > 0
              ? "justify-between"
              : "justify-center"
          } `}
        >
          {/**************** Affichage des images PEGI Age *******************/}
          <div className={` flex justify-center gap-1 `}>
            {selectedAgePegi && (
              <div>
                <Image
                  src={pegiImages[selectedAgePegi].src}
                  alt={pegiImages[selectedAgePegi].title}
                  title={pegiImages[selectedAgePegi].title}
                  width={50}
                  height={50}
                  unoptimized={true}
                />
              </div>
            )}
          </div>

          {/**************** Affichage des PEGI Catégories (Violence, Multijoueur) *******************/}
          <div className={`flex gap-1`}>
            {selectedAdditionalPegi &&
              Array.isArray(selectedAdditionalPegi) &&
              selectedAdditionalPegi.length > 0 &&
              selectedAdditionalPegi.map((pegi, index) => {
                const pegiData = pegiImages[pegi]; // Récupère l'image et le titre
                return pegiData ? (
                  <Image
                    key={index}
                    src={pegiData.src}
                    alt={pegiData.title}
                    title={pegiData.title} 
                    width={50} 
                    height={50} 
                    unoptimized={true}
                  />
                ) : null; // Si aucune image n'est trouvée, ne rien afficher
              })}
          </div>
        </div>

        {/******************* Affichage des catégories **********************/}
        {genreOfGame && (
          <div className={` flex justify-center gap-2 items-center `}>
            {genreOfGame.map((genre, index) => (
              <div
                key={index}
                style={{
                  fontSize: "15px",
                  padding: "0px 4px 0px",
                  letterSpacing: "0.1rem",
                }}
                className={`inline-flex items-center rounded-md 
                  ${
                    isDarkMode == true
                      ? "border border-white"
                      : "border-2 border-gray-700 "
                  } 
                  `}
              >
                {genre}
              </div>
            ))}
          </div>
        )}

        {/******************* Solo / Multi ******************************/}
        {SoloMulti && SoloMulti.length > 0 && (
          <div className="buttonSoloMulti-container">
            {SoloMulti.slice()
              .sort((a, b) => displayOrder.indexOf(a) - displayOrder.indexOf(b)) // Trier selon l'ordre défini
              .map((genre) => {
                const icon = SoloMultis.find(
                  (item) => item.genre === genre
                )?.icon; // Trouver l'icône correspondante
                return (
                  <div
                    key={genre}
                    className="buttonSoloMulti"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                    }}
                  >
                    <span style={{ marginRight: "10px" }}>{genre}</span>
                    {icon && (
                      <img
                        src={icon.src}
                        alt={genre}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "10px",
                        }}
                      />
                    )}
                  </div>
                );
              })}
          </div>
        )}
        {/******************* Petite introduction en gras ******************************/}
        <div className={`p-4 min-h-[50px] font-bold mx-4 `}>
          {shortIntroduction}
        </div>

        {/********************** Description détaillée *********************************/}
        <div
          className={`p-4 min-h-[50px]`}
          dangerouslySetInnerHTML={{ __html: introductionOfTheGame }}
        />

        {/******************* Vidéo youtube **********************/}
        {videoLink && (
          <div className="flex justify-center">
            <iframe
              width="560"
              height="315"
              src={
                videoLink.includes("watch?v=")
                  ? videoLink.replace("watch?v=", "embed/")
                  : videoLink
              }
              allowFullScreen
            ></iframe>
          </div>
        )}

        <section className="mt-4 flex flex-col laptop:flex-row laptop:justify-center gap-6">
          {/******************* Site officiel du jeu **********************/}
          {webSiteOfThisGame && (
            <div className="font-semibold border-2 border-black py-2 px-4 rounded-3xl w-[170px] mx-auto laptop:m-0">
              <a
                href={webSiteOfThisGame}
                target="_blank"
                rel="noopener noreferrer"
              >
                Site officiel du jeu
              </a>
            </div>
          )}
          {/******************* Site officiel des créateurs **********************/}
          {webSiteOfThisCreator && (
            <div className="font-semibold border-2 border-black py-2 px-4 rounded-3xl w-[220px] mx-auto laptop:m-0">
              <a
                href={webSiteOfThisCreator}
                target="_blank"
                rel="noopener noreferrer"
              >
                Site officiel des créateurs
              </a>
            </div>
          )}
        </section>

        {/******************* Logo Steam & EpicGames **********************/}
        <section className="pt-6 flex justify-center gap-6">
          {steamLink && (
            <>
              <a href={steamLink} target="_blank" rel="noopener noreferrer">
                <Image
                  src={iconeSteam}
                  width={50}
                  height={50}
                  className="w-[50px] h-[50px] hover:scale-105 transition duration-300"
                  alt="Steam"
                  unoptimized={true}
                />
              </a>
            </>
          )}

          {epicGamesLink && (
            <>
              <a href={epicGamesLink} target="_blank" rel="noopener noreferrer">
                <Image
                  src={iconeEpicGames}
                  width={50}
                  height={50}
                  className="w-[40px] mt-[2px] h-[45px] hover:scale-105 transition duration-300"
                  alt="Steam"
                  unoptimized={true}
                />
              </a>
            </>
          )}
        </section>

        {/******************* Date de sortie du jeu **********************/}
        <div className={`p-4 pr-6 min-h-[50px] text-right`}>
          Sortie le {formattedDate}.
        </div>
        {/************** Les images d'illustration **********************/}
        <section className="flex gap-2 justify-center">
          {urlImageOne && (
            <Image
              src={urlImageOne}
              className="w-[275px] h-[154px] py-3 inline-block"
              width={275}
              height={154}
              unoptimized={true}
              alt={`urlImageOne - ${nameOfGame}`}
              onClick={() => openModal(urlImageOne)}
            />
          )}
          {urlImageTwo && (
            <Image
              src={urlImageTwo}
              className="w-[275px] h-[154px] py-3 inline-block"
              width={275}
              height={154}
              unoptimized={true}
              alt={`${nameOfGame}`}
              onClick={() => openModal(urlImageTwo)}
            />
          )}
          {urlImageThree && (
            <Image
              src={urlImageThree}
              className="w-[275px] h-[154px] py-3 inline-block"
              width={275}
              height={154}
              unoptimized={true}
              alt={`${nameOfGame}`}
              onClick={() => openModal(urlImageThree)}
            />
          )}
        </section>
      </section>

      {urlPosterCloudinary && (
        <section
          className={`w-[95vw] md:w-[75vw] xl:w-[50vw] mx-auto rounded-md p-4 neuphormism mt-4 ${
            isDarkMode ? "text-white bg-[#121212]" : "text-black bg-white"
          } `}
        >
          <p className="text-center">
            Affiche visible dans la page d'accueil et les résultats des recherches :
          </p>
          <Image
            src={urlPosterCloudinary}
            className="lg:w-[192px] lg:h-[311px] py-3 mx-auto"
            width={192}
            height={311}
            unoptimized={true}
            alt={`${nameOfGame}`}
          />
        </section>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
          onClick={closeModal} // Close modal when clicking on the backdrop
        >
          <div
            className="relative bg-white rounded-lg p-4"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <button
              className="absolute top-2 right-2 text-black"
              onClick={closeModal}
            >
              &times; {/* Symbole de fermeture */}
            </button>

            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Image agrandie"
                width={800}
                height={600} 
                unoptimized={true}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ApercuFormulaire;
