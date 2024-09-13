import Image from "next/image";
import logoInstagram from "../../../public/logo/instagram_logo.png";
import logoFacebook from "../../../public/logo/facebook_logo.png";
import logoTwitch from "../../../public/logo/twitch_logo.png";
import flagBG from "../../../public/flag/drapeau_uk.jpg";
import flagFrance from "../../../public/flag/Flag_France.png";
import homeIconWhite from "../../../public/logo/white-home-icon.png";
import searchIconWhite from "../../../public/logo/Search-Button-White.png";
import logowebsite from "../../../public/logo/double.jpg";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
<header class="text-white bg-gradient-to-b from-black via-black to-dark-french-blue">
        <section className="flex justify-between lg:px-8 pt-3 relative">
        {/* ----------------DRAPEAUX----------------------------------------------------------------- */}
        <div className="flex h-10 ml-3 lg:ml-0 mt-2 lg:w-40">
          <Image
            src={flagBG}
            alt="Drapeau Grande Bretagne"
            className="inline-block mr-3 w-7 h-5"
          />
          <Image
            src={flagFrance}
            alt="Drapeau France"
            className="inline-block w-7 h-5"
          />
        </div>

        {/* ----------------Logo------------------------- */}
        <div className="uppercase text-4xl">This is my game</div>       
 

        {/* ----------------ICONES-------Réseaux sociaux------------------------------------------------------ */}
        <div className="h-8 lg:flex mt-1">
          <div className="flex mb-3">
            <Image src={logoInstagram} alt="Logo instagram" className="w-7 h-7" />
            <Image src={logoFacebook}  alt="Logo facebook"  className="w-7 h-7 mx-3" />
          </div>
          <div className="flex">
            <Image src={logoTwitch} alt="Logo twitch" className="w-7 h-7 mr-3" />
            <Image src={logoTwitch} alt="Logo twitch" className="w-7 h-7 mr-3" />
          </div>
        </div>
      </section>

      {/* ----------------LIGNE 2------------------------------------------------------------- */}
      {/* ------------------------------------------------------------------------------------ */}

      <section className="flex flex-col lg:flex-row px-2 lg:px-8 pt-2 items-center lg:justify-between relative ">
        <div className="flex" /* Part left */>
          {/* ----------------Accueil------------------------- */}
          <div className="text-center hidden lg:block lg:mr-4">
            <Link href="../../">Accueil</Link>
          </div>
          {/* ----------------Recherche------------------------- */}
          <div className="text-center m-2 lg:m-0 hidden lg:block ">
            Recherche
          </div>
        </div>


        {/* ----------------Formulaire Présentation------------------------- */}
        <div className="order-last lg:order-none"  /* Part Middle */>
          <div className={`flex flex-col lg:flex-row pb-3 lg:pb-0`}>
            {session?.user?.email ? (
              <div className="cursor-pointer text-center pl-3 pb-2 lg:pb-0 lg:p-2 order-last lg:order-none">
                <Link href="../../creators/formularyintroduction">
                  Formulaire de présentation de votre jeu
                </Link>
              </div>
            ) : (
              <div></div>
            )}

            {/* ----------------Comment présenter------------------------- */}
            <div
              className={`text-center p-2 ml-3 ${
                !session?.user?.email ? "flex-grow" : ""
              }`}
            >
              Comment présenter votre jeu ?
            </div>
          </div>
        </div>


        {/* -----------CONNEXION-----INSCRIPTION-------------------------------------------------------------- */}

        <div className="text-sm lg:text-base h-10 uppercase flex lg:justify-end lg:pt-1">
          <div
            className="mr-2 lg:mr-4 flex justify-end"  /* Part right */
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
                  {/* --------Icone Home visible sur écran mobiles------------ */}
        <Link href="../../">
          <Image
            src={homeIconWhite}
            alt="Home Icon"
            className="w-7 h-7 opacity-70 absolute left-0 ml-4 top-1 lg:hidden"
          />
        </Link>
                  {/* --------Icone Search visible sur écran mobiles------------ */}
        <Image
          src={searchIconWhite}
          alt="Search Icon"
          className="w-8 h-8 absolute right-0 mr-4 top-1 lg:hidden"
        />
        </div>
      </section>
    </header>
  );
}