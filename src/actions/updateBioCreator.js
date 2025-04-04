"use server";

// updateBioCreator.js
import { MongoClient } from "mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const updateBioCreator = async (
  bio,
  logoUrl,
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
  linkOtherGame5,
  isDarkMode
) => {
  const session = await getServerSession(authOptions);
  const client = await MongoClient.connect(process.env.MONGODB_CLIENT);
  const db = client.db(process.env.MONGODB_DATABASE);

  if (!session.user) {
    throw new Error("Vous devez être connecté");
  }

  // Create an object for updates
  const updateData = {
    $set: {},
    $unset: {}
  };

  // Add non-empty fields to $set and empty fields to $unset
  if (bio)             { updateData.$set.bio = bio; } else { updateData.$unset.bio = ""; }
  if (logoUrl)      { updateData.$set.logoUrl = logoUrl; } else { updateData.$unset.logoUrl = ""; }
  if (websiteUrl)      { updateData.$set.websiteUrl = websiteUrl; } else { updateData.$unset.websiteUrl = ""; }
  if (discordUrl)      { updateData.$set.discordUrl = discordUrl; } else { updateData.$unset.discordUrl = ""; }
  if (twitchUrl)       { updateData.$set.twitchUrl = twitchUrl; } else { updateData.$unset.twitchUrl = ""; }
  if (itchIoUrl)       { updateData.$set.itchIoUrl = itchIoUrl; } else { updateData.$unset.itchIoUrl = ""; }
  if (twitterUrl)      { updateData.$set.twitterUrl = twitterUrl; } else { updateData.$unset.twitterUrl = ""; }
  if (nameOtherGames1) { updateData.$set.nameOtherGames1 = nameOtherGames1; } else { updateData.$unset.nameOtherGames1 = ""; }
  if (linkOtherGame1)  { updateData.$set.linkOtherGame1 = linkOtherGame1; } else { updateData.$unset.linkOtherGame1 = ""; }
  if (nameOtherGames2) { updateData.$set.nameOtherGames2 = nameOtherGames2; } else { updateData.$unset.nameOtherGames2 = ""; }
  if (linkOtherGame2)  { updateData.$set.linkOtherGame2 = linkOtherGame2; } else { updateData.$unset.linkOtherGame2 = ""; }
  if (nameOtherGames3) { updateData.$set.nameOtherGames3 = nameOtherGames3; } else { updateData.$unset.nameOtherGames3 = ""; }
  if (linkOtherGame3)  { updateData.$set.linkOtherGame3 = linkOtherGame3; } else { updateData.$unset.linkOtherGame3 = ""; }
  if (nameOtherGames4) { updateData.$set.nameOtherGames4 = nameOtherGames4; } else { updateData.$unset.nameOtherGames4 = ""; }
  if (linkOtherGame4)  { updateData.$set.linkOtherGame4 = linkOtherGame4; } else { updateData.$unset.linkOtherGame4 = ""; }
  if (nameOtherGames5) { updateData.$set.nameOtherGames5 = nameOtherGames5; } else { updateData.$unset.nameOtherGames5 = ""; }
  if (linkOtherGame5)  { updateData.$set.linkOtherGame5 = linkOtherGame5; } else { updateData.$unset.linkOtherGame5 = ""; }
  if (isDarkMode)      { updateData.$set.isDarkMode = isDarkMode; } else { updateData.$unset.isDarkMode = ""; }

  try {
    await db.collection("créateurs").updateOne(
      { email: session.user.email },
      updateData
    );
  } catch (error) {
    console.error(`error dans la route updateBioCreator`, error);
    throw new Error(error);
  } finally {
    await client.close();
  }
};

export default updateBioCreator;