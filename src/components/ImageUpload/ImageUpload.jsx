// components/avatar-uploader.tsx
"use client";

import { CldUploadWidget } from "next-cloudinary";

export function ImageUpload({image, buttonText, tag, isFormComplete }) {
  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET}
      signatureEndpoint="/api/cloudinary"
      onSuccess={(result) => {
        if (typeof result.info === "object" && "secure_url" in result.info) {
          //alert(result.info.secure_url);
          image(result.info.secure_url);
          console.log("Image info:", result.info);
        }
      }}
      options={{ 
        singleUploadAutoClose: true, // Fermeture automatique
        multiple: false, // Un seul fichier envoyé à la fois
        cropping: true, // Etape de recadrage ajoutée
        clientAllowedFormats: ["jpg", "jpeg", "png"],
        maxImageFileSize: 1000000, // Poids maximum autorisé
        maxImageWidth: 500, // réduire l'image à une largeur de 500 pixels avant le téléchargement
        tags: [tag], // ajouter les tags donnés aux fichiers téléchargés
      }}
    >
      {({ open }) => {
        return (
          <div           
            onClick={() => open()}
            className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 inline-block ml-4"
          >
            {buttonText}
          </div>
        );
      }}
    </CldUploadWidget>
  );
}
