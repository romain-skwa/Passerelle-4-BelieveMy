
// the Biography of a creator
import AllCompProfileCreators from "@/components/AllCompProfileCreators/AllCompProfileCreators";
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";

// Fonction pour mettre en majuscule la première lettre d'une chaîne
function capitalizeFirstLetter(string) {
  if (!string) return ''; // Check if the string is empty
  return string.charAt(0).toUpperCase() + string.slice(1);

}

// Function to generate dynamics metada
export function generateMetadata({ searchParams }) {
  const lang = searchParams.lang || 'fr'; // Récupérer la langue depuis les paramètres de recherche
  const creator = searchParams.creator ? capitalizeFirstLetter(searchParams.creator) : ''; // Récupérer et formater le nom du créateur // Récupérer le nom du créateur depuis les paramètres de recherche
  const bio = searchParams.bio || '';
  return {
    title: lang === "fr" ? `Biographie de ${creator}` : `Biography of ${creator}`,
    description: lang === "fr" 
    ? `Thisismygame.com, biographie de ${creator} : ${bio}` 
    : `Thisismygame.com, biography of ${creator} : ${bio}`,
    icons: {
      icon: "/icons/favicon.ico",
    },
  };
}

export default function Profile() {

  return (
    <GeneralLayout>
      <AllCompProfileCreators />
    </GeneralLayout>
  );
}
