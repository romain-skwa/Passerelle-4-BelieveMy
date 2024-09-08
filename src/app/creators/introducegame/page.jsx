"use client";

import { createIntroduction } from "@/actions/create-post";
import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import imageOne from "../../../../public/presentation/mario&co.jpg";

// FORMULARY used by a the creator to introduce one game

export default function IntroduceGame() {
  // Variable
  const { data: session } = useSession();

  // State
  const [textarea, setTextarea] = useState("");
  const [lienImage, setLienImage] = useState("");

  // Function
  const onPrepare = async (formData) => {
    try {
      await createIntroduction(formData);
      toast.success("Présentation du jeu envoyée avec succès !");
    } catch (error) {
      return toast.error(error.message);
    }
  };
  return (
    <GeneralLayout>
      <p>
        Ici nous sommes dans la page de formulaire où les développeurs
        présenteront leurs jeux.
      </p>
      <form action={onPrepare}>
        <p>
          {session?.user.username}, sur cette page, vous êtes invité à remplir
          de présentation de votre jeux.
        </p>
        <textarea
          type="text"
          placeholder="présentez ici"
          name="introductionOfTheGame"
          value={textarea}
          onChange={(e) => setTextarea(e.target.value)}
          className="w-11/12 h-48 p-4 text-lg"
        />
        <input type="text" name="imageOne" placeholder="&quot;../../../../public/presentation/.jpg&quot;" value={lienImage} onChange={(e) => setLienImage(e.target.value)} className="w-11/12  p-2 text-lg"/>
        <button
          className="bg-green-500 p-3 mx-auto w-40 border-2 border-red-800 rounded-2xl m-2 disabled:bg-opacity-50 disabled:cursor-not-allowed disabled:border-none"
          disabled={textarea.length < 1}
        >
          Envoyer
        </button>
      </form>
      <Image src={imageOne} className="w-48"></Image>
    </GeneralLayout>
  );
}
