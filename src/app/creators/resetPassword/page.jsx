// src/app/resetPassword.js

"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import ButtonForm from "@/components/Button/ButtonForm";
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      return toast.error("Veuillez entrer votre courriel");
    }

    // Logique pour envoyer un e-mail de réinitialisation de mot de passe
    try {
      // Remplacez ceci par votre logique d'envoi d'e-mail
      // Par exemple, vous pouvez appeler une API pour gérer la réinitialisation
      await fetch("/api/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      toast.success(
        "Un e-mail de réinitialisation a été envoyé à votre adresse"
      );
    } catch (error) {
      toast.error("Erreur lors de l'envoi de l'e-mail");
    }
  };

  return (
    <GeneralLayout>
      <form onSubmit={handleSubmit} className="mt-36">
        <div className="input-component">
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-register-section"
          />
          <label htmlFor="email" className="label">
            Courriel
          </label>
        </div>

        <div className="flex justify-center">
          <ButtonForm type="submit">
            Envoyer le lien de réinitialisation
          </ButtonForm>
        </div>
      </form>
    </GeneralLayout>
  );
}
