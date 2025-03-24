"use client";
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";
import MadeByThisCreator from "@/components/MadeByThisCreator/MadeByThisCreator";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function listOfYourGames() {
    const { data: session } = useSession();
    const { language } = useLanguage("");

    const usernameDecoded = session?.user?.username;

    const [howManyGame, setHowManyGame] = useState("");

    // Title
    const frenchTitle = () => {
        if(howManyGame === 0){
            return "Aucun jeu";
        } 
        else if(howManyGame === 1){
            return "Mon jeu";
        }else{
            return "Ma liste de jeux";
        }
    }

    const englishTitle = () => {
        if(howManyGame === 0){
            return "No game";
        } 
        else if(howManyGame === 1){
            return "My game";
        }else{
            return "My games";
        }
    }

    const titleNow = language === "fr" ? frenchTitle() : englishTitle();

    useEffect(() => {
        document.title = titleNow;
    }, [language, titleNow]);

    return(
        <GeneralLayout>
            <div className="tablet:w-[70vw] laptop:w-[50vw] mx-auto">
                <MadeByThisCreator
                 usernameEncoded={encodeURIComponent(usernameDecoded)}
                 usernameDecoded={usernameDecoded}
                 setHowManyGame={setHowManyGame} />     
            </div>
        </GeneralLayout>           
    );
}