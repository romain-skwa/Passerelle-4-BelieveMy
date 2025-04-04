import AllCompIntroductionGame from "@/components/AllCompIntroductionGame/AllCompIntroductionGame";

// INTRODUCTION OF ONE GAME
// Dynamic page

// Function to capitalize the first letter of a string,
function capitalizeFirstLetter(string) {
  if (!string) return ''; // Check if the string is empty
  return string.charAt(0).toUpperCase() + string.slice(1);

}

// Function to generate dynamics metada
export function generateMetadata({ searchParams }) {
  const nameOfGame = searchParams.nameOfGame ? capitalizeFirstLetter(searchParams.nameOfGame) : ''; // Récupérer et formater le nom du créateur // Récupérer le nom du créateur depuis les paramètres de recherche
  const description = searchParams.description || '';
  return {
    title: `${nameOfGame}`,
    description: `${description}. ThisismyGame.`,
    icons: {
      icon: "/icons/favicon.ico",
    },
  };
}

export default function IntroductionGame({ params: { introduction } }) {

  return (
    <AllCompIntroductionGame  introduction={introduction} />
  );
}
