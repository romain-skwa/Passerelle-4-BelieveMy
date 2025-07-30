import AllCompIntroductionGame from "@/components/AllCompIntroductionGame/AllCompIntroductionGame";

// INTRODUCTION OF ONE GAME
// Dynamic page

// Function to capitalize the first letter of a string,
function capitalizeFirstLetter(string) {
  if (!string) return ''; // Check if the string is empty
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to generate dynamics metadata
export async function generateMetadata({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const { nameofgame } = resolvedSearchParams || {};
  const encodedName = encodeURIComponent(nameofgame);

  // Appel API avec nameofgame
  const response = await fetch("http://localhost:3000/api/introduction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nameofgame: encodedName }),
    cache: "no-store",
  });

  const dataGame = await response.json();
  const game = dataGame.game;

  // Sécurité : fallback si game n'est pas trouvé
  if (!game) {
    return {
      title: "Jeu introuvable",
      description: "Aucune introduction trouvée pour ce jeu.",
      icons: { icon: "/icons/favicon.ico" },
    };
  }

  // Décodage des champs nécessaires
  const decodedName = decodeURIComponent(game.nameofgame || "");
  const decodedShortIntroduction = decodeURIComponent(game.shortIntroduction || "");

  // Construction dynamique des métadonnées
  const keywords = [
    ...(game.genreOfGame || []),
    ...(game.platform || []),
    ...(game.SoloMulti || []),
    "video", "game", "introduction", "creator", "developer"
  ].join(", ");

  const url = `https://thisismygame.com/dynamic/introduction/${game.nameofgame}?nameofgame=${game?.nameofgame}`;

  return {
    title: decodedName,
    description: decodedShortIntroduction || "Découvrez ce jeu vidéo présenté par son créateur.",
    keywords,
    authors: [{ name: game.username, url: url }],
    icons: {
      icon: "/icons/favicon.ico",
    },
    openGraph: {
      title: decodedName,
      description: decodedShortIntroduction || "Découvrez ce jeu vidéo présenté par son créateur.",
      url,
      siteName: "romain-delbos.dev",
      images: [
        {
          url: game.urlPosterCloudinary || "https://romain-delbos.dev/public/home/logoRomainDelbos.jpg",
          alt: `Affiche de ${decodedName}`,
        },
      ],
      locale: "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@romain-delbos.dev",
      images: [game.urlPosterCloudinary || "https://romain-delbos.dev/public/home/logoRomainDelbos.jpg"],
    },
  };
}

export default async function IntroductionGame({ params }) {
  const { introduction } = await params;

  return (
        <>
      
      <AllCompIntroductionGame introduction={introduction} />
    </>
  );
}
