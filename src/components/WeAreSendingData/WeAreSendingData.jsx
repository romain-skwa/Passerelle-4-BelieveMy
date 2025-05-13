// When the formulary is submit
// Component used in introductionGameForm
// LOADING component with logos and nameOfGame between

"use client";
import Image from "next/image";
import Chrome from "../../../public/navigator/Chrome.png";
import Firefox from "../../../public/navigator/Firefox.png";
import Safari from "../../../public/navigator/safari.png";
import Edge from "../../../public/navigator/Edge.png";
import MongoDB from "../../../public/navigator/mongodb.jpg";
import pad from "../../../public/logo/icon-manette.png";
import { Press_Start_2P } from "next/font/google";
import formularyCss from "@/app/styles/formulary.module.css";

const pressStart2P = Press_Start_2P({
  // Police d'écriture
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function WeAreSendingData({filesToSend, nameOfGame, avatar}) {
  const getBrowserInfo = () => {
    const userAgent = navigator.userAgent;

    if (userAgent.includes("Chrome")) {
      return "Chrome";
    } else if (userAgent.includes("Firefox")) {
      return "Firefox";
    } else if (userAgent.includes("Safari")) {
      return "Safari";
    } else if (userAgent.includes("Edge")) {
      return "Edge";
    } else if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
      return "Internet Explorer";
    } else {
      return "Unknown Browser";
    }
  };

  const browser = getBrowserInfo(); // Obtenez le nom du navigateur

  return (
    <section className={`bg-[rgba(3,3,3,0.8)] rounded-md py-4 px-6 lg:w-2/3 ${formularyCss.neuphormism} w-[90%] tablet:w-[50%] mx-auto flex text-white`}>
      {/* Screen phone*/}
      <div className="laptop:hidden">
        {filesToSend && filesToSend.posterGlimpseFile ? (
          (() => {
            const url = URL.createObjectURL(filesToSend.posterGlimpseFile);
            return (
              <Image
                src={url}
                className="w-[62px] h-[104px] py-3 inline-block"
                width={275}
                height={154}
                unoptimized={true}
                alt="posterGlimpseFile"
                onClick={() => openModal(url)}
              />
            );
          })() // Assurez-vous que cette parenthèse est bien fermée
        ) : (
          <Image src={pad} />
        )}
      </div>

      {/* Large Screen Laptop */}
      <div className="hidden laptop:block">
        {avatar ? <Image src={avatar} alt="Avatar"  width={100} height={100} /> 
        :
          <>
            {browser === "Chrome" && (
              <Image src={Chrome} alt="Chrome Browser" width={100} height={100} />
            )}
            {browser === "Firefox" && (
              <Image src={Firefox} alt="Firefox Browser" width={100} height={100} />
            )}
            {browser === "Safari" && (
              <Image src={Safari} alt="Safari Browser" width={100} height={100} />
            )}
            {browser === "Edge" && (
              <Image src={Edge} alt="Edge Browser" width={100} height={100} />
            )}
            {browser === "Internet Explorer" && (
              <p>Internet Explorer is not supported.</p>
            )}
            {browser === "Unknown Browser" && <p>Browser not recognized.</p>}
          </>
        }
      </div>
      <div className="flex-1 laptop:hidden flex items-center justify-around">
        <div className={`w-[12px] h-[6px] bg-white mr-1 ${formularyCss.blinkSend}`}></div>
        <div className={`w-[12px] h-[6px] bg-white mr-1 ${formularyCss.blinkSend}`}></div>
        <div className={`w-[12px] h-[6px] bg-white mr-1 ${formularyCss.blinkSend}`}></div>
        <div className={`w-[12px] h-[6px] bg-white mr-1 ${formularyCss.blinkSend}`}></div>
        <div className={`w-[12px] h-[6px] bg-white mr-1 ${formularyCss.blinkSend}`}></div>
      </div>
      <div className="flex-1 hidden laptop:block">
        <div className={`h-[100px] flex items-center text-xl ${pressStart2P.className} `}>
          <p className={`${formularyCss.nameMoving} h-[32px]`}>{nameOfGame}</p>
        </div>
      </div>
      <div>
        <Image
          src={MongoDB}
          width={100}
          height={100}
          className="rounded"
          alt="rectangle"
        />
      </div>
    </section>
  );
}
