import Image from "next/image";
import sonic from "/public/gif/sonic.gif";
import { VT323 } from "next/font/google";
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";
import formularyCss from "@/app/styles/formulary.module.css";

const vt323 = VT323({
// Police d'écriture
subsets: ["latin"],
display: "swap",
weight: "400",
});

export default function WeAreUpdatingProfil({ }) {
    const { language } = useLanguage();

    return(
        <section className={`sectionTextareaIntroYourself  ${formularyCss.shadowPurple} w-[90vw] tablet:w-[75vw] laptop:w-[50vw]`}>
            <Image src={sonic} width={500} height={500} unoptimized={true} alt="Sonic" className="mx-auto" />        
            <div className={`text-white text-center uppercase ${vt323.className} text-2xl tablet:text-3xl mt-6 bg-slate-900 rounded-2xl`} style={{letterSpacing: '0.1em'}}>
                {language === "fr"
                    ? "Sonic s'occupe de votre mise à jour rapide"
                    : "Sonic takes care of your quick update"
                }
            </div>
        </section>
    )
}