// INTRODUCTION OF ONE GAME
// Dynamic page
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";
import "@/app/styles/formIntroYourself.css";
import AllCompSearchGame from "@/components/AllCompSearchGame/AllCompSearchGame";

// Function to generate dynamics metada
export function generateMetadata({ searchParams }) {
  console.log(`searchParams : `, searchParams);
  // Variable
  const nameofgame = decodeURIComponent(searchParams.searchResult || '');
  console.log(`nameofgame : `, nameofgame);

  const lang = searchParams.lang || 'fr'; // Récupérer la langue depuis les paramètres de recherche
  return {
    title: lang === "fr" ? `Recherche ${nameofgame}` : `Result : ${nameofgame}`,
    description: lang === "fr" 
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
