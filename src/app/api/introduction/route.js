import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {



    // Get the nameofgame from the request body
    const data = await request.json();
    const { nameofgame } = data;

    let client;

    try {
        // Connect to the MongoDB cluster
        client = await MongoClient.connect(process.env.MONGODB_CLIENT);

        // Connect to the MongoDB database
        const db = client.db(process.env.MONGODB_DATABASE);

        // First : Get the game
        let game = await db.collection("introduction-database").find( { nameofgame : nameofgame } ).limit(1).toArray();

        if(!game) {
            throw new Error("Ce jeu n'existe pas");
        }

        // Formatting
        game = game.map(game => ({
            ...game,
            _id: game._id.toString()
        }))[0];

        await client.close();

        return NextResponse.json({
            game,
        }, { status: 200 },
    );
    } catch (error) {
        console.error(`Erreur à la fin de catch : `, error); 
        await client.close();
        throw new Error({error: error.message});
    }
}