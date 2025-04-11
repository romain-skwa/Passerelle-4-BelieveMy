
// the Biography of a creator
import AllCompProfileCreators from "@/components/AllCompProfileCreators/AllCompProfileCreators";
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  if (!string) return ''; // Check if the string is empty
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to generate dynamics metada
export async function generateMetadata({ searchParams }) {
  const { lang, creator, bio } = await searchParams; // Récupérer les paramètres de recherche

  const formattedLang = lang || 'fr'; // Valeur par défaut pour la langue
  const formattedCreator = creator ? capitalizeFirstLetter(creator) : ''; // Récupérer et formater le nom du créateur
  const formattedBio = bio || ''; // Récupérer la biographie

  return {
    title: formattedLang === "fr" ? `Biographie de ${formattedCreator}` : `Biography of ${formattedCreator}`,
    description: formattedLang === "fr" 
      ? `Thisismygame.com, biographie de ${formattedCreator} : ${formattedBio}` 
      : `Thisismygame.com, biography of ${formattedCreator} : ${formattedBio}`,
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
