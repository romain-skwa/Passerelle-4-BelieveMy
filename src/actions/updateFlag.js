"use server";

import { MongoClient } from "mongodb";

export const updateFlag = async (username, gameId, nameOfGame) => {
  const client = await MongoClient.connect(process.env.MONGODB_CLIENT);
  const db = client.db(process.env.MONGODB_DATABASE);
  const encodedUsername = encodeURIComponent(username);
  try {
    // Search user by username
    const user = await db.collection("créateurs").findOne({ username: encodedUsername });

    if (!user) {
      return { success: false, message: "Utilisateur non trouvé." };
    }

    // Check if the flag field exists and if it already contains the game
    const existingFlags = user.flag || [];
    const gameAlreadyReported = existingFlags.some(flag => flag.gameId === gameId && flag.nameOfGame === nameOfGame);

    if (gameAlreadyReported) {
      return { success: false, message: "Vous avez déjà signalé ce jeu." };
    }

    // Add the new report
    const newFlag = { gameId, nameOfGame };
    await db.collection("créateurs").updateOne(
      { username: encodedUsername },
      { $push: { flag: newFlag } } // Add the new flag to the flag table
    );

    return { success: true, message: "Signalement ajouté avec succès." };
  } catch (error) {
    console.error("Erreur lors de la mise à jour du flag:", error);
    return { success: false, message: "Erreur lors de la mise à jour du flag." };
  } finally {
    await client.close();
  }
};