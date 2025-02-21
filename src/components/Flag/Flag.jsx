"use client";
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";
import { toast } from "react-toastify";
import { sendReportEmail } from "@/actions/sendReportEmail"; // Importez votre fonction

export default function Flag({ gameId, nameOfGame, session, pathname }) {
  const { language } = useLanguage();
  const decodedUsername = decodeURIComponent(session.user.username);

  const handleFlag = async () => {
    if (!confirm("Souhaitez-vous signaler le contenu de cette page ?")) {
      return; // Si l'utilisateur annule, ne rien faire
    }

    // Appel de la fonction d'envoi d'email
    const result = await sendReportEmail({ gameId, nameOfGame, decodedUsername, pathname });

    if (result.success) {
      toast.success("Un courriel de signalement a été envoyé.");
    } else {
      toast.error("Erreur lors du signalement");
    }
  };

  return (
    <div className="cursor-pointer text-xs text-center mt-4 tablet:text-right tablet:mr-8 tablet:mb-3" onClick={handleFlag}>
      {language === "fr" ? "Signaler ce contenu" : "Flag"}
    </div>
  );
}