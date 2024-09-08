"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth";

export const createIntroduction = async (formData) => {
  // Variable
  const session = await getServerSession(authOptions);

  // If the user isn't connected
  if (!session.user) {
    throw new Error("Vous devez être connecté");
  }

  let client;
  try {
    // Connect to the MongoDB
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);

    // Connect to the MongoDB database
    const db = client.db(process.env.MONGODB_DATABASE);

    // Add the post to the database
    await db.collection("introduction-database").insertOne({
      username: session.user.username,
      content: formData.get("introductionOfTheGame"),
      imageOne : formData.get("imageOne"),
      creation: new Date(),
    });


  } catch (e) {
    await client.close();
    throw new Error(e);
  }

  await client.close();
};
