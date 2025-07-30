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
import componentsCss from "@/app/styles/components.module.css";

const pressStart2P = Press_Start_2P({
  // Police d'écriture
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function Header({ background }) {
  const { data: session } = useSession();
  const username = session?.user.username;
  const { language, setLanguage } = useLanguage();
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
    setLanguage("en"); // Change la langue à l'anglais
  };

  const handleChangeToFrench = () => {
    setLanguage("fr"); // Change la langue au français
  };

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Se déconnecter
    router.replace("/"); // Rediriger vers la page d'accueil
  };
  return (
    <header className={`text-white pb-2 ${background}`}>
      <ul className="flex justify-between laptop:px-8 pt-3 relative">
        {/* ----------------DRAPEAUX----------------------------------------------------------------- */}
        <div className="flex w-[75px] h-10 ml-3 laptop:ml-0 mt-2 tablet:w-40 ">
          <li>
            <button
              onClick={handleChangeToEnglish}
              className="inline-block mr-3"
            >
              <Image
                src={flagBG}
                alt="Drapeau Grande Bretagne"
                className="w-7 h-5 cursor-pointer"
                loading="eager" // This image is loading immediatly
                unoptimized={true}
                priority
              />
            </button>
          </li>

          <li>
            <button onClick={handleChangeToFrench} className="inline-block">
              <Image
                src={flagFrance}
                alt="Drapeau France"
                className="w-7 h-5 cursor-pointer"
                loading="eager" // This image is loading immediatly
                unoptimized={true}
              />
            </button>
          </li>
        </div>

        {/* ----------------Logo------------------------- */}
        <div className={`h-16 w-[200px] laptop:w-[370px] ${componentsCss.borderTitle} flex justify-center px-4 rounded-[40px] relative mb-2 mt-2`}>
          <Image src={logoManette} width={60} alt="Logo manette" />
          <div className={`tablet:ml-3 ${componentsCss.title} ${pressStart2P.className}`}>
            This is my game
          </div>
        </div>

        {/* ----------------ICONES-------Réseaux sociaux------------------------------------------------------ */}
        <li className="w-[75px] tablet:hidden">
          {/* Visible seulement sur téléphone */}
          <SocialFrame />
        </li>
        <div className="hidden tablet:flex h-8 w-[75px] tablet:w-[150px] mt-1 mr-3 mb-3 gap-2 flex-row-reverse">
          <li>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <Image
                src={logoInstagram}
                alt="Logo instagram"
                className="w-7 h-7"
                unoptimized={true}
              />
            </a>
          </li>

          <li>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <Image
                src={logoFacebook}
                alt="Logo facebook"
                className="w-7 h-7"
                unoptimized={true}
              />
            </a>
          </li>

          <li>
            <a href="https://www.twitch.tv" target="_blank" rel="noopener noreferrer">
              <Image
                src={logoTwitch}
                alt="Logo twitch"
                className="w-7 h-7"
                unoptimized={true}
              />
            </a>
          </li>

          <li>
            <a href="https://www.discord.com" target="_blank" rel="noopener noreferrer">
              <Image
                src={logoDiscord}
                alt="Logo Discord"
                className="w-8 h-8"
                unoptimized={true}
              />
            </a>
          </li>

          <li>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <Image
                src={logoYoutube}
                alt="Logo Youtube"
                className="w-7 h-7"
                unoptimized={true}
              />
            </a>
          </li>
        </div>
      </ul>

      {/* ----------------LIGNE 2------------------------------------------------------------- */}
      {/* ------------------------------------------------------------------------------------ */}

      <nav className="flex flex-col laptop:flex-row px-2 laptop:px-8 py-2 laptop:h-[60px] items-center laptop:justify-between relative ">
        {" "}
        {/* Part left */}
        <ul
          style={{ display: "flex", alignItems: "center" }}
          className={`w-[65%] laptop:w-[25%] flex justify-center laptop:justify-start `}
        >
          {/* ----------------Home------------------------- */}
          <li className="text-center hidden laptop:block laptop:mr-4">
            <Link
              href={`../../?lang=${language}`}
              className="border px-4 pb-1 pt-[3px] rounded-2xl bg-black/70"
            >
              {language == "fr" ? "Accueil" : "Home"}
            </Link>
          </li>
          {/* ----------------Search------------------------- */}
          {!isSearchVisible && ( // When we have NOT YET clicked on the button Search
            <li
              className="text-center m-2 laptop:m-0 hidden largeScreen:block" /* On large screen : Over 1500px */
            >
              <button onClick={() => {handleSearchClick();}} href="../../"
                className="border px-4 pb-1  rounded-2xl bg-black/70"
              >
                {language == "fr" ? "Rechercher" : "Search"}
              </button>
            </li>
          )}
          {isSearchVisible && ( // When we have ALREADY clicked on the button Search
            <li className="flex flex-col translate-y-3">
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
                        )}?lang=${language}&searchResult=${encodeURIComponent(
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
                  )}?lang=${language}&searchResult=${encodeURIComponent(
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
                {language == "fr" ? "Recherche détaillée" : "Detailed search"}{" "}
              </div>
            </li>
          )}
          {isModalSearchOpen && (
            <SearchModal onClose={() => setModalSearchOpen(false)} />
          )}
        </ul>
        {/* ---------------- Introduction Formularies [Creator - Games] ------------------------- */}
        <ul
          className={`order-last flex justify-center laptop:order-none flex-grow`} /* Part Middle */
        >
          <div className={`flex flex-col laptop:flex-row pb-1 laptop:pb-0`}>
            {session?.user?.email ? (
              <>
                {/* The creator introduce himself */}
                <li className="cursor-pointer border text-center rounded-2xl bg-black/70 px-4 pb-1 pt-[3px] order-last laptop:order-none ml-4 mt-2 laptop:mt-0">
                  <Link
                    href={`../../creators/introduceYourselfForm?lang=${language}`}
                  >
                    {language === "fr" ? (
                      <>
                        Votre profil :{" "}
                        <span style={{ textTransform: "capitalize" }}>
                          {username}
                        </span>
                      </>
                    ) : (
                      <>
                        Your profile :{" "}
                        <span style={{ textTransform: "capitalize" }}>
                          {username}
                        </span>
                      </>
                    )}
                  </Link>
                </li>

                {/* The creator introduce his GAME */}
                <li className="cursor-pointer border text-center rounded-2xl bg-black/70 px-4 pb-1 pt-[3px] order-last laptop:order-none ml-4 mt-2 laptop:mt-0">
                  <Link href={`../../listOfYourGames?lang=${language}`}>
                    {language == "fr"
                      ? "Liste de vos jeux"
                      : "List of your games"}{" "}
                  </Link>
                </li>

                {/* The creator introduce his GAME */}
                <li className="cursor-pointer border text-center rounded-2xl bg-black/70 px-4 pb-1 pt-[3px] order-last laptop:order-none ml-4 mt-2 laptop:mt-0">
                  <Link
                    href={`../../creators/introductionGameForm?lang=${language}`}
                  >
                    {language == "fr"
                      ? "Présentez votre jeu"
                      : "Introduce your game"}{" "}
                  </Link>
                </li>
              </>
            ) : (
              <div></div>
            )}

            {/* ----------------How to introduce your game------------------------- */}
            <li className="cursor-pointer border text-center rounded-2xl bg-black/70 px-4 pb-1 pt-[3px] order-last laptop:order-none ml-4 mt-2 laptop:mt-0">
              {language == "fr"
                ? "Comment présenter votre jeu ?"
                : "How to introduce your game"}
            </li>
          </div>
        </ul>
        {/* -----------CONNEXION-----INSCRIPTION-------------------------------------------------------------- */}
        <div className="text-sm uppercase flex justify-center laptop:justify-end pt-2 laptop:pt-1 w-[70%] laptop:w-[25%]">
          <ul className="mr-0 laptop:mr-4 flex justify-end" /* Part right */>
            <>
              {session?.user?.email ? (
                <li className="cursor-pointer border bg-black/70 rounded-2xl py-1 px-3">
                  <button onClick={handleLogout}>              
                    {language == "fr" ? "Se déconnecter" : "Log out"}              
                  </button>              
                </li>
              ) : (
                <>
                  <li className="border bg-black/70 rounded-2xl py-1 px-3">
                    <Link href={`../../creators/login?lang=${language}`}>
                      {language == "fr" ? "Se connecter" : "Login"}
                    </Link>
                  </li>
                  <li className="ml-3 mr-0 laptop:mr-2 flex justify-end border bg-black/70  rounded-2xl py-1 px-3">
                    <Link href={`../../creators/register?lang=${language}`}>
                      {language == "fr" ? "S'inscrire" : "Sign up"}
                    </Link>
                  </li>
                </>
              )}
            </>
          </ul>

          <ul>
            {/* -------- Icon HOME visible on mobile screen ---------------------------------------------------------------- */}
            <Link
              href="../../"
              className="border bg-black/70 rounded-2xl p-[10px] opacity-100 absolute left-0 ml-4 top-[6px] laptop:hidden"
            >
              <li>
                <Image
                  src={homeIconWhite}
                  alt="Home Icon"
                  className="w-5 h-5"
                  unoptimized={true}
                />
              </li>
            </Link>
            {/* -------- Icon SEARCH visible on mobile screen --------------------------------------------------------------- */}
            <div className="absolute right-0 mr-4 top-[7px] laptop:hidden border bg-black/70 rounded-2xl p-[11px] cursor-pointer">
              <li>
                <Image
                  src={searchIconWhite}
                  onClick={(e) => {
                    setModalSearchOpen(true);
                  }}
                  alt="Search Icon"
                  className="w-4 h-4"
                  unoptimized={true}
                />
              </li>
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
}
