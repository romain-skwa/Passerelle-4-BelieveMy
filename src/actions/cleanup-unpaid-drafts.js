"use server";

import { MongoClient, ObjectId } from "mongodb";

export const cleanupUnpaidDrafts = async () => {
  let client;
  try {
    // Connect to the MongoDB
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);

    // Connect to the MongoDB database
    const db = client.db(process.env.MONGODB_DATABASE);

    // Calculer la date limite (24h avant maintenant)
    const cutoffDate = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Supprimer les brouillons non payés de plus de 24h
    const result = await db.collection("introduction-database").deleteMany({
      status_payment: "pending",
      createdAt: { $lt: cutoffDate },
    });

    console.log(
      `Nettoyage terminé : ${result.deletedCount} brouillons supprimés`
    );

    return {
      success: true,
      deletedCount: result.deletedCount,
      message: `${result.deletedCount} brouillons non payés supprimés`,
    };
  } catch (error) {
    console.error("Erreur lors du nettoyage des brouillons:", error);
    throw new Error("Erreur lors du nettoyage des brouillons non payés");
  } finally {
    await client?.close();
  }
};
