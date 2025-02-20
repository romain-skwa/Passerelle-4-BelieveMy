import { getServerSession } from "next-auth";
import { MongoClient, ObjectId } from "mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function handler(req, res) {
    console.log(`req : `,req);
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session.user) {
    return res.status(401).json({ message: "Vous devez être connecté" });
  }

  const { gameId } = req.body;
  if (!gameId) {
    return res.status(400).json({ message: "ID de jeu manquant" });
  }


  let client;
  try {
    client = await MongoClient.connect(process.env.MONGODB_CLIENT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(process.env.MONGODB_DATABASE);

    const result = await db.collection("introduction-database").deleteOne({ _id: (gameId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Aucune présentation trouvée avec cet ID de jeu." });
    }

    return res.status(200).json({ message: "Présentation supprimée avec succès." });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Une erreur est survenue lors de la suppression des données." });
  } finally {
    await client?.close();
  }
}
