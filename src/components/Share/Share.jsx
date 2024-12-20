import { useState, useEffect } from 'react';

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
      <p>Partagez cette page :</p>
      <div>
        <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
          Partager sur Twitter
        </a>
      </div>
      <div>
        <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
          Partager sur Facebook
        </a>
      </div>
    </div>
  );
}
