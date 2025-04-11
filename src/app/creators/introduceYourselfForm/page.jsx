// introduceYourselform
import React from "react";
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";
import AllCompFormCreators from "@/components/AllCompFormCreators/AllCompFormCreators";

// Function to generate dynamics metada
export async function generateMetadata({ searchParams }) {
  const { lang } = await searchParams; // Récupérer la langue depuis les paramètres de recherche

  // Utilisez une valeur par défaut pour lang
  const formattedLang = lang || 'fr';
  
  return {
    title: lang === "fr" ? "Ma biographie" : "My biography",
    description: lang === "fr" ? "Présentez-vous via ce formulaire" : "Introduce yourself via this form",
    icons: {
      icon: "/icons/favicon.ico",
    },
  };
}

const introduceYourself = () => {
 return (
    <GeneralLayout>
      <AllCompFormCreators />
    </GeneralLayout>
  );
};

export default introduceYourself;
