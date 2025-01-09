"use server";
// Importations nécessaires
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { MongoClient, ObjectId } from "mongodb";

// Fonction pour mettre à jour l'introduction d'un jeu
export const updateIntroduction = async (formData) => {
  const session = await getServerSession(authOptions);

  // Vérifier si l'utilisateur est connecté
  if (!session.user) {
    throw new Error("Vous devez être connecté");
  }

  // Récupérer l'identifiant du jeu et les nouvelles données
  const gameId = formData.get("gameId");
  const email = formData.get("email");

  let client;
  try {
    // Connecter à MongoDB
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);
    const db = client.db(process.env.MONGODB_DATABASE);

    // Décoder le gameId si nécessaire (si c'est encodé en URL)
    const decodedGameId = decodeURIComponent(gameId);
    // Convertir gameId en ObjectId si nécessaire
    const objectId = new ObjectId(decodedGameId);

    // Préparer les données à mettre à jour
    const updateData = {
      nameofgame: formData.get("nameOfGame"),
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
      updatedAt: new Date(), // Date de mise à jour
    };

    // Préparer un objet pour $unset
    const unsetData = {};

    // Filtrer les valeurs nulles et undefined avant de mettre à jour dans la base de données
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === null || updateData[key] === undefined) {
        unsetData[key] = ""; // Ajouter le champ à unsetData
        delete updateData[key]; // Supprimer le champ de updateData
      }
    });

    // Mettre à jour le document dans la base de données
    const result = await db.collection("introduction-database").updateOne(
      { _id: objectId, email: email }, // Filtre pour retrouver les bonnes données
      { 
        $set: updateData, // Mise à jour des champs
        $unset: unsetData // Suppression des champs null ou undefined
      }
    );

    if (result.modifiedCount === 0) {
      throw new Error("Aucune mise à jour effectuée. Vérifiez l'identifiant du jeu.");
    }
  } catch (e) {
    console.error("Erreur lors de la mise à jour:", e); // Log l'erreur pour le débogage
    throw new Error("Une erreur est survenue lors de la mise à jour des données.");
  } finally {
    await client?.close(); // Assurez-vous que le client est fermé
  }
};