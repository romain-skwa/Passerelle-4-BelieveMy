import { useState, useEffect } from 'react';
import Image from "next/image";
import logoTwitter from "../../../public/logo/x__twitter-logo.png";
import logoFacebook from "../../../public/logo/facebook_logo.png";
import { useLanguage } from "@/components/LanguageContext/LanguageContext";

// Composant Share qui prend currentUrl en props
export default function Share({ currentUrl }) {
  const [shareMessage, setShareMessage] = useState("");
  const { language } = useLanguage();

  // Pour l'exemple, la variable LadresseYoutube remplace currentUrl dans le code !!
  let ladresseYoutube = "https://www.youtube.com/@anayanosekai/videos";

  useEffect(() => {
    // Mettre à jour le message de partage une fois que currentUrl est disponible
    if (currentUrl ) { // Placer currentUrl AVANT le reste pour que l'encadré youtube s'affiche.
      setShareMessage(`${ladresseYoutube}`);
    }
  }, [currentUrl]); // Recalculer quand currentUrl change

  // URL de partage sur Twitter
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(ladresseYoutube)}`;
  
  // URL de partage sur Facebook
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(ladresseYoutube)}`;

  return (
    <div>
      <p className='flex justify-center text-sm my-2'>{language === "fr" ? "Partagez cette page :" : "Share : "}</p>
      <div className='flex justify-center gap-2'>
        <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
          <Image
            src={logoTwitter}
            alt="Logo Twitter"
            className="w-7 h-7 bg-white rounded-md p-1"
            unoptimized={true}
          />
        </a>
 
        <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
          <Image
            src={logoFacebook}
            alt="Logo Facebook"
            className="w-7 h-7 bg-white rounded-md p-1"
            unoptimized={true}
          />
        </a>
      </div>
    </div>
  );
}
