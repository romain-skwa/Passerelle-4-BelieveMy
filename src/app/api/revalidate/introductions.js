import { MongoClient } from "mongodb";


export default async function handler(req, res) {

  const client = await MongoClient.connect(process.env.MONGODB_CLIENT);

  const db = client.db(process.env.MONGODB_DATABASE);

  const introductionsImages = await db.collection("introduction-database").find().sort({ creation: 1 }).toArray();

  await client.close();

  res.status(200).json(introductionsImages);

}