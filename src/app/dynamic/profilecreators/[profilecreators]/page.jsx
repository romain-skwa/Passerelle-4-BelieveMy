
// the Biography of a creator
import AllCompProfileCreators from "@/components/AllCompProfileCreators/AllCompProfileCreators";
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";

// Function to generate dynamics metada
export function generateMetadata({ searchParams }) {
  const lang = searchParams.lang || 'fr'; // Récupérer la langue depuis les paramètres de recherche
  return {
    title: lang === "fr" ? "Biographie" : "Biography",
    description: lang === "fr" 
    ? "Biographie" 
    : "Biography",
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
