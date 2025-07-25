// api/homeImages/routes.js
import { MongoClient } from "mongodb";

export async function GET(req) {
  let introductionsImages = [];
  let client;

  // Get the parameter "count" from the URL
  const { searchParams } = new URL(req.url);
  const count = parseInt(searchParams.get("count")) || 10; // By default, 10 images

  try {
    // Connect to the MongoDB cluster
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);

    // Connect to the MongoDB database
    const db = client.db(process.env.MONGODB_DATABASE);

    // Select the introductions collection - ONLY PAID PRESENTATIONS
    introductionsImages = await db
      .collection("introduction-database")
      .find(
        {
          status_payment: "paid",
        },
        {
          projection: {
            urlPoster: 1,
            nameofgame: 1,
            urlPosterCloudinary: 1,
          },
        }
      )
      .sort({ createdAt: -1 }) // The most recent data will be get first
      .limit(count) // Limit the quantity of images
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
