"use client";

import { CldUploadWidget } from "next-cloudinary";

// Fonction pour extraire l'ID public de l'URL Cloudinary
const extractPublicIdFromUrl = (url) => {
  const uploadIndex = url.indexOf('upload') + 7;
  const startIndex = url.indexOf('/', uploadIndex) + 1;
  const endIndex = url.lastIndexOf('.');
  return url.slice(startIndex, endIndex !== -1 ? endIndex : undefined);
};

export function ImageUpload({ urlCloudinary, setter, buttonText, tag, nameOfGame }) {
  //console.log("Dans le composant ImageUpload, urlCloudinary : ", urlCloudinary);
  // Fonction pour supprimer l'image de Cloudinary
  const handleDeleteImage = async (publicId) => {
    if (publicId) {
      console.log(`On est censé effacer l'image précédente dans Cloudinary. Son identifiant public est : ${publicId}`);
      try {
        const response = await fetch('/api/cloudinary/destroy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ public_id: publicId, invalidate: true }),
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
    } else {
      console.log("On dirait qu'il n'y a pas de publicId à supprimer.");
    }
  };

  // Supprimer l'ancienne image avant l'upload de la nouvelle image
  const handleImageUpload = async () => {
    if (urlCloudinary) {
      const oldPublicId = extractPublicIdFromUrl(urlCloudinary);
      console.log("ID public de l'ancienne image à supprimer:", oldPublicId);
      await handleDeleteImage(oldPublicId); // Supprimer l'ancienne image
      setter('');
    }
  };

  const handleImageUploadSuccess = async (result) => {
    if (typeof result.info === "object" && "secure_url" in result.info) {
      // Mettre à jour l'URL de l'image avec la nouvelle image
      setter(result.info.secure_url);
      console.log("Image info:", result.info);
    }
  };

  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET}
      signatureEndpoint="/api/cloudinary/route"
      onSuccess={handleImageUploadSuccess} // Appeler après le téléchargement avec succès
      options={{
        singleUploadAutoClose: true, // Fermeture automatique
        multiple: false, // Un seul fichier envoyé à la fois
        clientAllowedFormats: ["jpg", "jpeg", "png"],
        maxImageFileSize: 1000000, // Poids maximum autorisé
        maxImageWidth: 500, // réduire l'image à une largeur de 500 pixels avant le téléchargement
        tags: [tag], // ajouter les tags donnés aux fichiers téléchargés
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => {
              handleImageUpload(); // Appeler la fonction de suppression avant l'upload
              open(); // Lancer l'upload après suppression
            }}
            className="w-[180px] mt-2 text-center mx-auto rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
          >
            {buttonText}
          </div>
        );
      }}
    </CldUploadWidget>
  );
}
