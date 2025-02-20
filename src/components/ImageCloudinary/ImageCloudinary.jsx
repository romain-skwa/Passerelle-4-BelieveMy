import Image from 'next/image';
import React from 'react';
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";

const ImageCloudinary = ({name, imageSrc, setImageSrc}) => {
  const { language, changeLanguage } = useLanguage();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        //console.log(`Data URL : `, reader.result);
      };
      reader.readAsDataURL(file);
      //console.log(`file dans ImageCloudinary : `, file);
    }
  };

  // Définir les dimensions en fonction de la valeur de `name`
  const isUrlPosterCloudinary = name === 'urlPosterCloudinary';
  console.log(`isUrlPosterCloudinary : `, name,` `, isUrlPosterCloudinary);
  const width = isUrlPosterCloudinary ? 192 : 275; 
  const height = isUrlPosterCloudinary ? 311 : 154;
  const dimensionCss = isUrlPosterCloudinary ? "w-[192px] h-[311px]" : "w-[275px] h-[154px]";

  return (
    <div className="flex flex-col items-center"> 
      <input
        type="file"
        accept="image/*"
        name = {name}
        id = {name}
        onChange={handleImageChange}
        className="hidden" // Masque l'input de fichier
      />
      <label htmlFor={name} className="cursor-pointer bg-blue-500 text-white py-1 px-4 rounded">
        {language === "fr" ? "Parcourir" : "Browse"}
      </label>
      {imageSrc && (
        <>
          <Image
            src={imageSrc}
            width={width}
            height={height}
            alt="Prévisualisation"
            style={{ maxWidth: '100%', marginTop: '10px' }}
            className={`py-3 inline-block ${dimensionCss}`}
          />
          <div onClick={() => setImageSrc("")} className='cursor-pointer'>
            {language === "fr" ? "Effacer l'image" : "Delete the image."}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCloudinary;