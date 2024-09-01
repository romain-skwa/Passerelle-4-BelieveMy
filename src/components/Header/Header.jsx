import Image from "next/image";
import logoInstagram from "../../../public/logo/instagram_logo.png";
import logoFacebook from "../../../public/logo/facebook_logo.png";
import logoTwitch from "../../../public/logo/twitch_logo.png";

export default function Header() {
  return (
    <header>
      <section className="flex justify-between mx-8 mt-2">
        <div className="mt-4">
          <Image
            src={logoInstagram}
            alt="Logo instagram"
            width={30}
            height={30}
            className="inline-block"
          />

          <Image
            src={logoFacebook}
            alt="Logo facebook"
            width={30}
            height={30}
            className="inline-block mx-2"
          />

          <Image
            src={logoTwitch}
            alt="Logo twitch"
            width={30}
            height={30}
            className="inline-block"
          />
        </div>
        <div className="w-28 h-24 bg-red-900 text-white">LOGO</div>
        <div className="mt-4">Se connecter S'inscrire</div>
      </section>
      Ici. Ce sera le header.
    </header>
  );
}
