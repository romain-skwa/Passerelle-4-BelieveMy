// HOME
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";
import Loading from "@/components/ForLayout/Loading/Loading";
import ToastNotification from "@/components/ToastNotification/ToastNotification"; // I mportez le ToastNotification
import Image from "next/image";
import Link from "next/link";

// API: Server-side image retrieval
async function fetchImages(count) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/homeImages?count=${count}`,
      {
        cache: "no-store", // for server-side rendering
      }
    ); // API to absolute URL
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des images");
    }
    const data = await response.json();

    return { introductionsImages: data || [] }; // Make sure you always return an array
  } catch (error) {
    return { introductionsImages: [], error: error.message }; // If error, return an empty array
  }
}

// This component will be rendered server-side (Server Component)
export default async function Index({ searchParams }) {
  const { count } = await searchParams;

  const parsedCount = parseInt(count) || 10; // Retrieve image count from URL parameters
  const { introductionsImages, error } = await fetchImages(parsedCount);

  return (
    <GeneralLayout>
      {error && <ToastNotification message={error} type="error" />}

      {introductionsImages.length === 0 ? (
        <Loading />
      ) : (
        <section className="flex flex-wrap tablet:gap-4 gap-2 justify-center w-[95%] lg:w-2/3 mx-auto">
          {introductionsImages.map((post) => (
            <div
              key={post._id}
              className="rounded mt-2 relative overflow-hidden tablet:shadow-xl bg-black/70 hover:bg-black/80 duration-300"
              style={{
                boxShadow: "5px 5px 8px rgba(0, 0, 0, 0.8)",
                padding: "10px",
              }}
            >
              <Link href={`dynamic/introduction/${post.nameofgame}?nameOfGame=${post?.nameofgame}&description=${post?.shortIntroduction}`}>
                <div className="relative w-[146px] h-[240px] lg:w-[192px] lg:h-[311px] overflow-hidden">
                  <Image
                    src={
                      post.urlPosterCloudinary
                        ? `${post.urlPosterCloudinary}`
                        : `/presentation/${post.urlPoster}`
                    }
                    width={192}
                    height={311}
                    className="w-[146px] h-[240px] lg:w-[192px] lg:h-[311px] hover:scale-105 transition duration-300"
                    alt={`${post.nameofgame}`}
                    title={decodeURIComponent(post.nameofgame)}
                    unoptimized={true}
                  />
                </div>
              </Link>
              <div className="text-center mt-2 font-semibold capitalize text-white">
                {decodeURIComponent(post.nameofgame).length > 16
                  ? `${decodeURIComponent(post.nameofgame).slice(0, 16)}...`
                  : decodeURIComponent(post.nameofgame)}
              </div>
            </div>
          ))}
        </section>
      )}
      <div className="flex justify-center mt-4">
        <Link
          href={`?count=${count + 10}#bottom`}
          className=" rounded-2xl text-white border bg-black/70 px-4 py-2 "
        >
          Voir plus de jeux
        </Link>
      </div>
      <div id="bottom" />
    </GeneralLayout>
  );
}
