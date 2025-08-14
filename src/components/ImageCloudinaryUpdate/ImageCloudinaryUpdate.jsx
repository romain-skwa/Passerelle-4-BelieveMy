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

const ImageCloudinaryUpdate = ({ name, urlCloudinary, setUrlCloudinary, buttonText, setFilesToSend }) => {
  const { language } = useLanguage();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleImageChange = (e) => {
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

      // Stocker le fichier temporairement (sera uploadé lors de la soumission)
      setFilesToSend((prevFiles) => ({ ...prevFiles, [name]: file }));
      
      // Mettre à jour l'URL Cloudinary avec l'URL temporaire pour l'affichage immédiat
      setUrlCloudinary(url);
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
            {/* Bouton de suppression avec icône - seulement si c'est une vraie URL Cloudinary */}
            {urlCloudinary && urlCloudinary.startsWith('http') && urlCloudinary.includes('cloudinary') && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDeleting(true);
                  const publicId = extractPublicIdFromUrl(urlCloudinary);
                  console.log(`On est censé effacer l'image précédente dans Cloudinary. Son identifiant public est : ${publicId}`);
                  
                  fetch('/api/cloudinary/destroy', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ public_id: publicId, invalidate: true }),
                    cache: "no-store",
                  })
                  .then(response => response.json())
                  .then(result => {
                    if (result.result === "ok") {
                      console.log("Image supprimée de Cloudinary :", result);
                      setUrlCloudinary("");
                      setFilesToSend((prevFiles) => {
                        const newFiles = { ...prevFiles };
                        delete newFiles[name];
                        return newFiles;
                      });
                      setPreviewUrl(null);
                      toast.success(
                        language === "fr"
                          ? "Image supprimée avec succès"
                          : "Image deleted successfully"
                      );
                    } else {
                      console.error("Erreur lors de la suppression de l'image :", result.error);
                      toast.error(
                        language === "fr"
                          ? "Erreur lors de la suppression de l'image"
                          : "Error deleting image"
                      );
                    }
                  })
                  .catch(error => {
                    console.error("Error deleting image:", error);
                    toast.error(
                      language === "fr"
                        ? "Erreur lors de la suppression de l'image"
                        : "Error deleting image"
                    );
                  })
                  .finally(() => {
                    setIsDeleting(false);
                  });
                }}
                disabled={isDeleting}
                className={`absolute -top-2 -right-2 rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-colors duration-200 ${
                  isDeleting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
                title={language === "fr" ? "Supprimer l'image" : "Delete image"}
              >
                {isDeleting ? (
                  <svg
                    className="animate-spin"
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
                    <path d="M21 12a9 9 0 11-6.219-8.56"></path>
                  </svg>
                ) : (
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
                )}
              </button>
            )}
          </div>

          {/* Bouton de suppression alternatif en dessous de l'image - seulement si c'est une vraie URL Cloudinary */}
          {urlCloudinary && urlCloudinary.startsWith('http') && urlCloudinary.includes('cloudinary') && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDeleting(true);
                const publicId = extractPublicIdFromUrl(urlCloudinary);
                console.log("ID public de l'ancienne image à supprimer:", publicId);
                
                fetch('/api/cloudinary/destroy', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ public_id: publicId, invalidate: true }),
                  cache: "no-store",
                })
                .then(response => response.json())
                .then(result => {
                  if (result.result === "ok") {
                    console.log("Image supprimée de Cloudinary :", result);
                    setUrlCloudinary("");
                    setFilesToSend((prevFiles) => {
                      const newFiles = { ...prevFiles };
                      delete newFiles[name];
                      return newFiles;
                    });
                    setPreviewUrl(null);
                    toast.success(
                      language === "fr"
                        ? "Image supprimée avec succès"
                        : "Image deleted successfully"
                    );
                  } else {
                    console.error("Erreur lors de la suppression de l'image :", result.error);
                    toast.error(
                      language === "fr"
                        ? "Erreur lors de la suppression de l'image"
                        : "Error deleting image"
                    );
                  }
                })
                .catch(error => {
                  console.error("Error deleting image:", error);
                  toast.error(
                    language === "fr"
                      ? "Erreur lors de la suppression de l'image"
                      : "Error deleting image"
                  );
                })
                .finally(() => {
                  setIsDeleting(false);
                });
              }}
              disabled={isDeleting}
              className={`mt-2 py-1 px-3 rounded text-sm transition-colors duration-200 flex items-center gap-1 ${
                isDeleting 
                  ? 'bg-gray-400 cursor-not-allowed text-gray-600' 
                  : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
            >
              {isDeleting ? (
                <>
                  <svg
                    className="animate-spin"
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
                    <path d="M21 12a9 9 0 11-6.219-8.56"></path>
                  </svg>
                  {language === "fr" ? "Suppression..." : "Deleting..."}
                </>
              ) : (
                <>
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
                </>
              )}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ImageCloudinaryUpdate; 