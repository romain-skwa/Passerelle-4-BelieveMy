"use client";

import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import { useParams } from "next/navigation";

export default function IntroductionOfGame(){
    // Variable
    const params = useParams();
    const nameofgame = params.introduction; // Important de mettre le nom du dossier [profilecreators]
    console.log(params);
    return(
        <GeneralLayout>
            <div>Ceci est la présentation du jeu {nameofgame} </div>
        </GeneralLayout>
    )
}