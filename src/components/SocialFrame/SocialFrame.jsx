import Image from "next/image";
import logoInstagram from "/public/logo/instagram_logo.png";
import logoFacebook from "/public/logo/facebook_logo.png";
import logoTwitch from "/public/logo/twitch_logo.png";
import logoDiscord from "/public/logo/discord-logo.png";
import logoYoutube from "/public/logo/youtube_logo.png";

import "../../app/styles/components.css";

export default function SocialFrame() {
return(
    <>
        <section className="w-[3.25rem] overflow-hidden">
            <div className="flex gap-1 allIconSocial">
                <Image src={logoDiscord} alt="Logo Discord" className="w-[1.5rem]" unoptimized={true} />
                <Image src={logoYoutube} alt="Logo Youtube" className="w-[1.5rem]" unoptimized={true} />
                <Image src={logoInstagram} alt="Logo instagram" className="w-[1.5rem]" unoptimized={true} />
                <Image src={logoFacebook} alt="Logo facebook" className="w-[1.5rem]" unoptimized={true} />
                <Image src={logoTwitch} alt="Logo twitch" className="w-[1.5rem]" unoptimized={true} />
                <Image src={logoDiscord} alt="Logo Discord" className="w-[1.5rem]" unoptimized={true} />
                <Image src={logoYoutube} alt="Logo Youtube" className="w-[1.5rem]" unoptimized={true} />
            </div>
        </section>
   </>
)
}