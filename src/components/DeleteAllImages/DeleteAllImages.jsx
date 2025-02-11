"use client";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { usePathname } from 'next/navigation';

export default function DeleteAllImage({
  urlPosterCloudinary,
  urlImageOne,
  urlImageTwo,
  urlImageThree,
  urlBackgroundCloudinary,
  setUrlPosterCloudinary,
  setUrlImageOne,
  setUrlImageTwo,
  setUrlImageThree,
  setUrlBackgroundCloudinary,
}) {
    const pathname = usePathname();
    useEffect(() => {

        // Logique pour supprimer les images
    
        // Par exemple, réinitialiser l'état des images
    
      }, [pathname]); // Dépendance sur le chemin

      
  // Fonction pour extraire l'ID public de l'URL Cloudinary
  const extractPublicIdFromUrl = (url) => {
    const uploadIndex = url.indexOf('upload') + 7;
    const startIndex = url.indexOf('/', uploadIndex) + 1;
    const endIndex = url.lastIndexOf('.');
    return url.slice(startIndex, endIndex !== -1 ? endIndex : undefined);
  };

  const handleDeleteAllImages = async () => {
    const publicIds = [
      extractPublicIdFromUrl(urlPosterCloudinary),
      extractPublicIdFromUrl(urlImageOne),
      extractPublicIdFromUrl(urlImageTwo),
      extractPublicIdFromUrl(urlImageThree),
      extractPublicIdFromUrl(urlBackgroundCloudinary),
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

    // Réinitialiser les états
    setUrlPosterCloudinary("");
    setUrlImageOne("");
    setUrlImageTwo("");
    setUrlImageThree("");
    setUrlBackgroundCloudinary("");

    // Afficher un message de toast
    if (deleteSuccess) {
      toast.success("Toutes les images ont été supprimées avec succès !");
    } else {
      toast.error("Une ou plusieurs images n'ont pas pu être supprimées.");
    }
  };

  const handleDeleteImage = async (publicId) => {
    if (publicId) {
      console.log(
        `On est censé effacer l'image précédente dans Cloudinary. Son identifiant public est : ${publicId}`
      );
      try {
        const response = await fetch("/api/cloudinary/destroy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ public_id: publicId, invalidate: true }),
        });

        const result = await response.json();
        if (response.ok) {
          console.log("Image supprim ée de Cloudinary :", result);
          return true; // Indiquer que la suppression a réussi
        } else {
          console.error(
            "Erreur lors de la suppression de l'image :",
            result.error
          );
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


  
  return (
    <>
      {/* Bouton pour supprimer toutes les images */}
      <div className="flex justify-center mt-4">
        <div
          onClick={handleDeleteAllImages}
          className="bg-red-600 text-white rounded px-4 py-2 cursor-pointer"
        >
          Supprimer toutes les images
        </div>
      </div>
    </>
  );
}