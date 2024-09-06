"use client";

import ButtonForm from "@/components/Button/ButtonForm";
import "../../styles/components.css";
import Link from "next/link";
import { toast } from "react-toastify";
import { checkEmail } from "@/utils/check-email-syntax";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";

export default function Login() {
  // Variable
  const router = useRouter();

  // Function
  const prepareLogin = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    // if a field is empty
    if(!email || !password){
      return toast.error("Veuillez remplir tous les champs du formulaire");
    }

    // Check if the email is valid
    if(!checkEmail(email)) {
      return toast.error("Veuillez entrer un courriel valide")
    }

    // Connect the user
    try { // Credentials est un provider : un service tiers utilisé pour l'dientification des utilisateurs
      const response = await signIn("credentials"/* Ne jamais mettre de majuscule dans ce nom */, {
        email,
        password,
        redirect: false
      })
      if (response.error) {
        return toast.error(response.error);
      }
    } catch (error) {
      return toast.error(error.message);
    }

    // Success
    toast.success("Vous êtes connecté");

    // Redirect
    router.replace("/");

    console.log(
      `Dans le formulaire de CONNEXION de compte : `,
      email,
      password
    );
  };
  return (
    <GeneralLayout>
    <form action={prepareLogin}>
      <input
        type="email"
        name="email"
        placeholder="Courriel"
        className="input-register-section"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Mot de passe"
        className="input-register-section"
        required
      />
      {/*----------------------*/}
      <div className="flex justify-center">
        <ButtonForm>Se connecter</ButtonForm>
      </div>

      <div className="flex justify-center">
        <Link href="../../creators/register">
          <ButtonForm formButton>S'inscrire</ButtonForm>
        </Link>
      </div>
    </form>
    </GeneralLayout>
  );
}
