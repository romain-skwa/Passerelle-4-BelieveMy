import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";
import AllCompResultsDetails from "@/components/AllCompResultsDetails/AllCompResultsDetails";

// Function to generate dynamics metada
export async function generateMetadata({searchParams}) {
  const { lang } = await searchParams; 
  const formattedLang = lang || 'fr'; // Retrieve language from search params URL
  return {
    title: formattedLang === "fr" ? `Recherche détaillée` : `Result details`,
    description: formattedLang === "fr" 
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
