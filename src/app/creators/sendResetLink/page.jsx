// src/app/resetPassword.js
// We send to the user an email to reset a password
"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import ButtonForm from "@/components/Button/ButtonForm";
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const { language } = useLanguage();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      return toast.error("Veuillez entrer votre courriel");
    }

    // Logique pour envoyer un e-mail de réinitialisation de mot de passe
    try {
      await fetch("/api/sendResetLink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      toast.success(
        language === "fr"
          ? "Un e-mail de réinitialisation a été envoyé à votre adresse."
          : "A reset email has been sent to your address."
      );
    } catch (error) {
      toast.error("Erreur lors de l'envoi de l'e-mail");
    }
  };

  return (
    <GeneralLayout>
      <form onSubmit={handleSubmit} className="mt-36">
        <div className="input_component">
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input_register_section"
            placeholder={language === "fr" ? "Courriel" : "Email"}
          />
          <label htmlFor="email" className="label"></label>
        </div>

        <div className="flex justify-center">
          <ButtonForm type="submit">
            {language === "fr"
              ? "Envoyer le lien de réinitialisation"
              : "Send reset link"}
          </ButtonForm>
        </div>
      </form>
    </GeneralLayout>
  );
}
