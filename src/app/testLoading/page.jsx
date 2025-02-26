"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GeneralLayout from "@/components/ForLayout/GeneralLayout/GeneralLayout";
import Loading from "@/components/ForLayout/Loading/Loading";
import SocialFrame from "@/components/SocialFrame/SocialFrame";
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  },
  url: {
    secure: true // force https
  }
});

export default function TestPage() {
  const [images, setImages] = useState({ image1: null, image2: null, image3: null });
  const [previewUrls, setPreviewUrls] = useState({ image1: null, image2: null, image3: null });
  const [dataImage1, setDataImage1] = useState("");
  const [dataImage2, setDataImage2] = useState("");
  const [dataImage3, setDataImage3] = useState("");

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    setImages(prevImages => ({ ...prevImages, [key]: file }));

    // Créer une URL de prévisualisation
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrls(prevUrls => ({ ...prevUrls, [key]: url }));
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    for (const [key, file] of Object.entries(images)) {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.NEXT_UPLOAD_PRESET_UNSIGNED);

        try {
          const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`, {
            method: 'POST',
            body: formData,
          });
          const data = await response.json();
          console.log(`Upload successful for ${key}:`, data.secure_url);

            // Stocker l'URL dans l'état approprié
            if (key === 'image1') {
              setDataImage1(data.secure_url);          
            } else if (key === 'image2') {          
              setDataImage2(data.secure_url);          
            } else if (key === 'image3') {          
              setDataImage3(data.secure_url);          
            }

          // Reset only the uploaded image
          setImages(prevImages => ({
            ...prevImages,
            [key]: null
          }));
          // Optionnel : Réinitialiser l'URL de prévisualisation après le téléchargement
          setPreviewUrls(prevUrls => ({ ...prevUrls, [key]: null }));
        } catch (error) {
          console.error(`Upload error for ${key}:`, error);
        }
      }
    }
  };

  return (
    <GeneralLayout>
      <Loading />
      <form onSubmit={handleFormSubmit}>
        <input type="file" onChange={(e) => handleImageChange(e, 'image1')} />
        {previewUrls.image1 && <img src={previewUrls.image1} alt="Preview 1" className="w-32 h-32 object-cover" />}
        
        <input type="file" onChange={(e) => handleImageChange(e, 'image2')} />
        {previewUrls.image2 && <img src={previewUrls.image2} alt="Preview 2" className="w-32 h-32 object-cover" />}
        
        <input type="file" onChange={(e) => handleImageChange(e, 'image3')} />
        {previewUrls.image3 && <img src={previewUrls.image3} alt="Preview 3" className="w-32 h-32 object-cover" />}
        
        <button type="submit" className="bg-slate-300 p-2">Submit</button>
      </form>
      <SocialFrame />
    </GeneralLayout>
  );
}