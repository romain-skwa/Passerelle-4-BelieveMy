// Linked to UpdateIntro component in dynamic/introduction
"use server";
// Necessary imports
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { MongoClient, ObjectId } from "mongodb";

// Function to update a game's introduction
export const updateIntroduction = async (formData) => {
  const session = await getServerSession(authOptions);

  // Check if user is logged in
  if (!session.user) {
    throw new Error("Vous devez être connecté");
  }

  // Retrieve game ID and new data 
  const gameId = formData.get("gameId");
  const email = formData.get("email");

  let client;
  try {
    // Connect to MongoDB
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);
    const db = client.db(process.env.MONGODB_DATABASE);

    // Decode the gameId if necessary (if it's URL encoded)
    const decodedGameId = decodeURIComponent(gameId);
    // Convert gameId to ObjectId if necessary
    const objectId = new ObjectId(decodedGameId);

    // Prepare the data to be updated
    const updateData = {
      nameofgame: formData.get("nameOfGame"),
      releaseDate: formData.get("releaseDate"),
      shortIntroduction: formData.get("shortIntroduction"),
      content: formData.get("introductionOfTheGame"),
      SoloMulti: JSON.parse(formData.get("SoloMulti")),
      urlPosterCloudinary: formData.get("urlPosterCloudinary") || null,
      urlPoster: formData.get("urlPoster") || null,
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

    // Prepare an object for $unset
    const unsetData = {};

    // Filter out null and undefined values ​​before updating in the database
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === null || updateData[key] === undefined) {
        unsetData[key] = ""; // Add the field to unsetData
        delete updateData[key]; // Remove the field from updateData
      }
    });

    // Update the document in the database
    const result = await db.collection("introduction-database").updateOne(
      { _id: objectId, email: email }, // Filter to find the right data
      { 
        $set: updateData, // Updating fields
        $unset: unsetData // Removing null or undefined fields
      }
    );

    if (result.modifiedCount === 0) {
      throw new Error("Aucune mise à jour effectuée. Vérifiez l'identifiant du jeu.");
    }
  } catch (e) {
    console.error("Erreur lors de la mise à jour:", e); // Log l'erreur pour le débogage
    throw new Error("Une erreur est survenue lors de la mise à jour des données.");
  } finally {
    await client?.close(); // Make sure the client is closed
  }
};