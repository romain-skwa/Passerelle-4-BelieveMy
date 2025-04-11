// src/app/creators/introductionGameForm/page.jsx
import "react-datepicker/dist/react-datepicker.css";
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";
import AllCompIntroGameForm from "@/components/AllCompIntroGameForm/AllCompIntroGameForm";

// Function to generate dynamics metada
export async  function generateMetadata({ searchParams }) {
  const { lang } = await searchParams; // Récupérer la langue depuis les paramètres de recherche
  return {
    title: lang === "fr" ? "Présentez votre jeu" : "Introduce your game",
    description: lang === "fr" ? "Formulaire de présentation de jeu" : "Game Presentation Form",
    icons: {
      icon: "/icons/favicon.ico",
    },
  };
}

// Component of this page
export default function IntroductionGameForm() {
  return (
    <GeneralLayout>
      <AllCompIntroGameForm />
    </GeneralLayout>
  );
}