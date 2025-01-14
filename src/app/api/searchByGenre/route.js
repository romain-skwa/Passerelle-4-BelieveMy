import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  let client;
  
  try {
    // Récupère et valide les données envoyées dans la requête
    const data = await request.json();
    const { genres } = data;

    console.log("Genres reçus dans l'API:", genres);

    // Validation des genres reçus
    if (!Array.isArray(genres) || genres.length === 0) {
      console.error("Genres sont invalides ou vides");
      return NextResponse.json({ games: [], error: "Genres invalides ou vides" }, { status: 400 });
    }

    client = await MongoClient.connect(process.env.MONGODB_CLIENT);
    const db = client.db(process.env.MONGODB_DATABASE);
    
    // Log de la requête MongoDB avant de l'exécuter
    console.log("Requête MongoDB avec genres:", genres);
    
    const games = await db.collection("introduction-database").find({
      genreOfGame: { $in: genres } // Utilisation de $in pour chercher dans plusieurs genres
    }, {
      projection: { // Projection pour récupérer uniquement les champs nécessaires
        nameofgame: 1,
        urlPosterCloudinary: 1,
        urlPoster: 1
      }
    }).toArray();

    // Log des résultats de la requête MongoDB
    console.log("Jeux récupérés de la base de données:", games);

    if (games.length === 0) {
      return NextResponse.json({ games: [], error: "Aucun jeu trouvé" }, { status: 404 });
    }

    // Formatage des résultats
    const formattedGames = games.map(g => ({
      ...g,
      _id: g._id.toString() // Transformation de _id en chaîne de caractères
    }));

    await client.close();
    
    // Log de la fermeture de la connexion
    console.log("Connexion à MongoDB fermée avec succès.");

    return NextResponse.json({ games: formattedGames }, { status: 200 });

  } catch (error) {
    console.error("Erreur dans le traitement de la requête:", error);
    
    // Gestion des erreurs de connexion à MongoDB
    if (client) {
      await client.close();
    }

    return NextResponse.json({ games: [], error: "Erreur de connexion à la base de données" }, { status: 500 });
  }
}
