// src/app/api/send-email/route.js
import { sendEmail } from "@/nodemailer"; // Assure-toi que le chemin est correct

export async function POST(request) {
  const { to, subject, text } = await request.json();

  try {
    await sendEmail(to, subject, text);
    console.log("Mail envoyé avec succès");
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    console.log("ERREUR durant l'envoi du mail.");
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}