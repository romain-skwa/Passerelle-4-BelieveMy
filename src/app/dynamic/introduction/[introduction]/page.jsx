import AllCompIntroductionGame from "@/components/AllCompIntroductionGame/AllCompIntroductionGame";

// INTRODUCTION OF ONE GAME
// Dynamic page

// Function to capitalize the first letter of a string,
function capitalizeFirstLetter(string) {
  if (!string) return ''; // Check if the string is empty
  return string.charAt(0).toUpperCase() + string.slice(1);

}

// Function to generate dynamics metada
export async function generateMetadata({ searchParams }) {
  const { nameOfGame, description } = await searchParams;

  const formattedNameOfGame = nameOfGame ? capitalizeFirstLetter(nameOfGame) : '';
  const formattedDescription = description || '';
  return {
    title: `${formattedNameOfGame}`,
    description: `${formattedDescription}. ThisismyGame.`,
    icons: {
      icon: "/icons/favicon.ico",
    },
  };
}

export default async function IntroductionGame({ params }) {
  const { introduction } = await params;
  return (
    <AllCompIntroductionGame  introduction={introduction} />
  );
}
