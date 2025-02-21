// actions/sendReportEmail.js
"use server"; // Indique que ce fichier est exécuté côté serveur

import { Resend } from "resend";

export const sendReportEmail = async ({ gameId, nameOfGame, decodedUsername, pathname }) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["nostromo_site@yahoo.fr"],
      subject: `Contenu signalé : ${nameOfGame}`,
      html: `
        <p style="text-align: center;">This is my game.com</p>
        <br>
        <p>
            <i>${decodedUsername}</i> a signalé le contenu interdit sur la page <a href="http://localhost:3000/${pathname}"><u>localhost:3000/${pathname}</u></a> concernant le jeu : <b>${nameOfGame}</b>.
        </p>
        <p>Identifiant du jeu : ${gameId}</p>
      `,
    });

    if (error) {
      console.error({ error });
      // Note : `toast` ne fonctionnera pas ici car il s'agit d'un environnement serveur
      return { success: false, message: "Erreur lors de l'envoi de l'email." };
    }

    console.log("Email sent successfully:", data);
    return { success: true, message: "Un courriel de signalement a été envoyé." };
  } catch (error) {
    console.error("Erreur lors du signalement:", error);
    return { success: false, message: "Erreur lors du signalement" };
  }
};