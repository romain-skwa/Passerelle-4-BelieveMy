import AllCompIntroductionGame from "@/components/AllCompIntroductionGame/AllCompIntroductionGame";
import Head from "next/head";

// INTRODUCTION OF ONE GAME
// Dynamic page

// Function to capitalize the first letter of a string,
function capitalizeFirstLetter(string) {
  if (!string) return ''; // Check if the string is empty
  return string.charAt(0).toUpperCase() + string.slice(1);

}

// Function to generate dynamics metada
export async function generateMetadata({ searchParams }) {
  /*
  Pour voir le contenu exact transmis dans searchParams
    const params = await searchParams;
    console.log("searchParams:", params);
    const { nameOfGame, description } = await params;
  */
  const { nameOfGame, description, urlPoster } = await searchParams;

  const formattedNameOfGame = nameOfGame ? capitalizeFirstLetter(nameOfGame) : '';
  const formattedDescription = description || '';
  return {
    title: `${formattedNameOfGame}`,
    description: `${formattedDescription}. ThisismyGame.`,
    icons: {
      icon: "/icons/favicon.ico",
    },
  };
}

export default async function IntroductionGame({ params }) {
  const { introduction } = await params;
  const metadata = await generateMetadata({ searchParams: params });


  return (
        <>
      <Head>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.authors?.[0]?.name} />
        <meta property="og:title" content={metadata.nameOfGame} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.urlPoster} />
        <meta property="og:url" content={`dynamic/introduction/${metadata.nameOfGame}?nameOfGame=${metadata?.nameOfGame}&description=${metadata?.shortIntroduction}&urlPoster=${metadata.urlPosterCloudinary}`} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@romain-delbos.dev" />
        <meta property="fb:app_id" content="app_id" />
        <meta property="og:site_name" content="thisismygame.com" />
        <meta property="og:image:alt" content="Logo de thisismygame.com" />
        <title>{metadata.title}</title>
      </Head>
      <AllCompIntroductionGame introduction={introduction} />
    </>
  );
}
