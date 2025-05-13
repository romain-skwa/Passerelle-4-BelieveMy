import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";
import marioMovie from "/public/background/mario.jpg";
import Image from "next/image";
import { Press_Start_2P } from "next/font/google";
import componentsCss from "@/app/styles/components.module.css";
import formularyCss from "@/app/styles/formulary.module.css";

// FORMULARY used by a the creator to introduce one game
const pressStart2P = Press_Start_2P({
  // Police d'écriture
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function NotFound() {
  return (
    <GeneralLayout>
      <section className={`${componentsCss.borderTitle} flex flex-col text-center items-center justify-center p-4 w-[90vw] tablet:w-[70vw] laptop:w-[50vw] mx-auto rounded-2xl`}>
        <div className={`text-white ${formularyCss.shadowPurple} text-[14px] tablet:text-[18px] capitalize ${pressStart2P.className}`}>
          Cette page n'existe pas ou a été supprimée
        </div>
        <Image 
          src={marioMovie}
          width={400}
          height={200}
          alt={"Mario"}
          unoptimized={true}
          className="mt-6 rounded-xl"
          />
        </section>
    </GeneralLayout>
  );
}
