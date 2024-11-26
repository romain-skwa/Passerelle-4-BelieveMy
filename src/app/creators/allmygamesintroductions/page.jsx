import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import { MongoClient } from "mongodb";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

// Page including the links (images) to each introduction of my games

export default async function Allmygamesintroductions() {
  // Variable
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("login");
  }

  let introductionsImages, client;
  try {
    // Connect to the MongoDB cluster
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);

    // Connect to the MongoDB database
    const db = client.db(process.env.MONGODB_DATABASE);

    // Select the introductions collection
    introductionsImages = await db
      .collection("introduction-database")
      .find({ email: session.user.email })
      .sort({ creation: 1 })
      .toArray();

    // Format
    introductionsImages = introductionsImages.map((eachImage) => ({
      ...eachImage,
      _id: eachImage._id.toString(),
    }));
  } catch (error) {
    throw new Error(error.message);
  }
  await client.close();

  return (
    <GeneralLayout>
      Liste de tous les jeux ici :{/* Images list*/}
      {introductionsImages.map((post) => (
        <div key={post._id}>
          <p>{post.content}</p>
          <p>{post.urlPoster}</p>
          <Image
            src={`/presentation/${post.urlPoster}`}
            width={400}
            height={300}
            className="w-48"
          />
        </div>
      ))}
    </GeneralLayout>
  );
}
