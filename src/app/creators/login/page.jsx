
import AllCompLogin from "@/components/AllCompLogin/AllCompLogin";
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";

// Function to generate dynamics metada
export async function generateMetadata({ searchParams }) {
  const { lang } = await searchParams; 
  return {
    title: lang === "fr" ? "Se connecter" : "Login",
    description: lang === "fr" 
    ? "Connectez-vous sur le site ThisIsMyGame.com pour pourvoir présenter votre jeux vidéo et mettre à jour vos présentations." 
    : "Login on ThisIsMyGame.com. You may introduce your video game and update your introductions.",
    icons: {
      icon: "/icons/favicon.ico",
    },
  };
}

export default function Login() {

  return (
    <>
    <GeneralLayout>
      <AllCompLogin />
    </GeneralLayout>
    </>

  );
}
