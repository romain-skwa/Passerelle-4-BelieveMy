"use server";

// updateUserInfo.js
import { MongoClient } from "mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const updateUserInfo = async (bio, profileUrl, websiteUrl, discordUrl, twitchUrl, itchIoUrl) => {
  // Variable
  const session = await getServerSession(authOptions);

  const client = await MongoClient.connect(process.env.MONGODB_CLIENT);
  const db = client.db(process.env.MONGODB_DATABASE);

  // If the user isn't connected
  if (!session.user) {
    throw new Error("Vous devez être connecté");
  }

  try {
    await db.collection("créateurs").updateOne(
      { email: session.user.email }, 
      {
        $set: {
          bio,
          profile: profileUrl,
          url: websiteUrl,
          discord: discordUrl,
          twitch: twitchUrl,
          itchIo: itchIoUrl,
        },
      }
    );
  } catch (error) {
    console.error(`error dans la route updateUserInfo`, error); // Affichez l'erreur dans la console
    throw new Error(error);
  } finally {
    await client.close();
  }
};

export default updateUserInfo;