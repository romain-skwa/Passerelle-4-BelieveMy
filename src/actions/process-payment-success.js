"use server";
// Traitement après paiement réussi
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { MongoClient } from "mongodb";

export const processPaymentSuccess = async (validatedData) => {
  const session = await getServerSession(authOptions);

  // Si l'utilisateur n'est pas connecté
  if (!session?.user) {
    throw new Error("Vous devez être connecté");
  }

  let client;
  try {
    // Les images ont déjà été uploadées côté client, on utilise les URLs
    const urlMongoDB = validatedData.uploadedUrls || {};

    // 2. Connecter à MongoDB
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);
    const db = client.db(process.env.MONGODB_DATABASE);

    // 3. Préparer les données d'introduction
    const introductionData = {
      email: session.user.email,
      username: session.user.username,
      nameofgame: validatedData.nameOfGame,
      releaseDate: validatedData.releaseDate,
      shortIntroduction: validatedData.shortIntroduction,
      content: validatedData.introductionOfTheGame,
      SoloMulti: validatedData.SoloMulti,
      urlPosterCloudinary: urlMongoDB.posterGlimpseFile || "",
      urlImageOneCloudinary: urlMongoDB.imageOneGlimpseFile || "",
      urlImageTwoCloudinary: urlMongoDB.imageTwoGlimpseFile || "",
      urlImageThreeCloudinary: urlMongoDB.imageThreeGlimpseFile || "",
      urlBackgroundCloudinary: urlMongoDB.backgroundGlimpseFile || "",
      isDarkMode: validatedData.isDarkMode,
      isIntroOfYourself: validatedData.isIntroOfYourself,
      selectedAgePegi: validatedData.selectedAgePegi,
      selectedAdditionalPegi: validatedData.selectedAdditionalPegi,
      platform: validatedData.platform,
      genreOfGame: validatedData.genreOfGame,
      videoLink: validatedData.videoLink?.trim() || null,
      webSiteOfThisGame: validatedData.webSiteOfThisGame?.trim() || null,
      webSiteOfThisCreator: validatedData.webSiteOfThisCreator?.trim() || null,
      steamLink: validatedData.steamLink?.trim() || null,
      epicGamesLink: validatedData.epicGamesLink?.trim() || null,
      status_payment: "paid", // Statut "paid" directement
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Filtrer les valeurs nulles
    Object.keys(introductionData).forEach((key) => {
      if (introductionData[key] === null) {
        delete introductionData[key];
      }
    });

    // 4. Insérer dans MongoDB
    const result = await db
      .collection("introduction-database")
      .insertOne(introductionData);

    return {
      success: true,
      message: "Présentation créée avec succès",
      introductionId: result.insertedId.toString(),
    };
  } catch (error) {
    console.error("Erreur lors du traitement après paiement:", error);
    throw new Error(
      "Une erreur est survenue lors de la création de la présentation."
    );
  } finally {
    if (client) {
      await client.close();
    }
  }
};
