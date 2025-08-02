import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";
import { toast } from "react-toastify"; // Assurez-vous d'importer toast

const ImageCloudinary = ({ name, setFilesToSend }) => {
  const { language } = useLanguage();
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    // console.log(`name : `, name,` file dans le composant ImageCloudinary : `, file);

    // Vérifie l'extension du fichier
    if (file) {
      const fileName = file.name;
      if (!fileName.match(/\.(jpg|jpeg|png)$/i)) {
        toast.error("Seuls les fichiers JPG, JPEG ou PNG sont autorisés.");
        return; // Ne pas continuer si le fichier n'est pas valide
      }

      setFilesToSend((prevImages) => ({ ...prevImages, [key]: file }));

      // Créer une URL de prévisualisation
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDeleteImage = () => {
    setFilesToSend((prevImages) => {
      const newImages = { ...prevImages };
      delete newImages[name]; // Supprime la clé correspondant à `name`
      return newImages;
    });
    setPreviewUrl(null); // Réinitialiser l'URL de prévisualisation

    // Afficher un message de confirmation
    toast.success(
      language === "fr"
        ? "Image supprimée avec succès"
        : "Image deleted successfully"
    );
  };

  // Définir les dimensions en fonction de la valeur de `name`
  const isUrlPosterCloudinary = name === "posterGlimpseFile";
  const width = isUrlPosterCloudinary ? 192 : 275;
  const height = isUrlPosterCloudinary ? 311 : 154;
  const dimensionCss = isUrlPosterCloudinary
    ? "w-[192px] h-[311px]"
    : "w-[275px] h-[154px]";

  // Nettoyer l'URL de prévisualisation lors du démontage du composant
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        name={name}
        id={name}
        onChange={(e) => handleImageChange(e, name)}
        className="hidden" // Masque l'input de fichier
      />
      <label
        htmlFor={name}
        className="cursor-pointer text-white py-1 px-4 rounded bg-black/30 border"
      >
        {language === "fr" ? "Parcourir" : "Browse"}
      </label>

      {previewUrl && (
        <>
          <div className="relative mt-3">
            <Image
              src={previewUrl}
              width={width}
              height={height}
              alt="Prévisualisation"
              style={{ maxWidth: "100%" }}
              className={`inline-block ${dimensionCss}`}
            />
            {/* Bouton de suppression avec icône */}
            <button
              onClick={handleDeleteImage}
              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-colors duration-200"
              title={language === "fr" ? "Supprimer l'image" : "Delete image"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Bouton de suppression alternatif en dessous de l'image */}
          <button
            onClick={handleDeleteImage}
            className="mt-2 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm transition-colors duration-200 flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3,6 5,6 21,6"></polyline>
              <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
            </svg>
            {language === "fr" ? "Supprimer" : "Delete"}
          </button>
        </>
      )}
    </div>
  );
};

export default ImageCloudinary;
