"use client";
import Image from "next/image";
import hitman from "../../../public/background/hitman47.jpg";
import { useSession } from "next-auth/react";
import { VT323 } from "next/font/google";
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";

const vt323 = VT323({
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
            <section className="w-[95vw]">
                {session?.user?.username && (
                    <div className={`text-white text-center uppercase ${vt323.className} text-3xl mb-6`} style={{letterSpacing: '0.1em'}}>
                        {session?.user.username}
                    </div>
                )}
                <Image src={hitman} width={500} height={250} unoptimized={true} alt="Hitman" className="mx-auto" />
                <div className={`text-white text-center uppercase ${vt323.className} text-2xl mt-6`} style={{letterSpacing: '0.1em'}}>
                    {language === "fr"
                        ? "Un agent qualifié fait disparaitre vos données. Veuillez attendre..."
                        : "Your data has been deleted"
                    }
                </div>
            </section>
        </section>
    )
}