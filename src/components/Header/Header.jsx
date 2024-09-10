import Image from "next/image";
import logoInstagram from "../../../public/logo/instagram_logo.png";
import logoFacebook from "../../../public/logo/facebook_logo.png";
import logoTwitch from "../../../public/logo/twitch_logo.png";
import flagBG from "../../../public/flag/drapeau_uk.jpg";
import flagFrance from "../../../public/flag/Flag_France.png";
import homeIconWhite from "../../../public/logo/white-home-icon.png";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header>
      <section className="flex justify-between lg:px-8 bg-black pt-3">
        <div className="flex w-1/3 h-10 ml-2 lg:ml-0 mt-2 lg:mt-0 ">
          <Image
            src={flagBG}
            alt="Drapeau Grande Bretagne"
            className="inline-block mr-3 w-7 h-5 lg:w-10 lg:h-7 shadow shadow-white"
          />
          <Image
            src={flagFrance}
            alt="Drapeau France"
            className="inline-block w-7 h-5 lg:w-10 lg:h-7 shadow shadow-white"
          />
        </div>

        {/* ----------------ICONES----------------------------------------------------------------- */}

        <div
          className=" lg:w-1/3 h-8 flex justify-center relative" /* on ne met pas de flex parce que ça allonge la hauteur des logos */
        >
          <Image src={logoInstagram} alt="Logo instagram" className="w-8 h-8" />

          <Image
            src={logoFacebook}
            alt="Logo facebook"
            className="w-8 h-8 mx-2"
          />
          <Image src={logoTwitch} alt="Logo twitch" className="w-8 h-8" />
          {/*
          <div className="lg:hidden text-center w-full  bg-orange-400 absolute bottom-0">
            <Link href="../../">Accueil</Link>
          </div>
          */}
        </div>

        {/* -----------CONNEXION-----INSCRIPTION-------------------------------------------------------------- */}

        <div className=" w-1/3 text-white text-sm lg:text-base h-10 uppercase flex flex-col lg:flex-row lg:justify-end lg:pt-1">
          <div
            className="mr-2 lg:mr-4 flex justify-end" /* Petite marge externe ajoutée quand on est sur un écran pc. Le margin créé un espace vide entre les div. un padding aurait agrandit la zone cliquable*/
          >
            {session?.user?.email ? (
              <div className="cursor-pointer" onClick={() => signOut()}>
                Se déconnecter
              </div>
            ) : (
              <Link href="../../creators/login">Se connecter</Link>
            )}
          </div>
          <div className="pl-3 mr-2 flex justify-end">
            <Link href="../../creators/register">S'inscrire</Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------------------------------- */}

      <section className="flex flex-col lg:flex-row justify-between px-2 lg:px-8 pt-2 items-center relative bg-gradient-to-b from-black to-dark-french-blue">
        {" "}
        <div>
          <Image
            src={homeIconWhite}
            alt="Home Icon"
            className="w-8 h-8 absolute top-1 left-0 lg:hidden"
          />
        </div>
        <div className="border w-1/5 text-center lg:text-left hidden lg:block">
          <Link href="../../">Accueil</Link>
        </div>
        <div className="text-center order-last lg:order-none m-2 lg:m-0 bg-orange-400 lg:w-2/5">
          <input type="text" placeholder="Recherche" />
        </div>
        <div className="text-center p-2 border xl:w-1/5 ">
          Comment présenter votre jeu ?
        </div>
        {session?.user?.email ? (
          <div className="cursor-pointer text-center xl:w-1/5">
            <Link href="../../creators/formularyintroduction">
              Formulaire de présentation de votre jeu
            </Link>
          </div>
        ) : (
          <div></div>
        )}
      </section>
    </header>
  );
}
//        <div className="w-28 h-24 bg-red-900 text-white">LOGO</div>
