"use server";
// Creation of the introduction of the game in the database
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { MongoClient, ObjectId } from "mongodb";

export const createIntroduction = async (formData) => {
  // Variable
  const session = await getServerSession(authOptions);

  // If the user isn't connected
  if (!session.user) {
    throw new Error("Vous devez être connecté");
  }

  let client;
  try {
    // Connect to the MongoDB
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);

    // Connect to the MongoDB database
    const db = client.db(process.env.MONGODB_DATABASE);

    // Prepare the introduction data
    const introductionData = {
      email: session.user.email,
      username: session.user.username,
      nameofgame: encodeURIComponent(formData.get("nameOfGame")),
      releaseDate: formData.get("releaseDate"),
      shortIntroduction: formData.get("shortIntroduction"),
      content: formData.get("introductionOfTheGame"),
      SoloMulti: JSON.parse(formData.get("SoloMulti")),
      urlPosterCloudinary: formData.get("urlPosterCloudinary"),
      urlImageOneCloudinary: formData.get("urlImageOneCloudinary"),
      urlImageTwoCloudinary: formData.get("urlImageTwoCloudinary"),
      urlImageThreeCloudinary: formData.get("urlImageThreeCloudinary"),
      urlBackgroundCloudinary: formData.get("urlBackgroundCloudinary"),
      isDarkMode: formData.get("isDarkMode"),
      isIntroOfYourself: formData.get("isIntroOfYourself"),
      selectedAgePegi: formData.get("selectedAgePegi"),
      selectedAdditionalPegi: formData.get("selectedAdditionalPegi"),
      platform: JSON.parse(formData.get("platform")),
      genreOfGame: JSON.parse(formData.get("genreOfGame")),
      videoLink: formData.get("videoLink")?.trim() || null,
      webSiteOfThisGame: formData.get("webSiteOfThisGame")?.trim() || null,
      webSiteOfThisCreator: formData.get("webSiteOfThisCreator")?.trim() || null,
      steamLink: formData.get("steamLink")?.trim() || null,
      epicGamesLink: formData.get("epicGamesLink")?.trim() || null,
      // Nouveaux champs pour les brouillons
      status_payment: formData.get("status_payment") || "pending", // "pending" ou "paid"
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Filtrer les valeurs nulles avant d'insérer dans la base de données
    Object.keys(introductionData).forEach((key) => {
      if (introductionData[key] === null) {
        delete introductionData[key];
      }
    });

    // Add the post to the database
    const result = await db
      .collection("introduction-database")
      .insertOne(introductionData);

    // Retourner l'ID du brouillon créé
    return result.insertedId.toString();
  } catch (e) {
    console.error(e); // Log the error for debugging
    throw new Error(
      "Une erreur est survenue lors de l'enregistrement des données."
    );
  } finally {
    await client?.close(); // Ensure the client is closed
  }
};

// Fonction pour activer un brouillon après paiement réussi
export const activateDraft = async (draftId) => {
  let client;
  try {
    // Connect to the MongoDB
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);

    // Connect to the MongoDB database
    const db = client.db(process.env.MONGODB_DATABASE);

    // Mettre à jour le statut du brouillon
    const result = await db.collection("introduction-database").updateOne(
      { _id: new ObjectId(draftId) },
      {
        $set: {
          status_payment: "paid",
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      throw new Error("Brouillon non trouvé");
    }

    return { success: true, message: "Présentation activée avec succès" };
  } catch (e) {
    console.error(e);
    throw new Error(
      "Une erreur est survenue lors de l'activation du brouillon."
    );
  } finally {
    await client?.close();
  }
};
