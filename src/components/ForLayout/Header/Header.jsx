import Image from "next/image";
import logoInstagram from "/public/logo/instagram_logo.png";
import logoFacebook from "/public/logo/facebook_logo.png";
import logoTwitch from "/public/logo/twitch_logo.png";
import logoDiscord from "/public/logo/discord-logo.png";
import logoYoutube from "/public/logo/youtube_logo.png";
import flagBG from "/public/flag/drapeau_uk.jpg";
import flagFrance from "/public/flag/Flag_France.png";
import homeIconWhite from "/public/logo/white-home-icon.png";
import searchIconWhite from "/public/logo/Search-icon.png";
import logoManette from "/public/logo/icon-manette.png";
import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import SocialFrame from "@/components/SocialFrame/SocialFrame";
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";
import SearchModal from "@/components/SearchModal/SearchModal";
import { useRouter } from "next/navigation";
import { Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({
  // Police d'écriture
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function Header({ background }) {
  const { data: session } = useSession();
  const username = session?.user.username;
  const { language, changeLanguage } = useLanguage();
  const [isModalSearchOpen, setModalSearchOpen] = useState(false);
  const router = useRouter();

  // État pour gérer la visibilité de la zone de recherche
  const [isSearchVisible, setSearchVisible] = useState(false);

  // Fonction pour gérer le clic sur le bouton "Rechercher"
  const handleSearchClick = () => {
    setSearchVisible(!isSearchVisible); // Alterne la visibilité
  };

  const [searchTerm, setSearchTerm] = useState(""); // État pour le mot clé

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Met à jour l'état avec la valeur de l'input
  };

  // Function to change the language
  const handleChangeToEnglish = () => {
    changeLanguage("en"); // Change la langue à l'anglais
  };

  const handleChangeToFrench = () => {
    changeLanguage("fr"); // Change la langue au français
  };

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Se déconnecter
    router.replace("/"); // Rediriger vers la page d'accueil
  };

  return (
    <header className={`text-white pb-2 ${background}`}>
      <section className="flex justify-between laptop:px-8 pt-3 relative">
        {/* ----------------DRAPEAUX----------------------------------------------------------------- */}
        <div className="flex w-[75px] h-10 ml-3 laptop:ml-0 mt-2 tablet:w-40 ">
          <Image
            src={flagBG}
            alt="Drapeau Grande Bretagne"
            className="inline-block mr-3 w-7 h-5 cursor-pointer"
            loading="eager"
            unoptimized={true}
            onClick={handleChangeToEnglish}
            priority
          />
          <Image
            src={flagFrance}
            alt="Drapeau France"
            className="inline-block w-7 h-5 cursor-pointer"
            loading="eager"
            unoptimized={true}
            onClick={handleChangeToFrench}
          />
        </div>

        {/* ----------------Logo------------------------- */}
        <div className="h-16 w-[200px] laptop:w-[370px] borderTitle flex justify-center px-4 rounded-[40px] relative mb-2 mt-2">
          <Image 
            src={logoManette}
            width={60}
            alt="Logo manette"
             />
          <div className={`tablet:ml-3 title ${pressStart2P.className}`}>
              This is my game
          </div>
        </div>

        {/* ----------------ICONES-------Réseaux sociaux------------------------------------------------------ */}
        <div className="w-[75px] tablet:hidden">
          <SocialFrame />
          {/* Visible seulement sur téléphone */}
        </div>
        <div className="hidden tablet:flex h-8 w-[75px] tablet:w-[150px] mt-1 mr-3 mb-3 gap-2 flex-row-reverse">
          <Image
            src={logoInstagram}
            alt="Logo instagram"
            className="w-7 h-7"
            unoptimized={true}
          />
          <Image
            src={logoFacebook}
            alt="Logo facebook"
            className="w-7 h-7 "
            unoptimized={true}
          />
          <Image
            src={logoTwitch}
            alt="Logo twitch"
            className="w-7 h-7"
            unoptimized={true}
          />
          <Image
            src={logoDiscord}
            alt="Logo Discord"
            className="w-8 h-8"
            unoptimized={true}
          />
          <Image
            src={logoYoutube}
            alt="Logo Youtube"
            className="w-7 h-7"
            unoptimized={true}
          />
        </div>
      </section>

      {/* ----------------LIGNE 2------------------------------------------------------------- */}
      {/* ------------------------------------------------------------------------------------ */}

      <section className="flex flex-col laptop:flex-row px-2 laptop:px-8 py-2 items-center laptop:justify-between relative ">
        {" "}
        {/* Part left */}
        <div
          style={{ display: "flex", alignItems: "center" }}
          className={`w-[65%] laptop:w-[25%] flex justify-center laptop:justify-start `}
        >
          {/* ----------------Accueil------------------------- */}
          <div className="text-center hidden laptop:block laptop:mr-4">
            <Link
              href="../../"
              className="border px-4 pb-1 pt-[3px] rounded-2xl bg-black/70"
            >
              {language == "fr" ? "Accueil" : "Home"}
            </Link>
          </div>
          {/* ----------------Recherche------------------------- */}
          {!isSearchVisible && (
            <>
              <div
                className="text-center m-2 laptop:m-0 hidden largeScreen:block" /* Over 1500px */
              >
                <div
                  onClick={() => {
                    handleSearchClick();
                  }}
                  href="../../"
                  className="border px-4 pb-1 pt-[3px] rounded-2xl bg-black/70"
                >
                  {language == "fr" ? "Rechercher" : "Search"}
                </div>
              </div>
              <div
                className="text-center m-2 laptop:m-0 hidden laptop:block largeScreen:hidden" /* Under 1500px */
              >
                <div
                  onClick={() => setModalSearchOpen(true)}
                  href="../../"
                  className="border px-4 pb-1 pt-[3px] rounded-2xl bg-black/70"
                >
                  {language == "fr" ? "Rechercher" : "Search"}
                </div>
              </div>
            </>
          )}
          {isSearchVisible && (
            <div className="flex flex-col translate-y-3">
              <div className="flex border rounded-2xl px-4 py-1 w-[100%] ">
                <input
                  type="text"
                  value={searchTerm} // Lien avec l'état
                  onChange={handleSearchChange} // Gestion du changement
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      router.push(
                        `/dynamic/searchResult/${encodeURIComponent(
                          searchTerm
                        )}`
                      ); // Redirection when "Enter" is pressed
                    }
                  }}
                  className="text-black placeholder-gray-500 outline-none px-1 tablet:w-[245px]"
                />
                <Link
                  href={`/dynamic/searchResult/${encodeURIComponent(
                    searchTerm
                  )}`}
                >
                  {" "}
                  {/* Link to result Page*/}
                  <Image
                    src={searchIconWhite}
                    alt="Search Icon"
                    className="mt-[2px] ml-[10px] w-5 h-5 cursor-pointer"
                    unoptimized={true}
                  />
                </Link>
              </div>

              <div
                className="text-center text-sm cursor-pointer"
                onClick={() => setModalSearchOpen(true)} // Ouvre le modal
              >
                Recherche détaillée
              </div>
            </div>
          )}
          {isModalSearchOpen && (
            <SearchModal onClose={() => setModalSearchOpen(false)} />
          )}
        </div>
        {/* ---------------- Introduction Formularies [Creator - Games] ------------------------- */}
        <div
          className={`order-last flex justify-center laptop:order-none flex-grow`} /* Part Middle */
        >
          <div className={`flex flex-col laptop:flex-row pb-1 laptop:pb-0`}>
            {session?.user?.email ? (
              <>
                {/* The creator introduce himself */}
                <div className="cursor-pointer border text-center rounded-2xl bg-black/70 px-4 pb-1 pt-[3px] order-last laptop:order-none ml-4 mt-2 laptop:mt-0">
                  <Link href="../../creators/introduceYourselfForm">
                  {language === "fr" 
                      ? (
                      <>
                        Votre profil : <span style={{ textTransform: 'capitalize' }}>{username}</span>
                      </>
                    ) : (
                      <>
                        Your profile : <span style={{ textTransform: 'capitalize' }}>{username}</span>
                      </>
                    )}
                  </Link>
                </div>

                {/* The creator introduce his GAME */}
                <div className="cursor-pointer border text-center rounded-2xl bg-black/70 px-4 pb-1 pt-[3px] order-last laptop:order-none ml-4 mt-2 laptop:mt-0">
                  <Link href="../../creators/introductionGameForm">
                    {language == "fr"
                      ? "Présentez votre jeu"
                      : "Introduce your game"}{" "}
                  </Link>
                </div>
              </>
            ) : (
              <div></div>
            )}

            {/* ----------------Comment présenter------------------------- */}
            <div className="cursor-pointer border text-center rounded-2xl bg-black/70 px-4 pb-1 pt-[3px] order-last laptop:order-none ml-4 mt-2 laptop:mt-0">
              {language == "fr"
                ? "Comment présenter votre jeu ?"
                : "How to introduce your game"}
            </div>
          </div>
        </div>
        {/* -----------CONNEXION-----INSCRIPTION-------------------------------------------------------------- */}
        <div className="text-sm uppercase flex justify-center laptop:justify-end pt-2 laptop:pt-1 w-[70%] laptop:w-[25%]">
          <div className="mr-0 laptop:mr-4 flex justify-end" /* Part right */>
            {session?.user?.email ? (
              <div
                className="cursor-pointer border bg-black/70 rounded-2xl py-1 px-3"
                 onClick={() => handleLogout()}
              >
                {language == "fr" ? "Se déconnecter" : "Log out"}
              </div>
            ) : (
              <>
                <div className="border bg-black/70 rounded-2xl py-1 px-3">
                  <Link href="../../creators/login">
                    {language == "fr" ? "Se connecter" : "Login"}
                  </Link>
                </div>
                <div className="ml-3 mr-0 laptop:mr-2 flex justify-end border bg-black/70  rounded-2xl py-1 px-3">
                  <Link href="../../creators/register">
                    {language == "fr" ? "S'inscrire" : "Sign up"}
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* --------Icone HOME visible sur écran mobiles---------------------------------------------------------------- */}
          <Link
            href="../../"
            className="border bg-black/70 rounded-2xl p-[10px] opacity-100 absolute left-0 ml-4 top-[6px] laptop:hidden"
          >
            <Image
              src={homeIconWhite}
              alt="Home Icon"
              className="w-5 h-5"
              unoptimized={true}
            />
          </Link>
          {/* --------Icone SEARCH visible sur écran mobiles------------ */}
          <div className="absolute right-0 mr-4 top-[7px] laptop:hidden border bg-black/70 rounded-2xl p-[11px] ">
            <Image
              src={searchIconWhite}
              onClick={() => setModalSearchOpen(true)}
              alt="Search Icon"
              className="w-4 h-4"
              unoptimized={true}
            />
          </div>
        </div>
      </section>
    </header>
  );
}
