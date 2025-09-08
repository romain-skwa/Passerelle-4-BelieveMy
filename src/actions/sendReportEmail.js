// actions/sendReportEmail.js
"use server";
// I am a french webmaster so I do not translate the email.
import { Resend } from "resend";

export const sendReportEmail = async ({ gameId, nameOfGame, username, pathname }) => {
  const decodedNameOfGame = decodeURIComponent(nameOfGame);
  console.log(`decodedNameOfGame = decodeURIComponent(nameOfGame); : dans actions/sendReportEmail.js : `, decodedNameOfGame);
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [process.env.MY_ADRESS_MAIL],
      subject: `Contenu signalé : ${decodedNameOfGame}`,
      html: `
        <p style="text-align: center;">This is my game.com</p>
        <br>
        <p>
            <i>${username}</i> a signalé le contenu interdit sur la page <a href="http://localhost:3000/${pathname}"><u>localhost:3000/${pathname}</u></a> concernant le jeu : <b>${decodedNameOfGame}</b>.
        </p>
        <p>Identifiant du jeu : ${gameId}</p>
      `,
    });

    if (error) {
      console.error({ error });
      return { success: false, message: "Erreur lors de l'envoi de l'email." };
    }

    console.log("Email sent successfully:", data);
    return { success: true, message: "Un courriel de signalement a été envoyé." };
  } catch (error) {
    console.error("Erreur lors du signalement:", error);
    return { success: false, message: "Erreur lors du signalement" };
  }
};