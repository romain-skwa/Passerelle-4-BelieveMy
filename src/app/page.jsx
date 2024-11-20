import ConnectedUser from "@/components/ConnectedUser/ConnectedUser";
import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import { MongoClient } from "mongodb";
import Image from "next/image";
import Link from "next/link";

// HOME

export default async function Index() {
  // Variable
  let introductionsImages, client;
  try {
    // Connect to the MongoDB cluster
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);

    // Connect to the MongoDB database
    const db = client.db(process.env.MONGODB_DATABASE);

    // Select the introductions collection
    introductionsImages = await db
      .collection("introduction-database")
      .find()
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
      <ConnectedUser/>
      <section className="flex flex-wrap tablet:gap-4 gap-2 justify-center w-[95%] lg:w-2/3 mx-auto">
        {introductionsImages.map((post) => (
          <div key={post._id} className="mt-2 w-[47%] tablet:w-[192px] overflow-hidden tablet:shadow-xl shadow-black">
            <Link href={`dynamic/introduction/${encodeURIComponent(post.nameofgame)}`}>
              <div className="relative w-[150px] tablet:w-[192px] h-[243px] tablet:h-[311px] overflow-hidden">
                <Image
                  src={`/presentation/${post.imageOne}`}
                  layout="fill" // Utilisez layout="fill" pour remplir le conteneur
                  objectFit="cover" // Utilisez objectFit pour couvrir le conteneur
                  alt={`${post.imageOne}`}
                />
              </div>
            </Link>
          </div>
        ))}
      </section>
    </GeneralLayout>
  );
}
