"use server";

import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

// Get all data about user
export async function GET(request) {
    // Variable
    const session = await getServerSession(authOptions);
    
    // Vérifiez si la session existe
    if (!session || !session.user) {
        return NextResponse.json({ error: "Utilisateur non authentifié" }, { status: 401 });
    }

    // Récupérer l'adresse e-mail de l'utilisateur connecté
    const userMail = session.user.email;

    let client;

    try {
        // Connect to the MongoDB cluster
        client = await MongoClient.connect(process.env.MONGODB_CLIENT);

        // Connect to the MongoDB database
        const db = client.db(process.env.MONGODB_DATABASE);

        // Récupérer l'utilisateur sans le mot de passe
        const user = await db.collection("créateurs").findOne(
            { email: userMail },
            { projection: { password: 0 } } // Exclure le champ "password"
        );

        // Vérifiez si l'utilisateur existe
        if (!user) {
            throw new Error("Cet utilisateur n'existe pas");
        }

        await client.close();

        return NextResponse.json({
            user, // Renvoie l'utilisateur trouvé sans le mot de passe
        }, { status: 200 });
    } catch (error) {
        console.error(`Erreur à la fin de catch : `, error);
        if (client) {
            await client.close(); // Assurez-vous de fermer le client en cas d'erreur
        }
        return NextResponse.json({ error: error.message }, { status: 500 }); // Renvoie un message d'erreur
    }
}