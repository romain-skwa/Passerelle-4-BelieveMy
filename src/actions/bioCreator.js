"use server";

// updateUserInfo.js
import { MongoClient } from "mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const updateUserInfo = async (bio, logoUser, websiteUrl, discordUrl, twitchUrl, itchIoUrl, twitterUrl,
   nameOtherGames1, linkOtherGame1, nameOtherGames2, linkOtherGame2, nameOtherGames3, linkOtherGame3,
   nameOtherGames4, linkOtherGame4, nameOtherGames5, linkOtherGame5,) => {
  // Variable
  const session = await getServerSession(authOptions);

  const client = await MongoClient.connect(process.env.MONGODB_CLIENT);
  const db = client.db(process.env.MONGODB_DATABASE);

  // If the user isn't connected
  if (!session.user) {
    throw new Error("Vous devez être connecté");
  }

  // Créez un objet pour les mises à jour

  const updates = {};  

  if (bio) updates.bio = bio;
  if (logoUser ) updates.logo = logoUser ; // Assurez-vous que logoUser  est un chemin ou un identifiant valide
  if (websiteUrl) updates.url = websiteUrl;
  if (discordUrl) updates.discord = discordUrl;
  if (twitchUrl) updates.twitch = twitchUrl;
  if (itchIoUrl) updates.itchIo = itchIoUrl;
  if (twitterUrl) updates.twitterUrl = twitterUrl;
  if (nameOtherGames1) updates.nameOtherGames1 = nameOtherGames1;
  if (linkOtherGame1) updates.linkOtherGame1 = linkOtherGame1;
  if (nameOtherGames2) updates.nameOtherGames2 = nameOtherGames2;
  if (linkOtherGame2) updates.linkOtherGame2 = linkOtherGame2;
  if (nameOtherGames3) updates.nameOtherGames3 = nameOtherGames3;
  if (linkOtherGame3) updates.linkOtherGame3 = linkOtherGame3;
  if (nameOtherGames4) updates.nameOtherGames4 = nameOtherGames4;
  if (linkOtherGame4) updates.linkOtherGame4 = linkOtherGame4;
  if (nameOtherGames5) updates.nameOtherGames5 = nameOtherGames5;
  if (linkOtherGame5) updates.linkOtherGame5 = linkOtherGame5;

  // Si aucun champ n'est à mettre à jour, ne faites rien
  if (Object.keys(updates).length === 0) {throw new Error("Aucune donnée à mettre à jour");}

  try {
    await db.collection("créateurs").updateOne(
      { email: session.user.email }, 
      {
        $set: updates,
      }
    );
  } catch (error) {
    console.error(`error dans la route updateUser Info`, error); // Affichez l'erreur dans la console
    throw new Error(error);
  } finally {
    await client.close();
  }
};

export default updateUserInfo;