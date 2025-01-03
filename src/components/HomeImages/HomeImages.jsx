// components/HomeImages/HomeImages.js 
// CE COMPOSANT EST DORENAVANT INUTILISÉ
import Image from "next/image";
import Link from "next/link";

// To get all the images at HOME
const HomeImages = ({ introductionsImages }) => {
  return (
    <>
      {introductionsImages.map((post) => (
        <div
          key={post._id}
          className="mt-2 relative overflow-hidden tablet:shadow-xl shadow-black"
        >
          <Link href={`dynamic/introduction/${encodeURIComponent(post.nameofgame)}`}>
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
      ))}
    </>
  );
};

export default HomeImages;