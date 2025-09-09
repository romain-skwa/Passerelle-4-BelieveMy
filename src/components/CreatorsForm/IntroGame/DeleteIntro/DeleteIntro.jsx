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
    if (!confirm(
      language === "fr" 
        ? "Voulez vraiment supprimer la présentation de votre jeu ?" 
        : "Do you really want to delete your game's presentation?"
    ))
      return;

    try {
      setWeAreDeleting(true);
      await handleEraseAllImages(game, language);
      await deleteIntroduction(gameId, nameOfGame, language);
    } catch (error) {
      return toast.error(
        language === "fr" 
          ? "Une erreur est survenue lors de la suppression" 
          : "An error occurred during deletion"
      );
    }
    toast.success(
      language === "fr" 
        ? "La présentation vient d'être supprimée." 
        : "The presentation has been deleted."
    );
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
