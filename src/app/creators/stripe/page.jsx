
import AllCompStripe from "@/components/AllCompStripe/AllCompStripe";
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";

// Function to generate dynamics metada
export async function generateMetadata({ searchParams }) {
  const { lang } = await searchParams; 
  return {
    title: lang === "fr" ? "Paiement" : "Payment",
    description: lang === "fr" 
    ? "Page de paiement sur Thisismygame.com" 
    : "Paiement page on Thisismygame.com",
    icons: {
      icon: "/icons/favicon.ico",
    },
  };
}

export default function Login() {

  return (
    <>
    <GeneralLayout>
      <AllCompStripe />
    </GeneralLayout>
    </>

  );
}
