import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    const user = await request.json();
    // console.log(`user : `, user);

    let client;
    // console.log("La fonction POST a été appelée");
    try {
        // console.log("Connexion à MongoDB..."); // Log before connection
        // Connect to the MongoDB cluster
        client = await MongoClient.connect(process.env.MONGODB_CLIENT);

        // Connect to the MongoDB database
        const db = client.db(process.env.MONGODB_DATABASE);

        const normalizedUsername = decodeURIComponent(user.username).normalize("NFC");
        // console.log(`normalizedUsername : `, normalizedUsername);
        // Find games via email
        const games = await db.collection("introduction-database").find(
            { username: normalizedUsername },
            { projection: { nameofgame: 1, urlPoster: 1, urlPosterCloudinary: 1, shortIntroduction: 1, } }
        ).toArray();

        // console.log(`Jeux trouvés: ${games.length}`); // Log for the number of games found

        // Data formatting
        const formattedGames = games.map(game => ({
            ...game,
            _id: game._id.toString(),
            urlPoster: game.urlPoster || game.urlPosterCloudinary // Use urlPosterCloudinary if urlPoster does not exist
        }));

        await client.close();

        // console.log("Réponse envoyée avec succès."); // Log before sending the response

        return NextResponse.json({
            games: formattedGames,
        }, { status: 200 });
    } catch (error) {
        console.error(`Erreur à la fin de catch : `, error);
        await client.close();
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}