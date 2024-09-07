"use client";

import { createIntroduction } from "@/actions/create-post";
import GeneralLayout from "@/components/GeneralLayout/GeneralLayout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

// FORMULARY used by a the creator to introduce one game

export default function IntroduceGame() {
  // Variable
  const { data: session } = useSession();

  // State
  const [textarea, setTextarea] = useState("");

  // Function
  const onPrepare = async (formData) => {
    try {
      await createIntroduction(formData);
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
        />
        <button
          className="bg-green-500 p-3 mx-auto w-40 border-2 border-red-800 rounded-2xl m-2 disabled:bg-opacity-50 disabled:cursor-not-allowed disabled:border-none"
          disabled={textarea.length < 1}
        >
          Envoyer
        </button>
      </form>
    </GeneralLayout>
  );
}
