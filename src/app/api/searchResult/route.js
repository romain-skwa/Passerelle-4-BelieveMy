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

        let game = await db.collection("introduction-database").find({
            nameofgame: { $regex: new RegExp(regexPattern, 'i') }
        }).limit(1).toArray();

        // Vérifier si le jeu a été trouvé
        if (game.length === 0) {
            return NextResponse.json({ game: null, error: "Ce jeu n'existe pas" }, { status: 404 });
        }

        game = game.map(g => ({
            ...g,
            _id: g._id.toString()
        }))[0];

        await client.close();

        return NextResponse.json({ game }, { status: 200 });
    } catch (error) {
        console.error(`Erreur à la fin de catch : `, error); 
        if (client) {
            await client.close();
        }
        return NextResponse.json({ game: null, error: error.message }, { status: 500 });
    }
}