import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  let client;

  try {
    // Récupère et valide les données envoyées dans la requête
    const data = await request.json();
    const { genres = [], platforms = [] } = data; // Récupération des genres et plateformes

    console.log("Genres reçus dans l'API:", genres);
    console.log("Plateformes reçues dans l'API:", platforms);

    client = await MongoClient.connect(process.env.MONGODB_CLIENT);
    const db = client.db(process.env.MONGODB_DATABASE);

    // Construction de la requête MongoDB
    const query = {};
    if (genres && Array.isArray(genres) && genres.length > 0) {
      query.genreOfGame = { $in: genres }; // Cherche dans plusieurs genres
    }
    if (platforms && Array.isArray(platforms) && platforms.length > 0) {
      query.platform = { $in: platforms }; // Cherche dans plusieurs plateformes
    }

    // Log de la requête MongoDB avant de l'exécuter
    console.log("Requête MongoDB avec genres et plateformes:", query);

    const games = await db.collection("introduction-database").find(query, {
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