import { useState, useEffect } from 'react';
import Image from "next/image";
import logoTwitter from "../../../public/logo/x__twitter-logo.png";
import logoFacebook from "../../../public/logo/facebook_logo.png";

// Composant Share qui prend currentUrl et title en props
export default function Share({ currentUrl, title }) {
  const [shareMessage, setShareMessage] = useState("");

  // Pour l'exemple, la variable LadresseYoutube remplace currentUrl dans le code !!
  let ladresseYoutube = "https://www.youtube.com/@anayanosekai/videos";

  useEffect(() => {
    // Mettre à jour le message de partage une fois que currentUrl est disponible
    if (currentUrl ) { // Placer currentUrl AVANT le reste pour que l'encadré youtube s'affiche.
      setShareMessage(`${ladresseYoutube}`);
    }
  }, [currentUrl]); // Recalculer quand currentUrl ou title change

  // URL de partage sur Twitter
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(ladresseYoutube)}`;
  
  // URL de partage sur Facebook
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(ladresseYoutube)}`;

  return (
    <div>
      <p className='flex justify-center text-sm'>Partagez cette page :</p>
      <div className='flex justify-center gap-2'>
        <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
          <Image
            src={logoTwitter}
            alt="Logo Twitter"
            className="w-7 h-7 bg-white rounded-md p-1"
          />
        </a>
 
        <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
          <Image
            src={logoFacebook}
            alt="Logo Facebook"
            className="w-7 h-7 bg-white rounded-md p-1"
          />
        </a>
      </div>
    </div>
  );
}
