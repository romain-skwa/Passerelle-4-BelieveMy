"use client";
// FLAG ; component inside api/dynamic/introduction
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";
import { toast } from "react-toastify";
import { sendReportEmail } from "@/actions/sendReportEmail"; // Importez votre fonction
import { updateFlag } from "@/actions/updateFlag";

export default function Flag({ gameId, nameOfGame, session, pathname }) {
  const { language } = useLanguage();
  const username = session.user.username;
console.log(`username : session.user.username dans le composant FLAG : `, username);
//const encodedUsername = encodeURIComponent(username);
//console.log(`encodedUsername = encodeURIComponent(username); dans le composant FLAG : `, encodedUsername);

  const handleFlag = async () => {
    if (!confirm("Souhaitez-vous signaler le contenu de cette page ?")) {
      return; // Si l'utilisateur annule, ne rien faire
    }

    // Appel de la fonction pour mettre à jour le flag
    const flagUpdateResult = await updateFlag(username, gameId, nameOfGame);

    if (!flagUpdateResult.success) {

      toast.error(flagUpdateResult.message); // Affiche un message d'erreur si le jeu a déjà été signalé
  
      return;
  
    }
  
  
    // Si le signalement a été ajouté avec succès, envoyez l'email
  
    const emailResult = await sendReportEmail({ gameId, nameOfGame, username, pathname });
  
  
    if (emailResult.success) {
  
      toast.success(emailResult.message);
  
    } else {
  
      toast.error(emailResult.message);
  
    }
  
  };

  return (
    <div 
      className="cursor-pointer text-xs text-center mt-4 tablet:text-right tablet:mr-8 tablet:mb-3" 
      onClick={handleFlag}
      >
      {language === "fr" ? "Signaler ce contenu" : "Flag"}
    </div>
  );
}