"use client";

import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import { useParams } from "next/navigation";

export default function Profile(){
    // Variable
    const params = useParams();
    const pseudo = params.profilecreators.slice(3); // Important de mettre le nom du dossier [profilecreators]
    console.log(params);
    return(
        <GeneralLayout>
            <div>Ceci est un profil {pseudo} </div>
        </GeneralLayout>
    )
}