"use client";

// introduceYourself.js
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import updateBioCreator from "@/actions/updateBioCreator";
import formulary from "../../styles/formulary.css";
import logoDiscord from "../../../../public/logo/discord-logo.png";
import logoTwitch from "../../../../public/logo/twitch_logo.png";
import logoItchi from "../../../../public/logo/itch-io-icon.png";
import logoTwitter from "../../../../public/logo/x__twitter-logo.png";
import Loading from "@/components/Loading/Loading";
import "../../styles/formIntroYourself.css";
import TextOneByOne from "@/components/TextOneByOne/TextOneByOne";
import { useLanguage } from "@/components/LanguageContext/LanguageContext";

const introduceYourself = () => {
  const [bio, setBio] = useState("");
  const [nameOtherGames1, setNameOtherGames1] = useState("");
  const [linkOtherGame1, setLinkOtherGame1] = useState("");
  const [nameOtherGames2, setNameOtherGames2] = useState("");
  const [linkOtherGame2, setLinkOtherGame2] = useState("");
  const [nameOtherGames3, setNameOtherGames3] = useState("");
  const [linkOtherGame3, setLinkOtherGame3] = useState("");
  const [nameOtherGames4, setNameOtherGames4] = useState("");
  const [linkOtherGame4, setLinkOtherGame4] = useState("");
  const [nameOtherGames5, setNameOtherGames5] = useState("");
  const [linkOtherGame5, setLinkOtherGame5] = useState("");
  const [logoUser, setLogoUser] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [discordUrl, setDiscordUrl] = useState("");
  const [twitchUrl, setTwitchUrl] = useState("");
  const [itchIoUrl, setItchIoUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Get data about user
        const response = await fetch("/api/getAllUserDataSession", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Si nécessaire, ajoutez le corps de la requête ici
          body: JSON.stringify({
            /* données si besoin */
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Une erreur est survenue");
        }

        const data = await response.json();
        setUser(data.user);

        // **Modification ici : initialisez isDarkMode en fonction des données utilisateur**
        if (data.user.isDarkMode !== undefined) {
          // Radiobox will be checked automatically
          setIsDarkMode(data.user.isDarkMode); // Utilisez la valeur existante
        } else {
          setIsDarkMode(false); // Si isDarkMode n'existe pas, on le met à false
        }

        // Si elles existent, les données concernant l'utilisateur sont affichées dans les champs de texte
        if (data.user.bio) {
          setBio(data.user.bio);
        }
        if (data.user.nameOtherGames1) {  setNameOtherGames1(data.user.nameOtherGames1);}
        if (data.user.linkOtherGame1) { setLinkOtherGame1(data.user.linkOtherGame1); }
        if (data.user.nameOtherGames2) { setNameOtherGames2(data.user.nameOtherGames2); }
        if (data.user.linkOtherGame2) { setLinkOtherGame2(data.user.linkOtherGame2); }
        if (data.user.nameOtherGames3) { setNameOtherGames3(data.user.nameOtherGames3); }
        if (data.user.linkOtherGame3) { setLinkOtherGame3(data.user.linkOtherGame3); }
        if (data.user.nameOtherGames4) { setNameOtherGames4(data.user.nameOtherGames4); }
        if (data.user.linkOtherGame4) { setLinkOtherGame4(data.user.linkOtherGame4); }
        if (data.user.nameOtherGames5) { setNameOtherGames5(data.user.nameOtherGames5); }
        if (data.user.linkOtherGame5) { setLinkOtherGame5(data.user.linkOtherGame5); }
        if (data.user.websiteUrl) { setWebsiteUrl(data.user.websiteUrl); }
        if (data.user.discordUrl) { setDiscordUrl(data.user.discordUrl); }
        if (data.user.twitchUrl) { setTwitchUrl(data.user.twitchUrl); }
        if (data.user.itchIoUrl) { setItchIoUrl(data.user.itchIoUrl); }
        if (data.user.twitterUrl) { setTwitterUrl(data.user.twitterUrl); }
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Envoyez les données à la fonction pour mettre à jour les informations de l'utilisateur
      await updateBioCreator(
        bio,
        logoUser,
        websiteUrl,
        discordUrl,
        twitchUrl,
        itchIoUrl,
        twitterUrl,
        nameOtherGames1,
        linkOtherGame1,
        nameOtherGames2,
        linkOtherGame2,
        nameOtherGames3,
        linkOtherGame3,
        nameOtherGames4,
        linkOtherGame4,
        nameOtherGames5,
        linkOtherGame5,
        isDarkMode
      );
      toast.success(language == "fr" ? "Informations mises à jour avec succès !" : "Data updated");
      setLoading(false);
    } catch (error) {
      console.error(`error dans la page introduceYourself`, error); // Affichez l'erreur dans la console
      toast.error(language == "fr" ? "Erreur lors de la mise à jour des informations" : "Error updating the information.");    }
  };
  /********************************************************************************************** */
  return (
    <GeneralLayout>
      {loading ? ( 
        <Loading /> // Affiche le composant Loading pendant le chargement
      ) : (
        <div className="w-[95%] laptop:w-[50vw] mx-auto p-1 laptop:p-4 rounded-xl border border-purple-600 bg-black/30 text-center">
          
          <form onSubmit={handleSubmit}>
            <section className="sectionTextareaIntroYourself">
              <TextOneByOne />
              <textarea
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                className="textareaIntroYourself w-[100%]"
                placeholder="Biographie..."
                />
            </section>
            <br />
            <div className="linksOtherGames">
              <div className="linearUp w-[60%] mx-auto">
                <input
                  type="text"
                  value={nameOtherGames1}
                  onChange={(event) => setNameOtherGames1(event.target.value)}
                  placeholder= {language == "fr" ? "Inscrivez ici le nom de votre jeu précédent n°1" : "Please enter the name of your previous game here n°1"}
                />
                <input
                  type="url"
                  value={linkOtherGame1}
                  onChange={(event) => setLinkOtherGame1(event.target.value)}
                  placeholder={language == "fr" ? "Si ce jeu est déjà référencé ailleurs , collez ici le lien" : "If this game is already listed elsewhere, please paste the link here."}
                />
              </div>

              <div className="linearUp w-[60%] mx-auto">
                <input
                  type="text"
                  value={nameOtherGames2}
                  onChange={(event) => setNameOtherGames2(event.target.value)}
                  placeholder={language == "fr" ? "Inscrivez ici le nom de votre jeu précédent n°2" : "Please enter the name of your previous game here n°2"}
                />
                <input
                  type="url"
                  value={linkOtherGame2}
                  onChange={(event) => setLinkOtherGame2(event.target.value)}
                  placeholder={language == "fr" ? "Si ce jeu est déjà référencé ailleurs , collez ici le lien" : "If this game is already listed elsewhere, please paste the link here."}
                />
              </div>

              <div className="linearUp w-[60%] mx-auto">
                <input
                  type="text"
                  value={nameOtherGames3}
                  onChange={(event) => setNameOtherGames3(event.target.value)}
                  placeholder={language == "fr" ? "Inscrivez ici le nom de votre jeu précédent n°3" : "Please enter the name of your previous game here n°3"}
                />
                <input
                  type="url"
                  value={linkOtherGame3}
                  onChange={(event) => setLinkOtherGame3(event.target.value)}
                  placeholder={language == "fr" ? "Si ce jeu est déjà référencé ailleurs , collez ici le lien" : "If this game is already listed elsewhere, please paste the link here."}
                />
              </div>

              <div className="linearUp w-[60%] mx-auto">
                <input
                  type="text"
                  value={nameOtherGames4}
                  onChange={(event) => setNameOtherGames4(event.target.value)}
                  placeholder={language == "fr" ? "Inscrivez ici le nom de votre jeu précédent n°4 :" : "Please enter the name of your previous game here n°4"}
                />
                <input
                  type="url"
                  value={linkOtherGame4}
                  onChange={(event) => setLinkOtherGame4(event.target.value)}
                  placeholder={language == "fr" ? "Si ce jeu est déjà référencé ailleurs , collez ici le lien" : "If this game is already listed elsewhere, please paste the link here."}
                />
              </div>

              <div className="linearUp w-[60%] mx-auto">
                <input
                  type="text"
                  value={nameOtherGames5}
                  onChange={(event) => setNameOtherGames5(event.target.value)}
                  placeholder={language == "fr" ? "Inscrivez ici le nom de votre jeu précédent n°5 :" : "Please enter the name of your previous game here n°5"}
                />
                <input
                  type="url"
                  value={linkOtherGame5}
                  onChange={(event) => setLinkOtherGame5(event.target.value)}
                  placeholder={language == "fr" ? "Si ce jeu est déjà référencé ailleurs , collez ici le lien" : "If this game is already listed elsewhere, please paste the link here."}
                />
              </div>
            </div>

            <br />
            {/* Bouton TELECHARGER votre Logo */}
            <div className="file-upload">
              <label className="custom-file-upload">
                <input
                  type="file"
                  onChange={(event) => setLogoUser(event.target.files[0])}
                  accept="image/*"
                />
                {language == "fr" ? "Télécharger votre logo" : "Upload your logo"}                
              </label>
            </div>

            <br />
            {/* Lien votre propre site */}
            <input
              type="url"
              value={websiteUrl}
              onChange={(event) => setWebsiteUrl(event.target.value)}
              className="w-[95%] laptop:w-[60%] p-2 rounded-xl transparentWhite"
              placeholder={language == "fr" ? "URL de votre site web :" : "URL of your website"} 
            />
            <br />
            <br />

            <div className="social">
              {" "}
              {/* Liens réseaux sociaux */}
              <div className="flex">
                <div className="contentLogo">
                  <Image
                    src={logoDiscord}
                    alt="Logo Discord"
                    width={36} height={36}
                    className="w-9 h-9 mr-3 bg-black bg-opacity-50 rounded-md p-1"
                    unoptimized={true}
                  />
                </div>
                <input
                  type="url"
                  value={discordUrl}
                  onChange={(event) => setDiscordUrl(event.target.value)}
                  className="transparentWhite"
                  placeholder={language == "fr" ? "Lien Discord :" : "Link Discord"} 
                />
              </div>
              <br />
              <div className="flex">
                <div className="contentLogo">
                  <Image
                    src={logoTwitch}
                    alt="Logo Twitch"
                    width={32} height={32}
                    className="w-8 h-8 mr-3 bg-black bg-opacity-50 rounded-md p-1"
                    unoptimized={true}
                  />
                </div>
                <input
                  type="url"
                  value={twitchUrl}
                  onChange={(event) => setTwitchUrl(event.target.value)}
                  className="transparentWhite"
                  placeholder={language == "fr" ? "Lien Twitch :" : "Link Twitch"}
                />
              </div>
              <br />
              <div className="flex">
                <div className="contentLogo">
                  <Image
                    src={logoItchi}
                    alt="Logo Itchi.io"
                    width={32} height={32}
                    className="w-8 h-8 mr-3 bg-black bg-opacity-50 rounded-md p-1"
                    unoptimized={true}
                  />
                </div>
                <input
                  type="url"
                  value={itchIoUrl}
                  onChange={(event) => setItchIoUrl(event.target.value)}
                  className="transparentWhite"
                  placeholder={language == "fr" ? "Lien itch.io :" : "Link itch.io"}
                />
              </div>
              <br />
              <div className="flex">
                <div className="contentLogo">
                  <Image
                    src={logoTwitter}
                    alt="Logo Twitter"
                    width={32} height={32}
                    className="w-8 h-8 mr-3 bg-white bg-opacity-50 rounded-md p-1"
                    unoptimized={true}
                  />
                </div>
                <input
                  type="url"
                  value={twitterUrl}
                  onChange={(event) => setTwitterUrl(event.target.value)}
                  className="transparentWhite"
                  placeholder={language == "fr" ? "Lien X Twitter :" : "Link X Twitter"}
                />
              </div>
            </div>

            <div className="py-2 px-4 bg-black text-white ml-2 tablet:inline-flex align-middle my-3 rounded-xl border">
              <span>{language == "fr" ? "Mode Sombre : Texte blanc sur fond noir" : "Dark mode : White text on black background"} </span>
              <div className="ml-4">
                <label>
                  <input
                    type="radio"
                    value="true"
                    className="mx-2"
                    checked={isDarkMode === true}
                    onChange={() => setIsDarkMode(true)}
                  />
                  {language == "fr" ? "Oui" : "yes"}
                </label>
                <label className="ml-4">
                  <input
                    type="radio"
                    value="false"
                    className="mx-2"
                    checked={isDarkMode === false}
                    onChange={() => setIsDarkMode(false)}
                  />
                  {language == "fr" ? "Non" : "No"}
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="border block bg-green-500 text-white mx-auto p-2 rounded-xl"
            >
              {language == "fr" ? "Mettre à jour" : "Update"} 
            </button>
          </form>
        </div>
      )}
    </GeneralLayout>
  );
}; 

export default introduceYourself;
