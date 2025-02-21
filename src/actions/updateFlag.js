"use server";

import { MongoClient } from "mongodb";

export const updateFlag = async (username, gameId, nameOfGame) => {
  const client = await MongoClient.connect(process.env.MONGODB_CLIENT);
  const db = client.db(process.env.MONGODB_DATABASE);
  const encodedUsername = encodeURIComponent(username);
  try {
    // Rechercher l'utilisateur par son nom d'utilisateur
    const user = await db.collection("créateurs").findOne({ username: encodedUsername });

    if (!user) {
      return { success: false, message: "Utilisateur non trouvé." };
    }

    // Vérifier si le champ flag existe et s'il contient déjà le jeu
    const existingFlags = user.flag || [];
    const gameAlreadyReported = existingFlags.some(flag => flag.gameId === gameId && flag.nameOfGame === nameOfGame);

    if (gameAlreadyReported) {
      return { success: false, message: "Vous avez déjà signalé ce jeu." };
    }

    // Ajouter le nouveau signalement
    const newFlag = { gameId, nameOfGame };
    await db.collection("créateurs").updateOne(
      { username: encodedUsername },
      { $push: { flag: newFlag } } // Ajoute le nouveau signalement au tableau flag
    );

    return { success: true, message: "Signalement ajouté avec succès." };
  } catch (error) {
    console.error("Erreur lors de la mise à jour du flag:", error);
    return { success: false, message: "Erreur lors de la mise à jour du flag." };
  } finally {
    await client.close();
  }
};