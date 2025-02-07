import { NextResponse } from "next/server";
import { MongoClient } from "mongodb"; // Assurez-vous d'importer MongoClient
import { Resend } from "resend";

export async function POST(req) {
  const { email } = await req.json();
  console.log(`email : `, email);

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

    // Récupérer l'utilisateur
    user = await db.collection("créateurs").find({ email: email }).limit(1).toArray();

    // Vérifiez si l'utilisateur existe
    if (user.length === 0) {
      throw new Error("Cet utilisateur n'existe pas");
    }

    // Récupérer le nom d'utilisateur à partir de l'utilisateur trouvé
    const username = decodeURIComponent(user[0].username);
    console.log(`username : `, username);

    // Générer un token de réinitialisation
    const resetToken = Math.random().toString(36).slice(2); // Ce n'est qu'un exemple, génère un token sécurisé en vrai
    const expirationDate = new Date(Date.now() + 3600000); 

    // Stocker le token dans la base de données avec l'email de l'utilisateur
    await db.collection("réinitialisation_tokens").insertOne({
      email: user[0].email, // ou user[0]._id si vous utilisez l'ID
      token: resetToken,
      expires: expirationDate,
    });

    // Crée un lien unique pour réinitialiser le mot de passe
    const resetLink = `${process.env.NEXTAUTH_URL}/dynamic/resetPassword/resetPassword?token=${resetToken}`;

    // Envoi de l'email de réinitialisation
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
      await client.close(); // Assurez-vous de fermer le client en cas d'erreur
    }
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  } finally {
    if (client) {
      await client.close(); // Ferme le client MongoDB dans tous les cas
    }
  }
}