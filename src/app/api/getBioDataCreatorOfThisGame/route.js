"use server";

import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

    // Get all data about user
export async function POST(request) {

    const data = await request.json();
    const { creatorOfThisGame } = data;
    // Variable
    
    let client;

    try {
        // Connect to the MongoDB cluster
        client = await MongoClient.connect(process.env.MONGODB_CLIENT);

        // Connect to the MongoDB database
        const db = client.db(process.env.MONGODB_DATABASE);

        // Get user data
        const user = await db.collection("créateurs").find({ username: creatorOfThisGame }, { projection: { bio: 1, _id: 0 } } ).limit(1).toArray();

        // Check if user exists
        if (user.length === 0) {
            throw new Error("Cet utilisateur n'existe pas");
        }

        await client.close();

        return NextResponse.json({
            user: user[0], // Returns the first user found
        }, { status: 200 });
    } catch (error) {
        console.error(`Erreur à la fin de catch : `, error);
        if (client) {
            await client.close(); // Make sure to close the client if there is an error
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}