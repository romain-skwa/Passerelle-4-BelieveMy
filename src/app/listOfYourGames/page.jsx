"use client";
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";
import MadeByThisCreator from "@/components/MadeByThisCreator/MadeByThisCreator";
import { useSession } from "next-auth/react";

export default function listOfYourGames() {
    const { data: session } = useSession();

    const usernameEncoded = session?.user?.username;
    console.log(`usernameEncoded `, usernameEncoded);
    return(
        <GeneralLayout>
            <div className="tablet:w-[70vw] laptop:w-[50vw] mx-auto">
                <MadeByThisCreator usernameEncoded={usernameEncoded} />     
            </div>
        </GeneralLayout>           
    );
}