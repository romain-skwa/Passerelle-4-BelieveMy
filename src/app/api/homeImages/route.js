// api/homeImages/routes.js
import { MongoClient } from "mongodb";

export async function GET(req) {
  let introductionsImages = [];
  let client;

  try {
    // Connect to the MongoDB cluster
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);

    // Connect to the MongoDB database
    const db = client.db(process.env.MONGODB_DATABASE);

    // Select the introductions collection
    introductionsImages = await db
      .collection("introduction-database")
      .find({}, { projection: { urlPoster: 1, nameofgame: 1 } })
      .sort({ creation: 1 })
      .toArray();

    // Format
    introductionsImages = introductionsImages.map((eachImage) => ({
      ...eachImage,
      _id: eachImage._id.toString(),
    }));
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } finally {
    if (client) {
      await client.close();
    }
  }

  return new Response(JSON.stringify(introductionsImages), { status: 200 });
}
