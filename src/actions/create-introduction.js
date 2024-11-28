"use server";
// Creation of the introduction of the game in the database
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { MongoClient } from "mongodb";

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
      nameofgame: formData.get("nameOfGame"),
      releaseDate: formData.get("releaseDate"),
      shortIntroduction: formData.get("shortIntroduction"),
      content: formData.get("introductionOfTheGame"),
      urlPoster: formData.get("urlPoster"),
      //poster: formData.get("poster"), pour plus tard, quand il faudra stocker l'image sur un serveur
      urlImageBackground: formData.get("urlImageBackground"),
      //poster: formData.get("imageBackground"), pour plus tard, quand il faudra stocker l'image sur un serveur
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
      creation: new Date(),
    };

    // Filtrer les valeurs nulles avant d'insérer dans la base de données
    Object.keys(introductionData).forEach(key => {
      if (introductionData[key] === null) {
        delete introductionData[key];
      }
    });
   
    // Add the post to the database
    await db.collection("introduction-database").insertOne(introductionData);
  } catch (e) {
    console.error(e); // Log the error for debugging
    throw new Error("Une erreur est survenue lors de l'enregistrement des données.");
  } finally {
    await client?.close(); // Ensure the client is closed
  }
};