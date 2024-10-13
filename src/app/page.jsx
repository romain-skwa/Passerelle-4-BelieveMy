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
      <section className="flex flex-wrap gap-4 justify-center w-[95%] lg:w-2/3 mx-auto">
        {introductionsImages.map((post) => (
          <div key={post._id} className="mt-2 w-[47%] tablet:w-[192px] overflow-hidden tablet:shadow-xl shadow-black">
            <div className=" w-[100%] ">
            <Link href={`dynamic/introduction/${encodeURIComponent(post.nameofgame)}`}>
                <Image
                  src={`/presentation/${post.imageOne}`}
                  className="lg:w-[192px] lg:h-[311px] hover:scale-105 transition duration-300"
                  width={192}
                  height={311}
                  alt={`${post.imageOne}`}
                />
              </Link>
            </div>
          </div>
        ))}
      </section>
    </GeneralLayout>
  );
}
