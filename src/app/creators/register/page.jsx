
// REGISTER
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";
import AllCompRegister from "@/components/AllCompRegister/AllCompRegister";

// Function to generate dynamics metada
export function generateMetadata({ searchParams }) {
  const lang = searchParams.lang || 'fr'; // Récupérer la langue depuis les paramètres de recherche
  return {
    title: lang === "fr" ? "S'inscrire" : "Register",
    description: lang === "fr" 
    ? "Inscrivez-vous sur le site ThisIsMyGame.com pour présenter votre jeux vidéo" 
    : "Register on ThisIsMyGame.com to introduce your video game.",
    icons: {
      icon: "/icons/favicon.ico",
    },
  };
}


export default function Register() {

  return (
    <>
     
      
    <GeneralLayout>
      <AllCompRegister />
    </GeneralLayout>
    </>
  );
}
/* On se sert d'un server action pour pouvoir envoyer des données depuis un composant client*/
