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
  /**
   * Handles the focus event on input fields
   * Updates the focused state to track which field is currently active
   * This enables visual feedback and animations for better UX
   * @param {Event} event - The focus event object
   */
  const handleFocus = (event) => {
    // Update the focused state by spreading previous state and setting the current field to true
    // event.target.name will be either 'email' or 'password'
    setFocused((prevFocused) => ({
      ...prevFocused,
      [event.target.name]: true,
    }));
  };

  // Create refs to directly access the DOM elements of input fields
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  /**
   * Handles click events on labels to focus the corresponding input field
   * This improves UX by providing a larger clickable area and better accessibility
   * @param {React.RefObject} ref - Reference to the input field to focus
   */
  const handleLabelClick = (ref) => {
    // Programmatically focus the input field when its label is clicked
    // This creates a more intuitive user experience
    ref.current.focus();
  };

  /**
   * Converts input value to lowercase in real-time
   * This ensures email addresses are always in lowercase format
   * @param {Event} event - The change event object
   */
  const handleEmailChange = (event) => {
    // Convert the input value to lowercase
    event.target.value = event.target.value.toLowerCase();
  };

  // Function
  const prepareLogin = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    // if a field is empty
    if (!email || !password) {
      return toast.error(
        language === "fr" 
          ? "Veuillez remplir tous les champs du formulaire" 
          : "Please fill in all form fields"
      );
    }

    // Check if the email is valid
    if (!checkEmail(email)) {
      return toast.error(
        language === "fr" 
          ? "Veuillez entrer un courriel valide" 
          : "Please enter a valid email"
      );
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
    toast.success(
      language === "fr" 
        ? "Vous êtes connecté" 
        : "You are logged in"
    );

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
          onChange={handleEmailChange}
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
