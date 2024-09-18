import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    // Get the nameofgame from the request body
    const data = await request.json();
    const { nameofgame } = data;
    //console.log('Valeur de nameofgame :', nameofgame); // C'est bon

    let client;

    try {
        // Connect to the MongoDB cluster
        client = await MongoClient.connect(process.env.MONGODB_CLIENT);

        // Connect to the MongoDB database
        const db = client.db(process.env.MONGODB_DATABASE);

        // First : Get the game
        //console.log('Requête MongoDB :', `db.collection("introduction-database").find({ ${nameofgame} }).limit(1).toArray()`); // Ça marche
        let game = await db.collection("introduction-database").find( { nameofgame : nameofgame } ).limit(1).toArray();

        if(!game) {
            throw new Error("Cet utilisateur n'existe pas");
        }

        //console.log(`Juste avant le map : `, game);
        // Formatting
        game = game.map(game => ({
            ...game,
            _id: game._id.toString()
        }))[0];

        //console.log(`Erreur juste après Formatting : `, game);

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