import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";
import { toast } from "react-toastify";

// Fonction pour extraire l'ID public de l'URL Cloudinary
const extractPublicIdFromUrl = (url) => {
  const uploadIndex = url.indexOf('upload') + 7;
  const startIndex = url.indexOf('/', uploadIndex) + 1;
  const endIndex = url.lastIndexOf('.');
  return url.slice(startIndex, endIndex !== -1 ? endIndex : undefined);
};

const ImageCloudinaryUpdate = ({ name, urlCloudinary, setUrlCloudinary, buttonText }) => {
  const { language } = useLanguage();
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileName = file.name;
      if (!fileName.match(/\.(jpg|jpeg|png)$/i)) {
        toast.error("Seuls les fichiers JPG, JPEG ou PNG sont autorisés.");
        return;
      }

      // Créer une URL de prévisualisation
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Upload vers Cloudinary
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/cloudinary/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          if (result.secure_url) {
            setUrlCloudinary(result.secure_url);
            setPreviewUrl(null); // Nettoyer la prévisualisation temporaire
            toast.success(
              language === "fr"
                ? "Image téléchargée avec succès"
                : "Image uploaded successfully"
            );
          }
        } else {
          const errorData = await response.json();
          toast.error(
            language === "fr"
              ? `Erreur lors du téléchargement de l'image: ${errorData.error}`
              : `Error uploading image: ${errorData.error}`
          );
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error(
          language === "fr"
            ? "Erreur lors du téléchargement de l'image"
            : "Error uploading image"
        );
      }
    }
  };

  const handleDeleteImage = async () => {
    // Si une URL Cloudinary existe, supprimer l'image de Cloudinary
    if (urlCloudinary) {
      const publicId = extractPublicIdFromUrl(urlCloudinary);
      console.log(`On est censé effacer l'image précédente dans Cloudinary. Son identifiant public est : ${publicId}`);
      
      try {
        const response = await fetch('/api/cloudinary/destroy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ public_id: publicId, invalidate: true }),
          cache: "no-store",
        });
        
        const result = await response.json();
        if (response.ok) {
          console.log("Image supprimée de Cloudinary :", result);
        } else {
          console.error("Erreur lors de la suppression de l'image :", result.error);
        }
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }

    // Réinitialiser les URLs
    setUrlCloudinary("");

    // Afficher un message de confirmation
    toast.success(
      language === "fr"
        ? "Image supprimée avec succès"
        : "Image deleted successfully"
    );
  };

  // Fonction pour supprimer l'ancienne image avant d'uploader une nouvelle
  const handleImageUpload = async () => {
    if (urlCloudinary) {
      const oldPublicId = extractPublicIdFromUrl(urlCloudinary);
      console.log("ID public de l'ancienne image à supprimer:", oldPublicId);
      await handleDeleteImage(); // Supprimer l'ancienne image
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

  // Définir les dimensions en fonction de la valeur de `name`
  const isUrlPosterCloudinary = name === "posterGlimpseFile";
  const width = isUrlPosterCloudinary ? 192 : 275;
  const height = isUrlPosterCloudinary ? 311 : 154;
  const dimensionCss = isUrlPosterCloudinary
    ? "w-[192px] h-[311px]"
    : "w-[275px] h-[154px]";



  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        name={name}
        id={name}
        onChange={handleImageChange}
        className="hidden"
      />
      <label
        htmlFor={name}
        className="cursor-pointer text-white py-1 px-4 rounded bg-black/30 border"
        onClick={handleImageUpload}
      >
        {buttonText}
      </label>

      {/* Afficher l'image existante ou la prévisualisation */}
      {(urlCloudinary || previewUrl) && (
        <>
          <div className="relative mt-3">
            <Image
              src={previewUrl || urlCloudinary}
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

export default ImageCloudinaryUpdate; 