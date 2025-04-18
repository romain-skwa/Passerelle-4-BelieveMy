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

      setFilesToSend(prevImages => ({ ...prevImages, [key]: file }));

      // Créer une URL de prévisualisation
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // Définir les dimensions en fonction de la valeur de `name`
  const isUrlPosterCloudinary = name === "posterGlimpseFile";
  const width = isUrlPosterCloudinary ? 192 : 275;
  const height = isUrlPosterCloudinary ? 311 : 154;
  const dimensionCss = isUrlPosterCloudinary ? "w-[192px] h-[311px]" : "w-[275px] h-[154px]";

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
      <label htmlFor={name} className="cursor-pointer text-white py-1 px-4 rounded bg-black/30 border">
        {language === "fr" ? "Parcourir" : "Browse"}
      </label>

      {previewUrl && (
        <>
          <Image
            src={previewUrl}
            width={width}
            height={height}
            alt="Prévisualisation"
            style={{ maxWidth: "100%", marginTop: "10px" }}
            className={`py-3 inline-block ${dimensionCss}`}
          />
          <div
            onClick={() => {
              setFilesToSend(prevImages => {
                const newImages = { ...prevImages };
                delete newImages[name]; // Supprime la clé correspondant à `name`
                return newImages;
              });
              setPreviewUrl(null); // Réinitialiser l'URL de prévisualisation
            }}
            className="cursor-pointer"
          >
            {language === "fr" ? "Effacer l'image" : "Delete the image."}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCloudinary;