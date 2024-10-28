"use server";

// updateBioCreator.js
import { MongoClient } from "mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const updateBioCreator = async (
  bio,
  logoUser ,
  websiteUrl,
  discordUrl,
  twitchUrl,
  itchIoUrl,
  twitterUrl,
  nameOtherGames1,
  linkOtherGame1,
  nameOtherGames2,
  linkOtherGame2,
  nameOtherGames3,
  linkOtherGame3,
  nameOtherGames4,
  linkOtherGame4,
  nameOtherGames5,
  linkOtherGame5
) => {
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
          logo: logoUser,
          websiteUrl: websiteUrl,
          discordUrl: discordUrl,
          twitchUrl: twitchUrl,
          itchIoUrl: itchIoUrl,
          twitterUrl: twitterUrl,
          nameOtherGames1: nameOtherGames1,
          linkOtherGame1: linkOtherGame1,
          nameOtherGames2: nameOtherGames2,
          linkOtherGame2: linkOtherGame2,
          nameOtherGames3: nameOtherGames3,
          linkOtherGame3: linkOtherGame3,
          nameOtherGames4: nameOtherGames4,
          linkOtherGame4: linkOtherGame4,
          nameOtherGames5: nameOtherGames5,
          linkOtherGame5: linkOtherGame5,
        },
      }
    );
  } catch (error) {
    console.error(`error dans la route updateBioCreator`, error); // Affichez l'erreur dans la console
    throw new Error(error);
  } finally {
    await client.close();
  }
};

export default updateBioCreator;