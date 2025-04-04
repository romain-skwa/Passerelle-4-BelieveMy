// introduceYourselform
import React from "react";
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";
import AllCompFormCreators from "@/components/AllCompFormCreators/AllCompFormCreators";

// Function to generate dynamics metada
export function generateMetadata({ searchParams }) {
  const lang = searchParams.lang || 'fr'; // Retrieve language from search settings
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
