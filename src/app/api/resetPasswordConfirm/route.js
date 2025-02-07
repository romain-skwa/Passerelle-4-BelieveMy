import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import bcrypt from 'bcrypt'; // Assurez-vous d'importer bcrypt

export async function POST(req) {
  const { token, newPassword } = await req.json();

  let client;

  try {
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);
    const db = client.db(process.env.MONGODB_DATABASE);

    // Vérifier le token et trouver l'utilisateur correspondant
    const user = await db.collection("réinitialisation_tokens").findOne({ token });
console.log(`user dans la console serveur qui contient le token : `, user);
    if (!user) {
      return NextResponse.json({ success: false, message: "Token invalide." }, { status: 400 });
    }

    // Hacher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Mettre à jour le mot de passe de l'utilisateur
    await db.collection("créateurs").updateOne(
      { email: user.email }, 
      { $set: { password: hashedPassword } }
    );

    // Supprimer le token après utilisation
    await db.collection("réinitialisation_tokens").deleteOne({ token });

    return NextResponse.json({ success: true, message: "Mot de passe réinitialisé avec succès." });
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error);
    return NextResponse.json({ success: false, message: "Erreur lors de la réinitialisation du mot de passe." }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
    }
  }
}