// HOME
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";
import Loading from "@/components/ForLayout/Loading/Loading";
import ToastNotification from "@/components/ToastNotification/ToastNotification"; // I mportez le ToastNotification
import Image from "next/image";
import Link from "next/link";

// API: Récupération des images côté serveur
async function fetchImages(count) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/homeImages?count=${count}`,
      {
        cache: "no-store", // pour un rendu coté serveur
      }
    ); // API à l'URL absolue
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des images");
    }
    const data = await response.json();

    return { introductionsImages: data || [] }; // Assurez-vous que vous renvoyez toujours un tableau
  } catch (error) {
    return { introductionsImages: [], error: error.message }; // Si erreur, renvoyez un tableau vide
  }
}

// Ce composant sera rendu côté serveur (Server Component)
export default async function Index({ searchParams }) {
  const count = parseInt(searchParams.count) || 10; // Récupérer le nombre d'images depuis les paramètres d'URL
  const { introductionsImages, error } = await fetchImages(count);

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
              <Link href={`dynamic/introduction/${post.nameofgame}`}>
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
