import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  let client;

  try {
    // Get and validates the data sent in the request
    const data = await request.json();
    const { genres = [], platforms = [], searchTerm = '' } = data; // Genre and Platform Recovery

    client = await MongoClient.connect(process.env.MONGODB_CLIENT);
    const db = client.db(process.env.MONGODB_DATABASE);

    // Building the MongoDB Query
    const query = {};
    if (genres && Array.isArray(genres) && genres.length > 0) {
      query.genreOfGame = { $in: genres }; // Search in multiple genres
    }
    if (platforms && Array.isArray(platforms) && platforms.length > 0) {
      query.platform = { $in: platforms }; // Search across multiple platforms
    }
    if (searchTerm) {
      query.nameofgame = { $regex: new RegExp(searchTerm, 'i') }; // Example of using text search    
    }

    // Log the MongoDB query before executing it
      //console.log("Requête MongoDB avec genres et plateformes:", query);

    const games = await db.collection("introduction-database").find(query, {
      projection: { // Projection to retrieve only the necessary fields
        nameofgame: 1,
        urlPosterCloudinary: 1,
        urlPoster: 1
      }
    }).toArray();

    // MongoDB Query Results Log
      //console.log("Jeux récupérés de la base de données:", games);

    if (games.length === 0) {
      return NextResponse.json({ games: [], error: "Aucun jeu trouvé" }, { status: 404 });
    }

    // Formatting the results
    const formattedGames = games.map(g => ({
      ...g,
      _id: g._id.toString() // Transforming _id into a string
    }));

    await client.close();

    // Connection closing log
      //console.log("Connexion à MongoDB fermée avec succès.");

    return NextResponse.json({ games: formattedGames }, { status: 200 });

  } catch (error) {
    console.error("Erreur dans le traitement de la requête:", error);

    // Handling MongoDB connection errors
    if (client) {
      await client.close();
    }

    return NextResponse.json({ games: [], error: "Erreur de connexion à la base de données" }, { status: 500 });
  }
}