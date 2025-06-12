"use client";

import ButtonForm from "@/components/Button/ButtonForm";
import componentsCss from "@/app/styles/components.module.css";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkEmail } from "@/utils/check-email-syntax";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRef } from "react";
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";

export default function AllCompLogin() {
  // Variable 
  const router = useRouter();
  const { language } = useLanguage();
  const [focused, setFocused] = useState({ email: false, password: false });

  // -----------------------------
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
    <form action={prepareLogin} className="mt-36">
      <div className={componentsCss.input_component}>
        <input
          type="email"
          name="email"
          required
          onFocus={handleFocus}
          ref={emailInputRef}
          className={
            focused.email
              ? `${componentsCss.focused} ${componentsCss.input_register_section}`
              : `${componentsCss.input_register_section}`
          }
        />
        <label
          htmlFor="email"
          className={componentsCss.label}
          onClick={() => handleLabelClick(emailInputRef)}
        >
          {language == "fr" ? "Courriel" : "Email"}
        </label>
      </div>

      <div className={`${componentsCss.input_component}`}>
        <input
          type="password"
          name="password"
          required
          onFocus={handleFocus}
          ref={passwordInputRef}
          className={
            focused.password
              ? `${componentsCss.focused} ${componentsCss.input_register_section}`
              : `${componentsCss.input_register_section}`
          }
        />

        <label
          htmlFor="password"
          className={componentsCss.label}
          onClick={() => handleLabelClick(passwordInputRef)}
        >
          {language == "fr" ? "Mot de passe" : "Password"}
        </label>
      </div>

      {/*----------------------*/}

      <div className="flex justify-center">
        <ButtonForm>{language == "fr" ? "Se connecter" : "Login"}</ButtonForm>
      </div>

      <div className="flex justify-center">
        <Link href="../../creators/register">
          <ButtonForm formButton>
            {language == "fr" ? "S'inscrire" : "Sign up"}
          </ButtonForm>
        </Link>
      </div>
      <div className="flex justify-center">
        <Link href="../../creators/sendResetLink">
          <ButtonForm formButton>
            {language == "fr" ? "Mot de passe oublié ?" : "Forgot password ?"}
          </ButtonForm>
        </Link>
      </div>
    </form>
  );
}
