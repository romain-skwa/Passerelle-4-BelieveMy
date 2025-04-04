"use server";

import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

// Get all data about user
export async function GET(request) {
    // Variable
    const session = await getServerSession(authOptions);
    
    // Check if the session exists
    if (!session || !session.user) {
        return NextResponse.json({ error: "Utilisateur non authentifié" }, { status: 401 });
    }

    // Get the email address of the logged in user
    const userMail = session.user.email;

    let client;

    try {
        // Connect to the MongoDB cluster
        client = await MongoClient.connect(process.env.MONGODB_CLIENT);

        // Connect to the MongoDB database
        const db = client.db(process.env.MONGODB_DATABASE);

        // Get data user but email
        const user = await db.collection("créateurs").findOne(
            { email: userMail },
            { projection: { password: 0 } } // Exclure le champ "password"
        );

        // Check if user exists
        if (!user) {
            throw new Error("Cet utilisateur n'existe pas");
        }

        await client.close();

        return NextResponse.json({
            user, // Returns the found user without the password data
        }, { status: 200 });
    } catch (error) {
        console.error(`Erreur à la fin de catch : `, error);
        if (client) {
            await client.close(); 
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}