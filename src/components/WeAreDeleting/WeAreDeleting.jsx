"use client";
import Image from "next/image";
import hitman from "../../../public/background/hitman47.jpg";
import { useSession } from "next-auth/react";
import { Press_Start_2P } from "next/font/google";
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";

const pressStart2P = Press_Start_2P({
// Police d'écriture
subsets: ["latin"],
display: "swap",
weight: "400",
});

export default function WeAreDeleting(){
    const { data: session } = useSession();
    const { language } = useLanguage();

    return(
        <section className="flex flex-col w-full h-screen justify-center items-center bg-black">
            {session?.user?.username && (
                <div className={`text-white uppercase ${pressStart2P.className} mb-6`}>
                    {session?.user.username}
                </div>
            )}
            <Image src={hitman} width={500} height={250} unoptimized={true} alt="Hitman"/>
            <div className={`text-white uppercase ${pressStart2P.className} mt-6`}>
                {language === "fr"
                    ? "Vos données ont disparu"
                    : "Your data has been deleted"
                }
            </div>
        </section>
    )
}