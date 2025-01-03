// UserProfileSection.js
import Image from "next/image";
import logoDiscord from "/public/logo/discord-logo.png";
import logoTwitch from "/public/logo/twitch_logo.png";
import logoItchi from "/public/logo/itch-io-icon.png";
import logoTwitter from "/public/logo/x__twitter-logo.png";

const UserProfileSection = ({user}) => {
  if (!user) {
    return <div>Aucun utilisateur connecté</div>; 
  }
  return (
    <section className={user.isDarkMode ? 
      "w-[95%] laptop:w-[48vw] mx-auto p-2 laptop:p-4 rounded-xl text-white bg-[rgba(0,0,0,0.90)]" : 
      "w-[95%] laptop:w-[48vw] mx-auto p-2 laptop:p-4 rounded-xl text-black bg-white"
    }>
      <div className="text-center mb-2">
          <div className="hidden tablet:block">
              ------------- A propos de : <h1 className="inline">{decodeURIComponent(user.username)}</h1> -------------
              {/* Ajouter ici le logo */}
          </div>
          <div className="block tablet:hidden">
              A propos de : <h1 className="inline">{decodeURIComponent(user.username)}</h1>
              {/* Ajouter ici le logo */}
          </div>
      </div>

      {user.bio ? <p>{user.bio}</p> : "Cet utilisateur n'a pas encore écrit sa présentation"}
      {user.websiteUrl && <p><a href={user.websiteUrl}><strong>{user.websiteUrl}</strong></a></p>}

      {/* Affichage des URL des réseaux sociaux */}
      {user.discordUrl && <a href={user.discordUrl}><Image src={logoDiscord} unoptimized={true} alt="Logo Discord" className={`w-9 h-9 mr-3 ${user.isDarkMode ? 'bg-black bg-opacity-50' : ''} rounded-md p-1 inline`} /></a>}
      {user.twitchUrl && <a href={user.twitchUrl}><Image src={logoTwitch} unoptimized={true} alt="Logo Twitch" className={`w-9 h-9 mr-3 ${user.isDarkMode ? 'bg-black bg-opacity-50' : ''} rounded-md p-1 inline`} /></a>}
      {user.itchIoUrl && <a href={user.itchIoUrl}><Image src={logoItchi} unoptimized={true} alt="Logo Itch.io" className={`w-9 h-9 mr-3 ${user.isDarkMode ? 'bg-black bg-opacity-50' : ''} rounded-md p-1 inline`} /></a>}
      {user.twitterUrl && <a href={user.twitterUrl}><Image src={logoTwitter} unoptimized={true} alt="Logo Twitter" className={`w-9 h-9 mr-3 ${user.isDarkMode ? 'bg-white bg-opacity-50' : ''} rounded-md p-1 inline`} /></a>}

      {/* Affichage des autres jeux */}
      {user.nameOtherGames1 && user.linkOtherGame1 && (
        <p><a href={user.linkOtherGame1}><strong>{user.nameOtherGames1}</strong></a></p>
      )}
      {user.nameOtherGames2 && user.linkOtherGame2 && (
        <p><a href={user.linkOtherGame2}><strong>{user.nameOtherGames2}</strong></a></p>
      )}
      {user.nameOtherGames3 && user.linkOtherGame3 && (
        <p><a href={user.linkOtherGame3}><strong>{user.nameOtherGames3}</strong></a></p>
      )}
      {user.nameOtherGames4 && user.linkOtherGame4 && (
        <p><a href={user.linkOtherGame4}><strong>{user.nameOtherGames4}</strong></a></p>
      )}
      {user.nameOtherGames5 && user.linkOtherGame5 && (
        <p><a href={user.linkOtherGame5}><strong>{user.nameOtherGames5}</strong></a></p>
      )}
    </section>
  );
};

export default UserProfileSection;