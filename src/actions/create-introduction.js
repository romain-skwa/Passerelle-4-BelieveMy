"use server";
// Creation of the introduction of the game in the database
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { MongoClient } from "mongodb";

// Vérifier si le nom du jeu existe déjà
const checkIfGameExists = async (nameOfGame) => {
  const client = await MongoClient.connect(process.env.MONGODB_CLIENT);
  const db = client.db(process.env.MONGODB_DATABASE);

  const existingGame = await db.collection("introduction-database").findOne({ nameofgame: nameOfGame });

  await client.close();

  return existingGame !== null; // Renvoie true si le jeu existe déjà
};

export const createIntroduction = async (formData) => {
  // Variable
  const session = await getServerSession(authOptions);

  // If the user isn't connected
  if (!session.user) {
    throw new Error("Vous devez être connecté");
  }

  // Récupérer le nom du jeu
  const nameOfGame = formData.get("nameOfGame");


  // Vérifier si le nom du jeu existe déjà
  const gameExists = await checkIfGameExists(nameOfGame);
  if (gameExists) {
    throw new Error("Ce nom de jeu existe déjà dans la base de données.");
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