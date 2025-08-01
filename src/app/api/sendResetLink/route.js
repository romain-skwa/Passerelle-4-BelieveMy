import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { Resend } from "resend";

export async function POST(req) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ success: false, message: "Email manquant." }, { status: 400 });
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
      throw new Error("Cet utilisateur n'existe pas");
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
      subject: 'Réinitialisation de mot de passe',
      html: `
        <p style="text-align: center;">This is my game.com</p>
        <p><b>${username}</b>,</p>
        <p>Pour réinitialiser votre mot de passe, cliquez sur le lien ci-dessous :</p>
        <p><a href="${resetLink}">${resetLink}</a></p>
        <p>Maintenant, on a toutes les pages.Avec le bon lien, c'est mieux.</p>
        <p>En fait, il manquait une partie de l'url.</p>
        <p>Avec searchParams, et un changement encore dans l'url</p>
        <p>Cette fois, on a ajouté la création du token dans la base de donnée avant de l'envoyer. Pour ça n'a pas été fait depuis le départ ?</p>
        <p>On y est presque</p>
        <p>J'ai changé la mise à jour. La façon dont on cherche la donnée à changer</p>
      `,
    });

    if (error) {
      console.error({ error });
      return NextResponse.json({ success: false, message: 'Erreur lors de l\'envoi de l\'email.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Un email a été envoyé pour réinitialiser votre mot de passe." });
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