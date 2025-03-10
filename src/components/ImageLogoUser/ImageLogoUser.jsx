import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";

const LogoUploader = ({previewUrl, setPreviewUrl, setLogoFile, setIsLogoChanged }) => {
  const { language } = useLanguage();

/************************************************************************************** */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(`Fichier téléchargé : `, file);
    setLogoFile (file);

    // Créer une URL de prévisualisation
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setIsLogoChanged(true)
    }
  };
 
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
        id="logo-upload"
        onChange={handleImageChange}
        className="hidden" // Masque l'input de fichier
      />
      <label htmlFor="logo-upload" className="cursor-pointer bg-blue-500 text-white py-1 px-4 rounded">
        {language === "fr" ? "Télécharger votre logo" : "Upload your logo"}
      </label>

      {previewUrl && (
        <>
          <Image
            src={previewUrl}
            width={250} // Ajustez la largeur selon vos besoins
            height={250} // Ajustez la hauteur selon vos besoins
            alt="Prévisualisation du logo"
            style={{ maxWidth: "100%", marginTop: "10px" }}
            className="py-3 inline-block"
          />
          <div
            onClick={() => {
              setLogoFile(null); // Réinitialiser le logo
              setPreviewUrl(null); // Réinitialiser l'URL de prévisualisation
            }}
            className="cursor-pointer text-red-500 mt-2 text-white"
          >
            {language === "fr" ? "Effacer l'image" : "Delete the image."}
          </div>
        </>
      )}
    </div>
  );
};

export default LogoUploader;