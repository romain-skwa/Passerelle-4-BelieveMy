import Image from "next/image";
import logoInstagram from "../../../public/logo/instagram_logo.png";
import logoFacebook from "../../../public/logo/facebook_logo.png";
import logoTwitch from "../../../public/logo/twitch_logo.png";
import logoDiscord from "../../../public/logo/discord-logo.png";
import flagBG from "../../../public/flag/drapeau_uk.jpg";
import flagFrance from "../../../public/flag/Flag_France.png";
import homeIconWhite from "../../../public/logo/white-home-icon.png";
import searchIconWhite from "../../../public/logo/Search-icon.png";
import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

      // État pour gérer la visibilité de la zone de recherche
      const [isSearchVisible, setSearchVisible] = useState(false);

      // Fonction pour gérer le clic sur le bouton "Rechercher"  
      const handleSearchClick = () => {  
          setSearchVisible(!isSearchVisible); // Alterne la visibilité  
      };

      const [searchTerm, setSearchTerm] = useState(''); // État pour le mot clé

      const handleSearchChange = (event) => {    
        setSearchTerm(event.target.value); // Met à jour l'état avec la valeur de l'input    
      };

  return (
  <header className="text-white ">
    <section className="flex justify-between laptop:px-8 pt-3 relative">
        {/* ----------------DRAPEAUX----------------------------------------------------------------- */}
        <div className="flex w-[75px] h-10 ml-3 laptop:ml-0 mt-2 laptop:w-40">
          <Image
            src={flagBG}
            alt="Drapeau Grande Bretagne"
            className="inline-block mr-3 w-7 h-5"
            loading="eager"
            priority
          />
          <Image
            src={flagFrance}
            alt="Drapeau France"
            className="inline-block w-7 h-5"
            loading="eager"
          />
        </div>

        {/* ----------------Logo------------------------- */}
        <div className="uppercase text-2xl h-20 max-w-[110px]">This is my game</div>       
 

        {/* ----------------ICONES-------Réseaux sociaux------------------------------------------------------ */}
        <div className="h-8 w-[75px] laptop:w-[150px] laptop:flex mt-1 mr-3">
          <div className="flex mb-3">
            <Image src={logoInstagram} alt="Logo instagram" className="w-7 h-7 " />
            <Image src={logoFacebook}  alt="Logo facebook"  className="w-7 h-7 mx-3" />
          </div>
          <div className="flex">
            <Image src={logoTwitch} alt="Logo twitch" className="w-7 h-7 mr-2 laptop:ml-2" />
            <Image src={logoDiscord} alt="Logo Discord" className="w-8 h-8 mr-3" />
          </div>
        </div>
      </section>

      {/* ----------------LIGNE 2------------------------------------------------------------- */}
      {/* ------------------------------------------------------------------------------------ */}

      <section className="flex flex-col laptop:flex-row px-2 laptop:px-8 py-2 items-center laptop:justify-between relative "> {/* Part left */}
        <div style={{ display: 'flex', alignItems: 'center' }} className="w-[65%] laptop:w-[25%] flex justify-center laptop:justify-start">
          {/* ----------------Accueil------------------------- */}
          <div className="text-center hidden laptop:block laptop:mr-4 ">
            <Link href="../../" className="border px-4 pb-1 pt-[3px] rounded-2xl">
               Accueil
            </Link>
          </div>
          {/* ----------------Recherche------------------------- */}
          {!isSearchVisible && ( 
          <div className="text-center m-2 laptop:m-0 hidden laptop:block">
            <div 
              onClick={handleSearchClick} 
              href="../../" 
              className="border px-4 pb-1 pt-[3px] rounded-2xl"
              >
              Rechercher
            </div>
          </div>
          )}
          {isSearchVisible && ( 
            <div className="flex border rounded-2xl px-4 py-1 w-[100%] tablet:w-[295px]" >
              <input 
                type="text" 
                value={searchTerm} // Lien avec l'état
                onChange={handleSearchChange} // Gestion du changement
                className="text-black placeholder-gray-500 outline-none px-1 w-[100%] tablet:w-[245px]" // Appliquez la couleur ici
              />
              <Link href={`/dynamic/searchResult/${encodeURIComponent(searchTerm)}`}>
                <Image
                  src={searchIconWhite}
                  alt="Search Icon"
                  className="mt-[2px] ml-[10px] w-5 h-5 cursor-pointer"
                />
              </Link>
            </div>
            )}
        </div>


        {/* ----------------Formulaire Présentation------------------------- */}
        <div className="order-last laptop:order-none"  /* Part Middle */>
          <div className={`flex flex-col laptop:flex-row pb-3 laptop:pb-0`}>
            {session?.user?.email ? (
              <>
                <div className="cursor-pointer border text-center rounded-2xl bg-black/70 mt-2 laptop:mt-0 px-4 
                pt-[3px] laptop:ml-3 pl-4 pb-2 laptop:pb-0 order-last laptop:order-none">
                  <Link href="../../creators/introduceYourselfForm">
                    Présentez-vous
                  </Link>
                </div>
                <div className="cursor-pointer border text-center rounded-2xl bg-black/70 mt-2 laptop:mt-0 px-4 
                pt-[3px] laptop:ml-3 pl-4 pb-2 laptop:pb-0 order-last laptop:order-none">
                  <Link href="../../creators/introductionGameForm">
                    Présentez votre jeu
                  </Link>
                </div>
              </>
            ) : (
              <div></div>
            )}

            {/* ----------------Comment présenter------------------------- */}
            <div className={`border text-center mt-4 laptop:mt-0 bg-black/70 px-4 pb-2 pt-[3px] laptop:ml-3 rounded-2xl 
              ${ !session?.user?.email ? "flex-grow" : "" }`}>
              Comment présenter votre jeu ?
            </div>
          </div>
        </div>


        {/* -----------CONNEXION-----INSCRIPTION-------------------------------------------------------------- */}

        <div className="text-sm uppercase flex justify-center laptop:justify-end pt-2 laptop:pt-1 w-[70%] laptop:w-[25%]">
          <div className="mr-0 laptop:mr-4 flex justify-end" /* Part right */>
            {session?.user?.email ? (
              <div className="cursor-pointer border bg-black/70 rounded-2xl py-1 px-3 laptop:bg-transparent" onClick={() => signOut()}>
                Se déconnecter
              </div>
            ) : (
              <>
                <div className="border bg-black/70 rounded-2xl py-1 px-3 laptop:bg-transparent">
                  <Link href="../../creators/login">Se connecter</Link>
                </div>
                <div className="ml-3 mr-0 laptop:mr-2 flex justify-end border bg-black/70 laptop:bg-transparent rounded-2xl py-1 px-3">
                  <Link href="../../creators/register">S'inscrire</Link>
                </div>
              </>
            )}
          </div>
          
        
        {/* --------Icone HOME visible sur écran mobiles------------ */}
        <Link href="../../" className="border bg-black/70 rounded-2xl p-[10px] opacity-100 absolute left-0 ml-4 top-[6px] laptop:hidden">
          <Image
            src={homeIconWhite}
            alt="Home Icon"
            className="w-5 h-5"
          />
        </Link>
        {/* --------Icone SEARCH visible sur écran mobiles------------ */}
        <Link href="../../" className="absolute right-0 mr-4 top-[7px] laptop:hidden border bg-black/70 rounded-2xl p-[11px] ">
          <Image
            onClick={handleSearchClick} 
            src={searchIconWhite}
            alt="Search Icon"
            className="w-4 h-4"
          />
        </Link>
        </div>
      </section>
    </header>
  );
}