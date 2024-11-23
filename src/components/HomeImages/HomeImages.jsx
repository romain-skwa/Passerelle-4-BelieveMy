import Image from "next/image";
import Link from "next/link";
// To get all the images at HOME
const  HomeImages =  ({introductionsImages}) => {
    return (
      <>
        {introductionsImages.map((post) => (
          <div key={post._id} className="mt-2 relative w-[150px] tablet:w-[192px] h-[243px] tablet:h-[311px] overflow-hidden tablet:shadow-xl shadow-black">
            <Link href={`dynamic/introduction/${encodeURIComponent(post.nameofgame)}`}>
              <Image
                src={`/presentation/${post.imageOne}`}
                layout="fill" // Utilisez layout="fill" pour remplir le conteneur
                objectFit="cover" // Utilisez objectFit pour couvrir le conteneur
                alt={`${post.imageOne}`}
              />
            </Link>
          </div>
        ))}
      </>
    )
}

export default HomeImages;