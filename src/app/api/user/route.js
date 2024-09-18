import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    // Get the pseudo from the request body
    const data = await request.json();
    const { pseudo } = data;
    //console.log('Valeur de pseudo :', pseudo); // C'est bon

    let client;

    try {
        // Connect to the MongoDB cluster
        client = await MongoClient.connect(process.env.MONGODB_CLIENT);

        // Connect to the MongoDB database
        const db = client.db(process.env.MONGODB_DATABASE);

        // First : Get the user
        console.log('Requête MongoDB :', `db.collection("créateurs").find({ ${pseudo} }).limit(1).toArray()`); // Ça marche
        let user = await db.collection("créateurs").find( { username: pseudo } ).limit(1).toArray();

        if(!user) {
            throw new Error("Cet utilisateur n'existe pas");
        }

        console.log(`Juste avant le map : `,user);
        // Formatting
        user = user.map(user => ({
            ...user,
            _id: user._id.toString()
        }))[0];

        console.log(`Erreur juste après Formatting : `, user);

        await client.close();

        return NextResponse.json({
            user,
        }, { status: 200 },
    );
    } catch (error) {
        console.error(`Erreur à la fin de catch : `, error); 
        await client.close();
        throw new Error({error: error.message});
    }
}