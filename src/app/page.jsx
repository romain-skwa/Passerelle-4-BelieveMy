// HOME
import ConnectedUser from "@/components/ConnectedUser/ConnectedUser";
import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import Loading from "@/components/Loading/Loading";
import ToastNotification from "@/components/ToastNotification/ToastNotification"; // Importez le ToastNotification
import Image from "next/image";
import Link from "next/link";

// API: Récupération des images côté serveur
async function fetchImages() {
  try {
    const response = await fetch(`http://localhost:3000/api/homeImages`, {
      cache: "no-store", // pour un rendu coté serveur
    }); // API à l'URL absolue
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
export default async function Index() {
  const { introductionsImages, error } = await fetchImages(); // Appel API côté serveur
  //console.log(`introductionsImages `, introductionsImages);
  return (
    <GeneralLayout>
      <ConnectedUser />
      <ToastNotification error={error} />{/* Affichez ToastNotification si une erreur existe */}
      
      {error && <div className="error-message">{error}</div>}{" "}{/* Si aucune erreur et des images sont chargées */}

      {/* Vous pouvez aussi afficher l'erreur dans l'UI */}
      {introductionsImages.length === 0 ? (
        <Loading />
      ) : (
        <section className="flex flex-wrap tablet:gap-4 gap-2 justify-center w-[95%] lg:w-2/3 mx-auto">
            {introductionsImages.map((post) => (
              <div key={post._id} className="mt-2 relative overflow-hidden tablet:shadow-xl shadow-black">
                <Link href={`dynamic/introduction/${post.nameofgame}`}>
                  <Image
                    src={post.urlPosterCloudinary ? `${post.urlPosterCloudinary}` : `/presentation/${post.urlPoster}`} // Condition pour choisir l'URL de l'image
                    width={192}
                    height={311}
                    className="w-[154px] h-[248px] lg:w-[192px] lg:h-[311px] hover:scale-105 transition duration-300" // Ajoutez les classes pour l'effet hover
                    alt={`${post.nameofgame}`}
                    unoptimized={true}
                  />
                </Link>
              </div>
            ))}{" "}
        </section>
      )}
    </GeneralLayout>
  );
}
