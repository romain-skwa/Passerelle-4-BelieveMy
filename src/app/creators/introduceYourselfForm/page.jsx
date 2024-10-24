"use client";

// introduceYourself.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import updateUserInfo from "@/actions/bioCreator";
import formulary from "../../styles/formulary.css";

const introduceYourself = () => {
  const [bio, setBio] = useState('');
  const [gamesAlreadyCreated, setGamesAlreadyCreated] = useState('');
  const [nameOtherGames1, setNameOtherGames1] = useState('');
  const [linkOtherGame1, setLinkOtherGame1] = useState('');
  const [nameOtherGames2, setNameOtherGames2] = useState('');
  const [linkOtherGame2, setLinkOtherGame2] = useState('');
  const [nameOtherGames3, setNameOtherGames3] = useState('');
  const [linkOtherGame3, setLinkOtherGame3] = useState('');
  const [nameOtherGames4, setNameOtherGames4] = useState('');
  const [linkOtherGame4, setLinkOtherGame4] = useState('');
  const [nameOtherGames5, setNameOtherGames5] = useState('');
  const [linkOtherGame5, setLinkOtherGame5] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [discordUrl, setDiscordUrl] = useState('');
  const [twitchUrl, setTwitchUrl] = useState('');
  const [itchIoUrl, setItchIoUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Appelez la fonction pour mettre à jour les informations de l'utilisateur
      await updateUserInfo(bio, profileUrl, websiteUrl, discordUrl, twitchUrl, itchIoUrl);
      toast.success('Informations mises à jour avec succès !');
    } catch (error) {
      console.error(`error dans la page introduceYourself`, error); // Affichez l'erreur dans la console
      toast.error('Erreur lors de la mise à jour des informations');
    }
  };

  return (
    <GeneralLayout>
      <div className='introduceYourself w-[50vw] mx-auto p-4 rounded-xl border bg-black/30 text-center '>
        <h1 className='text-4xl'>Présentez-vous</h1>
        <form onSubmit={handleSubmit} >
          <textarea 
            value={bio} 
            onChange={(event) => setBio(event.target.value)}
            className='w-[80%] mx-auto p-2 h-32'
            placeholder="Présentez votre parcours. Evoquez vos jeux. C'est à vous..." 
          />
          <br />
          <div className='linksOtherGames m-4'>
            <input type="text" value={nameOtherGames1} onChange={(event) => setNameOtherGames1(event.target.value)} placeholder='Inscrivez ici le nom de votre jeu précédent n°1 :' className='border-b border-gray-300 p-1 rounded-t-lg' />
            <input type="url" value={linkOtherGame1} onChange={(event) => setLinkOtherGame1(event.target.value)} placeholder='Si ce jeu est déjà référencé sur ce site, collez ici le lien' className='rounded-b-lg' />

            <input type="text" value={nameOtherGames2} onChange={(event) => setNameOtherGames2(event.target.value)} placeholder='Inscrivez ici le nom de votre jeu précédent n°2 :' className='border-b border-gray-300 p-1 rounded-t-lg mt-2' />
            <input type="url" value={linkOtherGame2} onChange={(event) => setLinkOtherGame2(event.target.value)} placeholder='Si ce jeu est déjà référencé sur ce site, collez ici le lien' className='rounded-b-lg' />

            <input type="text" value={nameOtherGames3} onChange={(event) => setNameOtherGames3(event.target.value)} placeholder='Inscrivez ici le nom de votre jeu précédent n°3 :' className='border-b border-gray-300 p-1 rounded-t-lg mt-2' />
            <input type="url" value={linkOtherGame3} onChange={(event) => setLinkOtherGame3(event.target.value)} placeholder='Si ce jeu est déjà référencé sur ce site, collez ici le lien' className='rounded-b-lg' />

            <input type="text" value={nameOtherGames4} onChange={(event) => setNameOtherGames4(event.target.value)} placeholder='Inscrivez ici le nom de votre jeu précédent n°4 :' className='border-b border-gray-300 p-1 rounded-t-lg mt-2' />
            <input type="url" value={linkOtherGame4} onChange={(event) => setLinkOtherGame4(event.target.value)} placeholder='Si ce jeu est déjà référencé sur ce site, collez ici le lien' className='rounded-b-lg' />

            <input type="text" value={nameOtherGames5} onChange={(event) => setNameOtherGames5(event.target.value)} placeholder='Inscrivez ici le nom de votre jeu précédent n°5 :' className='border-b border-gray-300 p-1 rounded-t-lg mt-2' />
            <input type="url" value={linkOtherGame5} onChange={(event) => setLinkOtherGame5(event.target.value)} placeholder='Si ce jeu est déjà référencé sur ce site, collez ici le lien' className='rounded-b-lg' />
          </div>
          <br />
          <div className='social'>
            <div className="file-upload">
              <label className="custom-file-upload">
                <input 
                  type="file" 
                  onChange={(event) => setProfileUrl(event.target.files[0])} 
                  accept="image/*" 
                />
                Télécharger votre logo
              </label>
            </div>
              <br />
              <input type="url" value={websiteUrl} onChange={(event) => setWebsiteUrl(event.target.value)} placeholder='URL de votre site web :' />
              <br />
              <input type="url" value={discordUrl} onChange={(event) => setDiscordUrl(event.target.value)} placeholder='Lien Discord :' />
              <br />
              <input type="url" value={twitchUrl} onChange={(event) => setTwitchUrl(event.target.value)} placeholder='Lien Twitch :' />
              <br />
              <input type="url" value={itchIoUrl} onChange={(event) => setItchIoUrl(event.target.value)} placeholder='Lien itch.io :' />
              <br />
          </div>
          <button type="submit">Mettre à jour</button>
        </form>
      </div>
    </GeneralLayout>
  );
};

export default introduceYourself;