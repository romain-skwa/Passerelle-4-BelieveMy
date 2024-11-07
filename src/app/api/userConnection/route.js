import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    // Get the data about a creator by pseudo from the request body
    const data = await request.json();
    const { pseudo } = data;

    let client;

    try {
        // Connect to the MongoDB cluster
        client = await MongoClient.connect(process.env.MONGODB_CLIENT);

        // Connect to the MongoDB database
        const db = client.db(process.env.MONGODB_DATABASE);

        // First : Get the user
        let user = await db.collection("créateurs").find(
            { username: pseudo },
            { projection: { password: 0, email: 0 } } // Exclut le champ "password"
        ).limit(1).toArray();

        if(!user) {
            throw new Error("Cet utilisateur n'existe pas"); 
        }

        // Formatting
        user = user.map(user => ({
            ...user,
            _id: user._id.toString()
        }))[0];
        
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