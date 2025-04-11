// INTRODUCTION OF ONE GAME
// Dynamic page
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";
import "@/app/styles/formIntroYourself.css";
import AllCompSearchGame from "@/components/AllCompSearchGame/AllCompSearchGame";

// Function to generate dynamics metada
export async function generateMetadata({ searchParams }) {
  // Variable
  const { searchResult, lang } = await searchParams; // Récupérer les paramètres de recherche
  // Décoder le nom du jeu
  const nameofgame = decodeURIComponent(searchResult || '');
  const formattedLang = lang || 'fr'; 
  
  return {
    title: formattedLang === "fr" ? `Recherche ${nameofgame}` : `Result : ${nameofgame}`,
    description: formattedLang === "fr" 
    ? `Vous recherchez le nom : "${nameofgame}" sur le site ThisIsMyGame.com. Voici le résultat de votre recherche.` 
    : `You are searching the name : "${nameofgame}" on the website ThisIsMyGame.com. Here is the result of your search.`,
    icons: {
      icon: "/icons/favicon.ico",
    },
  };
}

export default function SearchIntroductionGame() {
  return (
    <GeneralLayout>
      <AllCompSearchGame />
    </GeneralLayout>
  );
}
