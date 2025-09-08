import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { Resend } from "resend";

export async function POST(req) {
  const { email, language = "fr" } = await req.json();

  // Traductions
  const translations = {
    fr: {
      subject: 'Réinitialisation de mot de passe',
      content: `
        <p><b>${username}</b>,</p>
        <p>Pour réinitialiser votre mot de passe, cliquez sur le lien ci-dessous :</p>
        <p><a href="${resetLink}">${resetLink}</a></p>
      `,
      emailSent: "Un email a été envoyé pour réinitialiser votre mot de passe.",
      emailError: 'Erreur lors de l\'envoi de l\'email.',
      missingEmail: "Email manquant.",
      userNotFound: "Cet utilisateur n'existe pas"
    },
    en: {
      subject: 'Password Reset',
      content: `
        <p><b>${username}</b>,</p>
        <p>To reset your password, click on the link below:</p>
        <p><a href="${resetLink}">${resetLink}</a></p>
      `,
      emailSent: "An email has been sent to reset your password.",
      emailError: 'Error sending email.',
      missingEmail: "Missing email.",
      userNotFound: "This user does not exist"
    }
  };

  // When the language is not french, use english
  const t = language === "fr" ? translations.fr : translations.en;

  if (!email) {
    return NextResponse.json({ success: false, message: t.missingEmail }, { status: 400 });
  }

  let client;
  let user;
  console.log(`user : `, user);

  try {
    // Connect to the MongoDB cluster 
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);

    // Connect to the MongoDB database
    const db = client.db(process.env.MONGODB_DATABASE);

    // Get data about user
    user = await db.collection("créateurs").find({ email: email }).limit(1).toArray();

    // Chef if user exist
    if (user.length === 0) {
      throw new Error(t.userNotFound);
    }

    // Get the username from the data
    const username = decodeURIComponent(user[0].username);

    // Generate a reset token
    const resetToken = Math.random().toString(36).slice(2);
    const expirationDate = new Date(Date.now() + 3600000); 

    // Store the token in the database with the user's email
    await db.collection("réinitialisation_tokens").insertOne({
      email: user[0].email, // or user[0]._id if you are using the ID
      token: resetToken,
      expires: expirationDate,
    });

    // Create a unique link to reset your password
    const resetLink = `${process.env.NEXTAUTH_URL}/dynamic/resetPassword/resetPassword?token=${resetToken}`;

    // Sending the reset email
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: t.subject,
      html: `<p style="text-align: center;">This is my game.com</p>${t.content}`,
    });

    if (error) {
      console.error({ error });
      return NextResponse.json({ success: false, message: t.emailError }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: t.emailSent });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur ou de l\'envoi de l\'email:', error);
    if (client) {
      await client.close();
    }
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
    }
  }
}