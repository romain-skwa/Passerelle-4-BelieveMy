"use server";
// Creation of the introduction of the game in the database
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { MongoClient } from "mongodb";

export const createIntroduction = async (formData) => {
  // Variable
  const session = await getServerSession(authOptions);

  // If the user isn't connected
  if (!session.user) {
    throw new Error("Vous devez être connecté");
  }

  /*********************************************************************/

  let client;
  try {
    // Connect to the MongoDB
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);

    // Connect to the MongoDB database
    const db = client.db(process.env.MONGODB_DATABASE);

    // Add the post to the database
    await db.collection("introduction-database").insertOne({
      email: session.user.email,
      username: session.user.username,
      nameofgame: formData.get("nameOfGame"),
      content: formData.get("introductionOfTheGame"),
      imageOne: formData.get("imageName"),
      isDarkMode: formData.get("isDarkMode"),
      creation: new Date(),
    });


  } catch (e) {
    await client.close();
    throw new Error(e);
  }

  await client.close();

};
