// src/app/api/checkIfGameExists/route.js
"use server";

import { MongoClient } from 'mongodb';

// Vérifier si le nom du jeu existe déjà
const checkIfGameExists = async (gameToCheck) => {
  const client = await MongoClient.connect(process.env.MONGODB_CLIENT);
  const db = client.db(process.env.MONGODB_DATABASE);

  const existingGame = await db.collection("introduction-database").findOne({ nameofgame: gameToCheck });

  await client.close();

  return existingGame !== null; // Renvoie true si le jeu existe déjà
};

// Handler pour l'API - méthode POST
export async function POST(req) {
  const { gameToCheck } = await req.json(); // Récupérer le nom du jeu du corps de la requête

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