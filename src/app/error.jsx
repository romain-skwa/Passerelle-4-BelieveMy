"use client";
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";
import marioMovie from "/public/background/mario.jpg";
import Image from "next/image";
import { Press_Start_2P } from "next/font/google";
import "@/app/styles/formulary.css";

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
        <section className="borderTitle flex flex-col text-center items-center justify-center p-4 w-[90vw] tablet:w-[70vw] laptop:w-[50vw] mx-auto rounded-2xl">
            <div className={`text-white shadowPurple text-[14px] tablet:text-[18px] capitalize ${pressStart2P.className}`}>
                Une erreur s'est produite du coté serveur         
            </div>
        </section>
    </GeneralLayout>
  );
}
