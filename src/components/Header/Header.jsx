import Image from "next/image";
import logoInstagram from "../../../public/logo/instagram_logo.png";
import logoFacebook from "../../../public/logo/facebook_logo.png";
import logoTwitch from "../../../public/logo/twitch_logo.png";
import flagBG from "../../../public/flag/drapeau_uk.jpg";
import flagFrance from "../../../public/flag/Flag_France.png";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header>
      <section className="flex justify-between mx-2 lg:mx-8 mt-2 border">
        <div
          className="lg:mt-4 lg:w-48 border border-b-orange-300 relative" /* on ne met pas de flex parce que ça allonge la hauteur des logos */
        >
          <div className="flex">
            <Image
              src={logoInstagram}
              alt="Logo instagram"
              className="w-8 h-8"
            />

            <Image
              src={logoFacebook}
              alt="Logo facebook"
              className="w-8 h-8 mx-2"
            />
<br></br>
            <Image src={logoTwitch} alt="Logo twitch" className="w-8 h-8" />
          </div>
          <div className="lg:hidden text-center w-full  bg-orange-400 absolute bottom-0">
            <Link href="../../">Accueil</Link>
          </div>
        </div>

        {/* ------------------------------------------------------------------------------------------- */}

        <div className="w-28 h-24 bg-red-900 text-white">LOGO</div>

        {/* ------------------------------------------------------------------------------------------- */}

        <div>
          <div className="lg:mt-4 lg:flex lg:w-48 ">
            <div
              className="mr-2 lg:mr-4" /* Petite marge externe ajoutée quand on est sur un écran pc. Le margin créé un espace vide entre les div. un padding aurait agrandit la zone cliquable*/
            >
              {session?.user?.email ? (
                <div>Se déconnecter</div>
              ) : (
                <Link href="../../creators/login">Se connecter</Link>
              )}
            </div>
            <div>
              <Link href="../../creators/register">S'inscrire</Link>
            </div>
          </div>

          <div className=" flex justify-center lg:justify-center mt-2 ">
            <Image
              src={flagBG}
              alt="Drapeau Grande Bretagne"
              className="inline-block mr-3 w-10 h-7"
            />
            <Image
              src={flagFrance}
              alt="Drapeau France"
              className="inline-block w-10 h-7"
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------------------------------- */}

      <section className="flex flex-col lg:flex-row justify-between mx-2 lg:mx-8 mt-2 border items-center">
        <div className="border w-1/5 text-center lg:text-left hidden lg:block">
          <Link href="../../">Accueil</Link>
        </div>
        <div className="text-center order-last lg:order-none m-2 lg:m-0 bg-orange-400 lg:w-2/5">
          <input type="text" />
        </div>
        <div className="text-center p-2 border xl:w-1/5 ">
          Comment présenter votre jeu ?
        </div>
      </section>
    </header>
  );
}
