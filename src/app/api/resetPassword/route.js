import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configure le transporteur pour envoyer l'email via un service SMTP comme Gmail, SendGrid, etc.
const transporter = nodemailer.createTransport({
  service: "gmail", // Exemple avec Gmail, tu peux utiliser un autre service SMTP
  auth: {
    user: process.env.EMAIL_USER, // L'email de l'expéditeur
    pass: process.env.EMAIL_PASS, // Le mot de passe de l'email ou la clé API si tu utilises un service tiers
  },
});

export async function POST(req) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ success: false, message: "Email manquant." }, { status: 400 });
  }

  try {
    // Générer un token de réinitialisation (ici, un simple UUID, mais tu peux utiliser un JWT)
    const resetToken = Math.random().toString(36).slice(2); // Ce n'est qu'un exemple, génère un token sécurisé en vrai

    // Crée un lien unique pour réinitialiser le mot de passe
    const resetLink = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password/${resetToken}`;

    // Envoi de l'email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Réinitialisation de mot de passe",
      html: `
        <p>Cliquez sur ce lien pour réinitialiser votre mot de passe :</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    });

    return NextResponse.json({ success: true, message: "Un email a été envoyé pour réinitialiser votre mot de passe." });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Erreur lors de l'envoi de l'email." }, { status: 500 });
  }
}
