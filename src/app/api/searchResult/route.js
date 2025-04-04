import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    const data = await request.json();
    const { nameofgame } = data;

    const searchTerms = nameofgame.split(' ').map(term => term.trim()).filter(term => term);
    const regexPattern = searchTerms.join('|'); // Créer un motif comme "mot1|mot2"
    
    let client;

    try {
        client = await MongoClient.connect(process.env.MONGODB_CLIENT);
        const db = client.db(process.env.MONGODB_DATABASE);

        const games = await db.collection("introduction-database").find({
            nameofgame: { $regex: new RegExp(regexPattern, 'i') }
        }, {
            projection: { // Projection to retrieve only the necessary fields
                nameofgame: 1,
                urlPosterCloudinary: 1,
                urlPoster: 1
            }
        }).toArray(); // Recover all games

        // Check if any games were found
        if (games.length === 0) {
            return NextResponse.json({ games: [], error: "Aucun jeu trouvé" }, { status: 404 });
        }

        // Convert _ids to strings
        const formattedGames = games.map(g => ({
            ...g,
            _id: g._id.toString()
        }));

        await client.close();

        return NextResponse.json({ games: formattedGames }, { status: 200 });
    } catch (error) {
        console.error(`Erreur à la fin de catch : `, error); 
        if (client) {
            await client.close();
        }
        return NextResponse.json({ games: [], error: error.message }, { status: 500 });
    }
}