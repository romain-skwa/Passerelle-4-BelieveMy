import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    const user = await request.json();
    console.log(`user : `, user);

    let client;
    console.log("La fonction POST a été appelée");
    try {
        console.log("Connexion à MongoDB..."); // Log avant la connexion
        // Connect to the MongoDB cluster
        client = await MongoClient.connect(process.env.MONGODB_CLIENT);

        // Connect to the MongoDB database
        const db = client.db(process.env.MONGODB_DATABASE);

        const normalizedUsername = decodeURIComponent(user.username).normalize("NFC");
        console.log(`normalizedUsername : `, normalizedUsername);
        // Récupérer les jeux par email
        const games = await db.collection("introduction-database").find(
            { username: normalizedUsername },
            { projection: { nameofgame: 1, urlPoster: 1, urlPosterCloudinary: 1 } }
        ).toArray();

        console.log(`Jeux trouvés: ${games.length}`); // Log pour le nombre de jeux trouvés

        // Afficher les jeux récupérés dans la console
        //console.log("Jeux récupérés:", JSON.stringify(games, null, 2)); // Affichage formaté des jeux

        // Formatage des données
        const formattedGames = games.map(game => ({
            ...game,
            _id: game._id.toString(),
            urlPoster: game.urlPoster || game.urlPosterCloudinary // Utiliser urlPosterCloudinary si urlPoster n'existe pas
        }));

        await client.close();

        console.log("Réponse envoyée avec succès."); // Log avant d'envoyer la réponse

        return NextResponse.json({
            games: formattedGames,
        }, { status: 200 });
    } catch (error) {
        console.error(`Erreur à la fin de catch : `, error);
        await client.close();
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}