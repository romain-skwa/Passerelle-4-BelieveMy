"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation"; // Importer useSearchParams
import { toast } from "react-toastify";
import ButtonForm from "@/components/Button/ButtonForm";
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Utiliser useSearchParams
  const token = searchParams.get("token"); // Récupérer le token depuis l'URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  console.log(`router : `, router);
  console.log(`token : `, token); // Affiche le token récupéré

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token) {
      return toast.error("Token manquant.");
    }

    if (!newPassword || !confirmPassword) {
      return toast.error("Veuillez entrer un nouveau mot de passe et sa confirmation.");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Les mots de passe ne correspondent pas.");
    }

    // Logique pour réinitialiser le mot de passe
    try {
      const response = await fetch("/api/resetPasswordConfirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Votre mot de passe a été réinitialisé avec succès.");
        // Rediriger l'utilisateur vers la page de connexion ou une autre page
        router.push("/creators/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Erreur lors de la réinitialisation du mot de passe.");
    }
  };

  return (
    <GeneralLayout>
      <form onSubmit={handleSubmit} className="mt-36">
        <div className="input-component">
          <input
            type="password"
            name="newPassword"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input-register-section"
            placeholder="Nouveau mot de passe"
          />
        </div>
        <div className="input-component">
          <input
            type="password"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-register-section"
            placeholder="Confirmer le mot de passe"
          />
        </div>
        <div className="flex justify-center">
          <ButtonForm type="submit" disabled={!token}>Réinitialiser le mot de passe</ButtonForm>
        </div>
      </form>
    </GeneralLayout>
  );
}