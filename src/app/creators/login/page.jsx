"use client";

import ButtonForm from "@/components/Button/ButtonForm";
import "../../styles/components.css";
import Link from "next/link";
import { toast } from "react-toastify";
import { checkEmail } from "@/utils/check-email-syntax";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import { useState } from "react";
import { useRef } from "react";

export default function Login() {
  // Variable
  const router = useRouter();

  const [focused, setFocused] = useState({ email: false, password: false });

  const handleFocus = (event) => {
    setFocused((prevFocused) => ({
      ...prevFocused,
      [event.target.name]: true,
    }));
  };

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleLabelClick = (ref) => {
    ref.current.focus();
  };

  // Function
  const prepareLogin = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    // if a field is empty
    if (!email || !password) {
      return toast.error("Veuillez remplir tous les champs du formulaire");
    }

    // Check if the email is valid
    if (!checkEmail(email)) {
      return toast.error("Veuillez entrer un courriel valide");
    }

    // Connect the user
    try {
      // Credentials est un provider : un service tiers utilisé pour l'identification des utilisateurs
      const response = await signIn(
        "credentials" /* Ne jamais mettre de majuscule dans ce nom */,
        {
          email,
          password,
          redirect: false,
        }
      );
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
  };
  return (
    <GeneralLayout>
      <form action={prepareLogin} className="mt-36">
        <div className="input-component">
          <input
            type="email"
            name="email"
            required
            onFocus={handleFocus}
            ref={emailInputRef}
            className={
              focused.email
                ? "focused input-register-section"
                : "input-register-section"
            }
          />
          <label
            htmlFor="email"
            className="label"
            onClick={() => handleLabelClick(emailInputRef)}
          >
            Courriel
          </label>
        </div>

        <div className="input-component">
          <input
            type="password"
            name="password"
            required
            onFocus={handleFocus}
            ref={passwordInputRef}
            className={
              focused.password
                ? "focused input-register-section"
                : "input-register-section"
            }
          />

          <label
            htmlFor="password"
            className="label"
            onClick={() => handleLabelClick(passwordInputRef)}
          >
            Mot de passe
          </label>
        </div>

        {/*----------------------*/}

        <div className="flex justify-center">
          <ButtonForm>Se connecter</ButtonForm>
        </div>

        <div className="flex justify-center">
          <Link href="../../creators/register">
            <ButtonForm formButton>S'inscrire</ButtonForm>
          </Link>
        </div>
        <div className="flex justify-center">
          <Link href="../../creators/resetPassword">
            <ButtonForm formButton>Mot de passe oublié ?</ButtonForm>
          </Link>
        </div>
      </form>
    </GeneralLayout>
  );
}
