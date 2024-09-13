import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import { MongoClient } from "mongodb";
import Image from "next/image";

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
      <section className="flex flex-wrap gap-4 sm:bg-slate-800 border justify-center lg:w-2/3 mx-auto">
        {introductionsImages.map((post) => (
          <div className="mt-2 w-[47%] tablet:w-[192px]">
            <Image src={`/presentation/${post.imageOne}`} 
              className="   lg:w-[192px] lg:h-[311px]" 
              width={192} height={311} />
          </div>
        ))}
      </section>
    </GeneralLayout>)
}