import Image from "next/image";
import logoInstagram from "../../../public/logo/instagram_logo.png";
import logoFacebook from "../../../public/logo/facebook_logo.png";
import logoTwitch from "../../../public/logo/twitch_logo.png";
import flagBG from "../../../public/flag/drapeau_uk.jpg";
import flagFrance from "../../../public/flag/Flag_France.png";
import homeIconWhite from "../../../public/logo/white-home-icon.png";
import searchIconWhite from "../../../public/logo/Search-icon.png";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
  <header className="text-white ">
    <section className="flex justify-between laptop:px-8 pt-3 relative">
        {/* ----------------DRAPEAUX----------------------------------------------------------------- */}
        <div className="flex h-10 ml-3 laptop:ml-0 mt-2 laptop:w-40">
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
        <div className="uppercase text-2xl h-20 max-w-44 border">This is my game</div>       
 

        {/* ----------------ICONES-------Réseaux sociaux------------------------------------------------------ */}
        <div className="h-8 laptop:flex mt-1">
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

      <section className="flex flex-col laptop:flex-row px-2 laptop:px-8 py-2 items-center laptop:justify-between relative ">
        <div className="flex" /* Part left */>
          {/* ----------------Accueil------------------------- */}
          <div className="text-center hidden laptop:block laptop:mr-4 ">
            <Link href="../../" className="border px-4 pb-1 pt-[3px] rounded-2xl">
                Accueil
            </Link>
          </div>
          {/* ----------------Recherche------------------------- */}
          <div className="text-center m-2 laptop:m-0 hidden laptop:block ">
            <Link href="../../" className="border px-4 pb-1 pt-[3px] rounded-2xl">
              Rechercher        
            </Link>
          </div>
        </div>


        {/* ----------------Formulaire Présentation------------------------- */}
        <div className="order-last laptop:order-none"  /* Part Middle */>
          <div className={`flex flex-col laptop:flex-row pb-3 laptop:pb-0`}>
            {session?.user?.email ? (
              <div className="
              cursor-pointer
              border 
              text-center 
              rounded-2xl 
              bg-black/30 
               mt-2 laptop:mt-0 
               px-4 
               pt-[3px] 
               ml-3 
               pl-3 
               pb-2 
               laptop:pb-0 
                
               order-last 
               laptop:order-none
               ">
                <Link href="../../creators/formularyintroduction">
                  Formulaire de présentation de votre jeu
                </Link>
              </div>
            ) : (
              <div></div>
            )}

            {/* ----------------Comment présenter------------------------- */}
            <div
              className={`text-center mt-8 laptop:mt-0 bg-black/30 px-4 pb-1 pt-[3px] ml-3 border rounded-2xl ${
                !session?.user?.email ? "flex-grow" : ""
              }`}
            >
              Comment présenter votre jeu ?
            </div>
          </div>
        </div>


        {/* -----------CONNEXION-----INSCRIPTION-------------------------------------------------------------- */}

        <div className="text-sm uppercase flex laptop:justify-end laptop:pt-1">
          <div
            className="mr-2 laptop:mr-4 flex justify-end"  /* Part right */
          >
            {session?.user?.email ? (
              <div className="cursor-pointer border bg-black/70 rounded-2xl py-1 px-2 laptop:bg-transparent" onClick={() => signOut()}>
                Se déconnecter
              </div>
            ) : (
              <div className="border bg-black/70 rounded-2xl py-1 px-3 laptop:bg-transparent">
              <Link href="../../creators/login">Se connecter</Link>
              </div>
            )}
          </div>
          <div className=" mr-0 laptop:mr-2 flex justify-end border bg-black/70 laptop:bg-transparent rounded-2xl py-1 px-3">
            <Link href="../../creators/register">S'inscrire</Link>
          </div>
        
        {/* --------Icone HOME visible sur écran mobiles------------ */}
        <Link href="../../" className="border bg-black/70 rounded-2xl p-[10px]  opacity-100 absolute left-0 ml-4 top-[-4px] laptop:hidden">
          <Image
            src={homeIconWhite}
            alt="Home Icon"
            className="w-7 h-7 "
          />
        </Link>
        {/* --------Icone SEARCH visible sur écran mobiles------------ */}
        <Link href="../../" className="absolute right-0 mr-4 top-[-3px] laptop:hidden border bg-black/70 rounded-2xl p-[11px] ">
          <Image
            src={searchIconWhite}
            alt="Search Icon"
            className="w-6 h-6"
          />
        </Link>
        </div>
      </section>
    </header>
  );
}