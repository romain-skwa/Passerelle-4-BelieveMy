import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";
import deleteIntroduction from "@/actions/eraseOneIntroduction";
import handleEraseAllImages from "@/actions/handleEraseAllImages";

const DeleteIntro = ({ game, setWeAreDeleting }) => {
  const router = useRouter();
  const [gameId, setGameId] = useState();
  const [nameOfGame, setNameOfGame] = useState("");
  const { language } = useLanguage();

  useEffect(() => {
    if (game && game._id) {
      setGameId(game._id);
      setNameOfGame(decodeURIComponent(game.nameofgame));
    }
  }, [game]);

  // Suppression du jeu par le créateur
  //console.log(`gameId de la présentation à supprimer dans le composant DeleteIntro: `, gameId);

  const handleDelete = async () => {
    if (!confirm("Voulez vraiment supprimer la présentation de votre jeu ?"))
      return;

    try {
      setWeAreDeleting(true);
      await handleEraseAllImages(game);
      await deleteIntroduction(gameId, nameOfGame);
    } catch (error) {
      return toast.error(error.message);
    }
    toast.success("La présentation vient d'être supprimée.");
    router.push("/");
  };

  return (
    <>
      {/* DELETE this introduction */}
      <div
        onClick={handleDelete}
        className="w-[250px] p-2 flex justify-center mx-auto mt-4 hover:bg-red hover:text-white transition-colors duration-300 cursor-pointer"
      >
        {language === "fr"
          ? "Supprimer cette présentation"
          : "Delete this introduction"}
      </div>
    </>
  );
};

export default DeleteIntro;
