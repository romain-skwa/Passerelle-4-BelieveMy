// HOME
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";
import Loading from "@/components/ForLayout/Loading/Loading";
import ToastNotification from "@/components/ToastNotification/ToastNotification"; // I mportez le ToastNotification
import Image from "next/image";
import Link from "next/link";
import LoadMoreButton from "@/components/ForLayout/LoadMoreButton/LoadMoreButton";

export const metadata = {
  title: "This is my game",
  description: "Introduce your video game by yourself",
  keywords: 'video, game, introduction, creator, developer',
  authors: [{ name: 'Romain Delbos', url: 'https://romain-delbos.dev' }],
  icons: {
    icon: "/icons/favicon.ico",
  },
  openGraph: {
    title: "This is my game",
    description: "On this website, you may introduce your own video game",
    url: "https://thisismygame.com",
    siteName: "romain-delbos.dev",
    images: [
      {
        url: "https://romain-delbos.dev/public/home/logoRomainDelbos.jpg",
        alt: "Logo de romain-delbos.dev",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@romain-delbos.dev",
    images: ["https://romain-delbos.dev/public/home/logoRomainDelbos.jpg"],
  },
};

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
  const numberInParams = await searchParams;
  const count = parseInt(numberInParams?.count) || 10;
  const { introductionsImages, error } = await fetchImages(count);
  
  return (
    <>    
    <GeneralLayout>
      {error && <ToastNotification message={error} type="error" />}

      {introductionsImages.length === 0 ? (
        <Loading />
      ) : (
        <section className="flex flex-wrap tablet:gap-4 gap-2 justify-center w-[95%] lg:w-2/3 mx-auto">
          {introductionsImages.map((post, index) => (
            <div
              key={post._id}
              className="rounded mt-2 relative overflow-hidden tablet:shadow-xl bg-black/70 hover:bg-black/80 duration-300"
              style={{
                boxShadow: "5px 5px 8px rgba(0, 0, 0, 0.8)",
                padding: "10px",
              }}
            >
              <Link href={`dynamic/introduction/${post.nameofgame}?nameofgame=${post?.nameofgame}`}>
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
                    loading="lazy"
                    quality={85}
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
      <LoadMoreButton count={count} />
      <div id="bottom" />
    </GeneralLayout>
    </>
  );
}
