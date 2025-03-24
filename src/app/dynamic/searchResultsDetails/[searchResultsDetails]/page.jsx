import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";
import "@/app/styles/formIntroYourself.css";
import AllCompResultsDetails from "@/components/AllCompResultsDetails/AllCompResultsDetails";

// Function to generate dynamics metada
export function generateMetadata({searchParams}) {

  const lang = searchParams.lang || 'fr'; // Récupérer la langue depuis les paramètres de recherche
  return {
    title: lang === "fr" ? `Recherche détaillée` : `Result details`,
    description: lang === "fr" 
    ? `Recherche détaillée  sur le site ThisIsMyGame.com. Voici le résultat de votre recherche.` 
    : `Result details on the website ThisIsMyGame.com. Here is the result of your search.`,
    icons: {
      icon: "/icons/favicon.ico",
    },
  };
}

export default function searchResultsDetails() {  
  return (
    <GeneralLayout>
      <AllCompResultsDetails />
    </GeneralLayout>
  );
}
