"use client";

// introduceYourselform
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import updateBioCreator from "@/actions/updateBioCreator";
import formularyCss from "@/app/styles/formulary.module.css";
import logoDiscord from "../../../public/logo/discord-logo.png";
import logoTwitch from "../../../public/logo/twitch_logo.png";
import logoItchi from "../../../public/logo/itch-io-icon.png";
import logoTwitter from "../../../public/logo/x__twitter-logo.png";
import Loading from "@/components/ForLayout/Loading/Loading";
import TextOneByOne from "@/components/CreatorsForm/TextOneByOne/TextOneByOne";
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";
import MadeByThisCreator from "@/components/MadeByThisCreator/MadeByThisCreator";
import ImageLogoUser from "@/components/ImageLogoUser/ImageLogoUser";
import WeAreUpdatingProfil from "@/components/WeAreUpdatingProfil/WeAreUpdatingProfil";

export default function AllCompFormCreators(){
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
      const [websiteUrl, setWebsiteUrl] = useState("");
      const [discordUrl, setDiscordUrl] = useState("");
      const [twitchUrl, setTwitchUrl] = useState("");
      const [itchIoUrl, setItchIoUrl] = useState("");
      const [twitterUrl, setTwitterUrl] = useState("");
      const [user, setUser] = useState(null);
      const [error, setError] = useState(null);
      const [isDarkMode, setIsDarkMode] = useState(false);
      const [loading, setLoading] = useState(true);
      const { language } = useLanguage("");
      const [logoUrl, setLogoUrl] = useState("");// Url data in mongoDB
      const [logoFile, setLogoFile] = useState("");
      const [previewUrl, setPreviewUrl] = useState(null);// Url preview now
      const [isLogoChanged, setIsLogoChanged] = useState(false);
      const [weAreUpdatingProfil, setWeAreUpdatingProfil] = useState(false);
    
      // Get data about user
      useEffect(() => {
        const fetchUserData = async () => {
          try {
            setLoading(true);
            const response = await fetch("/api/getAllUserDataSession", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              // There is no body with method GET
            });
    
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || "Utilisateur non authentifié");
            }
    
            const data = await response.json();
            setUser(data.user);
    
            // ** Change here: Initialize isDarkMode based on user data **
            if (data.user.isDarkMode !== undefined) {
              // Radiobox will be checked automatically
              setIsDarkMode(data.user.isDarkMode);
            } else {
              setIsDarkMode(false); // If isDarkMode does not exist, set it to false
            }
    
            // If present, user data is displayed in text fields
            if (data.user.bio) {setBio(data.user.bio);}
            if (data.user.nameOtherGames1) {setNameOtherGames1(data.user.nameOtherGames1);}
            if (data.user.linkOtherGame1) {setLinkOtherGame1(data.user.linkOtherGame1);}
            if (data.user.nameOtherGames2) {setNameOtherGames2(data.user.nameOtherGames2);}
            if (data.user.linkOtherGame2) {setLinkOtherGame2(data.user.linkOtherGame2);}
            if (data.user.nameOtherGames3) {setNameOtherGames3(data.user.nameOtherGames3);}
            if (data.user.linkOtherGame3) {setLinkOtherGame3(data.user.linkOtherGame3);}
            if (data.user.nameOtherGames4) {setNameOtherGames4(data.user.nameOtherGames4);}
            if (data.user.linkOtherGame4) {setLinkOtherGame4(data.user.linkOtherGame4);}
            if (data.user.nameOtherGames5) {setNameOtherGames5(data.user.nameOtherGames5);}
            if (data.user.linkOtherGame5) {setLinkOtherGame5(data.user.linkOtherGame5);}
            if (data.user.websiteUrl) {setWebsiteUrl(data.user.websiteUrl);}
            if (data.user.discordUrl) {setDiscordUrl(data.user.discordUrl);}
            if (data.user.twitchUrl) {setTwitchUrl(data.user.twitchUrl);}
            if (data.user.itchIoUrl) {setItchIoUrl(data.user.itchIoUrl);}
            if (data.user.twitterUrl) {setTwitterUrl(data.user.twitterUrl);}
            if (data.user.logoUrl) {setPreviewUrl(data.user.logoUrl);}
            if (data.user.logoUrl) {setLogoUrl(data.user.logoUrl);}
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
    /*** When a logo already exist, we extract the public ID useFull to erase the image in Cloudinary just in case ******/
    const extractPublicIdFromUrl = (url) => {
      const uploadIndex = url.indexOf('upload') + 7;
      const startIndex = url.indexOf('/', uploadIndex) + 1;
      const endIndex = url.lastIndexOf('.');
      return url.slice(startIndex, endIndex !== -1 ? endIndex : undefined);
    };
    /**** Function to delete the ancient image ********************************************************/
    const handleDeleteImage = async (publicId) => {
      if (publicId) {
        console.log(`On est censé effacer l'image précédente dans Cloudinary. Son identifiant public est : ${publicId}`);
        try {
          const response = await fetch('/api/cloudinary/destroy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ public_id: publicId, invalidate: true }),
          });
          
          const result = await response.json();
          if (response.ok) {
            console.log("Image supprimée de Cloudinary :", result);
          } else {
            console.error("Erreur lors de la suppression de l'image :", result.error);
          }
        } catch (error) {
          console.error("Error deleting image:", error);
        }
      } else {
        console.log("On dirait qu'il n'y a pas de publicId à supprimer.");
      }
    };
    
    //--------------------   SUBMITION of formulary    --------------------
    /*************** On submit, Check if a new image is choosen (1) ***********************************/
      const handleSubmitForm = async (event) => {
        event.preventDefault();
        setWeAreUpdatingProfil(true);
    
        if(isLogoChanged){ // When a new image is chosen
          handleSendLogoFirst();
          console.log("handleSendLogoFirst est lancé");
        }
        else{
          handleSendDataMongoDB();
          console.log("handleSendDataMongoDB est lancé DIRECTEMENT");
        }
      }
    /**********  we send the logo (2) ***********************************************************/
    const handleSendLogoFirst = async () => {
    
      // Is one file selected ?
      if (!logoFile) {
        console.error("Aucun fichier logo n'a été sélectionné.");
        return toast.error("Veuillez sélectionner un logo avant de soumettre.");
      }
    
      try {
        console.log("On tente d'envoyer l'image du logo");
    
        //----- Step ONE ---------------------------------------
        // Extraction of Identification of the ancient image
        const oldPublicId = extractPublicIdFromUrl(logoUrl);
          console.log("ID public de l'ancienne image à supprimer:", oldPublicId);
    
        // Deletion of the ancient image
        await handleDeleteImage(oldPublicId);
        
        //----- Step TWO ---------------------------------------
        // Create one FormData for the sending
        const formData = new FormData();
        formData.append("file", logoFile);
        formData.append("upload_preset", process.env.NEXT_UPLOAD_PRESET_UNSIGNED);
    
        // Send file to Cloudinary
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
    
        // Check if response is correct
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Erreur de réponse de Cloudinary:", errorData);
          throw new Error(errorData.error || "Erreur lors de l'envoi de l'image.");
        }
    
        const data = await response.json();
        console.log("Upload réussi :", data.secure_url);
    
        // Store URL in the appropriate state
        setLogoUrl(data.secure_url);
    
      } catch (error) {
        console.error("Erreur lors de l'envoi du logo :", error);
        toast.error(error.message);
      }
    }; 
    
      /*********** Step obligatory to start to send data to MongoDB (3) ******** It does NOT work directly ***** Trust me *************/
      useEffect(() => {
        if (logoUrl) {  
          // Confirm there is a new data in logoUrl  
            //console.log("Le logo a été mis à jour : ", logoUrl);  
          // Now we may call a function to send data to MongoDB
          if(isLogoChanged){// isLogoChanged === true only when a new image is selected
            handleSendDataMongoDB();   
            // console.log("On est dans le useEffect qui s'enclenche quand logoUrl change et apparemment isLogoChanged === true") ;
            setIsLogoChanged(false);
          }
        }  
      }, [logoUrl]);
    
      /*********** we send data in MongoDB (4) *************************************************************************************/
      const handleSendDataMongoDB = async () => {    

        try {
          // Envoyez les données à la fonction pour mettre à jour les informations de l'utilisateur
          await updateBioCreator(
            bio,
            logoUrl,
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
          setWeAreUpdatingProfil(false);
        } catch (error) {
          // console.error(`error dans la page introduceYourself`, error);
          toast.error(
            language == "fr"
              ? "Erreur lors de la mise à jour des informations"
              : "Error updating the information."
          );
        }
      };
      /********************************************************************************************** */
      
    return(
        loading ? (
            <Loading /> // Display component LOADING
          ) :  weAreUpdatingProfil ? (
            <WeAreUpdatingProfil />
            ) : ( 
            <>
              <form
                onSubmit={handleSubmitForm} // On submit, we start to send the logo (1)
                className="w-[95%] laptop:w-[50vw] mx-auto p-1 laptop:p-4 rounded-xl border border-purple-600 bg-black/30 text-center"
              >
                <section className={`${formularyCss.sectionTextareaIntroYourself}  ${formularyCss.shadowPurple}`}>
                  <TextOneByOne
                    frenchPhrase={"Présentez votre parcours. Évoquez vos jeux. C'est à vous..."}
                    englishPhrase={"Present your background. Mention your games. It's your turn..."}
                  />
                  <textarea
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                    className={`${formularyCss.textareaIntroYourself} w-[100%] h-36`}
                    placeholder="Biographie..."
                  />
                </section>
                <br />
                <div className={`${formularyCss.linksOtherGames}`}>
                  <div className={`${formularyCss.linearUp} w-[60%] mx-auto`}>
                    <input
                      type="text"
                      value={nameOtherGames1}
                      onChange={(event) => setNameOtherGames1(event.target.value)}
                      placeholder={language == "fr" ? "Inscrivez ici le nom de votre jeu précédent n°1" : "Please enter the name of your previous game here n°1"}
                    />
                    <input
                      type="url"
                      value={linkOtherGame1}
                      onChange={(event) => setLinkOtherGame1(event.target.value)}
                      placeholder={
                        language == "fr"
                          ? "Si ce jeu est déjà référencé ailleurs , collez ici le lien"
                          : "If this game is already listed elsewhere, please paste the link here."
                      }
                    />
                  </div>

                  <div className={`${formularyCss.linearUp} w-[60%] mx-auto`}>
                    <input
                      type="text"
                      value={nameOtherGames2}
                      onChange={(event) => setNameOtherGames2(event.target.value)}
                      placeholder={
                        language == "fr"
                          ? "Inscrivez ici le nom de votre jeu précédent n°2"
                          : "Please enter the name of your previous game here n°2"
                      }
                    />
                    <input
                      type="url"
                      value={linkOtherGame2}
                      onChange={(event) => setLinkOtherGame2(event.target.value)}
                      placeholder={
                        language == "fr"
                          ? "Si ce jeu est déjà référencé ailleurs , collez ici le lien"
                          : "If this game is already listed elsewhere, please paste the link here."
                      }
                    />
                  </div>
    
                  <div className={`${formularyCss.linearUp} w-[60%] mx-auto`}>
                    <input
                      type="text"
                      value={nameOtherGames3}
                      onChange={(event) => setNameOtherGames3(event.target.value)}
                      placeholder={
                        language == "fr"
                          ? "Inscrivez ici le nom de votre jeu précédent n°3"
                          : "Please enter the name of your previous game here n°3"
                      }
                    />
                    <input
                      type="url"
                      value={linkOtherGame3}
                      onChange={(event) => setLinkOtherGame3(event.target.value)}
                      placeholder={
                        language == "fr"
                          ? "Si ce jeu est déjà référencé ailleurs , collez ici le lien"
                          : "If this game is already listed elsewhere, please paste the link here."
                      }
                    />
                  </div>
    
                  <div className={`${formularyCss.linearUp} w-[60%] mx-auto`}>
                    <input
                      type="text"
                      value={nameOtherGames4}
                      onChange={(event) => setNameOtherGames4(event.target.value)}
                      placeholder={
                        language == "fr"
                          ? "Inscrivez ici le nom de votre jeu précédent n°4 :"
                          : "Please enter the name of your previous game here n°4"
                      }
                    />
                    <input
                      type="url"
                      value={linkOtherGame4}
                      onChange={(event) => setLinkOtherGame4(event.target.value)}
                      placeholder={
                        language == "fr"
                          ? "Si ce jeu est déjà référencé ailleurs , collez ici le lien"
                          : "If this game is already listed elsewhere, please paste the link here."
                      }
                    />
                  </div>
    
                  <div className={`${formularyCss.linearUp} w-[60%] mx-auto`}>
                    <input
                      type="text"
                      value={nameOtherGames5}
                      onChange={(event) => setNameOtherGames5(event.target.value)}
                      placeholder={
                        language == "fr"
                          ? "Inscrivez ici le nom de votre jeu précédent n°5 :"
                          : "Please enter the name of your previous game here n°5"
                      }
                    />
                    <input
                      type="url"
                      value={linkOtherGame5}
                      onChange={(event) => setLinkOtherGame5(event.target.value)}
                      placeholder={
                        language == "fr"
                          ? "Si ce jeu est déjà référencé ailleurs , collez ici le lien"
                          : "If this game is already listed elsewhere, please paste the link here."
                      }
                    />
                  </div>
                </div>
    
                {/******************************************************************************************** */}
                {/* UPLOAD your Logo button */}
               <ImageLogoUser
                previewUrl={previewUrl}
                setPreviewUrl={setPreviewUrl}
                setLogoFile={setLogoFile}
                setIsLogoChanged={setIsLogoChanged}
                logoUrl={logoUrl}
                handleDeleteImage={handleDeleteImage}
                extractPublicIdFromUrl={extractPublicIdFromUrl}
                />
    
                {/******************************************************************************************** */}
                {/* Link your own site */}
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(event) => setWebsiteUrl(event.target.value)}
                  className={`w-[95%] laptop:w-[60%] my-4 p-2 rounded-xl ${formularyCss.transparentWhite} text-white`}
                  placeholder={language == "fr" ? "URL de votre site web :" : "URL of your website"}
                />
    
                <div className={formularyCss.social}>
                  {" "}
                  {/* Social media links */}
                  <div className="flex">
                    <div className={`${formularyCss.contentLogo}`}>
                      <Image
                        src={logoDiscord}
                        alt="Logo Discord"
                        width={36}
                        height={36}
                        className="w-9 h-9 mr-3 bg-black bg-opacity-50 rounded-md p-1"
                        unoptimized={true}
                      />
                    </div>
                    <input
                      type="url"
                      value={discordUrl}
                      onChange={(event) => setDiscordUrl(event.target.value)}
                      className={formularyCss.transparentWhite}
                      placeholder={language == "fr" ? "Lien Discord :" : "Link Discord"                  }
                    />
                  </div>
                  <br />
                  <div className="flex">
                    <div className={formularyCss.contentLogo}>
                      <Image
                        src={logoTwitch}
                        alt="Logo Twitch"
                        width={32}
                        height={32}
                        className="w-8 h-8 mr-3 bg-black bg-opacity-50 rounded-md p-1"
                        unoptimized={true}
                      />
                    </div>
                    <input
                      type="url"
                      value={twitchUrl}
                      onChange={(event) => setTwitchUrl(event.target.value)}
                      className={formularyCss.transparentWhite}
                      placeholder={
                        language == "fr" ? "Lien Twitch :" : "Link Twitch"
                      }
                    />
                  </div>
                  <br />
                  <div className="flex">
                    <div className={formularyCss.contentLogo}>
                      <Image
                        src={logoItchi}
                        alt="Logo Itchi.io"
                        width={32}
                        height={32}
                        className="w-8 h-8 mr-3 bg-black bg-opacity-50 rounded-md p-1"
                        unoptimized={true}
                      />
                    </div>
                    <input
                      type="url"
                      value={itchIoUrl}
                      onChange={(event) => setItchIoUrl(event.target.value)}
                      className={formularyCss.transparentWhite}
                      placeholder={
                        language == "fr" ? "Lien itch.io :" : "Link itch.io"
                      }
                    />
                  </div>
                  <br />
                  <div className="flex">
                    <div className={formularyCss.contentLogo}>
                      <Image
                        src={logoTwitter}
                        alt="Logo Twitter"
                        width={32}
                        height={32}
                        className="w-8 h-8 mr-3 bg-white bg-opacity-50 rounded-md p-1"
                        unoptimized={true}
                      />
                    </div>
                    <input
                      type="url"
                      value={twitterUrl}
                      onChange={(event) => setTwitterUrl(event.target.value)}
                      className={formularyCss.transparentWhite}
                      placeholder={
                        language == "fr" ? "Lien X Twitter :" : "Link X Twitter"
                      }
                    />
                  </div>
                </div>
    
                {/* DarkMode or not ? */}
                <div className="py-2 px-4 bg-black text-white ml-2 tablet:inline-flex align-middle my-3 rounded-xl border">
                  <span>
                    {language == "fr"
                      ? "Mode Sombre : Texte blanc sur fond noir"
                      : "Dark mode : White text on black background"}{" "}
                  </span>
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
                
                {/* Submit button */}
                <button
                  type="submit"
                  className="border block bg-green-500 text-white mx-auto p-2 rounded-xl"
                >
                  {language == "fr" ? "Mettre à jour" : "Update"}
                </button>
              </form>
              {/* Display posters of games created by this creator */}
              <div className="w-[95%] laptop:w-[50vw] mx-auto">
                <MadeByThisCreator user={user} />
              </div>
            </>
          )
    )
}