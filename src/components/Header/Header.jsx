import Image from "next/image";
import logoInstagram from "../../../public/logo/instagram_logo.png";
import logoFacebook from "../../../public/logo/facebook_logo.png";
import logoTwitch from "../../../public/logo/twitch_logo.png";
import flagBG from "../../../public/flag/drapeau_uk.jpg";
import flagFrance from "../../../public/flag/Flag_France.png";

export default function Header() {
  return (
    <header>
      <section className="flex justify-between mx-2 lg:mx-8 mt-2 border">
        <div className="mt-4 lg:w-48 border ">
          <Image
            src={logoInstagram}
            alt="Logo instagram"
            className="inline-block w-8"
          />

          <Image
            src={logoFacebook}
            alt="Logo facebook"
            className="inline-block  w-8 mx-2"
          />

          <Image
            src={logoTwitch}
            alt="Logo twitch"
            className="inline-block w-8"
          />
        </div>
        <div className="w-28 h-24 bg-red-900 text-white">LOGO</div>

        <div>
          <div className="mt-4 lg:flex lg:w-48 border">
            <div
              className="mr-2 lg:mr-4" /* Petite marge externe ajoutée quand on est sur un écran pc. Le margin créé un espace vide entre les div. un padding aurait agrandit la zone cliquable*/
            >
              Se connecter
            </div>
            <div>S'inscrire</div>
          </div>
          <div className=" flex justify-center lg:justify-center border">
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

      <section className="flex flex-col lg:flex-row justify-between mx-2 lg:mx-8 mt-2 border items-center">
        <div className="border w-1/5"></div>
        <div className="text-center order-last lg:order-none m-2 lg:m-0 bg-orange-400 lg:w-3/5">
          <input type="text" />
        </div>
        <div className="text-center p-2 border lg:w-1/5">Comment présenter votre jeu ?</div>
      </section>
    </header>
  );
}
