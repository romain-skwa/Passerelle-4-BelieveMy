// actions/handleEraseAllImages.js
import { toast } from "react-toastify";

// Fonction pour supprimer toutes les images
const handleDeleteAllImages = async (game) => {
   console.log(`Dans handleDeleteAllImages, la fonction qui doit effacer toutes les images : `, game);
  // Fonction pour extraire l'ID public de l'URL Cloudinary
  const extractPublicIdFromUrl = (url) => {
    const uploadIndex = url.indexOf('upload') + 7;
    const startIndex = url.indexOf('/', uploadIndex) + 1;
    const endIndex = url.lastIndexOf('.');
    return url.slice(startIndex, endIndex !== -1 ? endIndex : undefined);
  };

  // Extraction
  const publicIds = [
    game.urlPosterCloudinary ? extractPublicIdFromUrl(game.urlPosterCloudinary) : null,  
    game.urlPoster ? extractPublicIdFromUrl(game.urlPoster) : null,
    game.urlImageOneCloudinary ? extractPublicIdFromUrl(game.urlImageOneCloudinary) : null,  
    game.urlImageTwoCloudinary ? extractPublicIdFromUrl(game.urlImageTwoCloudinary) : null,  
    game.urlImageThreeCloudinary ? extractPublicIdFromUrl(game.urlImageThreeCloudinary) : null,  
    game.urlBackgroundCloudinary ? extractPublicIdFromUrl(game.urlBackgroundCloudinary) : null,  
  ];

  console.log(publicIds);
  let deleteSuccess = true;

  for (const publicId of publicIds) {
    if (publicId) {
      const success = await handleDeleteImage(publicId);
      if (!success) {
        deleteSuccess = false; // Si une suppression échoue, mettre à jour la variable
      }
    }
  }

  // Afficher un message de toast
  if (deleteSuccess) {
    toast.success("Toutes les images ont été supprimées avec succès !");
  } else {
    toast.error("Une ou plusieurs images n'ont pas pu être supprimées.");
  }
};

// Fonction pour supprimer une image de Cloudinary
const handleDeleteImage = async (publicId) => {
  if (publicId) {
    console.log(`On est censé effacer l'image précédente dans Cloudinary. Son identifiant public est : ${publicId}`);
    try {
      const response = await fetch("/api/cloudinary/destroy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: publicId, invalidate: true }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Image supprimée de Cloudinary :", result);
        return true; // Indiquer que la suppression a réussi
      } else {
        console.error("Erreur lors de la suppression de l'image :", result.error);
        return false; // Indiquer que la suppression a échoué
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      return false; // Indiquer que la suppression a échoué
    }
  } else {
    console.log("On dirait qu'il n'y a pas de publicId à supprimer.");
    return false; // Indiquer que la suppression a échoué
  }
};

export default handleDeleteAllImages; // Assurez-vous d'exporter par défaut