
// the Biography of a creator
import AllCompProfileCreators from "@/components/AllCompProfileCreators/AllCompProfileCreators";
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  if (!string) return ''; // Check if the string is empty
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to generate dynamics metada
export function generateMetadata({ searchParams }) {
  const lang = searchParams.lang || 'fr'; // Retrieve language from search settings
  const creator = searchParams.creator ? capitalizeFirstLetter(searchParams.creator) : ''; // Retrieve and format creator name // Retrieve creator name from search parameters
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
