// src/app/api/checkIfGameExists/route.js
"use server";

import { MongoClient } from 'mongodb';

// Check if the game name already exists
const checkIfGameExists = async (gameToCheck) => {
  const client = await MongoClient.connect(process.env.MONGODB_CLIENT);
  const db = client.db(process.env.MONGODB_DATABASE);

  const existingGame = await db.collection("introduction-database").findOne({ nameofgame: gameToCheck });

  await client.close();

  return existingGame !== null; // Renvoie true si le jeu existe déjà
};

// Handler for API - POST method
export async function POST(req) {
  const { gameToCheck } = await req.json(); // Retrieve the game name from the request body

  if (!gameToCheck) {
    return new Response(JSON.stringify({ error: 'Le nom du jeu est requis.' }), { status: 400 });
  }

  try {
    const exists = await checkIfGameExists(gameToCheck);
    return new Response(JSON.stringify({ exists }), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la vérification du jeu :", error);
    return new Response(JSON.stringify({ error: 'Une erreur est survenue lors de la vérification.' }), { status: 500 });
  }
}