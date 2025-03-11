import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";
import { toast } from "react-toastify";

const LogoUploader = (
  {
    previewUrl,
    setPreviewUrl,
    setLogoFile,
    setIsLogoChanged,
    logoUrl,
    handleDeleteImage,
    extractPublicIdFromUrl
  }) => {
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
/**************************************************************************** */
const handleDeleteLogo = async (event) => {
  event.preventDefault();
  //----- Step ONE ---------------------------------------
  // Is one file selected ?
  if (!logoUrl) {
    console.error("Aucun fichier logo n'a été sélectionné.");
    return toast.error("Veuillez sélectionner un logo avant de soumettre.");
  }

  try {
    console.log("On tente d'effacer l'image du logo");
  //----- Step TWO ---------------------------------------
    // Extraction of Identification of the ancient image
    const oldPublicId = extractPublicIdFromUrl(logoUrl);
      console.log("ID public de l'ancienne image à supprimer:", oldPublicId);
  
      //----- Step THREE ---------------------------------------
    // Deletion of the ancient image
    await handleDeleteImage(oldPublicId);
    toast.success(language == "fr" ? "Le logo a bien été supprimé !" : "Logo deleted");
  } catch (error) {
    console.error("Erreur lors de la suppression du logo :", error);
    toast.error(error.message);
  }
}; 
  return (
    <div className="flex flex-col items-center">
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
        </>
      )}  
  
      <input
        type="file"
        accept="image/*"
        id="logo-upload"
        onChange={handleImageChange}
        className="hidden" // Masque l'input de fichier
      />
      <label htmlFor="logo-upload" className="cursor-pointer w-[200px] linearUp text-white py-1 px-4 rounded">
        {language === "fr" ? "Télécharger votre logo" : "Upload your logo"}
      </label>

      {previewUrl && (
        <div className="cursor-pointer w-[200px] linearUp text-white py-1 px-4 rounded"
          onClick={() => {
            const confirmDelete = window.confirm(language === "fr" ? "Êtes-vous sûr de vouloir effacer l'image ?" : "Are you sure you want to delete the image?");
            if (confirmDelete) {
              handleDeleteLogo(event);
              setLogoFile(null); // Réinitialiser le logo
              setPreviewUrl(null); // Réinitialiser l'URL de prévisualisation
            }
          }}          
        >
        {language === "fr" ? "Effacer l'image" : "Delete the image."}
        </div>
      )}
    </div>
  );
};

export default LogoUploader;